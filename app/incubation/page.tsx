import type { Metadata } from "next";
import { IncubationWindowCalculator } from "@/components/incubation-window-calculator";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Andes Hantavirus Incubation Period: 4-42 Days (MV Hondius)",
  description:
    "Andes hantavirus incubation period: 4-42 days after exposure, with an observed median near 18 days (range 7-39). Calculate your monitoring window and see when symptoms most likely start.",
  alternates: { canonical: canonical("/incubation") },
  openGraph: {
    title: "Andes Hantavirus Incubation Period: 4-42 Days",
    description:
      "Andes hantavirus incubation period is 4-42 days, observed median ~18 days (range 7-39, Vial 2006). Likely symptom-onset timing and the MV Hondius 42-day monitoring window.",
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
    question: "How soon do most people get hantavirus symptoms after exposure?",
    answer:
      "When symptoms appear, they most often start around 2 to 3 weeks after exposure. In a CDC Emerging Infectious Diseases study of Andes virus patients with a defined exposure window (Vial et al., 2006), the observed incubation period had a median of 18 days, with most cases between 7 and 39 days. The wider 4-42 day range is still used for contact monitoring.",
  },
  {
    question: "What is the median Andes virus incubation period?",
    answer:
      "About 18 days. A CDC study (Vial et al., 2006) found a median incubation of 18 days in Andes virus patients with a defined exposure, with a range of 7 to 39 days. A median is a typical value, not a deadline, so public-health teams still monitor the full 42 days.",
  },
  {
    question: "What is the exact Andes hantavirus incubation period range?",
    answer:
      "The exact range is 4 to 42 days after exposure for HPS due to Andes virus. The minimum reported is about 4 days and the maximum used for contact monitoring is 42 days.",
  },
  {
    question: "What is the minimum and maximum hantavirus incubation period?",
    answer:
      "For Andes virus, the minimum is about 4 days and the maximum is 42 days. For hantavirus pulmonary syndrome in general, CDC describes a wider 1 to 8 week range.",
  },
  {
    question: "Is the Andes virus incubation period up to 6 weeks?",
    answer:
      "Yes. 42 days is six weeks, which is the upper end of the 4 to 42 day window CDC describes for HPS due to Andes virus. General hantavirus HPS can extend to about 8 weeks.",
  },
  {
    question: "Do CDC and WHO use the same Andes virus incubation period?",
    answer:
      "This tracker follows the CDC-described 4 to 42 day window for HPS due to Andes virus and the WHO/ECDC 42-day monitoring guidance applied to MV Hondius contacts. Both point to a full 42-day monitoring window after last possible exposure.",
  },
  {
    question: "What is the average hantavirus incubation period for Andes virus?",
    answer:
      "Public-health sources give a 4 to 42 day range rather than a single average. Symptoms can appear at any point in that window, so the full 42 days is used for monitoring instead of an average.",
  },
  {
    question: "Is Andes virus contagious before symptoms appear during incubation?",
    answer:
      "This page does not estimate an infectious period. Andes virus is the hantavirus most associated with reported person-to-person spread, so exposed contacts should follow public-health isolation and testing instructions rather than assuming they are not infectious during incubation.",
  },
  {
    question: "What is the hantavirus incubation period for Andes virus?",
    answer:
      "For Andes virus, the incubation period used on this page is 4 to 42 days after exposure. That is why a full 42-day monitoring window matters after a known exposure.",
  },
  {
    question: "Is the Andes virus incubation period 4 to 42 days?",
    answer:
      "Yes. CDC lists signs and symptoms of HPS due to Andes virus as appearing 4 to 42 days after exposure.",
  },
  {
    question: "What is the general hantavirus HPS incubation period?",
    answer:
      "For HPS in general, CDC describes symptoms as usually starting 1 to 8 weeks after contact with an infected rodent.",
  },
  {
    question: "Is the Andes virus incubation period the same as the contagious period?",
    answer:
      "No. Incubation period means the time from exposure to symptoms. Andes virus is unusual because person-to-person spread has been reported, but this page does not estimate an infectious period; exposed contacts should follow public-health instructions.",
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
    question: "What is the hantavirus Andes strain incubation period?",
    answer:
      "For the Andes virus strain, this tracker uses the CDC-described 4 to 42 day symptom window after exposure.",
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
    "src-vial-2006-incubation",
    "src-who-don-2026-05-08",
    "src-ecdc-outbreak-2026-05-18",
  ]);

  return (
    <MedicalReferencePage
      path="/incubation"
      eyebrow="Incubation period · Quick answer"
      title="Andes Hantavirus Incubation Period: 4 to 42 Days After Exposure"
      description={metadata.description as string}
      intro={`The Andes hantavirus incubation period is 4 to 42 days after exposure, based on CDC's description of when hantavirus pulmonary syndrome (HPS) symptoms due to Andes virus appear. General hantavirus HPS symptoms usually start 1 to 8 weeks after infected-rodent contact. For MV Hondius contacts, public-health teams use a 42-day monitoring window from the last possible exposure on 10 May 2026, running through ${data.monitoringEndsAt}.`}
      quickAnswer={
        <p>
          The Andes hantavirus incubation period is{" "}
          <strong>4-42 days after exposure</strong>. In a CDC study of patients with a
          defined exposure window, the observed median was <strong>18 days</strong> (range
          7-39), so symptoms most often appear around{" "}
          <strong>2 to 3 weeks</strong>{" "}&mdash; but the full 42-day window is used for
          monitoring because later onset is still possible. General hantavirus pulmonary
          syndrome symptoms usually start{" "}
          <strong>1-8 weeks</strong> after infected rodent contact. MV Hondius monitoring
          runs through <strong>{data.monitoringEndsAt}</strong>.
        </p>
      }
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Andes virus",
          value: "4-42 days",
          description: "CDC monitoring range for HPS due to Andes virus",
          tone: "amber",
        },
        {
          label: "Median onset",
          value: "~18 days",
          description: "Observed median, range 7-39 days (Vial 2006, CDC EID)",
          tone: "green",
        },
        {
          label: "Most likely",
          value: "2-3 weeks",
          description: "When symptoms most often appear after exposure",
        },
        {
          label: "Window ends",
          value: data.monitoringEndsAt,
          description: "MV Hondius 42-day monitoring endpoint",
        },
      ]}
      condition={{
        name: "Andes virus infection",
        alternateName: ["Hantavirus pulmonary syndrome", "HPS"],
        signOrSymptom: ["Fever", "Fatigue", "Muscle aches", "Cough", "Shortness of breath"],
      }}
      sections={[
        {
          id: "calculator",
          title: "Hantavirus Incubation Period Calculator",
          subtitle: "Estimate the Andes Virus 4-42 Day Window",
          children: <IncubationWindowCalculator defaultExposureDate="2026-05-10" />,
        },
        {
          id: "onset-timing",
          title: "How Soon Do Symptoms Usually Start? Median ~18 Days",
          subtitle: "Monitoring Window vs Real-World Onset Timing",
          children: (
            <>
              <p>
                Most pages only quote the <strong>4-42 day</strong> monitoring range. That range is
                deliberately wide so contact tracing catches even the latest possible case. The
                real-world picture is more specific: in a CDC <em>Emerging Infectious Diseases</em>{" "}
                study of Andes virus patients with a defined exposure window (Vial et al., 2006), the
                observed incubation period had a <strong>median of 18 days</strong>, with most cases
                falling between <strong>7 and 39 days</strong>.
              </p>
              <p>
                In other words, when symptoms do appear, they most often show up around{" "}
                <strong>2 to 3 weeks after exposure</strong> &mdash; not on day 4, and rarely as late
                as day 42. The 42-day window is the safety margin, not the typical timing.
              </p>

              <div className="rounded-lg border bg-card p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Andes virus incubation timeline (days after exposure)
                </p>
                <div className="relative h-8">
                  <div className="absolute inset-y-3 left-0 right-0 rounded-full bg-muted" />
                  <div
                    className="absolute inset-y-3 rounded-full bg-amber-300/70 dark:bg-amber-500/40"
                    style={{ left: `${(7 / 42) * 100}%`, right: `${((42 - 39) / 42) * 100}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 flex flex-col items-center"
                    style={{ left: `${(18 / 42) * 100}%`, transform: "translateX(-50%)" }}
                  >
                    <span className="h-6 w-px bg-foreground" />
                    <span className="mt-1 whitespace-nowrap text-[11px] font-semibold text-foreground">
                      median 18d
                    </span>
                  </div>
                </div>
                <div className="mt-7 flex justify-between text-[11px] leading-tight text-muted-foreground">
                  <span>Day 4<br />earliest</span>
                  <span className="text-center">Days 7-39<br />most cases</span>
                  <span className="text-right">Day 42<br />window ends</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                A median is a typical value, not a deadline. Some cases appear earlier than 7 days or
                later than 39, which is exactly why public-health teams monitor the full 42 days after
                the last possible exposure instead of stopping at the median. Do not use a symptom-free
                day count to decide you are in the clear &mdash; follow your public-health team&apos;s
                instructions.
              </p>
            </>
          ),
        },
        {
          id: "examples",
          title: "MV Hondius Monitoring Examples",
          subtitle: "Same Rule, Different Exposure Dates",
          children: (
            <>
              <p>
                The exact monitoring window depends on the last possible exposure date assigned
                by public-health authorities. The table below shows how the Andes virus 4-42 day
                rule changes when the exposure date changes.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-md border p-3">
                  <h3 className="font-medium text-foreground">May 6, 2026</h3>
                  <p className="mt-1">
                    Possible symptom window: May 10 - June 17, 2026. This is useful for
                    understanding the Cabo Verde evacuation timing.
                  </p>
                </div>
                <div className="rounded-md border border-amber-300 bg-amber-50 p-3 dark:bg-amber-950/30">
                  <h3 className="font-medium text-foreground">May 10, 2026</h3>
                  <p className="mt-1">
                    Possible symptom window: May 14 - June 21, 2026. This is this tracker&apos;s
                    MV Hondius reference window.
                  </p>
                </div>
                <div className="rounded-md border p-3">
                  <h3 className="font-medium text-foreground">May 12, 2026</h3>
                  <p className="mt-1">
                    Possible symptom window: May 16 - June 23, 2026. Later contact dates extend
                    the monitoring endpoint.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: "andes-virus",
          title: "CDC Andes Virus Incubation Period",
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
          id: "contagious-period",
          title: "Incubation Period vs. Contagious Period",
          subtitle: "Two Different Public-Health Questions",
          children: (
            <>
              <p>
                The incubation period is the time from exposure to first symptoms. It is
                not the same as the contagious period or the period when another person
                might be exposed.
              </p>
              <p>
                Andes virus is the hantavirus type most associated with reported
                person-to-person spread, so exposed contacts should follow the monitoring,
                isolation, and testing instructions from their public-health team rather
                than using a symptom-free day count to decide they are clear.
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
