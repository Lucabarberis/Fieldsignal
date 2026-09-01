import type { Metadata } from "next";
import { LocalisedBlogIndex } from "@/components/LocalisedBlogIndex";
import { pageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";

const PATH = "/resources/blog/de";

/**
 * German blog index.
 *
 * Static segment, so it takes precedence over /resources/blog/[slug] — no
 * post may use the slug "de" (none does; the publisher rejects duplicates).
 */
export const revalidate = 60;

/**
 * Metadata is computed rather than static so the page can noindex itself
 * while it has no posts. The first German article publishes 1 September;
 * before that this is an empty shell, and the site's existing convention
 * (see the transcript hubs) is to keep thin pages out of the index until
 * they carry content. `follow` stays on throughout.
 */
export async function generateMetadata(): Promise<Metadata> {
  const posts = await getAllPosts("de");
  return pageMetadata({
    title: "Blog: Primärforschung und Expertennetzwerke",
    description:
      "Fachbeiträge zu Primärforschung, Expertennetzwerken und Marktanalysen im DACH-Raum: Methoden, Anbietervergleiche und Praxisleitfäden vom FieldSignal-Team.",
    path: PATH,
    locale: "de_DE",
    noindex: posts.length === 0,
  });
}

export default async function GermanBlogIndexPage() {
  const posts = await getAllPosts("de");

  return (
    <LocalisedBlogIndex
      lang="de"
      dateLocale="de-DE"
      path={PATH}
      posts={posts}
      strings={{
        breadcrumb: "Blog (Deutsch)",
        title: "Der FieldSignal Blog",
        lede: "Fachbeiträge zu Primärforschung, Expertennetzwerken und Sektoranalysen — geschrieben für Entscheiderinnen und Entscheider im DACH-Raum.",
        sectionLabel: "Aktuelle Beiträge",
        countLabel: (n) => (n === 1 ? "1 Beitrag" : `${n} Beiträge`),
        empty: "Noch keine Beiträge.",
        readIn: "Lesen auf",
        readMore: "Beitrag lesen",
        ctaTitle: (
          <>
            Unser Netzwerk: über <span className="text-red">50.000</span>{" "}
            Fachleute
          </>
        ),
        // SITE.hours is the literal string "Mon–Fri" and reads as an
        // untranslated leftover here, so this market states its own.
        ctaMeta: (
          <>
            Wir besprechen Ihre Rechercheanforderungen{" "}
            <b className="text-paper font-medium">Mo–Fr</b>
          </>
        ),
        ctaLabel: "Kontakt aufnehmen",
      }}
    />
  );
}
