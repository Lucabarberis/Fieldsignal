import { getDiagram } from "@/lib/diagrams";

/**
 * The illustrative diagram at the head of a blog post.
 *
 * Renders nothing when the post has no diagram, so it is safe to drop into
 * every post page unconditionally.
 *
 * The SVG is inlined rather than referenced with <img>. See lib/diagrams.ts
 * for why — in short, an <img>-loaded SVG cannot reach the site's webfonts,
 * so the brand typography would silently fall back to Helvetica.
 *
 * `dangerouslySetInnerHTML` is safe here: the markup is a build artefact from
 * content/diagrams, not user input. The generator scopes the SVG's class
 * selectors under `.fs-diagram` and namespaces its ids per slug, so inlining
 * cannot leak styles into the page or collide with other ids.
 *
 * Sizing lives in globals.css (`.fs-diagram`), which makes the chart fill the
 * content column and scale by its viewBox.
 */
export async function PostDiagram({ slug }: { slug: string }) {
  const diagram = await getDiagram(slug);
  if (!diagram) return null;

  return (
    <figure className="not-prose mb-12">
      {/* Hairline frame — depth comes from rules, never shadows. */}
      <div
        className="border border-rule"
        dangerouslySetInnerHTML={{ __html: diagram.svg }}
      />
      <figcaption className="mt-3 font-mono text-mono text-ink-3">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
