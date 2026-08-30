"use client";

import { useMemo, useState } from "react";
import { SectionBand } from "@/components/SectionBand";

/**
 * The risers, filterable by source and window.
 *
 * THIS REPLACED TWO SECTIONS AND A JUDGEMENT STEP. The page used to open with
 * a hand-written briefing of the dozen things that cleared a two-source bar,
 * and put the raw per-source movers underneath it as fifty-one boxes — one per
 * source per window, most of them empty. The briefing was the smaller and more
 * arbitrary half: on a normal day it published two entries out of twelve
 * thousand scored, and which two came down to one person's read on a morning.
 *
 * What is left is the part that does not need defending. Every row is a
 * measured change in one named source over one named window, and the reader
 * chooses which source and which window rather than being handed somebody
 * else's shortlist.
 *
 * THE CORROBORATION CLAIM SURVIVED THE BRIEFING. It was the one genuinely good
 * idea in it — a single signal can be bought, agreement between unrelated
 * sources cannot — so it comes down to the row level as `also_in`, and rows
 * carrying it sort first. That is the only ranking here that is not raw
 * percentage.
 */

export type ExplorerItem = {
  key: string;
  name: string;
  url: string | null;
  /** The editorial line. Null until somebody has written one. */
  description: string | null;
  /** True for rank columns, where 460,092 → 11,003 is an improvement. */
  lower_is_better: boolean;
  was: number;
  now: number;
  unit: string;
  gain_pct: number;
  from_day: string;
  to_day: string;
  /** Other sources this same thing is also rising in today. */
  also_in: string[];
};

export type ExplorerWindow = {
  window: string;
  days: number;
  available: boolean;
  have_days: number;
  need_days: number;
  first_day: string | null;
  /** Days of collection still needed before this window can be computed. */
  opens_in: number;
  items: ExplorerItem[];
};

export type ExplorerSource = {
  id: string;
  label: string;
  /** What the rows ARE — "Repositories", "Marketplace add-ons". */
  unit_noun: string;
  metric: string;
  /** "web" for the two sources that publish a ranked list of everything. */
  basis: "web" | "watched" | string;
  /**
   * The snapshot column a custom range is computed over. Null for the two
   * universe sources, which come from stored rank files rather than the
   * snapshot table and so cannot be queried by date.
   */
  metric_key?: string | null;
  windows: ExplorerWindow[];
};

/** Cards rendered before the "show the rest" button. */
const PAGE = 60;

const WINDOWS = [
  { key: "1d", label: "1 day" },
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  // NOT A WINDOW LIKE THE OTHERS, and it sits beside them anyway because to a
  // reader it is the same question with different dates. The three above are
  // precomputed into the deployed data file and render instantly; this one
  // goes to Postgres, needs a source chosen, and can be told no.
  { key: "custom", label: "Custom range" },
];

