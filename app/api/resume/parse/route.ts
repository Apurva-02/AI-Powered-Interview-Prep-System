import { NextResponse } from "next/server";
import { getDb } from "@/utils/mongodb";

const pdf = require("pdf-parse");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No resume uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = await pdf(buffer);

    const db = await getDb();
    await db.collection("resume_raw").insertOne({
      text: parsed.text,
      createdAt: new Date(),
    });

    return NextResponse.json({
      ok: true,
      preview: parsed.text.slice(0, 300),
    });
  } catch (err: any) {
    console.error("Resume parse error:", err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}