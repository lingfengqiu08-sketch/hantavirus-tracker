import type { Metadata } from "next";
import Link from "next/link";
import { KpiCard } from "@/components/kpi-card";
import { SourceList } from "@/components/source-list";
import { UpdateBanner } from "@/components/update-banner";
import { getOutbreak, getSourcesByIds, getTotalCases } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Case Definitions: Confirmed, Probable, Inconclusive",
  description:
    "Plain-language case definitions used by Hantavirus Tracker for the MV Hondius Andes virus outbreak: confirmed, probable, inconclusive, suspected, and deaths.",
  alternates: { canonical: canonical("/case-definitions") },
  openGraph: {
    title: "Hantavirus Case Definitions",
    description:
      "Confirmed, probable, inconclusive, suspected, and death classifications for the MV Hondius Andes virus outbreak.",
    url: canonical("/case-definitions"),
    type: "article",
  },
};

export default function CaseDefinitionsPage() {
  const data = getOutbreak();
  const totalCases = getTotalCases(data);
  const sources = getSourcesByIds([
    "src-ecdc-outbreak-2026-05-17",
    "src-who-speech-2026-05-12",
    "src-who-don-2026-05-08",
    "src-cdc-clinical-overview",
  ]);

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Data definitions</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Hantavirus Case Definitions
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Definitions used on Hantavirus Tracker for the MV Hondius Andes virus outbreak. These
          categories help separate current confirmed infections from cases still being classified.
        </p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Current Status Split</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <KpiCard label="Total" value={totalCases} description="All reported case statuses" />
          <KpiCard label="Confirmed" value={data.confirmed} description="Lab-confirmed Andes virus" tone="amber" />
          <KpiCard label="Probable" value={data.probable} description="Epidemiologically linked" />
          <KpiCard label="Inconclusive" value={data.inconclusive} description="Not finally classified" />
          <KpiCard label="Deaths" value={data.deaths} description="Reported deaths" tone="red" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Definitions Used Here</h2>
        <dl className="space-y-3 text-sm text-muted-foreground">
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Confirmed case</dt>
            <dd>
              A symptomatic person with laboratory confirmation of Andes virus infection, based on
              public WHO/ECDC case definitions and updates.
            </dd>
          </div>
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Probable case</dt>
            <dd>
              A symptomatic person epidemiologically linked to a confirmed or probable case, but
              without final laboratory confirmation in public reporting.
            </dd>
          </div>
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Inconclusive case</dt>
            <dd>
              A reported case where public-health updates have not assigned a final confirmed or
              probable classification.
            </dd>
          </div>
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Suspected case</dt>
            <dd>
              A person with compatible exposure and symptoms who has not yet been ruled in or out
              by the latest public updates.
            </dd>
          </div>
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Death</dt>
            <dd>
              A death reported by official sources as linked to the MV Hondius cluster. This site
              does not publish identifying details about individual cases.
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Why Counts Can Change</h2>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            Outbreak counts can move when laboratory results return, a probable case becomes
            confirmed, an inconclusive case is reclassified, or a suspected case is ruled out.
          </p>
          <p>
            The current total on this site follows the latest official status split. Older timeline
            entries keep historical wording so readers can see how the outbreak record changed.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Sources</h2>
        <SourceList sources={sources} />
      </section>

      <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Continue reading</p>
        <ul className="mt-2 space-y-1">
          <li>
            <Link className="underline underline-offset-4" href="/methodology">
              Methodology
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/timeline">
              Outbreak timeline
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
