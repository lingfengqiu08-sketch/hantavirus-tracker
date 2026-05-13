import { NextResponse } from "next/server";
import { outbreak } from "@/lib/outbreak";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(outbreak, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
