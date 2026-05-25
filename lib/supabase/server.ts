/**
 * Server-side Supabase client. Use in Server Components, Server Actions,
 * Route Handlers and middleware.
 *
 * Anonymous key — respects RLS. The auth session is read from cookies,
 * so RLS policies see the authenticated user's role.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database-types";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Components cannot set cookies. The middleware
            // handles cookie refresh; ignore the failure here.
          }
        },
      },
    },
  );
}
