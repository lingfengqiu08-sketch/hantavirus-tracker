import type { Metadata } from "next";
import { StaticInfoPage } from "@/components/static-info-page";
import { canonical } from "@/lib/seo";
import { getOutbreak } from "@/lib/outbreak";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description:
    "Medical disclaimer for Hantavirus Tracker. The site is informational and is not medical advice, diagnosis, treatment, or emergency guidance.",
  alternates: { canonical: canonical("/medical-disclaimer") },
  openGraph: {
    title: "Medical Disclaimer",
    description:
      "Hantavirus Tracker is informational and is not medical advice, diagnosis, treatment, or emergency guidance.",
    url: canonical("/medical-disclaimer"),
    type: "article",
  },
};

export default function MedicalDisclaimerPage() {
  const data = getOutbreak();

  return (
    <StaticInfoPage
      eyebrow="Medical disclaimer"
      title="Medical Disclaimer"
      description="Hantavirus Tracker provides public-source information. It does not provide medical advice, diagnosis, treatment, or emergency instructions."
      updatedLabel={data.lastVerifiedAt.slice(0, 10)}
      sections={[
        {
          id: "not-advice",
          title: "Not Medical Advice",
          children: (
            <p>
              Pages on this site are informational summaries of public sources. They do not replace
              a clinician, local health authority, public-health instructions, or emergency care.
            </p>
          ),
        },
        {
          id: "emergency",
          title: "Emergency Symptoms",
          children: (
            <p>
              If someone has severe shortness of breath, chest tightness, fainting, shock symptoms,
              rapidly worsening illness, or another emergency, contact local emergency services.
            </p>
          ),
        },
        {
          id: "exposure",
          title: "Exposure and Monitoring",
          children: (
            <p>
              People with possible exposure should follow instructions from their local health
              authority, occupational health team, cruise operator, or treating clinician.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/symptoms", label: "Symptoms" },
        { href: "/treatment", label: "Treatment" },
        { href: "/editorial-policy", label: "Editorial policy" },
      ]}
    />
  );
}
