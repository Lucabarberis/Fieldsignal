/**
 * ═══════════════════════════════════════════════════════════════════
 * AUTHORS — canonical people registry + byline attribution
 * ═══════════════════════════════════════════════════════════════════
 *
 * Single source of truth for the humans on the site. `/team` renders these,
 * and every blog post / guide byline is attributed to one of them via the
 * assignment rules below.
 *
 * Why this exists: the whole corpus previously carried a bare `author: "Miles"`
 * — a mononym with no schema identity — which the SEO/GEO audit flagged as the
 * top E-E-A-T gap. Attributing each article to a real named person whose
 * `@id` matches their `Person` node on `/team` lets search and AI engines
 * resolve authorship to a verifiable entity (with a LinkedIn `sameAs`).
 *
 * Attribution is EDITORIAL, set here in version control (not per-row in the
 * DB), so it is reviewable and trivially reassignable — change a rule or add a
 * slug override and every affected page updates on the next build.
 * ═══════════════════════════════════════════════════════════════════
 */

/**
 * Anchor slug for a person, IDENTICAL to the algorithm `TeamSchema` uses for
 * its Person `@id`. Keep these in lockstep: the match is what unifies an
 * article's author with the person entity on /team into a single node.
 */
export function personAnchor(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export type AuthorGroup = "leadership" | "research";

export type Author = {
  name: string;
  jobTitle: string;
  /** Absolute-from-root path to the headshot. */
  photo: string;
  /** LinkedIn profile URL — emitted as schema `sameAs`. */
  linkedin: string;
  /** City the person works from, if disclosed. */
  location?: string;
  /** Which /team section they appear in. */
  group: AuthorGroup;
};

export const AUTHORS = {
  miles: {
    name: "Miles O'Sullivan",
    jobTitle: "CEO / Founder",
    photo: "/team/miles-osullivan-ceo-founder-fieldsignal.jpg",
    linkedin: "https://www.linkedin.com/in/miles-o-sullivan/",
    group: "leadership",
  },
  phosia: {
    name: "Phosia Chenangat",
    jobTitle: "Head of Compliance",
    photo: "/team/phosia-chenangat-head-of-compliance-fieldsignal.jpg",
    linkedin: "https://www.linkedin.com/in/phosia-chenangat-0a90282b1/",
    group: "leadership",
  },
  adrian: {
    name: "Adrian S Wibowo",
    jobTitle: "Senior Researcher",
    photo: "/team/adrian-s-wibowo-senior-researcher-fieldsignal.jpg",
    linkedin: "https://www.linkedin.com/in/adrianswibowo/",
    location: "Jakarta",
    group: "research",
  },
  guildy: {
    name: "Guildy Harvey",
    jobTitle: "Senior Researcher",
    photo: "/team/guildy-harvey-senior-researcher-fieldsignal.jpg",
    linkedin: "https://www.linkedin.com/in/guildyharvey/",
    location: "New Zealand",
    group: "research",
  },
  francisca: {
    name: "Francisca Florin",
    jobTitle: "Senior Researcher",
    photo: "/team/francisca-florin-senior-researcher-fieldsignal.jpg",
    linkedin: "https://www.linkedin.com/in/francisca-florin-27160a260/",
    location: "Kuala Lumpur",
    group: "research",
  },
} as const satisfies Record<string, Author>;

export type AuthorKey = keyof typeof AUTHORS;

/** Profile URL for a person — anchors to their tile on /team. */
export function authorProfileUrl(key: AuthorKey): string {
  return `/team#${personAnchor(AUTHORS[key].name)}`;
}

/**
 * Author shaped for `ArticleSchema`, with an `@id` equal to the person's
 * `Person` node on /team so engines resolve both to one entity.
 */
export function articleAuthor(author: Author, siteUrl: string) {
  const anchor = personAnchor(author.name);
  return {
    name: author.name,
    id: `${siteUrl}/team#${anchor}`,
    url: `${siteUrl}/team#${anchor}`,
    jobTitle: author.jobTitle,
    sameAs: [author.linkedin],
    image: `${siteUrl}${author.photo}`,
  };
}

/** The three senior researchers, in a fixed order for stable round-robin. */
const RESEARCHERS: AuthorKey[] = ["adrian", "guildy", "francisca"];

/** Compliance / legal / regulatory topics → Head of Compliance. */
const COMPLIANCE = /compliance|mnpi|conflict|chinese-wall|attestation|cooling-off|regulat|\bnda\b|exclusion|legal-framework/;

/**
 * Founder-voice topics → CEO. Category-defining and competitive-positioning
 * pieces where the founder is the natural voice. Kept deliberately narrow so
 * the bulk distributes to the research team.
 */
const FOUNDER =
  /expert-networks?-in-20|best-expert-networks|expert-network-consulting-without|glg-alternatives-which|expert-calls?-for-|expert-call-access-without|expert-call-transcripts-without|without-(the-)?six-figure-retainer/;

/**
 * Stable, dependency-free hash of a slug → an even, deterministic index.
 * (No Math.random — builds must be reproducible.)
 */
function hashIndex(slug: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h % mod;
}

/**
 * Author for a blog post, by slug. Compliance topics go to Phosia, a narrow
 * set of category/positioning pieces to Miles, and everything else is spread
 * evenly across the three researchers by a stable hash.
 */
export function authorForPostSlug(slug: string): Author {
  if (COMPLIANCE.test(slug)) return AUTHORS.phosia;
  if (FOUNDER.test(slug)) return AUTHORS.miles;
  return AUTHORS[RESEARCHERS[hashIndex(slug, RESEARCHERS.length)]];
}

/**
 * Author for a guide, by slug. Guides are buyer-facing how-tos; the compliance
 * guide goes to Phosia, the two buyer-strategy guides to Miles, and the
 * research-methodology guides to the research team.
 */
export function authorForGuideSlug(slug: string): Author {
  if (COMPLIANCE.test(slug)) return AUTHORS.phosia;
  if (/how-to-use-an-expert-network|pricing-explained|rfp-template/.test(slug)) {
    return AUTHORS.miles;
  }
  return AUTHORS[RESEARCHERS[hashIndex(slug, RESEARCHERS.length)]];
}
