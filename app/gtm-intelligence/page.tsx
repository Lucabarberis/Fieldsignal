import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { WideTile } from "@/components/WideTile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema, FAQSchema, ServiceSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { gtmPages, GTM_CHANNELS, GTM_EVIDENCE } from "@/content/data/gtm";
import { caseStudies } from "@/content/data/case-studies";

export const metadata = pageMetadata({
  title: "Go-To-Market Intelligence - Ask The Operators",
  description:
    "We ask the VPs of Marketing and Heads of Growth who already ran your motion which channels work, which to avoid, and why. Five engagement formats, no retainer.",
  path: "/gtm-intelligence",
});

/** Hub-level FAQ. Also emitted as FAQPage schema. */
const HUB_FAQ = [
  {
    q: "Who exactly do you interview?",
    a: "Former VPs of Marketing, CMOs, Heads of Growth, demand-generation leads and first marketing hires at companies competing with you or selling to the same buyer at a similar price point. We also interview buyers directly, including the ones who bought from a competitor, and agency operators who hold comparable data across several accounts.",
  },
  {
    q: "Are these people currently working at my competitors?",
    a: "No. Every expert must be at least six months removed from any company they are asked to discuss, measured from their last day of employment, board service or active advisory work. You get pattern recognition from operators who ran the motion, not a sitting insider handing over a live plan. The rule costs less than it sounds: acquisition economics and channel dynamics move far more slowly than quarterly plans do.",
  },
  {
    q: "Is it legal to ask a competitor's former growth lead how they grew?",
    a: "Yes, inside the same framework that governs every FieldSignal call. Experts are six months or more removed from the companies they discuss, no material non-public information may be requested or shared, calls are monitored, and the audit trail is retained for seven years. Out of scope: any current confidential plan, unannounced launch or unreleased figure. If a call drifts toward one, we end it.",
  },
  {
    q: "How is this different from hiring a growth agency?",
    a: "An agency is paid to run a channel, which makes it a poor source of advice on whether that channel should be run at all. We do not sell media, take commission or manage spend. The deliverable is research, and it regularly includes the finding that a channel you were about to fund will not work.",
  },
  {
    q: "How is it different from a benchmark report I could buy?",
    a: "Published benchmarks average across companies that share nothing but a category label, so everyone reading one assumes they sit on the good side of the median. Our numbers come from a screened set of operators matched on buyer, price point and motion, and we publish the sample size next to every range, including when it is twelve rather than fifty.",
  },
  {
    q: "What if the research says none of our channels will work?",
    a: "We deliver it. In practice that result usually means the buyer definition or the positioning is wrong rather than the channels, and the honest next step is the ICP work rather than a second round of the same tests.",
  },
  {
    q: "How fast does this move?",
    a: "First operator calls are typically scheduled within three to five business days of the brief. A single channel teardown runs two to four weeks. A full channel discovery programme has run five to eight weeks across the studies we have published.",
  },
  {
    q: "Do we have to be a certain size?",
    a: "No. The smallest engagement here is a handful of operator calls, and there is no annual minimum, no retainer and no platform fee. FieldSignal exists because the traditional expert networks price this kind of research out of reach for anyone below a certain size.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    name: "Agree the bar",
    day: "Week 0",
    description:
      "We agree in writing what counts as a customer worth acquiring, before anything is tested or anyone is interviewed. Across our published work this has been a published guide, an activated trial, a launched campaign, a booked pilot. Clients want to skip this step. It decides whether the results mean anything.",
    meta: "60-minute scoping call, no commitment",
  },
  {
    step: "02",
    name: "Source and screen",
    day: "Days 3–5",
    description:
      "We find operators who ran your motion at a comparable company, verify their employment history, and check them against the six-month cooling-off rule and our conflict screen. You see anonymised profiles and approve each one before anything is scheduled.",
    meta: "You approve every operator before the call",
  },
  {
    step: "03",
    name: "Run the calls",
    day: "Weeks 1–3",
    description:
      "One-hour calls against a written discussion guide you have seen. Join them or take the transcript, whichever suits. Every call is transcribed within one business day and monitored for compliance while it runs.",
    meta: "Transcript within 1 business day",
  },
  {
    step: "04",
    name: "Read it back weekly",
    day: "Throughout",
    description:
      "You get a short read-out each week while the work is live rather than one reveal at the end. It means you can redirect the research halfway through, which clients do more often than not.",
    meta: "No surprises at the read-out",
  },
  {
    step: "05",
    name: "Report the negative",
    day: "Weeks 3–8",
    description:
      "Synthesis across the set: what cleared the bar, what did not, where operators disagreed with each other, and the reasoning behind everything we tell you to drop. The channels to avoid get written up as carefully as the ones worth funding.",
    meta: "Ranked channels · budget plan · dissent recorded",
  },
];

