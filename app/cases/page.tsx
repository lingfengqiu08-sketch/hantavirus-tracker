import type { Metadata } from "next";
import Link from "next/link";
import { KpiCard } from "@/components/kpi-card";
import { SourceList } from "@/components/source-list";
import { UpdateBanner } from "@/components/update-banner";
import { getOutbreak, getSourcesByIds, getTotalCases } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Cases: MV Hondius Tracker and Country Context",
  description:
    "Current MV Hondius hantavirus case count, status split, and country-context pages for UK, Argentina, and Chile without unsupported local-spread claims.",
  alternates: { canonical: canonical("/cases") },
  openGraph: {
    title: "Hantavirus Cases and MV Hondius Tracker",
    description:
      "Current MV Hondius case count, status split, and country-context pages.",
    url: canonical("/cases"),
    type: "article",
  },
};

const countryPages = [
  {
    href: "/cases/uk",
    title: "UK cases and monitoring",
    description: "UKHSA monitoring, Arrowe Park, and wider UK public-risk context.",
  },
  {
    href: "/cases/argentina",
    title: "Argentina context",
    description: "Ushuaia departure, Andes virus context, and what cannot be inferred.",
  },
  {
    href: "/cases/chile",
    title: "Chile context",
    description: "Andes virus regional context and limits of the MV Hondius dataset.",
  },
];

export default function CasesPage() {
  const data = getOutbreak();
  const totalCases = getTotalCases(data);
  const sources = getSourcesByIds([
    "src-ecdc-outbreak-2026-05-14",
    "src-who-speech-2026-05-12",
    "src-who-don-2026-05-08",
    "src-govuk-ukhsa-update-2026-05-12",
  ]);

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Case tracker</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Hantavirus Cases: MV Hondius Tracker and Country Context
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Current MV Hondius status split plus country-context pages. This site tracks the cruise
          ship-linked Andes virus cluster and does not invent national case counts from partial
          media reports.
        </p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Current MV Hondius Count</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <KpiCard label="Total" value={totalCases} description="All reported case statuses" />
          <KpiCard label="Confirmed" value={data.confirmed} description="Lab-confirmed Andes virus" tone="amber" />
          <KpiCard label="Probable" value={data.probable} description="Epidemiologically linked" />
          <KpiCard label="Inconclusive" value={data.inconclusive} description="Pending classification" />
          <KpiCard label="Deaths" value={data.deaths} description="Reported deaths" tone="red" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Country Context Pages</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {countryPages.map((page) => (
            <Link key={page.href} href={page.href} className="rounded-lg border p-4 hover:bg-muted/40">
              <h3 className="font-medium">{page.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{page.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What This Page Does Not Claim</h2>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            This is not a global hantavirus surveillance dashboard and not a US state-by-state
            database. It is focused on the MV Hondius Andes virus cluster and official-source
            context around that event.
          </p>
          <p>
            For country surveillance, use the relevant national public-health authority. For the
            cruise outbreak, start with the{" "}
            <Link className="underline underline-offset-4" href="/cruise/mv-hondius">
              MV Hondius tracker
            </Link>{" "}
            and{" "}
            <Link className="underline underline-offset-4" href="/case-definitions">
              case definitions
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Sources</h2>
        <SourceList sources={sources} />
      </section>
    </article>
  );
}
