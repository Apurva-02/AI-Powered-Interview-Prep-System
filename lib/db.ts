import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Singleton pattern for Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseServiceKey)
  }
  return supabaseClient
}

// User operations
export async function createUser(name: string, email: string, passwordHash: string) {
  const supabase = getSupabaseClient()
  return supabase.from("users").insert([{ name, email, password_hash: passwordHash }])
}

export async function getUserByEmail(email: string) {
  const supabase = getSupabaseClient()
  return supabase.from("users").select("*").eq("email", email).single()
}

export async function getUserById(userId: string) {
  const supabase = getSupabaseClient()
  return supabase.from("users").select("*").eq("id", userId).single()
}

export async function updateUser(userId: string, updates: Record<string, any>) {
  const supabase = getSupabaseClient()
  return supabase
    .from("users")
    .update({ ...updates, updated_at: new Date() })
    .eq("id", userId)
}

// Contact operations
export async function createContactSubmission(
  name: string,
  email: string,
  subject: string,
  message: string,
  phone?: string,
) {
  const supabase = getSupabaseClient()
  return supabase.from("contact_submissions").insert([
    {
      name,
      email,
      phone: phone || null,
      subject,
      message,
      status: "new",
    },
  ])
}

export async function getContactSubmissions() {
  const supabase = getSupabaseClient()
  return supabase.from("contact_submissions").select("*").order("created_at", { ascending: false })
}

// Pre-interview setup operations
export async function createPreInterviewSetup(
  userId: string,
  difficultyLevel: string,
  interviewType: string,
  resumeUrl?: string,
  resumeFilename?: string,
  resumeContent?: string,
) {
  const supabase = getSupabaseClient()
  return supabase.from("pre_interview_setup").insert([
    {
      user_id: userId,
      difficulty_level: difficultyLevel,
      interview_type: interviewType,
      resume_url: resumeUrl || null,
      resume_filename: resumeFilename || null,
      resume_content: resumeContent || null,
    },
  ])
}

export async function getLatestPreInterviewSetup(userId: string) {
  const supabase = getSupabaseClient()
  return supabase
    .from("pre_interview_setup")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()
}

// Interview session operations
export async function createInterviewSession(
  userId: string,
  preInterviewSetupId: string,
  title: string,
  durationSeconds: number,
  score: number,
  transcript?: string,
  emotionAnalysis?: Record<string, any>,
  feedback?: string,
) {
  const supabase = getSupabaseClient()
  return supabase.from("interview_sessions").insert([
    {
      user_id: userId,
      pre_interview_setup_id: preInterviewSetupId,
      title,
      duration_seconds: durationSeconds,
      score,
      transcript: transcript || null,
      emotion_analysis: emotionAnalysis || null,
      feedback: feedback || null,
    },
  ])
}

export async function getInterviewSessions(userId: string) {
  const supabase = getSupabaseClient()
  return supabase.from("interview_sessions").select("*").eq("user_id", userId).order("created_at", { ascending: false })
}

export async function getInterviewSessionById(sessionId: string) {
  const supabase = getSupabaseClient()
  return supabase.from("interview_sessions").select("*").eq("id", sessionId).single()
}

// Performance report operations
export async function createPerformanceReport(
  sessionId: string,
  communicationScore: number,
  technicalScore: number,
  confidenceScore: number,
  overallScore: number,
  strengths?: string,
  improvements?: string,
  recommendations?: string,
) {
  const supabase = getSupabaseClient()
  return supabase.from("performance_reports").insert([
    {
      session_id: sessionId,
      communication_score: communicationScore,
      technical_score: technicalScore,
      confidence_score: confidenceScore,
      overall_score: overallScore,
      strengths: strengths || null,
      improvements: improvements || null,
      recommendations: recommendations || null,
    },
  ])
}

export async function getPerformanceReport(sessionId: string) {
  const supabase = getSupabaseClient()
  return supabase.from("performance_reports").select("*").eq("session_id", sessionId).single()
}

export async function getPerformanceReportsByUserId(userId: string) {
  const supabase = getSupabaseClient()
  return supabase
    .from("performance_reports")
    .select(
      `
      *,
      interview_sessions (
        user_id,
        created_at
      )
    `,
    )
    .eq("interview_sessions.user_id", userId)
    .order("created_at", { ascending: false })
}
