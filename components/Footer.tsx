"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOOTER_LINKS, SITE } from "@/lib/site";

/**
 * Component 7 of 7 — Footer (brand row + copyright bar)
 *
 * Paid-search landing pages get a cut-down version: the operating entity,
 * the three legal pages, and the copyright line. Google Ads wants a visible
 * business identity and a privacy policy on any landing page it sends
 * traffic to, so the footer stays — but the other fifteen links are exits
 * from a page that is only trying to do one thing.
 */

/** Kept on /lp/* — required for ad policy, and real trust signals besides. */
const LEGAL_LINKS = FOOTER_LINKS.filter((l) =>
  ["/terms-conditions", "/privacy-policy", "/compliance"].includes(l.href),
);

function CopyrightBar() {
  return (
    <div className="bg-ink text-paper/40 px-4 sm:px-9 py-4 flex flex-wrap justify-between gap-3 font-mono text-micro uppercase border-t border-paper/10">
      <span>
        © {SITE.copyrightYear} {SITE.legalEntity}. All rights reserved.
      </span>
      <span>{SITE.domain}</span>
    </div>
  );
}

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/lp/")) {
    return (
      <>
        <footer className="bg-ink text-paper px-4 sm:px-9 py-8 flex flex-wrap gap-6 justify-between items-start border-t-2 border-red">
          <div className="flex flex-col gap-2">
            <span className="font-sans font-black text-brand uppercase tracking-[0.02em] text-[22px] leading-none">
              {SITE.name.toUpperCase()}
            </span>
            <span className="font-mono text-mono text-paper/60 uppercase">
              {SITE.legalEntity} · {SITE.jurisdiction}
            </span>
          </div>

          <div className="flex gap-6 flex-wrap">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-mono text-paper/60 hover:text-paper uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </footer>
        <CopyrightBar />
      </>
    );
  }

  return (
    <>
      <footer className="bg-ink text-paper px-4 sm:px-9 py-10 sm:py-12 flex flex-wrap gap-6 justify-between items-start border-t-2 border-red">
        <div className="flex flex-col gap-2">
          <span className="font-sans font-black text-brand uppercase tracking-[0.02em] text-[22px] leading-none">
            {SITE.name.toUpperCase()}
          </span>
          <span className="font-mono text-mono text-paper/60 uppercase">
            {SITE.tagline}
          </span>
        </div>

        <div className="flex gap-6 flex-wrap">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-mono text-paper/60 hover:text-paper uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer me"
            className="font-mono text-mono text-paper/60 hover:text-paper uppercase transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </footer>

      <CopyrightBar />
    </>
  );
}
