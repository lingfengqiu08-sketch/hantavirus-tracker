"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import type { ShipRouteNode } from "@/lib/outbreak";

export type ShipRouteMapProps = {
  route: ShipRouteNode[];
};

function fixLeafletIcon() {
  const proto = L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown };
  delete proto._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

export default function ShipRouteMap({ route }: ShipRouteMapProps) {
  const positions = route.map((node) => [node.lat, node.lng] as [number, number]);
  useEffect(() => {
    fixLeafletIcon();
  }, []);
  return (
    <div className="h-[480px] overflow-hidden rounded-lg border">
      <MapContainer
        center={[5, -32]}
        zoom={3}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={positions} pathOptions={{ color: "#0f766e", weight: 4 }} />
        {route.map((node) => (
          <Marker key={`${node.date}-${node.location}`} position={[node.lat, node.lng]}>
            <Popup>
              <strong>{node.location}</strong>
              <p className="m-0">{node.date}</p>
              <p className="m-0">{node.event}</p>
              <a href={node.sourceUrl} target="_blank" rel="noreferrer">
                Source
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
