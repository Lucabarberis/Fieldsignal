import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

/**
 * Link renderer for MDX bodies (blog posts, guides).
 *
 * Post bodies are authored markdown and contain two recurring defects that
 * are cheaper to correct at render time than to migrate across every row:
 *
 *   1. Related-article links use the legacy `/blog/<slug>` path. That path
 *      308-redirects to the canonical `/resources/blog/<slug>`, so every
 *      internal link spends a redirect hop and passes through a non-canonical
 *      URL. We rewrite the prefix.
 *
 *   2. Some links point at posts that are drafts or still scheduled, which
 *      404. We render those as plain text so no internal link ever resolves
 *      to a dead page.
 *
 * `publishedSlugs` is the set of publicly visible blog slugs, supplied by the
 * page. When it is omitted, rule 2 is skipped and only the rewrite applies.
 */

const LEGACY_BLOG_PREFIX = /^\/blog\/(?=[^/])/;

export function makeMdxComponents(publishedSlugs?: ReadonlySet<string>) {
  function MdxAnchor({
    href,
    children,
    ...rest
  }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    if (!href) return <>{children}</>;

    const canonical = href.replace(LEGACY_BLOG_PREFIX, "/resources/blog/");

    const blogMatch = canonical.match(/^\/resources\/blog\/([^/#?]+)/);
    if (blogMatch && publishedSlugs && !publishedSlugs.has(blogMatch[1])) {
      // Target isn't publicly visible — keep the sentence intact, drop the link.
      return <>{children}</>;
    }

    if (canonical.startsWith("/")) {
      return (
        <Link href={canonical} {...rest}>
          {children}
        </Link>
      );
    }

    // External links (incl. auto-inserted citations) open in a new tab.
    return (
      <a href={canonical} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return { a: MdxAnchor };
}
