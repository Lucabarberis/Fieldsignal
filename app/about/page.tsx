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
  title: "About FieldSignal - The Democratized Expert Network",
  description:
    "Operators-turned-researchers building the boutique expert network. 50,000+ specialists, no annual retainers, compliance equivalent to GLG and AlphaSights.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />

      <PageHeader
        current="About"
        title="The democratized expert network."
        lede={
          <>
            FieldSignal is a boutique competitive intelligence firm on a mission to <b>democratize expert networks</b>. We exist because the same quality of primary research a hedge fund can buy should also be available to a three-person seed-stage team — without the six-figure annual retainer.
          </>
        }
        meta={[
          { label: "Entity", value: SITE.legalEntity },
          { label: "Jurisdiction", value: SITE.jurisdiction },
          { label: "Network", value: "50,000+ experts" },
          { label: "Insurance", value: "US$10M professional" },
        ]}
      />

      <SectionBand num="01" label="Why We Exist" meta="What we're breaking" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl space-y-4">
        <p className="text-body text-ink-2">
          For decades, primary research firms like GLG, AlphaSights, Third Bridge and Guidepoint have served only the very top of the market — hedge funds, large PE firms, Fortune 500 corporates. The model has been the same since the early 2000s: <span className="text-red">annual retainers, premium per-call rates and project minimums</span> that price out everyone below the institutional tier.
        </p>
        <p className="text-body text-ink-2">
          That economics was justifiable when the only viable customer was an institutional investor with billions under management. It is no longer justifiable when a seed-stage founder, a small specialist hedge fund, or a mid-market corporate strategy team needs the exact same quality of primary research and cannot afford the institutional gatekeeping.
        </p>
        <p className="text-body text-ink">
          We&apos;re breaking that model.
        </p>
      </div>

      <SectionBand num="02" label="What We Do" meta="Same quality, accessible pricing" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="02.1" name="EXPERT CALLS WITHOUT RETAINERS">
            <p>Per-call pricing. No annual retainer. No project minimums. The same vetted operators, executives, and specialists you&apos;d reach through GLG or AlphaSights.</p>
          </Tile>
          <Tile id="02.2" name="50,000+ VETTED EXPERTS">
            <p>Our network includes vetted operators across technology, healthcare, financial services, consumer, industrials, energy, telecom, real estate and education.</p>
          </Tile>
          <Tile id="02.3" name="COMPLIANCE EQUIVALENT TO INCUMBENTS">
            <p>6-month cooling-off, MNPI controls, exclusion lists, real-time monitoring, 7-year audit trail, US$10M professional liability insurance.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="03" label="Who We Are" meta="Operators-turned-researchers" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl space-y-4">
        <p className="text-body text-ink-2">
          FieldSignal is built by former operators — researchers, product leaders and analysts who spent their careers inside the industries we now research. We know what a useful expert call sounds like because we have been the expert. We know what a useless expert call sounds like because we have sat through too many of those, too.
        </p>
        <p className="text-body text-ink-2">
          Our team is distributed across UK, EU and APAC time zones, supported by a compliance function staffed by former financial-services compliance officers. Every engagement is led by a senior team member regardless of cheque size.
        </p>
      </div>

      <SectionBand num="04" label="Numbers" meta="What sits behind the brand" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule">
        {[
          { label: "Experts", value: "50,000+", change: "global, vetted" },
          { label: "Transcripts", value: "5,000+", change: "anonymised library" },
          { label: "Researchers", value: "30", change: "multi-time-zone team" },
          { label: "Insurance", value: "US$10M", change: "professional liability" },
        ].map((s) => (
          <div key={s.label} className="bg-paper-2 px-7 py-6">
            <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
              {s.label}
            </div>
            <div className="font-sans font-medium text-[36px] leading-[1] tracking-[-0.022em] text-ink mb-2">
              {s.value}
            </div>
            <div className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em]">
              {s.change}
            </div>
          </div>
        ))}
      </div>

      <SectionBand num="05" label="What's Different" meta="The boutique-network thesis" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[
          "Per-call pricing instead of annual retainers",
          "Senior account lead on every engagement, regardless of cheque size",
          "Same expert network across every client tier — no \"premium pool\" gating",
          "Compliance equivalent to the largest expert networks",
          "Transparent published pricing (rare in this industry)",
          "Operator-led research, not analyst-led",
        ]} />
      </div>

      <CtaBand
        title={<>Ready to brief us? <span className="text-red">Talk to a senior researcher.</span></>}
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}`}
      />
    </>
  );
}
