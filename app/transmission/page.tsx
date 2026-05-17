import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How Hantavirus Spreads: Contagious, Airborne, Human-to-Human",
  description:
    "How hantavirus spreads from rodents, whether it is airborne or contagious, and why Andes virus requires close-contact monitoring.",
  alternates: { canonical: canonical("/transmission") },
  openGraph: {
    title: "How Hantavirus Spreads",
    description:
      "Rodent exposure, airborne dust, rare Andes virus person-to-person spread, and MV Hondius monitoring context.",
    url: canonical("/transmission"),
    type: "article",
  },
};

const faq = [
  {
    question: "Is hantavirus contagious?",
    answer:
      "Most hantaviruses are not known to spread from person to person. Andes virus is the documented exception and can spread rarely through close contact with a sick person.",
  },
  {
    question: "Is hantavirus airborne?",
    answer:
      "People usually become infected by breathing in particles from infected rodent urine, droppings, or saliva. This is different from casual airborne spread like measles or flu.",
  },
  {
    question: "Can Andes virus spread between people?",
    answer:
      "Yes, but this is usually limited to close contact with a symptomatic person, such as direct physical contact, enclosed prolonged exposure, or exposure to body fluids.",
  },
  {
    question: "Can you get hantavirus from another passenger?",
    answer:
      "For the MV Hondius cluster, public-health authorities are monitoring contacts because Andes virus can rarely spread between people after close, prolonged contact.",
  },
  {
    question: "Can hantavirus spread from surfaces?",
    answer:
      "CDC says Andes virus can spread by touching an object or surface with the virus on it and then touching the mouth, nose, or eyes.",
  },
];

export default function TransmissionPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-factsheet-2026-05-06",
    "src-who-don-2026-05-08",
    "src-ecdc-outbreak-2026-05-17",
  ]);

  return (
    <MedicalReferencePage
      path="/transmission"
      eyebrow="Transmission guide"
      title="How Hantavirus Spreads: Contagious, Airborne, Human-to-Human"
      description={metadata.description as string}
      intro="The most important distinction: usual hantavirus risk comes from infected rodents and contaminated dust. Andes virus is unusual because close, prolonged person-to-person spread has been documented."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Main route",
          value: "Rodents",
          description: "Urine, droppings, saliva, or contaminated dust",
        },
        {
          label: "Person spread",
          value: "Rare",
          description: "Documented for Andes virus after close contact",
          tone: "amber",
        },
        {
          label: "Monitoring",
          value: "42 days",
          description: `MV Hondius window runs through ${data.monitoringEndsAt}`,
          tone: "green",
        },
        {
          label: "Public risk",
          value: "Low",
          description: "WHO/ECDC/CDC assess low general-population risk",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        alternateName: ["Andes virus infection", "Hantavirus pulmonary syndrome"],
        transmissionMethod: [
          "Exposure to infected rodent urine, droppings, or saliva",
          "Touching contaminated surfaces then touching mouth, nose, or eyes",
          "Rare close contact with a symptomatic Andes virus patient",
        ],
      }}
      sections={[
        {
          id: "rodents",
          title: "Rodent Exposure",
          subtitle: "The Usual Hantavirus Route",
          children: (
            <>
              <p>
                Most hantavirus infections start with exposure to infected rodents. Risk rises when
                dried urine, droppings, saliva, or nesting material become disturbed and particles
                are inhaled.
              </p>
              <p>
                Bites and scratches can transmit hantavirus but are considered rare compared with
                inhalation and contact with contaminated materials.
              </p>
            </>
          ),
        },
        {
          id: "andes",
          title: "Andes Virus Person-to-Person Spread",
          subtitle: "Rare, Close, and Prolonged Contact",
          children: (
            <>
              <p>
                Andes virus is the only hantavirus with known person-to-person transmission. CDC
                describes risk through close contact with a sick person, including direct physical
                contact, prolonged enclosed exposure, or exposure to body fluids.
              </p>
              <p>
                This does not mean casual public spread is expected. It explains why identified MV
                Hondius contacts are monitored while the wider public-health risk remains low.
              </p>
            </>
          ),
        },
        {
          id: "airborne",
          title: "What Airborne Means Here",
          subtitle: "Not Casual Airborne Spread",
          children: (
            <>
              <p>
                In hantavirus guidance, airborne risk usually means breathing contaminated dust from
                rodent waste. It should not be read as routine long-range airborne spread between
                strangers.
              </p>
              <p>
                For MV Hondius, the key concern is Andes virus close-contact transmission among
                passengers, crew, caregivers, or household contacts during the monitoring window.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/what-is-hantavirus", label: "What is hantavirus?" },
        { href: "/andes-virus", label: "Andes virus: the person-to-person strain" },
        { href: "/prevention", label: "Hantavirus prevention steps" },
      ]}
    />
  );
}
