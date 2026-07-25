import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { caseStudies, CASE_STUDY_CATEGORIES } from "@/content/data/case-studies";

export const metadata = pageMetadata({
  title: "Case Studies - Research & Go-To-Market Work",
  description:
    "Anonymised FieldSignal case studies — diligence, market sizing and references for funds, plus go-to-market channel discovery for company clients.",
  path: "/resources/case-studies",
});

export default function CaseStudiesHubPage() {
  const published = CASE_STUDY_CATEGORIES.filter(
    (cat) => caseStudies.some((cs) => cs.category === cat.key),
  );

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: "Case Studies", url: "/resources/case-studies" },
        ]}
      />

      <PageHeader
        current="Case Studies"
        title="Case Studies"
        lede={
          <>
            How investors and companies put <b>real evidence</b> to work — pre-IC
            diligence, market sizing and references for funds, and go-to-market channel
            discovery for company clients. Every study below is an anonymised composite of
            a typical engagement.
          </>
        }
        meta={[
          { label: "Published studies", value: `${caseStudies.length}` },
          { label: "Segments", value: `${published.length}` },
          { label: "Attribution", value: "Anonymised" },
        ]}
      />

      {published.map((cat) => {
        const studies = caseStudies.filter((cs) => cs.category === cat.key);
        return (
          <div key={cat.key}>
            <SectionBand
              num={cat.num}
              label={cat.label}
              meta={`${studies.length} ${studies.length === 1 ? "study" : "studies"}`}
            />
            <div className="px-4 sm:px-9 pt-6 max-w-3xl">
              <p className="text-body text-ink-2">{cat.blurb}</p>
            </div>
            <div className="p-4 sm:p-9">
              <TileGrid cols={3}>
                {studies.map((cs) => (
                  <Tile
                    key={cs.slug}
                    id={cs.id}
                    name={cs.name}
                    meta={<b className="text-ink">{cs.fundProfile}</b>}
                    cta="Read study"
                    href={`/resources/case-studies/${cs.slug}`}
                    updated={cs.timeline}
                  >
                    <p>{cs.oneLiner}</p>
                  </Tile>
                ))}
              </TileGrid>
            </div>
          </div>
        );
      })}

      <SectionBand
        num={`${String(published.length + 1).padStart(2, "0")}`}
        label="How We Produce These"
        meta="Anonymity & compliance"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="—.1" name="ANONYMISED COMPOSITES">
            <p>
              Each study is a representative composite of typical engagements. Client
              identities are removed and figures illustrate the format and scale of the
              work — not a single named mandate.
            </p>
          </Tile>
          <Tile id="—.2" name="SCREENED & MEASURED">
            <p>
              Investor research is scoped and screened for material non-public
              information before findings land. Growth engagements are measured to
              qualified pipeline, not vanity metrics.
            </p>
          </Tile>
          <Tile id="—.3" name="SAME STANDARD, ANY SIZE">
            <p>
              A seed-stage founder and a multi-billion fund get the same senior team and
              the same standard. No premium tier, no minimums.
            </p>
          </Tile>
        </TileGrid>
      </div>

      <CtaBand
        title={
          <>
            Facing the same question? <span className="text-red">Brief us.</span>
          </>
        }
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Case study enquiry")}`}
      />
    </>
  );
}
