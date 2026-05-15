import { NextResponse } from "next/server";
import { updates } from "@/lib/updates";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(updates, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
