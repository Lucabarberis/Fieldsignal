/**
 * Case studies — anonymised, representative composites.
 *
 * Every entry below is a composite drawn from typical FieldSignal engagements.
 * Client identities are removed and figures are illustrative of the format and
 * scale of work we run — not a record of a single named mandate. This mirrors
 * the anonymity standard used across the transcripts library (see /compliance).
 *
 * Wave 1 ships Venture Capital and Private Equity. The `direct` category is
 * reserved for named/consented direct-client studies added later.
 *
 * Hub /resources/case-studies iterates this. /resources/case-studies/[slug] renders the detail.
 *
 * House rule: no engagement prices here. Metrics are operational
 * (calls, turnaround, coverage), never rate cards — pricing lives on /pricing.
 */

export type CaseStudyCategory =
  | "venture-capital"
  | "private-equity"
  | "hedge-funds"
  | "corporate"
  | "management-consulting"
  | "startups"
  | "direct";

export type CaseStudy = {
  slug: string;
  id: string;                 // e.g. "VC-01" — shown as the tile id
  category: CaseStudyCategory;
  name: string;               // tile NAME (uppercased short label)
  fundProfile: string;        // anonymised descriptor, e.g. "€2bn growth-equity fund"
  title: string;              // <title> tag
  description: string;        // meta description
  oneLiner: string;           // hub tile body
  pageLede: string;           // detail-page lede paragraph
  sector: string;             // e.g. "Vertical SaaS"
  engagementType: string;     // e.g. "Pre-IC diligence sprint"
  timeline: string;           // e.g. "9 working days"
  challenge: string;          // the problem, one paragraph
  approach: readonly string[];    // how we ran it
  delivered: readonly string[];   // the tangible outputs
  outcome: readonly string[];     // what it changed
  metrics: readonly { label: string; value: string }[];
  quote: { text: string; role: string };  // anonymised, role-based attribution
  relatedSlugs: readonly string[];
  primaryKW: string;
};

/** Display order and labels for the hub's grouped sections. */
export const CASE_STUDY_CATEGORIES: readonly {
  key: CaseStudyCategory;
  label: string;
  num: string;
  blurb: string;
}[] = [
  {
    key: "venture-capital",
    label: "Venture Capital",
    num: "01",
    blurb: "Per-deal diligence for seed through growth — thesis validation, market sizing, off-list founder references and competitive teardowns.",
  },
  {
    key: "private-equity",
    label: "Private Equity",
    num: "02",
    blurb: "Commercial due diligence, value-creation input and buy-and-build market mapping for buyout, special-situations and secondaries funds.",
  },
  {
    key: "hedge-funds",
    label: "Hedge Funds",
    num: "03",
    blurb: "Public-markets primary research — channel checks, thesis testing and event-driven reads, produced under strict MNPI screening.",
  },
  {
    key: "corporate",
    label: "Corporates & Strategy",
    num: "04",
    blurb: "Market entry, acquisition diligence and disruption scans for corporate strategy and corporate development teams.",
  },
  {
    key: "management-consulting",
    label: "Management Consulting",
    num: "05",
    blurb: "Expert sourcing for consultancies running client diligence and growth strategy against a deadline.",
  },
  {
    key: "startups",
    label: "Startups & Scale-Ups",
    num: "06",
    blurb: "Pricing, supply-side and product validation for founders — the same research quality the funds get, no retainer required.",
  },
  {
    key: "direct",
    label: "Go-To-Market",
    num: "07",
    blurb: "Company clients we work with directly. We test outbound, Meta and Google to find which channel actually works, which doesn't and why.",
  },
];

