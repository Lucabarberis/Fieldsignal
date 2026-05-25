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

export interface PostsRepo {
  list(opts?: { includeUnpublished?: boolean }): Promise<PostMeta[]>;
  getMeta(slug: string): Promise<PostMeta | null>;
  get(slug: string): Promise<Post | null>;
  create(input: PostInput): Promise<Post>;
  update(slug: string, input: PostInput): Promise<Post>;
  delete(slug: string): Promise<void>;
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
    let query = sb
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false });
    if (!opts?.includeUnpublished) {
      const nowIso = new Date().toISOString();
      query = query.eq("status", "published").lte("published_at", nowIso);
    }
    const { data, error } = await query;
    if (error) throw new Error(`posts.list failed: ${error.message}`);
    return (data as Row[]).map(rowToMeta);
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
