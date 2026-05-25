import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPostSlugs } from "@/lib/posts";
import { services } from "@/content/data/services";
import { industries } from "@/content/data/industries";
import { clients } from "@/content/data/clients";
import { complianceSubs } from "@/content/data/compliance-subs";
import { alternatives } from "@/content/data/alternatives";
import { compares } from "@/content/data/compare";
import { industrySubniches } from "@/content/data/industry-subniches";
import { useCases } from "@/content/data/use-cases";
import { expertPages } from "@/content/data/experts-pages";
import { guides } from "@/content/data/guides";
import { glossary } from "@/content/data/glossary";
import { platformPages } from "@/content/data/platform";
import { regions } from "@/content/data/regions";
import {
  getAllTranscripts,
  getAllTranscriptIndustrySlugs,
  getAllTranscriptCompanySlugs,
  getAllTranscriptTopicSlugs,
} from "@/lib/db/transcripts";

/**
 * Sitemap. Next.js auto-serves this at /sitemap.xml.
 *
 * As waves land, append new URLs here. Once we cross ~500 URLs we'll
 * split into multiple sitemaps via `generateSitemaps` per SEO brief §5.2.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    // Core
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Hubs
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/clients`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/resources/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // Alternatives + Compare hubs (Wave 2 — highest commercial intent)
    { url: `${SITE.url}/alternatives`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Wave 4 hubs
    { url: `${SITE.url}/use-cases`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE.url}/experts`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Wave 5 hubs
    { url: `${SITE.url}/resources/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/resources/glossary`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE.url}/platform`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/regions`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },

    // Wave 6 hub
    { url: `${SITE.url}/transcripts`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },

    // Contact
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact/request-a-call`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact/get-a-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact/book-a-demo`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // Compliance + legal
    { url: `${SITE.url}/compliance`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/terms-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${SITE.url}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const subnicheRoutes: MetadataRoute.Sitemap = industrySubniches.map((s) => ({
    url: `${SITE.url}/industries/${s.parentSlug}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const clientRoutes: MetadataRoute.Sitemap = clients.map((c) => ({
    url: `${SITE.url}/clients/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const complianceSubRoutes: MetadataRoute.Sitemap = complianceSubs.map((c) => ({
    url: `${SITE.url}/compliance/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const alternativeRoutes: MetadataRoute.Sitemap = alternatives.map((a) => ({
    url: `${SITE.url}/alternatives/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const compareRoutes: MetadataRoute.Sitemap = compares.map((c) => ({
    url: `${SITE.url}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const useCaseRoutes: MetadataRoute.Sitemap = useCases.map((u) => ({
    url: `${SITE.url}/use-cases/${u.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const expertRoutes: MetadataRoute.Sitemap = expertPages.map((p) => ({
    url: `${SITE.url}/experts/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE.url}/resources/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = glossary.map((t) => ({
    url: `${SITE.url}/resources/glossary/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const platformRoutes: MetadataRoute.Sitemap = platformPages.map((p) => ({
    url: `${SITE.url}/platform/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const regionRoutes: MetadataRoute.Sitemap = regions.map((r) => ({
    url: `${SITE.url}/regions/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const transcripts = await getAllTranscripts();
  const transcriptRoutes: MetadataRoute.Sitemap = transcripts.map((t) => ({
    url: `${SITE.url}/transcripts/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const transcriptIndustrySlugs = await getAllTranscriptIndustrySlugs();
  const transcriptIndustryRoutes: MetadataRoute.Sitemap = transcriptIndustrySlugs.map((slug) => ({
    url: `${SITE.url}/transcripts/by-industry/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const transcriptCompanies = await getAllTranscriptCompanySlugs();
  const transcriptCompanyRoutes: MetadataRoute.Sitemap = transcriptCompanies.map((c) => ({
    url: `${SITE.url}/transcripts/by-company/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.55,
  }));

  const transcriptTopics = await getAllTranscriptTopicSlugs();
  const transcriptTopicRoutes: MetadataRoute.Sitemap = transcriptTopics.map((t) => ({
    url: `${SITE.url}/transcripts/by-topic/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.55,
  }));

  const blogSlugs = await getAllPostSlugs();
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE.url}/resources/blog/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...subnicheRoutes,
    ...clientRoutes,
    ...complianceSubRoutes,
    ...alternativeRoutes,
    ...compareRoutes,
    ...useCaseRoutes,
    ...expertRoutes,
    ...guideRoutes,
    ...glossaryRoutes,
    ...platformRoutes,
    ...regionRoutes,
    ...transcriptRoutes,
    ...transcriptIndustryRoutes,
    ...transcriptCompanyRoutes,
    ...transcriptTopicRoutes,
    ...blogRoutes,
  ];
}
