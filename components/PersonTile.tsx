import Image from "next/image";

/**
 * Person tile — the Tile component (4 of 7) with a headshot.
 *
 * Same type scale, padding and footer rule as <Tile>, but the body is
 * preceded by a portrait and the footer carries a LinkedIn link instead
 * of a CTA.
 *
 *   <PersonTile id="01.1" name="Miles O'Sullivan" role="CEO / Founder"
 *               photo="/team/miles-…-fieldsignal.jpg"
 *               linkedin="https://www.linkedin.com/in/miles-o-sullivan/">
 *     <p>Former operator across FAANG-scale technology…</p>
 *   </PersonTile>
 *
 * `layout="wide"` puts the portrait beside the copy rather than above it.
 * Use it in 2-up grids, where a full-bleed square portrait would render
 * 600px+ and swamp the page.
 *
 * Portraits are square, black-and-white and un-rounded by design — no
 * border-radius, no shadow, per the brand system.
 *
 * Pass `name` in sentence case. It is upper-cased for display via CSS, so
 * the alt text and JSON-LD keep the real capitalisation.
 */
type Props = {
  id: string;
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  location?: string;
  layout?: "stacked" | "wide";
  /** Set on above-the-fold portraits so they are not lazy-loaded. */
  priority?: boolean;
  /** DOM id for deep-linking (e.g. article bylines → this person's tile). */
  anchorId?: string;
  /** Optional bio. Omit rather than inventing copy for someone. */
  children?: React.ReactNode;
};

export function PersonTile({
  id,
  name,
  role,
  photo,
  linkedin,
  location,
  layout = "stacked",
  priority = false,
  anchorId,
  children,
}: Props) {
  const alt = `${name}, ${role} at FieldSignal${location ? `, based in ${location}` : ""}`;

  const portrait = (
    <div
      className={
        layout === "wide"
          ? "relative aspect-square w-full sm:w-[38%] sm:shrink-0 bg-paper-2"
          : "relative aspect-square bg-paper-2"
      }
    >
      <Image
        src={photo}
        alt={alt}
        fill
        sizes={
          layout === "wide"
            ? "(min-width: 768px) 20vw, 100vw"
            : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        }
        className="object-cover grayscale"
        priority={priority}
      />
    </div>
  );

  const body = (
    <div className="px-5 pt-5 pb-4 sm:px-7 sm:pt-6 flex flex-col flex-1">
      <header>
        <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
          {id}
        </div>
        <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink mb-2.5 uppercase">
          {name}
        </div>
        <div className="font-mono text-micro text-ink-2 tracking-[0.04em] mb-3">
          {role}
          {location && <> · {location}</>}
        </div>
      </header>

      <div className="text-[13px] leading-[1.55] text-ink-2 flex-1">
        {children}
      </div>


      <footer className="mt-auto pt-3 border-t border-rule flex justify-between font-mono text-micro uppercase tracking-[0.06em] gap-3">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={`${name} on LinkedIn (opens in a new tab)`}
          className="text-ink hover:text-red transition-colors"
        >
          LinkedIn →
        </a>
      </footer>
    </div>
  );

  return (
    <article
      id={anchorId}
      className={
        layout === "wide"
          ? "bg-paper flex flex-col sm:flex-row scroll-mt-24"
          : "bg-paper flex flex-col scroll-mt-24"
      }
    >
      {portrait}
      {body}
    </article>
  );
}
