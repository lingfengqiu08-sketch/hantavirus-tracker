import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "TESTING",
    title: "Hantavirus Test and Diagnosis",
    subtitle: "PCR, serology, early timing, and MV Hondius testing context",
    stats: [
      { value: "PCR", label: "Testing" },
      { value: "Labs", label: "Confirmation" },
      { value: "Timing", label: "Matters" },
    ],
  });
}
