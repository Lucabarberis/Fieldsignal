/**
 * Head-to-head comparison pages — buyers in late-stage evaluation,
 * comparing FieldSignal against a specific incumbent.
 *
 * Per SEO brief §4.7: positioning, feature table, pricing
 * comparison, when to choose each, switching guide.
 *
 * These pages are MORE conversion-focused than /alternatives —
 * the reader has already picked their two finalists. Don't waste
 * their time with category education.
 */

export type CompareRow = {
  feature: string;
  fieldsignal: string;
  competitor: string;
  /** Optional explanatory caption shown under the row in mobile. */
  note?: string;
};

export type CompareContent = {
  slug: string;
  id: string;
  /** Required — every compare page is FieldSignal vs ONE competitor. */
  competitorSlug: string;
  name: string;
  /** Display title used in the page header (already includes "vs"). */
  title: string;
  description: string;
  pageLede: string;
  /** One-sentence verdict — shown immediately under the lede. */
  verdict: string;
  /** Feature-by-feature comparison. Rendered as a table. */
  featureMatrix: readonly CompareRow[];
  /** Pricing comparison rows — narrower set than feature matrix. */
  pricingMatrix: readonly CompareRow[];
  /** "Choose [Competitor] if…" honest framing. */
  chooseCompetitorIf: readonly string[];
  /** "Choose FieldSignal if…" */
  chooseFieldsignalIf: readonly string[];
  /** Switching guide — concrete steps if reader picks FieldSignal. */
  switchingSteps: readonly string[];
  faq: readonly { q: string; a: string }[];
  primaryKW: string;
};

