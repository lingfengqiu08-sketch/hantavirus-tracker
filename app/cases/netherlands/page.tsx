import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getCountryResponse } from "@/lib/country-responses";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Netherlands: MV Hondius Rotterdam Arrival and Crew Status",
  description:
    "Netherlands context for the MV Hondius Andes hantavirus outbreak: Rotterdam arrival, 27 crew members, Dutch-flagged vessel status, and official ECDC sources.",
  alternates: { canonical: canonical("/cases/netherlands") },
  openGraph: {
    title: "Hantavirus Netherlands: MV Hondius Rotterdam Arrival",
    description:
      "Rotterdam arrival, 27 crew members on board, Dutch-flagged vessel status, and official-source context.",
    url: canonical("/cases/netherlands"),
    type: "article",
  },
};

const faq = [
  {
    question: "Did MV Hondius arrive in the Netherlands?",
    answer:
      "ECDC reported that MV Hondius arrived in Rotterdam on 18 May 2026 with 27 crew members on board.",
  },
  {
    question: "Is this page claiming Netherlands case counts?",
    answer:
      "No. This page tracks vessel and crew status connected to the Netherlands. It does not infer Dutch case counts beyond official WHO, ECDC, or national-authority reporting.",
  },
  {
    question: "Why is the Netherlands relevant to the MV Hondius outbreak?",
    answer:
      "MV Hondius is a Netherlands-flagged vessel and ECDC reported its 18 May arrival in Rotterdam after passenger disembarkation and repatriation.",
  },
  {
    question: "What is the public risk assessment?",
    answer:
      "ECDC assessed the risk to the general EU/EEA population as very low.",
  },
];

export default function NetherlandsCasesPage() {
  const data = getOutbreak();
  const response = getCountryResponse("netherlands");
  const sources = getSourcesByIds([
    "src-ecdc-outbreak-2026-05-18",
    "src-who-speech-2026-05-12",
  ]);

  return (
    <MedicalReferencePage
      path="/cases/netherlands"
      eyebrow="Ship arrival context"
      title="Hantavirus Netherlands: MV Hondius Rotterdam Arrival and Crew Status"
      description={metadata.description as string}
      intro="This page tracks the Netherlands connection through the Dutch-flagged MV Hondius and its Rotterdam arrival, not an inferred Dutch local outbreak."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Arrival",
          value: "May 18",
          description: "Rotterdam arrival reported by ECDC",
        },
        {
          label: "Crew",
          value: "27",
          description: "On board at Rotterdam arrival",
          tone: "amber",
        },
        {
          label: "Ship flag",
          value: "NL",
          description: "Netherlands-flagged vessel",
        },
        {
          label: "Public risk",
          value: "Very low",
          description: "ECDC EU/EEA assessment",
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
          id: "rotterdam-arrival",
          title: "Rotterdam Arrival",
          subtitle: "MV Hondius and 27 Crew Members",
          children: (
            <p>
              {response?.response} This is the key 18 May Netherlands update currently available
              in the official ECDC outbreak page.
            </p>
          ),
        },
        {
          id: "scope",
          title: "What This Page Does Not Claim",
          subtitle: "No Unsupported Netherlands Case Count",
          children: (
            <p>
              {response?.caseStatus} The tracker keeps Netherlands-specific claims limited to
              vessel status unless a national authority publishes more detailed figures.
            </p>
          ),
        },
        {
          id: "monitoring",
          title: "Monitoring Context",
          subtitle: "Crew and Country-Level Follow-Up",
          children: (
            <p>
              {response?.monitoring} For the wider EU/EEA response, use the regional ECDC page
              and the country response table.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/response-tracker", label: "Country response tracker" },
        { href: "/cases/eu-eea", label: "EU/EEA response context" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
      ]}
    />
  );
}
