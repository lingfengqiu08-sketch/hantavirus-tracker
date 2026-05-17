import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Chile: Andes Virus and MV Hondius Context",
  description:
    "Chile hantavirus context for readers searching the MV Hondius Andes virus outbreak, including Andes virus background and limits of public case-count data.",
  alternates: { canonical: canonical("/cases/chile") },
  openGraph: {
    title: "Hantavirus Chile Context",
    description:
      "Andes virus background and what the MV Hondius dataset can and cannot show about Chile.",
    url: canonical("/cases/chile"),
    type: "article",
  },
};

const faq = [
  {
    question: "Is this a Chile national hantavirus dashboard?",
    answer:
      "No. This page provides MV Hondius and Andes virus context for readers searching Chile-related hantavirus terms.",
  },
  {
    question: "Why does Chile appear in Andes virus searches?",
    answer:
      "Andes virus is a South American hantavirus. Readers often search Chile and Argentina together when researching Andes virus context.",
  },
  {
    question: "Does this site report Chile local spread from MV Hondius?",
    answer:
      "No. The tracker does not infer Chile local spread unless official public-health sources report it.",
  },
  {
    question: "Where should country-specific case counts come from?",
    answer:
      "Country-specific surveillance should come from national public-health authorities or official regional health agencies.",
  },
];

export default function ChileCasesPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-andes",
    "src-cdc-hantavirus",
    "src-who-don-2026-05-08",
    "src-ecdc-outbreak-2026-05-17",
  ]);

  return (
    <MedicalReferencePage
      path="/cases/chile"
      eyebrow="Country context"
      title="Hantavirus Chile: Andes Virus and MV Hondius Context"
      description={metadata.description as string}
      intro="This page gives Chile-related Andes virus context without turning the MV Hondius event into an unsupported national case count."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Virus context",
          value: "Andes",
          description: "South American hantavirus",
          tone: "amber",
        },
        {
          label: "Scope",
          value: "Context",
          description: "Not national surveillance",
        },
        {
          label: "Tracker total",
          value: `${data.confirmed + data.probable + data.inconclusive + data.suspected}`,
          description: "Current MV Hondius-linked total",
        },
        {
          label: "Public risk",
          value: "Low",
          description: "For people not linked to the outbreak",
          tone: "green",
        },
      ]}
      condition={{
        name: "Andes virus infection",
        alternateName: ["Hantavirus pulmonary syndrome", "Hantavirus disease"],
        transmissionMethod: [
          "Rodent exposure",
          "Contaminated dust",
          "Rare close contact transmission for Andes virus",
        ],
      }}
      sections={[
        {
          id: "context",
          title: "Chile and Andes Virus Searches",
          subtitle: "Regional Context, Not a Local Count",
          children: (
            <p>
              Andes virus is described by CDC as a South American hantavirus. That is why Chile can
              appear in related searches, but this MV Hondius tracker should not be read as a Chile
              national surveillance source.
            </p>
          ),
        },
        {
          id: "mv-hondius",
          title: "MV Hondius Link",
          subtitle: "What the Public Record Shows",
          children: (
            <p>
              Public WHO and ECDC updates describe a cruise-ship-linked, multi-country Andes virus
              cluster. This site tracks that event and avoids adding country-specific claims that
              are not in the cited sources.
            </p>
          ),
        },
        {
          id: "prevention",
          title: "Practical Prevention",
          subtitle: "Rodent Exposure Still Matters",
          children: (
            <p>
              For people not directly linked to the outbreak, the practical prevention message is
              the same as other hantavirus guidance: avoid rodent-contaminated dust and follow safe
              cleanup practices.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/cases", label: "All case context pages" },
        { href: "/andes-virus", label: "Andes virus explained" },
        { href: "/prevention", label: "Prevention guidance" },
      ]}
    />
  );
}
