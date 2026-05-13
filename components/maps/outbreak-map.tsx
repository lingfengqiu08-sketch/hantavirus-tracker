"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export type OutbreakMapPoint = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  status: "confirmed" | "probable" | "ship" | "evacuation" | "monitoring";
  description: string;
};

export type OutbreakMapProps = {
  points: OutbreakMapPoint[];
  center?: [number, number];
  zoom?: number;
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

export default function OutbreakMap({ points, center = [18, -25], zoom = 3 }: OutbreakMapProps) {
  useEffect(() => {
    fixLeafletIcon();
  }, []);
  return (
    <div className="h-[420px] overflow-hidden rounded-lg border">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lng]}>
            <Popup>
              <strong>{point.label}</strong>
              <p className="m-0">{point.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
