// Seed Supabase with the existing transcripts from content/transcripts/.
// One-shot: reads each .json file, uploads to the `transcripts` table
// via the service-role key (bypasses RLS).
//
// Idempotent: uses upsert on the slug primary key.
//
// Run:  node --env-file=.env.local scripts/seed-transcripts-to-supabase.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing env vars. Run with: node --env-file=.env.local scripts/seed-transcripts-to-supabase.mjs",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const dir = path.join(projectRoot, "content", "transcripts");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

if (files.length === 0) {
  console.log("No .json files found in content/transcripts. Nothing to seed.");
  process.exit(0);
}

let inserted = 0;
let updated = 0;
let failed = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const t = JSON.parse(raw);

  // Map camelCase from JSON to snake_case columns
  const row = {
    slug: t.slug,
    display_id: t.id ?? "00",
    title: t.title,
    description: t.description,
    expert_role: t.expertRole,
    company_context: t.companyContext,
    company_slug: t.companySlug,
    topic_slug: t.topicSlug,
    topic_label: t.topicLabel,
    industry_slugs: t.industrySlugs ?? [],
    word_count: t.wordCount ?? 0,
    preview: t.preview ?? "",
    gated_teaser: t.gatedTeaser ?? "",
    gated_content: t.gatedContent ?? "",
    related_slugs: t.relatedSlugs ?? [],
    primary_kw: t.primaryKW ?? "",
    status: t.status ?? "published",
    compliance_confirmed: t.complianceConfirmed ?? true,
    published_at: t.publishedAt
      ? new Date(t.publishedAt).toISOString()
      : new Date().toISOString(),
  };

  const { data: existing } = await supabase
    .from("transcripts")
    .select("slug")
    .eq("slug", t.slug)
    .maybeSingle();

  const { error } = await supabase.from("transcripts").upsert(row, { onConflict: "slug" });

  if (error) {
    console.error(`  ✗ ${t.slug}: ${error.message}`);
    failed++;
  } else {
    if (existing) {
      console.log(`  ↻ updated  ${t.slug}`);
      updated++;
    } else {
      console.log(`  + inserted ${t.slug}`);
      inserted++;
    }
  }
}

console.log(
  `\n✓ Seed complete — ${inserted} inserted, ${updated} updated, ${failed} failed.`,
);
process.exit(failed > 0 ? 1 : 0);
