import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus in Mice, Rats, Deer Mice, and Rodents",
  description:
    "Which rodents carry hantavirus, how mouse and rat droppings create exposure risk, deer mouse and Seoul virus context, and safer cleanup basics.",
  alternates: { canonical: canonical("/rodents") },
  openGraph: {
    title: "Hantavirus in Mice, Rats, and Rodents",
    description:
      "Rodent hosts, droppings exposure, deer mice, rats, and prevention basics.",
    url: canonical("/rodents"),
    type: "article",
  },
};

const faq = [
  {
    question: "Do mice carry hantavirus?",
    answer:
      "Some mice can carry hantaviruses. In the United States, deer mice are the main reservoir for Sin Nombre virus, a cause of HPS.",
  },
  {
    question: "Do rats carry hantavirus?",
    answer:
      "Rats can carry some hantaviruses, including Seoul virus. UK guidance notes Seoul virus is found worldwide, including the UK.",
  },
  {
    question: "Can old mouse droppings be risky?",
    answer:
      "Risk is highest when contaminated rodent urine, droppings, saliva, or nesting material are disturbed and particles are inhaled.",
  },
  {
    question: "Are Andes virus rodents found in the UK?",
    answer:
      "UKHSA states Andes virus is associated with South American rodent species and has not been seen in the UK rodent population.",
  },
  {
    question: "What is the safest prevention step?",
    answer:
      "Avoid contact with rodent urine, droppings, saliva, and nesting materials, and follow public-health cleanup guidance instead of sweeping dry debris.",
  },
];

export default function RodentsPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-prevention",
    "src-govuk-hantaviruses",
    "src-ukhsa-cruise-2026-05-12",
  ]);

  return (
    <MedicalReferencePage
      path="/rodents"
      eyebrow="Rodent guide"
      title="Hantavirus in Mice, Rats, Deer Mice, and Rodents"
      description={metadata.description as string}
      intro="Hantaviruses are linked to specific rodent hosts. This page explains the practical difference between deer mice, rats, pet rodents, and the South American rodents associated with Andes virus."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Main spread",
          value: "Droppings",
          description: "Urine, feces, saliva, and contaminated dust",
        },
        {
          label: "US HPS",
          value: "Deer mouse",
          description: "Main Sin Nombre virus reservoir in the US",
        },
        {
          label: "Rats",
          value: "Seoul",
          description: "Seoul virus can be carried by rats",
          tone: "amber",
        },
        {
          label: "Prevention",
          value: "Avoid",
          description: "Do not disturb dry rodent waste",
          tone: "green",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        transmissionMethod: [
          "Inhalation of contaminated rodent excreta and fluids",
          "Contact with contaminated rodent materials",
          "Rare rodent bites or scratches",
        ],
      }}
      sections={[
        {
          id: "hosts",
          title: "Rodent Hosts",
          subtitle: "Different Viruses Have Different Reservoirs",
          children: (
            <>
              <p>
                Each hantavirus is associated with particular rodent hosts. In North America, deer
                mice are important for Sin Nombre virus. In Europe and Asia, other hantaviruses are
                associated with voles, rats, and field mice.
              </p>
              <p>
                Andes virus is associated with South American rodents. UKHSA states that the South
                American rodent species linked to Andes virus are not found in the UK.
              </p>
            </>
          ),
        },
        {
          id: "exposure",
          title: "How Rodent Exposure Happens",
          subtitle: "Dust, Surfaces, and Cleanup",
          children: (
            <>
              <p>
                Exposure can happen when fresh or dried rodent urine, droppings, saliva, or nesting
                material is disturbed and contaminated particles are inhaled.
              </p>
              <p>
                Dry sweeping, vacuuming, or stirring up nesting material can increase exposure risk.
                Use public-health cleanup guidance for any rodent-contaminated area.
              </p>
            </>
          ),
        },
        {
          id: "pets",
          title: "Pet Rats and UK Context",
          subtitle: "Seoul Virus Is Different From Andes Virus",
          children: (
            <>
              <p>
                UK guidance notes very few confirmed hantavirus infections in the United Kingdom,
                with Seoul virus identified in wild rats. Seoul virus does not spread between
                people in the way Andes virus can.
              </p>
              <p>
                Pet rodent owners should still follow hygiene guidance, especially around bedding,
                cages, bites, scratches, and cleaning.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/prevention", label: "How to prevent hantavirus exposure" },
        { href: "/transmission", label: "How hantavirus spreads" },
        { href: "/andes-virus", label: "Andes virus and South America" },
      ]}
    />
  );
}
