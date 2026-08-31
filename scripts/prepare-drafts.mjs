// Build a reviewable publish manifest from the fixed German/French drafts.
//
// Publishing needs five things a markdown file does not carry: slug, meta
// description, tags, language and a publish date. This derives what it can,
// leaves the rest blank for a human, and writes a JSON manifest you edit and
// then hand to scripts/publish-drafts.mjs.
//
// Nothing is written to the database here. This only reads drafts.
//
//   node scripts/prepare-drafts.mjs                      # all fixed drafts
//   node scripts/prepare-drafts.mjs --lang=de --limit=14
//   node scripts/prepare-drafts.mjs --start=2026-09-01 --per-day=1
//
// A draft counts as FIXED when it no longer carries the original mailto CTA
// (every processed file had it replaced with the contact URL). Unprocessed
// drafts are skipped and counted, never silently included.

import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.join("=") || true];
  }),
);

const ROOT = path.resolve("content/blog-drafts");
const DIRS = { de: "DE Content", fr: "FR Content" };

/**
 * Slug from a German or French title.
 *
 * The repo's own slugify strips diacritics via NFKD, which turns "für" into
 * "fur" and "Umsatz-Prüfung" into "prufung". That is wrong for German: the
 * conventional transliteration is ae/oe/ue/ss, and it is what German readers
 * and search engines expect. We transliterate FIRST, then fall through to the
 * same normalisation the rest of the codebase uses, so the result stays
 * ASCII-safe and consistent with existing slugs.
 */
function slugify(input) {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

function addDays(iso, n) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}


/**
 * Propose tags from the draft's own filename keyword.
 *
 * The FIRST tag selects the byline via content/data/authors.ts, so a wrong
 * first tag silently publishes a due-diligence article under the methods
 * author. These are proposals for a human to confirm, not a substitute for
 * reading the piece.
 */
function proposeTags(filename) {
  const k = filename.toLowerCase();
  const has = (...w) => w.some((x) => k.includes(x));

  // Compliance takes precedence — it is an editorial requirement, not a topic.
  if (has("compliance", "geldwäsche", "lksg", "supply chain", "esg due")) return ["compliance", "due-diligence"];
  if (has("due diligence", "due-diligence", "diligence", "datenraum", "vendor due")) return ["due-diligence", "m-and-a"];
  if (has("m a", "m&a", "merger")) return ["m-and-a", "due-diligence"];
  if (has("glg", "alphasight", "alphasense", "third bridge", "guidepoint", "tegus",
          "capvision", "atheneum", "expertennetzwerk", "expert network")) return ["expert-networks", "alternatives"];
  if (has("wettbewerb", "konkurrenz", "veille", "benchmark", "competitive", "positionierung",
          "marken", "usp")) return ["competitive-intelligence", "methods"];
  if (has("étude de marché", "marktstudie", "marktanalyse", "marktforschung", "markt",
          "analyse de marché", "panel", "questionnaire", "umfrage", "befragung",
          "fokusgruppe", "qualitative", "quantitative", "zielgruppe", "segment",
          "persona", "kunden")) return ["market-research", "methods"];
  if (has("preis", "pricing", "tarif")) return ["pricing", "methods"];
  if (has("vertrieb", "sales", "verkauf", "lead", "funnel", "crm", "upsell",
          "cross selling", "angebot", "social selling", "umsatz")) return ["methods", "buyers"];
  return ["methods"];
}

const rows = [];
const skipped = { de: 0, fr: 0 };

for (const [lang, dir] of Object.entries(DIRS)) {
  if (args.lang && args.lang !== lang) continue;
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) continue;
  for (const fn of fs.readdirSync(full).sort()) {
    if (!fn.endsWith(".md")) continue;
    const body = fs.readFileSync(path.join(full, fn), "utf8");

    if (body.includes("mailto:")) { skipped[lang]++; continue; }

    const h1 = body.split("\n").find((l) => l.startsWith("# "));
    const title = h1 ? h1.replace(/^#\s+/, "").trim() : "";

    // First substantial paragraph, as a starting point for the meta
    // description. Deliberately NOT auto-truncated to 160 chars — a
    // description cut mid-sentence is worse than a blank one a human writes.
    const firstPara = body
      .split("\n")
      .find((l) => l.trim().length > 80 && !l.startsWith("#") && !l.startsWith("!") && !l.startsWith("|") && !l.startsWith("*"))
      ?.trim() ?? "";

    rows.push({
      file: `${dir}/${fn}`,
      language: lang,
      title,
      slug: title ? slugify(title) : "",
      description: "",            // WRITE THIS — see descriptionHint
      descriptionHint: firstPara.slice(0, 240),
      tags: proposeTags(fn),      // REVIEW THIS — first tag picks the byline
      publishedAt: "",            // filled below if --start given
      status: "published",
    });
  }
}

