import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { glossary, getGlossaryTerm } from "@/content/data/glossary";
import { services } from "@/content/data/services";
import { useCases } from "@/content/data/use-cases";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return glossary.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getGlossaryTerm(slug);
  if (!t) return {};
  return pageMetadata({
    title: t.title,
    description: t.description,
    path: `/resources/glossary/${slug}`,
  });
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const t = getGlossaryTerm(slug);
  if (!t) notFound();

  const related = t.relatedSlugs
    .map((rs) => getGlossaryTerm(rs))
    .filter((x): x is NonNullable<typeof x> => x !== undefined);

  const linkedService = t.linkedServiceSlug
    ? services.find((s) => s.slug === t.linkedServiceSlug)
    : undefined;
  const linkedUseCase = t.linkedUseCaseSlug
    ? useCases.find((u) => u.slug === t.linkedUseCaseSlug)
    : undefined;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Glossary", url: "/resources/glossary" },
          { name: t.term, url: `/resources/glossary/${slug}` },
        ]}
      />
      <FAQSchema items={t.faq.map((f) => ({ question: f.q, answer: f.a }))} />

      <PageHeader
        current={t.name}
        title={t.term}
        lede={t.definition}
        meta={[
          { label: "Term", value: t.term },
          { label: "Section", value: "Glossary" },
          { label: "Last refreshed", value: "Q1 2026" },
        ]}
      />

      {/* ── 01 — Explanation paragraphs ───────────────────────────── */}
      <SectionBand num="01" label="In Depth" meta="3–5 paragraphs" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl space-y-5">
        {t.explanation.map((p, i) => (
          <p key={i} className="font-sans text-[16px] leading-[1.65] text-ink-2">
            {p}
          </p>
        ))}
      </div>

      {/* ── 02 — Examples ─────────────────────────────────────────── */}
      <SectionBand
        num="02"
        label="Examples"
        meta={`${t.examples.length} concrete cases`}
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...t.examples]} />
      </div>

      {/* ── 03 — FAQ ──────────────────────────────────────────────── */}
      <SectionBand
        num="03"
        label="Frequently Asked"
        meta={`${t.faq.length} questions`}
      />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <dl className="flex flex-col">
            {t.faq.map((f, i) => (
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
                  <p className="font-sans font-semibold text-ink text-[15px] mb-1">
                    {f.q}
                  </p>
                  <p className="text-[13px] leading-[1.55] text-ink-2">{f.a}</p>
                </div>
              </div>
            ))}
          </dl>
        </article>
      </div>

      {/* ── 04 — Linked service + use case ─────────────────────── */}
      {(linkedService || linkedUseCase) && (
        <>
          <SectionBand num="04" label="See Also" meta="Where this applies" />
          <div className="p-4 sm:p-9">
            <TileGrid cols={2}>
              {linkedService && (
                <Tile
                  id="04.1"
                  name={linkedService.name}
                  cta="View service"
                  href={`/services/${linkedService.slug}`}
                  updated="Service"
                >
                  <p>{linkedService.description}</p>
                </Tile>
              )}
              {linkedUseCase && (
                <Tile
                  id="04.2"
                  name={linkedUseCase.name}
                  cta="View use case"
                  href={`/use-cases/${linkedUseCase.slug}`}
                  updated={linkedUseCase.timeline}
                >
                  <p>{linkedUseCase.oneLiner}</p>
                </Tile>
              )}
            </TileGrid>
          </div>
        </>
      )}

      {/* ── 05 — Related glossary terms ────────────────────────── */}
      {related.length > 0 && (
        <>
          <SectionBand
            num="05"
            label="Related Terms"
            meta={`${related.length} suggestions`}
          />
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {related.map((r) => (
                <Tile
                  key={r.slug}
                  id={r.id}
                  name={r.name}
                  cta="Read"
                  href={`/resources/glossary/${r.slug}`}
                  updated="Glossary"
                >
                  <p>
                    {r.definition.length > 120
                      ? r.definition.slice(0, 117) + "…"
                      : r.definition}
                  </p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      {/* ── Back-to-glossary link ──────────────────────────────── */}
      <div className="px-4 sm:px-9 py-6">
        <Link
          href="/resources/glossary"
          className="font-mono text-mono uppercase tracking-[0.12em] text-ink-2 hover:text-red transition-colors"
        >
          ← Back to glossary
        </Link>
      </div>

      <CtaBand
        title={<>Need help applying this concept? <span className="text-red">Tell us the decision.</span></>}
        meta={<>First quote in 24h. We&apos;ll recommend a competitor if we&apos;re not the right fit.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(t.term)}%20enquiry`}
      />
    </>
  );
}
