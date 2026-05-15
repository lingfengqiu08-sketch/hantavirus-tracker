import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How Deadly Is Hantavirus? Mortality, Fatality, and Survival",
  description:
    "Hantavirus death rate, HPS fatality, survival factors, MV Hondius deaths, and why reported rates differ by syndrome and virus type.",
  alternates: { canonical: canonical("/death-rate") },
  openGraph: {
    title: "How Deadly Is Hantavirus?",
    description:
      "Hantavirus mortality, HPS fatality, survival factors, and MV Hondius death count context.",
    url: canonical("/death-rate"),
    type: "article",
  },
};

const faq = [
  {
    question: "How deadly is hantavirus pulmonary syndrome?",
    answer:
      "CDC states that HPS can be deadly and that 38% of people who develop respiratory symptoms may die from the disease.",
  },
  {
    question: "How many MV Hondius deaths have been reported?",
    answer:
      "The current tracker dataset reports 3 deaths linked to the MV Hondius cluster, using the latest official WHO and ECDC updates.",
  },
  {
    question: "Does every hantavirus have the same death rate?",
    answer:
      "No. Mortality differs by virus type, syndrome, access to care, severity, and how quickly supportive care begins.",
  },
  {
    question: "Can people survive hantavirus?",
    answer:
      "Yes. Survival is possible, especially with early recognition and supportive hospital care, but severe HPS is a medical emergency.",
  },
  {
    question: "Why do some sources show different fatality numbers?",
    answer:
      "Some numbers refer to HPS respiratory cases, while others refer to HFRS or specific hantavirus strains. Always compare the syndrome and virus type before comparing rates.",
  },
];

export default function DeathRatePage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-speech-2026-05-12",
    "src-who-factsheet-2026-05-06",
    "src-ecdc-facts",
  ]);

  return (
    <MedicalReferencePage
      path="/death-rate"
      eyebrow="Risk explainer"
      title="How Deadly Is Hantavirus? Mortality, Fatality, and Survival"
      description={metadata.description as string}
      intro="Hantavirus fatality depends on the syndrome, virus type, severity, and access to early supportive care. This page separates general HPS mortality from the current MV Hondius death count."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "HPS fatality",
          value: "38%",
          description: "CDC figure for people who develop respiratory symptoms",
          tone: "red",
        },
        {
          label: "MV Hondius",
          value: `${data.deaths}`,
          description: "Deaths in the current tracker dataset",
          tone: "red",
        },
        {
          label: "Confirmed",
          value: `${data.confirmed}`,
          description: "Confirmed Andes virus infections in this cluster",
          tone: "amber",
        },
        {
          label: "Survival",
          value: "Possible",
          description: "Early supportive care improves chances",
          tone: "green",
        },
      ]}
      condition={{
        name: "Hantavirus pulmonary syndrome",
        alternateName: ["HPS", "Andes virus infection"],
        signOrSymptom: ["Cough", "Shortness of breath", "Chest tightness", "Shock"],
        possibleTreatment: "Supportive intensive care",
      }}
      sections={[
        {
          id: "mortality",
          title: "Why Hantavirus Fatality Numbers Differ",
          subtitle: "Compare Like With Like",
          children: (
            <>
              <p>
                Hantavirus is a virus family, not one identical illness. HPS in the Americas,
                HFRS in Europe and Asia, Andes virus, Sin Nombre virus, Seoul virus, and Puumala
                virus do not all have the same severity profile.
              </p>
              <p>
                A headline death rate should always specify the syndrome, case definition, country,
                and time period. For MV Hondius, the tracker separates current deaths from general
                HPS fatality statistics.
              </p>
            </>
          ),
        },
        {
          id: "mv-hondius",
          title: "MV Hondius Death Count",
          subtitle: "Current Outbreak Context",
          children: (
            <>
              <p>
                The current dataset reports {data.deaths} deaths, {data.confirmed} confirmed
                infections, {data.probable} probable cases, and {data.inconclusive} inconclusive
                case in the MV Hondius-linked cluster.
              </p>
              <p>
                Because additional cases can appear during the monitoring window, this count should
                be checked against the latest WHO/ECDC/CDC updates before reuse.
              </p>
            </>
          ),
        },
        {
          id: "survival",
          title: "What Improves Survival",
          subtitle: "Speed and Supportive Care",
          children: (
            <>
              <p>
                Survival depends on how fast the illness is recognized and whether respiratory and
                circulatory support are available before severe complications advance.
              </p>
              <p>
                For an exposed person, the practical takeaway is simple: do not wait through
                worsening cough, shortness of breath, chest tightness, or rapid decline.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/hps", label: "Hantavirus pulmonary syndrome stages" },
        { href: "/treatment", label: "Treatment and supportive care" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
      ]}
    />
  );
}
