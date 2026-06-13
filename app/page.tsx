import Link from "next/link";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { WideTile } from "@/components/WideTile";
import { CtaBand } from "@/components/CtaBand";
import { FAQSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Affordable Expert Network for Primary Research",
  description:
    "Expert consultations, panel calls and surveys without six-figure retainers. The expert network built for startups, SMEs and emerging funds. From €500 per call.",
  path: "/",
});

const FAQS = [
  {
    q: "What is your typical project timeline?",
    a: "Project timelines depend on complexity and expert availability. Standard engagements typically require 5–10 business days from initiation to delivery. Complex or niche requirements may extend this timeframe.",
  },
  {
    q: "Which sectors do you cover?",
    a: "We maintain comprehensive coverage across all major industries, with particular depth in technology, healthcare, financial services, consumer goods, and industrials. Specialized or emerging sectors may require targeted recruitment.",
  },
  {
    q: "How do you ensure compliance?",
    a: "Our compliance framework includes expert vetting, pre-consultation attestations, real-time monitoring, and post-consultation review. We maintain standards consistent with established networks and regulatory requirements.",
  },
  {
    q: "What are your engagement terms?",
    a: "We offer flexible engagement structures without mandatory long-term commitments. Unlike traditional networks that require substantial monthly retainers, we provide project-based and customized pricing options.",
  },
  {
    q: "Do you provide consultation transcripts?",
    a: "All consultations include professional transcription and synthesis of key findings. Documentation undergoes compliance review before distribution.",
  },
  {
    q: "Can you support custom research requirements?",
    a: `We regularly undertake bespoke intelligence projects including extended expert engagements and complex multi-methodology research. Please contact ${SITE.contactEmail} to discuss specific requirements.`,
  },
];

