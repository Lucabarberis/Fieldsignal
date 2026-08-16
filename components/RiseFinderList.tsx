"use client";

import { useMemo, useState } from "react";

/**
 * The briefing list, with a type filter.
 *
 * WHY THE FILTER EXISTS. The guide describes two audiences for the same data —
 * investors and content marketers — and says they need different presentation.
 * A single list serves neither: an investor scanning it sees app-store chart
 * noise, a marketer sees GitHub repositories they do not care about, and both
 * conclude it is not for them. One control fixes that without building two
 * products.
 *
 * Client component only because of that filter. Everything else on the page is
 * static, and the data is baked in at build time.
 */

export type Track = {
  first_flagged: string;
  days_ago: number;
  unit: string;
  then: number;
  now: number;
  change_pct: number;
};

export type Item = {
  name: string;
  type: string;
  brief: string;
  sources: string[];
  url: string | null;
  /** What the thing IS, in its own words. Distinct from the brief. */
  description?: string | null;
  /** How many separate briefings this has appeared in. */
  appearances?: number;
  /** The day this was flagged. Shown when the list mixes days. */
  briefed_on?: string | null;
  /** What it has done on the most recent complete day of collection. */
  since?: {
    moving: boolean;
    metric: string | null;
    change_pct: number | null;
  } | null;
  track: Track | null;
};

const TYPE_LABEL: Record<string, string> = {
  repo: "Repository",
  app: "Mobile app",
  domain: "Website",
  package: "Package",
  model: "AI model",
  dataset: "Dataset",
  plugin: "WordPress plugin",
  extension: "Chrome extension",
  shopify_app: "Shopify app",
  launch: "ProductHunt launch",
};

const SOURCE_LABEL: Record<string, string> = {
  github: "GitHub",
  hackernews: "HackerNews",
  packages: "npm / PyPI",
  ios_apps: "App Store",
  android_apps: "Google Play",
  majestic_million: "Majestic",
  tranco: "Tranco",
  openpagerank: "OpenPageRank",
  wordpress: "WordPress",
  chrome_ext: "Chrome Web Store",
  shopify: "Shopify",
  producthunt: "ProductHunt",
  huggingface: "HuggingFace",
  pricing: "Pricing page",
  techstack: "Tech stack",
  hiring: "Hiring",
  // EVERY SOURCE NEEDS A LABEL, or its internal name reaches the reader. The
  // page was showing "search_trends", "dataforseo" and "lobsters" to visitors,
  // which name a module in this codebase rather than anything a reader knows.
  lobsters: "Lobsters",
  homebrew: "Homebrew",
  crunchbase: "Crunchbase",
  wikipedia: "Wikipedia",
  youtube: "YouTube",
  edgar: "SEC filings",
  search_trends: "Google Trends",
  dataforseo: "Search volume",
};

/** Coarse groups, because ten type names is not a filter, it is a menu. */
const GROUPS: { key: string; label: string; types: string[] }[] = [
  { key: "all", label: "Everything", types: [] },
  {
    key: "software",
    label: "Software & AI",
    types: ["repo", "package", "model", "dataset"],
  },
  { key: "apps", label: "Apps & extensions", types: ["app", "extension", "plugin", "shopify_app"] },
  { key: "web", label: "Websites", types: ["domain", "launch"] },
];

function num(n: number) {
  return n >= 1000 ? n.toLocaleString("en-GB") : String(n);
}

/** "12 Aug" — short enough to sit where a list index would. */
function formatShortDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

/**
 * `stampDate` is for lists that mix days — the "Still moving" section, where
 * entries come from the several days behind the latest briefing. Each card then
 * carries the day it was flagged instead of its position in the list, because
 * position means nothing across days and the date means everything: it is the
 * difference between "this is today's news" and "this was Tuesday's and has not
 * stopped". Merging days without saying so is exactly the fault this section
 * was built to replace.
 */
