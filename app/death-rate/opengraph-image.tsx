import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "MORTALITY",
    title: "How Deadly Is Hantavirus?",
    subtitle: "Fatality, survival factors, and MV Hondius death count context",
    stats: [
      { value: "38%", label: "HPS figure" },
      { value: "3", label: "MV Hondius deaths" },
      { value: "Care", label: "Survival factor" },
    ],
  });
}
