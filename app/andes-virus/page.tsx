import type { Metadata } from "next";
import Link from "next/link";
import { AndesExposureChecker } from "@/components/andes-exposure-checker";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Andes Virus: Person-to-Person Spread, Symptoms & Reservoir",
  description:
    "Andes virus is the only hantavirus that spreads person to person. Symptoms, 4-42 day incubation, reservoir rodents, transmission, and MV Hondius relevance.",
  alternates: { canonical: canonical("/andes-virus") },
  openGraph: {
    title: "Andes Virus: Person-to-Person Spread, Symptoms & Reservoir",
    description:
      "The only hantavirus that spreads person to person: symptoms, incubation, reservoir rodents, transmission, and MV Hondius relevance.",
    url: canonical("/andes-virus"),
    type: "article",
  },
};

const faq = [
  {
    question: "What is Andes virus?",
    answer:
      "Andes virus is a hantavirus found in South America that can cause hantavirus pulmonary syndrome.",
  },
  {
    question: "Can Andes virus spread between people?",
    answer:
      "Yes, rarely. CDC says Andes virus is the only hantavirus known to spread person to person, usually after close contact with a sick person.",
  },
  {
    question: "What contact counts as higher concern for Andes virus?",
    answer:
      "Close, prolonged contact with a symptomatic person, direct physical contact, or body-fluid exposure is more relevant than casual same-room contact.",
  },
  {
    question: "Where is Andes virus found?",
    answer:
      "CDC describes Andes virus as a South American hantavirus. UKHSA says the associated South American rodents are not found in the UK.",
  },
  {
    question: "What is the Andes virus incubation period?",
    answer:
      "CDC lists signs and symptoms of HPS due to Andes virus as appearing 4 to 42 days after exposure.",
  },
  {
    question: "Why does Andes virus matter for MV Hondius?",
    answer:
      "WHO reported confirmed cases as Andes virus, which explains the 42-day contact monitoring and isolation approach.",
  },
];

