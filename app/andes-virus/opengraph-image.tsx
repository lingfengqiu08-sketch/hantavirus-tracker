import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "ANDES VIRUS",
    title: "The Hantavirus Strain That Can Spread Person-to-Person",
    subtitle: "South America, 4-42 day timing, and MV Hondius relevance",
    stats: [
      { value: "Rare", label: "Person spread" },
      { value: "4-42d", label: "Timing" },
      { value: "MV", label: "Hondius" },
    ],
  });
}
