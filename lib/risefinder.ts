/**
 * What is left of RiseFinder on this site.
 *
 * RiseFinder MOVED TO risefinder.co on 8 September 2026 — the page, the
 * components, the archive and the API all went with it. Two things could not,
 * because they are not about the page at all:
 *
 *   SUBSCRIBER_TOPIC / isSubscriber
 *
 * Briefing subscribers have landed in THIS site's `leads` table since the first
 * signup, tagged with this topic, and the new site still writes them here. The
 * admin views at /admin/leads and /admin/risefinder read them back, so the tag
 * has to be defined somewhere both ends agree on.
 *
 * MOVING THE LIST IS A SEPARATE JOB with its own cutover. Doing it during the
 * domain move would have split it across two databases with no way to tell
 * which half is which. When it happens, this file goes with it.
 *
 * `formatBriefingDay` and `entityUrl` used to live here and were deleted with
 * the page — they now exist only in the risefinder-site repo, which is the
 * only place anything renders a briefing.
 */

/** Marks a lead as a RiseFinder briefing subscriber rather than an enquiry. */
export const SUBSCRIBER_TOPIC = "risefinder";

export function isSubscriber(lead: { topic: string | null }): boolean {
  return lead.topic === SUBSCRIBER_TOPIC;
}
