import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getCountryResponse } from "@/lib/country-responses";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Canada: MV Hondius Confirmed Andes Virus Case",
  description:
    "Canada context for the MV Hondius Andes hantavirus outbreak: confirmed case, high-risk contacts, isolation, public risk, and official sources.",
  alternates: { canonical: canonical("/cases/canada") },
  openGraph: {
    title: "Hantavirus Canada: MV Hondius Confirmed Case",
    description:
      "PHAC update on the MV Hondius-related confirmed Andes virus case, contacts, isolation, and public risk.",
    url: canonical("/cases/canada"),
    type: "article",
  },
};

const faq = [
  {
    question: "Has Canada reported an MV Hondius-linked case?",
    answer:
      "PHAC confirmed one MV Hondius passenger positive for hantavirus through laboratory testing in its 17 May 2026 update.",
  },
  {
    question: "Were more Canadian cases identified?",
    answer:
      "PHAC said the travelling partner of the confirmed case tested negative and no further Canadian cases had been identified at the time of the 17 May update.",
  },
  {
    question: "How many high-risk individuals were identified in Canada?",
    answer:
      "PHAC reported four individuals identified as high risk.",
  },
  {
    question: "What is the risk to the Canadian public?",
    answer:
      "PHAC said the risk to the general Canadian population remains very low.",
  },
];

export default function CanadaCasesPage() {
  const data = getOutbreak();
  const response = getCountryResponse("canada");
  const sources = getSourcesByIds([
    "src-phac-andes-2026-05-17",
    "src-ecdc-outbreak-2026-05-18",
    "src-cdc-andes",
  ]);

  return (
    <MedicalReferencePage
      path="/cases/canada"
      eyebrow="Country response"
      title="Hantavirus Canada: MV Hondius Confirmed Andes Virus Case"
      description={metadata.description as string}
      intro="Canada is part of the current MV Hondius confirmed-case count because PHAC confirmed one returning passenger positive through laboratory testing."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Confirmed",
          value: "1",
          description: "PHAC laboratory-confirmed case",
          tone: "amber",
        },
        {
          label: "High risk",
          value: "4",
          description: "Individuals identified by PHAC",
        },
        {
          label: "Public risk",
          value: "Very low",
          description: "PHAC general-population assessment",
          tone: "green",
        },
        {
          label: "Tracker total",
          value: `${data.confirmed + data.probable + data.inconclusive + data.suspected}`,
          description: "ECDC 18 May total",
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
          id: "official-update",
          title: "Official Canada Update",
          subtitle: "One Laboratory-Confirmed Case",
          children: (
            <p>
              {response?.response} {response?.caseStatus}
            </p>
          ),
        },
        {
          id: "public-risk",
          title: "Public Risk",
          subtitle: "Very Low for the General Population",
          children: (
            <p>
              {response?.publicRisk} The response is focused on identified travellers and contacts,
              not a wider community outbreak.
            </p>
          ),
        },
        {
          id: "source-logic",
          title: "How This Affects the Tracker Count",
          subtitle: "PHAC and ECDC",
          children: (
            <p>
              PHAC confirmed the Canadian case on 17 May after national laboratory testing. ECDC
              lists 9 confirmed cases, 2 probable cases, 1 inconclusive case, and 3 deaths across
              the cluster in its 18 May update.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/response-tracker", label: "Country response tracker" },
        { href: "/case-definitions", label: "Case definitions" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
      ]}
    />
  );
}
