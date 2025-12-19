import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      sessionId,
      communicationScore,
      technicalScore,
      confidenceScore,
      overallScore,
      strengths,
      improvements,
      recommendations,
    } = body

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    const { data, error } = await supabase.from("performance_reports").insert([
      {
        session_id: sessionId,
        communication_score: communicationScore || 0,
        technical_score: technicalScore || 0,
        confidence_score: confidenceScore || 0,
        overall_score: overallScore || 0,
        strengths: strengths || null,
        improvements: improvements || null,
        recommendations: recommendations || null,
      },
    ])

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save performance report" }, { status: 500 })
    }

    return NextResponse.json({ message: "Performance report saved successfully", data }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    const { data, error } = await supabase.from("performance_reports").select("*").eq("session_id", sessionId).single()

    if (error) {
      return NextResponse.json({ error: "Failed to fetch performance report" }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
