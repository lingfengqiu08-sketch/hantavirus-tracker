import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "PREVENTION",
    title: "Hantavirus Prevention",
    subtitle: "Rodent cleanup, exposure reduction, and Andes virus precautions",
    stats: [
      { value: "Avoid", label: "Rodents" },
      { value: "Clean", label: "Safely" },
      { value: "Monitor", label: "Contacts" },
    ],
  });
}
