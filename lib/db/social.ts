/**
 * ═══════════════════════════════════════════════════════════════════
 * SOCIAL POSTS DATA LAYER
 * ═══════════════════════════════════════════════════════════════════
 *
 * Backs /admin/social — the social content hub (Reddit, Medium,
 * LinkedIn, Substack, X, Quora, WSO posts derived from blog articles).
 *
 * SPLIT STORAGE, on purpose:
 *
 *   CONTENT  → content/social/posts.json, shipped with the app.
 *              ~3MB, static, changes only when the content is
 *              regenerated. Reading it costs nothing.
 *
 *   STATUS   → Supabase `social_post_status` — one tiny row per ticked
 *              post: { key, status }. A page load pulls ~15KB instead
 *              of 3MB, so Supabase egress is a non-issue, and a tick is
 *              a single small upsert.
 *
 * The two are joined on `key`, a stable content-derived id. A post with
 * no row in the table is simply "todo" — we only store what's been
 * ticked.
 *
 * RLS is on with no policies, so the table is reachable only via the
 * service-role client. Every caller lives under /admin, gated by
 * proxy.ts.
 * ═══════════════════════════════════════════════════════════════════
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import content from "@/content/social/posts.json";

export type SocialStatus = "todo" | "posted";
export type CopyMode = "plain" | "rich";

export interface SocialField {
  label: string;
  text: string;
  copy?: boolean;
  mode?: string;
}

/** One tweet in an X chain: the opening POST, then REPLY 1..N. */
export interface Tweet {
  role: string;
  text: string;
}

export interface SocialPost {
  key: string;
  /** Sequential number within its platform, e.g. X #12. Stable, for reference. */
  postNum: number;
  platform: string;
  wave: number;
  blogNum: number;
  blogTitle: string;
  url: string;
  angle: string;
  notes: string;
  fields: SocialField[];
  /** X only: the post + its replies, each individually copyable. */
  tweets?: Tweet[];
  bodyHtml: string;
  bodyCopyHtml: string | null;
  bodyCopyText: string;
  bodyCopyMode: CopyMode;
  copyHint: string;
  schedDate: string;
  status: SocialStatus;
}

/** Shape of one entry in content/social/posts.json (no status field). */
type ContentPost = Omit<SocialPost, "status">;

/**
 * The generated `Database` types don't know about `social_post_status`
 * (they're regenerated from the Supabase CLI). Drop the generic rather
 * than hand-editing the generated file.
 */
function db(): SupabaseClient {
  return createSupabaseAdminClient() as unknown as SupabaseClient;
}

/** Platform display order in the UI. */
export const PLATFORM_ORDER = [
  "Reddit",
  "Medium",
  "LinkedIn",
  "Substack",
  "X",
  "Quora",
  "WSO",
] as const;

function rank(platform: string): number {
  const i = (PLATFORM_ORDER as readonly string[]).indexOf(platform);
  return i === -1 ? 99 : i;
}

export const socialPosts = {
  /**
   * Every post, ordered wave → blog → platform.
   * Content comes from the repo; only the status map is fetched.
   */
  async list(): Promise<SocialPost[]> {
    const { data, error } = await db()
      .from("social_post_status")
      .select("key,status");

    if (error) {
      throw new Error(
        `socialPosts.list failed reading status: ${error.message}. ` +
          "Did you run supabase/social_post_status.sql?",
      );
    }

    const statusByKey = new Map<string, SocialStatus>(
      (data ?? []).map((r) => [r.key as string, r.status as SocialStatus]),
    );

    return (content as ContentPost[])
      .map((p) => ({ ...p, status: statusByKey.get(p.key) ?? "todo" }))
      .sort(
        (a, b) =>
          a.wave - b.wave ||
          a.blogNum - b.blogNum ||
          rank(a.platform) - rank(b.platform),
      );
  },

  /**
   * Flip a single post between todo and posted.
   * Upsert, so a post that has never been ticked gets its first row here
   * — no need to pre-seed a row for all 380.
   */
  async setStatus(key: string, status: SocialStatus): Promise<void> {
    if (status !== "todo" && status !== "posted") {
      throw new Error(`Invalid status "${status}"`);
    }
    if (!(content as ContentPost[]).some((p) => p.key === key)) {
      throw new Error(`Unknown post key "${key}"`);
    }

    const { error } = await db()
      .from("social_post_status")
      .upsert({ key, status, updated_at: new Date().toISOString() }, { onConflict: "key" });

    if (error) throw new Error(`socialPosts.setStatus failed: ${error.message}`);
  },
};
