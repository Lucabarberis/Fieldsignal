import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TrackLpSubmit } from "@/components/TrackLpSubmit";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { isLandingPageSlug } from "@/lib/landing-pages";

/**
 * Thank-you page for paid-search leads.
 *
 * Reached only via the 303 from /api/contact, carrying ?kw=<slug>. Two
 * jobs: fire the conversion event with the keyword attached, and offer
 * the scheduling link as the obvious next step — a booked call is the
 * metric that actually matters, and the moment just after someone
 * submits is the cheapest time to get one.
 */

export const metadata = pageMetadata({
  title: "Brief Received",
  description:
    "Your brief is with a senior researcher. Candidate experts back within 24–72 hours.",
  path: "/lp/thank-you",
  noindex: true,
});

export default async function LpThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = typeof params.kw === "string" ? params.kw : "";
  const keywordSlug = isLandingPageSlug(raw) ? raw : "";

  return (
    <>
      <TrackLpSubmit keywordSlug={keywordSlug} />

      <PageHeader
        current="Thank you"
        title="Brief received."
        lede={
          <>
            A senior researcher has it — <b>not a triage queue</b>. You&apos;ll
            hear back within 4 hours during business hours, with candidate
            experts inside 24–72 hours.
          </>
        }
        meta={[
          { label: "First response", value: "< 4h typical" },
          { label: "Candidates", value: "24–72h" },
          { label: "Working week", value: SITE.hours },
        ]}
      />

      <section className="bg-ink text-paper border-t-2 border-red px-4 py-14 sm:px-9 sm:py-20">
        <div className="max-w-5xl">
          <h2 className="font-sans font-medium text-[clamp(36px,5vw,52px)] leading-[1] tracking-[-0.028em]">
            Want to skip the wait?{" "}
            <span className="text-red">Grab 15 minutes now.</span>
          </h2>
          <div className="mt-5 font-mono text-mono uppercase tracking-[0.08em] text-paper/60">
            Pick a slot and we&apos;ll scope the brief live — usually faster
            than doing it over email.
          </div>
          <a
            href={SITE.calendly}
            className="inline-flex items-center gap-2 mt-7 bg-red text-paper px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-paper hover:text-ink transition-colors"
          >
            Book a Scoping Call →
          </a>
        </div>
      </section>

      <div className="px-4 sm:px-9 py-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/transcripts"
          className="inline-flex items-center gap-2 border border-ink text-ink px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
        >
          Browse Transcripts →
        </Link>
        <Link
          href="/resources/case-studies"
          className="inline-flex items-center gap-2 border border-ink text-ink px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
        >
          Read Case Studies →
        </Link>
      </div>
    </>
  );
}
