import Link from "next/link";
import type React from "react";

/**
 * Component 2 of 7 — Page Header (for sub-pages)
 *
 * Breadcrumb + display title + optional lede + meta strip.
 * Use on every non-homepage page.
 */
type MetaItem = { label: string; value: React.ReactNode };

type Props = {
  current: string;            // displayed at the end of the breadcrumb
  title: string;
  lede?: React.ReactNode;
  meta?: MetaItem[];
  /**
   * BCP-47 language of `title` and `lede`, when they are not in the site's
   * default language. The breadcrumb and meta labels stay English, so this
   * sits on the heading block rather than the whole section.
   */
  lang?: string;
};

export function PageHeader({ current, title, lede, meta, lang }: Props) {
  return (
    <section className="px-4 sm:px-9 pt-10 pb-8 sm:pt-16 sm:pb-12 border-b border-rule">
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mb-6 flex gap-2 flex-wrap"
      >
        <Link href="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{current}</span>
      </nav>

      <h1
        lang={lang}
        className="font-sans font-medium text-[clamp(40px,6vw,72px)] leading-[0.95] tracking-[-0.028em] text-ink max-w-4xl"
      >
        {title}
      </h1>

      {lede && (
        <p lang={lang} className="mt-6 text-lede text-ink-2 max-w-3xl">
          {lede}
        </p>
      )}

      {meta && meta.length > 0 && (
        <dl className="mt-10 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 max-w-4xl">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                {m.label}
              </dt>
              <dd className="font-sans text-[15px] font-semibold text-ink">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
