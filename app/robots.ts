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
        // /risefinder IS NOT LISTED HERE, and must not be. It moved to
        // risefinder.co on 8 September 2026 and its 31 old URLs are 301s now.
        // A crawler has to be allowed to FETCH a redirect in order to follow
        // it, so disallowing the old paths would strand every one of them
        // mid-move: the redirect would exist and nothing would ever read it.
        disallow: ["/admin", "/admin/"],
        // Future: disallow gated routes when transcripts library lands
        // disallow: ["/platform/login/", "/api/", "/transcripts/full/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
