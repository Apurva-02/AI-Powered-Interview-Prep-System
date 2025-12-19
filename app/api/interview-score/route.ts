import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  computeInterviewConfidenceScore,
  FaceMetrics,
  VoiceMetrics,
  TextMetrics,
} from "@/lib/scoring";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const face: FaceMetrics = body.face;
    const voice: VoiceMetrics = body.voice;
    const text: TextMetrics = body.text;

    if (!face || !voice || !text) {
      return NextResponse.json(
        { ok: false, error: "face, voice and text metrics are required" },
        { status: 400 },
      );
    }

    const result = computeInterviewConfidenceScore({ face, voice, text });

    const user_id = body.userId || null;
    const session_id = body.sessionId || null;

    if (supabase) {
      const { error } = await supabase.from("interview_scores").insert([
        {
          user_id,
          session_id,
          final_score: result.score,
          breakdown: result.breakdown,
          face_metrics: result.details.face,
          voice_metrics: result.details.voice,
          text_metrics: result.details.text,
        },
      ]);
      if (error) console.error("Supabase interview_scores error:", error.message);
    }

    return NextResponse.json({
      ok: true,
      score: result.score,
      breakdown: result.breakdown,
      details: result.details,
    });
  } catch (err: any) {
    console.error("Error in /api/interview-score:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "interview-score endpoint running" });
}
