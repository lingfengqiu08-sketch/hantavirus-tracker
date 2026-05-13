import type { Source } from "@/lib/outbreak";

export type SourceListProps = {
  sources: Source[];
};

export function SourceList({ sources }: SourceListProps) {
  return (
    <ul className="space-y-3">
      {sources.map((source) => (
        <li key={source.id} className="rounded-lg border p-4">
          <a
            className="font-medium underline underline-offset-4"
            href={source.url}
            target="_blank"
            rel="noreferrer"
          >
            {source.name}
          </a>
          <p className="mt-1 text-sm text-muted-foreground">
            {source.publisher} · {source.date}
          </p>
        </li>
      ))}
    </ul>
  );
}
