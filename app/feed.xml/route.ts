import { getOutbreak } from "@/lib/outbreak";
import { getUpdates } from "@/lib/updates";
import { SITE_NAME, SITE_URL, canonical } from "@/lib/seo";

export const dynamic = "force-static";

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function pubDate(date: string): string {
  return new Date(`${date}T00:00:00+08:00`).toUTCString();
}

export function GET() {
  const data = getOutbreak();
  const items = getUpdates()
    .map((entry) => {
      const link = `${canonical("/updates")}#${entry.id}`;
      return [
        "<item>",
        `<title>${xmlEscape(entry.title)}</title>`,
        `<link>${xmlEscape(link)}</link>`,
        `<guid isPermaLink="false">${xmlEscape(entry.id)}</guid>`,
        `<pubDate>${pubDate(entry.date)}</pubDate>`,
        `<description>${xmlEscape(entry.summary)}</description>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${xmlEscape(SITE_NAME)} Updates</title>`,
    `<link>${xmlEscape(SITE_URL)}</link>`,
    "<description>Source-linked updates from Hantavirus Tracker.</description>",
    `<lastBuildDate>${new Date(data.lastUpdated).toUTCString()}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
