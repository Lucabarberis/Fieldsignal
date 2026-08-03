/**
 * Shared helpers for the RiseFinder pages.
 *
 * Dates are formatted in UTC on purpose. A briefing is stamped with the day the
 * pipeline ran, which is a UTC date with no time attached — parsing it in the
 * viewer's zone would show "1 August" to anyone west of Greenwich and quietly
 * make the archive disagree with itself.
 */

/**
 * The topic every RiseFinder signup is stored under.
 *
 * Subscribers share the `leads` table with contact-form enquiries, so this
 * string is the only thing separating them. It is defined once here and used
 * by the API route that writes it, the leads page that excludes it, and the
 * subscribers page that selects on it — three places that must agree, and
 * would silently stop agreeing if each spelled it out for itself.
 */
export const SUBSCRIBER_TOPIC = "risefinder";

/** True for a RiseFinder signup rather than a sales enquiry. */
export function isSubscriber(lead: { topic: string | null }): boolean {
  return lead.topic === SUBSCRIBER_TOPIC;
}

export function formatBriefingDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
