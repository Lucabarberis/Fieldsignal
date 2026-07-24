import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { PersonTile } from "@/components/PersonTile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema, TeamSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { AUTHORS, personAnchor, type Author } from "@/content/data/authors";

export const metadata = pageMetadata({
  title: "Meet the FieldSignal Team - Operators, Researchers, Compliance",
  description:
    "Former operators from FAANG-scale tech, hedge funds and consulting firms. 30 researchers across multiple time zones. Compliance leads from financial services.",
  path: "/team",
});

/**
 * Named team is sourced from the shared author registry
 * (content/data/authors.ts), so the visible tiles, the Person JSON-LD here,
 * and every article byline that links back to it stay in lockstep.
 */
const PEOPLE: readonly Author[] = Object.values(AUTHORS);
const LEADERSHIP = PEOPLE.filter((a) => a.group === "leadership");
const RESEARCHERS = PEOPLE.filter((a) => a.group === "research");

/**
 * Bios are optional and only present where we have copy we can stand
 * behind. The researcher tiles run photo + name + role + location until
 * their own copy is written — better a short tile than invented history.
 */
const BIOS: Record<string, React.ReactNode> = {
  "Miles O'Sullivan": (
    <p>
      Former operator across FAANG-scale technology and growth-stage startups. Spent a decade using institutional expert networks, and being frustrated by them, before building FieldSignal as the alternative.
    </p>
  ),
  "Phosia Chenangat": (
    <p>
      Former compliance officer at a global investment firm. Owns FieldSignal&apos;s MNPI policy, expert vetting, exclusion-list management and external-audit cadence.
    </p>
  ),
};

export default function TeamPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Team", url: "/team" },
        ]}
      />
      <TeamSchema members={[...LEADERSHIP, ...RESEARCHERS]} />

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

      <SectionBand num="01" label="Leadership" meta="Founder and compliance lead" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          {LEADERSHIP.map((m, i) => (
            <PersonTile
              key={m.name}
              id={`01.${i + 1}`}
              anchorId={personAnchor(m.name)}
              name={m.name}
              layout="wide"
              role={m.jobTitle}
              photo={m.photo}
              linkedin={m.linkedin}
              location={m.location}
              priority
            >
              {BIOS[m.name]}
            </PersonTile>
          ))}
        </TileGrid>
      </div>

      <SectionBand num="02" label="Senior Researchers" meta="Project leads across APAC" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {RESEARCHERS.map((m, i) => (
            <PersonTile
              key={m.name}
              id={`02.${i + 1}`}
              anchorId={personAnchor(m.name)}
              name={m.name}
              layout="wide"
              role={m.jobTitle}
              photo={m.photo}
              linkedin={m.linkedin}
              location={m.location}
            >
              {BIOS[m.name]}
            </PersonTile>
          ))}
        </TileGrid>
      </div>

      <SectionBand num="03" label="Research Team" meta="30 across multiple regions" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="03.1" name="EUROPE (12)">
            <p>London, Paris, Frankfurt, Madrid. Former operators across SaaS, healthcare, financial services and consumer. Native EN, FR, DE, ES.</p>
          </Tile>
          <Tile id="03.2" name="APAC (10)">
            <p>Hong Kong, Singapore, Tokyo, Sydney. Coverage of Greater China, Japan, ANZ, Southeast Asia. Native EN, ZH (Mandarin + Cantonese), JA.</p>
          </Tile>
          <Tile id="03.3" name="UK (8)">
            <p>London-based. Sector specialists across financial services, technology, healthcare, consumer and industrials. Project leads across all our largest UK and EU engagements.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="04" label="Backgrounds" meta="Where the team came from" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="04.1" name="OPERATORS">
            <p>Former engineering, product, sales and ops leaders from FAANG-scale technology, growth-stage SaaS, mid-market industrials, regional healthcare systems.</p>
          </Tile>
          <Tile id="04.2" name="ANALYSTS">
            <p>Former hedge fund analysts, sell-side equity researchers, Tier-1 strategy consultants. Trained to ask the right question, not just any question.</p>
          </Tile>
          <Tile id="04.3" name="COMPLIANCE">
            <p>Former compliance officers from investment banks, hedge funds and established expert networks. Compliance is staffed, not outsourced.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="05" label="How We Work" meta="The senior-lead promise" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl space-y-4">
        <p className="text-body text-ink-2">
          Every FieldSignal engagement is led by a senior team member, regardless of cheque size. A single-call enquiry from a seed-stage founder gets the same account lead as a full research programme from a multi-strat hedge fund.
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
