"use client";

import { useState } from "react";
import { SectionBand } from "@/components/SectionBand";

/**
 * Crunchbase's own 90 day rank movement.
 *
 * THE ONE SECTION HERE THAT IS NOT OUR MEASUREMENT. Everything above is a
 * difference this project computed between two readings it took itself: stars
 * went 25 to 51, and the two numbers are both on the page. This is Crunchbase's
 * model of what is rising, lifted whole from their data and labelled as theirs.
 *
 * It is shown rather than scored, and the distinction is the whole point. The
 * collector's own docstring forbids feeding it into the score, for the same
 * reason Hugging Face's trending score is not scored: importing a competitor's
 * answer and calling it your own evidence. Reading it beside our own numbers is
 * a different act, and the useful rows are the ones where the two disagree.
 *
 * WHY EVERY ROW CARRIES ITS OWN DATE. Crunchbase is refreshed fifty companies a
 * week, so a section dated today is mostly built from readings taken days or
 * weeks ago. The delta describes a 90 day trend, so a reading from three weeks
 * back still covers most of the same period, but the reader is told which day
 * each line was taken rather than left to assume it was this morning.
 *
 * WHY THERE IS A RANK CEILING. The delta arrives on the same bounded scale at
 * every depth, so a company at rank 400,000 and one at rank 749 both show +9
 * and sort together. They are not the same fact: past a hundred thousand a
 * Crunchbase rank is barely populated and a couple of profile edits move it.
 * The cut is on the rank, never on the delta.
 */

export type CBRankItem = {
  key: string;
  name: string;
  url: string | null;
  description: string | null;
  /** Crunchbase's 90 day trend delta. Positive is rising. */
  delta: number;
  /** Crunchbase Rank. Lower is better, and it is the credibility of the row. */
  rank: number | null;
  /** Crunchbase's heat score, 0 to 100. Their model, shown as theirs. */
  heat: number | null;
  /** The day Crunchbase was read for this company. */
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
        label="Crunchbase rank movement"
        meta={`${data.ranked} companies · 90 day trend`}
      />

      <div className="px-4 sm:px-9 py-6 max-w-4xl">
        <p className="text-body text-ink-2">
          This is <b>Crunchbase&rsquo;s number, not ours</b>. Every other section
          on this page is a change measured between two readings taken here. This
          one is Crunchbase&rsquo;s own view of which companies are climbing
          their rank over 90 days, shown beside their rank and their heat score.
          It is never fed into our scoring, because a rival&rsquo;s answer is not
          evidence. It is here because the rows worth arguing with are the ones
          where their view and ours disagree.
        </p>
        <p className="text-body text-ink-2 mt-3">
          Only companies inside the top {rank(data.ceiling)} of Crunchbase Rank
          are listed. Deeper than that the rank is barely populated and the trend
          moves on almost nothing. Crunchbase is re-read {""}
          {"fifty companies a week"}, so each row shows the day it was taken.
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

            {/* THE RANK IS THE CREDIBILITY OF THE LINE, so it is never omitted.
                A +9 at rank 749 and a +9 at rank 90,000 look identical without
                it, and only one of them is a company anyone has heard of. */}
            <span className="font-mono text-micro tracking-[0.04em] text-ink-2 whitespace-nowrap">
              rank {item.rank != null ? rank(item.rank) : "unranked"}
              {item.heat != null && (
                <>
                  {" · "}heat {Math.round(item.heat)}
                </>
              )}
            </span>

            <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 whitespace-nowrap">
              read {shortDay(item.day)}
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
        Crunchbase Rank is their ranking of every company they hold, and the
        trend figure is their own 90 day movement on it. Heat is their model
        score out of 100. All three are reproduced as published. Nothing in this
        section contributes to the scores above it.
      </div>
    </>
  );
}
