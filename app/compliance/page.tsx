import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Compliance Framework",
  description:
    "UK and EU data protection, MNPI controls, expert attestations, real-time monitoring and 7-year audit trails. US$10M professional liability cover.",
  path: "/compliance",
});

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-9 py-8 max-w-4xl">
      <div className="text-body text-ink-2 space-y-4">{children}</div>
    </div>
  );
}

const KEY_STATS = [
  { label: "Liability Cover", value: "US$10M", change: "professional indemnity" },
  { label: "Audit Trail", value: "7yr", change: "retention period" },
  { label: "Exclusion List", value: "2,000+", change: "public-company insiders" },
  { label: "Cool-Off Period", value: "6mo", change: "since expert's last role" },
];

export default function CompliancePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Compliance Framework", url: "/compliance" },
        ]}
      />

      <PageHeader
        current="Compliance Framework"
        title="Compliance Framework"
        lede={
          <>
            <b>Growth Insights Limited</b> operates a compliance framework equivalent to established expert networks including GLG and AlphaSights. Standards are aligned with international regulations including <b>PDPO, GDPR, UK GDPR, ESMA and SFC guidelines</b> — and are continuously audited.
          </>
        }
        meta={[
          { label: "Entity", value: "Growth Insights Limited" },
          { label: "Jurisdiction", value: "Hong Kong SAR" },
          { label: "Liability Cover", value: "US$10M" },
          { label: "Audit Trail", value: "7 years" },
        ]}
      />

      {/* KEY STATS STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule">
        {KEY_STATS.map((s) => (
          <div key={s.label} className="bg-paper-2 px-7 py-6">
            <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
              {s.label}
            </div>
            <div className="font-sans font-medium text-[36px] leading-[1] tracking-[-0.022em] text-ink mb-2">
              {s.value}
            </div>
            <div className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em]">
              {s.change}
            </div>
          </div>
        ))}
      </section>

      <SectionBand num="01" label="Legal Framework" meta="Jurisdiction & insurance" />
      <Prose>
        <p><strong>Growth Insights Limited</strong> operates under the Hong Kong <strong>Personal Data (Privacy) Ordinance (PDPO)</strong> and maintains compliance with international data protection standards including the EU General Data Protection Regulation (GDPR) and UK GDPR for clients in those jurisdictions.</p>
        <p>We maintain professional liability insurance of <strong>US$10 million</strong>. Terms of service align with international expert network standards, including the European Securities and Markets Authority (ESMA) and the Hong Kong Securities and Futures Commission (SFC) guidelines.</p>
        <p>Regular third-party audits ensure ongoing adherence to all applicable frameworks.</p>
      </Prose>

      <SectionBand num="02" label="Expert Agreements" meta="MSA & per-call attestation" />
      <Prose>
        <p>Experts sign our <strong>Master Services Agreement</strong> before first engagement. Each call requires fresh attestation of compliance. Experts confirm no material non-public information will be shared. Violations result in permanent removal from the network.</p>
      </Prose>

      <SectionBand num="03" label="Client Protocols" meta="Integration & audit trail" />
      <Prose>
        <p>We integrate with client compliance systems. Pre-call questionnaires capture restrictions. Post-call attestations document compliance. Full audit trail maintained for <strong>7 years</strong>.</p>
      </Prose>

      <SectionBand num="04" label="Information Barriers" meta="Chinese walls & compartmentalisation" />
      <Prose>
        <p>Chinese walls separate project teams. Experts cannot see client identities. Clients receive anonymised expert details. Project information stays compartmentalised at all times.</p>
      </Prose>

      <SectionBand num="05" label="Expert Vetting" meta="6-month cool-off & exclusion list" />
      <Prose>
        <p>Our compliance mirrors the standards set by GLG and AlphaSights. Experts must be at least <strong>6 months removed</strong> from any company they discuss, unless otherwise cleared. All calls include compliance warnings and real-time monitoring. Transcripts undergo legal review before client delivery.</p>
        <p>We maintain an <strong>exclusion list of 2,000+ public-company insiders</strong>. Automated screening flags potential conflicts; manual review catches edge cases. When in doubt, we exclude the expert.</p>
      </Prose>

      <SectionBand num="06" label="Compliance Enquiries" meta="Get in touch" />
      <Prose>
        <p>Questions about our compliance framework, or specific requirements for your firm&apos;s compliance team to clear engagements with us? Reach out directly:</p>
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
