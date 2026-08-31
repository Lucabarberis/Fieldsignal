// READ-ONLY. Who actually gets the byline on each post.
//
// The `author` column is legacy and reads "Miles" on every row; the byline a
// reader sees is derived editorially from the post's tags in
// content/data/authors.ts. This mirrors that logic so we can see the real
// distribution and spot posts landing on the wrong beat.
import { createClient } from "@supabase/supabase-js";

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } });

const BEAT_OWNER = {
  compliance: "Phosia Chenangat (Head of Compliance)",
  positioning: "Miles O'Sullivan (CEO / Founder)",
  vendor: "Guildy Harvey (Senior Researcher)",
  diligence: "Adrian S Wibowo (Senior Researcher)",
  methods: "Francisca Florin (Senior Researcher)",
};
const VENDOR_TAGS = new Set(["alternatives","expert-networks","expert-network","alphasense","tegus","glg","guidepoint","third-bridge","slingshot","prosapient","newtonx","mosaic","lynk","inex-one","atheneum","deepbench","visasq","maven","coleman","capvision","catalant","consulting","transcripts","vendor-comparison","competitive-intelligence"]);
const DILIGENCE_TAGS = new Set(["due-diligence","m-and-a","private-equity","equity-research","corporate-development","hedge-funds","sectors","pharmaceutical","pharma","healthcare","technology","semiconductor","automotive","energy","retail","cpg","ecommerce","real-estate","defense","climate-tech","financial-services","insurance","esg"]);
const POSITIONING = /best-expert-networks|glg-alternatives-which|expert-networks?-in-20|without-(the-)?six-figure-retainer|expert-call-access-without|expert-call-transcripts-without|expert-network-consulting-without|expert-calls?-for-[a-z-]+-without/;

function postBeat(slug, tags = []) {
  if (tags.includes("compliance")) return "compliance";
  if (POSITIONING.test(slug) || tags.includes("founders")) return "positioning";
  const primary = tags[0] ?? "";
  if (VENDOR_TAGS.has(primary)) return "vendor";
  if (DILIGENCE_TAGS.has(primary)) return "diligence";
  return "methods";
}

const { data, error } = await sb.from("posts").select("slug, tags, status, published_at");
if (error) { console.error(error); process.exit(1); }
const today = new Date().toISOString().slice(0, 10);

const counts = {};
const untagged = [];
for (const p of data) {
  const tags = p.tags ?? [];
  const beat = postBeat(p.slug, tags);
  (counts[beat] ??= { total: 0, live: 0 });
  counts[beat].total++;
  if (p.status === "published" && p.published_at.slice(0, 10) <= today) counts[beat].live++;
  if (!tags.length) untagged.push(p.slug);
}

console.log(`${data.length} posts\n`);
console.log("BEAT".padEnd(13), "BYLINE".padEnd(40), "TOTAL".padStart(6), "LIVE".padStart(6));
for (const [beat, v] of Object.entries(counts).sort((a, b) => b[1].total - a[1].total)) {
  console.log(beat.padEnd(13), BEAT_OWNER[beat].padEnd(40), String(v.total).padStart(6), String(v.live).padStart(6));
}
console.log(`\nposts with no tags (default to the methods beat): ${untagged.length}`);
for (const s of untagged) console.log(`   ${s}`);
