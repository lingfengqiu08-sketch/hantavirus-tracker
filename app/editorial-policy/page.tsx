import type { Metadata } from "next";
import Link from "next/link";
import { StaticInfoPage } from "@/components/static-info-page";
import { canonical } from "@/lib/seo";
import { getOutbreak } from "@/lib/outbreak";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "Editorial policy for Hantavirus Tracker, including source hierarchy, update rules, and how medical and outbreak claims are handled.",
  alternates: { canonical: canonical("/editorial-policy") },
  openGraph: {
    title: "Hantavirus Tracker Editorial Policy",
    description:
      "Source hierarchy, update rules, and correction standards for Hantavirus Tracker.",
    url: canonical("/editorial-policy"),
    type: "article",
  },
};

export default function EditorialPolicyPage() {
  const data = getOutbreak();

  return (
    <StaticInfoPage
      eyebrow="Editorial policy"
      title="Editorial Policy"
      description="This policy explains how Hantavirus Tracker chooses sources, updates outbreak counts, and separates medical context from official public-health reporting."
      updatedLabel={data.lastVerifiedAt.slice(0, 10)}
      sections={[
        {
          id: "source-hierarchy",
          title: "Source Hierarchy",
          children: (
            <>
              <p>
                For outbreak facts, official public-health updates come first: WHO, ECDC, CDC,
                national health agencies, and direct government communications.
              </p>
              <p>
                News reports are used only when they clarify publicly reported route details,
                logistics, or statements that are already consistent with official sources.
              </p>
            </>
          ),
        },
        {
          id: "counts",
          title: "Case Counts",
          children: (
            <p>
              When sources differ, the site uses the latest official source by publication date and
              labels case status clearly: confirmed, probable, inconclusive, suspected, or death.
              Historical timeline entries keep the wording and counts from the source available at
              that date.
            </p>
          ),
        },
        {
          id: "medical-content",
          title: "Medical Content",
          children: (
            <p>
              Symptom, transmission, treatment, and prevention pages summarize official clinical
              guidance from health agencies. They are written for public understanding and should
              not be used to diagnose or treat a person.
            </p>
          ),
        },
        {
          id: "corrections",
          title: "Corrections",
          children: (
            <p>
              Factual errors are corrected as soon as they are identified. See the{" "}
              <Link className="underline underline-offset-4" href="/corrections">
                corrections page
              </Link>{" "}
              for the current correction workflow.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/methodology", label: "Methodology" },
        { href: "/medical-disclaimer", label: "Medical disclaimer" },
        { href: "/about", label: "About" },
      ]}
    />
  );
}
