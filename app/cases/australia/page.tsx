import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getCountryResponse } from "@/lib/country-responses";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Australia: MV Hondius Quarantine and Passenger Update",
  description:
    "Australia context for the MV Hondius Andes hantavirus outbreak: six returning passengers, Bullsbrook quarantine, 42-day monitoring, and official sources.",
  alternates: { canonical: canonical("/cases/australia") },
  openGraph: {
    title: "Hantavirus Australia: MV Hondius Quarantine",
    description:
      "Six returning MV Hondius passengers, Bullsbrook quarantine, monitoring timeline, and official-source context.",
    url: canonical("/cases/australia"),
    type: "article",
  },
};

const faq = [
  {
    question: "How many MV Hondius passengers returned to Australia?",
    answer:
      "Australian CDC reported that six MV Hondius passengers landed at RAAF Base Pearce and moved to the Bullsbrook Centre for National Resilience.",
  },
  {
    question: "Did any Australian passenger test positive?",
    answer:
      "Australian CDC said none of the six passengers had tested positive at the time of its 15 May 2026 update.",
  },
  {
    question: "Where are the Australian passengers quarantined?",
    answer:
      "Australian CDC said the passengers were moved to the Bullsbrook Centre for National Resilience in Western Australia.",
  },
  {
    question: "How long is Australia monitoring returning passengers?",
    answer:
      "Australian CDC described 42 days of quarantine from disembarkation, with at least the first three weeks at Bullsbrook.",
  },
];

export default function AustraliaCasesPage() {
  const data = getOutbreak();
  const response = getCountryResponse("australia");
  const sources = getSourcesByIds([
    "src-aus-cdc-hondius-2026-05-15",
    "src-ecdc-outbreak-2026-05-17",
    "src-who-speech-2026-05-12",
  ]);

  return (
    <MedicalReferencePage
      path="/cases/australia"
      eyebrow="Country response"
      title="Hantavirus Australia: MV Hondius Quarantine and Passenger Update"
      description={metadata.description as string}
      intro="Australia's current MV Hondius connection is a quarantine and monitoring response for returning passengers, not a confirmed Australian case count."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Passengers",
          value: "6",
          description: "Returned to Australia, per Australian CDC",
        },
        {
          label: "Facility",
          value: "Bullsbrook",
          description: "Centre for National Resilience",
          tone: "amber",
        },
        {
          label: "Positive tests",
          value: "0",
          description: "At time of Australian CDC update",
          tone: "green",
        },
        {
          label: "Quarantine",
          value: "42d",
          description: "From disembarkation",
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
          title: "Official Australia Update",
          subtitle: "Six Returning Passengers",
          children: (
            <p>
              {response?.response} {response?.caseStatus}
            </p>
          ),
        },
        {
          id: "quarantine",
          title: "Quarantine and Monitoring",
          subtitle: "Bullsbrook Centre for National Resilience",
          children: (
            <p>
              {response?.monitoring} This is why the Australian row appears in the response
              tracker even though this page does not claim a confirmed Australian case.
            </p>
          ),
        },
        {
          id: "scope",
          title: "What This Page Does Not Claim",
          subtitle: "No Unsupported Local Spread",
          children: (
            <p>
              This page does not infer local spread in Australia and does not replace Australian
              public-health instructions. It summarizes official-source details for the MV
              Hondius-linked response.
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
