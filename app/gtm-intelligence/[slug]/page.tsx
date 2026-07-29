import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema, FAQSchema, ServiceSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { gtmPages } from "@/content/data/gtm";
import { caseStudies } from "@/content/data/case-studies";

type Props = { params: Promise<{ slug: string }> };

/** Build-time list of every GTM engagement slug → static page. */
export async function generateStaticParams() {
  return gtmPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = gtmPages.find((p) => p.slug === slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/gtm-intelligence/${slug}`,
  });
}

export default async function GtmEngagementPage({ params }: Props) {
  const { slug } = await params;
  const page = gtmPages.find((p) => p.slug === slug);
  if (!page) notFound();

  const related = page.relatedSlugs
    .map((rs) => gtmPages.find((p) => p.slug === rs))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const studies = page.caseStudySlugs
    .map((cs) => caseStudies.find((c) => c.slug === cs))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const workedStudy = page.worked.studySlug
    ? caseStudies.find((c) => c.slug === page.worked.studySlug)
    : undefined;

  // primaryKW is stored lowercase for keyword hygiene, but the CTA sets it in
  // a display headline where a lowercase "gtm"/"icp" reads as a typo.
  const ctaPhrase = page.primaryKW.replace(/\b(gtm|icp)\b/gi, (m) =>
    m.toUpperCase(),
  );

  // Two sections are conditional, so band numbers are counted rather than
  // hardcoded — otherwise a page without case studies skips a number.
  let seq = 0;
  const step = () => String(++seq).padStart(2, "0");
  const nWho = step();
  const nWhen = step();
  const nAsk = step();
  const nGet = step();
  const nNeed = step();
  const nRuleOut = step();
  const nWorked = step();
  const nLimits = step();
  const nStudies = studies.length > 0 ? step() : null;
  const nFaq = step();
  const nRelated = related.length > 0 ? step() : null;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "GTM Intelligence", url: "/gtm-intelligence" },
          { name: page.name, url: `/gtm-intelligence/${slug}` },
        ]}
      />
      <ServiceSchema
        name={page.name}
        description={page.description}
        url={`${SITE.url}/gtm-intelligence/${slug}`}
      />
      <FAQSchema items={page.faq.map((f) => ({ question: f.q, answer: f.a }))} />

      <PageHeader
        current={page.name}
        title={page.title.split(" - ")[0]}
        lede={page.pageLede}
        meta={[
          { label: "Timeline", value: page.timeline },
          { label: "Pricing", value: "Quoted per scope" },
          { label: "Commitment", value: "Per project, no retainer" },
        ]}
      />

      {/* ── Who we ask ────────────────────────────────────────────────── */}
      <SectionBand num={nWho} label="Who We Ask" meta="Sourcing and screening" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...page.whoWeAsk]} />
        <p className="text-body text-ink-2 mt-6">
          Every expert is at least six months removed from any company they are asked to
          discuss. No material non-public information may be requested or shared, calls
          are monitored, and the audit trail is kept for seven years under the{" "}
          <Link
            href="/compliance"
            className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
          >
            FieldSignal compliance framework
          </Link>
          .
        </p>
      </div>

      {/* ── When to run it ────────────────────────────────────────────── */}
      <SectionBand
        num={nWhen}
        label="When To Run It"
        meta={`${page.whenToRun.length} trigger moments`}
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...page.whenToRun]} />
      </div>

      {/* ── Questions we ask ──────────────────────────────────────────── */}
      <SectionBand
        num={nAsk}
        label="Questions We Put To Them"
        meta={`${page.questionsWeAsk.length} examples`}
      />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
          <dl className="flex flex-col">
            {page.questionsWeAsk.map((q, i) => (
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

      {/* ── What you get ──────────────────────────────────────────────── */}
      <SectionBand num={nGet} label="What You Get" meta="Deliverables" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...page.whatYouGet]} />
      </div>

      {/* ── What we need ──────────────────────────────────────────────── */}
      <SectionBand
        num={nNeed}
        label="What We Need From You"
        meta="Before the kick-off"
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...page.whatWeNeed]} />
      </div>

      {/* ── The negative result ───────────────────────────────────────── */}
      <SectionBand num={nRuleOut} label={page.ruleOut.label} meta={page.ruleOut.meta} />
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          {page.ruleOut.items.map((item, i) => (
            <article key={item.name} className="bg-paper px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                {nRuleOut}.{i + 1}
              </div>
              <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2.5 uppercase">
                {item.name}
              </div>
              <p className="text-[13px] leading-[1.55] text-ink-2">{item.why}</p>
            </article>
          ))}
        </TileGrid>
      </div>

      {/* ── Worked example ────────────────────────────────────────────── */}
      <SectionBand
        num={nWorked}
        label="A Worked Example"
        meta={workedStudy ? "Anonymised, published in full" : "Across our published work"}
      />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-5 pt-5 pb-5 sm:px-7 sm:pt-6">
          <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
            {nWorked}.0
          </div>
          <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink uppercase">
            {page.worked.label}
          </div>

          <dl className="flex flex-col mt-4">
            {[
              { k: "The situation", v: page.worked.setup },
              { k: "What we did", v: page.worked.did },
              { k: "What came back", v: page.worked.found },
            ].map((row, i) => (
              <div
                key={row.k}
                className={`grid grid-cols-1 md:grid-cols-[150px_1fr] gap-x-6 gap-y-1 py-4 ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 md:pt-0.5">
                  {row.k}
                </dt>
                <dd className="text-[14px] leading-[1.6] text-ink-2">{row.v}</dd>
              </div>
            ))}
          </dl>

          {workedStudy && (
            <div className="mt-1 pt-3 border-t border-rule">
              <Link
                href={`/resources/case-studies/${workedStudy.slug}`}
                className="font-mono text-micro uppercase tracking-[0.06em] text-ink hover:text-red transition-colors"
              >
                Read the full study →
              </Link>
            </div>
          )}
        </article>
      </div>

      {/* ── Honest limits ─────────────────────────────────────────────── */}
      <SectionBand
        num={nLimits}
        label="What This Will Not Tell You"
        meta="Limits, stated upfront"
      />
      <div className="px-4 sm:px-9 pt-6 max-w-3xl">
        <p className="text-body text-ink-2">
          Every research method has a boundary. Here is where this one sits, so you can
          decide before you commission it rather than find out at the read-out.
        </p>
      </div>
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          {page.limits.map((item, i) => (
            <article key={item.name} className="bg-paper px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                {nLimits}.{i + 1}
              </div>
              <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2.5 uppercase">
                {item.name}
              </div>
              <p className="text-[13px] leading-[1.55] text-ink-2">{item.why}</p>
            </article>
          ))}
        </TileGrid>
      </div>

      {/* ── Evidence ──────────────────────────────────────────────────── */}
      {nStudies && (
        <>
          <SectionBand
            num={nStudies}
            label="Where We Have Run This"
            meta={`${studies.length} anonymised ${studies.length === 1 ? "study" : "studies"}`}
          />
          <div className="p-4 sm:p-9">
            {/* Two studies in a 3-up grid leaves two-thirds of the row as
                bare rule colour. Drop to 2-up so the row fills. */}
            <TileGrid cols={studies.length >= 3 ? 3 : 2}>
              {studies.map((cs) => (
                <Tile
                  key={cs.slug}
                  id={cs.id}
                  name={cs.name}
                  meta={<b className="text-ink">{cs.fundProfile}</b>}
                  cta="Read study"
                  href={`/resources/case-studies/${cs.slug}`}
                  updated={cs.timeline}
                >
                  <p>{cs.oneLiner}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <SectionBand num={nFaq} label="Questions" meta={`${page.faq.length} answers`} />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <dl className="flex flex-col">
          {page.faq.map((f, i) => (
            <div key={f.q} className={`py-5 ${i > 0 ? "border-t border-rule" : ""}`}>
              <dt className="font-sans font-semibold text-[16px] tracking-[-0.01em] text-ink">
                <span className="font-mono text-mono text-red font-semibold mr-3 opacity-[0.78]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.q}
              </dt>
              <dd className="text-body text-ink-2 mt-2.5 sm:pl-9">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Related engagements ───────────────────────────────────────── */}
      {nRelated && (
        <>
          <SectionBand
            num={nRelated}
            label="Related Engagements"
            meta={`${related.length} suggestions`}
          />
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {related.map((r) => (
                <Tile
                  key={r.slug}
                  id={r.id}
                  name={r.name}
                  meta={<>Timeline · <b>{r.timeline}</b></>}
                  cta="View engagement"
                  href={`/gtm-intelligence/${r.slug}`}
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
            Brief us on <span className="text-red">{ctaPhrase}</span>.
          </>
        }
        meta={<>Response under 4 hours, {SITE.hours}. First call in 3–5 business days.</>}
        ctaLabel="Brief Us"
        ctaHref="/contact"
      />
    </>
  );
}
