// READ-ONLY. Who writes what: author distribution across the blog, and the
// tag mix each author covers.
import { createClient } from "@supabase/supabase-js";
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } });

const { data, error } = await sb.from("posts").select("slug, author, tags, status, published_at");
if (error) { console.error(error); process.exit(1); }
const today = new Date().toISOString().slice(0,10);

const byAuthor = {};
for (const p of data) {
  const a = (p.author ?? "").trim() || "(empty)";
  (byAuthor[a] ??= { total: 0, live: 0, scheduled: 0, tags: {} });
  byAuthor[a].total++;
  if (p.status === "published" && p.published_at.slice(0,10) <= today) byAuthor[a].live++;
  else byAuthor[a].scheduled++;
  for (const t of p.tags ?? []) byAuthor[a].tags[t] = (byAuthor[a].tags[t] || 0) + 1;
}

console.log(`${data.length} posts total\n`);
console.log("AUTHOR".padEnd(22), "TOTAL".padStart(6), "LIVE".padStart(6), "SCHED".padStart(6), "  TOP TAGS");
for (const [a, v] of Object.entries(byAuthor).sort((x,y) => y[1].total - x[1].total)) {
  const top = Object.entries(v.tags).sort((x,y)=>y[1]-x[1]).slice(0,5).map(([t,c])=>`${t}(${c})`).join(" ");
  console.log(a.padEnd(22), String(v.total).padStart(6), String(v.live).padStart(6), String(v.scheduled).padStart(6), " ", top || "(no tags)");
}

const allTags = {};
for (const p of data) for (const t of p.tags ?? []) allTags[t] = (allTags[t]||0)+1;
console.log(`\ndistinct authors: ${Object.keys(byAuthor).length}`);
console.log(`distinct tags   : ${Object.keys(allTags).length}`);
console.log(`tag totals      :`, Object.entries(allTags).sort((a,b)=>b[1]-a[1]).map(([t,c])=>`${t}=${c}`).join("  "));
const untagged = data.filter(p => !(p.tags ?? []).length).length;
console.log(`posts with no tags: ${untagged}`);
