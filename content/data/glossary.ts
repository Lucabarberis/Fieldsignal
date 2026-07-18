/**
 * Glossary — SEO brief §4.13.2.
 *
 * Each term page targets long-tail "what is X" queries that drive
 * persistent search traffic. Per brief: definition (one paragraph),
 * longer explanation (3-5 paragraphs), examples, related terms,
 * FAQ block with 3 Qs. Each term links to one service and one use case.
 */

export type GlossaryTerm = {
  slug: string;
  id: string;
  /** Canonical term, e.g. "Material Non-Public Information (MNPI)". */
  term: string;
  /** UPPERCASE name for the tile, e.g. "MNPI". */
  name: string;
  title: string;
  description: string;
  /** One-paragraph plain-language definition (renders as lede). */
  definition: string;
  /** 3-5 explanatory paragraphs. */
  explanation: readonly string[];
  /** Concrete examples. */
  examples: readonly string[];
  /** FAQ entries — 3 questions per term. */
  faq: readonly { q: string; a: string }[];
  /** Cross-link to one service slug and one use-case slug per brief. */
  linkedServiceSlug?: string;
  linkedUseCaseSlug?: string;
  /** Related glossary terms. */
  relatedSlugs: readonly string[];
  primaryKW: string;
};

export const glossary: readonly GlossaryTerm[] = [
  {
    slug: "expert-network",
    id: "01",
    term: "Expert Network",
    name: "EXPERT NETWORK",
    title: "What Is an Expert Network? - FieldSignal Glossary",
    description:
      "An expert network connects buyers with vetted operating professionals for paid 1:1 consultations. Definition, examples and FAQ.",
    definition:
      "An expert network is a marketplace that connects buyers (investment funds, corporates, consulting firms) with vetted operating professionals — current and former employees, industry specialists, ex-regulators — for paid 1:1 consultations.",
    explanation: [
      "Expert networks emerged in the late 1990s to formalise a practice that had operated informally for decades: institutional investors paying industry insiders for primary-source insight on companies and markets.",
      "The modern expert network handles sourcing, vetting, scheduling, compliance and payment. Buyers pay per call (€500-€1,500 typical), via project packages, or via annual retainer/subscription. Experts are paid hourly at rates from €150 to €1,500 depending on seniority and category scarcity.",
      "Major players include GLG, AlphaSights, Guidepoint, Third Bridge, Tegus, Coleman Research and Mosaic. Boutique providers like FieldSignal serve buyers who don't fit the major networks' retainer-economics — emerging managers, startups, mid-market corporates.",
      "Compliance is the defining infrastructure of the industry. Post-Galleon, expert networks operate under a documented compliance framework — MNPI screening, cooling-off periods, NDA disclosure, conflict-of-interest screening, per-call attestation and a 7-year audit trail — that makes them viable infrastructure for institutional clients.",
    ],
    examples: [
      "A PE fund commissions 12 expert calls for commercial due diligence on a healthcare target",
      "A hedge fund analyst speaks with 4 ex-employees of a publicly-traded software company to test their short thesis",
      "A corporate strategy team runs a 30-call channel research project on a new market entry",
      "A boutique consultancy supplements its sector bench by calling experts on adjacent verticals through a network",
    ],
    faq: [
      {
        q: "How is an expert network different from a consultancy?",
        a: "A consultancy synthesises and analyses on your behalf. An expert network connects you to the operator directly. The expert call is raw input; you do the synthesis. Most strategic teams use both.",
      },
      {
        q: "Is using an expert network legal?",
        a: "Yes, when compliance is enforced properly. The risk is when MNPI controls fail. All reputable networks operate compliance frameworks that institutional buyers' compliance teams have approved.",
      },
      {
        q: "How much does it cost to use one?",
        a: "From $200 per call at the boutique end up to six-figure annual retainers at the institutional end. Per-call pricing without minimums is now widely available; the retainer-only model is rare.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["primary-research", "key-opinion-leader-kol", "panel-call"],
    primaryKW: "expert network",
  },
  {
    slug: "key-opinion-leader-kol",
    id: "02",
    term: "Key Opinion Leader (KOL)",
    name: "KOL",
    title: "What Is a KOL? Key Opinion Leader Definition - FieldSignal",
    description:
      "Key Opinion Leader (KOL) — a recognised expert whose endorsement or analysis carries weight in a category. Common in healthcare and pharma.",
    definition:
      "A Key Opinion Leader (KOL) is a recognised authority in a specific field whose published work, professional reputation and peer recognition give their views disproportionate influence over the practices of others in the field.",
    explanation: [
      "The KOL concept originated in pharmaceutical marketing and is most strongly associated with healthcare — leading physicians, clinical researchers and academic specialists whose endorsement shapes prescribing behaviour and treatment guidelines.",
      "Beyond healthcare, the term has expanded to cover analogous figures in technology, finance, energy and other categories where deep specialisation produces market-moving views. In all cases, KOLs are identified by published work, conference presence, peer citations and demonstrable influence on category practice.",
      "Expert networks maintain dedicated KOL panels in regulated industries because the compliance overlay for KOL work is more demanding than general expert sourcing. In healthcare, KOL engagements follow ABPI/PhRMA disclosure standards. In financial services, KOLs are screened against insider lists.",
      "Buyers of KOL services pay a premium (often 2-3x standard expert-network rates) reflecting the KOL's market reputation, time scarcity and the compliance overhead. A typical KOL engagement might be a 60-minute consultation, a written advisory note, or an extended programmatic engagement.",
    ],
    examples: [
      "A leading oncologist consulted by a pharmaceutical company on prescribing patterns for a new biologic",
      "A former CIO of a Fortune 500 bank consulted by a fintech investor on enterprise IT-buying behaviour",
      "A respected industry analyst (ex-Gartner) consulted on the competitive dynamics of a cloud-infrastructure category",
      "A retired regulator consulted on the realistic implementation timeline of a pending healthcare reform",
    ],
    faq: [
      {
        q: "How does a KOL differ from a regular industry expert?",
        a: "KOLs have demonstrable public influence — published work, conference visibility, peer citations. Regular experts have operating experience but less public footprint. KOLs cost more and have more compliance overhead.",
      },
      {
        q: "Are KOLs always doctors?",
        a: "No. The term originated in pharma but now covers analogous figures in tech, finance, energy and other regulated or research-intensive industries.",
      },
      {
        q: "How do expert networks vet KOLs?",
        a: "Through documented publication history, peer-citation analysis, conference programme inclusion, and (in healthcare) disclosure of pharmaceutical-industry relationships per ABPI/PhRMA rules.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "regulatory-and-policy-research",
    relatedSlugs: ["expert-network", "primary-research", "conflict-of-interest"],
    primaryKW: "key opinion leader",
  },
  {
    slug: "material-non-public-information-mnpi",
    id: "03",
    term: "Material Non-Public Information (MNPI)",
    name: "MNPI",
    title: "What Is MNPI? Material Non-Public Information - FieldSignal",
    description:
      "MNPI — Material Non-Public Information. Information that, if public, would move a security's price. Cannot be discussed in expert calls.",
    definition:
      "Material Non-Public Information (MNPI) is information about a publicly-traded company that has not been disclosed to the market and would, if disclosed, be likely to affect the company's share price. Discussing MNPI in expert calls is a regulatory violation.",
    explanation: [
      "MNPI is the central compliance concept in expert-network work. Reputable networks have a primary obligation to ensure no MNPI is exchanged during paid consultations between experts and institutional clients.",
      "The 'material' test is forward-looking: information is material if a reasonable investor would consider it important to the decision to buy, sell or hold the security. The 'non-public' test is binary: has the information been disclosed via channels that reach the broader market?",
      "Current employees of publicly-traded companies cannot discuss their employer in expert calls because they presumptively hold MNPI. Recently-departed employees enter a cooling-off period (typically 6 months) before they can discuss their former employer; the cooling-off recognises that MNPI degrades in value over time.",
      "MNPI rules apply across jurisdictions. The US enforces under SEC Rule 10b-5 and Reg FD. The EU enforces under the Market Abuse Regulation (MAR). The UK applies analogous standards under FSMA. Reputable expert networks design their compliance framework to satisfy all major jurisdictions simultaneously.",
    ],
    examples: [
      "Confirmed but unannounced acquisition discussions — MNPI",
      "Unannounced earnings results for the previous quarter — MNPI",
      "Unannounced major customer wins or losses that would move guidance — MNPI",
      "General industry trends already discussed in public analyst reports — NOT MNPI",
      "Personal opinions on category dynamics based on public information — NOT MNPI",
    ],
    faq: [
      {
        q: "What happens if an expert accidentally shares MNPI in a call?",
        a: "Reputable networks have protocols: terminate the call immediately, isolate the recipient from trading activity, escalate to compliance, document the incident. The expert is typically removed from the network.",
      },
      {
        q: "Does MNPI apply to private companies?",
        a: "The strict legal definition applies to publicly-traded securities. But private companies often have analogous confidentiality obligations via NDAs, and the per-call attestation captures both.",
      },
      {
        q: "How do networks screen for MNPI risk?",
        a: "Through brief-vs-expert screening (e.g. excluding current employees of the topic company), cooling-off enforcement, per-call attestations, and real-time monitoring on regulated trading desks.",
      },
    ],
    linkedServiceSlug: "compliance-framework",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["cooling-off-period", "expert-attestation", "compliance-framework"],
    primaryKW: "MNPI",
  },
  {
    slug: "primary-research",
    id: "04",
    term: "Primary Research",
    name: "PRIMARY RESEARCH",
    title: "What Is Primary Research? Definition + Examples - FieldSignal",
    description:
      "Primary research is original data collected directly from operators, customers, channels — vs secondary research which uses existing published sources.",
    definition:
      "Primary research is original data collected directly from sources — operators, customers, channel partners, ex-employees, end users — rather than synthesised from existing published sources. Expert calls, customer interviews, surveys and channel checks are all forms of primary research.",
    explanation: [
      "Primary research is the alternative to secondary research, which relies on already-published sources (analyst reports, regulatory filings, broker research, industry databases). The two are complementary, not substitutes.",
      "Primary research is more expensive per data point but produces insight that's specific to your question. Secondary research is cheaper per data point but generic to the question being asked. Most strategic decisions blend both — secondary to map the landscape, primary to test specific assumptions.",
      "The growth of expert networks over the last 25 years has industrialised primary research. What was once an informal practice of executives calling their industry contacts is now a structured marketplace with documented compliance and audit trails.",
      "Primary research is dominant in due-diligence work, voice-of-customer programmes, pricing research, competitive intelligence and any context where the published narrative is suspect or insufficient.",
    ],
    examples: [
      "Twelve 1:1 expert calls with operators in a target industry for buy-side diligence",
      "Thirty customer interviews to validate willingness-to-pay before a product launch",
      "Survey panel of 200 B2B buyers to test category awareness and consideration",
      "Channel research with 8 distributors mapping competitive partner economics",
    ],
    faq: [
      {
        q: "Is primary research always better than secondary?",
        a: "No. Use secondary when the question is well-covered in existing sources. Use primary when the published narrative is suspect or the question requires operator-level specificity that secondary can't provide.",
      },
      {
        q: "How long does a typical primary research project take?",
        a: "2-6 weeks depending on scope. A focused expert-call project might take 2 weeks. A full commercial diligence sprint or programmatic VoC programme might run 4-6 weeks per cycle.",
      },
      {
        q: "What does primary research typically cost?",
        a: "€500-€1,500 per expert call. €10,000-€50,000 for typical project engagements. Programmatic engagements (annual subscriptions, continuous programmes) range €20,000-€100,000+/year.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["secondary-research", "expert-network", "voice-of-customer"],
    primaryKW: "primary research",
  },
  {
    slug: "secondary-research",
    id: "05",
    term: "Secondary Research",
    name: "SECONDARY RESEARCH",
    title: "What Is Secondary Research? Definition + Examples - FieldSignal",
    description:
      "Secondary research synthesises existing published sources — analyst reports, broker research, regulatory filings, industry databases.",
    definition:
      "Secondary research is research built from existing published sources — analyst reports, broker research, regulatory filings, industry databases, news archives — rather than from newly-collected primary data.",
    explanation: [
      "Secondary research is faster and cheaper than primary research, but generic to the question being asked. It's the natural starting point for landscape mapping and context-setting, and the natural complement to primary research when specific operator-level insight is needed.",
      "Major secondary-research databases include Bloomberg, FactSet, S&P Capital IQ, Gartner, Forrester, IDC, Euromonitor and a long tail of sector-specific databases. Sell-side broker research is another important secondary-research category, particularly for publicly-traded companies.",
      "The skill in secondary research is triangulation — combining multiple sources to identify the consensus narrative and the points where reputable sources disagree. Disagreements between secondary sources are often the most useful signal, because they identify the questions worth investigating via primary research.",
      "Common failure modes: relying on a single source's framing as gospel, treating analyst category sizings as fact rather than methodology-dependent estimates, missing the gap between published list-prices and actual transacted prices in B2B categories.",
    ],
    examples: [
      "Reading Gartner Magic Quadrant reports to map the competitive landscape in enterprise software",
      "Pulling 10-K filings to understand a target company's revenue concentration and customer mix",
      "Building a market-size estimate from Euromonitor category data adjusted for sub-segmentation",
      "Reviewing broker research to surface the sell-side consensus narrative on a public company",
    ],
    faq: [
      {
        q: "When is secondary research insufficient?",
        a: "When the question requires operator-level specificity, when the published narrative is contested or suspect, or when the category is too new for credible secondary coverage.",
      },
      {
        q: "How much does secondary research typically cost?",
        a: "Database subscriptions range €10,000-€50,000 per seat per year. Most teams blend subscriptions with ad-hoc bespoke reports.",
      },
      {
        q: "Can AI tools replace secondary research?",
        a: "AI tools are accelerating secondary-research workflows but haven't replaced the underlying databases. The human skill (triangulation, contradiction-spotting, source-quality assessment) is what hasn't been automated yet.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "market-sizing",
    relatedSlugs: ["primary-research", "market-sizing", "competitive-intelligence"],
    primaryKW: "secondary research",
  },
  {
    slug: "panel-call",
    id: "06",
    term: "Panel Call",
    name: "PANEL CALL",
    title: "What Is a Panel Call? Group Expert Calls - FieldSignal",
    description:
      "A panel call is a structured group consultation — one buyer with 3-6 experts simultaneously. Used for cross-perspective insight in a single session.",
    definition:
      "A panel call is a structured group consultation in which one buyer (or buying team) interviews 3-6 experts simultaneously on a shared topic. Used when cross-perspective insight is more valuable than depth on any single expert's view.",
    explanation: [
      "Panel calls are the modern alternative to running 6 separate 1:1 expert calls on the same topic. The group format produces interactions — experts respond to one another's framings, agreements and disagreements surface organically, and the buyer can probe in ways that single-expert formats don't permit.",
      "Format typically runs 60-90 minutes with a facilitator (the senior researcher), 3-6 experts and the buyer. Experts are pre-briefed individually but not shown one another's identities until the panel starts. Recording (with consent) is standard.",
      "Panels work best for category-level questions: 'What's the consensus view among operators on the trajectory of segment X?' or 'Where do practitioners disagree about the right approach to challenge Y?' They work less well for company-specific or highly-confidential questions, where 1:1 format produces more candid answers.",
      "Pricing for panel calls reflects multiple expert rates plus facilitation overhead — typically €3,000-€6,000 for a 4-expert panel. Cost-per-perspective is lower than equivalent 1:1 sessions, but cost-per-hour is higher.",
    ],
    examples: [
      "A B2B SaaS company runs a 5-expert buyer panel to test new product positioning",
      "A PE fund runs a 4-expert operator panel to triangulate views on a category's trajectory",
      "A corporate strategy team runs a 6-expert panel on emerging-tech adoption in their industry",
      "An asset manager runs a 4-expert panel on regulatory direction in a category they're considering",
    ],
    faq: [
      {
        q: "How does a panel differ from a focus group?",
        a: "Focus groups are typically consumer-research with general respondents. Panel calls are B2B with vetted industry experts; participants have operating experience in the topic.",
      },
      {
        q: "How are panel experts vetted differently from 1:1 experts?",
        a: "Same compliance vetting; additionally, experts are screened for likelihood to contribute in a group format (some excellent 1:1 experts dislike group dynamics).",
      },
      {
        q: "Should I prefer panel or 1:1 format?",
        a: "Panel for cross-perspective discovery. 1:1 for confidential or company-specific depth. Many projects use both — 1:1 first to identify themes, then a panel to test consensus.",
      },
    ],
    linkedServiceSlug: "panel-calls",
    linkedUseCaseSlug: "customer-research",
    relatedSlugs: ["expert-network", "expert-survey", "primary-research"],
    primaryKW: "panel call",
  },
  {
    slug: "management-reference-check",
    id: "07",
    term: "Management Reference Check",
    name: "MANAGEMENT REFERENCE CHECK",
    title: "What Is a Management Reference Check? - FieldSignal",
    description:
      "Off-list reference calls with former colleagues, customers and partners of a target executive — used in M&A, pre-IC, pre-hire decisions.",
    definition:
      "A management reference check is a structured reference-call programme on a specific executive — typically conducted by an independent third party, using off-list sources (former colleagues, direct reports, customers, partners) rather than candidate-supplied references.",
    explanation: [
      "On-list references are largely useless for risk assessment because they're selected by the candidate. Off-list references, sourced independently, are the only honest signal you'll get on a senior executive's operating style, integrity and capability.",
      "Typical engagement: 5-8 off-list reference calls per executive over 1-2 weeks. Mix of former direct reports, peers, customers and partners. Structured questions covering operating style under pressure, integrity, decision-making in ambiguous situations, and culture fit.",
      "Most common use cases are pre-IC for VC and PE investments where the deal hinges on the CEO; pre-hire for senior C-level appointments; and pre-close M&A diligence on key target executives.",
      "Done well, management reference work surfaces risks not visible in management presentations: integrity issues, interpersonal style risks that don't survive contact with the buyer's culture, capability gaps that the candidate has historically compensated for by selecting strong teams.",
    ],
    examples: [
      "A seed VC commissions 6 off-list refs on a founder before leading a Series A",
      "A PE fund commissions reference work on 3 target executives pre-close on a buyout",
      "A board search committee commissions reference work on a CEO finalist",
      "A family office commissions reference work on a fund manager pre-commitment",
    ],
    faq: [
      {
        q: "Why not just call my own contacts?",
        a: "Your own network introduces bias and politicises the process. Independent third-party reference work produces more candid answers and protects you from the perception of unilateral due diligence.",
      },
      {
        q: "Is reference work legal?",
        a: "Yes, when conducted properly. References discuss their direct experience with the subject; they don't disclose confidential information that would breach NDAs.",
      },
      {
        q: "How much does it cost?",
        a: "Typically €8,000-€20,000 per executive for a 5-8 reference programme. Faster turnaround (5-day vs 2-week) commands a premium.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "management-reference-checks",
    relatedSlugs: ["commercial-due-diligence", "expert-network", "conflict-of-interest"],
    primaryKW: "management reference check",
  },
  {
    slug: "chinese-wall",
    id: "08",
    term: "Chinese Wall (Information Barrier)",
    name: "CHINESE WALL",
    title: "What Is a Chinese Wall? Information Barriers Explained",
    description:
      "A Chinese wall is an internal compartmentalisation barrier separating teams that could otherwise create conflicts of interest.",
    definition:
      "A Chinese wall (also called an information barrier) is an internal compartmentalisation regime that separates teams within an organisation that could otherwise create conflicts of interest. Common in investment banks, expert networks and large law firms.",
    explanation: [
      "The term originates from financial-services regulation requiring banks to separate sell-side advisory activities from trading and research functions. The same logic applies to expert networks managing multiple institutional clients who might be on opposite sides of a transaction.",
      "Inside an expert network, project teams handling competing client briefs are separated by a Chinese wall: shared access to client identity is restricted, project notes are compartmentalised, and senior researchers are explicitly assigned to avoid conflicts.",
      "The wall is enforced through technology (access controls, separate document repositories), process (no cross-team briefings on conflicted projects) and culture (clear escalation paths when a wall might be breached). External audits verify the wall's integrity.",
      "Buyers should understand how their vendor enforces walls. If you're a hedge fund running a research thesis on a specific company, you don't want the network's PE team running a buyer's diligence on the same target simultaneously, with shared expert pool. Reputable vendors document their wall architecture on request.",
    ],
    examples: [
      "An expert network with separate teams serving competing PE buyers on the same auction process",
      "An investment bank separating M&A advisory from sales and trading desks",
      "A law firm separating teams advising opposing parties in a contested matter",
      "An expert network running a programmatic CI subscription for client A while also serving client B who's also tracking the same competitor",
    ],
    faq: [
      {
        q: "Can a Chinese wall ever fully eliminate conflict risk?",
        a: "No process eliminates risk fully. Walls reduce risk to a level institutional compliance teams can accept. Failures still happen and are typically caught by external audit.",
      },
      {
        q: "How can I verify my vendor's wall actually works?",
        a: "Ask for: documented wall architecture, recent external audit findings, sample conflict logs (anonymised), the specific escalation path if a wall is suspected of being breached.",
      },
      {
        q: "Are Chinese walls more important for some clients than others?",
        a: "Yes. Institutional financial-services clients (hedge funds, PE, asset managers) have explicit regulatory expectations. Corporate clients have analogous requirements through procurement compliance.",
      },
    ],
    linkedServiceSlug: "compliance-framework",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["conflict-of-interest", "compliance-framework", "expert-attestation"],
    primaryKW: "Chinese wall",
  },
  {
    slug: "expert-attestation",
    id: "09",
    term: "Expert Attestation",
    name: "EXPERT ATTESTATION",
    title: "What Is an Expert Attestation? Per-Call Compliance Explained",
    description:
      "An expert attestation is a per-call confirmation by the expert that they have no MNPI, NDA conflict or undisclosed commercial conflict on the topic.",
    definition:
      "An expert attestation is a short pre-call confirmation by the expert that they: (a) hold no Material Non-Public Information on the topic; (b) are not bound by an NDA prohibiting the discussion; (c) have disclosed any current commercial relationships with the topic company; and (d) are not in a regulatory restriction period.",
    explanation: [
      "Per-call attestation is the operational cornerstone of expert-network compliance. Every call generates an attestation record retained in the 7-year audit trail.",
      "The attestation is presented to the expert before the call connects, usually as a short electronic form taking ~90 seconds. The expert signs digitally. The record links to the brief, the expert profile and (if consented) the call recording.",
      "From the buyer's side, the attestation is what makes the call defensible if scrutinised later. Regulators and internal compliance can review the attestation chain to confirm the call met institutional standards.",
      "The substance of the attestation has converged across major networks — MNPI, NDA, conflict, cooling-off — though the specific wording and the depth of follow-up questions vary. Reputable networks make their attestation language available to clients on request.",
    ],
    examples: [
      "An expert attesting they have no MNPI before discussing their former employer's competitive position",
      "An expert disclosing they hold equity in a company adjacent to the topic, with the network deciding whether the call can proceed",
      "An expert declining to attest because they're in a quiet period imposed by their current employer — call doesn't happen",
      "An expert disclosing an active NDA on a specific aspect of the topic, with the brief modified to exclude that aspect",
    ],
    faq: [
      {
        q: "What happens if an expert refuses to attest?",
        a: "The call doesn't happen. The network sources a replacement. The original expert is not penalised for refusing — refusal is the correct response when they cannot honestly attest.",
      },
      {
        q: "Can attestations be falsified?",
        a: "An expert who falsifies an attestation is permanently removed from the network and may face individual regulatory consequences. The 7-year audit trail makes it discoverable.",
      },
      {
        q: "How does attestation differ from an NDA?",
        a: "An NDA is a contract about what information can be shared post-engagement. An attestation is a pre-engagement confirmation that the expert is eligible to participate at all.",
      },
    ],
    linkedServiceSlug: "compliance-framework",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["mnpi", "cooling-off-period", "compliance-framework"],
    primaryKW: "expert attestation",
  },
  {
    slug: "commercial-due-diligence",
    id: "10",
    term: "Commercial Due Diligence (CDD)",
    name: "CDD",
    title: "What Is Commercial Due Diligence (CDD)? - FieldSignal",
    description:
      "Commercial Due Diligence (CDD) assesses a target's competitive position, customer base, market dynamics and growth thesis via primary research.",
    definition:
      "Commercial Due Diligence (CDD) is the process of assessing a target company's competitive position, customer-base health, market dynamics and growth thesis — typically commissioned by financial sponsors or strategic acquirers before signing a transaction.",
    explanation: [
      "CDD is the most common primary-research engagement in private-equity work and a frequent engagement in strategic M&A. Standard format is a 2-4 week sprint with 15-30 expert and customer interviews, delivered as a formal report.",
      "The Big Four and specialist boutiques (LEK, Bain & Company, OC&C, etc.) dominate the high-end CDD market with full-service multi-disciplinary engagements. Expert networks support CDD work either as the primary research backbone for boutique CDD providers, or as a standalone primary-research engagement when the buyer's analytical capacity is in-house.",
      "Typical CDD scope: market sizing and growth, competitive position, customer concentration and retention risk, pricing power, supplier and channel dynamics, regulatory exposure. Outputs feed directly into the deal-team's investment thesis and the IC paper.",
      "Pricing varies dramatically: Big Four / specialist boutique CDD ranges €100,000-€500,000+. Expert-network-led CDD primary research runs €25,000-€80,000 depending on scope. Smaller engagements appropriate for mid-market and add-on transactions.",
    ],
    examples: [
      "A mid-market PE buyer commissions 2-week CDD on a SaaS bolt-on acquisition",
      "A growth fund commissions CDD on a Series D candidate ahead of a leading round",
      "A strategic acquirer commissions CDD on a take-private candidate prior to LOI",
      "A sponsor exit team commissions vendor-CDD to optimise sale-process positioning",
    ],
    faq: [
      {
        q: "How is CDD different from financial due diligence (FDD)?",
        a: "FDD audits the historical numbers and validates working-capital, EBITDA quality etc. CDD tests the commercial narrative behind the numbers: is the customer base actually retaining, is the category actually growing, is pricing actually defensible.",
      },
      {
        q: "Who typically pays for CDD?",
        a: "The buyer in buy-side CDD. The seller in vendor-CDD (sell-side). Sponsors typically commission CDD before the LOI signs and the cost is borne by the fund.",
      },
      {
        q: "How long does a CDD engagement take?",
        a: "Standard 2-week sprint for focused engagements. 4-6 weeks for full-scope CDD on more complex targets. Accelerated 5-day engagements possible for live competitive auction processes.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "commercial-due-diligence",
    relatedSlugs: ["due-diligence", "expert-network", "investment-thesis-validation"],
    primaryKW: "commercial due diligence",
  },
  {
    slug: "voice-of-customer",
    id: "11",
    term: "Voice of Customer (VoC)",
    name: "VOC",
    title: "What Is Voice of Customer (VoC)? - FieldSignal",
    description:
      "Voice of Customer (VoC) is a structured ongoing primary research programme with current customers — typically run by independent third parties.",
    definition:
      "Voice of Customer (VoC) is a structured, recurring primary-research programme with a company's current customer base, typically run by independent third parties to surface insight that customers will not share directly with the company's sales or account teams.",
    explanation: [
      "VoC programmes range from simple quarterly NPS surveys to in-depth programmatic interview programmes with 15-40 customers per quarter. The programmatic interview version generates substantially more strategic insight per dollar than scaled survey work, but costs more per customer engaged.",
      "The defining feature of programmatic VoC is the use of independent third-party interviewers. Customers materially under-report dissatisfaction, product gaps and competitive consideration when speaking with company staff; independent interviewers surface what's actually being said.",
      "Findings typically cover: product gap perception, pricing tolerance, switching trigger events, competitive consideration sets, and word-of-mouth narratives. Outputs feed product, sales, customer success and senior leadership.",
      "Governance is the predictor of programme survival. VoC programmes with a quarterly executive review (60 minutes, 4-5 senior leaders) sustain. VoC programmes without that discipline fade within 12 months as the operational workload outweighs the perceived value.",
    ],
    examples: [
      "A B2B SaaS company runs 25 quarterly customer interviews to identify renewal-risk patterns",
      "A consumer-products brand runs 40 interviews per quarter across its top-100 retailer accounts",
      "A fintech runs programmatic VoC with 20 customers per quarter focused on competitive consideration",
      "A healthcare-tech vendor runs VoC across 4 health-system customers per quarter for product-gap surfacing",
    ],
    faq: [
      {
        q: "How is VoC different from NPS surveys?",
        a: "NPS is a single quantitative score, useful for trend tracking. VoC is qualitative or mixed-methods interview work, useful for understanding the 'why' behind the score. They complement each other.",
      },
      {
        q: "Why use third-party interviewers?",
        a: "Customers do not tell account teams the truth about dissatisfaction. Independent interviewers consistently surface materially more candid feedback. The cost is justified by what you learn that account teams couldn't.",
      },
      {
        q: "How long does it take to see ROI?",
        a: "Quarter 1 surfaces immediate findings. Quarter 4 starts producing longitudinal insight. Programmes typically need 12-18 months to demonstrate compounding value.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "voice-of-customer",
    relatedSlugs: ["primary-research", "customer-interview", "win-loss-analysis"],
    primaryKW: "voice of customer",
  },
  {
    slug: "win-loss-analysis",
    id: "12",
    term: "Win-Loss Analysis",
    name: "WIN-LOSS",
    title: "What Is Win-Loss Analysis? Definition + Process",
    description:
      "Win-loss analysis is structured third-party interviewing of recent buyers (wins and losses) to surface the actual decision criteria driving outcomes.",
    definition:
      "Win-loss analysis is the structured practice of interviewing recent buyers — both those who chose you and those who chose a competitor — to surface the actual decision criteria, competitive perception and product gaps driving the buying outcome.",
    explanation: [
      "Internal sales-team explanations of wins and losses are systematically biased. Reps overweight skill in wins and pricing in losses. Independent third-party interviews surface the actual decision criterion, which is usually a mix of perceived risk, internal politics, and specific product/service gaps invisible to the sales team.",
      "Standard format: 15-50 interviews per quarter (mix of recent wins and recent losses), trained third-party interviewers, structured findings with verbatim quotes, quarterly executive review.",
      "Win-loss is highest-ROI for companies with sales cycles of weeks to months, where the buyer can articulate their decision process. Lower-ROI for very long enterprise cycles (where the decision is too institutional) or very short consumer purchases (where the decision is too automatic).",
      "Common outputs feed sales enablement (better battle cards), product roadmap (specific gaps surfacing repeatedly), pricing (where price sensitivity is materially different from internal assumptions), and competitive positioning.",
    ],
    examples: [
      "A B2B SaaS vendor runs 25 win-loss interviews per quarter across mid-market and enterprise segments",
      "An enterprise services firm runs win-loss across 12 lost deals in a category they're entering",
      "A fintech runs quarterly win-loss covering all closed and lost deals above a deal-value threshold",
      "A consumer-tech brand runs win-loss on subscription cancellations after their first 30 days",
    ],
    faq: [
      {
        q: "Can my sales team do win-loss themselves?",
        a: "No. The independence of the interviewer is the value. Buyers will not share with sales reps what they'll share with an independent researcher.",
      },
      {
        q: "How many interviews per quarter is enough?",
        a: "15-25 is the minimum that produces useful pattern-spotting. Below 15 you're working with anecdotes; 25+ produces robust quarterly segmentation.",
      },
      {
        q: "How long should a win-loss programme run?",
        a: "Continuous, by quarter. The value compounds — patterns that appear in 4 consecutive quarters carry more weight than single-quarter findings.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "win-loss-analysis",
    relatedSlugs: ["voice-of-customer", "primary-research", "competitive-intelligence"],
    primaryKW: "win loss analysis",
  },
  {
    slug: "market-sizing",
    id: "13",
    term: "Market Sizing",
    name: "MARKET SIZING",
    title: "What Is Market Sizing? TAM SAM SOM Explained",
    description:
      "Market sizing estimates the total available, serviceable and obtainable market for a product or category — typically built bottom-up from operator data.",
    definition:
      "Market sizing is the estimation of the total addressable, serviceable and obtainable market (TAM, SAM, SOM) for a product, category or business model. Defensible market sizing is built bottom-up from operator and channel data rather than top-down from analyst extrapolation.",
    explanation: [
      "The TAM/SAM/SOM framework distinguishes total category size (TAM) from the segment you could realistically serve given your product and go-to-market (SAM), and the share of that segment you could realistically obtain (SOM).",
      "Bottom-up market sizing reconstructs market value from underlying operator economics: typical customer cohort sizes, average deal values, conversion rates, churn. Top-down sizing extrapolates from published analyst category numbers. Bottom-up is more defensible because the assumptions are explicit and testable.",
      "Common failure modes: confusing total market with addressable market; using list prices rather than transacted prices; assuming category growth uniformly distributes across sub-segments; relying on single-source analyst sizings without triangulation.",
      "Honest market sizing acknowledges the assumptions that drive the answer and surfaces the sensitivity. A €100M TAM that flexes to €40M-€250M depending on three identifiable assumptions is more useful than a €100M point estimate that pretends to precision.",
    ],
    examples: [
      "A startup builds TAM/SAM/SOM for fundraising — testing assumptions with 15 operator interviews",
      "A PE buyer builds bottom-up category sizing for a vertical-SaaS investment thesis",
      "A corporate strategy team builds market sizing for an adjacent-category entry decision",
      "A growth investor commissions sizing on an emerging category with no credible analyst coverage",
    ],
    faq: [
      {
        q: "Is bottom-up always better than top-down?",
        a: "Bottom-up is more defensible because the assumptions are explicit and testable. Top-down is faster but less rigorous. Most real sizing exercises blend both for cross-check.",
      },
      {
        q: "How big is a typical sizing engagement?",
        a: "12-25 expert interviews + desk research, 2-4 weeks elapsed. €10,000-€40,000 typical pricing for a category-sizing project.",
      },
      {
        q: "When does sizing genuinely add value vs being a tick-box exercise?",
        a: "When the assumptions are surfaced honestly and the sensitivity is real. Sizing exercises that produce single confident numbers should be treated with suspicion.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "market-sizing",
    relatedSlugs: ["tam-sam-som", "primary-research", "investment-thesis-validation"],
    primaryKW: "market sizing",
  },
  {
    slug: "tam-sam-som",
    id: "14",
    term: "TAM, SAM, SOM",
    name: "TAM SAM SOM",
    title: "What Is TAM SAM SOM? Total Addressable Market Explained",
    description:
      "TAM (total addressable market), SAM (serviceable addressable market) and SOM (serviceable obtainable market) — the three layers of market sizing.",
    definition:
      "TAM is the Total Addressable Market — the maximum revenue a category could generate if every buyer used the product. SAM is the Serviceable Addressable Market — the portion that could realistically be served given product and geographic constraints. SOM is the Serviceable Obtainable Market — the share realistically obtainable given competition and go-to-market capability.",
    explanation: [
      "TAM is largely theoretical. It answers 'how big could this category ever be?' and is useful for setting investment-thesis ambition. It's most often misused as a substitute for SAM or SOM in pitch decks.",
      "SAM is the more useful planning number. It answers 'how big is the market we could actually serve?' once you constrain by product capability, geography, regulatory access, customer-segment fit and language.",
      "SOM is the realistic medium-term ambition. It answers 'how much of SAM could we realistically obtain in 3-5 years?' given competitive intensity, our go-to-market capability and our resourcing.",
      "Common errors: presenting TAM as if it were SOM; calculating SAM by subtracting competitor share rather than by constraining the addressable population; treating SOM as a target rather than a ceiling.",
    ],
    examples: [
      "TAM €5B (entire category globally), SAM €1.2B (developed markets, B2B segment only), SOM €120M (10% share achievable in 5 years given GTM capacity)",
      "Startup fundraise: TAM €20B serves as ambition signal; SAM €3B is the realistic 10-year market; SOM €300M is the 5-year plan",
      "Corporate strategy: SAM is the genuine planning number for resource allocation; TAM and SOM bookend it",
    ],
    faq: [
      {
        q: "Which of TAM, SAM, SOM matters most for investors?",
        a: "SAM and SOM. TAM signals ambition; SAM tests planning realism; SOM grounds the financial model. Pitches that lead with TAM as if it's SOM lose credibility quickly.",
      },
      {
        q: "How do I avoid double-counting in TAM calculations?",
        a: "Define category boundaries strictly and document them. Most TAM-inflation comes from including adjacent categories the product doesn't actually serve.",
      },
      {
        q: "Should I size top-down or bottom-up?",
        a: "Both. Top-down for sanity check; bottom-up for defensibility. Discrepancies between the two are the most useful diagnostic.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "market-sizing",
    relatedSlugs: ["market-sizing", "primary-research", "investment-thesis-validation"],
    primaryKW: "TAM SAM SOM",
  },
  {
    slug: "channel-check",
    id: "15",
    term: "Channel Check",
    name: "CHANNEL CHECK",
    title: "What Is a Channel Check? - FieldSignal Glossary",
    description:
      "A channel check is a primary-research interview with distributors, resellers or other channel intermediaries to map channel economics and dynamics.",
    definition:
      "A channel check is a structured primary-research interview with a channel intermediary — distributor, reseller, broker, agent, integrator — to surface channel economics, partner satisfaction, competitive partner activity and category-level distribution dynamics.",
    explanation: [
      "Channel checks are particularly valuable in B2B categories with material indirect-channel share, where the channel partner sees competitive dynamics the manufacturer doesn't. Distributors and resellers are typically more candid about competitors than competitors' own customers.",
      "Common questions surfaced by channel checks: which competitor's partner programme is actually performing best; where margin pressure is emerging; which products are gaining shelf-space at the expense of which alternatives; what end-customer demand patterns are visible at the channel level.",
      "Typical format: 8-15 channel partner interviews per project. Mix of distributors, resellers and brokers depending on category structure. Often combined with end-customer reference interviews for cross-perspective.",
      "Channel checks are heavily used in equity research (hedge funds checking a public company's channel performance ahead of earnings), in M&A diligence (validating a target's channel relationships), and in CI programmes (continuous monitoring of competitor channel health).",
    ],
    examples: [
      "A hedge fund commissions 10 channel checks on a publicly-traded electronics distributor ahead of earnings",
      "A PE buyer commissions channel checks on a target's top-20 distributor relationships pre-LOI",
      "A B2B vendor commissions ongoing quarterly channel checks as part of their CI programme",
      "A corporate strategy team commissions channel checks to assess a new-market entry's distribution feasibility",
    ],
    faq: [
      {
        q: "How do channel checks differ from customer reference interviews?",
        a: "Channel checks interview intermediaries; customer references interview end-buyers. The two are complementary — channel checks reveal the supply-side reality; customer references reveal the demand-side reality.",
      },
      {
        q: "When are channel checks NOT useful?",
        a: "In direct-only B2B (no meaningful channel layer), in B2C categories with very fragmented intermediation, or in categories where the channel partner's interests are too far misaligned from the underlying buyer.",
      },
      {
        q: "How much do channel checks cost?",
        a: "€500-€1,000 per channel-partner interview, similar to other expert-network rates. Programmatic CI programmes that include channel checks typically run €15-40k annually.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "channel-and-distribution-research",
    relatedSlugs: ["primary-research", "competitive-intelligence", "expert-network"],
    primaryKW: "channel check",
  },
  {
    slug: "expert-survey",
    id: "16",
    term: "Expert Survey",
    name: "EXPERT SURVEY",
    title: "What Is an Expert Survey? B2B Quantitative Research",
    description:
      "An expert survey is a structured quantitative panel of vetted industry experts — used when scale and statistical reliability matter alongside operator quality.",
    definition:
      "An expert survey is a structured quantitative research panel of vetted industry experts or operating professionals — distinct from consumer-survey panels by virtue of respondent vetting and depth.",
    explanation: [
      "Expert surveys combine the scale and statistical reliability of quantitative survey research with the respondent quality of qualitative expert work. Typical panel sizes: 50-300 respondents per category, all vetted for relevant operating experience.",
      "Use cases include category-awareness testing, buyer-intent measurement, willingness-to-pay quantification, and competitive-positioning benchmarking. Common in B2B contexts where consumer-survey panels don't have enough sector-relevant respondents.",
      "Compliance is more demanding than consumer surveys because respondents are industry insiders who could hold MNPI. Reputable providers apply screening, attestations and exclusion-list checks at the respondent level — analogous to per-call attestation on the 1:1 side.",
      "Pricing varies dramatically by panel scarcity. A 100-respondent survey of mid-market IT buyers might cost €15-25k. A 50-respondent survey of senior C-level executives in a scarce category could cost €40-80k. NewtonX and adjacent vendors specialise here; expert networks like GLG and Tegus operate survey adjuncts.",
    ],
    examples: [
      "A B2B SaaS vendor commissions a 200-respondent survey on category preferences across mid-market buyers",
      "A PE buyer commissions a 100-respondent survey of healthcare procurement specialists for a category-sizing project",
      "A corporate strategy team commissions a 150-respondent survey of channel partners on competitor activity",
      "A hedge fund commissions a 75-respondent CIO survey to test their thesis on enterprise IT spending",
    ],
    faq: [
      {
        q: "How is an expert survey different from a consumer survey?",
        a: "Respondents in expert surveys are vetted operating professionals — much smaller available panels but materially deeper category knowledge. Consumer surveys recruit broadly for scale.",
      },
      {
        q: "Can expert surveys substitute for 1:1 expert calls?",
        a: "No. Surveys answer 'what proportion of operators say X?'. Calls answer 'why and how?'. Use surveys when scale matters, calls when depth matters.",
      },
      {
        q: "What's a typical survey timeline?",
        a: "3-5 weeks from panel design to deliverable. Some specialist providers can field 100+ respondents in under 2 weeks at premium pricing.",
      },
    ],
    linkedServiceSlug: "expert-surveys",
    linkedUseCaseSlug: "customer-research",
    relatedSlugs: ["panel-call", "expert-network", "primary-research"],
    primaryKW: "expert survey",
  },
  {
    slug: "transcript-library",
    id: "17",
    term: "Transcript Library",
    name: "TRANSCRIPT LIBRARY",
    title: "What Is an Expert Transcript Library? - FieldSignal",
    description:
      "A transcript library is a searchable archive of past expert-call transcripts, organised by company, industry and topic.",
    definition:
      "An expert transcript library is a searchable archive of anonymised expert-call transcripts, organised by company, industry, topic and time. Subscriptions provide access to read past consultations without commissioning new calls.",
    explanation: [
      "Transcript libraries are a fundamentally different product from custom expert calls. Custom calls answer your specific question; transcript libraries let you browse what other buyers' experts have said on adjacent topics.",
      "The market leader is Tegus (acquired by AlphaSense in 2024), with 100,000+ transcripts and best-in-class AI-driven thematic search. Third Bridge's Forum offers analyst-led transcripts with higher editorial polish but smaller volume. Boutique providers like FieldSignal offer smaller libraries at much lower price points ($99/month vs $25k+/year subscriptions).",
      "Workflow value is heavily tilted toward active buy-side analysts who consume 100+ transcripts per year and benefit from AI thematic search across the corpus. For occasional users (5-20 transcripts/year), full-tier subscriptions are uneconomic; lower-tier or per-transcript access is more efficient.",
      "Compliance considerations: transcripts are anonymised (expert identity replaced with role-based descriptors). Buyer identity is removed entirely. Discussion content is reviewed for MNPI before publication; calls flagged with potential MNPI exposure are excluded from the public library.",
    ],
    examples: [
      "A hedge-fund analyst reads 8 Tegus transcripts on a competitor's channel partners ahead of earnings",
      "A PE associate browses Third Bridge Forum transcripts on a target category as pre-CDD context",
      "A corporate strategy team subscribes to a transcript library for ongoing competitive awareness",
      "An emerging-manager fund uses $99/mo boutique library access for opportunistic browsing",
    ],
    faq: [
      {
        q: "Can a transcript library replace custom expert calls?",
        a: "For pattern-spotting and context, yes. For specific company-level or thesis-specific questions, no. Most active research workflows blend both.",
      },
      {
        q: "What's the cost difference between transcript subscription and per-call work?",
        a: "Tegus institutional subscription is typically tens of thousands annually. Boutique transcript access can be sub-€100/month. Per-call custom work is €500-€1,500 per call. Mix depends on usage pattern.",
      },
      {
        q: "Are transcripts as good as original expert calls?",
        a: "For broad context, often yes — and you don't waste an expert's time on questions already asked by someone else. For thesis-specific depth, no — the original buyer's question shaped the call.",
      },
    ],
    linkedServiceSlug: "transcript-archive",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["expert-network", "primary-research", "compliance-framework"],
    primaryKW: "expert transcript library",
  },
  {
    slug: "compliance-framework",
    id: "18",
    term: "Compliance Framework",
    name: "COMPLIANCE FRAMEWORK",
    title: "What Is an Expert Network Compliance Framework?",
    description:
      "The integrated set of controls a reputable expert network operates: MNPI screening, cooling-off, NDA disclosure, conflict screening, audit trail.",
    definition:
      "An expert-network compliance framework is the integrated set of controls a reputable network operates to ensure expert engagements meet regulatory, contractual and institutional standards. Core elements: MNPI screening, cooling-off, NDA disclosure, conflict-of-interest screening, per-call attestation and a 7-year audit trail.",
    explanation: [
      "The framework concept emerged post-Galleon (2009) as a defensive necessity for the major networks. It has since become table-stakes for any vendor selling to institutional financial-services clients.",
      "The framework is integrated: each element supports the others. MNPI screening at expert level + cooling-off enforcement + per-call attestation collectively provide the defensible posture. Removing any single element compromises the whole.",
      "External audit is the typical verification mechanism. Major networks commission annual audits from compliance specialists; results are summarised in vendor diligence questionnaires (DDQs) for institutional clients.",
      "Sector-specific overlays sit on top of the core framework: healthcare KOL work follows ABPI/PhRMA disclosure standards; financial services follows MAR/insider-list rules; defense work follows ITAR. The core framework + appropriate sector overlay is the institutional-grade posture.",
    ],
    examples: [
      "A hedge fund's compliance team reviewing an expert network's framework as part of vendor onboarding",
      "An expert network's annual external audit confirming framework integrity",
      "A network refusing to schedule a call because the expert can't satisfy the conflict-screening element",
      "A corporate compliance team validating that a vendor's framework matches their internal procurement standards",
    ],
    faq: [
      {
        q: "Are all expert network compliance frameworks the same?",
        a: "The five core elements are converged. Sector overlays and operational detail vary. Mid-market vendors sometimes operate lighter frameworks; institutional-grade vendors maintain the full framework.",
      },
      {
        q: "How do I evaluate a vendor's framework?",
        a: "Request: documented framework, sample audit-trail record, most-recent external audit report, sector-specific overlays applicable to your use case, sample per-call attestation language.",
      },
      {
        q: "What if my use case doesn't need institutional-grade compliance?",
        a: "Most use cases benefit from full compliance even if not strictly required — institutional posture is the safest default. Lower-tier compliance is appropriate only for non-regulated buyers with clear use-case constraints.",
      },
    ],
    linkedServiceSlug: "compliance-framework",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["mnpi", "cooling-off-period", "expert-attestation"],
    primaryKW: "compliance framework",
  },
  {
    slug: "nda",
    id: "19",
    term: "Non-Disclosure Agreement (NDA)",
    name: "NDA",
    title: "What Is an NDA? Non-Disclosure Agreements in Expert Networks",
    description:
      "An NDA (non-disclosure agreement) is a contract restricting disclosure of confidential information. NDA conflicts must be disclosed in expert calls.",
    definition:
      "A non-disclosure agreement (NDA) is a contract binding one or more parties not to disclose specified confidential information. NDAs intersect expert-network compliance because experts may be bound by NDAs from current or former employers that restrict what they can discuss.",
    explanation: [
      "Active NDA restrictions must be disclosed during the per-call attestation. The expert confirms whether any active NDA prohibits the proposed discussion. If yes, the call doesn't happen unless the scope can be narrowed to avoid the NDA-protected content.",
      "Expert NDAs are typically broad and survive employment termination. A former employee leaving a public company is usually bound by a multi-year confidentiality obligation covering trade secrets, customer lists, strategic plans, M&A discussions and operational details. This is one reason cooling-off periods exist alongside NDA enforcement.",
      "Buyers benefit from understanding the NDA layer: it explains why experts decline specific questions, why some topics are off-limits even after cooling-off periods expire, and why apparently-relevant experts may be unavailable for a given brief.",
      "From the expert's perspective, NDA discipline is professional and legal protection. Experts who breach NDAs face personal legal liability separate from the expert network. Reputable networks reinforce this through pre-call attestation and post-call review.",
    ],
    examples: [
      "An expert declining to discuss a former employer's pricing model because it's NDA-protected",
      "An expert confirming a topic is NDA-clear because it predates their employment with the topic company",
      "A call scope being narrowed to avoid NDA-protected content while still answering the buyer's question",
      "An expert being matched to a brief specifically because their NDA boundary doesn't restrict the topic",
    ],
    faq: [
      {
        q: "What happens if an expert breaches an NDA in a call?",
        a: "The expert faces individual legal liability. The network typically removes the expert. The buyer is protected if compliance protocols were followed; the per-call attestation and audit trail are the defence.",
      },
      {
        q: "Are NDAs always enforceable?",
        a: "Generally yes for the duration they specify. Some jurisdictions limit overly-broad NDAs as restraints of trade; others don't. Reputable networks treat all NDAs as enforceable until proven otherwise.",
      },
      {
        q: "Do experts sign NDAs with the expert network?",
        a: "Yes — typically a master expert agreement plus per-call confidentiality reaffirming the client identity and call content are confidential. This is separate from the expert's NDA with former employers.",
      },
    ],
    linkedServiceSlug: "compliance-framework",
    linkedUseCaseSlug: "management-reference-checks",
    relatedSlugs: ["expert-attestation", "compliance-framework", "conflict-of-interest"],
    primaryKW: "NDA",
  },
  {
    slug: "conflict-of-interest",
    id: "20",
    term: "Conflict of Interest",
    name: "CONFLICT OF INTEREST",
    title: "What Is a Conflict of Interest in Expert Networks?",
    description:
      "A conflict of interest arises when an expert has a current commercial relationship with the topic of a research engagement.",
    definition:
      "A conflict of interest in expert-network engagements arises when an expert has a current commercial relationship — board seat, advisory role, current consulting engagement, material equity holding — with the company or topic being researched.",
    explanation: [
      "Conflicts must be disclosed during the per-call attestation. Disclosure does not automatically kill the engagement; some conflicts are minor enough that the call can proceed with the conflict on the record. Others require declining the engagement.",
      "The buyer decides whether to proceed when a conflict is disclosed. Their decision depends on the use case: an investor doing thesis testing may welcome an expert who has board insight; a buyer doing competitive intelligence on the conflict-owning company would decline. Either way, the disclosure must be made.",
      "Beyond direct commercial relationships, networks screen for: family-member conflicts (relatives at the topic company); friendship-based reputational conflicts; recent significant transactions (e.g. expert sold shares in the topic company within 6 months); and category-level reputational risk.",
      "The threshold for material equity disclosure varies by network and use case. Typical thresholds: €50-100k absolute value, or 1% ownership in private companies. Below threshold, equity holdings are not generally required to be disclosed unless they're a material driver of the expert's economic interest.",
    ],
    examples: [
      "An expert disclosing they sit on the board of the topic company, leading the buyer to decline the call",
      "An expert disclosing a small equity holding (below threshold) with no impact on call proceeding",
      "An expert disclosing they consult for the topic company, with the buyer proceeding because thesis testing values insider access",
      "An expert disclosing a recent share sale in the topic company, with the call cancelled out of caution",
    ],
    faq: [
      {
        q: "Who decides if a disclosed conflict kills the call?",
        a: "The buyer, with input from the senior researcher. The decision is documented in the audit trail. Reputable networks won't proceed if the buyer doesn't acknowledge the conflict.",
      },
      {
        q: "Do experts have to disclose every potential conflict?",
        a: "Yes for material ones (board seats, advisory, current consulting, material equity, family at company). Minor or speculative conflicts can be flagged for the network's judgment.",
      },
      {
        q: "Is a former-employee relationship a conflict?",
        a: "Former employment is the basis for the call, not a conflict. Conflicts are current commercial relationships that could influence what the expert says or hides.",
      },
    ],
    linkedServiceSlug: "compliance-framework",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["expert-attestation", "compliance-framework", "chinese-wall"],
    primaryKW: "conflict of interest",
  },
  {
    slug: "cooling-off-period",
    id: "21",
    term: "Cooling-Off Period",
    name: "COOLING-OFF",
    title: "What Is a Cooling-Off Period in Expert Networks?",
    description:
      "The waiting period after an expert leaves an employer before they can discuss that employer in expert calls. Typically 6 months for public companies.",
    definition:
      "A cooling-off period is the mandatory waiting time between when an expert departs an employer and when they may be matched to expert-network briefs discussing that specific employer. Industry standard is 6 months for publicly-traded employers; shorter periods (typically 3 months) apply for non-public employers.",
    explanation: [
      "The cooling-off rule recognises that MNPI degrades in value over time. Information that's material on the date of departure may no longer be material 6 months later — earnings have been reported, strategic plans have been disclosed, market dynamics have shifted.",
      "The 6-month standard for public companies has converged across major networks (GLG, AlphaSights, Guidepoint, Third Bridge) and is reflected in institutional buyers' compliance policies. Some sectors enforce longer cooling-off (12 months for sensitive areas like upcoming clinical trial data in pharma).",
      "Cooling-off applies to discussing the former employer specifically. Experts can typically discuss general industry trends and other companies in the same category immediately after departure — the constraint is on direct discussion of their own former employer.",
      "From the expert's perspective, cooling-off doesn't pause their network participation, only narrows the briefs they can be matched to. An expert with 15 years' industry experience can typically be matched to category-level briefs even during their cooling-off on their most recent employer.",
    ],
    examples: [
      "A former VP at a publicly-traded SaaS company waiting 6 months before being matched to briefs discussing that company",
      "An ex-pharma executive waiting 12 months because their topic involves upcoming clinical data",
      "A former employee of a private company waiting only 3 months for category-level discussion",
      "An expert immediately available to discuss adjacent companies in their industry, even during cooling-off on their former employer",
    ],
    faq: [
      {
        q: "Why 6 months specifically?",
        a: "Empirical convergence rather than statutory requirement. Reflects the typical duration over which company-specific MNPI degrades to non-material. Institutional buyers' compliance teams have endorsed the standard.",
      },
      {
        q: "Are cooling-off periods enforceable across networks?",
        a: "Each network enforces its own policy. An expert subject to a 6-month cool-off at network A cannot circumvent it by joining network B with looser policy — institutional buyers will reject the expert based on their own internal policy.",
      },
      {
        q: "What about discussion of an expert's former employer at a high level?",
        a: "Cooling-off applies to direct company-specific discussion. General industry trends and observations that don't reveal company-specific information are typically permitted. Edge cases are escalated to the network's compliance function.",
      },
    ],
    linkedServiceSlug: "compliance-framework",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["mnpi", "expert-attestation", "compliance-framework"],
    primaryKW: "cooling off period",
  },
  {
    slug: "expert-vetting",
    id: "22",
    term: "Expert Vetting",
    name: "EXPERT VETTING",
    title: "What Is Expert Vetting? How Networks Verify Experts",
    description:
      "Expert vetting is the verification process every expert undergoes before joining a network — identity, employment, conflicts, ratings.",
    definition:
      "Expert vetting is the verification process applied to every prospective expert before they are added to a network's available pool. Standard elements: identity verification, employment-history verification, conflict-of-interest screening and ongoing performance rating.",
    explanation: [
      "Vetting begins at application: identity documents, CV verification, LinkedIn cross-check, employment-history confirmation through direct employer reference where appropriate. Failure on any step rejects the application.",
      "After vetting, experts complete a master expert agreement covering confidentiality, NDA disclosure, conflict screening, MNPI rules and cooling-off enforcement. This agreement is the contractual basis for network participation.",
      "Per-engagement vetting includes brief-vs-expert matching (does the expert's background actually fit the brief), cooling-off enforcement (is this expert in cool-off on the topic company), and per-call attestation immediately before the call.",
      "Ongoing vetting includes performance rating (buyer feedback after each call), compliance audit (sample-based review of attestation records), and category-specific re-verification when experts move between categories or topics.",
    ],
    examples: [
      "Identity verification via passport check at onboarding",
      "Employment history confirmed through LinkedIn cross-check plus reference where appropriate",
      "Ongoing rating updates from buyers after each call",
      "Removal of an expert whose post-call rating falls below an established threshold",
    ],
    faq: [
      {
        q: "Are all expert networks' vetting processes the same?",
        a: "The major networks have converged on largely similar processes. Mid-tier and boutique networks vary more. Buyers should validate vetting depth as part of vendor selection.",
      },
      {
        q: "What disqualifies an expert at vetting?",
        a: "Falsified credentials; failure to disclose material conflicts; refusal to sign the master agreement; identifiable misconduct in prior network participation; current regulatory restrictions on consulting activity.",
      },
      {
        q: "How long does vetting take?",
        a: "Typically 5-10 business days from application to acceptance. Networks emphasising speed can vet faster; networks emphasising compliance depth may take longer.",
      },
    ],
    linkedServiceSlug: "compliance-framework",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["compliance-framework", "expert-attestation", "expert-network"],
    primaryKW: "expert vetting",
  },
  {
    slug: "due-diligence",
    id: "23",
    term: "Due Diligence",
    name: "DUE DILIGENCE",
    title: "What Is Due Diligence? Types and Process - FieldSignal",
    description:
      "Due diligence is the systematic pre-transaction investigation of a target's commercial, financial, legal, technical and regulatory position.",
    definition:
      "Due diligence is the systematic pre-transaction investigation of a target — typically a target company or asset — across commercial, financial, legal, technical and regulatory dimensions. Each dimension is a separate diligence stream often run in parallel.",
    explanation: [
      "Commercial due diligence (CDD) assesses competitive position, customer health, market dynamics. Financial due diligence (FDD) audits the historical numbers. Legal due diligence reviews contracts, IP, employment and litigation. Technical due diligence reviews product, infrastructure and IP. Regulatory due diligence reviews compliance and pending regulatory exposure.",
      "Expert networks support primarily the commercial and regulatory streams. Customer references, channel checks, competitor interviews and operator panels feed CDD; ex-regulator interviews and policy specialists feed regulatory diligence.",
      "Diligence timelines vary by deal type: private-equity buyouts typically run 4-8 week diligence sprints; strategic M&A may run 8-16 weeks; competitive auctions may compress to 2-3 weeks. Expert-network components typically run on 2-4 week sub-timelines.",
      "The output of due diligence is the IC paper (PE) or board memo (strategic M&A). Primary-research findings from expert work are typically integrated into the commercial section, often with a separate appendix documenting methodology and sources for post-close audit.",
    ],
    examples: [
      "A PE fund running 6-week diligence across CDD, FDD, legal, technical and regulatory streams in parallel",
      "A strategic acquirer running 12-week diligence on a transformative acquisition",
      "A PE fund running accelerated 2-week diligence to meet a competitive bid process",
      "A growth fund running focused 2-week CDD on a Series D investment",
    ],
    faq: [
      {
        q: "How is due diligence different from research?",
        a: "Due diligence is transaction-driven and has a defined timeline; research is broader and ongoing. Expert-network work supports both — DD is one application of primary research.",
      },
      {
        q: "Who pays for due diligence?",
        a: "Typically the buyer for buy-side DD; the seller for vendor-DD/sell-side DD. Cost is borne by the fund or strategic acquirer respectively.",
      },
      {
        q: "What does a typical DD engagement cost?",
        a: "CDD alone runs €25-80k for primary-research components, or €100-500k for full-service DD from Big Four / boutiques. Total deal DD spend can run 0.5-2% of deal value.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "commercial-due-diligence",
    relatedSlugs: ["commercial-due-diligence", "expert-network", "primary-research"],
    primaryKW: "due diligence",
  },
  {
    slug: "customer-interview",
    id: "24",
    term: "Customer Interview",
    name: "CUSTOMER INTERVIEW",
    title: "What Is a Customer Interview? B2B Reference Calls",
    description:
      "A customer interview is a structured primary-research conversation with a current or former customer of a topic company. Used in DD, VoC and CI.",
    definition:
      "A customer interview is a structured primary-research conversation with a current, former or prospective customer of a topic company — typically run by an independent third party to surface honest perception of product, service and competitive consideration.",
    explanation: [
      "Customer interviews are the workhorse format for due-diligence customer reference work, voice-of-customer programmes, and competitive intelligence on competitor customer bases. Format is typically 30-60 minutes per customer.",
      "Independence of the interviewer materially affects candour. Customers tell third-party interviewers what they will not tell account teams. This is the central justification for outsourcing VoC and customer reference work rather than running it internally.",
      "Standard structure: warm-up situation context, recent purchase or renewal experience, perception of product/service strengths and weaknesses, competitive consideration, future intent. Behavioural questions (about specific past decisions) yield more reliable signal than hypothetical or opinion questions.",
      "Compliance considerations for customer interviews: customers can disclose what they choose, including their own internal decisions; they should not disclose confidential information from the topic company that they're contractually bound to protect. Per-call attestation by the customer covers this.",
    ],
    examples: [
      "A PE buyer running 12 customer reference calls on a target's top accounts for buy-side CDD",
      "A B2B SaaS vendor running 25 customer interviews per quarter for ongoing VoC",
      "A hedge fund analyst commissioning customer interviews on a public company's enterprise customer base",
      "A competitor running customer interviews on a competitor's recently-churned accounts",
    ],
    faq: [
      {
        q: "How is customer interviewing different from focus groups?",
        a: "Customer interviews are 1:1 and deep. Focus groups are small groups (6-10) and explore reactions and discussion dynamics. Different formats for different research questions.",
      },
      {
        q: "What does a customer interview cost?",
        a: "€500-€800 per call all-in. Higher for very senior customer contacts or scarce categories. Volume-discounted in programmatic VoC subscriptions.",
      },
      {
        q: "Will customers actually speak to a third party about their vendor?",
        a: "Yes, when approached professionally and with assurance of confidentiality. Conversion rates from outreach to scheduled interview typically 30-50% in B2B contexts.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "voice-of-customer",
    relatedSlugs: ["voice-of-customer", "primary-research", "win-loss-analysis"],
    primaryKW: "customer interview",
  },
  {
    slug: "expert-recruitment",
    id: "25",
    term: "Expert Recruitment",
    name: "EXPERT RECRUITMENT",
    title: "What Is Expert Recruitment? Sourcing for Networks",
    description:
      "Expert recruitment is the active sourcing process expert networks use to identify, qualify and onboard new experts into their pool.",
    definition:
      "Expert recruitment is the active sourcing process by which expert networks identify, qualify and onboard new experts. Channels include direct outreach, referrals, partnership programmes and inbound applications via the network's website.",
    explanation: [
      "Major networks recruit aggressively because supply quality is competitive: better experts (rarer specialisms, more candour, faster response) win the buyer-side mandate. The major networks maintain dedicated recruitment teams and reward channels for high-quality referrals.",
      "Recruitment quality directly affects buyer outcomes. Bench depth in scarce categories is the result of years of deliberate recruitment investment. Niche specialism networks (boutiques) build depth by specialising recruitment effort in narrower categories.",
      "Expert referral programmes — paying existing experts to refer new candidates — are the most efficient quality channel for most networks. Reputable networks pay €50-€200 per successful referral.",
      "Recruitment quality vs vetting quality is a different distinction. Recruitment broadens the pool; vetting narrows it. The two together determine bench depth in any specific category at any given time.",
    ],
    examples: [
      "A network's recruitment team actively sourcing CISOs across mid-market to fill a category gap",
      "A boutique paying €100 per successful expert referral",
      "An ex-employee proactively applying to join a network in their specialism",
      "A network maintaining a quarterly recruitment target for each scarce category they serve",
    ],
    faq: [
      {
        q: "Why don't all networks have the same expert pool?",
        a: "Most experts are on 2-3 networks. Pool composition reflects recruitment investment over time plus the experts' active choices about which networks to participate in.",
      },
      {
        q: "Are referred experts higher quality?",
        a: "Generally yes — referral channels self-select on the existing expert's professional standards. Inbound applications via website have higher variance.",
      },
      {
        q: "How long does recruitment take from application to first call?",
        a: "5-10 business days for vetting + onboarding. First call match depends on brief flow in the expert's category — sometimes weeks, sometimes months.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["expert-vetting", "expert-network", "expert-attestation"],
    primaryKW: "expert recruitment",
  },
  {
    slug: "qualitative-research",
    id: "26",
    term: "Qualitative Research",
    name: "QUALITATIVE RESEARCH",
    title: "What Is Qualitative Research? Definition + Methods",
    description:
      "Qualitative research uses interviews, focus groups and observation to surface meaning, perception and motivation — contrasted with quantitative research.",
    definition:
      "Qualitative research is primary-research methodology that emphasises depth, meaning and context — typically through 1:1 interviews, focus groups, ethnographic observation and content analysis. Contrasted with quantitative research, which emphasises measurement and statistical reliability.",
    explanation: [
      "Qualitative work answers 'why and how' questions. Quantitative work answers 'how many and how much' questions. Most strategic decisions need both; the practical question is the right mix.",
      "Expert-network work is overwhelmingly qualitative: 1:1 expert calls, customer interviews, panel discussions. Quantitative work (expert surveys, B2B research panels) is a smaller adjacent market typically served by survey-specialist providers.",
      "Common failure modes: treating individual qualitative findings as representative of populations; under-investing in sample size for qualitative pattern recognition (15 interviews surfaces more reliable patterns than 5); failing to triangulate qualitative findings against quantitative or secondary signals.",
      "Quality of qualitative research depends heavily on interviewer skill. Structured guides, behavioural questioning techniques and probing skill all materially affect the quality of insight extracted from any individual conversation.",
    ],
    examples: [
      "12 in-depth interviews with operators in a category to surface emerging themes",
      "Focus group with 8 senior buyers discussing reactions to new positioning",
      "Ethnographic observation of buyers using a competitor product in their workflow",
      "Content analysis of 50 buyer-side documents to surface decision-criteria patterns",
    ],
    faq: [
      {
        q: "How many qualitative interviews is 'enough'?",
        a: "Pattern saturation typically occurs around 12-25 interviews for focused topics. Below 12, you're working with anecdotes; above 25, marginal value diminishes unless segmentation matters.",
      },
      {
        q: "Can AI replace qualitative interviewing?",
        a: "Not the candid-conversation part. AI tools accelerate transcription, summarisation and thematic analysis; the interview itself remains a human practice for the foreseeable future.",
      },
      {
        q: "Is qualitative research less rigorous than quantitative?",
        a: "Different rigour, not lesser. Qualitative rigour is sampling discipline, interviewer skill, interpretation transparency. Quantitative rigour is statistical methodology and sample size.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "customer-research",
    relatedSlugs: ["quantitative-research", "primary-research", "voice-of-customer"],
    primaryKW: "qualitative research",
  },
  {
    slug: "quantitative-research",
    id: "27",
    term: "Quantitative Research",
    name: "QUANTITATIVE RESEARCH",
    title: "What Is Quantitative Research? B2B Survey Methods",
    description:
      "Quantitative research uses statistical methods (surveys, panels, structured questionnaires) to produce measurable findings on a defined population.",
    definition:
      "Quantitative research is primary-research methodology that emphasises measurement and statistical reliability — typically through surveys, panels and structured questionnaires applied to a defined respondent population. Contrasted with qualitative research, which emphasises depth and meaning.",
    explanation: [
      "Quantitative answers 'how many', 'what percentage', 'how strongly'. Useful when sample size matters, when populations need to be characterised at scale, and when statistical confidence intervals are required for decision support.",
      "In B2B contexts, quantitative work typically uses expert-survey panels (vetted respondent panels with operating experience) rather than consumer-research panels. Sample sizes range 50-300 respondents for typical engagements.",
      "Common applications: willingness-to-pay quantification, category awareness measurement, competitive consideration set sizing, demand-signal benchmarking. Often paired with qualitative interviews to give 'how big and why' rather than just 'how big'.",
      "Methodology rigour determines result quality. Sampling discipline (representative respondent selection), questionnaire design (avoiding bias-introducing question structures) and analysis methodology (statistical confidence) all materially affect output quality.",
    ],
    examples: [
      "A 200-respondent B2B survey on enterprise software buying behaviour",
      "A 100-respondent panel on category awareness in a healthcare niche",
      "A 75-respondent willingness-to-pay study using Van Westendorp methodology",
      "A 150-respondent quarterly tracker on competitor-mention rates among target buyers",
    ],
    faq: [
      {
        q: "How big a sample do I need?",
        a: "Depends on segmentation. 100 respondents supports broad findings; 300+ supports robust segmentation. Smaller samples (50-100) work for focused single-segment work.",
      },
      {
        q: "What does a typical B2B survey cost?",
        a: "€15-25k for a 100-respondent survey of mid-market buyers. €40-80k for senior C-level respondent panels in scarce categories.",
      },
      {
        q: "Should I use a consumer-survey panel or an expert-survey panel?",
        a: "Expert-survey panels for B2B. Consumer-survey panels rarely have enough sector-relevant respondents to produce credible B2B findings.",
      },
    ],
    linkedServiceSlug: "expert-surveys",
    linkedUseCaseSlug: "customer-research",
    relatedSlugs: ["qualitative-research", "expert-survey", "primary-research"],
    primaryKW: "quantitative research",
  },
  {
    slug: "alternative-data",
    id: "28",
    term: "Alternative Data",
    name: "ALTERNATIVE DATA",
    title: "What Is Alternative Data? Investment Research Sources",
    description:
      "Alternative data is non-traditional information used in investment research — web scraping, satellite imagery, transaction data, expert calls.",
    definition:
      "Alternative data is non-traditional information used in investment research — distinct from public filings, sell-side research and traditional company-provided disclosure. Common forms: web-scraped data, satellite imagery, credit-card transaction panels, expert calls, app-usage data and channel-check data.",
    explanation: [
      "Alternative data emerged as an institutional investment-research category in the 2010s as hedge funds sought edges beyond traditional sources. Expert-network calls are one form of alternative data; specialist data vendors provide many others.",
      "Within alternative data, expert-network insight is the qualitative end of the spectrum. Other alt-data categories are heavily quantitative — credit-card spend panels, app-usage analytics, web-scraping outputs, satellite imagery of physical activity.",
      "Quality and compliance vary materially across alt-data providers. Reputable providers document their data-collection methodology, address privacy and regulatory exposure, and price transparently. Lower-quality providers (especially in scraping-based products) can introduce regulatory and reputational risk.",
      "Most institutional hedge funds blend several alt-data categories with traditional research. Expert-network spend is typically the most visible single line in alt-data budgets; quantitative alt-data subscriptions are individually smaller but add to a sizeable aggregate.",
    ],
    examples: [
      "A hedge fund using credit-card transaction-panel data alongside expert calls to track retailer performance",
      "An equity research team using satellite imagery of factory activity as a leading indicator",
      "A PE firm using app-usage data to validate user-engagement claims in target diligence",
      "A buy-side analyst commissioning 8 expert calls (qualitative alt-data) to interpret quantitative signal",
    ],
    faq: [
      {
        q: "How is alternative data different from traditional research?",
        a: "Traditional research uses public filings, broker research, company disclosure. Alt-data uses sources outside that traditional flow — typically derived from observable behaviour rather than self-reported information.",
      },
      {
        q: "Is alternative data legal?",
        a: "Generally yes when collected through legitimate channels. Reputable providers address privacy, MNPI and regulatory exposure explicitly. Buyer compliance teams typically vet alt-data vendors before procurement.",
      },
      {
        q: "How much does an alt-data programme cost institutionally?",
        a: "Mid-market hedge funds typically run alt-data budgets in the high six figures to low seven figures annually. Larger institutional clients spend materially more across diversified vendor sets.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["primary-research", "expert-network", "channel-check"],
    primaryKW: "alternative data",
  },
  {
    slug: "expert-rating",
    id: "29",
    term: "Expert Rating",
    name: "EXPERT RATING",
    title: "What Is an Expert Rating? Network Quality Signals",
    description:
      "An expert rating is the performance score a network applies to each expert based on buyer feedback after each call — used in matching and quality control.",
    definition:
      "An expert rating is the performance score a network maintains for each expert, based on buyer feedback after each call. Used to inform brief-vs-expert matching, identify quality issues and decide on expert pool retention.",
    explanation: [
      "Ratings typically combine three dimensions: knowledge depth on the topic, communication clarity, and value delivered relative to expectations. Ratings are surfaced to senior researchers during matching but typically not surfaced to buyers (to preserve expert dignity).",
      "Networks differ in how aggressively they prune low-rated experts. Stricter networks remove experts whose rolling-average rating falls below a defined threshold (e.g. 7/10). Looser networks may keep low-rated experts in the pool but de-prioritise them in matching.",
      "Ratings are imperfect signals. New experts haven't accumulated enough calls for reliable scoring; topic-mismatched experts may score low through no fault of their own; some buyers rate aggressively while others rate generously. Reputable networks normalise for these factors in interpretation.",
      "From an expert's perspective, ratings drive future brief flow. Higher-rated experts in scarce categories receive more brief invitations and can negotiate higher rates over time. The compounding effect creates strong incentives to deliver well.",
    ],
    examples: [
      "An expert whose 12-month rolling rating dropped below threshold being removed from active matching",
      "A senior researcher prioritising a 9.2-rated expert over a 7.8-rated expert for a critical brief",
      "An expert whose ratings normalised lower being identified as topic-mismatched rather than knowledge-deficient",
      "A network's quarterly audit identifying systematic rating bias from a specific buyer",
    ],
    faq: [
      {
        q: "Are expert ratings made visible to buyers?",
        a: "Typically not, to protect expert dignity and avoid mid-call rapport issues. Senior researchers see ratings during matching; buyers see them only in aggregate or in special circumstances.",
      },
      {
        q: "How long does it take a new expert to accumulate reliable rating?",
        a: "Typically 8-10 calls for a baseline; 20+ for robust segmentation by topic. New experts are matched conservatively until baseline is established.",
      },
      {
        q: "Can experts dispute low ratings?",
        a: "Reputable networks have a dispute process. Disputed ratings are reviewed by senior researchers and either upheld, adjusted or excluded from the running average.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["expert-vetting", "expert-network", "expert-recruitment"],
    primaryKW: "expert rating",
  },
  {
    slug: "reference-call",
    id: "30",
    term: "Reference Call",
    name: "REFERENCE CALL",
    title: "What Is a Reference Call? Off-List vs On-List Refs",
    description:
      "A reference call is a structured 1:1 conversation with someone who has direct experience with the topic person, company or product. On-list vs off-list distinction is critical.",
    definition:
      "A reference call is a structured 1:1 conversation with someone who has direct first-hand experience with the topic of inquiry — typically a topic executive, target company or product. The most important distinction is between on-list references (supplied by the subject) and off-list references (sourced independently).",
    explanation: [
      "On-list references are useless for risk assessment because they're selected by the subject. They reliably produce positive signal. They're useful only for confirming baseline functioning or for surfacing benign anecdotes.",
      "Off-list references — former colleagues, ex-direct-reports, former customers, partners — are sourced by independent researchers without subject knowledge of the selection. They produce the candid signal that on-list references can't.",
      "Off-list reference programmes typically deliver 5-8 calls per executive over 1-2 weeks. Mixed cohort by relationship type (peers, reports, customers, partners). Compliance overlay protects both reference and subject from improper disclosure.",
      "Reference calls are heavily used in pre-IC for VC and PE investments, in C-suite hiring decisions, in M&A diligence on key target executives, and in board-search processes. The signal value justifies cost when the decision is irreversible and large.",
    ],
    examples: [
      "Pre-IC VC commissioning 6 off-list references on a Series A founder",
      "Board search committee commissioning references on CEO finalists",
      "PE buyer commissioning references on 3 executives at a buyout target",
      "Sponsor commissioning references on a portfolio company's incoming CFO",
    ],
    faq: [
      {
        q: "Can I do reference work myself instead of paying for it?",
        a: "You can, but you introduce bias and lose plausible deniability. Independent third-party reference work is more candid and easier to defend post-decision.",
      },
      {
        q: "How long does a typical reference programme take?",
        a: "5-10 business days for a standard 5-8 reference programme. Accelerated 3-day options exist for live transactions at premium cost.",
      },
      {
        q: "What does reference work cost?",
        a: "€8-20k per executive for a 5-8 reference programme. Pricing reflects sourcing effort to identify off-list references plus the actual interview work.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "management-reference-checks",
    relatedSlugs: ["management-reference-check", "due-diligence", "expert-network"],
    primaryKW: "reference call",
  },

  // ─── Wave 6 additions (20 more, reaching 50 total) ──────────────
  {
    slug: "paid-expert",
    id: "31",
    term: "Paid Expert",
    name: "PAID EXPERT",
    title: "What Is a Paid Expert? Expert Network Compensation",
    description:
      "A paid expert is a vetted operating professional compensated for participating in expert network consultations — typically €150-€1,500 per hour.",
    definition:
      "A paid expert is a vetted operating professional who participates in expert-network consultations in exchange for a compensation rate set per call. Rates typically range €150-€1,500 per hour depending on seniority and category scarcity.",
    explanation: [
      "Paid expert participation is the industry-standard model. Free or honorarium-only expert work exists but generally produces lower-quality engagement because participation isn't economically meaningful for the expert.",
      "Rates are set during onboarding based on seniority (years in role + executive level) and category scarcity (how rare the specific expertise is in the network). Most experts are in the €300-€800/hour range.",
      "Payment terms vary by network. Reputable networks pay within 5 business days, with no platform-fee deduction from the rate. Less reputable networks impose payment delays or take percentages off the top.",
      "From the buyer's perspective, paid expert work is more reliable than alternatives. Operators who are paid for their time engage seriously with the brief and prepare appropriately. Free or token-payment models attract less serious participation.",
    ],
    examples: [
      "A current VP at a tech company paid €600 for a 60-minute expert call on category dynamics",
      "An ex-Fortune 500 CFO paid €1,200 per hour for senior strategic consultations",
      "A specialist consultant paid €400/hour for sector-deep-dive work",
      "An ex-regulator paid €800/hour for policy-specific advisory work",
    ],
    faq: [
      {
        q: "How does paid expert compensation compare to free advisor relationships?",
        a: "Paid models produce more reliable engagement. Free advisor relationships work when there's a longer-term commercial or professional relationship driving participation; for ad-hoc 1:1 calls, payment is industry standard.",
      },
      {
        q: "Are paid experts biased by the payment?",
        a: "The compensation creates a 'don't waste my time' incentive but doesn't bias the substance of what experts say. Reputable networks reinforce honesty in pre-call briefings and per-call attestations.",
      },
      {
        q: "Who pays — the network or the buyer?",
        a: "The buyer pays the network; the network pays the expert separately. The buyer typically does not see the expert's rate directly — they see the network's bundled price including sourcing.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["free-expert", "expert-recruitment", "expert-network"],
    primaryKW: "paid expert",
  },
  {
    slug: "free-expert",
    id: "32",
    term: "Free Expert",
    name: "FREE EXPERT",
    title: "What Is a Free Expert? Why Networks Pay - FieldSignal",
    description:
      "A free expert is an operator who participates in expert consultations without payment. Reliable in informal relationships, weaker for formal expert-network use.",
    definition:
      "A free expert is an operating professional who participates in expert-network consultations without payment — typically as part of a longer-term advisory, board or commercial relationship rather than an ad-hoc paid engagement.",
    explanation: [
      "Free expert relationships work where the engagement is part of a broader commercial context — a board seat, advisor relationship, vendor relationship, or peer professional network. The expert's participation is incentivised by the broader relationship.",
      "For ad-hoc 1:1 expert-network engagements between strangers, free models produce systematically weaker results. Operators don't prepare seriously, decline more often, and provide less rigorous engagement.",
      "Some buyers attempt to source experts directly through LinkedIn or professional networks at no cost. This works occasionally for adjacent contacts but doesn't scale; the network's sourcing infrastructure exists precisely because the unsystematised version is unreliable.",
      "Where free expert work is appropriate: founder networks doing informal peer due diligence, professional services firms doing courtesy market research, academic researchers operating under institutional protocols.",
    ],
    examples: [
      "A board advisor providing strategic input as part of their board role",
      "A startup founder doing informal customer research with personal network contacts",
      "A vendor's sales team providing competitive context as part of a sales relationship",
      "An academic researcher conducting interviews under institutional IRB protocols",
    ],
    faq: [
      {
        q: "When is free expert sourcing acceptable?",
        a: "When there's a broader commercial or professional relationship that incentivises participation, or when the buyer is genuinely under no time pressure and can absorb the lower reliability.",
      },
      {
        q: "Why don't all experts work free?",
        a: "Time is money for senior operators. Free participation in ad-hoc calls is structurally low-priority work; paid work attracts more reliable engagement.",
      },
      {
        q: "Can free advisor relationships substitute for networks?",
        a: "For specific decisions, sometimes. For continuous, structured intelligence work at scale, no — the network's sourcing infrastructure isn't replicable through informal channels.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["paid-expert", "expert-network", "expert-recruitment"],
    primaryKW: "free expert",
  },
  {
    slug: "b2b-survey",
    id: "33",
    term: "B2B Survey",
    name: "B2B SURVEY",
    title: "What Is a B2B Survey? Structured Buyer-Side Research",
    description:
      "A B2B survey is a structured quantitative research instrument administered to vetted business professionals — typically 50-300 respondents.",
    definition:
      "A B2B survey is a structured quantitative research instrument administered to vetted business professionals. Distinct from consumer surveys by virtue of respondent vetting, smaller available panels, and per-respondent costs that are typically 5-20x consumer-survey rates.",
    explanation: [
      "B2B surveys typically run 50-300 respondents per study, all vetted for relevant industry role and seniority. Consumer survey panels typically can't supply enough sector-relevant respondents for meaningful B2B work.",
      "Common applications include category awareness measurement, willingness-to-pay quantification, competitive consideration set sizing, and buying-criteria ranking. Surveys complement qualitative expert interviews; they don't replace them.",
      "Cost scales heavily by respondent scarcity. A 100-respondent survey of mid-market IT buyers might cost €15-25k. The same survey targeting senior CISOs at companies above €500M revenue could cost €40-80k.",
      "Methodology quality determines result reliability. Sampling discipline (representative selection), questionnaire design (avoiding leading questions), and statistical analysis all materially affect output quality.",
    ],
    examples: [
      "A 200-respondent survey on enterprise SaaS buying preferences across mid-market",
      "A 100-respondent survey of CFOs on willingness-to-pay for a new financial tool",
      "A 150-respondent quarterly tracker on category mention rates among target buyers",
      "A 75-respondent panel of CISOs on cybersecurity buying intent",
    ],
    faq: [
      {
        q: "What's a typical B2B survey sample size?",
        a: "100-respondents for broad findings; 200-300 for segmented analysis. Smaller (50-75) works for focused single-segment work where respondents are scarce.",
      },
      {
        q: "How much does B2B survey work cost?",
        a: "€15-80k+ depending on respondent scarcity, panel size, and analysis depth. Premium scarcity (C-level, regulated industries) commands materially higher rates.",
      },
      {
        q: "How does this compare to expert calls?",
        a: "Surveys give 'how many' answers; expert calls give 'why and how' answers. Most strategic decisions benefit from both — surveys at scale plus targeted qualitative depth.",
      },
    ],
    linkedServiceSlug: "expert-surveys",
    linkedUseCaseSlug: "customer-research",
    relatedSlugs: ["expert-survey", "quantitative-research", "primary-research"],
    primaryKW: "B2B survey",
  },
  {
    slug: "kol-panel",
    id: "34",
    term: "KOL Panel",
    name: "KOL PANEL",
    title: "What Is a KOL Panel? Multi-Expert Group Consultations",
    description:
      "A KOL panel is a structured group consultation with 3-6 Key Opinion Leaders in a specific field. Common in pharma, healthcare and other regulated industries.",
    definition:
      "A KOL panel is a structured group consultation that brings together 3-6 Key Opinion Leaders in a specific field for simultaneous interaction with a buyer. Most common in pharma and healthcare contexts where peer-recognised authority drives category practice.",
    explanation: [
      "KOL panels differ from general expert panel calls by virtue of participant credentials. KOLs are independently recognised authorities — published, cited, conference-visible — and their participation is documented under sector-specific disclosure standards (ABPI in UK, PhRMA in US).",
      "Panel format produces interactions that 1:1 KOL consultations don't: experts respond to one another's framings, agreements and disagreements surface organically, and the buyer can probe in ways that single-expert formats don't permit.",
      "Compliance overlay is more demanding than general panel calls. KOLs in healthcare disclose their pharma-industry relationships; in financial services, KOLs are screened against insider lists. The compliance framework is integrated into the panel's pre-engagement materials.",
      "Cost reflects KOL premium rates. A 4-KOL pharma panel might cost €15-25k for a 90-minute session. A KOL panel in a regulated category like medical devices typically costs €20-40k including compliance documentation and post-panel synthesis.",
    ],
    examples: [
      "A pharmaceutical company running a 5-oncologist KOL panel on biologic switching behaviour",
      "A medical device company running a 4-surgeon KOL panel on robotic surgery adoption",
      "A financial services regulator running a KOL panel on emerging-fintech regulatory direction",
      "A venture investor running a KOL panel on a category they're evaluating",
    ],
    faq: [
      {
        q: "How does a KOL panel differ from a general panel call?",
        a: "KOLs have demonstrable public influence in their field; general panel experts have operating experience but smaller public footprints. KOL panels cost more and have more compliance overhead.",
      },
      {
        q: "Are KOL panels mostly pharma?",
        a: "Predominantly, but increasingly used in financial services, energy regulation and emerging-tech categories where peer-recognised authority shapes practice.",
      },
      {
        q: "How many KOLs is optimal for a panel?",
        a: "Three to six. Below three, you lose the panel dynamic. Above six, the conversation fragments and individual KOL airtime drops.",
      },
    ],
    linkedServiceSlug: "panel-calls",
    linkedUseCaseSlug: "regulatory-and-policy-research",
    relatedSlugs: ["key-opinion-leader-kol", "panel-call", "expert-network"],
    primaryKW: "KOL panel",
  },
  {
    slug: "ground-truth",
    id: "35",
    term: "Ground Truth",
    name: "GROUND TRUTH",
    title: "What Is Ground Truth in Primary Research? - FieldSignal",
    description:
      "Ground truth is operator-level reality on the ground — what's actually happening in a category, not what's reported in analyst coverage or press.",
    definition:
      "Ground truth is the operator-level reality of what's actually happening in a market, category or company — as distinct from the official narrative reported in analyst coverage, press releases or company-managed disclosure.",
    explanation: [
      "Ground truth is what primary research with operators surfaces that secondary research misses. Operator interviews, channel checks, customer references and ex-employee conversations all generate ground-truth signal.",
      "Common cases where ground truth diverges from published narrative: list prices vs actual transacted prices in B2B; reported customer satisfaction vs candid customer dissatisfaction; analyst category-growth estimates vs operator-observed demand reality.",
      "Investment professionals increasingly treat ground-truth signal as a primary input. Hedge funds use it to test theses; PE firms use it in diligence; corporates use it to inform strategy where the published narrative is suspect.",
      "Producing reliable ground truth requires structured methodology. Random conversations produce anecdotes, not signal. The discipline is in sampling design, structured questioning, triangulation and honest treatment of contradictions.",
    ],
    examples: [
      "Channel-partner interviews revealing actual competitor partner economics vs claimed",
      "Ex-employee interviews surfacing operational stress at a competitor before it appears in earnings",
      "Customer reference work revealing churn risk hidden by the target's management narrative",
      "Survey panel revealing willingness-to-pay materially below the category's published list pricing",
    ],
    faq: [
      {
        q: "How is ground truth different from primary research?",
        a: "Ground truth is the output; primary research is the methodology. Primary research is one way to produce ground truth; ethnographic observation and channel-level intelligence are others.",
      },
      {
        q: "Is published analyst research useless?",
        a: "No, but it's incomplete. Analyst coverage is a reasonable starting point and a useful sanity-check; for thesis-critical decisions, ground-truth confirmation through primary research is the differentiator.",
      },
      {
        q: "How do I know my ground truth isn't biased?",
        a: "Sampling discipline, methodology transparency and triangulation across independent sources. A single operator's view isn't ground truth; consistent patterns across many sources approach ground truth.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["primary-research", "ground-intelligence", "channel-check"],
    primaryKW: "ground truth",
  },
  {
    slug: "expert-sourcing",
    id: "36",
    term: "Expert Sourcing",
    name: "EXPERT SOURCING",
    title: "What Is Expert Sourcing? How Networks Find the Right Experts",
    description:
      "Expert sourcing is the process by which a network identifies, qualifies and presents candidate experts for a specific buyer brief. Distinct from recruitment.",
    definition:
      "Expert sourcing is the process by which an expert network identifies, qualifies and presents candidate experts for a specific buyer brief. Distinct from recruitment (which broadens the pool); sourcing narrows the pool to the right experts for the specific question.",
    explanation: [
      "Sourcing quality is the operational metric that buyers feel most directly. A network with a deep bench but weak sourcing presents irrelevant experts; a network with a smaller bench but strong sourcing matches the right experts every time.",
      "The sourcing workflow starts with the brief and produces a candidate shortlist — typically 8-15 experts within 24-72h of brief acceptance. Senior researcher review is the gating step on whether candidates make the shortlist.",
      "Sourcing factors include: direct experience with the topic; recency of that experience (cooling-off enforcement); compliance status (no MNPI, no NDA conflicts); fit with brief specifics (seniority, geography, language); past rating performance.",
      "AI is accelerating sourcing workflows but hasn't replaced the senior-researcher judgment step. Reputable networks use AI for candidate suggestion and pattern matching, with human gates on candidate quality before buyer presentation.",
    ],
    examples: [
      "A senior researcher narrowing a brief to 12 candidate experts across 3 sub-categories",
      "AI-assisted candidate matching surfacing 30 raw candidates, with human review narrowing to 8",
      "A buyer's brief refined after first sourcing round to better target the expert profile",
      "A network declining to source because the brief is too narrow to find acceptable candidates",
    ],
    faq: [
      {
        q: "How long does sourcing take?",
        a: "Typically 24-72 hours from brief acceptance. Faster turnaround possible for institutional clients with documented service-level commitments.",
      },
      {
        q: "Can I see the sourcing process myself?",
        a: "Senior researcher narrative is shared with the buyer alongside the candidate shortlist. The underlying tooling is proprietary.",
      },
      {
        q: "What if no experts match?",
        a: "Reputable networks tell the buyer honestly. Either the brief is refined to match available experts, or the engagement is declined. Buyers rarely encounter this if their brief is reasonable.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["expert-recruitment", "expert-vetting", "expert-profile"],
    primaryKW: "expert sourcing",
  },
  {
    slug: "expert-profile",
    id: "37",
    term: "Expert Profile",
    name: "EXPERT PROFILE",
    title: "What Is an Expert Profile? Anonymised Expert Summaries",
    description:
      "An expert profile is the anonymised summary of an expert's background presented to a buyer before a call — typically role, seniority, employers, expertise areas.",
    definition:
      "An expert profile is the anonymised summary of an expert's professional background that a network presents to a buyer pre-call. Identity is removed (replaced with role-based descriptors); the substance — role, seniority, employer types, expertise — is preserved.",
    explanation: [
      "Profiles are the operational mechanism by which buyers evaluate candidate experts pre-call. A good profile lets the buyer determine fit without disclosing expert identity until commitment.",
      "Standard elements: current/recent role description, seniority indicator, employer type (anonymised), years in role, specific expertise areas, geographic context, language capabilities. Profiles do NOT include employer name (until expert is selected and identity is confirmed).",
      "Profile quality affects buyer decisions materially. Vague profiles ('Senior leader in technology') produce uncertain buyer matches. Specific profiles ('VP-level engineering leader at a US-headquartered enterprise SaaS company with 1,000+ engineers, 8 years in current role') produce confident matches.",
      "Once a buyer selects an expert from the profile shortlist, the network confirms identity and conducts the per-call attestation. Some buyers don't see expert identity until post-call; others see it before. Reputable networks accommodate both preferences.",
    ],
    examples: [
      "An anonymised profile: 'Former CISO at a Fortune 500 financial services firm, 11 years in security leadership'",
      "A profile: 'Current VP Product at a Series C B2B SaaS company in DACH region'",
      "A profile: 'Recently departed VP Sales at a major SaaS competitor (departed 8 months ago, post cooling-off)'",
      "A profile: 'Independent advisor with prior roles at three major investment banks in M&A advisory'",
    ],
    faq: [
      {
        q: "Why aren't expert identities shared upfront?",
        a: "Protects the expert's reputation and the network's relationships. Identity is shared at commitment, with the expert's consent and per-call attestation.",
      },
      {
        q: "Can I request more profile detail?",
        a: "Yes. Senior researchers expand profile detail on request when the standard profile isn't sufficient for buyer decision-making.",
      },
      {
        q: "How does an expert's profile change over time?",
        a: "Updated as the expert's role changes. New positions are added; cooling-off restrictions are tracked; ratings accumulate. The profile a buyer sees today reflects the expert's current operational standing.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["expert-vetting", "expert-rating", "expert-network"],
    primaryKW: "expert profile",
  },
  {
    slug: "expert-exclusion-list",
    id: "38",
    term: "Expert Exclusion List",
    name: "EXCLUSION LIST",
    title: "What Is an Expert Exclusion List? Buyer-Side Compliance",
    description:
      "An exclusion list is the buyer-defined list of companies whose employees and ex-employees cannot be matched to that buyer's expert briefs.",
    definition:
      "An expert exclusion list is the buyer-defined list of companies whose current employees and recently-departed employees cannot be matched to that buyer's expert briefs. Used to prevent conflicts of interest at the source.",
    explanation: [
      "Institutional buyers commonly maintain exclusion lists for compliance reasons. A hedge fund holding a long position in Company X excludes Company X experts from their research briefs to prevent inadvertent insider trading exposure.",
      "Reputable networks maintain 2,000+ active exclusion entries across institutional clients, applied automatically at the brief-vs-expert matching stage. If an expert is on a client's exclusion list, the expert is invisible to that client's briefs.",
      "Exclusion lists are confidential — between the buyer and the network. Other clients of the network do not see other clients' exclusion lists. Cross-client wall enforcement protects the integrity of both clients' compliance positions.",
      "Common exclusion criteria: current portfolio holdings (long or short), prospective investment targets under active diligence, recent transactions, employers of named individuals (e.g. spouse or family member at the target), and any company under active regulatory restriction by the buyer's compliance function.",
    ],
    examples: [
      "A hedge fund excluding the 50 companies in its active long-and-short book from research briefs",
      "A PE fund excluding the 10 current diligence targets from any expert call work",
      "An asset manager excluding employers of their compliance officers' immediate family",
      "A corporate excluding direct competitors from any consultative research the firm commissions",
    ],
    faq: [
      {
        q: "How do I add to my exclusion list?",
        a: "Submit additions via your compliance function to your network's account team. Updates take effect within 24 hours typically.",
      },
      {
        q: "Are exclusion lists permanent?",
        a: "Buyer-controlled. Most entries are reviewed quarterly or after material events (deal close, position exit).",
      },
      {
        q: "Can networks share my exclusion list with other clients?",
        a: "Reputable networks treat exclusion lists as confidential between the buyer and the network. Cross-client wall enforcement is a baseline expectation.",
      },
    ],
    linkedServiceSlug: "compliance-framework",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["compliance-framework", "conflict-of-interest", "chinese-wall"],
    primaryKW: "expert exclusion list",
  },
  {
    slug: "technical-due-diligence",
    id: "39",
    term: "Technical Due Diligence (TDD)",
    name: "TECHNICAL DD",
    title: "What Is Technical Due Diligence? Tech Stack Assessment",
    description:
      "Technical Due Diligence (TDD) assesses a target's technology stack, product architecture, engineering practices and IP position pre-transaction.",
    definition:
      "Technical Due Diligence (TDD) is the systematic assessment of a target company's technology stack, product architecture, engineering practices, IP position and technical organisation pre-transaction. Run alongside commercial and financial DD.",
    explanation: [
      "TDD assesses the technology underpinning the commercial story. Common scope: architecture quality, technical debt and maintainability, scalability constraints, IP defensibility, engineering team strength, security posture, third-party-dependency risk.",
      "Conducted typically by specialist TDD firms or by in-house technical advisors. Expert networks support TDD by sourcing ex-engineers and ex-CTOs from comparable companies for benchmarking and third-party perspective work.",
      "Common findings: hidden technical debt that will require material future investment; key-person engineering risk; over-reliance on departing senior engineers; security exposure not visible in management materials; IP gaps that affect competitive defensibility.",
      "Output typically goes into the IC paper alongside commercial findings. TDD findings can move deal terms (escrow on technical milestones), inform integration planning, or kill the deal entirely if material risk is uncovered.",
    ],
    examples: [
      "A PE buyer commissioning TDD on a SaaS target's architecture before signing the LOI",
      "A strategic acquirer assessing technical-team strength on a vertical-SaaS acquisition",
      "A growth fund commissioning TDD on a Series D company's scalability",
      "A sponsor commissioning vendor-TDD to optimise sale-process positioning",
    ],
    faq: [
      {
        q: "How is TDD different from commercial DD?",
        a: "Commercial DD assesses the market and customer story. Technical DD assesses the technology underpinning it. Both run in parallel and feed the same IC decision.",
      },
      {
        q: "Who conducts TDD?",
        a: "Specialist TDD firms (e.g. Crosslake, OpenView's tech services) plus in-house technical advisors. Expert networks support by sourcing benchmarking experts.",
      },
      {
        q: "How long does TDD take?",
        a: "Standard 2-week sprint matching PE deal timelines. Complex targets or hard-tech investments can run 4-6 weeks.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "commercial-due-diligence",
    relatedSlugs: ["due-diligence", "commercial-due-diligence", "regulatory-diligence"],
    primaryKW: "technical due diligence",
  },
  {
    slug: "regulatory-diligence",
    id: "40",
    term: "Regulatory Due Diligence",
    name: "REGULATORY DD",
    title: "What Is Regulatory Due Diligence? - FieldSignal Glossary",
    description:
      "Regulatory due diligence assesses a target's regulatory exposure, compliance posture and pending regulatory changes likely to affect the investment thesis.",
    definition:
      "Regulatory due diligence is the systematic pre-transaction assessment of a target company's current regulatory exposure, compliance posture and likely regulatory changes that could affect the investment thesis. Distinct from legal DD, which is contract-focused.",
    explanation: [
      "Regulatory DD matters most in heavily regulated industries: healthcare, financial services, energy, telecommunications, crypto and emerging-tech categories where regulation is actively evolving.",
      "Expert networks support regulatory DD by sourcing ex-regulators, policy specialists and industry counsel for the assessment. The combination of insider regulator perspective and industry counsel implementation perspective produces realistic regulatory trajectory analysis.",
      "Common findings: pending regulatory changes that will materially affect target economics; non-compliance issues not surfaced in management materials; jurisdiction-specific exposure (e.g. multi-state US licensing complexity); enforcement-action risk based on regulator priorities.",
      "Output feeds the commercial DD synthesis. A target with apparent strong growth but material undisclosed regulatory exposure is materially less valuable than the management narrative suggests; regulatory DD surfaces this distinction.",
    ],
    examples: [
      "A PE fund assessing pending healthcare reimbursement reforms affecting a target's revenue",
      "A growth fund assessing crypto regulatory exposure across major jurisdictions",
      "A corporate assessing telecom licensing complexity for a cross-border acquisition",
      "A fintech investor assessing pending consumer-protection regulation that affects category economics",
    ],
    faq: [
      {
        q: "When is regulatory DD essential?",
        a: "Heavily regulated industries (healthcare, financial services, energy) or any cross-border transaction. In unregulated categories, regulatory DD is usually proportionate to scope.",
      },
      {
        q: "Who conducts regulatory DD?",
        a: "Industry counsel typically. Expert networks add ex-regulator and policy-specialist perspective on regulatory trajectory.",
      },
      {
        q: "How does regulatory DD interact with legal DD?",
        a: "Legal DD reviews contracts, IP and litigation. Regulatory DD reviews compliance posture and pending regulatory change. Different teams, complementary scope.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "regulatory-and-policy-research",
    relatedSlugs: ["due-diligence", "commercial-due-diligence", "technical-due-diligence"],
    primaryKW: "regulatory diligence",
  },
  {
    slug: "market-study",
    id: "41",
    term: "Market Study",
    name: "MARKET STUDY",
    title: "What Is a Market Study? Definition + Process",
    description:
      "A market study is structured primary and secondary research on a defined market or category — typically delivered as a formal report for strategic decision-making.",
    definition:
      "A market study is a structured research engagement combining primary and secondary research on a defined market, category or sub-segment. Typically commissioned for strategic decisions: new market entry, category-investment thesis, M&A target validation.",
    explanation: [
      "Standard market study scope: market sizing (TAM/SAM/SOM), competitive landscape mapping, customer segmentation, buying-criteria analysis, channel and distribution dynamics, regulatory context, growth driver analysis.",
      "Expert networks commonly deliver market studies through bundled engagements: 15-30 expert interviews + desk research + synthesis report. Cost typically €25-100k depending on category and scope.",
      "Market studies are heavily used by corporate strategy teams, PE firms doing sector deep-dives, growth funds validating an investment thesis, and management consulting firms supplementing internal capability.",
      "Output is typically a 30-80 page formal report with embedded data, expert quote attribution and explicit methodology disclosure. Reputable providers disclose assumptions and surface where evidence is weak rather than presenting confident point estimates.",
    ],
    examples: [
      "A corporate strategy team commissioning a market study on adjacent-category entry",
      "A growth fund commissioning a market study on a category's 5-year trajectory",
      "A PE fund commissioning a sector deep-dive ahead of a thematic investment programme",
      "A consultancy commissioning a market study as part of a client engagement deliverable",
    ],
    faq: [
      {
        q: "How is a market study different from commercial DD?",
        a: "CDD is target-specific and transaction-driven. A market study is category-level and strategic — typically informs whether to enter a category, not whether to buy a specific company in it.",
      },
      {
        q: "What does a typical market study cost?",
        a: "€25-100k for primary-research-led studies; up to €500k+ for full-scope studies from Big Four / specialist boutiques.",
      },
      {
        q: "How long does a market study take?",
        a: "Typically 4-8 weeks. Accelerated 2-week studies possible at premium cost for time-critical decisions.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "market-sizing",
    relatedSlugs: ["market-sizing", "primary-research", "commercial-due-diligence"],
    primaryKW: "market study",
  },
  {
    slug: "b2b-customer-interview",
    id: "42",
    term: "B2B Customer Interview",
    name: "B2B CUSTOMER INTERVIEW",
    title: "What Is a B2B Customer Interview? - FieldSignal",
    description:
      "A B2B customer interview is a structured conversation with a business buyer about their purchase decisions, vendor relationships and category perception.",
    definition:
      "A B2B customer interview is a structured conversation with a business buyer (typically an enterprise decision-maker or influencer) about their purchase decisions, vendor relationships, category perception and unmet needs. Distinct from consumer interviews by virtue of buyer sophistication and decision-process complexity.",
    explanation: [
      "B2B customer interviews are core to win-loss programmes, VoC programmes, due-diligence customer reference work and competitive intelligence on competitors' customer bases. Format is typically 30-60 minutes per interview.",
      "Compared to consumer interviews, B2B interviewing requires more substantive preparation: understanding the buying-group structure, knowing the typical buying-cycle length, anticipating the technical vocabulary, and respecting the senior contact's time.",
      "Reliable B2B customer interviewing uses behavioural questioning (specific past decisions) rather than hypothetical questioning (future preferences). 'Walk me through the recent decision' beats 'Would you choose X over Y?'",
      "Common cost: €500-€800 per interview all-in. Higher for very senior contacts (CEO, CFO level) or scarce categories. Lower for high-volume programmatic work (VoC subscriptions).",
    ],
    examples: [
      "A B2B SaaS vendor commissioning 25 customer interviews per quarter for VoC",
      "A PE buyer commissioning 12 customer references on a target",
      "A hedge fund commissioning customer interviews on a public-company target",
      "A category investor commissioning customer interviews to validate an investment thesis",
    ],
    faq: [
      {
        q: "How is this different from a focus group?",
        a: "B2B customer interviews are 1:1 and deep. Focus groups are small groups (6-10) used in consumer research; rare in B2B because B2B buyers won't speak as candidly in groups.",
      },
      {
        q: "Do B2B customers really speak to third parties about their vendors?",
        a: "Yes, when approached professionally with confidentiality assurances. Conversion rates from outreach to scheduled interview typically 30-50%.",
      },
      {
        q: "What does B2B customer interviewing cost?",
        a: "€500-€800 per interview at most networks. Premium for very senior contacts; volume-discount for programmatic work.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "voice-of-customer",
    relatedSlugs: ["customer-interview", "voice-of-customer", "win-loss-analysis"],
    primaryKW: "B2B customer interview",
  },
  {
    slug: "sell-side-research",
    id: "43",
    term: "Sell-Side Research",
    name: "SELL-SIDE RESEARCH",
    title: "What Is Sell-Side Research? Investment Bank Analyst Work",
    description:
      "Sell-side research is published equity research produced by investment-bank analysts for clients — distinct from buy-side research conducted internally by investors.",
    definition:
      "Sell-side research is published equity (or fixed income) research produced by analysts at investment banks and broker-dealers. Distributed to institutional clients as part of a sell-side relationship, typically covering publicly-traded companies and sectors.",
    explanation: [
      "Sell-side analysts produce initiation reports, sector deep-dives, quarterly earnings analysis and event-driven coverage. Output is consumed by hedge funds, asset managers, family offices and corporate strategy functions.",
      "Sell-side research carries inherent bias because the publishing firm typically has investment-banking relationships with the companies covered. Reputable analysts disclose conflicts; sophisticated readers discount accordingly.",
      "Expert networks intersect sell-side research in two ways: sell-side analysts use networks to source primary research underlying their reports; institutional clients consuming sell-side research use networks to test the analyst's narrative against operator reality.",
      "Distinction from buy-side research: sell-side is published externally with conflicts; buy-side is produced internally by the investor for their own use. Buy-side research is typically more thesis-driven and uncompromised.",
    ],
    examples: [
      "A sell-side analyst at a major investment bank publishing initiation coverage on a SaaS IPO",
      "A sell-side analyst conducting 8 channel checks before publishing a quarterly preview",
      "A hedge fund reading sell-side coverage as a starting point before commissioning their own primary research",
      "An asset manager using sell-side coverage for sector-level context and expert networks for thesis-critical depth",
    ],
    faq: [
      {
        q: "How biased is sell-side research?",
        a: "Variable. Sector analysts at major banks are typically rigorous; conflicts disclosed in writing. Smaller broker firms vary widely. Sophisticated readers triangulate against other sources.",
      },
      {
        q: "How do expert networks relate to sell-side research?",
        a: "Networks support sell-side analysts' primary research; institutional clients use networks to test sell-side narratives.",
      },
      {
        q: "Is sell-side research worth the subscription cost?",
        a: "Most institutional clients consume sell-side as a baseline context layer; the primary research differentiation happens via networks and other alt-data.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["buy-side-research", "equity-research", "alternative-data"],
    primaryKW: "sell-side research",
  },
  {
    slug: "buy-side-research",
    id: "44",
    term: "Buy-Side Research",
    name: "BUY-SIDE RESEARCH",
    title: "What Is Buy-Side Research? Investor Internal Analysis",
    description:
      "Buy-side research is internal investment analysis conducted by hedge funds, asset managers and other allocators for their own use — uncompromised by external-publication conflicts.",
    definition:
      "Buy-side research is internal investment analysis conducted by hedge funds, asset managers, PE firms, family offices and other allocators for their own use. Distinct from sell-side research, which is externally published.",
    explanation: [
      "Buy-side research is uncompromised by the conflicts that affect sell-side coverage. Internal analysts produce thesis-driven work that's measured by investment outcome, not analyst-of-the-year ranking.",
      "Buy-side teams use a layered research approach: secondary research (databases, sell-side, analyst reports) for context; alternative data (channel checks, surveys, satellite imagery) for differentiated signal; expert-network primary research for operator-level depth.",
      "Expert networks are particularly valuable for buy-side research because they enable the buyer to test their thesis against operator reality without disclosing the thesis or the buyer identity to the operator.",
      "Typical buy-side research cost structure: 30-60% spend on data subscriptions; 25-40% on alternative data; 10-20% on expert networks. Mix varies materially by investment style.",
    ],
    examples: [
      "A hedge fund analyst running 8 expert calls to test a long thesis on a SaaS target",
      "A PE associate running CDD on a buyout target as part of internal investment work",
      "An asset-management research team running quarterly channel checks on portfolio holdings",
      "A family office conducting direct-investment research on a target opportunity",
    ],
    faq: [
      {
        q: "How is buy-side different from sell-side research?",
        a: "Buy-side is internal, uncompromised by external publication conflicts, and measured by investment outcome. Sell-side is published externally with disclosed conflicts.",
      },
      {
        q: "What's the typical buy-side research budget?",
        a: "Varies dramatically by fund size and strategy. Hedge funds: mid-six to seven figures annually. PE funds: spend per deal, typically €50-200k per major transaction.",
      },
      {
        q: "Where do expert networks fit?",
        a: "Buy-side teams use networks for operator-level primary research that complements databases and sell-side coverage. Typical 10-20% of research budget on networks.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["sell-side-research", "equity-research", "alternative-data"],
    primaryKW: "buy-side research",
  },
  {
    slug: "equity-research",
    id: "45",
    term: "Equity Research",
    name: "EQUITY RESEARCH",
    title: "What Is Equity Research? Sector Analyst Work",
    description:
      "Equity research is structured analysis of publicly-traded companies' investment merits — including financial modelling, sector context and trading recommendations.",
    definition:
      "Equity research is structured analysis of publicly-traded companies' investment merits — including financial modelling, sector context, valuation analysis and trading recommendations. Conducted by sell-side analysts (published) and buy-side analysts (internal).",
    explanation: [
      "Equity research outputs include initiation reports, quarterly earnings previews and recaps, sector deep-dives, model updates and event-driven notes. Coverage typically organised by sector with specialised analysts per category.",
      "Methodology blends financial modelling (DCF, multiples, sum-of-parts) with qualitative analysis of management, competitive position and category dynamics. Primary research via channel checks, expert networks and survey work has become standard for sophisticated coverage.",
      "Expert networks support equity research workflows materially. Analysts use networks for channel checks ahead of earnings, sector-deep-dive interviews, competitor-positioning research and management-team perspective work.",
      "Compliance is central in equity research. Sell-side analysts navigate Reg FD restrictions; buy-side analysts navigate insider-trading concerns. Expert network engagements operate under documented frameworks that protect both sides.",
    ],
    examples: [
      "A sell-side analyst publishing earnings preview on a public SaaS company with 6 expert calls as input",
      "A buy-side analyst running channel checks ahead of quarterly results on a portfolio holding",
      "A sector specialist publishing an initiation report on an emerging category with 12 expert interviews",
      "An equity research team running sector deep-dive across 4 publicly-traded competitors",
    ],
    faq: [
      {
        q: "How is equity research different from general investment research?",
        a: "Equity research is specifically about publicly-traded securities. General investment research covers private deals, real estate, infrastructure and other asset classes.",
      },
      {
        q: "Do all hedge funds do equity research internally?",
        a: "Fundamental long/short funds: yes, dominant work. Quant funds: less central. Macro funds: heavy on rates/FX rather than equities specifically.",
      },
      {
        q: "How do expert networks fit into equity research workflows?",
        a: "Heavily. Channel checks, sector deep-dives, competitive positioning, management perspective. Networks are a routine input alongside databases and modelling.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["sell-side-research", "buy-side-research", "alternative-data"],
    primaryKW: "equity research",
  },
  {
    slug: "ground-intelligence",
    id: "46",
    term: "Ground Intelligence",
    name: "GROUND INTELLIGENCE",
    title: "What Is Ground Intelligence? - FieldSignal Glossary",
    description:
      "Ground intelligence is operator-level, region-specific or category-specific signal that can't be obtained from desk research — typically via primary interviews.",
    definition:
      "Ground intelligence is operator-level, region-specific or category-specific signal that's not available through desk research — typically obtained through primary interviews with people who have direct, current experience of the relevant ground.",
    explanation: [
      "The term emphasises specificity: not 'general industry trends' but 'what's happening in this specific market segment, in this specific geography, right now'. Ground intelligence is operationally specific.",
      "Common applications: corporate teams making market-entry decisions, investors evaluating geographic expansion of targets, family offices doing direct-investment work in unfamiliar regions, consultancies advising on jurisdiction-specific strategy.",
      "Producing reliable ground intelligence requires native-language interviewing, local operator access and structured sampling discipline. Translated or distant interviewing produces materially weaker signal.",
      "Expert networks with regional bench depth produce ground intelligence as an operational core competency. Reputable providers can deliver ground intelligence within 2-4 weeks for most major commercial centres globally.",
    ],
    examples: [
      "Ground intelligence on Vietnamese manufacturing supply chain dynamics through 12 local operator interviews",
      "Ground intelligence on Brazilian fintech regulatory direction via ex-regulator and operator panels",
      "Ground intelligence on Saudi renewables build-out through 8 in-region interviews",
      "Ground intelligence on Japanese hospital procurement through 6 local hospital administrator interviews",
    ],
    faq: [
      {
        q: "How is this different from market intelligence generally?",
        a: "Specificity. Ground intelligence is operationally specific to a market, region or category at a point in time. Market intelligence is broader and often desk-based.",
      },
      {
        q: "Can you get ground intelligence from desk research?",
        a: "Mostly no. The specifics that ground intelligence surfaces aren't published in analyst coverage or trade press — they live in operator heads.",
      },
      {
        q: "How quickly can ground intelligence be sourced?",
        a: "2-4 weeks for most major commercial centres globally. Emerging-market or very-narrow categories may take 4-6 weeks.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "new-market-entry",
    relatedSlugs: ["ground-truth", "primary-research", "channel-check"],
    primaryKW: "ground intelligence",
  },
  {
    slug: "channel-intelligence",
    id: "47",
    term: "Channel Intelligence",
    name: "CHANNEL INTELLIGENCE",
    title: "What Is Channel Intelligence? Distributor Insight",
    description:
      "Channel intelligence is structured insight derived from distributors, resellers, brokers and other channel intermediaries on competitive dynamics they observe.",
    definition:
      "Channel intelligence is structured insight on competitive dynamics, pricing patterns, demand shifts and partner economics derived from interviews with channel intermediaries — distributors, resellers, brokers, agents and integrators.",
    explanation: [
      "Channel intelligence is particularly valuable in B2B categories with material indirect-channel share. Channel partners see competitive dynamics that the manufacturer doesn't — they handle multiple competing products and observe end-customer behaviour across categories.",
      "Common findings: margin pressure across competitor partner programmes; product-mix shifts at the channel level (which competitor SKUs are gaining shelf-space); pricing reality across competitive products (list vs transacted); demand signals from end customers visible only at the channel level.",
      "Channel intelligence is most strategic when run as a continuous programme. Quarterly cycles with 8-12 channel-partner interviews build longitudinal pattern recognition that single projects can't.",
      "Producing reliable channel intelligence requires careful partner selection (balanced across tier and geography), third-party interviewer independence (partners speak more candidly to neutral interviewers), and structured questioning discipline.",
    ],
    examples: [
      "Quarterly channel intelligence programme for a B2B vendor with 10 distributor interviews per cycle",
      "Ad-hoc channel intelligence engagement for PE buyer assessing a target's channel-partner health",
      "Programmatic channel intelligence for a CI programme tracking 3 priority competitors",
      "Channel intelligence supporting a sell-side equity-research initiation report",
    ],
    faq: [
      {
        q: "How is this different from competitive intelligence generally?",
        a: "Channel intelligence is a specific source of CI signal. Competitive intelligence is the broader discipline; channel intelligence is one of the most reliable signal sources within it.",
      },
      {
        q: "Why do channel partners speak candidly to third parties?",
        a: "They typically have less commercial stake in protecting any one manufacturer's narrative. Third-party interviewer independence enables candour.",
      },
      {
        q: "What does channel intelligence cost?",
        a: "€500-€1,000 per channel-partner interview. Continuous programmes typically €15-40k annually.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "channel-and-distribution-research",
    relatedSlugs: ["channel-check", "competitive-intelligence", "ground-intelligence"],
    primaryKW: "channel intelligence",
  },
  {
    slug: "supplier-intelligence",
    id: "48",
    term: "Supplier Intelligence",
    name: "SUPPLIER INTELLIGENCE",
    title: "What Is Supplier Intelligence? Vendor-Side Insight",
    description:
      "Supplier intelligence is structured insight on a buyer's supplier base — gathered via supplier interviews, procurement-peer panels and category-buyer research.",
    definition:
      "Supplier intelligence is structured insight on a company's supplier or vendor base — gathered through interviews with suppliers themselves, peer procurement leaders at comparable companies, and category-buyer surveys. Used in vendor selection, spend optimisation and category strategy.",
    explanation: [
      "Supplier intelligence answers questions procurement teams can't get from vendors directly. What do peer companies pay for category X? Which suppliers are gaining or losing share at the category level? What contractual terms are achievable that aren't in our current contracts?",
      "Common applications: major vendor selection or renewal decisions; annual category strategy refresh; spend optimisation programmes; pre-RFP independent supplier capability assessment.",
      "Producing reliable supplier intelligence requires independent third-party sourcing. Suppliers will not share candid views with their existing buyers' procurement teams; independent interviewers surface materially more useful signal.",
      "Most strategic when run as part of an ongoing programme rather than one-off projects. Quarterly cycles produce longitudinal pattern recognition that informs annual category planning.",
    ],
    examples: [
      "A procurement team running supplier-side interviews ahead of a major vendor selection",
      "An annual category-strategy refresh including supplier and peer-procurement panels",
      "A spend-optimisation programme using supplier intelligence to surface achievable contract terms",
      "A pre-RFP supplier capability assessment before formal vendor evaluation",
    ],
    faq: [
      {
        q: "How is supplier intelligence different from typical procurement research?",
        a: "Procurement research is often desk-based. Supplier intelligence is operator-driven and includes supplier-side, peer-buyer-side and category-buyer panels.",
      },
      {
        q: "Will suppliers really speak candidly about their existing customers?",
        a: "Yes, with independent interviewer framing. Their interests are not entirely aligned with their customers' procurement teams; third-party interviewing surfaces useful signal.",
      },
      {
        q: "What does a typical supplier intelligence engagement cost?",
        a: "€15-40k per project. Programmatic engagements run €20-80k annually depending on category and panel size.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "supplier-and-procurement-research",
    relatedSlugs: ["channel-intelligence", "ground-intelligence", "competitive-intelligence"],
    primaryKW: "supplier intelligence",
  },
  {
    slug: "primary-intelligence",
    id: "49",
    term: "Primary Intelligence",
    name: "PRIMARY INTELLIGENCE",
    title: "What Is Primary Intelligence? - FieldSignal Glossary",
    description:
      "Primary intelligence is structured competitive, customer or channel insight derived from primary sources — operators, customers, channel partners, ex-employees.",
    definition:
      "Primary intelligence is structured competitive, customer or channel insight derived from primary sources — operators, customers, channel partners, ex-employees, ex-regulators — rather than from secondary sources (analyst reports, press, public filings). The umbrella term spans channel intelligence, supplier intelligence, ground intelligence and others.",
    explanation: [
      "Primary intelligence is the family of disciplines that use primary research to produce competitive, market or operational signal. The discipline matured over the last 25 years as expert networks industrialised primary research as an institutional service.",
      "The defining quality of primary intelligence is operator-level specificity. Where secondary intelligence summarises what's publicly knowable, primary intelligence surfaces what's only knowable through direct conversation with people who have first-hand operating experience.",
      "Modern primary intelligence programmes blend multiple signal types: expert interviews for operator perspective; channel checks for distribution-side reality; customer interviews for demand-side perspective; ex-regulator interviews for policy trajectory.",
      "Investment professionals and corporate strategy teams increasingly treat primary intelligence spend as a core input rather than a luxury — particularly in categories where the published narrative is too managed to be reliable on its own.",
    ],
    examples: [
      "A primary intelligence programme combining channel checks + customer interviews + ex-employee perspective for a hedge fund long thesis",
      "A corporate strategy team's primary intelligence engine running across 4 priority competitors",
      "An emerging-manager fund building a primary intelligence stack around a vertical-SaaS thesis",
      "A consulting firm's primary intelligence capability as a differentiator vs Big Four engagements",
    ],
    faq: [
      {
        q: "How is this different from competitive intelligence?",
        a: "CI is one use of primary intelligence. Primary intelligence is the broader discipline; CI is the application of primary intelligence to track competitors specifically.",
      },
      {
        q: "What does a typical primary intelligence programme cost?",
        a: "€20-100k annually for ongoing programmes. Project-based engagements €10-50k per project. Larger institutional programmes can exceed €500k annually.",
      },
      {
        q: "Is primary intelligence regulated?",
        a: "Yes — through MNPI rules, cooling-off periods, NDA compliance and per-call attestation. Reputable providers operate documented frameworks that institutional clients have approved.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "competitive-intelligence",
    relatedSlugs: ["channel-intelligence", "supplier-intelligence", "ground-intelligence"],
    primaryKW: "primary intelligence",
  },
  {
    slug: "expert-network-roi",
    id: "50",
    term: "Expert Network ROI",
    name: "EXPERT NETWORK ROI",
    title: "What Is Expert Network ROI? Measuring Programme Value",
    description:
      "Expert network ROI is the measurable return on expert-network spend — typically expressed through deal economics, avoided losses or programme-level productivity gains.",
    definition:
      "Expert network ROI is the measurable return generated on expert-network spend, expressed through one of three lenses: investment outcomes (deal economics, position alpha), avoided losses (deals not done, churn averted), or programme-level productivity gains (faster decisions, better-informed strategy).",
    explanation: [
      "ROI on expert-network spend is harder to measure than ROI on, say, sales tools — the connection between research and outcome is mediated by human decision-making. But where ROI can be measured, expert-network spend consistently shows favourable return ratios in the contexts it's used.",
      "Investment-side ROI: a hedge fund commissioning €10k of expert calls before sizing a position that subsequently delivers €500k of P&L attributes a portion of that P&L to the research input. Most funds measure this through structured post-mortems on completed trades.",
      "Diligence-side ROI: a PE fund commissioning €40k of CDD on a target it then declines based on findings avoided a multi-million-euro investment in a flawed company. The ROI is the avoided downside, not measurable in upside terms.",
      "Programme-side ROI: a corporate VoC programme costing €60k per year that informs product roadmap changes contributing to retention improvement. Measured through programme-level outcome metrics over multi-year windows.",
    ],
    examples: [
      "A hedge fund attributing $1.2M of position alpha to a $15k thesis-validation expert engagement",
      "A PE buyer avoiding an unfit acquisition based on CDD findings — €50k research spend saving a €40M+ investment",
      "A corporate strategy team accelerating market-entry decision by 6 months via expert work — opportunity cost saved",
      "An ongoing VoC programme costing €80k/yr that demonstrably reduced churn by an amount exceeding programme cost",
    ],
    faq: [
      {
        q: "How do I measure ROI on expert-network spend?",
        a: "Three lenses: investment outcomes, avoided losses, programme productivity. Document the connection between research and decisions; review quarterly.",
      },
      {
        q: "What ROI multiple should I expect?",
        a: "Highly variable. Investment-side ROI ratios of 10-100x on individual decisions are common when research influences a material outcome. Programme-side ROI is lower-multiple but steadier.",
      },
      {
        q: "Can ROI be negative?",
        a: "Yes — if expert work consistently confirms what was already known, or if the findings don't influence decisions. Reviewing programme ROI annually surfaces this.",
      },
    ],
    linkedServiceSlug: "expert-consultations",
    linkedUseCaseSlug: "investment-thesis-validation",
    relatedSlugs: ["primary-intelligence", "expert-network", "primary-research"],
    primaryKW: "expert network ROI",
  },
] as const;

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossary.find((g) => g.slug === slug);
}
