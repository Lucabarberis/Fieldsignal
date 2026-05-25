// Seed Supabase with the existing MDX blog posts from content/blog/.
// One-shot: reads each .mdx file, parses frontmatter, uploads to the
// `posts` table via the service-role key (bypasses RLS).
//
// Idempotent: uses upsert on the slug primary key.
//
// Run:  node --env-file=.env.local scripts/seed-posts-to-supabase.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(
    "Missing env vars. Run with: node --env-file=.env.local scripts/seed-posts-to-supabase.mjs",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const blogDir = path.join(projectRoot, "content", "blog");
const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

if (files.length === 0) {
  console.log("No .mdx files found in content/blog. Nothing to seed.");
  process.exit(0);
}

let inserted = 0;
let updated = 0;
let failed = 0;

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
  const { data: fm, content } = matter(raw);

  const row = {
    slug,
    title: fm.title ?? slug,
    description: fm.description ?? "",
    body: content.trim(),
    author: fm.author ?? "Miles",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    status: fm.status ?? "published",
    published_at: fm.publishedAt
      ? new Date(fm.publishedAt).toISOString()
      : new Date().toISOString(),
  };

  // Check existence first to print a clean inserted/updated count
  const { data: existing } = await supabase
    .from("posts")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  const { error } = await supabase.from("posts").upsert(row, { onConflict: "slug" });

  if (error) {
    console.error(`  ✗ ${slug}: ${error.message}`);
    failed++;
  } else {
    if (existing) {
      console.log(`  ↻ updated  ${slug}`);
      updated++;
    } else {
      console.log(`  + inserted ${slug}`);
      inserted++;
    }
  }
}

console.log(
  `\n✓ Seed complete — ${inserted} inserted, ${updated} updated, ${failed} failed.`,
);
process.exit(failed > 0 ? 1 : 0);
