import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Meet the FieldSignal Team - Operators, Researchers, Compliance",
  description:
    "Former operators from FAANG-scale tech, hedge funds and consulting firms. 30 researchers across multiple time zones. Compliance leads from financial services.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Team", url: "/team" },
        ]}
      />

      <PageHeader
        current="Team"
        title="Operators, researchers, compliance."
        lede={
          <>
            Thirty professionals across UK, EU and APAC time zones, drawn from <b>FAANG-scale technology, hedge funds, top-tier consulting and financial-services compliance</b>. Every engagement is led by a senior team member, regardless of cheque size.
          </>
        }
        meta={[
          { label: "Team size", value: "30 researchers" },
          { label: "Coverage", value: "UK · EU · APAC" },
          { label: "Time zones", value: "GMT, CET, HKT" },
          { label: "Languages", value: "EN · ZH · FR · DE" },
        ]}
      />

      <SectionBand num="01" label="Leadership" meta="Founders and senior leads" />
      <div className="p-9">
        <TileGrid cols={3}>
          <Tile id="01.1" name="MILES — FOUNDER">
            <p>Former operator across FAANG-scale technology and growth-stage startups. Built FieldSignal after a decade of using — and being frustrated by — institutional expert networks priced for hedge funds, not founders.</p>
          </Tile>
          <Tile id="01.2" name="HEAD OF RESEARCH">
            <p>Former Tier-1 strategy consultant. Built primary research programmes for Fortune 500 strategy teams before joining FieldSignal to apply the same standard at boutique scale.</p>
          </Tile>
          <Tile id="01.3" name="HEAD OF COMPLIANCE">
            <p>Former compliance officer at a global investment firm. Owns FieldSignal&apos;s MNPI policy, expert vetting, exclusion-list management and external-audit cadence.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="02" label="Research Team" meta="30 across multiple regions" />
      <div className="p-9">
        <TileGrid cols={3}>
          <Tile id="02.1" name="EUROPE (12)">
            <p>London, Paris, Frankfurt, Madrid. Former operators across SaaS, healthcare, financial services and consumer. Native EN, FR, DE, ES.</p>
          </Tile>
          <Tile id="02.2" name="APAC (10)">
            <p>Hong Kong, Singapore, Tokyo, Sydney. Coverage of Greater China, Japan, ANZ, Southeast Asia. Native EN, ZH (Mandarin + Cantonese), JA.</p>
          </Tile>
          <Tile id="02.3" name="UK (8)">
            <p>London-based. Sector specialists across financial services, technology, healthcare, consumer and industrials. Project leads across all our largest UK and EU engagements.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="03" label="Backgrounds" meta="Where the team came from" />
      <div className="p-9">
        <TileGrid cols={3}>
          <Tile id="03.1" name="OPERATORS">
            <p>Former engineering, product, sales and ops leaders from FAANG-scale technology, growth-stage SaaS, mid-market industrials, regional healthcare systems.</p>
          </Tile>
          <Tile id="03.2" name="ANALYSTS">
            <p>Former hedge fund analysts, sell-side equity researchers, Tier-1 strategy consultants. Trained to ask the right question, not just any question.</p>
          </Tile>
          <Tile id="03.3" name="COMPLIANCE">
            <p>Former compliance officers from investment banks, hedge funds and established expert networks. Compliance is staffed, not outsourced.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="04" label="How We Work" meta="The senior-lead promise" />
      <div className="px-9 py-8 max-w-4xl space-y-4">
        <p className="text-body text-ink-2">
          Every FieldSignal engagement is led by a senior team member, regardless of cheque size. A €500 single-call enquiry from a seed-stage founder gets the same account lead a £100k programme from a multi-strat hedge fund gets.
        </p>
        <p className="text-body text-ink-2">
          We don&apos;t operate through junior coordinators or automated routing. We don&apos;t reserve senior attention for institutional clients. The model only works because we&apos;ve built a senior team large enough to staff every project this way.
        </p>
      </div>

      <CtaBand
        title={<>Want to meet the team? <span className="text-red">One email.</span></>}
        meta={<>Direct line to senior researchers, {SITE.hours}.</>}
        ctaLabel="Email Miles"
        ctaHref={`mailto:${SITE.contactEmail}`}
      />
    </>
  );
}
