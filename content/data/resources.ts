/**
 * The 7 resource categories under the /resources hub.
 * Per SEO brief §4.13.
 */

export type ResourceCategory = {
  slug: string;
  id: string;
  name: string;
  title: string;
  description: string;
  oneLiner: string;
  cta: string;
  href: string;
  available: boolean;     // false = "coming soon" state
  primaryKW: string;
};

export const resources: readonly ResourceCategory[] = [
  {
    slug: "blog",
    id: "01.1",
    name: "BLOG",
    title: "The FieldSignal Blog",
    description:
      "Weekly writing on primary research methods, expert network industry shifts and sector intelligence.",
    oneLiner:
      "Weekly writing on primary research methods, expert network industry shifts and sector intelligence.",
    cta: "Read posts",
    href: "/resources/blog",
    available: true,
    primaryKW: "expert network blog",
  },
  {
    slug: "guides",
    id: "01.2",
    name: "GUIDES",
    title: "Guides - In-Depth Playbooks on Primary Research",
    description:
      "Long-form guides for buyers of expert networks and primary research programs. Pricing, RFPs, compliance and frameworks.",
    oneLiner:
      "Long-form playbooks for buyers of expert networks. RFPs, pricing, compliance, frameworks.",
    cta: "Browse guides",
    href: "/resources/guides",
    available: true,
    primaryKW: "expert network guides",
  },
  {
    slug: "case-studies",
    id: "01.3",
    name: "CASE STUDIES",
    title: "Case Studies - How Clients Use FieldSignal",
    description:
      "Anonymized case studies across hedge funds, PE firms, corporate strategy teams and startups.",
    oneLiner:
      "Anonymized cases across hedge funds, PE, corporate strategy and startups.",
    cta: "Read case studies",
    href: "/resources/case-studies",
    available: true,
    primaryKW: "expert network case studies",
  },
  {
    slug: "reports",
    id: "01.4",
    name: "SECTOR REPORTS",
    title: "Sector Reports - Free Downloadable Research",
    description:
      "Annual State of Expert Networks report plus quarterly sector deep-dives.",
    oneLiner:
      "Annual State of Expert Networks plus quarterly sector deep-dives.",
    cta: "View reports",
    href: "/resources/reports",
    available: false,
    primaryKW: "expert network reports",
  },
  {
    slug: "glossary",
    id: "01.5",
    name: "GLOSSARY",
    title: "Expert Network Glossary - 50+ Terms Defined",
    description:
      "Plain-language definitions of MNPI, KOL, primary research, panel calls, management checks and more.",
    oneLiner:
      "50+ plain-language definitions: MNPI, KOL, panel calls, MRC, primary research.",
    cta: "Browse glossary",
    href: "/resources/glossary",
    available: true,
    primaryKW: "expert network glossary",
  },
  {
    slug: "webinars",
    id: "01.6",
    name: "WEBINARS",
    title: "Webinars - Monthly Sessions on Primary Research",
    description:
      "Monthly webinars on running primary research programs, sector deep dives and buyer panels.",
    oneLiner:
      "Monthly sessions on running primary research, sector deep dives and buyer panels.",
    cta: "See schedule",
    href: "/resources/webinars",
    available: false,
    primaryKW: "expert network webinars",
  },
  {
    slug: "newsletter",
    id: "01.7",
    name: "NEWSLETTER",
    title: "The FieldSignal Newsletter - Weekly Insights for Researchers",
    description:
      "Weekly newsletter for primary research buyers. Sector signals, methodology pieces and industry news.",
    oneLiner:
      "Weekly for primary research buyers. Sector signals, methodology, industry news.",
    cta: "Subscribe",
    href: "/resources/newsletter",
    available: false,
    primaryKW: "expert network newsletter",
  },
] as const;
