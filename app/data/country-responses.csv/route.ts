import { countryResponses } from "@/lib/country-responses";

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
    "country",
    "slug",
    "latest_update_date",
    "people_affected",
    "response",
    "monitoring",
    "case_status",
    "public_risk",
    "source_ids",
  ];

  const rows = countryResponses.map((entry) => [
    entry.country,
    entry.slug,
    entry.latestUpdateDate,
    entry.peopleAffected,
    entry.response,
    entry.monitoring,
    entry.caseStatus,
    entry.publicRisk,
    entry.sourceIds.join("|"),
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
