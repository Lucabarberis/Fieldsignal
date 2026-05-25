import Link from "next/link";

/**
 * Component 4 of 7 — Standard Tile
 *
 * Grid card. Used in 3- and 4-up tile grids beneath section bands.
 *
 *   <Tile id="02.1" name="EXPERT CONSULTATIONS"
 *         meta={<>1-hour calls · <b>5–10 day</b> turnaround</>}
 *         href="/services/expert-consultations"
 *         cta="Request a call"
 *         updated="5–10 days">
 *     <p>One-hour calls with vetted operators…</p>
 *   </Tile>
 */
type Props = {
  id: string;
  name: string;
  meta?: React.ReactNode;
  cta?: string;
  href?: string;
  updated?: string;
  children: React.ReactNode;
};

export function Tile({ id, name, meta, cta, href, updated, children }: Props) {
  return (
    <article className="bg-paper px-7 pt-6 pb-4 flex flex-col">
      <header>
        <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
          {id}
        </div>
        <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2.5">
          {name}
        </div>
        {meta && (
          <div className="font-mono text-micro text-ink-2 tracking-[0.04em] mb-3">
            {meta}
          </div>
        )}
      </header>

      <div className="text-[13px] leading-[1.55] text-ink-2 flex-1">
        {children}
      </div>

      {(cta || updated) && (
        <footer className="mt-auto pt-3 border-t border-rule flex justify-between font-mono text-micro uppercase tracking-[0.06em] gap-3">
          {cta && href && (
            <Link href={href} className="text-ink hover:text-red transition-colors">
              {cta} →
            </Link>
          )}
          {cta && !href && (
            <span className="text-ink">
              {cta} →
            </span>
          )}
          {updated && <span className="text-ink-3">{updated}</span>}
        </footer>
      )}
    </article>
  );
}
