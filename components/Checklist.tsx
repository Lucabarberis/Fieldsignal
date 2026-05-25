/**
 * Brand checklist — replaces all bullets with the `+` typographic mark
 * (per fieldsignal-brand iconography rules).
 */
export function Checklist({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-red font-mono font-semibold mt-px">+</span>
          <span className="text-body text-ink-2">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Callout — paper-2 panel with a left red bar. Used in legal pages
 * for emphatic single-line statements ("We do not sell your data.").
 */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-paper-2 border-l-4 border-red px-5 py-4 my-6">
      <p className="text-body text-ink font-medium">{children}</p>
    </div>
  );
}

/**
 * Sub-heading inside a content block (e.g. "1.1 Personal Information").
 * Red sub-number, ink heading.
 */
export function SubHeading({
  num,
  children,
}: {
  num: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mt-8 mb-3 font-sans font-semibold text-[17px] tracking-[-0.01em] text-ink">
      <span className="font-mono text-mono text-red font-semibold mr-3 opacity-[0.78]">
        {num}
      </span>
      {children}
    </h3>
  );
}
