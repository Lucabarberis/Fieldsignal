import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

/**
 * Shared Open Graph / Twitter card renderer.
 *
 * Imported by `app/opengraph-image.tsx` and `app/twitter-image.tsx` so the
 * social preview (the image that appears when a FieldSignal link is shared on
 * LinkedIn, Slack, X, iMessage, etc.) is defined once and applied site-wide.
 *
 * Editorial brand treatment per the FieldSignal system: paper ground, ink
 * wordmark, single blue signal rule. Colors mirror lib globals.css tokens.
 */

// Brand tokens (kept in sync with app/globals.css)
const PAPER = "#F2EFE6";
const INK = "#161613";
const INK_2 = "#5A5852";
const BRAND = "#0080FF";
const RULE = "rgba(22, 22, 19, 0.12)";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${SITE.name} — ${SITE.tagline}`;

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: domain marker */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: BRAND,
              marginRight: 18,
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 2,
              color: INK_2,
              textTransform: "uppercase",
            }}
          >
            {SITE.domain}
          </div>
        </div>

        {/* Middle: wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: 1,
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              width: 132,
              height: 6,
              background: BRAND,
              marginTop: 30,
              marginBottom: 30,
            }}
          />
          <div
            style={{
              fontSize: 42,
              color: INK_2,
              lineHeight: 1.15,
              maxWidth: 920,
            }}
          >
            {SITE.tagline}
          </div>
        </div>

        {/* Bottom: positioning line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: `2px solid ${RULE}`,
            paddingTop: 28,
            fontSize: 26,
            color: INK_2,
          }}
        >
          Expert consultations · Panel calls · Surveys — from €500 per call
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
