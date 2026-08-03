import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { RiseFinderList, type Item } from "@/components/RiseFinderList";
import { RiseFinderSubscribe } from "@/components/RiseFinderSubscribe";
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

  // Track record across the whole archive, not just today — it has to be
  // computed from every entry ever published rather than the twelve on screen,
  // or it would move every morning for reasons unrelated to accuracy.
  //
  // DEDUPED BY NAME, and that is not cosmetic. An entry written about on three
  // consecutive days appears three times in the archive with the same follow-up
  // attached, so counting rows would have reported 33 tracked entries when
  // there were 12 — and turbo-fieldfare's +75% three times over.
  const seenNames = new Set<string>();
  const tracked = archive.days
    .flatMap((d) => d.items)
    .filter((i) => {
      if (!i.track || seenNames.has(i.name)) return false;
      seenNames.add(i.name);
      return true;
    })
    .map((i) => i.track!);

  // MEDIAN, NOT "HOW MANY WENT UP". The obvious statistic — "13 of 16 kept
  // growing" — is almost worthless here, because the headline metrics are
  // CUMULATIVE counters. Measured across this database, star counts fall on
  // 4.1% of days and rating counts on 6.6%; they physically cannot go down
  // much. A near-100% success rate on a test almost nothing can fail reads as
  // a boast and means nothing.
  //
  // The median gain is the honest number: half the entries did better than
  // this, half worse, and it cannot be flattered by one outlier the way a
  // maximum can. The maximum is still shown, clearly labelled as the best
  // single case rather than as typical.
  const gains = tracked.map((t) => t.change_pct).sort((a, b) => a - b);
  const median = gains.length
    ? gains.length % 2
      ? gains[(gains.length - 1) / 2]
      : (gains[gains.length / 2 - 1] + gains[gains.length / 2]) / 2
    : 0;

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

      {/* THE TRACK RECORD. A prediction product is worth nothing until it can
          show it was early BEFORE. This strip is the only claim on the page a
          competitor cannot copy next week, because it needs the history this
          project has been accumulating day by day. */}
      {tracked.length > 0 && (
        <>
          <SectionBand
            num="01"
            label="What happened after we flagged it"
            meta={`${tracked.length} tracked`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule">
            <div className="bg-paper-2 px-7 py-6">
              <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
                Entries with a follow-up
              </div>
              <div className="font-sans text-[32px] leading-none text-ink">
                {tracked.length}
              </div>
            </div>
            <div className="bg-paper-2 px-7 py-6">
              <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
                Typical gain since flagging
              </div>
              <div className="font-sans text-[32px] leading-none text-ink">
                +{median.toFixed(1)}%
                <span className="text-ink-3 text-[20px]"> median</span>
              </div>
            </div>
            <div className="bg-paper-2 px-7 py-6">
              <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
                Best single case
              </div>
              <div className="font-sans text-[32px] leading-none text-ink">
                +{Math.round(gains[gains.length - 1])}%
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-9 py-4 font-mono text-micro text-ink-3 tracking-[0.04em] border-b border-rule leading-relaxed">
            Measured from the day an entry first appeared here to today, on the
            headline number for its kind — stars for a repository, downloads for
            a package, ratings for an app. Entries flagged this morning have
            nothing to measure yet and are excluded. The median is shown rather
            than a success rate because these are cumulative counters: they
            rarely fall, so &ldquo;how many went up&rdquo; would be close to
            100% however well or badly the picks were chosen.
          </div>
        </>
      )}

      <SectionBand
        num="02"
        label="Today's briefing"
        meta={`${items.length} entries`}
      />

      <RiseFinderList items={items as Item[]} />

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
