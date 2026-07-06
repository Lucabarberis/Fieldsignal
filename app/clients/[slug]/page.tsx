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
import { clients } from "@/content/data/clients";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return clients.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = clients.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({
    title: c.title,
    description: c.description,
    path: `/clients/${slug}`,
  });
}

export default async function ClientDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = clients.find((x) => x.slug === slug);
  if (!c) notFound();

  const related = c.relatedSlugs
    .map((rs) => clients.find((x) => x.slug === rs))
    .filter((x): x is NonNullable<typeof x> => x !== undefined);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Clients", url: "/clients" },
          { name: c.name, url: `/clients/${slug}` },
        ]}
      />

      <PageHeader
        current={c.name}
        title={c.title.split(" - ")[0]}
        lede={c.pageLede}
        meta={[
          { label: "Primary use", value: c.primaryKW },
          { label: "Minimum commitment", value: "None" },
          { label: "Engagement", value: "Per-call or programme" },
        ]}
      />

      <SectionBand
        num="01"
        label="Common Needs"
        meta={`${c.needs.length} buyer patterns`}
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...c.needs]} />
      </div>

      <SectionBand
        num="02"
        label="What We Provide"
        meta="Services tuned to this segment"
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...c.whatWeProvide]} />
      </div>

      <SectionBand
        num="03"
        label="Typical Engagements"
        meta="Anonymised examples"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          {c.typicalEngagements.map((eng, i) => (
            <article key={eng} className="bg-paper px-7 pt-6 pb-5">
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                03.{i + 1}
              </div>
              <p className="text-body text-ink mt-2">{eng}</p>
            </article>
          ))}
        </TileGrid>
      </div>

      {related.length > 0 && (
        <>
          <SectionBand
            num="04"
            label="Related Client Segments"
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
                  cta="View segment"
                  href={`/clients/${r.slug}`}
                  updated="Active"
                >
                  <p>{r.oneLiner}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={<>Brief us on your <span className="text-red">{c.primaryKW.replace("expert network for ", "")}</span> needs.</>}
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(c.name)}%20enquiry`}
      />
    </>
  );
}
