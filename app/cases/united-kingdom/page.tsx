import type { Metadata } from "next";
import Link from "next/link";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getCountryResponse } from "@/lib/country-responses";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus United Kingdom: MV Hondius Monitoring and Public Risk",
  description:
    "United Kingdom hantavirus context for the MV Hondius outbreak: UKHSA monitoring, Arrowe Park isolation pathway, public risk, and official sources.",
  alternates: { canonical: canonical("/cases/united-kingdom") },
  openGraph: {
    title: "Hantavirus United Kingdom: MV Hondius Monitoring",
    description:
      "UKHSA monitoring, Arrowe Park isolation pathway, British passenger context, and public risk.",
    url: canonical("/cases/united-kingdom"),
    type: "article",
  },
};

const faq = [
  {
    question: "Are there hantavirus cases in the United Kingdom linked to MV Hondius?",
    answer:
      "UKHSA reported British nationals among the MV Hondius case and contact response. This tracker does not infer extra UK case counts unless WHO, ECDC, or UKHSA confirms them.",
  },
  {
    question: "Is the wider UK public at risk?",
    answer:
      "UKHSA described the risk to the wider UK population as very low and said no additional precautions were necessary for the public.",
  },
  {
    question: "Where were returning passengers monitored in the UK?",
    answer:
      "UKHSA reported returning passengers were transferred to Arrowe Park Hospital on the Wirral for clinical assessment, testing, and isolation planning.",
  },
  {
    question: "Why does UK isolation say up to 45 days when WHO uses 42 days?",
    answer:
      "WHO uses a 42-day monitoring window for Andes virus exposure. UKHSA reported up to 45 days for the UK-managed isolation pathway, reflecting local operational arrangements.",
  },
];

export default function UnitedKingdomCasesPage() {
  const data = getOutbreak();
  const response = getCountryResponse("united-kingdom");
  const sources = getSourcesByIds([
    "src-govuk-ukhsa-update-2026-05-12",
    "src-ukhsa-cruise-2026-05-12",
    "src-govuk-hantaviruses",
    "src-nhs-hantavirus",
    "src-who-speech-2026-05-12",
    "src-ecdc-outbreak-2026-05-18",
  ]);

  return (
    <MedicalReferencePage
      path="/cases/united-kingdom"
      eyebrow="Country response"
      title="Hantavirus United Kingdom: MV Hondius Monitoring and Public Risk"
      description={metadata.description as string}
      intro="This page separates UKHSA's MV Hondius response from unsupported claims about local spread in the United Kingdom."
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
          description: "UKHSA-managed pathway",
          tone: "amber",
        },
        {
          label: "Tracker deaths",
          value: `${data.deaths}`,
          description: "Current MV Hondius-linked deaths",
          tone: "red",
        },
      ]}
      condition={{
        name: "Andes virus infection",
        alternateName: ["Hantavirus disease", "Hantavirus pulmonary syndrome"],
        transmissionMethod: [
          "Rodent exposure",
          "Rare close contact transmission for Andes virus",
        ],
      }}
      sections={[
        {
          id: "mv-hondius-uk",
          title: "United Kingdom Connection to MV Hondius",
          subtitle: "British Nationals, Contacts, and Monitoring",
          children: (
            <p>
              {response?.response} {response?.monitoring}
            </p>
          ),
        },
        {
          id: "case-status",
          title: "Case Count Boundary",
          subtitle: "No Unsupported National Count",
          children: (
            <p>
              {response?.caseStatus} The current tracker count remains the overall MV Hondius
              status split from ECDC, not a separate UK national surveillance number.
            </p>
          ),
        },
        {
          id: "risk",
          title: "Risk to the Wider UK Public",
          subtitle: "Very Low, According to UKHSA",
          children: (
            <p>
              {response?.publicRisk} Hantavirus is not spread through casual public contact such
              as walking in shops, schools, workplaces, or public transport.
            </p>
          ),
        },
        {
          id: "uk-rodents",
          title: "UK Rodent Context",
          subtitle: "Seoul Virus Is Not Andes Virus",
          children: (
            <p>
              UK guidance notes that Seoul hantavirus has been identified in the UK, but Andes
              virus has not been seen in the UK rodent population. For the MV Hondius event, start
              with the{" "}
              <Link className="underline underline-offset-4" href="/response-tracker">
                response tracker
              </Link>
              .
            </p>
          ),
        },
      ]}
      related={[
        { href: "/response-tracker", label: "Country response tracker" },
        { href: "/cases/eu-eea", label: "EU/EEA response context" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
      ]}
    />
  );
}
