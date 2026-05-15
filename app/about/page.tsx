import type { Metadata } from "next";
import Link from "next/link";
import { StaticInfoPage } from "@/components/static-info-page";
import { SITE_NAME, canonical } from "@/lib/seo";
import { getOutbreak } from "@/lib/outbreak";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Hantavirus Tracker, an independent public-source tracker for the MV Hondius Andes virus outbreak and hantavirus reference pages.",
  alternates: { canonical: canonical("/about") },
  openGraph: {
    title: "About Hantavirus Tracker",
    description:
      "Independent public-source tracker for the MV Hondius Andes virus outbreak and hantavirus reference pages.",
    url: canonical("/about"),
    type: "website",
  },
};

export default function AboutPage() {
  const data = getOutbreak();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${canonical("/")}#organization`,
    name: SITE_NAME,
    url: canonical("/"),
    publishingPrinciples: canonical("/editorial-policy"),
    correctionsPolicy: canonical("/corrections"),
    ethicsPolicy: canonical("/medical-disclaimer"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StaticInfoPage
        eyebrow="About"
        title="About Hantavirus Tracker"
        description="Hantavirus Tracker is an independent public-source site focused on the 2026 MV Hondius Andes virus outbreak and plain-language hantavirus explainers."
        updatedLabel={data.lastVerifiedAt.slice(0, 10)}
        sections={[
          {
            id: "mission",
            title: "What This Site Does",
            children: (
              <>
                <p>
                  The site keeps a compact outbreak dataset, route summary, timeline, and reference
                  pages that point back to public updates from WHO, ECDC, CDC, UKHSA, and other
                  relevant public-health bodies.
                </p>
                <p>
                  It is designed for readers who need a quick, source-linked overview. It is not
                  a replacement for official public-health guidance, clinical diagnosis, or local
                  emergency services.
                </p>
              </>
            ),
          },
          {
            id: "ownership",
            title: "Independence",
            children: (
              <>
                <p>
                  Hantavirus Tracker is not operated by WHO, ECDC, CDC, UKHSA, Oceanwide
                  Expeditions, or the MV Hondius operator.
                </p>
                <p>
                  Source choice, summaries, corrections, and page updates follow the{" "}
                  <Link className="underline underline-offset-4" href="/editorial-policy">
                    editorial policy
                  </Link>
                  .
                </p>
              </>
            ),
          },
          {
            id: "updates",
            title: "Update Cadence",
            children: (
              <p>
                During active outbreak monitoring, the dataset is checked manually against official
                sources. The latest verification date is displayed on the homepage and outbreak
                pages.
              </p>
            ),
          },
        ]}
        related={[
          { href: "/methodology", label: "Methodology" },
          { href: "/editorial-policy", label: "Editorial policy" },
          { href: "/corrections", label: "Corrections" },
        ]}
      />
    </>
  );
}
