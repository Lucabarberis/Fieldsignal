"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * The archived briefings, as a calendar.
 *
 * A GRID OF CARDS DOES NOT SURVIVE ITS OWN SUCCESS. Twenty-seven days is a
 * pleasant row of tiles; three years is a thousand of them, and a page that
 * ends in a thousand tiles has no end. A calendar is the shape this data
 * already has, one entry per day and most days empty, and it stays the same
 * size however many years accumulate.
 *
 * THE HEADING IS TWO CONTROLS, NOT A LABEL. Stepping a month at a time is fine
 * for last week and useless for eighteen months ago, which is twelve clicks and
 * a lot of hoping. The month and the year each open their own picker, so any
 * date in the archive is two clicks away and stays two clicks away as the
 * archive grows.
 *
 * EVERY DATE IS STILL IN THE MARKUP, and that is not a detail. A month view
 * renders one month of links, so on its own it would orphan every other day the
 * moment the archive outgrew a single month. The full list is emitted below in
 * a <details>, which crawlers read regardless of its open state and which works
 * with no JavaScript at all.
 */

export type ArchiveDay = { date: string; count: number };

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Monday-first index of the 1st, and how many days the month has. */
function monthShape(year: number, month: number) {
  const first = new Date(Date.UTC(year, month - 1, 1));
  // getUTCDay is Sunday-first; this calendar is Monday-first, as UK ones are.
  const lead = (first.getUTCDay() + 6) % 7;
  return { lead, length: new Date(Date.UTC(year, month, 0)).getUTCDate() };
}

