import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "UNITED KINGDOM",
    title: "MV Hondius Monitoring and Public Risk",
    subtitle: "UKHSA updates, Arrowe Park monitoring, and wider public-risk context",
    stats: [
      { value: "Very low", label: "Public risk" },
      { value: "45d", label: "UK pathway" },
      { value: "UKHSA", label: "Source" },
    ],
  });
}
