/**
 * Tile grid container. The hairline gap between cells comes from
 * a `bg-rule` background showing through 1px gutters.
 *
 * Use cols={3} for the standard 3-up grid, cols={2} for two-up,
 * cols={4} for the dense 4-up.
 */
type Props = {
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
};

const COLS_CLASS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

export function TileGrid({ cols = 3, children }: Props) {
  return (
    <div
      className={`grid grid-cols-1 ${COLS_CLASS[cols]} gap-px bg-rule`}
    >
      {children}
    </div>
  );
}
