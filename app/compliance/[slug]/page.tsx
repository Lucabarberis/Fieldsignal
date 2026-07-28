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
import { complianceSubs } from "@/content/data/compliance-subs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return complianceSubs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = complianceSubs.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({
    title: c.title,
    description: c.description,
    path: `/compliance/${slug}`,
  });
}

export default async function ComplianceSubPage({ params }: Props) {
  const { slug } = await params;
  const c = complianceSubs.find((x) => x.slug === slug);
  if (!c) notFound();

  const related = c.relatedSlugs
    .map((rs) => complianceSubs.find((x) => x.slug === rs))
    .filter((x): x is NonNullable<typeof x> => x !== undefined);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Compliance", url: "/compliance" },
          { name: c.name, url: `/compliance/${slug}` },
        ]}
      />

      <PageHeader
        current={c.name}
        title={c.title.split(" - ")[0]}
        lede={c.pageLede}
        meta={c.metaItems.map((m) => ({ ...m }))}
      />

      {c.sections.map((section, i) => (
        <div key={section.heading}>
          <SectionBand
            num={String(i + 1).padStart(2, "0")}
            label={section.heading}
            meta={section.meta}
          />
          <div className="px-4 sm:px-9 py-8 max-w-4xl">
            {section.paragraphs?.map((p, j) => (
              <p key={j} className="text-body text-ink-2 mb-4">
                {p}
              </p>
            ))}
            {section.bullets && (
              <div className="mt-2">
                <Checklist items={[...section.bullets]} />
              </div>
            )}
          </div>
        </div>
      ))}

      {related.length > 0 && (
        <>
          <SectionBand
            num={String(c.sections.length + 1).padStart(2, "0")}
            label="Related Compliance Pages"
            meta={`${related.length} suggestions`}
          />
          <div className="p-4 sm:p-9">
            <TileGrid cols={2}>
              {related.map((r) => (
                <Tile
                  key={r.slug}
                  id={r.id}
                  name={r.name}
                  cta="View page"
                  href={`/compliance/${r.slug}`}
                  updated="Active"
                >
                  <p>{r.pageLede}</p>
                </Tile>
              ))}
              <Tile
                id="00"
                name="COMPLIANCE OVERVIEW"
                cta="Back to framework"
                href="/compliance"
                updated="Hub"
              >
                <p>The top-level compliance framework page — covering all of the above plus client protocols, expert vetting and insurance.</p>
              </Tile>
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={<>Compliance question? <span className="text-red">Direct line.</span></>}
        meta={<>Compliance enquiries answered same-day, {SITE.hours}.</>}
        ctaLabel="Contact Compliance"
        ctaHref="/contact"
      />
    </>
  );
}
