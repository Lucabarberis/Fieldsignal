/**
 * Single source of truth for site-wide constants.
 * Imported by layout, components, metadata helpers, and schema generators.
 */

export const SITE = {
  name: "FieldSignal",
  tagline: "Competitive Intelligence, Unchained",
  description:
    "Expert consultations, panel calls and surveys without six-figure retainers. The expert network built for startups, SMEs and emerging funds. From €500 per call.",
  url: "https://fieldsignalhq.com",
  domain: "fieldsignalhq.com",
  legalEntity: "Growth Insights Limited",
  jurisdiction: "Hong Kong SAR",
  contactEmail: "miles@fieldsignalhq.com",
  hours: "Mon–Fri, 08:00–20:00 GMT",
  copyrightYear: 2026,
} as const;

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Sectors" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/transcripts", label: "Transcripts" },
  { href: "/pricing", label: "Pricing" },
  { href: "/alternatives", label: "Alternatives" },
  { href: "/resources", label: "Resources" },
] as const;

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
  { href: "/experts", label: "For Experts" },
  { href: "/resources/guides", label: "Guides" },
  { href: "/resources/glossary", label: "Glossary" },
  { href: "/contact", label: "Contact" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/compliance", label: "Compliance Framework" },
] as const;
