import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Incubation Period: 1-8 Weeks and Andes Virus 4-42 Days",
  description:
    "Hantavirus incubation period, Andes virus 4-42 day timing, MV Hondius monitoring dates, and symptoms to watch during the exposure window.",
  alternates: { canonical: canonical("/incubation") },
  openGraph: {
    title: "Hantavirus Incubation Period",
    description:
      "Hantavirus timing, Andes virus 4-42 day window, and MV Hondius monitoring context.",
    url: canonical("/incubation"),
    type: "article",
  },
};

const faq = [
  {
    question: "What is the hantavirus incubation period?",
    answer:
      "CDC describes HPS symptoms as usually starting 1 to 8 weeks after contact with an infected rodent.",
  },
  {
    question: "What is the Andes virus incubation period?",
    answer:
      "CDC lists signs and symptoms of HPS due to Andes virus as appearing 4 to 42 days after exposure.",
  },
  {
    question: "Why are MV Hondius contacts monitored for 42 days?",
    answer:
      "The 42-day window covers the upper end of the Andes virus symptom timing used by public-health authorities for contact monitoring.",
  },
  {
    question: "Can symptoms appear after a negative early test?",
    answer:
      "Yes. Early testing can miss infection depending on timing. Contacts should follow their public-health monitoring instructions for the full window.",
  },
  {
    question: "What symptoms matter during incubation monitoring?",
    answer:
      "Fever, fatigue, muscle aches, gastrointestinal symptoms, cough, chest tightness, and shortness of breath should be reported promptly after known exposure.",
  },
];

export default function IncubationPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-don-2026-05-08",
    "src-ecdc-outbreak-2026-05-17",
  ]);

  return (
    <MedicalReferencePage
      path="/incubation"
      eyebrow="Timing guide"
      title="Hantavirus Incubation Period: 1-8 Weeks and Andes Virus 4-42 Days"
      description={metadata.description as string}
      intro="Incubation timing is one of the most searched questions because early symptoms can look ordinary. For MV Hondius, the important number is the Andes virus 4-42 day window after last possible exposure."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "General HPS",
          value: "1-8 weeks",
          description: "CDC timing after infected rodent exposure",
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
          id: "general",
          title: "General Hantavirus Timing",
          subtitle: "Why Symptoms Can Be Delayed",
          children: (
            <>
              <p>
                Hantavirus symptoms may appear weeks after exposure. That delay makes a clear
                exposure timeline important, especially when someone cleaned rodent-contaminated
                areas, handled rodents, or travelled in an area where Andes virus circulates.
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
