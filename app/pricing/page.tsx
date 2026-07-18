import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Expert Network Pricing - Transparent Rates and Packages",
  description:
    "Per-call pricing from $200. Project packages from $900. Subscription plans for ongoing research. No annual retainers. No hidden minimums.",
  path: "/pricing",
});

const PER_CALL = [
  {
    type: "STANDARD CALL",
    price: "$200",
    turnaround: "3–5 days",
    use: "60-minute call with a mid-seniority expert in your industry. Transcript within 24 hours.",
  },
  {
    type: "SENIOR CALL",
    price: "$400",
    turnaround: "3–5 days",
    use: "60-minute call with a senior operator (Director / VP-level). Common for buyer interviews and ex-employee diligence.",
  },
  {
    type: "C-SUITE CALL",
    price: "$800",
    turnaround: "5–10 days",
    use: "60-minute call with a C-suite or board-level expert. Reserved for sensitive diligence and high-stakes strategic questions.",
  },
];

const FAQS = [
  {
    q: "How much does an expert call cost?",
    a: "Expert calls start at $200 for a 60-minute consultation with a mid-seniority expert. Senior operators (Director/VP-level) are $400 per call and C-suite or board-level experts are $800 per call. There is no minimum spend.",
  },
  {
    q: "Is there an annual retainer or minimum spend?",
    a: "No. There is no mandatory annual retainer, no fund-level or seat-level minimum spend, and no premium expert pool gated by client tier. You can commission a single call without any ongoing commitment.",
  },
  {
    q: "What is included in the per-call price?",
    a: "The per-call rate covers expert sourcing, scheduling, compliance screening and the transcript. There are no hidden fees on transcript exports, scheduling or compliance.",
  },
  {
    q: "How do project packages work?",
    a: "Project packages start at $900 for 5 expert calls within a single thesis, roughly 20% below the per-call rate. Larger diligence sprints of 15–30 calls over two weeks start at $6,000 and include a findings deck.",
  },
  {
    q: "What are your payment terms?",
    a: "All pricing is quoted in USD on Net 30 payment terms.",
  },
];

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ]}
      />
      <FAQSchema items={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />

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
        <div className="bg-paper overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              FieldSignal per-call expert network pricing by expert seniority
            </caption>
            <thead>
              <tr className="border-b border-rule">
                <th scope="col" className="font-mono text-mono uppercase tracking-[0.06em] font-semibold text-ink py-3 pr-4">
                  Call type
                </th>
                <th scope="col" className="font-mono text-mono uppercase tracking-[0.06em] font-semibold text-ink py-3 pr-4 whitespace-nowrap">
                  Price per call
                </th>
                <th scope="col" className="font-mono text-mono uppercase tracking-[0.06em] font-semibold text-ink py-3 pr-4 whitespace-nowrap">
                  Turnaround
                </th>
                <th scope="col" className="font-mono text-mono uppercase tracking-[0.06em] font-semibold text-ink py-3">
                  Typical use
                </th>
              </tr>
            </thead>
            <tbody>
              {PER_CALL.map((row) => (
                <tr key={row.type} className="border-b border-rule last:border-b-0 align-top">
                  <th scope="row" className="font-mono text-[14px] font-semibold tracking-[0.06em] text-ink py-4 pr-4 text-left">
                    {row.type}
                  </th>
                  <td className="font-mono text-[14px] font-semibold text-ink py-4 pr-4 whitespace-nowrap">
                    {row.price}
                  </td>
                  <td className="font-mono text-mono text-ink-2 py-4 pr-4 whitespace-nowrap">
                    {row.turnaround}
                  </td>
                  <td className="text-[13px] leading-[1.55] text-ink-2 py-4">
                    {row.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-mono text-mono uppercase tracking-[0.06em] text-ink-3">
          All calls run 60 minutes · Transcript within 24 hours · No minimum spend
        </p>
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

      <SectionBand id="faq" num="06" label="Pricing FAQ" meta="Common questions" />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-7 pt-6 pb-4">
          <header className="mb-6">
            <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">06.0</div>
            <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink">PRICING QUESTIONS</div>
          </header>
          <dl className="flex flex-col">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-4 ${i > 0 ? "border-t border-rule" : ""}`}
              >
                <dt className="font-mono text-mono text-red font-semibold opacity-[0.78] mt-0.5">
                  Q.{String(i + 1).padStart(2, "0")}
                </dt>
                <div>
                  <p className="font-sans font-semibold text-ink text-[15px] mb-1">{f.q}</p>
                  <p className="text-[13px] leading-[1.55] text-ink-2">{f.a}</p>
                </div>
              </div>
            ))}
          </dl>
        </article>
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
