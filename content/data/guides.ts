/**
 * Long-form guides — SEO brief §4.13.1.
 *
 * Each guide is structured as a sequence of sections (heading + body)
 * to render cleanly in the brand grid. Target length 2,500-4,000 words
 * — these initial 8 are seeded with substantive content but will grow
 * over time as we refresh them quarterly.
 */

export type Guide = {
  slug: string;
  id: string;
  name: string;
  title: string;
  description: string;
  oneLiner: string;
  pageLede: string;
  /** Estimated read time, e.g. "12 min read". */
  readTime: string;
  /** ISO date for ArticleSchema (machine-readable). */
  publishedAt: string;
  /** Body sections — render as numbered SectionBands. */
  sections: readonly { heading: string; body: string }[];
  /** Optional pull-quote / TL;DR at the top. */
  tldr: string;
  /** Optional related-guide slugs for cross-link block. */
  relatedSlugs: readonly string[];
  primaryKW: string;
};

export const guides: readonly Guide[] = [
  {
    slug: "how-to-use-an-expert-network",
    id: "01",
    name: "HOW TO USE AN EXPERT NETWORK",
    title: "How to Use an Expert Network - 2026 Buyer's Guide",
    description:
      "A practical guide to running expert research projects — briefing, scheduling, compliance, deliverables. For first-time and experienced buyers.",
    oneLiner:
      "Practical playbook for running expert research projects — briefing, scheduling, compliance, deliverables.",
    pageLede:
      "Most expert network buyers learn by getting burned on the first three projects. This guide compresses that learning into the fundamentals that matter — how to brief, how to scope, how to spot a bad call early, and how to extract real value from the engagement.",
    readTime: "12 min read",
    publishedAt: "2026-01-15",
    tldr: "The brief is the lever. Bad briefs make bad calls inevitable. Spend 30 minutes on the brief before the first call and you'll cut your dud-call rate in half.",
    sections: [
      {
        heading: "What an expert network actually is",
        body:
          "An expert network is a marketplace that connects buyers (funds, corporates, consulting firms) with vetted operating professionals (current and ex-employees, specialists, advisors) for paid 1:1 consultations. The network handles sourcing, vetting, scheduling, compliance and payment. Pricing is typically per-call (€500–€1,500) or via subscription/retainer models. The largest players are GLG, AlphaSights, Guidepoint, Third Bridge, Tegus. Boutiques like FieldSignal sit alongside them with different economics and service models.",
      },
      {
        heading: "When to use one vs alternatives",
        body:
          "Use an expert network when you need direct primary-source insight — operator experience, channel reality, customer perception — that you cannot buy as a packaged report. Don't use one when secondary research will suffice (analyst reports, broker research, public filings), when you need quantitative data at scale (use survey panels), or when the question is so narrow you already know the right person to call (just call them directly).",
      },
      {
        heading: "Writing a brief that gets you the right experts",
        body:
          "The brief drives expert quality more than any other factor. A weak brief produces weak experts no matter how good the network is. A strong brief includes: the decision being made (not just the topic), the 5-7 specific questions you need answered, the type of expert (role, seniority, geography), the experts to AVOID (former employer X, named competitors), and a kill-criterion that ends the project if certain findings emerge. Spend 30 minutes on this — it's the highest-leverage 30 minutes of the project.",
      },
      {
        heading: "Scoping the project correctly",
        body:
          "Most first-time buyers over-scope. Five well-prepared expert calls almost always beat fifteen rushed ones. The exception is when you're triangulating noisy or contradictory data — then volume matters. Default: 5–10 calls for a focused question, 15–25 for a market sizing or channel research project, 25+ for full commercial diligence sprints.",
      },
      {
        heading: "Compliance — what to know before the first call",
        body:
          "Reputable networks all enforce: MNPI exclusion (no discussion of material non-public information), 6-month cooling-off for public-company former employees, NDA disclosure, conflict-of-interest screening and per-call attestation. Read your vendor's compliance framework before procurement signs the MSA — if any of those five elements are missing, escalate. Compliance corners get cut at the cheaper end of the market.",
      },
      {
        heading: "What good deliverables look like",
        body:
          "If you're paying for white-glove service, expect: an anonymised expert profile delivered before the call (so you can prep), the call itself with the senior researcher dialled in (not just an analyst), notes or a transcript within 48 hours, and a synthesis document if you've bought a project-level engagement. If you're paying per-call only, you handle the synthesis — that's fine, just know what you're buying.",
      },
      {
        heading: "Spotting a bad call early",
        body:
          "First five minutes are diagnostic. The expert should be able to articulate their direct experience with the topic in under 90 seconds. If they're hedging, citing public sources, or sounding like a consultant explaining the category from analyst reports, end the call politely and ask the network for a replacement. Networks expect this; senior researchers will surface a replacement within 24 hours.",
      },
      {
        heading: "Getting real value out of the engagement",
        body:
          "The best buyers do three things: (1) read your own internal notes from prior calls before each new one so you don't ask the same opening questions, (2) follow up with the network when you notice patterns across calls — they can target new experts on the emerging hypothesis, and (3) close the loop after the decision — tell the network what you decided and why, so they get smarter about your buying criteria.",
      },
    ],
    relatedSlugs: ["expert-network-pricing-explained", "expert-network-compliance-101", "buying-an-expert-network-rfp-template"],
    primaryKW: "how to use an expert network",
  },
  {
    slug: "expert-network-pricing-explained",
    id: "02",
    name: "EXPERT NETWORK PRICING EXPLAINED",
    title: "Expert Network Pricing Explained - What You Actually Pay",
    description:
      "Per-call rates, retainers, project packages and subscription pricing across the major expert networks. What you actually pay and why.",
    oneLiner:
      "Per-call rates, retainers, project packages, subscriptions — what you actually pay across the major networks.",
    pageLede:
      "Expert network pricing is notoriously opaque. Most providers refuse to publish rates and use bespoke quotes to maximise per-client value extraction. This guide breaks down what the major networks actually charge, what drives the differences, and how to evaluate whether you're getting a fair deal.",
    readTime: "10 min read",
    publishedAt: "2026-01-22",
    tldr: "Three pricing axes: per-call rate (€500–€1,500 typical), annual minimum (zero to six figures), and bundled subscription components (transcripts, surveys). Sub-€50k/year buyers should reject any annual minimum — boutiques exist precisely for this profile.",
    sections: [
      {
        heading: "Per-call rates: the core unit economic",
        body:
          "Per-call rates across the major networks cluster between €500 and €1,500 for a 60-minute consultation. Variation reflects expert seniority (a current C-suite executive commands more than a mid-level operator) and category scarcity (rare expertise costs more). Headline rates are similar across GLG, AlphaSights, Third Bridge, Guidepoint and Coleman — the real cost differentiator is everything else.",
      },
      {
        heading: "Annual retainers and minimums",
        body:
          "The big networks impose annual minimums in the low-to-mid six figures for institutional clients. AlphaSights and GLG typically require commitments well above $100k/year. This makes their effective per-call cost much higher than the headline rate for sub-$50k/year buyers — you're paying for capacity you won't use. Boutiques like FieldSignal don't impose annual minimums; you pay only for what you use.",
      },
      {
        heading: "Project packages",
        body:
          "Multi-call engagement packages typically offer 20-40% discount to per-call rates in exchange for a fixed scope. A 10-call diligence sprint at €600/call (€6,000) might be quoted vs €800/call (€8,000) if booked piecemeal. Worth doing if the project scope is genuinely fixed; risky if you'll need to flex.",
      },
      {
        heading: "Subscription pricing",
        body:
          "Transcript-library subscriptions (Tegus, Third Bridge Forum, AlphaSense) start in the high tens of thousands annually for institutional access. Boutique transcript access (FieldSignal at $99/mo) is a fraction of this but with less editorial polish and a smaller library. Survey/panel subscriptions from NewtonX et al are bespoke per programme.",
      },
      {
        heading: "What drives a fair quote",
        body:
          "Your fair-quote variables: (1) annual volume (more calls = better per-call rate), (2) compliance complexity (regulated industries cost more to serve), (3) geographic mix (APAC and emerging markets cost more), (4) expert seniority required, (5) turnaround speed required. If a vendor refuses to quote without an NDA-gated discovery call, that's a flag — published pricing is increasingly the norm.",
      },
      {
        heading: "Negotiation levers",
        body:
          "Levers that work: multi-year commitment, agreed call volume floor, paying annually upfront vs monthly, agreeing to be a public reference or case study, accepting transcript-only as an alternative to live calls where appropriate. Levers that don't work: aggressive haggling on individual call rates (those are largely fixed by what the network pays the expert), demanding the SLA you'd expect from a Tier-1 institutional account when you're a sub-$50k/year client.",
      },
      {
        heading: "Red flags in pricing models",
        body:
          "Avoid: vendors who won't reveal per-call rates until contract signature; aggressive year-2 escalator clauses without volume protection; bundled commitments that include products you don't need (e.g. surveys forced into a calls budget); per-call rates that vary substantially between similar experts without clear justification.",
      },
    ],
    relatedSlugs: ["buying-an-expert-network-rfp-template", "how-to-use-an-expert-network", "expert-networks-for-vcs"],
    primaryKW: "expert network pricing",
  },
  {
    slug: "expert-network-compliance-101",
    id: "03",
    name: "EXPERT NETWORK COMPLIANCE 101",
    title: "Expert Network Compliance 101 - MNPI, GDPR and ESMA",
    description:
      "The compliance framework every expert network must operate under — and what to verify before signing an MSA. MNPI, GDPR, ESMA, audit trail.",
    oneLiner:
      "The compliance framework every network must operate under — MNPI, GDPR, ESMA, audit trail.",
    pageLede:
      "Expert network compliance is not optional. The institutional buyers (hedge funds, asset managers, large corporates) require it; the smaller buyers ignore it at their peril. This guide walks through the five compliance elements every reputable network must operate, and the specific things you should verify before signing an MSA.",
    readTime: "11 min read",
    publishedAt: "2026-01-29",
    tldr: "Five required elements: MNPI screening, cooling-off enforcement, NDA disclosure, conflict screening, per-call attestation. Missing any of them = walk away.",
    sections: [
      {
        heading: "Why expert network compliance matters",
        body:
          "Expert networks have been at the centre of several insider-trading prosecutions historically — the Galleon case in 2009 being the most famous. The industry response has been a robust, externally-audited compliance framework that's now table-stakes for any vendor selling to institutional clients. If you're a fund, you're an obvious target for regulator scrutiny on this. If you're a corporate, your IP-protection obligations apply too. Compliance isn't optional.",
      },
      {
        heading: "Element 1 — MNPI screening",
        body:
          "Material non-public information (MNPI) cannot be discussed in expert calls. The expert must attest pre-call that they hold no MNPI on the topic. The network must screen briefs against current-employee restrictions and against active inside-list periods at publicly-traded companies. Any vendor that doesn't explicitly screen for MNPI is unfit for institutional use.",
      },
      {
        heading: "Element 2 — Cooling-off periods",
        body:
          "A standard 6-month cooling-off period applies from departure date before a former employee of a publicly-traded company can be matched to a brief discussing that specific employer. Some networks enforce longer (12 months) for sensitive sectors. Shorter cooling-off (3 months) is common for non-public employers. The cooling-off rule is the single most-cited compliance protection in fund compliance documentation.",
      },
      {
        heading: "Element 3 — NDA and confidentiality disclosure",
        body:
          "Experts must disclose active NDAs that restrict what they can discuss. They must not discuss content that would breach an active NDA. The per-call attestation captures this. From the buyer side: expect the expert to politely decline specific questions citing 'I'm under NDA on that' — this is normal and protects both parties.",
      },
      {
        heading: "Element 4 — Conflict-of-interest screening",
        body:
          "Experts must disclose current commercial relationships with the topic company (board seats, advisory roles, current consulting engagements, equity holdings above a documented threshold). The network must surface these to the buyer pre-call. Some conflicts kill the match; others can be disclosed and the call proceeds. The right answer depends on the buyer's use case and is the buyer's decision.",
      },
      {
        heading: "Element 5 — Per-call attestation + audit trail",
        body:
          "Every call generates a documented attestation from the expert (covering MNPI, NDA, conflicts) and an audit-trail record retained for 7 years. The record includes the brief, expert profile, call recording (if consented), notes and post-call review. Regulators can request this and reputable vendors produce it on demand. If your vendor can't show you a sample audit-trail record before contract, walk away.",
      },
      {
        heading: "GDPR and data-protection layer",
        body:
          "On top of the five elements above, GDPR (and equivalent in other jurisdictions) governs how the network handles expert and client personal data. Data residency in the EU should be the default for European buyers. Standard contractual clauses cover international transfers. EU-domiciled boutiques (like FieldSignal) often have a procurement-friction advantage here for European clients.",
      },
      {
        heading: "Sector-specific overlays",
        body:
          "Healthcare KOL work follows ABPI (UK) / PhRMA (US) disclosure standards. Financial services follows MAR (EU) / Reg FD (US) restrictions. Defense work follows ITAR / export-control rules. The vendor should present sector-specific overlays in the per-call attestation when relevant.",
      },
      {
        heading: "What to verify before signing the MSA",
        body:
          "Ask for: (a) a sample audit-trail record (anonymised), (b) the most recent external compliance audit report, (c) the cooling-off policy in writing, (d) the conflict-of-interest disclosure threshold in writing, (e) confirmation of data residency and standard contractual clauses for international transfers. Reputable vendors supply these in 48 hours.",
      },
    ],
    relatedSlugs: ["how-to-use-an-expert-network", "buying-an-expert-network-rfp-template", "expert-network-pricing-explained"],
    primaryKW: "expert network compliance",
  },
  {
    slug: "expert-interview-question-templates",
    id: "04",
    name: "EXPERT INTERVIEW QUESTION TEMPLATES",
    title: "Expert Interview Question Templates - 50+ Examples",
    description:
      "Tested question templates for expert calls across competitive intel, market sizing, win-loss, due diligence and product research.",
    oneLiner:
      "Tested question templates across CI, sizing, win-loss, DD and product research.",
    pageLede:
      "Most expert calls underperform because the questions are too generic, too leading, or too dependent on the expert's memory. The templates below come from 200+ structured expert engagements and are designed to surface ground-truth insight quickly. Adapt to your context — don't read them as a script.",
    readTime: "15 min read",
    publishedAt: "2026-02-05",
    tldr: "Three rules: ask about specific past behaviour not future opinion, ask for examples before asking for patterns, save the killer question for after rapport. Templates below.",
    sections: [
      {
        heading: "The three rules of expert questioning",
        body:
          "Rule 1: Ask about past behaviour, not future opinion. 'When was the last time you switched vendor X for vendor Y, and what triggered it?' beats 'Would you switch from X to Y?' Rule 2: Ask for examples before patterns. 'Tell me about a specific deal you lost to competitor A' beats 'How does competitor A compete?'. Rule 3: Save the killer question for minute 45+ — by then rapport is established and the expert is more candid.",
      },
      {
        heading: "Opening questions (universal)",
        body:
          "1. 'In 60 seconds, what's your direct experience with [topic]?' (tests whether the expert is the right one in the first 90 seconds). 2. 'When did you last work directly on [topic] — what was the situation?' 3. 'What's the single most surprising thing you've learned about [topic] in the last year?' 4. 'What would you tell a junior colleague joining this category that you wish someone had told you?'",
      },
      {
        heading: "Competitive intelligence questions",
        body:
          "1. 'Walk me through the last deal you won or lost involving [competitor]. What tipped it?' 2. 'Where is [competitor] actually beating [client] in the buyer's mind, and where are they perceived weaker?' 3. 'Who are the 2-3 competitors emerging that nobody's tracking yet?' 4. 'If you ran [competitor], what would be the first thing you'd change?' 5. 'Where are [competitor]'s customers most unhappy?'",
      },
      {
        heading: "Market sizing questions",
        body:
          "1. 'How many real buyers are there for [category] in [geography]?' 2. 'What's a typical deal size and contract length?' 3. 'How fragmented is the buyer base — what fraction is concentrated in the top 50 accounts?' 4. 'Where in the value chain does the margin actually sit?' 5. 'What's the realistic 3-year category growth rate by sub-segment, in your view?'",
      },
      {
        heading: "Win-loss questions",
        body:
          "1. 'Walk me through the decision process for the deal you closed/declined.' 2. 'Who else was in the consideration set?' 3. 'What was the single biggest factor in the final decision?' 4. 'What would have to have been different for the outcome to flip?' 5. 'How did the post-decision experience compare to expectations?'",
      },
      {
        heading: "Due diligence questions (customer reference)",
        body:
          "1. 'How long have you used [target's] product/service?' 2. 'What was the situation that led you to buy?' 3. 'How has the relationship evolved — what's gotten better, what's gotten worse?' 4. 'How likely are you to renew, and on what terms?' 5. 'What would the competitor have to offer to make you switch?'",
      },
      {
        heading: "Product research questions",
        body:
          "1. 'When you considered solutions in this category, what alternatives did you evaluate?' 2. 'What features were dealmakers / dealbreakers?' 3. 'What's the most frustrating part of using [category solution] today?' 4. 'If you could redesign [feature], what would you change?' 5. 'Walk me through a typical use case end-to-end.'",
      },
      {
        heading: "Channel and pricing questions",
        body:
          "Channel: 'Walk me through how product moves from manufacturer to end customer in this category — who takes what margin?' Pricing: 'How does pricing actually get set — by sales rep discretion, by category manager, by tender?'; 'What's the price-sensitivity threshold above which the buyer walks away?'",
      },
      {
        heading: "Closing questions",
        body:
          "1. 'Who else should I be talking to who's done this from a different angle?' 2. 'What question should I have asked that I didn't?' 3. 'If you were running this research project, what would you do next?' These three are the single highest-ROI minute of any expert call.",
      },
    ],
    relatedSlugs: ["how-to-use-an-expert-network", "running-a-voice-of-customer-program", "win-loss-analysis-template"],
    primaryKW: "expert interview questions",
  },
  {
    slug: "primary-vs-secondary-research",
    id: "05",
    name: "PRIMARY vs SECONDARY RESEARCH",
    title: "Primary vs Secondary Research - When to Use Each",
    description:
      "Practical framework for choosing primary research (expert calls, surveys, interviews) vs secondary research (analyst reports, broker research) by use case.",
    oneLiner:
      "When to invest in expert calls vs lean on analyst reports — by use case.",
    pageLede:
      "Most research budgets are spent on the wrong type of research for the decision being made. This guide gives you a practical framework for choosing between primary (calls, surveys, interviews) and secondary (analyst reports, broker research, public filings) by use case.",
    readTime: "8 min read",
    publishedAt: "2026-02-12",
    tldr: "Default: secondary first to map the landscape, primary second to test the specific hypothesis that matters. Skip secondary only when speed matters more than context.",
    sections: [
      {
        heading: "What each type is good for",
        body:
          "Secondary research (analyst reports, broker research, regulatory filings, public databases): broad landscape mapping, established categories, quantitative benchmarks at scale, history. Primary research (expert calls, customer interviews, surveys, channel checks): specific operator reality, emerging categories without coverage, ground-truth on assumptions, anything where the published narrative is suspect.",
      },
      {
        heading: "Use case 1 — Entering a new category",
        body:
          "Mostly secondary first. Read the existing analyst coverage, scan public competitor filings, build a baseline of the category's size and structure from desk research. Then run primary to test the 3-5 most fragile assumptions. This sequence works because secondary is fast and cheap; you don't want to burn primary research budget mapping ground that's already mapped.",
      },
      {
        heading: "Use case 2 — Buy-side due diligence",
        body:
          "Mostly primary. Customer reference work, supplier interviews, off-list management refs, channel checks. Secondary is supporting context — you've already decided the deal is worth investigating, so the work is now around testing the management narrative, not mapping the category.",
      },
      {
        heading: "Use case 3 — Pricing research",
        body:
          "Almost entirely primary. Published pricing data is unreliable in B2B because real prices are negotiated. You need customer and channel interviews to understand actual willingness-to-pay, discount behaviour and price-sensitivity thresholds. Secondary research on pricing typically tells you the list price, which is the price almost nobody pays.",
      },
      {
        heading: "Use case 4 — Competitive intelligence",
        body:
          "Mixed. Use secondary for ongoing structural monitoring (10-K filings, press releases, analyst notes). Use primary for the questions that secondary can't answer: where is the competitor actually winning deals, what's their channel partner sentiment, what's the practitioner view of their product. Continuous CI programmes typically blend both.",
      },
      {
        heading: "When to skip secondary entirely",
        body:
          "Two cases: (1) speed-to-decision matters more than completeness — you have 48 hours to inform an IC and there's no time to build context properly; (2) the category is so new that no secondary research worth reading exists. In both cases, run primary directly and accept the lower context.",
      },
      {
        heading: "Cost framework",
        body:
          "Secondary research costs: subscription to one or two databases (analyst, broker research, regulatory) — typically €10–€50k/year/seat. Primary research costs: €500–€1,500 per call; project packages €10–€40k. For a typical strategic decision, you'd spend €5k on secondary and €15–€30k on primary. Reversing those ratios usually means you're under-investing in primary.",
      },
    ],
    relatedSlugs: ["how-to-use-an-expert-network", "competitive-intelligence-frameworks", "commercial-due-diligence-playbook"],
    primaryKW: "primary vs secondary research",
  },
  {
    slug: "buying-an-expert-network-rfp-template",
    id: "06",
    name: "BUYING AN EXPERT NETWORK (RFP TEMPLATE)",
    title: "Buying an Expert Network - RFP Template and Scoring",
    description:
      "Practical RFP template + scoring rubric for buying expert network services. 22 evaluation criteria, weighted, with example answers.",
    oneLiner:
      "RFP template + 22-criterion scoring rubric for buying expert network services.",
    pageLede:
      "Most expert network RFPs are too generic to produce useful comparison. The vendors all answer 'yes' to every capability question; differentiation gets lost. This template focuses on the 22 evaluation criteria that actually predict project success.",
    readTime: "11 min read",
    publishedAt: "2026-02-19",
    tldr: "Don't ask 'can you do X?' (everyone says yes). Ask 'show me a sample of X' or 'walk me through how X works in practice.' Sample-based questions cut through marketing.",
    sections: [
      {
        heading: "Section 1 — Network and supply",
        body:
          "1. Total network size and growth trajectory (with documented evidence). 2. Coverage map by sector, geography and seniority. 3. Sample expert profiles (3 per priority category — anonymised). 4. Average time from brief to first call (over last 90 days). 5. Replacement rate if first expert is unsuitable.",
      },
      {
        heading: "Section 2 — Compliance",
        body:
          "6. Documented compliance framework (cooling-off, MNPI, conflicts, NDA). 7. Sample audit-trail record (anonymised). 8. Most recent external audit report. 9. Sector-specific compliance overlays (healthcare KOL, financial services MAR, defense ITAR). 10. Data residency options and standard contractual clauses for international transfers.",
      },
      {
        heading: "Section 3 — Service model",
        body:
          "11. Account team structure (senior researcher direct or via account-manager triage?). 12. Project-handling capacity at peak load (how many concurrent active projects?). 13. SLA on response times and turnaround commitments. 14. Briefing format support (written brief, kick-off call, both). 15. Deliverable format options (notes, transcripts, synthesis docs).",
      },
      {
        heading: "Section 4 — Pricing transparency",
        body:
          "16. Published per-call rate range. 17. Annual minimum (if any) and how it's calculated. 18. Project package discounts and structures. 19. Subscription components and whether they're bundled. 20. Year-2 escalator clauses.",
      },
      {
        heading: "Section 5 — Operating maturity",
        body:
          "21. Three reference clients in similar segments to yours (with permission to contact). 22. Sample project history with anonymised outcomes — what worked, what didn't.",
      },
      {
        heading: "Scoring rubric (suggested weighting)",
        body:
          "Compliance: 25%. Service model + account team: 25%. Pricing transparency: 20%. Network coverage relevant to your use case: 20%. References + operating maturity: 10%. Be wary of any vendor scoring above 9/10 on every criterion — perfect scores usually reflect marketing rather than capability.",
      },
      {
        heading: "Common RFP traps to avoid",
        body:
          "Trap 1: weighting network size too high (above 1M is largely indistinguishable; what matters is depth in your specific category). Trap 2: weighting compliance as a checkbox (it's binary — they have it or they don't, weight isn't the right framing). Trap 3: not testing the service model with a real brief during the RFP. Trap 4: relying on vendor-provided references only — go find your own contacts at the vendor's claimed clients.",
      },
      {
        heading: "Running the bake-off",
        body:
          "After the RFP narrows to 2-3 finalists, run a paid pilot project with each — same brief, same deliverable expectation, same timeline. Cost: €5-10k per finalist. This single exercise will tell you more about vendor fit than any document-based RFP can. Don't skip it.",
      },
    ],
    relatedSlugs: ["expert-network-pricing-explained", "expert-network-compliance-101", "how-to-use-an-expert-network"],
    primaryKW: "expert network RFP",
  },
  {
    slug: "competitive-intelligence-frameworks",
    id: "07",
    name: "COMPETITIVE INTELLIGENCE FRAMEWORKS",
    title: "Competitive Intelligence Frameworks - 7 That Actually Work",
    description:
      "Seven CI frameworks tested across 30+ continuous CI programmes. When each works, where each fails, and how to combine them.",
    oneLiner:
      "Seven CI frameworks that actually deliver — tested across 30+ continuous CI programmes.",
    pageLede:
      "Most CI frameworks taught in MBA programmes are too generic to produce useful intelligence in real continuous programmes. The seven below are tested in actual buyer-facing CI work and produce findings that survive in front of a CEO or IC.",
    readTime: "13 min read",
    publishedAt: "2026-02-26",
    tldr: "Pick 2-3 frameworks for your programme, not 7. Each framework has a specific lens. Mixing too many produces noise.",
    sections: [
      {
        heading: "Framework 1 — Channel-side reality",
        body:
          "Map the channel: who sells the competitor's product, what margin do they earn, what's their satisfaction, and what alternative products are they pushing harder. Channel partners speak more candidly about competitors than competitors' own customers do. Operates on quarterly cadence with 5-8 partner interviews per quarter. Best for: B2B categories with material indirect-channel share.",
      },
      {
        heading: "Framework 2 — Lost-deal post-mortems",
        body:
          "Independent third-party interviews with buyers who chose the competitor over you. Goal: surface the actual decision criterion and where the alternative won, not the polite reason the buyer told your sales team. Operates on continuous cadence (every lost deal in the segment). Best for: categories where your sales team's loss reasons feel suspiciously uniform.",
      },
      {
        heading: "Framework 3 — Customer-base health monitoring",
        body:
          "Annual or semi-annual interviews with a sample of the competitor's known customers. Goal: track retention sentiment, identify customers actively shopping, surface emerging dissatisfaction. Operates on annual cadence with 10-20 customer touches. Best for: long-cycle B2B where switching costs are high but real.",
      },
      {
        heading: "Framework 4 — Ex-employee operating signal",
        body:
          "Interview recent ex-employees of the competitor (with appropriate cooling-off enforcement) about how the company actually operates. Goal: identify operational stress, strategic shifts not yet public, key-person risk. Operates on continuous cadence (every relevant departure). Best for: tracking competitors that are larger or earlier-stage than yours.",
      },
      {
        heading: "Framework 5 — Pricing telemetry",
        body:
          "Continuous channel and customer interviews focused specifically on actual transacted prices, discount behaviour and contract terms. Public pricing is meaningless in B2B; this surfaces real prices. Operates on quarterly cadence. Best for: categories with opaque pricing and material discount discretion at the sales-rep level.",
      },
      {
        heading: "Framework 6 — Product comparison teardowns",
        body:
          "Structured comparison interviews with users of both your product and the competitor's. Goal: surface specific feature gaps that drive switching or evaluation outcomes. Operates on quarterly cadence with 8-15 user interviews. Best for: product-led growth categories where feature differentiation is the buying criterion.",
      },
      {
        heading: "Framework 7 — Strategic-narrative tracking",
        body:
          "Quarterly synthesis of the competitor's public narrative (earnings calls, conference talks, leadership podcasts, hiring patterns) cross-referenced with operator-interview signal. Goal: identify when the public narrative diverges from operating reality. Operates on quarterly cadence. Best for: tracking publicly-traded competitors where the public narrative is heavily managed.",
      },
      {
        heading: "Combining frameworks in a CI programme",
        body:
          "A real CI programme runs 2-3 frameworks continuously, not all seven. Pick by competitor importance and buying motion. A typical mid-market B2B CI programme might run Channel-side reality + Lost-deal post-mortems + Pricing telemetry. A consumer-products CI programme might run Customer-base health + Product comparison + Strategic-narrative tracking. Choose based on where your blind spots actually are.",
      },
      {
        heading: "What good CI deliverables look like",
        body:
          "Monthly executive briefing (1-2 pages, 4-5 specific findings + recommendations). Quarterly deep-dive on one priority competitor. Annual programme review identifying which frameworks produced highest-value insight and which to drop. Live battle cards refreshed every 90 days — never quarterly-but-six-months-late.",
      },
    ],
    relatedSlugs: ["primary-vs-secondary-research", "win-loss-analysis-template", "running-a-voice-of-customer-program"],
    primaryKW: "competitive intelligence frameworks",
  },
  {
    slug: "running-a-voice-of-customer-program",
    id: "08",
    name: "RUNNING A VOICE OF CUSTOMER PROGRAM",
    title: "Running a Voice of Customer Program - Step-by-Step",
    description:
      "Step-by-step guide to designing and running a programmatic VoC programme that surfaces what customers won't tell your account team.",
    oneLiner:
      "Step-by-step guide to programmatic VoC that surfaces what customers won't tell your account team.",
    pageLede:
      "Most VoC programmes inside companies are either glorified NPS surveys or one-off projects that fade after the first year. This guide walks through how to design a programmatic VoC engine that produces continuously useful insight — and the specific governance choices that determine whether the programme survives year 2.",
    readTime: "12 min read",
    publishedAt: "2026-03-05",
    tldr: "Programmatic = quarterly cadence, third-party interviewers, 15-40 calls per cycle, structured findings, executive review every 90 days. Anything less is project-based VoC pretending to be a programme.",
    sections: [
      {
        heading: "What programmatic VoC actually means",
        body:
          "Programmatic = recurring cycle, fixed methodology, structured findings that compare period-over-period. The opposite is project-based VoC, which is a one-off and doesn't build longitudinal insight. The programmatic version costs more in year 1 (you're standing up the infrastructure) and dramatically more in year 2+ (compounding insight).",
      },
      {
        heading: "Step 1 — Define what you're actually measuring",
        body:
          "VoC programmes that try to measure everything produce nothing useful. Pick 3-5 themes that matter to your annual strategy. Examples: 'product gap perception by segment', 'pricing tolerance and willingness-to-pay', 'competitive consideration set', 'switching trigger events'. The themes inform the interview guide. Re-evaluate themes annually.",
      },
      {
        heading: "Step 2 — Choose the customer cohort design",
        body:
          "Four typical cohort designs: (a) recent buyers (last 6 months), (b) at-risk renewals, (c) recently churned, (d) longest-tenured customers. A balanced programme runs 2-3 of these per quarter. Sample size: 15-40 calls per quarter depending on segmentation granularity.",
      },
      {
        heading: "Step 3 — Third-party vs internal interviewers",
        body:
          "Use third-party interviewers. Customers will not tell your account team or product team the truth — partly out of politeness, partly because they don't want to damage the working relationship. Independent interviewers get materially more candid answers. Cost: ~€500-€800 per call all-in, including synthesis. ROI ratio is favourable: missing one bad renewal pays for the year of VoC.",
      },
      {
        heading: "Step 4 — Interview guide design",
        body:
          "Structure: warm-up (situation context), behaviour (recent decisions and triggers), perception (how they describe you to peers), future intent (renewal, expansion, churn signals). Open-ended questions, behavioural focus, minimal direct ranking questions. The killer question every quarter: 'Walk me through the most recent conversation you had with a peer about [category solution].' Pure gold for surfacing word-of-mouth narratives.",
      },
      {
        heading: "Step 5 — Synthesis and findings format",
        body:
          "Each quarter: rolled-up themes with verbatim quotes, segmented by customer type. Period-over-period comparison where samples permit. Specific recommendations for product, sales and CS leadership. Keep the executive deliverable to 5-8 pages — VoC findings die when the document is too long.",
      },
      {
        heading: "Step 6 — Governance + executive review",
        body:
          "The single biggest predictor of VoC programme survival year-2: a 60-minute quarterly executive review where 4-5 senior leaders read findings, discuss action and assign owners. Programmes without this discipline fade within 12 months. Programmes with this discipline compound.",
      },
      {
        heading: "Step 7 — Closing the loop with customers",
        body:
          "When VoC findings drive a product or service change, tell customers about it. Doesn't need to be public — even a quiet email to the specific customers who raised the issue. This drives next-quarter participation rates dramatically. Customers participate when they see action.",
      },
      {
        heading: "Common VoC failure modes",
        body:
          "Failure 1: trying to use VoC as a marketing tool ('what do customers love about us?') rather than an insight tool ('where are we exposed?'). Failure 2: letting product or sales pick the customer cohort (selection bias kills the signal). Failure 3: cancelling a quarter because the team is busy — once you skip, programmes rarely recover. Failure 4: failing to budget for year-2; programmatic VoC is a 3-year commitment minimum.",
      },
    ],
    relatedSlugs: ["competitive-intelligence-frameworks", "win-loss-analysis-template", "expert-interview-question-templates"],
    primaryKW: "voice of customer program",
  },
] as const;

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
