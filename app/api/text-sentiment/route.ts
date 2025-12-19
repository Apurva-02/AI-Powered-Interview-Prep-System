import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

const POSITIVE_WORDS = [
  "good", "great", "excellent", "confident", "happy", "excited", "positive",
  "strong", "capable", "motivated", "interested", "curious", "reliable",
];
const NEGATIVE_WORDS = [
  "bad", "weak", "nervous", "anxious", "afraid", "worried", "negative",
  "stressed", "confused", "unsure", "doubt", "problem", "issue",
];

function computeSentimentScore(text: string) {
  const tokens = text.toLowerCase().split(/\W+/).filter(Boolean);
  let pos = 0;
  let neg = 0;

  for (const t of tokens) {
    if (POSITIVE_WORDS.includes(t)) pos++;
    if (NEGATIVE_WORDS.includes(t)) neg++;
  }

  const total = pos + neg;
  if (total === 0) {
    return 60; // neutral-ish
  }

  const ratio = (pos - neg) / total; // -1 to +1
  const score = Math.round(((ratio + 1) / 2) * 100); // map to 0–100

  return Math.max(0, Math.min(100, score));
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const text: string = payload.text || "";
    if (!text || typeof text !== "string") {
      return NextResponse.json({ ok: false, error: "Text is required" }, { status: 400 });
    }

    const sentimentScore = computeSentimentScore(text);

    const user_id = payload.userId || null;
    const session_id = payload.sessionId || null;

    if (supabase) {
      const { error } = await supabase.from("text_sentiment_reports").insert([
        {
          user_id,
          session_id,
          text,
          sentiment_score: sentimentScore,
        },
      ]);
      if (error) console.error("Supabase text_sentiment_reports error:", error.message);
    }

    return NextResponse.json({
      ok: true,
      sentimentScore,
    });
  } catch (err: any) {
    console.error("Error in /api/text-sentiment:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "text-sentiment endpoint running" });
}
