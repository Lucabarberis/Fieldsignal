import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import type { PostMeta } from "@/lib/posts";
import { authorForPost } from "@/content/data/authors";

/**
 * The blog index for a non-English market.
 *
 * The German and French articles are per-market originals, not translations
 * of the English ones, so each market gets its own index rather than a
 * language switcher over shared content. That also means NO hreflang: there
 * is no equivalent page in another language to point at.
 *
 * The English index at /resources/blog is deliberately left untouched and
 * does not use this component.
 */
type Strings = {
  /** Breadcrumb leaf, and the Blog node's name in the breadcrumb schema. */
  breadcrumb: string;
  title: string;
  lede: string;
  sectionLabel: string;
  /** e.g. (3) => "3 Beiträge" — called with the post count. */
  countLabel: (n: number) => string;
  empty: string;
  readMore: string;
  ctaTitle: React.ReactNode;
  ctaMeta: React.ReactNode;
  ctaLabel: string;
};

type Props = {
  /** BCP-47 code. Drives the lang attributes and the date formatting. */
  lang: string;
  /** Intl locale for dates, e.g. "de-DE". */
  dateLocale: string;
  /** Canonical path of this index, e.g. "/resources/blog/de". */
  path: string;
  posts: PostMeta[];
  strings: Strings;
};

export function LocalisedBlogIndex({
  lang,
  dateLocale,
  path,
  posts,
  strings: s,
}: Props) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: s.breadcrumb, url: path },
        ]}
      />

      <PageHeader
        current={s.breadcrumb}
        title={s.title}
        lede={s.lede}
        lang={lang}
      />

      <SectionBand
        num="01"
        label={s.sectionLabel}
        meta={s.countLabel(posts.length)}
      />

      {/* lang on the list, not the page: the surrounding chrome (nav, footer,
          breadcrumb) stays English, so scoping the declaration to the content
          is what actually describes the document. */}
      <div className="px-4 sm:px-9 py-8" lang={lang}>
        {posts.length === 0 ? (
          <p className="text-body text-ink-3">{s.empty}</p>
        ) : (
          <ul className="grid gap-px bg-rule grid-cols-1 md:grid-cols-2">
            {posts.map((post, i) => (
              <li key={post.slug} className="bg-paper">
                <Link
                  href={`/resources/blog/${post.slug}`}
                  className="block px-7 pt-6 pb-5 hover:bg-paper-3 transition-colors h-full"
                >
                  <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                    {String(i + 1).padStart(2, "0")}.0
                  </div>
                  <div className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em] mb-3">
                    {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}{" "}
                    · {authorForPost({ slug: post.slug, tags: post.tags }).name}
                  </div>
                  <h2 className="font-sans font-medium text-wide leading-[1.15] tracking-[-0.012em] text-ink mb-3">
                    {post.title}
                  </h2>
                  <p className="text-[13px] leading-[1.55] text-ink-2">
                    {post.description}
                  </p>
                  <div className="mt-4 font-mono text-micro text-ink uppercase tracking-[0.08em]">
                    {s.readMore} →
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div lang={lang}>
        <CtaBand
          title={s.ctaTitle}
          meta={s.ctaMeta}
          ctaLabel={s.ctaLabel}
          ctaHref="/contact"
        />
      </div>
    </>
  );
}

