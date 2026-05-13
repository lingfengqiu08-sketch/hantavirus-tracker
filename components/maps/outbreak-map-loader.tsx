"use client";

import dynamic from "next/dynamic";
import type { OutbreakMapProps } from "./outbreak-map";

const OutbreakMap = dynamic(() => import("./outbreak-map"), {
  ssr: false,
  loading: () => <div className="h-[420px] rounded-lg border bg-muted" />,
});

export default function OutbreakMapLoader(props: OutbreakMapProps) {
  return <OutbreakMap {...props} />;
}
