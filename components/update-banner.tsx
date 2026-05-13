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
    <aside className="rounded-lg border bg-muted/40 p-4 text-sm">
      <p>
        Last updated: <strong>{formatDate(lastUpdated)}</strong>
      </p>
      <p>
        Last verified: <strong>{formatDate(lastVerifiedAt)}</strong>
      </p>
      <p className="mt-1">
        Primary source:{" "}
        <a
          className="underline underline-offset-4"
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          {sourceName}
        </a>
      </p>
    </aside>
  );
}
