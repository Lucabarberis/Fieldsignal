import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOutAction } from "./login/actions";

/**
 * Admin layout — chromeless wrapper for every /admin/* route.
 *
 * Auth is enforced by proxy.ts at the edge. This layout assumes the
 * proxy has already verified the request: it just renders chrome and
 * the active user's email + a sign-out button.
 *
 * The /admin/login page renders its own minimal chrome; we detect that
 * case below and skip the admin nav.
 */

export const metadata: Metadata = {
  title: "Admin — FieldSignal",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Read the current user. Public users never reach this layout (proxy
  // redirects to /admin/login first), so `user` should be non-null —
  // except on /admin/login itself where the proxy lets them through.
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If we have no user, we're on /admin/login — render bare-bones.
  if (!user) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <div className="bg-paper-2 border-b-2 border-ink px-4 sm:px-9 py-3 font-mono text-mono uppercase tracking-[0.12em] flex items-center gap-6 flex-wrap">
        <Link
          href="/admin"
          className="text-ink font-semibold hover:text-red transition-colors"
        >
          {SITE.name} Admin
        </Link>
        <span className="text-ink-3">/</span>
        <Link
          href="/admin/posts"
          className="text-ink-2 hover:text-ink transition-colors"
        >
          Posts
        </Link>
        <Link
          href="/admin/transcripts"
          className="text-ink-2 hover:text-ink transition-colors"
        >
          Transcripts
        </Link>
        <Link
          href="/admin/social"
          className="text-ink-2 hover:text-ink transition-colors"
        >
          Social
        </Link>
        <Link
          href="/admin/leads"
          className="text-ink-2 hover:text-ink transition-colors"
        >
          Leads
        </Link>
        <Link
          href="/admin/risefinder"
          className="text-ink-2 hover:text-ink transition-colors"
        >
          RiseFinder
        </Link>
        <div className="flex-1" />
        <span className="text-ink-3 normal-case tracking-[0.04em]">{user.email}</span>
        <form action={signOutAction}>
          <button
            type="submit"
            className="text-ink-3 hover:text-red transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </form>
        <Link
          href="/"
          className="text-ink-3 hover:text-ink transition-colors"
        >
          View site →
        </Link>
      </div>

      <main className="flex-1">{children}</main>
    </>
  );
}
