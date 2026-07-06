"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

/**
 * Component 1 of 7 — Masthead
 *
 * Sticky top bar. Blue wordmark left, mono nav centre (≥lg), ink CTA right.
 * Below lg the nav collapses behind a hamburger toggle so the bar stays
 * one row tall and does not eat the mobile viewport.
 */
export function Masthead() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b border-ink">
      <div className="px-4 lg:px-9 py-3 lg:py-4 flex justify-between items-center gap-4 lg:gap-6">
        <Link
          href="/"
          className="flex items-center flex-shrink-0"
          aria-label={SITE.name}
          onClick={() => setOpen(false)}
        >
          <span className="font-sans font-black text-brand uppercase tracking-[0.02em] text-[20px] lg:text-[22px] leading-none">
            {SITE.name.toUpperCase()}
          </span>
        </Link>

        <div className="hidden lg:flex gap-6 flex-wrap justify-center flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-micro text-ink-2 hover:text-ink uppercase font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden lg:inline-flex bg-red text-paper px-4 py-2.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors flex-shrink-0"
        >
          Contact Us →
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="masthead-mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex flex-col justify-center items-center w-11 h-11 -mr-2 text-ink"
        >
          <span
            className={`block w-6 h-px bg-ink transition-transform duration-150 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-ink mt-[6px] transition-opacity duration-150 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-ink mt-[6px] transition-transform duration-150 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div
          id="masthead-mobile-menu"
          className="lg:hidden border-t border-rule bg-paper px-4 py-4 flex flex-col gap-1"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-mono text-ink uppercase tracking-[0.12em] py-3 border-b border-rule hover:text-red transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center bg-red text-paper px-4 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      )}
    </nav>
  );
}
