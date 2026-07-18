import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { SITE } from "@/lib/site";

/**
 * Branded 404. Replaces the stock Next.js error page, which shipped
 * unstyled chrome with no navigation off the dead end.
 *
 * Next serves this with an HTTP 404 status, so it stays a true not-found
 * rather than a soft 404.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHeader
        current="Not Found"
        title="This page doesn't exist."
        lede={
          <>
            The URL you followed is wrong, out of date, or the page has moved.
            Nothing is broken on your side — here are the places most people are
            heading.
          </>
        }
        meta={[
          { label: "Error", value: "404" },
          { label: "Status", value: "Page not found" },
        ]}
      />

      <SectionBand num="01" label="Where To Go" meta="Most-visited sections" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile
            id="01.1"
            name="SERVICES"
            meta="9 engagement formats"
            href="/services"
            cta="View services"
          >
            <p>
              Expert consultations, panel calls, surveys, reference checks and
              diligence research.
            </p>
          </Tile>
          <Tile
            id="01.2"
            name="PRICING"
            meta="Per-call and packages"
            href="/pricing"
            cta="View pricing"
          >
            <p>
              Transparent rates with no annual retainer and no minimum spend.
            </p>
          </Tile>
          <Tile
            id="01.3"
            name="RESOURCES"
            meta="Blog, guides, glossary"
            href="/resources"
            cta="Browse resources"
          >
            <p>
              Articles, buyer guides and a glossary of primary-research
              terminology.
            </p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="02" label="Looking For Something Else" meta="Other entry points" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile
            id="02.1"
            name="TRANSCRIPTS"
            meta="Expert call library"
            href="/transcripts"
            cta="Search transcripts"
          >
            <p>
              Anonymised expert call transcripts with free previews on every
              record.
            </p>
          </Tile>
          <Tile
            id="02.2"
            name="ALTERNATIVES"
            meta="Head-to-head comparisons"
            href="/alternatives"
            cta="Compare networks"
          >
            <p>
              How FieldSignal compares with GLG, AlphaSights, Third Bridge,
              Guidepoint and Tegus.
            </p>
          </Tile>
          <Tile
            id="02.3"
            name="CONTACT"
            meta="Response under 4 hours"
            href="/contact"
            cta="Get in touch"
          >
            <p>
              Tell us the industry, role and decision you&apos;re researching.
            </p>
          </Tile>
        </TileGrid>
      </div>

      <CtaBand
        title={
          <>
            Can&apos;t find it? <span className="text-red">Just ask.</span>
          </>
        }
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
