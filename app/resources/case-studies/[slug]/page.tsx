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
import {
  caseStudies,
  CASE_STUDY_CATEGORIES,
} from "@/content/data/case-studies";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((x) => x.slug === slug);
  if (!cs) return {};
  return pageMetadata({
    title: cs.title,
    description:
      cs.description.length > 160 ? `${cs.description.slice(0, 157)}…` : cs.description,
    path: `/resources/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = caseStudies.find((x) => x.slug === slug);
  if (!cs) notFound();

  const categoryLabel =
    CASE_STUDY_CATEGORIES.find((c) => c.key === cs.category)?.label ?? "Case Study";

  const related = cs.relatedSlugs
    .map((rs) => caseStudies.find((x) => x.slug === rs))
    .filter((x): x is NonNullable<typeof x> => x !== undefined);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Case Studies", url: "/resources/case-studies" },
          { name: cs.name, url: `/resources/case-studies/${slug}` },
        ]}
      />

      <PageHeader
        current={categoryLabel}
        title={cs.title.split(" - ")[0]}
        lede={cs.pageLede}
        meta={[
          { label: "Client", value: cs.fundProfile },
          { label: "Sector", value: cs.sector },
          { label: "Engagement", value: cs.engagementType },
          { label: "Timeline", value: cs.timeline },
        ]}
      />

      {/* ── 01 — The Challenge ─────────────────────────────────────── */}
      <SectionBand num="01" label="The Challenge" meta="What was at stake" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <p className="font-sans text-[16px] leading-[1.65] text-ink-2">
          {cs.challenge}
        </p>
      </div>

      {/* ── 02 — Approach ──────────────────────────────────────────── */}
      <SectionBand
        num="02"
        label="How We Approached It"
        meta={`${cs.approach.length} steps`}
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...cs.approach]} />
      </div>

      {/* ── 03 — What We Delivered ─────────────────────────────────── */}
      <SectionBand
        num="03"
        label="What We Delivered"
        meta={`${cs.delivered.length} outputs`}
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...cs.delivered]} />
      </div>

      {/* ── 04 — Outcome + metrics strip ───────────────────────────── */}
      <SectionBand num="04" label="Outcome" meta="What it changed" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...cs.outcome]} />
      </div>
      <div className="p-4 sm:p-9 pt-0">
        <TileGrid cols={4}>
          {cs.metrics.map((m) => (
            <article key={m.label} className="bg-paper px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
              <div className="font-sans font-medium text-[clamp(22px,3vw,30px)] leading-[1.05] tracking-[-0.02em] text-ink">
                {m.value}
              </div>
              <div className="mt-2 font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                {m.label}
              </div>
            </article>
          ))}
        </TileGrid>
      </div>

      {/* ── 05 — Client voice (dark band) ──────────────────────────── */}
      <SectionBand num="05" label="In Their Words" meta="Anonymised, role-based" />
      <div className="p-4 sm:p-9">
        <blockquote className="bg-ink text-paper px-4 sm:px-9 py-10 max-w-4xl">
          <p className="font-sans text-[clamp(19px,2.4vw,26px)] leading-[1.4] tracking-[-0.01em] text-paper">
            “{cs.quote.text}”
          </p>
          <footer className="mt-6 font-mono text-mono uppercase tracking-[0.12em] text-red">
            {cs.quote.role}
          </footer>
        </blockquote>
      </div>

      {/* ── 06 — Compliance & anonymity ────────────────────────────── */}
      <SectionBand
        num="06"
        label="Anonymity & Compliance"
        meta="How this study was produced"
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <p className="text-body text-ink-2">
          This is a representative, anonymised composite of a typical{" "}
          {categoryLabel.toLowerCase()} engagement. Client identity is removed and the
          figures illustrate the format and scale of the work — they are not a record of
          a single named mandate. Every expert call is scoped to general market knowledge,
          screened for material non-public information before findings reach a deal team,
          and documented for audit.{" "}
          <a
            href="/compliance"
            className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
          >
            See our compliance framework
          </a>{" "}
          for full detail.
        </p>
      </div>

      {/* ── 07 — Related studies ───────────────────────────────────── */}
      {related.length > 0 && (
        <>
          <SectionBand
            num="07"
            label="Related Case Studies"
            meta={`${related.length} similar`}
          />
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {related.map((r) => (
                <Tile
                  key={r.slug}
                  id={r.id}
                  name={r.name}
                  meta={<b className="text-ink">{r.fundProfile}</b>}
                  cta="Read study"
                  href={`/resources/case-studies/${r.slug}`}
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
          <>
            Running the same decision?{" "}
            <span className="text-red">Brief us.</span>
          </>
        }
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(cs.name + " — enquiry")}`}
      />
    </>
  );
}
