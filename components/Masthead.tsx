import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";

/**
 * Component 1 of 7 — Masthead
 *
 * Sticky top bar. Blue wordmark on the left (only place blue may appear),
 * mono nav links in the centre, ink CTA on the right.
 */
export function Masthead() {
  return (
    <nav className="sticky top-0 z-50 bg-paper border-b border-ink px-9 py-4 flex justify-between items-center gap-6 flex-wrap">
      <Link href="/" className="flex items-center flex-shrink-0" aria-label={SITE.name}>
        <span className="font-sans font-black text-brand uppercase tracking-[0.02em] text-[22px] leading-none">
          {SITE.name.toUpperCase()}
        </span>
      </Link>

      <div className="flex gap-6 flex-wrap justify-center flex-1">
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
        href={`mailto:${SITE.contactEmail}`}
        className="bg-red text-paper px-4 py-2.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors flex-shrink-0"
      >
        Contact Us →
      </Link>
    </nav>
  );
}
