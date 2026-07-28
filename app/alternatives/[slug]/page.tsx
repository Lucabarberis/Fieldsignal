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
import { alternatives } from "@/content/data/alternatives";
import { competitors, getCompetitor } from "@/content/data/competitors";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return alternatives.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = alternatives.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.description,
    path: `/alternatives/${slug}`,
  });
}

export default async function AlternativePage({ params }: Props) {
  const { slug } = await params;
  const alt = alternatives.find((x) => x.slug === slug);
  if (!alt) notFound();

  const competitor = alt.competitorSlug ? getCompetitor(alt.competitorSlug) : undefined;

  // For category pages, surface 3 representative competitors as comparison cards.
  const categoryComparisons = alt.category
    ? competitors.filter((c) => ["glg", "alphasights", "tegus"].includes(c.slug))
    : [];

  // Sibling alternatives for cross-link block
  const siblings = alternatives.filter((x) => x.slug !== alt.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Alternatives", url: "/alternatives" },
          { name: alt.name, url: `/alternatives/${slug}` },
        ]}
      />
      <FAQSchema items={alt.faq.map((f) => ({ question: f.q, answer: f.a }))} />

      <PageHeader
        current={alt.name}
        title={alt.title.split(" - ")[0]}
        lede={alt.pageLede}
        meta={
          competitor
            ? [
                { label: "Comparing to", value: competitor.name },
                { label: "Founded", value: String(competitor.founded) },
                { label: "HQ", value: competitor.hq },
                { label: "Pricing model", value: competitor.pricing.model },
              ]
            : [
                { label: "Format", value: "Category guide" },
                { label: "Affiliate spin", value: "None" },
              ]
        }
      />

      {/* ── 01 — What incumbent does well (honesty section) ─────── */}
      {competitor && (
        <>
          <SectionBand
            num="01"
            label={`What ${competitor.name} Does Well`}
            meta="The honest praise"
          />
          <div className="px-4 sm:px-9 py-8 max-w-4xl">
            <Checklist items={[...competitor.bestAt]} />
            <p className="text-body text-ink-3 mt-6 text-[13px]">
              Best fit: {competitor.bestFitBuyer}
            </p>
            {alt.reviewPostSlug && (
              <p className="font-sans text-[15px] leading-[1.6] text-ink-2 mt-6 border-l-4 border-red pl-5">
                Still deciding whether {competitor.name} is worth it? Read our
                full{" "}
                <Link
                  href={`/resources/blog/${alt.reviewPostSlug}`}
                  className="text-ink underline underline-offset-2 hover:text-red transition-colors"
                >
                  honest {competitor.name} review
                </Link>{" "}
                — pricing, compliance and where it falls short.
              </p>
            )}
          </div>
        </>
      )}

      {/* ── 02 — When incumbent is the right answer ─────────────── */}
      {alt.whenIncumbentIsRight.length > 0 && (
        <>
          <SectionBand
            num="02"
            label={competitor ? `When ${competitor.name} Is The Right Answer` : "When An Incumbent Network Is Right"}
            meta="Be honest with yourself"
          />
          <div className="px-4 sm:px-9 py-8 max-w-4xl">
            <Checklist items={[...alt.whenIncumbentIsRight]} />
          </div>
        </>
      )}

      {/* ── 03 — When FieldSignal wins ──────────────────────────── */}
      <SectionBand
        num={alt.whenIncumbentIsRight.length > 0 ? "03" : "01"}
        label="When FieldSignal Is The Right Answer"
        meta="Our genuine fit"
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...alt.whenFieldSignalIsRight]} />
      </div>

      {/* ── 04 — Self-qualification ─────────────────────────────── */}
      <SectionBand
        num={alt.whenIncumbentIsRight.length > 0 ? "04" : "02"}
        label="Self-Qualification"
        meta="Save us both time"
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl space-y-4">
        {alt.selfQualify.map((p, i) => (
          <p key={i} className="text-body text-ink-2">
            {p}
          </p>
        ))}
      </div>

      {/* ── 05 — Side-by-side facts (for competitor pages) ──────── */}
      {competitor && (
        <>
          <SectionBand num="05" label="Side-By-Side Facts" meta="What's public" />
          <div className="p-4 sm:p-9">
            <TileGrid cols={2}>
              <article className="bg-paper px-7 pt-6 pb-5">
                <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">05.1</div>
                <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-3 uppercase">
                  {competitor.name}
                </div>
                <dl className="space-y-3 text-[13px]">
                  <Row label="Network size" value={competitor.networkSize} />
                  <Row label="Pricing model" value={competitor.pricing.model} />
                  <Row label="Per-call range" value={competitor.pricing.perCallRange ?? "—"} />
                  <Row label="Annual minimum" value={competitor.pricing.annualMinimum ?? "—"} />
                  <Row label="HQ" value={competitor.hq} />
                  <Row label="Founded" value={String(competitor.founded)} />
                </dl>
              </article>
              <article className="bg-paper px-7 pt-6 pb-5">
                <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">05.2</div>
                <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-3 uppercase">
                  FieldSignal
                </div>
                <dl className="space-y-3 text-[13px]">
                  <Row label="Network size" value="50,000+ experts" />
                  <Row label="Pricing model" value="Per-call · per-project · subscription" />
                  <Row label="Per-call range" value="$200–800" />
                  <Row label="Annual minimum" value="None" />
                  <Row label="HQ" value={SITE.jurisdiction} />
                  <Row label="Founded" value="2024" />
                </dl>
              </article>
            </TileGrid>
          </div>
        </>
      )}

      {/* ── For category pages, show 3-up comparison ─────────────── */}
      {categoryComparisons.length > 0 && (
        <>
          <SectionBand num="03" label="Reference Comparison" meta="3 leading networks" />
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {categoryComparisons.map((c) => (
                <article key={c.slug} className="bg-paper px-7 pt-6 pb-5">
                  <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                    {c.slug.toUpperCase()}
                  </div>
                  <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-3 uppercase">
                    {c.name}
                  </div>
                  <dl className="space-y-2 text-[13px]">
                    <Row label="Model" value={c.pricing.model} />
                    <Row label="Per-call" value={c.pricing.perCallRange ?? "—"} />
                    <Row label="Min annual" value={c.pricing.annualMinimum ?? "—"} />
                  </dl>
                </article>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <SectionBand
        num={competitor ? "06" : (categoryComparisons.length > 0 ? "04" : "03")}
        label="Frequently Asked"
        meta={`${alt.faq.length} questions`}
      />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <dl className="flex flex-col">
            {alt.faq.map((f, i) => (
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

      {/* ── Related alternatives ────────────────────────────────── */}
      <SectionBand
        num={competitor ? "07" : (categoryComparisons.length > 0 ? "05" : "04")}
        label="Other Alternatives Reviews"
        meta={`${siblings.length} more`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {siblings.map((s) => (
            <Tile
              key={s.slug}
              id={s.id}
              name={s.name}
              cta="Read"
              href={`/alternatives/${s.slug}`}
            >
              <p>{s.description}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <CtaBand
        title={
          competitor ? (
            <>Switching from <span className="text-red">{competitor.name}</span>? Tell us why.</>
          ) : (
            <>Brief us. <span className="text-red">First quote in 24h.</span></>
          )
        }
        meta={<>We&apos;ll recommend a competitor if we&apos;re not the right fit.</>}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}

/** Small helper row for the comparison dls. */
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-3 border-t border-rule pt-2">
      <dt className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em]">
        {label}
      </dt>
      <dd className="text-ink text-right text-[13px]">{value}</dd>
    </div>
  );
}
