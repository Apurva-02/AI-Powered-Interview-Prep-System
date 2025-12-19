// app/api/emotion/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/utils/mongodb";

// -------- Types --------
type FaceItem = {
  ts: number;
  label: string;
  confidence: number;
};

// -------- Compute Metrics --------
function computeFaceMetrics(batch: FaceItem[]) {
  const counts: Record<string, number> = {};
  const sumConf: Record<string, number> = {};
  let total = 0;
  let totalConf = 0;

  for (const item of batch) {
    const label = item.label || "unknown";
    const conf = Number(item.confidence || 0);

    counts[label] = (counts[label] || 0) + 1;
    sumConf[label] = (sumConf[label] || 0) + conf;

    total++;
    totalConf += conf;
  }

  const percentages: Record<string, number> = {};
  const avgConf: Record<string, number> = {};

  for (const k of Object.keys(counts)) {
    percentages[k] = (counts[k] / total) * 100;
    avgConf[k] = sumConf[k] / counts[k];
  }

  // Dominant emotion selection
  let dominantEmotion: string | null = null;
  for (const k of Object.keys(counts)) {
    if (!dominantEmotion) {
      dominantEmotion = k;
      continue;
    }

    if (counts[k] > counts[dominantEmotion]) {
      dominantEmotion = k;
    } else if (
      counts[k] === counts[dominantEmotion] &&
      (avgConf[k] || 0) > (avgConf[dominantEmotion] || 0)
    ) {
      dominantEmotion = k;
    }
  }

  const meanConfidence = total ? totalConf / total : 0;

  // Engagement score
  const focusedPct = percentages["focused"] || 0;
  const attentivePct = percentages["attentive"] || 0;
  const confidentPct = percentages["confident"] || 0;

  const boredPct = percentages["bored"] || 0;
  const distractedPct = percentages["distracted"] || 0;
  const nervousPct = percentages["nervous"] || 0;

  let engagementScore = 50;
  engagementScore += Math.min(20, (focusedPct + attentivePct) * 0.3);
  engagementScore += Math.min(10, confidentPct * 0.2);
  engagementScore -= Math.min(15, boredPct * 0.3);
  engagementScore -= Math.min(15, distractedPct * 0.3);
  engagementScore -= Math.min(15, nervousPct * 0.3);
  engagementScore += Math.min(10, meanConfidence / 10);

  engagementScore = Math.max(0, Math.min(100, engagementScore));

  return {
    counts,
    percentages,
    avgConf,
    dominantEmotion,
    meanConfidence,
    engagementScore: Math.round(engagementScore),
  };
}

// -------- POST (Main Emotion Endpoint) --------
export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (!payload || !Array.isArray(payload.batch)) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const sessionId = payload.sessionId || null;
    const userId = payload.userId || null;

    const batch: FaceItem[] = payload.batch.map((b: any) => ({
      ts: Number(b.ts) || Date.now() / 1000,
      label: String(b.label || "unknown"),
      confidence: Number(b.confidence || 0),
    }));

    if (!batch.length) {
      return NextResponse.json({ ok: false, error: "Empty batch" }, { status: 400 });
    }

    const metrics = computeFaceMetrics(batch);

    const db = await getDb();

    // Save raw batch
    const emotionResult = await db.collection("emotion_batches").insertOne({
      sessionId,
      userId,
      ts: payload.ts || Date.now() / 1000,
      batch,
      metrics,
      createdAt: new Date(),
    });

    // Save summarized metrics
    const perfResult = await db.collection("performance_reports").insertOne({
      sessionId,
      userId,
      dominantEmotion: metrics.dominantEmotion,
      meanConfidence: metrics.meanConfidence,
      engagementScore: metrics.engagementScore,
      emotionPercentages: metrics.percentages,
      createdAt: new Date(),
    });

    return NextResponse.json({
      ok: true,
      received: batch.length,
      metrics,
      insertedIds: {
        emotionBatchId: emotionResult.insertedId,
        performanceReportId: perfResult.insertedId,
      },
    });

  } catch (err: any) {
    console.error("Error in /api/emotion:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

// -------- GET Check Endpoint --------
export async function GET() {
  return NextResponse.json({ ok: true, message: "Emotion endpoint running." });
}
