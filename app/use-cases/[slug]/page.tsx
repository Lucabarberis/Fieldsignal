import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { useCases } from "@/content/data/use-cases";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = useCases.find((x) => x.slug === slug);
  if (!u) return {};
  return pageMetadata({
    title: u.title,
    description: u.description,
    path: `/use-cases/${slug}`,
  });
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const uc = useCases.find((x) => x.slug === slug);
  if (!uc) notFound();

  const related = uc.relatedSlugs
    .map((rs) => useCases.find((u) => u.slug === rs))
    .filter((u): u is NonNullable<typeof u> => u !== undefined);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Use Cases", url: "/use-cases" },
          { name: uc.name, url: `/use-cases/${slug}` },
        ]}
      />

      <PageHeader
        current={uc.name}
        title={uc.title.split(" - ")[0]}
        lede={uc.pageLede}
        meta={[
          { label: "Discipline", value: uc.primaryKW },
          { label: "Timeline", value: uc.timeline },
          { label: "Format", value: "Project or programme" },
        ]}
      />

      {/* ── 01 — What it is ───────────────────────────────────────── */}
      <SectionBand num="01" label="What It Is" meta="Discipline definition" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <p className="font-sans text-[17px] leading-[1.5] text-ink">
          {uc.whatItIs}
        </p>
      </div>

      {/* ── 02 — When to run it ───────────────────────────────────── */}
      <SectionBand
        num="02"
        label="When To Run It"
        meta={`${uc.whenToRun.length} trigger moments`}
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...uc.whenToRun]} />
      </div>

      {/* ── 03 — How FieldSignal delivers ─────────────────────────── */}
      <SectionBand
        num="03"
        label="How FieldSignal Delivers"
        meta="Our approach"
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...uc.howWeDeliver]} />
      </div>

      {/* ── 04 — Sample questions ─────────────────────────────────── */}
      <SectionBand
        num="04"
        label="Sample Questions"
        meta={`${uc.sampleQuestions.length} examples`}
      />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <dl className="flex flex-col">
            {uc.sampleQuestions.map((q, i) => (
              <div
                key={q}
                className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-4 ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <dt className="font-mono text-mono text-red font-semibold opacity-[0.78] mt-0.5">
                  Q.{String(i + 1).padStart(2, "0")}
                </dt>
                <p className="text-[14px] leading-[1.55] text-ink-2">{q}</p>
              </div>
            ))}
          </dl>
        </article>
      </div>

      {/* ── 05 — Pricing + timeline ──────────────────────────────── */}
      <SectionBand
        num="05"
        label="Pricing & Timeline"
        meta="Honest ranges"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          <article className="bg-paper px-7 pt-6 pb-5">
            <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
              05.1
            </div>
            <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-3 uppercase">
              Pricing range
            </div>
            <p className="text-[15px] leading-[1.5] text-ink">{uc.pricingRange}</p>
            <p className="text-[12px] text-ink-3 mt-3">
              Range reflects project size and complexity. Smaller engagements possible — ask.
            </p>
          </article>
          <article className="bg-paper px-7 pt-6 pb-5">
            <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
              05.2
            </div>
            <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-3 uppercase">
              Timeline
            </div>
            <p className="text-[15px] leading-[1.5] text-ink">{uc.timeline}</p>
            <p className="text-[12px] text-ink-3 mt-3">
              Accelerated timelines available for live transactions or competitive launches.
            </p>
          </article>
        </TileGrid>
      </div>

      {/* ── 06 — Related use cases ────────────────────────────────── */}
      {related.length > 0 && (
        <>
          <SectionBand
            num="06"
            label="Related Disciplines"
            meta={`${related.length} suggestions`}
          />
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {related.map((r) => (
                <Tile
                  key={r.slug}
                  id={r.id}
                  name={r.name}
                  meta={<b className="text-ink">{r.primaryKW}</b>}
                  cta="View"
                  href={`/use-cases/${r.slug}`}
                  updated={r.timeline}
                >
                  <p>{r.oneLiner}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={
          <>Run <span className="text-red">{uc.primaryKW}</span> with us. Brief in 24h.</>
        }
        meta={<>We&apos;ll tell you if the discipline doesn&apos;t fit the decision.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(uc.name)}%20enquiry`}
      />
    </>
  );
}
