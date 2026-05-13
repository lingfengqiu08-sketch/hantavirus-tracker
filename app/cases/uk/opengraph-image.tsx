import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "UK CASES",
    title: "Hantavirus UK Cases and MV Hondius Monitoring",
    subtitle: "UKHSA updates, Arrowe Park monitoring, and public risk context",
    stats: [
      { value: "Low", label: "Public risk" },
      { value: "45d", label: "UK isolation" },
      { value: "UKHSA", label: "Source" },
    ],
  });
}
