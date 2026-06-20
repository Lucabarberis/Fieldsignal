import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * Baseline security headers, applied to every route.
 *
 * Conservative set — does NOT include a Content-Security-Policy, which would
 * need an allowlist for GTM, GA4, the LinkedIn Insight tag and PostHog and
 * risks silently breaking analytics. HSTS is also set by Vercel; declaring it
 * here keeps the config self-documenting.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Allow .mdx files to be treated as routes/imports
  pageExtensions: ["ts", "tsx", "mdx"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog/:slug",
        destination: "/resources/blog/:slug",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here as the blog grows
  // e.g. remarkGfm for tables, remarkSmartypants for typography
});

export default withMDX(nextConfig);
