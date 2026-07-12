"use client";

import { useRouter } from "next/navigation";

/**
 * Back button — browser-history back with a home fallback for
 * direct entries (e.g. a visitor landing straight on a tool page
 * from a search result or shared link).
 */
export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.12em] text-ink-2 hover:text-ink transition-colors cursor-pointer"
    >
      ← Back
    </button>
  );
}
