import { outbreak } from "@/lib/outbreak";

export const dynamic = "force-static";

function csvEscape(value: unknown): string {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

export function GET() {
  const header = [
    "id",
    "status",
    "nationality",
    "age_range",
    "symptom_onset",
    "hospital",
    "outcome",
    "source_ids",
    "tracker_last_updated",
  ];

  const rows = outbreak.cases.map((caseRecord) => [
    caseRecord.id,
    caseRecord.status,
    caseRecord.nationality,
    caseRecord.ageRange,
    caseRecord.symptomOnset,
    caseRecord.hospital,
    caseRecord.outcome,
    caseRecord.sources.join("|"),
    outbreak.lastUpdated,
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");

  return new Response(`${csv}\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
