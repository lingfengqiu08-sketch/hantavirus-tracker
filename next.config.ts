import type { NextConfig } from "next";

const canonicalHost = "hantavirustracker.fyi";
const alternateHosts = [
  "www.hantavirustracker.fyi",
  "hantavirus-tracker-steel.vercel.app",
  "hantavirus-tracker-xiaofengs-projects-39245be3.vercel.app",
  "hantavirus-tracker-git-main-xiaofengs-projects-39245be3.vercel.app",
  "hantavirus-tracker-o8ps8p6u8-xiaofengs-projects-39245be3.vercel.app",
];

const pathAliases = [
  ["/index.html", "/"],
  ["/mv-hondius", "/cruise/mv-hondius"],
  ["/mv-hondius-outbreak", "/cruise/mv-hondius"],
  ["/hantavirus-cruise-ship", "/cruise/mv-hondius"],
  ["/hantavirus-map", "/"],
  ["/outbreak-map", "/"],
  ["/hantavirus-outbreak-map", "/"],
  ["/outbreak-timeline", "/timeline"],
  ["/mv-hondius-timeline", "/timeline"],
  ["/hantavirus-case-definition", "/case-definitions"],
  ["/hantavirus-case-definitions", "/case-definitions"],
  ["/mv-hondius-travel-advice", "/travel-advice"],
  ["/hantavirus-symptoms", "/symptoms"],
  ["/hantavirus-transmission", "/transmission"],
  ["/hantavirus-treatment", "/treatment"],
  ["/hantavirus-testing", "/test"],
  ["/hantavirus-test", "/test"],
  ["/hantavirus-incubation-period", "/incubation"],
  ["/incubation-period", "/incubation"],
  ["/hantavirus-death-rate", "/death-rate"],
  ["/mortality-rate", "/death-rate"],
  ["/what-is-andes-virus", "/andes-virus"],
  ["/andes-hantavirus", "/andes-virus"],
  ["/hantavirus-types", "/types"],
  ["/types-of-hantavirus", "/types"],
  ["/hantavirus-origin", "/origin"],
  ["/where-does-hantavirus-come-from", "/origin"],
  ["/hantavirus-cases", "/cases"],
  ["/hantavirus-cases-uk", "/cases/uk"],
  ["/hantavirus-argentina", "/cases/argentina"],
  ["/hantavirus-chile", "/cases/chile"],
  ["/update-log", "/updates"],
  ["/outbreak-updates", "/updates"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...alternateHosts.map((host) => ({
        source: "/:path*",
        has: [
          {
            type: "host",
            value: host,
          },
        ],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      })),
      ...pathAliases.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
