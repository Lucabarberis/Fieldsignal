// Seed the social hub's Posted ticks.
//
// Post CONTENT lives in content/social/posts.json (in the repo) — it does
// NOT go into Supabase. This only writes the tick state: one row per post
// that is already posted/scheduled. Anything without a row is "todo".
//
// Idempotent: upserts on `key`. Re-running will NOT un-tick anything you
// have ticked in the UI — it only ensures the originally-scheduled posts
// are marked posted.
//
// Prereq: run supabase/social_post_status.sql in the Supabase SQL editor.
//
// Run:  node --env-file=.env.local scripts/seed-social-status.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedFile = path.join(__dirname, "data", "social-status-seed.json");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing env vars. Run with: node --env-file=.env.local scripts/seed-social-status.mjs",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

if (!fs.existsSync(seedFile)) {
  console.error(`Missing seed file: ${seedFile}`);
  process.exit(1);
}

const rows = JSON.parse(fs.readFileSync(seedFile, "utf8")).map((r) => ({
  key: r.key,
  status: r.status,
  updated_at: new Date().toISOString(),
}));

console.log(`Seeding ${rows.length} posted/scheduled ticks…`);

const { error } = await supabase
  .from("social_post_status")
  .upsert(rows, { onConflict: "key" });

if (error) {
  console.error(
    `Failed: ${error.message}\n` +
      "Did you run supabase/social_post_status.sql in the SQL editor first?",
  );
  process.exit(1);
}

const { count } = await supabase
  .from("social_post_status")
  .select("*", { count: "exact", head: true })
  .eq("status", "posted");

console.log(`Done. ${count} posts marked posted. Everything else is "to do".`);
