/**
 * Industry sub-niche pages — Wave 3 of the SEO build.
 *
 * Each entry targets "[sub-niche] expert network" + 2-3 niche keywords
 * per SEO brief §4.3. Sub-pages live at /industries/[parent]/[sub].
 *
 * Parent industries are defined in industries.ts. The two files are
 * loosely coupled — sub-niches reference parents by slug.
 */

export type IndustrySubniche = {
  parentSlug: string;
  slug: string;
  /** Internal id like "01.1.1" (parent.section.position). */
  id: string;
  name: string;
  title: string;
  description: string;
  pageLede: string;
  /** Expert archetypes we cover in this sub-niche. */
  expertTypes: readonly string[];
  /** Questions buyers typically come to us with. */
  sampleQuestions: readonly string[];
  /** Anonymised recent project examples. */
  recentProjects: readonly string[];
  primaryKW: string;
};

export const industrySubniches: readonly IndustrySubniche[] = [
  // ─── TECHNOLOGY (7) ────────────────────────────────────────────
  {
    parentSlug: "technology",
    slug: "saas",
    id: "01.1.1",
    name: "SAAS",
    title: "SaaS Expert Network - Operators, PMs and Buyers on Demand",
    description:
      "Speak with SaaS operators, PMs, RevOps leaders and end-buyers. Coverage across horizontal SaaS, vertical SaaS and PLG-led companies.",
    pageLede:
      "Over 5,000 vetted SaaS operators in our network — from founder-CTOs at seed startups to RevOps directors at $1B ARR public companies. Horizontal, vertical, PLG and enterprise. Buyer-side panels available within 5-7 days.",
    expertTypes: [
      "Founder-CTOs and VP Engineering",
      "Product managers and Heads of Product",
      "RevOps directors and CROs",
      "Customer success VPs and post-sale leaders",
      "Enterprise buyers — Heads of Platform, CIOs",
      "Ex-operators from category leaders (Salesforce, HubSpot, etc.)",
    ],
    sampleQuestions: [
      "What does the buyer journey look like for category X SaaS today?",
      "How is the consolidation/bundling trend reshaping pricing in vertical SaaS?",
      "What's the retention curve for PLG vs sales-led motions at scale?",
      "Where are enterprise budgets shifting in 2026?",
    ],
    recentProjects: [
      "Vertical SaaS competitive positioning across 3 niches",
      "PLG to enterprise transition playbook — interviews with 12 operators",
      "Retention benchmarks for early-stage vertical SaaS",
    ],
    primaryKW: "SaaS expert network",
  },
  {
    parentSlug: "technology",
    slug: "cybersecurity",
    id: "01.1.2",
    name: "CYBERSECURITY",
    title: "Cybersecurity Expert Network - CISOs, Practitioners and Buyers",
    description:
      "CISOs, security architects, SOC analysts and infosec procurement on demand. EDR, SIEM, SASE, identity and cloud security depth.",
    pageLede:
      "Working CISOs, ex-CISOs, security architects, SOC leaders and procurement specialists across the cybersecurity buyer landscape. Coverage across EDR, SIEM, SASE, IAM, cloud security and emerging AI-security categories.",
    expertTypes: [
      "Active CISOs (mid-market to Fortune 100)",
      "Ex-CISOs available for sustained engagements",
      "Security architects and SOC managers",
      "Infosec procurement and vendor management",
      "Ex-vendor sales engineers (deep product knowledge)",
      "Industry analysts (ex-Gartner, ex-Forrester practitioners)",
    ],
    sampleQuestions: [
      "How is EDR consolidation affecting buyer behaviour in the mid-market?",
      "What's the real adoption picture for SASE in regulated industries?",
      "Where are CISOs prioritising spend in the 2026 budget cycle?",
      "What does the practitioner sentiment look like on AI-security tooling?",
    ],
    recentProjects: [
      "EDR consolidation buyer panel — 18 CISO interviews",
      "Cloud security posture management category sizing",
      "SOC tooling vendor displacement diligence for PE buyer",
    ],
    primaryKW: "cybersecurity expert network",
  },
  {
    parentSlug: "technology",
    slug: "cloud-infrastructure",
    id: "01.1.3",
    name: "CLOUD INFRASTRUCTURE",
    title: "Cloud Infrastructure Experts - AWS, Azure, GCP and Beyond",
    description:
      "Hyperscaler buyers, FinOps leaders, platform engineers and cloud architects. Workload migration, spend optimization, multi-cloud strategy.",
    pageLede:
      "Hyperscaler buyers, FinOps practitioners, platform engineers and ex-AWS/Azure/GCP sales engineers. Deep coverage of workload economics, multi-cloud strategy and the practical reality of cloud spend at scale.",
    expertTypes: [
      "FinOps leaders and cloud cost specialists",
      "Platform engineering and SRE leaders",
      "Ex-hyperscaler sales engineers and product PMs",
      "Cloud architects and migration specialists",
      "CTOs at cloud-native and cloud-migrating companies",
    ],
    sampleQuestions: [
      "How is workload distribution changing across AWS/Azure/GCP at the enterprise tier?",
      "What's the real economics of cloud repatriation when it happens?",
      "How are FinOps teams structured at companies spending >$50M/yr on cloud?",
      "What does the practitioner picture look like for hyperscaler vs neocloud GPU economics?",
    ],
    recentProjects: [
      "Hyperscaler share-of-wallet study — 22 FinOps interviews",
      "GPU economics diligence for AI infrastructure investor",
      "Multi-cloud governance benchmarking",
    ],
    primaryKW: "cloud infrastructure experts",
  },
  {
    parentSlug: "technology",
    slug: "semiconductors",
    id: "01.1.4",
    name: "SEMICONDUCTORS",
    title: "Semiconductor Expert Network - Foundry, Design, Equipment",
    description:
      "Foundry operators, fabless executives, equipment OEMs and packaging specialists. Coverage across logic, memory, analog and power.",
    pageLede:
      "Foundry process engineers, fabless executives, semiconductor equipment OEM leaders and packaging specialists. Coverage across logic (TSMC/Samsung/Intel ecosystem), memory, analog, power and emerging chiplet/advanced-packaging categories.",
    expertTypes: [
      "Foundry process and operations engineers (current and ex)",
      "Fabless executives — CEOs, COOs, VP Engineering",
      "Equipment OEM commercial and applications engineers",
      "Advanced packaging and substrate specialists",
      "Channel and distribution executives",
      "Industry analysts with operator backgrounds",
    ],
    sampleQuestions: [
      "How is the foundry capacity allocation picture evolving across N3/N2?",
      "What are real lead times and ASPs for advanced packaging?",
      "How is the AI accelerator landscape shaping wafer demand?",
      "What's the practitioner read on China's foundry advances?",
    ],
    recentProjects: [
      "Advanced packaging market sizing — 14 expert interviews",
      "Semiconductor channel economics post-2024 inventory cycle",
      "Foundry capacity allocation benchmarking",
    ],
    primaryKW: "semiconductor expert network",
  },
  {
    parentSlug: "technology",
    slug: "ai-and-machine-learning",
    id: "01.1.5",
    name: "AI & MACHINE LEARNING",
    title: "AI and Machine Learning Expert Network - Builders and Buyers",
    description:
      "ML engineers, AI product leaders, data platform architects and enterprise buyers. Foundation models, vertical AI, ML-Ops, GPU economics.",
    pageLede:
      "ML engineers, AI product leaders, data platform architects and enterprise AI buyers. Coverage spans foundation model lab engineering, vertical AI applications, ML-Ops tooling and the GPU economics behind it all.",
    expertTypes: [
      "ML engineers and research engineers from frontier labs",
      "AI product leaders at applied-AI companies",
      "Data platform and infrastructure architects",
      "Enterprise AI buyers (CIOs, Heads of AI)",
      "ML-Ops tooling operators and ex-vendor PMs",
      "Domain experts using AI in production (legal, medical, finance)",
    ],
    sampleQuestions: [
      "What's the real adoption picture for enterprise AI beyond pilots?",
      "How are foundation model labs differentiating commercially in 2026?",
      "Where is vertical AI actually winning vs horizontal?",
      "What does GPU procurement look like at scale outside hyperscalers?",
    ],
    recentProjects: [
      "Enterprise AI buyer panel — 20 CIO interviews",
      "Vertical AI competitive positioning in legal and healthcare",
      "GPU procurement diligence for AI infra investor",
    ],
    primaryKW: "AI expert network",
  },
  {
    parentSlug: "technology",
    slug: "developer-tools",
    id: "01.1.6",
    name: "DEVELOPER TOOLS",
    title: "Developer Tools Expert Network - DevEx, CI/CD, Observability",
    description:
      "Platform engineering leaders, DevEx managers, SRE leads and developer-buyer panels for tooling categories from IDE to observability.",
    pageLede:
      "Platform engineering directors, developer experience leaders, SRE managers and developer-buyer panels. Coverage from IDE and version control through CI/CD, observability, security scanning and emerging AI-coding categories.",
    expertTypes: [
      "Platform engineering and DevEx leaders",
      "SRE and reliability engineering directors",
      "CI/CD and build-tooling specialists",
      "Observability platform operators (Datadog, New Relic, etc.)",
      "Developer-buyer panels for category research",
      "Ex-vendor PMs from category leaders",
    ],
    sampleQuestions: [
      "What's driving consolidation in observability buying right now?",
      "How is AI-coding tool adoption changing developer workflows?",
      "What does internal platform engineering look like at companies of N developers?",
      "Where are CI/CD budgets shifting?",
    ],
    recentProjects: [
      "Observability vendor displacement diligence",
      "AI-coding tool adoption survey — 30 developer panel",
      "Internal platform engineering benchmarking",
    ],
    primaryKW: "developer tools expert network",
  },
  {
    parentSlug: "technology",
    slug: "fintech-software",
    id: "01.1.7",
    name: "FINTECH SOFTWARE",
    title: "Fintech Software Expert Network - Payments, Lending, Risk",
    description:
      "Software-focused fintech operators across payments, lending, treasury, compliance and risk. Distinct from broader fintech industry page.",
    pageLede:
      "Software-focused fintech operators across payments infrastructure, lending platforms, treasury management, compliance and risk tooling. This is the SaaS-lens cut of fintech — distinct from our broader financial-services industry page.",
    expertTypes: [
      "Payments platform operators and product leaders",
      "Lending software CTOs and product VPs",
      "Treasury and embedded-finance specialists",
      "Compliance and risk software operators",
      "Bank/buyer-side technology decision makers",
      "Ex-vendor sales engineers from category leaders",
    ],
    sampleQuestions: [
      "How is the embedded-finance buyer picture evolving in 2026?",
      "What's the real take rate landscape across payments verticals?",
      "How are banks evaluating lending software vendors today?",
      "What's the build-vs-buy decision tree for treasury platforms?",
    ],
    recentProjects: [
      "Embedded finance buyer diligence — 16 operator interviews",
      "Lending software competitive positioning",
      "Treasury platform vendor landscape report",
    ],
    primaryKW: "fintech software experts",
  },

  // ─── HEALTHCARE & LIFE SCIENCES (5) ───────────────────────────
  {
    parentSlug: "healthcare-and-life-sciences",
    slug: "pharmaceuticals",
    id: "01.2.1",
    name: "PHARMACEUTICALS",
    title: "Pharma Expert Network - Commercial, Clinical, Market Access",
    description:
      "Pharma commercial leaders, market access specialists, clinical investigators and prescribers across small molecule and biologics.",
    pageLede:
      "Pharma commercial executives, market access specialists, clinical investigators, prescribers and ex-pharma R&D leaders. Coverage spans small molecule, biologics, biosimilars and emerging modalities. KOLs available with documented disclosure.",
    expertTypes: [
      "Pharma commercial VPs and brand directors",
      "Market access and HEOR specialists",
      "Clinical investigators and trial PIs",
      "Prescribing physicians (KOLs across specialties)",
      "Ex-pharma R&D leaders and CMC specialists",
      "Pharma BD and licensing veterans",
    ],
    sampleQuestions: [
      "What's the prescriber sentiment on category X in 2026?",
      "How is market access shifting under IRA/equivalent pressures?",
      "What does the launch playbook look like for indication Y today?",
      "Where are pharma BD priorities heading post-patent-cliff?",
    ],
    recentProjects: [
      "KOL panel on biologic switching behaviour — 15 oncologists",
      "Market access diligence for specialty launch",
      "Pharma BD landscape for emerging-modality investor",
    ],
    primaryKW: "pharma expert network",
  },
  {
    parentSlug: "healthcare-and-life-sciences",
    slug: "medical-devices",
    id: "01.2.2",
    name: "MEDICAL DEVICES",
    title: "Medical Device Expert Network - Surgeons, GPOs, Buyers",
    description:
      "Surgeons, hospital procurement leaders, GPO contracts experts and device sales leaders across surgical, cardio, ortho and diagnostics.",
    pageLede:
      "Practicing surgeons, hospital procurement leaders, GPO contracting specialists, and device-industry sales and product leaders. Coverage across surgical robotics, cardio, ortho, neuro and IVD/diagnostics.",
    expertTypes: [
      "Practicing surgeons across surgical specialties",
      "Hospital VP Procurement and Materials Mgmt",
      "GPO contracting and clinical value analysis leaders",
      "Device-industry sales leaders and product VPs",
      "Diagnostic and imaging executives",
      "Ex-FDA/EU MDR regulatory specialists",
    ],
    sampleQuestions: [
      "How is GPO contracting affecting category X adoption?",
      "What's the surgeon preference picture for emerging robotic systems?",
      "How is hospital procurement evolving under cost pressure?",
      "What does the EU MDR transition really look like for category Y?",
    ],
    recentProjects: [
      "Surgical robotics surgeon panel — 18 interviews",
      "GPO contract economics study for device investor",
      "EU MDR transition diligence for category buyer",
    ],
    primaryKW: "medical device experts",
  },
  {
    parentSlug: "healthcare-and-life-sciences",
    slug: "digital-health",
    id: "01.2.3",
    name: "DIGITAL HEALTH",
    title: "Digital Health Expert Network - Telehealth, EHR, Payor Tech",
    description:
      "Telehealth founders, EHR-integrated SaaS operators, payor tech leaders and clinical informatics specialists.",
    pageLede:
      "Telehealth founders, EHR-integrated SaaS operators, payor tech leaders, clinical informatics specialists and ex-Epic/Cerner implementation veterans. Coverage from consumer-facing telehealth through enterprise clinical software.",
    expertTypes: [
      "Telehealth founders and operating execs",
      "EHR-integrated SaaS product leaders",
      "Payor tech and value-based care operators",
      "Clinical informatics and CMIO-level leaders",
      "Ex-Epic/Cerner implementation specialists",
      "Hospital IT leaders and CIOs",
    ],
    sampleQuestions: [
      "How is telehealth utilisation evolving post-2024?",
      "What does Epic integration economics actually look like for vendors?",
      "Where are payor tech budgets going in 2026?",
      "How is value-based care reshaping clinical software buying?",
    ],
    recentProjects: [
      "Telehealth utilisation panel — 14 health system CMIOs",
      "EHR integration economics study",
      "Payor tech vendor landscape report",
    ],
    primaryKW: "digital health experts",
  },
  {
    parentSlug: "healthcare-and-life-sciences",
    slug: "biotech",
    id: "01.2.4",
    name: "BIOTECH",
    title: "Biotech Expert Network - Clinical, CRO, BD and Investors",
    description:
      "Biotech BD leaders, CRO operators, clinical operations specialists and ex-pharma R&D leads for due diligence and category research.",
    pageLede:
      "Biotech business development leaders, CRO operating executives, clinical operations specialists and ex-pharma R&D heads. Coverage spans early-stage discovery through late-stage clinical execution.",
    expertTypes: [
      "Biotech BD and licensing executives",
      "CRO operating executives and category leaders",
      "Clinical operations and trial management",
      "Ex-pharma R&D heads and translational leads",
      "Biotech CEOs and CSOs (for category benchmarking)",
      "Investor-side scientific advisors",
    ],
    sampleQuestions: [
      "What's the realistic timeline picture for modality X to commercial?",
      "How is the CRO consolidation landscape affecting biotech buyers?",
      "Where is biotech BD activity concentrating in 2026?",
      "What does platform-tech licensing economics look like today?",
    ],
    recentProjects: [
      "CRO selection diligence for biotech investor",
      "Modality landscape report — 12 expert interviews",
      "Platform-tech BD economics study",
    ],
    primaryKW: "biotech expert network",
  },
  {
    parentSlug: "healthcare-and-life-sciences",
    slug: "hospital-systems",
    id: "01.2.5",
    name: "HOSPITAL SYSTEMS",
    title: "Hospital Systems Expert Network - Administrators, IDNs, Networks",
    description:
      "C-suite hospital administrators, IDN procurement leaders, service-line VPs and clinical chiefs across US, UK and European systems.",
    pageLede:
      "C-suite hospital administrators, IDN procurement leaders, service-line VPs and clinical department chiefs across US, UK and European health systems. Strong coverage for buyer-side panels and operator interviews.",
    expertTypes: [
      "Hospital CEOs, COOs and CFOs",
      "IDN procurement and supply chain leaders",
      "Service-line VPs (cardio, ortho, oncology, etc.)",
      "Clinical chiefs and medical directors",
      "Hospital CIOs and CMIOs",
      "Health system strategy executives",
    ],
    sampleQuestions: [
      "How are hospital capital budgets shifting under margin pressure?",
      "What does IDN procurement decision-making actually look like for category X?",
      "Where are service-line investments concentrating in 2026?",
      "How is European hospital buying differing from US patterns?",
    ],
    recentProjects: [
      "IDN procurement panel for device buyer — 16 interviews",
      "Service-line investment study across 12 systems",
      "European hospital buying patterns benchmark",
    ],
    primaryKW: "hospital systems experts",
  },

  // ─── FINANCIAL SERVICES (5) ───────────────────────────────────
  {
    parentSlug: "financial-services",
    slug: "investment-banking",
    id: "01.3.1",
    name: "INVESTMENT BANKING",
    title: "Investment Banking Expert Network - Ex-Bankers and Coverage Leads",
    description:
      "Ex-MDs, coverage bankers and capital markets specialists across M&A, ECM, DCM and leveraged finance.",
    pageLede:
      "Ex-Managing Directors, coverage bankers and capital markets specialists across M&A, ECM, DCM and leveraged finance. Bench includes sector-coverage specialists across tech, healthcare, industrials and financials.",
    expertTypes: [
      "Ex-MDs and coverage MDs (recently departed)",
      "ECM and DCM specialists",
      "M&A advisory veterans",
      "Leveraged finance and sponsor coverage",
      "Sector-coverage specialists",
      "Ex-bulge-bracket and ex-elite-boutique",
    ],
    sampleQuestions: [
      "How is the M&A picture shaping up in sector X for 2026?",
      "What's the realistic valuation framework being used for category Y today?",
      "How are sponsor-coverage relationships evolving post-recent-cycle?",
      "What does the syndication picture look like for deal type Z?",
    ],
    recentProjects: [
      "Sector M&A landscape report — 12 ex-banker interviews",
      "ECM execution diligence for category investor",
      "Sponsor-coverage relationship study",
    ],
    primaryKW: "investment banking experts",
  },
  {
    parentSlug: "financial-services",
    slug: "asset-management",
    id: "01.3.2",
    name: "ASSET MANAGEMENT",
    title: "Asset Management Expert Network - PMs, Distribution, Allocators",
    description:
      "Ex-PMs, distribution leaders, allocators and operations executives across traditional and alternative asset management.",
    pageLede:
      "Ex-portfolio managers, distribution leaders, allocators and operations executives across traditional and alternative asset management. Coverage from $10B mutual fund complexes through alts platforms and emerging-manager hedge funds.",
    expertTypes: [
      "Ex-portfolio managers (mutual fund, hedge fund, alts)",
      "Distribution and wholesaling executives",
      "Allocator-side researchers (pensions, endowments, FoFs)",
      "Operations and middle-office leaders",
      "Product development specialists",
      "Compliance and risk officers",
    ],
    sampleQuestions: [
      "How is allocator capital flowing across categories in 2026?",
      "What does distribution economics actually look like for product type X?",
      "How are operations being restructured at $10B+ managers?",
      "Where are emerging-manager fundraising patterns concentrating?",
    ],
    recentProjects: [
      "Allocator-side study on emerging-manager preferences",
      "Distribution channel economics report",
      "Operations benchmarking across 8 managers",
    ],
    primaryKW: "asset management experts",
  },
  {
    parentSlug: "financial-services",
    slug: "fintech",
    id: "01.3.3",
    name: "FINTECH",
    title: "Fintech Expert Network - Payments, Lending, Wealth, Insurtech",
    description:
      "Fintech founders, banking-as-a-service operators, payments specialists and insurtech executives across consumer and B2B fintech.",
    pageLede:
      "Fintech founders, BaaS platform operators, payments specialists and insurtech executives. Coverage spans consumer fintech, B2B fintech, lending, wealth and adjacent embedded-finance categories. Distinct from our deeper fintech-software (SaaS lens) page.",
    expertTypes: [
      "Fintech founders and operating CEOs",
      "BaaS and embedded-finance platform operators",
      "Payments specialists (cards, ACH, real-time)",
      "Consumer fintech product leaders",
      "Insurtech operators and ex-carrier specialists",
      "Bank partnership and licensing veterans",
    ],
    sampleQuestions: [
      "How is the consumer fintech consolidation picture evolving?",
      "What's BaaS economics really look like after the 2023-2024 reset?",
      "Where is insurtech capital concentrating in 2026?",
      "How are bank partnerships being structured for category X?",
    ],
    recentProjects: [
      "Consumer fintech competitive positioning — 14 interviews",
      "BaaS economics diligence post-reset",
      "Insurtech category sizing for investor",
    ],
    primaryKW: "fintech expert network",
  },
  {
    parentSlug: "financial-services",
    slug: "insurance",
    id: "01.3.4",
    name: "INSURANCE",
    title: "Insurance Expert Network - Underwriters, Brokers, Insurtech",
    description:
      "Underwriters, broker leaders, claims specialists, reinsurance veterans and insurtech founders across P&C, life and health.",
    pageLede:
      "Underwriters, broker leaders, claims specialists, reinsurance veterans and insurtech founders. Coverage across P&C, life, health, specialty and emerging insurtech categories.",
    expertTypes: [
      "Underwriters (P&C, life, specialty)",
      "Broker and intermediary leaders",
      "Claims specialists and operations VPs",
      "Reinsurance executives",
      "Insurtech founders and operators",
      "Ex-carrier product and pricing specialists",
    ],
    sampleQuestions: [
      "How is the P&C rate environment shifting through 2026?",
      "What's the broker consolidation picture by mid-market?",
      "How is reinsurance capacity affecting primary-side appetite?",
      "Where are insurtech distribution models actually working?",
    ],
    recentProjects: [
      "P&C rate environment study for sponsor",
      "Broker consolidation landscape — 12 interviews",
      "Insurtech distribution economics diligence",
    ],
    primaryKW: "insurance expert network",
  },
  {
    parentSlug: "financial-services",
    slug: "crypto-and-digital-assets",
    id: "01.3.5",
    name: "CRYPTO & DIGITAL ASSETS",
    title: "Crypto and Digital Asset Expert Network - Builders, Buyers, Regulators",
    description:
      "Exchange operators, custody specialists, DeFi protocol leads and policy specialists across the digital asset stack.",
    pageLede:
      "Exchange operators, custody specialists, DeFi protocol leads, institutional buyers and policy/regulatory specialists. Coverage across the digital asset stack from infrastructure through institutional adoption.",
    expertTypes: [
      "Exchange operators and product leaders",
      "Custody and infrastructure specialists",
      "DeFi protocol founders and contributors",
      "Institutional crypto buyers and allocators",
      "Policy and regulatory specialists",
      "Compliance and BSA/AML veterans",
    ],
    sampleQuestions: [
      "How is institutional adoption flowing post-ETF approvals?",
      "What's the realistic regulatory picture across major jurisdictions?",
      "Where is DeFi product-market fit actually emerging?",
      "How are custody economics evolving at institutional scale?",
    ],
    recentProjects: [
      "Institutional adoption study — 18 allocator interviews",
      "Custody vendor landscape report",
      "Regulatory benchmarking across 6 jurisdictions",
    ],
    primaryKW: "crypto expert network",
  },

  // ─── CONSUMER & RETAIL (5) ────────────────────────────────────
  {
    parentSlug: "consumer-and-retail",
    slug: "cpg",
    id: "01.4.1",
    name: "CPG",
    title: "CPG Expert Network - Brand, Sales, Supply Chain, Trade",
    description:
      "Brand managers, trade marketing leaders, supply chain VPs and category buyers across food, beverage, personal care and household.",
    pageLede:
      "Brand managers, trade marketing leaders, supply chain VPs and retail-side category buyers. Coverage spans food, beverage, personal care, household and emerging better-for-you categories. Strong bench for innovation diligence.",
    expertTypes: [
      "Brand managers and brand directors",
      "Trade marketing and shopper marketing leads",
      "Supply chain and operations VPs",
      "Retail category buyers (Walmart, Tesco, etc.)",
      "Sales and customer leadership",
      "Ex-CPG founders and operators",
    ],
    sampleQuestions: [
      "How is private label penetration shifting in category X?",
      "What's retailer category-management decision-making actually look like?",
      "Where are emerging brands winning shelf space in 2026?",
      "How is trade promotion ROI being measured today?",
    ],
    recentProjects: [
      "Private-label competitive study — 14 brand interviews",
      "Retail category management diligence",
      "Emerging-brand shelf economics report",
    ],
    primaryKW: "CPG expert network",
  },
  {
    parentSlug: "consumer-and-retail",
    slug: "ecommerce-and-dtc",
    id: "01.4.2",
    name: "DTC & ECOMMERCE",
    title: "DTC and Ecommerce Expert Network - Founders, CMOs, Operators",
    description:
      "DTC founders, ecommerce CMOs, marketplace operators and last-mile leaders across consumer ecommerce verticals.",
    pageLede:
      "DTC founders, ecommerce CMOs, marketplace operators and last-mile leaders. Coverage spans direct-to-consumer brands, marketplace platforms, fulfillment infrastructure and emerging social-commerce categories.",
    expertTypes: [
      "DTC founders and CEOs",
      "Ecommerce CMOs and acquisition specialists",
      "Marketplace operators (Amazon, TikTok Shop, etc.)",
      "Last-mile and fulfillment executives",
      "Ecommerce platform operators (Shopify, etc.)",
      "Performance marketing veterans",
    ],
    sampleQuestions: [
      "How is the post-iOS-14 paid acquisition picture stabilising?",
      "What's the real economics of TikTok Shop and emerging social-commerce?",
      "How is last-mile cost evolving for mid-market DTC brands?",
      "Where is marketplace share-of-wallet concentrating in 2026?",
    ],
    recentProjects: [
      "DTC acquisition economics study — 16 founder interviews",
      "Social-commerce category sizing report",
      "Last-mile cost benchmarking",
    ],
    primaryKW: "DTC expert network",
  },
  {
    parentSlug: "consumer-and-retail",
    slug: "restaurants-and-hospitality",
    id: "01.4.3",
    name: "RESTAURANTS & HOSPITALITY",
    title: "Restaurant and Hospitality Expert Network - Operators, Franchisees",
    description:
      "Multi-unit operators, franchisees, hotel general managers, F&B directors and back-of-house leaders.",
    pageLede:
      "Multi-unit restaurant operators, franchisees, hotel general managers, F&B directors and back-of-house leaders. Coverage spans QSR, casual dining, fine dining and hospitality across major markets.",
    expertTypes: [
      "Multi-unit restaurant operators",
      "Franchisees (QSR and casual dining)",
      "Hotel general managers and brand executives",
      "F&B directors and supply chain leaders",
      "Back-of-house operations specialists",
      "Restaurant technology and tooling specialists",
    ],
    sampleQuestions: [
      "How is the franchise economics picture evolving in QSR?",
      "What's hotel RevPAR recovery look like by segment in 2026?",
      "Where are restaurant tech buyers concentrating spend?",
      "How is labour cost reshaping menu engineering?",
    ],
    recentProjects: [
      "QSR franchise economics study — 14 operator interviews",
      "Hotel segment recovery benchmarking",
      "Restaurant tech buyer panel for investor",
    ],
    primaryKW: "restaurant industry experts",
  },
  {
    parentSlug: "consumer-and-retail",
    slug: "luxury-goods",
    id: "01.4.4",
    name: "LUXURY GOODS",
    title: "Luxury Goods Expert Network - Brand, Retail, Wholesale",
    description:
      "Brand leaders, luxury retail VPs, wholesale buyers and travel-retail specialists across fashion, watches, jewelry and beauty.",
    pageLede:
      "Brand leaders, luxury retail VPs, wholesale buyers and travel-retail specialists. Coverage spans soft luxury (fashion, leather goods), hard luxury (watches, jewelry) and luxury beauty across European and Asian markets.",
    expertTypes: [
      "Brand and creative leaders",
      "Luxury retail VPs and store directors",
      "Wholesale buyers (department stores, specialty)",
      "Travel-retail specialists",
      "Ex-LVMH/Kering/Richemont executives",
      "Luxury supply chain and ateliers",
    ],
    sampleQuestions: [
      "How is the Chinese-buyer luxury picture evolving in 2026?",
      "What's the realistic outlook for hard luxury vs soft luxury?",
      "How is travel-retail share-of-wallet shifting?",
      "Where is luxury beauty consolidating?",
    ],
    recentProjects: [
      "Chinese-buyer behaviour study — 12 interviews",
      "Hard-luxury category benchmarking",
      "Travel-retail share-of-wallet report",
    ],
    primaryKW: "luxury industry experts",
  },
  {
    parentSlug: "consumer-and-retail",
    slug: "grocery-and-food",
    id: "01.4.5",
    name: "GROCERY & FOOD",
    title: "Grocery and Food Expert Network - Retail, Wholesale, Foodservice",
    description:
      "Grocery category buyers, foodservice distributors, private-label specialists and supermarket merchandisers.",
    pageLede:
      "Grocery category buyers, foodservice distributors, private-label specialists and supermarket merchandisers. Coverage across US, UK and European grocery, plus foodservice distribution and emerging direct-to-consumer grocery.",
    expertTypes: [
      "Grocery category buyers and category managers",
      "Foodservice distributors (Sysco, US Foods, etc.)",
      "Private-label specialists and PL brand managers",
      "Supermarket merchandisers and store directors",
      "Ex-grocery executives (Tesco, Kroger, etc.)",
      "Direct-to-consumer grocery operators",
    ],
    sampleQuestions: [
      "How is private-label penetration shifting in category X?",
      "What does foodservice distributor consolidation actually mean for buyers?",
      "Where is grocery e-commerce share-of-wallet stabilising?",
      "How are emerging European discounters affecting incumbents?",
    ],
    recentProjects: [
      "Private-label penetration study — 12 interviews",
      "Foodservice distributor diligence",
      "Grocery e-commerce share benchmarking",
    ],
    primaryKW: "grocery industry experts",
  },

  // ─── INDUSTRIALS & MANUFACTURING (5) ──────────────────────────
  {
    parentSlug: "industrials-and-manufacturing",
    slug: "automotive",
    id: "01.5.1",
    name: "AUTOMOTIVE",
    title: "Automotive Expert Network - OEMs, Tier 1s, EVs and Aftermarket",
    description:
      "OEM engineering leaders, Tier 1 supplier executives, EV battery specialists and aftermarket distribution experts.",
    pageLede:
      "OEM engineering leaders, Tier 1 supplier executives, EV battery specialists, aftermarket distribution executives and automotive retail leaders. Coverage across ICE, BEV/PHEV, autonomy and emerging software-defined-vehicle categories.",
    expertTypes: [
      "OEM engineering and product leaders",
      "Tier 1 supplier executives",
      "EV battery and powertrain specialists",
      "Autonomy and ADAS engineers",
      "Aftermarket distribution executives",
      "Automotive retail and dealer-network leaders",
    ],
    sampleQuestions: [
      "What's the realistic BEV adoption picture by region in 2026?",
      "How is the Tier 1 consolidation landscape evolving?",
      "Where are EV battery economics actually heading?",
      "How is the SDV transition affecting OEM-supplier dynamics?",
    ],
    recentProjects: [
      "BEV adoption study across 6 European markets",
      "Tier 1 competitive positioning report",
      "EV battery economics diligence for investor",
    ],
    primaryKW: "automotive expert network",
  },
  {
    parentSlug: "industrials-and-manufacturing",
    slug: "aerospace-and-defense",
    id: "01.5.2",
    name: "AEROSPACE & DEFENSE",
    title: "Aerospace and Defense Expert Network - OEMs, MRO, Suppliers",
    description:
      "Airframer engineers, MRO leaders, defense procurement specialists and Tier 1/2 aerospace suppliers across commercial and defense.",
    pageLede:
      "Airframer engineering leaders, MRO operations executives, defense procurement specialists and Tier 1/2 aerospace suppliers. Coverage across commercial aviation, defense and emerging space categories. ITAR-sensitive work handled with documented compliance.",
    expertTypes: [
      "Airframer engineering and program leaders",
      "MRO operations and commercial executives",
      "Defense procurement and program managers",
      "Tier 1/2 aerospace suppliers",
      "Avionics and propulsion specialists",
      "Space and satellite operators",
    ],
    sampleQuestions: [
      "How is the commercial-aviation backlog working through supply chain?",
      "What's the defense budget allocation picture for 2026?",
      "Where are MRO economics shifting under engine-cycle pressure?",
      "How is space-launch competitive landscape consolidating?",
    ],
    recentProjects: [
      "Aerospace supply chain diligence — 14 interviews",
      "Defense category sizing for sponsor",
      "MRO economics benchmark study",
    ],
    primaryKW: "aerospace experts",
  },
  {
    parentSlug: "industrials-and-manufacturing",
    slug: "chemicals",
    id: "01.5.3",
    name: "CHEMICALS",
    title: "Chemicals Expert Network - Specialty, Petchem, Coatings",
    description:
      "Specialty chemicals operators, petchem traders, coatings formulators and procurement leads for chemical buyers.",
    pageLede:
      "Specialty chemicals operators, petrochemical commercial and trading executives, coatings formulators and procurement leaders at chemical buyers. Coverage spans specialty, commodity and emerging green-chemistry categories.",
    expertTypes: [
      "Specialty chemicals BU leaders and product managers",
      "Petrochemical commercial and trading executives",
      "Coatings and adhesives formulators",
      "Procurement leaders at chemical buyers",
      "Process engineering and operations specialists",
      "Green-chemistry and sustainability specialists",
    ],
    sampleQuestions: [
      "How is the specialty-chemicals competitive picture shifting in category X?",
      "What's petchem margin trajectory through 2026?",
      "Where are coatings buyers concentrating innovation spend?",
      "How is green chemistry actually penetrating commercial categories?",
    ],
    recentProjects: [
      "Specialty chemicals competitive positioning",
      "Petchem margin study for investor",
      "Coatings innovation buyer diligence",
    ],
    primaryKW: "chemical industry experts",
  },
  {
    parentSlug: "industrials-and-manufacturing",
    slug: "logistics-and-supply-chain",
    id: "01.5.4",
    name: "LOGISTICS & SUPPLY CHAIN",
    title: "Logistics Expert Network - Freight, 3PL, Warehousing",
    description:
      "Freight forwarders, 3PL executives, warehousing operators and last-mile specialists across ocean, air, rail and road.",
    pageLede:
      "Freight forwarders, 3PL operating executives, warehousing operators and last-mile specialists. Coverage across ocean, air, rail and road freight, plus 3PL/4PL and emerging supply-chain-software categories.",
    expertTypes: [
      "Freight forwarders and customs brokers",
      "3PL operating executives",
      "Warehousing and DC operators",
      "Last-mile and parcel specialists",
      "Supply chain software operators",
      "Shipper-side logistics and procurement leaders",
    ],
    sampleQuestions: [
      "How is the post-pandemic ocean-freight picture stabilising?",
      "What does 3PL consolidation actually look like for shippers?",
      "Where is warehousing automation ROI emerging?",
      "How are last-mile economics evolving under cost pressure?",
    ],
    recentProjects: [
      "Ocean freight rate study — 14 forwarder interviews",
      "3PL consolidation diligence for sponsor",
      "Warehousing automation buyer benchmark",
    ],
    primaryKW: "logistics expert network",
  },
  {
    parentSlug: "industrials-and-manufacturing",
    slug: "construction",
    id: "01.5.5",
    name: "CONSTRUCTION",
    title: "Construction Expert Network - Contractors, Materials, ConTech",
    description:
      "GCs, subcontractor leaders, building products buyers and ConTech buyers across residential, commercial and infrastructure.",
    pageLede:
      "General contractors, subcontractor leaders, building products procurement and ConTech software buyers. Coverage across residential, commercial and infrastructure construction in US and European markets.",
    expertTypes: [
      "General contractor executives",
      "Subcontractor leaders by trade",
      "Building products procurement and category managers",
      "ConTech software buyers and operators",
      "Materials distributors and dealer executives",
      "Construction-financing specialists",
    ],
    sampleQuestions: [
      "How is the commercial-construction pipeline looking through 2026?",
      "What's the realistic ConTech adoption picture beyond pilots?",
      "Where are building-products distributors concentrating?",
      "How is residential demand stabilising under rate pressure?",
    ],
    recentProjects: [
      "Commercial construction pipeline study",
      "ConTech buyer diligence — 16 GC interviews",
      "Building products distributor benchmark",
    ],
    primaryKW: "construction industry experts",
  },
] as const;

/** Helpers ─────────────────────────────────────────────────────── */

export function getSubnichesFor(parentSlug: string): IndustrySubniche[] {
  return industrySubniches.filter((s) => s.parentSlug === parentSlug);
}

export function getSubniche(
  parentSlug: string,
  subSlug: string,
): IndustrySubniche | undefined {
  return industrySubniches.find(
    (s) => s.parentSlug === parentSlug && s.slug === subSlug,
  );
}
