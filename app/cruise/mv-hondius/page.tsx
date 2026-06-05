import type { Metadata } from "next";
import Link from "next/link";
import { KpiCard } from "@/components/kpi-card";
import { Timeline } from "@/components/timeline";
import { FAQ } from "@/components/faq";
import { SourceList } from "@/components/source-list";
import { PassengerStatusBoard } from "@/components/passenger-status-board";
import { UpdateBanner } from "@/components/update-banner";
import ShipRouteMapLoader from "@/components/maps/ship-route-map-loader";
import { getOutbreak, getTotalCases } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = getOutbreak();
  const totalCases = getTotalCases(data);
  const title = `MV Hondius Current Status: ${totalCases} Cases, ${data.deaths} Deaths`;
  return {
    title,
    description:
      "MV Hondius current status and latest hantavirus update: live case count, deaths, monitoring window, ship status, timeline, and official WHO/ECDC/CDC sources.",
    alternates: { canonical: canonical("/cruise/mv-hondius") },
    openGraph: {
      title,
      description:
        "MV Hondius current status: live case count, deaths, ship status, latest official update, and sources for the 2026 Andes virus cluster.",
      url: canonical("/cruise/mv-hondius"),
      type: "article",
    },
  };
}

const faq = [
  {
    question: "How many people were infected on MV Hondius?",
    answer:
      "As of the ECDC 18 May 2026 update, 12 total cases have been reported: 9 confirmed Andes virus infections, 2 probable cases, and 1 inconclusive case.",
  },
  {
    question: "How many MV Hondius deaths have been reported?",
    answer: "Three deaths have been reported among the MV Hondius-linked cases.",
  },
  {
    question: "Where is MV Hondius now?",
    answer:
      "Passengers disembarked at the Port of Granadilla, Tenerife, between 10 and 11 May 2026. ECDC reported that MV Hondius arrived in Rotterdam on 18 May 2026 with 27 crew members on board.",
  },
  {
    question: "What route did MV Hondius take?",
    answer:
      "The voyage departed Ushuaia, Argentina, on 1 April 2026, sailed in the South Atlantic, evacuated severe cases via Cabo Verde around 6 May, and reached Tenerife on 10 May 2026.",
  },
  {
    question: "Why were passengers repatriated instead of kept onboard?",
    answer:
      "Authorities prioritised disembarkation at Tenerife to allow medical evaluation and contact tracing. Repatriated passengers entered 42-day monitoring under their national health authorities.",
  },
  {
    question: "Is there evidence of a larger outbreak?",
    answer:
      "WHO stated on 12 May 2026 that there was no sign of a wider outbreak. Public-health risk to the general population is assessed as low.",
  },
];

