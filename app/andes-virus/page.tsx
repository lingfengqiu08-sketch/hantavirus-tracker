import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Andes Virus: The Hantavirus Strain That Can Spread Person-to-Person",
  description:
    "Andes virus explained: symptoms, incubation, transmission, person-to-person risk, South America context, and MV Hondius outbreak relevance.",
  alternates: { canonical: canonical("/andes-virus") },
  openGraph: {
    title: "Andes Virus: Person-to-Person Hantavirus Strain",
    description:
      "Andes virus symptoms, incubation, transmission, South America context, and MV Hondius relevance.",
    url: canonical("/andes-virus"),
    type: "article",
  },
};

const faq = [
  {
    question: "What is Andes virus?",
    answer:
      "Andes virus is a hantavirus found in South America that can cause hantavirus pulmonary syndrome.",
  },
  {
    question: "Can Andes virus spread between people?",
    answer:
      "Yes, rarely. CDC says Andes virus is the only hantavirus known to spread person to person, usually after close contact with a sick person.",
  },
  {
    question: "Where is Andes virus found?",
    answer:
      "CDC describes Andes virus as a South American hantavirus. UKHSA says the associated South American rodents are not found in the UK.",
  },
  {
    question: "What is the Andes virus incubation period?",
    answer:
      "CDC lists signs and symptoms of HPS due to Andes virus as appearing 4 to 42 days after exposure.",
  },
  {
    question: "Why does Andes virus matter for MV Hondius?",
    answer:
      "WHO reported confirmed cases as Andes virus, which explains the 42-day contact monitoring and isolation approach.",
  },
];

export default function AndesVirusPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-andes",
    "src-who-don-2026-05-08",
    "src-ecdc-outbreak-2026-05-14",
    "src-ukhsa-cruise-2026-05-12",
  ]);

  return (
    <MedicalReferencePage
      path="/andes-virus"
      eyebrow="Virus strain guide"
      title="Andes Virus: The Hantavirus Strain That Can Spread Person-to-Person"
      description={metadata.description as string}
      intro="Andes virus is the reason the MV Hondius outbreak is unusual. It is a South American hantavirus that can cause HPS and is the only hantavirus with documented limited person-to-person spread."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Region",
          value: "South America",
          description: "CDC describes Andes virus as South American",
        },
        {
          label: "Spread",
          value: "Rare P2P",
          description: "Close contact with a sick person",
          tone: "amber",
        },
        {
          label: "Timing",
          value: "4-42 days",
          description: "CDC symptom window",
        },
        {
          label: "MV Hondius",
          value: "Confirmed",
          description: "WHO identified the cluster as Andes virus",
          tone: "red",
        },
      ]}
      condition={{
        name: "Andes virus infection",
        alternateName: ["Andes hantavirus", "Hantavirus pulmonary syndrome"],
        signOrSymptom: [
          "Fatigue",
          "Fever",
          "Muscle aches",
          "Cough",
          "Shortness of breath",
        ],
        transmissionMethod: [
          "Contact with infected rodents or their waste",
          "Touching contaminated surfaces",
          "Rare close contact with a symptomatic person",
        ],
      }}
      sections={[
        {
          id: "definition",
          title: "What Makes Andes Virus Different",
          subtitle: "A Hantavirus With Rare Person-to-Person Spread",
          children: (
            <>
              <p>
                Andes virus can cause HPS, a severe respiratory disease. Its unusual feature is
                documented limited spread between people after close contact with a symptomatic
                person.
              </p>
              <p>
                That difference changes public-health operations: contact tracing, isolation, and
                monitoring are more important than they would be for most hantaviruses.
              </p>
            </>
          ),
        },
        {
          id: "mv-hondius",
          title: "MV Hondius Relevance",
          subtitle: "Why Contacts Are Monitored",
          children: (
            <>
              <p>
                WHO reported that confirmed MV Hondius cases were identified as Andes virus. The
                tracker currently records {data.confirmed} confirmed cases, {data.probable} probable
                cases, {data.inconclusive} inconclusive case, and {data.deaths} deaths.
              </p>
              <p>
                Because symptoms can appear up to 42 days after exposure, contacts are monitored
                through {data.monitoringEndsAt} in this dataset.
              </p>
            </>
          ),
        },
        {
          id: "risk",
          title: "Public Risk",
          subtitle: "Low for People Not Linked to the Outbreak",
          children: (
            <>
              <p>
                Public-health agencies have described the wider public risk as low. The main focus
                is on people with direct MV Hondius exposure, close contact with cases, or relevant
                travel and rodent exposure history.
              </p>
              <p>
                For everyone else, standard rodent-exposure prevention remains the relevant
                practical advice.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/transmission", label: "How Andes virus can spread" },
        { href: "/incubation", label: "Andes virus incubation period" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak details" },
      ]}
    />
  );
}
