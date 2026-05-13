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
  ];
}
