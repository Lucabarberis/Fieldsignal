import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { clients } from "@/content/data/clients";

export const metadata = pageMetadata({
  title: "Who We Work With - Startups to Fortune 500",
  description:
    "Twelve client segments, one service standard. From seed-stage startups to multi-billion hedge funds, treated with the same depth and speed.",
  path: "/clients",
});

export default function ClientsHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Clients", url: "/clients" },
        ]}
      />

      <PageHeader
        current="Clients"
        title="Who We Work With"
        lede={
          <>
            From seed-stage founders to <b>Fortune 500 strategy teams</b> — treated equally, priced honestly, served by the same senior team.
          </>
        }
        meta={[
          { label: "Active segments", value: `${clients.length}` },
          { label: "Smallest engagement", value: "Single call" },
          { label: "Largest engagement", value: "Annual programmes" },
        ]}
      />

      <SectionBand
        num="01"
        label="Client Segments"
        meta={`${clients.length} priority segments`}
      />

      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {clients.map((c) => (
            <Tile
              key={c.slug}
              id={c.id}
              name={c.name}
              meta={<b className="text-ink">{c.primaryKW}</b>}
              cta="View segment"
              href={`/clients/${c.slug}`}
              updated="Active"
            >
              <p>{c.oneLiner}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <SectionBand
        num="02"
        label="One Service Standard"
        meta="Across all segments"
      />

      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="02.1" name="SAME COMPLIANCE">
            <p>Every client — from a seed-stage founder to a multi-billion fund — gets the same compliance framework. 6-month cooling-off, MNPI controls, 7-year audit trail.</p>
          </Tile>
          <Tile id="02.2" name="SAME EXPERT QUALITY">
            <p>The 50,000-person network is shared across all client tiers. No "premium pool" reserved for institutional clients.</p>
          </Tile>
          <Tile id="02.3" name="SAME SENIOR LEAD">
            <p>Every engagement is led by a senior FieldSignal team member. No junior coordinators, no automated routing.</p>
          </Tile>
        </TileGrid>
      </div>

      <CtaBand
        title={<>Where do you fit? <span className="text-red">Tell us.</span></>}
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
