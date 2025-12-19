// lib/scoring.ts

export type FaceMetrics = {
  engagementScore: number;          // 0–100
  dominantEmotion?: string | null;
};

export type VoiceMetrics = {
  energyScore: number;              // 0–100
  stabilityScore: number;           // 0–100
  dominantTone?: string | null;     // calm / tense / energetic
};

export type TextMetrics = {
  sentimentScore: number;           // 0–100
  coherenceScore?: number;          // optional / future
};

export type InterviewScoreInput = {
  face: FaceMetrics;
  voice: VoiceMetrics;
  text: TextMetrics;
};

export type InterviewScoreResult = {
  score: number; // 0–100
  breakdown: {
    faceContribution: number;
    voiceContribution: number;
    textContribution: number;
  };
  details: {
    face: FaceMetrics;
    voice: VoiceMetrics;
    text: TextMetrics;
  };
};

/**
 * Weighted scoring rule:
 *  - 40% face engagement
 *  - 30% voice (energy & stability)
 *  - 30% text sentiment
 */
export function computeInterviewConfidenceScore(input: InterviewScoreInput): InterviewScoreResult {
  const { face, voice, text } = input;

  const faceScore = clamp(face.engagementScore, 0, 100);
  const voiceComposite = clamp((voice.energyScore * 0.5 + voice.stabilityScore * 0.5), 0, 100);
  const textScore = clamp(text.sentimentScore, 0, 100);

  const finalScore =
    faceScore * 0.4 +
    voiceComposite * 0.3 +
    textScore * 0.3;

  const score = Math.round(clamp(finalScore, 0, 100));

  return {
    score,
    breakdown: {
      faceContribution: Math.round(faceScore * 0.4),
      voiceContribution: Math.round(voiceComposite * 0.3),
      textContribution: Math.round(textScore * 0.3),
    },
    details: { face, voice, text },
  };
}

function clamp(x: number, minVal: number, maxVal: number): number {
  return Math.max(minVal, Math.min(maxVal, x));
}
