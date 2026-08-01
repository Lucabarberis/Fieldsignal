/**
 * Sends a GA4 event, tolerating the Google tag not having loaded yet.
 *
 * WHY THIS EXISTS
 *
 * The Google tag is injected with strategy="afterInteractive", so on a page
 * whose entire job is to fire a conversion the React effect runs *before*
 * window.gtag exists. `window.gtag?.("event", ...)` then silently no-ops —
 * no error, no warning, nothing in any console.
 *
 * That is exactly what happened to ads_lead on /lp/thank-you. Inspecting a
 * live thank-you page showed the dataLayer entry present at index 0 and no
 * gtag arguments object anywhere, with `config` not queued until index 3:
 *
 *   [{event: "ads_lead", ...}, "gtm.js", "js", "config: G-…", …]
 *
 * GTM saw the conversion. GA4 never did, and Google Ads had nothing to
 * import. The campaign was live and spending at the time.
 *
 * WHY POLLING RATHER THAN OUR OWN STUB
 *
 * Defining a gtag stub here would make the call succeed, but the event
 * would be queued *ahead* of `config` — and an event with no configured
 * destination is discarded. The inline ga-init script defines gtag and
 * queues `config` in the same synchronous block, so waiting for
 * `typeof window.gtag === "function"` also guarantees config is queued.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const RETRY_MS = 100;
/** 100 × 100ms. If the tag hasn't loaded in ten seconds it isn't going to. */
const MAX_TRIES = 100;

export function gtagEvent(name: string, params: Record<string, unknown>): void {
  const send = () => {
    if (typeof window.gtag !== "function") return false;
    window.gtag("event", name, params);
    return true;
  };

  if (send()) return;

  let tries = 0;
  const timer = setInterval(() => {
    if (send() || ++tries >= MAX_TRIES) clearInterval(timer);
  }, RETRY_MS);
}
