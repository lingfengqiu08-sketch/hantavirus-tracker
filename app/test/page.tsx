import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus PCR Test: Diagnosis, Timing, and False Negatives",
  description:
    "Hantavirus PCR test and diagnosis timing: PCR, serology, early false negatives, MV Hondius screening, and when to seek medical advice.",
  alternates: { canonical: canonical("/test") },
  openGraph: {
    title: "Hantavirus PCR Test and Diagnosis",
    description:
      "Testing options, early diagnosis limits, MV Hondius testing, and when to contact clinicians.",
    url: canonical("/test"),
    type: "article",
  },
};

const faq = [
  {
    question: "What is a hantavirus PCR test?",
    answer:
      "A hantavirus PCR test looks for viral genetic material in a clinical sample. Public-health or reference laboratories usually coordinate testing when exposure and symptoms make it appropriate.",
  },
  {
    question: "How do you test for hantavirus?",
    answer:
      "Diagnosis usually uses specialised public-health laboratory testing such as PCR and serology. State, national, or reference laboratories often coordinate confirmation.",
  },
  {
    question: "Can an early hantavirus test be negative?",
    answer:
      "Yes. CDC notes diagnosis can be difficult very early after infection, and repeat testing may be needed depending on symptom timing.",
  },
  {
    question: "Should asymptomatic contacts be tested?",
    answer:
      "Testing decisions are made by public-health teams. UKHSA reported testing returning MV Hondius passengers even when they had no symptoms, as a precaution.",
  },
  {
    question: "Can I order a home hantavirus test?",
    answer:
      "This tracker does not recommend home testing. Exposed or symptomatic people should contact a clinician or public-health authority for appropriate testing.",
  },
  {
    question: "What should I tell a doctor?",
    answer:
      "Mention rodent exposure, South America travel, MV Hondius contact, contact with a known case, symptom onset date, and any respiratory symptoms.",
  },
];

export default function TestPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-clinical-overview",
    "src-cdc-andes",
    "src-ukhsa-cruise-2026-05-12",
  ]);

  return (
    <MedicalReferencePage
      path="/test"
      eyebrow="Diagnosis guide"
      title="Hantavirus PCR Test: Diagnosis, Timing, and False Negatives"
      description={metadata.description as string}
      intro="Hantavirus PCR testing and diagnosis usually depend on clinical assessment, exposure history, symptom timing, and public-health laboratory confirmation. A test result is most useful when interpreted with the full exposure timeline."
      quickAnswer={
        <p>
          Hantavirus diagnosis can use <strong>PCR</strong> and serology, but testing
          is usually coordinated by clinicians or public-health laboratories. Early
          results can be hard to interpret, so exposed contacts may still need monitoring
          even after an initial negative test.
        </p>
      }
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Methods",
          value: "PCR/serology",
          description: "Common public-health laboratory approaches",
        },
        {
          label: "Early testing",
          value: "Tricky",
          description: "CDC notes very early diagnosis can be difficult",
          tone: "amber",
        },
        {
          label: "MV Hondius",
          value: "Screened",
          description: "UKHSA reported testing monitored passengers",
        },
        {
          label: "Best route",
          value: "Clinician",
          description: "Use public-health or clinical testing channels",
          tone: "green",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        alternateName: ["Andes virus infection", "HPS", "HFRS"],
      }}
      sections={[
        {
          id: "testing",
          title: "How Hantavirus Testing Works",
          subtitle: "Clinical and Public-Health Lab Pathway",
          children: (
            <>
              <p>
                Hantavirus testing usually involves specialised laboratories. Clinicians and
                public-health teams decide whether PCR, serology, repeat testing, or additional
                investigation is appropriate.
              </p>
              <p>
                Exposure history matters. A test request is more meaningful when it includes the
                suspected exposure date, symptom onset, travel history, and whether Andes virus
                contact is possible.
              </p>
            </>
          ),
        },
        {
          id: "early",
          title: "Why Timing Matters",
          subtitle: "Early Results Can Be Hard to Interpret",
          children: (
            <>
              <p>
                CDC notes that diagnosing hantavirus very early can be difficult. If testing occurs
                before the virus or immune response is detectable, repeat testing may be needed.
              </p>
              <p>
                This is why contacts may still need symptom monitoring even after an early negative
                result.
              </p>
            </>
          ),
        },
        {
          id: "mv-hondius",
          title: "MV Hondius Testing",
          subtitle: "Screening During Monitoring",
          children: (
            <>
              <p>
                UKHSA reported PCR testing for returning passengers under assessment, including
                people without symptoms, so that positive cases could be detected early.
              </p>
              <p>
                Testing rules can differ by country. Contacts should follow the instructions from
                the authority managing their monitoring.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/incubation", label: "Hantavirus incubation period" },
        { href: "/symptoms", label: "Symptoms to report during monitoring" },
        { href: "/treatment", label: "Treatment and supportive care" },
      ]}
    />
  );
}
