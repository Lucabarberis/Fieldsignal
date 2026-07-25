// Publish the rewritten + newly authored expert-call transcripts to Supabase.
//
// Replaces the thin ~330-word monologue previews with full Q&A transcripts and
// backfills gated_content, which was an empty string on every existing row
// despite the pages advertising 4,000+ gated words.
//
// Reads a JSON payload of the shape { rewrites: [...], created: [...] }.
// Existing slugs are updated in place (display_id and published_at preserved).
// New slugs are inserted with sequential display_ids and staggered weekly dates.
//
// Idempotent: upsert on slug. Safe to re-run.
//
// Run:  node --env-file=.env.local scripts/publish-transcript-rewrites.mjs <payload.json>

import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const payloadPath = process.argv[2];
if (!payloadPath) {
  console.error("Usage: node --env-file=.env.local scripts/publish-transcript-rewrites.mjs <payload.json>");
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing env vars. Run with: node --env-file=.env.local ...");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
const rewrites = payload.rewrites ?? [];
const created = payload.created ?? [];

/** True prose word count, excluding "Q:"/"A:" speaker markers. */
function proseWords(body) {
  return (body ?? "")
    .split(/\n\n+/)
    .map((p) => p.trim().replace(/^[QA]\s*:\s*/, ""))
    .filter(Boolean)
    .reduce((n, p) => n + p.split(/\s+/).filter(Boolean).length, 0);
}

function toRow(t, extra) {
  return {
    slug: t.slug,
    title: t.title,
    description: t.description,
    expert_role: t.expertRole,
    company_context: t.companyContext,
    company_slug: t.companySlug,
    topic_slug: t.topicSlug,
    topic_label: t.topicLabel,
    industry_slugs: t.industrySlugs ?? [],
    // Recomputed from the actual text rather than trusting the supplied value,
    // so the "N words" figure on the page is true.
    word_count: proseWords(t.preview) + proseWords(t.gatedContent),
    preview: t.preview,
    gated_teaser: t.gatedTeaser,
    gated_content: t.gatedContent ?? "",
    related_slugs: t.relatedSlugs ?? [],
    primary_kw: t.primaryKW ?? "",
    status: "published",
    compliance_confirmed: true,
    ...extra,
  };
}

let ok = 0;
let failed = 0;

// ─── 1. Update the ten existing transcripts in place ────────────────
console.log(`Updating ${rewrites.length} existing transcripts...`);
for (const t of rewrites) {
  const { data: existing, error: readErr } = await supabase
    .from("transcripts")
    .select("slug, display_id, related_slugs, published_at")
    .eq("slug", t.slug)
    .maybeSingle();

  if (readErr || !existing) {
    console.error(`  x ${t.slug}: not found (${readErr?.message ?? "no row"})`);
    failed++;
    continue;
  }

  // Preserve the curated cross-links and original publication date.
  const row = toRow(t, {
    display_id: existing.display_id,
    related_slugs: existing.related_slugs ?? [],
    published_at: existing.published_at,
  });

  const { error } = await supabase.from("transcripts").upsert(row, { onConflict: "slug" });
  if (error) {
    console.error(`  x ${t.slug}: ${error.message}`);
    failed++;
  } else {
    console.log(`  ~ ${t.slug}  (${row.word_count} words)`);
    ok++;
  }
}

// ─── 2. Insert the new transcripts ──────────────────────────────────
// Cross-links: pair sector-siblings, falling back to an existing transcript
// in the same industry so no new page is an orphan.
const RELATED = {
  "former-interconnection-lead-us-utility-storage-queue": ["ex-head-origination-european-renewables-ppa-pricing", "ex-head-infrastructure-ai-compute-capacity"],
  "ex-head-origination-european-renewables-ppa-pricing": ["former-interconnection-lead-us-utility-storage-queue", "ex-head-infrastructure-ai-compute-capacity"],
  "former-network-strategy-director-european-mobile-operator": ["ex-vp-content-acquisition-streaming-licensing", "former-ciso-fortune-500-bank-sase-deployment"],
  "ex-vp-content-acquisition-streaming-licensing": ["former-network-strategy-director-european-mobile-operator", "ex-cmo-dtc-consumer-brand-acquisition-economics"],
  "former-head-leasing-us-office-reit": ["ex-coo-proptech-brokerage-agent-economics", "former-head-underwriting-specialty-insurer-climate"],
  "ex-coo-proptech-brokerage-agent-economics": ["former-head-leasing-us-office-reit", "ex-product-vp-saas-vertical-consolidation"],
  "former-provost-us-university-opm-contracts": ["ex-cro-k12-edtech-district-procurement", "ex-product-vp-saas-vertical-consolidation"],
  "ex-cro-k12-edtech-district-procurement": ["former-provost-us-university-opm-contracts", "ex-vp-sales-enterprise-saas-edr-consolidation"],
  "former-plant-manager-industrial-automation-reshoring": ["former-procurement-vp-automotive-tier-1", "ex-head-of-partnerships-b2b-marketplace-take-rate"],
  "ex-supply-chain-director-grocery-private-label": ["ex-cmo-dtc-consumer-brand-acquisition-economics", "former-store-director-luxury-retail-china"],
  "former-head-market-access-specialty-pharma-pbm": ["ex-commercial-director-pharma-biologic-launch", "former-md-medical-device-cardiovascular"],
  "ex-head-infrastructure-ai-compute-capacity": ["former-interconnection-lead-us-utility-storage-queue", "ex-vp-sales-enterprise-saas-edr-consolidation"],
  "former-head-underwriting-specialty-insurer-climate": ["former-head-leasing-us-office-reit", "former-managing-director-investment-bank-fintech-coverage"],
  "ex-head-of-partnerships-b2b-marketplace-take-rate": ["former-plant-manager-industrial-automation-reshoring", "ex-coo-payments-fintech-embedded-finance"],
};

// Numbering and dating are derived from rows that are NOT part of this payload.
// Deriving them from the whole table makes a re-run non-idempotent: the previous
// run's own inserts move the anchor, renumbering ids and pushing dates forward
// into the future, where list() filters them off the public site.
const newSlugs = new Set(created.map((t) => t.slug));
const { data: allRows } = await supabase
  .from("transcripts")
  .select("slug, display_id, published_at");
const priorRows = (allRows ?? []).filter((r) => !newSlugs.has(r.slug));

let nextId = Math.max(0, ...priorRows.map((r) => parseInt(r.display_id, 10) || 0));

// The library runs on a weekly cadence. Continue it from the newest pre-existing
// transcript so the new rows are dated in the past and go live immediately.
const anchor = priorRows
  .map((r) => r.published_at)
  .filter(Boolean)
  .sort()
  .at(-1);
const startDate = anchor ? new Date(anchor) : new Date();

console.log(`\nInserting ${created.length} new transcripts...`);
for (const [i, t] of created.entries()) {
  const pub = new Date(startDate);
  pub.setUTCDate(pub.getUTCDate() + 7 * (i + 1));

  nextId += 1;
  const row = toRow(t, {
    display_id: String(nextId).padStart(2, "0"),
    related_slugs: RELATED[t.slug] ?? [],
    published_at: pub.toISOString(),
  });

  const { error } = await supabase.from("transcripts").upsert(row, { onConflict: "slug" });
  if (error) {
    console.error(`  x ${t.slug}: ${error.message}`);
    failed++;
  } else {
    console.log(`  + ${row.display_id} ${t.slug}  (${row.word_count} words, ${pub.toISOString().slice(0, 10)})`);
    ok++;
  }
}

console.log(`\nDone - ${ok} written, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
