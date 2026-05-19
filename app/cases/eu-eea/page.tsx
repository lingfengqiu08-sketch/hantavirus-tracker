import type { Metadata } from "next";
import Link from "next/link";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getCountryResponse } from "@/lib/country-responses";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus EU/EEA: MV Hondius Response and ECDC Updates",
  description:
    "EU/EEA context for the MV Hondius Andes hantavirus outbreak: ECDC daily updates, country coordination, 42-day monitoring, public risk, and official sources.",
  alternates: { canonical: canonical("/cases/eu-eea") },
  openGraph: {
    title: "Hantavirus EU/EEA: MV Hondius Response",
    description:
      "ECDC daily updates, EU/EEA coordination, 42-day monitoring, and public-risk context.",
    url: canonical("/cases/eu-eea"),
    type: "article",
  },
};

const faq = [
  {
    question: "How many EU/EEA countries are involved in the MV Hondius response?",
    answer:
      "ECDC said 23 countries are involved in the overall public-health response, including nine EU/EEA countries.",
  },
  {
    question: "What is the current ECDC case count?",
    answer:
      "ECDC reported 12 total cases as of 18 May 2026: 9 confirmed, 2 probable, 1 inconclusive, 0 suspected, and 3 deaths.",
  },
  {
    question: "How long are exposed contacts monitored in the EU/EEA response?",
    answer:
      "ECDC describes 42 days of follow-up after last potential exposure for identified contacts.",
  },
  {
    question: "What is the risk to the EU/EEA general population?",
    answer:
      "ECDC assessed the risk to the general EU/EEA population as very low.",
  },
];

export default function EuEeaCasesPage() {
  const data = getOutbreak();
  const response = getCountryResponse("eu-eea");
  const sources = getSourcesByIds([
    "src-ecdc-outbreak-2026-05-18",
    "src-ecdc-press-2026-05-11",
    "src-who-speech-2026-05-12",
    "src-ecdc-facts",
  ]);

  return (
    <MedicalReferencePage
      path="/cases/eu-eea"
      eyebrow="Regional response"
      title="Hantavirus EU/EEA: MV Hondius Response and ECDC Updates"
      description={metadata.description as string}
      intro="This page summarizes the EU/EEA response layer for the MV Hondius Andes virus outbreak, using ECDC as the primary regional source."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Countries",
          value: "23",
          description: "Total response countries cited by ECDC",
        },
        {
          label: "EU/EEA",
          value: "9",
          description: "EU/EEA countries involved",
        },
        {
          label: "Follow-up",
          value: "42d",
          description: "After last potential exposure",
          tone: "amber",
        },
        {
          label: "Public risk",
          value: "Very low",
          description: "ECDC general-population assessment",
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
          id: "ecdc-update",
          title: "ECDC Regional Update",
          subtitle: "Daily Status Split and Coordination",
          children: (
            <p>
              {response?.response} {response?.caseStatus}
            </p>
          ),
        },
        {
          id: "monitoring",
          title: "Monitoring Window",
          subtitle: "42 Days After Last Potential Exposure",
          children: (
            <p>
              {response?.monitoring} For MV Hondius, this tracker uses a monitoring end date of{" "}
              {data.monitoringEndsAt}.
            </p>
          ),
        },
        {
          id: "public-risk",
          title: "Public Risk",
          subtitle: "Very Low for the General Population",
          children: <p>{response?.publicRisk}</p>,
        },
        {
          id: "country-pages",
          title: "Country Pages",
          children: (
            <p>
              For national rows, use{" "}
              <Link className="underline underline-offset-4" href="/cases/united-kingdom">
                United Kingdom
              </Link>
              ,{" "}
              <Link className="underline underline-offset-4" href="/cases/netherlands">
                Netherlands
              </Link>
              ,{" "}
              <Link className="underline underline-offset-4" href="/cases/canada">
                Canada
              </Link>
              , and the full{" "}
              <Link className="underline underline-offset-4" href="/response-tracker">
                response tracker
              </Link>
              .
            </p>
          ),
        },
      ]}
      related={[
        { href: "/response-tracker", label: "Country response tracker" },
        { href: "/cases/netherlands", label: "Netherlands ship arrival context" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
      ]}
    />
  );
}
