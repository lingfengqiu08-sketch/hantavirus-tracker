import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.hantavirustracker.fyi",
          },
        ],
        destination: "https://hantavirustracker.fyi/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
