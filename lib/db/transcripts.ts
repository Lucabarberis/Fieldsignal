/**
 * ═══════════════════════════════════════════════════════════════════
 * TRANSCRIPTS DATA LAYER — Supabase
 * ═══════════════════════════════════════════════════════════════════
 *
 * SINGLE INTEGRATION POINT for transcript storage. Public pages
 * (/transcripts/*) and admin (/admin/transcripts/*) both go through
 * this file.
 *
 * Storage: Supabase Postgres `transcripts` table.
 * Reads: anon client + RLS — public sees only published+visible rows.
 * Writes: service-role client — bypasses RLS (auth-gated by proxy).
 * ═══════════════════════════════════════════════════════════════════
 */

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type {
  Transcript,
  TranscriptInput,
  TranscriptMeta,
  TranscriptStatus,
} from "./transcript-types";

export interface TranscriptsRepo {
  list(opts?: { includeUnpublished?: boolean }): Promise<TranscriptMeta[]>;
  getMeta(slug: string): Promise<TranscriptMeta | null>;
  get(slug: string): Promise<Transcript | null>;
  create(input: TranscriptInput): Promise<Transcript>;
  update(slug: string, input: TranscriptInput): Promise<Transcript>;
  delete(slug: string): Promise<void>;
}

export function isScheduled(meta: { status: TranscriptStatus; publishedAt: string }): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return meta.status === "published" && meta.publishedAt > today;
}

