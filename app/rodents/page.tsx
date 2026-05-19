import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Andes Virus Reservoir Rodents: Mice, Rats & Hantavirus",
  description:
    "Andes virus reservoir rodent species are South American rodents. Compare deer mice, rats, Seoul virus, droppings risk, and safer cleanup basics.",
  alternates: { canonical: canonical("/rodents") },
  openGraph: {
    title: "Andes Virus Reservoir Rodents: Mice, Rats & Hantavirus",
    description:
      "South American Andes virus rodent context, plus deer mice, rats, Seoul virus, droppings exposure, and prevention basics.",
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
    question: "What are the Andes virus reservoir rodent species?",
    answer:
      "Public-health sources used here describe Andes virus as associated with South American rodent species. This page does not name a specific species unless an official source names it; the practical distinction is that Andes virus rodents are not the same as UK rats or North American deer mice.",
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
      title="Andes Virus Reservoir Rodents: Mice, Rats & Hantavirus"
      description={metadata.description as string}
      intro="Andes virus reservoir rodent searches often mix several different animals. This page separates the South American rodents associated with Andes virus from North American deer mice, UK rats, pet rats, and the cleanup risks from rodent urine, droppings, saliva, or nesting material."
      quickAnswer={
        <p>
          Andes virus is associated with <strong>South American rodent species</strong>,
          and UKHSA states those species are not found in the UK. Deer mice are
          mainly discussed for Sin Nombre virus in North America; rats can carry
          Seoul virus. Avoid disturbing dry rodent waste from any species.
        </p>
      }
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
          label: "Andes reservoir",
          value: "South America",
          description: "Associated rodent species are not found in the UK per UKHSA",
          tone: "amber",
        },
        {
          label: "Rats",
          value: "Seoul",
          description: "Seoul virus can be carried by rats",
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
          title: "Andes Virus Reservoir Rodents",
          subtitle: "Different Hantaviruses Have Different Reservoirs",
          children: (
            <>
              <p>
                Each hantavirus is associated with particular rodent hosts. For Andes virus,
                the public-health sources used on this tracker describe the reservoir context as
                South American rodent species, not UK rats or North American deer mice.
              </p>
              <p>
                Andes virus is associated with South American rodents. UKHSA states that the South
                American rodent species linked to Andes virus are not found in the UK.
              </p>
              <p>
                In North America, deer mice are important for Sin Nombre virus. In Europe and Asia,
                other hantaviruses are associated with voles, rats, and field mice. That is why the
                exact virus name matters when comparing rodent risks.
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
