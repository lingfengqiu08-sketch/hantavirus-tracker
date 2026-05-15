import type { Metadata } from "next";
import Link from "next/link";
import { StaticInfoPage } from "@/components/static-info-page";
import { canonical } from "@/lib/seo";
import { getOutbreak } from "@/lib/outbreak";

export const metadata: Metadata = {
  title: "Corrections",
  description:
    "Corrections policy for Hantavirus Tracker, including how factual errors, source changes, and outbreak count updates are handled.",
  alternates: { canonical: canonical("/corrections") },
  openGraph: {
    title: "Corrections Policy",
    description:
      "How Hantavirus Tracker handles factual errors, source changes, and outbreak count updates.",
    url: canonical("/corrections"),
    type: "article",
  },
};

export default function CorrectionsPage() {
  const data = getOutbreak();

  return (
    <StaticInfoPage
      eyebrow="Corrections"
      title="Corrections"
      description="This page explains how Hantavirus Tracker corrects factual errors and handles changing public-health reports."
      updatedLabel={data.lastVerifiedAt.slice(0, 10)}
      sections={[
        {
          id: "what-we-correct",
          title: "What Gets Corrected",
          children: (
            <p>
              The site corrects wrong case counts, misclassified case status, broken source links,
              route errors, publication-date mistakes, and medical statements that no longer match
              official guidance.
            </p>
          ),
        },
        {
          id: "count-changes",
          title: "Changing Outbreak Counts",
          children: (
            <p>
              Outbreak counts can change as cases are confirmed, ruled out, reclassified, or added.
              The current dataset shows the latest official status split, while the timeline keeps
              historical source wording where useful.
            </p>
          ),
        },
        {
          id: "report",
          title: "Report a Correction",
          children: (
            <p>
              To report an issue, include the page URL, the exact sentence or number, and the
              official source that supports the correction. Start with the{" "}
              <Link className="underline underline-offset-4" href="/methodology">
                methodology page
              </Link>{" "}
              to see the current source hierarchy.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/editorial-policy", label: "Editorial policy" },
        { href: "/methodology", label: "Methodology" },
        { href: "/about", label: "About" },
      ]}
    />
  );
}
