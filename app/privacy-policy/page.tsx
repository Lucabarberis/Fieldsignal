import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { Checklist, Callout, SubHeading } from "@/components/Checklist";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Growth Insights Limited (operating as FieldSignal) collects, uses, shares and protects your personal data under PDPO, GDPR and UK GDPR.",
  path: "/privacy-policy",
});

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-9 py-8 max-w-4xl">
      <div className="text-body text-ink-2 space-y-4">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" },
        ]}
      />

      <PageHeader
        current="Privacy Policy"
        title="Privacy Policy"
        lede={
          <>
            This Privacy Policy explains how <b>Growth Insights Limited</b> (operating as FieldSignal) collects, uses, shares, and protects your personal information. We are committed to <b>protecting your privacy</b> and maintaining transparency about our data practices across all jurisdictions in which we operate.
          </>
        }
        meta={[
          { label: "Entity", value: "Growth Insights Limited" },
          { label: "Jurisdiction", value: "Hong Kong SAR" },
          { label: "Frameworks", value: "PDPO · GDPR · UK GDPR" },
        ]}
      />

      <SectionBand num="01" label="Information We Collect" meta="What & how" />
      <Prose>
        <SubHeading num="1.1">Personal Information You Provide</SubHeading>
        <Checklist items={[
          "Name",
          "Email address",
          "Phone number (if provided)",
          "Company name and job title",
          "Information submitted through contact forms",
          "Information shared when engaging our services",
        ]} />
        <SubHeading num="1.2">Automatically Collected Data</SubHeading>
        <Checklist items={[
          "IP address",
          "Browser type and version",
          "Device information",
          "Usage data and interaction logs",
          "Cookies and tracking data",
          "Analytics (e.g., page views, scroll depth, links clicked)",
        ]} />
        <SubHeading num="1.3">Expert Network Information (If You Join as an Expert)</SubHeading>
        <Checklist items={[
          "Professional experience",
          "CV / resume information",
          "Compliance attestations",
          "Availability and consultation history",
          "Payment and tax information (where required)",
        ]} />
        <Callout>We never collect sensitive personal data unless required by law and only with explicit consent.</Callout>
      </Prose>

      <SectionBand num="02" label="How We Use Your Information" meta="Purposes of processing" />
      <Prose>
        <Checklist items={[
          "Provide and deliver FieldSignal services",
          "Schedule expert consultations, interviews, and meetings",
          "Respond to inquiries and support requests",
          "Improve our website and user experience",
          "Maintain compliance and regulatory obligations",
          "Process payments and billing",
          "Analyze website performance",
          "Ensure platform security",
        ]} />
        <Callout>We do not sell your data.</Callout>
      </Prose>

      <SectionBand num="03" label="Legal Basis for Processing" meta="PDPO · GDPR · UK GDPR" />
      <Prose>
        <p>We process personal data on the following legal bases under the EU General Data Protection Regulation (GDPR) and UK GDPR:</p>
        <Checklist items={[
          "Contractual necessity (to deliver services)",
          "Legitimate interests (operations, analytics, security)",
          "Legal obligations (regulatory compliance)",
          "Consent (newsletters, forms, cookies)",
        ]} />
        <p>For data subjects in Hong Kong, processing is conducted in accordance with the <strong>Personal Data (Privacy) Ordinance (PDPO)</strong> and the principles set out in Schedule 1 thereto.</p>
      </Prose>

      <SectionBand num="04" label="How We Share Your Information" meta="Recipients" />
      <Prose>
        <SubHeading num="4.1">Service Providers</SubHeading>
        <p>We may share data with trusted third parties such as:</p>
        <Checklist items={[
          "Cloud hosting providers",
          "Email delivery services",
          "Analytics platforms",
          "Payment processors",
          "Compliance and screening tools",
        ]} />
        <SubHeading num="4.2">Experts</SubHeading>
        <p>Limited necessary details shared for scheduling (e.g., first name, company type).</p>
        <SubHeading num="4.3">Legal or Regulatory Requirements</SubHeading>
        <Checklist items={[
          "When required by law",
          "Court orders",
          "Regulatory bodies",
        ]} />
        <Callout>We do not sell or rent your data to marketers or unrelated third parties.</Callout>
      </Prose>

      <SectionBand num="05" label="International Transfers" meta="Cross-border data flows" />
      <Prose>
        <p>Your data may be transferred to and stored in:</p>
        <Checklist items={[
          "Hong Kong SAR (primary jurisdiction)",
          "The European Union",
          "The United States",
          "Other countries where service providers operate",
        ]} />
        <p>We use the following safeguards for international transfers:</p>
        <Checklist items={[
          "Standard Contractual Clauses (SCCs)",
          "Adequacy decisions",
          "Contractual data protection terms",
        ]} />
      </Prose>

      <SectionBand num="06" label="Data Retention" meta="How long we keep data" />
      <Prose>
        <p>We retain personal data only as long as needed for:</p>
        <Checklist items={[
          "Delivering services",
          "Legal and compliance obligations",
          "Resolving disputes",
        ]} />
        <p>Business records may be stored for up to <strong>7 years</strong>. You may request deletion (subject to legal requirements).</p>
      </Prose>

      <SectionBand num="07" label="Your Rights" meta="Data subject rights" />
      <Prose>
        <p>Under GDPR and UK GDPR, you may request:</p>
        <Checklist items={[
          "Access to your data",
          "Correction of inaccurate data",
          "Deletion (\"right to be forgotten\")",
          "Restriction of processing",
          "Data portability",
          "Objection to processing",
          "Withdrawal of consent",
        ]} />
        <p>For data subjects in Hong Kong, equivalent rights apply under the <strong>Personal Data (Privacy) Ordinance (PDPO)</strong>, including access requests, correction requests, and complaints to the Office of the Privacy Commissioner for Personal Data, Hong Kong (PCPD).</p>
        <div className="mt-4 bg-paper-2 p-6">
          <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mr-3">Privacy enquiries</span>
          <a href={`mailto:${SITE.contactEmail}`} className="text-ink font-semibold hover:text-red transition-colors">{SITE.contactEmail}</a>
        </div>
      </Prose>

      <SectionBand num="08" label="Cookies & Tracking" meta="Browser-based data" />
      <Prose>
        <p>We use cookies to:</p>
        <Checklist items={[
          "Improve website performance",
          "Enable essential functions",
          "Conduct analytics",
          "Personalize content",
          "Maintain security",
        ]} />
        <p>You can disable cookies in your browser settings.</p>
      </Prose>

      <SectionBand num="09" label="Data Security" meta="Technical & organisational measures" />
      <Prose>
        <p>We use industry-standard measures:</p>
        <Checklist items={[
          "Encryption in transit",
          "Secure data storage",
          "Access controls",
          "Monitoring",
          "Compliance reviews",
        ]} />
        <Callout>No system is 100% secure. Users assume some risk when transmitting data.</Callout>
      </Prose>

      <SectionBand num="10" label="Children's Privacy" meta="Age requirements" />
      <Prose>
        <Checklist items={[
          "Our services are not for individuals under 18",
          "We do not knowingly collect data from minors",
        ]} />
      </Prose>

      <SectionBand num="11" label="Changes to This Privacy Policy" meta="Updates & acceptance" />
      <Prose>
        <Checklist items={[
          "We may update this Policy periodically",
          "Updates will appear on this page",
          "Continued use of our services means acceptance of updates",
        ]} />
        <dl className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-paper-2 p-6">
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
        ctaHref="/contact"
      />
    </>
  );
}
