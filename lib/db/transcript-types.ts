/**
 * Transcript types — shared between admin UI, data layer, and public pages.
 *
 * Stable contract that any data-layer implementation (filesystem today,
 * Supabase tomorrow) must satisfy.
 *
 * Mirrors the lib/db/types.ts pattern used for blog posts.
 */

export type TranscriptStatus = "draft" | "published";

export type TranscriptFrontmatter = {
  /** Human-readable title, typically "[Role], [Company] — [Topic]". */
  title: string;
  /** Meta description (140-160 chars). */
  description: string;
  /** Anonymised expert role descriptor. NEVER use real names. */
  expertRole: string;
  /** Anonymised company context (used as /by-company aggregator label). */
  companyContext: string;
  /** Slug for /transcripts/by-company/[slug]. */
  companySlug: string;
  /** Slug for /transcripts/by-topic/[slug]. */
  topicSlug: string;
  /** Human-readable topic label. */
  topicLabel: string;
  /** Industry slugs (must match content/data/industries.ts). */
  industrySlugs: string[];
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  /** ISO date when last updated. */
  updatedAt?: string;
  /** Total transcript word count (free preview + gated). */
  wordCount: number;
  /** Free preview text (target 300-500 words per SEO brief §4.14). */
  preview: string;
  /** 1-2 sentence teaser of what's behind the paywall. */
  gatedTeaser: string;
  /** Optional: full gated content (for real transcripts). Empty string OK. */
  gatedContent?: string;
  /** Slugs of related transcripts to cross-link. */
  relatedSlugs: string[];
  /** Primary keyword for SEO targeting. */
  primaryKW: string;
  /** "draft" hides from the public site; "published" + future date = scheduled. */
  status: TranscriptStatus;
  /**
   * Compliance attestation by the publisher — "I have confirmed this
   * transcript is anonymised and MNPI-screened before publishing".
   * Boolean checkbox in admin UI; required to publish.
   */
  complianceConfirmed: boolean;
};

export type TranscriptMeta = TranscriptFrontmatter & {
  slug: string;
  /** Display id used in the hub tile (e.g. "01"). */
  id: string;
};

export type Transcript = TranscriptMeta;

export type TranscriptInput = Omit<TranscriptFrontmatter, "publishedAt" | "updatedAt"> & {
  slug?: string;          // auto-derived from title if omitted
  publishedAt?: string;   // defaults to today
};
