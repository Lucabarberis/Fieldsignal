"use client";

/**
 * Lead form for paid-search landing pages.
 *
 * Visually identical to the site's ContactForm and posts to the same
 * /api/contact endpoint. The difference is the hidden block: every
 * submission carries the keyword that paid for it, so leads arrive
 * already attributed and cost-per-lead can be read per keyword instead
 * of as one blended number.
 *
 *   kw           — landing page slug, known at build time (the keyword)
 *   gclid        — Google's click ID, appended to the ad's landing URL
 *   utm_*        — whatever the ad's tracking template set
 *   landing_path — the page the visitor actually converted on
 *
 * The URL-derived fields fill in on mount rather than being read from
 * searchParams on the server, which keeps these pages statically
 * rendered — page speed is itself a Quality Score input. If JavaScript
 * is unavailable the form still submits; only the attribution is lost.
 */

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const LABEL =
  "block font-mono text-micro uppercase tracking-[0.12em] text-ink-2 mb-2";
const FIELD =
  "w-full bg-paper-3 border border-rule-2 rounded-none appearance-none px-4 py-3 font-sans text-[15px] leading-[1.4] text-ink placeholder:text-ink-3 focus:outline-none focus:border-ink transition-colors";

/** URL params worth carrying through to the lead record. */
const TRACKED = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
] as const;

type Props = {
  /** Landing page slug — the keyword bucket this lead belongs to. */
  slug: string;
  /** Placeholder for the message field, tailored to the keyword. */
  messagePlaceholder: string;
};

export function LpLeadForm({ slug, messagePlaceholder }: Props) {
  const [tracking, setTracking] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {
      landing_path: window.location.pathname,
    };
    for (const key of TRACKED) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 200);
    }
    setTracking(found);
  }, []);

  return (
    <form action="/api/contact" method="POST" className="max-w-3xl">
      {/* honeypot — bots fill it, humans never see it */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* attribution — known at build time */}
      <input type="hidden" name="kw" value={slug} />

      {/* attribution — read from the ad click URL on mount */}
      {Object.entries(tracking).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label htmlFor="lp-name" className={LABEL}>
            Full name
          </label>
          <input
            id="lp-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="lp-company" className={LABEL}>
            Company
          </label>
          <input
            id="lp-company"
            type="text"
            name="company"
            required
            autoComplete="organization"
            placeholder="Your company"
            className={FIELD}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lp-email" className={LABEL}>
            Work email
          </label>
          <input
            id="lp-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@yourcompany.com"
            className={FIELD}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lp-message" className={LABEL}>
            Who do you need to speak with?
          </label>
          <textarea
            id="lp-message"
            name="message"
            required
            rows={5}
            placeholder={messagePlaceholder}
            className={FIELD}
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 mt-7 bg-red text-paper px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors cursor-pointer"
      >
        Send Brief →
      </button>
      <p className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em] mt-4">
        Lands directly with a senior researcher · response &lt; 4h, {SITE.hours}
      </p>
    </form>
  );
}
