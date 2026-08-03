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
    domain: string;
    rank: number;
    was: number;
    gain_pct: number;
    from_day: string;
    to_day: string;
  }[];
};

function daysLeft(b: WindowBlock) {
  return Math.max(b.need_days - b.have_days, 0);
}

export function RiseFinderWindows({ windows }: { windows: WindowBlock[] }) {
  if (!windows.length) return null;

  return (
    <>
      <SectionBand
        num="02"
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
                            href={`https://${r.domain}`}
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
                            {r.rank.toLocaleString("en-GB")}
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

      <div className="px-4 sm:px-9 py-4 font-mono text-micro text-ink-3 tracking-[0.04em] border-b border-rule leading-relaxed">
        Domains re-entering the list from beyond rank 800,000 are excluded — a
        list that ends at a million drops and re-admits the same borderline
        domains constantly, and re-entry reads as an enormous climb without
        anything having happened.
      </div>
    </>
  );
}
