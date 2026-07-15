/**
 * The 6 priority client segments for Wave 1 (per SEO brief §4.4).
 * The remaining 8 segments land in Wave 4.
 *
 * Hub /clients iterates this. /clients/[slug] template uses it.
 */

export type Client = {
  slug: string;
  id: string;             // e.g. "01.1" on the hub
  name: string;           // tile NAME (uppercased)
  title: string;          // <title> tag
  description: string;    // meta description
  oneLiner: string;       // hub tile body
  pageLede: string;       // detail-page lede paragraph
  needs: readonly string[];
  whatWeProvide: readonly string[];
  typicalEngagements: readonly string[];
  relatedSlugs: readonly string[];
  primaryKW: string;
};

export const clients: readonly Client[] = [
  {
    slug: "startups-and-scaleups",
    id: "01.1",
    name: "STARTUPS & SCALE-UPS",
    title: "Expert Network for Startups - Without the Six-Figure Retainer",
    description:
      "Seed to Series D startups validating PMF, planning expansion, or running pre-fundraise diligence. Per-call pricing, no minimums.",
    oneLiner:
      "Seed to Series D founders validating PMF, planning expansion, or running pre-fundraise diligence.",
    pageLede:
      "FieldSignal exists so that a three-person seed-stage team can buy the same expert call a billion-dollar hedge fund buys — without the six-figure annual retainer. Per-call pricing, 3–5 day turnaround, full compliance.",
    needs: [
      "Validate product-market fit with operators who've built in your space",
      "Pre-fundraise: understand the competitive set before the deck goes out",
      "Channel research before a new market launch",
      "Customer interviews you can't run yourself",
    ],
    whatWeProvide: [
      "Per-call pricing — no annual retainer",
      "10–20 candidate experts within 24–72 hours",
      "Compliance equivalent to GLG (yes — even for a seed team)",
      "Senior account lead on every project, regardless of cheque size",
    ],
    typicalEngagements: [
      "Series A SaaS — 5 calls with mid-market IT buyers",
      "Seed marketplace — 8 supply-side operator interviews",
      "Series B fintech — 1 panel with 4 compliance officers",
      "Pre-Series C healthtech — 15-call channel research project",
    ],
    relatedSlugs: ["venture-capital", "management-consulting", "corporate-strategy-teams"],
    primaryKW: "expert network for startups",
  },
  {
    slug: "venture-capital",
    id: "01.2",
    name: "VENTURE CAPITAL",
    title: "Expert Network for Venture Capital - Diligence at Fund Economics",
    description:
      "Pre-investment diligence, market sizing and management references for seed through growth-stage funds. Per-call or quarterly subscriptions.",
    oneLiner:
      "Pre-investment diligence, market sizing and management refs for seed through growth-stage funds.",
    pageLede:
      "Per-deal expert work for emerging managers and traditional funds alike. Pre-IC validation, founder reference work, market sizing, and competitive teardowns — priced so you can run primary research on every term sheet, not just the big ones.",
    needs: [
      "Pre-IC validation of an investment thesis (calls, surveys, panels)",
      "Off-list management references on founders pre-term-sheet",
      "Market sizing for category-creating bets",
      "Competitive teardown before leading a round",
    ],
    whatWeProvide: [
      "Per-deal pricing — no fund-level minimum, no retainer",
      "Quarterly subscription option for active funds",
      "Off-list management reference programmes (5–8 calls per exec)",
      "Diligence sprint format: thesis → calls → findings in 2 weeks",
    ],
    typicalEngagements: [
      "Seed VC — 3-call pre-IC validation on a vertical SaaS thesis",
      "Series A fund — management refs on 2 co-founders + 5 customer calls",
      "Growth-stage fund — sector deep-dive with 20 expert interviews",
      "Multi-stage fund — quarterly subscription with 30 calls / qtr",
    ],
    relatedSlugs: ["private-equity", "hedge-funds", "startups-and-scaleups"],
    primaryKW: "expert network for VCs",
  },
  {
    slug: "private-equity",
    id: "01.3",
    name: "PRIVATE EQUITY",
    title: "Expert Network for Private Equity - From Sourcing to Exit",
    description:
      "Buy-side and sell-side commercial diligence, management checks and portfolio research for PE funds across small-cap to mega-cap.",
    oneLiner:
      "Buy-side and sell-side commercial diligence, management checks and portfolio research.",
    pageLede:
      "Primary-research support across the full PE lifecycle — sourcing, pre-LOI commercial DD, management refs, post-close portfolio research and pre-exit positioning work. Standard and accelerated 2-week sprints, with annual programmes for repeat needs.",
    needs: [
      "Pre-LOI commercial diligence on a strategic acquisition",
      "Off-list management references on incoming portfolio CEOs",
      "Portfolio research: competitive positioning, customer voice",
      "Sell-side prep: customer interviews to support process narrative",
    ],
    whatWeProvide: [
      "2-week commercial DD sprint format",
      "5-call management reference packs per executive",
      "Quarterly portfolio-company VoC programmes",
      "Sell-side anonymised customer interviews for the IM",
    ],
    typicalEngagements: [
      "Lower-mid PE — 30-call commercial DD on a vertical SaaS target",
      "Mid-cap PE — 5-exec management ref pack, $2bn deal",
      "Portfolio company — quarterly VoC, 15 customer calls / qtr",
      "Pre-exit prep — 12 customer calls to support sell-side IM",
    ],
    relatedSlugs: ["venture-capital", "hedge-funds", "corporate-strategy-teams"],
    primaryKW: "expert network for PE",
  },
  {
    slug: "hedge-funds",
    id: "01.4",
    name: "HEDGE FUNDS",
    title: "Expert Network for Hedge Funds - Built for Emerging Managers",
    description:
      "Single-stock primary research, channel checks and rapid expert calls. Compliance equivalent to GLG. Priced for $50M to $500M AUM funds.",
    oneLiner:
      "Single-stock primary research, channel checks and rapid expert calls.",
    pageLede:
      "Built for the emerging-manager universe — long/short funds running between $50M and $500M AUM — where GLG and AlphaSights retainers are economically impossible but the research need is identical. Per-call pricing, same compliance, same network.",
    needs: [
      "Channel checks on positions in your book",
      "Single-stock thesis validation pre-trade",
      "Earnings preview research across customer/supplier panels",
      "Quarterly sector pulses on positions you're tracking",
    ],
    whatWeProvide: [
      "Per-call pricing, $200–800 depending on expert seniority",
      "Compliance equivalent to GLG (MNPI rules, 6-mo cooling-off, attestations)",
      "Pre-call attestation system for your compliance team",
      "Fund-AUM-aware pricing — no $250k annual minimums",
    ],
    typicalEngagements: [
      "$80M long/short fund — 6 channel checks before earnings",
      "$200M sector specialist — 4-expert panel on category dynamics",
      "$400M multi-strat — quarterly subscription with 25 calls / qtr",
      "Emerging manager — pre-trade thesis validation, 3 calls",
    ],
    relatedSlugs: ["private-equity", "venture-capital", "management-consulting"],
    primaryKW: "expert network for hedge funds",
  },
  {
    slug: "management-consulting",
    id: "01.5",
    name: "MANAGEMENT CONSULTING",
    title: "Expert Network for Strategy Consultants - Speed and Precision",
    description:
      "Tier 1 to boutique consulting firms running market entry, due diligence and growth strategy engagements.",
    oneLiner:
      "Tier 1 to boutique firms running market entry, due diligence and growth strategy engagements.",
    pageLede:
      "Primary research delivered to consulting cadences — fast turnarounds, multiple parallel projects, expert quality consistent with what your associates expect from established networks. Without the institutional pricing model.",
    needs: [
      "Market entry research for client expansion strategies",
      "Commercial diligence support for PE clients",
      "Voice-of-customer programmes for B2B client engagements",
      "Competitive intelligence for growth strategy mandates",
    ],
    whatWeProvide: [
      "Tier-1 expert quality at boutique-affordable rates",
      "Parallel project management for multi-engagement teams",
      "Pre-call briefing support tailored to consulting needs",
      "White-label transcript and findings delivery on request",
    ],
    typicalEngagements: [
      "Tier-1 partner — 25 expert calls for a market entry study",
      "Boutique CDD firm — 12-call diligence sprint for PE client",
      "Growth-strategy boutique — VoC programme with 20 interviews",
      "Strategy & ops consultancy — channel research for industrial client",
    ],
    relatedSlugs: ["corporate-strategy-teams", "private-equity", "hedge-funds"],
    primaryKW: "expert network for consultants",
  },
  {
    slug: "corporate-strategy-teams",
    id: "01.6",
    name: "CORPORATE STRATEGY",
    title: "Expert Network for Corporate Strategy Teams",
    description:
      "Strategic planning, competitive intelligence and M&A target research for in-house corporate strategy functions.",
    oneLiner:
      "Strategic planning, competitive intelligence and M&A target research for in-house strategy teams.",
    pageLede:
      "Programmatic primary research for in-house corporate strategy teams — competitive intelligence, M&A target diligence, market expansion research, voice-of-customer. Treated as an extension of your strategy function, not a vendor.",
    needs: [
      "Continuous competitive intelligence on category competitors",
      "Pre-acquisition target diligence (customer/supplier/employee)",
      "New geography or vertical expansion research",
      "Independent voice-of-customer programmes",
    ],
    whatWeProvide: [
      "Annual or quarterly intelligence programmes",
      "Pre-acquisition diligence sprints",
      "Independent VoC research integrated with internal CRM",
      "Senior strategist as account lead for full programme",
    ],
    typicalEngagements: [
      "Fortune 500 strategy team — quarterly CI programme, 4 categories",
      "Mid-market strategy lead — M&A target diligence, 3 targets",
      "Listed company corp-dev — pre-deal customer ref work",
      "Industrial conglomerate — vertical entry research for new BU",
    ],
    relatedSlugs: ["management-consulting", "private-equity", "venture-capital"],
    primaryKW: "expert network for corporate strategy",
  },

  // ─── Wave 4 additions ──────────────────────────────────────────
  {
    slug: "small-and-medium-businesses",
    id: "01.7",
    name: "SMEs & FAMILY-RUN",
    title: "Expert Network for SMEs - Family-Run to Mid-Market",
    description:
      "SME and family-owned firms entering new markets or assessing M&A. Operator-grade research without enterprise pricing.",
    oneLiner:
      "SMEs and family-owned firms entering new markets or assessing M&A.",
    pageLede:
      "Family-run and small/medium businesses get the same operator-grade research as Fortune 500 strategy teams — without the enterprise pricing. Per-call pricing, no minimums. We've supported owners through everything from first international entry to pre-sale grooming.",
    needs: [
      "Validate a new geographic or vertical entry before committing capex",
      "Pre-sale grooming research to understand market positioning",
      "Competitive intelligence on bigger rivals encroaching on your market",
      "Acquisition-target diligence at a price an SME can afford",
    ],
    whatWeProvide: [
      "Per-call pricing, no annual commitment",
      "Operator interviews in your target market, often the next week",
      "Plain-English findings — no consultancy-speak deliverables",
      "Compliance documentation acceptable to any acquirer's DD process",
    ],
    typicalEngagements: [
      "Family-run manufacturer — UK entry research, 6 distributor calls",
      "SME software vendor — pre-sale market positioning, 8 buyer interviews",
      "Owner-operated distributor — acquisition target validation",
      "Family-office portfolio SME — supplier consolidation research",
    ],
    relatedSlugs: ["mid-market-enterprises", "startups-and-scaleups", "family-offices"],
    primaryKW: "expert network for SMEs",
  },
  {
    slug: "mid-market-enterprises",
    id: "01.8",
    name: "MID-MARKET ENTERPRISES",
    title: "Expert Network for Mid-Market Enterprises ($10M to $500M Revenue)",
    description:
      "Mid-market companies planning international expansion, assessing acquisitions or running competitive intelligence programs.",
    oneLiner:
      "$10M to $500M revenue companies running CI programmes, M&A and expansion research.",
    pageLede:
      "The mid-market is structurally underserved by GLG/AlphaSights pricing. We pick up where the boutique-consulting bench leaves off — independent operator interviews, customer reference work and competitive intelligence at fund-economics cheque sizes.",
    needs: [
      "Continuous competitive intelligence on the players above and below you",
      "International expansion research before the strategy is locked in",
      "Acquisition diligence without paying Big Four CDD fees",
      "Customer reference work for sales-ops or category planning",
    ],
    whatWeProvide: [
      "Per-call or programme pricing — no retainers",
      "Quarterly subscription option for active CI programmes",
      "Senior researcher on every engagement",
      "Independent VoC research integrated with your CRM",
    ],
    typicalEngagements: [
      "$80M SaaS company — quarterly CI programme, 3 categories",
      "$200M industrial — German market entry, 12 channel interviews",
      "$350M services group — acquisition target diligence, 2 targets",
      "Mid-market healthcare — competitive teardown of category leader",
    ],
    relatedSlugs: ["fortune-500-corporations", "corporate-strategy-teams", "small-and-medium-businesses"],
    primaryKW: "expert network for mid-market",
  },
  {
    slug: "fortune-500-corporations",
    id: "01.9",
    name: "FORTUNE 500",
    title: "Expert Network for Fortune 500 Strategy and Innovation Teams",
    description:
      "Strategy, corporate development and innovation teams at large enterprises. Custom intelligence projects and ongoing programs.",
    oneLiner:
      "Strategy, corp-dev and innovation teams at large enterprises.",
    pageLede:
      "We work with corporate strategy and innovation functions at Fortune 500 and FTSE 100 companies — typically as a flexible second-vendor alongside their incumbent GLG/AlphaSights relationship. Faster, cheaper, with senior account leadership end-to-end.",
    needs: [
      "Second-vendor cover for projects too small for the primary retainer",
      "Independent research outside the home-office geographies",
      "Innovation-team category scans on emerging tech",
      "M&A target intelligence below the radar of investment banking advisors",
    ],
    whatWeProvide: [
      "Enterprise MSA with documented compliance equivalent to incumbents",
      "Senior account lead on every project — no junior triage layer",
      "Custom annual programmes with volume discounts",
      "Dedicated compliance liaison for procurement integration",
    ],
    typicalEngagements: [
      "F500 strategy — quarterly CI sweep across 5 product lines",
      "FTSE 100 innovation — AI-tooling category scan, 14 interviews",
      "F500 corp-dev — pre-LOI customer references on target",
      "Global industrial — emerging-markets channel research",
    ],
    relatedSlugs: ["corporate-strategy-teams", "corporate-development-and-m-and-a", "mid-market-enterprises"],
    primaryKW: "expert network for corporations",
  },
  {
    slug: "investment-banks-and-equity-research",
    id: "01.10",
    name: "INVESTMENT BANKS & ER",
    title: "Expert Network for Investment Banks and Equity Research",
    description:
      "Sector deep dives, channel checks and management references for ECM, M&A and sell-side equity research teams.",
    oneLiner:
      "Sector deep dives, channel checks and management refs for ECM, M&A and sell-side ER.",
    pageLede:
      "Sell-side ER, M&A and ECM teams use us for sector deep dives, pre-IPO channel checks and sponsor-side reference work. Compliance documentation we can share with your bank's central process. Coverage across EMEA, APAC and Americas.",
    needs: [
      "Pre-IPO channel checks for ECM-side diligence",
      "Sector deep dives for ER initiation reports",
      "Pre-pitch market mapping for M&A advisory teams",
      "Independent references on sponsor- and management-team work",
    ],
    whatWeProvide: [
      "Bank-grade compliance documentation, externally auditable",
      "Coverage across EMEA, APAC, Americas with native-language interviewing",
      "Standard 2-week sprint or accelerated 5-day option",
      "Anonymised expert profiles delivered to deal teams",
    ],
    typicalEngagements: [
      "ER team initiation — sector deep-dive, 18 expert interviews",
      "ECM pre-IPO — channel checks across 3 geographies",
      "M&A advisory — pre-pitch market mapping",
      "Leveraged finance — borrower management reference work",
    ],
    relatedSlugs: ["hedge-funds", "private-equity", "venture-capital"],
    primaryKW: "expert network for investment banks",
  },
  {
    slug: "family-offices",
    id: "01.11",
    name: "FAMILY OFFICES",
    title: "Expert Network for Family Offices - Direct Deal Diligence",
    description:
      "Direct-investment diligence, manager selection and category research for single and multi-family offices.",
    oneLiner:
      "Direct-investment diligence, manager selection and category research for SFOs and MFOs.",
    pageLede:
      "Family offices increasingly run direct co-investments and direct private deals alongside fund commitments. We support both: independent operator references on direct deals, and manager-selection research for fund commitments. Per-deal pricing matches per-deal economics.",
    needs: [
      "Independent references on management teams in direct investments",
      "Category research before co-investing alongside a sponsor",
      "Manager-selection diligence for new fund commitments",
      "Sector intelligence to support next-generation investment leads",
    ],
    whatWeProvide: [
      "Per-deal pricing, no annual minimum",
      "Single-family vs multi-family discretion handled appropriately",
      "Off-list reference programmes (5–8 calls per principal)",
      "Quarterly subscription option for actively investing offices",
    ],
    typicalEngagements: [
      "SFO direct deal — 6 customer refs + 3 management refs",
      "MFO manager selection — 8-call diligence on emerging-manager VC",
      "Family office co-invest — category research alongside lead sponsor",
      "Next-gen investment lead — quarterly sector deep dives",
    ],
    relatedSlugs: ["private-equity", "venture-capital", "hedge-funds"],
    primaryKW: "expert network for family offices",
  },
  {
    slug: "boutique-consulting-firms",
    id: "01.12",
    name: "BOUTIQUE CONSULTANCIES",
    title: "Expert Network for Boutique Consulting Firms",
    description:
      "Specialist consulting firms needing flexible access to experts without the retainer commitments of GLG or AlphaSights.",
    oneLiner:
      "Specialist consulting firms needing flexible expert access without retainer commitments.",
    pageLede:
      "Boutique consultancies — strategy, transformation, sector-specialists — need expert access without funding a six-figure GLG or AlphaSights retainer that won't get used. Per-project pricing matched to your client engagements. We're transparent about our involvement when it matters.",
    needs: [
      "Per-engagement expert sourcing without retainer overhead",
      "White-label sourcing where client confidentiality matters",
      "Quick turnaround on small engagements (3–8 calls)",
      "Sector specialists outside the boutique's core practice areas",
    ],
    whatWeProvide: [
      "Per-engagement pricing aligned to your client billing structure",
      "Discreet sourcing — we work as your researcher when needed",
      "Turnaround as fast as 48 hours for first call",
      "Cross-sector bench broader than any single boutique can maintain",
    ],
    typicalEngagements: [
      "Boutique strategy firm — 8 calls for client commercial DD",
      "Sector specialist consultancy — supplement bench on adjacent vertical",
      "Transformation boutique — voice-of-customer work for client",
      "Independent advisor — single-call expert briefings on demand",
    ],
    relatedSlugs: ["management-consulting", "market-research-agencies", "corporate-strategy-teams"],
    primaryKW: "expert network for boutique consultancies",
  },
  {
    slug: "market-research-agencies",
    id: "01.13",
    name: "MARKET RESEARCH AGENCIES",
    title: "Expert Network for Market Research Agencies and Insight Firms",
    description:
      "White-label and named expert sourcing for market research agencies. Build qual and quant programs faster.",
    oneLiner:
      "White-label expert sourcing for market research and insight firms.",
    pageLede:
      "Market research agencies and insight firms partner with us on expert sourcing — both white-label (we're invisible to your client) and named (your client knows about the collaboration). Either way, we build qual and quant programmes faster than recruitment-only models.",
    needs: [
      "White-label expert sourcing where end-client doesn't see our brand",
      "Named partnership where end-client values the FieldSignal compliance",
      "Both qual (1:1 calls) and quant (survey panels) coverage",
      "International coverage outside agency's home-market bench",
    ],
    whatWeProvide: [
      "Flexible white-label or named-partner positioning",
      "Wholesale pricing reflecting volume commitments",
      "Compliance documentation supplied to your end-client on request",
      "Native-language interviewing in 10+ languages",
    ],
    typicalEngagements: [
      "Insight agency — white-label qual programme, 30 calls per quarter",
      "Specialist research firm — named partnership for client CI work",
      "Brand-research agency — survey panel build, 200 B2B respondents",
      "Boutique strategy researcher — international supplement to home bench",
    ],
    relatedSlugs: ["boutique-consulting-firms", "management-consulting", "corporate-strategy-teams"],
    primaryKW: "expert network for market research agencies",
  },
  {
    slug: "corporate-development-and-m-and-a",
    id: "01.14",
    name: "CORPORATE DEV & M&A",
    title: "Expert Network for Corporate Development and M&A",
    description:
      "Pre-deal diligence, management references, integration planning research for in-house corp dev teams.",
    oneLiner:
      "Pre-deal diligence, management refs and integration research for in-house corp-dev teams.",
    pageLede:
      "In-house corporate development teams use us for pre-deal commercial diligence, off-list management references and post-LOI integration research. Cheque-size friendly for the regular small-to-mid-cap bolt-ons that don't justify a Big Four CDD project.",
    needs: [
      "Pre-LOI commercial diligence on bolt-on targets",
      "Off-list management references on target executives",
      "Post-LOI integration research (customer retention, supplier health)",
      "Continuous market scanning for proactive acquisition pipeline",
    ],
    whatWeProvide: [
      "Per-deal pricing aligned to bolt-on cheque sizes",
      "Standard 2-week diligence sprint or accelerated 5-day option",
      "Documented chain-of-custody compliance for post-close audit",
      "Quarterly retainer option for active acquirers",
    ],
    typicalEngagements: [
      "Strategic acquirer — bolt-on target commercial DD, 12 customer calls",
      "Listed company corp-dev — off-list refs on 3 target execs",
      "Industrial acquirer — post-LOI supplier health research",
      "Active acquirer — quarterly market-scan retainer",
    ],
    relatedSlugs: ["fortune-500-corporations", "corporate-strategy-teams", "private-equity"],
    primaryKW: "expert network for corporate M&A",
  },
] as const;
