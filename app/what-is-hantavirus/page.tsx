import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/faq";
import { SourceList } from "@/components/source-list";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What Is Hantavirus? Transmission, Types, and Risk",
  description:
    "A clear explanation of hantavirus, Andes virus, transmission, symptoms, treatment, and why the MV Hondius outbreak is being monitored.",
  alternates: { canonical: canonical("/what-is-hantavirus") },
  openGraph: {
    title: "What Is Hantavirus?",
    description:
      "Hantavirus, Andes virus, transmission, symptoms, treatment, and why the MV Hondius outbreak is being monitored.",
    url: canonical("/what-is-hantavirus"),
    type: "article",
  },
};

const faq = [
  {
    question: "Is hantavirus always deadly?",
    answer:
      "No. Outcome depends on the strain, host response, and how early supportive care begins. Hantavirus pulmonary syndrome (HPS) carries a high case fatality if untreated; supportive ICU care improves survival.",
  },
  {
    question: "Can hantavirus spread between people?",
    answer:
      "Most hantaviruses do not spread person to person. Andes virus is the documented exception: limited spread has been reported with close, prolonged contact, which is why the MV Hondius cluster is monitored carefully.",
  },
  {
    question: "What is Andes virus?",
    answer:
      "Andes virus is a hantavirus found in South America. It causes hantavirus cardiopulmonary syndrome and is the only hantavirus with documented limited human-to-human transmission.",
  },
  {
    question: "Is there a vaccine or specific treatment?",
    answer:
      "There is no widely licensed hantavirus vaccine and no specific antiviral. Treatment is supportive: early oxygen and circulatory support, often in an intensive-care setting.",
  },
  {
    question: "Why is the MV Hondius outbreak important?",
    answer:
      "It is a multi-country cluster of confirmed Andes virus infections on a cruise ship, with deaths and the unusual feature of possible person-to-person transmission. WHO, ECDC and CDC are coordinating monitoring.",
  },
];

