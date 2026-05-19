import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Andes Virus Hantavirus Incubation Period: 4-42 Days",
  description:
    "Andes virus incubation period: 4-42 days after exposure. General hantavirus HPS: 1-8 weeks. MV Hondius monitoring uses the 42-day window.",
  alternates: { canonical: canonical("/incubation") },
  openGraph: {
    title: "Andes Virus Hantavirus Incubation Period",
    description:
      "Quick answer: Andes virus 4-42 days, general HPS 1-8 weeks, and MV Hondius monitoring context.",
    url: canonical("/incubation"),
    type: "article",
  },
};

const faq = [
  {
    question: "What is the Andes virus incubation period?",
    answer:
      "CDC lists signs and symptoms of HPS due to Andes virus as appearing 4 to 42 days after exposure.",
  },
  {
    question: "What is the hantavirus incubation period for Andes virus?",
    answer:
      "For Andes virus, the incubation period used on this page is 4 to 42 days after exposure. That is why a full 42-day monitoring window matters after a known exposure.",
  },
  {
    question: "What is the general hantavirus HPS incubation period?",
    answer:
      "For HPS in general, CDC describes symptoms as usually starting 1 to 8 weeks after contact with an infected rodent.",
  },
  {
    question: "Why are MV Hondius contacts monitored for 42 days?",
    answer:
      "The 42-day window covers the upper end of the Andes virus symptom timing used by public-health authorities for contact monitoring.",
  },
  {
    question: "Can an early negative hantavirus test rule out Andes virus incubation?",
    answer:
      "Not by itself. Early negative testing can be timing-dependent, so exposed contacts should follow public-health or clinical instructions for the full monitoring window.",
  },
  {
    question: "What symptoms matter during the hantavirus incubation period?",
    answer:
      "Fever, fatigue, muscle aches, gastrointestinal symptoms, cough, chest tightness, and shortness of breath should be reported promptly after a known exposure.",
  },
];

export default function IncubationPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-don-2026-05-08",
    "src-ecdc-outbreak-2026-05-18",
  ]);

  return (
    <MedicalReferencePage
      path="/incubation"
      eyebrow="Quick answer guide"
      title="Andes Virus Hantavirus Incubation Period: 4-42 Days"
      description={metadata.description as string}
      intro={`Quick answer: the Andes virus incubation period is 4-42 days after exposure. For hantavirus pulmonary syndrome (HPS) in general, CDC describes symptoms as usually starting 1-8 weeks after infected rodent contact. For MV Hondius, this tracker follows the 42-day monitoring window through ${data.monitoringEndsAt}.`}
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "General HPS",
          value: "1-8 weeks",
          description: "Usual CDC timing after infected rodent contact",
        },
        {
          label: "Andes virus",
          value: "4-42 days",
          description: "CDC timing for HPS due to Andes virus",
          tone: "amber",
        },
        {
          label: "Last exposure",
          value: "2026-05-10",
          description: "MV Hondius monitoring reference date",
        },
        {
          label: "Window ends",
          value: data.monitoringEndsAt,
          description: "Tracker monitoring endpoint",
          tone: "green",
        },
      ]}
      condition={{
        name: "Andes virus infection",
        alternateName: ["Hantavirus pulmonary syndrome", "HPS"],
        signOrSymptom: ["Fever", "Fatigue", "Muscle aches", "Cough", "Shortness of breath"],
      }}
      sections={[
        {
          id: "andes-virus",
          title: "Andes Virus Incubation Period",
          subtitle: "4-42 Days After Exposure",
          children: (
            <>
              <p>
                CDC lists signs and symptoms of HPS due to Andes virus as appearing 4 to
                42 days after exposure. That is the key Andes hantavirus incubation period
                for MV Hondius contact monitoring.
              </p>
              <p>
                A person can be well during part of that window. Monitoring is meant to catch
                symptoms early if they develop; it does not mean every monitored contact is sick.
              </p>
            </>
          ),
        },
        {
          id: "general",
          title: "General Hantavirus HPS Incubation Period",
          subtitle: "Why Symptoms Can Be Delayed",
          children: (
            <>
              <p>
                For hantavirus pulmonary syndrome in general, CDC describes symptoms as usually
                starting 1 to 8 weeks after contact with an infected rodent. That longer general
                HPS range is separate from the specific 4 to 42 day Andes virus timing above.
              </p>
              <p>
                Early symptoms can be nonspecific, so exposure history should be shared with a
                clinician even if the first symptoms look like flu or stomach illness.
              </p>
            </>
          ),
        },
        {
          id: "mv-hondius",
          title: "MV Hondius Monitoring Window",
          subtitle: "Why 42 Days Is Used",
          children: (
            <>
              <p>
                For Andes virus, CDC lists a 4 to 42 day symptom window. The MV Hondius tracker
                uses last possible exposure on 10 May 2026, so the 42-day window runs through{" "}
                {data.monitoringEndsAt}.
              </p>
              <p>
                Monitoring does not mean a person is sick. It means public-health teams are trying
                to detect symptoms early and prevent onward exposure if illness develops.
              </p>
            </>
          ),
        },
        {
          id: "watch",
          title: "Symptoms to Watch",
          subtitle: "Report Changes Early",
          children: (
            <>
              <p>
                Fever, fatigue, large-muscle aches, headache, nausea, vomiting, diarrhea, abdominal
                pain, cough, shortness of breath, and chest tightness are the main signals to
                report after exposure.
              </p>
              <p>
                Breathing symptoms are especially important because HPS can move quickly once the
                respiratory phase begins.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/symptoms", label: "Hantavirus symptoms and warning timeline" },
        { href: "/hps", label: "Hantavirus pulmonary syndrome stages" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak timeline" },
      ]}
    />
  );
}
