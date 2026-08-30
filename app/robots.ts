import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.txt. Per the SEO brief §5.2 — allow all crawl, block only
 * gated/internal routes (none yet in Phase 0).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block admin + future gated routes from crawl. Defense in depth;
        // /admin layout also sets robots:{ index:false } at the meta level.
        //
        // /risefinder USED TO BE DISALLOWED HERE. It was unlisted by design:
        // no link to it, absent from the sitemap, noindex in its own metadata.
        // It is now in the masthead and in the sitemap, so the disallow had to
        // go with them — a page linked from every header on the site and then
        // blocked in robots.txt is the configuration that produces "Indexed,
        // though blocked by robots.txt" in Search Console, which is worse than
        // either choice made cleanly.
        disallow: ["/admin", "/admin/"],
        // Future: disallow gated routes when transcripts library lands
        // disallow: ["/platform/login/", "/api/", "/transcripts/full/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
