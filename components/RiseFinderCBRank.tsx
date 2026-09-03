"use client";

import { useState } from "react";
import { SectionBand } from "@/components/SectionBand";

/**
 * Company rank movement over 90 days.
 *
 * READER-FACING COPY SAYS WHAT THE NUMBERS MEAN AND NOTHING ELSE. The first
 * version of this section explained its own provenance at length: that the
 * figures came from Crunchbase rather than from our own readings, that a
 * rival's answer is not evidence, that their rank is "barely populated" below a
 * threshold, and that we re-read fifty companies a week. All of that is true,
 * all of it belongs in SOURCES.md, and none of it belonged on a live commercial
 * page. It devalued the section for a paying reader by opening with whose work
 * it was not, it criticised a named company's data quality in public, and it
 * published our own collection cadence against a source whose terms do not
 * permit scraping.
 *
 * The heat score is deliberately not shown and not exported. It is a
 * proprietary model output, it is the most exposed thing we hold, and the
 * section reads the same without it. Position and the 90 day trend carry it.
 *
 * WHAT THE READER NEEDS, and all they need: the move, the position it happened
 * at, and the date it was checked. A move at position 155 and the same move at
 * position 90,000 are different events, so both numbers are on every row.
 */

export type CBRankItem = {
  key: string;
  name: string;
  url: string | null;
  description: string | null;
  /** The 90 day trend. Positive is rising. */
  delta: number;
  /** Position in the ranking. Lower is better, and it is the row's weight. */
  rank: number | null;
  /** The day this company was last checked. */
  day: string;
};

export type CBRank = {
  as_of: string;
  measured: number;
  ranked: number;
  ceiling: number;
  rising: CBRankItem[];
  falling: CBRankItem[];
};

/** "749", "21,098" — a rank is read as a position, so it keeps its separators. */
function rank(n: number) {
  return n.toLocaleString("en-GB");
}

function shortDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function RiseFinderCBRank({ data }: { data: CBRank | null }) {
  const [dir, setDir] = useState<"rising" | "falling">("rising");
  if (!data || (!data.rising.length && !data.falling.length)) return null;

  const rows = dir === "rising" ? data.rising : data.falling;
  const tabs = [
    { key: "rising" as const, label: "Rising", n: data.rising.length },
    { key: "falling" as const, label: "Falling", n: data.falling.length },
  ];

  return (
    <>
      <SectionBand
        num="03"
        label="Company rank movement"
        meta={`${data.ranked} companies · 90 day trend`}
      />

      <div className="px-4 sm:px-9 py-6 max-w-4xl">
        <p className="text-body text-ink-2">
          How far a company has climbed or slipped over the last 90 days,
          measured against every other company with an established profile. The
          position beside each row says where it stands today, and both numbers
          matter: the same move at position 155 and at position 90,000 are not
          the same event.
        </p>
        <p className="text-body text-ink-2 mt-3">
          Companies outside the top {rank(data.ceiling)} are not listed. Each
          row carries the date it was last checked.
        </p>
      </div>

      <div className="px-4 sm:px-9 py-4 border-y border-rule flex flex-wrap items-center gap-2">
        <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mr-1">
          Direction
        </span>
        {tabs.map((t) => {
          const active = dir === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setDir(t.key)}
              aria-pressed={active}
              className={[
                "font-mono text-micro uppercase tracking-[0.12em] px-3 py-2 border transition-colors",
                active
                  ? "bg-red text-paper border-red"
                  : "border-rule-2 text-ink-2 hover:text-ink hover:border-ink",
              ].join(" ")}
            >
              {t.label} <span className="opacity-60">{t.n}</span>
            </button>
          );
        })}
      </div>

      <div className="divide-y divide-rule border-b border-rule">
        {rows.map((item, i) => (
          <article
            key={item.key}
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

            {/* The movement, and the only number on the row that is a change. */}
            <span
              className={[
                "font-mono text-[15px] font-semibold whitespace-nowrap",
                item.delta > 0 ? "text-ink" : "text-ink-2",
              ].join(" ")}
            >
              {item.delta > 0 ? "+" : ""}
              {item.delta}
            </span>

            {/* THE POSITION IS THE WEIGHT OF THE LINE, so it is never omitted.
                A +9 at position 749 and a +9 at position 90,000 look identical
                without it, and only one is a company anyone has heard of. */}
            <span className="font-mono text-micro tracking-[0.04em] text-ink-2 whitespace-nowrap">
              position {item.rank != null ? rank(item.rank) : "unranked"}
            </span>

            <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 whitespace-nowrap">
              checked {shortDay(item.day)}
            </span>

            {item.description && (
              <p className="text-body text-ink-2 basis-full mt-1">
                {item.description}
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="px-4 sm:px-9 py-4 font-mono text-micro text-ink-3 tracking-[0.04em] border-b border-rule leading-relaxed">
        Position and 90 day trend are company profile data, last checked on the
        date shown against each row.
      </div>

    </>
  );
}
