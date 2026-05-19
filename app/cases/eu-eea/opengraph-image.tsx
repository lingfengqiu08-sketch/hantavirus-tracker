import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "EU/EEA",
    title: "MV Hondius Response and ECDC Updates",
    subtitle: "12 total cases, 9 confirmed, 42-day follow-up, very low public risk",
    stats: [
      { value: "23", label: "Countries" },
      { value: "9", label: "EU/EEA" },
      { value: "ECDC", label: "Source" },
    ],
  });
}
