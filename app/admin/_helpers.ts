/**
 * Shared helpers for the admin list views.
 * The leading underscore folder keeps this out of Next.js routing.
 */

import { posts, isScheduled } from "@/lib/db/posts";
import type { PostMeta } from "@/lib/db/types";

export type AdminPostsBundle = {
  all: PostMeta[];
  live: PostMeta[];
  scheduled: PostMeta[];
  drafts: PostMeta[];
  counts: {
    all: number;
    scheduled: number;
    drafts: number;
  };
};

/** Fetch every post once, partition into views, return counts. */
export async function loadAdminPosts(): Promise<AdminPostsBundle> {
  const all = await posts.list({ includeUnpublished: true });
  const scheduled = all.filter((p) => isScheduled(p));
  const drafts = all.filter((p) => p.status === "draft");
  const live = all.filter((p) => p.status === "published" && !isScheduled(p));
  return {
    all,
    live,
    scheduled,
    drafts,
    counts: {
      all: all.length,
      scheduled: scheduled.length,
      drafts: drafts.length,
    },
  };
}
