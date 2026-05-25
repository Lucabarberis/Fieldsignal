import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema, ArticleSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getAllTranscripts, getTranscriptBySlug } from "@/lib/db/transcripts";
import { industries } from "@/content/data/industries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const all = await getAllTranscripts();
  return all.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranscriptBySlug(slug);
  if (!t) return {};
  return pageMetadata({
    // Per brief §4.14: meta = first 140 chars of summary
    title: t.title,
    description:
      t.description.length > 160 ? `${t.description.slice(0, 157)}…` : t.description,
    path: `/transcripts/${slug}`,
  });
}

export default async function TranscriptPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranscriptBySlug(slug);
  if (!t) notFound();

  // Related transcripts for cross-link
  const relatedRaw = await Promise.all(
    t.relatedSlugs.map((rs) => getTranscriptBySlug(rs)),
  );
  const related = relatedRaw.filter((x): x is NonNullable<typeof x> => x !== null);

  // Industry display names for the meta row
  const industryNames = t.industrySlugs
    .map((s) => industries.find((i) => i.slug === s)?.name ?? s)
    .join(" · ");

  // Approximate preview word count (display only)
  const previewWords = t.preview.split(/\s+/).length;
  const gatedWords = t.wordCount - previewWords;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Transcripts", url: "/transcripts" },
          { name: t.topicLabel, url: `/transcripts/by-topic/${t.topicSlug}` },
          { name: t.title, url: `/transcripts/${slug}` },
        ]}
      />
      <ArticleSchema
        headline={t.title}
        description={t.description}
        url={`${SITE.url}/transcripts/${slug}`}
        datePublished={t.publishedAt}
        author="FieldSignal (anonymised)"
      />

      <PageHeader
        current="Transcript"
        title={t.topicLabel}
        lede={t.expertRole}
        meta={[
          { label: "Topic", value: t.topicLabel },
          { label: "Industries", value: industryNames || "—" },
          { label: "Published", value: new Date(t.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "2-digit" }) },
          { label: "Length", value: `${t.wordCount.toLocaleString()} words` },
        ]}
      />

      {/* ── 01 — Free preview (300-500 words per brief §4.14) ─────── */}
      <SectionBand
        num="01"
        label="Free Preview"
        meta={`${previewWords} words · free to read`}
      />
      <div className="p-9">
        <article className="bg-paper px-7 pt-6 pb-5 max-w-4xl">
          <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-3 uppercase">
            {t.expertRole}
          </div>
          <div className="prose prose-ink max-w-none">
            {t.preview.split(/\n\n+/).map((para, i) => (
              <p
                key={i}
                className="font-sans text-[16px] leading-[1.65] text-ink-2 mb-5"
              >
                {para}
              </p>
            ))}
          </div>
        </article>
      </div>

      {/* ── 02 — Gated section (subscription required) ───────────── */}
      <SectionBand
        num="02"
        label="Full Transcript"
        meta={`${gatedWords.toLocaleString()} more words · subscription required`}
      />
      <div className="p-9">
        <article className="bg-ink text-paper px-9 py-10 max-w-4xl">
          <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-3 uppercase tracking-[0.08em]">
            02.1 — What&apos;s in the full transcript
          </div>
          <p className="font-sans text-[16px] leading-[1.65] text-paper/85 mb-5">
            {t.gatedTeaser}
          </p>
          <p className="font-sans text-[14px] leading-[1.55] text-paper/60 mb-6">
            Full transcript ({gatedWords.toLocaleString()}+ words) available to subscribers.
            Anonymised, MNPI-screened, compliance-audited. Search the full library across
            all transcripts and topics.
          </p>
          <a
            href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Transcript subscription: " + t.topicLabel)}`}
            className="inline-block bg-red text-paper px-6 py-3 font-mono text-mono uppercase font-semibold tracking-[0.14em] hover:bg-paper hover:text-ink transition-colors"
          >
            Subscribe — €99/mo
          </a>
        </article>
      </div>

      {/* ── 03 — Compliance disclosure ────────────────────────────── */}
      <SectionBand
        num="03"
        label="Compliance & Anonymity"
        meta="How this transcript was produced"
      />
      <div className="px-9 py-8 max-w-4xl">
        <p className="text-body text-ink-2">
          This transcript is fully anonymised — expert identity is replaced with a
          role-based descriptor; client identity is removed. Content has been reviewed
          for MNPI (material non-public information) exposure before publication; calls
          flagged with potential MNPI risk are excluded from the library entirely.
          {" "}
          <a
            href="/compliance"
            className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
          >
            See our compliance framework
          </a>{" "}
          for full detail.
        </p>
      </div>

      {/* ── 04 — Related transcripts ──────────────────────────────── */}
      {related.length > 0 && (
        <>
          <SectionBand
            num="04"
            label="Related Transcripts"
            meta={`${related.length} similar`}
          />
          <div className="p-9">
            <TileGrid cols={3}>
              {related.map((r) => (
                <Tile
                  key={r.slug}
                  id={r.id}
                  name={r.topicLabel.toUpperCase()}
                  meta={<b className="text-ink">{r.expertRole}</b>}
                  cta="Read preview"
                  href={`/transcripts/${r.slug}`}
                  updated={`${r.wordCount.toLocaleString()} words`}
                >
                  <p>{r.description}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={<>Need <span className="text-red">a custom expert call</span> on this topic?</>}
        meta={<>We&apos;ll source a similar expert for a bespoke 1:1 within 72h.</>}
        ctaLabel="Brief us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Custom expert call: " + t.topicLabel)}`}
      />
    </>
  );
}
