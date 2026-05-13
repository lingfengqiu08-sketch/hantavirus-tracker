import type { PassengerStatus } from "@/lib/outbreak";

export type PassengerStatusBoardProps = {
  status: PassengerStatus;
};

export function PassengerStatusBoard({ status }: PassengerStatusBoardProps) {
  const estimated = new Set(status.estimatedFields ?? []);
  const rows: Array<[string, number, keyof PassengerStatus | undefined]> = [
    ["Confirmed", status.confirmed, undefined],
    ["Probable", status.probable, undefined],
    ["Deaths", status.deaths, undefined],
    ["Repatriated", status.repatriated, "repatriated"],
    ["Under monitoring", status.monitoring, "monitoring"],
    ["Crew onboard", status.crewOnboard, "crewOnboard"],
  ];

  return (
    <section className="rounded-lg border bg-card">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {rows.map(([label, value, field]) => (
          <div key={label} className="border-b p-4 md:border-r last:border-b-0 last:border-r-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold">
              {field && estimated.has(field as "repatriated" | "monitoring" | "crewOnboard")
                ? `~${value}`
                : value}
            </p>
          </div>
        ))}
      </div>
      <p className="p-4 text-sm text-muted-foreground">{status.note}</p>
    </section>
  );
}
