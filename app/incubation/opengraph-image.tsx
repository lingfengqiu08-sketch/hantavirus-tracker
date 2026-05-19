import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "INCUBATION",
    title: "Andes Virus Incubation Period",
    subtitle: "4-42 days after exposure; general HPS is usually 1-8 weeks",
    stats: [
      { value: "4-42d", label: "Andes virus" },
      { value: "1-8w", label: "General HPS" },
      { value: "Jun 21", label: "MV Hondius window" },
    ],
  });
}
