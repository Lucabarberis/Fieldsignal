import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { platformPages } from "@/content/data/platform";

export const metadata = pageMetadata({
  title: "The FieldSignal Platform - Search, Schedule, Transcribe",
  description:
    "Search 50,000+ vetted experts, schedule calls, launch surveys and browse transcripts in one platform.",
  path: "/platform",
});

export default function PlatformHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Platform", url: "/platform" },
        ]}
      />

      <PageHeader
        current="Platform"
        title="One workflow, end to end."
        lede={
          <>
            The FieldSignal platform integrates expert search, scheduling, transcript browsing and compliance tooling. <b>We&apos;re honest about what ships today vs what&apos;s on the roadmap.</b>
          </>
        }
        meta={[
          { label: "Modules", value: `${platformPages.length}` },
          { label: "Shipping", value: "Researcher-led + integrations" },
          { label: "Roadmap horizon", value: "Q3–Q4 2026" },
          { label: "API access", value: "Institutional, on request" },
        ]}
      />

      <SectionBand
        num="01"
        label="Platform Modules"
        meta={`${platformPages.length} components`}
      />
      <div className="p-9">
        <TileGrid cols={3}>
          {platformPages.map((p) => (
            <Tile
              key={p.slug}
              id={p.id}
              name={p.name}
              meta={<b className="text-ink">{p.primaryKW}</b>}
              cta="Learn more"
              href={`/platform/${p.slug}`}
              updated="Q1 2026"
            >
              <p>{p.oneLiner}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <CtaBand
        title={<>See it in action. <span className="text-red">Book a walkthrough.</span></>}
        meta={<>30-minute demo of the platform. No sales pitch.</>}
        ctaLabel="Book a Demo"
        ctaHref="/contact/book-a-demo"
      />
    </>
  );
}
