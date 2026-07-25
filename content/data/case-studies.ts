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
 * Hub /case-studies iterates this. /case-studies/[slug] renders the detail.
 *
 * House rule: no engagement prices here. Metrics are operational
 * (calls, turnaround, coverage), never rate cards — pricing lives on /pricing.
 */

export type CaseStudyCategory = "venture-capital" | "private-equity" | "direct";

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
    key: "direct",
    label: "Direct Clients",
    num: "03",
    blurb: "Corporates, consultancies and operating teams commissioning primary research directly. Studies published as they are cleared.",
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
];
