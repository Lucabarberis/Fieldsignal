"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Expert Network Cost Estimator — interactive client widget.
 *
 * Estimates industry-standard project costs from the published bands in
 * the FieldSignal Pricing & Pay Benchmark (2026 edition). All figures are
 * positioning ranges for the broader market, NOT FieldSignal quotes —
 * FieldSignal's own pricing lives exclusively on /pricing per site policy.
 */

type Seniority = "early" | "mid" | "veteran";

/** Client-side per-call bands (EUR) for full-service networks, 2026. */
const PER_CALL_BANDS: Record<Seniority, { lo: number; hi: number; label: string; desc: string }> = {
  early: {
    lo: 500,
    hi: 700,
    label: "Early career",
    desc: "Manager-level operators, 3–7 yrs (PMs, specialists, channel managers)",
  },
  mid: {
    lo: 700,
    hi: 1000,
    label: "Mid-career",
    desc: "Directors and VPs, 8–15 yrs (heads of function, regional leads)",
  },
  veteran: {
    lo: 1000,
    hi: 1500,
    label: "Veteran executive",
    desc: "C-level and 15+ yrs (former CEOs, CFOs, heads of regulatory)",
  },
};

/** Rush premium range applied on top of base bands (24–48h turnaround). */
const RUSH = { lo: 1.1, hi: 1.3 };

/** Typical annual minimum at large full-service networks (USD, converted ~EUR for display). */
const ANNUAL_MINIMUM_EUR = 95_000;

/** Multi-call package discount band for 10+ call fixed-scope projects. */
const PACKAGE_DISCOUNT = { lo: 0.2, hi: 0.4 };

const eur = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

const LABEL =
  "block font-mono text-micro uppercase tracking-[0.12em] text-ink-2 mb-2";

export function CostEstimator() {
  const [calls, setCalls] = useState(6);
  const [seniority, setSeniority] = useState<Seniority>("mid");
  const [rush, setRush] = useState(false);

  const band = PER_CALL_BANDS[seniority];
  const perLo = Math.round(band.lo * (rush ? RUSH.lo : 1));
  const perHi = Math.round(band.hi * (rush ? RUSH.hi : 1));
  const totalLo = perLo * calls;
  const totalHi = perHi * calls;

  const showPackage = calls >= 10;
  const pkgLo = Math.round(totalLo * (1 - PACKAGE_DISCOUNT.hi));
  const pkgHi = Math.round(totalHi * (1 - PACKAGE_DISCOUNT.lo));

  const effectiveRetainerPerCall = Math.round(
    Math.max(ANNUAL_MINIMUM_EUR, totalHi) / calls,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule border-y border-rule">
      {/* ── Inputs ─────────────────────────────────────────────── */}
      <div className="bg-paper px-4 sm:px-9 py-8">
        <div className="font-mono text-mono uppercase tracking-[0.06em] text-red font-semibold mb-6">
          Your project
        </div>

        <div className="mb-8">
          <label htmlFor="est-calls" className={LABEL}>
            Number of expert calls — <b className="text-ink">{calls}</b>
          </label>
          <input
            id="est-calls"
            type="range"
            min={1}
            max={30}
            value={calls}
            onChange={(e) => setCalls(Number(e.target.value))}
            className="w-full accent-[#0080FF] cursor-pointer"
          />
          <div className="flex justify-between font-mono text-micro text-ink-3 mt-1">
            <span>1</span>
            <span>30</span>
          </div>
        </div>

        <div className="mb-8">
          <span className={LABEL}>Expert seniority</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-rule border border-rule-2">
            {(Object.keys(PER_CALL_BANDS) as Seniority[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSeniority(s)}
                aria-pressed={seniority === s}
                className={`px-3 py-3 font-mono text-mono uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                  seniority === s
                    ? "bg-ink text-paper"
                    : "bg-paper-3 text-ink-2 hover:text-ink"
                }`}
              >
                {PER_CALL_BANDS[s].label}
              </button>
            ))}
          </div>
          <p className="font-sans text-[13px] leading-[1.55] text-ink-2 mt-3">
            {band.desc}
          </p>
        </div>

        <div>
          <span className={LABEL}>Turnaround</span>
          <div className="grid grid-cols-2 gap-px bg-rule border border-rule-2 max-w-xs">
            <button
              type="button"
              onClick={() => setRush(false)}
              aria-pressed={!rush}
              className={`px-3 py-3 font-mono text-mono uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                !rush ? "bg-ink text-paper" : "bg-paper-3 text-ink-2 hover:text-ink"
              }`}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => setRush(true)}
              aria-pressed={rush}
              className={`px-3 py-3 font-mono text-mono uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                rush ? "bg-ink text-paper" : "bg-paper-3 text-ink-2 hover:text-ink"
              }`}
            >
              Rush (24–48h)
            </button>
          </div>
          {rush && (
            <p className="font-sans text-[13px] leading-[1.55] text-ink-2 mt-3">
              Rush sourcing typically carries a 10–30% premium.
            </p>
          )}
        </div>
      </div>

      {/* ── Results ────────────────────────────────────────────── */}
      <div className="bg-paper px-4 sm:px-9 py-8 flex flex-col">
        <div className="font-mono text-mono uppercase tracking-[0.06em] text-red font-semibold mb-6">
          Industry-standard estimate
        </div>

        <div className="mb-7">
          <div className={LABEL}>Per call (full-service networks)</div>
          <div className="font-sans font-medium text-[clamp(26px,3vw,36px)] tracking-[-0.02em] text-ink">
            {eur(perLo)} – {eur(perHi)}
          </div>
        </div>

        <div className="mb-7">
          <div className={LABEL}>
            Project total — {calls} {calls === 1 ? "call" : "calls"}, pay-per-use
          </div>
          <div className="font-sans font-medium text-[clamp(26px,3vw,36px)] tracking-[-0.02em] text-ink">
            {eur(totalLo)} – {eur(totalHi)}
          </div>
          {showPackage && (
            <p className="font-sans text-[13px] leading-[1.55] text-ink-2 mt-2">
              Booked as a fixed-scope package (typical 20–40% discount):{" "}
              <b className="text-ink">
                {eur(pkgLo)} – {eur(pkgHi)}
              </b>
            </p>
          )}
        </div>

        <div className="mb-7 border-l-4 border-red pl-5">
          <div className={LABEL}>Same project under an annual-minimum retainer</div>
          <p className="font-sans text-[14px] leading-[1.6] text-ink-2">
            Large networks typically require six-figure annual commitments
            (≈{eur(ANNUAL_MINIMUM_EUR)}+). If this project is your main usage,
            these {calls} {calls === 1 ? "call" : "calls"} effectively cost{" "}
            <b className="text-ink">≈{eur(effectiveRetainerPerCall)} per call</b>{" "}
            — you pay for capacity you don't use.
          </p>
        </div>

        <div className="mt-auto pt-5 border-t border-rule">
          <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink-3 leading-[1.7]">
            Positioning bands from the{" "}
            <Link
              href="/resources/blog/expert-network-pricing-and-pay-benchmark-2026"
              className="text-ink hover:text-red transition-colors underline underline-offset-2"
            >
              2026 Pricing &amp; Pay Benchmark
            </Link>
            , not quotes. FieldSignal prices pay-per-use with no annual minimum —{" "}
            <Link
              href="/pricing"
              className="text-ink hover:text-red transition-colors underline underline-offset-2"
            >
              see our pricing
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
