import type { Source } from "@/lib/outbreak";

export type SourceListProps = {
  sources: Source[];
};

export function SourceList({ sources }: SourceListProps) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {sources.map((source) => (
        <li key={source.id}>
          <a
            className="group flex h-full flex-col rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-[0_2px_10px_-6px_rgba(15,118,110,0.25)]"
            href={source.url}
            target="_blank"
            rel="noreferrer"
          >
            <span className="font-medium leading-snug text-foreground underline-offset-4 group-hover:underline">
              {source.name}
            </span>
            <span className="mt-1.5 text-[13px] text-muted-foreground">
              {source.publisher} · {source.date}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
