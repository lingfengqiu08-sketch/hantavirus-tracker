import type { Metadata } from "next";
import Link from "next/link";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { TreatmentCareChecker } from "@/components/treatment-care-checker";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus Treatment: Supportive Care & When to Get Help",
  description:
    "Hantavirus treatment guide: what supportive care can help, when ICU or ECMO support may be used, and when exposed contacts should seek medical advice.",
  alternates: { canonical: canonical("/treatment") },
  openGraph: {
    title: "Hantavirus Treatment: Supportive Care & When to Get Help",
    description:
      "Education-only care pathway for supportive treatment, ICU care, warning signs, cure claims, and when to seek help after exposure.",
    url: canonical("/treatment"),
    type: "article",
  },
};

const faq = [
  {
    question: "Is there a hantavirus treatment or cure?",
    answer:
      "There is no specific cure for hantavirus infection. Treatment is supportive and focuses on breathing, circulation, hydration, and complications while medical teams monitor the illness.",
  },
  {
    question: "What is supportive care for hantavirus?",
    answer:
      "Supportive care can include oxygen, ventilatory support, careful fluids, blood-pressure support, fever control, and intensive monitoring when illness is severe.",
  },
  {
    question: "Can early treatment improve the outcome?",
    answer:
      "Early recognition and hospital evaluation can help clinicians support breathing and circulation before severe respiratory failure or shock progresses. It is not a guaranteed cure.",
  },
  {
    question: "Is there a vaccine or antiviral for Andes virus?",
    answer:
      "CDC states there is no specific antiviral treatment or vaccine currently available for Andes virus. Follow official public-health guidance for the country managing the exposure.",
  },
  {
    question: "When should someone seek emergency care?",
    answer:
      "Seek urgent medical care for shortness of breath, chest tightness, blue lips, fainting, confusion, severe weakness, or rapidly worsening symptoms, especially after possible rodent or Andes virus exposure.",
  },
  {
    question: "Can ECMO treat hantavirus?",
    answer:
      "ECMO is an advanced ICU support option that may be considered for selected severe cardiopulmonary failure cases. It is not a cure, is not available everywhere, and must be decided by specialists.",
  },
  {
    question: "Do antibiotics treat hantavirus?",
    answer:
      "Antibiotics do not treat viruses. Clinicians may use them only if another bacterial infection is suspected.",
  },
  {
    question: "What should I tell a doctor after possible exposure?",
    answer:
      "Mention rodent exposure, South America travel, MV Hondius contact, contact with a known case, symptom onset date, breathing symptoms, and any monitoring instructions already received.",
  },
];

const treatmentRows = [
  {
    option: "Specific cure",
    role: "No proven cure",
    note: "Avoid pages promising a quick cure, supplement, or home remedy.",
  },
  {
    option: "Supportive hospital care",
    role: "Main treatment model",
    note: "Oxygen, ventilatory support, fluids, blood-pressure support, and monitoring.",
  },
  {
    option: "ICU care",
    role: "For severe HPS",
    note: "Used when breathing or circulation becomes unstable.",
  },
  {
    option: "ECMO",
    role: "Specialist rescue support",
    note: "May be considered for selected severe cardiopulmonary failure cases.",
  },
  {
    option: "Vaccine or antiviral",
    role: "No routine Andes option",
    note: "CDC lists no current Andes virus vaccine or specific antiviral treatment.",
  },
  {
    option: "Antibiotics",
    role: "Not antiviral treatment",
    note: "May be used only when clinicians suspect another bacterial infection.",
  },
];

