import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema, LocalBusinessSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { regions, getRegion } from "@/content/data/regions";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getRegion(slug);
  if (!r) return {};
  return pageMetadata({
    title: r.title,
    description: r.description,
    path: `/regions/${slug}`,
  });
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const r = getRegion(slug);
  if (!r) notFound();

  const siblings = regions.filter((s) => s.slug !== r.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Regions", url: "/regions" },
          { name: r.name, url: `/regions/${slug}` },
        ]}
      />
      <LocalBusinessSchema
        regionName={r.name}
        description={r.description}
        url={`${SITE.url}/regions/${slug}`}
        areaServed={r.majorMarkets}
        availableLanguage={r.languages}
      />

      <PageHeader
        current={r.name}
        parent={{ label: "Regions", href: "/regions" }}
        title={r.title.split(" - ")[0]}
        lede={r.pageLede}
        meta={[
          { label: "Expert bench", value: r.expertCount },
          { label: "Languages", value: `${r.languages.length} native` },
          { label: "Major markets", value: `${r.majorMarkets.length}` },
          { label: "Time zones", value: r.timeZones.split("—")[0].trim() },
        ]}
      />

      {/* ── 01 — Markets covered ──────────────────────────────────── */}
      <SectionBand
        num="01"
        label="Major Markets"
        meta={`${r.majorMarkets.length} hubs`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {r.majorMarkets.map((m, i) => (
            <article key={m} className="bg-paper px-7 pt-6 pb-5">
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                01.{i + 1}
              </div>
              <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink uppercase">
                {m}
              </div>
            </article>
          ))}
        </TileGrid>
      </div>

      {/* ── 02 — Coverage strengths ───────────────────────────────── */}
      <SectionBand
        num="02"
        label="Coverage Strengths"
        meta={`${r.coverageStrengths.length} sectors`}
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...r.coverageStrengths]} />
      </div>

      {/* ── 03 — Languages + time zones ───────────────────────────── */}
      <SectionBand num="03" label="Languages & Coverage" meta="Native interviewing" />
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          <article className="bg-paper px-7 pt-6 pb-5">
            <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
              03.1
            </div>
            <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-3 uppercase">
              Languages
            </div>
            <ul className="space-y-2 text-[13px] text-ink-2">
              {r.languages.map((lang) => (
                <li key={lang} className="border-t border-rule pt-2">
                  {lang}
                </li>
              ))}
            </ul>
          </article>
          <article className="bg-paper px-7 pt-6 pb-5">
            <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
              03.2
            </div>
            <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-3 uppercase">
              Time-zone coverage
            </div>
            <p className="text-[13px] leading-[1.55] text-ink-2">{r.timeZones}</p>
          </article>
        </TileGrid>
      </div>

      {/* ── 04 — Sample projects ──────────────────────────────────── */}
      <SectionBand
        num="04"
        label="Sample Projects"
        meta="Anonymised"
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={2}>
          {r.sampleProjects.map((p, i) => (
            <article key={p} className="bg-paper px-7 pt-6 pb-5">
              <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
                04.{i + 1}
              </div>
              <p className="text-body text-ink mt-2">{p}</p>
            </article>
          ))}
        </TileGrid>
      </div>

      {/* ── 05 — Compliance notes ─────────────────────────────────── */}
      <SectionBand
        num="05"
        label="Compliance"
        meta="Region-specific"
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <p className="text-body text-ink-2">{r.complianceNotes}</p>
      </div>

      {/* ── 06 — Other regions ────────────────────────────────────── */}
      {siblings.length > 0 && (
        <>
          <SectionBand
            num="06"
            label="Other Regions"
            meta={`${siblings.length} more`}
          />
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {siblings.map((s) => (
                <Tile
                  key={s.slug}
                  id={s.id}
                  name={s.name}
                  meta={<b className="text-ink">{s.expertCount} experts</b>}
                  cta="View coverage"
                  href={`/regions/${s.slug}`}
                  updated={`${s.languages.length} langs`}
                >
                  <p>{s.oneLiner}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={
          <>Need <span className="text-red">{r.name.toLowerCase()}</span> coverage? Brief us.</>
        }
        meta={<>Response under 4 hours, {SITE.hours}.</>}
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
