import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { resources } from "@/content/data/resources";
import { getAllPosts } from "@/lib/posts";

export const metadata = pageMetadata({
  title: "Resources - Guides, Blog, Reports and Glossary",
  description:
    "Educational content for buyers and users of expert networks. Guides, case studies, sector reports and a 50-term glossary.",
  path: "/resources",
});

export default async function ResourcesHubPage() {
  const recentPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ]}
      />

      <PageHeader
        current="Resources"
        title="Resources"
        lede={
          <>
            Educational content for buyers and users of expert networks. Guides, case studies, sector reports and a glossary, plus our weekly blog.
          </>
        }
        meta={[
          { label: "Categories", value: `${resources.length}` },
          { label: "Blog cadence", value: "Weekly" },
          { label: "Glossary", value: "50+ terms" },
        ]}
      />

      <SectionBand
        num="01"
        label="Categories"
        meta={`${resources.length} resource types`}
      />

      <div className="p-9">
        <TileGrid cols={3}>
          {resources.map((r) => (
            <Tile
              key={r.slug}
              id={r.id}
              name={r.name}
              meta={
                r.available ? (
                  <b className="text-ink">Available</b>
                ) : (
                  <span className="text-ink-3">Coming soon</span>
                )
              }
              cta={r.available ? r.cta : undefined}
              href={r.available ? r.href : undefined}
              updated={r.available ? "Live" : "Q3 2026"}
            >
              <p>{r.oneLiner}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      {recentPosts.length > 0 && (
        <>
          <SectionBand
            num="02"
            label="Latest From The Blog"
            meta={`${recentPosts.length} recent post${recentPosts.length === 1 ? "" : "s"}`}
          />
          <div className="p-9">
            <TileGrid cols={3}>
              {recentPosts.map((post, i) => (
                <Tile
                  key={post.slug}
                  id={`02.${i + 1}`}
                  name={post.title.toUpperCase()}
                  meta={
                    <>
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}{" "}
                      · {post.author}
                    </>
                  }
                  cta="Read post"
                  href={`/resources/blog/${post.slug}`}
                  updated="Blog"
                >
                  <p>{post.description}</p>
                </Tile>
              ))}
            </TileGrid>
            <div className="mt-6">
              <Link
                href="/resources/blog"
                className="font-mono text-mono uppercase tracking-[0.14em] text-ink hover:text-red transition-colors"
              >
                See all posts →
              </Link>
            </div>
          </div>
        </>
      )}

      <CtaBand
        title={<>Want the deep stuff? <span className="text-red">Subscribe.</span></>}
        meta={<>Weekly insights for primary research buyers. {SITE.hours}.</>}
        ctaLabel="Email Miles"
        ctaHref={`mailto:${SITE.contactEmail}?subject=Newsletter%20signup`}
      />
    </>
  );
}
