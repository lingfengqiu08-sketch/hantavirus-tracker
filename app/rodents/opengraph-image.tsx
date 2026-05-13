import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "RODENTS",
    title: "Hantavirus in Mice, Rats, and Rodents",
    subtitle: "Rodent hosts, droppings exposure, and safer prevention basics",
    stats: [
      { value: "Mice", label: "Reservoirs" },
      { value: "Rats", label: "Seoul virus" },
      { value: "Dust", label: "Exposure" },
    ],
  });
}
