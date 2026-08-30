"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * The archived briefings, as a calendar.
 *
 * A GRID OF CARDS DOES NOT SURVIVE ITS OWN SUCCESS. Twenty-seven days is a
 * pleasant row of tiles; three years is a thousand of them, and a page that
 * ends in a thousand tiles has no end. A calendar is the shape this data
 * already has — one entry per day, most days empty — and it stays the same size
 * however many years accumulate.
 *
 * EVERY DATE IS STILL IN THE MARKUP, and that is not a detail. A month view
 * renders one month of links, so on its own it would orphan every other day the
 * moment the archive outgrew a single month — the exact problem the section was
 * demoted rather than deleted to avoid. The full list is emitted below in a
 * <details>, which crawlers read regardless of the open state and which works
 * with no JavaScript at all.
 */

export type ArchiveDay = { date: string; count: number };

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function monthKey(iso: string) {
  return iso.slice(0, 7);
}

function monthLabel(key: string) {
  const [y, m] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

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
function monthShape(key: string) {
  const [y, m] = key.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  // getUTCDay is Sunday-first; this calendar is Monday-first, as UK ones are.
  const lead = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return { lead, days, y, m };
}

export function RiseFinderArchive({ days }: { days: ArchiveDay[] }) {
  const byDate = useMemo(
    () => Object.fromEntries(days.map((d) => [d.date, d.count])),
    [days],
  );

  // Newest first, because the last thing written is the thing most likely
  // wanted. Only months that actually contain a briefing are offered — an empty
  // month is a month nobody needs to page through.
  const months = useMemo(
    () => Array.from(new Set(days.map((d) => monthKey(d.date)))).sort().reverse(),
    [days],
  );

  const [index, setIndex] = useState(0);
  const key = months[index];
  if (!key) return null;

  const { lead, days: length, y, m } = monthShape(key);
  const cells = Array.from({ length: lead + length }, (_, i) =>
    i < lead
      ? null
      : `${y}-${String(m).padStart(2, "0")}-${String(i - lead + 1).padStart(2, "0")}`,
  );
  const inMonth = days.filter((d) => monthKey(d.date) === key);

  return (
    <div className="px-4 sm:px-9 pb-10">
      <div className="max-w-md border border-rule">
        <div className="flex items-center justify-between border-b border-rule px-4 py-3">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(i + 1, months.length - 1))}
            disabled={index >= months.length - 1}
            aria-label="Earlier month"
            className="font-mono text-mono text-ink-2 hover:text-red disabled:opacity-25 disabled:cursor-not-allowed px-2"
          >
            ←
          </button>
          <span className="font-mono text-[13px] font-semibold tracking-[0.06em] text-ink">
            {monthLabel(key)}
          </span>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            disabled={index === 0}
            aria-label="Later month"
            className="font-mono text-mono text-ink-2 hover:text-red disabled:opacity-25 disabled:cursor-not-allowed px-2"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-rule">
          {WEEKDAYS.map((d, i) => (
            <div
              key={i}
              className="bg-paper py-1.5 text-center font-mono text-micro uppercase tracking-[0.12em] text-ink-3"
            >
              {d}
            </div>
          ))}
          {cells.map((iso, i) => {
            const count = iso ? byDate[iso] : undefined;
            if (!iso) return <div key={i} className="bg-paper py-2.5" />;
            const day = Number(iso.slice(8));
            return count ? (
              <Link
                key={i}
                href={`/risefinder/${iso}`}
                title={`${formatDay(iso)} — ${count} ${count === 1 ? "entry" : "entries"}`}
                className="bg-paper py-2 text-center hover:bg-ink group transition-colors"
              >
                <span className="block font-mono text-mono text-ink group-hover:text-paper">
                  {day}
                </span>
                <span className="block font-mono text-micro text-red group-hover:text-paper">
                  {count}
                </span>
              </Link>
            ) : (
              <div key={i} className="bg-paper py-2 text-center">
                <span className="block font-mono text-mono text-ink-3 opacity-40">
                  {day}
                </span>
                <span className="block font-mono text-micro">&nbsp;</span>
              </div>
            );
          })}
        </div>

        <div className="border-t border-rule px-4 py-2.5 font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
          {inMonth.length} {inMonth.length === 1 ? "day" : "days"} this month ·{" "}
          {days.length} in total
        </div>
      </div>

      {/* EVERY DATE, IN THE MARKUP, WHATEVER MONTH IS SHOWING. A crawler reads
          the contents of a closed <details>; it does not click a month arrow.
          Without this the calendar would quietly orphan every day outside the
          current month, which is the one thing this section was kept to avoid. */}
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