export function RiseFinderList({
  items,
  stampDate = false,
}: {
  items: Item[];
  stampDate?: boolean;
}) {
  const [group, setGroup] = useState("all");

  // THE NEWEST DAY IN THE LIST IS "NEW". Merging the two sections cost the
  // distinction between a first sighting and something found on Monday that has
  // not stopped, because every card fell through to the still-moving badge.
  // Those mean opposite things to a reader: one is a discovery, the other is a
  // trend that survived its own news cycle.
  const newestDay = useMemo(
    () => items.reduce((a, i) => (i.briefed_on && i.briefed_on > a ? i.briefed_on : a), ""),
    [items],
  );

  const shown = useMemo(() => {
    const g = GROUPS.find((x) => x.key === group);
    if (!g || g.types.length === 0) return items;
    return items.filter((i) => g.types.includes(i.type));
  }, [items, group]);

  return (
    <>
      <div className="px-4 sm:px-9 py-4 border-b border-rule flex flex-wrap gap-2">
        {GROUPS.map((g) => {
          const count =
            g.types.length === 0
              ? items.length
              : items.filter((i) => g.types.includes(i.type)).length;
          const active = group === g.key;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => setGroup(g.key)}
              aria-pressed={active}
              disabled={count === 0}
              className={[
                "font-mono text-micro uppercase tracking-[0.12em] px-3 py-2 border transition-colors",
                active
                  ? "bg-ink text-paper border-ink"
                  : "border-rule-2 text-ink-2 hover:text-ink hover:border-ink",
                count === 0 ? "opacity-35 cursor-not-allowed" : "",
              ].join(" ")}
            >
              {g.label} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <div className="px-4 sm:px-9 py-10 font-mono text-mono uppercase text-ink-3">
          Nothing in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule">
          {shown.map((item, i) => (
            <article
              key={item.name}
              className="bg-paper px-5 pt-5 pb-5 sm:px-7 sm:pt-6 flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-mono text-mono text-red font-semibold opacity-[0.78]">
                  {stampDate && item.briefed_on
                    ? formatShortDay(item.briefed_on)
                    : String(i + 1).padStart(2, "0")}
                </span>
                {/* New or continuing. A first sighting and a thing that has
                    held the list all week mean opposite things — one is a
                    discovery, the other survived its own news cycle — and
                    without this a reader cannot tell them apart. */}
                {/* In a dated list the useful badge is not how many briefings
                    it has appeared in but whether it is STILL going. The
                    section used to assert "still climbing" for every entry
                    while seven of nine had flatlined, so the claim now comes
                    from the data one entry at a time. */}
                {stampDate && item.briefed_on === newestDay ? (
                  <span className="font-mono text-micro uppercase tracking-[0.12em] px-2 py-0.5 bg-red text-paper">
                    New today
                  </span>
                ) : stampDate && item.since ? (
                  <span
                    className={[
                      "font-mono text-micro uppercase tracking-[0.12em] px-2 py-0.5",
                      item.since.moving
                        ? "bg-ink text-paper"
                        : "border border-rule-2 text-ink-3",
                    ].join(" ")}
                  >
                    {item.since.moving ? "Still moving" : "Flat since"}
                  </span>
                ) : (
                  item.appearances != null && (
                    <span
                      className={[
                        "font-mono text-micro uppercase tracking-[0.12em] px-2 py-0.5",
                        item.appearances === 1
                          ? "bg-ink text-paper"
                          : "border border-rule-2 text-ink-2",
                      ].join(" ")}
                    >
                      {item.appearances === 1
                        ? "New"
                        : `Day ${item.appearances}`}
                    </span>
                  )
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
                {TYPE_LABEL[item.type] ?? item.type}
                {item.sources.length > 0 && (
                  <>
                    {" · seen by "}
                    <b className="text-ink font-semibold">
                      {item.sources.map((s) => SOURCE_LABEL[s] ?? s).join(", ")}
                    </b>
                  </>
                )}
              </div>

              {/* WHAT IT IS, before why it moved. A reader meeting "yc-software/qm"
                  for the first time cannot use a growth figure until they know
                  what the thing does, and the brief is not the place for that —
                  it explains the movement, which is a different question. */}
              {item.description && (
                <p className="text-body text-ink mb-3 leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* The track record. Only rendered where there is one — an entry
                  flagged this morning has nothing to show yet, and inventing a
                  placeholder would undercut the entries that do. */}
              {item.track && (
                <div className="border-y border-rule py-2.5 mb-3 font-mono text-micro tracking-[0.04em] text-ink-2">
                  <span className="text-ink font-semibold uppercase">
                    Flagged {item.track.days_ago}{" "}
                    {item.track.days_ago === 1 ? "day" : "days"} ago
                  </span>
                  {" · "}
                  {num(item.track.then)} → {num(item.track.now)}{" "}
                  {item.track.unit}
                  {" · "}
                  <b
                    className={
                      item.track.change_pct > 0 ? "text-red" : "text-ink-3"
                    }
                  >
                    {item.track.change_pct > 0 ? "+" : ""}
                    {item.track.change_pct}%
                  </b>
                </div>
              )}

              <div>
                {item.description && (
                  <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-1.5">
                    Why it is here
                  </div>
                )}
                <p className="text-body text-ink-2 leading-relaxed">
                  {item.brief}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
