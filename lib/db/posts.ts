/**
 * ═══════════════════════════════════════════════════════════════════
 * POSTS DATA LAYER — Supabase
 * ═══════════════════════════════════════════════════════════════════
 *
 * SINGLE INTEGRATION POINT for blog post storage. Public pages
 * (/resources/blog/*) and admin (/admin/posts/*) both go through here.
 *
 * Storage: Supabase Postgres `posts` table.
 * Body format: markdown (rendered at request time via next-mdx-remote).
 *
 * Reads: anon client + RLS — public sees only published+visible rows.
 * Writes: service-role client — bypasses RLS (admin server actions
 *   are auth-gated by proxy.ts so it's safe).
 * ═══════════════════════════════════════════════════════════════════
 */

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Post, PostInput, PostMeta, PostStatus } from "./types";

/** Which slice of the library an admin list is showing. */
export type PostView = "all" | "scheduled" | "drafts";

export type PostCounts = { all: number; scheduled: number; drafts: number };

export type PostPage = {
  rows: PostMeta[];
  /** Total matching the view + query, not the page length. */
  total: number;
  page: number;
  perPage: number;
  pageCount: number;
};

export type PostSearchOpts = {
  q?: string;
  view?: PostView;
  page?: number;
  perPage?: number;
};

export interface PostsRepo {
  list(opts?: { includeUnpublished?: boolean }): Promise<PostMeta[]>;
  /** Slugs only. Avoids pulling every post body when just the set is needed. */
  listSlugs(): Promise<string[]>;
  /**
   * One page of admin results, filtered and searched in Postgres.
   * The admin screens use this instead of list() — at 265 posts and
   * climbing, fetching the library to render 25 rows is the wrong shape.
   */
  search(opts?: PostSearchOpts): Promise<PostPage>;
  /** Tab counts. Three head-only queries, no rows returned. */
  counts(): Promise<PostCounts>;
  /** Scheduled posts going live within the next `days`, soonest first. */
  upcoming(days: number): Promise<PostMeta[]>;
  getMeta(slug: string): Promise<PostMeta | null>;
  get(slug: string): Promise<Post | null>;
  create(input: PostInput): Promise<Post>;
  update(slug: string, input: PostInput): Promise<Post>;
  delete(slug: string): Promise<void>;
}

export const POSTS_PER_PAGE = 25;

/** Today as YYYY-MM-DD, the granularity published_at is compared at. */
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Strip characters that carry meaning inside a PostgREST `or=(...)` filter.
 * Commas separate terms, parentheses group them, and `*` and `%` are
 * wildcards — none should be reachable from a search box. Everything left
 * is matched literally, wrapped in our own wildcards.
 */