/** Honest disqualifiers. Placed before the CTA on purpose. */
const NOT_FOR_YOU = [
  {
    name: "You want the plan validated",
    why: "If the decision is already made and the research is there to ratify it, we are an expensive rubber stamp. Read the published studies and you will notice how often the useful finding was the one the client did not want: budget pulled out of a channel that felt right, a category search strategy abandoned, consumer ads dropped from an enterprise sale.",
  },
  {
    name: "You need the channel live next week",
    why: "First calls take three to five business days and a full programme runs weeks, not days. If the spend has to go out on Monday, run it and call us when you want to know why it did or did not work.",
  },
  {
    name: "You want someone to run the ads",
    why: "We do not sell media, take commission or manage spend, which is exactly why our answer on whether a channel is worth running is worth having. Ask us for a recommendation on who should execute and we will give you one.",
  },
  {
    name: "The decision is political rather than empirical",
    why: "Where a channel is being defended by someone senior on grounds other than evidence, research does not usually settle it. We will still do the work, and you should know going in what it can and cannot move.",
  },
];

export default function GtmIntelligenceHubPage() {
  const gtmStudies = caseStudies.filter((cs) => cs.category === "direct");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "GTM Intelligence", url: "/gtm-intelligence" },
        ]}
      />
      <ServiceSchema
        name="Go-To-Market Intelligence"
        description="Primary research on acquisition channels, sourced from former VPs of Marketing and Heads of Growth at competing and comparable companies."
        url={`${SITE.url}/gtm-intelligence`}
      />
      <FAQSchema items={HUB_FAQ.map((f) => ({ question: f.q, answer: f.a }))} />

      <PageHeader
        current="GTM Intelligence"
        title="Go-To-Market Intelligence"
        lede={
          <>
            We ask the VPs of Marketing and Heads of Growth who already ran your motion
            somewhere else what worked, what it cost, and what they would not repeat.{" "}
            <b>The channels to avoid are the deliverable</b>, written up as carefully as
            the ones worth funding.
          </>
        }
        meta={[
          { label: "Formats", value: `${gtmPages.length} engagements` },
          { label: "First call", value: "3–5 business days" },
          { label: "Published studies", value: `${gtmStudies.length}` },
          { label: "Commitment", value: "Per project, no retainer" },
        ]}
      />

      {/* ── 01 — What it is ───────────────────────────────────────────── */}
      <SectionBand num="01" label="What This Is" meta="The premise" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <p className="font-sans text-[17px] leading-[1.5] text-ink">
          Somebody selling to your buyer has already spent money answering the question
          you are about to spend money answering.
        </p>
        <p className="text-body text-ink-2 mt-5">
          Our job is to find those people and get them on a call with you. Former VPs of
          Marketing, CMOs, Heads of Growth and demand-generation leads at competitors and
          comparable companies — people who held the budget, watched a channel fail, and
          had to explain it to a board. Alongside them we interview buyers directly,
          including the ones who chose a competitor and the ones who chose nobody, on
          where they actually were when they decided to buy.
        </p>
        <p className="text-body text-ink-2 mt-4">
          What comes back is a ranked read on which channels reach your buyer and which
          cannot, with the reasoning attached to each one. That includes the channel your
          board is enthusiastic about, if the operators say it will not work. Nine of
          these engagements are written up in full on this site, so you can see the shape
          of the output before committing to anything.
        </p>
      </div>

      {/* ── 02 — The engagements ──────────────────────────────────────── */}
      <SectionBand
        num="02"
        label="The Engagements"
        meta={`${gtmPages.length} formats`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {gtmPages.map((p) => (
            <Tile
              key={p.slug}
              id={`02.${p.id.replace(/^0/, "")}`}
              name={p.name}
              meta={<>Timeline · <b>{p.timeline}</b></>}
              cta="View engagement"
              href={`/gtm-intelligence/${p.slug}`}
              updated={p.timeline}
            >
              <p>{p.oneLiner}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      {/* ── 03 — Aggregate evidence ───────────────────────────────────── */}
      <SectionBand
        num="03"
        label="What The Work Has Shown"
        meta={`Across ${gtmStudies.length} published studies`}
      />
      <div className="px-4 sm:px-9 pt-6 max-w-3xl">
        <p className="text-body text-ink-2">
          These are patterns from our own engagements, not laws. Every claim below can be
          checked against the{" "}
          <Link
            href="/resources/case-studies"
            className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
          >
            case studies
          </Link>{" "}
          they came from, which is why we publish them.
        </p>
      </div>
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <dl className="flex flex-col">
          {GTM_EVIDENCE.map((e, i) => (
            <div
              key={e.finding}
              className={`py-5 ${i > 0 ? "border-t border-rule" : ""}`}
            >
              <dt className="font-sans font-semibold text-[16px] tracking-[-0.01em] text-ink">
                <span className="font-mono text-mono text-red font-semibold mr-3 opacity-[0.78]">
                  03.{i + 1}
                </span>
                {e.finding}
              </dt>
              <dd className="text-body text-ink-2 mt-2.5 sm:pl-9">{e.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── 04 — Channel coverage ─────────────────────────────────────── */}
      <SectionBand
        num="04"
        label="Channels We Cover"
        meta={`${GTM_CHANNELS.length} acquisition channels`}
      />
      <div className="px-4 sm:px-9 pt-6 max-w-3xl">
        <p className="text-body text-ink-2">
          The read below is what we have seen so far, not a prediction about you. Which of
          these survives contact with your buyer is the thing the research is for.
        </p>
      </div>
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          {GTM_CHANNELS.map((c, i) => (
            <article key={c.name} className="bg-paper px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                04.{i + 1}
              </div>
              <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2.5 uppercase">
                {c.name}
              </div>
              <p className="text-[13px] leading-[1.55] text-ink-2">{c.note}</p>
            </article>
          ))}
        </TileGrid>
      </div>

      {/* ── 05 — How it runs ──────────────────────────────────────────── */}
      <SectionBand num="05" label="How It Runs" meta="5 steps, brief to synthesis" />
      <div className="p-4 sm:p-9">
        <WideTile id="05.0" name="ENGAGEMENT PROCESS" steps={PROCESS_STEPS} />
      </div>

      {/* ── 06 — Who we ask ───────────────────────────────────────────── */}
      <SectionBand num="06" label="Who We Ask" meta="Sourcing and screening" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist
          items={[
            "Former VPs of Marketing and CMOs at direct competitors, past the six-month cooling-off window",
            "Heads of Growth at comparable companies selling to the same buyer at a similar price point",
            "Demand-generation and performance leads who personally held the channel budget",
            "Buyers in your target segment, including the ones who chose a competitor and the ones who chose nobody",
            "Agency and fractional operators holding comparable data across several accounts",
          ]}
        />
        <p className="text-body text-ink-2 mt-6">
          Employment history is verified before an operator is proposed to you, and you
          approve every profile before a call is scheduled. Experts are at least six
          months removed from any company they are asked to discuss, no material
          non-public information may be requested or shared, calls are monitored, and the
          audit trail is kept for seven years under the{" "}
          <Link
            href="/compliance"
            className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
          >
            FieldSignal compliance framework
          </Link>
          . What you get is pattern recognition from people who ran the motion, never a
          sitting insider handing over a live plan.
        </p>
      </div>

      {/* ── 07 — When not to hire us ──────────────────────────────────── */}
      <SectionBand
        num="07"
        label="When Not To Hire Us"
        meta="Four honest disqualifiers"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          {NOT_FOR_YOU.map((item, i) => (
            <article key={item.name} className="bg-paper px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                07.{i + 1}
              </div>
              <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2.5 uppercase">
                {item.name}
              </div>
              <p className="text-[13px] leading-[1.55] text-ink-2">{item.why}</p>
            </article>
          ))}
        </TileGrid>
      </div>

      {/* ── 08 — Proof ────────────────────────────────────────────────── */}
      {gtmStudies.length > 0 && (
        <>
          <SectionBand
            num="08"
            label="Work We Have Run"
            meta={`${gtmStudies.length} anonymised studies`}
          />
          <div className="px-4 sm:px-9 pt-6 max-w-3xl">
            <p className="text-body text-ink-2">
              Anonymised composites of go-to-market engagements, written to the same
              standard as the transcripts library. Each ends with a ranked channel read
              and an explicit list of what not to fund.
            </p>
          </div>
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {gtmStudies.map((cs) => (
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
        </>
      )}

      {/* ── 09 — FAQ ──────────────────────────────────────────────────── */}
      <SectionBand num="09" label="Questions" meta={`${HUB_FAQ.length} answers`} />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <dl className="flex flex-col">
          {HUB_FAQ.map((f, i) => (
            <div key={f.q} className={`py-5 ${i > 0 ? "border-t border-rule" : ""}`}>
              <dt className="font-sans font-semibold text-[16px] tracking-[-0.01em] text-ink">
                <span className="font-mono text-mono text-red font-semibold mr-3 opacity-[0.78]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.q}
              </dt>
              <dd className="text-body text-ink-2 mt-2.5 sm:pl-9">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      <CtaBand
        title={
          <>
            Before you fund the channel,{" "}
            <span className="text-red">ask someone who ran it.</span>
          </>
        }
        meta={<>Response under 4 hours, {SITE.hours}. First call in 3–5 business days.</>}
        ctaLabel="Brief Us"
        ctaHref="/contact"
      />
    </>
  );
}
