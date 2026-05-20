import type { Metadata } from "next";
import Link from "next/link";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { TestTimingChecker } from "@/components/test-timing-checker";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hantavirus PCR Test Timing Checker: When to Test",
  description:
    "Hantavirus PCR test timing checker: enter exposure and symptom dates, compare PCR vs IgM/IgG serology, and learn when to ask for medical testing.",
  alternates: { canonical: canonical("/test") },
  openGraph: {
    title: "Hantavirus PCR Test Timing Checker",
    description:
      "Education-only timing guidance for PCR, IgM/IgG serology, early negative results, and when to contact clinicians.",
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
      "Yes. CDC guidance says that if IgM and IgG antibody testing is negative from a specimen collected within 72 hours of symptom onset, a later specimen collected after 72 hours may be needed to rule out New World hantavirus infection.",
  },
  {
    question: "When should someone test after hantavirus exposure?",
    answer:
      "Testing is usually driven by symptoms, exposure history, and public-health instructions rather than exposure date alone. CDC advises clinicians to test people with compatible symptoms and rodent exposure, and Andes virus contacts are monitored for 42 days after last exposure.",
  },
  {
    question: "Is PCR better than antibody testing for hantavirus?",
    answer:
      "They answer different questions. PCR or rRT-PCR looks for viral RNA, while IgM and IgG serology look for immune response. CDC guidance notes Andes virus rRT-PCR sensitivity may be reduced later in illness, while early antibody results may require repeat testing.",
  },
  {
    question: "Should asymptomatic contacts be tested?",
    answer:
      "Testing decisions are made by public-health teams. An asymptomatic person should not use a single early negative test as self-clearance; follow the monitoring plan from the clinician or health department managing the exposure.",
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
    "src-cdc-andes-interim-guidance-2026-05-14",
    "src-cdc-andes",
    "src-ukhsa-cruise-2026-05-12",
  ]);

  return (
    <MedicalReferencePage
      path="/test"
      eyebrow="Testing timing guide"
      title="Hantavirus PCR Test Timing Checker: When to Test"
      description={metadata.description as string}
      intro="Use this education-only checker to compare a possible exposure date, a symptom onset date, and the testing windows clinicians may consider. Hantavirus testing should be interpreted by medical or public-health professionals, not used as a home rule-out tool."
      quickAnswer={
        <p>
          Hantavirus diagnosis can use <strong>PCR or rRT-PCR</strong> and{" "}
          <strong>IgM/IgG serology</strong>, but testing is usually coordinated by
          clinicians or public-health laboratories. A negative early result does not
          automatically end monitoring or rule out infection.
        </p>
      }
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Main question",
          value: "Timing",
          description: "Exposure date and symptom onset both matter",
        },
        {
          label: "Methods",
          value: "PCR + IgM/IgG",
          description: "RNA detection and antibody testing answer different questions",
          tone: "amber",
        },
        {
          label: "Early negative",
          value: "Repeat?",
          description: "Specimens within 72h of symptoms may need follow-up testing",
          tone: "amber",
        },
        {
          label: "Best route",
          value: "Clinician",
          description: "Ask a medical or public-health professional",
          tone: "green",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        alternateName: ["Andes virus infection", "HPS", "HFRS"],
      }}
      sections={[
        {
          id: "checker",
          title: "Hantavirus PCR Test Timing Checker",
          subtitle: "Enter Exposure and Symptom Dates",
          children: <TestTimingChecker defaultExposureDate="2026-05-10" />,
        },
        {
          id: "testing",
          title: "PCR vs Serology: What Each Test Tells You",
          subtitle: "Different Tests, Different Timing Limits",
          children: (
            <>
              <p>
                Hantavirus testing usually involves specialised laboratories. Clinicians and
                public-health teams decide whether PCR, rRT-PCR, IgM/IgG serology, repeat testing,
                or additional investigation is appropriate.
              </p>
              <div className="space-y-2 sm:hidden">
                {[
                  {
                    method: "PCR / rRT-PCR",
                    detects: "Viral RNA",
                    timing:
                      "Most time-sensitive. CDC notes Andes rRT-PCR sensitivity may be reduced later in illness.",
                  },
                  {
                    method: "IgM serology",
                    detects: "Recent immune response",
                    timing:
                      "Used for laboratory confirmation. If negative within 72h of symptoms, repeat testing may be needed.",
                  },
                  {
                    method: "IgG serology",
                    detects: "Antibody evidence",
                    timing:
                      "Helps interpret infection history with clinical and exposure context.",
                  },
                  {
                    method: "Exposure monitoring",
                    detects: "No infection by itself",
                    timing:
                      "For Andes virus contacts, public-health monitoring runs through the 42-day window.",
                  },
                ].map((row) => (
                  <div key={row.method} className="rounded-md border p-3">
                    <p className="font-medium text-foreground">{row.method}</p>
                    <p className="mt-1">Looks for: {row.detects}</p>
                    <p className="mt-1">{row.timing}</p>
                  </div>
                ))}
              </div>
              <div className="hidden overflow-x-auto rounded-md border sm:block">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-muted/40 text-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Method</th>
                      <th className="px-3 py-2 font-medium">Looks for</th>
                      <th className="px-3 py-2 font-medium">Timing note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-2 font-medium text-foreground">PCR / rRT-PCR</td>
                      <td className="px-3 py-2">Viral RNA</td>
                      <td className="px-3 py-2">
                        Time-sensitive. CDC notes Andes rRT-PCR sensitivity may be reduced later in illness.
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-3 py-2 font-medium text-foreground">IgM serology</td>
                      <td className="px-3 py-2">Recent immune response</td>
                      <td className="px-3 py-2">
                        Used for laboratory confirmation. If negative within 72h of symptom onset,
                        repeat testing after 72h may be needed.
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-3 py-2 font-medium text-foreground">IgG serology</td>
                      <td className="px-3 py-2">Antibody evidence</td>
                      <td className="px-3 py-2">
                        Helps interpret infection history with clinical and exposure context.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-foreground">Exposure monitoring</td>
                      <td className="px-3 py-2">No infection by itself</td>
                      <td className="px-3 py-2">
                        For Andes virus contacts, public-health monitoring runs through the 42-day window.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          id: "early",
          title: "Early Negative Test: What It Means",
          subtitle: "Do Not Use It as Self-Clearance",
          children: (
            <>
              <p>
                A negative result early in illness can be hard to interpret. CDC guidance says that
                if IgM and IgG antibody tests are negative from a specimen collected within 72 hours
                of symptom onset, a second specimen collected after 72 hours may be needed to rule
                out New World hantavirus infection.
              </p>
              <p>
                This is why exposed contacts may still need symptom monitoring even after an initial
                negative test. Testing decisions should stay with the clinician or public-health team
                managing the exposure.
              </p>
            </>
          ),
        },
        {
          id: "timeline",
          title: "When to Test After Exposure",
          subtitle: "Exposure First, Symptoms Next, Testing Through Official Channels",
          children: (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border p-3">
                <h3 className="font-medium text-foreground">Day 0 after exposure</h3>
                <p className="mt-1">
                  Record the last possible exposure date. For MV Hondius contacts, this sets the
                  42-day monitoring window used by public-health teams.
                </p>
              </div>
              <div className="rounded-md border p-3">
                <h3 className="font-medium text-foreground">Days 4-42</h3>
                <p className="mt-1">
                  CDC lists 4-42 days as the Andes virus symptom timing window. Fever,
                  gastrointestinal symptoms, cough, or breathing changes should trigger medical or
                  public-health contact.
                </p>
              </div>
              <div className="rounded-md border p-3">
                <h3 className="font-medium text-foreground">First 72h of symptoms</h3>
                <p className="mt-1">
                  Early serology can be incomplete. A negative IgM/IgG result from this period may
                  need a later specimen after 72 hours.
                </p>
              </div>
              <div className="rounded-md border p-3">
                <h3 className="font-medium text-foreground">Later in illness</h3>
                <p className="mt-1">
                  Andes rRT-PCR sensitivity may be reduced later in illness. Serology, repeat
                  testing, and clinical context become important for interpretation.
                </p>
              </div>
            </div>
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
        {
          id: "workflow",
          title: "Exposure to Care Workflow",
          subtitle: "Use the Right Page for the Right Question",
          children: (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/incubation",
                  label: "Incubation",
                  text: "Estimate the Andes virus 4-42 day monitoring window.",
                },
                {
                  href: "/symptoms",
                  label: "Symptoms",
                  text: "Check early symptoms and respiratory warning signs.",
                },
                {
                  href: "/transmission",
                  label: "Transmission",
                  text: "Separate rodent dust exposure from Andes close-contact risk.",
                },
                {
                  href: "/treatment",
                  label: "Treatment",
                  text: "Understand supportive care and when to seek medical help.",
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
        { href: "/incubation", label: "Exposure to incubation window calculator" },
        { href: "/symptoms", label: "Symptoms to report during monitoring" },
        { href: "/transmission", label: "How hantavirus spreads" },
        { href: "/treatment", label: "Treatment and supportive care" },
      ]}
    />
  );
}
