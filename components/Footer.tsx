import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/site";

/**
 * Component 7 of 7 — Footer (brand row + copyright bar)
 */
export function Footer() {
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
        </div>
      </footer>

      <div className="bg-ink text-paper/40 px-4 sm:px-9 py-4 flex flex-wrap justify-between gap-3 font-mono text-micro uppercase border-t border-paper/10">
        <span>
          © {SITE.copyrightYear} {SITE.legalEntity}. All rights reserved.
        </span>
        <span>{SITE.domain}</span>
      </div>
    </>
  );
}
