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
import type { Post, PostLanguage, PostMeta } from "@/lib/db/types";

export type { Post, PostMeta, PostLanguage } from "@/lib/db/types";

/**
 * Slugs of all PUBLICLY VISIBLE posts. Used by generateStaticParams.
 * Excludes drafts and scheduled posts (status=published, future date).
 */
export async function getAllPostSlugs(
  language?: PostLanguage,
): Promise<string[]> {
  return posts.listSlugs(language);
}

/**
 * Memoised set of publicly visible slugs, for callers that need it on EVERY
 * post render (body-link validation). Without the memo a full static build
 * issues one query per post; the underlying `posts` table already times out
 * on large statements, so the naive version makes builds fail.
 *
 * TTL matches the blog route's `revalidate`, so a newly published post
 * becomes linkable within the same window its page becomes visible.
 */
const SLUGS_TTL_MS = 60_000;
type SlugCacheEntry = { at: number; value: Promise<ReadonlySet<string>> };

/**
 * Cached per language, because body-link validation must be per-market.
 * One flat set would let a German article link into an English one, which
 * dead-ends the reader and mixes languages inside a cluster.
 */
const slugCache = new Map<string, SlugCacheEntry>();

export function getPublishedSlugSet(
  language?: PostLanguage,
): Promise<ReadonlySet<string>> {
  const key = language ?? "*";
  const now = Date.now();
  const hit = slugCache.get(key);
  if (!hit || now - hit.at > SLUGS_TTL_MS) {
    const entry: SlugCacheEntry = {
      at: now,
      value: posts.listSlugs(language).then((s) => new Set(s)),
    };
    slugCache.set(key, entry);
    return entry.value;
  }
  return hit.value;
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

/** All publicly visible posts, newest first. Optionally one market only. */
export async function getAllPosts(
  language?: PostLanguage,
): Promise<PostMeta[]> {
  return posts.list(language ? { language } : undefined);
}

/** Full post (meta + body) for a publicly visible post. */
export async function getPost(slug: string): Promise<Post | null> {
  const post = await posts.get(slug);
  if (!post) return null;
  if (post.status !== "published") return null;
  if (isScheduled(post)) return null;
  return post;
}
