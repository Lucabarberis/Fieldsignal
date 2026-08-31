// Publish fixed drafts from a reviewed manifest.
//
// Reads scripts/data/publish-manifest.json (see scripts/prepare-drafts.mjs),
// validates every row, then inserts each post with its language, tags and
// schedule date.
//
// SAFETY: dry-run by default. Nothing is written without --apply.
// Refuses to run at all if the language column is missing, if any row fails
// validation, or if a slug already exists — so a half-prepared manifest
// cannot publish a subset and leave you guessing which.
//
//   node --env-file=.env.local scripts/publish-drafts.mjs
//   node --env-file=.env.local scripts/publish-drafts.mjs --apply
//   node --env-file=.env.local scripts/publish-drafts.mjs --lang=de --limit=1 --apply

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.join("=") || true];
  }),
);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing env. Run with: node --env-file=.env.local scripts/publish-drafts.mjs");
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

// ── Preflight: does the language column exist? ─────────────────────
// Publishing German as English is the exact failure this whole change
// exists to prevent, so refuse rather than fall back.
{
  const { error } = await sb.from("posts").select("slug, language").limit(1);
  if (error) {
    console.error("PREFLIGHT FAILED: cannot read posts.language —", error.message);
    console.error("Run supabase/posts-language.sql first. Refusing to publish.");
    process.exit(1);
  }
}

const manifestPath = args.manifest ?? "scripts/data/publish-manifest.json";
const rows = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  .filter((r) => (args.lang ? r.language === args.lang : true));

const LANGS = new Set(["en", "de", "fr", "ja"]);
const problems = [];
const seen = new Set();

for (const [i, r] of rows.entries()) {
  const where = `row ${i} (${r.file ?? "?"})`;
  if (!r.title) problems.push(`${where}: missing title`);
  if (!r.slug) problems.push(`${where}: missing slug`);
  if (!r.description) problems.push(`${where}: missing description`);
  if (!Array.isArray(r.tags) || r.tags.length === 0)
    problems.push(`${where}: no tags — the byline would silently default to the methods author`);
  if (!LANGS.has(r.language)) problems.push(`${where}: bad language "${r.language}"`);
  // Either a bare date (how the English backlog was written) or a full ISO
  // timestamp — the DE/FR schedule carries 06:00/13:00 UTC slots so posts
  // land at 08:00 and 15:00 Milan time.
  if (!/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/.test(r.publishedAt ?? ""))
    problems.push(`${where}: publishedAt must be YYYY-MM-DD or a full ISO timestamp`);
  if (seen.has(r.slug)) problems.push(`${where}: duplicate slug "${r.slug}" within the manifest`);
  seen.add(r.slug);
  const body = path.join("content/blog-drafts", r.file ?? "");
  if (!r.file || !fs.existsSync(body)) problems.push(`${where}: draft file not found`);
}

// Slug collisions against what is already published.
if (seen.size) {
  const { data: existing, error } = await sb
    .from("posts").select("slug").in("slug", [...seen].filter(Boolean));
  if (error) { console.error(error); process.exit(1); }
  for (const e of existing ?? []) problems.push(`slug already exists in the database: "${e.slug}"`);
}

const limited = args.limit ? rows.slice(0, Number(args.limit)) : rows;

console.log(`manifest : ${manifestPath}`);
console.log(`rows     : ${rows.length}${args.limit ? ` (publishing first ${limited.length})` : ""}`);
if (problems.length) {
  console.error(`\nREFUSING TO PUBLISH — ${problems.length} problem(s):`);
  for (const p of problems.slice(0, 40)) console.error(`  ${p}`);
  if (problems.length > 40) console.error(`  …and ${problems.length - 40} more`);
  process.exit(1);
}

console.log(`\nvalidation: OK\n`);
for (const r of limited.slice(0, 6))
  console.log(`  ${r.publishedAt}  ${r.language}  ${r.slug}`);
if (limited.length > 6) console.log(`  … and ${limited.length - 6} more`);

if (!args.apply) {
  console.log(`\nDRY RUN. Nothing written. Re-run with --apply to publish.`);
  process.exit(0);
}

let ok = 0, failed = 0;
for (const r of limited) {
  const raw = fs.readFileSync(path.join("content/blog-drafts", r.file), "utf8");
  // Strip the leading H1 — the page renders the title from the column, so
  // leaving it in the body would print it twice.
  const body = raw.replace(/^#\s+.*\n+/, "");
  const { error } = await sb.from("posts").insert({
    slug: r.slug,
    title: r.title,
    description: r.description,
    body,
    author: r.author ?? "FieldSignal Team",
    tags: r.tags,
    status: r.status ?? "published",
    language: r.language,
    published_at: r.publishedAt,
  });
  if (error) { failed++; console.error(`FAIL ${r.slug}: ${error.message}`); }
  else { ok++; console.log(`published ${r.publishedAt} ${r.language} ${r.slug}`); }
}
console.log(`\nDONE. published=${ok} failed=${failed}`);
