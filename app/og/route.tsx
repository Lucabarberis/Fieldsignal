import { renderOgImage } from "@/lib/og";

/**
 * Site-wide social share card, served at /og.
 *
 * Referenced explicitly from the `pageMetadata` helper (lib/seo.ts) and the
 * root layout so every page — not just the homepage — emits og:image and
 * twitter:image. Served as a plain route handler (rather than the
 * opengraph-image file convention) to avoid per-page openGraph overrides
 * stripping the inherited image. No request input, so it is statically cached.
 */
export const dynamic = "force-static";

export function GET() {
  return renderOgImage();
}