export default function HomePage() {
  return (
    <>
      <FAQSchema items={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-9 pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-rule">
        <div className="font-mono text-mono uppercase tracking-[0.12em] text-ink-3 mb-8">
          Boutique competitive intelligence · Democratized expert networks
        </div>
        <h1 className="font-sans font-medium text-[clamp(40px,6vw,72px)] leading-[0.95] tracking-[-0.030em] text-ink max-w-5xl">
          Strategic intelligence through{" "}
          <span className="text-red">expert consultations</span>.
        </h1>
        <p className="mt-8 text-lede text-ink-2 max-w-3xl">
          We connect institutional clients, corporations, SMEs, and startups with the people who know your market best.
        </p>
        <Link
          href={`mailto:${SITE.contactEmail}`}
          className="inline-flex items-center gap-2 mt-10 bg-red text-paper px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors"
        >
          Contact Us →
        </Link>
      </section>

      {/* ── 01 · ABOUT ───────────────────────────────────────────── */}
      <SectionBand
        id="about"
        num="01"
        label="About Us"
        meta="Mission · what we're breaking"
      />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <header className="mb-4">
            <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">01.0</div>
            <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2">ABOUT US</div>
            <div className="font-mono text-micro text-ink-2 tracking-[0.04em]">
              <span className="text-ink font-semibold uppercase tracking-[0.08em]">Mission</span> · democratising expert networks · boutique competitive intelligence
            </div>
          </header>
          <p className="text-body text-ink-2 max-w-4xl">
            FieldSignal is a boutique competitive intelligence firm on a mission to democratize expert networks. For decades, companies like GLG and AlphaSights have charged premium prices that only hedge funds and Fortune 500 companies could afford — often <span className="text-red">$500–1,500 per consultation</span> with minimum commitments in the six figures. We&apos;re breaking that model.
          </p>
        </article>
      </div>

      {/* ── 02 · SERVICES ────────────────────────────────────────── */}
      <SectionBand
        id="services"
        num="02"
        label="Our Services"
        meta="6 engagement formats"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="02.1" name="EXPERT CONSULTATIONS">
            <p>One-hour consultations with carefully vetted industry professionals who have direct experience.</p>
          </Tile>
          <Tile id="02.2" name="PANEL CALLS">
            <p>Facilitated discussions with multiple market participants addressing complex strategic questions.</p>
          </Tile>
          <Tile id="02.3" name="EXPERT SURVEYS">
            <p>Quantitative research leveraging targeted interviews across 20–200 market participants.</p>
          </Tile>
          <Tile id="02.4" name="MANAGEMENT CHECKS">
            <p>Reference consultations with former colleagues and business partners of executive teams.</p>
          </Tile>
          <Tile id="02.5" name="CUSTOM INTELLIGENCE PROJECTS">
            <p>Bespoke research engagements combining multiple interview methodologies.</p>
          </Tile>
          <Tile id="02.6" name="TRANSCRIPT LIBRARY ACCESS">
            <p>Access to our growing database of 5,000+ anonymized expert interview transcripts.</p>
          </Tile>
        </TileGrid>
      </div>

      {/* ── 03 · METHODOLOGY ─────────────────────────────────────── */}
      <SectionBand
        id="methodology"
        num="03"
        label="Our Methodology"
        meta="Recruitment · Compliance · Quality"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="03.1" name="EXPERT RECRUITMENT">
            <p>We recruit experts through three channels. LinkedIn outreach targets professionals with specific experience. Industry conferences provide direct access to thought leaders. Referrals from existing experts expand coverage in niche domains.</p>
            <p className="text-ink-3 mt-3">Every expert signs our terms of engagement. They confirm no active NDAs prevent participation. They acknowledge restrictions on sharing confidential information. Payment occurs within 5 business days of completed calls.</p>
          </Tile>
          <Tile id="03.2" name="COMPLIANCE FRAMEWORK">
            <p>Our compliance mirrors standards set by GLG and AlphaSights. Experts must be 6+ months removed from discussed companies. All calls include compliance warnings and monitoring. Transcripts undergo legal review before client delivery.</p>
            <p className="text-ink-3 mt-3">We maintain an exclusion list of 2,000+ public company insiders. Automated screening flags potential conflicts. Manual review catches edge cases. When in doubt, we exclude the expert.</p>
          </Tile>
          <Tile id="03.3" name="QUALITY CONTROL">
            <p>Every tenth call receives quality audit. Client satisfaction scores drive expert ratings. Poor performers get removed from the network. Top experts receive priority placement and premium rates.</p>
          </Tile>
        </TileGrid>
      </div>

      {/* ── 04 · SECTORS ─────────────────────────────────────────── */}
      <SectionBand
        id="sectors"
        num="04"
        label="Our Business Sectors"
        meta="5 core sectors"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="04.1" name="TECHNOLOGY & SOFTWARE">
            <p>Coverage includes SaaS, enterprise software, cybersecurity, cloud infrastructure, and semiconductors. Strong network of engineers, product managers, sales leaders, and CTOs.</p>
            <p className="text-ink mt-3"><b>Recent projects:</b> AI adoption rates, cloud migration strategies, developer tool preferences.</p>
          </Tile>
          <Tile id="04.2" name="HEALTHCARE & LIFE SCIENCES">
            <p>Expertise spans pharmaceuticals, medical devices, digital health, and hospital systems. KOLs include physicians, clinical researchers, hospital administrators, and pharma executives.</p>
            <p className="text-ink mt-3"><b>Recent projects:</b> Drug pricing dynamics, telehealth adoption, clinical trial recruitment.</p>
          </Tile>
          <Tile id="04.3" name="FINANCIAL SERVICES">
            <p>Network covers investment banking, asset management, fintech, and insurance. Experts include traders, risk managers, compliance officers, and fintech founders.</p>
            <p className="text-ink mt-3"><b>Recent projects:</b> Digital banking disruption, regulatory impacts, crypto adoption patterns.</p>
          </Tile>
          <Tile id="04.4" name="CONSUMER & RETAIL">
            <p>Coverage of CPG brands, e-commerce, restaurants, and luxury goods. Experts include brand managers, supply chain leaders, store managers, and merchandisers.</p>
            <p className="text-ink mt-3"><b>Recent projects:</b> DTC strategies, inflation impacts, Gen Z purchasing behavior.</p>
          </Tile>
          <Tile id="04.5" name="INDUSTRIALS & MANUFACTURING">
            <p>Expertise in automotive, aerospace, chemicals, and logistics. Network includes plant managers, procurement officers, engineers, and union representatives.</p>
            <p className="text-ink mt-3"><b>Recent projects:</b> Supply chain resilience, automation ROI, reshoring decisions.</p>
          </Tile>
        </TileGrid>
      </div>

      {/* ── 05 · PROCESS ─────────────────────────────────────────── */}
      <SectionBand
        id="process"
        num="05"
        label="Our Process"
        meta="6 steps · scoping to delivery"
      />
      <div className="p-4 sm:p-9">
        <WideTile
          id="05.0"
          name="OUR PROCESS"
          steps={[
            { step: "01", name: "Engagement Initiation", day: "Step 1", description: "Clients engage directly with our team to discuss intelligence requirements. We conduct detailed scoping conversations to understand specific objectives and context. Our compliance team reviews all requests for potential conflicts." },
            { step: "02", name: "Expert Identification", day: "Step 2", description: "Our team identifies relevant professionals from our network and conducts targeted recruitment as needed. We typically present 10–20 qualified candidates for client consideration. Expert profiles include relevant experience and compliance clearance status." },
            { step: "03", name: "Client Review and Selection", day: "Step 3", description: "Clients evaluate expert profiles and may request additional screening criteria. Following selection, we coordinate all scheduling and logistics directly. Clients typically engage with 1–5 experts per project." },
            { step: "04", name: "Consultation Preparation", day: "Step 4", description: "We develop structured discussion guides in collaboration with clients. Experts receive comprehensive briefings on permissible discussion topics. All participants receive compliance guidelines and attestation requirements." },
            { step: "05", name: "Expert Consultation", day: "Step 5", description: "Consultations are conducted via telephone or video conference. Sessions may be moderated by our team or client-led. All calls are monitored for compliance purposes." },
            { step: "06", name: "Documentation and Delivery", day: "Step 6", description: "Professional transcription services document all consultations. We provide synthesis of key insights and findings. All deliverables undergo compliance review before client distribution." },
          ]}
        />
      </div>

      {/* ── 06 · COMPLIANCE ──────────────────────────────────────── */}
      <SectionBand
        id="compliance"
        num="06"
        label="Our Compliance"
        meta="Framework · Agreements · Protocols · Barriers"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={4}>
          <Tile id="06.1" name="LEGAL FRAMEWORK">
            <p>FieldSignal operates under Hong Kong data protection law (PDPO) and aligns with international standards including GDPR. We maintain professional liability insurance of US$10 million. Terms of service align with ESMA and SFC guidelines. Regular audits ensure adherence.</p>
          </Tile>
          <Tile id="06.2" name="EXPERT AGREEMENTS">
            <p>Experts sign our Master Services Agreement before first engagement. Each call requires fresh attestation of compliance. Experts confirm no material non-public information will be shared. Violations result in permanent removal.</p>
          </Tile>
          <Tile id="06.3" name="CLIENT PROTOCOLS">
            <p>We integrate with client compliance systems. Pre-call questionnaires capture restrictions. Post-call attestations document compliance. Full audit trail maintained for 7 years.</p>
          </Tile>
          <Tile id="06.4" name="INFORMATION BARRIERS">
            <p>Chinese walls separate project teams. Experts cannot see client identities. Clients receive anonymized expert details. Project information stays compartmentalized.</p>
          </Tile>
        </TileGrid>
      </div>

      {/* ── 07 · TECHNOLOGY ──────────────────────────────────────── */}
      <SectionBand
        id="technology"
        num="07"
        label="Our Technology"
        meta="Proprietary database · real-time monitoring"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          <Tile id="07.1" name="EXPERT NETWORK MANAGEMENT">
            <p>Our proprietary database maintains profiles of over 50,000 professionals globally. Advanced search capabilities enable rapid identification of relevant expertise. Automated compliance screening ensures all experts meet regulatory requirements.</p>
          </Tile>
          <Tile id="07.2" name="COMPLIANCE INFRASTRUCTURE">
            <p>Real-time monitoring systems oversee all consultations. Multi-stage review processes validate all deliverables before client distribution. Full audit trails maintained for regulatory compliance.</p>
          </Tile>
        </TileGrid>
      </div>

      {/* ── 08 · DIFFERENTIATORS ─────────────────────────────────── */}
      <SectionBand
        id="differentiators"
        num="08"
        label="Our Differentiators"
        meta="6 reasons FieldSignal exists"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="08.1" name="DEMOCRATIZED ACCESS">
            <p>Traditional expert networks serve only large institutions with massive budgets. GLG and AlphaSights require six-figure annual commitments and charge $500–1,500 per consultation. We&apos;ve built a model that makes the same quality intelligence accessible to startups, SMEs, and mid-market companies.</p>
            <p className="text-ink-3 mt-3">Whether you&apos;re a three-person startup or a Fortune 500 company, you get the same service quality and access to our network.</p>
          </Tile>
          <Tile id="08.2" name="MISSION-DRIVEN: FREE INFORMATION">
            <p>We believe information wants to be free. Critical market intelligence shouldn&apos;t be locked behind paywalls accessible only to the wealthy. By making expert networks affordable and accessible, we&apos;re democratizing competitive intelligence and enabling better decision-making across companies of all sizes.</p>
            <p className="text-ink-3 mt-3">Every startup competing against incumbents deserves the same intelligence advantages.</p>
          </Tile>
          <Tile id="08.3" name="OPERATOR-LED INTELLIGENCE">
            <p>Our team comprises former operators who have worked within the industries we research. This experience enables us to identify the most relevant experts and ask the questions that matter. We understand operational dynamics because we have lived them — from seed-stage chaos to FAANG-scale systems.</p>
          </Tile>
          <Tile id="08.4" name="PERSONALIZED SERVICE MODEL">
            <p>Every client relationship is managed directly by senior team members, regardless of company size. We do not operate through automated systems or junior coordinators. A Series A startup gets the same attention as a private equity fund.</p>
            <p className="text-ink-3 mt-3">This high-touch approach ensures deep understanding of each client&apos;s intelligence requirements.</p>
          </Tile>
          <Tile id="08.5" name="FLEXIBLE COMMERCIAL STRUCTURES">
            <p>No mandatory annual retainers. No minimum commitments. We offer engagement models that work for companies at every stage — from single consultations for early-stage startups validating hypotheses to ongoing intelligence programs for established enterprises.</p>
            <p className="text-ink-3 mt-3">Pay for what you need, when you need it.</p>
          </Tile>
          <Tile id="08.6" name="COMPLIANCE EXCELLENCE">
            <p>We maintain compliance standards equivalent to established networks including GLG and AlphaSights. Our protocols include comprehensive expert vetting, real-time monitoring, and multi-stage review processes. All activities comply with applicable securities regulations and data protection requirements.</p>
            <p className="text-ink-3 mt-3">Accessible pricing doesn&apos;t mean compromised standards.</p>
          </Tile>
        </TileGrid>
      </div>

      {/* ── 09 · CLIENTS ─────────────────────────────────────────── */}
      <SectionBand
        id="clients"
        num="09"
        label="Our Clients"
        meta="Seed-stage to Fortune 500 · treated equally"
      />
      <div className="px-4 sm:px-9 pt-6">
        <p className="text-body text-ink max-w-4xl">
          We serve everyone from seed-stage startups to Fortune 500 companies — and treat them equally. Our democratic approach means a <span className="text-red">Series A founder gets the same quality service as a multi-billion dollar hedge fund</span>:
        </p>
      </div>
      <div className="p-4 sm:p-9">
        <TileGrid cols={4}>
          <Tile id="09.1" name="STARTUPS & SCALE-UPS">
            <ul className="space-y-2">
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Seed to Series A startups validating product-market fit</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Series B–D companies planning market expansion</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Fast-growing tech companies (SaaS, fintech, healthtech)</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Founders conducting competitive research pre-fundraise</span></li>
            </ul>
          </Tile>
          <Tile id="09.2" name="SMEs & MID-MARKET">
            <ul className="space-y-2">
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Mid-market enterprises ($10M–$500M revenue)</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Family-owned businesses entering new markets</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Regional leaders planning national/international expansion</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Companies assessing M&amp;A targets or competitive threats</span></li>
            </ul>
          </Tile>
          <Tile id="09.3" name="INVESTMENT FIRMS">
            <ul className="space-y-2">
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Emerging hedge funds ($50M–$500M AUM)</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Micro and small-cap PE firms</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Venture capital funds conducting due diligence</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Family offices and boutique investment managers</span></li>
            </ul>
          </Tile>
          <Tile id="09.4" name="ENTERPRISES & PRO SERVICES">
            <ul className="space-y-2">
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Fortune 500 strategy teams</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Boutique consulting firms</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Market research agencies</span></li>
              <li className="flex gap-3"><span className="text-red font-mono">+</span><span>Corporate development and M&amp;A teams</span></li>
            </ul>
          </Tile>
        </TileGrid>
      </div>

      {/* ── 10 · TEAM ────────────────────────────────────────────── */}
      <SectionBand
        id="team"
        num="10"
        label="Our Team"
        meta="30 professionals · multi-time-zone · operator backgrounds"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile id="10.1" name="LEADERSHIP">
            <p>Former operators from leading technology companies and high-growth organizations. Combined experience spans product management, business development, and strategic operations at companies ranging from startups to FAANG enterprises.</p>
          </Tile>
          <Tile id="10.2" name="RESEARCH TEAM">
            <p>30 professionals working across multiple time zones. Our team includes former industry practitioners who understand the nuances of each sector. This operational background enables more effective expert identification and consultation facilitation.</p>
          </Tile>
          <Tile id="10.3" name="COMPLIANCE TEAM">
            <p>Dedicated compliance professionals with backgrounds in financial services regulation. Former compliance officers from investment firms and expert networks. Continuous training ensures adherence to evolving regulatory requirements.</p>
          </Tile>
        </TileGrid>
      </div>

      {/* ── 11 · FAQ ─────────────────────────────────────────────── */}
      <SectionBand
        id="faq"
        num="11"
        label="FAQ"
        meta="Frequently asked questions"
      />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-7 pt-6 pb-4">
          <header className="mb-6">
            <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">11.0</div>
            <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink">FREQUENTLY ASKED QUESTIONS</div>
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

      {/* ── CTA BAND ─────────────────────────────────────────────── */}
      <CtaBand
        title={
          <>
            Join Our Network of{" "}
            <span className="text-red">50,000+</span> Professionals
          </>
        }
        meta={
          <>
            Our team is available to discuss your intelligence requirements{" "}
            <b className="text-paper font-medium">{SITE.hours}</b>
          </>
        }
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}`}
      />
    </>
  );
}
