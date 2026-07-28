/**
 * Which channel paid for a lead.
 *
 * Its own module, with no framework or database imports, so it can be
 * exercised directly by a test rather than only through a live form
 * submission. Getting this wrong is expensive and silent: the first
 * version inferred the channel from the landing-page slug alone, which
 * would have filed every Meta lead under Google Ads and made the two
 * channels impossible to compare — the exact number the ad test exists
 * to produce.
 *
 * Order of authority:
 *   1. Click IDs. Google and Meta append these themselves and they cannot
 *      be faked by a mistyped tracking template.
 *   2. utm_source, which a human configures and can therefore get wrong.
 *   3. The landing-page slug, which only settles the case where a /lp/
 *      page was reached with no tracking at all — in practice, someone
 *      typing the URL or a link shared by hand.
 */

export type Channel = "organic" | "google-ads" | "meta-ads";

/** utm_source values Meta traffic arrives with, depending on who set it up. */
const META_SOURCES = ["facebook", "meta", "instagram", "fb", "ig"];

export function channelFor(
  tracking: Record<string, string>,
  landingPageSlug: string,
): Channel {
  if (tracking.gclid) return "google-ads";
  if (tracking.fbclid) return "meta-ads";

  const src = (tracking.utm_source ?? "").toLowerCase().trim();
  if (src === "google") return "google-ads";
  if (META_SOURCES.includes(src)) return "meta-ads";

  return landingPageSlug ? "google-ads" : "organic";
}
