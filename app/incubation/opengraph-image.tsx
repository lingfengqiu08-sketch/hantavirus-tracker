import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "INCUBATION",
    title: "Hantavirus Incubation Period",
    subtitle: "1-8 weeks for HPS, 4-42 days for Andes virus",
    stats: [
      { value: "1-8w", label: "General HPS" },
      { value: "4-42d", label: "Andes virus" },
      { value: "Jun 21", label: "MV Hondius window" },
    ],
  });
}
