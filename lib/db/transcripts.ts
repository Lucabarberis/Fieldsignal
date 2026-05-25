/**
 * ═══════════════════════════════════════════════════════════════════
 * TRANSCRIPTS DATA LAYER
 * ═══════════════════════════════════════════════════════════════════
 *
 * SINGLE INTEGRATION POINT for transcript storage. Public pages
 * (/transcripts/*) and admin UI (/admin/transcripts/*) both go
 * through this file.
 *
 * Today: filesystem-backed JSON files in content/transcripts/.
 * Tomorrow: Supabase Postgres. The interface stays identical.
 *
 * ──────────────────────────────────────────────────────────────────
 * MIGRATION TO SUPABASE
 * ──────────────────────────────────────────────────────────────────
 *
 * 1. Install: npm install @supabase/supabase-js  (already needed for posts)
 *
 * 2. Create the `transcripts` table:
 *      create table transcripts (
 *        slug text primary key,
 *        id text not null,
 *        title text not null,
 *        description text not null,
 *        expert_role text not null,
 *        company_context text not null,
 *        company_slug text not null,
 *        topic_slug text not null,
 *        topic_label text not null,
 *        industry_slugs text[] not null default '{}',
 *        published_at timestamptz not null default now(),
 *        updated_at timestamptz,
 *        word_count integer not null default 0,
 *        preview text not null,
 *        gated_teaser text not null,
 *        gated_content text,
 *        related_slugs text[] not null default '{}',
 *        primary_kw text not null,
 *        status text not null default 'draft',
 *        compliance_confirmed boolean not null default false
 *      );
 *
 * 3. Seed from JSON files:
 *      npm run db:seed-transcripts
 *
 * 4. Swap `fsImpl` for `supabaseImpl` below. Public pages and admin
 *    don't change.
 *
 * ──────────────────────────────────────────────────────────────────
 * SECURITY WARNING
 * ──────────────────────────────────────────────────────────────────
 *
 * The filesystem implementation writes JSON files in-place. It works
 * in local dev only — Vercel's serverless filesystem is read-only.
 *
 * Do NOT deploy /admin/transcripts to production until either:
 *   (a) Auth is added (Supabase Auth / Auth.js)
 *   (b) The data layer is swapped to Supabase
 *
 * Recommended: do both at the same time.
 * ═══════════════════════════════════════════════════════════════════
 */

import fs from "node:fs";
import path from "node:path";
import type {
  Transcript,
  TranscriptInput,
  TranscriptMeta,
  TranscriptStatus,
} from "./transcript-types";

// ─── Shared interface ──────────────────────────────────────────────

export interface TranscriptsRepo {
  list(opts?: { includeUnpublished?: boolean }): Promise<TranscriptMeta[]>;
  getMeta(slug: string): Promise<TranscriptMeta | null>;
  get(slug: string): Promise<Transcript | null>;
  create(input: TranscriptInput): Promise<Transcript>;
  update(slug: string, input: TranscriptInput): Promise<Transcript>;
  delete(slug: string): Promise<void>;
}

// ─── Filesystem implementation ─────────────────────────────────────

const TRANSCRIPTS_DIR = path.join(process.cwd(), "content", "transcripts");

/** Visible to public when status=published AND publishedAt <= today. */
function isVisible(publishedAt: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return publishedAt <= today;
}

/** True if status=published but date is in the future. */
export function isScheduled(meta: { status: TranscriptStatus; publishedAt: string }): boolean {
  return meta.status === "published" && !isVisible(meta.publishedAt);
}

function ensureDir() {
  if (!fs.existsSync(TRANSCRIPTS_DIR)) {
    fs.mkdirSync(TRANSCRIPTS_DIR, { recursive: true });
  }
}

