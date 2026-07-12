import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { ogAlt } from "@/lib/og";

/**
 * Page metadata helper. Centralises title/meta construction so every
 * page complies with the SEO brief §2.2 (title ≤60 chars) and §2.3
 * (one-sentence meta, one CTA-style closer with a concrete number
 * where possible).
 *
 * Usage in any page.tsx:
 *
 *   import { pageMetadata } from "@/lib/seo";
 *   export const metadata = pageMetadata({
 *     title: "Compliance Framework",
 *     description: "UK and EU data protection, MNPI controls…",
 *     path: "/compliance",
 *   });
 */
type Args = {
  title: string;          // page-specific title (template adds " | FieldSignal")
  description: string;    // meta description, 140–160 chars target
  path: string;           // canonical path, e.g. "/compliance"
  noindex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: Args): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = {
    url: "/og",
    width: 1200,
    height: 630,
    alt: ogAlt,
  };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${SITE.name}`,
      description,
      siteName: SITE.name,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: ["/og"],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
