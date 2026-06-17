import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { outbreak } from "@/lib/outbreak";

// NOTE: The following paths are intentionally excluded from the sitemap and
// carry `robots: { index: false, follow: true }` in their page metadata
// (thin / duplicative content as of 2026-05-21 GSC review):
//   /prevention, /origin, /types, /travel-advice, /case-definitions,
//   /cases/argentina, /cases/chile, /cases/eu-eea
// Re-add here only after a page is rebuilt with original, ranking-worthy content.

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(outbreak.lastUpdated);
  const transmissionContentLastModified = new Date("2026-05-25T00:00:00Z");
  const incubationCtrLastModified = new Date("2026-06-17T00:00:00Z");
  const treatmentCtrLastModified = new Date("2026-06-17T00:00:00Z");
  const testCtrLastModified = new Date("2026-06-17T00:00:00Z");
  const responseTrackerContentLastModified = new Date("2026-05-25T00:00:00Z");
  const andesVirusContentLastModified = new Date("2026-05-26T00:00:00Z");
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/cruise/mv-hondius`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/incubation`,
      lastModified: incubationCtrLastModified,
      changeFrequency: "weekly",
      priority: 0.92,
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
      lastModified: transmissionContentLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/treatment`,
      lastModified: treatmentCtrLastModified,
      changeFrequency: "weekly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/test`,
      lastModified: testCtrLastModified,
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
      url: `${SITE_URL}/andes-virus`,
      lastModified: andesVirusContentLastModified,
      changeFrequency: "weekly",
      priority: 0.79,
    },
    {
      url: `${SITE_URL}/cases/united-states`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.74,
    },
    {
      url: `${SITE_URL}/cases/united-kingdom`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.72,
    },
    {
      url: `${SITE_URL}/cases/australia`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.72,
    },
    {
      url: `${SITE_URL}/cases/netherlands`,
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
      url: `${SITE_URL}/timeline`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.84,
    },
    {
      url: `${SITE_URL}/response-tracker`,
      lastModified: responseTrackerContentLastModified,
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
  ];
}
