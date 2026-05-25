/**
 * The 9 parent industries from the SEO brief §4.3.
 * Each parent has a list of sub-niches and rich content for the detail page.
 */

export type Industry = {
  slug: string;
  id: string;
  name: string;
  title: string;
  description: string;
  oneLiner: string;
  pageLede: string;
  subniches: readonly string[];
  expertTypes: readonly string[];
  recentProjects: readonly string[];
  relatedSlugs: readonly string[];
  primaryKW: string;
};

export const industries: readonly Industry[] = [
  {
    slug: "technology",
    id: "01.1",
    name: "TECHNOLOGY & SOFTWARE",
    title: "Technology Expert Network - SaaS, Cyber, Cloud, AI, Semis",
    description:
      "Access engineers, PMs, CTOs and revenue leaders across SaaS, cybersecurity, cloud, semiconductors, AI and developer tools.",
    oneLiner:
      "Engineers, PMs, CTOs and revenue leaders across SaaS, cyber, cloud, semis, AI and devtools.",
    pageLede:
      "The largest sector in our network — over 18,000 vetted technology professionals across SaaS, cybersecurity, cloud infrastructure, semiconductors, AI/ML, developer tools and fintech software. Operators, executives, buyers and ex-builders.",
    subniches: [
      "SaaS",
      "Cybersecurity",
      "Cloud Infrastructure",
      "Semiconductors",
      "AI & Machine Learning",
      "Developer Tools",
      "Fintech Software",
    ],
    expertTypes: [
      "Engineering leaders (Director to CTO)",
      "Product managers and PM directors",
      "Revenue leaders (VP Sales, CRO)",
      "Enterprise buyers (CIO, CISO, Heads of Platform)",
      "Channel partners and resellers",
      "Ex-founders and ex-operators",
    ],
    recentProjects: [
      "AI infrastructure spend benchmarks across the Fortune 500",
      "Cybersecurity buyer panel — EDR consolidation themes",
      "Vertical SaaS competitive positioning in 3 niches",
      "Semiconductor channel economics post-2024 inventory cycle",
    ],
    relatedSlugs: [
      "financial-services",
      "industrials-and-manufacturing",
      "telecommunications-and-media",
    ],
    primaryKW: "technology expert network",
  },
  {
    slug: "healthcare-and-life-sciences",
    id: "01.2",
    name: "HEALTHCARE & LIFE SCIENCES",
    title: "Healthcare Expert Network - Pharma, Devices, Digital, Hospitals",
    description:
      "KOLs, payors, hospital administrators, clinical researchers and pharma executives across the full healthcare value chain.",
    oneLiner:
      "KOLs, payors, hospital administrators and pharma executives across the value chain.",
    pageLede:
      "Coverage across the full healthcare value chain — pharmaceuticals, medical devices, digital health, biotech and hospital systems. KOLs, payors, hospital administrators, clinical researchers and ex-pharma commercial leaders.",
    subniches: [
      "Pharmaceuticals",
      "Medical Devices",
      "Digital Health",
      "Biotech",
      "Hospital Systems",
    ],
    expertTypes: [
      "Practising clinicians and KOLs",
      "Hospital and IDN administrators",
      "Payor and PBM specialists",
      "Pharma commercial and market access leaders",
      "Clinical operations and CRO executives",
      "Medical device buyers and surgeons",
    ],
    recentProjects: [
      "Drug pricing dynamics across 6 disease areas",
      "Telehealth adoption among multi-site primary care groups",
      "IDN procurement priorities post-supply-chain reset",
      "Clinical trial recruitment economics in oncology",
    ],
    relatedSlugs: ["financial-services", "consumer-and-retail", "education-and-edtech"],
    primaryKW: "healthcare expert network",
  },
  {
    slug: "financial-services",
    id: "01.3",
    name: "FINANCIAL SERVICES",
    title: "Financial Services Expert Network - Banking, Asset Mgmt, Fintech",
    description:
      "Investment bankers, asset managers, compliance leaders, fintech founders and insurance specialists across global markets.",
    oneLiner:
      "Investment bankers, asset managers, compliance leaders, fintech founders and insurance specialists.",
    pageLede:
      "Deep network across banking, asset management, fintech, insurance and digital assets. Ex-MDs and bankers, allocator leads, fintech operators, compliance veterans and underwriters across UK, EU, US and APAC markets.",
    subniches: [
      "Investment Banking",
      "Asset Management",
      "Fintech",
      "Insurance",
      "Crypto & Digital Assets",
    ],
    expertTypes: [
      "Ex-Managing Directors and coverage bankers",
      "Portfolio managers and allocators",
      "Compliance and risk leaders",
      "Fintech founders and BaaS operators",
      "Underwriters and reinsurance specialists",
      "Crypto exchange and DeFi protocol leads",
    ],
    recentProjects: [
      "Digital banking buyer dynamics among mid-market UK businesses",
      "Asset management distribution shifts post-fee-compression",
      "Insurance broker consolidation themes (UK + EU)",
      "Crypto custody buyer behaviour at family offices",
    ],
    relatedSlugs: ["technology", "real-estate-and-proptech", "consumer-and-retail"],
    primaryKW: "financial services expert network",
  },
  {
    slug: "consumer-and-retail",
    id: "01.4",
    name: "CONSUMER & RETAIL",
    title: "Consumer and Retail Expert Network - CPG, Ecom, Restaurants, Luxury",
    description:
      "Brand managers, supply chain leaders, store managers and merchandisers across CPG, DTC, restaurants, grocery and luxury.",
    oneLiner:
      "Brand, supply chain and merchandising leaders across CPG, DTC, restaurants and luxury.",
    pageLede:
      "Consumer-facing coverage across CPG, e-commerce and DTC, restaurants and hospitality, luxury goods, grocery and food retail. Brand managers, category buyers, supply chain leaders, store managers and digital commerce operators.",
    subniches: [
      "CPG",
      "Ecommerce & DTC",
      "Restaurants & Hospitality",
      "Luxury Goods",
      "Grocery & Food",
    ],
    expertTypes: [
      "Brand managers and CMOs",
      "Category buyers and trade marketing leads",
      "Supply chain VPs",
      "Multi-unit restaurant operators",
      "Luxury retail VPs and wholesale buyers",
      "DTC and marketplace founders",
    ],
    recentProjects: [
      "DTC consolidation themes post-iOS-tracking changes",
      "Inflation pass-through dynamics in grocery (5 markets)",
      "Gen Z purchasing behaviour in luxury accessories",
      "Restaurant franchisee economics under wage pressure",
    ],
    relatedSlugs: ["industrials-and-manufacturing", "healthcare-and-life-sciences", "technology"],
    primaryKW: "consumer expert network",
  },
  {
    slug: "industrials-and-manufacturing",
    id: "01.5",
    name: "INDUSTRIALS & MANUFACTURING",
    title: "Industrials and Manufacturing Expert Network",
    description:
      "Plant managers, procurement officers, engineers, union reps and industrial buyers across automotive, aerospace, chemicals and logistics.",
    oneLiner:
      "Plant managers, procurement, engineers and union reps across auto, aerospace, chemicals and logistics.",
    pageLede:
      "Ground-floor coverage of the industrial economy — automotive, aerospace and defence, chemicals, logistics and supply chain, construction. Plant managers, engineers, procurement officers, union representatives and Tier-1 supplier executives.",
    subniches: [
      "Automotive",
      "Aerospace & Defense",
      "Chemicals",
      "Logistics & Supply Chain",
      "Construction",
    ],
    expertTypes: [
      "Plant managers and operations VPs",
      "Procurement officers and category buyers",
      "Engineering leads (process, product, systems)",
      "Tier-1 supplier executives",
      "Logistics and 3PL operators",
      "Trade union representatives",
    ],
    recentProjects: [
      "Supply chain resilience programmes post-Red Sea disruption",
      "Automation ROI in mid-market manufacturing",
      "Reshoring decisions in semiconductor packaging",
      "EV battery supply chain economics",
    ],
    relatedSlugs: ["energy-and-utilities", "technology", "real-estate-and-proptech"],
    primaryKW: "industrials expert network",
  },
  {
    slug: "energy-and-utilities",
    id: "01.6",
    name: "ENERGY & UTILITIES",
    title: "Energy and Utilities Expert Network - Power, Renewables, Oil & Gas",
    description:
      "Utility executives, renewables developers, oil and gas operators, grid specialists and energy storage buyers.",
    oneLiner:
      "Utility executives, renewables developers, oil and gas operators and grid specialists.",
    pageLede:
      "Coverage across the energy transition — utilities, renewables, oil and gas, grid, and energy storage. Operators, regulators, developers and corporate buyers driving the next decade of capital deployment.",
    subniches: ["Power", "Renewables", "Oil & Gas", "Energy Storage"],
    expertTypes: [
      "Utility executives and grid operators",
      "Renewables developers (solar, wind, geothermal)",
      "Oil and gas commercial leaders",
      "Energy storage and battery specialists",
      "Grid interconnection specialists",
      "Ex-regulators and policy specialists",
    ],
    recentProjects: [
      "Solar PPA economics in Texas and California",
      "Grid interconnection bottlenecks across MISO and PJM",
      "Battery storage developer economics (UK and EU)",
      "Oil and gas re-deployment of cash in 2026",
    ],
    relatedSlugs: [
      "industrials-and-manufacturing",
      "real-estate-and-proptech",
      "telecommunications-and-media",
    ],
    primaryKW: "energy expert network",
  },
  {
    slug: "telecommunications-and-media",
    id: "01.7",
    name: "TELECOM & MEDIA",
    title: "Telecom and Media Expert Network - Carriers, Networks, Content",
    description:
      "Telco network engineers, MNO commercial leaders, content distribution specialists and media operators.",
    oneLiner:
      "Telco network engineers, MNO leaders, content distribution and media operators.",
    pageLede:
      "Coverage across telecoms carriers, network infrastructure, content distribution, streaming and media. Engineers, MNO commercial leaders, content operators and digital ad specialists across mature and emerging markets.",
    subniches: ["Carriers", "Networks", "Content & Media", "Streaming"],
    expertTypes: [
      "Telco network engineers and architects",
      "MNO commercial and marketing leaders",
      "Content distribution and licensing executives",
      "Streaming platform operators",
      "Digital ad-tech specialists",
      "Spectrum and regulatory specialists",
    ],
    recentProjects: [
      "5G monetisation strategies across 3 European MNOs",
      "Streaming churn dynamics in 4 markets",
      "Content licensing economics post-consolidation",
      "Tower co economics in emerging APAC markets",
    ],
    relatedSlugs: ["technology", "consumer-and-retail", "real-estate-and-proptech"],
    primaryKW: "telecom expert network",
  },
  {
    slug: "real-estate-and-proptech",
    id: "01.8",
    name: "REAL ESTATE & PROPTECH",
    title: "Real Estate and PropTech Expert Network - CRE, Residential, PropTech",
    description:
      "Commercial real estate brokers, residential developers, REIT executives and PropTech buyers and operators.",
    oneLiner:
      "CRE brokers, residential developers, REIT executives and PropTech operators.",
    pageLede:
      "Real estate sector coverage spanning commercial real estate, residential development, REITs and PropTech. Brokers, developers, asset managers, REIT executives and PropTech buyers and operators.",
    subniches: ["Commercial Real Estate", "Residential", "REITs", "PropTech"],
    expertTypes: [
      "Commercial real estate brokers and JLLs",
      "Residential developers and homebuilders",
      "REIT executives and asset managers",
      "PropTech founders and buyers",
      "Property management operators",
      "Construction GCs and subcontractors",
    ],
    recentProjects: [
      "Office repositioning economics in 6 US metros",
      "Residential demand in UK Help-to-Buy successor markets",
      "PropTech adoption among multi-family operators",
      "Data centre demand from hyperscalers",
    ],
    relatedSlugs: ["industrials-and-manufacturing", "financial-services", "energy-and-utilities"],
    primaryKW: "real estate expert network",
  },
  {
    slug: "education-and-edtech",
    id: "01.9",
    name: "EDUCATION & EDTECH",
    title: "Education and EdTech Expert Network - K-12, Higher Ed, EdTech",
    description:
      "School administrators, district buyers, higher-ed leaders and EdTech founders across K-12, HE, workforce learning and certifications.",
    oneLiner:
      "School and district leaders, higher-ed administrators and EdTech founders.",
    pageLede:
      "Education sector coverage spanning K-12, higher education, EdTech and workforce learning. School and district administrators, higher-ed leaders, EdTech founders and corporate learning buyers.",
    subniches: ["K-12", "Higher Education", "EdTech", "Workforce Learning"],
    expertTypes: [
      "School and district superintendents",
      "Higher-ed administrators and CFOs",
      "EdTech founders and product leaders",
      "Corporate L&D buyers",
      "Curriculum and assessment specialists",
      "Certification body executives",
    ],
    recentProjects: [
      "EdTech procurement in US school districts post-ESSER",
      "Higher-ed enrolment dynamics in 4 EU markets",
      "Corporate L&D buyer panel — Fortune 500",
      "Certification body economics in cybersecurity training",
    ],
    relatedSlugs: ["technology", "healthcare-and-life-sciences", "telecommunications-and-media"],
    primaryKW: "education expert network",
  },
] as const;
