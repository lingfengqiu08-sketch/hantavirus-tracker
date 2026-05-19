import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "NETHERLANDS",
    title: "MV Hondius Rotterdam Arrival and Crew Status",
    subtitle: "ECDC reported Rotterdam arrival on 18 May with 27 crew members on board",
    stats: [
      { value: "May 18", label: "Arrival" },
      { value: "27", label: "Crew" },
      { value: "Rotterdam", label: "Port" },
    ],
  });
}
