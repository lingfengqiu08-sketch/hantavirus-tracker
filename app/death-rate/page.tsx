import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds, getTotalCases } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How Deadly Is Hantavirus? Mortality, Fatality, and Survival",
  description:
    "Hantavirus pulmonary syndrome has a case fatality rate around 38%. See MV Hondius deaths, survival factors, and how fatality differs by virus type and syndrome.",
  alternates: { canonical: canonical("/death-rate") },
  openGraph: {
    title: "How Deadly Is Hantavirus?",
    description:
      "HPS case fatality ~38%, MV Hondius death count, survival factors, and how rates differ by virus type and syndrome.",
    url: canonical("/death-rate"),
    type: "article",
  },
};

const faq = [
  {
    question: "How deadly is hantavirus pulmonary syndrome?",
    answer:
      "CDC states that HPS can be deadly and that 38% of people who develop respiratory symptoms may die from the disease.",
  },
  {
    question: "How many MV Hondius deaths have been reported?",
    answer:
      "The current tracker dataset reports 3 deaths linked to the MV Hondius cluster, using the latest official WHO and ECDC updates.",
  },
  {
    question: "Does every hantavirus have the same death rate?",
    answer:
      "No. Mortality differs by virus type, syndrome, access to care, severity, and how quickly supportive care begins.",
  },
  {
    question: "Can people survive hantavirus?",
    answer:
      "Yes. Survival is possible, especially with early recognition and supportive hospital care, but severe HPS is a medical emergency.",
  },
  {
    question: "Why do some sources show different fatality numbers?",
    answer:
      "Some numbers refer to HPS respiratory cases, while others refer to HFRS or specific hantavirus strains. Always compare the syndrome and virus type before comparing rates.",
  },
];

export default function DeathRatePage() {
  const data = getOutbreak();
  const totalCases = getTotalCases(data);
  const cfr = totalCases > 0 ? Math.round((data.deaths / totalCases) * 100) : 0;
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-who-speech-2026-05-12",
    "src-who-factsheet-2026-05-06",
    "src-ecdc-facts",
  ]);

  return (
    <MedicalReferencePage
      path="/death-rate"
      eyebrow="Risk explainer"
      title="How Deadly Is Hantavirus? Mortality, Fatality, and Survival"
      description={metadata.description as string}
      intro="About 38% of people who develop hantavirus pulmonary syndrome (HPS) respiratory symptoms die, according to CDC — but fatality varies widely by virus type, syndrome, and how quickly supportive care begins. This page gives the general HPS death rate and the current MV Hondius case fatality."
      quickAnswer={
        <p>
          General hantavirus pulmonary syndrome (HPS) has a case fatality rate of about{" "}
          <strong>38%</strong> (CDC). In the MV Hondius cluster, <strong>{data.deaths} deaths</strong>{" "}
          have been reported among <strong>{totalCases} cases</strong> (about {cfr}% as currently
          reported). Survival is possible — early supportive hospital care significantly improves the odds.
        </p>
      }
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "HPS fatality",
          value: "38%",
          description: "CDC figure for people who develop respiratory symptoms",
          tone: "red",
        },
        {
          label: "MV Hondius",
          value: `${data.deaths}`,
          description: "Deaths in the current tracker dataset",
          tone: "red",
        },
        {
          label: "Confirmed",
          value: `${data.confirmed}`,
          description: "Confirmed Andes virus infections in this cluster",
          tone: "amber",
        },
        {
          label: "Survival",
          value: "Possible",
          description: "Early supportive care improves chances",
          tone: "green",
        },
      ]}
      condition={{
        name: "Hantavirus pulmonary syndrome",
        alternateName: ["HPS", "Andes virus infection"],
        signOrSymptom: ["Cough", "Shortness of breath", "Chest tightness", "Shock"],
        possibleTreatment: "Supportive intensive care",
      }}
      sections={[
        {
          id: "cfr-table",
          title: "Hantavirus Death Rate by Virus and Syndrome",
          subtitle: "Reported Case Fatality Ranges",
          children: (
            <>
              <p>
                &quot;How deadly is hantavirus&quot; has no single answer — it depends on the virus
                and syndrome. The table below shows reported case fatality ranges. Always confirm
                against official sources before quoting a number.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="border-b p-2">Virus / syndrome</th>
                      <th className="border-b p-2">Reported case fatality</th>
                      <th className="border-b p-2">Region</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border-b p-2 font-medium text-foreground">HPS — Sin Nombre virus</td>
                      <td className="border-b p-2">~38%</td>
                      <td className="border-b p-2">North America</td>
                    </tr>
                    <tr>
                      <td className="border-b p-2 font-medium text-foreground">HPS — Andes virus</td>
                      <td className="border-b p-2">High; reported ~25-40%</td>
                      <td className="border-b p-2">South America</td>
                    </tr>
                    <tr>
                      <td className="border-b p-2 font-medium text-foreground">HFRS — Hantaan virus (severe)</td>
                      <td className="border-b p-2">~5-15%</td>
                      <td className="border-b p-2">East Asia</td>
                    </tr>
                    <tr>
                      <td className="border-b p-2 font-medium text-foreground">HFRS — Puumala virus (mild)</td>
                      <td className="border-b p-2">Below ~1%</td>
                      <td className="border-b p-2">Northern Europe</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The MV Hondius cluster involves <strong>Andes virus</strong>, the South American
                strain in the higher-fatality HPS group.
              </p>
            </>
          ),
        },
        {
          id: "mortality",
          title: "Why Hantavirus Fatality Numbers Differ",
          subtitle: "Compare Like With Like",
          children: (
            <>
              <p>
                Hantavirus is a virus family, not one identical illness. HPS in the Americas,
                HFRS in Europe and Asia, Andes virus, Sin Nombre virus, Seoul virus, and Puumala
                virus do not all have the same severity profile.
              </p>
              <p>
                A headline death rate should always specify the syndrome, case definition, country,
                and time period. For MV Hondius, the tracker separates current deaths from general
                HPS fatality statistics.
              </p>
            </>
          ),
        },
        {
          id: "mv-hondius",
          title: "MV Hondius Death Count",
          subtitle: "Current Outbreak Context",
          children: (
            <>
              <p>
                The current dataset reports {data.deaths} deaths, {data.confirmed} confirmed
                infections, {data.probable} probable cases, and {data.inconclusive} inconclusive
                case in the MV Hondius-linked cluster.
              </p>
              <p>
                That is a provisional case fatality ratio of about <strong>{cfr}%</strong>{" "}
                ({data.deaths} deaths ÷ {totalCases} reported cases). Outbreak fatality ratios change
                as more cases are confirmed or as patients recover, so this is provisional and not a
                final mortality rate.
              </p>
              <p>
                Because additional cases can appear during the monitoring window, this count should
                be checked against the latest WHO/ECDC/CDC updates before reuse.
              </p>
            </>
          ),
        },
        {
          id: "survival",
          title: "What Improves Survival",
          subtitle: "Speed and Supportive Care",
          children: (
            <>
              <p>
                Survival depends on how fast the illness is recognized and whether respiratory and
                circulatory support are available before severe complications advance.
              </p>
              <p>
                For an exposed person, the practical takeaway is simple: do not wait through
                worsening cough, shortness of breath, chest tightness, or rapid decline.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { href: "/hps", label: "Hantavirus pulmonary syndrome stages" },
        { href: "/treatment", label: "Treatment and supportive care" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
      ]}
    />
  );
}
