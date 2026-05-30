import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { guides } from "@/content/data/guides";

export const metadata = pageMetadata({
  title: "Guides - In-Depth Playbooks on Primary Research",
  description:
    "Long-form guides for buyers of expert networks and primary research programs. Pricing, RFPs, compliance and frameworks.",
  path: "/resources/guides",
});

export default function GuidesHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Guides", url: "/resources/guides" },
        ]}
      />

      <PageHeader
        current="Guides"
        title="Long-form, evidence-led."
        lede={
          <>
            Practical guides on running primary research programs — written for buyers who need to make decisions, not for buyers shopping for tools. <b>No gated downloads. No lead-form walls.</b>
          </>
        }
        meta={[
          { label: "Guides", value: `${guides.length}` },
          { label: "Gated downloads", value: "None" },
        ]}
      />

      <SectionBand
        num="01"
        label="All Guides"
        meta={`${guides.length} long-form pieces`}
      />
      <div className="p-9">
        <TileGrid cols={3}>
          {guides.map((g) => (
            <Tile
              key={g.slug}
              id={g.id}
              name={g.name}
              meta={<b className="text-ink">{g.primaryKW}</b>}
              cta="Read guide"
              href={`/resources/guides/${g.slug}`}
              updated={g.readTime}
            >
              <p>{g.oneLiner}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <CtaBand
        title={<>Have a brief? <span className="text-red">Skip the guides. Talk to us.</span></>}
        meta={<>First quote in 24h. We&apos;ll recommend a competitor if we&apos;re not the right fit.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=Brief%20enquiry`}
      />
    </>
  );
}
