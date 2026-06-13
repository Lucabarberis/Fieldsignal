/**
 * Component 3 of 7 — Section Band
 *
 * The narrow horizontal strip that punctuates every content group.
 *   <SectionBand num="02" label="Our Services" meta="6 engagement formats" />
 */
type Props = {
  num: string;
  label: string;
  meta?: string;
  id?: string;
};

export function SectionBand({ num, label, meta, id }: Props) {
  return (
    <div
      id={id}
      className="bg-paper-2 px-4 sm:px-9 py-3.5 border-y border-rule-2 flex justify-between items-center flex-wrap gap-2 font-mono text-mono uppercase"
    >
      <span>
        <span className="text-red font-semibold">{num}</span>
        <span className="mx-2 text-ink-3">/</span>
        <span className="text-ink font-medium">{label}</span>
      </span>
      {meta && <span className="text-ink-3">{meta}</span>}
    </div>
  );
}
