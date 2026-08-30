/**
 * Server-only Supabase client for the RiseFinder pipeline's database.
 *
 * A SECOND PROJECT, NOT A SECOND CLIENT FOR THE SAME ONE. The website's
 * Supabase project holds leads, posts and transcripts. The RiseFinder pipeline
 * writes its entities and snapshots to a different project entirely — it was
 * set up on its own, months apart, and nothing ever needed both until the
 * risers page started answering custom date ranges.
 *
 * `createSupabaseAdminClient()` therefore CANNOT serve this: pointed at the
 * website's project it returns PGRST202 "could not find the function", which
 * reads exactly like a migration that failed to apply rather than a query sent
 * to the wrong database.
 *
 * Needs RISEFINDER_SUPABASE_URL and RISEFINDER_SUPABASE_SERVICE_ROLE_KEY, which
 * must be set in Vercel as well as in .env.local or custom ranges will work
 * locally and fail in production.
 */

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function createRiseFinderClient(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.RISEFINDER_SUPABASE_URL;
  const key = process.env.RISEFINDER_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing RISEFINDER_SUPABASE_URL / RISEFINDER_SUPABASE_SERVICE_ROLE_KEY. " +
        "These point at the RiseFinder pipeline's Supabase project, which is a " +
        "different project from the website's.",
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
