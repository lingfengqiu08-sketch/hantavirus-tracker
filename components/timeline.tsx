import type { TimelineItem } from "@/lib/outbreak";

export type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="space-y-4 border-l border-border pl-5">
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`} className="relative">
          <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-teal-700" />
          <time className="text-sm font-medium text-muted-foreground">{item.date}</time>
          <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
        </li>
      ))}
    </ol>
  );
}
