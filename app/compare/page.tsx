import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { compares } from "@/content/data/compare";
import { getCompetitor } from "@/content/data/competitors";

export const metadata = pageMetadata({
  title: "Compare FieldSignal - Head-To-Head Reviews",
  description:
    "Honest head-to-head comparisons of FieldSignal against the major expert networks. Feature tables, pricing, switching guides.",
  path: "/compare",
});

export default function CompareHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Compare", url: "/compare" },
        ]}
      />

      <PageHeader
        current="Compare"
        title="Head-to-head, honestly."
        lede={
          <>
            Six direct comparisons of FieldSignal against the major expert networks. <b>Feature tables, transparent pricing, switching guides.</b> We&apos;ll tell you when the other one is the right answer.
          </>
        }
        meta={[
          { label: "Comparisons", value: `${compares.length}` },
          { label: "Last refreshed", value: "Q1 2026" },
          { label: "Affiliate spin", value: "None" },
          { label: "Format", value: "Side-by-side" },
        ]}
      />

      <SectionBand
        num="01"
        label="Head-To-Head Reviews"
        meta={`${compares.length} comparisons`}
      />
      <div className="p-9">
        <TileGrid cols={3}>
          {compares.map((c) => {
            const competitor = getCompetitor(c.competitorSlug);
            return (
              <Tile
                key={c.slug}
                id={c.id}
                name={c.name}
                meta={competitor ? <b className="text-ink">vs {competitor.name}</b> : undefined}
                cta="Read comparison"
                href={`/compare/${c.slug}`}
                updated="Q1 2026"
              >
                <p>{c.description}</p>
              </Tile>
            );
          })}
        </TileGrid>
      </div>

      <CtaBand
        title={<>Not sure which to pick? <span className="text-red">Tell us your brief.</span></>}
        meta={<>We&apos;ll recommend a competitor if we&apos;re not the right fit.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=FieldSignal%20comparison`}
      />
    </>
  );
}
