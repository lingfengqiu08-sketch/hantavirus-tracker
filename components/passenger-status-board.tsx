import type { PassengerStatus } from "@/lib/outbreak";

export type PassengerStatusBoardProps = {
  status: PassengerStatus;
};

export function PassengerStatusBoard({ status }: PassengerStatusBoardProps) {
  const rows: Array<[string, number]> = [
    ["Confirmed", status.confirmed],
    ["Probable", status.probable],
    ["Deaths", status.deaths],
    ["Repatriated", status.repatriated],
    ["Under monitoring", status.monitoring],
    ["Crew onboard", status.crewOnboard],
  ];

  return (
    <section className="rounded-lg border bg-card">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {rows.map(([label, value]) => (
          <div key={label} className="border-b p-4 md:border-r last:border-b-0 last:border-r-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <p className="p-4 text-sm text-muted-foreground">{status.note}</p>
    </section>
  );
}
