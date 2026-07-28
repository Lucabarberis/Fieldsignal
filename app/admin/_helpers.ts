/**
 * Shared helpers for the admin post list views.
 * The leading underscore folder keeps this out of Next.js routing.
 */

import { posts, POSTS_PER_PAGE } from "@/lib/db/posts";
import type { PostCounts, PostPage, PostView } from "@/lib/db/posts";

export type AdminPostsView = {
  results: PostPage;
  counts: PostCounts;
  /** The search term as typed — echoed into the box and the page links. */
  q: string;
};

/** Next 16 hands searchParams in as a promise of possibly-repeated values. */
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/**
 * One page of posts for an admin list, plus the tab counts.
 *
 * Both are targeted queries. These screens used to fetch every post and
 * partition the result in JavaScript, so rendering 25 rows cost 265 rows
 * of transfer — and got worse with every article published.
 */
export async function loadAdminPostsView(
  view: PostView,
  searchParams: SearchParams,
): Promise<AdminPostsView> {
  const params = await searchParams;
  const q = first(params.q).slice(0, 80);
  const page = Math.max(1, Number.parseInt(first(params.page), 10) || 1);

  const [results, counts] = await Promise.all([
    posts.search({ q, view, page, perPage: POSTS_PER_PAGE }),
    posts.counts(),
  ]);

  return { results, counts, q };
}
