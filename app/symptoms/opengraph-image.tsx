import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Hantavirus Symptoms and When to Seek Care";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Symptoms guide",
    title: "Hantavirus Symptoms and When to Seek Care",
    subtitle:
      "Early flu-like symptoms, severe respiratory phase, incubation window, and guidance for MV Hondius contacts.",
  });
}
