import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * Baseline security headers, applied to every route.
 *
 * HSTS is also set by Vercel; declaring it here keeps the config
 * self-documenting.
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

/**
 * Content-Security-Policy in REPORT-ONLY mode.
 *
 * Deliberately not enforced yet: a live CSP that missed a source would
 * silently break analytics. Report-only lets the browser flag violations
 * (visible in the console / any report endpoint) without blocking anything,
 * so we can watch for a clean period before promoting it to an enforced
 * `Content-Security-Policy`. Allowlist covers the known third parties:
 * GTM + GA4 (googletagmanager/google-analytics), the LinkedIn Insight tag
 * (licdn / px.ads.linkedin.com), PostHog (*.posthog.com) and Vercel Speed
 * Insights (va.vercel-scripts.com / vitals.vercel-insights.com).
 * 'unsafe-inline' is required by the inline GTM/GA bootstrap and Next's
 * inline hydration; a nonce-based tightening can follow once enforced.
 */
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://snap.licdn.com https://*.posthog.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.posthog.com https://*.google-analytics.com https://www.googletagmanager.com https://px.ads.linkedin.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'self' https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // Allow .mdx files to be treated as routes/imports
  pageExtensions: ["ts", "tsx", "mdx"],
  /**
   * Post diagrams are read from disk by a computed path (lib/diagrams.ts), so
   * output tracing cannot see them and would omit them from the deployed
   * function. Blog posts render on demand (`dynamicParams`, `revalidate`), so
   * without this the diagrams would work locally and silently vanish in
   * production. Keys are route globs; values resolve from the project root.
   */
  outputFileTracingIncludes: {
    "/resources/blog/\\[slug\\]": ["./content/diagrams/**/*.svg"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspReportOnly,
          },
        ],
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
