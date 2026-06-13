import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Book a Demo - Walkthrough of the Platform",
  description:
    "30-minute walkthrough of expert search, scheduling, transcripts and compliance tools. For institutional buyers.",
  path: "/contact/book-a-demo",
});

const PREFILL = encodeURIComponent(
  `Hi Miles,

I'd like to book a 30-minute platform walkthrough.

Firm / fund / company:
Role:
What you'd like covered (search / transcripts / scheduling / compliance):
Likely use cases:
Approx volume of research per quarter:
Preferred dates / times (and time zone):

Thanks,`
);

export default function BookDemoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
          { name: "Book a demo", url: "/contact/book-a-demo" },
        ]}
      />

      <PageHeader
        current="Book a demo"
        title="Book a platform walkthrough."
        lede={
          <>
            A 30-minute video walkthrough of the platform — expert search, scheduling, transcript library, compliance attestation and audit-trail tooling. For institutional buyers comparing FieldSignal against incumbents.
          </>
        }
        meta={[
          { label: "Length", value: "30 minutes" },
          { label: "Format", value: "Video call" },
          { label: "Coverage", value: "Search · Scheduling · Compliance" },
          { label: "Who attends", value: "Senior FieldSignal lead" },
        ]}
      />

      <SectionBand num="01" label="What We Cover" meta="The 4 sections of the demo" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[
          <><b>Search & discovery</b> — natural-language and faceted search across 50,000+ experts</>,
          <><b>Scheduling & call management</b> — brief, schedule, conduct, document</>,
          <><b>Transcript library</b> — search 5,000+ anonymised transcripts, filter by sector and topic</>,
          <><b>Compliance tooling</b> — pre-call attestation, exclusion-list screening, audit export</>,
        ]} />
      </div>

      <SectionBand num="02" label="Who This Is For" meta="Best-fit audience" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl space-y-4">
        <p className="text-body text-ink-2">
          The demo is most useful for buyers planning to run <b>recurring primary research</b> at scale — hedge funds, PE firms, corporate strategy teams, consulting firms — where the platform features (search, transcripts, audit trail) deliver compounding value vs. ad-hoc per-call work.
        </p>
        <p className="text-body text-ink-2">
          For one-off projects or single-call enquiries, a demo is usually not necessary — the <a href="/contact/request-a-call" className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors">request-a-call</a> flow is faster.
        </p>
      </div>

      <CtaBand
        title={<>Send a few date options. <span className="text-red">We&apos;ll confirm in 4 hours.</span></>}
        meta={<>Pre-filled template opens in your mail client.</>}
        ctaLabel="Email Miles"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Platform demo request")}&body=${PREFILL}`}
      />
    </>
  );
}
