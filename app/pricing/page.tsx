import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Expert Network Pricing - Transparent Rates and Packages",
  description:
    "Per-call pricing from $200. Project packages from $900. Subscription plans for ongoing research. No annual retainers. No hidden minimums.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ]}
      />

      <PageHeader
        current="Pricing"
        title="Transparent pricing."
        lede={
          <>
            Per-call rates from <b>$200</b>. Project packages from <b>$900</b>. Subscription plans for ongoing research. <b>No annual retainers. No hidden minimums.</b>
          </>
        }
        meta={[
          { label: "Smallest cheque", value: "$200" },
          { label: "Largest cheque", value: "Custom annual" },
          { label: "Currency", value: "USD" },
          { label: "Payment terms", value: "Net 30" },
        ]}
      />

      <SectionBand num="01" label="Per-Call Pricing" meta="Single expert consultations" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="01.1" name="STANDARD CALL" meta={<><b>$200</b> · per call</>}>
            <p>60-minute call with a mid-seniority expert in your industry. 3–5 day turnaround. Transcript within 24 hours.</p>
          </Tile>
          <Tile id="01.2" name="SENIOR CALL" meta={<><b>$400</b> · per call</>}>
            <p>60-minute call with a senior operator (Director / VP-level). Common for buyer interviews, ex-employee diligence.</p>
          </Tile>
          <Tile id="01.3" name="C-SUITE CALL" meta={<><b>$800</b> · per call</>}>
            <p>60-minute call with a C-suite or board-level expert. Reserved for sensitive diligence and high-stakes strategic questions.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="02" label="Project Packages" meta="Multi-call engagements" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="02.1" name="STARTER PACK" meta={<>From <b>$900</b> · 5 calls</>}>
            <p>5 expert calls within a single thesis. ~20% off per-call rate. Typical for thesis validation and quick channel checks.</p>
          </Tile>
          <Tile id="02.2" name="DILIGENCE SPRINT" meta={<>From <b>$6,000</b> · 15+ calls</>}>
            <p>15–30 calls in a 2-week sprint. Customer, channel and ex-employee research bundled. Findings deck included.</p>
          </Tile>
          <Tile id="02.3" name="MANAGEMENT REFS" meta={<>From <b>$2,600</b> · per exec</>}>
            <p>5–8 off-list references per executive, anonymised composite report. Common for pre-IC / pre-close diligence.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="03" label="Subscriptions" meta="Ongoing programmes" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="03.1" name="TRANSCRIPT LIBRARY" meta={<><b>$99</b> · per month</>}>
            <p>Search and download from 5,000+ anonymised expert transcripts. Free 300–500 word previews on every record. Cancel anytime.</p>
          </Tile>
          <Tile id="03.2" name="RESEARCH SUBSCRIPTION" meta={<>From <b>$1,200</b> · per month</>}>
            <p>Monthly call credits, transcript access, dedicated researcher. Common for emerging hedge funds and active corp-dev teams.</p>
          </Tile>
          <Tile id="03.3" name="ENTERPRISE" meta={<>Custom · annual</>}>
            <p>Multi-team programmes, custom compliance integration, dedicated team. For PE funds, hedge funds and corporates with predictable research volume.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="04" label="What's Not Included" meta="The traps we don't set" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[
          "No mandatory annual retainer",
          "No fund-level or seat-level minimum spend",
          "No \"premium pool\" of experts gated by client tier",
          "No automated routing or junior coordinators",
          "No hidden fees on transcript exports, scheduling or compliance",
        ]} />
      </div>

      <SectionBand num="05" label="How To Engage" meta="3 paths in" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="05.1" name="REQUEST A SINGLE CALL"
                cta="Request call"
                href="/contact/request-a-call">
            <p>Tell us the industry, role and decision you&apos;re researching. We propose 10–20 candidates within 24–72 hours.</p>
          </Tile>
          <Tile id="05.2" name="GET A PROJECT QUOTE"
                cta="Get a quote"
                href="/contact/get-a-quote">
            <p>Multi-call engagement? Send us scope, sectors and timeline. Quote returned within one business day.</p>
          </Tile>
          <Tile id="05.3" name="BOOK A WALKTHROUGH"
                cta="Book a demo"
                href="/contact/book-a-demo">
            <p>30-minute walkthrough of search, scheduling, transcripts and compliance tools. For institutional buyers.</p>
          </Tile>
        </TileGrid>
      </div>

      <CtaBand
        title={<>Brief us today. <span className="text-red">First quote in 24h.</span></>}
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=Pricing%20enquiry`}
      />
    </>
  );
}
