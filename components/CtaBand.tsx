import Link from "next/link";

/**
 * Component 6 of 7 — CTA Band
 *
 * Dark ink panel with a red top stripe. The one place a red statistic
 * may appear inline ("50,000+"). Sits between the last section and footer.
 */
type Props = {
  title: React.ReactNode;
  meta?: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
};

export function CtaBand({ title, meta, ctaLabel, ctaHref }: Props) {
  return (
    <section className="bg-ink text-paper border-t-2 border-red px-4 py-14 sm:px-9 sm:py-20">
      <div className="max-w-5xl">
        <h2 className="font-sans font-medium text-[clamp(36px,5vw,52px)] leading-[1] tracking-[-0.028em]">
          {title}
        </h2>
        {meta && (
          <div className="mt-5 font-mono text-mono uppercase tracking-[0.08em] text-paper/60">
            {meta}
          </div>
        )}
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 mt-7 bg-red text-paper px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink hover:text-red hover:border hover:border-red transition-colors"
        >
          {ctaLabel} →
        </Link>
      </div>
    </section>
  );
}
