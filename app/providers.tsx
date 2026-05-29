"use client";

/**
 * PostHog provider — wraps the entire app so client components can
 * use the usePostHog() hook and so PostHog auto-captures page views
 * + interactions site-wide.
 *
 * Initialized inside useEffect to:
 *   - guarantee client-only execution (PostHog uses browser APIs)
 *   - run once per app lifetime
 *
 * Defensive: bails out cleanly if the env vars aren't set (e.g. when
 * someone clones the repo without filling .env.local).
 *
 * The `defaults: '2026-01-30'` flag enables PostHog's modern defaults:
 *   - autocapture (clicks, form submits, etc.)
 *   - pageviews including client-side route changes (no manual hook needed)
 *   - pageleave events
 *   - session recording
 */

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!token || !host) return;

    // Avoid re-initialising on Strict-Mode double-mount in dev.
    // `__loaded` is an internal property not in the public types.
    if ((posthog as unknown as { __loaded?: boolean }).__loaded) return;

    posthog.init(token, {
      api_host: host,
      defaults: "2026-01-30",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
