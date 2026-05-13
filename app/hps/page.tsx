import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Pulmonary Syndrome (HPS): Stages and Survival",
  description:
    "Hantavirus pulmonary syndrome stages, early symptoms, respiratory warning signs, survival, treatment, and MV Hondius Andes virus context.",
  alternates: { canonical: canonical("/hps") },
  openGraph: {
    title: "Hantavirus Pulmonary Syndrome (HPS): Stages and Survival",
    description:
      "Clear HPS guide covering symptoms, respiratory phase, survival, treatment, and Andes virus context.",
    url: canonical("/hps"),
    type: "article",
  },
};

const faq = [
  {
    question: "What is hantavirus pulmonary syndrome?",
    answer:
      "Hantavirus pulmonary syndrome, or HPS, is a severe respiratory disease caused by New World hantaviruses. It can progress from flu-like symptoms to cough, shortness of breath, fluid in the lungs, and shock.",
  },
  {
    question: "How long after exposure can HPS symptoms appear?",
    answer:
      "CDC describes a 1 to 8 week window after rodent exposure for HPS. For Andes virus exposure, CDC lists 4 to 42 days.",
  },
  {
    question: "Is HPS the same as Andes virus infection?",
    answer:
      "Andes virus is one hantavirus that can cause HPS. It is notable because it is the only hantavirus with documented limited person-to-person spread.",
  },
  {
    question: "Can HPS be treated?",
    answer:
      "There is no specific cure for hantavirus infection. Treatment is supportive and may require oxygen, ventilatory support, careful fluid management, and intensive care.",
  },
  {
    question: "When should someone seek urgent care?",
    answer:
      "Seek urgent care for breathing difficulty, chest tightness, worsening cough, low blood pressure, rapid worsening illness, or any symptoms after known Andes virus exposure.",
  },
];

export default function HpsPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-factsheet-2026-05-06",
    "src-ecdc-facts",
  ]);

  return (
    <MedicalReferencePage
      path="/hps"
      eyebrow="Medical reference"
      title="Hantavirus Pulmonary Syndrome (HPS): Stages and Survival"
      description={metadata.description as string}
      intro="HPS is the severe lung-and-circulation syndrome caused by several hantaviruses in the Americas, including Andes virus. This page explains the timeline, warning signs, treatment, and how the MV Hondius cluster fits the syndrome."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Window",
          value: "1-8 weeks",
          description: "Typical HPS symptom window after rodent exposure",
        },
        {
          label: "Andes virus",
          value: "4-42 days",
          description: "CDC timing for HPS due to Andes virus",
          tone: "amber",
        },
        {
          label: "Late phase",
          value: "4-10 days",
          description: "After initial symptoms, breathing symptoms can appear",
        },
        {
          label: "Care",
          value: "Supportive",
          description: "No specific cure; early ICU-level care matters",
          tone: "green",
        },
      ]}
      condition={{
        name: "Hantavirus pulmonary syndrome",
        alternateName: ["HPS", "HCPS", "Andes virus infection"],
        signOrSymptom: [
          "Fever",
          "Fatigue",
          "Muscle aches",
          "Cough",
          "Shortness of breath",
          "Chest tightness",
        ],
        transmissionMethod: [
          "Exposure to infected rodent urine, droppings, or saliva",
          "Rare close contact transmission for Andes virus",
        ],
        possibleTreatment: "Early supportive intensive care",
      }}
      sections={[
        {
          id: "stages",
          title: "HPS Stages",
          subtitle: "From Flu-Like Illness to Respiratory Distress",
          children: (
            <>
              <p>
                Early HPS can look like influenza: fever, fatigue, large-muscle aches, headache,
                dizziness, chills, nausea, vomiting, diarrhea, or abdominal pain.
              </p>
              <p>
                The dangerous stage is the cardiopulmonary phase. A worsening cough, shortness of
                breath, chest tightness, falling blood pressure, and shock require urgent medical
                care.
              </p>
            </>
          ),
        },
        {
          id: "andes",
          title: "Why Andes Virus Changes the Risk Picture",
          subtitle: "The Person-to-Person Exception",
          children: (
            <>
              <p>
                Most hantaviruses are not known for person-to-person spread. Andes virus is the
                exception, with documented limited spread after close, prolonged contact with a
                symptomatic person.
              </p>
              <p>
                That is why MV Hondius contacts are being monitored for 42 days after last possible
                exposure, even when the general population risk remains low.
              </p>
            </>
          ),
        },
        {
          id: "survival",
          title: "Survival and Treatment",
          subtitle: "Early Recognition Matters",
          children: (
            <>
              <p>
                HPS can be deadly, especially once respiratory symptoms begin. There is no specific
                antiviral cure, so care focuses on oxygen, breathing support, circulation support,
                and managing complications.
              </p>
              <p>
                Anyone with known MV Hondius or Andes virus exposure should tell clinicians about
                that exposure immediately if fever, gastrointestinal symptoms, cough, or breathing
                changes appear.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/symptoms", label: "Hantavirus symptoms timeline" },
        { href: "/transmission", label: "How hantavirus spreads" },
        { href: "/treatment", label: "Hantavirus treatment and vaccine status" },
      ]}
    />
  );
}
