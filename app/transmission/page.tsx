import type { Metadata } from "next";
import Link from "next/link";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { TransmissionRiskChecker } from "@/components/transmission-risk-checker";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Is Hantavirus Airborne or Contagious? Transmission Checker",
  description:
    "Hantavirus transmission checker: learn if a scenario fits airborne rodent dust, contagious person-to-person Andes virus risk, surfaces, or low-risk casual contact.",
  alternates: { canonical: canonical("/transmission") },
  openGraph: {
    title: "Is Hantavirus Airborne or Contagious? Transmission Checker",
    description:
      "Scenario-based guide to airborne rodent dust, rare Andes virus close-contact spread, surfaces, and MV Hondius monitoring context.",
    url: canonical("/transmission"),
    type: "article",
  },
};

const faq = [
  {
    question: "Is hantavirus contagious?",
    answer:
      "Most hantaviruses are not known to spread from person to person. Andes virus is the documented exception and can spread rarely after close, prolonged contact with a symptomatic person.",
  },
  {
    question: "Is hantavirus airborne?",
    answer:
      "People usually become infected by breathing particles from infected rodent urine, droppings, saliva, or nesting material. That is different from casual airborne spread like measles or flu.",
  },
  {
    question: "Does hantavirus spread through the air between people?",
    answer:
      "Routine casual airborne spread between people is not expected. In hantavirus guidance, airborne risk usually means inhaling dust contaminated by infected rodent urine, droppings, or saliva.",
  },
  {
    question: "Can Andes virus spread between people?",
    answer:
      "Yes, but this is usually limited to close contact with a symptomatic person, such as direct physical contact, enclosed prolonged exposure, or exposure to body fluids.",
  },
  {
    question: "Can you get hantavirus from another passenger?",
    answer:
      "For the MV Hondius cluster, public-health authorities are monitoring contacts because Andes virus can rarely spread between people after close, prolonged contact.",
  },
  {
    question: "Can hantavirus spread from surfaces?",
    answer:
      "CDC says Andes virus can spread by touching an object or surface with the virus on it and then touching the mouth, nose, or eyes.",
  },
  {
    question: "Is cleaning rodent droppings a transmission risk?",
    answer:
      "Yes. Dry sweeping or vacuuming can stir contaminated dust into the air. Follow official cleanup guidance instead of disturbing rodent waste dry.",
  },
  {
    question: "Does a casual same-room contact mean I was exposed?",
    answer:
      "Casual same-room contact alone is not the usual hantavirus exposure description. Risk interpretation changes if there was close Andes virus contact, body-fluid exposure, rodent contamination, or public-health monitoring instructions.",
  },
];

const transmissionRows = [
  {
    scenario: "Rodent droppings, urine, saliva, or nesting material",
    route: "Usual route",
    action: "Avoid disturbing dust; follow official cleanup guidance.",
  },
  {
    scenario: "Sweeping, vacuuming, or entering dusty closed rodent spaces",
    route: "Airborne rodent dust",
    action: "Treat as a possible exposure setting and monitor for symptoms.",
  },
  {
    scenario: "Close contact with symptomatic Andes virus case",
    route: "Rare person-to-person exception",
    action: "Follow public-health monitoring and report symptoms promptly.",
  },
  {
    scenario: "Casual same-room public contact only",
    route: "Not the usual route",
    action: "Does not match routine airborne spread unless other risk details exist.",
  },
  {
    scenario: "Touched contaminated surface then mouth, nose, or eyes",
    route: "Possible surface route",
    action: "Wash hands and ask public health if the exposure is under monitoring.",
  },
];

