"use client";

import { useState } from "react";
import { SectionBand } from "@/components/SectionBand";

/**
 * Disclosed funding rounds, from SEC Form D filings.
 *
 * NOT A RISER, AND DELIBERATELY NOT DRESSED AS ONE. Every row in the section
 * above is a gain between two readings — stars went 25 to 51. A funding round
 * has no "before": it is an event with a date and an amount, and giving it a
 * percentage would invent a number nobody filed. So it gets its own section,
 * its own sort (size of round) and no growth figure anywhere.
 *
 * WHY IT IS THE STRONGEST THING ON THE PAGE. Every other source counts
 * attention: stars given, packages downloaded, reviews left, charts ranked. All
 * of it is people looking, and most of it can be bought. A Form D is a company
 * telling the United States government that it sold securities, filed within 15
 * days of the sale under penalty of perjury. Nobody manufactures one.
 *
 * It is also early. Crunchbase reads these same filings; reading them directly
 * means seeing a round when the SEC does rather than when an aggregator gets
 * round to publishing it.
 */

export type FundingItem = {
  key: string;
  name: string;
  url: string | null;
  raised: number;
  /** The full offering. Null where the filing did not state one. */
  target: number | null;
  closed_pct: number | null;
  description: string | null;
  day: string;
};

export type FundingWindow = {
  window: string;
  days: number;
  count: number;
  total: number;
  items: FundingItem[];
};

const WINDOWS = [
  { key: "1d", label: "1 day" },
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
];

/** "$4.99bn", "$382m", "$905k" — a table of full figures is unreadable. */
function money(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}bn`;
  if (n >= 1_000_000) return `$${Math.round(n / 1_000_000)}m`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${n}`;
}

function shortDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function RiseFinderFunding({ windows }: { windows: FundingWindow[] }) {
  const [win, setWin] = useState("7d");
  const block = windows.find((w) => w.window === win);
  if (!windows.length) return null;

  return (
    <>
      <SectionBand
        num="02"
        label="Funding disclosed"
        meta={
          block
            ? `${block.count} rounds · ${money(block.total)}`
            : "Disclosed rounds"
        }
      />

      <div className="px-4 sm:px-9 py-6 max-w-4xl">
        <p className="text-body text-ink-2">
          Every other section counts attention. This one counts money. These are
          rounds a company has formally disclosed as sold, within fifteen days
          of the sale, so they have actually closed or are closing rather than
          being rounds somebody announced. Amounts are the company&rsquo;s own
          figures.
        </p>
      </div>

      <div className="px-4 sm:px-9 py-4 border-y border-rule flex flex-wrap items-center gap-2">
        <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mr-1">
          Filed within
        </span>
        {WINDOWS.map((w) => {
          const b = windows.find((x) => x.window === w.key);
          const active = win === w.key;
          return (
            <button
              key={w.key}
              type="button"
              onClick={() => setWin(w.key)}
              aria-pressed={active}
              className={[
                "font-mono text-micro uppercase tracking-[0.12em] px-3 py-2 border transition-colors",
                active
                  ? "bg-red text-paper border-red"
                  : "border-rule-2 text-ink-2 hover:text-ink hover:border-ink",
              ].join(" ")}
            >
              {w.label} <span className="opacity-60">{b?.count ?? 0}</span>
            </button>
          );
        })}
      </div>

      {!block || block.items.length === 0 ? (
        <div className="px-4 sm:px-9 py-10 font-mono text-mono uppercase text-ink-3">
          No disclosed rounds cleared the size floor in this window.
        </div>
      ) : (
        <div className="divide-y divide-rule border-b border-rule">
          {block.items.map((item, i) => (
            <article
              key={`${item.key}-${item.day}`}
              className="px-4 sm:px-9 py-4 flex flex-wrap items-baseline gap-x-4 gap-y-1"
            >
              <span className="font-mono text-mono text-red font-semibold opacity-[0.78] w-7 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="font-mono text-[14px] font-semibold tracking-[0.06em] text-ink flex-1 min-w-[14rem]">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="hover:text-red transition-colors"
                  >
                    {item.name} <span aria-hidden>↗</span>
                  </a>
                ) : (
                  item.name
                )}
              </span>

              <span className="font-mono text-[15px] font-semibold text-ink whitespace-nowrap">
                {money(item.raised)}
              </span>

              {/* THE SHARE OF THE ROUND THAT IS DONE. A closed round and one
                  still taking money are different events, and the ratio is the
                  only thing on the row that says which. Omitted rather than
                  guessed where the filing stated no total. */}
              <span className="font-mono text-micro tracking-[0.04em] text-ink-2 whitespace-nowrap">
                {item.target ? (
                  <>
                    of {money(item.target)}
                    {item.closed_pct != null && (
                      <>
                        {" · "}
                        <b
                          className={
                            item.closed_pct >= 99 ? "text-ink" : "text-ink-3"
                          }
                        >
                          {item.closed_pct >= 99
                            ? "fully closed"
                            : `${item.closed_pct}% closed`}
                        </b>
                      </>
                    )}
                  </>
                ) : (
                  "total not stated"
                )}
              </span>

              <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 whitespace-nowrap">
                {shortDay(item.day)}
              </span>

              {/* A COMPANY NOBODY HAS HEARD OF IS THE POINT OF THIS SECTION,
                  and its name alone says nothing. "Sylvan Labs, Inc." raising
                  eleven million is only useful once you know what it does. */}
              {item.description && (
                <p className="text-body text-ink-2 basis-full mt-1">
                  {item.description}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      <div className="px-4 sm:px-9 py-4 font-mono text-micro text-ink-3 tracking-[0.04em] border-b border-rule leading-relaxed">
        Funds raising their own capital, real-estate vehicles and single-deal
        SPVs are filtered out. They are two thirds of the daily list and none of
        them is a company growing. The disclosure gives the amount and the date.
        It does not name the investors, so no lead is claimed here.
      </div>
    </>
  );
}
