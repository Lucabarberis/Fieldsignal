/**
 * Alternatives pages — buyers actively shopping for non-incumbent
 * expert networks. Highest commercial intent in the site per SEO
 * brief §4.6. Be honest. Mention where the competitor wins.
 */

export type AlternativeContent = {
  slug: string;
  id: string;
  /** Pinned competitor — page references this competitor's data. */
  competitorSlug?: string;
  /** Or a category page (no single competitor pin). */
  category?: "affordable" | "startups" | "small-funds";
  name: string;
  title: string;
  description: string;
  pageLede: string;
  /** When the incumbent / category-of-1 is genuinely the right answer. */
  whenIncumbentIsRight: readonly string[];
  /** When FieldSignal is genuinely the right alternative. */
  whenFieldSignalIsRight: readonly string[];
  /** Honest self-qualification — drives conversion to /contact. */
  selfQualify: readonly string[];
  /** FAQ for FAQ schema + rendered block. */
  faq: readonly { q: string; a: string }[];
  primaryKW: string;
};

export const alternatives: readonly AlternativeContent[] = [
  // ─── Pinned-competitor pages ──────────────────────────────────────
  {
    slug: "glg-alternatives",
    id: "01",
    competitorSlug: "glg",
    name: "GLG ALTERNATIVES",
    title: "GLG Alternatives 2026 - 7 Honest Competitors Compared",
    description:
      "Six expert networks compared on pricing, compliance and turnaround. Includes when GLG is still the right answer and when it isn't.",
    pageLede:
      "GLG is the largest expert network in the world. For Tier-1 hedge funds and Fortune 500 corporates running six-figure annual research volume, it is often the right answer. For emerging managers, startups, and SMEs, the retainer model makes it economically impossible. Here are the alternatives — honestly compared.",
    whenIncumbentIsRight: [
      "You run >$50k of expert research a year and a retainer makes the per-call rate worthwhile",
      "You need 24/7 global desk coverage with same-day expert sourcing",
      "Your firm's compliance team has approved GLG specifically as a vendor",
      "You're a Tier-1 institutional client where GLG's brand carries weight in DD",
    ],
    whenFieldSignalIsRight: [
      "You run 5–30 expert calls a year, not 500",
      "Annual retainer is economically impossible at your AUM or revenue",
      "You want per-call pricing transparently published",
      "Senior researcher direct contact matters more than 24/7 desk",
    ],
    selfQualify: [
      "If you're spending less than $25k/year on expert research, you don't need GLG — you need a per-call provider with the same compliance and a fraction of the friction.",
      "If you're spending >$200k/year, FieldSignal is unlikely to be the right fit at this stage of our growth — GLG's enterprise tooling will serve you better.",
      "If you're in between, talk to us. We're transparent about when we're not the right answer.",
    ],
    faq: [
      {
        q: "Is GLG worth the money?",
        a: "For institutional buyers with consistent, six-figure annual research budgets — yes. The network depth and global desk justify the retainer. For mid-market and emerging-manager buyers, the economics are punishing relative to alternatives.",
      },
      {
        q: "What's the cheapest GLG alternative?",
        a: "FieldSignal is one of the most accessible — per-call from €500 with no retainer. Other affordable options include NewtonX (survey-first) and the Tegus transcript subscription (transcripts only, no custom calls).",
      },
      {
        q: "Does GLG have the best compliance?",
        a: "GLG has the longest-running compliance program, but the substantive controls — MNPI policy, attestations, exclusion lists, audit retention — are equivalent across all reputable networks. FieldSignal mirrors GLG's framework explicitly.",
      },
    ],
    primaryKW: "GLG alternatives",
  },
  {
    slug: "alphasights-alternatives",
    id: "02",
    competitorSlug: "alphasights",
    name: "ALPHASIGHTS ALTERNATIVES",
    title: "AlphaSights Alternatives 2026 - Compared on Price and Service",
    description:
      "Side-by-side comparison of AlphaSights vs FieldSignal, GLG, Third Bridge, Guidepoint and Coleman. No affiliate spin.",
    pageLede:
      "AlphaSights built its reputation on speed — first call often within 24 hours. The trade-off is the retainer model and a service experience that's optimised for clients who pay six figures a year. If that's not you, here are the honest alternatives.",
    whenIncumbentIsRight: [
      "Speed is your #1 constraint — you need a call started within 24 hours",
      "Mid-market PE diligence with European focus",
      "You value a dedicated analyst staffing model",
      "Retainer economics are not a barrier",
    ],
    whenFieldSignalIsRight: [
      "Your timeline is 3–5 business days, not next-day",
      "You want direct briefing access to the senior researcher",
      "Per-call pricing matters more than account-manager polish",
      "You're under the institutional cheque-size threshold",
    ],
    selfQualify: [
      "AlphaSights is unmatched if you genuinely need expert calls within 24 hours and have the budget — they invest heavily in that capability.",
      "If your typical timeline is a week or more, you're paying for speed you're not using. Try a per-call provider instead.",
    ],
    faq: [
      {
        q: "How fast can AlphaSights actually deliver?",
        a: "Within 24 hours on standard sectors is realistic. Niche sub-niches still take 3–5 days. Other networks (including FieldSignal) hit 3–5 days as standard.",
      },
      {
        q: "Is AlphaSights cheaper than GLG?",
        a: "Comparable. Both operate annual-retainer + per-call models in the same price range. AlphaSights tends to be more flexible on retainer minimums for mid-market clients.",
      },
      {
        q: "Can I get AlphaSights without a retainer?",
        a: "Historically no for institutional clients. Per-call relationships have become more common in recent years for boutique clients, but the retainer remains the standard.",
      },
    ],
    primaryKW: "AlphaSights alternatives",
  },
  {
    slug: "third-bridge-alternatives",
    id: "03",
    competitorSlug: "third-bridge",
    name: "THIRD BRIDGE ALTERNATIVES",
    title: "Third Bridge Alternatives 2026 - Transcript and Call Networks",
    description:
      "Direct comparison of Third Bridge vs Tegus, GLG, AlphaSights and FieldSignal. Focused on transcript depth and analyst-led research.",
    pageLede:
      "Third Bridge's Forum is the best analyst-led transcript library in the industry. If that's what you're paying for, the alternatives mostly come up short. If you're paying for Forum but mostly use the per-call work, you're probably over-spending.",
    whenIncumbentIsRight: [
      "Forum's analyst-led transcripts are the core of your research workflow",
      "You consume 100+ transcripts per year",
      "You value sector-themed insight reports alongside raw transcripts",
      "PE diligence with editorial framing is your primary use case",
    ],
    whenFieldSignalIsRight: [
      "You use Third Bridge mostly for per-call work, not Forum",
      "You'd swap Forum for a smaller transcript library at €99/mo",
      "You want lower-friction per-call pricing",
      "You're a smaller buyer where Forum's subscription tier is overkill",
    ],
    selfQualify: [
      "If Forum-style analyst-led transcripts are why you subscribe to Third Bridge, no other network matches that product. Stay there.",
      "If you'd be happy with raw transcripts and custom expert calls separately, you can save 80%+ by unbundling.",
    ],
    faq: [
      {
        q: "What's special about Third Bridge Forum?",
        a: "The transcripts are produced by sector analysts who conduct and frame the interview, not just transcribe a raw call. This gives them an editorial structure absent from competitors.",
      },
      {
        q: "Is Tegus better than Third Bridge for transcripts?",
        a: "Tegus has more raw transcripts and better AI search. Third Bridge has fewer but more analytically structured transcripts. Different products serving different workflows.",
      },
      {
        q: "Can I just get the calls without Forum?",
        a: "Third Bridge sells per-call separately, but the value-per-dollar is much stronger when bundled. If you don't need Forum, look elsewhere.",
      },
    ],
    primaryKW: "Third Bridge alternatives",
  },
  {
    slug: "guidepoint-alternatives",
    id: "04",
    competitorSlug: "guidepoint",
    name: "GUIDEPOINT ALTERNATIVES",
    title: "Guidepoint Alternatives 2026 - Cheaper Generalist Networks",
    description:
      "Six alternatives for teams using Guidepoint for breadth. Compared on cost, geographic depth and compliance.",
    pageLede:
      "Guidepoint's strength is breadth — one of the largest networks globally with strong APAC and EMEA coverage. If you need broad multi-region generalist reach, alternatives mostly aren't as deep. If you mostly use Guidepoint for single-region calls, you're paying for global capacity you don't use.",
    whenIncumbentIsRight: [
      "You run research across APAC, EMEA and North America in a single programme",
      "You need a survey panel at scale alongside custom calls",
      "Your compliance team has approved Guidepoint specifically",
      "Your firm runs >$100k annual research volume",
    ],
    whenFieldSignalIsRight: [
      "Most of your research is single-region or two-region",
      "Your call volume is under 50/year",
      "You'd rather pay per-call than fund a retainer",
      "You want senior direct contact, not account-manager triage",
    ],
    selfQualify: [
      "Guidepoint is the right call when geographic breadth matters more than per-engagement attention.",
      "If your work is concentrated in one or two regions, a smaller network with deeper per-project ownership is almost always more useful.",
    ],
    faq: [
      {
        q: "Is Guidepoint cheaper than GLG?",
        a: "Comparable. Both operate retainer + per-call models in similar ranges. Guidepoint is sometimes more flexible on retainer terms for emerging managers.",
      },
      {
        q: "What's Guidepoint best at?",
        a: "Generalist breadth across regions, plus large-scale survey panels. Few competitors match that combination.",
      },
      {
        q: "What's the lightest-weight Guidepoint alternative?",
        a: "FieldSignal for per-call work, Tegus for transcript-only. Pick the model that matches your usage.",
      },
    ],
    primaryKW: "Guidepoint alternatives",
  },
  {
    slug: "tegus-alternatives",
    id: "05",
    competitorSlug: "tegus",
    name: "TEGUS ALTERNATIVES",
    title: "Tegus Alternatives 2026 - Transcript Library Comparison",
    description:
      "Compare Tegus and AlphaSense to Third Bridge, GLG, AlphaSights and FieldSignal on transcript depth, AI search and call access.",
    pageLede:
      "Tegus (now part of AlphaSense) built the largest searchable transcript library in the industry. If you consume hundreds of transcripts a year, no alternative matches the depth or AI workflow. If you consume 5–20 transcripts a year, you're paying for capacity you don't use.",
    whenIncumbentIsRight: [
      "You search transcripts daily as part of investment research",
      "AI-driven theme search is core to your workflow",
      "You value unified document + transcript search (Tegus + AlphaSense)",
      "You consume 100+ transcripts a year",
    ],
    whenFieldSignalIsRight: [
      "You consume 5–20 transcripts a year — a fraction of Tegus' subscription cost",
      "You also need custom expert calls Tegus doesn't sell",
      "You want a self-serve €99/mo entry point",
      "You're not running automated AI-driven research at scale",
    ],
    selfQualify: [
      "Tegus' value scales with consumption. Use it heavily, it's a bargain. Use it lightly, it's a waste.",
      "If you need transcripts AND custom calls AND can't stomach the subscription cost, FieldSignal does both at a fraction of Tegus' price for low-volume users.",
    ],
    faq: [
      {
        q: "How big is the Tegus library?",
        a: "100,000+ transcripts publicly claimed. With AlphaSense integration post-acquisition, the combined corpus is even larger.",
      },
      {
        q: "Can I get Tegus without a subscription?",
        a: "Limited pay-per-transcript options exist but the model is fundamentally subscription-first.",
      },
      {
        q: "Is FieldSignal's library competitive with Tegus?",
        a: "No — Tegus is the leader on transcript depth. FieldSignal's library is smaller (5,000+) but accessible at €99/mo for buyers who don't need 100,000.",
      },
    ],
    primaryKW: "Tegus alternatives",
  },
  {
    slug: "alphasense-alternatives",
    id: "06",
    competitorSlug: "alphasense",
    name: "ALPHASENSE ALTERNATIVES",
    title: "AlphaSense Alternatives 2026 - Investment Research Platforms",
    description:
      "Alternatives to AlphaSense for investment research, transcript search and document analysis.",
    pageLede:
      "AlphaSense is a research platform — broker reports, regulatory filings, transcripts (Tegus, post-acquisition) — unified under AI search. It's not really an expert network. If you need custom expert calls, AlphaSense doesn't sell them. If you need document and transcript search, AlphaSense is hard to beat.",
    whenIncumbentIsRight: [
      "Broker research, earnings transcripts and regulatory filings are your daily diet",
      "AI-driven theme search across documents is your workflow",
      "Enterprise team collaboration matters",
      "You consume documents and transcripts but rarely commission custom calls",
    ],
    whenFieldSignalIsRight: [
      "You need to commission custom expert calls, not just search a library",
      "You want per-call pricing without an enterprise platform subscription",
      "Your team is small and the seat-license model is overkill",
      "You'd rather pay €99/mo for transcripts than tens of thousands for a platform",
    ],
    selfQualify: [
      "AlphaSense and FieldSignal solve different problems. AlphaSense is a search platform; FieldSignal commissions primary research. Many serious shops use both.",
      "If you don't need to commission custom calls, AlphaSense is genuinely excellent. If you do, you need an expert network alongside.",
    ],
    faq: [
      {
        q: "Does AlphaSense have expert calls?",
        a: "Since acquiring Tegus in 2024, AlphaSense has integrated the Tegus transcript library. Custom call commissioning is not core to the platform.",
      },
      {
        q: "Is AlphaSense replacing Bloomberg?",
        a: "Different products. Bloomberg is data + news + workflow; AlphaSense is search across research and transcripts. Most serious analysts use both.",
      },
      {
        q: "What's the cheapest AlphaSense alternative?",
        a: "Depends what you need. For broker research search alone, alternatives include Sentieo and visible alpha tools. For transcripts only, Tegus + AlphaSense is now consolidated; FieldSignal at €99/mo serves the budget end.",
      },
    ],
    primaryKW: "AlphaSense alternatives",
  },
  {
    slug: "coleman-research-alternatives",
    id: "07",
    competitorSlug: "coleman-research",
    name: "COLEMAN RESEARCH ALTERNATIVES",
    title: "Coleman Research Alternatives 2026 - Compared on Pricing",
    description:
      "Honest comparison of Coleman vs FieldSignal, Mosaic, Maven and the Big Four expert networks.",
    pageLede:
      "Coleman is a respected mid-market expert network with disproportionate depth in healthcare and life sciences. If healthcare is most of your research, Coleman is worth shortlisting. If you're broader-sector or smaller, alternatives compete well.",
    whenIncumbentIsRight: [
      "Healthcare and life-sciences research is >50% of your work",
      "You want a focused mid-market network without Big Four scale",
      "Compliance and quality reputation matter more than breadth",
      "You can fund a modest annual minimum",
    ],
    whenFieldSignalIsRight: [
      "Your sector mix is broader than healthcare",
      "You want no annual minimum at all",
      "You're under the mid-market cheque-size threshold",
      "Transparent pricing matters",
    ],
    selfQualify: [
      "Coleman's healthcare depth is real and hard-earned. If you're a healthcare-focused fund or corporate, shortlist them.",
      "Outside healthcare, the case for Coleman over alternatives weakens. Look at FieldSignal, Maven, Mosaic.",
    ],
    faq: [
      {
        q: "Is Coleman bigger than the Big Four?",
        a: "No — Coleman is intentionally mid-sized. The trade-off is focus and service quality vs raw scale.",
      },
      {
        q: "What's Coleman's healthcare advantage?",
        a: "Long-running relationships with clinicians, KOLs and hospital systems plus a healthcare-focused analyst bench. Disproportionate depth for the firm's overall size.",
      },
      {
        q: "Is FieldSignal cheaper than Coleman?",
        a: "Per-call pricing is comparable. FieldSignal's differentiator is no annual minimum at all, which suits smaller buyers.",
      },
    ],
    primaryKW: "Coleman Research alternatives",
  },
  {
    slug: "newtonx-alternatives",
    id: "08",
    competitorSlug: "newtonx",
    name: "NEWTONX ALTERNATIVES",
    title: "NewtonX Alternatives 2026 - B2B Survey Networks Compared",
    description:
      "Alternatives to NewtonX for B2B expert surveys. Compared on panel build, fielding speed and analysis depth.",
    pageLede:
      "NewtonX built its product around AI-driven B2B panel sourcing — fast, low-friction surveys with hard-to-reach respondents. If you're running quantitative B2B research at panel scale, NewtonX is genuinely competitive. If you mostly need 1:1 calls or management refs, NewtonX is the wrong tool.",
    whenIncumbentIsRight: [
      "Quantitative B2B surveys are >50% of your research",
      "You need fast panel sourcing for hard-to-reach respondents",
      "Speed and AI panel-build matter more than qualitative depth",
      "You're a corporate strategy or marketing buyer, not investor",
    ],
    whenFieldSignalIsRight: [
      "You mostly need 1:1 expert calls, not surveys",
      "Management reference work matters",
      "You want compliance suited to investor use cases",
      "You need a transcript library alongside survey capability",
    ],
    selfQualify: [
      "NewtonX is the right answer when quant surveys are the primary methodology.",
      "If your research is mostly qualitative or investor-grade compliance-sensitive, you're better served by a traditional expert network.",
    ],
    faq: [
      {
        q: "How does NewtonX find experts so fast?",
        a: "AI-driven outbound recruitment to match expert profile to brief. The model works best when the target audience is sizeable and reachable on LinkedIn/email.",
      },
      {
        q: "Is NewtonX cheaper than GLG?",
        a: "For one-off survey projects, yes. For ongoing custom-call research, the comparison breaks down — they sell different products.",
      },
      {
        q: "Can FieldSignal run surveys like NewtonX?",
        a: "Yes — see /services/expert-surveys. We're stronger on qualitative-quant blend; NewtonX is stronger on pure-quant at speed.",
      },
    ],
    primaryKW: "NewtonX alternatives",
  },

  // ─── Category pages (no single competitor) ─────────────────────────
  {
    slug: "affordable-expert-networks",
    id: "09",
    category: "affordable",
    name: "AFFORDABLE EXPERT NETWORKS",
    title: "Affordable Expert Networks - Without the Six-Figure Retainer",
    description:
      "Seven expert networks that don't require annual retainers. Compared on per-call pricing, project minimums and quality.",
    pageLede:
      "The largest expert networks — GLG, AlphaSights, Third Bridge, Guidepoint — operate on annual retainers in the six figures. For most buyers, that's an immediate disqualifier. Here are the seven networks that genuinely offer per-call pricing at accessible cheque sizes.",
    whenIncumbentIsRight: [],
    whenFieldSignalIsRight: [
      "Per-call from €500, no annual commitment",
      "Project packages from €4,000 with no retainer trigger",
      "Same compliance framework as the Big Four expert networks",
      "Senior researcher direct, regardless of cheque size",
    ],
    selfQualify: [
      "If you can't fund a six-figure retainer, the Big Four are not for you — period. Don't be embarrassed about this; the economics are real.",
      "If you can fund a retainer but choose not to (preferring per-call flexibility), boutique networks like FieldSignal are designed for you.",
    ],
    faq: [
      {
        q: "Are affordable networks compliant?",
        a: "The substantive compliance controls — MNPI policy, attestations, exclusion lists, 7-year audit — are equivalent across reputable networks regardless of pricing tier.",
      },
      {
        q: "Is quality lower at lower price points?",
        a: "Not necessarily. The expert network model has matured. Lower prices reflect different cost structures and target buyers, not lower expert quality.",
      },
      {
        q: "What's the cheapest per-call rate available?",
        a: "FieldSignal's standard rate starts at €500. Below that, you're typically dealing with non-vetted freelance platforms (not what we recommend for investor-grade work).",
      },
    ],
    primaryKW: "affordable expert networks",
  },
  {
    slug: "expert-networks-for-startups",
    id: "10",
    category: "startups",
    name: "EXPERT NETWORKS FOR STARTUPS",
    title: "Best Expert Networks for Startups - From Seed to Series C",
    description:
      "Six expert networks ranked for early-stage founders. Compared on minimums, speed and willingness to take small projects.",
    pageLede:
      "For decades, expert networks treated startups as not worth the friction. The economics of a six-figure annual retainer are absurd for a 5-person seed-stage team. The model has shifted in the last few years — here are the six networks genuinely set up for founders.",
    whenIncumbentIsRight: [],
    whenFieldSignalIsRight: [
      "From €500 per call — a single Series A diligence enquiry costs less than a hire",
      "No annual minimum",
      "Senior researcher direct, no junior account manager between you and the expert",
      "Built specifically for founders who need to validate a thesis quickly",
    ],
    selfQualify: [
      "If you're a 3-person seed team, you need a per-call provider with same compliance as institutional networks. That's exactly what FieldSignal is built for.",
      "If you're Series D and your strategy team runs 50+ calls a quarter, you're outgrowing per-call work — talk to us about subscription tiers.",
    ],
    faq: [
      {
        q: "Why do most expert networks ignore startups?",
        a: "Their cost structure assumes high-volume institutional clients. Onboarding a $500 single-call client costs them as much as a $50,000 client, with worse unit economics.",
      },
      {
        q: "Will an expert take a call from a startup?",
        a: "Yes — experts are paid the same whether the client is a hedge fund or a seed-stage founder. They don't see the client at all in most cases (compliance).",
      },
      {
        q: "How long does it take to set up an account?",
        a: "FieldSignal: a single email. We send you the MSA, you sign, your first call is scheduled. Other networks: weeks of compliance back-and-forth designed around enterprise procurement.",
      },
    ],
    primaryKW: "expert networks for startups",
  },
  {
    slug: "expert-networks-for-small-funds",
    id: "11",
    category: "small-funds",
    name: "EXPERT NETWORKS FOR SMALL FUNDS",
    title: "Expert Networks for Small Funds - For $50M to $500M AUM",
    description:
      "Six networks suited to emerging hedge funds, micro-cap PE and small VC funds. Compared on minimums, compliance and call rates.",
    pageLede:
      "$50M to $500M AUM funds are the most under-served segment in expert networks. Too small for GLG's economics, too sophisticated for freelance platforms, too compliance-sensitive to cut corners. These six networks are built for you.",
    whenIncumbentIsRight: [],
    whenFieldSignalIsRight: [
      "Per-call pricing — no fund-AUM minimum",
      "GLG-equivalent MNPI policy, exclusion list, attestation",
      "Pre-call compliance attestation integrated with your firm's framework",
      "Senior researcher direct, no account-manager triage",
    ],
    selfQualify: [
      "If you're an emerging manager under $500M AUM, the Big Four economics make zero sense. Per-call providers like FieldSignal are designed for you.",
      "If you're above $500M, the calculus shifts — talk to us about subscription tiers, or evaluate whether a Big Four retainer is now economic.",
    ],
    faq: [
      {
        q: "Will my prime broker accept FieldSignal calls?",
        a: "Yes — our compliance framework satisfies prime-broker and fund-administrator due diligence requirements. Compliance documentation available on request.",
      },
      {
        q: "How does FieldSignal compare to GLG on compliance?",
        a: "Equivalent. Same 6-month cooling-off, exclusion list of 2,000+ insiders, per-call attestations, real-time monitoring, 7-year audit retention.",
      },
      {
        q: "Can I get a same-day call from FieldSignal?",
        a: "Standard turnaround is 3–5 business days. Rush turnaround (24–72 hours) is possible for urgent calls — let us know up front.",
      },
    ],
    primaryKW: "expert networks for small funds",
  },
] as const;
