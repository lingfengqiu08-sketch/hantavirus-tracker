import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Treatment, Cure, Vaccine, and Supportive Care",
  description:
    "What works for hantavirus treatment in 2026: supportive care, ICU care, oxygen support, vaccine status, cure claims, and Andes virus context.",
  alternates: { canonical: canonical("/treatment") },
  openGraph: {
    title: "Hantavirus Treatment, Cure, Vaccine, and Supportive Care",
    description:
      "Supportive care, ICU treatment, vaccine status, cure claims, and when to seek care after exposure.",
    url: canonical("/treatment"),
    type: "article",
  },
};

const faq = [
  {
    question: "Is there a cure for hantavirus?",
    answer:
      "There is no specific cure for hantavirus infection. Care is supportive and focuses on breathing, circulation, hydration, and managing complications.",
  },
  {
    question: "Is there a vaccine for hantavirus?",
    answer:
      "CDC states there is no specific antiviral treatment or vaccine currently available for Andes virus. Availability can vary by country and virus type, so official public-health guidance should be followed.",
  },
  {
    question: "What treatment helps HPS?",
    answer:
      "Early hospital care can include oxygen, intubation, ventilatory support, blood pressure support, and intensive monitoring.",
  },
  {
    question: "Should exposed MV Hondius contacts wait for severe symptoms?",
    answer:
      "No. Contacts should follow public-health monitoring instructions and seek medical advice promptly if fever, gastrointestinal symptoms, cough, or breathing changes appear.",
  },
  {
    question: "Do antibiotics treat hantavirus?",
    answer:
      "Antibiotics do not treat viruses. Clinicians may use them only if another bacterial infection is suspected.",
  },
];

export default function TreatmentPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-factsheet-2026-05-06",
    "src-ecdc-facts",
  ]);

  return (
    <MedicalReferencePage
      path="/treatment"
      eyebrow="Treatment guide"
      title="Hantavirus Treatment, Cure, Vaccine, and Supportive Care"
      description={metadata.description as string}
      intro="Hantavirus treatment is about early recognition and supportive medical care. There is no single cure for hantavirus infection, so the practical goal is to get severe cases into appropriate care before respiratory failure or shock progresses."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Specific cure",
          value: "No",
          description: "No specific cure for hantavirus infection",
          tone: "red",
        },
        {
          label: "Care model",
          value: "Supportive",
          description: "Oxygen, ventilation, fluids, and circulation support",
          tone: "green",
        },
        {
          label: "Andes vaccine",
          value: "None",
          description: "CDC lists no current Andes virus vaccine",
          tone: "amber",
        },
        {
          label: "Best action",
          value: "Early care",
          description: "Tell clinicians about rodent or MV Hondius exposure",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        alternateName: ["Hantavirus pulmonary syndrome", "Andes virus infection"],
        possibleTreatment: "Supportive care, including respiratory and circulatory support",
      }}
      sections={[
        {
          id: "supportive-care",
          title: "What Treatment Means",
          subtitle: "Support the Body While the Illness Runs Its Course",
          children: (
            <>
              <p>
                Supportive care can include oxygen, breathing support, blood pressure support,
                careful fluid management, fever control, and treatment of complications.
              </p>
              <p>
                Severe HPS cases may need intensive care because the lungs can fill with fluid and
                circulation can become unstable quickly.
              </p>
            </>
          ),
        },
        {
          id: "vaccine",
          title: "Vaccine and Antiviral Status",
          subtitle: "No Routine Cure Claim Should Be Trusted",
          children: (
            <>
              <p>
                CDC states there is no specific antiviral treatment or vaccine currently available
                for Andes virus. That makes source quality important: avoid pages promising a quick
                cure, supplement, or home remedy.
              </p>
              <p>
                Official guidance may differ by country and virus type, but for MV Hondius contacts
                the safest action is to follow assigned public-health monitoring instructions.
              </p>
            </>
          ),
        },
        {
          id: "when-to-seek-care",
          title: "When to Seek Care",
          subtitle: "Do Not Wait for Respiratory Failure",
          children: (
            <>
              <p>
                Known exposed contacts should seek clinical advice as soon as fever,
                gastrointestinal symptoms, cough, shortness of breath, or chest tightness appear.
              </p>
              <p>
                The exposure history matters. Tell the clinician about rodent exposure, South
                America travel, MV Hondius contact, or possible Andes virus contact.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/symptoms", label: "Hantavirus symptoms and warning signs" },
        { href: "/hps", label: "Hantavirus pulmonary syndrome stages" },
        { href: "/death-rate", label: "Hantavirus mortality and survival" },
      ]}
    />
  );
}
