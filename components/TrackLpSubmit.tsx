"use client";

/**
 * Fires the conversion event for a paid-search lead.
 *
 * Mounted on /lp/thank-you, which is only reachable via the 303 from
 * /api/contact — so mounting ≈ one real submission from an ad click.
 *
 * The keyword rides along on every event. That is what lets Google Ads,
 * GA4 and PostHog all report cost per lead per keyword rather than one
 * blended number.
 *
 * GA4 / GTM: "ads_lead" on both gtag and dataLayer. Rifqi builds the
 * Google Ads conversion action in GTM off the dataLayer event — no
 * conversion ID is hardcoded here, so the tag can be created, changed
 * or removed without a deploy.
 *
 * A sessionStorage guard stops refreshes from double-counting. No PII is
 * attached to any event.
 */

import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

const GUARD_KEY = "fs-ads-lead-tracked";

export function TrackLpSubmit({ keywordSlug }: { keywordSlug: string }) {
  const posthog = usePostHog();

  useEffect(() => {
    if (sessionStorage.getItem(GUARD_KEY)) return;
    sessionStorage.setItem(GUARD_KEY, "1");

    const payload = { form: "landing-page", keyword: keywordSlug };

    window.gtag?.("event", "ads_lead", payload);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "ads_lead", ...payload });

    posthog?.capture("ads_lead_submitted", payload);
  }, [posthog, keywordSlug]);

  return null;
}