export function slugifyTranscript(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

// ─── Row ↔ domain mapping ──────────────────────────────────────────

type Row = {
  slug: string;
  display_id: string;
  title: string;
  description: string;
  expert_role: string;
  company_context: string;
  company_slug: string;
  topic_slug: string;
  topic_label: string;
  industry_slugs: string[];
  word_count: number;
  preview: string;
  gated_teaser: string;
  gated_content: string | null;
  related_slugs: string[];
  primary_kw: string;
  status: TranscriptStatus;
  compliance_confirmed: boolean;
  published_at: string;
  updated_at: string | null;
  created_at: string;
};

function rowToTranscript(row: Row): Transcript {
  return {
    slug: row.slug,
    id: row.display_id,
    title: row.title,
    description: row.description,
    expertRole: row.expert_role,
    companyContext: row.company_context,
    companySlug: row.company_slug,
    topicSlug: row.topic_slug,
    topicLabel: row.topic_label,
    industrySlugs: row.industry_slugs ?? [],
    publishedAt: row.published_at.slice(0, 10),
    updatedAt: row.updated_at?.slice(0, 10),
    wordCount: row.word_count,
    preview: row.preview,
    gatedTeaser: row.gated_teaser,
    gatedContent: row.gated_content ?? undefined,
    relatedSlugs: row.related_slugs ?? [],
    primaryKW: row.primary_kw,
    status: row.status,
    complianceConfirmed: row.compliance_confirmed,
  };
}

// ─── Implementation ────────────────────────────────────────────────

const supabaseImpl: TranscriptsRepo = {
  async list(opts) {
    // Always use the admin client (no cookies required → safe at build-time).
    // Public visibility is enforced in code rather than via RLS.
    const sb = createSupabaseAdminClient();
    let query = sb
      .from("transcripts")
      .select("*")
      .order("published_at", { ascending: false });
    if (!opts?.includeUnpublished) {
      const nowIso = new Date().toISOString();
      query = query.eq("status", "published").lte("published_at", nowIso);
    }
    const { data, error } = await query;
    if (error) throw new Error(`transcripts.list failed: ${error.message}`);
    return (data as Row[]).map(rowToTranscript);
  },

  async getMeta(slug) {
    return this.get(slug);
  },

  async get(slug) {
    const sb = createSupabaseAdminClient();
    const { data, error } = await sb
      .from("transcripts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw new Error(`transcripts.get failed: ${error.message}`);
    return data ? rowToTranscript(data as Row) : null;
  },

  async create(input) {
    const slug = input.slug ? slugifyTranscript(input.slug) : slugifyTranscript(input.title);
    if (!slug) throw new Error("Cannot derive a slug from the title");

    const sb = createSupabaseAdminClient();

    const { data: existing } = await sb.from("transcripts").select("slug").eq("slug", slug).maybeSingle();
    if (existing) throw new Error(`A transcript with slug "${slug}" already exists`);

    // Derive display_id from current row count
    const { count } = await sb.from("transcripts").select("*", { count: "exact", head: true });
    const displayId = String((count ?? 0) + 1).padStart(2, "0");

    const today = new Date().toISOString().slice(0, 10);

    const payload = {
      slug,
      display_id: displayId,
      title: input.title,
      description: input.description,
      expert_role: input.expertRole,
      company_context: input.companyContext,
      company_slug: input.companySlug,
      topic_slug: input.topicSlug,
      topic_label: input.topicLabel,
      industry_slugs: input.industrySlugs,
      word_count: input.wordCount,
      preview: input.preview,
      gated_teaser: input.gatedTeaser,
      gated_content: input.gatedContent ?? "",
      related_slugs: input.relatedSlugs,
      primary_kw: input.primaryKW,
      status: input.status,
      compliance_confirmed: input.complianceConfirmed,
      published_at: input.publishedAt ?? today,
    };

    const { data, error } = await sb.from("transcripts").insert(payload).select("*").single();
    if (error) throw new Error(`transcripts.create failed: ${error.message}`);
    return rowToTranscript(data as Row);
  },

  async update(slug, input) {
    const sb = createSupabaseAdminClient();
    const newSlug = input.slug && slugifyTranscript(input.slug) !== slug
      ? slugifyTranscript(input.slug)
      : slug;

    const payload = {
      slug: newSlug,
      title: input.title,
      description: input.description,
      expert_role: input.expertRole,
      company_context: input.companyContext,
      company_slug: input.companySlug,
      topic_slug: input.topicSlug,
      topic_label: input.topicLabel,
      industry_slugs: input.industrySlugs,
      word_count: input.wordCount,
      preview: input.preview,
      gated_teaser: input.gatedTeaser,
      gated_content: input.gatedContent ?? "",
      related_slugs: input.relatedSlugs,
      primary_kw: input.primaryKW,
      status: input.status,
      compliance_confirmed: input.complianceConfirmed,
      ...(input.publishedAt ? { published_at: input.publishedAt } : {}),
    };

    const { data, error } = await sb
      .from("transcripts")
      .update(payload)
      .eq("slug", slug)
      .select("*")
      .single();
    if (error) throw new Error(`transcripts.update failed: ${error.message}`);
    return rowToTranscript(data as Row);
  },

  async delete(slug) {
    const safe = slugifyTranscript(slug);
    if (!safe || safe !== slug) throw new Error(`Invalid slug "${slug}"`);
    const sb = createSupabaseAdminClient();
    const { error } = await sb.from("transcripts").delete().eq("slug", safe);
    if (error) throw new Error(`transcripts.delete failed: ${error.message}`);
  },
};

export const transcriptsRepo: TranscriptsRepo = supabaseImpl;

// ─── Aggregator helpers (unchanged API — same as before) ──────────

export async function getAllTranscripts(opts?: { includeUnpublished?: boolean }) {
  return transcriptsRepo.list(opts);
}

export async function getTranscriptBySlug(slug: string) {
  return transcriptsRepo.get(slug);
}

export async function getTranscriptsByIndustry(industrySlug: string) {
  const all = await transcriptsRepo.list();
  return all.filter((t) => t.industrySlugs.includes(industrySlug));
}

export async function getTranscriptsByCompany(companySlug: string) {
  const all = await transcriptsRepo.list();
  return all.filter((t) => t.companySlug === companySlug);
}

export async function getTranscriptsByTopic(topicSlug: string) {
  const all = await transcriptsRepo.list();
  return all.filter((t) => t.topicSlug === topicSlug);
}

export async function getAllTranscriptIndustrySlugs(): Promise<string[]> {
  const all = await transcriptsRepo.list();
  return Array.from(new Set(all.flatMap((t) => t.industrySlugs)));
}

export async function getAllTranscriptCompanySlugs(): Promise<{ slug: string; label: string }[]> {
  const all = await transcriptsRepo.list();
  const seen = new Map<string, string>();
  for (const t of all) seen.set(t.companySlug, t.companyContext);
  return Array.from(seen.entries()).map(([slug, label]) => ({ slug, label }));
}

export async function getAllTranscriptTopicSlugs(): Promise<{ slug: string; label: string }[]> {
  const all = await transcriptsRepo.list();
  const seen = new Map<string, string>();
  for (const t of all) seen.set(t.topicSlug, t.topicLabel);
  return Array.from(seen.entries()).map(([slug, label]) => ({ slug, label }));
}
