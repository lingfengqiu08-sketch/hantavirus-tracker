import type { Metadata } from "next";
import Link from "next/link";
import { SourceList } from "@/components/source-list";
import { getOutbreak } from "@/lib/outbreak";
import { getUpdates } from "@/lib/updates";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Tracker Updates",
  description:
    "Update log for Hantavirus Tracker, including source-linked changes to the MV Hondius Andes virus outbreak dataset.",
  alternates: { canonical: canonical("/updates") },
  openGraph: {
    title: "Hantavirus Tracker Updates",
    description:
      "Source-linked changes to the MV Hondius Andes virus outbreak dataset.",
    url: canonical("/updates"),
    type: "article",
  },
};

export default function UpdatesPage() {
  const data = getOutbreak();
  const updateEntries = getUpdates();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonical("/updates")}#updates`,
    name: "Hantavirus Tracker update log",
    itemListElement: updateEntries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.title,
      description: entry.summary,
      dateModified: entry.date,
    })),
  };

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Update log</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Hantavirus Tracker Updates
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Source-linked changes to the MV Hondius Andes virus outbreak dataset. Current dataset
          timestamp: {data.lastUpdated}.
        </p>
      </header>

      <section className="space-y-4">
        {updateEntries.map((entry) => (
          <article key={entry.id} id={entry.id} className="space-y-3 rounded-lg border p-4">
            <div>
              <time className="text-sm font-medium text-muted-foreground">{entry.date}</time>
              <h2 className="mt-1 text-xl font-semibold">{entry.title}</h2>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{entry.summary}</p>
            <SourceList sources={entry.sources} />
          </article>
        ))}
      </section>

      <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Data feeds</p>
        <ul className="mt-2 space-y-1">
          <li>
            <a className="underline underline-offset-4" href="/data/outbreak.json">
              Outbreak JSON
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href="/data/outbreak.csv">
              Outbreak CSV
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href="/data/updates.json">
              Updates JSON
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href="/data/country-responses.csv">
              Country response CSV
            </a>
          </li>
          <li>
            <a className="underline underline-offset-4" href="/feed.xml">
              RSS feed
            </a>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/methodology">
              Methodology
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
