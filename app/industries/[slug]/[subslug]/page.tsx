import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { industries } from "@/content/data/industries";
import {
  industrySubniches,
  getSubniche,
  getSubnichesFor,
} from "@/content/data/industry-subniches";

type Props = { params: Promise<{ slug: string; subslug: string }> };

export async function generateStaticParams() {
  return industrySubniches.map((s) => ({
    slug: s.parentSlug,
    subslug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subslug } = await params;
  const s = getSubniche(slug, subslug);
  if (!s) return {};
  return pageMetadata({
    title: s.title,
    description: s.description,
    path: `/industries/${slug}/${subslug}`,
  });
}

export default async function SubnichePage({ params }: Props) {
  const { slug, subslug } = await params;
  const sub = getSubniche(slug, subslug);
  if (!sub) notFound();

  const parent = industries.find((i) => i.slug === slug);
  if (!parent) notFound();

  // Sibling sub-niches under the same parent for cross-link block
  const siblings = getSubnichesFor(slug).filter((s) => s.slug !== sub.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: parent.name, url: `/industries/${parent.slug}` },
          { name: sub.name, url: `/industries/${slug}/${subslug}` },
        ]}
      />

      <PageHeader
        current={sub.name}
        title={sub.title.split(" - ")[0]}
        lede={sub.pageLede}
        meta={[
          { label: "Parent sector", value: parent.name },
          { label: "Expert types", value: `${sub.expertTypes.length}+` },
          { label: "Coverage", value: "Global" },
        ]}
      />

      {/* ── 01 — Expert types ─────────────────────────────────────── */}
      <SectionBand
        num="01"
        label="Expert Types We Cover"
        meta={`${sub.expertTypes.length} archetypes`}
      />
      <div className="px-9 py-8 max-w-4xl">
        <Checklist items={[...sub.expertTypes]} />
      </div>

      {/* ── 02 — Sample questions buyers bring us ─────────────────── */}
      <SectionBand
        num="02"
        label="Sample Questions"
        meta={`${sub.sampleQuestions.length} examples`}
      />
      <div className="p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <dl className="flex flex-col">
            {sub.sampleQuestions.map((q, i) => (
              <div
                key={q}
                className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-4 ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <dt className="font-mono text-mono text-red font-semibold opacity-[0.78] mt-0.5">
                  Q.{String(i + 1).padStart(2, "0")}
                </dt>
                <p className="text-[14px] leading-[1.55] text-ink-2">{q}</p>
              </div>
            ))}
          </dl>
        </article>
      </div>

      {/* ── 03 — Recent projects ──────────────────────────────────── */}
      <SectionBand
        num="03"
        label="Recent Project Examples"
        meta="Anonymised"
      />
      <div className="p-9">
        <TileGrid cols={2}>
          {sub.recentProjects.map((p, i) => (
            <article key={p} className="bg-paper px-7 pt-6 pb-5">
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                03.{i + 1}
              </div>
              <p className="text-body text-ink mt-2">{p}</p>
            </article>
          ))}
        </TileGrid>
      </div>

      {/* ── 04 — Compliance note ──────────────────────────────────── */}
      <SectionBand
        num="04"
        label="Compliance & Conflicts"
        meta="Sector-specific"
      />
      <div className="px-9 py-8 max-w-4xl">
        <p className="text-body text-ink-2">
          Sector-specific compliance constraints are enforced before any call is
          scheduled — including MNPI rules for{" "}
          <a
            href="/industries/financial-services"
            className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
          >
            financial services
          </a>
          , KOL disclosure for{" "}
          <a
            href="/industries/healthcare-and-life-sciences"
            className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
          >
            healthcare
          </a>{" "}
          and ITAR for{" "}
          <a
            href="/industries/industrials-and-manufacturing/aerospace-and-defense"
            className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
          >
            aerospace & defense
          </a>
          . See our{" "}
          <a
            href="/compliance"
            className="text-ink underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
          >
            compliance framework
          </a>{" "}
          for full detail.
        </p>
      </div>

      {/* ── 05 — Sibling sub-niches under same parent ─────────────── */}
      {siblings.length > 0 && (
        <>
          <SectionBand
            num="05"
            label={`Other ${parent.name.split(" ")[0]} Sub-Niches`}
            meta={`${siblings.length} more`}
          />
          <div className="p-9">
            <TileGrid cols={3}>
              {siblings.map((s) => (
                <Tile
                  key={s.slug}
                  id={s.id}
                  name={s.name}
                  cta="View sub-niche"
                  href={`/industries/${parent.slug}/${s.slug}`}
                  updated={`${s.expertTypes.length} types`}
                >
                  <p>{s.description}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={
          <>
            Need <span className="text-red">{sub.name.toLowerCase()}</span>{" "}
            coverage? Brief us.
          </>
        }
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(sub.name)}%20coverage%20enquiry`}
      />
    </>
  );
}