export const compares: readonly CompareContent[] = [
  // ─── vs GLG ──────────────────────────────────────────────────────
  {
    slug: "fieldsignal-vs-glg",
    id: "01",
    competitorSlug: "glg",
    name: "FIELDSIGNAL vs GLG",
    title: "FieldSignal vs GLG - Boutique vs Institutional Expert Network",
    description:
      "Honest head-to-head on price, network depth, turnaround and compliance. When GLG is right. When FieldSignal is.",
    pageLede:
      "GLG is the category leader — 1M+ experts, 24/7 global desk, institutional compliance baked in. FieldSignal is a boutique alternative built for funds that don't write six-figure cheques. Here is the honest comparison.",
    verdict:
      "Pick GLG if you run >$50k of research a year and need a 24/7 desk. Pick FieldSignal if you run 5-30 calls a year and can't justify a retainer.",
    featureMatrix: [
      { feature: "Network size", fieldsignal: "50,000+ vetted experts", competitor: "1,000,000+ experts" },
      { feature: "Time to first call", fieldsignal: "48–72h typical", competitor: "Same-day possible" },
      { feature: "Account model", fieldsignal: "Senior researcher direct", competitor: "Account-managed (multi-tier)" },
      { feature: "Compliance framework", fieldsignal: "Documented, audit-ready", competitor: "Enterprise-grade, integrations standard" },
      { feature: "Transcript library", fieldsignal: "€99/mo add-on", competitor: "Premium tier, ~$25k+/yr" },
      { feature: "Survey panels", fieldsignal: "Not offered", competitor: "Yes, at scale" },
      { feature: "Geographic depth", fieldsignal: "Strong EU + global on demand", competitor: "All regions, 24/7 coverage" },
    ],
    pricingMatrix: [
      { feature: "Pricing model", fieldsignal: "Per-call, per-project, or subscription", competitor: "Annual retainer + per-call" },
      { feature: "Per-call range", fieldsignal: "€500–1,500", competitor: "$500–1,500" },
      { feature: "Annual minimum", fieldsignal: "None", competitor: "Six figures typical" },
      { feature: "Published rates", fieldsignal: "Yes — public pricing page", competitor: "Bespoke, NDA-gated" },
    ],
    chooseCompetitorIf: [
      "You need 24/7 global desk coverage with same-day sourcing",
      "Your annual research budget is comfortably six figures",
      "You require enterprise SSO + native compliance integrations",
      "Your IC expects to see GLG as a vetted research vendor",
      "You're running quantitative survey panels alongside qualitative calls",
    ],
    chooseFieldsignalIf: [
      "You run 5–30 expert calls a year — retainers don't pencil out",
      "You want transparent published pricing without an NDA",
      "You want the senior researcher on every call, not a junior account manager",
      "You need EU-jurisdictional contracting and GDPR documentation as standard",
      "You want optional transcript library access at €99/mo, not $25k/yr",
    ],
    switchingSteps: [
      "Email us with your three most recent GLG project briefs (sanitised)",
      "We'll quote per-call and per-project alternatives within 24 hours",
      "Side-by-side cost projection across your typical annual volume",
      "Sign a single MSA with no annual minimum — pay only what you use",
      "First expert call inside 72 hours of MSA signature",
    ],
    faq: [
      {
        q: "Will I lose access to GLG's transcript library if I switch?",
        a: "Yes — GLG's premium tier transcripts are proprietary. FieldSignal offers a €99/mo independent transcript library, which most former-GLG buyers find sufficient for opportunistic browsing.",
      },
      {
        q: "Can FieldSignal source the same experts GLG can?",
        a: "For the majority of qualitative research themes, yes. GLG wins on edge-case verticals where their 1M network has more depth — typically obscure foreign-market specialists or very-recent-departure execs at hot companies.",
      },
      {
        q: "Is FieldSignal's compliance framework recognised by institutional LPs?",
        a: "Yes. Our framework follows the same documentation standards as GLG, AlphaSights and Third Bridge. We've supplied compliance documentation to LP DDQs for emerging-manager funds without flag.",
      },
      {
        q: "How does turnaround compare in practice?",
        a: "GLG can deliver same-day for urgent requests with a senior account. FieldSignal averages 48–72 hours from brief to first call. If you need faster than that consistently, AlphaSights is honestly a better fit than us.",
      },
    ],
    primaryKW: "FieldSignal vs GLG",
  },

  // ─── vs AlphaSights ──────────────────────────────────────────────
  {
    slug: "fieldsignal-vs-alphasights",
    id: "02",
    competitorSlug: "alphasights",
    name: "FIELDSIGNAL vs ALPHASIGHTS",
    title: "FieldSignal vs AlphaSights - Boutique vs Speed-First Service",
    description:
      "Where AlphaSights' speed and account model wins. Where FieldSignal's per-call pricing and senior contact win. Honest comparison.",
    pageLede:
      "AlphaSights' competitive moat is speed and polished service — first call inside 24 hours, fully account-managed end to end. FieldSignal trades a little of that polish for transparent pricing and direct senior contact. Here's where each wins.",
    verdict:
      "Pick AlphaSights if speed beats price and you have the retainer budget. Pick FieldSignal if you'd rather brief the senior researcher directly and pay by the call.",
    featureMatrix: [
      { feature: "Time to first call", fieldsignal: "48–72h typical", competitor: "Often <24h" },
      { feature: "Account model", fieldsignal: "Senior researcher direct, no triage", competitor: "Dedicated analyst staffing per project" },
      { feature: "Network size", fieldsignal: "50,000+ vetted experts", competitor: "Several hundred thousand" },
      { feature: "PE-coverage depth", fieldsignal: "Solid, EU-mid-market strong", competitor: "Industry-leading, especially EU PE" },
      { feature: "Service polish", fieldsignal: "Founder-led, less corporate", competitor: "Highly polished, account-managed" },
      { feature: "Compliance posture", fieldsignal: "Documented, audit-ready", competitor: "Enterprise-grade" },
    ],
    pricingMatrix: [
      { feature: "Pricing model", fieldsignal: "Per-call, per-project, subscription", competitor: "Annual retainer + per-call" },
      { feature: "Per-call range", fieldsignal: "€500–1,500", competitor: "$600–1,400" },
      { feature: "Annual minimum", fieldsignal: "None", competitor: "Six figures typical" },
      { feature: "Published rates", fieldsignal: "Yes — public pricing", competitor: "Bespoke" },
    ],
    chooseCompetitorIf: [
      "First-call turnaround under 24 hours is consistently critical",
      "You're a PE fund doing EU mid-market deals — AlphaSights' bench is genuinely deeper there",
      "You prefer fully account-managed service over briefing the researcher direct",
      "Annual retainer budget is already approved",
      "You value polished pitch decks and reporting alongside the raw calls",
    ],
    chooseFieldsignalIf: [
      "You want to brief the senior researcher yourself, not through an analyst layer",
      "Per-call pricing transparently published matters to your procurement",
      "Your annual volume doesn't justify a six-figure retainer",
      "You're EU-domiciled and want EU-jurisdictional contracting",
      "Your typical turnaround need is 48–72h, not <24h",
    ],
    switchingSteps: [
      "Forward us your most recent AlphaSights brief (sanitised)",
      "We'll quote against it in 24 hours including expected timeline",
      "Compare blended per-call cost vs your retainer breakeven point",
      "Sign single-project MSA — no annual commit",
      "First call landed inside our standard 48–72h window",
    ],
    faq: [
      {
        q: "Can FieldSignal really not match AlphaSights' speed?",
        a: "Honestly, not consistently. AlphaSights' service model is built around 24h turnaround with dedicated analyst staffing. We can hit 24h on individual projects but our average is 48–72h. If speed is your top buying criterion, AlphaSights is the right answer.",
      },
      {
        q: "What about PE mid-market coverage?",
        a: "AlphaSights is exceptionally strong here — particularly EU mid-market. We have solid coverage and our senior researcher has 10+ years in EU industrial research, but we don't claim the same depth of dedicated analyst bench.",
      },
      {
        q: "How does the contracting jurisdiction matter?",
        a: "If you're an EU-domiciled fund, signing with an EU-domiciled boutique simplifies GDPR data-processor arrangements. AlphaSights' London entity also works, but FieldSignal's EU contracting can be a procurement-friction win.",
      },
      {
        q: "Will my AlphaSights account manager experience be missed?",
        a: "Some buyers love the white-glove service. Others find the analyst-layer adds latency. Try one FieldSignal project — if you miss the AlphaSights model, we'll be the first to recommend you stay there.",
      },
    ],
    primaryKW: "FieldSignal vs AlphaSights",
  },

  // ─── vs Third Bridge ─────────────────────────────────────────────
  {
    slug: "fieldsignal-vs-third-bridge",
    id: "03",
    competitorSlug: "third-bridge",
    name: "FIELDSIGNAL vs THIRD BRIDGE",
    title: "FieldSignal vs Third Bridge - Calls vs Transcript Library",
    description:
      "Third Bridge's Forum library vs FieldSignal's custom calls + lightweight transcripts. Where each genuinely wins.",
    pageLede:
      "Third Bridge's standout product is Forum — analyst-led transcripts interviewed and indexed by sector specialists. FieldSignal's standout is custom 1:1 expert calls with senior briefing. Here's the honest comparison of the two models.",
    verdict:
      "Pick Third Bridge if you primarily consume curated transcripts at volume. Pick FieldSignal if your workflow is custom calls plus opportunistic transcript browsing.",
    featureMatrix: [
      { feature: "Primary product", fieldsignal: "1:1 custom calls", competitor: "Forum transcript library (analyst-led)" },
      { feature: "Transcript editorial quality", fieldsignal: "Lighter editorial, raw transcript", competitor: "Industry-leading editorial polish" },
      { feature: "Sector themed reports", fieldsignal: "Not offered as standalone product", competitor: "Yes — Forum sector deep-dives" },
      { feature: "Network size", fieldsignal: "50,000+ vetted experts", competitor: "Tens of thousands + transcript library" },
      { feature: "Senior briefing", fieldsignal: "Direct on every project", competitor: "Account-managed" },
    ],
    pricingMatrix: [
      { feature: "Pricing model", fieldsignal: "Per-call, per-project, subscription", competitor: "Subscription + per-call" },
      { feature: "Per-call range", fieldsignal: "€500–1,500", competitor: "$500–1,200" },
      { feature: "Transcript access", fieldsignal: "€99/mo (independent library)", competitor: "Bundled in Forum subscription" },
      { feature: "Annual minimum", fieldsignal: "None", competitor: "Mid-five to six figures typical" },
    ],
    chooseCompetitorIf: [
      "Your team consumes 200+ transcripts/year and analyst-led editorial matters",
      "You want sector-themed Forum reports as part of the standing diet",
      "PE diligence is your primary use case — Forum's PE coverage is excellent",
      "You're already paying for the Forum subscription and getting good value",
    ],
    chooseFieldsignalIf: [
      "Your workflow is custom calls first, transcripts second",
      "You consume 5–20 transcripts a year — Forum's subscription doesn't pencil",
      "You want unbundled pricing — pay for transcripts and calls separately",
      "You want direct senior researcher briefing rather than the Forum desk",
    ],
    switchingSteps: [
      "Tell us how many transcripts vs custom calls you actually used last year",
      "We'll quote bundled custom calls + transcript library (€99/mo) vs your Forum spend",
      "Maintain Forum for 60 days while you onboard us — no rush",
      "Single MSA, no annual minimum on the FieldSignal side",
      "First custom call inside 72h",
    ],
    faq: [
      {
        q: "Is FieldSignal's transcript library comparable to Forum?",
        a: "No — Forum is in its own league for editorial quality and sector breadth. Our transcript library is positioned as opportunistic browsing access, not a Forum replacement. Most buyers who switch from Third Bridge to us were under-using their Forum subscription.",
      },
      {
        q: "What about Third Bridge's sector themed reports?",
        a: "We don't offer themed sector reports as a standing product. If those reports are core to your research diet, stay with Third Bridge.",
      },
      {
        q: "Can FieldSignal source the same experts Forum analysts source?",
        a: "Yes for most. Forum's bench is curated for transcript-suitable speakers (articulate, willing to be recorded). Our bench is curated for live 1:1 briefing — slightly different qualification, broadly overlapping pool.",
      },
      {
        q: "Why is FieldSignal's transcript library so much cheaper?",
        a: "Because we don't claim Forum-level editorial. €99/mo gives you searchable access to raw transcripts. If you need polished analyst summaries on top, Forum is still the right product.",
      },
    ],
    primaryKW: "FieldSignal vs Third Bridge",
  },

  // ─── vs Guidepoint ───────────────────────────────────────────────
  {
    slug: "fieldsignal-vs-guidepoint",
    id: "04",
    competitorSlug: "guidepoint",
    name: "FIELDSIGNAL vs GUIDEPOINT",
    title: "FieldSignal vs Guidepoint - Boutique vs Generalist Breadth",
    description:
      "Guidepoint's multi-region scale vs FieldSignal's per-project depth. When each is genuinely the right answer.",
    pageLede:
      "Guidepoint is built for generalist breadth — 1.5M+ advisors, strong APAC and EMEA coverage, survey panels at scale. FieldSignal is built for per-project depth at boutique cheque sizes. Here's where each wins.",
    verdict:
      "Pick Guidepoint if you need broad multi-region generalist coverage and can fund the retainer. Pick FieldSignal if you need deep per-project attention at boutique scale.",
    featureMatrix: [
      { feature: "Network size", fieldsignal: "50,000+ vetted experts", competitor: "1,500,000+ advisors" },
      { feature: "APAC coverage", fieldsignal: "On-demand, project-by-project", competitor: "Strong dedicated bench" },
      { feature: "Survey/quant panels", fieldsignal: "Not offered", competitor: "Yes, at scale" },
      { feature: "Per-project attention", fieldsignal: "Senior researcher direct", competitor: "Account-managed, multi-tier" },
      { feature: "Compliance integrations", fieldsignal: "Documented, audit-ready", competitor: "Enterprise SSO standard" },
    ],
    pricingMatrix: [
      { feature: "Pricing model", fieldsignal: "Per-call, per-project, subscription", competitor: "Annual retainer + per-call" },
      { feature: "Per-call range", fieldsignal: "€500–1,500", competitor: "$500–1,500" },
      { feature: "Annual minimum", fieldsignal: "None", competitor: "Six figures typical" },
      { feature: "Published rates", fieldsignal: "Yes", competitor: "Bespoke" },
    ],
    chooseCompetitorIf: [
      "You need strong APAC, EMEA and Americas coverage in one vendor",
      "Survey and quant panels are part of your research diet",
      "Annual retainer budget is comfortably approved",
      "Multi-tier account management matches your buying process",
      "You expect enterprise SSO and integration with internal research tooling",
    ],
    chooseFieldsignalIf: [
      "Your research weight is EU + global on-demand, not standing APAC bench",
      "You don't need survey panels — your work is qualitative 1:1",
      "Per-call pricing without retainer matters to your unit economics",
      "Senior-researcher-direct is more valuable to you than account management",
    ],
    switchingSteps: [
      "Send us your last 5 Guidepoint briefs and the regions they covered",
      "We'll quote per-call against your blended Guidepoint rate",
      "Test on one project — keep Guidepoint live during the transition",
      "Sign single MSA with no annual minimum",
      "First call inside 72h",
    ],
    faq: [
      {
        q: "Will FieldSignal handle APAC research?",
        a: "Yes, on-demand. We source APAC experts project-by-project rather than maintaining a standing APAC desk. If APAC is 30%+ of your annual research weight, Guidepoint's dedicated APAC bench is probably better.",
      },
      {
        q: "What about survey panels?",
        a: "We don't offer survey panels. If quantitative B2B surveys are part of your standing diet, Guidepoint (or NewtonX) is the right call.",
      },
      {
        q: "Are FieldSignal compliance integrations as deep as Guidepoint's?",
        a: "We don't offer enterprise SSO integrations today. Our compliance documentation matches Guidepoint's framework, but if SSO into your research tooling is required, that's a real gap.",
      },
      {
        q: "Is Guidepoint's network really 30x larger?",
        a: "Yes, in raw advisor count. But for any given qualitative brief, the question isn't network size — it's whether the right 5–10 experts can be sourced. We hit that bar on every project we accept.",
      },
    ],
    primaryKW: "FieldSignal vs Guidepoint",
  },

  // ─── vs Tegus ────────────────────────────────────────────────────
  {
    slug: "fieldsignal-vs-tegus",
    id: "05",
    competitorSlug: "tegus",
    name: "FIELDSIGNAL vs TEGUS",
    title: "FieldSignal vs Tegus - Custom Calls vs Transcript Library",
    description:
      "Tegus' AI-indexed transcript library vs FieldSignal's custom calls + €99/mo transcripts. When each wins, honestly.",
    pageLede:
      "Tegus (now part of AlphaSense) built the largest searchable transcript library in the category — AI-indexed, investor-workflow-first. FieldSignal's custom calls + lightweight transcript library are positioned for buyers who need bespoke sourcing more than searchable archives.",
    verdict:
      "Pick Tegus if you're an active buy-side analyst consuming 100+ transcripts a year. Pick FieldSignal if your workflow is custom calls with opportunistic transcript browsing.",
    featureMatrix: [
      { feature: "Primary product", fieldsignal: "1:1 custom expert calls", competitor: "AI-searchable transcript library" },
      { feature: "Transcript library size", fieldsignal: "Curated, growing — independent", competitor: "100,000+ transcripts, industry-leading" },
      { feature: "AI search + summarisation", fieldsignal: "Basic search", competitor: "Best-in-class AI thematic search" },
      { feature: "Custom expert sourcing", fieldsignal: "Core product", competitor: "Supported separately, not core" },
      { feature: "Investor workflow", fieldsignal: "Brief → call → notes", competitor: "Search → read → annotate" },
    ],
    pricingMatrix: [
      { feature: "Pricing model", fieldsignal: "Per-call + €99/mo transcripts", competitor: "Annual subscription (transcripts)" },
      { feature: "Per-call range", fieldsignal: "€500–1,500", competitor: "Custom (calls supported separately)" },
      { feature: "Transcript-only access", fieldsignal: "€99/mo", competitor: "Tens of thousands annually" },
      { feature: "Annual minimum", fieldsignal: "None", competitor: "Tens of thousands annually" },
    ],
    chooseCompetitorIf: [
      "You're an active buy-side analyst consuming 100+ transcripts/year",
      "AI-driven thematic search across transcripts is core to your workflow",
      "You're already in the AlphaSense ecosystem post-acquisition",
      "Transcript browsing > custom call sourcing in your annual mix",
    ],
    chooseFieldsignalIf: [
      "Your annual mix is 70%+ custom calls, 30% transcripts",
      "Tegus subscription costs more than you're getting out of it",
      "You want transcript access at €99/mo for occasional reference",
      "Senior-researcher-direct briefing is part of your buying criteria",
    ],
    switchingSteps: [
      "Audit your last 12 months of Tegus usage — transcripts read vs custom calls",
      "If custom calls > 30% of value, FieldSignal likely cheaper at lower commitment",
      "Add FieldSignal as second vendor — don't drop Tegus mid-cycle",
      "Sign single MSA, €99/mo transcript add-on optional",
      "First custom call inside 72h",
    ],
    faq: [
      {
        q: "Is FieldSignal's transcript library competitive with Tegus?",
        a: "No, not on volume or AI search. Tegus has 100,000+ transcripts and best-in-class AI indexing. Our library is positioned as opportunistic browsing at a fraction of the price, not a Tegus replacement.",
      },
      {
        q: "What if I love AlphaSense + Tegus integrated?",
        a: "Stay. The unified document + transcript search is genuinely best-in-class for equity research workflows. FieldSignal doesn't compete on that axis.",
      },
      {
        q: "Can FieldSignal handle bespoke expert sourcing better than Tegus?",
        a: "Yes — custom sourcing is our core product. Tegus supports it but their growth story is the searchable library, not bespoke calls.",
      },
      {
        q: "Why is FieldSignal so much cheaper for transcripts?",
        a: "Because we're not selling AI search or analyst-curated metadata. €99/mo gets you searchable raw transcripts. If you need Tegus-level tooling, the price gap is justified.",
      },
    ],
    primaryKW: "FieldSignal vs Tegus",
  },

  // ─── vs Coleman Research ─────────────────────────────────────────
  {
    slug: "fieldsignal-vs-coleman-research",
    id: "06",
    competitorSlug: "coleman-research",
    name: "FIELDSIGNAL vs COLEMAN RESEARCH",
    title: "FieldSignal vs Coleman Research - Healthcare and Beyond",
    description:
      "Coleman's healthcare bench vs FieldSignal's broader EU coverage and unbundled pricing. Where each is the right call.",
    pageLede:
      "Coleman Research has built genuinely deep healthcare and life-sciences coverage disproportionate to their overall size. FieldSignal sits adjacent — broader sector coverage, EU-jurisdictional, no retainer requirement. Here's the honest pick.",
    verdict:
      "Pick Coleman if healthcare is the dominant share of your research diet. Pick FieldSignal if your sector mix is broader and you want EU contracting.",
    featureMatrix: [
      { feature: "Healthcare & life-sci depth", fieldsignal: "Good but not dominant", competitor: "Disproportionately deep" },
      { feature: "Sector breadth outside healthcare", fieldsignal: "Broad — industrials, tech, services", competitor: "Solid, but healthcare is the strength" },
      { feature: "Onboarding speed", fieldsignal: "MSA in days", competitor: "Faster than largest networks" },
      { feature: "EU jurisdiction", fieldsignal: "Yes — EU contracting standard", competitor: "US-domiciled (NC)" },
      { feature: "Compliance reputation", fieldsignal: "Documented, audit-ready", competitor: "Strong, established" },
    ],
    pricingMatrix: [
      { feature: "Pricing model", fieldsignal: "Per-call, per-project, subscription", competitor: "Annual retainer + per-call" },
      { feature: "Per-call range", fieldsignal: "€500–1,500", competitor: "$500–1,200" },
      { feature: "Annual minimum", fieldsignal: "None", competitor: "Five to six figures" },
      { feature: "Published rates", fieldsignal: "Yes", competitor: "Bespoke" },
    ],
    chooseCompetitorIf: [
      "Healthcare and life-sciences is >50% of your research diet",
      "You value Coleman's established US compliance reputation",
      "Mid-market retainer fits your annual budget",
      "Your firm already has Coleman onboarded as a vendor",
    ],
    chooseFieldsignalIf: [
      "Your sector mix is broader than healthcare-dominant",
      "EU-jurisdictional contracting is a procurement preference",
      "You want no annual minimum and transparent published rates",
      "Per-project flexibility matters more than long-standing vendor familiarity",
    ],
    switchingSteps: [
      "Send us your last 12 months of Coleman briefs by sector",
      "We'll quote against your blended rate including any healthcare projects",
      "Test on one non-healthcare project to compare bench depth",
      "Sign single EU MSA — no annual commit",
      "First call inside 72h",
    ],
    faq: [
      {
        q: "Can FieldSignal match Coleman on healthcare depth?",
        a: "Not on healthcare specifically. Coleman's life-sciences bench is genuinely deeper than ours. If healthcare is your dominant sector, Coleman is the right answer.",
      },
      {
        q: "What about non-healthcare sectors?",
        a: "We're broadly stronger on industrials, EU tech and services. Coleman's coverage outside healthcare is solid but not their strength.",
      },
      {
        q: "Why does EU contracting matter?",
        a: "If you're an EU-domiciled fund, signing with an EU-domiciled boutique simplifies GDPR data-processor arrangements. Coleman's US contracting works but adds documentation friction.",
      },
      {
        q: "Is Coleman's retainer worth it at mid-market scale?",
        a: "If you run >$30k annual healthcare research, yes. Below that threshold, FieldSignal's no-minimum model is materially more efficient.",
      },
    ],
    primaryKW: "FieldSignal vs Coleman Research",
  },
] as const;

/** Helper: look up a comparison by slug. */
export function getCompare(slug: string): CompareContent | undefined {
  return compares.find((c) => c.slug === slug);
}
