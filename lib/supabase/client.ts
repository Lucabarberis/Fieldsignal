/**
 * Browser-side Supabase client. Use in Client Components only.
 * Auth state lives in cookies (set up by middleware + server client).
 *
 * Anonymous key — respects RLS. Cannot bypass row-level security.
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database-types";

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
