/**
 * Public API for reading published blog posts.
 *
 * Thin async wrappers around the data repository so the public pages
 * and the admin pages share a single source of truth.
 *
 * For admin-side reads/writes (including drafts), import the `posts`
 * repo directly from `@/lib/db/posts`.
 */

import { posts, isScheduled } from "@/lib/db/posts";
import type { Post, PostMeta } from "@/lib/db/types";

export type { Post, PostMeta } from "@/lib/db/types";

/**
 * Slugs of all PUBLICLY VISIBLE posts. Used by generateStaticParams.
 * Excludes drafts and scheduled posts (status=published, future date).
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const all = await posts.list();
  return all.map((p) => p.slug);
}

/**
 * Metadata for a single post that should be publicly visible.
 * Returns null for drafts and for scheduled posts whose date hasn't
 * arrived yet.
 */
export async function getPostMeta(slug: string): Promise<PostMeta | null> {
  const meta = await posts.getMeta(slug);
  if (!meta) return null;
  if (meta.status !== "published") return null;
  if (isScheduled(meta)) return null;
  return meta;
}

/** All publicly visible posts, newest first. */
export async function getAllPosts(): Promise<PostMeta[]> {
  return posts.list();
}

/** Full post (meta + body) for a publicly visible post. */
export async function getPost(slug: string): Promise<Post | null> {
  const post = await posts.get(slug);
  if (!post) return null;
  if (post.status !== "published") return null;
  if (isScheduled(post)) return null;
  return post;
}