export function RiseFinderArchive({ days }: { days: ArchiveDay[] }) {
  const byDate = useMemo(
    () => Object.fromEntries(days.map((d) => [d.date, d.count])),
    [days],
  );

  /** Which months hold something, as { 2026: Set(7, 8) }. */
  const filled = useMemo(() => {
    const out: Record<number, Set<number>> = {};
    for (const d of days) {
      const [y, m] = d.date.split("-").map(Number);
      (out[y] ??= new Set()).add(m);
    }
    return out;
  }, [days]);

  const years = useMemo(
    () => Object.keys(filled).map(Number).sort((a, b) => b - a),
    [filled],
  );

  // Newest first, because the last thing written is the thing most likely
  // wanted.
  const newest = days.reduce((a, d) => (d.date > a ? d.date : a), "");
  const [year, setYear] = useState(Number(newest.slice(0, 4)));
  const [month, setMonth] = useState(Number(newest.slice(5, 7)));
  const [picking, setPicking] = useState<"month" | "year" | null>(null);

  if (!newest) return null;

  const { lead, length } = monthShape(year, month);
  const cells = Array.from({ length: lead + length }, (_, i) =>
    i < lead
      ? null
      : `${year}-${String(month).padStart(2, "0")}-${String(i - lead + 1).padStart(2, "0")}`,
  );
  const inMonth = days.filter((d) => d.date.startsWith(`${year}-${String(month).padStart(2, "0")}`));

  /** Move one month, carrying the year, and close any open picker. */
  function step(by: number) {
    let m = month + by;
    let y = year;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    setMonth(m);
    setYear(y);
    setPicking(null);
  }

  const pickerButton =
    "font-mono text-[13px] font-semibold tracking-[0.06em] px-2 py-1 border transition-colors";

  return (
    <div className="px-4 sm:px-9 pb-10">
      <div className="w-full max-w-[24rem] border border-rule-2 bg-paper">
        {/* Heading: two pickers and a step control either side. */}
        <div className="flex items-center justify-between gap-2 border-b border-rule px-3 py-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous month"
            className="font-mono text-mono text-ink-3 hover:text-red transition-colors px-1.5"
          >
            ←
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPicking(picking === "month" ? null : "month")}
              aria-expanded={picking === "month"}
              className={[
                pickerButton,
                picking === "month"
                  ? "bg-ink text-paper border-ink"
                  : "border-rule-2 text-ink hover:border-ink",
              ].join(" ")}
            >
              {MONTHS[month - 1]} <span className="opacity-50">▾</span>
            </button>
            <button
              type="button"
              onClick={() => setPicking(picking === "year" ? null : "year")}
              aria-expanded={picking === "year"}
              className={[
                pickerButton,
                picking === "year"
                  ? "bg-ink text-paper border-ink"
                  : "border-rule-2 text-ink hover:border-ink",
              ].join(" ")}
            >
              {year} <span className="opacity-50">▾</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next month"
            className="font-mono text-mono text-ink-3 hover:text-red transition-colors px-1.5"
          >
            →
          </button>
        </div>

        {/* MONTH PICKER. Twelve cells, and a month with nothing in it is
            disabled rather than hidden, so the shape of the year stays
            readable: which months this ran and which it did not. */}
        {picking === "month" && (
          <div className="grid grid-cols-3 gap-px border-b border-rule bg-rule">
            {MONTHS.map((name, i) => {
              const has = filled[year]?.has(i + 1);
              const active = month === i + 1;
              return (
                <button
                  key={name}
                  type="button"
                  disabled={!has}
                  onClick={() => { setMonth(i + 1); setPicking(null); }}
                  className={[
                    "bg-paper py-2.5 font-mono text-micro uppercase tracking-[0.1em] transition-colors",
                    active ? "bg-ink text-paper" : "text-ink hover:bg-paper-3",
                    !has ? "text-ink-3 opacity-30 cursor-not-allowed hover:bg-paper" : "",
                  ].join(" ")}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>
        )}

        {picking === "year" && (
          <div className="grid grid-cols-3 gap-px border-b border-rule bg-rule">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  setYear(y);
                  // Landing on a month that year never had would show an empty
                  // grid and look broken. Snap to its latest month instead.
                  if (!filled[y]?.has(month)) {
                    setMonth(Math.max(...Array.from(filled[y] ?? [1])));
                  }
                  setPicking(null);
                }}
                className={[
                  "bg-paper py-2.5 font-mono text-micro tracking-[0.1em] transition-colors",
                  year === y ? "bg-ink text-paper" : "text-ink hover:bg-paper-3",
                ].join(" ")}
              >
                {y}
              </button>
            ))}
          </div>
        )}

        {/* NO GRIDLINES. The first version drew a full border between every
            cell, which turns a calendar into a spreadsheet and gives the empty
            days the same weight as the ones with something in them. Whitespace
            separates these; only the days that can be clicked carry any ink. */}
        <div className="grid grid-cols-7 px-2 pt-2">
          {WEEKDAYS.map((d, i) => (
            <div
              key={i}
              className="pb-2 text-center font-mono text-micro uppercase tracking-[0.14em] text-ink-3"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 px-2 pb-2">
          {cells.map((iso, i) => {
            if (!iso) return <div key={i} className="aspect-square" />;
            const count = byDate[iso];
            const day = Number(iso.slice(8));

            // A day with no briefing is a number and nothing else. It was a
            // filled grey block, which made the empty days the loudest thing
            // on the calendar.
            if (!count) {
              return (
                <div
                  key={i}
                  className="aspect-square flex items-center justify-center font-mono text-mono text-ink-3 opacity-25"
                >
                  {day}
                </div>
              );
            }

            // A day with one carries a dot rather than a red number under every
            // date. Twenty-five red numerals in a grid is noise; a dot says
            // "something here" and the count is on the tooltip for anyone who
            // wants it.
            return (
              <Link
                key={i}
                href={`/risefinder/${iso}`}
                title={`${formatDay(iso)}: ${count} ${count === 1 ? "entry" : "entries"}`}
                className="aspect-square flex flex-col items-center justify-center gap-1 border border-rule-2 hover:border-red hover:bg-red group transition-colors"
              >
                <span className="font-mono text-mono font-semibold text-ink group-hover:text-paper leading-none">
                  {day}
                </span>
                <span
                  aria-hidden
                  className="block w-1 h-1 rounded-full bg-red group-hover:bg-paper"
                />
              </Link>
            );
          })}
        </div>

        <div className="border-t border-rule px-3 py-2.5 font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
          {inMonth.length} {inMonth.length === 1 ? "day" : "days"} in{" "}
          {MONTHS[month - 1]} · {days.length} in all
        </div>
      </div>

      {/* EVERY DATE, IN THE MARKUP, WHATEVER MONTH IS SHOWING. A crawler reads
          the contents of a closed <details>; it does not click a month picker.
          Without this the calendar would quietly orphan every day outside the
          current month. */}
      <details className="mt-4 max-w-4xl">
        <summary className="cursor-pointer font-mono text-micro uppercase tracking-[0.12em] text-ink-3 hover:text-ink">
          All {days.length} days as a list
        </summary>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {days.map((d) => (
            <Link
              key={d.date}
              href={`/risefinder/${d.date}`}
              className="font-mono text-micro tracking-[0.04em] text-ink-2 hover:text-red transition-colors"
            >
              {formatDay(d.date)}{" "}
              <span className="text-ink-3">({d.count})</span>
            </Link>
          ))}
        </div>
      </details>
    </div>
  );
}
