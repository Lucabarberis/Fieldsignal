/**
 * Use case pages — Wave 4 of the SEO build.
 *
 * These intercept buyers thinking about THE PROBLEM rather than the
 * tool. Per SEO brief §4.5, each follows: what it is, when to run it,
 * how FieldSignal delivers it, sample questions, pricing range.
 */

export type UseCase = {
  slug: string;
  id: string;
  name: string;
  title: string;
  description: string;
  oneLiner: string;
  pageLede: string;
  /** "What it is" — 1-2 sentences on the discipline itself. */
  whatItIs: string;
  /** "When to run it" — checklist of trigger moments. */
  whenToRun: readonly string[];
  /** "How FieldSignal delivers" — checklist of our approach. */
  howWeDeliver: readonly string[];
  /** "Sample questions" — questions buyers typically come to us with. */
  sampleQuestions: readonly string[];
  /** Pricing range for this engagement type. */
  pricingRange: string;
  /** Typical timeline. */
  timeline: string;
  /** Related use cases for cross-link block. */
  relatedSlugs: readonly string[];
  primaryKW: string;
};

export const useCases: readonly UseCase[] = [
  {
    slug: "competitive-intelligence",
    id: "01",
    name: "COMPETITIVE INTELLIGENCE",
    title: "Competitive Intelligence Services",
    description:
      "Always-on competitive intelligence backed by expert interviews, channel checks and structured tracking. Monthly briefings and battle cards.",
    oneLiner:
      "Always-on CI programmes backed by expert interviews, channel checks and structured tracking.",
    pageLede:
      "Most CI programmes inside companies are either glorified press-release tracking or one-off projects that go stale. Ours is built on continuous operator interviews, channel checks and structured tracking — refreshed quarterly, briefed monthly.",
    whatItIs:
      "Continuous competitive intelligence is the discipline of structurally tracking the competitive landscape via primary sources — operators, channel partners, customers, ex-employees — rather than secondary press and analyst coverage.",
    whenToRun: [
      "You're losing deals to a competitor and want to understand why",
      "A category-defining player is moving into adjacent space",
      "Your team needs monthly battle cards that don't go stale",
      "You're entering a category where the players aren't well-documented",
    ],
    howWeDeliver: [
      "Quarterly refresh of 3–8 operator interviews per competitor tracked",
      "Monthly briefing combining interviews with channel/customer signals",
      "Battle cards updated every 90 days, not when someone remembers",
      "Annual subscription pricing aligned to number of competitors tracked",
    ],
    sampleQuestions: [
      "How is competitor X really winning deals against us in segment Y?",
      "What's the realistic timeline for them to launch in our core market?",
      "Where are their customers actually unhappy?",
      "What does their channel economics look like vs ours?",
    ],
    pricingRange: "$7,000–$24,000 / year subscription",
    timeline: "Quarterly refresh, monthly briefings, continuous",
    relatedSlugs: ["market-sizing", "channel-and-distribution-research", "win-loss-analysis"],
    primaryKW: "competitive intelligence",
  },
  {
    slug: "market-sizing",
    id: "02",
    name: "MARKET SIZING",
    title: "Market Sizing Research",
    description:
      "Bottom-up market sizing combining expert interviews with desk research. TAM, SAM and SOM validated by operators in the category.",
    oneLiner:
      "Bottom-up TAM/SAM/SOM validated by operators in the category.",
    pageLede:
      "Top-down market sizing from analyst reports tells you nothing about whether the market is actually buyable. We build bottom-up TAM/SAM/SOM by talking to operators, distributors and customers — and we'll tell you when the available data doesn't support a credible number.",
    whatItIs:
      "Bottom-up market sizing reconstructs market value from operator economics — typical customer cohort sizes, average deal values, conversion rates — rather than top-down extrapolation from analyst reports.",
    whenToRun: [
      "Pre-fundraise: investors need to see a defensible TAM",
      "New product launch: is the addressable market actually big enough?",
      "Category-entry decision: how does the segment really break down?",
      "Investment thesis testing: validate or kill before committing capital",
    ],
    howWeDeliver: [
      "12–25 operator interviews across the value chain",
      "Bottom-up reconstruction with explicit assumption documentation",
      "Honest assessment of where the data doesn't support a number",
      "Sensitivity analysis on the 3 most fragile assumptions",
    ],
    sampleQuestions: [
      "What's the actual addressable segment, by customer archetype?",
      "What's a typical deal value and contract length in this category?",
      "How fragmented is the category — top 10 control X% of share?",
      "What does realistic 3-year category CAGR look like at category Y?",
    ],
    pricingRange: "$3,000–$10,000 / project",
    timeline: "2–4 weeks",
    relatedSlugs: ["investment-thesis-validation", "new-market-entry", "competitive-intelligence"],
    primaryKW: "market sizing",
  },
  {
    slug: "new-market-entry",
    id: "03",
    name: "NEW MARKET ENTRY",
    title: "New Market Entry Research",
    description:
      "Localized expert interviews, channel checks and regulatory research for geographic and vertical expansion decisions.",
    oneLiner:
      "Localized expert interviews, channel checks and regulatory research for expansion decisions.",
    pageLede:
      "Most market-entry failures aren't strategic — they're rooted in misjudging local channel economics, regulatory friction or customer-acquisition costs. Operator interviews in the target market expose this before you commit, not after.",
    whatItIs:
      "Market-entry research validates the channel, regulatory, customer and competitive assumptions underlying a decision to expand into a new geography or vertical. It's bottom-up, operator-driven and ruthlessly assumption-focused.",
    whenToRun: [
      "Considering geographic expansion outside core market",
      "Considering vertical expansion into adjacent customer segments",
      "Pre-acquisition: target operates in a market you don't know well",
      "Post-fundraise: capital deployment plan requires expansion thesis",
    ],
    howWeDeliver: [
      "Native-language interviewing in target market (10+ languages)",
      "Channel economics: distributor, reseller, direct comparison",
      "Local regulatory and licensing reality check",
      "Customer acquisition cost benchmarking against home market",
    ],
    sampleQuestions: [
      "What's the realistic CAC in market X vs our home market?",
      "How does channel mix differ — and what works there?",
      "What regulatory friction will we hit that doesn't exist at home?",
      "Who are the 3 local competitors we don't know exist?",
    ],
    pricingRange: "$5,000–$16,000 / project",
    timeline: "3–6 weeks depending on geography count",
    relatedSlugs: ["market-sizing", "channel-and-distribution-research", "regulatory-and-policy-research"],
    primaryKW: "market entry research",
  },
  {
    slug: "m-and-a-due-diligence",
    id: "04",
    name: "M&A DUE DILIGENCE",
    title: "M&A Due Diligence Research",
    description:
      "Pre-LOI and pre-close primary research for strategic and financial acquirers. Customer calls, supplier interviews, management references.",
    oneLiner:
      "Pre-LOI and pre-close primary research for strategic and financial acquirers.",
    pageLede:
      "M&A diligence research is what stops you buying a business whose customer base is quietly churning, whose key supplier is about to be cut, or whose lead executive is about to walk. Primary research that complements (doesn't replace) Big Four CDD.",
    whatItIs:
      "M&A due diligence research validates the assumptions behind a transaction with primary sources — customers, suppliers, ex-employees, channel partners — to surface risks not visible in management presentations and data rooms.",
    whenToRun: [
      "Pre-LOI: confidence-building before signing",
      "Pre-close: surface late-stage risks before money moves",
      "Vendor/supplier diligence on a target's critical relationships",
      "Off-list management references on target executive team",
    ],
    howWeDeliver: [
      "Standard 2-week sprint or accelerated 5-day option for live deals",
      "Customer reference work (8–15 calls per target)",
      "Off-list management refs (5–8 calls per executive)",
      "Documented chain-of-custody for post-close audit purposes",
    ],
    sampleQuestions: [
      "Are the target's top 10 customers actually as sticky as the deck claims?",
      "What's the real picture from key suppliers on price/availability?",
      "How do former direct reports describe the CEO's actual operating style?",
      "Is there a churn risk we're not seeing in the data room?",
    ],
    pricingRange: "$6,000–$20,000 / target",
    timeline: "5 days–2 weeks",
    relatedSlugs: ["commercial-due-diligence", "management-reference-checks", "investment-thesis-validation"],
    primaryKW: "M&A due diligence",
  },
  {
    slug: "commercial-due-diligence",
    id: "05",
    name: "COMMERCIAL DUE DILIGENCE",
    title: "Commercial Due Diligence",
    description:
      "Buy-side and sell-side commercial due diligence built on expert interviews. Standard 2-week sprint, custom timelines for complex targets.",
    oneLiner:
      "Buy-side and sell-side CDD built on operator and customer interviews.",
    pageLede:
      "Commercial due diligence done right is operator-driven, not desk-research-driven. Standard PE sprint format with the operator-interview depth a Big Four engagement rarely matches at the same cheque size.",
    whatItIs:
      "Commercial diligence assesses the target's competitive position, customer base health, market dynamics and growth thesis through primary research with customers, ex-employees, competitors and channel partners.",
    whenToRun: [
      "Buy-side: 4-week diligence window on a PE/VC investment",
      "Sell-side: vendor-CDD to optimise sale process positioning",
      "Add-on acquisitions where Big Four CDD would be uneconomic",
      "Refinancing or sponsor-secondary deals needing fresh diligence",
    ],
    howWeDeliver: [
      "Standard 2-week sprint matching PE deal timelines",
      "12–25 customer/operator/competitor interviews per target",
      "Findings deliverable formatted for IC consumption",
      "Compliance documentation supplied to your bank/fund as standard",
    ],
    sampleQuestions: [
      "Is the target's growth narrative actually supported by customer behaviour?",
      "What does the competitive set say about the target's defensibility?",
      "How realistic is management's customer-acquisition plan?",
      "What's the supplier/channel reality vs the deck?",
    ],
    pricingRange: "$10,000–$32,000 / project",
    timeline: "2-week standard sprint, 4–6 weeks for complex targets",
    relatedSlugs: ["m-and-a-due-diligence", "investment-thesis-validation", "voice-of-customer"],
    primaryKW: "commercial due diligence",
  },
  {
    slug: "voice-of-customer",
    id: "06",
    name: "VOICE OF CUSTOMER",
    title: "Voice of Customer Research",
    description:
      "Programmatic, third-party run customer interviews. Independent feedback your customers won't give you directly.",
    oneLiner:
      "Programmatic third-party customer interviews — feedback your customers won't give you directly.",
    pageLede:
      "Your customers won't tell you the truth. They'll tell us. Programmatic VoC is the discipline of running independent, third-party customer interviews on a continuous cycle — and acting on what they say even when it's uncomfortable.",
    whatItIs:
      "Voice of Customer (VoC) is structured, ongoing primary research with your customer base — typically run by a third party so respondents speak more openly than they would to your account team.",
    whenToRun: [
      "Your NPS is decent but you suspect product issues you can't surface",
      "You're preparing for a renewal cycle and want unfiltered feedback",
      "Sales-ops needs concrete win/loss data, not anecdotes",
      "Pre-fundraise: investors want to see independent customer validation",
    ],
    howWeDeliver: [
      "Quarterly cycle of 15–40 customer interviews per programme",
      "Mix of named (where the customer agrees) and anonymised feedback",
      "Findings shipped as dashboard + quarterly briefing",
      "Annual subscription pricing for ongoing programmes",
    ],
    sampleQuestions: [
      "What are customers actually saying about us that they won't tell us directly?",
      "Where are we losing renewals and why?",
      "What product gaps are the most strategically important to close?",
      "How is our positioning landing vs the competitive alternatives?",
    ],
    pricingRange: "$8,000–$32,000 / year programme",
    timeline: "Quarterly cycles, continuous",
    relatedSlugs: ["win-loss-analysis", "customer-research", "competitive-intelligence"],
    primaryKW: "voice of customer",
  },
  {
    slug: "win-loss-analysis",
    id: "07",
    name: "WIN-LOSS ANALYSIS",
    title: "Win Loss Analysis",
    description:
      "Trained interviewers conducting 15 to 50 win-loss calls per quarter. Findings shipped as dashboards and quarterly briefings.",
    oneLiner:
      "Independent win-loss programmes — 15 to 50 interviews per quarter, with structured findings.",
    pageLede:
      "Your account team's win-loss notes are biased — wins overweight skill, losses overweight pricing. Independent third-party win-loss interviews reveal the actual decision criteria buyers used. Most of our clients run quarterly programmes after one engagement.",
    whatItIs:
      "Win-loss analysis is the structured practice of interviewing recent buyers (both those who chose you and those who didn't) to surface the actual decision criteria, competitive perception and product gaps driving outcomes.",
    whenToRun: [
      "Your sales team's loss explanations all sound the same (and that's suspicious)",
      "Pre-renewal: understand what's driving churn vs retention",
      "Product-led growth: which features actually drove the conversion?",
      "Competitive displacement work — where exactly are you losing?",
    ],
    howWeDeliver: [
      "15–50 calls per quarter (mix of recent wins and recent losses)",
      "Trained interviewers, not your sales team or AE",
      "Structured findings: decision criteria, perception, gaps",
      "Quarterly briefings with rolling 12-month trend analysis",
    ],
    sampleQuestions: [
      "What was the actual decision criterion that tipped the deal?",
      "How did the buyer describe us vs the alternative they chose?",
      "Where in the sales process did we lose them?",
      "What feature gap or positioning gap is consistently coming up?",
    ],
    pricingRange: "$6,000–$24,000 / year programme",
    timeline: "Quarterly cycles, continuous",
    relatedSlugs: ["voice-of-customer", "competitive-intelligence", "customer-research"],
    primaryKW: "win loss analysis",
  },
  {
    slug: "pricing-research",
    id: "08",
    name: "PRICING RESEARCH",
    title: "Pricing Research",
    description:
      "Customer and channel interviews to test pricing, packaging and discount structures. Van Westendorp, conjoint and qualitative methods.",
    oneLiner:
      "Customer and channel interviews to test pricing, packaging and discount structures.",
    pageLede:
      "Most companies under-price. The remainder over-price. Both groups are guessing. Pricing research with customers and channel partners produces willingness-to-pay data that survives in front of a board — and a sales team.",
    whatItIs:
      "Pricing research uses structured interviews and surveys (Van Westendorp, conjoint analysis, qualitative methods) with customers and channel partners to test willingness to pay, packaging structures and discount tolerance.",
    whenToRun: [
      "Pre-launch: setting price for a new product or category",
      "Annual price-list refresh: justify increases to customers",
      "Packaging changes: tier restructuring or bundle redesigns",
      "Competitive response: pricing has shifted in the market and you need data",
    ],
    howWeDeliver: [
      "Mix of qualitative interviews and structured survey methods",
      "Van Westendorp price-sensitivity meter when appropriate",
      "Conjoint analysis for multi-attribute pricing decisions",
      "Channel-side pricing intelligence on competitor list prices and discounting",
    ],
    sampleQuestions: [
      "What's the realistic price ceiling for category X in segment Y?",
      "How do customers actually compare our price vs the competitive set?",
      "Where would a price increase materially affect retention?",
      "What's the optimal tier structure given customer segmentation?",
    ],
    pricingRange: "$6,000–$20,000 / project",
    timeline: "3–5 weeks",
    relatedSlugs: ["voice-of-customer", "competitive-intelligence", "customer-research"],
    primaryKW: "pricing research",
  },
  {
    slug: "channel-and-distribution-research",
    id: "09",
    name: "CHANNEL & DISTRIBUTION",
    title: "Channel and Distribution Research",
    description:
      "Distributor, reseller and broker interviews to map channel economics, partner satisfaction and category dynamics.",
    oneLiner:
      "Distributor, reseller and broker interviews mapping channel economics and dynamics.",
    pageLede:
      "Channel-led businesses live and die by partner economics — and most internal teams can't see what their partners actually think. Direct distributor and reseller interviews surface the channel reality your CRO won't get from QBRs.",
    whatItIs:
      "Channel research interviews distributors, resellers, brokers and other intermediaries to map channel economics, partner satisfaction, competitive partner activity and category-level distribution dynamics.",
    whenToRun: [
      "Channel partner economics feel off but you can't quite prove why",
      "Considering a direct vs indirect channel shift",
      "Entering a new market and need to map the partner landscape",
      "Annual channel programme refresh — what's the partner sentiment?",
    ],
    howWeDeliver: [
      "8–25 distributor/reseller/broker interviews per project",
      "Channel economics benchmarking against competitor partner programmes",
      "Partner satisfaction structured assessment",
      "Distribution-shift recommendations grounded in operator interviews",
    ],
    sampleQuestions: [
      "How do partners actually rank our programme vs competitors?",
      "Where's our channel economics out of line with what's working?",
      "What would partners do differently if they ran our programme?",
      "Where are we losing channel share and why?",
    ],
    pricingRange: "$5,000–$16,000 / project",
    timeline: "3–5 weeks",
    relatedSlugs: ["competitive-intelligence", "supplier-and-procurement-research", "new-market-entry"],
    primaryKW: "channel research",
  },
  {
    slug: "management-reference-checks",
    id: "10",
    name: "MANAGEMENT REFERENCE CHECKS",
    title: "Management Reference Checks",
    description:
      "Off-list reference calls with former colleagues, customers and partners. For pre-IC, pre-hire and pre-close decisions.",
    oneLiner:
      "Off-list reference calls with former colleagues, customers and partners.",
    pageLede:
      "On-list references are useless — the candidate or target picked them. Off-list references are the only honest signal you'll get on a key executive. We source 5–8 calls per executive from former colleagues, customers and direct reports they didn't put forward.",
    whatItIs:
      "Off-list management reference checks source former colleagues, direct reports, customers and partners of a target executive who were NOT supplied as references — generating an honest picture of operating style, integrity and capability.",
    whenToRun: [
      "Pre-IC for a VC or PE investment hinging on the CEO",
      "Pre-hire for a senior executive position",
      "Pre-close M&A: integrity check on key target executives",
      "Board recruiting: independent perspective on candidate",
    ],
    howWeDeliver: [
      "5–8 off-list reference calls per executive",
      "Mix of former direct reports, peers, customers, partners",
      "Structured questions covering operating style, integrity, capability",
      "Anonymised findings document for IC or board consumption",
    ],
    sampleQuestions: [
      "How would former direct reports describe their actual operating style?",
      "Is there integrity, compliance or interpersonal risk we can't see?",
      "How do former customers describe working with this person?",
      "How does this executive perform under sustained pressure?",
    ],
    pricingRange: "$3,000–$8,000 / executive",
    timeline: "5–10 days",
    relatedSlugs: ["m-and-a-due-diligence", "investment-thesis-validation", "commercial-due-diligence"],
    primaryKW: "management reference checks",
  },
  {
    slug: "investment-thesis-validation",
    id: "11",
    name: "INVESTMENT THESIS VALIDATION",
    title: "Investment Thesis Validation",
    description:
      "Test the assumptions underlying your investment thesis with structured expert and customer research before you commit capital.",
    oneLiner:
      "Test the assumptions underlying your investment thesis before you commit capital.",
    pageLede:
      "Every investment thesis is a stack of assumptions. Most get tested only after the cheque is signed. Pre-IC validation runs structured expert and customer research against the 3–5 most fragile assumptions — and tells you when one of them is wrong.",
    whatItIs:
      "Investment thesis validation is the discipline of identifying the 3–5 most fragile assumptions in an investment thesis, then running targeted primary research against each to test, support or kill them before capital is committed.",
    whenToRun: [
      "Pre-IC for VC or PE investment thesis",
      "Hedge-fund position-sizing on a high-conviction long or short",
      "Family-office direct investment pre-commitment",
      "Corporate venture: testing strategic thesis behind a corporate VC bet",
    ],
    howWeDeliver: [
      "Identify the 3–5 most fragile assumptions in the thesis",
      "Targeted research design against each (calls, surveys, channel checks)",
      "Sensitivity analysis: which assumption breaks invalidate the thesis?",
      "Findings deliverable formatted for IC use",
    ],
    sampleQuestions: [
      "Which assumption in the thesis is most likely to break?",
      "What would have to be true for the thesis to fail?",
      "Where do operators in the category disagree with our view?",
      "How would the picture change if assumption X were 20% off?",
    ],
    pricingRange: "$5,000–$16,000 / thesis",
    timeline: "2–4 weeks",
    relatedSlugs: ["m-and-a-due-diligence", "commercial-due-diligence", "market-sizing"],
    primaryKW: "investment thesis validation",
  },
  {
    slug: "product-launch-research",
    id: "12",
    name: "PRODUCT LAUNCH RESEARCH",
    title: "Product Launch Research",
    description:
      "Validate positioning, pricing and channel strategy before launch. Customer interviews, channel feedback and competitive teardown.",
    oneLiner:
      "Validate positioning, pricing and channel strategy before launch.",
    pageLede:
      "Product launches fail mostly on positioning and channel — not on product. Pre-launch research with target customers and channel partners surfaces the assumptions you got wrong while there's still time to fix them.",
    whatItIs:
      "Product launch research validates positioning, messaging, pricing and channel strategy through customer and channel interviews — designed to identify launch-killing assumptions before the launch happens.",
    whenToRun: [
      "Pre-launch: positioning and messaging needs customer-tested validation",
      "Pre-launch: channel partners need to confirm appetite and economics",
      "Major product update: testing the new framing with the existing base",
      "Re-launch: previous launch under-performed and needs course-correction",
    ],
    howWeDeliver: [
      "Customer interviews: positioning, messaging, willingness-to-pay",
      "Channel partner interviews: appetite, economics, training needs",
      "Competitive teardown on adjacent or substitute products",
      "Pre-launch deliverable: which assumptions held, which didn't, what to fix",
    ],
    sampleQuestions: [
      "Is our positioning landing the way we think it is?",
      "What's the realistic price the target customer would pay?",
      "What channel friction will we hit that we haven't designed for?",
      "Which adjacent products will buyers compare us to?",
    ],
    pricingRange: "$6,000–$18,000 / project",
    timeline: "3–5 weeks",
    relatedSlugs: ["pricing-research", "voice-of-customer", "channel-and-distribution-research"],
    primaryKW: "product launch research",
  },
  {
    slug: "customer-research",
    id: "13",
    name: "CUSTOMER RESEARCH",
    title: "Customer Research",
    description:
      "Programmatic and ad-hoc customer interviews for buyers in SaaS, fintech, healthcare and industrial verticals.",
    oneLiner:
      "Programmatic and ad-hoc customer interviews across B2B and B2C verticals.",
    pageLede:
      "Generic customer research is desk-research masquerading as insight. Programmatic customer interviews — done by trained interviewers, on a continuous cycle — generate the kind of customer understanding that drives actual product and GTM decisions.",
    whatItIs:
      "Customer research is the broad discipline of structured primary interviewing with current and target customers to understand needs, behaviours, decision criteria and unmet jobs-to-be-done.",
    whenToRun: [
      "Pre-product-decision: do customers want what we think they want?",
      "Persona refresh: existing personas have gone stale",
      "Annual jobs-to-be-done refresh for product roadmap inputs",
      "Buyer-journey mapping for sales and marketing alignment",
    ],
    howWeDeliver: [
      "Mix of programmatic (quarterly cycle) and ad-hoc projects",
      "Trained interviewers — not your product or sales team",
      "Findings shipped in formats designed for product and GTM use",
      "B2B and B2C bench across SaaS, fintech, healthcare, industrial verticals",
    ],
    sampleQuestions: [
      "What jobs are customers actually hiring our category to do?",
      "Where in the buyer journey do customers stall and why?",
      "How do customers describe us, in their own words, to peers?",
      "What unmet need keeps coming up that we're not addressing?",
    ],
    pricingRange: "$4,000–$24,000 / project or year",
    timeline: "Project: 3–5 weeks. Programme: quarterly cycles.",
    relatedSlugs: ["voice-of-customer", "win-loss-analysis", "pricing-research"],
    primaryKW: "customer research",
  },
  {
    slug: "regulatory-and-policy-research",
    id: "14",
    name: "REGULATORY & POLICY",
    title: "Regulatory and Policy Research",
    description:
      "Ex-regulators, policy specialists and industry counsel on demand. For sectors where rule changes drive value.",
    oneLiner:
      "Ex-regulators, policy specialists and industry counsel on demand.",
    pageLede:
      "In healthcare, financial services, energy and emerging-tech categories, regulatory shifts drive most of the long-term value movement — and most strategy teams are blind to them until they hit. Ex-regulators and policy specialists on demand close the gap.",
    whatItIs:
      "Regulatory and policy research uses ex-regulators, policy specialists and industry counsel to assess the trajectory and commercial impact of regulatory change in a specific sector or jurisdiction.",
    whenToRun: [
      "Material regulatory change is pending and you need realistic assessment",
      "Pre-investment in heavily-regulated category (healthcare, FS, energy, crypto)",
      "International expansion into a different regulatory regime",
      "Annual regulatory horizon-scanning for board-level risk reporting",
    ],
    howWeDeliver: [
      "Ex-regulator interviews (with appropriate cooling-off and conflict checks)",
      "Industry counsel interviews on commercial implementation reality",
      "Cross-jurisdictional comparison where relevant",
      "Findings: realistic timelines, commercial impact, mitigation options",
    ],
    sampleQuestions: [
      "What's the realistic timeline for regulation X to bite commercially?",
      "How will enforcement actually look on the ground?",
      "Where does the regulator's stated position diverge from likely practice?",
      "What does compliance cost look like for incumbents vs new entrants?",
    ],
    pricingRange: "$4,000–$14,000 / project",
    timeline: "2–4 weeks",
    relatedSlugs: ["new-market-entry", "competitive-intelligence", "investment-thesis-validation"],
    primaryKW: "regulatory research",
  },
  {
    slug: "supplier-and-procurement-research",
    id: "15",
    name: "SUPPLIER & PROCUREMENT",
    title: "Supplier and Procurement Research",
    description:
      "Supplier interviews, procurement leader panels and category buyer surveys for vendor selection and category planning.",
    oneLiner:
      "Supplier interviews, procurement panels and category buyer surveys for vendor selection.",
    pageLede:
      "Procurement teams need objective views on vendor capability and category dynamics — they're not going to get it from the vendors. Supplier-side interviews, procurement-peer panels and category buyer research give procurement teams the independent view they can't get internally.",
    whatItIs:
      "Supplier and procurement research uses interviews with suppliers, procurement leaders at peer companies and category-buyer survey panels to support vendor selection, spend optimisation and category strategy.",
    whenToRun: [
      "Major vendor selection or renewal decision",
      "Category strategy refresh — annual or pre-board",
      "Spend optimisation programme (cost-out work)",
      "Pre-RFP: independent view on vendor capability vs marketing claims",
    ],
    howWeDeliver: [
      "Supplier interviews for objective capability assessment",
      "Procurement-peer panels at comparable companies (anonymised)",
      "Category buyer surveys when scale required (50+ respondents)",
      "Findings deliverable: vendor ranking, spend benchmarks, risk flags",
    ],
    sampleQuestions: [
      "How does vendor X actually perform vs the marketing claims?",
      "What do procurement peers at comparable companies pay for category Y?",
      "Where in the category are buyers consolidating vs diversifying?",
      "What contractual terms are achievable that we don't yet have?",
    ],
    pricingRange: "$5,000–$16,000 / project",
    timeline: "3–5 weeks",
    relatedSlugs: ["channel-and-distribution-research", "competitive-intelligence", "pricing-research"],
    primaryKW: "supplier research",
  },
] as const;
