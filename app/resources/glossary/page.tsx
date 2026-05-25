import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { glossary } from "@/content/data/glossary";

export const metadata = pageMetadata({
  title: "Expert Network Glossary - 30+ Terms Defined",
  description:
    "Plain-language definitions of MNPI, KOL, primary research, panel calls, management checks and more. Continuously expanding.",
  path: "/resources/glossary",
});

export default function GlossaryHubPage() {
  // Sort alphabetically by term for a clean A-Z reading experience
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Glossary", url: "/resources/glossary" },
        ]}
      />

      <PageHeader
        current="Glossary"
        title="Plain-language definitions."
        lede={
          <>
            Every expert-network term explained in plain language, with concrete examples and cross-links to the service or use case it applies to. <b>{glossary.length} terms today, growing weekly.</b>
          </>
        }
        meta={[
          { label: "Terms defined", value: `${glossary.length}` },
          { label: "Format", value: "Definition + examples + FAQ" },
          { label: "Last refreshed", value: "Q1 2026" },
          { label: "Coverage", value: "Compliance · research · methodology" },
        ]}
      />

      <SectionBand
        num="01"
        label="All Terms (A–Z)"
        meta={`${glossary.length} entries`}
      />
      <div className="p-9">
        <TileGrid cols={3}>
          {sorted.map((t, i) => (
            <Tile
              key={t.slug}
              id={String(i + 1).padStart(2, "0")}
              name={t.name}
              meta={<b className="text-ink">{t.term}</b>}
              cta="Read definition"
              href={`/resources/glossary/${t.slug}`}
              updated="Q1 2026"
            >
              <p>{t.definition.length > 140 ? t.definition.slice(0, 137) + "…" : t.definition}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <CtaBand
        title={<>Missing a term? <span className="text-red">Tell us what to add.</span></>}
        meta={<>We&apos;ll write it up in 48 hours and credit the suggestion if you want it.</>}
        ctaLabel="Suggest a term"
        ctaHref={`mailto:${SITE.contactEmail}?subject=Glossary%20suggestion`}
      />
    </>
  );
}
