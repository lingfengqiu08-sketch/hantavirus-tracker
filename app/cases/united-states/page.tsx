import type { Metadata } from "next";
import Link from "next/link";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getCountryResponse } from "@/lib/country-responses";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus United States: MV Hondius Monitoring and CDC Update",
  description:
    "United States context for the MV Hondius Andes hantavirus outbreak: CDC monitoring, repatriated passengers, no confirmed US cases, and public-risk guidance.",
  alternates: { canonical: canonical("/cases/united-states") },
  openGraph: {
    title: "Hantavirus United States: MV Hondius Monitoring",
    description:
      "CDC monitoring update, repatriated passengers, no confirmed US cases, and public risk.",
    url: canonical("/cases/united-states"),
    type: "article",
  },
};

const faq = [
  {
    question: "Have any MV Hondius-linked Andes virus cases been confirmed in the United States?",
    answer:
      "CDC said no Andes virus cases had been confirmed in the United States as a result of this outbreak in its 14 May 2026 situation summary.",
  },
  {
    question: "How many US passengers were repatriated from the ship?",
    answer:
      "CDC reported that 18 passengers who remained on the cruise ship were repatriated on 10 May 2026.",
  },
  {
    question: "Where were repatriated US passengers monitored?",
    answer:
      "CDC said the 18 repatriated passengers were at the Nebraska Quarantine Unit for assessment and monitoring coordination, while seven earlier-returned passengers were monitored at home.",
  },
  {
    question: "What is the risk to the American public?",
    answer:
      "CDC described the overall risk to the American public and travellers as extremely low.",
  },
];

export default function UnitedStatesCasesPage() {
  const data = getOutbreak();
  const response = getCountryResponse("united-states");
  const sources = getSourcesByIds([
    "src-cdc-situation-2026-05-12",
    "src-cdc-hondius-2026-05-06",
    "src-cdc-andes",
    "src-ecdc-outbreak-2026-05-18",
  ]);

  return (
    <MedicalReferencePage
      path="/cases/united-states"
      eyebrow="Country response"
      title="Hantavirus United States: MV Hondius Monitoring and CDC Update"
      description={metadata.description as string}
      intro="The United States page tracks CDC's MV Hondius response. It does not claim US transmission or a confirmed US case unless CDC confirms one."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Confirmed US cases",
          value: "0",
          description: "CDC situation summary",
          tone: "green",
        },
        {
          label: "Repatriated",
          value: "18",
          description: "Passengers repatriated on 10 May",
        },
        {
          label: "Home monitoring",
          value: "7",
          description: "Earlier-returned passengers",
        },
        {
          label: "Public risk",
          value: "Extremely low",
          description: "CDC assessment",
          tone: "green",
        },
      ]}
      condition={{
        name: "Andes virus infection",
        alternateName: ["Hantavirus disease", "Hantavirus pulmonary syndrome"],
        transmissionMethod: [
          "Rodent exposure",
          "Rare close contact transmission for Andes virus",
        ],
      }}
      sections={[
        {
          id: "cdc-update",
          title: "CDC United States Update",
          subtitle: "Repatriation and Monitoring",
          children: (
            <p>
              {response?.response} {response?.monitoring}
            </p>
          ),
        },
        {
          id: "case-status",
          title: "US Case Status",
          subtitle: "No Confirmed US Cases in CDC Summary",
          children: (
            <p>
              {response?.caseStatus} This page therefore treats the United States row as a
              monitoring and public-health response row, not as a local case-count page.
            </p>
          ),
        },
        {
          id: "risk",
          title: "Public Risk",
          subtitle: "Extremely Low, According to CDC",
          children: (
            <p>
              {response?.publicRisk} People who were not exposed to MV Hondius should use general
              hantavirus prevention guidance rather than outbreak-specific quarantine guidance.
            </p>
          ),
        },
        {
          id: "next-links",
          title: "Where This Fits in the Tracker",
          children: (
            <p>
              Compare the US row with the{" "}
              <Link className="underline underline-offset-4" href="/response-tracker">
                country response tracker
              </Link>{" "}
              and the{" "}
              <Link className="underline underline-offset-4" href="/timeline">
                source-linked timeline
              </Link>
              .
            </p>
          ),
        },
      ]}
      related={[
        { href: "/response-tracker", label: "Country response tracker" },
        { href: "/travel-advice", label: "Travel advice and monitoring" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
      ]}
    />
  );
}
