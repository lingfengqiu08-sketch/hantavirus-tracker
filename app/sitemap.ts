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
