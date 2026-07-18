import { visit, SKIP } from "unist-util-visit";
import type { Root, Text, PhrasingContent, Parent } from "mdast";
import { glossary } from "@/content/data/glossary";

/**
 * Auto-links the first mention of a glossary term in post body copy.
 *
 * Contextual internal linking on this site is otherwise near-absent: post
 * bodies average ~2 in-body links and glossary/service pages have none, so
 * the 50-term glossary earns almost no internal link equity and readers get
 * no path from an article to the definition of a term it uses.
 *
 * Deliberately conservative — this rewrites published editorial copy:
 *   · only the FIRST mention of any given term is linked
 *   · at most MAX_LINKS_PER_DOC links are added per document
 *   · headings, existing links, code and blockquotes are never touched
 *   · longer terms win over shorter ones ("expert network roi" before
 *     "expert network") so the more specific page gets the link
 *   · a document never links to itself (`selfSlug`)
 */

const MAX_LINKS_PER_DOC = 4;

/** Terms longest-first so specific phrases match before generic ones. */
const TERMS = [...glossary]
  .map((t) => ({ slug: t.slug, term: t.term }))
  .sort((a, b) => b.term.length - a.term.length);

/** Node types whose subtree must never be link-injected. */
const SKIPPED = new Set([
  "heading",
  "link",
  "linkReference",
  "inlineCode",
  "code",
  "blockquote",
  "image",
  "imageReference",
  "html",
  "mdxJsxFlowElement",
  "mdxJsxTextElement",
]);

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function remarkGlossaryLinks(options: { selfSlug?: string } = {}) {
  return function transformer(tree: Root) {
    const used = new Set<string>();
    if (options.selfSlug) used.add(options.selfSlug);
    let linked = 0;

    visit(tree, (node, index, parent: Parent | undefined) => {
      if (SKIPPED.has(node.type)) return SKIP;
      if (node.type !== "text" || !parent || index === undefined) return;
      if (linked >= MAX_LINKS_PER_DOC) return;

      const value = (node as Text).value;

      for (const { slug, term } of TERMS) {
        if (used.has(slug)) continue;

        const re = new RegExp(`\\b${escapeRegExp(term)}\\b`, "i");
        const m = re.exec(value);
        if (!m || m.index === undefined) continue;

        const before = value.slice(0, m.index);
        const matched = value.slice(m.index, m.index + m[0].length);
        const after = value.slice(m.index + m[0].length);

        const replacement: PhrasingContent[] = [];
        if (before) replacement.push({ type: "text", value: before });
        replacement.push({
          type: "link",
          url: `/resources/glossary/${slug}`,
          children: [{ type: "text", value: matched }],
        });
        if (after) replacement.push({ type: "text", value: after });

        parent.children.splice(index, 1, ...replacement);
        used.add(slug);
        linked += 1;

        // Re-visit the trailing text node so a later term can still match.
        return index + replacement.length - 1;
      }
    });
  };
}
