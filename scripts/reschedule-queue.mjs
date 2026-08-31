// Inspect and re-date the forward publishing queue.
//
// The blog publishes on staggered future `published_at` dates. This script
// audits that queue and can shift a slice of it without touching anything
// already live.
//
// SAFETY: dry-run by default. Nothing is written unless --apply is passed.
// Posts dated today or earlier are never modified.
//
// Audit:  node --env-file=.env.local scripts/reschedule-queue.mjs
// Shift:  node --env-file=.env.local scripts/reschedule-queue.mjs --shift-days=107
// Apply:  node --env-file=.env.local scripts/reschedule-queue.mjs --shift-days=107 --apply

import { createClient } from "@supabase/supabase-js";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing env. Run with: node --env-file=.env.local scripts/reschedule-queue.mjs");
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const today = new Date().toISOString().slice(0, 10);
const addDays = (iso, n) => {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

const { data, error } = await sb
  .from("posts")
  .select("slug, status, published_at")
  .order("published_at", { ascending: true });
if (error) {
  console.error(error);
  process.exit(1);
}

const day = (r) => r.published_at.slice(0, 10);
const future = data.filter((r) => day(r) > today);
const live = data.filter((r) => day(r) <= today && r.status === "published");
const drafts = data.filter((r) => r.status === "draft");

const byDate = {};
for (const r of future) (byDate[day(r)] ??= []).push(r.slug);

console.log(`TODAY            : ${today}`);
console.log(`total rows       : ${data.length}`);
console.log(`live (<= today)  : ${live.length}   <- never touched by this script`);
console.log(`drafts           : ${drafts.length}`);
console.log(`future-dated     : ${future.length}`);
if (future.length) {
  const dates = Object.keys(byDate).sort();
  const counts = dates.map((d) => byDate[d].length);
  console.log(`window           : ${dates[0]} -> ${dates[dates.length - 1]} (${dates.length} dates)`);
  console.log(`per-day          : min ${Math.min(...counts)}, max ${Math.max(...counts)}`);
  console.log(`first 6 days     : ${dates.slice(0, 6).map((d) => `${d}=${byDate[d].length}`).join("  ")}`);
  console.log(`last 6 days      : ${dates.slice(-6).map((d) => `${d}=${byDate[d].length}`).join("  ")}`);
}

// Targeted move: take every post currently on --on=DATE and set it to --set=DATE.
// Used to carve a slice out of a bulk shift without disturbing the rest.
if (args.on && args.set) {
  const sel = data.filter((r) => day(r) === args.on);
  console.log(`\nMOVE ${sel.length} post(s) from ${args.on} -> ${args.set}`);
  for (const r of sel) console.log(`   ${r.slug}`);
  if (!sel.length) process.exit(0);
  if (!args.apply) {
    console.log(`\nDRY RUN. Nothing written. Re-run with --apply to commit.`);
    process.exit(0);
  }
  let n = 0;
  for (const r of sel) {
    const { error: e } = await sb.from("posts").update({ published_at: args.set }).eq("slug", r.slug);
    if (e) console.error(`FAIL ${r.slug}: ${e.message}`);
    else n++;
  }
  console.log(`\nAPPLIED. moved=${n}`);
  process.exit(0);
}

const shift = args["shift-days"] ? Number(args["shift-days"]) : null;
if (!shift) {
  console.log(`\nNo --shift-days given. Audit only, nothing to change.`);
  process.exit(0);
}
if (!Number.isFinite(shift) || shift === 0) {
  console.error(`--shift-days must be a non-zero number`);
  process.exit(1);
}

const moves = future.map((r) => ({ slug: r.slug, from: day(r), to: addDays(day(r), shift) }));
const landing = moves.length ? `${moves[0].to} -> ${moves[moves.length - 1].to}` : "n/a";
console.log(`\nSHIFT ${shift > 0 ? "+" : ""}${shift} days on ${moves.length} future-dated posts`);
console.log(`new window       : ${landing}`);
console.log(`sample:`);
for (const m of moves.slice(0, 4)) console.log(`   ${m.from} -> ${m.to}   ${m.slug}`);
console.log(`   ...`);
for (const m of moves.slice(-2)) console.log(`   ${m.from} -> ${m.to}   ${m.slug}`);

const invalid = moves.filter((m) => m.to <= today);
if (invalid.length) {
  console.error(`\nREFUSING: ${invalid.length} posts would land on or before today. Use a larger shift.`);
  process.exit(1);
}

if (!args.apply) {
  console.log(`\nDRY RUN. Nothing written. Re-run with --apply to commit.`);
  process.exit(0);
}

let ok = 0;
let failed = 0;
for (const m of moves) {
  const { error: e } = await sb.from("posts").update({ published_at: m.to }).eq("slug", m.slug);
  if (e) {
    failed++;
    console.error(`FAIL ${m.slug}: ${e.message}`);
  } else {
    ok++;
  }
}
console.log(`\nAPPLIED. updated=${ok} failed=${failed}`);
