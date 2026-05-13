export type KpiCardProps = {
  label: string;
  value: number | string;
  description: string;
  tone?: "default" | "amber" | "red" | "green";
};

const toneClasses: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  default: "border-border bg-card",
  amber: "border-amber-300 bg-amber-50 dark:bg-amber-950/30",
  red: "border-red-300 bg-red-50 dark:bg-red-950/30",
  green: "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30",
};

export function KpiCard({ label, value, description, tone = "default" }: KpiCardProps) {
  return (
    <div className={`rounded-lg border p-4 shadow-sm ${toneClasses[tone]}`}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-normal">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
