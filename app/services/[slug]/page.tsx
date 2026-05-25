import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import {
  BreadcrumbSchema,
  ServiceSchema,
} from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { services } from "@/content/data/services";

type Props = { params: Promise<{ slug: string }> };

/** Build-time list of every service slug → static page. */
export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/** Per-service metadata. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = service.relatedSlugs
    .map((rs) => services.find((s) => s.slug === rs))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  const priceLabel = service.pricingFrom
    ? `From ${service.pricingFrom.currency === "EUR" ? "€" : "$"}${service.pricingFrom.amount.toLocaleString()}`
    : "On request";

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: `/services/${slug}` },
        ]}
      />
      <ServiceSchema
        name={service.name}
        description={service.description}
        url={`${SITE.url}/services/${slug}`}
        priceFrom={service.pricingFrom}
      />

      <PageHeader
        current={service.name}
        title={service.title.split(" - ")[0]}
        lede={service.pageLede}
        meta={[
          { label: "Turnaround", value: service.turnaround ?? "Custom" },
          { label: "Pricing", value: priceLabel },
          { label: "Format", value: service.name.toLowerCase().split(" ").map(w => w[0]?.toUpperCase() + w.slice(1)).join(" ") },
        ]}
      />

      <SectionBand
        num="01"
        label="When To Use"
        meta="Use cases"
      />
      <div className="px-9 py-8 max-w-4xl">
        <Checklist items={[...service.whenToUse]} />
      </div>

      <SectionBand
        num="02"
        label="What You Get"
        meta="Deliverables"
      />
      <div className="px-9 py-8 max-w-4xl">
        <Checklist items={[...service.whatYouGet]} />
      </div>

      <SectionBand
        num="03"
        label="Sample Expert Profiles"
        meta="Recent placements"
      />
      <div className="p-9">
        <TileGrid cols={2}>
          {service.sampleProfiles.map((profile, i) => (
            <article
              key={profile}
              className="bg-paper px-7 pt-6 pb-5"
            >
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                03.{i + 1}
              </div>
              <p className="text-body text-ink mt-2">{profile}</p>
            </article>
          ))}
        </TileGrid>
      </div>

      <SectionBand
        num="04"
        label="Compliance Footnote"
        meta="MNPI · attestations · audit"
      />
      <div className="px-9 py-8 max-w-4xl">
        <p className="text-body text-ink-2">
          Every call runs under the same{" "}
          <Link href="/compliance" className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors">
            FieldSignal compliance framework
          </Link>{" "}
          — experts must be 6+ months removed from companies they discuss, no MNPI may be requested or shared, all calls are monitored, and the full audit trail is retained for 7 years.
        </p>
      </div>

      {related.length > 0 && (
        <>
          <SectionBand
            num="05"
            label="Related Services"
            meta={`${related.length} suggestions`}
          />
          <div className="p-9">
            <TileGrid cols={3}>
              {related.map((r) => (
                <Tile
                  key={r.slug}
                  id={r.id}
                  name={r.name}
                  meta={r.turnaround ? <>Turnaround · <b>{r.turnaround}</b></> : undefined}
                  cta="View service"
                  href={`/services/${r.slug}`}
                  updated={r.turnaround}
                >
                  <p>{r.oneLiner}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={
          <>
            Brief us on a <span className="text-red">{service.name.toLowerCase()}</span> today.
          </>
        }
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(service.name)}%20enquiry`}
      />
    </>
  );
}
