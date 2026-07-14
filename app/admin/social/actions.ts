"use server";

import { socialPosts, type SocialStatus } from "@/lib/db/social";

/**
 * Server actions for the social content hub.
 *
 * These run server-side only, under /admin — proxy.ts has already
 * verified the session before any of this executes.
 */

/**
 * Flip one post between todo and posted.
 *
 * Deliberately does NOT revalidatePath. The page is force-dynamic and
 * holds ~3MB of post bodies; revalidating here would re-fetch all 380
 * rows on every single tick. The client updates optimistically and
 * rolls back if this throws, so the UI is already correct — and the
 * next real navigation re-reads from Postgres anyway.
 */
export async function setSocialStatusAction(key: string, status: SocialStatus) {
  if (!key) throw new Error("Missing key");
  if (status !== "todo" && status !== "posted") {
    throw new Error(`Invalid status "${status}"`);
  }
  await socialPosts.setStatus(key, status);
}
