import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/faq";
import { SourceList } from "@/components/source-list";
import { UpdateBanner } from "@/components/update-banner";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Symptoms | Early Signs and Warning Timeline",
  description:
    "Learn hantavirus symptoms, early warning signs, severe respiratory symptoms, incubation timeline, and what MV Hondius contacts should watch for.",
  alternates: { canonical: canonical("/symptoms") },
  openGraph: {
    title: "Hantavirus Symptoms and When to Seek Care",
    description:
      "Hantavirus early symptoms, severe respiratory phase, incubation window and MV Hondius contact guidance.",
    url: canonical("/symptoms"),
    type: "article",
  },
};

const faq = [
  {
    question: "What are the first symptoms of hantavirus?",
    answer:
      "Early symptoms can include fever, fatigue, muscle aches, headache, nausea, vomiting, diarrhea, and abdominal pain.",
  },
  {
    question: "How long after exposure do symptoms appear?",
    answer:
      "Symptoms may appear days to weeks after exposure. For MV Hondius-related Andes virus contacts, WHO recommends 42 days of monitoring from last exposure.",
  },
  {
    question: "Can hantavirus symptoms look like flu?",
    answer:
      "Yes. Early symptoms — fever, muscle aches, headache, fatigue — overlap with influenza. The respiratory phase is what makes hantavirus distinctive and dangerous.",
  },
  {
    question: "When should I seek emergency care?",
    answer:
      "Seek urgent care for breathing difficulty, chest tightness, worsening cough, rapid progression of illness, or for any symptoms after a known hantavirus exposure.",
  },
  {
    question: "Are Andes virus symptoms different?",
    answer:
      "Andes virus typically causes the same hantavirus pulmonary syndrome (HPS) as other New World hantaviruses, but it has the unique feature of limited person-to-person transmission with close, prolonged contact.",
  },
  {
    question: "Can someone be monitored without symptoms?",
    answer:
      "Yes. Public-health authorities monitor known exposed contacts for the full 42-day window even if they are asymptomatic, in order to detect onset early.",
  },
];

