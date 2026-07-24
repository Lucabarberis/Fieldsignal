import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema, ArticleSchema, FAQSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { guides, getGuide } from "@/content/data/guides";
import {
  authorForGuideSlug,
  articleAuthor,
  personAnchor,
} from "@/content/data/authors";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return pageMetadata({
    title: g.title,
    description: g.description,
    path: `/resources/guides/${slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const related = g.relatedSlugs
    .map((rs) => getGuide(rs))
    .filter((x): x is NonNullable<typeof x> => x !== undefined);

  const author = authorForGuideSlug(slug);
  const profileUrl = `/team#${personAnchor(author.name)}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Guides", url: "/resources/guides" },
          { name: g.name, url: `/resources/guides/${slug}` },
        ]}
      />
      <ArticleSchema
        headline={g.title}
        description={g.description}
        url={`${SITE.url}/resources/guides/${slug}`}
        datePublished={g.publishedAt}
        author={articleAuthor(author, SITE.url)}
      />
      {g.faq && g.faq.length > 0 && (
        <FAQSchema items={g.faq.map((f) => ({ question: f.q, answer: f.a }))} />
      )}

      <PageHeader
        current={g.name}
        title={g.title.split(" - ")[0]}
        lede={g.pageLede}
        meta={[
          { label: "Read time", value: g.readTime },
          { label: "Topic", value: g.primaryKW },
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

      {/* ── TL;DR ─────────────────────────────────────────────────── */}
      <SectionBand num="00" label="TL;DR" meta="Skip-friendly summary" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <p className="font-sans text-[18px] leading-[1.55] text-ink border-l-4 border-red pl-6">
          {g.tldr}
        </p>
      </div>

      {/* ── Sections ─────────────────────────────────────────────── */}
      {g.sections.map((s, i) => (
        <div key={s.heading}>
          <SectionBand
            num={String(i + 1).padStart(2, "0")}
            label={s.heading}
            meta="—"
          />
          <div className="px-4 sm:px-9 py-8 max-w-4xl">
            <p className="font-sans text-[16px] leading-[1.65] text-ink-2">
              {s.body}
            </p>
          </div>
        </div>
      ))}

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      {g.faq && g.faq.length > 0 && (
        <>
          <SectionBand
            num={String(g.sections.length + 1).padStart(2, "0")}
            label="Frequently Asked"
            meta={`${g.faq.length} questions`}
          />
          <div className="p-4 sm:p-9">
            <article className="bg-paper px-7 pt-6 pb-5">
              <dl className="flex flex-col">
                {g.faq.map((f, i) => (
                  <div
                    key={f.q}
                    className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-4 ${
                      i > 0 ? "border-t border-rule" : ""
                    }`}
                  >
                    <dt className="font-mono text-mono text-red font-semibold opacity-[0.78] mt-0.5">
                      Q.{String(i + 1).padStart(2, "0")}
                    </dt>
                    <div>
                      <p className="font-sans font-semibold text-ink text-[15px] mb-1">
                        {f.q}
                      </p>
                      <p className="text-[13px] leading-[1.55] text-ink-2">
                        {f.a}
                      </p>
                    </div>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </>
      )}

      {/* ── Related guides ─────────────────────────────────────── */}
      {related.length > 0 && (
        <>
          <SectionBand
            num="99"
            label="Related Guides"
            meta={`${related.length} suggestions`}
          />
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {related.map((r) => (
                <Tile
                  key={r.slug}
                  id={r.id}
                  name={r.name}
                  meta={<b className="text-ink">{r.primaryKW}</b>}
                  cta="Read"
                  href={`/resources/guides/${r.slug}`}
                  updated={r.readTime}
                >
                  <p>{r.oneLiner}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={<>Want to skip the guide and brief us? <span className="text-red">Tell us the decision.</span></>}
        meta={<>First quote in 24h. Senior researcher direct.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(g.name)}%20enquiry`}
      />
    </>
  );
}
