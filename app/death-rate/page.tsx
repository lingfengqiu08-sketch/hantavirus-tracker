import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds, getTotalCases } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How Deadly Is Hantavirus? Mortality, Fatality, and Survival",
  description:
    "Hantavirus death rate: CDC ~38%, WHO up to 50%, MV Hondius 23%. A 38% fatality rate also means about 62% survive. See why the three numbers differ and what improves survival.",
  alternates: { canonical: canonical("/death-rate") },
  openGraph: {
    title: "How Deadly Is Hantavirus?",
    description:
      "CDC ~38%, WHO up to 50%, MV Hondius 23% — why hantavirus death rates differ, and why a 38% fatality rate means about 62% survive.",
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
  {
    question: "What is the survival rate for hantavirus?",
    answer:
      "If the case fatality rate for HPS is about 38%, the survival rate is roughly 62% of diagnosed people. Survival improves with early recognition and intensive supportive care, and is higher for milder hantavirus types.",
  },
  {
    question: "Why does CDC say about 38% but WHO says up to 50%?",
    answer:
      "CDC's ~36-38% figure is for US hantavirus pulmonary syndrome (mainly Sin Nombre virus). WHO's up to 50% (commonly 20-40%) covers HCPS across the Americas, including Andes virus over many outbreaks. They measure different populations, so both can be correct.",
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
      intro="The hantavirus death rate depends on which number you mean: CDC reports about 36-38% case fatality for hantavirus pulmonary syndrome (HPS), WHO reports up to 50% (commonly 20-40%) for HCPS in the Americas, and the MV Hondius Andes virus cluster currently shows a provisional figure near 23%. A 38% fatality rate also means roughly 62% of diagnosed people survive. This page explains why the three numbers differ and what improves survival."
      quickAnswer={
        <p>
          Hantavirus pulmonary syndrome (HPS) case fatality is reported as{" "}
          <strong>~36-38% by CDC</strong> and <strong>up to 50% (commonly 20-40%) by WHO</strong>{" "}
          for the Americas. The MV Hondius Andes virus cluster currently shows{" "}
          <strong>{data.deaths} deaths among {totalCases} cases</strong> — a provisional{" "}
          <strong>~{cfr}%</strong>. Crucially, a 38% death rate also means about{" "}
          <strong>62% of diagnosed people survive</strong>, and early supportive hospital care
          improves those odds.
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
          value: "~62%",
          description: "Implied by a ~38% HPS case fatality rate",
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
          id: "three-numbers",
          title: "Why You See 38%, 50%, and 23% for Hantavirus",
          subtitle: "Three Different Numbers, Three Different Questions",
          children: (
            <>
              <p>
                If you search the hantavirus death rate you will find several numbers. They are not
                contradictions — they answer different questions.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="border-b p-2">Number</th>
                      <th className="border-b p-2">Source</th>
                      <th className="border-b p-2">What it actually measures</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border-b p-2 font-semibold text-foreground">~36-38%</td>
                      <td className="border-b p-2">CDC</td>
                      <td className="border-b p-2">US HPS (mainly Sin Nombre virus) among people who develop respiratory symptoms</td>
                    </tr>
                    <tr>
                      <td className="border-b p-2 font-semibold text-foreground">Up to 50% (commonly 20-40%)</td>
                      <td className="border-b p-2">WHO</td>
                      <td className="border-b p-2">HCPS across the Americas, including Andes virus, over many outbreaks</td>
                    </tr>
                    <tr>
                      <td className="border-b p-2 font-semibold text-foreground">~{cfr}%</td>
                      <td className="border-b p-2">This tracker</td>
                      <td className="border-b p-2">MV Hondius cluster only: {data.deaths} deaths ÷ {totalCases} reported cases, provisional and still changing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                So the &quot;right&quot; number depends on whether you mean US HPS (CDC), all-Americas
                HCPS (WHO), or this specific cruise-ship cluster (provisional).
              </p>
            </>
          ),
        },
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
          id: "cfr-vs-survival",
          title: "Death Rate vs Survival Rate",
          subtitle: "A 38% Death Rate Means About 62% Survive",
          children: (
            <>
              <p>
                Case fatality rate (CFR) and survival rate are two sides of the same statistic. If
                the CFR for HPS is about 38%, then roughly <strong>62% of diagnosed people
                survive</strong>. People searching &quot;how deadly is hantavirus&quot; often want
                the survival side of that number.
              </p>
              <p>
                Two cautions. First, CFR counts people sick enough to be diagnosed, so it does not
                describe mild or undetected infections. Second, survival is not fixed: it improves
                substantially with early recognition and intensive supportive care, and it varies by
                virus type — Andes and Sin Nombre HPS are more severe than mild HFRS.
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
