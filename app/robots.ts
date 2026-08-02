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
        // /risefinder is unlisted rather than gated: nothing on the site links
        // to it and it is absent from the sitemap, so it is reachable only by
        // typing the URL. Nothing here enforces that on its own — a crawler can
        // still find a path from a referrer or a shared link — so the page also
        // sets noindex in its own metadata. This entry is the second lock.
        disallow: ["/admin", "/admin/", "/risefinder", "/risefinder/"],
        // Future: disallow gated routes when transcripts library lands
        // disallow: ["/platform/login/", "/api/", "/transcripts/full/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
