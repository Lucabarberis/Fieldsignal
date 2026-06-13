import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { alternatives } from "@/content/data/alternatives";

export const metadata = pageMetadata({
  title: "Expert Network Alternatives - Honest Competitor Reviews",
  description:
    "Honest, side-by-side comparisons of the major expert networks. When the incumbent is the right answer. When it isn't.",
  path: "/alternatives",
});

export default function AlternativesHubPage() {
  const competitorPages = alternatives.filter((a) => a.competitorSlug);
  const categoryPages = alternatives.filter((a) => a.category);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Alternatives", url: "/alternatives" },
        ]}
      />

      <PageHeader
        current="Alternatives"
        title="Honest competitor reviews."
        lede={
          <>
            Side-by-side comparisons of the major expert networks. We&apos;re explicit about when each incumbent is the right answer — and when FieldSignal genuinely isn&apos;t. <b>No affiliate spin. No fake testimonials.</b>
          </>
        }
        meta={[
          { label: "Competitors reviewed", value: `${competitorPages.length}` },
          { label: "Category guides", value: `${categoryPages.length}` },
          { label: "Last refreshed", value: "Q1 2026" },
          { label: "Affiliate links", value: "None" },
        ]}
      />

      <SectionBand
        num="01"
        label="Compared To Specific Networks"
        meta={`${competitorPages.length} head-to-head reviews`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {competitorPages.map((a) => (
            <Tile
              key={a.slug}
              id={a.id}
              name={a.name}
              meta={<b className="text-ink">{a.primaryKW}</b>}
              cta="Read review"
              href={`/alternatives/${a.slug}`}
              updated="Q1 2026"
            >
              <p>{a.description}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <SectionBand
        num="02"
        label="By Buyer Type"
        meta={`${categoryPages.length} category guides`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {categoryPages.map((a) => (
            <Tile
              key={a.slug}
              id={a.id}
              name={a.name}
              meta={<b className="text-ink">{a.primaryKW}</b>}
              cta="Read guide"
              href={`/alternatives/${a.slug}`}
              updated="Q1 2026"
            >
              <p>{a.description}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <CtaBand
        title={<>Not sure which is right? <span className="text-red">Ask us — we&apos;ll tell you honestly.</span></>}
        meta={<>We&apos;ll recommend a competitor if we&apos;re not the right fit.</>}
        ctaLabel="Email Miles"
        ctaHref={`mailto:${SITE.contactEmail}?subject=Expert%20network%20comparison`}
      />
    </>
  );
}