export const caseStudies: readonly CaseStudy[] = [
  // ─────────────────────────── VENTURE CAPITAL ───────────────────────────
  {
    slug: "seed-vertical-saas-pre-ic",
    id: "VC-01",
    category: "venture-capital",
    name: "SEED VC — VERTICAL SAAS THESIS",
    fundProfile: "European seed fund, sub-$100M AUM",
    title: "Seed VC Pre-IC Diligence — Vertical SaaS",
    description:
      "How a European seed fund pressure-tested a vertical-SaaS thesis with five operator calls before its investment committee — in nine working days.",
    oneLiner:
      "A seed fund pressure-tested a vertical-SaaS thesis with five operator calls before IC — turnaround under two weeks.",
    pageLede:
      "A seed fund was two weeks from an investment committee on a construction-tech company. The pitch claimed a large, underserved buyer base — but the partners had no independent read on whether the category ceiling was where the founder said it was. They needed operator ground-truth, fast, without a six-figure network retainer they could never justify at seed cheque sizes.",
    sector: "Vertical SaaS / construction technology",
    engagementType: "Pre-IC validation sprint",
    timeline: "9 working days",
    challenge:
      "The fund's thesis rested on a total addressable market the founder put at tens of thousands of buyers. The partners suspected the real ceiling was far lower once you stripped out firms without the budget to sustain a full platform. With the IC date fixed, they had no time to build a research programme and no appetite for an annual subscription to a large expert network.",
    approach: [
      "Scoped the single decision the calls had to inform: is the sustainable-budget buyer base large enough to support the growth case?",
      "Sourced five operators inside 72 hours — former heads of product and revenue at category-leading construction-tech platforms",
      "Ran structured 45-minute calls against a shared question set, so answers were comparable rather than anecdotal",
      "Screened every call for MNPI before the notes reached the deal team",
    ],
    delivered: [
      "Five anonymised call notes plus a two-page synthesis mapped to the IC questions",
      "A defensible independent estimate of the sustainable-budget buyer base",
      "A named list of the adjacency risks operators flagged in the same category",
    ],
    outcome: [
      "The fund proceeded — but re-cut the ownership target after the calls narrowed the near-term TAM",
      "The synthesis went into the IC memo as the independent-diligence section",
      "The partners returned per-deal for the next two term sheets rather than signing a retainer",
    ],
    metrics: [
      { label: "Expert calls", value: "5" },
      { label: "Time to first candidate", value: "Under 72h" },
      { label: "Sprint length", value: "9 working days" },
      { label: "Commitment", value: "Per-deal" },
    ],
    quote: {
      text: "We got operator ground-truth into the IC memo in the time we'd normally spend just finding people. The TAM number in the deck didn't survive contact with the people who'd actually sold into that market.",
      role: "Partner at the seed fund",
    },
    relatedSlugs: [
      "series-b-fintech-market-sizing",
      "healthtech-competitive-teardown",
      "midmarket-industrials-cdd",
    ],
    primaryKW: "venture capital pre-investment diligence",
  },
  {
    slug: "series-b-fintech-market-sizing",
    id: "VC-02",
    category: "venture-capital",
    name: "GROWTH VC — EMBEDDED-FINANCE TAM",
    fundProfile: "Growth fund, $600M vehicle",
    title: "Growth VC Market Sizing — Embedded Finance",
    description:
      "A growth fund sized a category-creating embedded-finance bet with a mixed panel of platform, banking and merchant operators before leading a Series B.",
    oneLiner:
      "A growth fund sized a category-creating embedded-finance bet with a nine-operator panel before leading a Series B.",
    pageLede:
      "There was no analyst report to buy. The company was creating a category. The fund was being asked to lead the round at a price that only made sense if the market was several times larger than any comparable. The partners needed a bottom-up read on demand from all three sides of the market — platforms, sponsor banks and merchants.",
    sector: "Fintech / embedded finance",
    engagementType: "Bottom-up market sizing",
    timeline: "3 weeks",
    challenge:
      "Top-down sizing was worthless for a category that didn't exist yet. The fund needed to triangulate real adoption intent from platforms deciding whether to embed financial products, the banks that would sponsor them and the merchants who would ultimately use them — and to separate genuine pull from vendor optimism.",
    approach: [
      "Split the panel across all three sides of the market so the estimate was triangulated, not single-sourced",
      "Sourced nine operators: heads of platform partnerships, two former sponsor-bank programme leads and merchant-side finance owners",
      "Ran a common quantitative question set, then a short follow-up round to reconcile the outliers",
      "Built the size bottom-up from stated attach rates rather than top-down from a headline market figure",
    ],
    delivered: [
      "A bottom-up model with low / base / high cases, each traceable to specific operator inputs",
      "A demand-signal read separating structural pull from vendor-driven optimism",
      "A short list of the adoption blockers most likely to cap the base case",
    ],
    outcome: [
      "The fund led the round, sizing the position to the base case rather than the founder's high case",
      "The model became the reference the deal partner defended at the partnership meeting",
      "Two adoption blockers surfaced in the calls went straight onto the post-investment value-creation list",
    ],
    metrics: [
      { label: "Panel size", value: "9 operators" },
      { label: "Market sides covered", value: "3" },
      { label: "Sizing cases", value: "Low / base / high" },
      { label: "Timeline", value: "3 weeks" },
    ],
    quote: {
      text: "For a category with no comps, the only credible TAM is the one you build bottom-up from people making the adoption decision. That's exactly what we walked into the partnership meeting with.",
      role: "Partner leading the deal",
    },
    relatedSlugs: [
      "seed-vertical-saas-pre-ic",
      "climate-deeptech-technical-panel",
      "buy-and-build-services-mapping",
    ],
    primaryKW: "venture capital market sizing",
  },
  {
    slug: "growth-founder-references",
    id: "VC-03",
    category: "venture-capital",
    name: "GROWTH VC — OFF-LIST FOUNDER REFERENCES",
    fundProfile: "Multi-stage fund, $1.2B AUM",
    title: "Off-List Founder References — Growth VC",
    description:
      "Before a competitive term sheet, a multi-stage fund ran an off-list reference programme on a repeat founder — eight calls the founder didn't pick.",
    oneLiner:
      "Before a competitive term sheet, a fund ran eight off-list references on a repeat founder — people the founder didn't choose.",
    pageLede:
      "The on-list references were, predictably, glowing — the founder had chosen every one. In a competitive process the fund had 48 hours to decide whether to pre-empt, and the real question was what people who had worked with the founder but weren't on the list would say. That is precisely the work an expert network is built to do compliantly.",
    sector: "Founder / management references",
    engagementType: "Off-list reference programme",
    timeline: "6 days",
    challenge:
      "The fund was being asked to pre-empt a hot round on the strength of a repeat founder. The provided references were self-selected and uniformly positive. The partners needed candid, independent perspectives from former colleagues, direct reports and counterparties the founder had not nominated — gathered without breaching confidentiality or straying into anything the sources couldn't properly share.",
    approach: [
      "Mapped the founder's operating history to identify the roles most likely to hold a candid, first-hand view",
      "Sourced eight off-list references — former direct reports, a prior co-founder and two commercial counterparties",
      "Briefed every source on scope limits up front: conduct and capability, never confidential or non-public company information",
      "Delivered notes attributed by role only, so the deal team read patterns rather than names",
    ],
    delivered: [
      "Eight anonymised reference notes plus a synthesis of consistent strengths and two recurring concerns",
      "A clear read on how the founder behaves under pressure and with dissent",
      "A compliance record documenting scope and consent for every call",
    ],
    outcome: [
      "The fund pre-empted — but wrote a specific board-level support plan around the two recurring concerns",
      "The off-list view materially changed the deal team's confidence versus the on-list references alone",
      "The reference format became the fund's standard for every pre-emptive growth deal",
    ],
    metrics: [
      { label: "Off-list references", value: "8" },
      { label: "Turnaround", value: "6 days" },
      { label: "Attribution", value: "Role-based only" },
      { label: "Compliance record", value: "Per call" },
    ],
    quote: {
      text: "On-list references tell you who the founder trusts to say nice things. Off-list references tell you what it's actually like when the plan slips. We needed the second kind before we pre-empted.",
      role: "General Partner",
    },
    relatedSlugs: [
      "seed-vertical-saas-pre-ic",
      "healthtech-competitive-teardown",
      "consumer-brand-channel-checks",
    ],
    primaryKW: "off-list management references",
  },
  {
    slug: "climate-deeptech-technical-panel",
    id: "VC-04",
    category: "venture-capital",
    name: "DEEP-TECH VC — TECHNICAL DILIGENCE PANEL",
    fundProfile: "Climate deep-tech fund, first institutional vehicle",
    title: "Technical Diligence Panel — Deep-Tech VC",
    description:
      "A climate deep-tech fund stress-tested a novel process technology with a panel of independent scientists and plant engineers before its first cheque.",
    oneLiner:
      "A climate fund stress-tested a novel process technology with independent scientists and plant engineers before its first cheque.",
    pageLede:
      "The company's whole story turned on whether a new process could hold its efficiency at commercial scale. The fund's partners were strong on markets and capital, but none could independently judge the underlying science or the scale-up path. Getting that wrong at Series A in deep-tech is not a haircut — it's the whole position.",
    sector: "Climate / industrial process technology",
    engagementType: "Technical & scale-up diligence panel",
    timeline: "4 weeks",
    challenge:
      "The core claim was a step-change in process efficiency. The fund needed independent experts who understood both the underlying chemistry and the brutal realities of moving from pilot to commercial plant — and who had no stake in the company or its competitors. The risk was funding a lab result that would never survive an industrial environment.",
    approach: [
      "Split the diligence into two questions: does the science work in principle, and does it hold at commercial scale. Staffed each with the right expert",
      "Sourced a panel of six: two independent process scientists, three plant and scale-up engineers and one permitting specialist",
      "Ran technical deep-dives under strict scope, drawing only on general domain expertise and public disclosures",
      "Reconciled disagreements between the scientists and the engineers in a joint follow-up rather than averaging them away",
    ],
    delivered: [
      "A technical risk register ranking the scale-up failure modes by likelihood and severity",
      "An independent read on whether the pilot efficiency was plausibly reproducible at commercial scale",
      "A capex-and-permitting reality check on the company's stated timeline",
    ],
    outcome: [
      "The fund invested with a milestone-based structure tied directly to the two highest-rated scale-up risks",
      "The technical register became the template for the fund's diligence on later hardware deals",
      "One failure mode the founder had underweighted was designed into the term sheet as a gating milestone",
    ],
    metrics: [
      { label: "Panel size", value: "6 specialists" },
      { label: "Disciplines covered", value: "Science, engineering, permitting" },
      { label: "Timeline", value: "4 weeks" },
      { label: "Output", value: "Ranked risk register" },
    ],
    quote: {
      text: "The science was real. The question was whether it survived a commercial plant, and that's an engineering judgment our partnership genuinely couldn't make alone. The panel let us structure the milestones around the risks that actually mattered.",
      role: "Founding Partner",
    },
    relatedSlugs: [
      "series-b-fintech-market-sizing",
      "midmarket-industrials-cdd",
      "software-carveout-value-creation",
    ],
    primaryKW: "deep tech technical due diligence",
  },
  {
    slug: "healthtech-competitive-teardown",
    id: "VC-05",
    category: "venture-capital",
    name: "SERIES A LEAD — HEALTHTECH TEARDOWN",
    fundProfile: "Sector-focused fund, $400M AUM",
    title: "Competitive Teardown — Healthtech Series A",
    description:
      "Before leading a healthtech Series A, a sector fund ran a competitive teardown with clinicians and health-system buyers who evaluate the category.",
    oneLiner:
      "Before leading a healthtech Series A, a sector fund ran a teardown with the clinicians and buyers who actually evaluate the category.",
    pageLede:
      "The company looked differentiated on the deck. The fund's question was whether it looked differentiated to the people who actually sign the contracts — clinical leaders and health-system procurement teams who see every vendor in the category. Winning that buyer is the whole game, and founders are rarely the most objective narrators of their own competitive position.",
    sector: "Healthtech / clinical software",
    engagementType: "Competitive teardown",
    timeline: "2 weeks",
    challenge:
      "The founder's competitive slide showed clear white space. The fund needed to test that from the buyer's chair: how do clinical and procurement leaders actually rank the company against incumbents, what makes them switch and where does the product's claimed edge stop mattering in a real purchasing decision?",
    approach: [
      "Framed the teardown around the live buying decision, not the feature matrix",
      "Sourced seven experts: clinical department leads, two health-system procurement heads and a former competitor's commercial lead",
      "Asked buyers to rank the company blind against incumbents and explain the switching triggers",
      "Screened for anything approaching confidential procurement data and excluded it",
    ],
    delivered: [
      "A buyer-ranked competitive map showing where the company genuinely led and where it didn't",
      "The three switching triggers buyers named most often — and which the company could actually pull",
      "An independent read on the incumbents' real defensive strengths versus the deck's version",
    ],
    outcome: [
      "The fund led the round, with a go-to-market thesis rebuilt around the switching triggers buyers named",
      "One claimed differentiator ranked as irrelevant to buyers and was dropped from the investment case",
      "The teardown reset the board's first-year commercial priorities before the money even landed",
    ],
    metrics: [
      { label: "Buyer-side experts", value: "7" },
      { label: "Timeline", value: "2 weeks" },
      { label: "Lens", value: "Buyer decision, not features" },
      { label: "Commitment", value: "Per-deal" },
    ],
    quote: {
      text: "Founders grade their own competitive position. Buyers grade it honestly. We wanted the people who actually choose between these products to tell us where the real edge was — before we led the round, not after.",
      role: "Partner, healthtech practice",
    },
    relatedSlugs: [
      "seed-vertical-saas-pre-ic",
      "growth-founder-references",
      "consumer-brand-channel-checks",
    ],
    primaryKW: "competitive diligence for venture capital",
  },

  // ─────────────────────────── PRIVATE EQUITY ────────────────────────────
  {
    slug: "midmarket-industrials-cdd",
    id: "PE-01",
    category: "private-equity",
    name: "MID-MARKET PE — INDUSTRIALS CDD",
    fundProfile: "Mid-market buyout fund, €900M vehicle",
    title: "Commercial Due Diligence — Industrials Buyout",
    description:
      "A mid-market fund ran expert-led commercial due diligence on an industrials target — customer, competitor and channel calls feeding a live CDD process.",
    oneLiner:
      "A mid-market fund fed expert-led customer, competitor and channel calls into a live industrials CDD in exclusivity.",
    pageLede:
      "The fund was in exclusivity on an industrials manufacturer and its consultants were running a full commercial due diligence. What the deal team wanted alongside it was direct, unfiltered access to the target's customers, competitors and distributors — the primary voices that either confirm or quietly puncture a management growth plan before the money moves.",
    sector: "Industrials / manufacturing",
    engagementType: "Expert-led commercial due diligence",
    timeline: "3.5 weeks",
    challenge:
      "Management's plan leaned on customer retention and a pricing story the deal team could not yet independently verify. Inside exclusivity, with a hard clock, the fund needed direct primary evidence from the people on the other side of the target's invoices — its customers, its rivals and its channel — to confirm or challenge the base case underwriting the deal.",
    approach: [
      "Aligned the call plan to the specific lines in the model most sensitive to being wrong: retention, pricing and share",
      "Sourced fourteen experts across the target's customers, two direct competitors and its distribution channel",
      "Ran the calls in parallel with the consultants' CDD so findings landed while the model was still moving",
      "Kept every call to public-domain and general-market knowledge, screened before delivery",
    ],
    delivered: [
      "Fourteen anonymised call notes plus a synthesis mapped to the model's key sensitivities",
      "An independent read on customer retention risk and the durability of the pricing story",
      "A channel-level view of how the target really competes, versus how management described it",
    ],
    outcome: [
      "The fund used the findings to renegotiate — the retention picture was softer than the CIM implied",
      "Two customer-concentration risks surfaced in the calls were written into the SPA protections",
      "The primary-research layer became a standing part of the fund's CDD on every platform deal",
    ],
    metrics: [
      { label: "Expert calls", value: "14" },
      { label: "Perspectives", value: "Customer / competitor / channel" },
      { label: "Timeline", value: "3.5 weeks" },
      { label: "Ran alongside", value: "Consultant CDD" },
    ],
    quote: {
      text: "Consultant CDD tells you what the market looks like. Fourteen calls with the target's own customers tell you whether management's retention story is real. We renegotiated on the gap between the two.",
      role: "Deal Partner",
    },
    relatedSlugs: [
      "software-carveout-value-creation",
      "buy-and-build-services-mapping",
      "seed-vertical-saas-pre-ic",
    ],
    primaryKW: "commercial due diligence expert network",
  },
  {
    slug: "software-carveout-value-creation",
    id: "PE-02",
    category: "private-equity",
    name: "LARGE-CAP PE — SOFTWARE CARVE-OUT",
    fundProfile: "Large-cap fund, multi-billion flagship",
    title: "Value-Creation Input — Software Carve-Out",
    description:
      "A large-cap fund used operator calls to pressure-test the 100-day plan for a software carve-out — standing up functions the parent used to provide.",
    oneLiner:
      "A large-cap fund pressure-tested a software carve-out's 100-day plan with operators who'd run the same separation.",
    pageLede:
      "The asset was strong; the risk was the separation. Carving a software business out of a large parent means standing up sales, finance and product functions the parent quietly provided — on a clock, without breaking the customer base. The fund wanted operators who had personally run that exact playbook before the 100-day plan was locked.",
    sector: "Software / carve-outs",
    engagementType: "Value-creation & separation planning",
    timeline: "5 weeks",
    challenge:
      "The 100-day plan assumed the carved-out entity could rebuild go-to-market and back-office capability at a pace the deal team had never independently tested. Underestimating stranded costs or the time to rebuild a standalone sales motion is where carve-out returns quietly leak. The fund needed pattern recognition from people who had lived the same separation.",
    approach: [
      "Prioritised the plan's riskiest assumptions: standalone GTM rebuild, stranded cost and key-talent retention",
      "Sourced eight operators who had led post-carve-out separations in comparable software businesses",
      "Ran working sessions against the draft 100-day plan rather than generic interviews",
      "Converted each operator's lessons into concrete edits to the plan, not just commentary",
    ],
    delivered: [
      "A red-teamed 100-day plan with the fragile assumptions flagged and re-sequenced",
      "A realistic timeline for rebuilding the standalone sales motion, benchmarked to operators who'd done it",
      "A stranded-cost and key-talent retention checklist drawn from prior separations",
    ],
    outcome: [
      "The fund re-sequenced the first 100 days around the separation risks operators ranked highest",
      "The GTM rebuild timeline was extended to a pace the operators considered survivable",
      "The value-creation team carried the operator checklist into the portfolio company post-close",
    ],
    metrics: [
      { label: "Operator sessions", value: "8" },
      { label: "Focus", value: "Separation & GTM rebuild" },
      { label: "Timeline", value: "5 weeks" },
      { label: "Output", value: "Red-teamed 100-day plan" },
    ],
    quote: {
      text: "The deal wasn't the risk — the separation was. Talking to people who'd actually stood up the same functions after a carve-out changed our sequencing and, frankly, our timeline. Better to learn it before close.",
      role: "Operating Partner",
    },
    relatedSlugs: [
      "midmarket-industrials-cdd",
      "continuation-fund-reunderwrite",
      "climate-deeptech-technical-panel",
    ],
    primaryKW: "private equity value creation research",
  },
  {
    slug: "buy-and-build-services-mapping",
    id: "PE-03",
    category: "private-equity",
    name: "BUY-AND-BUILD — FRAGMENTED SERVICES MAP",
    fundProfile: "Buy-and-build specialist, €500M fund",
    title: "Market Mapping — Buy-and-Build Services Roll-Up",
    description:
      "A buy-and-build fund mapped a fragmented B2B services market with operator interviews to prioritise acquisition targets and test the roll-up thesis.",
    oneLiner:
      "A buy-and-build fund mapped a fragmented services market with operators to prioritise targets and stress-test the roll-up thesis.",
    pageLede:
      "Roll-ups live or die on two questions the data room can't answer: is the market actually fragmented in a way that rewards consolidation, and are the tuck-in targets genuinely integrable? Before committing to a platform in a fragmented B2B services category, the fund wanted operators who knew the sub-sector's real structure — not just what the pitch deck asserted.",
    sector: "B2B services / roll-up",
    engagementType: "Market mapping & thesis validation",
    timeline: "4 weeks",
    challenge:
      "The consolidation thesis assumed a long tail of sub-scale operators that could be tucked in and margin-improved. The fund needed to know whether that fragmentation was real and durable, whether customers would tolerate consolidation and which target profiles would actually integrate rather than fight the platform — before it anchored on a platform acquisition.",
    approach: [
      "Defined the sub-sector's real boundaries with operators before mapping any targets",
      "Sourced ten experts: former owner-operators, a sector M&A adviser and two large-customer procurement leads",
      "Tested the two load-bearing beliefs directly: durable fragmentation and genuine integrability of the tuck-in profile",
      "Turned the operator view into a ranked target-profile map, not a generic market overview",
    ],
    delivered: [
      "A ranked map of acquisition-target profiles by integrability and margin-improvement potential",
      "An independent read on whether the fragmentation was structural or already quietly consolidating",
      "A customer-tolerance view on how far consolidation could go before churn set in",
    ],
    outcome: [
      "The fund re-prioritised its target list around the profiles operators judged genuinely integrable",
      "One adjacent sub-segment the thesis assumed was in-scope was cut after operators flagged customer resistance",
      "The mapping framework became the fund's standard first step on every new roll-up platform",
    ],
    metrics: [
      { label: "Operator interviews", value: "10" },
      { label: "Output", value: "Ranked target-profile map" },
      { label: "Timeline", value: "4 weeks" },
      { label: "Thesis tested", value: "Fragmentation + integrability" },
    ],
    quote: {
      text: "Every roll-up deck says the market is fragmented. Operators tell you whether it's fragmented in a way you can actually consolidate — and which tuck-ins will integrate versus which will fight you for three years.",
      role: "Managing Partner",
    },
    relatedSlugs: [
      "midmarket-industrials-cdd",
      "series-b-fintech-market-sizing",
      "consumer-brand-channel-checks",
    ],
    primaryKW: "buy and build market mapping",
  },
  {
    slug: "consumer-brand-channel-checks",
    id: "PE-04",
    category: "private-equity",
    name: "SPECIAL SITUATIONS — CONSUMER CHANNEL CHECKS",
    fundProfile: "Special-situations fund, opportunistic mandate",
    title: "Channel Checks — Special-Situations Consumer Brand",
    description:
      "A special-situations fund ran retail and distributor channel checks on a distressed consumer brand to judge whether the demand signal was recoverable.",
    oneLiner:
      "A special-situations fund ran retail and distributor channel checks to judge whether a distressed brand's demand was recoverable.",
    pageLede:
      "A consumer brand was in distress and cheap. The question that decided the trade was whether the decline was a broken balance sheet or a broken brand. Financials showed the fall; they couldn't show the cause. The fund needed the retail buyers and distributors who decide shelf space to say whether the demand was still there under the debt.",
    sector: "Consumer / retail",
    engagementType: "Channel checks (special situations)",
    timeline: "10 days",
    challenge:
      "The investment case hinged on a single distinction: was the brand failing because it was over-levered, or because consumers and retailers had genuinely moved on? Get that wrong and a balance-sheet fix rescues nothing. The fund needed fast, candid reads from the retail and distribution channel that actually controls whether the brand recovers shelf presence.",
    approach: [
      "Reduced the thesis to one testable question: is the underlying demand recoverable, or structurally gone?",
      "Sourced nine channel experts: retail category buyers, two distributors and a former sales lead at the brand",
      "Moved fast given the situation timeline — first calls inside 48 hours, full read in ten days",
      "Kept strictly to general market and channel knowledge, screened before the notes reached the desk",
    ],
    delivered: [
      "Nine anonymised channel notes plus a single-page verdict on demand recoverability",
      "A read on whether retailers would restore shelf space under new ownership and clean financials",
      "The channel's view on which competitors had permanently taken the lost share",
    ],
    outcome: [
      "The fund passed — the channel's verdict was that the demand loss was structural, not just balance-sheet driven",
      "The ten-day read cost a fraction of the diligence a full process would have consumed on a deal that died anyway",
      "The channel-check format became the fund's fast first screen on distressed consumer names",
    ],
    metrics: [
      { label: "Channel experts", value: "9" },
      { label: "Time to first call", value: "Under 48h" },
      { label: "Full read", value: "10 days" },
      { label: "Decision", value: "Informed a pass" },
    ],
    quote: {
      text: "The financials told us the brand was cheap. The channel told us why — and that it wasn't coming back. That's a pass we were very glad to make before we'd sunk real diligence into it.",
      role: "Portfolio Manager",
    },
    relatedSlugs: [
      "healthtech-competitive-teardown",
      "buy-and-build-services-mapping",
      "continuation-fund-reunderwrite",
    ],
    primaryKW: "channel checks special situations",
  },
  {
    slug: "continuation-fund-reunderwrite",
    id: "PE-05",
    category: "private-equity",
    name: "SECONDARIES — CONTINUATION-FUND RE-UNDERWRITE",
    fundProfile: "Secondaries / GP-led specialist",
    title: "Re-Underwrite — Continuation Fund Diligence",
    description:
      "A secondaries investor re-underwrote a single-asset continuation fund using independent expert calls to test the GP's forward growth story.",
    oneLiner:
      "A secondaries investor re-underwrote a single-asset continuation fund with independent calls testing the GP's forward story.",
    pageLede:
      "GP-led continuation deals carry a built-in tension: the sponsor knows the asset better than anyone and has every incentive to frame the forward story favourably. As the incoming secondaries investor, the fund needed an independent view of the remaining growth runway — not a re-reading of the GP's own materials — before pricing the roll-over.",
    sector: "Secondaries / GP-led",
    engagementType: "Independent re-underwrite",
    timeline: "3 weeks",
    challenge:
      "The continuation vehicle's price rested on the GP's forward growth case for an asset the GP had held for years. The incoming investor needed to independently test whether the remaining runway was real — from customers, competitors and end-market experts who had no stake in the roll-over closing at the sponsor's preferred mark.",
    approach: [
      "Anchored the calls to the GP's forward thesis, testing each growth driver against independent evidence",
      "Sourced eleven experts across the asset's customers, competitors and its end-market",
      "Deliberately used sources with no relationship to the sponsor to keep the read genuinely independent",
      "Compared the operator view of remaining runway against the GP's projections, driver by driver",
    ],
    delivered: [
      "An independent read on each pillar of the GP's forward growth case",
      "A customer and competitor view on how much runway the asset genuinely had left",
      "A clear map of where the independent evidence supported the GP mark and where it didn't",
    ],
    outcome: [
      "The investor priced the roll-over off its own re-underwrite rather than the GP's projections",
      "Two of the GP's growth drivers held up independently; a third was discounted in the pricing",
      "The re-underwrite format became the investor's standard diligence on single-asset GP-led deals",
    ],
    metrics: [
      { label: "Independent experts", value: "11" },
      { label: "Perspectives", value: "Customer / competitor / end-market" },
      { label: "Timeline", value: "3 weeks" },
      { label: "Independence", value: "No sponsor-linked sources" },
    ],
    quote: {
      text: "In a GP-led, the sponsor writes the forward story and marks their own homework. Eleven independent calls let us re-underwrite the runway ourselves and price it on our evidence, not theirs.",
      role: "Head of Secondaries",
    },
    relatedSlugs: [
      "software-carveout-value-creation",
      "midmarket-industrials-cdd",
      "consumer-brand-channel-checks",
    ],
    primaryKW: "continuation fund due diligence",
  },

  // ─────────────────────────────── HEDGE FUNDS ───────────────────────────
  {
    slug: "hedge-fund-retail-channel-checks",
    id: "HF-01",
    category: "hedge-funds",
    name: "L/S EQUITY — RETAIL CHANNEL CHECKS",
    fundProfile: "Long/short equity fund, $2B AUM",
    title: "Channel Checks — Long/Short Equity, Retail",
    description:
      "A long/short fund tested a retailer's same-store-sales momentum with supplier and store-level channel checks ahead of earnings, under strict MNPI screening.",
    oneLiner:
      "A long/short fund tested a retailer's same-store-sales momentum with channel checks ahead of earnings.",
    pageLede:
      "The fund was long a specialty retailer into a print, and the bull case rested on same-store-sales momentum holding. Sell-side notes were mixed and the tape gave no edge. The PM wanted an independent read from the people who see store-level demand week to week — suppliers, former store operators and distributors. Nothing an insider could share was in scope.",
    sector: "Consumer retail (public equity)",
    engagementType: "Pre-earnings channel checks",
    timeline: "8 days",
    challenge:
      "The position needed conviction before earnings, and consensus was clustered with no edge in it. The PM needed an independent, ground-level read on whether same-store momentum was real or rolling over. It had to be sourced fast and screened hard, so nothing approached material non-public information.",
    approach: [
      "Framed the checks around one variable: is same-store demand accelerating or decelerating quarter on quarter?",
      "Sourced eight channel sources — suppliers, former store operators and regional distributors",
      "Held every call to general market observation, with an MNPI screen before any note reached the desk",
      "Excluded current employees and anyone who could see unreleased company figures",
    ],
    delivered: [
      "Eight anonymised channel notes plus a one-page read on the momentum question",
      "A directional signal on same-store demand independent of sell-side consensus",
      "A documented compliance trail confirming scope and MNPI screening on every call",
    ],
    outcome: [
      "The read gave the PM independent support to hold the position through the print",
      "One supplier signal flagged a softening region the sell-side had missed",
      "The channel-check format became a standing pre-earnings tool for the book's larger positions",
    ],
    metrics: [
      { label: "Channel sources", value: "8" },
      { label: "Turnaround", value: "8 days" },
      { label: "Screening", value: "MNPI, pre-delivery" },
      { label: "Lens", value: "Same-store momentum" },
    ],
    quote: {
      text: "We don't pay for tips. We pay for an independent read on demand that the tape doesn't give us, screened so hard it's boring. That's exactly what came back.",
      role: "Portfolio Manager",
    },
    relatedSlugs: [
      "hedge-fund-short-thesis-software",
      "hedge-fund-merger-antitrust-read",
      "consumer-brand-channel-checks",
    ],
    primaryKW: "hedge fund channel checks",
  },
  {
    slug: "hedge-fund-short-thesis-software",
    id: "HF-02",
    category: "hedge-funds",
    name: "L/S EQUITY — SHORT THESIS TESTING",
    fundProfile: "Equity hedge fund, multi-strategy",
    title: "Short Thesis Testing — Enterprise Software",
    description:
      "Before sizing a short, a hedge fund tested whether an enterprise-software company's net revenue retention was deteriorating, via customer and ex-operator calls.",
    oneLiner:
      "Before sizing a short, a fund tested whether a software company's revenue retention was quietly deteriorating.",
    pageLede:
      "The short thesis was simple: a once-sticky software platform was losing seats to a cheaper competitor, and net revenue retention was eroding faster than the company let on. Before sizing the position, the fund needed evidence from the company's own customers. Are they renewing, downgrading or leaving? The answer had to come from inside strict compliance limits.",
    sector: "Enterprise software (public equity)",
    engagementType: "Short-thesis validation",
    timeline: "2 weeks",
    challenge:
      "Reported metrics lagged reality, and management framed retention optimistically. The fund needed to test the core short thesis — accelerating churn and downgrades — with the people making the renewal decision. The risk was shorting on a narrative the customers would contradict.",
    approach: [
      "Reduced the thesis to one testable claim: is net revenue retention deteriorating faster than reported?",
      "Sourced nine sources — current customers, churned customers and two former sales operators",
      "Asked customers directly about renewal, seat expansion and competitive displacement",
      "Screened every call for MNPI and excluded anyone with access to unreleased figures",
    ],
    delivered: [
      "Nine anonymised call notes plus a synthesis on the retention trajectory",
      "A customer-grounded read on whether churn was accelerating or stabilising",
      "A named list of the competitive displacement patterns customers described",
    ],
    outcome: [
      "The calls supported the thesis but flagged one stable segment, so the fund sized the short smaller than planned",
      "The displacement pattern gave the PM a concrete catalyst to monitor",
      "The fund re-ran the same customers two quarters later to track the trend",
    ],
    metrics: [
      { label: "Sources", value: "9" },
      { label: "Timeline", value: "2 weeks" },
      { label: "Focus", value: "Net revenue retention" },
      { label: "Screening", value: "MNPI, per call" },
    ],
    quote: {
      text: "The thesis was right in three segments and wrong in one. That nuance is the difference between a sized short and a blow-up. The customers told us before the print did.",
      role: "Analyst",
    },
    relatedSlugs: [
      "hedge-fund-retail-channel-checks",
      "hedge-fund-merger-antitrust-read",
      "healthtech-competitive-teardown",
    ],
    primaryKW: "short thesis expert calls",
  },
  {
    slug: "hedge-fund-merger-antitrust-read",
    id: "HF-03",
    category: "hedge-funds",
    name: "EVENT-DRIVEN — ANTITRUST READ",
    fundProfile: "Event-driven fund, merger-arbitrage book",
    title: "Antitrust Read — Event-Driven / Merger Arb",
    description:
      "A merger-arbitrage desk commissioned independent expert calls on the antitrust and regulatory odds of a pending deal before sizing the spread.",
    oneLiner:
      "A merger-arb desk sized a spread using independent expert reads on the deal's antitrust odds.",
    pageLede:
      "The spread on a pending merger was wide because the market doubted it would clear. The desk's entire return depended on one probability: would antitrust regulators block or clear the deal? The team wanted independent expertise — former agency staff and antitrust economists — to pressure-test their own read before sizing the position.",
    sector: "Event-driven / regulatory",
    engagementType: "Regulatory-odds diligence",
    timeline: "9 days",
    challenge:
      "Deal-closure odds drove the whole trade, and public commentary was noisy and conflicted. The desk needed a structured, independent read on the regulatory path — block risk, remedies and timeline — from people who understood how the relevant agencies actually decide. Getting the probability wrong meant mispricing the spread.",
    approach: [
      "Framed the calls around three questions: block risk, likely remedies and realistic timeline",
      "Sourced six experts — former competition-agency staff and two antitrust economists",
      "Kept every call to public filings and general regulatory expertise, never deal-confidential material",
      "Reconciled differing views into a probability range rather than a single point",
    ],
    delivered: [
      "Six anonymised expert notes plus a structured read on block risk, remedies and timeline",
      "An independent probability range for deal closure the desk could size against",
      "A view on which remedy package regulators were most likely to demand",
    ],
    outcome: [
      "The desk sized the spread to the expert probability range, not the market's implied panic",
      "The likely-remedy view told the team which asset sales to watch as closure signals",
      "The format became the desk's standard first step on every large-cap merger-arb name",
    ],
    metrics: [
      { label: "Experts", value: "6" },
      { label: "Timeline", value: "9 days" },
      { label: "Output", value: "Closure probability range" },
      { label: "Basis", value: "Public filings only" },
    ],
    quote: {
      text: "The market priced fear. We wanted a probability. Six people who understand how these agencies actually decide gave us a range we could size against.",
      role: "Head of Event-Driven",
    },
    relatedSlugs: [
      "hedge-fund-retail-channel-checks",
      "hedge-fund-short-thesis-software",
      "midmarket-industrials-cdd",
    ],
    primaryKW: "merger arbitrage regulatory diligence",
  },

  // ─────────────────────────── CORPORATES & STRATEGY ─────────────────────
  {
    slug: "corporate-market-entry-strategy",
    id: "CORP-01",
    category: "corporate",
    name: "CORPORATE STRATEGY — MARKET ENTRY",
    fundProfile: "Fortune 500 industrial, strategy team",
    title: "Market Entry — Corporate Strategy",
    description:
      "A Fortune 500 industrial's strategy team validated a new-geography market entry with in-market operator interviews before committing capital.",
    oneLiner:
      "A Fortune 500 strategy team validated a new-geography entry with in-market operators before committing capital.",
    pageLede:
      "The strategy team had board backing to enter a new region, but the business case rested on assumptions no one internally could test. Local demand, route to market, regulatory friction and competitor response all sat outside the company's experience. Before committing capital, they wanted operators who had actually built in that market.",
    sector: "Industrials / new-market entry",
    engagementType: "Market-entry validation",
    timeline: "5 weeks",
    challenge:
      "The entry case was built on desk research and internal optimism. The team needed independent, in-market evidence on real demand, the workable route to market and how incumbents would respond. The risk was committing capital to a plan that looked clean on a slide and failed on the ground.",
    approach: [
      "Structured the interviews around four load-bearing assumptions: demand, route to market, regulation and competitor response",
      "Sourced eleven in-market operators — former country managers, distributors and regulatory advisers",
      "Tested each assumption against people who had built or sold in the region",
      "Separated durable structural barriers from problems capital could solve",
    ],
    delivered: [
      "Eleven operator interviews plus a synthesis mapped to the four assumptions",
      "An independent read on the realistic route to market and its friction points",
      "A competitor-response map based on how incumbents had reacted to prior entrants",
    ],
    outcome: [
      "The team entered — but through a partnership model operators judged faster than building direct",
      "Two regulatory barriers surfaced in the calls reshaped the phasing of the entry",
      "The validated route to market went straight into the board business case",
    ],
    metrics: [
      { label: "Operator interviews", value: "11" },
      { label: "Timeline", value: "5 weeks" },
      { label: "Assumptions tested", value: "4" },
      { label: "Output", value: "Route-to-market map" },
    ],
    quote: {
      text: "Our slide said build direct. The operators who'd actually done it said partner first, build later. That one input changed the entire entry plan, and probably saved us a write-off.",
      role: "VP Corporate Strategy",
    },
    relatedSlugs: [
      "corporate-dev-acquisition-diligence",
      "corporate-disruption-threat-scan",
      "series-b-fintech-market-sizing",
    ],
    primaryKW: "market entry expert interviews",
  },
  {
    slug: "corporate-dev-acquisition-diligence",
    id: "CORP-02",
    category: "corporate",
    name: "CORP DEV — ACQUISITION DILIGENCE",
    fundProfile: "Global technology acquirer, corp-dev team",
    title: "Acquisition Diligence — Corporate Development",
    description:
      "A strategic acquirer's corp-dev team ran expert-led commercial diligence on a target, testing both standalone performance and the post-deal cross-sell revenue the model assumed.",
    oneLiner:
      "A strategic acquirer tested a target's standalone story and its cross-sell revenue case with expert-led diligence.",
    pageLede:
      "A strategic acquirer was close on a bolt-on. Unlike a financial buyer, the corp-dev team had a second question beyond whether the target was healthy — would the cross-sell revenue case survive contact with the two companies' customers? Bankers modelled the upside. The team wanted the market to test it.",
    sector: "Technology / M&A",
    engagementType: "Strategic acquisition diligence",
    timeline: "4 weeks",
    challenge:
      "The deal model leaned on cross-sell revenue the internal team could not independently verify. Corp dev needed evidence on two fronts: the target's standalone commercial health, and whether customers would actually buy the combined offering. Overpaying for revenue that never materialises is the classic strategic-M&A failure.",
    approach: [
      "Split the diligence into two questions: is the standalone story real, and does the cross-sell revenue hold with customers",
      "Sourced ten experts — the target's customers, two competitors and shared-channel partners",
      "Tested the specific cross-sell assumptions the deal model depended on",
      "Held every call to general market knowledge, screened before delivery",
    ],
    delivered: [
      "Ten anonymised call notes plus a synthesis split by standalone and cross-sell findings",
      "An independent read on whether customers would adopt the combined offering",
      "A flag on the two cross-sell assumptions least supported by the market",
    ],
    outcome: [
      "The team proceeded but re-based the revenue case on the assumptions the market actually supported",
      "One cross-sell assumption the model relied on was cut after customers rejected it",
      "The two-question format became corp dev's template for every strategic bolt-on",
    ],
    metrics: [
      { label: "Expert calls", value: "10" },
      { label: "Timeline", value: "4 weeks" },
      { label: "Lens", value: "Standalone + cross-sell" },
      { label: "Screening", value: "MNPI, pre-delivery" },
    ],
    quote: {
      text: "A financial buyer asks if the target is healthy. We also have to ask if the cross-sell revenue is real. The customers told us which half of the model to trust.",
      role: "Head of Corporate Development",
    },
    relatedSlugs: [
      "corporate-market-entry-strategy",
      "corporate-disruption-threat-scan",
      "midmarket-industrials-cdd",
    ],
    primaryKW: "corporate development due diligence",
  },
  {
    slug: "corporate-disruption-threat-scan",
    id: "CORP-03",
    category: "corporate",
    name: "CORPORATE STRATEGY — DISRUPTION SCAN",
    fundProfile: "Global consumer-goods company",
    title: "Disruption Scan — Corporate Strategy",
    description:
      "A consumer-goods incumbent sized the real threat from a fast-growing challenger category with expert interviews across the value chain.",
    oneLiner:
      "A consumer-goods incumbent sized the real threat from a challenger category with value-chain expert interviews.",
    pageLede:
      "The challenger brands were small but growing fast, and the board wanted to know whether they were a fad or a structural threat. Internal views split between ignore it and panic. The strategy team wanted an evidence-based read from across the value chain — retailers, former challenger operators and channel experts — before recommending a response.",
    sector: "Consumer goods",
    engagementType: "Disruption threat assessment",
    timeline: "4 weeks",
    challenge:
      "The incumbent had to decide whether to acquire, compete or ignore a rising category. Internal opinion was polarised and no one had independent evidence on the challengers' real durability. The risk was over-reacting to a fad or under-reacting to a structural shift. Both are expensive mistakes at scale.",
    approach: [
      "Framed the scan around one question: is the challenger category a structural shift or a cycle?",
      "Sourced nine experts — retail category buyers, former challenger-brand operators and channel distributors",
      "Tested whether the challengers' growth rested on durable advantages or temporary tailwinds",
      "Kept the interviews to general market knowledge, screened before delivery",
    ],
    delivered: [
      "Nine anonymised interviews plus a verdict on the category's structural durability",
      "A read on which challenger advantages the incumbent could neutralise and which it could not",
      "A retailer view on how much shelf the category would hold three years out",
    ],
    outcome: [
      "The scan judged the shift structural — the incumbent moved to acquire rather than wait it out",
      "One assumed challenger advantage proved shallow, narrowing the response to a focused set of moves",
      "The disruption-scan format became the strategy team's standard threat-assessment tool",
    ],
    metrics: [
      { label: "Experts", value: "9" },
      { label: "Timeline", value: "4 weeks" },
      { label: "Question", value: "Structural vs cyclical" },
      { label: "Output", value: "Threat verdict" },
    ],
    quote: {
      text: "Half the room said fad, half said crisis. Nine people across the value chain gave us the evidence to stop arguing and act. It was structural, and we moved.",
      role: "Chief Strategy Officer",
    },
    relatedSlugs: [
      "corporate-market-entry-strategy",
      "corporate-dev-acquisition-diligence",
      "healthtech-competitive-teardown",
    ],
    primaryKW: "disruption threat assessment",
  },

  // ─────────────────────────── MANAGEMENT CONSULTING ─────────────────────
  {
    slug: "consulting-cdd-expert-calls",
    id: "MC-01",
    category: "management-consulting",
    name: "STRATEGY FIRM — CDD EXPERT CALLS",
    fundProfile: "Global strategy consultancy",
    title: "CDD Expert Calls — Strategy Consultancy",
    description:
      "A strategy consultancy running commercial due diligence for a PE client sourced and ran expert calls fast enough to hit the deal timeline.",
    oneLiner:
      "A consultancy running CDD for a PE client sourced and ran expert calls fast enough to hit the deal clock.",
    pageLede:
      "The consultancy had won a commercial due diligence mandate for a private-equity client, on a compressed timeline. Their analysis was strong. The bottleneck was primary voices. They needed sector experts sourced and called fast, with compliance solid enough to stand behind in front of their client's investment committee.",
    sector: "Management consulting (CDD)",
    engagementType: "Expert sourcing for client CDD",
    timeline: "2.5 weeks",
    challenge:
      "The deal clock was fixed and the CDD needed primary evidence the team could not gather alone in time. The consultancy needed a partner to source niche operators quickly and run compliant calls. The primary-research layer had to be defensible to the PE client's IC, not a gap in the report.",
    approach: [
      "Aligned sourcing to the CDD's key questions rather than running generic interviews",
      "Sourced twelve experts across the target's customers, competitors and channel inside the deadline",
      "Ran calls to the consultancy's question set, delivering notes their team folded into the report",
      "Screened every call for MNPI so the output stood up to client-side compliance review",
    ],
    delivered: [
      "Twelve anonymised call notes structured to the CDD's evidence framework",
      "Primary-research inputs the consultancy delivered under its own brand to the client",
      "A compliance trail the PE client's IC could rely on",
    ],
    outcome: [
      "The consultancy hit the deal timeline with a defensible primary-research section",
      "The PE client's IC accepted the primary evidence without follow-up gaps",
      "The consultancy made FieldSignal its standing sourcing partner for CDD mandates",
    ],
    metrics: [
      { label: "Expert calls", value: "12" },
      { label: "Timeline", value: "2.5 weeks" },
      { label: "Delivery", value: "White-label to client" },
      { label: "Screening", value: "MNPI, per call" },
    ],
    quote: {
      text: "Our analysis was never the problem — sourcing the right operators in ten days was. They filled that gap so cleanly our client never saw a seam.",
      role: "Engagement Manager",
    },
    relatedSlugs: [
      "boutique-consulting-niche-experts",
      "midmarket-industrials-cdd",
      "corporate-dev-acquisition-diligence",
    ],
    primaryKW: "expert network for consultants",
  },
  {
    slug: "boutique-consulting-niche-experts",
    id: "MC-02",
    category: "management-consulting",
    name: "BOUTIQUE FIRM — NICHE OPERATOR PANEL",
    fundProfile: "Boutique strategy consultancy",
    title: "Niche Operator Panel — Boutique Consultancy",
    description:
      "A boutique consultancy on a growth-strategy project sourced hard-to-reach niche operators it could not find through its own network.",
    oneLiner:
      "A boutique consultancy sourced hard-to-reach niche operators its own network couldn't reach.",
    pageLede:
      "The boutique had deep expertise but a small network. A growth-strategy project for a client hinged on a narrow sub-sector where the firm knew no operators personally. Rather than pad the report with second-hand research, the partners wanted to put real practitioners in front of the analysis.",
    sector: "Boutique consulting",
    engagementType: "Niche expert sourcing",
    timeline: "3 weeks",
    challenge:
      "The project needed first-hand input from a niche the firm could not reach through its own contacts. A large network's scale would normally be overkill for a boutique. The partners needed targeted access to a handful of specific operators, without a network-scale retainer.",
    approach: [
      "Defined the exact operator profile the project needed before sourcing anyone",
      "Sourced seven niche specialists the firm's own network could not reach",
      "Ran focused calls the consultants used directly in their client analysis",
      "Kept the engagement per-project, with no retainer the boutique could not justify",
    ],
    delivered: [
      "Seven anonymised specialist interviews matched precisely to the project scope",
      "First-hand practitioner input the firm built into its client recommendations",
      "Access on a per-project basis, sized to a boutique's economics",
    ],
    outcome: [
      "The firm delivered a recommendation grounded in real operator input, not desk research",
      "The client extended the engagement on the strength of the primary evidence",
      "The boutique now sources niche experts per project rather than declining the work",
    ],
    metrics: [
      { label: "Specialists", value: "7" },
      { label: "Timeline", value: "3 weeks" },
      { label: "Commitment", value: "Per-project" },
      { label: "Fit", value: "Exact-profile sourcing" },
    ],
    quote: {
      text: "A big network is built for big retainers. We needed seven very specific people for one project. That's the access we could never get on our own, and now we don't have to.",
      role: "Founding Partner",
    },
    relatedSlugs: [
      "consulting-cdd-expert-calls",
      "startup-pricing-research",
      "seed-vertical-saas-pre-ic",
    ],
    primaryKW: "expert network for boutique consultancies",
  },

  // ─────────────────────────── STARTUPS & SCALE-UPS ──────────────────────
  {
    slug: "startup-pricing-research",
    id: "STARTUP-01",
    category: "startups",
    name: "SERIES A SAAS — PRICING RESEARCH",
    fundProfile: "Series A vertical-SaaS company",
    title: "Pricing Research — Series A SaaS",
    description:
      "A Series A SaaS company tested a pricing overhaul with willingness-to-pay interviews among its target buyers before repricing.",
    oneLiner:
      "A Series A SaaS company tested a pricing overhaul with willingness-to-pay interviews before repricing.",
    pageLede:
      "The founders suspected they were under-priced, but a reprice done blind risked stalling growth. Before changing the model, they wanted evidence on how target buyers actually value the product — what they would pay, what they would walk from and which features justified a premium. Guessing at price is how good products leak revenue.",
    sector: "Vertical SaaS",
    engagementType: "Pricing / willingness-to-pay research",
    timeline: "2 weeks",
    challenge:
      "The company was repricing on instinct, not evidence. The founders needed a real read on buyer willingness to pay, price sensitivity and the features that justified a premium, from the exact buyers they sell to. A mispriced reprice could cap growth or trigger churn.",
    approach: [
      "Framed the research around three questions: willingness to pay, price sensitivity and premium drivers",
      "Sourced ten target buyers matching the company's core segment",
      "Ran structured willingness-to-pay interviews rather than open-ended feedback",
      "Screened for buyers with real budget authority, not end users",
    ],
    delivered: [
      "Ten buyer interviews plus a willingness-to-pay range by segment",
      "A read on which features buyers would actually pay a premium for",
      "The price points most likely to trigger churn or resistance",
    ],
    outcome: [
      "The company repriced upward — but tiered the model to each segment's distinct willingness to pay",
      "Two features assumed to be premium turned out to be table stakes, and were bundled",
      "The reprice landed without the churn the founders had feared",
    ],
    metrics: [
      { label: "Buyer interviews", value: "10" },
      { label: "Timeline", value: "2 weeks" },
      { label: "Focus", value: "Willingness to pay" },
      { label: "Commitment", value: "Per-project" },
    ],
    quote: {
      text: "We were about to reprice on a hunch. Ten of our actual buyers told us where the ceiling really was, and which features they'd never pay extra for. That saved us from a churn event.",
      role: "Co-Founder and CEO",
    },
    relatedSlugs: [
      "startup-marketplace-supply-validation",
      "seed-vertical-saas-pre-ic",
      "healthtech-competitive-teardown",
    ],
    primaryKW: "pricing research expert interviews",
  },
  {
    slug: "startup-marketplace-supply-validation",
    id: "STARTUP-02",
    category: "startups",
    name: "SEED MARKETPLACE — SUPPLY-SIDE CHECK",
    fundProfile: "Seed-stage marketplace",
    title: "Supply-Side Validation — Seed Marketplace",
    description:
      "A seed marketplace validated supply-side willingness to join before scaling demand, through interviews with the operators it needed as suppliers.",
    oneLiner:
      "A seed marketplace validated supply-side buy-in before scaling demand, via interviews with target suppliers.",
    pageLede:
      "The marketplace's demand side was working. The open question — the one that kills marketplaces — was whether enough quality suppliers would join and stay. Before spending to scale demand, the founders wanted candid input from the exact operators they needed as supply: would they list, on what terms and what would make them leave.",
    sector: "Marketplace",
    engagementType: "Supply-side validation",
    timeline: "12 days",
    challenge:
      "Marketplaces fail when supply won't show up at the terms the model assumes. The founders needed honest input from target suppliers on their willingness to join, the economics they required and their loyalty to incumbents. That evidence had to come before pouring money into demand that supply could not serve.",
    approach: [
      "Reduced the question to supply intent: will they list, on what terms and what makes them leave",
      "Sourced eight operators from the exact supplier pool the marketplace needed",
      "Asked directly about take-rate tolerance, onboarding friction and incumbent loyalty",
      "Kept the engagement per-project, sized to a seed budget",
    ],
    delivered: [
      "Eight supplier interviews plus a read on realistic supply-side buy-in",
      "The take-rate and terms suppliers would actually accept",
      "The onboarding frictions most likely to stall supply growth",
    ],
    outcome: [
      "The founders adjusted the take-rate to the level suppliers would accept before scaling demand",
      "Two onboarding frictions surfaced early went onto the roadmap ahead of the demand push",
      "The validation gave the team evidence for its supply assumptions in the next fundraise",
    ],
    metrics: [
      { label: "Supplier interviews", value: "8" },
      { label: "Timeline", value: "12 days" },
      { label: "Focus", value: "Supply-side buy-in" },
      { label: "Commitment", value: "Per-project" },
    ],
    quote: {
      text: "Everyone told us to scale demand. The suppliers told us our take-rate would have driven them off the platform. We fixed the model before we spent the money, not after.",
      role: "Co-Founder",
    },
    relatedSlugs: [
      "startup-pricing-research",
      "seed-vertical-saas-pre-ic",
      "series-b-fintech-market-sizing",
    ],
    primaryKW: "marketplace supply-side validation",
  },

  // ─────────────────────────────── GO-TO-MARKET ─────────────────────────
  // Anonymised GTM channel-discovery engagements. Scope is uniform:
  // find which go-to-market channel works, which doesn't and why.
  {
    slug: "gtm-travel-creator-platform",
    id: "GTM-01",
    category: "direct",
    name: "TRAVEL-CREATOR PLATFORM — CHANNEL TEST",
    fundProfile: "Creator platform · travel guides",
    title: "GTM Channel Discovery — Creator Platform",
    description:
      "A platform for travel creators tested outbound, Meta ads, Google ads, influencer partnerships and creator referral to find which channel actually signed active creators and why the others failed.",
    oneLiner:
      "A travel-creator platform tested five channels to find which one actually signed quality, publishing creators.",
    pageLede:
      "The company lets travel creators build and sell interactive guides to their followers. Growth depended on signing creators who already had an audience. The team was ready to spend on paid acquisition but had no read on which channel would deliver. The brief was simple: find which GTM channel works, which doesn't and why, before the budget went in.",
    sector: "Creator economy / travel-tech",
    engagementType: "GTM channel discovery",
    timeline: "6 weeks",
    challenge:
      "The platform needed creators with real audiences, not sign-ups who would never publish. Paid budget was limited and could not be spread across every channel on faith. The team needed to know which channels produced active, audience-carrying creators and why the others did not, before committing spend.",
    approach: [
      "Tested five channels against one goal: cold outbound, Meta ads, Google ads, influencer partnerships and creator referral",
      "Defined a real success metric — creators who published a guide, not raw sign-ups",
      "Held targeting tight — outbound and referral aimed at mid-tier creators with proven audiences",
      "Cut each channel the moment its qualified-signup signal stalled",
    ],
    delivered: [
      "A ranked read on which channels produced publishing creators",
      "The reason each channel won or lost, tied to how creators actually get discovered",
      "A budget plan that concentrated spend on the channels that worked",
    ],
    outcome: [
      "Outbound won, and creator referral compounded it — signed creators introduced peers at near-zero cost",
      "Google lost: creators do not search for a way to sell travel guides, so there was no intent to capture",
      "Meta and broad influencer spend lost: neither could isolate creators with real audiences, so cost per active creator ran too high",
    ],
    metrics: [
      { label: "Channels tested", value: "5" },
      { label: "Winning channels", value: "Outbound + referral" },
      { label: "Weakest channel", value: "Google (no intent)" },
      { label: "Timeline", value: "6 weeks" },
    ],
    quote: {
      text: "We almost split the budget five ways. The test showed which channels actually brought in creators who published, and exactly why the rest never could. That saved us months of wasted spend.",
      role: "Head of Growth",
    },
    relatedSlugs: [
      "gtm-performance-pr-marketplace",
      "gtm-ai-fashion-imaging",
      "gtm-live-lessons-marketplace",
    ],
    primaryKW: "creator platform acquisition channels",
  },
  {
    slug: "gtm-ai-fashion-imaging",
    id: "GTM-02",
    category: "direct",
    name: "AI FASHION IMAGING — CHANNEL TEST",
    fundProfile: "Gen-AI SaaS · fashion e-commerce imaging",
    title: "GTM Channel Discovery — AI Imaging SaaS",
    description:
      "An AI product-imagery SaaS for fashion brands tested outbound, LinkedIn ads, Google search, Meta ads and brand partnerships to find which channel reached its real buyer and why.",
    oneLiner:
      "An AI fashion-imaging SaaS tested five channels to find which one reached brand and e-commerce buyers.",
    pageLede:
      "The company generates on-model fashion imagery with AI, replacing physical photoshoots. Its buyers are e-commerce and brand teams at fashion retailers. The founders were spending across paid channels with no clear read on what worked. The brief: find which GTM channel actually reaches the buyer, which doesn't and why.",
    sector: "Generative-AI SaaS / fashion e-commerce",
    engagementType: "GTM channel discovery",
    timeline: "6 weeks",
    challenge:
      "The buyer was a specific person — an e-commerce or brand lead at a fashion retailer — but the team was fishing for them across several very different channels. They needed to know where that buyer actually engages, and where paid spend was simply the wrong context, before scaling the budget.",
    approach: [
      "Tested five channels to a qualified-demo goal: cold outbound, LinkedIn ads, Google search, Meta ads and brand partnerships",
      "Pointed outbound directly at e-commerce and brand leads at target retailers",
      "Measured to booked demos with real buyers, not form-fills",
      "Compared channels on qualified pipeline, then reallocated fast",
    ],
    delivered: [
      "A ranked read on which channels produced demos with real buyers",
      "The reason each channel won or lost, tied to how fashion brands buy software",
      "A concentrated plan built around the channels that produced pipeline",
    ],
    outcome: [
      "Outbound won: a named, reachable buyer responded to targeted, specific outreach",
      "Google search and brand partnerships worked as secondary channels — real, if smaller, streams of in-market demand",
      "Meta lost and LinkedIn ads underdelivered: the right audience, but the wrong context and too costly to convert brand buyers",
    ],
    metrics: [
      { label: "Channels tested", value: "5" },
      { label: "Winning channel", value: "Outbound" },
      { label: "Weakest channel", value: "Meta" },
      { label: "Timeline", value: "6 weeks" },
    ],
    quote: {
      text: "We were burning budget on channels that felt right. The test proved our buyer answers targeted outreach and ignores a social feed. We stopped guessing and doubled down.",
      role: "Co-Founder",
    },
    relatedSlugs: [
      "gtm-self-storage-saas",
      "gtm-performance-pr-marketplace",
      "gtm-fleet-safety-hardware",
    ],
    primaryKW: "b2b saas outbound vs paid ads",
  },
  {
    slug: "gtm-self-storage-saas",
    id: "GTM-03",
    category: "direct",
    name: "SELF-STORAGE SAAS — CHANNEL TEST",
    fundProfile: "Vertical SaaS · self-storage operators",
    title: "GTM Channel Discovery — Vertical SaaS",
    description:
      "A self-storage management SaaS tested Google search, review directories, cold outbound, Meta ads and partner integrations and found search intent, not social, drove qualified demand.",
    oneLiner:
      "A self-storage management SaaS tested five channels to find where its operator buyers actually convert.",
    pageLede:
      "The company sells cloud software that runs self-storage and valet-storage businesses. Its buyers are facility operators. The team wanted to scale acquisition but was unsure whether to push outbound, social or search. The brief: find which GTM channel works for this operator buyer, which doesn't and why.",
    sector: "Vertical SaaS / self-storage",
    engagementType: "GTM channel discovery",
    timeline: "5 weeks",
    challenge:
      "Self-storage operators are a defined buyer with a known category of software. The question was whether demand should be captured from existing search intent, created through paid social or driven by outbound. The team needed to know which channels actually produced trials before spend scaled.",
    approach: [
      "Ran five channels to a free-trial goal: Google search, review directories, cold outbound, Meta ads and partner integrations",
      "Tested whether operators were actively searching for the category or needed to be reached cold",
      "Tracked trials that reached real activation, not just sign-ups",
      "Read each channel against the operator's actual buying behaviour",
    ],
    delivered: [
      "A ranked read on which channels produced activated trials",
      "The reason search beat the others for this established-category buyer",
      "A plan concentrating spend on capturing existing demand",
    ],
    outcome: [
      "Google search and review directories won: operators actively look for storage software and trust peer-review sites, so intent was strong to capture",
      "Outbound and partner integrations worked as secondary channels, especially for multi-site operators",
      "Meta lost: operators do not evaluate back-office software from a social feed, so the spend produced little",
    ],
    metrics: [
      { label: "Channels tested", value: "5" },
      { label: "Winning channels", value: "Search + directories" },
      { label: "Weakest channel", value: "Meta" },
      { label: "Timeline", value: "5 weeks" },
    ],
    quote: {
      text: "Our category already has demand — people search for exactly what we sell. The test showed us to capture that intent, not manufacture it on social. Meta was the wrong room entirely.",
      role: "Managing Director",
    },
    relatedSlugs: [
      "gtm-ai-fashion-imaging",
      "gtm-escrow-payments-fintech",
      "gtm-performance-pr-marketplace",
    ],
    primaryKW: "vertical saas paid channel strategy",
  },
  {
    slug: "gtm-performance-pr-marketplace",
    id: "GTM-04",
    category: "direct",
    name: "PERFORMANCE-PR MARKETPLACE — CHANNEL TEST",
    fundProfile: "Marketplace · pay-per-click PR",
    title: "GTM Channel Discovery — PR Marketplace",
    description:
      "A pay-per-click PR marketplace tested outbound, LinkedIn, Google, agency partnerships and content to find which channel reached brand marketers and why paid search and social failed.",
    oneLiner:
      "A performance-PR marketplace tested five channels to find which one reached brand and agency buyers.",
    pageLede:
      "The company runs a marketplace where brands pay publishers per click for editorial coverage. Its buyers are performance marketers and PR leads at consumer brands and agencies. Because the model was new, no one was searching for it. The brief: find which GTM channel actually reaches these buyers, which doesn't and why.",
    sector: "Media / PR marketplace",
    engagementType: "GTM channel discovery",
    timeline: "7 weeks",
    challenge:
      "The product created a new category, so buyers did not yet search for it by name. The team needed to know whether to educate the market through paid channels or reach an identifiable buyer directly. The test had to show which channels produced real advertiser sign-ups before scaling.",
    approach: [
      "Tested five channels to a qualified-advertiser goal: cold outbound, LinkedIn, Google, agency partnerships and content",
      "Aimed outbound at performance-marketing and PR leads at DTC brands and their agencies",
      "Measured to brands that launched a first campaign, not just registrations",
      "Compared channels on real activation and cut the laggards",
    ],
    delivered: [
      "A ranked read on which channels produced advertisers who launched",
      "The reason a new-category product could not rely on search or social",
      "A plan built around targeted outbound and agency partnerships",
    ],
    outcome: [
      "Outbound won, and agency partnerships scaled it — one agency onboarded brought many brands at once",
      "Google lost: no one searches for a category they do not know exists, so there was no intent to capture",
      "LinkedIn and content underdelivered: useful for credibility but too slow to produce advertisers who launched",
    ],
    metrics: [
      { label: "Channels tested", value: "5" },
      { label: "Winning channels", value: "Outbound + partnerships" },
      { label: "Weakest channel", value: "Google (no category search)" },
      { label: "Timeline", value: "7 weeks" },
    ],
    quote: {
      text: "We invented a category, which meant nobody was searching for us yet. The test made it obvious — reach the exact buyer directly and explain it, don't wait for them to Google a thing they've never heard of.",
      role: "VP Marketing",
    },
    relatedSlugs: [
      "gtm-travel-creator-platform",
      "gtm-ai-fashion-imaging",
      "gtm-fleet-safety-hardware",
    ],
    primaryKW: "new category go-to-market channels",
  },
  {
    slug: "gtm-live-lessons-marketplace",
    id: "GTM-05",
    category: "direct",
    name: "LIVE-LESSONS MARKETPLACE — CHANNEL TEST",
    fundProfile: "Marketplace · live expert lessons",
    title: "GTM Channel Discovery — Skills Marketplace",
    description:
      "A live-lessons marketplace tested Google, Meta, TikTok, creator referral and SEO and found search converted buyers while paid social only filled the top of the funnel.",
    oneLiner:
      "A live-lessons marketplace tested five channels to find which converted learners and which brought creators.",
    pageLede:
      "The company runs a marketplace for booking live lessons and masterclasses from experts. It has two sides — learners who buy and creators who teach. Growth spend was going out with no clear read on returns. The brief: find which GTM channel works for each side, which doesn't and why.",
    sector: "Marketplace / online learning",
    engagementType: "GTM channel discovery",
    timeline: "6 weeks",
    challenge:
      "A two-sided marketplace has to acquire buyers and supply, and the same channel rarely serves both. The team needed to know where paying learners actually convert, where creators come from and which channels were burning budget on attention that never turned into bookings.",
    approach: [
      "Split five channels by side: learner demand across Google, Meta, TikTok and SEO; creator supply through referral",
      "Measured the demand side to completed bookings, not clicks or views",
      "Tested whether learner intent lived in search or could be created on social",
      "Read creator acquisition on published, active teachers",
    ],
    delivered: [
      "A ranked read on which channels converted paying learners",
      "A clear split between demand-side and supply-side channels",
      "The reason social filled the funnel but search closed it",
    ],
    outcome: [
      "Google and SEO won on demand: learners search for the exact skill they want, so intent converted to bookings",
      "Meta and TikTok filled the funnel cheaply but converted weakly — attention without purchase intent",
      "Creator referral won on supply: active teachers introduced other experts far cheaper than paid acquisition",
    ],
    metrics: [
      { label: "Channels tested", value: "5" },
      { label: "Winning channel (demand)", value: "Google / SEO" },
      { label: "Weakest for conversion", value: "Paid social" },
      { label: "Timeline", value: "6 weeks" },
    ],
    quote: {
      text: "Social gave us cheap attention that never booked. Search gave us people who already wanted the lesson. Once we saw that split, we stopped paying for the wrong half of the funnel.",
      role: "Growth Lead",
    },
    relatedSlugs: [
      "gtm-travel-creator-platform",
      "gtm-social-rewards-app",
      "gtm-dtc-wellness-beverage",
    ],
    primaryKW: "marketplace paid channel testing",
  },
  {
    slug: "gtm-fleet-safety-hardware",
    id: "GTM-06",
    category: "direct",
    name: "FLEET-SAFETY HARDWARE — CHANNEL TEST",
    fundProfile: "Hardware + SaaS · fleet driver safety",
    title: "GTM Channel Discovery — Fleet-Safety Hardware",
    description:
      "A fleet driver-safety hardware and software company tested outbound, industry events, LinkedIn, Google and Meta and found direct sales and events, not paid ads, drove pipeline.",
    oneLiner:
      "A fleet driver-safety company tested five channels to find which reached enterprise fleet buyers.",
    pageLede:
      "The company makes a wearable device and dashboard that detects driver drowsiness for commercial fleets. Its buyers are fleet and safety managers at logistics operators. Paid ads were being tried with no clear return. The brief: find which GTM channel works for this enterprise buyer, which doesn't and why.",
    sector: "Fleet safety / hardware + SaaS",
    engagementType: "GTM channel discovery",
    timeline: "8 weeks",
    challenge:
      "The buyer set was small, the deal was considered and the sale involved hardware and a long cycle. The team needed to know whether paid channels could ever reach fleet decision-makers, or whether budget belonged in direct sales and pilots, before spending further on ads.",
    approach: [
      "Tested five channels to a qualified-pilot goal: cold outbound, industry events, LinkedIn, Google and Meta",
      "Aimed outbound at fleet and safety managers at target logistics operators",
      "Measured to booked pilots and qualified sales conversations, not clicks",
      "Compared paid reach against direct outreach and in-person events",
    ],
    delivered: [
      "A ranked read on which channels produced qualified fleet conversations",
      "The reason an enterprise hardware sale resists broad paid channels",
      "A plan moving budget from ads into targeted outbound, events and pilots",
    ],
    outcome: [
      "Outbound and industry events won: a small, identifiable buyer set responded to targeted outreach and met the product in person",
      "Google and LinkedIn captured a thin stream of intent from fleets already researching fatigue monitoring",
      "Meta lost outright: fleet safety managers do not buy enterprise hardware from a social ad",
    ],
    metrics: [
      { label: "Channels tested", value: "5" },
      { label: "Winning channels", value: "Outbound + events" },
      { label: "Weakest channel", value: "Meta" },
      { label: "Timeline", value: "8 weeks" },
    ],
    quote: {
      text: "We were running consumer-style ads for an enterprise fleet sale. The test made the mismatch obvious — our buyers are a short, named list, and they answer direct outreach, not an Instagram ad.",
      role: "Founder and CEO",
    },
    relatedSlugs: [
      "gtm-ai-fashion-imaging",
      "gtm-performance-pr-marketplace",
      "gtm-escrow-payments-fintech",
    ],
    primaryKW: "enterprise hardware go-to-market",
  },
  {
    slug: "gtm-social-rewards-app",
    id: "GTM-07",
    category: "direct",
    name: "SOCIAL REWARDS APP — CHANNEL TEST",
    fundProfile: "Consumer app · social + shop-to-earn rewards",
    title: "GTM Channel Discovery — Consumer Social App",
    description:
      "A consumer social-rewards app tested Meta, TikTok, Google, referral loops and partner outbound and found paid social and referral drove installs while search fell flat.",
    oneLiner:
      "A consumer social-rewards app tested five channels to find which drove installs and which built the partner side.",
    pageLede:
      "The company runs a consumer social app with a shop-and-earn rewards layer, plus a partner side of retailers funding the rewards. It needed users and partners, and its paid spend had no clear read. The brief: find which GTM channel works for each side, which doesn't and why.",
    sector: "Consumer social / rewards app",
    engagementType: "GTM channel discovery",
    timeline: "6 weeks",
    challenge:
      "A consumer app needs cheap, high-volume installs, while the partner side needs targeted B2B outreach. The team needed to know which channel drove quality installs, whether anyone searched for a brand-new social app and where the retail-partner pipeline actually came from.",
    approach: [
      "Split five channels: consumer installs across Meta, TikTok, Google and referral loops; retail partners through outbound",
      "Measured installs to active, engaged users rather than raw downloads",
      "Tested whether search demand existed for a new social app at all",
      "Read partner acquisition on booked retailer conversations",
    ],
    delivered: [
      "A ranked read on which channels drove engaged installs",
      "A clear split between the consumer channels and the partner channel",
      "The reason a new consumer app cannot rely on search",
    ],
    outcome: [
      "Meta won on the consumer side, and referral loops compounded it — engaged users invited more at near-zero cost",
      "TikTok added cheap top-funnel reach but converted below Meta on engaged installs",
      "Google lost: no one searches for a social app that did not exist in their mind yesterday, and outbound won the partner side",
    ],
    metrics: [
      { label: "Channels tested", value: "5" },
      { label: "Winning channels (users)", value: "Meta + referral" },
      { label: "Weakest channel", value: "Google" },
      { label: "Timeline", value: "6 weeks" },
    ],
    quote: {
      text: "Nobody googles a social app they've never heard of. Meta put us in front of the right people, and outbound built the retail side. The test told us where each audience actually lives.",
      role: "Head of Growth",
    },
    relatedSlugs: [
      "gtm-dtc-wellness-beverage",
      "gtm-live-lessons-marketplace",
      "gtm-travel-creator-platform",
    ],
    primaryKW: "consumer app install channels",
  },
  {
    slug: "gtm-dtc-wellness-beverage",
    id: "GTM-08",
    category: "direct",
    name: "DTC WELLNESS BEVERAGE — CHANNEL TEST",
    fundProfile: "DTC brand · functional wellness drinks",
    title: "GTM Channel Discovery — DTC Beverage Brand",
    description:
      "A DTC functional-beverage brand tested Meta, TikTok, influencer content, Google and retail outreach and found social and influencer drove discovery while outbound opened retail.",
    oneLiner:
      "A DTC wellness-drinks brand tested five channels to find which drove sales and which opened stockists.",
    pageLede:
      "The company is a direct-to-consumer brand making science-backed functional drinks, sold online and through retail. It needed consumer demand and retail stockists, and wanted to know where to put its budget. The brief: find which GTM channel works for each goal, which doesn't and why.",
    sector: "DTC / functional beverages",
    engagementType: "GTM channel discovery",
    timeline: "6 weeks",
    challenge:
      "A new consumer beverage has to build demand people do not yet know to look for, while also landing wholesale stockists. The team needed to know whether social, search or outreach drove real sales and retail interest, before scaling spend behind any of them.",
    approach: [
      "Split five channels: consumer demand across Meta, TikTok, influencer content and Google; retail stockists through outbound",
      "Measured consumer channels to purchases, not clicks or reach",
      "Tested whether category search existed yet for a novel functional drink",
      "Read the retail side on stockist conversations and trials",
    ],
    delivered: [
      "A ranked read on which channels drove consumer purchases",
      "A clear split between the demand channels and the wholesale channel",
      "The reason a discovery product leans on social, not search, early on",
    ],
    outcome: [
      "Meta, TikTok and influencer content won on demand: visual, creator-style content drove trial for a product people discover rather than search for",
      "Google stayed thin early — category search barely existed, and only branded terms converted",
      "Outbound won for retail: buyers at stockists responded to a direct, specific pitch",
    ],
    metrics: [
      { label: "Channels tested", value: "5" },
      { label: "Winning channels (demand)", value: "Meta + influencer" },
      { label: "Weakest channel", value: "Google (thin search)" },
      { label: "Timeline", value: "6 weeks" },
    ],
    quote: {
      text: "People don't search for a drink they've never heard of — they discover it. Social created that discovery, outbound opened the retail doors and search only worked once people knew our name.",
      role: "Co-Founder",
    },
    relatedSlugs: [
      "gtm-social-rewards-app",
      "gtm-live-lessons-marketplace",
      "gtm-travel-creator-platform",
    ],
    primaryKW: "dtc brand marketing channels",
  },
  {
    slug: "gtm-escrow-payments-fintech",
    id: "GTM-09",
    category: "direct",
    name: "ESCROW PAYMENTS FINTECH — CHANNEL TEST",
    fundProfile: "Fintech · escrow for high-value sales",
    title: "GTM Channel Discovery — Escrow Fintech",
    description:
      "A secure-payments fintech for high-value sales tested outbound, platform partnerships, Google, Meta and trust content and found partnerships and outbound beat consumer ads.",
    oneLiner:
      "A secure-payments fintech tested five channels to find which actually drove completed transactions.",
    pageLede:
      "The company provides digital escrow and secure payments for high-value sales such as used vehicles. It sells both to consumers completing a sale and to the platforms and dealers that could distribute it. The brief: find which GTM channel works, which doesn't and why.",
    sector: "Fintech / secure payments",
    engagementType: "GTM channel discovery",
    timeline: "7 weeks",
    challenge:
      "A trust-and-transaction product is not an impulse buy, and its volume can come either from consumers one deal at a time or from platforms that embed it. The team needed to know whether paid consumer channels worked, or whether budget belonged in partnerships and outbound, before scaling.",
    approach: [
      "Tested five channels to a completed-transaction goal: cold outbound, platform partnerships, Google, Meta and trust content",
      "Aimed outbound at marketplaces and dealers who could distribute the product",
      "Measured to completed secured transactions, not clicks",
      "Compared one-at-a-time consumer acquisition against embedded distribution",
    ],
    delivered: [
      "A ranked read on which channels drove completed transactions",
      "The reason a trust product distributes better through platforms than ads",
      "A plan concentrating on partnerships and targeted outbound",
    ],
    outcome: [
      "Platform partnerships and outbound won: embedding the product where the sale already happens drove real volume",
      "Google and trust content captured a thin stream of consumers already searching for a safe way to pay",
      "Meta lost: a high-trust transaction is not something people commit to from a social ad",
    ],
    metrics: [
      { label: "Channels tested", value: "5" },
      { label: "Winning channels", value: "Partnerships + outbound" },
      { label: "Weakest channel", value: "Meta" },
      { label: "Timeline", value: "7 weeks" },
    ],
    quote: {
      text: "You don't win a high-trust payment from a scroll-by ad. Our volume comes from embedding where the sale already happens, and from reaching platforms directly. Consumer ads were the wrong tool.",
      role: "Commercial Director",
    },
    relatedSlugs: [
      "gtm-self-storage-saas",
      "gtm-fleet-safety-hardware",
      "gtm-ai-fashion-imaging",
    ],
    primaryKW: "fintech distribution channels",
  },
];
