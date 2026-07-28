import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { industries } from "@/content/data/industries";

export const metadata = pageMetadata({
  title: "Industries - Expert Networks Across Tech, Health, Finance",
  description:
    "Specialist expert coverage across technology, healthcare, financial services, consumer, industrials, energy, telecom, real estate and education.",
  path: "/industries",
});

export default function IndustriesHubPage() {
  const totalSubniches = industries.reduce(
    (sum, ind) => sum + ind.subniches.length,
    0
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
        ]}
      />

      <PageHeader
        current="Industries"
        title="Sector Coverage"
        lede={
          <>
            Nine parent industries. <b>{totalSubniches} sub-niches.</b> Operators, executives, KOLs and specialists across the sectors that drive global market activity.
          </>
        }
        meta={[
          { label: "Parent industries", value: `${industries.length}` },
          { label: "Sub-niches", value: `${totalSubniches}` },
          { label: "Network", value: "50,000+ experts" },
        ]}
      />

      <SectionBand
        num="01"
        label="All Industries"
        meta={`${industries.length} sectors covered`}
      />

      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {industries.map((ind) => (
            <Tile
              key={ind.slug}
              id={ind.id}
              name={ind.name}
              meta={<>{ind.subniches.length} sub-niches</>}
              cta="Request coverage"
              href="/contact"
              updated={`${ind.subniches.length} niches`}
            >
              <p>{ind.oneLiner}</p>
              <p className="text-ink-3 mt-3 text-[12px]">
                {ind.subniches.join(" · ")}
              </p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <SectionBand
        num="02"
        label="Don't See Your Sector?"
        meta="Custom recruitment"
      />

      <div className="p-4 sm:p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <header className="mb-4">
            <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">02.0</div>
            <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2">CUSTOM SECTOR RECRUITMENT</div>
          </header>
          <p className="text-body text-ink-2 max-w-3xl">
            Niche or emerging sector not listed above? We run targeted recruitment for sectors outside our standard coverage. Typical turnaround for niche recruitment is <strong>10–15 business days</strong>. Past examples include space technology, agricultural biotech, carbon markets, defence supply chain, and gambling regulation.
          </p>
        </article>
      </div>

      <CtaBand
        title={<>50,000+ experts. <span className="text-red">9 sectors.</span> One brief away.</>}
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
