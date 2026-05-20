import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "TESTING",
    title: "Hantavirus PCR Test Timing Checker",
    subtitle: "When to test after exposure, PCR vs IgM/IgG, and early negative results",
    stats: [
      { value: "PCR", label: "RNA" },
      { value: "IgM", label: "Recent" },
      { value: "72h", label: "Repeat?" },
    ],
  });
}
