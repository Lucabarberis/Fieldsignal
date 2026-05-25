/**
 * Next.js 16 Proxy (formerly "middleware"). Runs on every request that
 * matches the `config.matcher` below. Node.js runtime.
 *
 * Responsibilities:
 *   1. Refresh the Supabase auth session on every request
 *   2. Gate /admin/* — redirect unauthenticated visitors to /admin/login
 *      (except /admin/login itself, which is always reachable)
 */

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Mirror the cookie writes onto both the request (for any
          // downstream reads in this turn) and the outgoing response.
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // IMPORTANT: do NOT remove this. getUser() refreshes the session token
  // if it's stale. Without this call, sessions silently expire.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ─── Gate /admin/* ────────────────────────────────────────────
  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isLoginRoute = path === "/admin/login";

  if (isAdminRoute && !isLoginRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    // Preserve where they were trying to go
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in and hitting /admin/login, send to /admin
  if (isLoginRoute && user) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";
    return NextResponse.redirect(adminUrl);
  }

  return response;
}

export const config = {
  // Run the proxy on every route EXCEPT static assets and Next internals.
  // We still need it on public routes so Supabase can refresh sessions
  // for any user who's logged in (admin or otherwise).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.gif).*)",
  ],
};
