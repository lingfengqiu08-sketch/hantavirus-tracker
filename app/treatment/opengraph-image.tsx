import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "TREATMENT",
    title: "Hantavirus Treatment",
    subtitle: "Supportive care, vaccine status, and when to seek urgent help",
    stats: [
      { value: "No", label: "Specific cure" },
      { value: "ICU", label: "Severe care" },
      { value: "Early", label: "Best action" },
    ],
  });
}
