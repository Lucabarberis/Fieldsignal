import { SectionBand } from "@/components/SectionBand";
import { formatBriefingDay } from "@/lib/risefinder";

/**
 * Raw risers per source, over fixed windows.
 *
 * A DIFFERENT PRODUCT FROM THE BRIEFING ABOVE IT, and deliberately so. The
 * briefing is judged, written and requires two independent sources to agree —
 * which makes it short, careful, and slow to react. This is the opposite: one
 * source, no judgement, no corroboration, just the biggest movers in a single
 * ranking over seven or thirty days.
 *
 * IT IS COMPUTED OVER THE WHOLE LIST. Majestic publishes a million domains a
 * day and the pipeline used to keep the top 500, so every window downstream
 * described our cache rather than the web. These numbers come from a stored
 * rank index of all 1,000,000 rows per day, which is why a domain can appear
 * here having never been "tracked" — it does not need to have interested us
 * before.
 *
 * AN UNCOVERED WINDOW RENDERS AS A COUNT OF MISSING DAYS, not as a shorter
 * window with a longer label. Thirty-day risers computed over six days is a
 * different claim wearing the same words, and the whole page rests on not
 * doing that sort of thing.
 */

export type WindowBlock = {
  source: string;
  label: string;
  window: string;
  window_days: number;
  have_days: number;
  need_days: number;
  first_day: string | null;
  items: {
    // Universe blocks carry a domain and a rank; per-source blocks carry a name
    // and a raw metric. One shape with both halves optional keeps a single
    // component rather than two that must be kept in step.
    domain?: string;
    rank?: number;
    name?: string;
    unit?: string;
    now?: number;
    was: number;
    gain_pct: number;
    from_day: string;
    to_day: string;
  }[];
};

function daysLeft(b: WindowBlock) {
  return Math.max(b.need_days - b.have_days, 0);
}

