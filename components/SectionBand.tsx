/**
 * Component 3 of 7 — Section Band
 *
 * The narrow horizontal strip that punctuates every content group.
 *   <SectionBand num="02" label="Our Services" meta="6 engagement formats" />
 *
 * The label renders as a real (inline-styled) <h2> so these template pages
 * expose a genuine heading outline — outside the blog, section titles were
 * plain <div>s, leaving glossary/guide/pricing/service pages with no
 * machine-readable heading structure for snippet extraction. `as` allows a
 * different level where the outline calls for it.
 */
type Props = {
  num: string;
  label: string;
  meta?: string;
  id?: string;
  /** Heading level for the label. Defaults to h2. */
  as?: "h2" | "h3";
};

export function SectionBand({ num, label, meta, id, as: Heading = "h2" }: Props) {
  return (
    <div
      id={id}
      className="bg-paper-2 px-4 sm:px-9 py-3.5 border-y border-rule-2 flex justify-between items-center flex-wrap gap-2 font-mono text-mono uppercase"
    >
      <span>
        <span className="text-red font-semibold">{num}</span>
        <span className="mx-2 text-ink-3">/</span>
        <Heading className="inline m-0 p-0 text-mono font-medium text-ink">
          {label}
        </Heading>
      </span>
      {meta && <span className="text-ink-3">{meta}</span>}
    </div>
  );
}
