"use client";

import dynamic from "next/dynamic";
import type { ShipRouteMapProps } from "./ship-route-map";

const ShipRouteMap = dynamic(() => import("./ship-route-map"), {
  ssr: false,
  loading: () => <div className="h-[480px] rounded-lg border bg-muted" />,
});

export default function ShipRouteMapLoader(props: ShipRouteMapProps) {
  return <ShipRouteMap {...props} />;
}
