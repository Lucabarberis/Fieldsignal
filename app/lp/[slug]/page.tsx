import { notFound } from "next/navigation";
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
 * LAYOUT
 *
 * The form sits in the hero rather than below the sales copy. Measured on
 * the first version, it started 1.6 screens down on mobile: a bought click
 * arrived and had to scroll past a headline, a paragraph and three stats
 * before finding anything to do. Copy left, form right on desktop; on
 * mobile the form follows the headline directly and the supporting
 * material comes after.
 *
 * Chrome is stripped to the wordmark and the legal footer (see Masthead
 * and Footer) — the site nav offered nine ways to leave before the
 * visitor reached the form, including Pricing.
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
      <section className="px-4 sm:px-9 pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-rule">
        <div className="grid lg:grid-cols-[1.05fr_minmax(340px,430px)] gap-10 lg:gap-16 items-start">
          <div>
            <h1 className="font-sans font-medium text-[clamp(34px,5vw,60px)] leading-[1] tracking-[-0.028em] text-ink max-w-3xl">
              {page.headline}
            </h1>
            <p className="mt-6 text-lede text-ink-2 max-w-2xl">{page.lede}</p>
          </div>

          <div className="bg-paper-3 border border-ink p-6 sm:p-7 w-full">
            <p className="font-mono text-mono uppercase tracking-[0.12em] text-ink font-medium">
              Request expert calls
            </p>
            <p className="text-body text-ink-2 mt-2 mb-6">
              Two minutes. A senior researcher reads it — there is no triage
              queue.
            </p>
            <LpLeadForm slug={page.slug} />
          </div>
        </div>

        <dl className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl border-t border-rule pt-8">
          {page.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                {s.label}
              </dt>
              <dd className="font-sans text-[15px] font-semibold text-ink">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <SectionBand num="01" label="What You Get" meta="Every brief, every time" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={page.proof.map(proofItem)} />
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
