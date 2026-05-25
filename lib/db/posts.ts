/**
 * ═══════════════════════════════════════════════════════════════════
 * POSTS DATA LAYER
 * ═══════════════════════════════════════════════════════════════════
 *
 * This file is the SINGLE INTEGRATION POINT for blog post storage.
 * Every other file in the app — admin pages, public pages, sitemap,
 * RSS feed — imports from here.
 *
 * Today's implementation: filesystem (MDX files in content/blog/).
 * Tomorrow's implementation: Supabase Postgres.
 *
 * ──────────────────────────────────────────────────────────────────
 * MIGRATION TO SUPABASE (when you're ready)
 * ──────────────────────────────────────────────────────────────────
 *
 * 1. Install: npm install @supabase/supabase-js
 *
 * 2. Add to .env.local:
 *      NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
 *      NEXT_PUBLIC_SUPABASE_ANON_KEY=...
 *      SUPABASE_SERVICE_ROLE_KEY=...  (server-only)
 *
 * 3. Create the `posts` table in Supabase with this SQL:
 *      create table posts (
 *        slug text primary key,
 *        title text not null,
 *        description text not null,
 *        body text not null,
 *        author text not null,
 *        primary_keyword text,
 *        tags text[],
 *        status text not null default 'draft',
 *        published_at timestamptz not null default now(),
 *        updated_at timestamptz not null default now()
 *      );
 *
 * 4. Seed from existing MDX:
 *      npm run db:seed-posts  (we'll write this script later)
 *
 * 5. Replace the implementation below — swap `fsImpl` for `supabaseImpl`.
 *    The interface stays identical. No admin code or public-page code
 *    needs to change.
 *
 * ──────────────────────────────────────────────────────────────────
 * SECURITY WARNING
 * ──────────────────────────────────────────────────────────────────
 *
 * The filesystem implementation writes files in-place. It works in
 * local dev only — Vercel's serverless filesystem is read-only.
 *
 * Do NOT deploy /admin to production until either:
 *   (a) Auth is added (Supabase Auth / Auth.js)
 *   (b) The data layer is swapped to Supabase
 *
 * Recommended: do both at the same time.
 * ═══════════════════════════════════════════════════════════════════
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostInput, PostMeta, PostStatus } from "./types";

// ─── Shared interface ──────────────────────────────────────────────

export interface PostsRepo {
  list(opts?: { includeUnpublished?: boolean }): Promise<PostMeta[]>;
  getMeta(slug: string): Promise<PostMeta | null>;
  get(slug: string): Promise<Post | null>;
  create(input: PostInput): Promise<Post>;
  update(slug: string, input: PostInput): Promise<Post>;
  delete(slug: string): Promise<void>;
}

// ─── Filesystem implementation (current) ───────────────────────────

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * A post is visible to the public when status === "published" AND
 * publishedAt is today or earlier. A published post with a future
 * publishedAt is treated as "scheduled" — hidden until the date
 * arrives.
 */
function isVisible(publishedAt: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return publishedAt <= today;
}

/** Useful in the admin: true if status=published but date is future. */
export function isScheduled(meta: { status: PostStatus; publishedAt: string }): boolean {
  return meta.status === "published" && !isVisible(meta.publishedAt);
}

function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

function readFile(slug: string): { data: PostMeta; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const fm = parsed.data as Partial<PostMeta>;
  return {
    data: {
      slug,
      title: fm.title ?? slug,
      description: fm.description ?? "",
      publishedAt: fm.publishedAt ?? new Date().toISOString().slice(0, 10),
      updatedAt: fm.updatedAt,
      author: fm.author ?? "Unknown",
      primaryKeyword: fm.primaryKeyword,
      tags: fm.tags,
      status: (fm.status as PostStatus) ?? "published",
    },
    content: parsed.content,
  };
}

