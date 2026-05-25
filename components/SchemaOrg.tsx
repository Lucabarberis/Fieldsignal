import { SITE } from "@/lib/site";

/**
 * JSON-LD schema components per the SEO brief §2.5.
 *
 *   <OrganizationSchema />          ← sitewide, mounted in layout
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
    foundingLocation: {
      "@type": "Place",
      name: SITE.jurisdiction,
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

type ArticleProps = {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
};

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
}: ArticleProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
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
  if (priceFrom) {
    data.offers = {
      "@type": "Offer",
      price: priceFrom.amount,
      priceCurrency: priceFrom.currency,
    };
  }
  return <JsonLd data={data} />;
}

type LocalBusinessProps = {
  regionName: string;
  description: string;
  url: string;
  areaServed: string;
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
    areaServed,
    email: SITE.contactEmail,
  };
  if (availableLanguage && availableLanguage.length > 0) {
    data.availableLanguage = [...availableLanguage];
  }
  return <JsonLd data={data} />;
}
