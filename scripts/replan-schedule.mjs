// Re-plan the DE/FR publishing queue so a new batch interleaves with the
// existing one instead of being appended as a monolingual block.
//
// Safe ONLY while no post in the block has gone live: it rewrites
// published_at across the whole queue. It refuses to touch any post whose
// date has already passed, and prints what it would do unless given --apply.
//
//   node --env-file=.env.local scripts/replan-schedule.mjs
//   node --env-file=.env.local scripts/replan-schedule.mjs --apply

import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const apply = process.argv.includes("--apply");
const NEW_MANIFEST = "scripts/data/new-fr-manifest.json";
const SLOTS = ["06:00:00", "13:00:00"]; // 08:00 / 15:00 Milan while CEST
const START = "2026-09-01";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const nowIso = new Date().toISOString();

// ── Existing queue ─────────────────────────────────────────────────────
let rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await sb
    .from("posts")
    .select("slug, title, language, published_at, status")
    .range(from, from + 999);
  if (error) throw new Error(error.message);
  rows = rows.concat(data);
  if (data.length < 1000) break;
}

const live = rows.filter((r) => r.status === "published" && r.published_at <= nowIso);
const queuedNonEn = rows.filter(
  (r) => r.status === "published" && r.published_at > nowIso && r.language !== "en",
);
const queuedEn = rows.filter(
  (r) => r.status === "published" && r.published_at > nowIso && r.language === "en",
);

const liveNonEn = live.filter((r) => r.language !== "en");
if (liveNonEn.length > 0) {
  console.error(
    `ABORT: ${liveNonEn.length} DE/FR post(s) are already live. Re-planning would ` +
      `change the date of published content. Shift only the future tail instead.`,
  );
  process.exit(1);
}

const incoming = JSON.parse(fs.readFileSync(NEW_MANIFEST, "utf8"));

// ── Interleave by language, proportionally ─────────────────────────────
// A fractional cursor per language keeps the mix even at EVERY prefix of
// the run, rather than only over the whole thing -- so a reader landing in
// week three sees the same balance as one landing in week nine.
function interleave(groups) {
  const total = Object.values(groups).reduce((n, g) => n + g.length, 0);
  const cursor = {};
  const taken = {};
  for (const k of Object.keys(groups)) {
    cursor[k] = 0;
    taken[k] = 0;
  }
  const out = [];
  for (let i = 0; i < total; i++) {
    // pick the language furthest behind its target share
    let best = null;
    let bestDeficit = -Infinity;
    for (const k of Object.keys(groups)) {
      if (taken[k] >= groups[k].length) continue;
      const share = groups[k].length / total;
      const deficit = share * i - taken[k];
      if (deficit > bestDeficit) {
        bestDeficit = deficit;
        best = k;
      }
    }
    out.push(groups[best][taken[best]++]);
  }
  return out;
}

// Within French, the already-queued posts and the incoming batch are also
// interleaved. Concatenating instead would spread French evenly across the
// run but bunch every new article into the final weeks.
const frExisting = queuedNonEn
  .filter((r) => r.language === "fr")
  .map((r) => ({ slug: r.slug, language: "fr", title: r.title, isNew: false }));
const frNew = incoming.map((r) => ({ ...r, isNew: true }));

const pool = {
  de: queuedNonEn.filter((r) => r.language === "de").map((r) => ({ slug: r.slug, language: "de", title: r.title, isNew: false })),
  fr: interleave({ existing: frExisting, incoming: frNew }),
};

const ordered = interleave(pool);

function slotAt(index) {
  const day = new Date(`${START}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() + Math.floor(index / SLOTS.length));
  return `${day.toISOString().slice(0, 10)}T${SLOTS[index % SLOTS.length]}+00:00`;
}

const plan = ordered.map((r, i) => ({ ...r, publishedAt: slotAt(i) }));
const lastDay = plan[plan.length - 1].publishedAt.slice(0, 10);

// English resumes the day after the DE/FR block ends.
const enStart = new Date(`${lastDay}T00:00:00Z`);
enStart.setUTCDate(enStart.getUTCDate() + 1);
const enSorted = [...queuedEn].sort((a, b) => (a.published_at < b.published_at ? -1 : 1));
const enPlan = enSorted.map((r, i) => {
  const day = new Date(enStart);
  day.setUTCDate(day.getUTCDate() + Math.floor(i / SLOTS.length));
  return {
    slug: r.slug,
    from: r.published_at.slice(0, 10),
    publishedAt: `${day.toISOString().slice(0, 10)}T${SLOTS[i % SLOTS.length]}+00:00`,
  };
});

// ── Report ─────────────────────────────────────────────────────────────
const newCount = plan.filter((p) => p.isNew).length;
console.log(`DE/FR block : ${plan.length} posts  (${newCount} new)  ${START} -> ${lastDay}`);
console.log(`English     : ${enPlan.length} posts  ${enPlan[0]?.publishedAt.slice(0, 10)} -> ${enPlan[enPlan.length - 1]?.publishedAt.slice(0, 10)}`);

// language mix per third, to show the interleave actually holds
const third = Math.ceil(plan.length / 3);
for (let t = 0; t < 3; t++) {
  const seg = plan.slice(t * third, (t + 1) * third);
  const fr = seg.filter((s) => s.language === "fr").length;
  console.log(`   third ${t + 1}: ${seg.length} posts, ${fr} FR (${Math.round((fr / seg.length) * 100)}%)`);
}

if (!apply) {
  fs.writeFileSync("scripts/data/replan-preview.json", JSON.stringify({ plan, enPlan }, null, 2));
  console.log("\nDRY RUN. Preview written to scripts/data/replan-preview.json");
  process.exit(0);
}

// ── Apply: existing rows only. New posts are created by publish-drafts. ─
let updated = 0;
let failed = 0;
for (const p of [...plan.filter((x) => !x.isNew), ...enPlan]) {
  const { error } = await sb
    .from("posts")
    .update({ published_at: p.publishedAt })
    .eq("slug", p.slug);
  if (error) {
    failed++;
    console.error(`  FAIL ${p.slug}: ${error.message}`);
  } else updated++;
}
console.log(`\nrescheduled existing: updated=${updated} failed=${failed}`);

// Hand the new rows, with their assigned dates, to the publisher.
const newRows = plan.filter((x) => x.isNew).map(({ isNew, ...r }) => r);
fs.writeFileSync("scripts/data/new-fr-scheduled.json", JSON.stringify(newRows, null, 2));
console.log(`new rows with dates -> scripts/data/new-fr-scheduled.json (${newRows.length})`);
