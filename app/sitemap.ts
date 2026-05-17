import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { outbreak } from "@/lib/outbreak";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(outbreak.lastUpdated);
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/cruise/mv-hondius`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/symptoms`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/hps`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/transmission`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/treatment`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/test`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.77,
    },
    {
      url: `${SITE_URL}/death-rate`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.76,
    },
    {
      url: `${SITE_URL}/rodents`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.74,
    },
    {
      url: `${SITE_URL}/incubation`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.72,
    },
    {
      url: `${SITE_URL}/prevention`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/andes-virus`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.68,
    },
    {
      url: `${SITE_URL}/cases/uk`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.66,
    },
    {
      url: `${SITE_URL}/cases/australia`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.72,
    },
    {
      url: `${SITE_URL}/cases/canada`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.72,
    },
    {
      url: `${SITE_URL}/cases`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/cases/argentina`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.58,
    },
    {
      url: `${SITE_URL}/cases/chile`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.56,
    },
    {
      url: `${SITE_URL}/types`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.69,
    },
    {
      url: `${SITE_URL}/origin`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.67,
    },
    {
      url: `${SITE_URL}/timeline`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.84,
    },
    {
      url: `${SITE_URL}/case-definitions`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.62,
    },
    {
      url: `${SITE_URL}/travel-advice`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.64,
    },
    {
      url: `${SITE_URL}/response-tracker`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.86,
    },
    {
      url: `${SITE_URL}/updates`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/what-is-hantavirus`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/methodology`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.45,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/medical-disclaimer`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.35,
    },
    {
      url: `${SITE_URL}/corrections`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.35,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
