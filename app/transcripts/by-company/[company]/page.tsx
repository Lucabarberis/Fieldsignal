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
  getTranscriptsByCompany,
  getAllTranscriptCompanySlugs,
} from "@/lib/db/transcripts";

type Props = { params: Promise<{ company: string }> };

export async function generateStaticParams() {
  const companies = await getAllTranscriptCompanySlugs();
  return companies.map((c) => ({ company: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company } = await params;
  // Recover the human-readable label
  const all = await getAllTranscripts();
  const matches = all.filter((t) => t.companySlug === company);
  const label = matches[0]?.companyContext;
  if (!label) return {};
  return pageMetadata({
    title: `${label} — Expert Interviews and Transcripts`,
    description: `Anonymised expert interviews discussing ${label}. Competitive position, customer feedback, channel dynamics.`,
    path: `/transcripts/by-company/${company}`,
    // A single-transcript hub is thin and near-duplicates the transcript
    // page — noindex until it groups two or more.
    noindex: matches.length < 2,
  });
}

export default async function TranscriptsByCompanyPage({ params }: Props) {
  const { company } = await params;
  // Repo already returns newest-first
  const list = await getTranscriptsByCompany(company);
  if (list.length === 0) notFound();

  const label = list[0].companyContext;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Transcripts", url: "/transcripts" },
          { name: "By Company", url: "/transcripts" },
          { name: label, url: `/transcripts/by-company/${company}` },
        ]}
      />

      <PageHeader
        current={label}
        parent={{ label: "Transcripts", href: "/transcripts" }}
        title={`${label} transcripts`}
        lede={
          <>
            Anonymised expert interviews referencing {label}. <b>All identities anonymised, all content MNPI-screened.</b>
          </>
        }
        meta={[
          { label: "Company context", value: label },
          { label: "Transcripts", value: `${list.length}` },
          { label: "Anonymisation", value: "Expert + client" },
          { label: "Full access", value: "Subscription" },
        ]}
      />

      <SectionBand
        num="01"
        label={`Transcripts referencing ${label}`}
        meta={`${list.length} available`}
      />
      <div className="p-4 sm:p-9">
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
      </div>

      <TranscriptHubFaq label={label} sectionNum="02" items={list} />

      <CtaBand
        title={
          <>
            Need a custom expert call on <span className="text-red">{label}</span>?
          </>
        }
        meta={<>We&apos;ll source an anonymised operator within 72h.</>}
        ctaLabel="Brief us"
        ctaHref="/contact"
      />
    </>
  );
}
