import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { RiseFinderList, type Item } from "@/components/RiseFinderList";
import { RiseFinderSubscribe } from "@/components/RiseFinderSubscribe";
import { RiseFinderWindows, type WindowBlock } from "@/components/RiseFinderWindows";
import { pageMetadata } from "@/lib/seo";
import data from "@/content/data/risefinder.json";
import archive from "@/content/data/risefinder-archive.json";
import { formatBriefingDay } from "@/lib/risefinder";

/**
 * RiseFinder — the daily breakout briefing.
 *
 * UNLISTED BY DESIGN. Nothing links here: not the masthead, not the footer,
 * not the sitemap, and robots.ts disallows the path. It is reachable only by
 * typing the URL. `noindex` is the part that actually enforces that — without
 * it a crawler that discovers the path from a referrer header or a shared link
 * would put it in search results, and "no button" would stop meaning "not
 * public".
 *
 * CONTENT COMES FROM A DATA FILE, not from the RiseFinder database. The
 * pipeline runs on a laptop against local SQLite; the site is a static build.
 * `scripts/export_web.py` in the RiseFinder project writes
 * content/data/risefinder.json, and a deploy publishes whatever that file last
 * said. So the update loop is: run the pipeline, export, commit, push.
 *
 * NO SCORES ON THIS PAGE. The build guide is explicit that "the brief is the
 * product. Not the score. The explanation." Numbers that do not change what a
 * reader does next stay in the diagnostic report, which is not deployed.
 */

export const metadata = pageMetadata({
  title: "RiseFinder",
  description:
    "A daily briefing on things that are rising before they are obvious — repos, apps, packages and domains, each with the evidence and a short explanation of what is happening.",
  path: "/risefinder",
  noindex: true,
});

export default async function RiseFinderPage({
  searchParams,
}: {
  searchParams: Promise<{ subscribed?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { items, stats, data_through } = data;
  const past = archive.days.filter((d) => d.date !== archive.days[0]?.date);

  return (
    <>
      <PageHeader
        current="RiseFinder"
        title="RiseFinder"
        lede={
          <>
            A daily scan of twelve public data sources for things that are{" "}
            <b>rising before they are obvious</b>. Every entry below was seen
            moving by at least two unrelated collectors on the same day — any
            single signal can be bought, so agreement between independent
            sources is the thing worth reading.
          </>
        }
        meta={[
          { label: "Data through", value: formatBriefingDay(data_through) },
          { label: "Sources live", value: String(stats.sources_live) },
          { label: "Days collected", value: String(stats.days_collected) },
          {
            label: "Measurements",
            value: stats.snapshots.toLocaleString("en-GB"),
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
            ? "That address did not look valid — try again."
            : "Something went wrong storing it. Try again shortly."}
        </div>
      )}

      <SectionBand
        num="01"
        label="Today's briefing"
        meta={`${items.length} entries`}
      />

      <RiseFinderList items={items as Item[]} />

      <RiseFinderWindows windows={(data.windows ?? []) as WindowBlock[]} />

      <RiseFinderSubscribe />

      {past.length > 0 && (
        <>
          <SectionBand
            num="04"
            label="Previous briefings"
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

      <SectionBand num="05" label="How to read this" meta="Method" />

      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <div className="text-body text-ink-2 space-y-4">
          <p>
            Every number here is a <b>rate of change</b>, never a total. Size is
            not news: the largest repository on GitHub is not rising, it has
            arrived. What the system looks for is movement, and specifically
            movement that more than one unrelated source noticed at the same
            time.
          </p>
          <p>
            That second condition is the whole method. Stars can be bought,
            backlinks can be built, app installs can be farmed — this project
            has already caught a 161-domain network manufacturing exactly the
            signal one of its sources measures. Faking two unrelated signals
            simultaneously is a different order of effort, so an entry confirmed
            by GitHub <i>and</i> HackerNews, or by the App Store <i>and</i>{" "}
            Google Play, is worth more than one showing a larger number in a
            single place.
          </p>
          <p>
            Sources that share data underneath do not count as two witnesses.
            Where one feed is built partly from another, they are treated as a
            single voice — otherwise a list fills up with one measurement
            agreeing with itself.
          </p>
          <p>
            Entries are written to be read, not scanned. Where something looks
            impressive but is not, the entry says so.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-9 pb-12 font-mono text-micro uppercase tracking-[0.08em] text-ink-3">
        Data through {formatBriefingDay(data_through)} ·{" "}
        {stats.days_collected} days collected
      </div>
    </>
  );
}
