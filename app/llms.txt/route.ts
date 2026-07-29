import { SITE } from "@/lib/site";
import { glossary } from "@/content/data/glossary";
import { guides } from "@/content/data/guides";
import { getAllPosts } from "@/lib/posts";

/**
 * /llms.txt — generated, not static.
 *
 * The previous static public/llms.txt listed only section index pages, so
 * the site's actual answer content (guides, glossary terms, blog posts) was
 * invisible to LLM crawlers reading this file. Generating it means the blog
 * list can never drift from what's published in Supabase.
 *
 * Format follows the llms.txt convention: H1, blockquote summary, then
 * H2 sections of annotated links.
 *
 * NOTE: a static file at public/llms.txt would win over this route, so that
 * file must be deleted for this to serve.
 */

export const revalidate = 3600;

function line(title: string, path: string, note?: string) {
  return `- [${title}](${SITE.url}${path})${note ? `: ${note}` : ""}`;
}

export async function GET() {
  const posts = await getAllPosts();

  const body = `# FieldSignal

> Affordable expert network for primary research. Expert consultations, panel calls and surveys without six-figure retainers — built for startups, SMEs and emerging funds. Operated by Growth Insights Limited (Hong Kong SAR).

FieldSignal connects clients with vetted industry experts for 1:1 consultations, moderated panel calls, and surveys. It is positioned as a transparent, lower-cost alternative to traditional expert networks (e.g. GLG, AlphaSights, Third Bridge, Tegus, Dialectica), with a compliance framework covering expert vetting, pre-consultation attestations, and MNPI controls.

## Core

${line("Services", "/services", "Expert consultations, panel calls, surveys, reference checks, diligence research, voice-of-customer, win-loss analysis.")}
${line("Pricing", "/pricing", "Per-call rates, project packages and subscriptions. No annual retainers, no minimum spend.")}
${line("Industries", "/industries", "Sector coverage and sub-sector specialisms.")}
${line("Use Cases", "/use-cases", "Common research scenarios FieldSignal supports.")}
${line("GTM Intelligence", "/gtm-intelligence", "Go-to-market research for company clients: interviews with former VPs of Marketing and Heads of Growth at competing and comparable companies to establish which acquisition channels work, which to avoid, and why.")}
${line("Platform", "/platform", "How the engagement and transcript workflow works.")}
${line("Transcripts", "/transcripts", "Expert call transcript library with free previews.")}
${line("About", "/about", "Company background and mission.")}
${line("Compliance", "/compliance", "Vetting, attestations and MNPI controls.")}

## Comparisons

${line("Alternatives", "/alternatives", "FieldSignal vs. traditional expert networks.")}
${line("Compare", "/compare", "Head-to-head comparisons.")}

## Guides

${guides.map((g) => line(g.title, `/resources/guides/${g.slug}`)).join("\n")}

## Glossary

${glossary.map((t) => line(t.term, `/resources/glossary/${t.slug}`)).join("\n")}

## Articles

${posts.map((p) => line(p.title, `/resources/blog/${p.slug}`)).join("\n")}

## Contact

${line("Contact", "/contact", "Talk to a senior researcher.")}
${line("Request a call", "/contact/request-a-call")}
${line("Get a quote", "/contact/get-a-quote")}
${line("Book a demo", "/contact/book-a-demo")}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
