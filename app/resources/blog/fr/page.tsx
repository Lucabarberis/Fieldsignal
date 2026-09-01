import type { Metadata } from "next";
import { LocalisedBlogIndex } from "@/components/LocalisedBlogIndex";
import { pageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";

const PATH = "/resources/blog/fr";

/**
 * French blog index. See the German index for the routing and noindex notes;
 * the two are deliberately parallel.
 */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getAllPosts("fr");
  return pageMetadata({
    title: "Blog : recherche primaire et réseaux d'experts",
    description:
      "Articles sur la recherche primaire, les réseaux d'experts et l'analyse de marché : méthodes, comparatifs de prestataires et guides pratiques par FieldSignal.",
    path: PATH,
    locale: "fr_FR",
    noindex: posts.length === 0,
  });
}

export default async function FrenchBlogIndexPage() {
  const posts = await getAllPosts("fr");

  return (
    <LocalisedBlogIndex
      lang="fr"
      dateLocale="fr-FR"
      path={PATH}
      posts={posts}
      strings={{
        breadcrumb: "Blog (Français)",
        title: "Le blog FieldSignal",
        lede: "Articles sur la recherche primaire, les réseaux d'experts et l'analyse sectorielle, écrits pour les décideurs francophones.",
        sectionLabel: "Articles récents",
        countLabel: (n) => (n === 1 ? "1 article" : `${n} articles`),
        empty: "Aucun article pour le moment.",
        readIn: "Lire en",
        readMore: "Lire l'article",
        ctaTitle: (
          <>
            Notre réseau : plus de <span className="text-red">50 000</span>{" "}
            professionnels
          </>
        ),
        // See the German index: SITE.hours is the English "Mon–Fri".
        ctaMeta: (
          <>
            Parlons de vos besoins en recherche{" "}
            <b className="text-paper font-medium">Lun–Ven</b>
          </>
        ),
        ctaLabel: "Nous contacter",
      }}
    />
  );
}
