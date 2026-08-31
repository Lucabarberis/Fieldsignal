/**
 * Post types. Shared between the data layer, admin UI, and public pages.
 *
 * These shapes are STABLE — they're the contract that all data-layer
 * implementations (filesystem today, Supabase tomorrow) must satisfy.
 */

export type PostStatus = "draft" | "published";

/**
 * Language a post is written in.
 *
 * Posts are independent per market rather than translations of one another,
 * so this drives the page's lang attribute, schema.org inLanguage and the
 * blog index filter -- but there are no hreflang alternates to declare.
 */
export type PostLanguage = "en" | "de" | "fr" | "ja";

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;   // ISO date (YYYY-MM-DD or full ISO)
  updatedAt?: string;
  author: string;
  primaryKeyword?: string;
  tags?: string[];
  status: PostStatus;
  language: PostLanguage;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type Post = PostMeta & {
  body: string;          // raw markdown body (no frontmatter)
};

export type PostInput = Omit<
  PostFrontmatter,
  "publishedAt" | "updatedAt" | "language"
> & {
  slug?: string;         // auto-derived from title if omitted
  body: string;
  publishedAt?: string;  // defaults to today
  language?: PostLanguage; // defaults to "en"; omitted on update = unchanged
};
