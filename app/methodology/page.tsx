import type { Metadata } from "next";
import Link from "next/link";
import { SourceList } from "@/components/source-list";
import { UpdateBanner } from "@/components/update-banner";
import { getOutbreak } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Methodology and Data Sources",
  description:
    "How Hantavirus Tracker compiles, verifies and updates MV Hondius outbreak data. Case definitions, update cadence, and source hierarchy.",
  alternates: { canonical: canonical("/methodology") },
  openGraph: {
    title: "Methodology and Data Sources",
    description:
      "Update cadence, case definitions and source hierarchy for the Hantavirus Tracker.",
    url: canonical("/methodology"),
    type: "article",
  },
};

export default function MethodologyPage() {
  const data = getOutbreak();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">About this tracker</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Methodology and Data Sources
        </h1>
        <p className="text-base text-muted-foreground">
          Hantavirus Tracker is an independent project. It compiles and cross-checks public
          information about the 2026 MV Hondius Andes virus outbreak. This page documents what
          we do, how we update, and how to verify any number we publish.
        </p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Update cadence</h2>
        <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
          <li>
            The dataset is manually verified at least twice per day from official sources.
          </li>
          <li>
            Each update sets <code>lastUpdated</code> and <code>lastVerifiedAt</code> — both are
            shown in the page banner.
          </li>
          <li>
            Headline counts use the latest official source by publication date. WHO and ECDC are
            primary outbreak sources; CDC is used for clinical and transmission context.
          </li>
          <li>
            If official counts differ, we publish the latest official status split and keep older
            source wording in the timeline where useful.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Source hierarchy</h2>
        <ol className="ml-5 list-decimal space-y-1 text-sm text-muted-foreground">
          <li>WHO Director-General briefings and Disease Outbreak News (primary).</li>
          <li>ECDC outbreak page and press updates (cross-verification, EU detail).</li>
          <li>CDC About Hantavirus, About Andes Virus, and MV Hondius statements (US detail).</li>
          <li>National public-health authorities (Spain, France, the Netherlands, UK, US) when those countries publish primary figures.</li>
          <li>
            Wire services and reputable news outlets are used only to corroborate publicly
            disclosed individual information (such as nationality of a hospitalised patient)
            and route stops.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Case definitions</h2>
        <p className="text-sm text-muted-foreground">
          We use ECDC/WHO definitions verbatim where available:
        </p>
        <dl className="space-y-3 text-sm text-muted-foreground">
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Confirmed case</dt>
            <dd>
              Symptomatic person with laboratory confirmation of Andes virus by RT-PCR or
              serology.
            </dd>
          </div>
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Probable case</dt>
            <dd>
              Symptomatic person epidemiologically linked to a confirmed or probable case
              without lab confirmation.
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
              Person with exposure history aboard MV Hondius and fever plus respiratory,
              gastrointestinal, or muscle symptoms.
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What we do not do</h2>
        <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
          <li>We do not publish individual identifying information about cases.</li>
          <li>We do not provide medical advice. For symptoms, contact a clinician.</li>
          <li>
            We do not replicate AIS / vessel-tracking data; route nodes come from official
            statements about port calls and medical evacuations.
          </li>
          <li>We do not paywall the tracker. All data is open.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Open data</h2>
        <p className="text-sm text-muted-foreground">
          The full machine-readable dataset is available at{" "}
          <a className="underline underline-offset-4" href="/data/outbreak.json">
            /data/outbreak.json
          </a>
          . Reuse is welcome with attribution. A CSV export is also available at{" "}
          <a className="underline underline-offset-4" href="/data/outbreak.csv">
            /data/outbreak.csv
          </a>
          . Country response rows are available at{" "}
          <a className="underline underline-offset-4" href="/data/country-responses.csv">
            /data/country-responses.csv
          </a>
          . Update history is available at{" "}
          <a className="underline underline-offset-4" href="/data/updates.json">
            /data/updates.json
          </a>{" "}
          and{" "}
          <a className="underline underline-offset-4" href="/feed.xml">
            /feed.xml
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Corrections</h2>
        <p className="text-sm text-muted-foreground">
          To request a correction or report a source we have missed, please file an issue or
          email the project (contact details will be added on this page as the project
          stabilises).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Sources currently used</h2>
        <SourceList sources={data.sources} />
      </section>

      <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Continue</p>
        <ul className="mt-2 space-y-1">
          <li>
            <Link className="underline underline-offset-4" href="/">
              Outbreak tracker home
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/cruise/mv-hondius">
              MV Hondius outbreak page
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/case-definitions">
              Case definitions
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/updates">
              Update log
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