export default function TransmissionPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-factsheet-2026-05-06",
    "src-who-don-2026-05-08",
    "src-ecdc-outbreak-2026-05-18",
  ]);

  return (
    <MedicalReferencePage
      path="/transmission"
      eyebrow="Transmission guide"
      title="Is Hantavirus Airborne or Contagious? Transmission Checker"
      description={metadata.description as string}
      intro="Use this education-only checker to separate the common hantavirus route, airborne rodent dust, from the rare Andes virus person-to-person exception. The goal is to understand exposure context, not to self-diagnose or self-clear."
      quickAnswer={
        <p>
          Hantavirus is usually caught from <strong>rodent-contaminated dust</strong>,
          not casual person-to-person air. Most hantaviruses are not contagious between
          people. <strong>Andes virus is the exception</strong>: rare spread can happen
          after close, prolonged contact with a symptomatic person.
        </p>
      }
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Main route",
          value: "Rodents",
          description: "Urine, droppings, saliva, or contaminated dust",
        },
        {
          label: "Person spread",
          value: "Rare",
          description: "Documented for Andes virus after close contact",
          tone: "amber",
        },
        {
          label: "Monitoring",
          value: "42 days",
          description: `MV Hondius window runs through ${data.monitoringEndsAt}`,
          tone: "green",
        },
        {
          label: "Public risk",
          value: "Low",
          description: "WHO/ECDC/CDC assess low general-population risk",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        alternateName: ["Andes virus infection", "Hantavirus pulmonary syndrome"],
        transmissionMethod: [
          "Exposure to infected rodent urine, droppings, or saliva",
          "Touching contaminated surfaces then touching mouth, nose, or eyes",
          "Rare close contact with a symptomatic Andes virus patient",
        ],
      }}
      sections={[
        {
          id: "checker",
          title: "Hantavirus Transmission Checker",
          subtitle: "Airborne Dust, Contagious Contact, or Low-Risk Casual Contact?",
          children: <TransmissionRiskChecker />,
        },
        {
          id: "routes",
          title: "Transmission Routes: What Counts as Exposure?",
          subtitle: "Airborne Does Not Always Mean Person-to-Person",
          children: (
            <>
              <p>
                The word airborne causes confusion. In hantavirus guidance, it usually means
                inhaling contaminated rodent dust. It does not mean routine long-range spread
                between strangers.
              </p>
              <div className="space-y-2 sm:hidden">
                {transmissionRows.map((row) => (
                  <div key={row.scenario} className="rounded-md border p-3">
                    <p className="font-medium text-foreground">{row.scenario}</p>
                    <p className="mt-1">Route: {row.route}</p>
                    <p className="mt-1">{row.action}</p>
                  </div>
                ))}
              </div>
              <div className="hidden overflow-x-auto rounded-md border sm:block">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-muted/40 text-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Scenario</th>
                      <th className="px-3 py-2 font-medium">Route</th>
                      <th className="px-3 py-2 font-medium">What to do</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transmissionRows.map((row) => (
                      <tr key={row.scenario} className="border-b last:border-b-0">
                        <td className="px-3 py-2 font-medium text-foreground">{row.scenario}</td>
                        <td className="px-3 py-2">{row.route}</td>
                        <td className="px-3 py-2">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          id: "airborne",
          title: "Is Hantavirus Airborne?",
          subtitle: "Usually Yes for Rodent Dust, No for Casual Person-to-Person Air",
          children: (
            <>
              <p>
                Hantavirus can be airborne in the sense that contaminated rodent waste can dry,
                become dust, and be inhaled. This is why cleanup method matters: dry sweeping or
                vacuuming can make the route worse.
              </p>
              <p>
                That is different from casual airborne spread between people. If a page treats
                hantavirus like routine flu-style spread, it is probably collapsing two different
                meanings of airborne.
              </p>
            </>
          ),
        },
        {
          id: "contagious",
          title: "Is Hantavirus Contagious Between People?",
          subtitle: "Andes Virus Is the Exception",
          children: (
            <>
              <p>
                Most hantaviruses are not known for person-to-person spread. Andes virus is unusual:
                CDC describes rare spread through close contact with a sick person, including direct
                physical contact, prolonged enclosed exposure, or exposure to body fluids.
              </p>
              <p>
                This explains MV Hondius contact monitoring without implying broad casual public
                spread. The public risk can remain low while close contacts still need a 42-day
                monitoring plan.
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
                  text: "Estimate the 4-42 day Andes virus monitoring window.",
                },
                {
                  href: "/test",
                  label: "Testing",
                  text: "Compare PCR and serology timing questions.",
                },
                {
                  href: "/treatment",
                  label: "Treatment",
                  text: "Understand supportive care and when to seek help.",
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
        { href: "/incubation", label: "Andes virus incubation calculator" },
        { href: "/test", label: "Hantavirus PCR test timing checker" },
        { href: "/treatment", label: "Hantavirus treatment guide" },
        { href: "/what-is-hantavirus", label: "What is hantavirus?" },
        { href: "/andes-virus", label: "Andes virus: the person-to-person strain" },
        { href: "/prevention", label: "Hantavirus prevention steps" },
      ]}
    />
  );
}
