import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { authorForPost } from "@/content/data/authors";

export const metadata = pageMetadata({
  title: "The FieldSignal Blog",
  description:
    "Weekly writing on primary research methods, expert network industry shifts and sector intelligence. From the team at FieldSignal.",
  path: "/resources/blog",
});

/**
 * Re-fetch the post list from Supabase every 60s. New posts created via
 * the MCP appear here within a minute, without needing a redeploy.
 */
export const revalidate = 60;

export default async function BlogIndexPage() {
  // English only. The blog publishes German, French and Japanese articles
  // alongside these, but they are per-market originals rather than
  // translations, so mixing them into one index would show a reader
  // articles they cannot read and dilute the page's own language signal.
  // Each market gets its own index.
  const posts = await getAllPosts("en");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Blog", url: "/resources/blog" },
        ]}
      />

      <PageHeader
        current="Blog"
        title="The FieldSignal Blog"
        lede="Weekly writing on primary research methods, expert network industry shifts and sector intelligence."
      />

      <SectionBand
        num="01"
        label="Recent Posts"
        meta={`${posts.length} post${posts.length === 1 ? "" : "s"}`}
      />

      <div className="px-4 sm:px-9 py-8">
        {posts.length === 0 ? (
          <p className="text-body text-ink-3">No posts yet.</p>
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
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
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
                    Read post →
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Discovery path to the other markets. Without a crawlable link from
          somewhere in the site, the German and French indexes are reachable
          only via the sitemap — and readers never find them at all. `hreflang`
          on these is deliberately absent: the articles behind them are
          per-market originals, not translations of anything here. */}
      <SectionBand num="02" label="Other Markets" />
      <div className="px-4 sm:px-9 py-8">
        <ul className="grid gap-px bg-rule grid-cols-1 sm:grid-cols-2">
          {[
            {
              href: "/resources/blog/de",
              lang: "de",
              title: "Der FieldSignal Blog",
              note: "Beiträge auf Deutsch zu Primärforschung und Expertennetzwerken.",
            },
            {
              href: "/resources/blog/fr",
              lang: "fr",
              title: "Le blog FieldSignal",
              note: "Articles en français sur la recherche primaire et les réseaux d'experts.",
            },
          ].map((m) => (
            <li key={m.href} className="bg-paper">
              <Link
                href={m.href}
                hrefLang={m.lang}
                className="block px-7 pt-6 pb-5 hover:bg-paper-3 transition-colors h-full"
              >
                <h2
                  lang={m.lang}
                  className="font-sans font-medium text-wide leading-[1.15] tracking-[-0.012em] text-ink mb-2"
                >
                  {m.title}
                </h2>
                <p lang={m.lang} className="text-[13px] leading-[1.55] text-ink-2">
                  {m.note}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <CtaBand
        title={<>Join Our Network of <span className="text-red">50,000+</span> Professionals</>}
        meta={<>Our team is available to discuss your intelligence requirements <b className="text-paper font-medium">{SITE.hours}</b></>}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
