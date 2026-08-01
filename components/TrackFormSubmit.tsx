"use client";

/**
 * Fires analytics events for a successful contact-form submission.
 * Mounted on /contact/thank-you, which is only reachable via the 303
 * from /api/contact — so mounting ≈ one real submission.
 *
 * GA4:     "contact_form_submit"    (direct gtag + dataLayer for GTM)
 * PostHog: "contact_form_submitted"
 *
 * A sessionStorage guard stops refreshes of the thank-you page from
 * double-counting. No PII is attached to any event.
 */

import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { gtagEvent } from "@/lib/gtag";

const GUARD_KEY = "fs-contact-form-tracked";

export function TrackFormSubmit() {
  const posthog = usePostHog();

  useEffect(() => {
    if (sessionStorage.getItem(GUARD_KEY)) return;
    sessionStorage.setItem(GUARD_KEY, "1");

    gtagEvent("contact_form_submit", { form: "contact" });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "contact_form_submit", form: "contact" });

    posthog?.capture("contact_form_submitted", { form: "contact" });
  }, [posthog]);

  return null;
}
