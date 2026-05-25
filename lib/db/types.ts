/**
 * Post types. Shared between the data layer, admin UI, and public pages.
 *
 * These shapes are STABLE — they're the contract that all data-layer
 * implementations (filesystem today, Supabase tomorrow) must satisfy.
 */

export type PostStatus = "draft" | "published";

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;   // ISO date (YYYY-MM-DD or full ISO)
  updatedAt?: string;
  author: string;
  primaryKeyword?: string;
  tags?: string[];
  status: PostStatus;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type Post = PostMeta & {
  body: string;          // raw markdown body (no frontmatter)
};

export type PostInput = Omit<PostFrontmatter, "publishedAt" | "updatedAt"> & {
  slug?: string;         // auto-derived from title if omitted
  body: string;
  publishedAt?: string;  // defaults to today
};
