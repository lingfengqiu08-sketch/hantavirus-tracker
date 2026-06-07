export type KpiCardProps = {
  label: string;
  value: number | string;
  description: string;
  tone?: "default" | "amber" | "red" | "green";
};

const toneStyles: Record<
  NonNullable<KpiCardProps["tone"]>,
  { bar: string; value: string }
> = {
  default: { bar: "bg-primary/40", value: "text-foreground" },
  amber: { bar: "bg-amber-500", value: "text-amber-700 dark:text-amber-400" },
  red: { bar: "bg-red-500", value: "text-red-600 dark:text-red-400" },
  green: { bar: "bg-emerald-500", value: "text-emerald-700 dark:text-emerald-400" },
};

export function KpiCard({ label, value, description, tone = "default" }: KpiCardProps) {
  const t = toneStyles[tone];
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_-6px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_12px_28px_-12px_rgba(15,118,110,0.22)]">
      <span className={`absolute inset-x-0 top-0 h-1 ${t.bar}`} aria-hidden="true" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">
        {label}
      </p>
      <p className={`mt-2.5 font-mono text-3xl font-semibold tabular-nums tracking-tight ${t.value}`}>
        {value}
      </p>
      <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{description}</p>
    </div>
  );
}
