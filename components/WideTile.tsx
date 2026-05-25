/**
 * Component 5 of 7 — Wide Tile
 *
 * Full-width row, used for sequential lists like the Process steps.
 * Each row is a small grid: step number · name · day · description · meta.
 */
type Step = {
  step: string;       // e.g. "01"
  name: string;       // e.g. "Brief intake"
  day: string;        // e.g. "Day 0"
  description: string;
  meta?: string;
};

type Props = {
  id: string;
  name: string;
  steps: Step[];
};

export function WideTile({ id, name, steps }: Props) {
  return (
    <article className="bg-paper px-7 pt-6 pb-4">
      <header className="mb-4">
        <div className="font-mono text-mono text-red font-semibold opacity-[0.78] mb-1">
          {id}
        </div>
        <div className="font-mono text-[14px] font-semibold tracking-[0.06em] leading-tight text-ink">
          {name}
        </div>
      </header>

      <div className="flex flex-col">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className={`grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-x-6 gap-y-1 py-3 ${
              i > 0 ? "border-t border-rule" : ""
            }`}
          >
            <div className="flex gap-3 items-baseline">
              <span className="font-mono text-mono text-red font-semibold opacity-[0.78]">
                {s.step}
              </span>
              <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-ink">
                {s.name}
              </span>
            </div>
            <p className="text-[13px] leading-[1.55] text-ink-2 md:col-start-2">
              {s.description}
            </p>
            <span className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em] md:col-start-3 md:row-start-1">
              {s.day}
            </span>
            {s.meta && (
              <span className="font-mono text-micro text-ink-3 md:col-start-2">
                {s.meta}
              </span>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