export function RiseFinderWindows({
  windows,
  tracked = [],
}: {
  windows: WindowBlock[];
  tracked?: WindowBlock[];
}) {
  if (!windows.length && !tracked.length) return null;

  // Sources whose window has opened get a table; the rest are summarised in one
  // line each. Eleven sources times two windows is twenty-two boxes, and
  // twenty-two empty boxes reads as a broken feature rather than a waiting one.
  const trackedReady = tracked.filter((t) => t.items.length > 0);
  const trackedWaiting = tracked.filter((t) => t.items.length === 0);
  // Only count windows genuinely waiting on days. OpenPageRank carries a
  // backfilled history running to 2018, so its "days remaining" is zero even
  // though it returns nothing — its baseline is monthly and gets rejected as
  // too stale for a 7-day comparison. Including it dragged the minimum to zero
  // and made the sentence read "opens in 0 days" while nothing was there.
  const pending = trackedWaiting.map(daysLeft).filter((d) => d > 0);
  const soonest = pending.length ? Math.min(...pending) : null;

  return (
    <>
      <SectionBand
        num="03"
        label="Raw risers by source"
        meta="Whole list, no judgement"
      />

      <div className="px-4 sm:px-9 py-6 max-w-4xl">
        <p className="text-body text-ink-2">
          The briefing above is filtered, judged and requires two unrelated
          sources to agree. This is the unfiltered view: the biggest rank
          improvements in <b>one source at a time</b>, computed across all{" "}
          <b>1,000,000</b> rows of that list rather than the few thousand the
          rest of the system tracks. Nothing here has been checked by a human.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule">
        {windows.map((b) => (
          <section key={`${b.source}-${b.window}`} className="bg-paper">
            <div className="px-5 sm:px-7 py-4 border-b border-rule flex items-baseline justify-between gap-3 flex-wrap">
              <span className="font-mono text-[13px] font-semibold tracking-[0.06em] text-ink">
                {b.label}
              </span>
              <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                {b.window} · {b.window_days}d
              </span>
            </div>

            {b.items.length === 0 ? (
              <div className="px-5 sm:px-7 py-6">
                <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
                  Not enough history yet
                </div>
                <p className="text-body text-ink-2">
                  A {b.window_days}-day window needs {b.window_days} days of
                  stored rankings.{" "}
                  {b.first_day ? (
                    <>
                      Collection of the full list began{" "}
                      {formatBriefingDay(b.first_day)}, so this opens in{" "}
                      <b>{daysLeft(b)} more days</b>.
                    </>
                  ) : (
                    <>Nothing stored for this source yet.</>
                  )}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[420px]">
                  <thead>
                    <tr className="border-b border-rule">
                      <th className="text-left px-5 sm:px-7 py-2.5 font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                        Domain
                      </th>
                      <th className="text-right px-3 py-2.5 font-mono text-micro uppercase tracking-[0.12em] text-ink-3 whitespace-nowrap">
                        Rank
                      </th>
                      <th className="text-right px-5 sm:px-7 py-2.5 font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                        Gain
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {b.items.map((r) => (
                      <tr key={r.domain} className="border-b border-rule">
                        <td className="px-5 sm:px-7 py-2.5 font-mono text-mono text-ink break-all">
                          <a
                            href={`https://${r.domain ?? ""}`}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="hover:text-red transition-colors"
                          >
                            {r.domain}
                          </a>
                        </td>
                        <td className="px-3 py-2.5 font-mono text-mono text-ink-2 text-right whitespace-nowrap">
                          {r.was.toLocaleString("en-GB")} →{" "}
                          <b className="text-ink">
                            {(r.rank ?? 0).toLocaleString("en-GB")}
                          </b>
                        </td>
                        <td className="px-5 sm:px-7 py-2.5 font-mono text-mono text-red text-right whitespace-nowrap">
                          +{r.gain_pct}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      {(trackedReady.length > 0 || trackedWaiting.length > 0) && (
        <>
          <div className="px-4 sm:px-9 pt-8 pb-4 max-w-4xl">
            <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
              The other sources
            </div>
            <p className="text-body text-ink-2">
              Only Majestic and Tranco publish a ranked list of everything.
              GitHub returns repositories matching a search, HackerNews returns
              a front page. There is no <i>every repository</i> file to
              download. So a window over these covers{" "}
              <b>what has been watched</b>, not what exists. A weaker claim, and
              worth stating rather than blurring.
            </p>
          </div>

          {trackedReady.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule">
              {trackedReady.map((b) => (
                <section key={`${b.source}-${b.window}`} className="bg-paper">
                  <div className="px-5 sm:px-7 py-4 border-b border-rule flex items-baseline justify-between gap-3 flex-wrap">
                    <span className="font-mono text-[13px] font-semibold tracking-[0.06em] text-ink">
                      {b.label}
                    </span>
                    <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                      {b.window} · {b.window_days}d
                    </span>
                  </div>
                  <div className="divide-y divide-rule">
                    {b.items.map((r) => (
                      <div key={r.name} className="px-5 sm:px-7 py-3">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-mono text-mono text-ink break-all">
                            {r.name}
                          </span>
                          <span className="font-mono text-mono text-red whitespace-nowrap">
                            +{r.gain_pct}%
                          </span>
                        </div>
                        <div className="font-mono text-micro text-ink-3 mt-1">
                          {r.was} → {r.now} {r.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {trackedWaiting.length > 0 && (
            <div className="px-4 sm:px-9 py-4 border-y border-rule font-mono text-micro text-ink-3 tracking-[0.04em] leading-relaxed">
              {trackedWaiting.length} more source windows are still filling up
              {soonest !== null && soonest > 0 && (
                <>, and the first opens in <b className="text-ink">{soonest} days</b></>
              )}
              . Each needs its own full window of daily readings before it can
              say anything.
            </div>
          )}
        </>
      )}

      <div className="px-4 sm:px-9 py-4 font-mono text-micro text-ink-3 tracking-[0.04em] border-b border-rule leading-relaxed">
        Domains re-entering the list from beyond rank 800,000 are excluded. A list
        that ends at a million drops and re-admits the same borderline domains
        constantly, and re-entry reads as an enormous climb without anything
        having happened.
      </div>
    </>
  );
}
