import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import {
  getAllTranscripts,
  getAllTranscriptIndustrySlugs,
  getAllTranscriptCompanySlugs,
  getAllTranscriptTopicSlugs,
} from "@/lib/db/transcripts";
import { industries } from "@/content/data/industries";

export const metadata = pageMetadata({
  title: "Expert Call Transcripts - Anonymised Interviews",
  description:
    "Search anonymised expert interview transcripts across tech, healthcare, finance, consumer and industrials. Free previews, full transcripts via subscription.",
  path: "/transcripts",
});

export default async function TranscriptsHubPage() {
  // Repo returns newest-first already
  const transcripts = await getAllTranscripts();
  const sorted = transcripts;

  const industrySlugs = await getAllTranscriptIndustrySlugs();
  const companies = await getAllTranscriptCompanySlugs();
  const topics = await getAllTranscriptTopicSlugs();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Transcripts", url: "/transcripts" },
        ]}
      />

      <PageHeader
        current="Transcripts"
        title="Expert call transcripts."
        lede={
          <>
            Anonymised expert call transcripts across the major sectors we cover. <b>300-500 word free previews on every transcript.</b> Full content via subscription. New transcripts added weekly.
          </>
        }
        meta={[
          { label: "Transcripts live", value: `${sorted.length}` },
          { label: "Industries", value: `${industrySlugs.length}` },
          { label: "Topics", value: `${topics.length}` },
          { label: "Cadence", value: "Weekly additions" },
        ]}
      />

      {/* ── 01 — Browse by industry ───────────────────────────────── */}
      <SectionBand
        num="01"
        label="By Industry"
        meta={`${industrySlugs.length} sectors`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {industrySlugs.map((slug, i) => {
            const ind = industries.find((x) => x.slug === slug);
            const count = sorted.filter((t) =>
              t.industrySlugs.includes(slug),
            ).length;
            return (
              <Tile
                key={slug}
                id={`01.${i + 1}`}
                name={ind ? ind.name : slug.toUpperCase()}
                meta={<b className="text-ink">{count} transcript{count === 1 ? "" : "s"}</b>}
                cta="Browse"
                href={`/transcripts/by-industry/${slug}`}
                updated="Live"
              >
                <p>{ind ? ind.oneLiner : `Transcripts in ${slug}.`}</p>
              </Tile>
            );
          })}
        </TileGrid>
      </div>

      {/* ── 02 — Browse by topic ─────────────────────────────────── */}
      <SectionBand
        num="02"
        label="By Topic"
        meta={`${topics.length} topics`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {topics.map((t, i) => {
            const count = sorted.filter((tr) => tr.topicSlug === t.slug).length;
            return (
              <Tile
                key={t.slug}
                id={`02.${i + 1}`}
                name={t.label.toUpperCase()}
                meta={<b className="text-ink">{count} transcript{count === 1 ? "" : "s"}</b>}
                cta="Browse"
                href={`/transcripts/by-topic/${t.slug}`}
                updated="Live"
              >
                <p>{t.label} — anonymised expert perspective.</p>
              </Tile>
            );
          })}
        </TileGrid>
      </div>

      {/* ── 03 — Browse by company context ───────────────────────── */}
      <SectionBand
        num="03"
        label="By Company Context"
        meta={`${companies.length} anonymised`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {companies.map((c, i) => {
            const count = sorted.filter((tr) => tr.companySlug === c.slug).length;
            return (
              <Tile
                key={c.slug}
                id={`03.${i + 1}`}
                name={c.label.toUpperCase()}
                meta={<b className="text-ink">{count} transcript{count === 1 ? "" : "s"}</b>}
                cta="Browse"
                href={`/transcripts/by-company/${c.slug}`}
                updated="Live"
              >
                <p>Transcripts referencing {c.label.toLowerCase()}.</p>
              </Tile>
            );
          })}
        </TileGrid>
      </div>

      {/* ── 04 — Recent transcripts ──────────────────────────────── */}
      <SectionBand
        num="04"
        label="Recently Added"
        meta={`${Math.min(6, sorted.length)} latest`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {sorted.slice(0, 6).map((t) => (
            <Tile
              key={t.slug}
              id={t.id}
              name={t.topicLabel.toUpperCase()}
              meta={
                <>
                  {new Date(t.publishedAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </>
              }
              cta="Read preview"
              href={`/transcripts/${t.slug}`}
              updated={`${t.wordCount.toLocaleString()} words`}
            >
              <p>{t.expertRole}</p>
            </Tile>
          ))}
        </TileGrid>
        <div className="mt-6">
          <Link
            href="/contact/book-a-demo"
            className="font-mono text-mono uppercase tracking-[0.14em] text-ink hover:text-red transition-colors"
          >
            Full-library access → talk to us
          </Link>
        </div>
      </div>

      <CtaBand
        title={<>Want full transcripts? <span className="text-red">Subscribe to the library.</span></>}
        meta={<>Searchable library access. Cancel anytime.</>}
        ctaLabel="Subscribe"
        ctaHref={`mailto:${SITE.contactEmail}?subject=Transcript%20library%20subscription`}
      />
    </>
  );
}
