import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Methodology and Data Sources — Hantavirus Tracker";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Methodology",
    title: "How this tracker is updated and verified",
    subtitle:
      "Update cadence, source hierarchy (WHO → ECDC → CDC), case definitions, and an open dataset.",
  });
}
