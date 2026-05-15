import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { getOutbreak, getTotalCases } from "@/lib/outbreak";

export const runtime = "edge";
export const alt = "MV Hondius Andes Virus Outbreak Tracker";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const data = getOutbreak();
  const totalCases = getTotalCases(data);
  return renderOg({
    eyebrow: "MV Hondius outbreak",
    title: "MV Hondius Andes Virus Outbreak Tracker",
    subtitle: "Ship route from Ushuaia → Tenerife, passenger status board, full timeline and sources.",
    stats: [
      { value: String(totalCases), label: "Total cases" },
      { value: String(data.confirmed), label: "Confirmed" },
      { value: String(data.deaths), label: "Deaths" },
      { value: `${data.monitoringPeriodDays}d`, label: "Monitoring" },
    ],
  });
}
