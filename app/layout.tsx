import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { OrganizationSchema } from "@/components/SchemaOrg";
import { Providers } from "./providers";
import { SITE } from "@/lib/site";

/**
 * Analytics gate — only fire GA on the live production deploy, not on
 * Vercel preview URLs or local dev. This keeps test traffic out of the
 * analytics data.
 *
 *   VERCEL_ENV is set by Vercel automatically:
 *     "production" → fieldsignalhq.com
 *     "preview"    → preview-deploy-*.vercel.app
 *     "development"→ local dev (also: undefined if not on Vercel)
 */
const ENABLE_ANALYTICS = process.env.VERCEL_ENV === "production";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalEntity }],
  keywords: [
    "expert network",
    "primary research",
    "competitive intelligence",
    "expert consultations",
    "due diligence",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    locale: "en_GB",
    images: [
      { url: "/og", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-paper text-ink antialiased">
        {/* GTM noscript fallback — for the ~3% of visitors who block JS.
            Google recommends placing it immediately after the opening <body>. */}
        {ENABLE_ANALYTICS && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <Providers>
          <OrganizationSchema />
          <Masthead />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>

        {/* Google Analytics 4 — production only. PostHog runs in all
            environments (gated by NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
            being set). */}
        {ENABLE_ANALYTICS && (
          <>
            {/* Google Tag Manager — container GTM-56NGKGK4. Empty container
                today; add tags (Facebook Pixel, TikTok, etc.) in the GTM UI
                without redeploying. */}
            <Script id="gtm" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${SITE.gtmId}');
              `}
            </Script>

            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${SITE.gaId}');
              `}
            </Script>

            {/* LinkedIn Insight Tag — partner ID 9177522 */}
            <Script id="linkedin-insight" strategy="afterInteractive">
              {`
                _linkedin_partner_id = "9177522";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                (function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);
                })(window.lintrk);
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src="https://px.ads.linkedin.com/collect/?pid=9177522&fmt=gif"
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
