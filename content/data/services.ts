/**
 * The 9 FieldSignal services. One row per page in the SEO brief §4.2.
 * Hub /services iterates this. /services/[slug] template uses it for each
 * detail page.
 */

export type Service = {
  slug: string;
  id: string;             // e.g. "01.1" on the hub
  name: string;           // tile NAME (uppercased)
  title: string;          // <title> tag
  description: string;    // meta description
  oneLiner: string;       // hub tile body
  pageLede: string;       // detail-page lede paragraph
  turnaround?: string;
  pricingFrom?: { amount: number; currency: string };
  whenToUse: readonly string[];
  whatYouGet: readonly string[];
  sampleProfiles: readonly string[];
  relatedSlugs: readonly string[];
  primaryKW: string;
};

export const services: readonly Service[] = [
  {
    slug: "expert-consultations",
    id: "01.1",
    name: "EXPERT CONSULTATIONS",
    title: "Expert Consultations - 1:1 Calls with Industry Specialists",
    description:
      "One-hour calls with vetted operators, executives and specialists across 50,000+ professionals. Scheduled in 3 to 5 business days.",
    oneLiner:
      "One-hour calls with vetted operators, executives and specialists. Scheduled in 3–5 business days.",
    pageLede:
      "One-hour, one-on-one calls with carefully vetted industry professionals who have direct experience of the question you're researching. Scheduled in 3–5 business days, transcribed within 24 hours, compliance-reviewed before delivery.",
    turnaround: "3–5 days",
    pricingFrom: { amount: 500, currency: "EUR" },
    whenToUse: [
      "Quickly validate a thesis with one credible operator",
      "Get unstructured colour on a competitor or market",
      "Spot-check a specific claim before a board or IC meeting",
      "Brief a strategy team before a workshop",
    ],
    whatYouGet: [
      "One 60-minute call with a vetted, compliance-cleared expert",
      "Pre-call brief with discussion guide and expert profile",
      "Professional transcript within 1 business day",
      "Compliance attestation on file (7-year audit trail)",
    ],
    sampleProfiles: [
      "Ex-VP Engineering at a top-3 hyperscaler",
      "Former category buyer at a Fortune 100 grocery chain",
      "Ex-Head of Sales at a unicorn cybersecurity vendor",
      "Former district medical director at an East Coast IDN",
    ],
    relatedSlugs: ["panel-calls", "management-reference-checks", "transcript-library-access"],
    primaryKW: "expert consultations",
  },
  {
    slug: "panel-calls",
    id: "01.2",
    name: "PANEL CALLS",
    title: "Panel Calls - Multi-Expert Discussions on Strategic Questions",
    description:
      "Facilitated 90-minute panels with 3 to 6 market participants. Use for category shifts, regulatory questions and competitive dynamics.",
    oneLiner:
      "Facilitated 90-minute discussions with 3–6 market participants.",
    pageLede:
      "Facilitated 90-minute panels bringing together 3 to 6 market participants with complementary perspectives. Stronger than single calls when the question hinges on consensus, dissent, or category-level dynamics.",
    turnaround: "5–10 days",
    pricingFrom: { amount: 3500, currency: "EUR" },
    whenToUse: [
      "Test a thesis that depends on multiple participant types agreeing or disagreeing",
      "Map competitive dynamics across a category",
      "Surface regulatory perspectives from operators, lawyers and policy specialists",
      "Pressure-test a new product positioning with target buyers",
    ],
    whatYouGet: [
      "90-minute panel with 3–6 vetted experts",
      "Skilled moderator facilitating the discussion",
      "Pre-panel briefs for every participant",
      "Transcript + executive summary within 2 business days",
    ],
    sampleProfiles: [
      "Three category buyers at competing grocers (panel of three)",
      "Two ex-regulators + a compliance executive (regulatory panel)",
      "Four CISOs across financial services verticals (buyer panel)",
      "Five plant managers from competing automotive OEMs (operational panel)",
    ],
    relatedSlugs: ["expert-consultations", "expert-surveys", "custom-intelligence-projects"],
    primaryKW: "panel calls",
  },
  {
    slug: "expert-surveys",
    id: "01.3",
    name: "EXPERT SURVEYS",
    title: "Expert Surveys - 20 to 200 Respondent Quantitative Research",
    description:
      "Targeted surveys across screened industry participants. Survey design, panel build, fielding and analysis in 2 to 4 weeks.",
    oneLiner:
      "Targeted surveys across 20–200 screened industry participants.",
    pageLede:
      "Where qualitative depth meets quantitative confidence. We design, recruit, field and analyse surveys across screened industry participants — typically 20 to 200 respondents, depending on the segment size and statistical target.",
    turnaround: "2–4 weeks",
    pricingFrom: { amount: 12000, currency: "EUR" },
    whenToUse: [
      "Validate a qualitative finding at statistically meaningful scale",
      "Quantify adoption, pricing, churn or NPS in a specific buyer segment",
      "Build a benchmark before a strategy or product launch",
      "Replace a generic third-party panel with a credibly screened one",
    ],
    whatYouGet: [
      "Survey design including screening logic",
      "Panel build to your screening criteria (typical N: 20–200)",
      "Fielding with response-rate optimisation",
      "Cross-tab analysis and an executive read-out",
    ],
    sampleProfiles: [
      "120 IT decision-makers at mid-market US manufacturers",
      "75 cardiologists at academic medical centres",
      "60 head chefs at independent restaurants in 5 EU markets",
      "200 SaaS buyers across three pricing tiers",
    ],
    relatedSlugs: ["panel-calls", "voice-of-customer", "custom-intelligence-projects"],
    primaryKW: "expert surveys",
  },
  {
    slug: "management-reference-checks",
    id: "01.4",
    name: "MANAGEMENT REFERENCE CHECKS",
    title: "Management Reference Checks - Investor-Grade Diligence Calls",
    description:
      "Off-list reference calls with former colleagues, customers and partners of target executives. Critical for pre-IC and pre-close diligence.",
    oneLiner:
      "Off-list reference calls with former colleagues, customers and partners of target executives.",
    pageLede:
      "Off-list reference calls with former colleagues, customers, partners and reports of target executives. Standard practice in pre-IC, pre-hire and pre-close diligence for funds and acquirers who can't rely on a candidate's own list.",
    turnaround: "5–10 days",
    pricingFrom: { amount: 6500, currency: "EUR" },
    whenToUse: [
      "Pre-IC diligence on a target's management team",
      "Pre-close calibration before a leveraged acquisition",
      "Pre-hire reference work on a senior operator",
      "Investor reference work on a fund's portfolio CEO",
    ],
    whatYouGet: [
      "5–8 off-list reference calls per executive",
      "Anonymised composite report — themes, dissent, concerns",
      "Per-call transcripts (where the source agreed)",
      "Source list (anonymised) and outreach audit",
    ],
    sampleProfiles: [
      "Former direct reports (3–5 calls)",
      "Former peer-level colleagues (2–3 calls)",
      "Former customer counterparts (1–2 calls)",
      "Former board observers and investors (1 call)",
    ],
    relatedSlugs: ["expert-consultations", "diligence-research", "custom-intelligence-projects"],
    primaryKW: "management reference checks",
  },
  {
    slug: "custom-intelligence-projects",
    id: "01.5",
    name: "CUSTOM INTELLIGENCE PROJECTS",
    title: "Custom Intelligence Projects - Bespoke Primary Research",
    description:
      "Multi-methodology engagements combining calls, panels, surveys and desk research. Scoped to your investment thesis or strategic question.",
    oneLiner:
      "Multi-methodology engagements combining calls, panels, surveys and desk research.",
    pageLede:
      "When a single methodology won't answer the question, we run combined engagements — calls, panels, surveys, channel checks and desk research — scoped to a specific investment thesis, strategic question or category deep-dive.",
    turnaround: "2–6 weeks",
    pricingFrom: { amount: 25000, currency: "EUR" },
    whenToUse: [
      "Multi-faceted investment thesis spanning 3+ research dimensions",
      "Market entry assessment with regulatory, customer and channel components",
      "Buy-side diligence requiring management refs, customer calls and a survey",
      "Quarterly intelligence programmes for corporate strategy teams",
    ],
    whatYouGet: [
      "Project plan with phased deliverables",
      "Mix of methodologies tuned to your question",
      "Weekly working sessions with the FieldSignal lead",
      "Final report with findings, anti-thesis and recommendations",
    ],
    sampleProfiles: [
      "Pre-LOI commercial DD for a €200M PE deal",
      "Market entry programme for a US SaaS expanding into APAC",
      "Annual CI programme for a corporate strategy team",
      "Multi-region channel research for a fintech repositioning",
    ],
    relatedSlugs: ["panel-calls", "expert-surveys", "diligence-research"],
    primaryKW: "custom intelligence projects",
  },
  {
    slug: "transcript-library-access",
    id: "01.6",
    name: "TRANSCRIPT LIBRARY ACCESS",
    title: "Expert Interview Transcripts - 5,000+ Anonymized Calls",
    description:
      "Searchable library of anonymized expert call transcripts across tech, healthcare, financial services, consumer and industrials.",
    oneLiner:
      "5,000+ anonymized expert call transcripts. Searchable by industry, company, topic.",
    pageLede:
      "Searchable access to 5,000+ anonymised expert interview transcripts. Filter by industry, role, company, topic or date. Browse for context, validate a thesis, or build a primary-research starting point in minutes.",
    turnaround: "Instant",
    pricingFrom: { amount: 99, currency: "EUR" },
    whenToUse: [
      "Initial scoping before commissioning a custom call",
      "Cheap thesis validation when full primary research is overkill",
      "Onboarding a new analyst into a sector",
      "Replacing a Tegus subscription at a fraction of the cost",
    ],
    whatYouGet: [
      "Search and filter across 5,000+ transcripts",
      "Free 300–500 word previews on every transcript",
      "Full transcript access included in subscription tiers",
      "Export to PDF or sync with your knowledge base",
    ],
    sampleProfiles: [
      "Recent calls on AI infrastructure spend (2024–2026)",
      "Healthcare payor dynamics across 5 regions",
      "Channel economics in industrial distribution",
      "Win-loss themes across vertical SaaS categories",
    ],
    relatedSlugs: ["expert-consultations", "voice-of-customer", "win-loss-analysis"],
    primaryKW: "expert interview transcripts",
  },
  {
    slug: "diligence-research",
    id: "01.7",
    name: "DUE DILIGENCE RESEARCH",
    title: "Due Diligence Research - Pre-Investment and Pre-Acquisition",
    description:
      "Combined expert calls, surveys and reference checks for buy-side diligence. Standard 2-week sprint, custom timelines for complex targets.",
    oneLiner:
      "Combined expert calls, surveys and reference checks for buy-side diligence.",
    pageLede:
      "Buy-side and sell-side diligence built on primary research. Combines customer calls, channel checks, management references and competitive panels into a single 2-week sprint, with longer timelines for complex targets.",
    turnaround: "2-week sprint",
    pricingFrom: { amount: 35000, currency: "EUR" },
    whenToUse: [
      "Pre-LOI commercial diligence on a strategic acquisition",
      "Sell-side prep before going to market",
      "Quarterly portfolio refresh for PE-owned companies",
      "Pre-IC validation for VC funds writing $5M+ cheques",
    ],
    whatYouGet: [
      "20–40 primary interviews across customers, channel and ex-employees",
      "Optional management reference checks bolted on",
      "Findings deck with 4–6 thesis-level reads",
      "Anti-thesis section explicitly listing what could break the deal",
    ],
    sampleProfiles: [
      "Industrial PE deal — 30 customer/supplier calls in 2 weeks",
      "Tech PE bolt-on — 15 ex-employee interviews + 8 customer refs",
      "Mid-market healthcare CDD — payor panel + provider survey",
      "Cross-border VC growth round — channel + management refs",
    ],
    relatedSlugs: ["management-reference-checks", "custom-intelligence-projects", "expert-surveys"],
    primaryKW: "due diligence research",
  },
  {
    slug: "voice-of-customer",
    id: "01.8",
    name: "VOICE OF CUSTOMER RESEARCH",
    title: "Voice of Customer Research - B2B Customer Interview Programs",
    description:
      "Programmatic customer interviews for SaaS, fintech and industrial vendors. Identify churn drivers, expansion paths and category positioning.",
    oneLiner:
      "Programmatic customer interviews for SaaS, fintech and industrial vendors.",
    pageLede:
      "Independent, third-party customer interviews you can't get directly. We run programmatic VoC for SaaS, fintech, healthcare and industrial vendors — surfacing churn drivers, expansion paths and unprompted competitive positioning.",
    turnaround: "Quarterly",
    pricingFrom: { amount: 9000, currency: "EUR" },
    whenToUse: [
      "Pre-renewal cycle: identify churn risk before it materialises",
      "Pre-pricing decision: validate willingness-to-pay across segments",
      "Pre-roadmap planning: hear what customers won't tell your CS team",
      "Investor reporting: independent, audited customer evidence",
    ],
    whatYouGet: [
      "15–30 customer interviews per quarter (your choice of segments)",
      "Quarterly insights deck with themes and verbatims",
      "Comparison to last quarter's baseline (trend lines)",
      "Anonymised raw transcripts on request",
    ],
    sampleProfiles: [
      "Enterprise SaaS — 20 customer interviews per quarter across 3 tiers",
      "Vertical SaaS — 15 buyer + 5 end-user calls quarterly",
      "Fintech BaaS — 10 platform partners + 5 end-customer panels",
      "Industrial SaaS — 15 ops leader calls in 4 geographies",
    ],
    relatedSlugs: ["win-loss-analysis", "expert-surveys", "custom-intelligence-projects"],
    primaryKW: "voice of customer research",
  },
  {
    slug: "win-loss-analysis",
    id: "01.9",
    name: "WIN LOSS ANALYSIS",
    title: "Win Loss Analysis - Interviews with Won and Lost Deals",
    description:
      "Independent win-loss programs run by trained interviewers. 15 to 50 interviews per quarter, dashboards and quarterly briefings.",
    oneLiner:
      "Trained interviewers conducting 15–50 win-loss calls per quarter.",
    pageLede:
      "Trained, third-party interviewers conducting 15 to 50 win-loss calls per quarter. We hear what your sales team can't ask and what your customers won't volunteer — the real reasons deals close, slip or go to a competitor.",
    turnaround: "Quarterly",
    pricingFrom: { amount: 7500, currency: "EUR" },
    whenToUse: [
      "Sales leaders trying to diagnose pipeline conversion problems",
      "Product teams who suspect they're losing on a specific feature gap",
      "Marketing teams testing positioning against named competitors",
      "Boards demanding independent evidence on the GTM thesis",
    ],
    whatYouGet: [
      "15–50 won/lost deal interviews per quarter",
      "Dashboards segmented by competitor, deal size, region, stage",
      "Quarterly executive briefing with themes and recommendations",
      "Verbatim quotes (with consent) for internal use",
    ],
    sampleProfiles: [
      "Enterprise vertical SaaS losing to a horizontal incumbent",
      "Mid-market fintech testing pricing positioning",
      "Industrial software losing on procurement timelines",
      "Marketplace product diagnosing supply-side dropoff",
    ],
    relatedSlugs: ["voice-of-customer", "expert-surveys", "custom-intelligence-projects"],
    primaryKW: "win loss analysis",
  },
] as const;
