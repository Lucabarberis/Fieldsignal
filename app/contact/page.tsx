import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { ContactForm } from "@/components/ContactForm";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact FieldSignal - Talk to a Senior Researcher",
  description: `Reach the team ${SITE.hours}. Average response under 4 hours.`,
  path: "/contact",
});

export default async function ContactHubPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <PageHeader
        current="Contact"
        title="Talk to a senior researcher."
        lede={
          <>
            One form, one inbox, one senior team. Your message lands directly with <b>{SITE.contactEmail}</b> — response under 4 hours, {SITE.hours}.
          </>
        }
        meta={[
          { label: "Email", value: SITE.contactEmail },
          { label: "Response time", value: "< 4h typical" },
          { label: "Working week", value: SITE.hours },
        ]}
      />

      <SectionBand num="01" label="Send a Message" meta="Straight to a senior researcher" />
      <div className="px-4 sm:px-9 py-8">
        {error && (
          <div className="max-w-3xl mb-7 border border-red bg-paper-3 px-5 py-4 font-mono text-mono text-ink">
            <span className="text-red font-semibold uppercase tracking-[0.08em]">
              {error === "invalid" ? "Check your details" : "Message not sent"}
            </span>
            <span className="text-ink-2">
              {" — "}
              {error === "invalid"
                ? "please fill every field and use a valid email address."
                : (
                  <>
                    something went wrong on our side. Email us directly at{" "}
                    <a href={`mailto:${SITE.contactEmail}`} className="underline hover:text-red">
                      {SITE.contactEmail}
                    </a>
                    .
                  </>
                )}
            </span>
          </div>
        )}
        <ContactForm />
      </div>

      <SectionBand num="02" label="How To Reach Us" meta="3 paths in" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile
            id="02.1"
            name="REQUEST A CALL"
            cta="Request a call"
            href="/contact/request-a-call"
            updated="24h response"
          >
            <p>Tell us the industry, role and decision you&apos;re researching. We propose 10–20 candidate experts within 24–72 hours.</p>
          </Tile>
          <Tile
            id="02.2"
            name="GET A QUOTE"
            cta="Get a quote"
            href="/contact/get-a-quote"
            updated="1 business day"
          >
            <p>Multi-call engagement or programme? Send us scope, sectors and timeline. Quote returned within one business day.</p>
          </Tile>
          <Tile
            id="02.3"
            name="BOOK A DEMO"
            cta="Book a demo"
            href="/contact/book-a-demo"
            updated="30 min · video"
          >
            <p>30-minute walkthrough of the platform — search, scheduling, transcripts, compliance. For institutional buyers.</p>
          </Tile>
        </TileGrid>
      </div>

      <SectionBand num="03" label="Other Enquiries" meta="Routed direct to specialists" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          <Tile
            id="03.1"
            name="COMPLIANCE QUESTIONS"
            cta="Compliance email"
            href={`mailto:${SITE.contactEmail}?subject=Compliance%20enquiry`}
            updated="Same day"
          >
            <p>Pre-engagement questionnaire, MNPI policy, audit access — anything our compliance lead should answer directly.</p>
          </Tile>
          <Tile
            id="03.2"
            name="JOIN AS AN EXPERT"
            cta="Expert application"
            href={`mailto:${SITE.contactEmail}?subject=Expert%20application`}
            updated="Rolling"
          >
            <p>5+ years of relevant industry experience, no active conflicts of interest, willing to attest per call. Apply directly.</p>
          </Tile>
          <Tile
            id="03.3"
            name="MEDIA & PRESS"
            cta="Press email"
            href={`mailto:${SITE.contactEmail}?subject=Press%20enquiry`}
            updated="Same day"
          >
            <p>Press enquiries, analyst briefings, interview requests. We respond same-day during business hours.</p>
          </Tile>
        </TileGrid>
      </div>

      <CtaBand
        title={<>Or just <span className="text-red">email Miles</span> directly.</>}
        meta={<>Direct inbox — no autoresponder, no triage queue.</>}
        ctaLabel={SITE.contactEmail}
        ctaHref={`mailto:${SITE.contactEmail}`}
      />
    </>
  );
}
