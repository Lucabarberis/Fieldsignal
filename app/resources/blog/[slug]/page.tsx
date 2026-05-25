import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema, ArticleSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getAllPostSlugs, getPostMeta, getPost } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote-client/rsc";

type Props = { params: Promise<{ slug: string }> };

/** Build-time list of every blog slug → static page. */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

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

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        author={post.author}
      />

      <PageHeader
        current="Article"
        title={post.title}
        lede={post.description}
        meta={[
          { label: "Published", value: publishedDate },
          { label: "Author", value: post.author },
          ...(post.tags && post.tags.length > 0
            ? [{ label: "Tags", value: post.tags.join(", ") }]
            : []),
        ]}
      />

      <article className="prose px-9 py-12 max-w-4xl prose-headings:font-sans prose-headings:tracking-[-0.018em] prose-headings:text-ink prose-p:text-ink-2 prose-p:leading-[1.65] prose-a:text-ink prose-a:underline prose-a:decoration-rule-2 hover:prose-a:text-red hover:prose-a:decoration-red prose-strong:text-ink prose-blockquote:border-red prose-blockquote:text-ink-2 prose-code:text-ink prose-code:bg-paper-2 prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:py-0.5">
        <MDXRemote source={post.body} />
      </article>

      <CtaBand
        title={<>Join Our Network of <span className="text-red">50,000+</span> Professionals</>}
        meta={<>Our team is available to discuss your intelligence requirements <b className="text-paper font-medium">{SITE.hours}</b></>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}`}
      />
    </>
  );
}
