import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus UK Cases: MV Hondius Monitoring and Public Risk",
  description:
    "UK hantavirus case context: MV Hondius British passenger monitoring, Arrowe Park isolation, UKHSA updates, Andes virus risk, and wider UK public risk.",
  alternates: { canonical: canonical("/cases/uk") },
  openGraph: {
    title: "Hantavirus UK Cases and MV Hondius Monitoring",
    description:
      "UKHSA updates, Arrowe Park monitoring, British passenger context, and public risk.",
    url: canonical("/cases/uk"),
    type: "article",
  },
};

const faq = [
  {
    question: "Are there hantavirus cases in the UK linked to MV Hondius?",
    answer:
      "UKHSA reported British nationals among the MV Hondius case and contact response, and monitored returning passengers at Arrowe Park. This tracker does not infer new UK cases unless WHO or UKHSA confirms them.",
  },
  {
    question: "Is the wider UK public at risk?",
    answer:
      "UKHSA described the risk to the wider UK population as very low and said no additional precautions were necessary for the public.",
  },
  {
    question: "Where were returning passengers monitored?",
    answer:
      "UKHSA reported returning passengers were transferred to Arrowe Park Hospital on the Wirral for clinical assessment, testing, and isolation planning.",
  },
  {
    question: "Why does UK isolation say up to 45 days when WHO uses 42 days?",
    answer:
      "WHO uses a 42-day monitoring window for Andes virus exposure. UKHSA reported up to 45 days for the UK-managed isolation pathway, likely reflecting operational timing and local arrangements.",
  },
  {
    question: "Is Andes virus in UK rodents?",
    answer:
      "UKHSA states Andes virus is associated with South American rodent species and has never been seen in the UK rodent population.",
  },
];

export default function UkCasesPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-govuk-ukhsa-update-2026-05-12",
    "src-ukhsa-cruise-2026-05-12",
    "src-govuk-hantaviruses",
    "src-nhs-hantavirus",
    "src-who-speech-2026-05-12",
  ]);

  return (
    <MedicalReferencePage
      path="/cases/uk"
      eyebrow="UK case tracker"
      title="Hantavirus UK Cases: MV Hondius Monitoring and Public Risk"
      description={metadata.description as string}
      intro="This page separates confirmed outbreak facts from public-risk questions in the UK. It focuses on UKHSA's MV Hondius response, not unsupported speculation about local spread."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Public risk",
          value: "Very low",
          description: "UKHSA wider-population assessment",
          tone: "green",
        },
        {
          label: "UK pathway",
          value: "Arrowe Park",
          description: "Clinical assessment and isolation planning",
        },
        {
          label: "Isolation",
          value: "Up to 45d",
          description: "UKHSA-managed pathway for returning passengers",
          tone: "amber",
        },
        {
          label: "Tracker deaths",
          value: `${data.deaths}`,
          description: "Current MV Hondius-linked deaths in dataset",
          tone: "red",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        alternateName: ["Andes virus infection", "Seoul hantavirus infection"],
        transmissionMethod: [
          "Rodent exposure",
          "Rare close contact transmission for Andes virus",
        ],
      }}
      sections={[
        {
          id: "mv-hondius-uk",
          title: "UK Connection to the MV Hondius Outbreak",
          subtitle: "British Nationals, Contacts, and Monitoring",
          children: (
            <>
              <p>
                UKHSA reported that British nationals and other passengers linked to MV Hondius were
                assessed, tested, and monitored after returning to the UK.
              </p>
              <p>
                The safest editorial rule is to quote UKHSA or WHO for any case count. This tracker
                does not create additional UK case numbers from partial media reports.
              </p>
            </>
          ),
        },
        {
          id: "risk",
          title: "Risk to the Wider UK Public",
          subtitle: "Very Low, According to UKHSA",
          children: (
            <>
              <p>
                UKHSA has said the wider UK public risk is very low and that no additional
                precautions are necessary for people not linked to the outbreak.
              </p>
              <p>
                Hantavirus is not spread through everyday social contact such as walking in public
                spaces, shops, workplaces, or schools.
              </p>
            </>
          ),
        },
        {
          id: "uk-rodents",
          title: "UK Rodent Context",
          subtitle: "Seoul Virus Is Not Andes Virus",
          children: (
            <>
              <p>
                UK guidance notes that Seoul hantavirus has been identified in the UK, but Andes
                virus has not been seen in the UK rodent population.
              </p>
              <p>
                This matters because the MV Hondius cluster involves Andes virus, while ordinary UK
                prevention advice still focuses on avoiding rodent urine, droppings, saliva, and
                nesting materials.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
        { href: "/andes-virus", label: "Andes virus explained" },
        { href: "/prevention", label: "Hantavirus prevention guidance" },
      ]}
    />
  );
}
