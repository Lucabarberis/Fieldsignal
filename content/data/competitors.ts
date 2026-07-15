/**
 * Reference data for competing expert networks.
 *
 * Used by both /alternatives/[slug] and /compare/fieldsignal-vs-[slug]
 * pages so factual claims stay consistent across the site.
 *
 * Sources: public company materials, industry reporting (Bloomberg,
 * Institutional Investor, The Information), and our own buyer-side
 * conversations. Verify before updating — these claims need to hold
 * up to scrutiny because the brief is explicit: be honest.
 */

export type Competitor = {
  slug: string;
  name: string;
  fullName?: string;
  founded: number;
  hq: string;
  url: string;
  // Public claims about scale
  networkSize: string;
  // Pricing pattern (typical buyer experience)
  pricing: {
    model: string;
    perCallRange?: string;
    annualMinimum?: string;
    note?: string;
  };
  // What they're genuinely best at
  bestAt: readonly string[];
  // Where FieldSignal is positioned differently
  fieldsignalDifferent: readonly string[];
  // Best-fit buyer
  bestFitBuyer: string;
};

export const competitors: readonly Competitor[] = [
  {
    slug: "glg",
    name: "GLG",
    fullName: "Gerson Lehrman Group",
    founded: 1998,
    hq: "New York",
    url: "https://glginsights.com",
    networkSize: "1,000,000+ experts",
    pricing: {
      model: "Annual retainer + per-call",
      perCallRange: "$500–1,500",
      annualMinimum: "Six figures typical",
      note: "Enterprise contracts; per-call rates vary by seniority",
    },
    bestAt: [
      "Largest network in the industry — depth in every conceivable sector",
      "24/7 global desk with same-day expert sourcing",
      "Enterprise compliance integrations expected by Tier-1 institutions",
      "Long-running survey panels and quantitative capabilities",
    ],
    fieldsignalDifferent: [
      "No mandatory annual retainer",
      "Per-call pricing transparent and accessible to sub-$500M-AUM funds",
      "Senior account lead on every project regardless of cheque size",
    ],
    bestFitBuyer: "Tier-1 hedge funds and Fortune 500 corporates with predictable, six-figure annual research volume.",
  },
  {
    slug: "alphasights",
    name: "AlphaSights",
    founded: 2008,
    hq: "London / New York",
    url: "https://alphasights.com",
    networkSize: "Several hundred thousand experts",
    pricing: {
      model: "Annual retainer + per-call",
      perCallRange: "$600–1,400",
      annualMinimum: "Six figures typical",
      note: "Service model emphasises speed (often <24h)",
    },
    bestAt: [
      "Industry-leading speed — first call often within 24 hours",
      "Highly polished service experience",
      "Strong PE coverage, especially European mid-market",
      "Deep bench of dedicated analyst staffing",
    ],
    fieldsignalDifferent: [
      "Boutique cheque-size economics — no six-figure entry point",
      "Transparent published pricing (rare in the category)",
      "Senior researcher direct, not via account-manager triage",
    ],
    bestFitBuyer: "PE funds and corporates that need turnaround speed and have the retainer budget to fund it.",
  },
  {
    slug: "third-bridge",
    name: "Third Bridge",
    founded: 2007,
    hq: "London",
    url: "https://thirdbridge.com",
    networkSize: "Tens of thousands of experts; large analyst-led transcript library (Forum)",
    pricing: {
      model: "Subscription + per-call",
      perCallRange: "$500–1,200",
      annualMinimum: "Mid-five to six figures",
      note: "Forum transcript library is the standout product",
    },
    bestAt: [
      "Analyst-led transcripts (Forum) — interviews conducted and indexed by sector analysts",
      "Strong PE diligence coverage",
      "Editorial quality on transcripts higher than competitors",
      "Sector-themed insight reports",
    ],
    fieldsignalDifferent: [
      "Lower-friction per-call pricing without Forum subscription bundling",
      "Direct briefing access to senior researcher",
      "Smaller transcript library, but at $99/mo vs Forum's ~$25k+ tier",
    ],
    bestFitBuyer: "PE and consulting buyers who want analyst-led research narrative, not just raw calls.",
  },
  {
    slug: "guidepoint",
    name: "Guidepoint",
    founded: 2003,
    hq: "New York",
    url: "https://guidepoint.com",
    networkSize: "1,500,000+ advisors",
    pricing: {
      model: "Annual retainer + per-call",
      perCallRange: "$500–1,500",
      annualMinimum: "Six figures typical",
      note: "Strong generalist breadth across geographies",
    },
    bestAt: [
      "Generalist breadth — one of the largest networks globally",
      "Strong APAC and EMEA coverage",
      "Survey and quant panels at scale",
      "Established enterprise compliance integrations",
    ],
    fieldsignalDifferent: [
      "Mid-market and emerging-manager cheque-size friendly",
      "Per-call pricing without retainer commitment",
      "Smaller network, deeper per-project attention",
    ],
    bestFitBuyer: "Buyers who need broad multi-region generalist coverage and can fund a retainer.",
  },
  {
    slug: "tegus",
    name: "Tegus",
    founded: 2017,
    hq: "Chicago",
    url: "https://tegus.com",
    networkSize: "Searchable library of 100,000+ expert call transcripts",
    pricing: {
      model: "Subscription (transcript-first)",
      perCallRange: "Custom calls supported separately",
      annualMinimum: "Tens of thousands annually",
      note: "Now part of AlphaSense (acquired 2024)",
    },
    bestAt: [
      "Largest transcript library in the industry — searchable and AI-indexed",
      "Best AI-driven thematic search and summarisation",
      "Investor-first product workflow (excellent for buy-side analysts)",
      "Unified with AlphaSense document research post-acquisition",
    ],
    fieldsignalDifferent: [
      "Per-call custom expert sourcing at fraction of subscription cost",
      "$99/mo transcript access vs Tegus full subscription",
      "Lower-friction for buyers who need 5–20 transcripts/yr not 200",
    ],
    bestFitBuyer: "Active buy-side teams with high transcript consumption and AI-search workflows.",
  },
  {
    slug: "alphasense",
    name: "AlphaSense",
    founded: 2011,
    hq: "New York",
    url: "https://alpha-sense.com",
    networkSize: "Document + transcript platform (Tegus integrated post-2024 acquisition)",
    pricing: {
      model: "Annual subscription",
      perCallRange: "n/a (platform)",
      annualMinimum: "Tens of thousands",
      note: "Position is research platform, not expert network",
    },
    bestAt: [
      "Best-in-class document search across earnings, broker, regulatory",
      "AI summarisation and theme detection",
      "Integrated Tegus transcript library since 2024",
      "Enterprise SSO and team collaboration tooling",
    ],
    fieldsignalDifferent: [
      "Custom expert sourcing on demand — AlphaSense is library-only",
      "Per-call diligence work AlphaSense doesn't offer",
      "Lower entry cost for transcript browsing alone",
    ],
    bestFitBuyer: "Equity research teams and corporate strategy functions wanting unified document + transcript search.",
  },
  {
    slug: "coleman-research",
    name: "Coleman Research",
    founded: 2003,
    hq: "Raleigh, NC",
    url: "https://colemanrg.com",
    networkSize: "Mid-sized vetted expert network",
    pricing: {
      model: "Annual retainer + per-call",
      perCallRange: "$500–1,200",
      annualMinimum: "Five to six figures",
      note: "Healthcare and life sciences depth a differentiator",
    },
    bestAt: [
      "Healthcare and life-sciences depth disproportionate to overall size",
      "Faster onboarding than the largest networks",
      "Strong compliance reputation",
      "Reasonable per-call pricing for mid-market clients",
    ],
    fieldsignalDifferent: [
      "Lower entry point and broader sector breadth",
      "No retainer requirement at all",
      "Transparent published pricing",
    ],
    bestFitBuyer: "Mid-market clients with healthcare research weight who want a focused boutique.",
  },
  {
    slug: "newtonx",
    name: "NewtonX",
    founded: 2017,
    hq: "New York",
    url: "https://newtonx.com",
    networkSize: "AI-recruited expert panels (B2B survey-first)",
    pricing: {
      model: "Per-survey + per-call",
      perCallRange: "Custom",
      annualMinimum: "Lower than legacy networks",
      note: "AI-driven panel build is core differentiator",
    },
    bestAt: [
      "B2B survey panel building at speed via AI sourcing",
      "Quantitative research over qualitative",
      "Lower friction for one-off project work",
      "Strong tech-buyer panel reach",
    ],
    fieldsignalDifferent: [
      "Stronger qualitative bench (1:1 calls, management refs)",
      "Compliance framework deeper for investor use cases",
      "Transcript library alongside custom work",
    ],
    bestFitBuyer: "Corporate strategy and marketing teams running quantitative B2B research at panel scale.",
  },
] as const;

/** Helper: look up a competitor by slug. */
export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}
