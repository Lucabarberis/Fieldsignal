import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * Admin layout.
 *
 * Renders its own chrome — no public masthead, no public footer, no
 * Schema.org markup, no SEO. Intentionally noindex'd.
 *
 * NOTE: This layout has no auth wall. It only works in local dev today.
 * Before deploying, add Supabase Auth (or Auth.js) middleware that
 * gates every /admin/* route.
 */

export const metadata: Metadata = {
  title: "Admin — FieldSignal",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="bg-paper-2 border-b-2 border-ink px-9 py-3 font-mono text-mono uppercase tracking-[0.12em] flex items-center gap-6 flex-wrap">
        <Link
          href="/admin"
          className="text-ink font-semibold hover:text-red transition-colors"
        >
          {SITE.name} Admin
        </Link>
        <span className="text-ink-3">/</span>
        <Link
          href="/admin"
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
        <div className="flex-1" />
        <Link
          href="/"
          className="text-ink-3 hover:text-ink transition-colors"
        >
          View site →
        </Link>
      </div>

      {/* Dev-only warning banner — remove once auth is wired */}
      <div className="bg-red text-paper px-9 py-2 font-mono text-micro uppercase tracking-[0.12em]">
        Local dev only · no auth · do not deploy without adding Supabase Auth
      </div>

      <main className="flex-1">{children}</main>
    </>
  );
}
