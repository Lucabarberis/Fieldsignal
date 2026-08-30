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
  /**
   * Scheduling link shown under the form on every paid-search landing page.
   *
   * The landing-page CTA promises 15 minutes, so the Calendly event must be
   * set to 15 minutes or the copy is wrong. Turn on Calendly's UTM tracking
   * too, so a booking carries the same keyword attribution the form does.
   */
  calendly: "https://calendly.com/luca-barberis/new-meeting",
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
  // RISEFINDER SITS FIRST, AHEAD OF SERVICES. It is the only thing on the bar
  // that changes every day, and the only one a visitor might come back for
  // without being in a buying cycle. Everything after it is evergreen.
  //
  // The bar holds nine before it wraps, so adding one meant removing one:
  // "Tools" was a single page (the cost estimator) and now hangs off Resources
  // alongside the guides and the glossary, which is where a reader already
  // looks for it. Nothing was orphaned — the estimator keeps its URL and both
  // the Resources hover panel and the footer still link it.
  { href: "/risefinder", label: "RiseFinder" },
  { href: "/services", label: "Services" },
  { href: "/gtm-intelligence", label: "GTM Intelligence" },
  { href: "/industries", label: "Sectors" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/transcripts", label: "Transcripts" },
  { href: "/pricing", label: "Pricing" },
  { href: "/alternatives", label: "Alternatives" },
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
  "/risefinder": {
    blurb:
      "A daily scan of public data for things that are rising before they are obvious. Filter by source and window.",
    sublinks: [{ href: "/risefinder", label: "Today's risers" }],
  },
  "/services": {
    blurb: "Expert consultations, panel calls and B2B surveys — scoped to your research question.",
    sublinks: [
      { href: "/services", label: "All services" },
      { href: "/platform", label: "Platform" },
    ],
  },
  "/gtm-intelligence": {
    blurb:
      "We ask the Heads of Growth who already ran your motion which channels work and which to avoid.",
    sublinks: [
      { href: "/gtm-intelligence", label: "All engagements" },
      { href: "/gtm-intelligence/channel-discovery", label: "Channel discovery" },
      {
        href: "/gtm-intelligence/growth-operator-interviews",
        label: "Growth operator interviews",
      },
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
  "/resources": {
    blurb: "Guides, the research glossary, the cost estimator, and the FieldSignal blog.",
    sublinks: [
      { href: "/resources/blog", label: "Blog" },
      { href: "/resources/guides", label: "Guides" },
      { href: "/resources/glossary", label: "Glossary" },
      // The estimator's own nav slot went to RiseFinder. This is now the only
      // link to it in the masthead, so it is not optional.
      { href: "/tools/expert-network-cost-estimator", label: "Cost Estimator" },
    ],
  },
};

export const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/clients", label: "Clients" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/gtm-intelligence", label: "GTM Intelligence" },
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
