/**
 * Shared helpers for the RiseFinder pages.
 *
 * Dates are formatted in UTC on purpose. A briefing is stamped with the day the
 * pipeline ran, which is a UTC date with no time attached — parsing it in the
 * viewer's zone would show "1 August" to anyone west of Greenwich and quietly
 * make the archive disagree with itself.
 */

export function formatBriefingDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
