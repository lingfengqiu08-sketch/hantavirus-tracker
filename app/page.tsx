import type { Metadata } from "next";
import Link from "next/link";
import { KpiCard } from "@/components/kpi-card";
import { Timeline } from "@/components/timeline";
import { FAQ } from "@/components/faq";
import { SourceList } from "@/components/source-list";
import { UpdateBanner } from "@/components/update-banner";
import OutbreakMapLoader from "@/components/maps/outbreak-map-loader";
import { getOutbreak } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Tracker | MV Hondius Andes Virus Map",
  description:
    "Track the 2026 MV Hondius Andes virus outbreak with case counts, deaths, route map, passenger status, timeline, methodology, and official sources.",
  alternates: { canonical: canonical("/") },
  openGraph: {
    title: "Hantavirus Tracker | MV Hondius Andes Virus Map",
    description:
      "2026 MV Hondius Andes virus outbreak map, case count, deaths, timeline, and sources.",
    url: canonical("/"),
    type: "website",
  },
};

const faq = [
  {
    question: "How many MV Hondius hantavirus cases are confirmed?",
    answer:
      "As of the 12 May 2026 WHO briefing, 9 confirmed Andes virus infections and 2 probable cases have been reported, for an 11-case headline total.",
  },
  {
    question: "How many deaths have been reported?",
    answer:
      "Three deaths have been reported among MV Hondius-linked cases.",
  },
  {
    question: "Is Andes virus contagious between people?",
    answer:
      "Andes virus is the only hantavirus with documented limited person-to-person transmission, which has been reported in cases of close and prolonged contact.",
  },
  {
    question: "Why are passengers monitored for 42 days?",
    answer:
      "WHO recommends a 42-day monitoring window from last possible exposure. With last exposure on 10 May 2026, monitoring runs through 21 June 2026.",
  },
  {
    question: "Is there a wider outbreak?",
    answer:
      "WHO stated on 12 May 2026 that there was no sign of a wider outbreak, while noting that more cases could appear during the incubation period.",
  },
];

