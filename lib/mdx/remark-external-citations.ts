import { visit, SKIP } from "unist-util-visit";
import type { Root, Text, PhrasingContent, Parent } from "mdast";

/**
 * Auto-links the first mention of well-known regulations and research methods
 * in post bodies to an authoritative external source.
 *
 * The SEO/GEO audit flagged that most posts carried no external citations,
 * which weakens the trust signals search and AI engines look for. This adds a
 * conservative, verified set of authoritative reference links — only terms
 * with an unambiguous canonical source, every URL checked to resolve.
 *
 * Deliberately narrow and safe:
 *   · only the FIRST mention of any term is linked
 *   · at most MAX_PER_DOC links added per document
 *   · headings, existing links, code and blockquotes are never touched
 *   · terms are distinct from the internal glossary linker's set (no overlap)
 *
 * These are reference links for named concepts, not per-statistic citations —
 * those still belong in the copy at authoring time.
 */

const MAX_PER_DOC = 3;

/** term (as a word-boundary regex) → authoritative URL. Longest-first. */
const CITATIONS: { re: RegExp; url: string }[] = [
  { re: /\bNet Promoter Score\b/, url: "https://en.wikipedia.org/wiki/Net_promoter_score" },
  { re: /\bVan Westendorp\b/, url: "https://en.wikipedia.org/wiki/Van_Westendorp%27s_Price_Sensitivity_Meter" },
  { re: /\bPorter'?s Five Forces\b/, url: "https://en.wikipedia.org/wiki/Porter%27s_five_forces_analysis" },
  { re: /\bconjoint analysis\b/i, url: "https://en.wikipedia.org/wiki/Conjoint_analysis" },
  { re: /\bRegulation (?:FD|Fair Disclosure)\b|\bReg FD\b/, url: "https://en.wikipedia.org/wiki/Regulation_Fair_Disclosure" },
  { re: /\bMiFID II\b/, url: "https://www.esma.europa.eu/policy-rules/mifid-ii-and-mifir" },
  { re: /\bGDPR\b/, url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" },
  { re: /\bHIPAA\b/, url: "https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act" },
];

const SKIPPED = new Set([
  "heading", "link", "linkReference", "inlineCode", "code", "blockquote",
  "image", "imageReference", "html", "mdxJsxFlowElement", "mdxJsxTextElement",
]);

export function remarkExternalCitations() {
  return function transformer(tree: Root) {
    const usedUrls = new Set<string>();
    let linked = 0;

    visit(tree, (node, index, parent: Parent | undefined) => {
      if (SKIPPED.has(node.type)) return SKIP;
      if (node.type !== "text" || !parent || index === undefined) return;
      if (linked >= MAX_PER_DOC) return;

      const value = (node as Text).value;

      for (const { re, url } of CITATIONS) {
        if (usedUrls.has(url)) continue;
        const m = re.exec(value);
        if (!m || m.index === undefined) continue;

        const before = value.slice(0, m.index);
        const matched = value.slice(m.index, m.index + m[0].length);
        const after = value.slice(m.index + m[0].length);

        const replacement: PhrasingContent[] = [];
        if (before) replacement.push({ type: "text", value: before });
        replacement.push({
          type: "link",
          url,
          children: [{ type: "text", value: matched }],
        });
        if (after) replacement.push({ type: "text", value: after });

        parent.children.splice(index, 1, ...replacement);
        usedUrls.add(url);
        linked += 1;
        return index + replacement.length - 1;
      }
    });
  };
}