function sanitizeSearch(raw: string): string {
  return raw
    .replace(/[,()*%\\"]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

/** True if a published post has a future publishedAt. */
export function isScheduled(meta: { status: PostStatus; publishedAt: string }): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return meta.status === "published" && meta.publishedAt > today;
}

// ─── Row ↔ domain mapping ──────────────────────────────────────────

type Row = {
  slug: string;
  title: string;
  description: string;
  body: string;
  author: string;
  tags: string[] | null;
  status: PostStatus;
  published_at: string;
  updated_at: string;
  created_at: string;
};

/** Every column PostMeta needs — deliberately excludes the heavy `body`. */
const META_COLUMNS =
  "slug, title, description, author, tags, status, published_at, updated_at";

function rowToMeta(row: Row): PostMeta {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    author: row.author,
    tags: row.tags ?? undefined,
    status: row.status,
    publishedAt: row.published_at.slice(0, 10),
    updatedAt: row.updated_at?.slice(0, 10),
  };
}

function rowToPost(row: Row): Post {
  return { ...rowToMeta(row), body: row.body };
}

/** Slug auto-derive — same algorithm regardless of backend. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

// ─── Implementation ────────────────────────────────────────────────

const supabaseImpl: PostsRepo = {
  async list(opts) {
    // Always use the admin client (no cookies → safe at build-time).
    // Public visibility is enforced explicitly here.
    const sb = createSupabaseAdminClient();
    // Explicit column list, NOT `*`: this returns PostMeta, so `body` is
    // discarded by rowToMeta anyway. Selecting it pulled every article's
    // full text on each call — megabytes per query, and the likely cause
    // of `canceling statement due to statement timeout` during builds.
    let query = sb
      .from("posts")
      .select(META_COLUMNS)
      .order("published_at", { ascending: false });
    if (!opts?.includeUnpublished) {
      const nowIso = new Date().toISOString();
      query = query.eq("status", "published").lte("published_at", nowIso);
    }
    const { data, error } = await query;
    if (error) throw new Error(`posts.list failed: ${error.message}`);
    return (data as Row[]).map(rowToMeta);
  },

  async listSlugs() {
    const sb = createSupabaseAdminClient();
    const nowIso = new Date().toISOString();
    const { data, error } = await sb
      .from("posts")
      .select("slug")
      .eq("status", "published")
      .lte("published_at", nowIso);
    if (error) throw new Error(`posts.listSlugs failed: ${error.message}`);
    return (data as { slug: string }[]).map((r) => r.slug);
  },

  async search(opts) {
    const sb = createSupabaseAdminClient();
    const view: PostView = opts?.view ?? "all";
    const perPage = Math.max(1, opts?.perPage ?? POSTS_PER_PAGE);
    const page = Math.max(1, Math.floor(opts?.page ?? 1));
    const q = sanitizeSearch(opts?.q ?? "");

    // `count: "exact"` rides along with the row fetch, so paging costs one
    // round trip rather than a separate count query.
    let query = sb
      .from("posts")
      .select(META_COLUMNS, { count: "exact" })
      .order("published_at", { ascending: false });

    if (view === "scheduled") {
      query = query.eq("status", "published").gt("published_at", today());
    } else if (view === "drafts") {
      query = query.eq("status", "draft");
    }

    if (q) {
      query = query.or(`title.ilike.*${q}*,slug.ilike.*${q}*`);
    }

    const from = (page - 1) * perPage;
    const { data, error, count } = await query.range(from, from + perPage - 1);
    if (error) throw new Error(`posts.search failed: ${error.message}`);

    const total = count ?? 0;
    return {
      rows: (data as unknown as Row[]).map(rowToMeta),
      total,
      page,
      perPage,
      pageCount: Math.max(1, Math.ceil(total / perPage)),
    };
  },

  async counts() {
    const sb = createSupabaseAdminClient();
    const head = { count: "exact" as const, head: true };

    const [all, scheduled, drafts] = await Promise.all([
      sb.from("posts").select("slug", head),
      sb
        .from("posts")
        .select("slug", head)
        .eq("status", "published")
        .gt("published_at", today()),
      sb.from("posts").select("slug", head).eq("status", "draft"),
    ]);

    const err = all.error ?? scheduled.error ?? drafts.error;
    if (err) throw new Error(`posts.counts failed: ${err.message}`);

    return {
      all: all.count ?? 0,
      scheduled: scheduled.count ?? 0,
      drafts: drafts.count ?? 0,
    };
  },

  async upcoming(days) {
    const sb = createSupabaseAdminClient();
    const until = new Date(Date.now() + days * 86_400_000)
      .toISOString()
      .slice(0, 10);

    const { data, error } = await sb
      .from("posts")
      .select(META_COLUMNS)
      .eq("status", "published")
      .gt("published_at", today())
      .lte("published_at", until)
      .order("published_at", { ascending: true });

    if (error) throw new Error(`posts.upcoming failed: ${error.message}`);
    return (data as unknown as Row[]).map(rowToMeta);
  },

  async getMeta(slug) {
    const sb = createSupabaseAdminClient();
    const { data, error } = await sb
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw new Error(`posts.getMeta failed: ${error.message}`);
    return data ? rowToMeta(data as Row) : null;
  },

  async get(slug) {
    const sb = createSupabaseAdminClient();
    const { data, error } = await sb
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw new Error(`posts.get failed: ${error.message}`);
    return data ? rowToPost(data as Row) : null;
  },

  async create(input) {
    const slug = input.slug ? slugify(input.slug) : slugify(input.title);
    if (!slug) throw new Error("Cannot derive a slug from the title");

    const sb = createSupabaseAdminClient();

    // Pre-check for collision (more useful error than the DB unique-violation)
    const { data: existing } = await sb.from("posts").select("slug").eq("slug", slug).maybeSingle();
    if (existing) throw new Error(`A post with slug "${slug}" already exists`);

    const today = new Date().toISOString().slice(0, 10);
    const payload = {
      slug,
      title: input.title,
      description: input.description,
      body: input.body,
      author: input.author,
      tags: input.tags ?? [],
      status: input.status,
      published_at: (input.publishedAt ?? today),
    };

    const { data, error } = await sb.from("posts").insert(payload).select("*").single();
    if (error) throw new Error(`posts.create failed: ${error.message}`);
    return rowToPost(data as Row);
  },

  async update(slug, input) {
    const sb = createSupabaseAdminClient();
    const newSlug = input.slug && slugify(input.slug) !== slug ? slugify(input.slug) : slug;

    const payload = {
      slug: newSlug,
      title: input.title,
      description: input.description,
      body: input.body,
      author: input.author,
      tags: input.tags ?? [],
      status: input.status,
      ...(input.publishedAt ? { published_at: input.publishedAt } : {}),
    };

    const { data, error } = await sb
      .from("posts")
      .update(payload)
      .eq("slug", slug)
      .select("*")
      .single();
    if (error) throw new Error(`posts.update failed: ${error.message}`);
    return rowToPost(data as Row);
  },

  async delete(slug) {
    const safe = slugify(slug);
    if (!safe || safe !== slug) throw new Error(`Invalid slug "${slug}"`);
    const sb = createSupabaseAdminClient();
    const { error } = await sb.from("posts").delete().eq("slug", safe);
    if (error) throw new Error(`posts.delete failed: ${error.message}`);
  },
};

export const posts: PostsRepo = supabaseImpl;
