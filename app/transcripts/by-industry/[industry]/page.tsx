import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import {
  getTranscriptsByIndustry,
  getAllTranscriptIndustrySlugs,
} from "@/lib/db/transcripts";
import { industries } from "@/content/data/industries";

type Props = { params: Promise<{ industry: string }> };

export async function generateStaticParams() {
  const slugs = await getAllTranscriptIndustrySlugs();
  return slugs.map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const ind = industries.find((i) => i.slug === industry);
  if (!ind) return {};
  return pageMetadata({
    title: `${ind.name} Expert Call Transcripts`,
    description: `Browse anonymised expert call transcripts across ${ind.name.toLowerCase()}. Free previews, full transcripts on subscription.`,
    path: `/transcripts/by-industry/${industry}`,
  });
}

export default async function TranscriptsByIndustryPage({ params }: Props) {
  const { industry } = await params;
  const ind = industries.find((i) => i.slug === industry);
  if (!ind) notFound();

  // Repo already returns newest-first via list() sort
  const list = await getTranscriptsByIndustry(industry);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Transcripts", url: "/transcripts" },
          { name: "By Industry", url: "/transcripts" },
          { name: ind.name, url: `/transcripts/by-industry/${industry}` },
        ]}
      />

      <PageHeader
        current={ind.name}
        title={`${ind.name.split(" ")[0]} Transcripts`}
        lede={
          <>
            Anonymised expert call transcripts across {ind.name.toLowerCase()}. Free previews; full transcripts via €99/mo subscription.
          </>
        }
        meta={[
          { label: "Industry", value: ind.name },
          { label: "Transcripts", value: `${list.length}` },
          { label: "Subscription", value: "€99/mo" },
        ]}
      />

      <SectionBand
        num="01"
        label={`${ind.name} Transcripts`}
        meta={`${list.length} available`}
      />
      <div className="p-9">
        {list.length === 0 ? (
          <p className="text-body text-ink-3">
            No transcripts in this category yet. Check back next week.
          </p>
        ) : (
          <TileGrid cols={3}>
            {list.map((t) => (
              <Tile
                key={t.slug}
                id={t.id}
                name={t.topicLabel.toUpperCase()}
                meta={<b className="text-ink">{t.expertRole}</b>}
                cta="Read preview"
                href={`/transcripts/${t.slug}`}
                updated={new Date(t.publishedAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              >
                <p>{t.description}</p>
              </Tile>
            ))}
          </TileGrid>
        )}
      </div>

      <CtaBand
        title={
          <>
            Need a custom <span className="text-red">{ind.name.toLowerCase()}</span> expert call?
          </>
        }
        meta={<>We&apos;ll source within 72h. Senior researcher direct.</>}
        ctaLabel="Brief us"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(ind.name + " expert call")}`}
      />
    </>
  );
}
