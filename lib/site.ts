/**
 * Single source of truth for site-wide constants.
 * Imported by layout, components, metadata helpers, and schema generators.
 */

export const SITE = {
  name: "FieldSignal",
  tagline: "Competitive Intelligence, Unchained",
  description:
    "Expert consultations, panel calls and surveys without six-figure retainers. The expert network built for startups, SMEs and emerging funds.",
  url: "https://fieldsignalhq.com",
  domain: "fieldsignalhq.com",
  legalEntity: "Growth Insights Limited",
  jurisdiction: "Hong Kong SAR",
  contactEmail: "miles@fieldsignalhq.com",
  hours: "Mon–Fri",
  copyrightYear: 2026,
  /** Public LinkedIn company page — emitted as schema sameAs and linked in the footer. */
  linkedin: "https://www.linkedin.com/company/109816165/",
  /** Registered address of the operating entity (Growth Insights Limited). */
  address: {
    street: "Unit 1603, 16/F, The L. Plaza, 367–375 Queen's Road Central, Sheung Wan",
    locality: "Hong Kong",
    country: "HK",
  },
  /** Google Analytics 4 measurement ID. Fires only on production Vercel deploys. */
  gaId: "G-YC008HJRD5",
  /** Google Tag Manager container ID. Fires only on production Vercel deploys. */
  gtmId: "GTM-56NGKGK4",
} as const;

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Sectors" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/transcripts", label: "Transcripts" },
  { href: "/pricing", label: "Pricing" },
  { href: "/alternatives", label: "Alternatives" },
  { href: "/tools/expert-network-cost-estimator", label: "Tools" },
  { href: "/resources", label: "Resources" },
] as const;

/**
 * Hover preview panels for the masthead nav (desktop only).
 * Keyed by NAV_LINKS href. Short blurb + up to three deep links.
 */
export const NAV_PREVIEWS: Record<
  string,
  { blurb: string; sublinks?: readonly { href: string; label: string }[] }
> = {
  "/services": {
    blurb: "Expert consultations, panel calls and B2B surveys — scoped to your research question.",
    sublinks: [
      { href: "/services", label: "All services" },
      { href: "/platform", label: "Platform" },
    ],
  },
  "/industries": {
    blurb: "Sector desks from software and fintech to medtech and industrials.",
    sublinks: [{ href: "/industries", label: "Browse sectors" }],
  },
  "/use-cases": {
    blurb: "Playbooks by decision: diligence, competitive intelligence, go-to-market.",
    sublinks: [{ href: "/use-cases", label: "Browse use cases" }],
  },
  "/transcripts": {
    blurb: "A searchable library of expert call transcripts, by industry, company and topic.",
    sublinks: [{ href: "/transcripts", label: "Browse transcripts" }],
  },
  "/pricing": {
    blurb: "Pay-per-use. No annual minimums, no six-figure retainers.",
  },
  "/alternatives": {
    blurb: "How FieldSignal compares to GLG, AlphaSights, Third Bridge, Tegus and peers.",
    sublinks: [
      { href: "/alternatives", label: "Alternatives" },
      { href: "/compare", label: "Head-to-head" },
    ],
  },
  "/tools/expert-network-cost-estimator": {
    blurb: "Free interactive tools built on our published research.",
    sublinks: [
      {
        href: "/tools/expert-network-cost-estimator",
        label: "Cost estimator",
      },
      {
        href: "/resources/blog/expert-network-pricing-and-pay-benchmark-2026",
        label: "Pricing & pay benchmark",
      },
    ],
  },
  "/resources": {
    blurb: "Guides, the research glossary, and the FieldSignal blog.",
    sublinks: [
      { href: "/resources/blog", label: "Blog" },
      { href: "/resources/case-studies", label: "Case Studies" },
      { href: "/resources/guides", label: "Guides" },
      { href: "/resources/glossary", label: "Glossary" },
    ],
  },
};

export const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/clients", label: "Clients" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/platform", label: "Platform" },
  { href: "/regions", label: "Regions" },
  { href: "/alternatives", label: "Alternatives" },
  { href: "/compare", label: "Compare" },
  { href: "/transcripts", label: "Transcripts" },
  { href: "/tools/expert-network-cost-estimator", label: "Cost Estimator" },
  { href: "/experts", label: "For Experts" },
  { href: "/resources/case-studies", label: "Case Studies" },
  { href: "/resources/guides", label: "Guides" },
  { href: "/resources/glossary", label: "Glossary" },
  { href: "/contact", label: "Contact" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/compliance", label: "Compliance Framework" },
] as const;