export default function HomePage() {
  const data = getOutbreak();

  const mapPoints = data.ship.route.map((node, idx) => ({
    id: `route-${idx}`,
    label: node.location,
    lat: node.lat,
    lng: node.lng,
    status: "ship" as const,
    description: `${node.date} — ${node.event}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${canonical("/")}#webpage`,
        url: canonical("/"),
        name: "Hantavirus Tracker — 2026 MV Hondius Andes Virus Outbreak Map",
        headline: "Hantavirus Tracker — 2026 MV Hondius Andes Virus Outbreak Map",
        description:
          "Track the 2026 MV Hondius Andes virus outbreak with case counts, deaths, route map, passenger status, timeline, methodology, and official sources.",
        datePublished: "2026-05-13",
        dateModified: data.lastUpdated,
        inLanguage: "en",
        isAccessibleForFree: true,
        medicalAudience: {
          "@type": "MedicalAudience",
          audienceType: "General public",
        },
        about: { "@id": `${canonical("/")}#dataset` },
        mainEntity: { "@id": `${canonical("/")}#dataset` },
        citation: data.sources.slice(0, 4).map((s) => ({
          "@type": "CreativeWork",
          name: s.name,
          url: s.url,
        })),
      },
      {
        "@type": "Dataset",
        "@id": `${canonical("/")}#dataset`,
        name: "MV Hondius Andes Virus Outbreak Dataset",
        description:
          "Manual dataset tracking the 2026 MV Hondius Andes virus outbreak: confirmed cases, probable cases, deaths, monitoring window, route nodes, timeline, and sources.",
        url: `${canonical("/")}data/outbreak.json`,
        dateModified: data.lastUpdated,
        creator: {
          "@type": "Organization",
          name: "Hantavirus Tracker",
          url: canonical("/"),
        },
        measurementTechnique:
          "Manual extraction from WHO, ECDC, and CDC public updates",
        variableMeasured: [
          { "@type": "PropertyValue", name: "confirmed", value: data.confirmed },
          { "@type": "PropertyValue", name: "probable", value: data.probable },
          { "@type": "PropertyValue", name: "suspected", value: data.suspected },
          { "@type": "PropertyValue", name: "deaths", value: data.deaths },
          {
            "@type": "PropertyValue",
            name: "monitoringPeriodDays",
            value: data.monitoringPeriodDays,
          },
        ],
        distribution: {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: `${canonical("/")}data/outbreak.json`,
        },
      },
    ],
  };

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Hantavirus Tracker — 2026 MV Hondius Andes Virus Outbreak Map
        </h1>
        <p className="text-base text-muted-foreground">
          Verified case counts, route map, passenger status and timeline for the multi-country
          Andes hantavirus cluster linked to the MV Hondius cruise ship. Updated manually from
          WHO, ECDC and CDC briefings.
        </p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section id="snapshot" className="space-y-3">
        <h2 className="text-xl font-semibold">Current Outbreak Snapshot</h2>
        <p className="text-sm text-muted-foreground">
          Cases, deaths and monitoring window. Counts use the 12 May 2026 WHO briefing.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KpiCard label="Confirmed" value={data.confirmed} description="Lab-confirmed Andes virus cases" tone="amber" />
          <KpiCard label="Probable" value={data.probable} description="Symptomatic, epidemiologically linked" />
          <KpiCard label="Deaths" value={data.deaths} description="Confirmed/probable deaths in the cluster" tone="red" />
          <KpiCard label="Monitoring window" value={`${data.monitoringPeriodDays} days`} description={`Ends ${data.monitoringEndsAt}`} tone="green" />
        </div>
      </section>

      <section id="map" className="space-y-3">
        <h2 className="text-xl font-semibold">MV Hondius Outbreak Map</h2>
        <p className="text-sm text-muted-foreground">
          Reported locations and ship movement. Points are compiled from public WHO and ECDC
          updates; not real-time AIS data.
        </p>
        <OutbreakMapLoader points={mapPoints} />
      </section>

      <section id="ship" className="space-y-3">
        <h2 className="text-xl font-semibold">Ship Status</h2>
        <h3 className="text-base font-medium">Last Known Position and Disembarkation Status</h3>
        <div className="rounded-lg border bg-card p-4 text-sm">
          <p>
            <strong>{data.ship.name}</strong> — {data.ship.flag}-flagged, operated by {data.ship.operator}.
          </p>
          <p className="mt-2 text-muted-foreground">
            {data.ship.lastKnownStatus} (as of {data.ship.lastKnownStatusAt}.)
          </p>
          <p className="mt-3">
            <Link href="/cruise/mv-hondius" className="font-medium underline underline-offset-4">
              See full MV Hondius outbreak page →
            </Link>
          </p>
        </div>
      </section>

      <section id="what-we-know" className="space-y-3">
        <h2 className="text-xl font-semibold">What We Know So Far</h2>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            <strong className="text-foreground">Confirmed count.</strong> WHO reported on 12 May
            2026 that the cluster involves 11 cases: 9 confirmed Andes virus infections and 2
            probable cases, with 3 deaths.
          </p>
          <p>
            <strong className="text-foreground">Why Andes virus matters.</strong> Andes virus is
            the only hantavirus with documented limited person-to-person transmission, typically
            in cases of close and prolonged contact.
          </p>
          <p>
            <strong className="text-foreground">Why monitoring lasts 42 days.</strong> WHO
            recommends a 42-day monitoring window from last possible exposure. The window for
            this cluster ends on 21 June 2026.
          </p>
          <p>
            <strong className="text-foreground">Risk to the general public.</strong> WHO, ECDC
            and CDC say the public-health risk to the general population remains low. Identified
            contacts are being monitored and isolated where appropriate.
          </p>
          <p className="text-foreground">
            More:{" "}
            <Link className="underline underline-offset-4" href="/what-is-hantavirus">
              What is hantavirus
            </Link>{" "}
            ·{" "}
            <Link className="underline underline-offset-4" href="/symptoms">
              Hantavirus symptoms
            </Link>{" "}
            ·{" "}
            <Link className="underline underline-offset-4" href="/cruise/mv-hondius">
              MV Hondius outbreak details
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="timeline" className="space-y-3">
        <h2 className="text-xl font-semibold">Key Timeline</h2>
        <h3 className="text-base font-medium">From First Symptoms to Repatriation</h3>
        <Timeline items={data.timeline.slice(0, 7)} />
      </section>

      <section id="faq" className="space-y-3">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <FAQ items={faq} />
      </section>

      <section id="methodology" className="space-y-3">
        <h2 className="text-xl font-semibold">Methodology</h2>
        <p className="text-sm text-muted-foreground">
          This tracker is manually updated twice per day from official sources. Counts use WHO
          briefings as the primary source; ECDC and CDC are used for cross-verification and
          route details. Secondary media is used only to corroborate route and individual
          information that is already publicly disclosed.{" "}
          <Link className="underline underline-offset-4" href="/methodology">
            Read the full methodology →
          </Link>
        </p>
      </section>

      <section id="sources" className="space-y-3">
        <h2 className="text-xl font-semibold">Sources</h2>
        <SourceList sources={data.sources} />
      </section>
    </article>
  );
}
