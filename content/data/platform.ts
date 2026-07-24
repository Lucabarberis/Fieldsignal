/**
 * Platform pages — SEO brief §4.9.
 *
 * Describes the FieldSignal platform: expert database, transcript
 * library, search/discovery, compliance tools, scheduling, integrations,
 * API. Aspirational where the product is still being built — be honest
 * about roadmap vs shipping.
 */

export type PlatformPage = {
  slug: string;
  id: string;
  name: string;
  title: string;
  description: string;
  oneLiner: string;
  pageLede: string;
  /** What ships today. */
  shipping: readonly string[];
  /** What's on the roadmap (call this out honestly). */
  roadmap: readonly string[];
  /** Frequently asked questions. */
  faq: readonly { q: string; a: string }[];
  primaryKW: string;
};

export const platformPages: readonly PlatformPage[] = [
  {
    slug: "expert-database",
    id: "01",
    name: "EXPERT DATABASE",
    title: "The Expert Database",
    description:
      "Searchable database of vetted experts across 80+ sectors. Filter by industry, role, geography and compliance status.",
    oneLiner:
      "Searchable database of 50,000+ vetted operators across 80+ sectors.",
    pageLede:
      "The expert database is the operational core of FieldSignal — 50,000+ vetted operating professionals across 80+ sectors and 50+ countries, with ongoing recruitment and compliance maintenance. Every expert has signed our master expert agreement and is screened for per-call attestation before any matched brief.",
    shipping: [
      "Search by industry, role, seniority, geography",
      "Compliance status visible at the expert level (cooling-off, conflict flags)",
      "Anonymised expert profiles delivered to clients pre-call",
      "Ongoing recruitment programme — net +500 experts/month average",
      "Quarterly performance audits on all active experts",
    ],
    roadmap: [
      "Public-facing search interface (Q3 2026)",
      "AI-assisted expert matching with confidence scoring",
      "Natural-language search beyond keyword filters",
      "Verified-credential badge for documented professional certifications",
    ],
    faq: [
      {
        q: "Can I search the database directly today?",
        a: "Today, expert search is run by our senior researchers based on your brief. Direct buyer search via the platform interface is planned for Q3 2026. Until then, expect a curated shortlist of 8-15 candidates within 24-72h of brief.",
      },
      {
        q: "How big is the database compared to GLG?",
        a: "GLG claims 1M+ experts. We have 50,000+. Network depth matters less than category fit — for buyers in scope-appropriate use cases, our bench depth is genuinely competitive. We'll be honest about category gaps.",
      },
      {
        q: "How are experts vetted before joining the database?",
        a: "Identity verification, employment-history check, master expert agreement signature, conflict-disclosure baseline. See the /compliance/expert-vetting page for full detail.",
      },
    ],
    primaryKW: "expert database",
  },
  {
    slug: "transcript-library",
    id: "02",
    name: "TRANSCRIPT LIBRARY",
    title: "Transcript Library",
    description:
      "Searchable library of past expert calls, indexed by company, topic and industry.",
    oneLiner:
      "5,000+ anonymised expert transcripts, indexed by company, topic and industry.",
    pageLede:
      "FieldSignal's transcript library gives subscribers searchable access to anonymised transcripts of past expert calls. Smaller than Tegus or Third Bridge Forum, but at a fraction of the cost — positioned for opportunistic browsing alongside custom call work, not as a full substitute.",
    shipping: [
      "5,000+ anonymised transcripts (growing weekly)",
      "Search by company, topic, industry, role",
      "Monthly subscription tier for individual analysts",
      "Team subscription pricing for groups of 5+",
      "All transcripts anonymised at expert and client identity",
    ],
    roadmap: [
      "AI-driven thematic search across the corpus (Q4 2026)",
      "Auto-summarisation of multi-transcript themes",
      "Integration with /transcripts programmatic SEO pages",
      "Bulk export for institutional subscribers",
    ],
    faq: [
      {
        q: "Is your library competitive with Tegus?",
        a: "No, not on volume or AI search. Tegus has 100,000+ transcripts with best-in-class AI indexing. We're positioned as opportunistic browsing at a fraction of the price, not a Tegus replacement. If transcripts are your primary research input, Tegus is the right product.",
      },
      {
        q: "How are transcripts anonymised?",
        a: "Expert identity is replaced with role-based descriptors (e.g. 'former VP Sales at major payments processor'). Client identity is removed entirely. All transcripts are reviewed for MNPI exposure before publication.",
      },
      {
        q: "What's the typical use case for transcript-library access?",
        a: "Opportunistic context-building before commissioning custom calls. Browsing adjacent categories before a strategic decision. Investigating themes you saw mentioned in analyst reports.",
      },
    ],
    primaryKW: "expert transcript library",
  },
  {
    slug: "search-and-discovery",
    id: "03",
    name: "SEARCH & DISCOVERY",
    title: "Search and Discovery",
    description:
      "Natural-language and faceted search across the expert database. Surface candidates pre-vetted for compliance.",
    oneLiner:
      "Natural-language and faceted search across the expert database.",
    pageLede:
      "Search and discovery is how briefs become expert shortlists. Today the matching is done by senior researchers reading every brief. The interface is being built in parallel — by Q3 2026, search-and-discovery will be available directly to clients alongside the researcher-led workflow.",
    shipping: [
      "Senior researcher reads every brief and curates a shortlist within 24-72h",
      "Shortlists include 8-15 candidate experts with anonymised profiles",
      "Compliance status (cooling-off, conflicts) surfaced at shortlist stage",
      "Natural-language brief acceptance — no rigid form fields",
    ],
    roadmap: [
      "Self-serve faceted search interface (Q3 2026)",
      "Natural-language query interface with AI matching (Q4 2026)",
      "Confidence scoring on AI-suggested matches",
      "Saved searches and standing alerts for recurring topics",
    ],
    faq: [
      {
        q: "Will I lose senior-researcher contact once self-serve search launches?",
        a: "No. Self-serve is additive — for buyers who want to browse directly. The senior-researcher curation workflow continues for buyers who prefer it. Most institutional clients use both.",
      },
      {
        q: "How does AI matching avoid producing irrelevant matches?",
        a: "Confidence scoring lets buyers filter on match quality, plus all AI-suggested matches still pass through senior-researcher review before they're presented to the buyer. AI accelerates; humans gate.",
      },
      {
        q: "Can I exclude specific companies or people from my search?",
        a: "Yes, today via the brief. The roadmap surfaces this as a persistent buyer-level exclusion list managed via the interface.",
      },
    ],
    primaryKW: "expert search platform",
  },
  {
    slug: "compliance-tools",
    id: "04",
    name: "COMPLIANCE TOOLS",
    title: "Compliance Tools",
    description:
      "Pre-call attestations, real-time call monitoring, exclusion-list screening and 7-year audit trails.",
    oneLiner:
      "Pre-call attestations, real-time monitoring, exclusion lists, 7-year audit trail.",
    pageLede:
      "Compliance is operational infrastructure, not a marketing claim. Our compliance tools enforce the framework on every call — pre-call attestation, conflict screening, exclusion-list checks and a 7-year audit trail produced on request for regulators or internal compliance.",
    shipping: [
      "Per-call attestation collected from every expert before every call",
      "Conflict-of-interest disclosure at expert and project level",
      "Cooling-off enforcement (6-month standard, longer for sensitive sectors)",
      "Exclusion-list screening at brief-vs-expert match stage",
      "Audit-trail record retained for 7 years per call",
      "Sample audit-trail records available to institutional clients on request",
    ],
    roadmap: [
      "Real-time compliance dashboard for institutional clients (Q4 2026)",
      "Integration with client-side compliance management systems",
      "Automated quarterly compliance reports for repeat institutional clients",
      "API access to audit-trail records for internal audit functions",
    ],
    faq: [
      {
        q: "How is your compliance framework different from GLG's?",
        a: "Structurally similar — both implement MNPI screening, cooling-off, NDA disclosure, conflict screening, audit trail. Procedural detail and integration depth differ. For most institutional use cases, the buyer-side compliance team approves both at parity.",
      },
      {
        q: "Can I see a sample audit-trail record before signing the MSA?",
        a: "Yes. Anonymised sample records available within 48 hours of request. We recommend institutional buyers request this — it's the operational artifact that proves the framework actually operates.",
      },
      {
        q: "How do you handle sector-specific compliance overlays?",
        a: "Healthcare KOL work follows ABPI/PhRMA standards. Financial services follows MAR/insider-list rules. Defense work follows ITAR. The overlay is applied automatically based on brief category and surfaced to the expert in the per-call attestation.",
      },
    ],
    primaryKW: "expert network compliance tools",
  },
  {
    slug: "scheduling-and-call-management",
    id: "05",
    name: "SCHEDULING & CALL MANAGEMENT",
    title: "Scheduling and Call Management",
    description:
      "Brief, schedule, conduct and document expert calls inside one workflow. Calendar sync, recording and AI transcription.",
    oneLiner:
      "Brief, schedule, conduct, document — one workflow.",
    pageLede:
      "End-to-end call management — from initial brief through expert shortlist, scheduling, the call itself, and the post-call documentation. Calendar sync, optional recording with expert consent, AI transcription and integrated notes.",
    shipping: [
      "Calendar integration (Google, Outlook, Apple)",
      "Automated scheduling with timezone handling",
      "Optional call recording (expert consent required)",
      "AI transcription within 24h of recorded calls",
      "Post-call summary delivered with expert profile",
      "Shareable links for internal team review",
    ],
    roadmap: [
      "Native video-call platform (today: Zoom/Teams/Meet handoff)",
      "Real-time AI note-taking during calls",
      "Auto-generated quote extraction for IC papers",
      "Calendar-side reminders integrated with brief management",
    ],
    faq: [
      {
        q: "Do experts have to agree to recording?",
        a: "Yes. Recording requires explicit expert consent per call. Experts may decline recording without penalty. Most experts consent, but consent is never assumed.",
      },
      {
        q: "What happens to call recordings after delivery?",
        a: "Recordings are retained as part of the 7-year audit trail per our compliance framework. Client-accessible copies persist for 90 days post-call by default, longer for institutional clients with documented retention requirements.",
      },
      {
        q: "Can my whole team see the post-call notes?",
        a: "Yes, via shareable links scoped to your account. Permissions are role-based for larger client teams.",
      },
    ],
    primaryKW: "expert call scheduling",
  },
  {
    slug: "integrations",
    id: "06",
    name: "INTEGRATIONS",
    title: "Integrations",
    description:
      "Connect FieldSignal to your existing research workflow. Slack notifications, Salesforce sync, Notion and Drive exports.",
    oneLiner:
      "Slack, Salesforce, Notion, Google Drive integrations.",
    pageLede:
      "Most research workflows already live in Slack, Salesforce, Notion or Google Drive. FieldSignal connects to your existing tooling so call notes, transcripts and findings land where your team already works — not in a separate platform they have to remember to log into.",
    shipping: [
      "Slack notifications on brief status, scheduled calls, completed transcripts",
      "Google Drive export of transcripts and post-call notes",
      "Notion integration: per-brief workspace pages auto-generated",
      "Email delivery as default fallback for any integration",
    ],
    roadmap: [
      "Salesforce CRM sync (Q3 2026)",
      "HubSpot integration for marketing/sales-led workflows",
      "Linear/Jira integration for product-led research workflows",
      "Webhook framework for custom integrations",
    ],
    faq: [
      {
        q: "Do I have to use the FieldSignal interface to use your service?",
        a: "No. Brief via email or Slack, receive transcripts and notes in Drive or Notion, never touch our interface if you don't want to. Most institutional clients prefer minimal context-switching.",
      },
      {
        q: "How does Slack integration work for compliance?",
        a: "Slack receives status notifications only — no transcripts or expert-identifying content. Full content delivery goes to access-controlled destinations (Drive, Notion, email) per your compliance requirements.",
      },
      {
        q: "What's the security model for integrations?",
        a: "OAuth-based authentication for each integration, scoped to minimum permissions needed. Connection records and access logs retained per audit-trail requirements.",
      },
    ],
    primaryKW: "expert network integrations",
  },
  {
    slug: "api",
    id: "07",
    name: "API",
    title: "API",
    description:
      "REST API for searching experts, scheduling calls, retrieving transcripts and syncing with internal research systems.",
    oneLiner:
      "REST API for searching experts, scheduling calls, retrieving transcripts.",
    pageLede:
      "For quant and research teams running primary research at scale, the API provides programmatic access to the FieldSignal platform — expert search, brief submission, call scheduling, transcript retrieval. Available to institutional clients on request.",
    shipping: [
      "REST API with OAuth authentication",
      "Endpoints for: brief submission, expert search, transcript retrieval",
      "Rate-limited to prevent abuse; institutional limits negotiable",
      "Webhook framework for asynchronous events",
      "Documentation available to authenticated institutional clients",
    ],
    roadmap: [
      "GraphQL endpoint alongside REST (Q4 2026)",
      "Direct integration with major quant platforms (Bloomberg, FactSet)",
      "Streaming API for real-time transcript delivery",
      "Open documentation portal (when API stability permits)",
    ],
    faq: [
      {
        q: "Is the API available to all clients?",
        a: "Today, available to institutional clients on request. Open API access for smaller buyers is on the roadmap once we've stabilised the institutional version.",
      },
      {
        q: "What does API access cost?",
        a: "Usage-based pricing within institutional MSA. Specific quotas depend on use case — research teams running 50+ calls per month typically get unlimited API access bundled with the engagement.",
      },
      {
        q: "Can I use the API to bypass compliance review?",
        a: "No. All brief submissions, regardless of channel, pass through the compliance framework. The API doesn't change what gets reviewed — only how briefs are submitted.",
      },
    ],
    primaryKW: "expert network API",
  },
] as const;

export function getPlatformPage(slug: string): PlatformPage | undefined {
  return platformPages.find((p) => p.slug === slug);
}
