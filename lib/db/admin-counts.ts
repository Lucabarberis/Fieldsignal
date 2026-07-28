/**
 * Count-only queries for the /admin hub.
 *
 * Deliberately a separate module from lib/db/social.ts and lib/db/leads.ts.
 * social.ts statically imports content/social/posts.json (~3MB) at the top
 * of the file, so anything importing it drags that into the route bundle.
 * The hub only needs a number, so it reads one here instead.
 *
 * Every query uses `head: true`, which asks Postgres for the count and
 * returns no rows.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function db(): SupabaseClient {
  return createSupabaseAdminClient() as unknown as SupabaseClient;
}

export type LeadCounts = {
  all: number;
  fromAds: number;
  meetings: number;
};

/** How many social posts have been ticked as posted. */
export async function socialPostedCount(): Promise<number> {
  const { count, error } = await db()
    .from("social_post_status")
    .select("key", { count: "exact", head: true })
    .eq("status", "posted");

  if (error) throw new Error(`socialPostedCount failed: ${error.message}`);
  return count ?? 0;
}

/**
 * Lead totals for the hub card. Returns zeroes rather than throwing if the
 * table isn't there yet — a missing table is a setup step, not a reason for
 * the whole hub to fail.
 */
export async function leadCounts(): Promise<LeadCounts> {
  const supabase = db();

  const [all, fromAds, meetings] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .neq("source", "organic"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .in("status", ["meeting_booked", "meeting_held", "won"]),
  ]);

  if (all.error) return { all: 0, fromAds: 0, meetings: 0 };

  return {
    all: all.count ?? 0,
    fromAds: fromAds.count ?? 0,
    meetings: meetings.count ?? 0,
  };
}
