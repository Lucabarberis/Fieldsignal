import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { useCases } from "@/content/data/use-cases";

export const metadata = pageMetadata({
  title: "Use Cases - Diligence, VoC, Win-Loss, Market Sizing",
  description:
    "Fifteen ways FieldSignal clients use primary research to make better commercial and investment decisions.",
  path: "/use-cases",
});

export default function UseCasesHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Use Cases", url: "/use-cases" },
        ]}
      />

      <PageHeader
        current="Use Cases"
        title="Fifteen ways to use a network."
        lede={
          <>
            Most clients don&apos;t come to us asking for &quot;expert calls.&quot; They come asking how to <b>size a market, win back a customer, validate a thesis or test a price</b>. Here are the fifteen disciplines we support most.
          </>
        }
        meta={[
          { label: "Disciplines", value: `${useCases.length}` },
          { label: "Format", value: "Project or programme" },
          { label: "Entry point", value: "Single project" },
        ]}
      />

      <SectionBand
        num="01"
        label="All Use Cases"
        meta={`${useCases.length} disciplines`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {useCases.map((u) => (
            <Tile
              key={u.slug}
              id={u.id}
              name={u.name}
              meta={<b className="text-ink">{u.primaryKW}</b>}
              cta="Read"
              href={`/use-cases/${u.slug}`}
              updated={u.timeline}
            >
              <p>{u.oneLiner}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <CtaBand
        title={<>Not sure which fits? <span className="text-red">Tell us the decision.</span></>}
        meta={<>We&apos;ll recommend the right discipline — or tell you it&apos;s not us.</>}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
