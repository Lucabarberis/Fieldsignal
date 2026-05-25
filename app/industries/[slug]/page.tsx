import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { industries } from "@/content/data/industries";
import { getSubnichesFor } from "@/content/data/industry-subniches";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return {};
  return pageMetadata({
    title: ind.title,
    description: ind.description,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) notFound();

  const related = ind.relatedSlugs
    .map((rs) => industries.find((i) => i.slug === rs))
    .filter((i): i is NonNullable<typeof i> => i !== undefined);

  // Look up Wave 3 sub-niche pages for this parent. Falls back to plain
  // tiles for parents without dedicated sub-pages yet (energy, telecom,
  // real estate, education).
  const subnichePages = getSubnichesFor(ind.slug);
  const subnicheLookup = new Map(subnichePages.map((s) => [s.name, s]));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: ind.name, url: `/industries/${slug}` },
        ]}
      />

      <PageHeader
        current={ind.name}
        title={ind.title.split(" - ")[0]}
        lede={ind.pageLede}
        meta={[
          { label: "Sub-niches", value: `${ind.subniches.length}` },
          { label: "Expert types", value: `${ind.expertTypes.length}+` },
          { label: "Coverage", value: "Global" },
        ]}
      />

      <SectionBand
        num="01"
        label="Sub-Niches Covered"
        meta={`${ind.subniches.length} categories`}
      />
      <div className="p-9">
        <TileGrid cols={3}>
          {ind.subniches.map((sub, i) => {
            // Match the parent's display string to a sub-niche page by name
            // (case-insensitive, ignoring "&" vs "and" spelling variants).
            const normalized = sub.toUpperCase().replace(/&/g, "AND").trim();
            const page =
              subnicheLookup.get(sub.toUpperCase()) ??
              [...subnicheLookup.values()].find(
                (s) => s.name.replace(/&/g, "AND").trim() === normalized,
              );
            const id = `01.${i + 1}`;
            const body = (
              <>
                <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                  {id}
                </div>
                <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-3 uppercase">
                  {sub}
                </div>
                <p className="text-[13px] leading-[1.55] text-ink-2">
                  {page
                    ? page.description
                    : `Operators, executives and buyers across ${sub.toLowerCase()}.`}
                </p>
                {page && (
                  <div className="mt-3 font-mono text-mono uppercase tracking-[0.12em] text-red">
                    Read sub-niche →
                  </div>
                )}
              </>
            );
            return page ? (
              <a
                key={sub}
                href={`/industries/${ind.slug}/${page.slug}`}
                className="bg-paper px-7 pt-6 pb-5 block hover:bg-paper-2 transition-colors"
              >
                {body}
              </a>
            ) : (
              <article key={sub} className="bg-paper px-7 pt-6 pb-5">
                {body}
              </article>
            );
          })}
        </TileGrid>
      </div>

      <SectionBand
        num="02"
        label="Expert Types We Cover"
        meta={`${ind.expertTypes.length} archetypes`}
      />
      <div className="px-9 py-8 max-w-4xl">
        <Checklist items={[...ind.expertTypes]} />
      </div>

      <SectionBand
        num="03"
        label="Recent Project Examples"
        meta="Anonymised"
      />
      <div className="p-9">
        <TileGrid cols={2}>
          {ind.recentProjects.map((p, i) => (
            <article
              key={p}
              className="bg-paper px-7 pt-6 pb-5"
            >
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                03.{i + 1}
              </div>
              <p className="text-body text-ink mt-2">{p}</p>
            </article>
          ))}
        </TileGrid>
      </div>

      <SectionBand
        num="04"
        label="Compliance & Conflicts"
        meta="Sector-specific"
      />
      <div className="px-9 py-8 max-w-4xl">
        <p className="text-body text-ink-2">
          Sector-specific compliance constraints — such as MNPI rules for{" "}
          <strong>financial services</strong>, KOL restrictions for{" "}
          <strong>healthcare</strong> and ITAR for <strong>aerospace &amp; defense</strong>{" "}
          — are enforced before any call is scheduled. See our{" "}
          <a href="/compliance" className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors">
            compliance framework
          </a>{" "}
          for full detail.
        </p>
      </div>

      {related.length > 0 && (
        <>
          <SectionBand
            num="05"
            label="Related Sectors"
            meta={`${related.length} suggestions`}
          />
          <div className="p-9">
            <TileGrid cols={3}>
              {related.map((r) => (
                <Tile
                  key={r.slug}
                  id={r.id}
                  name={r.name}
                  meta={<>{r.subniches.length} sub-niches</>}
                  cta="View sector"
                  href={`/industries/${r.slug}`}
                  updated={`${r.subniches.length} niches`}
                >
                  <p>{r.oneLiner}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={
          <>
            Need <span className="text-red">{ind.name.toLowerCase().replace(/&/g, "and")}</span> coverage? Brief us.
          </>
        }
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(ind.name)}%20coverage%20enquiry`}
      />
    </>
  );
}
