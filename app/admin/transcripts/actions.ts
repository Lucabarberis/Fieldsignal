"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { transcriptsRepo, slugifyTranscript } from "@/lib/db/transcripts";
import type {
  TranscriptInput,
  TranscriptStatus,
} from "@/lib/db/transcript-types";

/**
 * Server actions for the transcripts admin.
 *
 * Each action validates a FormData payload, calls the data repo,
 * revalidates affected paths (so the public /transcripts/* routes
 * refresh), then redirects.
 *
 * NOTE: server-side only. Filesystem writes today; Supabase tomorrow.
 */

function readForm(fd: FormData): TranscriptInput {
  const title = String(fd.get("title") ?? "").trim();
  const description = String(fd.get("description") ?? "").trim();
  const expertRole = String(fd.get("expertRole") ?? "").trim();
  const companyContext = String(fd.get("companyContext") ?? "").trim();
  const companySlug = slugifyTranscript(
    String(fd.get("companySlug") ?? "").trim() || companyContext,
  );
  const topicLabel = String(fd.get("topicLabel") ?? "").trim();
  const topicSlug = slugifyTranscript(
    String(fd.get("topicSlug") ?? "").trim() || topicLabel,
  );

  const industrySlugsRaw = String(fd.get("industrySlugs") ?? "").trim();
  const industrySlugs = industrySlugsRaw
    ? industrySlugsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const relatedRaw = String(fd.get("relatedSlugs") ?? "").trim();
  const relatedSlugs = relatedRaw
    ? relatedRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const wordCountRaw = String(fd.get("wordCount") ?? "0").trim();
  const wordCount = parseInt(wordCountRaw, 10) || 0;

  const preview = String(fd.get("preview") ?? "");
  const gatedTeaser = String(fd.get("gatedTeaser") ?? "").trim();
  const gatedContent = String(fd.get("gatedContent") ?? "");
  const primaryKW = String(fd.get("primaryKW") ?? "").trim();
  const slugInput = String(fd.get("slug") ?? "").trim();
  const publishedAt = String(fd.get("publishedAt") ?? "").trim();
  const status = (String(fd.get("status") ?? "draft") as TranscriptStatus);
  const complianceConfirmed = fd.get("complianceConfirmed") === "on";

  // Required-field validation
  if (!title) throw new Error("Title is required");
  if (!description) throw new Error("Description is required");
  if (!expertRole) throw new Error("Expert role is required");
  if (!companyContext) throw new Error("Company context is required");
  if (!topicLabel) throw new Error("Topic label is required");
  if (!preview.trim()) throw new Error("Preview text is required");
  if (industrySlugs.length === 0) {
    throw new Error("At least one industry slug is required");
  }

  // Publishing requires the compliance attestation
  if (status === "published" && !complianceConfirmed) {
    throw new Error(
      "Cannot publish without confirming the transcript is anonymised and MNPI-screened.",
    );
  }

  // Per brief §4.14: free preview should be 300-500 words. We warn at
  // the form layer (UI) but allow saving outside the range so drafts
  // can be staged. Only enforce on publish.
  if (status === "published") {
    const previewWords = preview.split(/\s+/).filter(Boolean).length;
    if (previewWords < 200) {
      throw new Error(
        `Preview is too short (${previewWords} words). Target 300-500 words per SEO brief §4.14.`,
      );
    }
  }

  return {
    title,
    description,
    expertRole,
    companyContext,
    companySlug,
    topicSlug,
    topicLabel,
    industrySlugs,
    publishedAt: publishedAt || undefined,
    wordCount,
    preview,
    gatedTeaser,
    gatedContent: gatedContent || undefined,
    relatedSlugs,
    primaryKW,
    status,
    complianceConfirmed,
    slug: slugInput || undefined,
  };
}

function revalidatePublicTranscripts(slug?: string, oldSlug?: string) {
  revalidatePath("/transcripts");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/transcripts/${slug}`);
  }
  if (oldSlug && oldSlug !== slug) {
    revalidatePath(`/transcripts/${oldSlug}`);
  }
  // Aggregator pages — broad revalidation. We don't know which
  // industry/company/topic the transcript belongs to without re-reading
  // it, so we revalidate the parent path which catches all children.
  revalidatePath("/transcripts/by-industry", "layout");
  revalidatePath("/transcripts/by-company", "layout");
  revalidatePath("/transcripts/by-topic", "layout");
}

export async function createTranscriptAction(fd: FormData) {
  const input = readForm(fd);
  const created = await transcriptsRepo.create(input);
  revalidatePublicTranscripts(created.slug);
  redirect(`/admin/transcripts/${created.slug}/edit?saved=1`);
}

export async function updateTranscriptAction(originalSlug: string, fd: FormData) {
  const input = readForm(fd);
  const updated = await transcriptsRepo.update(originalSlug, input);
  revalidatePublicTranscripts(updated.slug, originalSlug);
  redirect(`/admin/transcripts/${updated.slug}/edit?saved=1`);
}

export async function deleteTranscriptAction(fd: FormData) {
  const raw = String(fd.get("slug") ?? "").trim();
  if (!raw) throw new Error("Missing slug");
  const slug = slugifyTranscript(raw);
  if (!slug || slug !== raw) throw new Error("Invalid slug");
  await transcriptsRepo.delete(slug);
  revalidatePublicTranscripts(slug);
  redirect("/admin/transcripts");
}