// ── Scheduling ────────────────────────────────────────────────────
//
// The blog's established slots are 06:00 and 13:00 UTC — 08:00 and 15:00 in
// Milan under CEST. Thirty-six posts from 26 May to 13 June 2026 use exactly
// this pattern, two per day. Everything published since was created date-only,
// which Postgres stores as 00:00 UTC, i.e. 02:00 Milan. That was drift, not a
// decision, so we restore the real slots here.
//
// Note the DST caveat: Milan is UTC+2 (CEST) until the last Sunday of October,
// then UTC+1 (CET). These slots are written in UTC, so after the switch they
// land at 07:00 and 14:00 Milan. Shift the UTC times by an hour in late
// October if the local clock time matters more than consistency.
const SLOTS_UTC = ["06:00:00", "13:00:00"];

const perDay = Math.min(Number(args["per-day"] ?? 2), SLOTS_UTC.length);

// ── Interleave languages ──────────────────────────────────────────
//
// Ordering by filename publishes all 105 German drafts first and all 32
// French afterwards — two months of one market before the other starts.
// Instead, spread the smaller set evenly through the larger one so both
// markets accumulate from day one. With 105 DE and 32 FR that puts a French
// post in roughly every fourth slot.
// ── Defer unresolved drafts ───────────────────────────────────────
//
// Nine drafts still describe client engagements as "anonymisiert"/"anonymisé",
// which asserts a real project exists. Until that is confirmed or relabelled
// they should not lead the launch, so they are pushed to the back of the run —
// buying weeks to decide without holding up the schedule.
{
  const deferred = [], rest = [];
  for (const r of rows) {
    const body = fs.readFileSync(path.join(ROOT, r.file), "utf8");
    (/anonymisiert|anonymisé/i.test(body) ? deferred : rest).push(r);
  }
  if (deferred.length) {
    rows.length = 0;
    rows.push(...rest, ...deferred);
    console.log(`deferred to end of run : ${deferred.length} drafts with unconfirmed case studies`);
  }
}

if (!args["no-interleave"]) {
  // Interleave only the head; deferred drafts stay pinned at the tail.
  const deferredCount = rows.filter((r) =>
    /anonymisiert|anonymisé/i.test(fs.readFileSync(path.join(ROOT, r.file), "utf8"))).length;
  const tail = deferredCount ? rows.splice(rows.length - deferredCount, deferredCount) : [];
  const byLang = {};
  for (const r of rows) (byLang[r.language] ??= []).push(r);
  const langs = Object.keys(byLang).sort((a, b) => byLang[b].length - byLang[a].length);
  if (langs.length > 1) {
    const total = rows.length;
    // Fractional cursor per language: each step, take from whichever language
    // is furthest behind its target share. Keeps the mix even at every prefix,
    // not merely overall.
    const target = Object.fromEntries(langs.map((l) => [l, byLang[l].length / total]));
    const taken = Object.fromEntries(langs.map((l) => [l, 0]));
    const out = [];
    for (let i = 0; i < total; i++) {
      let pick = null, worst = Infinity;
      for (const l of langs) {
        if (!byLang[l].length) continue;
        const deficit = taken[l] - target[l] * i;   // most negative = furthest behind
        if (deficit < worst) { worst = deficit; pick = l; }
      }
      out.push(byLang[pick].shift());
      taken[pick]++;
    }
    rows.length = 0;
    rows.push(...out);
  }
  if (tail.length) rows.push(...tail);
}

if (args.start) {
  const limit = args.limit ? Number(args.limit) : rows.length;
  rows.slice(0, limit).forEach((r, i) => {
    const day = addDays(args.start, Math.floor(i / perDay));
    const slot = SLOTS_UTC[i % perDay];
    r.publishedAt = `${day}T${slot}+00:00`;
    r.publishedAtMilan = `${day} ${String((Number(slot.slice(0,2)) + 2) % 24).padStart(2,"0")}:${slot.slice(3,5)} CEST`;
  });
}

const out = args.out ?? "scripts/data/publish-manifest.json";
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(rows, null, 2));

console.log(`fixed drafts found : ${rows.length}  (de=${rows.filter(r=>r.language==="de").length}, fr=${rows.filter(r=>r.language==="fr").length})`);
console.log(`skipped, not fixed : de=${skipped.de}, fr=${skipped.fr}`);
console.log(`manifest written   : ${out}`);
console.log(`\nBefore publishing, fill in for each row:`);
console.log(`  description — 150-160 chars, in the post's own language.`);
console.log(`  tags        — the FIRST tag picks the byline via content/data/authors.ts:`);
console.log(`                due-diligence / m-and-a / private-equity / sectors -> Adrian`);
console.log(`                alternatives / expert-networks / competitive-intelligence -> Guildy`);
console.log(`                compliance (any position)                          -> Phosia`);
console.log(`                anything else                                      -> Francisca`);
console.log(`                An untagged post silently defaults to Francisca.`);
const missingTitle = rows.filter((r) => !r.title);
if (missingTitle.length) {
  console.log(`\nWARNING: ${missingTitle.length} draft(s) have no H1 and need a title by hand:`);
  for (const r of missingTitle) console.log(`   ${r.file}`);
}
const dupes = Object.entries(
  rows.reduce((m, r) => ((m[r.slug] = (m[r.slug] || 0) + 1), m), {}),
).filter(([s, n]) => s && n > 1);
if (dupes.length) {
  console.log(`\nWARNING: duplicate slugs — these would collide on insert:`);
  for (const [s, n] of dupes) console.log(`   ${s} (${n}x)`);
}
