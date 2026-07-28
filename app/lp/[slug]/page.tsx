import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { LpLeadForm } from "@/components/LpLeadForm";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { LANDING_PAGES, LANDING_PAGE_BY_SLUG } from "@/lib/landing-pages";

/**
 * Paid-search landing page. One template, one headline per keyword.
 *
 * Every entry in lib/landing-pages.ts becomes a statically rendered page
 * here. Nothing is read from the request, so these pre-render at build
 * time — the ad click hits a static document, and the keyword-specific
 * tracking is picked up client-side by LpLeadForm.
 *
 * All of these are noindex: they target the same terms as the organic
 * site and would otherwise compete with it in search.
 */

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

/** Unknown slugs 404 rather than rendering an empty shell. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = LANDING_PAGE_BY_SLUG[slug];
  if (!page) return {};

  return pageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/lp/${page.slug}`,
    noindex: true,
  });
}

/** "Head — tail" renders the head bold, matching the organic checklists. */
function proofItem(text: string) {
  const [head, ...rest] = text.split(" — ");
  if (rest.length === 0) return text;
  return (
    <>
      <b>{head}</b> — {rest.join(" — ")}
    </>
  );
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = LANDING_PAGE_BY_SLUG[slug];
  if (!page) notFound();

  return (
    <>
      <PageHeader
        current="Request a call"
        title={page.headline}
        lede={page.lede}
        meta={page.stats}
      />

      <SectionBand num="01" label="What You Get" meta="Every brief, every time" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={page.proof.map(proofItem)} />
      </div>

      <SectionBand num="02" label="Send Your Brief" meta="Candidates back in 24–72h" />
      <div className="px-4 sm:px-9 py-8">
        <p className="text-body text-ink-2 max-w-3xl mb-8">
          Tell us the industry, the role or seniority you need, and the decision
          you&apos;re researching. A senior researcher reads it — there is no
          triage queue.
        </p>
        <LpLeadForm
          slug={page.slug}
          messagePlaceholder="Industry, role or seniority needed, and the decision you're researching — a couple of sentences is plenty."
        />
      </div>

      <CtaBand
        title={
          <>
            Rather just talk it through?{" "}
            <span className="text-red">Book 15 minutes.</span>
          </>
        }
        meta={
          <>
            No pitch — a scoping call to work out whether expert calls are the
            right tool for your question. {SITE.hours}.
          </>
        }
        ctaLabel="Book a Scoping Call"
        ctaHref={SITE.calendly}
      />
    </>
  );
}
