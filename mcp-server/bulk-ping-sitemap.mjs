#!/usr/bin/env node
/**
 * One-time bulk IndexNow ping for every URL in the live sitemap.
 *
 * Run this AFTER the IndexNow key file is deployed to production —
 * otherwise the verification fetch will 404 and the ping fails.
 *
 *   node mcp-server/bulk-ping-sitemap.mjs
 *
 * Subsequent blog posts are auto-pinged by the MCP create_post handler.
 * This script is for the initial backfill (existing pages + content).
 */

import { pingIndexNow } from "./indexnow.mjs";

const SITEMAP_URL = "https://fieldsignalhq.com/sitemap.xml";

async function main() {
  console.log(`Fetching ${SITEMAP_URL}...`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    console.error(`Failed to fetch sitemap: ${res.status}`);
    process.exit(1);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  console.log(`Found ${urls.length} URLs in sitemap.`);

  // IndexNow accepts up to 10,000 URLs per request — well under for 245.
  console.log("Sending to IndexNow...");
  const result = await pingIndexNow(urls);

  if (result.ok) {
    console.log(`✅ IndexNow accepted ${urls.length} URLs (status ${result.status}).`);
    console.log("Bing/Yandex/DuckDuckGo will re-crawl over the next 24-48h.");
  } else {
    console.error(`❌ IndexNow rejected: status=${result.status ?? "n/a"} error=${result.error ?? "n/a"}`);
    console.error("Common causes:");
    console.error("  - Key file not yet live at https://fieldsignalhq.com/2682ac193c2f84549a65c2122f151bfb.txt");
    console.error("  - Deploy not complete — wait 2 minutes, retry");
    console.error("  - Network error reaching api.indexnow.org");
    process.exit(1);
  }
}

main();
