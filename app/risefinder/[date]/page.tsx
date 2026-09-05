import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { RiseFinderList, type Item } from "@/components/RiseFinderList";
import { RiseFinderSubscribe } from "@/components/RiseFinderSubscribe";
import { RiseFinderMethod } from "@/components/RiseFinderMethod";
import { pageMetadata } from "@/lib/seo";
import archive from "@/content/data/risefinder-archive.json";
import { formatBriefingDay } from "@/lib/risefinder";

/**
 * An archived briefing.
 *
 * WHY AN ARCHIVE AND NOT A DATE PICKER. A picker implies browsing, and nobody
 * browses a daily briefing — they read today's and, if they are deciding
 * whether to trust it, they check whether last week's held up. A list of dates
 * serves that directly and needs no interaction to understand. It also degrades
 * honestly: with three days archived a picker looks broken, a list just looks
 * short.
 *
 * Every archived day is prerendered from the same data file the live page uses,
 * and unknown dates 404 rather than rendering an empty shell.
 */

export function generateStaticParams() {
  return archive.days.map((d) => ({ date: d.date }));
}

/** Unknown dates 404 rather than rendering an empty page. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  return pageMetadata({
    title: `RiseFinder · ${formatBriefingDay(date)}`,
    description: `The RiseFinder breakout briefing for ${formatBriefingDay(date)}: what was rising that day, with the evidence and a short explanation for each entry.`,
    path: `/risefinder/${date}`,
    // Indexable with the rest of RiseFinder. These are dated pages of written
    // entries that never change again, which is the one thing on this site
    // closest to an archive of original research.
  });
}

export default async function ArchivedBriefingPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const day = archive.days.find((d) => d.date === date);
  if (!day) notFound();

  const index = archive.days.findIndex((d) => d.date === date);
  const newer = index > 0 ? archive.days[index - 1] : null;
  const older =
    index < archive.days.length - 1 ? archive.days[index + 1] : null;

  const tracked = day.items.filter((i) => i.track);
  const past = archive.days.filter((d) => d.date !== date);

  return (
    <>
      <PageHeader
        current={formatBriefingDay(date)}
        parent={{ label: "RiseFinder", href: "/risefinder" }}
        title={formatBriefingDay(date)}
        lede={
          <>
            The briefing as it was published on this date. Every entry was seen
            moving by at least two unrelated collectors that day. Where a
            follow-up exists, it shows what has happened since.
          </>
        }
        meta={[
          { label: "Entries", value: String(day.count) },
          { label: "With follow-up", value: String(tracked.length) },
        ]}
      />

      <div className="px-4 sm:px-9 py-4 border-b border-rule flex flex-wrap gap-6 font-mono text-micro uppercase tracking-[0.12em]">
        <Link href="/risefinder" className="text-ink hover:text-red transition-colors">
          ← Latest briefing
        </Link>
        {newer && (
          <Link
            href={`/risefinder/${newer.date}`}
            className="text-ink-2 hover:text-ink transition-colors"
          >
            Newer: {formatBriefingDay(newer.date)}
          </Link>
        )}
        {older && (
          <Link
            href={`/risefinder/${older.date}`}
            className="text-ink-2 hover:text-ink transition-colors"
          >
            Older: {formatBriefingDay(older.date)}
          </Link>
        )}
      </div>

      <SectionBand
        num="01"
        label={`Briefing · ${formatBriefingDay(date)}`}
        meta={`${day.count} entries`}
      />

      <RiseFinderList items={day.items as Item[]} />

      {/* An archived day used to end here, with nothing below the list.
          Archived pages are the ones people share, so that left a reader
          arriving from a link with percentages and no explanation of what
          corroboration means or why every figure is a rate, and no way on to
          any other day except the Newer and Older links at the top.

          Raw risers by source is still deliberately absent. Those windows are
          computed from the current data rather than stored per day, so putting
          them under a heading dated 13 August would show today's numbers as
          that day's, which is the mistake the rest of this page exists to
          avoid. */}
      <RiseFinderSubscribe num="02" />

      {past.length > 0 && (
        <>
          <SectionBand
            num="03"
            label="Other briefings"
            meta={`${past.length} archived`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
            {past.map((d) => (
              <Link
                key={d.date}
                href={`/risefinder/${d.date}`}
                className="bg-paper px-7 py-6 hover:bg-paper-3 transition-colors"
              >
                <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
                  {d.count} {d.count === 1 ? "entry" : "entries"}
                </div>
                <div className="font-mono text-[14px] font-semibold tracking-[0.06em] text-ink">
                  {formatBriefingDay(d.date)} →
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <RiseFinderMethod num="04" />
    </>
  );
}
