import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get a Quote - Custom Pricing for Projects",
  description:
    "Tell us scope, sectors and timeline. Quote returned within one business day.",
  path: "/contact/get-a-quote",
});

const PREFILL = encodeURIComponent(
  `Hi Miles,

I'd like to get a quote for a project.

Project type (diligence / VoC / panel / win-loss / custom):
Sectors / sub-sectors involved:
Approx number of calls or interviews:
Methodology mix (calls / surveys / panels / refs):
Geography:
Timeline:
Decision the project supports:
Compliance constraints:

Thanks,`
);

export default function GetQuotePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
          { name: "Get a quote", url: "/contact/get-a-quote" },
        ]}
      />

      <PageHeader
        current="Get a quote"
        title="Get a project quote."
        lede={
          <>
            Multi-call engagement, diligence sprint, voice-of-customer programme or custom intelligence project? Tell us scope, sectors and timeline. Quote back within <b>one business day</b>.
          </>
        }
        meta={[
          { label: "Pricing", value: "Custom per scope" },
          { label: "Quote turnaround", value: "1 business day" },
          { label: "Commitment", value: "None until quote signed" },
        ]}
      />

      <SectionBand num="01" label="What To Include" meta="The 8 things we need" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[
          <><b>Project type</b> — diligence, VoC, panel, win-loss, custom</>,
          <><b>Sectors / sub-sectors</b> — what the project covers</>,
          <><b>Approx number of calls or interviews</b> — even a rough range helps</>,
          <><b>Methodology mix</b> — calls, surveys, panels, management references</>,
          <><b>Geography</b> — country, multi-region, global</>,
          <><b>Timeline</b> — when the findings are needed</>,
          <><b>Decision the project supports</b> — pre-IC, board paper, exec offsite, etc.</>,
          <><b>Compliance constraints</b> — your firm&apos;s pre-call requirements, if any</>,
        ]} />
      </div>

      <SectionBand num="02" label="What You Get Back" meta="The quote format" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl space-y-4">
        <p className="text-body text-ink-2">
          A concise quote document covering: scope, methodology mix, deliverables, milestones, total fee with line items, compliance addendum, and named senior account lead. No surprise fees. No retainer triggers.
        </p>
        <p className="text-body text-ink-2">
          For larger or recurring programmes, the quote can be wrapped into a Master Services Agreement (MSA) covering bespoke compliance clauses, additional insurance, or audit rights. Pre-onboarding compliance questionnaires turned around within <b>5 business days</b>.
        </p>
      </div>

      <CtaBand
        title={<>Send the brief. <span className="text-red">Quote back in 24h.</span></>}
        meta={<>Pre-filled template opens in your mail client.</>}
        ctaLabel="Email Miles"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Project quote request")}&body=${PREFILL}`}
      />
    </>
  );
}
