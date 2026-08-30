import { PageHeader } from "@/components/PageHeader";
import { RiseFinderSubscribe } from "@/components/RiseFinderSubscribe";
import { RiseFinderMethod } from "@/components/RiseFinderMethod";
import {
  RiseFinderExplorer,
  type ExplorerSource,
} from "@/components/RiseFinderExplorer";
import {
  RiseFinderFunding,
  type FundingWindow,
} from "@/components/RiseFinderFunding";
import { RiseFinderArchive } from "@/components/RiseFinderArchive";
import { pageMetadata } from "@/lib/seo";
import data from "@/content/data/risefinder.json";
import archive from "@/content/data/risefinder-archive.json";
import { formatBriefingDay } from "@/lib/risefinder";

/**
 * RiseFinder — what is rising, by source and window.
 *
 * PUBLIC AS OF THIS CHANGE. It spent its first month unlisted on purpose:
 * noindex, disallowed in robots.txt, absent from the sitemap, linked from
 * nowhere. That was the right posture while the only thing on it was a
 * hand-written shortlist of a dozen entries. It is now in the masthead, in the
 * sitemap and indexable, and all three had to move together — a page linked
 * from every header and then blocked in robots.txt is the configuration that
 * produces "Indexed, though blocked by robots.txt" in Search Console.
 *
 * THE BRIEFING IS GONE. The page used to open with a judged shortlist: the
 * things that cleared a bar of two unrelated sources agreeing, each with a
 * written explanation of why it mattered. It read well and it was the weakest
 * thing here. On a normal day it published two entries out of twelve thousand
 * scored, the cut was one person's judgement on one morning, and on the days
 * nobody wrote anything the page had to explain its own silence. What is left
 * is every measured mover, filterable, with the corroboration count carried
 * down onto the rows so the good idea in the briefing survives the format.
 *
 * CONTENT COMES FROM A DATA FILE, not from the RiseFinder database. The
 * pipeline runs on a laptop against local SQLite; the site is a static build.
 * `scripts/export_web.py` in the RiseFinder project writes
 * content/data/risefinder.json, and a deploy publishes whatever that file last
 * said. So the update loop is: run the pipeline, export, commit, push.
 *
 * NO SCORES ON THIS PAGE. Numbers that do not change what a reader does next
 * stay in the diagnostic report, which is not deployed.
 */

export const metadata = pageMetadata({
  title: "RiseFinder — what is rising, before it is obvious",
  description:
    "A daily scan of public data sources for the fastest-rising websites, repositories, apps, packages and marketplace plugins. Filter by source and by window, with the measured change behind every row.",
  path: "/risefinder",
});

export default async function RiseFinderPage({
  searchParams,
}: {
  searchParams: Promise<{ subscribed?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { stats, data_through } = data;
  const explorer = (data.explorer ?? []) as ExplorerSource[];

  // Counted from the data rather than written into the prose. Every number in
  // a sentence on this page has been wrong at least once by being typed.
  const moving = explorer.reduce(
    (a, s) => a + (s.windows.find((w) => w.window === "1d")?.items.length ?? 0),
    0,
  );
  const live = explorer.filter((s) => s.windows.some((w) => w.items.length > 0))
    .length;
  // Money disclosed in the last 30 days, for the header. The one figure on
  // this page that is denominated in dollars rather than in attention.
  const funded =
    (data.funding ?? []).find((w) => w.window === "30d")?.total ?? 0;

  return (
    <>
      <PageHeader
        current="RiseFinder"
        title="RiseFinder"
        lede={
          <>
            {/* Counted, never written out. This read "twelve public data
                sources" — true when the sentence was written, and still saying
                twelve after nine more were added. A number in prose ages
                silently; one read from the data cannot. */}
            A daily scan of {stats.sources_live} public data sources for things
            that are <b>rising before they are obvious</b>. Websites,
            repositories, apps, packages and marketplace plugins, each with the
            measured change behind it. Filter by source and by window — nothing
            below has been shortlisted, and where more than one unrelated source
            has the same thing moving, the page says so.
          </>
        }
        meta={[
          { label: "Data through", value: formatBriefingDay(data_through) },
          { label: "Sources live", value: String(stats.sources_live) },
          // WHAT THE FILTER ACTUALLY COSTS, in the header where a visitor
          // decides whether to keep reading.
          {
            label: "Measured yesterday",
            value: (
              (stats as { scored_on_briefing_day?: number })
                .scored_on_briefing_day ?? 0
            ).toLocaleString("en-GB"),
          },
          { label: "Moving today", value: String(moving) },
          { label: "Sources reporting", value: String(live) },
          {
            label: "Funding disclosed, 30d",
            value: `$${(funded / 1_000_000_000).toFixed(1)}bn`,
          },
        ]}
      />

      {params.subscribed && (
        <div className="px-4 sm:px-9 py-4 bg-ink text-paper font-mono text-mono uppercase tracking-[0.08em]">
          Subscribed. The briefing will start arriving each morning.
        </div>
      )}
      {params.error && (
        <div className="px-4 sm:px-9 py-4 bg-paper-2 border-y border-rule-2 font-mono text-mono uppercase tracking-[0.08em] text-red">
          {params.error === "email"
            ? "That address did not look valid. Try again."
            : "Something went wrong storing it. Try again shortly."}
        </div>
      )}

      <RiseFinderExplorer sources={explorer} dataThrough={data_through} />

      <RiseFinderFunding windows={(data.funding ?? []) as FundingWindow[]} />

      <RiseFinderSubscribe />

      <RiseFinderMethod num="03" />

      {archive.days.length > 0 && (
        <>
          {/* THE RETIRED BRIEFING, DEMOTED BUT NOT DELETED.
              
              It had a numbered section of its own, which gave a product that no
              longer exists the same billing as the two that do. It now sits
              below the method, unnumbered, as what it is: a record.

              NOT REMOVED, and the filter above is not a replacement for it.
              That answers "what moved between two dates" from stored numbers.
              These are 73 entries of written interpretation across 27 dated
              pages — roughly eight thousand words that no query reproduces, and
              the only evidence of what this system called early. All 27 are
              indexed and in the sitemap, so deleting them would also be
              deleting 27 live URLs. Every one is still linked from here, which
              is what stops them becoming orphans. */}
          <div className="px-4 sm:px-9 pt-10 pb-2 max-w-4xl">
            <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
              Archive · the daily briefing, {archive.days.length} days
            </div>
            <p className="text-body text-ink-2">
              Through August this page led with a written shortlist: the few
              things each day that two unrelated sources agreed were moving,
              each with an explanation. It is no longer produced — the cut was
              too small and rested too much on one reading — but the days it
              covered are kept here as they were written.
            </p>
          </div>
          {/* A CALENDAR, NOT A GRID OF TILES. Twenty-seven days is a pleasant
              row; three years is a thousand tiles and a page with no end. The
              data is one entry per day and mostly empty days, which is what a
              calendar already is, and it stays the same size however long this
              runs. */}
          <RiseFinderArchive days={archive.days} />
        </>
      )}

      <div className="px-4 sm:px-9 pb-12 font-mono text-micro uppercase tracking-[0.08em] text-ink-3">
        Data through {formatBriefingDay(data_through)} · {stats.days_collected}{" "}
        days collected
      </div>
    </>
  );
}
