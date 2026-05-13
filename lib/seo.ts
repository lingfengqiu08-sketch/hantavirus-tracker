export const SITE_URL = "https://hantavirustracker.fyi";
export const SITE_NAME = "Hantavirus Tracker";

export function canonical(path = "/"): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
