export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    uri: process.env.MONGODB_URI || "NOT FOUND",
    db: process.env.MONGODB_DB || "NOT FOUND",
  });
}
