import { getCountryResponses } from "@/lib/country-responses";
import { getOutbreak, getTotalCases } from "@/lib/outbreak";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET() {
  const data = getOutbreak();
  const total = getTotalCases(data);
  const countries = getCountryResponses();

  const rows = countries
    .map(
      (c) => `
      <tr>
        <td class="c">${esc(c.country)}</td>
        <td>${esc(c.peopleAffected)}</td>
        <td class="d">${esc(c.latestUpdateDate)}</td>
      </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MV Hondius Andes Virus Outbreak — Country Response</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0f172a;color:#e2e8f0;padding:16px}
.w{max-width:700px;margin:0 auto;border:1px solid #1e293b;border-radius:12px;overflow:hidden;background:#0b1220}
.h{padding:14px 16px;background:linear-gradient(135deg,#0f172a,#134e4a)}
.h b{font-size:15px;color:#f8fafc}
.h .s{display:block;margin-top:4px;font-size:12px;color:#94a3b8}
table{width:100%;border-collapse:collapse}
th,td{text-align:left;padding:9px 12px;border-bottom:1px solid #1e293b;font-size:13px;vertical-align:top}
th{color:#5eead4;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.04em}
td.c{font-weight:600;color:#f1f5f9;white-space:nowrap}
td.d{color:#94a3b8;white-space:nowrap}
tr:last-child td{border-bottom:0}
.f{padding:10px 16px;font-size:12px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
.f a{color:#5eead4;text-decoration:none;font-weight:600}
.f a:hover{text-decoration:underline}
.f span{color:#64748b}
</style></head><body>
<div class="w">
  <div class="h">
    <b>MV Hondius Andes Virus Outbreak</b>
    <span class="s">${total} cases &middot; ${data.deaths} deaths &middot; monitoring through ${esc(
      data.monitoringEndsAt,
    )} &middot; updated ${esc(data.lastUpdated.slice(0, 10))}</span>
  </div>
  <table>
    <thead><tr><th>Country</th><th>People affected</th><th>Updated</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="f">
    <a href="https://hantavirustracker.fyi/response-tracker" target="_blank" rel="noopener">Live data &middot; Hantavirus Tracker &rarr;</a>
    <span>WHO &middot; ECDC &middot; CDC sources</span>
  </div>
</div>
</body></html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
      "Content-Security-Policy": "frame-ancestors *",
    },
  });
}
