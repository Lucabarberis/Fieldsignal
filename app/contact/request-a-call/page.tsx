import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Request an Expert Call - Tell Us Who You Need",
  description:
    "Tell us the industry, role and decision you're researching. We'll propose 10–20 candidate experts within 24–72 hours.",
  path: "/contact/request-a-call",
});

const PREFILL = encodeURIComponent(
  `Hi Miles,

I'd like to request an expert call.

Industry / sector:
Role / seniority needed:
Decision I'm researching:
Geography:
Timeline:
Approx budget:

Thanks,`
);

export default function RequestCallPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
          { name: "Request a call", url: "/contact/request-a-call" },
        ]}
      />

      <PageHeader
        current="Request a call"
        title="Request an expert call."
        lede={
          <>
            Tell us who you need to speak with. We&apos;ll propose <b>10–20 candidate experts</b> within 24–72 hours, vetted and compliance-cleared. From <b>€500 per call</b>.
          </>
        }
        meta={[
          { label: "Candidates proposed", value: "10–20" },
          { label: "Turnaround", value: "24–72h" },
          { label: "Price from", value: "€500" },
          { label: "Commitment", value: "None" },
        ]}
      />

      <SectionBand num="01" label="What To Include" meta="The 6 things we need" />
      <div className="px-9 py-8 max-w-4xl">
        <Checklist items={[
          <><b>Industry / sector</b> — e.g. enterprise SaaS, US hospital systems, EU specialty chemicals</>,
          <><b>Role / seniority</b> — e.g. CISO at a mid-market bank, ex-VP Sales at a hyperscaler</>,
          <><b>Decision you&apos;re researching</b> — e.g. pre-IC validation, channel check, customer voice</>,
          <><b>Geography</b> — single country, multi-region, global</>,
          <><b>Timeline</b> — calls needed by which date</>,
          <><b>Approx budget</b> — helps us pick the right seniority of expert</>,
        ]} />
      </div>

      <SectionBand num="02" label="What Happens Next" meta="From email to call" />
      <div className="px-9 py-8 max-w-4xl space-y-4">
        <p className="text-body text-ink-2">
          You email us with the brief above. A senior researcher acknowledges within <b>4 hours</b> during business hours. Within 24–72 hours we send back 10–20 candidate profiles — anonymised role descriptions plus compliance clearance status.
        </p>
        <p className="text-body text-ink-2">
          You pick the candidates you want. We schedule the calls directly with you. Transcripts arrive within <b>1 business day</b> of each call. Compliance audit trail kept <b>7 years</b>.
        </p>
      </div>

      <CtaBand
        title={<>Send the brief. <span className="text-red">Candidates back in 24h.</span></>}
        meta={<>One email. Pre-filled template opens in your mail client.</>}
        ctaLabel="Email Miles"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Expert call request")}&body=${PREFILL}`}
      />
    </>
  );
}
