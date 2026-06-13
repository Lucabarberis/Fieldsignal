import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { expertPages } from "@/content/data/experts-pages";

export const metadata = pageMetadata({
  title: "Join the FieldSignal Expert Network",
  description:
    "Share your industry knowledge with serious clients. Paid within 5 business days. No hidden non-competes.",
  path: "/experts",
});

export default function ExpertsHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Experts", url: "/experts" },
        ]}
      />

      <PageHeader
        current="For Experts"
        title="Get paid for what you know."
        lede={
          <>
            FieldSignal exists because serious buyers want to talk to operators who&apos;ve actually done the job — not consultants explaining it. <b>€150–€1,500 per call. Paid in 5 business days. No exclusivity agreements.</b>
          </>
        }
        meta={[
          { label: "Application", value: "5 minutes" },
          { label: "Rate range", value: "€150–€1,500 / call" },
          { label: "Payment", value: "Within 5 business days" },
          { label: "Network size", value: "50,000+" },
        ]}
      />

      <SectionBand
        num="01"
        label="For Experts"
        meta={`${expertPages.length} pages`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {expertPages.map((p) => (
            <Tile
              key={p.slug}
              id={p.id}
              name={p.name}
              meta={<b className="text-ink">{p.primaryKW}</b>}
              cta="Read"
              href={`/experts/${p.slug}`}
              updated="Q1 2026"
            >
              <p>{p.oneLiner}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <CtaBand
        title={<>Ready to join? <span className="text-red">5-minute application.</span></>}
        meta={<>We review every application within 5 business days.</>}
        ctaLabel="Apply Now"
        ctaHref={`mailto:${SITE.contactEmail}?subject=Expert%20application`}
      />
    </>
  );
}
