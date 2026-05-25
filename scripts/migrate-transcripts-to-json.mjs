// Migrates the seed transcripts in content/data/transcripts.ts into
// individual JSON files at content/transcripts/[slug].json.
//
// Idempotent — re-running just regenerates the files.
//
// Run:  node scripts/migrate-transcripts-to-json.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// Dynamic-import the TS module so we don't need a build step. Node 22+
// supports importing TS via tsx loader or --experimental-strip-types.
// We sidestep that by parsing the source directly with regex (the file is
// well-structured) — but it's cleaner to require users run `npx tsx` if
// they want to re-run. For the one-time migration we parse the literal
// array out via Function eval against the source.

const tsSource = fs.readFileSync(
  path.join(projectRoot, "content/data/transcripts.ts"),
  "utf8",
);

// Find the start of the array literal. The declaration line is
// `export const transcripts: readonly Transcript[] = [...]` — so we
// must find the FIRST `[` that comes after `=`, not the `[]` inside
// the type annotation.
const startMatch = tsSource.indexOf("export const transcripts");
const equalsPos = tsSource.indexOf("=", startMatch);
const arrayStart = tsSource.indexOf("[", equalsPos);
// Naive balanced-bracket walk to find matching closing bracket
let depth = 0;
let arrayEnd = -1;
for (let i = arrayStart; i < tsSource.length; i++) {
  const c = tsSource[i];
  if (c === "[") depth++;
  else if (c === "]") {
    depth--;
    if (depth === 0) {
      arrayEnd = i;
      break;
    }
  }
}
if (arrayEnd === -1) {
  console.error("Failed to locate the closing bracket of the transcripts array.");
  process.exit(1);
}

const arrayLiteral = tsSource.slice(arrayStart, arrayEnd + 1);
// Eval inside a function context. TypeScript `as const` and `readonly`
// strip out cleanly since we're only using the resulting runtime value.
const cleaned = arrayLiteral.replace(/\] as const/, "]");

// eslint-disable-next-line no-new-func
const transcripts = new Function(`return (${cleaned});`)();

if (!Array.isArray(transcripts)) {
  console.error("Eval did not produce an array.");
  process.exit(1);
}

const outDir = path.join(projectRoot, "content", "transcripts");
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
for (const t of transcripts) {
  // Add the admin status + compliance flag defaults (seed data is
  // already vetted, so mark it published + compliance-confirmed).
  const record = {
    slug: t.slug,
    id: t.id,
    title: t.title,
    description: t.description,
    expertRole: t.expertRole,
    companyContext: t.companyContext,
    companySlug: t.companySlug,
    topicSlug: t.topicSlug,
    topicLabel: t.topicLabel,
    industrySlugs: t.industrySlugs,
    publishedAt: t.publishedAt,
    wordCount: t.wordCount,
    preview: t.preview,
    gatedTeaser: t.gatedTeaser,
    gatedContent: "",
    relatedSlugs: t.relatedSlugs,
    primaryKW: t.primaryKW,
    status: "published",
    complianceConfirmed: true,
  };
  const file = path.join(outDir, `${t.slug}.json`);
  fs.writeFileSync(file, JSON.stringify(record, null, 2) + "\n", "utf8");
  written++;
}

console.log(`✓ Wrote ${written} transcripts to ${path.relative(projectRoot, outDir)}/`);
