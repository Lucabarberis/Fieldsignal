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
  getAllTranscripts,
  getTranscriptsByTopic,
  getAllTranscriptTopicSlugs,
} from "@/lib/db/transcripts";

type Props = { params: Promise<{ topic: string }> };

export async function generateStaticParams() {
  const topics = await getAllTranscriptTopicSlugs();
  return topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const all = await getAllTranscripts();
  const label = all.find((t) => t.topicSlug === topic)?.topicLabel;
  if (!label) return {};
  return pageMetadata({
    title: `${label} — Expert Interviews`,
    description: `Curated expert call transcripts on ${label}. Anonymised, MNPI-screened, free previews on every transcript.`,
    path: `/transcripts/by-topic/${topic}`,
  });
}

export default async function TranscriptsByTopicPage({ params }: Props) {
  const { topic } = await params;
  const list = await getTranscriptsByTopic(topic);
  if (list.length === 0) notFound();

  const label = list[0].topicLabel;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Transcripts", url: "/transcripts" },
          { name: "By Topic", url: "/transcripts" },
          { name: label, url: `/transcripts/by-topic/${topic}` },
        ]}
      />

      <PageHeader
        current={label}
        title={label}
        lede={
          <>
            Anonymised expert interviews on <b>{label}</b>. Free previews; full transcripts for subscribers.
          </>
        }
        meta={[
          { label: "Topic", value: label },
          { label: "Transcripts", value: `${list.length}` },
          { label: "Full access", value: "Subscription" },
        ]}
      />

      <SectionBand
        num="01"
        label={`${label} Transcripts`}
        meta={`${list.length} available`}
      />
      <div className="p-4 sm:p-9">
        <TileGrid cols={3}>
          {list.map((t) => (
            <Tile
              key={t.slug}
              id={t.id}
              name={t.expertRole.toUpperCase().slice(0, 60)}
              meta={
                <>
                  {new Date(t.publishedAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </>
              }
              cta="Read preview"
              href={`/transcripts/${t.slug}`}
              updated={`${t.wordCount.toLocaleString()} words`}
            >
              <p>{t.description}</p>
            </Tile>
          ))}
        </TileGrid>
      </div>

      <TranscriptHubFaq label={label} sectionNum="02" items={list} />

      <CtaBand
        title={
          <>
            Need a custom expert call on <span className="text-red">{label}</span>?
          </>
        }
        meta={<>We&apos;ll source a similar operator within 72h.</>}
        ctaLabel="Brief us"
        ctaHref="/contact"
      />
    </>
  );
}
