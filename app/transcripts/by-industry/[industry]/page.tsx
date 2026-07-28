import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TranscriptHubFaq } from "@/components/TranscriptHubFaq";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
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
    description: `Browse anonymised expert call transcripts across ${ind.name}. Free previews, full transcripts on subscription.`,
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
            Anonymised expert call transcripts across {ind.name}. Free previews; full transcripts for subscribers.
          </>
        }
        meta={[
          { label: "Industry", value: ind.name },
          { label: "Transcripts", value: `${list.length}` },
          { label: "Full access", value: "Subscription" },
        ]}
      />

      <SectionBand
        num="01"
        label={`${ind.name} Transcripts`}
        meta={`${list.length} available`}
      />
      <div className="p-4 sm:p-9">
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

      <TranscriptHubFaq label={ind.name} sectionNum="02" items={list} />

      <CtaBand
        title={
          <>
            Need a custom <span className="text-red">{ind.name}</span> expert call?
          </>
        }
        meta={<>We&apos;ll source within 72h. Senior researcher direct.</>}
        ctaLabel="Brief us"
        ctaHref="/contact"
      />
    </>
  );
}
