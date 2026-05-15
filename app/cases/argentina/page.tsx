import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Argentina: MV Hondius and Andes Virus Context",
  description:
    "Argentina hantavirus context for the MV Hondius outbreak: Ushuaia departure, Andes virus, South America context, and limits of public case-count data.",
  alternates: { canonical: canonical("/cases/argentina") },
  openGraph: {
    title: "Hantavirus Argentina Context",
    description:
      "Ushuaia departure, Andes virus context, and what the MV Hondius dataset can and cannot show.",
    url: canonical("/cases/argentina"),
    type: "article",
  },
};

const faq = [
  {
    question: "Did the MV Hondius voyage depart Argentina?",
    answer:
      "Yes. Public WHO reporting says the voyage departed Ushuaia, Argentina, on 1 April 2026.",
  },
  {
    question: "Does departure from Argentina prove the exposure happened there?",
    answer:
      "No. Departure location is not the same as a confirmed exposure site. This tracker does not assign a precise exposure origin unless official sources do.",
  },
  {
    question: "Is Andes virus connected to South America?",
    answer:
      "Yes. CDC describes Andes virus as a South American hantavirus, and WHO identified confirmed MV Hondius cases as Andes virus.",
  },
  {
    question: "Does this page track all Argentina hantavirus cases?",
    answer:
      "No. This page is about the MV Hondius event context, not a national surveillance dashboard.",
  },
];

export default function ArgentinaCasesPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-who-don-2026-05-08",
    "src-who-speech-2026-05-12",
    "src-ecdc-outbreak-2026-05-14",
    "src-cdc-andes",
  ]);

  return (
    <MedicalReferencePage
      path="/cases/argentina"
      eyebrow="Country context"
      title="Hantavirus Argentina: MV Hondius and Andes Virus Context"
      description={metadata.description as string}
      intro="Argentina matters to this outbreak because the MV Hondius voyage departed Ushuaia and confirmed cases were Andes virus. The public record does not prove every exposure detail."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Voyage start",
          value: "Ushuaia",
          description: "Reported departure point",
        },
        {
          label: "Virus",
          value: "Andes",
          description: "WHO identified confirmed cases",
          tone: "amber",
        },
        {
          label: "Tracker deaths",
          value: `${data.deaths}`,
          description: "Current MV Hondius-linked deaths",
          tone: "red",
        },
        {
          label: "Scope",
          value: "Event",
          description: "Not national surveillance",
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
          id: "voyage",
          title: "Argentina in the MV Hondius Timeline",
          subtitle: "Ushuaia Departure",
          children: (
            <p>
              WHO reported that the MV Hondius voyage departed Ushuaia, Argentina, on 1 April
              2026. This is a timeline fact, not proof of the precise exposure source.
            </p>
          ),
        },
        {
          id: "andes",
          title: "Andes Virus Context",
          subtitle: "South American Hantavirus",
          children: (
            <p>
              CDC describes Andes virus as a South American hantavirus. The MV Hondius case
              response therefore sits in a South America-linked virus context, even though the
              cluster was detected across multiple countries after travel.
            </p>
          ),
        },
        {
          id: "limits",
          title: "What We Do Not Infer",
          subtitle: "No Unsupported Local Count",
          children: (
            <p>
              This page does not maintain an Argentina national case count and does not infer local
              spread from the cruise cluster. For national surveillance, use official Argentine
              public-health reporting.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/origin", label: "Where hantavirus comes from" },
        { href: "/cases", label: "All case context pages" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
      ]}
    />
  );
}
