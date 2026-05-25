import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { compares } from "@/content/data/compare";
import { getCompetitor } from "@/content/data/competitors";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return compares.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = compares.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({
    title: c.title,
    description: c.description,
    path: `/compare/${slug}`,
  });
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const cmp = compares.find((x) => x.slug === slug);
  if (!cmp) notFound();

  const competitor = getCompetitor(cmp.competitorSlug);
  if (!competitor) notFound();

  // Sibling comparisons for cross-link block
  const siblings = compares.filter((x) => x.slug !== cmp.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Compare", url: "/compare" },
          { name: `FieldSignal vs ${competitor.name}`, url: `/compare/${slug}` },
        ]}
      />
      <FAQSchema items={cmp.faq.map((f) => ({ question: f.q, answer: f.a }))} />

      <PageHeader
        current={`vs ${competitor.name}`}
        title={`FieldSignal vs ${competitor.name}.`}
        lede={cmp.pageLede}
        meta={[
          { label: "Comparing to", value: competitor.name },
          { label: "Founded", value: String(competitor.founded) },
          { label: "HQ", value: competitor.hq },
          { label: "Last refreshed", value: "Q1 2026" },
        ]}
      />

      {/* ── 01 — Verdict (one-line) ───────────────────────────────── */}
      <SectionBand num="01" label="Verdict" meta="One sentence" />
      <div className="px-9 py-8 max-w-4xl">
        <p className="font-sans text-[20px] leading-[1.45] text-ink">
          {cmp.verdict}
        </p>
      </div>

      {/* ── 02 — Feature matrix ───────────────────────────────────── */}
      <SectionBand
        num="02"
        label="Feature Comparison"
        meta={`${cmp.featureMatrix.length} rows`}
      />
      <div className="p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-x-6 pb-3 border-b border-rule">
            <div className="font-mono text-mono text-ink-3 uppercase tracking-[0.08em]">
              Feature
            </div>
            <div className="font-mono text-mono text-red font-semibold uppercase tracking-[0.08em]">
              FieldSignal
            </div>
            <div className="font-mono text-mono text-ink uppercase tracking-[0.08em]">
              {competitor.name}
            </div>
          </div>
          {cmp.featureMatrix.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_1fr_1fr] gap-x-6 py-3 ${
                i < cmp.featureMatrix.length - 1 ? "border-b border-rule" : ""
              }`}
            >
              <div className="text-[13px] text-ink-2 leading-[1.5]">{row.feature}</div>
              <div className="text-[13px] text-ink leading-[1.5]">{row.fieldsignal}</div>
              <div className="text-[13px] text-ink-2 leading-[1.5]">{row.competitor}</div>
            </div>
          ))}
        </article>
      </div>

      {/* ── 03 — Pricing matrix ───────────────────────────────────── */}
      <SectionBand
        num="03"
        label="Pricing Comparison"
        meta={`${cmp.pricingMatrix.length} rows`}
      />
      <div className="p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-x-6 pb-3 border-b border-rule">
            <div className="font-mono text-mono text-ink-3 uppercase tracking-[0.08em]">
              Dimension
            </div>
            <div className="font-mono text-mono text-red font-semibold uppercase tracking-[0.08em]">
              FieldSignal
            </div>
            <div className="font-mono text-mono text-ink uppercase tracking-[0.08em]">
              {competitor.name}
            </div>
          </div>
          {cmp.pricingMatrix.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_1fr_1fr] gap-x-6 py-3 ${
                i < cmp.pricingMatrix.length - 1 ? "border-b border-rule" : ""
              }`}
            >
              <div className="text-[13px] text-ink-2 leading-[1.5]">{row.feature}</div>
              <div className="text-[13px] text-ink leading-[1.5]">{row.fieldsignal}</div>
              <div className="text-[13px] text-ink-2 leading-[1.5]">{row.competitor}</div>
            </div>
          ))}
        </article>
      </div>

      {/* ── 04 — Choose [Competitor] if … ─────────────────────────── */}
      <SectionBand
        num="04"
        label={`Choose ${competitor.name} If`}
        meta="When they win"
      />
      <div className="px-9 py-8 max-w-4xl">
        <Checklist items={[...cmp.chooseCompetitorIf]} />
      </div>

      {/* ── 05 — Choose FieldSignal if … ──────────────────────────── */}
      <SectionBand
        num="05"
        label="Choose FieldSignal If"
        meta="When we win"
      />
      <div className="px-9 py-8 max-w-4xl">
        <Checklist items={[...cmp.chooseFieldsignalIf]} />
      </div>

      {/* ── 06 — Switching guide ──────────────────────────────────── */}
      <SectionBand
        num="06"
        label="Switching Guide"
        meta={`${cmp.switchingSteps.length} steps`}
      />
      <div className="p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <ol className="flex flex-col">
            {cmp.switchingSteps.map((step, i) => (
              <li
                key={i}
                className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-4 ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-[14px] leading-[1.55] text-ink-2">{step}</p>
              </li>
            ))}
          </ol>
        </article>
      </div>

      {/* ── 07 — FAQ ──────────────────────────────────────────────── */}
      <SectionBand
        num="07"
        label="Frequently Asked"
        meta={`${cmp.faq.length} questions`}
      />
      <div className="p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <dl className="flex flex-col">
            {cmp.faq.map((f, i) => (
              <div
                key={f.q}
                className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-4 ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <dt className="font-mono text-mono text-red font-semibold opacity-[0.78] mt-0.5">
                  Q.{String(i + 1).padStart(2, "0")}
                </dt>
                <div>
                  <p className="font-sans font-semibold text-ink text-[15px] mb-1">{f.q}</p>
                  <p className="text-[13px] leading-[1.55] text-ink-2">{f.a}</p>
                </div>
              </div>
            ))}
          </dl>
        </article>
      </div>

      {/* ── 08 — Related comparisons ──────────────────────────────── */}
      <SectionBand
        num="08"
        label="Other Comparisons"
        meta={`${siblings.length} more`}
      />
      <div className="p-9">
        <TileGrid cols={3}>
          {siblings.map((s) => {
            const sc = getCompetitor(s.competitorSlug);
            return (
              <Tile
                key={s.slug}
                id={s.id}
                name={s.name}
                meta={sc ? <b className="text-ink">vs {sc.name}</b> : undefined}
                cta="Read"
                href={`/compare/${s.slug}`}
                updated="Q1 2026"
              >
                <p>{s.description}</p>
              </Tile>
            );
          })}
        </TileGrid>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <CtaBand
        title={
          <>Switching from <span className="text-red">{competitor.name}</span>? Brief us.</>
        }
        meta={<>First quote in 24h. We&apos;ll recommend a competitor if we&apos;re not the right fit.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(`FieldSignal vs ${competitor.name}`)}%20enquiry`}
      />
    </>
  );
}
