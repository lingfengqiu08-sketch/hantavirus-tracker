import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "TRANSMISSION",
    title: "Airborne or Contagious?",
    subtitle: "Rodent dust, surfaces, and rare Andes virus close-contact spread",
    stats: [
      { value: "Rodents", label: "Main route" },
      { value: "Rare", label: "Person spread" },
      { value: "42d", label: "Monitoring" },
    ],
  });
}
