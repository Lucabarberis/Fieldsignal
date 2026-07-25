import { readFile } from "node:fs/promises";
import path from "node:path";
import manifest from "@/content/diagrams/manifest.json";

/**
 * Per-post illustrative diagrams.
 *
 * Each diagram is an SVG in `content/diagrams/<slug>.svg`, inlined into the
 * post page rather than served through <img>. That is deliberate:
 *
 *   - A browser sandboxes SVGs loaded via <img> and blocks external fetches,
 *     so a webfont referenced from inside the file never loads.
 *   - Fonts are self-hosted through next/font, which mangles the family names.
 *     There is no font literally called "Inter" on the page, so an SVG asking
 *     for 'Inter' would fall back to Helvetica.
 *
 * Inlining puts the markup in the document, where the SVG's own
 * `var(--font-sans)` / `var(--font-mono)` resolve against the Tailwind theme.
 * The diagrams therefore track the brand contract: change a font or ink token
 * in globals.css and all of them follow, with no re-rendering.
 *
 * The files are generated from the authored originals (which keep a Google
 * Fonts @import so they still render when opened standalone). Their class
 * selectors are scoped under `.fs-diagram` so the generic `.ink` / `.mono`
 * names cannot leak into the page stylesheet, and their <title>/<desc> ids are
 * namespaced per slug.
 *
 * SERVER ONLY — reads from disk. Never import this into a client component.
 *
 * The SVGs are reached by a computed path, which Next's output tracing cannot
 * see, so `next.config.ts` includes `content/diagrams/**` for this route.
 * Without that they would 404 in the deployed lambda while working locally.
 */

export type DiagramMeta = {
  slug: string;
  /** One sentence describing what the chart shows. */
  altText: string;
  /** Short caption rendered under the figure. */
  caption: string;
};

export type Diagram = DiagramMeta & { svg: string };

const META: ReadonlyMap<string, DiagramMeta> = new Map(
  (manifest as DiagramMeta[]).map((d) => [d.slug, d]),
);

/** Does this post have a diagram? Cheap — metadata only, no disk read. */
export function hasDiagram(slug: string): boolean {
  return META.has(slug);
}

/**
 * Memoised for the life of the process. Unlike posts, these files are static
 * build artefacts committed to the repo, so they never need a TTL.
 */
const svgCache = new Map<string, Promise<string | null>>();

function readSvg(slug: string): Promise<string | null> {
  let pending = svgCache.get(slug);
  if (!pending) {
    const file = path.join(process.cwd(), "content", "diagrams", `${slug}.svg`);
    pending = readFile(file, "utf8").catch(() => null);
    svgCache.set(slug, pending);
  }
  return pending;
}

/**
 * Returns the diagram for a post, or null when it has none.
 *
 * A missing or unreadable file resolves to null rather than throwing: a post
 * should still render if its diagram is absent.
 */
export async function getDiagram(slug: string): Promise<Diagram | null> {
  const meta = META.get(slug);
  if (!meta) return null;
  const svg = await readSvg(slug);
  if (!svg) return null;
  return { ...meta, svg };
}
