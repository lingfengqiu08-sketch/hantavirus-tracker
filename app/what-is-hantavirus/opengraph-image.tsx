import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "What Is Hantavirus? Transmission, Types, and Risk";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Hantavirus explainer",
    title: "What Is Hantavirus?",
    subtitle:
      "Andes virus, transmission, HPS vs HFRS, treatment options, and why the MV Hondius outbreak is monitored.",
  });
}
