import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "UNITED STATES",
    title: "MV Hondius Monitoring and CDC Update",
    subtitle: "18 repatriated passengers, 7 home-monitored passengers, no confirmed US cases",
    stats: [
      { value: "0", label: "US cases" },
      { value: "18", label: "Repatriated" },
      { value: "CDC", label: "Source" },
    ],
  });
}
