/**
 * Paid-search landing pages (Google Ads).
 *
 * One template, many headlines. Each entry below is a keyword we buy on
 * exact match, paired with the copy the visitor sees when they land. The
 * headline deliberately mirrors the search term — that continuity is what
 * earns the click's trust, and it is one of the three inputs Google scores
 * as "landing page experience" when it prices the auction.
 *
 * These pages are NOT part of the organic site:
 *   - every one renders `noindex, nofollow` (see app/lp/[slug]/page.tsx)
 *   - none are listed in app/sitemap.ts
 *   - they are deliberately NOT blocked in robots.ts — Google needs to
 *     crawl them to score Quality Score, and a robots.txt block would
 *     hide the noindex tag from it.
 *
 * Copy rules that apply here (see the brand system):
 *   - No price figures. Paid pages use price-free phrasing and send
 *     pricing intent to /pricing and the cost estimator.
 *   - Only claims that already appear on the organic site.
 *
 * To add a keyword: add an entry here. The route, metadata, static params
 * and lead tagging all follow automatically — there is no second file to
 * edit and no new page to build.
 */

export type LandingPage = {
  /** URL segment: /lp/<slug>. Also the value tagged onto every lead. */
  slug: string;
  /** The exact-match keyword this page is bought against. */
  keyword: string;
  /** H1. Mirrors the keyword back to the searcher. */
  headline: string;
  /** Supporting sentence under the H1. */
  lede: string;
  /** Three-stat strip under the lede. */
  stats: { label: string; value: string }[];
  /**
   * Proof points. Text before the first " — " renders bold, matching the
   * checklist pattern used across the organic site.
   */
  proof: string[];
  /** Meta title (the " | FieldSignal" suffix is appended by the layout). */
  seoTitle: string;
  /** Meta description. */
  seoDescription: string;
};

