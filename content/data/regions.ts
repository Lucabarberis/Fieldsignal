/**
 * Region pages — SEO brief §4.12.
 *
 * Templated. Each page leads with regional expert depth, time-zone
 * coverage and 1-2 sample case studies. Ranks for "[country/region]
 * expert network" queries and reinforces coverage claims.
 */

export type Region = {
  slug: string;
  id: string;
  name: string;
  title: string;
  description: string;
  oneLiner: string;
  pageLede: string;
  /** Headline expert count claim for this region. */
  expertCount: string;
  /** Time-zone coverage notes. */
  timeZones: string;
  /** Languages supported for interviewing. */
  languages: readonly string[];
  /** Major markets covered. */
  majorMarkets: readonly string[];
  /** Coverage strengths in this region. */
  coverageStrengths: readonly string[];
  /** Sample anonymised projects. */
  sampleProjects: readonly string[];
  /** Compliance notes specific to this region. */
  complianceNotes: string;
  primaryKW: string;
};

export const regions: readonly Region[] = [
  {
    slug: "united-kingdom",
    id: "01",
    name: "UNITED KINGDOM",
    title: "Expert Network UK - London and Regional Coverage",
    description:
      "UK-headquartered with 15,000+ specialists across London, Manchester, Edinburgh and beyond. FCA-aware compliance for UK financial clients.",
    oneLiner:
      "15,000+ UK specialists across London, Manchester, Edinburgh. FCA-aware compliance.",
    pageLede:
      "The United Kingdom is one of our deepest benches — 15,000+ operating professionals across London, the Northern cities, Scotland, Wales and Northern Ireland. Strongest concentration in financial services, professional services, technology and the creative industries; growing coverage in industrials, healthcare and energy.",
    expertCount: "15,000+",
    timeZones: "GMT/BST — covers EMEA business hours natively",
    languages: ["English"],
    majorMarkets: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Bristol", "Belfast", "Cardiff"],
    coverageStrengths: [
      "Financial services — bulge-bracket and challenger-bank operators",
      "Professional services — Big Four and specialist consulting alumni",
      "Technology — strong fintech and enterprise SaaS coverage",
      "Creative industries — media, publishing, advertising",
      "Industrials — automotive, aerospace, defence (ITAR-aware)",
    ],
    sampleProjects: [
      "UK hedge fund — 20-call channel research on a FTSE 250 retailer",
      "Mid-market PE — buy-side CDD on a London-based services target",
      "Corporate strategy team — UK regional market entry research, 8 cities",
      "Fintech sponsor — 14 expert calls on challenger-bank lending economics",
    ],
    complianceNotes:
      "FCA-aware compliance for financial-services clients. UK GDPR (Data Protection Act 2018) data handling. Established standards for City-level institutional engagements.",
    primaryKW: "UK expert network",
  },
  {
    slug: "europe",
    id: "02",
    name: "EUROPE",
    title: "European Expert Network - EU Coverage in 14 Languages",
    description:
      "Expert depth across DACH, France, Italy, Iberia, Benelux and Nordics. GDPR-native operations and EU-based data residency.",
    oneLiner:
      "Expert depth across DACH, France, Italy, Iberia, Benelux, Nordics. 14 languages.",
    pageLede:
      "Europe is our largest regional bench outside the UK — 20,000+ operators across DACH, France, Italy, Iberia, Benelux and the Nordics. Native-language interviewing in 14 languages. GDPR-native operations with EU-based data residency standard.",
    expertCount: "20,000+",
    timeZones: "CET, EET — full EU business hours coverage",
    languages: ["German", "French", "Italian", "Spanish", "Portuguese", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish", "Polish", "Czech", "English", "+1 more on request"],
    majorMarkets: ["DACH (Germany, Austria, Switzerland)", "France", "Italy", "Iberia (Spain, Portugal)", "Benelux", "Nordics", "Central/Eastern Europe"],
    coverageStrengths: [
      "DACH — industrials, automotive, family-mittelstand operators",
      "France — luxury, retail, energy, telecom",
      "Italy — fashion, food, design, mid-market industrials",
      "Iberia — banking, retail, hospitality, infrastructure",
      "Benelux — logistics, fintech, agri-food",
      "Nordics — telecoms, marine industries, clean energy",
    ],
    sampleProjects: [
      "PE buyer — buy-side CDD on a DACH industrial in 4 languages",
      "Asset manager — European banking sector primary research",
      "Corporate strategy — Iberian retail expansion research",
      "Hedge fund — pan-European luxury sector channel checks",
    ],
    complianceNotes:
      "GDPR-native operations. EU-based data residency standard. Standard contractual clauses for international transfers. Country-specific overlays where required (e.g. French data residency for sensitive sectors).",
    primaryKW: "European expert network",
  },
  {
    slug: "north-america",
    id: "03",
    name: "NORTH AMERICA",
    title: "US Expert Network - Coast-to-Coast Coverage",
    description:
      "Expert sourcing across all major US metros and Canada. SEC and FINRA-aware compliance for US investment clients.",
    oneLiner:
      "All major US metros and Canada. SEC/FINRA-aware compliance.",
    pageLede:
      "North America covers the US and Canada — 12,000+ operating professionals across major metros. Strongest coverage in technology, healthcare, financial services and industrials. SEC and FINRA-aware compliance for US investment clients.",
    expertCount: "12,000+",
    timeZones: "ET, CT, MT, PT — full North American business hours",
    languages: ["English", "Spanish (US Hispanic markets)", "French (Quebec)"],
    majorMarkets: ["New York", "San Francisco", "Boston", "Chicago", "Los Angeles", "Seattle", "Atlanta", "Toronto", "Vancouver"],
    coverageStrengths: [
      "Technology — strongest US bench is Silicon Valley + NYC",
      "Healthcare — deep KOL bench plus payor, provider, life-sciences",
      "Financial services — investment banking, hedge funds, asset mgmt",
      "Industrials — strongest in Midwest manufacturing belt",
      "Energy — Texas oil & gas plus renewables across Sun Belt",
    ],
    sampleProjects: [
      "US hedge fund — channel checks on a NASDAQ-listed software vendor",
      "Mid-market PE — buy-side CDD on a healthcare services target",
      "Corporate strategy — US expansion research, 4 metros, 22 interviews",
      "Asset manager — US banking sector regulatory research",
    ],
    complianceNotes:
      "SEC and FINRA-aware compliance for institutional financial-services clients. Reg FD-conscious framework. State-level data residency available on request.",
    primaryKW: "US expert network",
  },
  {
    slug: "middle-east-and-north-africa",
    id: "04",
    name: "MIDDLE EAST & NORTH AFRICA",
    title: "MENA Expert Network - GCC and North Africa Specialists",
    description:
      "Regional expert depth across GCC, Egypt, Morocco and Turkey. Arabic-language interviews and on-the-ground operators.",
    oneLiner:
      "GCC, Egypt, Morocco, Turkey. Arabic-language interviewing and on-the-ground operators.",
    pageLede:
      "MENA coverage spans the GCC, Egypt, Morocco and Turkey — 3,500+ operating professionals. Strongest in financial services (sovereign-wealth, asset management), energy, real estate development and emerging fintech. Arabic-language interviewing standard.",
    expertCount: "3,500+",
    timeZones: "AST, AT, EET, TRT — full MENA business hours coverage",
    languages: ["English", "Arabic (Modern Standard + regional dialects)", "French (Morocco, Tunisia)", "Turkish"],
    majorMarkets: ["UAE (Dubai, Abu Dhabi)", "Saudi Arabia (Riyadh, Jeddah)", "Qatar", "Bahrain", "Kuwait", "Egypt", "Morocco", "Turkey"],
    coverageStrengths: [
      "Sovereign wealth and asset management ecosystems",
      "Energy — upstream oil/gas plus emerging renewables",
      "Real estate development across GCC",
      "Fintech and digital banking",
      "Construction and infrastructure",
    ],
    sampleProjects: [
      "Sovereign-wealth fund — direct investment diligence on a UAE asset manager",
      "European PE — GCC expansion research for a portfolio company",
      "Energy investor — Saudi renewables build-out diligence",
      "Family office — Egyptian fintech direct-deal references",
    ],
    complianceNotes:
      "GCC-domiciled clients served from our EU entity with documented data-transfer provisions. UAE DIFC and ADGM compliance overlays for relevant transactions. Arabic-language compliance materials available on request.",
    primaryKW: "MENA expert network",
  },
  {
    slug: "asia-pacific",
    id: "05",
    name: "ASIA-PACIFIC",
    title: "APAC Expert Network - From Japan to ANZ",
    description:
      "Expert coverage across Japan, Korea, Greater China, India, Southeast Asia and Australia. Native-language interviewing in 10+ languages.",
    oneLiner:
      "Japan, Korea, Greater China, India, SEA, Australia. Native-language in 10+ languages.",
    pageLede:
      "APAC coverage spans North Asia, India, Southeast Asia and Australia/New Zealand — 8,000+ operating professionals. Native-language interviewing in Mandarin, Japanese, Korean, Hindi, Bahasa, Thai, Vietnamese, Tagalog, English. Strongest concentrations in tech, financial services and industrials.",
    expertCount: "8,000+",
    timeZones: "JST, KST, CST, IST, ICT, AEST — full APAC business hours",
    languages: ["English", "Mandarin", "Japanese", "Korean", "Hindi", "Bahasa Indonesia", "Bahasa Malaysia", "Thai", "Vietnamese", "Tagalog"],
    majorMarkets: ["Tokyo", "Seoul", "Beijing/Shanghai/Hong Kong", "Singapore", "Bangkok", "Jakarta", "Manila", "Mumbai/Bangalore/Delhi", "Sydney/Melbourne"],
    coverageStrengths: [
      "Tech — particularly strong in China, Korea and India",
      "Financial services — HK/Singapore institutional ecosystem",
      "Industrials — Japanese and Korean manufacturing depth",
      "Consumer — Southeast Asian fast-growing categories",
      "Mining and resources — Australia",
    ],
    sampleProjects: [
      "US PE — buy-side CDD on a Singapore SaaS target in English/Mandarin",
      "Hedge fund — China consumer sector channel research, 12 interviews",
      "Corporate strategy — APAC market entry research across 5 markets",
      "Family office — Japanese real estate direct-deal diligence",
    ],
    complianceNotes:
      "Region-specific compliance overlays: SFC (Hong Kong), MAS (Singapore), SEBI (India), FSA (Japan). Mainland China engagements handled via documented sourcing partners with appropriate data-residency protocols.",
    primaryKW: "APAC expert network",
  },
  {
    slug: "southeast-asia",
    id: "06",
    name: "SOUTHEAST ASIA",
    title: "Southeast Asia Expert Network - Indonesia, Thailand, Vietnam, Philippines",
    description:
      "Operator-level coverage across ASEAN-6. Local-language interviews and ground-truth research for funds expanding into the region.",
    oneLiner:
      "Operator-level coverage across ASEAN-6. Local-language interviews.",
    pageLede:
      "Southeast Asia is a fast-growing region for our bench — 2,500+ operating professionals across the ASEAN-6 (Singapore, Indonesia, Malaysia, Thailand, Vietnam, Philippines). Strong consumer-internet, fintech, logistics and manufacturing coverage. Native-language interviewing across all major regional languages.",
    expertCount: "2,500+",
    timeZones: "ICT, WIB, MYT, PHT — single business-day window across ASEAN",
    languages: ["English", "Bahasa Indonesia", "Bahasa Malaysia", "Thai", "Vietnamese", "Tagalog", "Mandarin (overseas Chinese communities)"],
    majorMarkets: ["Singapore", "Jakarta", "Kuala Lumpur", "Bangkok", "Ho Chi Minh City", "Manila"],
    coverageStrengths: [
      "Consumer internet — Gojek, Grab, Sea ecosystem alumni",
      "Fintech and digital banking",
      "Logistics and last-mile fulfilment",
      "Manufacturing — Vietnam, Thailand, Malaysia industrial bases",
      "Tourism and hospitality",
    ],
    sampleProjects: [
      "VC fund — Indonesian fintech pre-investment diligence",
      "Mid-market PE — Vietnam manufacturing target CDD",
      "Corporate strategy — Thai consumer market entry research",
      "Hedge fund — SEA digital banking sector channel research",
    ],
    complianceNotes:
      "MAS-aware compliance for Singapore institutional clients. Indonesian PDP Law (UU PDP) data handling for local engagements. Region-specific data-residency options available.",
    primaryKW: "Southeast Asia expert network",
  },
  {
    slug: "latin-america",
    id: "07",
    name: "LATIN AMERICA",
    title: "LATAM Expert Network - Brazil, Mexico, Andean and Southern Cone",
    description:
      "Spanish and Portuguese-language interviews across LATAM's six largest markets. Coverage gaps filled by local recruitment partners.",
    oneLiner:
      "Brazil, Mexico, Andean, Southern Cone. Spanish and Portuguese-language native.",
    pageLede:
      "Latin America coverage focuses on the region's six largest markets — Brazil, Mexico, Chile, Colombia, Peru, Argentina. 1,800+ operating professionals across financial services, consumer, energy and emerging tech sectors. Spanish and Portuguese-language interviewing standard.",
    expertCount: "1,800+",
    timeZones: "BRT, ART, COT, PET, CLT — full LATAM business hours",
    languages: ["Spanish (regional variants)", "Portuguese (Brazilian)", "English"],
    majorMarkets: ["São Paulo", "Rio de Janeiro", "Mexico City", "Santiago", "Bogotá", "Lima", "Buenos Aires"],
    coverageStrengths: [
      "Financial services — Brazilian and Mexican banking ecosystems",
      "Consumer — strong CPG and retail coverage across the region",
      "Energy — Brazilian oil & gas, Mexican electricity reform",
      "Mining — Andean copper and Brazilian iron-ore",
      "Emerging fintech — Brazilian and Mexican neobanks",
    ],
    sampleProjects: [
      "US PE — Brazilian consumer-products target CDD in Portuguese",
      "Mexican corporate — competitive intelligence on US-Mexico cross-border retail",
      "Energy investor — Chilean copper-mining sector diligence",
      "Fintech investor — Brazilian neobank ecosystem mapping",
    ],
    complianceNotes:
      "Brazilian LGPD-aware data handling. Mexican federal data protection law overlay. Region-specific compliance materials available in Spanish and Portuguese.",
    primaryKW: "LATAM expert network",
  },
  {
    slug: "africa",
    id: "08",
    name: "AFRICA",
    title: "Africa Expert Network - Sub-Saharan and North Africa",
    description:
      "English, French and Portuguese-language coverage across Nigeria, Kenya, South Africa, Egypt and francophone West Africa.",
    oneLiner:
      "Nigeria, Kenya, South Africa, Egypt, francophone West Africa. EN/FR/PT native.",
    pageLede:
      "Africa coverage focuses on the region's largest economic blocks — Nigeria, Kenya, South Africa, Egypt and francophone West Africa. 1,200+ operating professionals across financial services, fintech, telecoms, energy and consumer sectors. English, French and Portuguese-language interviewing.",
    expertCount: "1,200+",
    timeZones: "WAT, CAT, EAT, SAST — full African business hours",
    languages: ["English", "French (francophone West Africa, North Africa)", "Portuguese (Angola, Mozambique)", "Arabic (North Africa)"],
    majorMarkets: ["Lagos", "Nairobi", "Johannesburg", "Cairo", "Accra", "Casablanca", "Abidjan", "Cape Town"],
    coverageStrengths: [
      "Telecoms — pan-African MNO ecosystem and tower companies",
      "Fintech — Nigerian, Kenyan and South African ecosystems",
      "Financial services — Nigerian and South African banking",
      "Consumer — emerging FMCG and retail across Nigeria, Kenya",
      "Energy — North African renewables, South African mining",
    ],
    sampleProjects: [
      "DFI — Nigerian fintech sector diligence for an LP commitment",
      "Mid-market PE — South African industrial target CDD",
      "Corporate strategy — pan-African telecoms competitive research",
      "Development finance — Kenyan agri-tech ecosystem mapping",
    ],
    complianceNotes:
      "Nigerian NDPR-aware data handling. South African POPIA overlay. Standard contractual clauses for international transfers per country requirements.",
    primaryKW: "Africa expert network",
  },
] as const;

export function getRegion(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}