export default function MvHondiusPage() {
  const data = getOutbreak();
  const totalCases = getTotalCases(data);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${canonical("/cruise/mv-hondius")}#article`,
        url: canonical("/cruise/mv-hondius"),
        headline: "MV Hondius Andes Virus Outbreak Tracker",
        description:
          "Detailed MV Hondius Andes virus outbreak tracker with ship route map, passenger status, confirmed cases, deaths, timeline, FAQ, and sources.",
        datePublished: "2026-05-13T08:00:00+08:00",
        dateModified: data.lastUpdated,
        inLanguage: "en",
        isAccessibleForFree: true,
        author: {
          "@type": "Organization",
          name: "Hantavirus Tracker",
          url: canonical("/"),
        },
        publisher: {
          "@type": "Organization",
          name: "Hantavirus Tracker",
          url: canonical("/"),
        },
        mainEntityOfPage: canonical("/cruise/mv-hondius"),
        about: { "@id": `${canonical("/cruise/mv-hondius")}#event` },
        citation: data.sources.slice(0, 5).map((s) => ({
          "@type": "CreativeWork",
          name: s.name,
          url: s.url,
        })),
      },
      {
        "@type": "Event",
        "@id": `${canonical("/cruise/mv-hondius")}#event`,
        name: "MV Hondius Andes virus outbreak",
        description:
          "A multi-country Andes virus outbreak linked to passengers and crew aboard the MV Hondius cruise ship.",
        startDate: "2026-04-06",
        endDate: data.monitoringEndsAt,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: [
          { "@type": "Place", name: "MV Hondius" },
          {
            "@type": "Place",
            name: "Port of Granadilla, Tenerife, Canary Islands",
            geo: {
              "@type": "GeoCoordinates",
              latitude: 28.0833,
              longitude: -16.5167,
            },
          },
        ],
        organizer: {
          "@type": "Organization",
          name: "World Health Organization",
          url: "https://www.who.int/",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical("/cruise/mv-hondius")}#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
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
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Outbreak page</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          MV Hondius Current Status and Latest Hantavirus Update
        </h1>
        <p className="text-base text-muted-foreground">
          Current status, latest official update, ship status, passenger numbers and full timeline
          for the 2026 MV Hondius Andes virus cluster. Compiled from WHO, ECDC and CDC.
        </p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section id="current-status" className="space-y-3">
        <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm leading-6 dark:bg-teal-950/30">
          <p className="font-medium text-foreground">
            Current Status — verified {data.lastVerifiedAt.slice(0, 10)}
          </p>
          <p className="mt-1 text-muted-foreground">
            Per {data.sourceName}, the MV Hondius cluster stands at{" "}
            <strong className="text-foreground">{totalCases} total cases</strong>{" "}
            ({data.confirmed} confirmed Andes virus, {data.probable} probable) and{" "}
            <strong className="text-foreground">{data.deaths} deaths</strong>. Contacts are monitored
            through {data.monitoringEndsAt}. {data.ship.lastKnownStatus}
          </p>
          <p className="mt-2 text-muted-foreground">
            <strong className="text-foreground">Latest update:</strong>{" "}
            {data.timeline[data.timeline.length - 1].date} — {data.timeline[data.timeline.length - 1].title}.
          </p>
        </div>
      </section>

      <section id="snapshot" className="space-y-3">
        <h2 className="text-xl font-semibold">Outbreak Snapshot</h2>
        <h3 className="text-base font-medium">Current Case Count</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <KpiCard label="Total" value={totalCases} description="Confirmed + probable + inconclusive + suspected" />
          <KpiCard label="Confirmed" value={data.confirmed} description="Lab-confirmed Andes virus" tone="amber" />
          <KpiCard label="Probable" value={data.probable} description="Symptomatic, epi-linked" />
          <KpiCard label="Inconclusive" value={data.inconclusive} description="Pending final classification" />
          <KpiCard label="Deaths" value={data.deaths} description="Cluster-linked deaths" tone="red" />
        </div>
        <h3 className="text-base font-medium">Monitoring Period</h3>
        <p className="text-sm text-muted-foreground">
          WHO recommends a {data.monitoringPeriodDays}-day monitoring window after last exposure
          (10 May 2026). Monitoring runs through {data.monitoringEndsAt}.
        </p>
      </section>

      <section id="summary" className="space-y-3">
        <h2 className="text-xl font-semibold">What Happened: Outbreak Summary</h2>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            The {data.ship.name}, a {data.ship.flag}-flagged expedition cruise ship operated by{" "}
            {data.ship.operator}, departed Ushuaia, Argentina, on 1 April 2026 for an Antarctic and
            South Atlantic voyage. The first illness onset was reported on 6 April; the first death
            occurred on board on 11 April and was initially attributed to natural causes.
          </p>
          <p>
            As the ship crossed the Atlantic, additional passengers and crew fell ill. WHO was
            notified of a severe respiratory illness cluster on 2 May 2026 and published its first
            Disease Outbreak News on 4 May. Laboratory sequencing identified the cause as Andes
            virus — the only hantavirus with documented limited person-to-person transmission, which
            is why contacts are monitored so closely.
          </p>
          <p>
            The ship reached the Port of Granadilla, Tenerife, on 10 May for disembarkation and
            repatriation. Passengers were flown to their home countries for 42-day monitoring, and
            the {data.ship.name} continued to Rotterdam, arriving 18 May with{" "}
            {data.passengerStatus.crewOnboard} crew on board.
          </p>
          <p>
            <strong className="text-foreground">As currently reported:</strong> {totalCases} total
            cases ({data.confirmed} confirmed, {data.probable} probable, {data.inconclusive}{" "}
            inconclusive), {data.deaths} deaths, with contacts monitored through{" "}
            {data.monitoringEndsAt}.
          </p>
        </div>
      </section>

      <section id="route" className="space-y-3">
        <h2 className="text-xl font-semibold">Ship Route Map</h2>
        <p className="text-sm text-muted-foreground">
          Public reporting compiled from WHO Disease Outbreak News and ECDC updates. Markers
          show key voyage points; the polyline is illustrative.
        </p>
        <ShipRouteMapLoader route={data.ship.route} />
        <ul className="space-y-2 text-sm text-muted-foreground">
          {data.ship.route.map((node) => (
            <li key={`${node.date}-${node.location}`} className="rounded-md border p-3">
              <p>
                <strong className="text-foreground">{node.date}</strong> — {node.location}
              </p>
              <p className="mt-1">{node.event}</p>
              <a
                href={node.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-xs underline underline-offset-4"
              >
                Source
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="status" className="space-y-3">
        <h2 className="text-xl font-semibold">Passenger and Crew Status</h2>
        <h3 className="text-base font-medium">Confirmed, Probable, Repatriated, and Monitoring</h3>
        <PassengerStatusBoard status={data.passengerStatus} />
      </section>

      <section id="timeline" className="space-y-3">
        <h2 className="text-xl font-semibold">Detailed Timeline</h2>
        <h3 className="text-base font-medium">Public Health Response Events</h3>
        <Timeline items={data.timeline} />
      </section>

      <section id="definitions" className="space-y-3">
        <h2 className="text-xl font-semibold">Case Definitions Used Here</h2>
        <dl className="space-y-3 text-sm text-muted-foreground">
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Confirmed case</dt>
            <dd>
              Symptomatic person with laboratory confirmation of Andes virus by RT-PCR or
              serology, per WHO/ECDC criteria.
            </dd>
          </div>
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Probable case</dt>
            <dd>
              Symptomatic person epidemiologically linked to a confirmed or probable case
              without lab confirmation yet.
            </dd>
          </div>
          <div className="rounded-md border p-3">
            <dt className="font-semibold text-foreground">Inconclusive case</dt>
            <dd>
              Reported case where available public-health updates have not assigned a final
              confirmed or probable classification.
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

      <section id="faq" className="space-y-3">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <FAQ items={faq} />
      </section>

      <section id="methodology" className="space-y-3">
        <h2 className="text-xl font-semibold">Methodology and Sources</h2>
        <h3 className="text-base font-medium">Manual Updates Twice Daily</h3>
        <p className="text-sm text-muted-foreground">
          This page is manually updated. Counts use the latest official source by date; WHO
          briefings anchor the outbreak narrative, while ECDC daily updates are used for the
          latest status split. CDC is used for clinical and transmission context. See{" "}
          <Link className="underline underline-offset-4" href="/methodology">
            methodology
          </Link>
          .
        </p>
        <h3 className="text-base font-medium">Primary Sources</h3>
        <SourceList sources={data.sources} />
      </section>

      <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Continue reading</p>
        <ul className="mt-2 space-y-1">
          <li>
            <Link className="underline underline-offset-4" href="/">
              Main outbreak map
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/symptoms">
              Hantavirus symptoms guide
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/timeline">
              MV Hondius outbreak timeline
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/travel-advice">
              Travel advice and monitoring
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/response-tracker">
              Country response tracker
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/cases/united-states">
              United States monitoring
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/cases/netherlands">
              Netherlands Rotterdam arrival
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/what-is-hantavirus">
              What is hantavirus
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
