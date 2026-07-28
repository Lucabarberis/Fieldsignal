"use client";

/**
 * Lead form for paid-search landing pages.
 *
 * Posts to the same /api/contact as the site form. The difference is the
 * hidden block: every submission carries the keyword that paid for it, so
 * cost per lead can be read per keyword rather than blended.
 *
 * ON THE "WHAT DO THEY WANT?" PROBLEM
 *
 * The site form asks for a written brief. That is right for someone who
 * arrived deliberately and wrong for a cold ad click — it asks a stranger
 * to compose a research brief before they will be allowed to talk to us.
 *
 * Making it optional would trade knowing what they want for getting more
 * of them. Instead the requirement moves from typing to tapping: one
 * required dropdown captures the intent, and free text stays optional for
 * anyone who wants to add detail. Near-zero friction, no lost information.
 *
 * The URL-derived fields fill in on mount rather than being read from
 * searchParams on the server, which keeps these pages statically rendered
 * — page speed is itself a Quality Score input. Without JavaScript the
 * form still submits; only the attribution is lost.
 */

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { LEAD_TOPICS } from "@/lib/landing-pages";

const LABEL =
  "block font-mono text-micro uppercase tracking-[0.12em] text-ink-2 mb-2";
const FIELD =
  "w-full bg-paper-3 border border-rule-2 rounded-none appearance-none px-4 py-3 font-sans text-[15px] leading-[1.4] text-ink placeholder:text-ink-3 focus:outline-none focus:border-ink transition-colors";

/** URL params worth carrying through to the lead record. */
const TRACKED = [
  "gclid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
] as const;

type Props = {
  /** Landing page slug — the keyword bucket this lead belongs to. */
  slug: string;
};

export function LpLeadForm({ slug }: Props) {
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
    <form action="/api/contact" method="POST">
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

      <div className="space-y-5">
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

        <div>
          <label htmlFor="lp-topic" className={LABEL}>
            What are you researching?
          </label>
          <select
            id="lp-topic"
            name="topic"
            required
            defaultValue=""
            className={`${FIELD} cursor-pointer`}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {LEAD_TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lp-message" className={LABEL}>
            Anything else? <span className="text-ink-3">(optional)</span>
          </label>
          <textarea
            id="lp-message"
            name="message"
            rows={3}
            placeholder="Industry, seniority, timeline — whatever you already know."
            className={FIELD}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 mt-6 bg-red text-paper px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors cursor-pointer"
      >
        Send Brief →
      </button>

      <p className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em] mt-4 leading-[1.6]">
        Lands with a senior researcher · reply &lt; 4h, {SITE.hours}
      </p>
      <p className="font-mono text-micro text-ink-3 tracking-[0.04em] mt-3 leading-[1.6]">
        {SITE.legalEntity}, {SITE.jurisdiction}. MNPI controls and employer
        restriction checks on every expert. No newsletter, no reselling your
        details.
      </p>
    </form>
  );
}
