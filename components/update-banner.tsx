import { BadgeCheck } from "lucide-react";

export type UpdateBannerProps = {
  lastUpdated: string;
  lastVerifiedAt: string;
  sourceName: string;
  sourceUrl: string;
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toUTCString().replace(":00 GMT", " GMT");
  } catch {
    return iso;
  }
}

export function UpdateBanner({
  lastUpdated,
  lastVerifiedAt,
  sourceName,
  sourceUrl,
}: UpdateBannerProps) {
  return (
    <aside className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl border bg-muted/40 px-4 py-2.5 text-[13px] text-muted-foreground">
      <span
        className="inline-flex items-center gap-1.5 font-semibold text-foreground"
        title={`Last verified ${formatDate(lastVerifiedAt)}`}
      >
        <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
        Verified
      </span>
      <span className="h-3.5 w-px bg-border" aria-hidden="true" />
      <span>
        Updated{" "}
        <strong className="font-medium text-foreground">{formatDate(lastUpdated)}</strong>
      </span>
      <span className="hidden h-3.5 w-px bg-border sm:inline-block" aria-hidden="true" />
      <span className="min-w-0">
        Source:{" "}
        <a
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/70"
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          {sourceName}
        </a>
      </span>
    </aside>
  );
}
