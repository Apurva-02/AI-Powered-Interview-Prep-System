import { NextResponse } from "next/server";
import { getDb } from "@/utils/mongodb";

export async function POST(req: Request) {
  try {
    console.log("📥 /api/interview/start called");

    const body = await req.json();
    console.log("📦 Request body:", body);

    const sessionId = crypto.randomUUID();

    const db = await getDb();
    console.log("✅ MongoDB connected");

    await db.collection("interview_sessions").insertOne({
      sessionId,
      status: "ongoing",
      createdAt: new Date(),
      setup: body.setup ?? {},
    });

    console.log("✅ Session inserted:", sessionId);

    return NextResponse.json({
      ok: true,
      sessionId,
    });
  } catch (error: any) {
    console.error("❌ Interview start error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Interview session failed",
      },
      { status: 500 }
    );
  }
}
