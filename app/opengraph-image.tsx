import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getOutbreak } from "@/lib/outbreak";

export const runtime = "edge";
export const alt = "Hantavirus Tracker — 2026 MV Hondius Andes Virus Outbreak Map";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const data = getOutbreak();
  return renderOg({
    eyebrow: "Live outbreak tracker",
    title: "Hantavirus Tracker — 2026 MV Hondius Andes Virus Outbreak",
    subtitle: "Case counts, ship route, timeline and methodology — verified from WHO, ECDC and CDC.",
    stats: [
      { value: String(data.confirmed), label: "Confirmed" },
      { value: String(data.probable), label: "Probable" },
      { value: String(data.deaths), label: "Deaths" },
      { value: `${data.monitoringPeriodDays}d`, label: "Monitoring" },
    ],
  });
}
