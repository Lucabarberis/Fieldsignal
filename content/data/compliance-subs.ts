/**
 * Compliance sub-pages (Wave 1 + Wave 5).
 *
 * Wave 1 ships: mnpi-policy, legal-framework
 * Wave 5 will add: expert-vetting, expert-agreements, information-barriers,
 *                  client-protocols, data-protection-gdpr, audit-trail,
 *                  insurance-and-liability
 */

export type ComplianceSection = {
  heading: string;
  meta?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type ComplianceSub = {
  slug: string;
  id: string;             // displayed in page header
  name: string;
  title: string;
  description: string;
  pageLede: string;
  metaItems: readonly { label: string; value: string }[];
  sections: readonly ComplianceSection[];
  relatedSlugs: readonly string[];
  primaryKW: string;
};

export const complianceSubs: readonly ComplianceSub[] = [
  {
    slug: "mnpi-policy",
    id: "01",
    name: "MNPI POLICY",
    title: "MNPI Policy - Material Non-Public Information Controls",
    description:
      "No discussion of material non-public information. 6+ months cooling-off rule. Real-time monitoring and exclusion lists for 2,000+ insiders.",
    pageLede:
      "FieldSignal does not facilitate the disclosure of material non-public information (MNPI). Every expert agreement, every per-call attestation, every monitored discussion is designed to make MNPI sharing impossible — and to leave a clean audit trail proving it.",
    metaItems: [
      { label: "Cooling-off", value: "6 months minimum" },
      { label: "Exclusion list", value: "2,000+ insiders" },
      { label: "Monitoring", value: "Real-time on every call" },
      { label: "Audit retention", value: "7 years" },
    ],
    sections: [
      {
        heading: "What MNPI means here",
        meta: "Definition",
        paragraphs: [
          "Material non-public information is any non-public information about a company that a reasonable investor would consider important when deciding whether to buy, sell or hold a security. Earnings ahead of release, undisclosed M&A, regulatory actions, contract wins or losses — these are categorically off-limits.",
        ],
      },
      {
        heading: "Cooling-off rule",
        meta: "6 months minimum",
        paragraphs: [
          "Experts must be at least six months removed from any company they are asked to discuss. The window is measured from the last day of employment, board service or active advisory engagement.",
          "Where a longer window is required by an expert's contractual obligations (NDAs, share-lockups, garden leave), the longer window applies.",
        ],
      },
      {
        heading: "Pre-call attestations",
        meta: "Every single call",
        bullets: [
          "Expert confirms no active NDAs prevent the discussion",
          "Expert acknowledges they cannot share MNPI",
          "Expert confirms 6-month gap (or longer where required)",
          "Client confirms they are not seeking MNPI",
        ],
      },
      {
        heading: "Real-time monitoring",
        meta: "On every call",
        paragraphs: [
          "All calls are monitored in real time by a FieldSignal compliance specialist. The moderator can intervene, redirect, or terminate the call if the conversation approaches restricted territory.",
          "Recordings and transcripts are reviewed before delivery. Any segment that touches restricted information is redacted before the client receives the transcript.",
        ],
      },
      {
        heading: "Exclusion list",
        meta: "2,000+ public-company insiders",
        paragraphs: [
          "We maintain an exclusion list of more than 2,000 individuals tied to publicly-listed companies in roles where MNPI exposure is presumed (CEO, CFO, CIO, etc., plus IR and external counsel for the same firms).",
          "When a screening hit appears, the expert is removed from candidate sets for that company. The list is updated weekly from public sources.",
        ],
      },
      {
        heading: "Audit trail",
        meta: "7-year retention",
        paragraphs: [
          "Every call generates an audit record: candidate sourcing log, pre-call attestation, monitor notes, transcript, redaction log, and client delivery confirmation. The full record is retained for seven years and is available to client compliance teams on request.",
        ],
      },
    ],
    relatedSlugs: ["legal-framework"],
    primaryKW: "MNPI policy",
  },
  {
    slug: "legal-framework",
    id: "02",
    name: "LEGAL FRAMEWORK",
    title: "Legal Framework - GDPR, UK DPA and ESMA Aligned",
    description:
      "Operating under UK and EU data protection law, ESMA-aligned terms, US$10M professional liability insurance, regular external audits.",
    pageLede:
      "Growth Insights Limited operates from Hong Kong SAR under the Personal Data (Privacy) Ordinance, and maintains compliance with international data protection standards (GDPR, UK GDPR) for clients in those jurisdictions. Terms align with ESMA and SFC guidelines.",
    metaItems: [
      { label: "Entity", value: "Growth Insights Limited" },
      { label: "Jurisdiction", value: "Hong Kong SAR" },
      { label: "Insurance", value: "US$10M professional" },
      { label: "Audits", value: "Annual + ad hoc" },
    ],
    sections: [
      {
        heading: "Jurisdiction",
        meta: "Hong Kong SAR",
        paragraphs: [
          "FieldSignal is operated by Growth Insights Limited, a Hong Kong SAR private company. The Hong Kong Personal Data (Privacy) Ordinance (PDPO) is our governing data-protection law.",
          "For European clients, GDPR (EU) 2016/679 and the UK Data Protection Act 2018 apply to processing relating to data subjects in those jurisdictions. Standard Contractual Clauses (SCCs) govern international transfers.",
        ],
      },
      {
        heading: "Applicable standards",
        meta: "Frameworks we align with",
        bullets: [
          "Personal Data (Privacy) Ordinance (PDPO), Hong Kong",
          "EU GDPR — General Data Protection Regulation",
          "UK GDPR + UK Data Protection Act 2018",
          "ESMA guidelines on sound research practices",
          "SFC (Hong Kong) guidelines on conflicts and information barriers",
        ],
      },
      {
        heading: "Master Services Agreement",
        meta: "Standard terms",
        paragraphs: [
          "All client engagements operate under our Master Services Agreement (MSA), which incorporates compliance attestations, IP terms, confidentiality, liability allocation and the FieldSignal Code of Conduct for experts.",
          "Bespoke terms — including client-specific compliance clauses, additional insurance requirements, audit rights — are negotiated as addenda to the MSA where required.",
        ],
      },
      {
        heading: "Professional liability insurance",
        meta: "US$10 million",
        paragraphs: [
          "We carry US$10 million in professional liability cover, plus separate cyber-incident cover, with an A-rated international carrier. Certificate of insurance available to clients on request.",
        ],
      },
      {
        heading: "External audit",
        meta: "Annual + ad hoc",
        paragraphs: [
          "Compliance practices are audited annually by an independent third party. Audit summaries are shared with clients upon request, subject to non-disclosure.",
          "Ad hoc audits are accepted from large institutional clients as part of their vendor onboarding. Pre-onboarding compliance questionnaires are turned around within five business days.",
        ],
      },
      {
        heading: "Indemnification",
        meta: "Standard in MSAs",
        paragraphs: [
          "Our standard MSA includes mutual indemnification covering breach of confidentiality, third-party IP claims and regulatory non-compliance — capped at amounts negotiated per engagement. The full indemnification language is available on request to client compliance teams.",
        ],
      },
    ],
    relatedSlugs: ["mnpi-policy"],
    primaryKW: "expert network legal framework",
  },
] as const;