export default function AndesVirusPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-andes",
    "src-who-don-2026-05-08",
    "src-ecdc-outbreak-2026-05-18",
    "src-ukhsa-cruise-2026-05-12",
  ]);

  return (
    <MedicalReferencePage
      path="/andes-virus"
      eyebrow="Virus strain guide"
      title="Andes Virus: Person-to-Person Spread, Symptoms & Reservoir"
      description={metadata.description as string}
      intro="Andes virus is the reason the MV Hondius outbreak needs close-contact monitoring. Use this education-only page to separate rare person-to-person spread from routine rodent exposure and casual public contact."
      quickAnswer={
        <p>
          <strong>Andes virus can rarely spread person to person</strong>, but the
          scenario of concern is close contact with a symptomatic person, direct
          physical contact, body-fluid exposure, or public-health monitoring
          instructions. Casual same-room contact alone is not the usual risk pattern.
        </p>
      }
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Region",
          value: "South America",
          description: "CDC describes Andes virus as South American",
        },
        {
          label: "Spread",
          value: "Rare P2P",
          description: "Close contact with a sick person",
          tone: "amber",
        },
        {
          label: "Timing",
          value: "4-42 days",
          description: "CDC symptom window",
        },
        {
          label: "MV Hondius",
          value: "Confirmed",
          description: "WHO identified the cluster as Andes virus",
          tone: "red",
        },
      ]}
      condition={{
        name: "Andes virus infection",
        alternateName: ["Andes hantavirus", "Hantavirus pulmonary syndrome"],
        signOrSymptom: [
          "Fatigue",
          "Fever",
          "Muscle aches",
          "Cough",
          "Shortness of breath",
        ],
        transmissionMethod: [
          "Contact with infected rodents or their waste",
          "Touching contaminated surfaces",
          "Rare close contact with a symptomatic person",
        ],
      }}
      sections={[
        {
          id: "checker",
          title: "Andes Virus Exposure Checker",
          subtitle: "Close Contact, Rodent Exposure, or Casual Contact?",
          children: <AndesExposureChecker defaultExposureDate="2026-05-10" />,
        },
        {
          id: "definition",
          title: "What Makes Andes Virus Different?",
          subtitle: "The Hantavirus Person-to-Person Exception",
          children: (
            <>
              <p>
                Andes virus can cause HPS, a severe respiratory disease. Its unusual feature is
                documented limited spread between people after close contact with a symptomatic
                person.
              </p>
              <p>
                That difference changes public-health operations: contact tracing, isolation, and
                monitoring are more important than they would be for most hantaviruses.
              </p>
              <div className="space-y-2 sm:hidden">
                {[
                  {
                    scenario: "Close contact with symptomatic Andes virus case",
                    meaning: "Higher concern",
                    action: "Follow monitoring and testing instructions.",
                  },
                  {
                    scenario: "Rodent-contaminated dust or waste",
                    meaning: "Usual hantavirus route",
                    action: "Use prevention and cleanup guidance.",
                  },
                  {
                    scenario: "Casual same-room or public-space contact",
                    meaning: "Lower context alone",
                    action: "Check for other risk details or official instructions.",
                  },
                ].map((row) => (
                  <div key={row.scenario} className="rounded-md border p-3">
                    <p className="font-medium text-foreground">{row.scenario}</p>
                    <p className="mt-1">Meaning: {row.meaning}</p>
                    <p className="mt-1">{row.action}</p>
                  </div>
                ))}
              </div>
              <div className="hidden overflow-x-auto rounded-md border sm:block">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-muted/40 text-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Scenario</th>
                      <th className="px-3 py-2 font-medium">Meaning</th>
                      <th className="px-3 py-2 font-medium">What to do</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-2 font-medium text-foreground">
                        Close contact with symptomatic Andes virus case
                      </td>
                      <td className="px-3 py-2">Higher concern</td>
                      <td className="px-3 py-2">
                        Follow monitoring and testing instructions.
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-3 py-2 font-medium text-foreground">
                        Rodent-contaminated dust or waste
                      </td>
                      <td className="px-3 py-2">Usual hantavirus route</td>
                      <td className="px-3 py-2">Use prevention and cleanup guidance.</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-foreground">
                        Casual same-room or public-space contact
                      </td>
                      <td className="px-3 py-2">Lower context alone</td>
                      <td className="px-3 py-2">
                        Check for other risk details or official instructions.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          id: "reservoir",
          title: "Andes Virus Reservoir: Which Rodents Carry It",
          subtitle: "The Long-Tailed Pygmy Rice Rat",
          children: (
            <>
              <p>
                The primary natural reservoir of Andes virus is the long-tailed pygmy rice rat
                (Oligoryzomys longicaudatus), a wild rodent of southern South America — chiefly
                Argentina and Chile. People are usually infected by inhaling virus from infected
                rodent urine, droppings, or saliva.
              </p>
              <p>
                This differs from North American hantavirus, where the deer mouse (Peromyscus
                maniculatus) carries Sin Nombre virus. UKHSA has noted that the South American
                rodents linked to Andes virus are not found in the UK, which is part of why the
                general-population risk outside the cluster is low.
              </p>
            </>
          ),
        },
        {
          id: "vs-sin-nombre",
          title: "Andes Virus vs Sin Nombre Virus",
          subtitle: "Two New World Hantaviruses Compared",
          children: (
            <>
              <p>
                Andes virus and Sin Nombre virus both cause hantavirus pulmonary syndrome (HPS),
                but they differ in important ways.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="border-b p-2">Feature</th>
                      <th className="border-b p-2">Andes virus</th>
                      <th className="border-b p-2">Sin Nombre virus</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border-b p-2 font-medium text-foreground">Region</td>
                      <td className="border-b p-2">Southern South America</td>
                      <td className="border-b p-2">North America</td>
                    </tr>
                    <tr>
                      <td className="border-b p-2 font-medium text-foreground">Reservoir rodent</td>
                      <td className="border-b p-2">Long-tailed pygmy rice rat</td>
                      <td className="border-b p-2">Deer mouse</td>
                    </tr>
                    <tr>
                      <td className="border-b p-2 font-medium text-foreground">Person-to-person spread</td>
                      <td className="border-b p-2">Documented (rare)</td>
                      <td className="border-b p-2">Not documented</td>
                    </tr>
                    <tr>
                      <td className="border-b p-2 font-medium text-foreground">Syndrome</td>
                      <td className="border-b p-2">HPS / HCPS</td>
                      <td className="border-b p-2">HPS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The person-to-person row is the key distinction: Andes virus is the only hantavirus
                with documented human-to-human transmission, which is why the MV Hondius cluster is
                monitored so closely.
              </p>
            </>
          ),
        },
        {
          id: "mv-hondius",
          title: "MV Hondius Relevance",
          subtitle: "Why Contacts Are Monitored",
          children: (
            <>
              <p>
                WHO reported that confirmed MV Hondius cases were identified as Andes virus. The
                tracker currently records {data.confirmed} confirmed cases, {data.probable} probable
                cases, {data.inconclusive} inconclusive case, and {data.deaths} deaths.
              </p>
              <p>
                Because symptoms can appear up to 42 days after exposure, contacts are monitored
                through {data.monitoringEndsAt} in this dataset.
              </p>
            </>
          ),
        },
        {
          id: "incubation",
          title: "Andes Virus Incubation and Monitoring Window",
          subtitle: "Why 42 Days Matters",
          children: (
            <>
              <p>
                CDC lists signs and symptoms of HPS due to Andes virus as appearing 4 to 42 days
                after exposure. That is why MV Hondius contacts can remain under monitoring even
                when they feel well at first.
              </p>
              <p>
                If symptoms appear during that window, the practical next step is not to use this
                page for self-triage. Contact the clinician or public-health authority managing
                the exposure.
              </p>
            </>
          ),
        },
        {
          id: "workflow",
          title: "Exposure to Care Workflow",
          subtitle: "Move From Exposure Question to the Right Next Page",
          children: (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/transmission",
                  label: "Transmission",
                  text: "Compare rodent dust, surface, and close-contact routes.",
                },
                {
                  href: "/incubation",
                  label: "Incubation",
                  text: "Calculate the 4-42 day Andes virus monitoring window.",
                },
                {
                  href: "/test",
                  label: "Testing",
                  text: "Understand PCR and serology timing limits.",
                },
                {
                  href: "/prevention",
                  label: "Prevention",
                  text: "Reduce rodent exposure and close-contact risk.",
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
        { href: "/transmission", label: "Is hantavirus airborne or contagious?" },
        { href: "/incubation", label: "Andes virus incubation calculator" },
        { href: "/test", label: "Hantavirus PCR test timing checker" },
        { href: "/prevention", label: "Hantavirus prevention steps" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak details" },
      ]}
    />
  );
}
