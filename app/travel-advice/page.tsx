import type { Metadata } from "next";
import Link from "next/link";
import { SourceList } from "@/components/source-list";
import { UpdateBanner } from "@/components/update-banner";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MV Hondius Hantavirus Travel Advice and Monitoring",
  description:
    "Plain-language travel and contact-monitoring guidance for people looking up the MV Hondius Andes virus outbreak, with official-source links.",
  alternates: { canonical: canonical("/travel-advice") },
  openGraph: {
    title: "MV Hondius Hantavirus Travel Advice",
    description:
      "Travel and contact-monitoring guidance for the MV Hondius Andes virus outbreak, with official-source links.",
    url: canonical("/travel-advice"),
    type: "article",
  },
};

export default function TravelAdvicePage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-who-speech-2026-05-12",
    "src-ecdc-outbreak-2026-05-14",
    "src-cdc-andes",
    "src-cdc-prevention",
    "src-ukhsa-cruise-2026-05-12",
  ]);

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Travel advice</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          MV Hondius Hantavirus Travel Advice and Monitoring
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Practical, source-linked context for readers searching after the MV Hondius Andes virus
          outbreak. This page is informational and does not replace instructions from health
          authorities or clinicians.
        </p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">If You Were on MV Hondius</h2>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            Follow the instructions from your national or local health authority. WHO recommended a
            {` ${data.monitoringPeriodDays}-day`} monitoring window after last possible exposure;
            in this dataset the window runs through {data.monitoringEndsAt}.
          </p>
          <p>
            If symptoms develop, contact the health authority or clinician responsible for your
            monitoring. For severe breathing difficulty, chest tightness, fainting, or rapid
            deterioration, use local emergency services.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">If You Had Close Contact With a Case</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Andes virus is unusual among hantaviruses because limited person-to-person transmission
          has been documented after close contact with a symptomatic person. People identified as
          contacts should follow the monitoring, testing, and isolation instructions they receive
          from public-health teams.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">If You Were Not Linked to the Outbreak</h2>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>
            Public-health agencies have described the wider public risk as low. For most readers,
            the relevant prevention step is reducing exposure to infected rodents and their urine,
            droppings, saliva, or contaminated dust.
          </p>
          <p>
            More detailed background is available in the{" "}
            <Link className="underline underline-offset-4" href="/prevention">
              prevention guide
            </Link>{" "}
            and{" "}
            <Link className="underline underline-offset-4" href="/transmission">
              transmission guide
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="space-y-3 rounded-lg border bg-muted/40 p-4">
        <h2 className="text-lg font-semibold">Medical Disclaimer</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          This page is not medical advice. It summarizes public sources so readers can understand
          the outbreak context. For personal medical decisions, use official instructions and
          clinician guidance.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Sources</h2>
        <SourceList sources={sources} />
      </section>

      <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Continue reading</p>
        <ul className="mt-2 space-y-1">
          <li>
            <Link className="underline underline-offset-4" href="/cruise/mv-hondius">
              MV Hondius outbreak tracker
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/symptoms">
              Hantavirus symptoms
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/medical-disclaimer">
              Medical disclaimer
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
