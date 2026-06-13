import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { services } from "@/content/data/services";

export const metadata = pageMetadata({
  title: "Expert Network Services - Calls, Panels, Surveys",
  description:
    "Nine core services from one-hour expert consultations to multi-methodology custom intelligence projects. No retainers, transparent pricing.",
  path: "/services",
});

export default function ServicesHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />

      <PageHeader
        current="Services"
        title="Expert Network Services"
        lede={
          <>
            Nine engagement formats — from one-hour expert consultations to multi-methodology custom intelligence projects. <b>No mandatory retainers. No minimum commitments.</b>
          </>
        }
        meta={[
          { label: "Formats", value: `${services.length} services` },
          { label: "Pricing", value: "From €500 per call" },
          { label: "Turnaround", value: "3 days to 6 weeks" },
        ]}
      />

      <SectionBand
        num="01"
        label="All Services"
        meta={`${services.length} engagement formats`}
      />

      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {services.map((s) => (
            <Tile
              key={s.slug}
              id={s.id}
              name={s.name}
              meta={s.turnaround ? <>Turnaround · <b>{s.turnaround}</b></> : undefined}
              cta="Request a brief"
              href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(s.name)}%20enquiry`}
              updated={s.turnaround}
            >
              <p>{s.oneLiner}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <SectionBand
        num="02"
        label="How To Engage"
        meta="3-step intake"
      />

      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="02.1" name="SHARE THE BRIEF">
            <p>Email the team with sector, role, geography and decision timeline. We respond within one business day, usually faster.</p>
          </Tile>
          <Tile id="02.2" name="REVIEW CANDIDATES">
            <p>We propose 10–20 vetted experts within 24–72 hours. Profiles include relevant experience and compliance clearance status.</p>
          </Tile>
          <Tile id="02.3" name="ENGAGE & DELIVER">
            <p>Calls are scheduled directly with you. Transcripts and synthesis follow within 1 business day of each call. Audit trail kept 7 years.</p>
          </Tile>
        </TileGrid>
      </div>

      <CtaBand
        title={<>Ready to brief us? <span className="text-red">Start today.</span></>}
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}`}
      />
    </>
  );
}