export default function SymptomsPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-factsheet-2026-05-06",
    "src-ecdc-facts",
    "src-who-don-2026-05-08",
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${canonical("/symptoms")}#webpage`,
        url: canonical("/symptoms"),
        name: "Hantavirus Symptoms and When to Seek Care",
        headline: "Hantavirus Symptoms and When to Seek Care",
        description:
          "Learn hantavirus symptoms, early warning signs, severe respiratory symptoms, incubation timeline, and what MV Hondius contacts should watch for.",
        datePublished: "2026-05-13",
        dateModified: data.lastUpdated,
        inLanguage: "en",
        isAccessibleForFree: true,
        about: { "@id": `${canonical("/symptoms")}#condition` },
        mainEntity: [
          { "@id": `${canonical("/symptoms")}#condition` },
          { "@id": `${canonical("/symptoms")}#faq` },
        ],
        citation: sources.map((s) => ({
          "@type": "CreativeWork",
          name: s.name,
          url: s.url,
        })),
      },
      {
        "@type": "MedicalCondition",
        "@id": `${canonical("/symptoms")}#condition`,
        name: "Hantavirus disease",
        alternateName: [
          "Hantavirus pulmonary syndrome",
          "HPS",
          "HCPS",
          "Andes virus infection",
        ],
        signOrSymptom: [
          { "@type": "MedicalSymptom", name: "Fever" },
          { "@type": "MedicalSymptom", name: "Fatigue" },
          { "@type": "MedicalSymptom", name: "Muscle aches" },
          { "@type": "MedicalSymptom", name: "Headache" },
          { "@type": "MedicalSymptom", name: "Nausea or vomiting" },
          { "@type": "MedicalSymptom", name: "Diarrhea" },
          { "@type": "MedicalSymptom", name: "Cough" },
          { "@type": "MedicalSymptom", name: "Shortness of breath" },
          { "@type": "MedicalSymptom", name: "Chest tightness" },
        ],
        possibleTreatment: {
          "@type": "MedicalTherapy",
          name: "Early supportive medical care",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical("/symptoms")}#faq`,
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
          Hantavirus Symptoms and When to Seek Care
        </h1>
        <p className="text-base text-muted-foreground">
          Hantavirus early symptoms can look like flu. The dangerous phase is respiratory.
          Below is a structured summary of signs, timeline, and what MV Hondius contacts should
          do during the 42-day monitoring period.
        </p>
        <UpdateBanner
          lastUpdated={data.lastUpdated}
          lastVerifiedAt={data.lastVerifiedAt}
          sourceName={data.sourceName}
          sourceUrl={data.sourceUrl}
        />
      </header>

      <section id="early" className="space-y-3">
        <h2 className="text-xl font-semibold">Early Hantavirus Symptoms</h2>
        <h3 className="text-base font-medium">Flu-Like Symptoms</h3>
        <p className="text-sm text-muted-foreground">
          Early-phase hantavirus illness can include fever, fatigue, muscle aches (especially
          large muscle groups such as thighs, hips, back, and shoulders), and headache. These
          symptoms commonly overlap with influenza, which is why early diagnosis is hard.
        </p>
        <h3 className="text-base font-medium">Gastrointestinal Symptoms</h3>
        <p className="text-sm text-muted-foreground">
          Nausea, vomiting, diarrhea, and abdominal pain are common in early hantavirus. They
          have also been described among the MV Hondius cluster.
        </p>
      </section>

      <section id="severe" className="space-y-3">
        <h2 className="text-xl font-semibold">Severe Symptoms</h2>
        <h3 className="text-base font-medium">Breathing Problems</h3>
        <p className="text-sm text-muted-foreground">
          A cough, shortness of breath, and chest tightness signal the start of hantavirus
          pulmonary syndrome (HPS). The transition can occur 4 to 10 days after initial
          symptoms.
        </p>
        <h3 className="text-base font-medium">Emergency Warning Signs</h3>
        <p className="text-sm text-muted-foreground">
          Rapid progression to pneumonia, fluid in the lungs (acute respiratory distress
          syndrome), and shock are medical emergencies and require immediate hospital care.
        </p>
      </section>

      <section id="incubation" className="space-y-3">
        <h2 className="text-xl font-semibold">Incubation Period</h2>
        <h3 className="text-base font-medium">Why Monitoring Can Last 42 Days</h3>
        <p className="text-sm text-muted-foreground">
          Hantavirus symptoms can appear days to several weeks after exposure. For Andes virus
          contacts on MV Hondius, WHO recommends 42 days of active monitoring from the last
          potential exposure on 10 May 2026. The window ends on{" "}
          <strong>{data.monitoringEndsAt}</strong>.
        </p>
      </section>

      <section id="table" className="space-y-3">
        <h2 className="text-xl font-semibold">Symptoms Table</h2>
        <h3 className="text-base font-medium">Early vs Severe Symptoms</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="border-b p-2">Stage</th>
                <th className="border-b p-2">Symptoms</th>
                <th className="border-b p-2">What to do</th>
                <th className="border-b p-2">Source</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr>
                <td className="border-b p-2 font-medium text-foreground">Early (1–2 weeks)</td>
                <td className="border-b p-2">Fever, fatigue, muscle aches, headache, GI symptoms</td>
                <td className="border-b p-2">Isolate, contact health authority, monitor for breathing changes</td>
                <td className="border-b p-2">WHO · CDC</td>
              </tr>
              <tr>
                <td className="border-b p-2 font-medium text-foreground">Pre-cardiopulmonary (3–7 days)</td>
                <td className="border-b p-2">Worsening fatigue, cough, mild dyspnea</td>
                <td className="border-b p-2">Seek clinical assessment promptly</td>
                <td className="border-b p-2">CDC</td>
              </tr>
              <tr>
                <td className="border-b p-2 font-medium text-foreground">Cardiopulmonary phase</td>
                <td className="border-b p-2">Severe shortness of breath, chest tightness, hypotension, shock</td>
                <td className="border-b p-2">Emergency care immediately</td>
                <td className="border-b p-2">CDC · WHO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="contacts" className="space-y-3">
        <h2 className="text-xl font-semibold">What MV Hondius Contacts Should Do</h2>
        <h3 className="text-base font-medium">If Symptoms Appear During Monitoring</h3>
        <p className="text-sm text-muted-foreground">
          Contacts under monitoring should isolate immediately if they develop fever,
          gastrointestinal symptoms, or any respiratory symptoms, and contact their assigned
          public-health authority or clinician. Tell the assessor about your MV Hondius travel
          history.
        </p>
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
              MV Hondius outbreak tracker
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/cruise/mv-hondius">
              MV Hondius cruise case timeline
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/what-is-hantavirus">
              What is hantavirus
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/incubation">
              Hantavirus incubation period
            </Link>
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/hps">
              Hantavirus pulmonary syndrome
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
