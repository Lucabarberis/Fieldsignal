import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { pageMetadata } from "@/lib/seo";
import data from "@/content/data/risefinder.json";

/**
 * RiseFinder — the daily breakout briefing.
 *
 * UNLISTED BY DESIGN. Nothing links here: not the masthead, not the footer,
 * not the sitemap, and robots.ts disallows the path. It is reachable only by
 * typing the URL, which is what was asked for. `noindex` is the part that
 * actually enforces that — without it a crawler that discovers the path from a
 * referrer header or a shared link would put it in search results, and "no
 * button" would stop meaning "not public".
 *
 * CONTENT COMES FROM A DATA FILE, not from the RiseFinder database. The
 * pipeline runs on a laptop against local SQLite; the site is a static build.
 * `scripts/export_web.py` in the RiseFinder project writes
 * content/data/risefinder.json, and a deploy publishes whatever that file last
 * said. So the update loop is: run the pipeline, export, commit, push.
 *
 * NO SCORES ON THIS PAGE. The build guide is explicit that "the brief is the
 * product. Not the score. The explanation." Numbers that do not change what a
 * reader does next are left in the diagnostic report, which is not deployed.
 */

export const metadata = pageMetadata({
  title: "RiseFinder",
  description:
    "A daily briefing on things that are rising before they are obvious — repos, apps, packages and domains, each with the evidence and a short explanation of what is happening.",
  path: "/risefinder",
  noindex: true,
});

/** "repo" → "Repository", for the tile's type label. */
const TYPE_LABEL: Record<string, string> = {
  repo: "Repository",
  app: "Mobile app",
  domain: "Domain",
  package: "Package",
  model: "AI model",
  dataset: "Dataset",
  plugin: "WordPress plugin",
  extension: "Chrome extension",
  shopify_app: "Shopify app",
  launch: "ProductHunt launch",
};

/** Collector names as a reader would say them. */
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
  youtube: "YouTube",
  age: "Domain age",
  linking: "Cross-source link",
};

function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function RiseFinderPage() {
  const { items, stats, data_through } = data;

  return (
    <>
      <PageHeader
        current="RiseFinder"
        title="RiseFinder"
        lede={
          <>
            A daily scan of twelve public data sources for things that are{" "}
            <b>rising before they are obvious</b>. Every entry below was seen
            moving by at least two unrelated collectors on the same day — any
            single signal can be bought, so agreement between independent
            sources is the thing worth reading.
          </>
        }
        meta={[
          { label: "Data through", value: formatDay(data_through) },
          { label: "Sources live", value: String(stats.sources_live) },
          { label: "Tracked", value: stats.entities.toLocaleString("en-GB") },
          {
            label: "Measurements",
            value: stats.snapshots.toLocaleString("en-GB"),
          },
        ]}
      />

      <SectionBand
        num="01"
        label="Today's briefing"
        meta={`${items.length} entries`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule">
        {items.map((item, i) => (
          <article
            key={item.name}
            className="bg-paper px-5 pt-5 pb-5 sm:px-7 sm:pt-6 flex flex-col"
          >
            <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2.5 break-words">
              {item.name}
            </h3>
            <div className="font-mono text-micro text-ink-2 tracking-[0.04em] mb-3">
              {TYPE_LABEL[item.type] ?? item.type}
              {item.sources.length > 0 && (
                <>
                  {" · seen by "}
                  <b className="text-ink font-semibold">
                    {item.sources
                      .map((s) => SOURCE_LABEL[s] ?? s)
                      .join(", ")}
                  </b>
                </>
              )}
            </div>
            <p className="text-body text-ink-2 leading-relaxed">{item.brief}</p>
          </article>
        ))}
      </div>

      <SectionBand num="02" label="How to read this" meta="Method" />

      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <div className="text-body text-ink-2 space-y-4">
          <p>
            Every number here is a <b>rate of change</b>, never a total. Size is
            not news: the largest repository on GitHub is not rising, it has
            arrived. What the system looks for is movement, and specifically
            movement that more than one unrelated source noticed at the same
            time.
          </p>
          <p>
            That second condition is the whole method. Stars can be bought,
            backlinks can be built, app installs can be farmed — this project
            has already caught a 161-domain network manufacturing exactly the
            signal one of its sources measures. Faking two unrelated signals
            simultaneously is a different order of effort, so an entry confirmed
            by GitHub <i>and</i> HackerNews, or by the App Store <i>and</i>{" "}
            Google Play, is worth more than one showing a larger number in a
            single place.
          </p>
          <p>
            Sources that share data underneath do not count as two witnesses.
            Where one feed is built partly from another, they are treated as a
            single voice — otherwise a list fills up with one measurement
            agreeing with itself.
          </p>
          <p>
            Entries are written to be read, not scanned. Where something looks
            impressive but is not, the entry says so.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-9 pb-12 font-mono text-micro uppercase tracking-[0.08em] text-ink-3">
        Data through {formatDay(data_through)} · history from{" "}
        {formatDay(stats.first_day)}
      </div>
    </>
  );
}
