// Mechanical cleanup for Surfer drafts.
//
// Only the fixes that need NO editorial judgement live here. Anything that
// touches prose meaning -- CTA rewording, citation checks, statistics --
// stays with a human or an agent, because a regex that rewrites a sentence
// in a language it cannot read is how you ship nonsense at scale.
//
// SAFETY: dry-run by default. Nothing is written without --apply.
//
//   node scripts/clean-surfer-drafts.mjs "content/blog-drafts/FR Content"
//   node scripts/clean-surfer-drafts.mjs "content/blog-drafts/FR Content" --apply
//   node scripts/clean-surfer-drafts.mjs <dir> --only=a.md,b.md --apply

import fs from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const dir = argv.find((a) => !a.startsWith("--"));
const apply = argv.includes("--apply");
const onlyArg = argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? new Set(onlyArg.slice(7).split(",")) : null;

if (!dir) {
  console.error("Usage: node scripts/clean-surfer-drafts.mjs <dir> [--apply] [--only=a.md,b.md]");
  process.exit(1);
}

/** Stock photography on Surfer's CDN. Never used; external host we don't control. */
const SURFER_IMG = /!\[[\s\S]*?\]\([^)]*images\.surferseo\.art[^)]*\)[ \t]*/g;

/** AI-generation fingerprint left on outbound links. */
const UTM = /[?&]utm_source=openai\b/g;

/**
 * Links to the retired fieldsignal.xyz domain. Every target was verified as
 * non-existent, so these are unlinked rather than repointed -- there is no
 * article to point at. Keeps the anchor text, drops the link.
 */
const DEAD_DOMAIN_LINK = /\[([^\]]+)\]\(https?:\/\/(?:www\.)?fieldsignal\.xyz\/[^)]*\)/g;

/** A table row butted against the next block renders as one broken blob. */
function fixTableRunOns(text) {
  const lines = text.split("\n");
  const out = [];
  let fixed = 0;
  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    const cur = lines[i].trim();
    const next = (lines[i + 1] ?? "").trim();
    if (cur.startsWith("|") && next && !next.startsWith("|")) {
      out.push("");
      fixed++;
    }
  }
  return { text: out.join("\n"), fixed };
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .filter((f) => !only || only.has(f))
  .sort();

const totals = { images: 0, utm: 0, deadLinks: 0, tables: 0, blankRuns: 0 };
let changedFiles = 0;

for (const f of files) {
  const p = path.join(dir, f);
  const before = fs.readFileSync(p, "utf8");
  let s = before;

  const images = (s.match(SURFER_IMG) ?? []).length;
  s = s.replace(SURFER_IMG, "");

  const utm = (s.match(UTM) ?? []).length;
  s = s.replace(UTM, "");

  const deadLinks = (s.match(DEAD_DOMAIN_LINK) ?? []).length;
  s = s.replace(DEAD_DOMAIN_LINK, "$1");

  const t = fixTableRunOns(s);
  s = t.text;

  // Removing an image can leave three blank lines behind.
  const beforeCollapse = s;
  s = s.replace(/\n{3,}/g, "\n\n");
  const blankRuns = beforeCollapse === s ? 0 : 1;

  const touched = images + utm + deadLinks + t.fixed + blankRuns;
  if (touched === 0) continue;

  changedFiles++;
  totals.images += images;
  totals.utm += utm;
  totals.deadLinks += deadLinks;
  totals.tables += t.fixed;
  totals.blankRuns += blankRuns;

  console.log(
    `${f}\n   images:${images}  utm:${utm}  deadLinks:${deadLinks}  tableRunOns:${t.fixed}`,
  );
  if (apply) fs.writeFileSync(p, s);
}

console.log(
  `\n${apply ? "APPLIED" : "DRY RUN"} — ${changedFiles}/${files.length} files\n` +
    `  stock images removed   : ${totals.images}\n` +
    `  utm params stripped    : ${totals.utm}\n` +
    `  dead links unlinked    : ${totals.deadLinks}\n` +
    `  table run-ons fixed    : ${totals.tables}`,
);
if (!apply) console.log("\nRe-run with --apply to write.");
