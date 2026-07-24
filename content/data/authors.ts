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

/**
 * ─── Byline attribution by topic beat ──────────────────────────────
 *
 * Every post/guide belongs to one editorial BEAT, chosen from its tags (with
 * a slug fallback), and each beat has a fixed owner. This keeps authorship
 * TOPIC-SUITED — a person only ever appears on content in their beat —
 * instead of a random spread, and it covers scheduled posts automatically:
 * a not-yet-live post is attributed by its own tags the moment it publishes.
 *
 * To reassign, change one row of BEAT_OWNER or move a tag between the sets.
 */

type Beat = "compliance" | "positioning" | "vendor" | "diligence" | "methods";

const BEAT_OWNER: Record<Beat, AuthorKey> = {
  compliance: "phosia", // Head of Compliance — regulatory / MNPI / legal
  positioning: "miles", // Founder — category & competitive-positioning pieces
  vendor: "guildy", // Expert-network landscape: competitor/platform profiles, CI
  diligence: "adrian", // Diligence & industry research: DD, M&A, PE/VC, sectors
  methods: "francisca", // Research methods & market research: surveys, VoC, pricing
};

/**
 * A post's beat is chosen from its PRIMARY (first) tag — the CMS orders tags
 * by topic, so the first is what the piece is actually about. This avoids the
 * failure mode of "any tag matches", where a methodology post that also
 * carries a secondary `due-diligence` audience tag gets miscredited to the
 * diligence author. Compliance (any position) and founder-positioning (by
 * slug) still take precedence, because those are editorial requirements, not
 * merely topic.
 */
const VENDOR_TAGS = new Set([
  "alternatives", "expert-networks", "expert-network", "alphasense", "tegus",
  "glg", "guidepoint", "third-bridge", "slingshot", "prosapient", "newtonx",
  "mosaic", "lynk", "inex-one", "atheneum", "deepbench", "visasq", "maven",
  "coleman", "capvision", "catalant", "consulting", "transcripts",
  "vendor-comparison", "competitive-intelligence",
]);
const DILIGENCE_TAGS = new Set([
  "due-diligence", "m-and-a", "private-equity", "equity-research",
  "corporate-development", "hedge-funds",
  // Sector/industry deep-dives sit with the diligence & industry-research beat.
  "sectors", "pharmaceutical", "pharma", "healthcare", "technology",
  "semiconductor", "automotive", "energy", "retail", "cpg", "ecommerce",
  "real-estate", "defense", "climate-tech", "financial-services", "insurance",
  "esg",
]);
// Everything else (methods, market-research, customer-research, pricing,
// market-sizing, kol, b2b, brand, and the generic buyers/none) → methods beat.

const POSITIONING =
  /best-expert-networks|glg-alternatives-which|expert-networks?-in-20|without-(the-)?six-figure-retainer|expert-call-access-without|expert-call-transcripts-without|expert-network-consulting-without|expert-calls?-for-[a-z-]+-without/;

function postBeat(slug: string, tags: readonly string[] = []): Beat {
  if (tags.includes("compliance")) return "compliance";
  if (POSITIONING.test(slug) || tags.includes("founders")) return "positioning";
  const primary = tags[0] ?? "";
  if (VENDOR_TAGS.has(primary)) return "vendor";
  if (DILIGENCE_TAGS.has(primary)) return "diligence";
  return "methods";
}

/** Author for a blog post, from its topic tags (slug as tiebreak). */
export function authorForPost(post: {
  slug: string;
  tags?: readonly string[];
}): Author {
  return AUTHORS[BEAT_OWNER[postBeat(post.slug, post.tags ?? [])]];
}

/**
 * Author for a guide, by slug — guides carry no tags. Mapped to the same
 * beats: the compliance guide to Phosia, buyer/pricing how-tos to the
 * founder, the vendor-evaluation RFP to the vendor beat, and the
 * research-methodology guides to the methods beat.
 */
export function authorForGuideSlug(slug: string): Author {
  let beat: Beat = "methods";
  if (/compliance/.test(slug)) beat = "compliance";
  else if (/how-to-use-an-expert-network|pricing-explained/.test(slug)) beat = "positioning";
  else if (/rfp-template/.test(slug)) beat = "vendor";
  return AUTHORS[BEAT_OWNER[beat]];
}
