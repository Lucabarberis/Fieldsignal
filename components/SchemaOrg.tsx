import { SITE } from "@/lib/site";

/**
 * JSON-LD schema components per the SEO brief §2.5.
 *
 *   <OrganizationSchema />          ← sitewide, mounted in layout
 *   <WebSiteSchema />               ← sitewide, mounted in layout
 *   <BreadcrumbSchema items={...}/> ← on every non-home page
 *   <FAQSchema items={...}/>        ← any page with FAQ block
 *   <ArticleSchema {...}/>          ← blog posts + guides
 *   <ServiceSchema {...}/>          ← /services/* pages
 *   <LocalBusinessSchema {...}/>    ← /regions/* pages
 */

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalEntity,
    url: SITE.url,
    email: SITE.contactEmail,
    description: SITE.description,
    slogan: SITE.tagline,
    // Absolute URL required: consumers resolve `logo` outside page context.
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/fieldsignal-logo.svg`,
    },
    image: `${SITE.url}/og`,
    // sameAs links the brand entity to its off-site profiles so search/AI
    // engines can corroborate it. Registered address of the operating entity.
    sameAs: [SITE.linkedin],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressCountry: SITE.address.country,
    },
    foundingLocation: {
      "@type": "Place",
      name: SITE.jurisdiction,
    },
  };
  return <JsonLd data={data} />;
}

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
  return <JsonLd data={data} />;
}

type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE.url}${it.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

type FAQItem = { question: string; answer: string };

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * A named author with a verifiable identity. When the `@id` matches a Person
 * node elsewhere on the site (e.g. TeamSchema on /team), engines resolve them
 * to the same entity.
 */
type ArticleAuthor = {
  name: string;
  /** Canonical entity id — set equal to the person's /team `@id` to unify. */
  id?: string;
  /** Profile URL for the author. */
  url?: string;
  jobTitle?: string;
  /** External identity links (e.g. LinkedIn). */
  sameAs?: readonly string[];
  image?: string;
};

/** A crawlable image for the article (e.g. its inline diagram, as a raster). */
type ArticleImage = {
  url: string;
  width: number;
  height: number;
  caption?: string;
};

type ArticleProps = {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  /** A bare name (e.g. anonymised transcripts) or a full identity. */
  author: string | ArticleAuthor;
  /**
   * Article image as a real image file. Inline SVG is invisible to image
   * search, so posts with a diagram register its PNG here for Google Images
   * and AI-citation.
   */
  image?: ArticleImage;
};

function authorNode(author: string | ArticleAuthor) {
  if (typeof author === "string") return { "@type": "Person", name: author };
  const node: Record<string, unknown> = { "@type": "Person", name: author.name };
  if (author.id) node["@id"] = author.id;
  if (author.url) node.url = author.url;
  if (author.jobTitle) node.jobTitle = author.jobTitle;
  if (author.sameAs && author.sameAs.length) node.sameAs = [...author.sameAs];
  if (author.image) node.image = author.image;
  return node;
}

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
}: ArticleProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    // `updatedAt` is a row-touch timestamp, so for scheduled posts it can
    // predate publication. A dateModified earlier than datePublished is
    // incoherent to search/AI engines — clamp it to the later of the two.
    dateModified:
      dateModified && dateModified > datePublished ? dateModified : datePublished,
    author: authorNode(author),
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  if (image) {
    data.image = {
      "@type": "ImageObject",
      url: image.url,
      contentUrl: image.url,
      width: image.width,
      height: image.height,
      ...(image.caption ? { caption: image.caption } : {}),
    };
  }
  return <JsonLd data={data} />;
}

type ServiceProps = {
  name: string;
  description: string;
  url: string;
  priceFrom?: { amount: number; currency: string };
};

export function ServiceSchema({ name, description, url, priceFrom }: ServiceProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
  // Deliberately no `offers`/`price`: machine-readable prices here get
  // surfaced as SERP rich results, which conflicts with the site's
  // price-placement policy (rates live on /pricing and comparison tables).
  // `priceFrom` is retained in the props for callers but not emitted.
  void priceFrom;
  return <JsonLd data={data} />;
}

type LocalBusinessProps = {
  regionName: string;
  description: string;
  url: string;
  /** Markets served. Emitted as discrete Place entities, not one string. */
  areaServed: readonly string[];
  /** Languages offered for the engagement (e.g. ["en", "fr", "de"]). */
  availableLanguage?: readonly string[];
};

export function LocalBusinessSchema({
  regionName,
  description,
  url,
  areaServed,
  availableLanguage,
}: LocalBusinessProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE.name} — ${regionName}`,
    parentOrganization: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    description,
    url,
    areaServed: areaServed.map((a) => ({ "@type": "Place", name: a })),
    email: SITE.contactEmail,
  };
  if (availableLanguage && availableLanguage.length > 0) {
    data.availableLanguage = [...availableLanguage];
  }
  return <JsonLd data={data} />;
}

export type TeamMember = {
  /** Full name as it should appear in search results. */
  name: string;
  jobTitle: string;
  /** Absolute-from-root path to the headshot, e.g. "/team/foo.jpg". */
  photo: string;
  /** LinkedIn profile URL — emitted as `sameAs` to link the entity. */
  linkedin: string;
  /** City the team member works from, if disclosed. */
  location?: string;
};

/**
 * Emits one Person node per team member, each `worksFor` the organisation
 * and `sameAs` their LinkedIn profile. This is what lets Google associate
 * the named individuals on /team with their real-world identities rather
 * than treating them as loose strings.
 */
export function TeamSchema({ members }: { members: readonly TeamMember[] }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": members.map((m) => {
      const person: Record<string, unknown> = {
        "@type": "Person",
        "@id": `${SITE.url}/team#${m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: m.name,
        jobTitle: m.jobTitle,
        image: `${SITE.url}${m.photo}`,
        url: `${SITE.url}/team`,
        sameAs: [m.linkedin],
        worksFor: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
      };
      if (m.location) {
        person.workLocation = { "@type": "Place", name: m.location };
      }
      return person;
    }),
  };
  return <JsonLd data={data} />;
}
