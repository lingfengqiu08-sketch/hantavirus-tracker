import type { Metadata } from "next";
import { StaticInfoPage } from "@/components/static-info-page";
import { canonical } from "@/lib/seo";
import { getOutbreak } from "@/lib/outbreak";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Hantavirus Tracker, including analytics, public-source content, and third-party services.",
  alternates: { canonical: canonical("/privacy") },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Privacy policy for Hantavirus Tracker, including analytics and third-party services.",
    url: canonical("/privacy"),
    type: "article",
  },
};

export default function PrivacyPage() {
  const data = getOutbreak();

  return (
    <StaticInfoPage
      eyebrow="Privacy"
      title="Privacy Policy"
      description="This policy explains the limited data collection used by Hantavirus Tracker."
      updatedLabel={data.lastVerifiedAt.slice(0, 10)}
      sections={[
        {
          id: "analytics",
          title: "Analytics",
          children: (
            <p>
              The site uses Google Analytics to understand aggregate traffic, page usage, devices,
              and referral sources. Analytics data is used to improve pages and monitor whether
              public outbreak information is discoverable.
            </p>
          ),
        },
        {
          id: "personal-data",
          title: "Personal Data",
          children: (
            <p>
              The site does not ask readers to create an account, submit medical information, or
              upload private files. Outbreak pages summarize public-source information only.
            </p>
          ),
        },
        {
          id: "third-parties",
          title: "Third-Party Services",
          children: (
            <p>
              The site is hosted on Vercel and uses Google Analytics. External source links point
              to public-health agencies and other source websites, which have their own policies.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/about", label: "About" },
        { href: "/editorial-policy", label: "Editorial policy" },
        { href: "/medical-disclaimer", label: "Medical disclaimer" },
      ]}
    />
  );
}