/** Upper-cases the first letter. Metric nouns arrive lowercase by design. */
function sentence(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function num(n: number) {
  return Number.isInteger(n) ? n.toLocaleString("en-GB") : String(n);
}

function shortDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

/**
 * The movement, in a sentence.
 *
 * WRITTEN FROM THE NUMBERS, NOT ABOUT THEM. There is no judgement available
 * here and pretending otherwise would be the briefing's fault repeated one
 * level down, so this says exactly what was measured, over exactly which days,
 * and stops. The only interpretation it offers is the corroboration count,
 * which is a fact about how many unrelated collectors saw the same thing.
 */
function movement(item: ExplorerItem, source: ExplorerSource) {
  const span =
    item.from_day === item.to_day
      ? `on ${shortDay(item.to_day)}`
      : `between ${shortDay(item.from_day)} and ${shortDay(item.to_day)}`;

  const change = item.lower_is_better
    ? `${source.metric} improved from ${num(item.was)} to ${num(item.now)}`
    : `${item.unit} went ${num(item.was)} to ${num(item.now)}`;

  // "a 83.3% move" and "stars went..." both reached the page. The metric names
  // come from a table of lowercase nouns and the percentages are whatever the
  // arithmetic produced, so the sentence has to fix its own first letter and
  // its own article rather than trusting either.
  const article = /^(8|11|18)/.test(String(item.gain_pct)) ? "an" : "a";
  const lead = sentence(`${change} ${span}, ${article} ${item.gain_pct}% move.`);

  if (item.also_in.length === 0) {
    return `${lead} ${source.label} is the only source that has it moving, so nothing here corroborates it.`;
  }
  const others =
    item.also_in.length === 1
      ? item.also_in[0]
      : `${item.also_in.slice(0, -1).join(", ")} and ${item.also_in[item.also_in.length - 1]}`;
  return `${lead} Also rising in ${others} — ${item.also_in.length + 1} unrelated sources have it moving at once, which is the part that is hard to fake.`;
}

export function RiseFinderExplorer({
  sources,
  dataThrough,
}: {
  sources: ExplorerSource[];
  dataThrough: string;
}) {
  const [win, setWin] = useState("1d");
  const [source, setSource] = useState("all");
  // HOW MANY CARDS BEFORE THE READER ASKS FOR MORE. Unfiltered, this section
  // is three hundred cards of two paragraphs each, and a page that long reads
  // as a dump rather than a list — the sort order stops meaning anything past
  // the first screenful. Reset on every filter change, or a reader who
  // expanded the full list once carries it into every source they click.
  const [limit, setLimit] = useState(PAGE);

  // Custom range. Held separately from the precomputed windows because it is
  // fetched, can fail, and can be asked a question the data cannot answer.
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(dataThrough);
  const [custom, setCustom] = useState<ExplorerItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  function choose(next: () => void) {
    next();
    setLimit(PAGE);
    // A result computed for one source over one range means nothing once
    // either changes, and leaving it on screen while the controls say
    // something else is how a reader ends up quoting the wrong dates.
    setCustom(null);
    setFailed(null);
  }

  const customSource = sources.find((x) => x.id === source);

  async function runCustom(event: React.FormEvent) {
    event.preventDefault();
    if (!customSource) return;
    setLoading(true);
    setFailed(null);
    try {
      const res = await fetch(
        `/api/risefinder/risers?source=${encodeURIComponent(source)}` +
          `&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
      );
      const body = await res.json();
      if (!res.ok) {
        setFailed(body.error ?? "That range could not be queried.");
        setCustom(null);
      } else {
        setCustom(body.items as ExplorerItem[]);
        setLimit(PAGE);
      }
    } catch {
      setFailed("Could not reach the riser history.");
      setCustom(null);
    } finally {
      setLoading(false);
    }
  }

  /** The chosen window for every source, kept alongside its source. */
  const blocks = useMemo(
    () =>
      sources
        .map((s) => ({ source: s, block: s.windows.find((w) => w.window === win) }))
        .filter((b): b is { source: ExplorerSource; block: ExplorerWindow } =>
          Boolean(b.block),
        ),
    [sources, win],
  );

  const visible = useMemo(
    () => (source === "all" ? blocks : blocks.filter((b) => b.source.id === source)),
    [blocks, source],
  );

  const rows = useMemo(() => {
    // A CUSTOM RESULT IS THE WHOLE ANSWER, not a filter over the precomputed
    // one. It came from a different query against a different store, and
    // blending the two would put rows from two date ranges in one sorted list.
    if (win === "custom") {
      if (!custom || !customSource) return [];
      return custom.map((item) => ({ item, source: customSource }));
    }
    const flat = visible.flatMap((b) =>
      b.block.items.map((item) => ({ item, source: b.source })),
    );

    // ONE CARD PER THING, NOT ONE PER SOURCE PER THING. A repo that is climbing
    // on GitHub and on the Hacker News front page is two rows in the data and
    // was two cards on the page — positions 01 and 03 were the same project
    // saying the same thing twice, which is the exact opposite of what the
    // corroboration count is for. The strongest move wins the card and the
    // others are already named in `also_in`.
    //
    // Only when the filter is off. Inside a single source there is nothing to
    // collapse, and deduping there would silently drop a row a reader asked
    // for by name.
    const deduped =
      source === "all"
        ? Object.values(
            flat.reduce<Record<string, (typeof flat)[number]>>((acc, r) => {
              const held = acc[r.item.key];
              if (!held || r.item.gain_pct > held.item.gain_pct) acc[r.item.key] = r;
              return acc;
            }, {}),
          )
        : flat;

    // CORROBORATED FIRST, THEN BY SIZE. A 400% move nobody else saw is more
    // likely to be a counter resetting than a 60% move three unrelated
    // collectors agree on, and sorting on percentage alone puts the artefacts
    // at the top of every list.
    return deduped.sort(
      (a, b) =>
        b.item.also_in.length - a.item.also_in.length ||
        b.item.gain_pct - a.item.gain_pct,
    );
  }, [visible, source, win, custom, customSource]);

  // Sources with nothing for this window, and why. A source that has not
  // collected enough days yet and one that collected them and found nothing
  // look identical on a page, and only the first is worth waiting for.
  const waiting = visible.filter((b) => !b.block.available && b.block.opens_in > 0);
  const quiet = visible.filter((b) => !b.block.available && b.block.opens_in === 0);

  const described = rows.filter((r) => r.item.description).length;

  return (
    <>
      <SectionBand
        num="01"
        label="Risers by source"
        meta={
          win === "custom" && !custom
            ? "Custom range · pick a source and two dates"
            : `${rows.length} moving · ${WINDOWS.find((w) => w.key === win)?.label}`
        }
      />

      <div className="px-4 sm:px-9 py-6 max-w-4xl">
        <p className="text-body text-ink-2">
          Every row is one measured change in one source over one window. Pick
          the source and the window; nothing has been shortlisted for you.
          Rows that <b>more than one unrelated source</b> has moving are listed
          first, because a single signal can be bought and agreement between
          independent collectors cannot.
        </p>
      </div>

      {/* WINDOW FIRST, SOURCE SECOND. The window changes what every box below
          contains, so it is the outer control; putting the nineteen source
          chips above it made the one control that reframes the page the
          smaller of the two. */}
      <div className="px-4 sm:px-9 py-4 border-y border-rule flex flex-wrap items-center gap-2">
        <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mr-1">
          Window
        </span>
        {WINDOWS.map((w) => {
          const active = win === w.key;
          const n = sources
            .map((s) => s.windows.find((x) => x.window === w.key))
            .reduce((a, b) => a + (b?.items.length ?? 0), 0);
          return (
            <button
              key={w.key}
              type="button"
              onClick={() => choose(() => setWin(w.key))}
              aria-pressed={active}
              className={[
                "font-mono text-micro uppercase tracking-[0.12em] px-3 py-2 border transition-colors",
                active
                  ? "bg-red text-paper border-red"
                  : "border-rule-2 text-ink-2 hover:text-ink hover:border-ink",
              ].join(" ")}
            >
              {/* No count on the custom range. The other three carry how many
                  rows they hold; this one holds nothing until a query is run,
                  and rendering "Custom range 0" reads as a window that found
                  nothing rather than one nobody has asked yet. */}
              {w.label}
              {w.key !== "custom" && <span className="opacity-60"> {n}</span>}
            </button>
          );
        })}
      </div>

      <div className="px-4 sm:px-9 py-4 border-b border-rule flex flex-wrap items-center gap-2">
        <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mr-1">
          Source
        </span>
        {[{ id: "all", label: "Everything", unit_noun: "", metric_key: null }, ...sources].map(
          (s) => {
            const active = source === s.id;
            // COUNTS BELONG TO A PRECOMPUTED WINDOW AND CUSTOM IS NOT ONE.
            //
            // `blocks` looks up the window named by `win`, and no source has a
            // window called "custom" — so in custom mode every count came back
            // zero, every chip disabled itself on that zero, and the form below
            // said "choose one source above" while making it impossible. The
            // control asked for something it had just forbidden.
            //
            // A custom range has no count until it has been run, so none is
            // shown. What matters instead is whether a source CAN answer one.
            const n =
              s.id === "all"
                ? blocks.reduce((a, b) => a + b.block.items.length, 0)
                : (blocks.find((b) => b.source.id === s.id)?.block.items.length ?? 0);

            // Majestic and Tranco are computed from stored rank files rather
            // than the snapshot table, so Postgres cannot answer a date range
            // for them however the dates are chosen. "Everything" is out too:
            // the endpoint answers one source at a time.
            const off = win === "custom"
              ? s.id === "all" || !s.metric_key
              : n === 0 && s.id !== "all";

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => choose(() => setSource(s.id))}
                aria-pressed={active}
                disabled={off}
                title={
                  win === "custom" && !s.metric_key && s.id !== "all"
                    ? `${s.label} is computed from stored rank files, so it cannot answer a date range`
                    : s.unit_noun || undefined
                }
                className={[
                  "font-mono text-micro uppercase tracking-[0.12em] px-3 py-2 border transition-colors",
                  active
                    ? "bg-ink text-paper border-ink"
                    : "border-rule-2 text-ink-2 hover:text-ink hover:border-ink",
                  off ? "opacity-35 cursor-not-allowed" : "",
                ].join(" ")}
              >
                {s.label}
                {win !== "custom" && <span className="opacity-60"> {n}</span>}
              </button>
            );
          },
        )}
      </div>

      {/* THE CUSTOM RANGE. Everything above this point is baked into the
          deployed data file; this is the one control that asks the database a
          question at read time, which is why it needs a source and can answer
          with a refusal. */}
      {win === "custom" && (
        <form
          onSubmit={runCustom}
          className="px-4 sm:px-9 py-5 border-b border-rule bg-paper-2"
        >
          <p className="text-body text-ink-2 max-w-4xl mb-4">
            The three windows above are computed nightly and shipped with the
            page. A custom range is answered live from the stored history —{" "}
            <b className="text-ink">every daily reading since collection began</b>.
            Pick one source and two dates.
          </p>
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                From
              </span>
              <input
                type="date"
                required
                value={from}
                max={dataThrough}
                onChange={(e) => setFrom(e.target.value)}
                className="font-mono text-mono px-3 py-2 border border-rule-2 bg-paper text-ink focus:border-ink outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                To
              </span>
              <input
                type="date"
                required
                value={to}
                max={dataThrough}
                onChange={(e) => setTo(e.target.value)}
                className="font-mono text-mono px-3 py-2 border border-rule-2 bg-paper text-ink focus:border-ink outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={loading || !customSource || !from || !to}
              className="font-mono text-mono uppercase tracking-[0.14em] px-4 py-2.5 bg-ink text-paper hover:bg-red transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
            >
              {loading ? "Querying…" : "Show risers →"}
            </button>
          </div>

          {/* THE SOURCE IS NOT OPTIONAL HERE, and saying so beats a disabled
              button with no explanation. The endpoint answers one source at a
              time; "Everything" would be nineteen scans of a 900,000-row table
              for one click. */}
          {!customSource && (
            <div className="mt-3 font-mono text-micro tracking-[0.04em] text-red">
              Choose one source above. A custom range is answered one source at
              a time.
            </div>
          )}
          {customSource && !customSource.metric_key && (
            <div className="mt-3 font-mono text-micro tracking-[0.04em] text-red">
              {customSource.label} is computed from stored rank files rather
              than the snapshot history, so custom ranges are not available for
              it yet.
            </div>
          )}
          {failed && (
            <div className="mt-3 font-mono text-micro tracking-[0.04em] text-red">
              {failed}
            </div>
          )}
          {custom && !failed && (
            <div className="mt-3 font-mono text-micro tracking-[0.04em] text-ink-2">
              <b className="text-ink">{custom.length}</b>{" "}
              {custom.length === 1 ? "riser" : "risers"} in {customSource?.label}{" "}
              between {shortDay(from)} and {shortDay(to)}.
            </div>
          )}
        </form>
      )}

      {/* WHAT THE SELECTED SOURCE'S ROWS ACTUALLY COVER. "Biggest risers on the
          web" and "biggest risers among the repositories we happen to watch"
          are different claims wearing the same heading, and the weaker one has
          to say so on the page rather than in a footnote. */}
      {source !== "all" && (
        <div className="px-4 sm:px-9 py-4 border-b border-rule max-w-4xl text-body text-ink-2">
          {(() => {
            const s = sources.find((x) => x.id === source);
            if (!s) return null;
            return s.basis === "web" ? (
              <>
                <b className="text-ink">{s.label}</b> publishes a ranked list of
                every domain it knows, so these are the biggest {s.metric}{" "}
                improvements <b>across the whole list</b> — a million rows a day,
                not a sample.
              </>
            ) : (
              <>
                <b className="text-ink">{s.label}</b> publishes no list of
                everything it holds, so these are the biggest {s.metric} moves{" "}
                <b>among the {s.unit_noun.toLowerCase()} we have been watching</b>.
                A real answer, but not the same as the biggest moves on{" "}
                {s.label}.
              </>
            );
          })()}
        </div>
      )}

      {/* THE DESCRIPTION GAP, STATED. Most rows have no written line yet, and a
          page that simply omits them lets a reader conclude the blank ones are
          less real rather than less finished. */}
      {rows.length > 0 && described < rows.length && (
        <div className="px-4 sm:px-9 py-3 border-b border-rule font-mono text-micro tracking-[0.04em] text-ink-3 leading-relaxed">
          <b className="text-ink">{described}</b> of {rows.length} rows carry a
          written description. The rest are measured but not yet described —
          descriptions are written by hand, one thing at a time, and the backlog
          is worked through newest first.
        </div>
      )}

      {rows.length === 0 ? (
        <div className="px-4 sm:px-9 py-10 max-w-4xl">
          <div className="font-mono text-mono uppercase text-ink-3 mb-2">
            {/* AN UNRUN QUERY IS NOT AN EMPTY RESULT. Before a custom range has
                been submitted there is nothing to show because nothing has been
                asked, and saying "nothing to show for this window" made a
                waiting form read as a broken one. */}
            {win === "custom" && !custom
              ? "No range run yet"
              : "Nothing to show for this window"}
          </div>
          <p className="text-body text-ink-2">
            {win === "custom" && !custom
              ? "Choose one source, set a start and end date, and the stored history will be queried for the biggest movers between them."
              : waiting.length > 0
                ? `This window needs more days of collection than have been stored. The first of these opens in ${Math.min(
                    ...waiting.map((w) => w.block.opens_in),
                  )} days.`
                : "Collection ran and nothing in this source cleared the noise floor over this window."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule">
          {rows.slice(0, limit).map(({ item, source: s }, i) => (
            <article
              key={`${s.id}-${item.key}`}
              className="bg-paper px-5 pt-5 pb-5 sm:px-7 sm:pt-6 flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-1 gap-3">
                <span className="font-mono text-mono text-red font-semibold opacity-[0.78]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.also_in.length > 0 ? (
                  <span className="font-mono text-micro uppercase tracking-[0.12em] px-2 py-0.5 bg-red text-paper">
                    {item.also_in.length + 1} sources
                  </span>
                ) : (
                  <span className="font-mono text-micro uppercase tracking-[0.12em] px-2 py-0.5 border border-rule-2 text-ink-3">
                    Single source
                  </span>
                )}
              </div>

              <h3 className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2.5 break-words">
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
              </h3>

              <div className="font-mono text-micro text-ink-2 tracking-[0.04em] mb-3">
                {s.unit_noun}
                {" · "}
                <b className="text-ink font-semibold">{s.label}</b>
              </div>

              {/* WHAT IT IS, before why it moved. A reader meeting
                  "crmne/fastpotify" cannot use a growth figure until they know
                  what the thing does. */}
              {item.description ? (
                <p className="text-body text-ink mb-3 leading-relaxed">
                  {item.description}
                </p>
              ) : (
                <p className="font-mono text-micro tracking-[0.04em] text-ink-3 mb-3 leading-relaxed">
                  Not yet described. The movement below is measured; what this
                  thing is has not been written up.
                </p>
              )}

              <div className="border-y border-rule py-2.5 mb-3 font-mono text-micro tracking-[0.04em] text-ink-2">
                <span className="text-ink font-semibold uppercase">
                  {num(item.was)} → {num(item.now)}
                </span>
                {" "}
                {item.lower_is_better ? s.metric : item.unit}
                {" · "}
                <b className="text-red">+{item.gain_pct}%</b>
              </div>

              <div>
                <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-1.5">
                  What moved
                </div>
                <p className="text-body text-ink-2 leading-relaxed">
                  {movement(item, s)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {rows.length > limit && (
        <div className="px-4 sm:px-9 py-6 border-b border-rule">
          <button
            type="button"
            onClick={() => setLimit(rows.length)}
            className="font-mono text-mono uppercase tracking-[0.14em] px-4 py-3 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            Show the remaining {rows.length - limit} →
          </button>
        </div>
      )}

      {(waiting.length > 0 || quiet.length > 0) && (
        <div className="px-4 sm:px-9 py-4 border-y border-rule font-mono text-micro text-ink-3 tracking-[0.04em] leading-relaxed">
          {waiting.length > 0 && (
            <>
              {waiting.length}{" "}
              {waiting.length === 1 ? "source is" : "sources are"} still filling
              this window:{" "}
              {waiting
                .map((w) => `${w.source.label} (${w.block.opens_in}d)`)
                .join(", ")}
              . Each needs a full window of daily readings before it can say
              anything.
            </>
          )}
          {waiting.length > 0 && quiet.length > 0 && " "}
          {quiet.length > 0 && (
            <>
              {quiet.map((q) => q.source.label).join(", ")} had the history and
              nothing cleared the noise floor.
            </>
          )}
        </div>
      )}

      <div className="px-4 sm:px-9 py-4 font-mono text-micro text-ink-3 tracking-[0.04em] border-b border-rule leading-relaxed">
        Measured through {shortDay(dataThrough)}. Domains re-entering a ranked
        list from beyond rank 800,000 are excluded — a list that ends at a
        million drops and re-admits the same borderline domains constantly, and
        re-entry reads as an enormous climb without anything having happened.
      </div>
    </>
  );
}
