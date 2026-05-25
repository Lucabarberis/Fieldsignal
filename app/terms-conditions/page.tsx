import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { Checklist } from "@/components/Checklist";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms governing access to and use of the FieldSignal website, services and materials operated by Growth Insights Limited (HK SAR).",
  path: "/terms-conditions",
});

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-9 py-8 max-w-4xl">
      <div className="text-body text-ink-2 space-y-4">{children}</div>
    </div>
  );
}

export default function TermsConditionsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Terms & Conditions", url: "/terms-conditions" },
        ]}
      />

      <PageHeader
        current="Terms & Conditions"
        title="Terms & Conditions"
        lede={
          <>
            Welcome to FieldSignal. These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the FieldSignal website, services, and any associated materials (collectively, the &ldquo;Services&rdquo;). By accessing or using our Services, you agree to be bound by these Terms. <b>If you do not agree to these Terms, please discontinue use of our Services.</b>
          </>
        }
        meta={[
          { label: "Entity", value: "Growth Insights Limited" },
          { label: "Jurisdiction", value: "Hong Kong SAR" },
          { label: "Operating as", value: "FieldSignal" },
        ]}
      />

      <SectionBand num="01" label="Scope of Services" meta="What we provide" />
      <Prose>
        <p>FieldSignal provides competitive intelligence and expert consultation services, including but not limited to:</p>
        <Checklist items={[
          "Expert interviews",
          "Panel calls",
          "Surveys and data collection",
          "Custom intelligence projects",
          "Access to anonymized transcript libraries",
          "Research and analysis services",
        ]} />
        <p>FieldSignal does not provide legal, financial, tax, investment, or accounting advice. Clients are responsible for evaluating the accuracy and suitability of any insights provided.</p>
      </Prose>

      <SectionBand num="02" label="Eligibility" meta="Who can use the Services" />
      <Prose>
        <p>You may use our Services only if:</p>
        <Checklist items={[
          "You are at least 18 years old",
          "You have the legal authority to enter into a binding agreement",
          "Your use complies with all applicable laws and regulations",
        ]} />
      </Prose>

      <SectionBand num="03" label="Client Responsibilities" meta="Your obligations" />
      <Prose>
        <p>You agree to:</p>
        <Checklist items={[
          "Provide accurate information when engaging with FieldSignal",
          "Not request or encourage experts to disclose confidential, proprietary, or material non-public information (MNPI)",
          "Use all insights and deliverables in compliance with your own internal policies and applicable regulations",
        ]} />
        <p>You are solely responsible for how you use information provided by FieldSignal.</p>
      </Prose>

      <SectionBand num="04" label="Expert Engagement & Compliance" meta="Standards experts must meet" />
      <Prose>
        <p>All experts engaged through FieldSignal:</p>
        <Checklist items={[
          "Must comply with FieldSignal's compliance framework",
          "Must confirm they are not restricted by active NDAs",
          "Must not share confidential, proprietary, or MNPI",
          "Must have at least a 6-month gap from discussing their former employers, unless otherwise cleared",
        ]} />
        <p>FieldSignal is not responsible for any expert&apos;s breach of their obligations.</p>
      </Prose>

      <SectionBand num="05" label="Intellectual Property" meta="Ownership & license terms" />
      <Prose>
        <p>All materials provided by FieldSignal — including interview transcripts, summaries, research findings, methodologies, and documentation — are owned by <strong>Growth Insights Limited</strong>.</p>
        <p>Clients receive a limited, non-exclusive, non-transferable license to use deliverables internally. You may not:</p>
        <Checklist items={["Resell", "Distribute", "Publish", "Copy", "Sub-license"]} />
        <p>any FieldSignal content without written permission.</p>
      </Prose>

      <SectionBand num="06" label="Confidentiality" meta="Information handling" />
      <Prose>
        <p>FieldSignal and the client agree to maintain confidentiality of all sensitive information exchanged in the course of the engagement.</p>
        <p>FieldSignal may anonymize and aggregate insights to improve its services and database, without revealing client identities or sensitive details.</p>
      </Prose>

      <SectionBand num="07" label="Payments & Billing" meta="Fees & payment terms" />
      <Prose>
        <p>All fees must be paid according to the agreed pricing model. FieldSignal may:</p>
        <Checklist items={[
          "Suspend services for late or overdue payments",
          "Charge additional fees for custom or urgent requests",
        ]} />
        <p>Payments are non-refundable unless required by law.</p>
      </Prose>

      <SectionBand num="08" label="No Warranties" meta='"As-is" basis' />
      <Prose>
        <p>FieldSignal provides all Services on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. FieldSignal does not guarantee:</p>
        <Checklist items={[
          "Accuracy, completeness, or reliability of expert insights",
          "That Services will meet your objectives",
          "Availability without interruptions",
        ]} />
        <p>You use FieldSignal&apos;s Services at your own risk.</p>
      </Prose>

      <SectionBand num="09" label="Limitation of Liability" meta="Scope & cap" />
      <Prose>
        <p>To the maximum extent permitted by law, <strong>Growth Insights Limited</strong> — including its employees, contractors, and experts — shall not be liable for:</p>
        <Checklist items={[
          "Indirect, incidental, or consequential damages",
          "Loss of profits or revenue",
          "Business interruption",
          "Decisions made based on insights provided",
        ]} />
        <p>FieldSignal&apos;s total liability in any claim is limited to the amount paid by the client in the preceding 90 days.</p>
      </Prose>

      <SectionBand num="10" label="Third-Party Content" meta="Expert opinions & external links" />
      <Prose>
        <p>Expert opinions are their own and do not represent FieldSignal. We are not responsible for:</p>
        <Checklist items={[
          "Actions taken by experts",
          "Accuracy of expert statements",
          "External websites or tools linked on our platform",
        ]} />
      </Prose>

      <SectionBand num="11" label="Termination" meta="Suspension & ending of Services" />
      <Prose>
        <p>FieldSignal may suspend or terminate Services:</p>
        <Checklist items={[
          "For breach of these Terms",
          "For non-payment",
          "For compliance risks",
          "At its own discretion with reasonable notice",
        ]} />
        <p>Upon termination, the client must discontinue use of all FieldSignal deliverables.</p>
      </Prose>

      <SectionBand num="12" label="Governing Law" meta="Jurisdiction" />
      <Prose>
        <p>These Terms are governed by the laws of the <strong>Hong Kong Special Administrative Region</strong>.</p>
        <p>Any disputes shall be resolved exclusively in the courts of Hong Kong SAR.</p>
      </Prose>

      <SectionBand num="13" label="Changes to These Terms" meta="Updates & acceptance" />
      <Prose>
        <p>FieldSignal may update these Terms at any time. Continued use of the Services after updates constitutes acceptance of the revised Terms.</p>
      </Prose>

      <SectionBand num="14" label="Contact Information" meta="Get in touch" />
      <Prose>
        <p>For questions regarding these Terms, contact us at:</p>
        <dl className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 bg-paper-2 p-6">
          <div>
            <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-1">Email</dt>
            <dd><a href={`mailto:${SITE.contactEmail}`} className="text-ink font-semibold hover:text-red transition-colors">{SITE.contactEmail}</a></dd>
          </div>
          <div>
            <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-1">Entity</dt>
            <dd className="text-ink font-semibold">{SITE.legalEntity}</dd>
          </div>
          <div>
            <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-1">Jurisdiction</dt>
            <dd className="text-ink font-semibold">{SITE.jurisdiction}</dd>
          </div>
        </dl>
      </Prose>

      <CtaBand
        title={<>Join Our Network of <span className="text-red">50,000+</span> Professionals</>}
        meta={<>Our team is available to discuss your intelligence requirements <b className="text-paper font-medium">{SITE.hours}</b></>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}`}
      />
    </>
  );
}
