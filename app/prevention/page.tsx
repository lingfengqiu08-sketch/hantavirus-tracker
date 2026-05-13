import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Prevention: Rodent Cleanup and Andes Virus Precautions",
  description:
    "Hantavirus prevention steps: avoid rodent exposure, clean safely, reduce home risk, and understand Andes virus close-contact precautions.",
  alternates: { canonical: canonical("/prevention") },
  openGraph: {
    title: "Hantavirus Prevention",
    description:
      "Rodent cleanup, home prevention, travel precautions, and Andes virus close-contact guidance.",
    url: canonical("/prevention"),
    type: "article",
  },
};

const faq = [
  {
    question: "What is the best way to prevent hantavirus?",
    answer:
      "Avoid exposure to rodents and their urine, droppings, saliva, and nesting materials. CDC says avoiding rodent exposure is the best way to prevent infection.",
  },
  {
    question: "Should I sweep up mouse droppings?",
    answer:
      "Do not dry sweep or stir up rodent waste. Follow public-health cleanup guidance so contaminated dust is not inhaled.",
  },
  {
    question: "How do you reduce risk at home?",
    answer:
      "Seal holes and gaps, remove food sources, use traps where needed, and clean rodent-contaminated areas safely.",
  },
  {
    question: "Does Andes virus require different precautions?",
    answer:
      "Yes. Andes virus can rarely spread after close contact with a sick person, so contacts should follow isolation and monitoring instructions.",
  },
  {
    question: "Does the wider public need special precautions for MV Hondius?",
    answer:
      "UKHSA and other public-health agencies have described the wider public risk as very low. Identified contacts should follow direct public-health instructions.",
  },
];

export default function PreventionPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-prevention",
    "src-cdc-andes",
    "src-ukhsa-cruise-2026-05-12",
    "src-nhs-hantavirus",
  ]);

  return (
    <MedicalReferencePage
      path="/prevention"
      eyebrow="Prevention guide"
      title="Hantavirus Prevention: Rodent Cleanup and Andes Virus Precautions"
      description={metadata.description as string}
      intro="Prevention has two tracks: reduce rodent exposure, and follow close-contact precautions when Andes virus exposure is possible."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Best step",
          value: "Avoid rodents",
          description: "CDC's core prevention message",
          tone: "green",
        },
        {
          label: "Cleaning",
          value: "Do safely",
          description: "Do not stir up contaminated dust",
          tone: "amber",
        },
        {
          label: "Home risk",
          value: "Seal gaps",
          description: "Keep rodents out and remove food sources",
        },
        {
          label: "Andes",
          value: "Close contact",
          description: "Follow isolation and monitoring if exposed",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        transmissionMethod: [
          "Rodent urine, droppings, saliva, and nesting materials",
          "Rare close contact with a symptomatic Andes virus patient",
        ],
      }}
      sections={[
        {
          id: "home",
          title: "Home and Workplace Prevention",
          subtitle: "Keep Rodents Out",
          children: (
            <>
              <p>
                Seal holes and gaps, reduce food sources, control rodent infestations, and avoid
                contact with urine, droppings, saliva, and nesting materials.
              </p>
              <p>
                People who clean rodent-contaminated areas, handle rodents, work in pest control,
                or maintain buildings with infestations should follow stricter precautions.
              </p>
            </>
          ),
        },
        {
          id: "cleanup",
          title: "Cleaning Rodent Areas",
          subtitle: "Avoid Contaminated Dust",
          children: (
            <>
              <p>
                The key principle is to avoid stirring up dried rodent waste. Do not dry sweep or
                vacuum rodent droppings before following official cleanup guidance.
              </p>
              <p>
                If exposure is heavy, occupational, or involves vulnerable people, use local
                public-health or workplace safety guidance before cleanup.
              </p>
            </>
          ),
        },
        {
          id: "andes",
          title: "Andes Virus Close-Contact Precautions",
          subtitle: "Relevant to MV Hondius Contacts",
          children: (
            <>
              <p>
                Andes virus can rarely spread from a sick person after close, prolonged contact.
                That is why identified contacts may be asked to isolate, test, and report symptoms
                during a full monitoring period.
              </p>
              <p>
                People not linked to the outbreak do not need special measures beyond ordinary
                rodent-exposure prevention unless their public-health authority contacts them.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/rodents", label: "Hantavirus in mice, rats, and rodents" },
        { href: "/transmission", label: "How hantavirus spreads" },
        { href: "/cases/uk", label: "UK MV Hondius monitoring context" },
      ]}
    />
  );
}