function writeFile(slug: string, meta: PostMeta, body: string) {
  ensureDir();
  const frontmatter: Record<string, unknown> = {
    title: meta.title,
    description: meta.description,
    publishedAt: meta.publishedAt,
    author: meta.author,
    status: meta.status,
  };
  if (meta.updatedAt) frontmatter.updatedAt = meta.updatedAt;
  if (meta.primaryKeyword) frontmatter.primaryKeyword = meta.primaryKeyword;
  if (meta.tags && meta.tags.length > 0) frontmatter.tags = meta.tags;

  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  const output = matter.stringify(body, frontmatter);
  fs.writeFileSync(file, output, "utf8");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const fsImpl: PostsRepo = {
  async list(opts) {
    ensureDir();
    const slugs = fs
      .readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
    const all = slugs
      .map((slug) => readFile(slug))
      .filter((r): r is NonNullable<typeof r> => r !== null)
      .map((r) => r.data);
    const filtered = opts?.includeUnpublished
      ? all
      : all.filter((p) => p.status === "published" && isVisible(p.publishedAt));
    return filtered.sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt)
    );
  },

  async getMeta(slug) {
    const r = readFile(slug);
    return r ? r.data : null;
  },

  async get(slug) {
    const r = readFile(slug);
    return r ? { ...r.data, body: r.content } : null;
  },

  async create(input) {
    const slug = input.slug ? slugify(input.slug) : slugify(input.title);
    if (!slug) throw new Error("Cannot derive a slug from the title");
    if (readFile(slug)) {
      throw new Error(`A post with slug "${slug}" already exists`);
    }
    const today = new Date().toISOString().slice(0, 10);
    const meta: PostMeta = {
      slug,
      title: input.title,
      description: input.description,
      publishedAt: input.publishedAt ?? today,
      author: input.author,
      primaryKeyword: input.primaryKeyword,
      tags: input.tags,
      status: input.status,
    };
    writeFile(slug, meta, input.body);
    return { ...meta, body: input.body };
  },

  async update(slug, input) {
    const existing = readFile(slug);
    if (!existing) throw new Error(`Post "${slug}" not found`);
    const newSlug =
      input.slug && slugify(input.slug) !== slug ? slugify(input.slug) : slug;
    // if slug changed, delete the old file
    if (newSlug !== slug) {
      const oldFile = path.join(BLOG_DIR, `${slug}.mdx`);
      fs.unlinkSync(oldFile);
    }
    const meta: PostMeta = {
      slug: newSlug,
      title: input.title,
      description: input.description,
      publishedAt: input.publishedAt ?? existing.data.publishedAt,
      updatedAt: new Date().toISOString().slice(0, 10),
      author: input.author,
      primaryKeyword: input.primaryKeyword,
      tags: input.tags,
      status: input.status,
    };
    writeFile(newSlug, meta, input.body);
    return { ...meta, body: input.body };
  },

  async delete(slug) {
    // Defense-in-depth: re-slugify any incoming slug so path-traversal
    // payloads ("..", "/", etc.) can never escape BLOG_DIR even if a
    // caller forgets to sanitise.
    const safe = slugify(slug);
    if (!safe || safe !== slug) throw new Error(`Invalid slug "${slug}"`);
    const file = path.join(BLOG_DIR, `${safe}.mdx`);
    // Belt-and-braces: confirm the resolved path is still inside BLOG_DIR.
    const resolved = path.resolve(file);
    if (!resolved.startsWith(path.resolve(BLOG_DIR) + path.sep)) {
      throw new Error(`Refusing to delete outside blog dir: ${resolved}`);
    }
    if (!fs.existsSync(resolved)) throw new Error(`Post "${safe}" not found`);
    fs.unlinkSync(resolved);
  },
};

// ─── Active export ─────────────────────────────────────────────────
//
// To migrate to Supabase later, replace `fsImpl` with a Supabase
// implementation that satisfies the same `PostsRepo` interface.

export const posts: PostsRepo = fsImpl;

// Convenience re-exports for the slug helper (used by the admin form).
export { slugify };
