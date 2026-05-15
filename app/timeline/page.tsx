import type { Metadata } from "next";
import Link from "next/link";
import { SourceList } from "@/components/source-list";
import { Timeline } from "@/components/timeline";
import { UpdateBanner } from "@/components/update-banner";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MV Hondius Hantavirus Outbreak Timeline",
  description:
    "Chronological timeline of the 2026 MV Hondius Andes virus outbreak, including voyage events, WHO/ECDC updates, deaths, and monitoring milestones.",
  alternates: { canonical: canonical("/timeline") },
  openGraph: {
    title: "MV Hondius Hantavirus Outbreak Timeline",
    description:
      "Chronological timeline of the 2026 MV Hondius Andes virus outbreak, with official-source links.",
    url: canonical("/timeline"),
    type: "article",
  },
};

export default function TimelinePage() {
  const data = getOutbreak();
  const sourceIds = Array.from(new Set(data.timeline.flatMap((item) => item.sources)));
  const sources = getSourcesByIds(sourceIds);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonical("/timeline")}#timeline`,
    name: "MV Hondius hantavirus outbreak timeline",
    itemListElement: data.timeline.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      description: item.detail,
      datePublished: item.date,
    })),
  };

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Outbreak timeline</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          MV Hondius Hantavirus Outbreak Timeline
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          A source-linked chronology of the 2026 MV Hondius Andes virus outbreak, from the voyage
          and first reported symptoms through official updates and the current monitoring window.
        </p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Event Timeline</h2>
        <Timeline items={data.timeline} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How to Read the Timeline</h2>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            Timeline entries preserve what official sources reported at that point in time. Later
            entries can reclassify cases as confirmed, probable, inconclusive, or suspected.
          </p>
          <p>
            For the current headline count, use the homepage and the{" "}
            <Link className="underline underline-offset-4" href="/cruise/mv-hondius">
              MV Hondius outbreak page
            </Link>
            , not older historical entries.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Timeline Sources</h2>
        <SourceList sources={sources} />
      </section>

      <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Continue reading</p>
        <ul className="mt-2 space-y-1">
          <li>
            <Link className="underline underline-offset-4" href="/case-definitions">
              Case definitions
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/travel-advice">
              Travel advice and contact monitoring
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
