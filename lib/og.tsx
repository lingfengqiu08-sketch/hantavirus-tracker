import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export type OgPanelProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  stats?: Array<{ value: string; label: string }>;
  footer?: string;
};

export function renderOg({
  eyebrow,
  title,
  subtitle,
  stats,
  footer = "hantavirustracker.fyi",
}: OgPanelProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, #0b1220 0%, #0f172a 55%, #134e4a 100%)",
          color: "#e2e8f0",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#5eead4",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 60,
              lineHeight: 1.1,
              fontWeight: 700,
              maxWidth: 1000,
              color: "#f8fafc",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 28,
                lineHeight: 1.35,
                maxWidth: 1000,
                color: "#cbd5e1",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {stats && stats.length > 0 ? (
          <div style={{ display: "flex", gap: 32 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 28px",
                  background: "rgba(15, 118, 110, 0.18)",
                  border: "1px solid rgba(94, 234, 212, 0.4)",
                  borderRadius: 16,
                }}
              >
                <div style={{ fontSize: 56, fontWeight: 700, color: "#f8fafc" }}>{s.value}</div>
                <div style={{ fontSize: 20, color: "#94a3b8", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <span style={{ display: "flex" }}>Hantavirus Tracker</span>
          <span style={{ display: "flex" }}>{footer}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
