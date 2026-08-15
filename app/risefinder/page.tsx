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
    "A daily briefing on things that are rising before they are obvious. Repos, apps, packages and domains, each with the evidence and a short explanation of what is happening.",
  path: "/risefinder",
  noindex: true,
});

export default async function RiseFinderPage({
  searchParams,
}: {
  searchParams: Promise<{ subscribed?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { items, stats, data_through, briefed_through } = data;
  const stillMoving = (data as { still_moving?: unknown[] }).still_moving ?? [];
  const past = archive.days.filter((d) => d.date !== archive.days[0]?.date);

  // Collection is automatic and daily; writing a brief is not. On any day the
  // writing step is skipped, `data_through` advances and `briefed_through` does
  // not — and the heading read "Today's briefing" regardless, sitting above
  // entries judged three days earlier. The label now states the date it is
  // actually showing, so a missed day is visible rather than papered over.
  const briefedDay = briefed_through ?? data_through;

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
            that are <b>rising before they are obvious</b>. Every entry below was seen
            moving by at least two unrelated collectors on the same day. Any single
            signal can be bought, so agreement between independent sources is
            the thing worth reading.
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
            ? "That address did not look valid. Try again."
            : "Something went wrong storing it. Try again shortly."}
        </div>
      )}

      {/* ALWAYS DATED. This said "Today's briefing" with no date whenever the
          brief day matched the data day — which is true even when both are
          yesterday, because collection runs once a day and the briefing follows
          the data, not the clock. A reader in New Zealand on the 15th saw
          "Today's briefing" above 14 August's entries and reasonably asked what
          was wrong. The date is never a cost to show and repeatedly a cost to
          omit. */}
      <SectionBand
        num="01"
        label="Latest briefing"
        meta={`${items.length} entries · ${formatBriefingDay(briefedDay)}`}
      />

      <RiseFinderList items={items as Item[]} />

      {/* The days behind the latest briefing, shown AS earlier days. The
          briefing above is one day and one day only; when that day is thin,
          this carries the rest of the week without the front page pretending
          any of it happened this morning. Every card is stamped with its own
          date for the same reason. */}
      {stillMoving.length > 0 && (
        <>
          <SectionBand
            num="02"
            label="Still moving"
            meta={`${stillMoving.length} from the previous days`}
          />
          <div className="px-4 sm:px-9 pt-6 max-w-4xl text-body text-ink-2">
            Flagged earlier in the week and still climbing. Each entry carries
            the day it was first seen moving. These are not today&rsquo;s findings,
            and the briefing above is.
          </div>
          <RiseFinderList items={stillMoving as Item[]} stampDate />
        </>
      )}

      <RiseFinderWindows
        windows={(data.windows ?? []) as WindowBlock[]}
        tracked={(data.tracked_windows ?? []) as WindowBlock[]}
      />

      <RiseFinderSubscribe />

      {past.length > 0 && (
        <>
          <SectionBand
            num="05"
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

      <SectionBand num="06" label="How to read this" meta="Method" />

      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <div className="text-body text-ink-2 space-y-4">
          <p>
            Every number here is a <b>rate of change</b>, never a total. Size is
            not news. The largest repository on GitHub is not rising, it arrived
            years ago. What this looks for is movement, and specifically
            movement that more than one unrelated source noticed on the same
            day.
          </p>
          <p>
            That second condition is the whole method. Stars can be bought,
            backlinks can be built, app installs can be farmed. This project has
            already killed 2,601 domains for sitting inside link networks, one
            of which ran to 2,046 sites and covered 98% of everything it tracked
            on .it. All of them were manufacturing the exact signal one of these
            sources measures. Faking two unrelated signals at once is far harder
            work, so a repository seen moving by GitHub <i>and</i> HackerNews,
            or an app seen by the App Store <i>and</i> Google Play, counts for
            more than a bigger number in one place.
          </p>
          <p>
            Whether two sources are genuinely independent is measured rather
            than assumed. Majestic ranks domains by backlinks and Tranco ranks
            them by traffic, and the two were treated as one voice for weeks.
            Comparing their daily movement across 83,000 domains showed no
            relationship at all, so they now count as two. Any pair that turns
            out to share data underneath gets folded back into one.
          </p>
          <p>
            Entries are written to be read rather than scanned. When the
            evidence is thin, or the story behind it does not hold up, the entry
            is left out rather than published with a caveat.
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
