/**
 * Server-only Supabase admin client using the service-role key.
 * BYPASSES Row Level Security — has full database access.
 *
 * Only import from:
 *   - Server actions in /admin/* (after auth has been verified)
 *   - Seed scripts (one-time data uploads)
 *
 * NEVER expose to the client. NEVER use in unauthenticated routes.
 */

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database-types";

let cached: SupabaseClient<Database> | null = null;

export function createSupabaseAdminClient(): SupabaseClient<Database> {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }

  cached = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
}
