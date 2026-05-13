import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "HPS GUIDE",
    title: "Hantavirus Pulmonary Syndrome",
    subtitle: "Stages, warning signs, survival, and supportive care",
    stats: [
      { value: "1-8w", label: "HPS window" },
      { value: "4-42d", label: "Andes timing" },
      { value: "ICU", label: "Severe care" },
    ],
  });
}
