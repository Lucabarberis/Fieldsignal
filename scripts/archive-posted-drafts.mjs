// Move drafts that have actually been published into content/blog-drafts/_posted/,
// so the working folders only ever show what still needs doing.
//
// A draft counts as posted when its title matches a post in the database whose
// status is `published`. Matching is by TITLE, not filename: the filename is a
// Surfer keyword slug ("surfer-content-editor-net promoter score-30-08-2026.md")
// and carries no reliable link to the published slug.
//
// The publish manifest, where one exists, is authoritative and is consulted
// first -- it records the exact file -> slug mapping used at publish time.
//
// SAFETY: dry-run by default. Nothing moves without --apply. Files are moved,
// never deleted, and a name collision in _posted/ aborts rather than overwrites.
//
//   node --env-file=.env.local scripts/archive-posted-drafts.mjs
//   node --env-file=.env.local scripts/archive-posted-drafts.mjs --apply
//   node --env-file=.env.local scripts/archive-posted-drafts.mjs --dir="FR Content" --apply

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const argv = process.argv.slice(2);
const apply = argv.includes("--apply");
const dirArg = argv.find((a) => a.startsWith("--dir="));
const onlyDir = dirArg ? dirArg.slice(6) : null;

const ROOT = "content/blog-drafts";
const POSTED = path.join(ROOT, "_posted");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing env. Run with: node --env-file=.env.local scripts/archive-posted-drafts.mjs");
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

// ── Every published post, by normalised title ──────────────────────────
let rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await sb
    .from("posts")
    .select("slug, title, status, language")
    .range(from, from + 999);
  if (error) {
    console.error("query failed:", error.message);
    process.exit(1);
  }
  rows = rows.concat(data);
  if (data.length < 1000) break;
}
const norm = (s) =>
  (s ?? "")
    .toLowerCase()
    .replace(/[‘’“”«»]/g, "")
    .replace(/\s+/g, " ")
    .trim();
const publishedByTitle = new Map();
for (const r of rows) {
  if (r.status === "published") publishedByTitle.set(norm(r.title), r);
}

// ── The manifest, if present: exact file -> slug from publish time ─────
const manifestPath = "scripts/data/publish-manifest.json";
const bySlug = new Map(rows.filter((r) => r.status === "published").map((r) => [r.slug, r]));
const manifestFiles = new Map();
if (fs.existsSync(manifestPath)) {
  for (const m of JSON.parse(fs.readFileSync(manifestPath, "utf8"))) {
    const hit = bySlug.get(m.slug);
    if (hit) manifestFiles.set(m.file, hit);
  }
}

/** First markdown H1 in the file. */
function titleOf(text) {
  const m = text.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

/** Draft files as paths relative to ROOT, skipping the archive folders. */
function drafts(dir = "") {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap((e) => {
    const rel = dir ? `${dir}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (e.name.startsWith("_")) return [];
      return drafts(rel);
    }
    return e.name.endsWith(".md") ? [rel] : [];
  });
}

const files = drafts().filter((f) => !onlyDir || f.startsWith(`${onlyDir}/`));
const moves = [];
const unmatched = [];

for (const rel of files) {
  const viaManifest = manifestFiles.get(rel);
  const text = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const title = titleOf(text);
  const hit = viaManifest ?? (title ? publishedByTitle.get(norm(title)) : null);
  if (!hit) {
    unmatched.push({ rel, title: title ?? "(no H1)" });
    continue;
  }
  moves.push({ rel, slug: hit.slug, lang: hit.language, via: viaManifest ? "manifest" : "title" });
}

// ── Refuse to overwrite ────────────────────────────────────────────────
const collisions = moves.filter((m) => fs.existsSync(path.join(POSTED, m.rel)));
if (collisions.length) {
  console.error(`ABORT: ${collisions.length} file(s) already exist in _posted/:`);
  for (const c of collisions.slice(0, 10)) console.error("   " + c.rel);
  process.exit(1);
}

const byDir = {};
for (const m of moves) {
  const d = path.dirname(m.rel) === "." ? "(root)" : path.dirname(m.rel);
  byDir[d] = (byDir[d] ?? 0) + 1;
}

console.log(`drafts scanned : ${files.length}`);
console.log(`published      : ${moves.length}   (manifest: ${moves.filter((m) => m.via === "manifest").length}, title match: ${moves.filter((m) => m.via === "title").length})`);
console.log(`not yet posted : ${unmatched.length}\n`);
console.log("would move, by folder:");
for (const [d, n] of Object.entries(byDir).sort()) console.log(`   ${d.padEnd(14)} ${n}`);

if (unmatched.length) {
  console.log(`\nstaying put (not found published):`);
  for (const u of unmatched.slice(0, 15)) console.log(`   ${u.rel}`);
  if (unmatched.length > 15) console.log(`   …and ${unmatched.length - 15} more`);
}

if (!apply) {
  console.log("\nDRY RUN. Nothing moved. Re-run with --apply.");
  process.exit(0);
}

for (const m of moves) {
  const dest = path.join(POSTED, m.rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(path.join(ROOT, m.rel), dest);
}
console.log(`\nMOVED ${moves.length} file(s) into ${POSTED}/`);