export default function WhatIsHantavirusPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-factsheet-2026-05-06",
    "src-ecdc-facts",
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${canonical("/what-is-hantavirus")}#webpage`,
        url: canonical("/what-is-hantavirus"),
        name: "What Is Hantavirus?",
        headline: "What Is Hantavirus?",
        description:
          "A clear explanation of hantavirus, Andes virus, transmission, symptoms, treatment, and why the MV Hondius outbreak is being monitored.",
        datePublished: "2026-05-13",
        dateModified: data.lastUpdated,
        inLanguage: "en",
        isAccessibleForFree: true,
        about: { "@id": `${canonical("/what-is-hantavirus")}#condition` },
        mainEntity: { "@id": `${canonical("/what-is-hantavirus")}#condition` },
        citation: sources.map((s) => ({
          "@type": "CreativeWork",
          name: s.name,
          url: s.url,
        })),
      },
      {
        "@type": "MedicalCondition",
        "@id": `${canonical("/what-is-hantavirus")}#condition`,
        name: "Hantavirus disease",
        alternateName: [
          "Hantavirus pulmonary syndrome",
          "Hantavirus cardiopulmonary syndrome",
          "Hemorrhagic fever with renal syndrome",
          "Andes virus infection",
        ],
        infectiousAgent: {
          "@type": "InfectiousAgentClass",
          name: "Hantaviruses",
        },
        transmissionMethod: [
          "Exposure to infected rodent urine, droppings, or saliva",
          "Contact with contaminated surfaces",
          "Rare close and prolonged person-to-person transmission for Andes virus",
        ],
        signOrSymptom: [
          { "@type": "MedicalSymptom", name: "Fever" },
          { "@type": "MedicalSymptom", name: "Muscle aches" },
          { "@type": "MedicalSymptom", name: "Gastrointestinal symptoms" },
          { "@type": "MedicalSymptom", name: "Cough" },
          { "@type": "MedicalSymptom", name: "Shortness of breath" },
        ],
        possibleTreatment: {
          "@type": "MedicalTherapy",
          name: "Supportive care, including respiratory and hemodynamic support when needed",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical("/what-is-hantavirus")}#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Medical reference</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          What Is Hantavirus?
        </h1>
        <p className="text-base text-muted-foreground">
          Hantaviruses are a family of viruses primarily spread by rodents. Below is a short
          explainer: what they are, how they spread, the two main syndromes, and why the MV
          Hondius Andes virus cluster is being monitored across multiple countries.
        </p>
      </header>

      <section id="definition" className="space-y-3">
        <h2 className="text-xl font-semibold">Hantavirus Definition</h2>
        <h3 className="text-base font-medium">A Rodent-Borne Virus Family</h3>
        <p className="text-sm text-muted-foreground">
          Hantaviruses are RNA viruses primarily carried by certain rodents. People typically
          become infected by inhaling virus aerosolised from infected rodent urine, droppings
          or saliva. Some strains can cause severe disease and death.
        </p>
      </section>

      <section id="syndromes" className="space-y-3">
        <h2 className="text-xl font-semibold">Main Hantavirus Syndromes</h2>
        <h3 className="text-base font-medium">Hantavirus Pulmonary Syndrome</h3>
        <p className="text-sm text-muted-foreground">
          In the Americas, several hantaviruses including Sin Nombre virus and Andes virus
          cause hantavirus pulmonary syndrome (HPS, also called HCPS). HPS targets the lungs
          and cardiovascular system; severe cases progress to respiratory failure and shock.
        </p>
        <h3 className="text-base font-medium">Hemorrhagic Fever with Renal Syndrome</h3>
        <p className="text-sm text-muted-foreground">
          In Europe and Asia, hantaviruses such as Puumala, Seoul and Hantaan cause
          hemorrhagic fever with renal syndrome (HFRS), affecting the kidneys and blood
          vessels.
        </p>
      </section>

      <section id="andes" className="space-y-3">
        <h2 className="text-xl font-semibold">Andes Virus</h2>
        <h3 className="text-base font-medium">The Person-to-Person Exception</h3>
        <p className="text-sm text-muted-foreground">
          Andes virus is found in South America and is the only hantavirus with documented
          limited person-to-person transmission, in cases of close and prolonged contact.
          That is why the MV Hondius cluster — with cases identified as Andes virus — is being
          monitored across <strong>{data.passengerStatus.repatriated}+</strong> repatriated
          passengers for the full 42-day window.
        </p>
      </section>

      <section id="spread" className="space-y-3">
        <h2 className="text-xl font-semibold">How Hantavirus Spreads</h2>
        <h3 className="text-base font-medium">Rodent Exposure</h3>
        <p className="text-sm text-muted-foreground">
          Most transmission occurs after exposure to rodent urine, droppings or saliva, often
          through inhalation of aerosolised dust in enclosed spaces. Direct contact with
          contaminated surfaces can also transmit virus.
        </p>
        <h3 className="text-base font-medium">Close Contact in Andes Virus</h3>
        <p className="text-sm text-muted-foreground">
          For Andes virus, close, prolonged person-to-person contact has been reported to
          transmit infection. This is rare for hantaviruses overall, but it is the reason WHO
          and ECDC monitor MV Hondius contacts directly.
        </p>
      </section>

      <section id="diagnosis" className="space-y-3">
        <h2 className="text-xl font-semibold">Diagnosis and Treatment</h2>
        <h3 className="text-base font-medium">Testing</h3>
        <p className="text-sm text-muted-foreground">
          Diagnosis usually requires public-health or specialised clinical laboratory testing
          (PCR, serology). Early diagnosis is hard because initial symptoms overlap with
          influenza.
        </p>
        <h3 className="text-base font-medium">Supportive Care</h3>
        <p className="text-sm text-muted-foreground">
          There is no licensed antiviral specifically for hantavirus. Treatment is supportive,
          with early oxygen, fluid management and intensive-care support when needed.
        </p>
      </section>

      <section id="table" className="space-y-3">
        <h2 className="text-xl font-semibold">Key Facts Table</h2>
        <h3 className="text-base font-medium">Transmission, Symptoms, and Risk</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="border-b p-2">Topic</th>
                <th className="border-b p-2">Short answer</th>
                <th className="border-b p-2">Why it matters</th>
                <th className="border-b p-2">Source</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr>
                <td className="border-b p-2 font-medium text-foreground">Main carrier</td>
                <td className="border-b p-2">Wild rodents (deer mice, others)</td>
                <td className="border-b p-2">Exposure usually starts there</td>
                <td className="border-b p-2">CDC</td>
              </tr>
              <tr>
                <td className="border-b p-2 font-medium text-foreground">Person-to-person</td>
                <td className="border-b p-2">Rare; documented for Andes virus only</td>
                <td className="border-b p-2">Reason for MV Hondius monitoring</td>
                <td className="border-b p-2">WHO · CDC</td>
              </tr>
              <tr>
                <td className="border-b p-2 font-medium text-foreground">Main syndromes</td>
                <td className="border-b p-2">HPS in Americas; HFRS in Eurasia</td>
                <td className="border-b p-2">Different organs affected</td>
                <td className="border-b p-2">WHO</td>
              </tr>
              <tr>
                <td className="border-b p-2 font-medium text-foreground">Treatment</td>
                <td className="border-b p-2">Supportive ICU-level care</td>
                <td className="border-b p-2">No specific antiviral approved</td>
                <td className="border-b p-2">CDC</td>
              </tr>
              <tr>
                <td className="border-b p-2 font-medium text-foreground">Public risk</td>
                <td className="border-b p-2">Low for general population</td>
                <td className="border-b p-2">Monitoring focuses on contacts</td>
                <td className="border-b p-2">WHO · ECDC</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="faq" className="space-y-3">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <FAQ items={faq} />
      </section>

      <section id="sources" className="space-y-3">
        <h2 className="text-xl font-semibold">Sources</h2>
        <SourceList sources={sources} />
      </section>

      <nav className="rounded-lg border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Related</p>
        <ul className="mt-2 space-y-1">
          <li>
            <Link className="underline underline-offset-4" href="/">
              Current MV Hondius outbreak map
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/symptoms">
              Hantavirus symptoms timeline
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/cruise/mv-hondius">
              MV Hondius cruise outbreak details
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
