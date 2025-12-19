import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

type VoiceItem = {
  ts: number;
  label: string;          // calm / tense / energetic
  confidence: number;     // 0–100
  rms?: number;           // root mean square energy
  zcr?: number;           // zero crossing rate
};

function computeVoiceMetrics(batch: VoiceItem[]) {
  const counts: Record<string, number> = {};
  let total = 0;
  let totalConf = 0;
  let energySum = 0;

  for (const item of batch) {
    const label = item.label || "unknown";
    const conf = Number(item.confidence || 0);
    counts[label] = (counts[label] || 0) + 1;
    total += 1;
    totalConf += conf;
    if (typeof item.rms === "number") {
      energySum += item.rms;
    }
  }

  const percentages: Record<string, number> = {};
  for (const k of Object.keys(counts)) {
    percentages[k] = (counts[k] / total) * 100;
  }

  const meanConfidence = total ? totalConf / total : 0;
  const meanRms = total ? energySum / total : 0;

  // Energy score from mean RMS
  let energyScore = 50;
  if (meanRms < 0.02) {
    energyScore = 60; // calm / low energy
  } else if (meanRms < 0.05) {
    energyScore = 75; // moderate energy
  } else {
    energyScore = 85; // high energy
  }

  // Stability score (less tense / extreme energetic)
  const tensePct = percentages["tense"] || 0;
  const energeticPct = percentages["energetic"] || 0;
  const calmPct = percentages["calm"] || 0;

  let stabilityScore = 80;
  if (tensePct > 40) stabilityScore -= 20;
  if (energeticPct > 70) stabilityScore -= 10;
  if (calmPct < 10) stabilityScore -= 5;

  stabilityScore = Math.max(0, Math.min(100, stabilityScore));

  // Dominant tone
  let dominantTone: string | null = null;
  for (const k of Object.keys(counts)) {
    if (!dominantTone || counts[k] > counts[dominantTone]) {
      dominantTone = k;
    }
  }

  return {
    counts,
    percentages,
    meanConfidence,
    meanRms,
    energyScore,
    stabilityScore,
    dominantTone,
  };
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (!payload || !Array.isArray(payload.batch)) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const batch: VoiceItem[] = payload.batch.map((b: any) => ({
      ts: Number(b.ts) || Date.now() / 1000,
      label: String(b.label || "unknown"),
      confidence: Number(b.confidence || 0),
      rms: typeof b.rms === "number" ? b.rms : undefined,
      zcr: typeof b.zcr === "number" ? b.zcr : undefined,
    }));

    if (!batch.length) {
      return NextResponse.json({ ok: false, error: "Empty batch" }, { status: 400 });
    }

    const metrics = computeVoiceMetrics(batch);

    const user_id = payload.userId || null;
    const session_id = payload.sessionId || null;

    if (supabase) {
      const { error: e1 } = await supabase.from("voice_batches").insert([
        {
          user_id,
          session_id,
          batch,
          metrics,
        },
      ]);
      if (e1) console.error("Supabase voice_batches error:", e1.message);

      const { error: e2 } = await supabase.from("voice_reports").insert([
        {
          user_id,
          session_id,
          dominant_tone: metrics.dominantTone,
          energy_score: metrics.energyScore,
          stability_score: metrics.stabilityScore,
          mean_confidence: metrics.meanConfidence,
          mean_rms: metrics.meanRms,
          tone_percentages: metrics.percentages,
        },
      ]);
      if (e2) console.error("Supabase voice_reports error:", e2.message);
    }

    return NextResponse.json({ ok: true, received: batch.length, metrics });
  } catch (err: any) {
    console.error("Error in /api/voice-emotion:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "voice-emotion endpoint running" });
}
