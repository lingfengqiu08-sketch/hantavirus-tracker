import type { Metadata } from "next";
import Link from "next/link";
import { SourceList } from "@/components/source-list";
import { UpdateBanner } from "@/components/update-banner";
import { getCountryResponses } from "@/lib/country-responses";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MV Hondius Response Tracker: Quarantine and Country Updates",
  description:
    "Country response tracker for the MV Hondius Andes hantavirus outbreak, including quarantine, monitoring, case status, public risk, and official sources.",
  alternates: { canonical: canonical("/response-tracker") },
  openGraph: {
    title: "MV Hondius Response Tracker",
    description:
      "Quarantine, monitoring, country updates, case status, public risk, and official sources.",
    url: canonical("/response-tracker"),
    type: "article",
  },
};

export default function ResponseTrackerPage() {
  const data = getOutbreak();
  const responses = getCountryResponses();
  const sourceIds = Array.from(new Set(responses.flatMap((entry) => entry.sourceIds)));
  const sources = getSourcesByIds(sourceIds);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${canonical("/response-tracker")}#country-response-dataset`,
    name: "MV Hondius country response tracker",
    description:
      "Official-source country response table for the MV Hondius Andes hantavirus outbreak.",
    url: canonical("/response-tracker"),
    dateModified: data.lastUpdated,
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${canonical("/")}data/country-responses.csv`,
    },
  };

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Response tracker</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          MV Hondius Response Tracker: Quarantine and Country Updates
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Official-source table tracking quarantine, monitoring, case status, and public-risk
          statements by country or region. It is not a global surveillance dashboard.
        </p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Country Response Table</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-[980px] border-collapse text-left text-sm">
            <thead className="bg-muted/60 text-foreground">
              <tr>
                <th className="border-b p-3 font-medium">Country / region</th>
                <th className="border-b p-3 font-medium">Latest update</th>
                <th className="border-b p-3 font-medium">People affected</th>
                <th className="border-b p-3 font-medium">Response</th>
                <th className="border-b p-3 font-medium">Monitoring</th>
                <th className="border-b p-3 font-medium">Case status</th>
                <th className="border-b p-3 font-medium">Public risk</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((entry) => (
                <tr key={entry.slug} className="align-top">
                  <td className="border-b p-3 font-medium text-foreground">{entry.country}</td>
                  <td className="border-b p-3 text-muted-foreground">{entry.latestUpdateDate}</td>
                  <td className="border-b p-3 text-muted-foreground">{entry.peopleAffected}</td>
                  <td className="border-b p-3 text-muted-foreground">{entry.response}</td>
                  <td className="border-b p-3 text-muted-foreground">{entry.monitoring}</td>
                  <td className="border-b p-3 text-muted-foreground">{entry.caseStatus}</td>
                  <td className="border-b p-3 text-muted-foreground">{entry.publicRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          CSV export:{" "}
          <a className="underline underline-offset-4" href="/data/country-responses.csv">
            /data/country-responses.csv
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How to Use This Table</h2>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            The table separates official country response from the outbreak case count. A country
            can have monitored passengers without a confirmed local case.
          </p>
          <p>
            Counts and response details can change as confirmatory testing, repatriation, and
            quarantine decisions progress. Use the linked source date before quoting any row.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Sources</h2>
        <SourceList sources={sources} />
      </section>

      <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Country pages</p>
        <ul className="mt-2 space-y-1">
          <li>
            <Link className="underline underline-offset-4" href="/cases/australia">
              Australia quarantine context
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/cases/canada">
              Canada presumptive case context
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/cases/uk">
              UK monitoring context
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/cases">
              All case context pages
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