/** Shared across every landing page — the offer does not change by keyword. */
const STATS = [
  { label: "Candidates proposed", value: "10–20" },
  { label: "Turnaround", value: "24–72h" },
  { label: "Commitment", value: "None" },
];

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "expert-network",
    keyword: "expert network",
    headline: "An expert network built for the people the big networks price out.",
    lede: "Expert consultations, panel calls and B2B surveys — without an annual retainer or a minimum spend. Tell us who you need to speak with and we come back with candidates in 24–72 hours.",
    stats: STATS,
    proof: [
      "No annual minimum — you pay for the calls you actually take, not a seat you might use",
      "10–20 candidates per brief — anonymised profiles with compliance status, back within 24–72 hours",
      "Transcripts within 1 business day of every call, searchable and yours to keep",
      "Compliance built in — MNPI controls, employer restrictions checked, audit trail kept 7 years",
    ],
    seoTitle: "Expert Network — Calls Without a Retainer",
    seoDescription:
      "Expert consultations, panel calls and surveys with no annual minimum. Tell us who you need; 10–20 candidates back within 24–72 hours.",
  },
  {
    slug: "expert-network-startups",
    keyword: "expert network for startups",
    headline: "An expert network for startups.",
    lede: "Talk to the people who have already built, bought or sold what you're building — before you commit a quarter to finding out the hard way.",
    stats: STATS,
    proof: [
      "No annual minimum — one market question is a perfectly good reason to use us",
      "Operators and buyers, not consultants — people who have actually done the thing you're doing",
      "10–20 candidates per brief within 24–72 hours, compliance status on every profile",
      "Transcripts within 1 business day — share them with a co-founder or straight into the board pack",
    ],
    seoTitle: "Expert Network for Startups — No Retainer",
    seoDescription:
      "Speak to operators and buyers who have already done it. 10–20 candidates per brief in 24–72 hours, with no annual minimum.",
  },
  {
    slug: "expert-network-private-equity",
    keyword: "expert network for private equity",
    headline: "An expert network for private equity.",
    lede: "Management-meeting prep, commercial due diligence and portfolio channel checks — sourced against your thesis, cleared for compliance, delivered on deal timelines.",
    stats: STATS,
    proof: [
      "Diligence-grade sourcing — former operators and customers inside the target's market, not a generic panel",
      "Deal timelines respected — first candidates within 24–72 hours, calls scheduled around your IC date",
      "Compliance for regulated buyers — MNPI screening, employer restriction checks, 7-year audit trail",
      "No annual retainer — fund the calls a live deal needs, not a subscription between deals",
    ],
    seoTitle: "Expert Network for Private Equity Diligence",
    seoDescription:
      "Expert calls for commercial due diligence and channel checks. Candidates sourced against your thesis and back within 24–72 hours.",
  },
  {
    slug: "expert-network-venture-capital",
    keyword: "expert network for venture capital",
    headline: "An expert network for venture capital.",
    lede: "Customer voice, market sizing and founder reference checks — at a scale that fits a fund writing cheques, not a bulge-bracket research budget.",
    stats: STATS,
    proof: [
      "Built for emerging funds — no annual minimum, so a single diligence sprint is a viable reason to use us",
      "Customer voice, not vendor voice — we source the buyers and users of the category you're underwriting",
      "10–20 candidates per brief within 24–72 hours, with compliance status on every profile",
      "Transcripts within 1 business day — drop them straight into the IC memo",
    ],
    seoTitle: "Expert Network for Venture Capital Diligence",
    seoDescription:
      "Customer voice and market checks for VC diligence. No annual minimum, 10–20 candidates per brief within 24–72 hours.",
  },
  {
    slug: "expert-network-investment-banking",
    keyword: "expert network for investment banking",
    headline: "An expert network for investment banking.",
    lede: "Sector primers, buyer-landscape mapping and management-meeting prep — sourced fast enough for a live mandate and documented well enough for compliance.",
    stats: STATS,
    proof: [
      "Pitch and mandate timelines — first candidates within 24–72 hours of the brief",
      "Sector depth on demand — former operators, distributors and buyers inside the vertical you're pitching",
      "Compliance for regulated firms — MNPI controls, employer restrictions, 7-year audit trail",
      "Transcripts within 1 business day, ready to cite in the materials",
    ],
    seoTitle: "Expert Network for Investment Banking",
    seoDescription:
      "Sector primers and buyer-landscape calls for live mandates. Candidates within 24–72 hours, transcripts within 1 business day.",
  },
  {
    slug: "expert-calls-due-diligence",
    keyword: "expert calls for due diligence",
    headline: "Expert calls for due diligence.",
    lede: "Channel checks, customer references and competitive read-throughs — scoped to the specific question your investment committee is going to ask.",
    stats: STATS,
    proof: [
      "Scoped to the decision — you send the question, we source against it rather than against a job title",
      "10–20 candidates within 24–72 hours, each with compliance status shown up front",
      "Transcripts within 1 business day of every call, searchable and yours to keep",
      "MNPI controls and employer restriction checks on every expert, audit trail kept 7 years",
    ],
    seoTitle: "Expert Calls for Due Diligence — 24–72h",
    seoDescription:
      "Channel checks and customer references scoped to your IC question. 10–20 candidates within 24–72 hours, transcripts in 1 day.",
  },
  {
    slug: "glg-alternative",
    keyword: "glg alternative",
    headline: "A GLG alternative without the annual contract.",
    lede: "The same category of expert access — consultations, panel calls, surveys — bought per project instead of per year. No seat commitment, no minimum spend to unlock a single call.",
    stats: STATS,
    proof: [
      "No annual contract — the difference most teams are actually shopping for when they compare networks",
      "Same sourcing standard — 10–20 vetted candidates per brief, back within 24–72 hours",
      "Compliance parity — MNPI controls, employer restriction checks, 7-year audit trail",
      "Transcripts within 1 business day, included rather than sold as an upgrade",
    ],
    seoTitle: "GLG Alternative — Expert Calls, No Contract",
    seoDescription:
      "An expert network alternative to GLG with no annual contract or minimum spend. 10–20 vetted candidates per brief in 24–72 hours.",
  },
  {
    slug: "alphasights-alternative",
    keyword: "alphasights alternative",
    headline: "An AlphaSights alternative without the annual contract.",
    lede: "Expert consultations and panel calls bought per project rather than per year — for teams whose research volume does not justify a retainer.",
    stats: STATS,
    proof: [
      "Per-project, not per-year — fund the research a live deal needs and nothing in between",
      "10–20 vetted candidates per brief within 24–72 hours, compliance status on every profile",
      "MNPI controls and employer restriction checks, audit trail kept 7 years",
      "Transcripts within 1 business day of every call, searchable and yours to keep",
    ],
    seoTitle: "AlphaSights Alternative — No Annual Contract",
    seoDescription:
      "An expert network alternative to AlphaSights, bought per project not per year. 10–20 candidates per brief within 24–72 hours.",
  },
  {
    slug: "third-bridge-alternative",
    keyword: "third bridge alternative",
    headline: "A Third Bridge alternative without the annual contract.",
    lede: "Expert calls and transcripts on a per-project basis — for funds and advisers who want the research without committing to a subscription year.",
    stats: STATS,
    proof: [
      "No subscription year — you buy the calls a mandate needs, not a platform seat",
      "10–20 vetted candidates per brief, back within 24–72 hours",
      "Transcripts within 1 business day, included rather than gated behind a tier",
      "MNPI controls, employer restriction checks and a 7-year compliance audit trail",
    ],
    seoTitle: "Third Bridge Alternative — Per-Project Calls",
    seoDescription:
      "An expert network alternative to Third Bridge with no subscription year. Candidates in 24–72 hours, transcripts in 1 business day.",
  },
];

/**
 * What the visitor is researching, captured as one tap instead of a
 * written brief. Shared by both forms and the API route, so the route can
 * reject anything that isn't on the list.
 *
 * Deliberately short and mutually exclusive — a list long enough to need
 * reading is a list that costs conversions.
 */
const RESEARCH_TOPICS = [
  "Commercial due diligence",
  "Customer or channel checks",
  "Market sizing or entry",
  "Competitive intelligence",
] as const;

/** Shown on paid landing pages. Everyone arriving there is a buyer. */
export const LEAD_TOPICS = [...RESEARCH_TOPICS, "Something else"] as const;

/**
 * Shown on /contact, which also collects people who want to JOIN the
 * network rather than hire from it. Those are supply, not demand — and
 * counting them as leads would quietly inflate every conversion number
 * on the site.
 */
export const CONTACT_TOPICS = [
  ...RESEARCH_TOPICS,
  "Joining as an expert",
  "Something else",
] as const;

/** Topics that are enquiries but not sales leads. */
export const NON_LEAD_TOPICS: readonly string[] = ["Joining as an expert"];

export type LeadTopic = (typeof CONTACT_TOPICS)[number];

/** Validation accepts the superset — the route serves both forms. */
export function isLeadTopic(value: string): value is LeadTopic {
  return (CONTACT_TOPICS as readonly string[]).includes(value);
}

/** Slug → page. Used by the route and by lead tagging. */
export const LANDING_PAGE_BY_SLUG: Record<string, LandingPage> =
  Object.fromEntries(LANDING_PAGES.map((p) => [p.slug, p]));

/** True if `slug` is a real landing page. Used to validate inbound leads. */
export function isLandingPageSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(LANDING_PAGE_BY_SLUG, slug);
}