export default function TreatmentPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-clinical-overview",
    "src-cdc-andes",
    "src-cdc-andes-interim-guidance-2026-05-14",
    "src-who-factsheet-2026-05-06",
    "src-ecdc-facts",
  ]);

  return (
    <MedicalReferencePage
      path="/treatment"
      eyebrow="Treatment guide"
      title="Hantavirus Treatment Guide: Cure, ICU Care, and When to Seek Help"
      description={metadata.description as string}
      intro="Hantavirus treatment is not a home cure question. The practical goal is early recognition, fast clinical contact after a credible exposure, and supportive hospital care before respiratory failure or shock progresses."
      quickAnswer={
        <p>
          There is <strong>no specific hantavirus cure</strong>. Treatment is
          supportive: oxygen, ventilation, careful fluids, blood-pressure support,
          intensive monitoring, and specialist ICU support when illness becomes severe.
          Do not wait for breathing symptoms to become severe before seeking care.
        </p>
      }
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Proven cure",
          value: "No",
          description: "No specific cure for hantavirus infection",
          tone: "red",
        },
        {
          label: "Main care",
          value: "Supportive",
          description: "Oxygen, ventilation, fluids, and circulation support",
          tone: "green",
        },
        {
          label: "Severe HPS",
          value: "ICU",
          description: "Advanced respiratory and circulatory support may be needed",
          tone: "amber",
        },
        {
          label: "Best next step",
          value: "Call early",
          description: "Tell clinicians about rodent, Andes, or MV Hondius exposure",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        alternateName: ["Hantavirus pulmonary syndrome", "Andes virus infection"],
        possibleTreatment: "Supportive care, including respiratory and circulatory support",
      }}
      sections={[
        {
          id: "care-checker",
          title: "Hantavirus Treatment Care Pathway Checker",
          subtitle: "Education-Only Guidance for When to Seek Help",
          children: <TreatmentCareChecker />,
        },
        {
          id: "treatment-options",
          title: "Hantavirus Treatment Options: What Helps and What Does Not",
          subtitle: "Cure Claims vs Supportive Care",
          children: (
            <>
              <p>
                Hantavirus care is supportive, not a single medicine that clears the infection.
                The table below separates useful medical support from claims that should not be
                treated as a cure.
              </p>
              <div className="space-y-2 sm:hidden">
                {treatmentRows.map((row) => (
                  <div key={row.option} className="rounded-md border p-3">
                    <p className="font-medium text-foreground">{row.option}</p>
                    <p className="mt-1">Role: {row.role}</p>
                    <p className="mt-1">{row.note}</p>
                  </div>
                ))}
              </div>
              <div className="hidden overflow-x-auto rounded-md border sm:block">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-muted/40 text-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Option</th>
                      <th className="px-3 py-2 font-medium">Role</th>
                      <th className="px-3 py-2 font-medium">What it means</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatmentRows.map((row) => (
                      <tr key={row.option} className="border-b last:border-b-0">
                        <td className="px-3 py-2 font-medium text-foreground">{row.option}</td>
                        <td className="px-3 py-2">{row.role}</td>
                        <td className="px-3 py-2">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          id: "early-care",
          title: "Why Early Medical Care Matters",
          subtitle: "Support Breathing and Circulation Before Severe Decline",
          children: (
            <>
              <p>
                Severe hantavirus pulmonary syndrome can worsen quickly once respiratory symptoms
                appear. Early clinical evaluation gives medical teams time to monitor oxygen levels,
                fluid balance, and blood pressure before the illness becomes harder to support.
              </p>
              <p>
                Early care does not mean a guaranteed cure. It means the right people know the
                exposure history, the symptom timeline, and whether public-health testing or hospital
                observation is needed.
              </p>
            </>
          ),
        },
        {
          id: "when-to-seek-care",
          title: "When to Seek Care",
          subtitle: "Do Not Wait for Respiratory Failure",
          children: (
            <>
              <p>
                Known exposed contacts should seek clinical advice as soon as fever,
                gastrointestinal symptoms, cough, shortness of breath, chest tightness, fainting,
                confusion, or severe weakness appears.
              </p>
              <p>
                The exposure history matters. Tell the clinician about rodent exposure, South
                America travel, MV Hondius contact, or possible Andes virus contact.
              </p>
            </>
          ),
        },
        {
          id: "workflow",
          title: "Exposure to Treatment Workflow",
          subtitle: "Use the Right Page for the Right Question",
          children: (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/incubation",
                  label: "Incubation",
                  text: "Estimate the 4-42 day Andes virus monitoring window.",
                },
                {
                  href: "/symptoms",
                  label: "Symptoms",
                  text: "Check early symptoms and respiratory warning signs.",
                },
                {
                  href: "/test",
                  label: "Testing",
                  text: "Compare PCR and serology timing questions.",
                },
                {
                  href: "/hps",
                  label: "HPS",
                  text: "Understand severe respiratory and circulatory illness.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border bg-card p-3 hover:bg-muted/40"
                >
                  <h3 className="font-medium text-foreground">{item.label}</h3>
                  <p className="mt-1">{item.text}</p>
                </Link>
              ))}
            </div>
          ),
        },
      ]}
      related={[
        { href: "/test", label: "Hantavirus PCR test timing checker" },
        { href: "/incubation", label: "Andes virus incubation calculator" },
        { href: "/symptoms", label: "Hantavirus symptoms and warning signs" },
        { href: "/hps", label: "Hantavirus pulmonary syndrome stages" },
        { href: "/death-rate", label: "Hantavirus mortality and survival" },
      ]}
    />
  );
}
