import { NextResponse } from "next/server";
import { getDb } from "@/utils/mongodb";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { sessionId, resumeText, difficulty, type, role } =
      await req.json();

    if (!resumeText) {
      return NextResponse.json(
        { ok: false, error: "Resume text missing" },
        { status: 400 }
      );
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are an AI interview question generator.

Resume:
${resumeText}

Role: ${role}
Difficulty: ${difficulty}
Type: ${type}

Generate 5 interview questions in JSON format:
[
  {
    "question": "...",
    "expectedKeywords": ["...", "..."]
  }
]
`,
    });

    const questions = JSON.parse(response.output_text);

    const db = await getDb();
    await db.collection("question_bank").insertOne({
      sessionId,
      difficulty,
      type,
      role,
      questions,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true, questions });
  } catch (err: any) {
    console.error("❌ Question generation error:", err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}