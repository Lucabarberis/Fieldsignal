import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { regions } from "@/content/data/regions";

export const metadata = pageMetadata({
  title: "Regional Expert Network Coverage - Eight Geographies",
  description:
    "Expert depth across UK, Europe, North America, MENA, APAC, Southeast Asia, LATAM and Africa. Native-language interviewing in 20+ languages.",
  path: "/regions",
});

export default function RegionsHubPage() {
  const totalExperts = regions.reduce((acc, r) => {
    const num = parseInt(r.expertCount.replace(/[^0-9]/g, ""), 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Regions", url: "/regions" },
        ]}
      />

      <PageHeader
        current="Regions"
        title="Native, not translated."
        lede={
          <>
            Eight regional benches with native-language interviewing in 20+ languages. <b>{totalExperts.toLocaleString()}+ operating professionals worldwide.</b> Coverage gaps filled by documented local sourcing partners with appropriate compliance overlay.
          </>
        }
        meta={[
          { label: "Regions", value: `${regions.length}` },
          { label: "Languages", value: "20+ native" },
          { label: "Total bench", value: `${totalExperts.toLocaleString()}+` },
          { label: "Coverage", value: "Global" },
        ]}
      />

      <SectionBand
        num="01"
        label="Regional Benches"
        meta={`${regions.length} geographies`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {regions.map((r) => (
            <Tile
              key={r.slug}
              id={r.id}
              name={r.name}
              meta={<b className="text-ink">{r.expertCount} experts</b>}
              cta="View coverage"
              href={`/regions/${r.slug}`}
              updated={`${r.languages.length} langs`}
            >
              <p>{r.oneLiner}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <CtaBand
        title={<>Need cross-region coverage? <span className="text-red">Tell us the geographies.</span></>}
        meta={<>We&apos;ll quote with native-language interviewing where it matters.</>}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
