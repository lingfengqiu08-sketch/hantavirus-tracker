import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Types of Hantavirus: Andes, Sin Nombre, Seoul, Puumala",
  description:
    "Types of hantavirus explained: Andes virus, Sin Nombre virus, Seoul virus, Puumala virus, HPS, HFRS, severity, and MV Hondius relevance.",
  alternates: { canonical: canonical("/types") },
  openGraph: {
    title: "Types of Hantavirus",
    description:
      "Andes, Sin Nombre, Seoul, Puumala, HPS, HFRS, and why the MV Hondius outbreak involves Andes virus.",
    url: canonical("/types"),
    type: "article",
  },
};

const faq = [
  {
    question: "What are the main types of hantavirus disease?",
    answer:
      "Public-health sources usually separate hantavirus pulmonary syndrome in the Americas from hemorrhagic fever with renal syndrome in Europe and Asia.",
  },
  {
    question: "Which hantavirus type is linked to MV Hondius?",
    answer:
      "WHO reported that confirmed MV Hondius cases were Andes virus, a South American hantavirus associated with HPS.",
  },
  {
    question: "Which hantavirus can spread person to person?",
    answer:
      "CDC says Andes virus is the only hantavirus known to spread person to person, usually after close contact with a sick person.",
  },
  {
    question: "Are all hantaviruses equally deadly?",
    answer:
      "No. Severity differs by virus, syndrome, patient condition, and access to early supportive care.",
  },
];

export default function HantavirusTypesPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-ecdc-facts",
    "src-who-factsheet-2026-05-06",
    "src-who-don-2026-05-08",
  ]);

  return (
    <MedicalReferencePage
      path="/types"
      eyebrow="Virus guide"
      title="Types of Hantavirus: Andes, Sin Nombre, Seoul, Puumala"
      description={metadata.description as string}
      intro="Hantaviruses are a family of related viruses, not one identical disease. This page explains the main public-health groupings and why Andes virus matters for MV Hondius."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "MV Hondius",
          value: "Andes",
          description: "WHO identified confirmed cases as Andes virus",
          tone: "amber",
        },
        {
          label: "Americas",
          value: "HPS",
          description: "Pulmonary syndrome is the key severe form",
        },
        {
          label: "Europe/Asia",
          value: "HFRS",
          description: "Renal syndrome grouping in many references",
        },
        {
          label: "Spread",
          value: "Rare P2P",
          description: "Documented for Andes virus",
          tone: "red",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        alternateName: [
          "Andes virus infection",
          "Sin Nombre virus infection",
          "Seoul virus infection",
          "Puumala virus infection",
        ],
        transmissionMethod: [
          "Rodent exposure",
          "Contaminated dust",
          "Rare close contact transmission for Andes virus",
        ],
      }}
      sections={[
        {
          id: "disease-groups",
          title: "Disease Groups",
          subtitle: "HPS and HFRS",
          children: (
            <>
              <p>
                Hantavirus pulmonary syndrome is the severe lung-and-circulation illness described
                in the Americas. Hemorrhagic fever with renal syndrome is the kidney-focused
                grouping described more often in Europe and Asia.
              </p>
              <p>
                Search results often mix virus names with disease names. A virus name such as
                Andes or Sin Nombre is not the same thing as a syndrome label such as HPS.
              </p>
            </>
          ),
        },
        {
          id: "andes",
          title: "Andes Virus",
          subtitle: "The MV Hondius Strain",
          children: (
            <>
              <p>
                Andes virus is the type named in the MV Hondius outbreak. It matters because it is
                the hantavirus with documented limited person-to-person spread after close contact.
              </p>
              <p>
                That is why contact tracing and monitoring are central to the current response.
              </p>
            </>
          ),
        },
        {
          id: "other-types",
          title: "Other Names Readers May See",
          subtitle: "Different Viruses, Different Contexts",
          children: (
            <p>
              Sin Nombre virus is often discussed in US HPS references. Seoul virus is associated
              with rats and has a different public-health context. Puumala and Dobrava viruses are
              more common in European hantavirus references.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/andes-virus", label: "Andes virus explained" },
        { href: "/transmission", label: "Hantavirus transmission" },
        { href: "/hps", label: "Hantavirus pulmonary syndrome" },
      ]}
    />
  );
}
