import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema, ArticleSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import {
  getAllPostSlugs,
  getPostMeta,
  getPost,
  getPublishedSlugSet,
} from "@/lib/posts";
import { makeMdxComponents } from "@/components/MdxLink";
import { PostDiagram } from "@/components/PostDiagram";
import {
  authorForPost,
  articleAuthor,
  personAnchor,
} from "@/content/data/authors";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import { remarkGlossaryLinks } from "@/lib/mdx/remark-glossary-links";
import { remarkExternalCitations } from "@/lib/mdx/remark-external-citations";

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkGlossaryLinks, remarkExternalCitations],
  },
};

type Props = { params: Promise<{ slug: string }> };

/** Build-time list of every blog slug → static page. */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Allow on-demand rendering of slugs not known at build time.
 * Without this, a post created via the MCP after the last Vercel build
 * would 404 until the next rebuild.
 */
export const dynamicParams = true;

/**
 * Re-fetch from Supabase every 60s. Lets edits to a post appear within
 * a minute without requiring a redeploy.
 */
export const revalidate = 60;

/** Per-post metadata. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMeta(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/resources/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Body links are rewritten to canonical paths, and links to posts that
  // aren't publicly visible are de-linked rather than left to 404.
  // Memoised — this runs on every post render, including static builds.
  const publishedSlugs = await getPublishedSlugSet();

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Byline is attributed editorially by topic (see content/data/authors.ts),
  // from the post's own tags — not the DB `author` field, which still carries
  // the legacy "Miles" on every row.
  const author = authorForPost({ slug, tags: post.tags });
  const profileUrl = `/team#${personAnchor(author.name)}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Blog", url: "/resources/blog" },
          { name: post.title, url: `/resources/blog/${slug}` },
        ]}
      />
      <ArticleSchema
        headline={post.title}
        description={post.description}
        url={`${SITE.url}/resources/blog/${slug}`}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        author={articleAuthor(author, SITE.url)}
      />

      <PageHeader
        current="Article"
        title={post.title}
        lede={post.description}
        meta={[
          { label: "Published", value: publishedDate },
          {
            label: "Author",
            value: (
              <Link href={profileUrl} className="hover:text-red transition-colors">
                {author.name}
              </Link>
            ),
          },
        ]}
      />

      <article className="prose px-4 sm:px-9 py-12 max-w-4xl prose-headings:font-sans prose-headings:tracking-[-0.018em] prose-headings:text-ink prose-p:text-ink-2 prose-p:leading-[1.65] prose-a:text-ink prose-a:underline prose-a:decoration-rule-2 hover:prose-a:text-red hover:prose-a:decoration-red prose-strong:text-ink prose-blockquote:border-red prose-blockquote:text-ink-2 prose-code:text-ink prose-code:bg-paper-2 prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5">
        {/* Illustrative chart summarising the post. Renders nothing when the
            post has no diagram in content/diagrams. */}
        <PostDiagram slug={slug} />

        <MDXRemote
          source={post.body}
          options={mdxOptions}
          components={makeMdxComponents(publishedSlugs)}
        />
      </article>

      <CtaBand
        title={<>Join Our Network of <span className="text-red">50,000+</span> Professionals</>}
        meta={<>Our team is available to discuss your intelligence requirements <b className="text-paper font-medium">{SITE.hours}</b></>}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
