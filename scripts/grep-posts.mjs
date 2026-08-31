// READ-ONLY. Search post bodies in Supabase for a pattern.
//
// Useful for auditing whether a claim, figure, or citation habit appears in
// content that is already live, and for finding every post that repeats a
// figure once it turns out to be wrong.
//
// Usage:
//   node --env-file=.env.local scripts/grep-posts.mjs --pattern="44[,.]754"
//   node --env-file=.env.local scripts/grep-posts.mjs --pattern="foo" --scope=all --context=120
//
// --scope: live (default) | future | all
import { createClient } from "@supabase/supabase-js";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.join("=") || true];
  }),
);
if (!args.pattern) {
  console.error('Usage: node --env-file=.env.local scripts/grep-posts.mjs --pattern="regex"');
  process.exit(1);
}

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const today = new Date().toISOString().slice(0, 10);
const { data, error } = await sb.from("posts").select("slug, body, published_at, status");
if (error) {
  console.error(error);
  process.exit(1);
}

const scope = args.scope || "live";
const pool = data.filter((r) => {
  const d = r.published_at.slice(0, 10);
  if (scope === "all") return true;
  if (scope === "future") return d > today;
  return r.status === "published" && d <= today;
});

const re = new RegExp(args.pattern, "gi");
const ctxLen = Number(args.context || 100);
let total = 0;
for (const p of pool) {
  const body = p.body || "";
  const m = [...body.matchAll(re)];
  if (!m.length) continue;
  total += m.length;
  console.log(`\n${p.slug}  (${p.published_at.slice(0, 10)}, ${m.length} hit${m.length > 1 ? "s" : ""})`);
  for (const hit of m.slice(0, 3)) {
    const i = hit.index;
    console.log(`   …${body.slice(Math.max(0, i - ctxLen), i + ctxLen).replace(/\s+/g, " ")}…`);
  }
}
console.log(`\n${total} match(es) across ${pool.length} ${scope} posts.`);
