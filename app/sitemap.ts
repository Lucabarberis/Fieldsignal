import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
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
 *
 * `lastModified` policy: only emitted where we have a real content date
 * (blog posts and transcripts carry publishedAt/updatedAt; their hub pages
 * get the newest child date). Static and data-file routes omit it — a
 * uniform deploy timestamp on every URL teaches Google to distrust the
 * field, while omission is valid per the sitemap spec.
 */

/** Newest date in a list of ISO date strings, as a Date (or undefined). */
function newest(dates: (string | undefined)[]): Date | undefined {
  const valid = dates.filter((d): d is string => Boolean(d)).sort();
  const last = valid[valid.length - 1];
  return last ? new Date(last) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const transcripts = await getAllTranscripts();

  const newestPostDate = newest(posts.map((p) => p.updatedAt ?? p.publishedAt));
  const newestTranscriptDate = newest(
    transcripts.map((t) => t.updatedAt ?? t.publishedAt),
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    // Core
    { url: `${SITE.url}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/team`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/pricing`, changeFrequency: "monthly", priority: 0.9 },

    // Hubs
    { url: `${SITE.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/industries`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/clients`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/resources`, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${SITE.url}/resources/blog`,
      lastModified: newestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Alternatives + Compare hubs (Wave 2 — highest commercial intent)
    { url: `${SITE.url}/alternatives`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/compare`, changeFrequency: "monthly", priority: 0.9 },

    // Wave 4 hubs
    { url: `${SITE.url}/use-cases`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE.url}/experts`, changeFrequency: "monthly", priority: 0.8 },

    // Wave 5 hubs
    { url: `${SITE.url}/resources/guides`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/resources/glossary`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE.url}/platform`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/regions`, changeFrequency: "monthly", priority: 0.75 },

    // Wave 6 hub
    {
      url: `${SITE.url}/transcripts`,
      lastModified: newestTranscriptDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    // Tools
    {
      url: `${SITE.url}/tools/expert-network-cost-estimator`,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Contact
    { url: `${SITE.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact/request-a-call`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact/get-a-quote`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact/book-a-demo`, changeFrequency: "monthly", priority: 0.6 },

    // Compliance + legal
    { url: `${SITE.url}/compliance`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/terms-conditions`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${SITE.url}/industries/${i.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const subnicheRoutes: MetadataRoute.Sitemap = industrySubniches.map((s) => ({
    url: `${SITE.url}/industries/${s.parentSlug}/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const clientRoutes: MetadataRoute.Sitemap = clients.map((c) => ({
    url: `${SITE.url}/clients/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const complianceSubRoutes: MetadataRoute.Sitemap = complianceSubs.map((c) => ({
    url: `${SITE.url}/compliance/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const alternativeRoutes: MetadataRoute.Sitemap = alternatives.map((a) => ({
    url: `${SITE.url}/alternatives/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const compareRoutes: MetadataRoute.Sitemap = compares.map((c) => ({
    url: `${SITE.url}/compare/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const useCaseRoutes: MetadataRoute.Sitemap = useCases.map((u) => ({
    url: `${SITE.url}/use-cases/${u.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const expertRoutes: MetadataRoute.Sitemap = expertPages.map((p) => ({
    url: `${SITE.url}/experts/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE.url}/resources/guides/${g.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = glossary.map((t) => ({
    url: `${SITE.url}/resources/glossary/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const platformRoutes: MetadataRoute.Sitemap = platformPages.map((p) => ({
    url: `${SITE.url}/platform/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const regionRoutes: MetadataRoute.Sitemap = regions.map((r) => ({
    url: `${SITE.url}/regions/${r.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const transcriptRoutes: MetadataRoute.Sitemap = transcripts.map((t) => ({
    url: `${SITE.url}/transcripts/${t.slug}`,
    lastModified: new Date(t.updatedAt ?? t.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const transcriptIndustrySlugs = await getAllTranscriptIndustrySlugs();
  const transcriptIndustryRoutes: MetadataRoute.Sitemap = transcriptIndustrySlugs.map((slug) => ({
    url: `${SITE.url}/transcripts/by-industry/${slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const transcriptCompanies = await getAllTranscriptCompanySlugs();
  const transcriptCompanyRoutes: MetadataRoute.Sitemap = transcriptCompanies.map((c) => ({
    url: `${SITE.url}/transcripts/by-company/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.55,
  }));

  const transcriptTopics = await getAllTranscriptTopicSlugs();
  const transcriptTopicRoutes: MetadataRoute.Sitemap = transcriptTopics.map((t) => ({
    url: `${SITE.url}/transcripts/by-topic/${t.slug}`,
    changeFrequency: "weekly",
    priority: 0.55,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/resources/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
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
