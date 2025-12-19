// app/api/interview/end/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { computeInterviewConfidenceScore } from "@/lib/scoring";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// inline sentiment helper
function computeTextSentiment(text: string): number {
  if (!text || typeof text !== "string") return 60;
  const POSITIVE_WORDS = ["good","great","excellent","confident","happy","excited","positive","strong","capable","motivated","interested","curious","reliable"];
  const NEGATIVE_WORDS = ["bad","weak","nervous","anxious","afraid","worried","negative","stressed","confused","unsure","doubt","problem","issue"];
  const tokens = text.toLowerCase().split(/\W+/).filter(Boolean);
  let pos = 0, neg = 0;
  for (const t of tokens) {
    if (POSITIVE_WORDS.includes(t)) pos++;
    if (NEGATIVE_WORDS.includes(t)) neg++;
  }
  const total = pos + neg;
  if (total === 0) return 60;
  const ratio = (pos - neg) / total;
  const score = Math.round(((ratio + 1) / 2) * 100);
  return Math.max(0, Math.min(100, score));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, transcript } = body;

    if (!sessionId) {
      return NextResponse.json({ ok: false, error: "Missing sessionId" }, { status: 400 });
    }

    const { data: faceRow } = await supabase
      .from("performance_reports")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(1);

    const { data: voiceRow } = await supabase
      .from("voice_reports")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(1);

    let sentimentScore = 60;
    if (transcript) {
      sentimentScore = computeTextSentiment(transcript);
    }

    const finalScore = computeInterviewConfidenceScore({
      face: { engagementScore: faceRow?.[0]?.engagement_score || 60 },
      voice: {
        energyScore: voiceRow?.[0]?.energy_score || 60,
        stabilityScore: voiceRow?.[0]?.stability_score || 60,
      },
      text: { sentimentScore },
    });

    await supabase.from("interview_scores").insert([
      {
        session_id: sessionId,
        final_score: finalScore.score,
        breakdown: finalScore.breakdown,
        face_metrics: finalScore.details.face,
        voice_metrics: finalScore.details.voice,
        text_metrics: finalScore.details.text,
      },
    ]);

    return NextResponse.json({ ok: true, ...finalScore });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