function readJson(slug: string): Transcript | null {
  const file = path.join(TRANSCRIPTS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  try {
    const data = JSON.parse(raw) as Transcript;
    // Defensive defaults — old files might not have every field
    return {
      ...data,
      slug: data.slug ?? slug,
      industrySlugs: data.industrySlugs ?? [],
      relatedSlugs: data.relatedSlugs ?? [],
      status: data.status ?? "published",
      complianceConfirmed: data.complianceConfirmed ?? false,
    };
  } catch (err) {
    console.error(`Failed to parse transcript JSON ${slug}:`, err);
    return null;
  }
}

function writeJson(slug: string, transcript: Transcript) {
  ensureDir();
  const file = path.join(TRANSCRIPTS_DIR, `${slug}.json`);
  fs.writeFileSync(file, JSON.stringify(transcript, null, 2) + "\n", "utf8");
}

/** Slugify a title to a URL-safe slug. Shared with the post slugify. */
export function slugifyTranscript(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

const fsImpl: TranscriptsRepo = {
  async list(opts) {
    ensureDir();
    const files = fs
      .readdirSync(TRANSCRIPTS_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
    const all = files
      .map((slug) => readJson(slug))
      .filter((t): t is Transcript => t !== null);
    const filtered = opts?.includeUnpublished
      ? all
      : all.filter((t) => t.status === "published" && isVisible(t.publishedAt));
    // Sort newest first by publishedAt
    return filtered.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  },

  async getMeta(slug) {
    return readJson(slug);
  },

  async get(slug) {
    return readJson(slug);
  },

  async create(input) {
    const slug = input.slug ? slugifyTranscript(input.slug) : slugifyTranscript(input.title);
    if (!slug) throw new Error("Cannot derive a slug from the title");
    if (readJson(slug)) {
      throw new Error(`A transcript with slug "${slug}" already exists`);
    }
    const today = new Date().toISOString().slice(0, 10);
    // Derive a display id by counting existing transcripts + 1
    const existing = fs.existsSync(TRANSCRIPTS_DIR)
      ? fs.readdirSync(TRANSCRIPTS_DIR).filter((f) => f.endsWith(".json")).length
      : 0;
    const id = String(existing + 1).padStart(2, "0");

    const transcript: Transcript = {
      slug,
      id,
      title: input.title,
      description: input.description,
      expertRole: input.expertRole,
      companyContext: input.companyContext,
      companySlug: input.companySlug,
      topicSlug: input.topicSlug,
      topicLabel: input.topicLabel,
      industrySlugs: input.industrySlugs,
      publishedAt: input.publishedAt ?? today,
      wordCount: input.wordCount,
      preview: input.preview,
      gatedTeaser: input.gatedTeaser,
      gatedContent: input.gatedContent,
      relatedSlugs: input.relatedSlugs,
      primaryKW: input.primaryKW,
      status: input.status,
      complianceConfirmed: input.complianceConfirmed,
    };
    writeJson(slug, transcript);
    return transcript;
  },

  async update(slug, input) {
    const existing = readJson(slug);
    if (!existing) throw new Error(`Transcript "${slug}" not found`);
    const newSlug = input.slug && slugifyTranscript(input.slug) !== slug
      ? slugifyTranscript(input.slug)
      : slug;
    if (newSlug !== slug) {
      // slug changed — delete old file
      const oldFile = path.join(TRANSCRIPTS_DIR, `${slug}.json`);
      if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
    }
    const transcript: Transcript = {
      ...existing,
      slug: newSlug,
      title: input.title,
      description: input.description,
      expertRole: input.expertRole,
      companyContext: input.companyContext,
      companySlug: input.companySlug,
      topicSlug: input.topicSlug,
      topicLabel: input.topicLabel,
      industrySlugs: input.industrySlugs,
      publishedAt: input.publishedAt ?? existing.publishedAt,
      updatedAt: new Date().toISOString().slice(0, 10),
      wordCount: input.wordCount,
      preview: input.preview,
      gatedTeaser: input.gatedTeaser,
      gatedContent: input.gatedContent,
      relatedSlugs: input.relatedSlugs,
      primaryKW: input.primaryKW,
      status: input.status,
      complianceConfirmed: input.complianceConfirmed,
    };
    writeJson(newSlug, transcript);
    return transcript;
  },

  async delete(slug) {
    // Defense-in-depth slug sanitisation (same pattern as posts.delete)
    const safe = slugifyTranscript(slug);
    if (!safe || safe !== slug) throw new Error(`Invalid slug "${slug}"`);
    const file = path.join(TRANSCRIPTS_DIR, `${safe}.json`);
    const resolved = path.resolve(file);
    if (!resolved.startsWith(path.resolve(TRANSCRIPTS_DIR) + path.sep)) {
      throw new Error(`Refusing to delete outside transcripts dir: ${resolved}`);
    }
    if (!fs.existsSync(resolved)) throw new Error(`Transcript "${safe}" not found`);
    fs.unlinkSync(resolved);
  },
};

// ─── Active export ─────────────────────────────────────────────────

export const transcriptsRepo: TranscriptsRepo = fsImpl;

// ─── Aggregator helpers ─────────────────────────────────────────────
//
// These mirror the helpers we had in content/data/transcripts.ts but
// read from the repo. They're async because the repo is async.

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
