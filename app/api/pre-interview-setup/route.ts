import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, difficultyLevel, interviewType, resumeUrl, resumeFilename, resumeContent } = body

    // Validate required fields
    if (!userId || !difficultyLevel || !interviewType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate difficulty level and interview type
    const validDifficulties = ["easy", "medium", "hard"]
    const validTypes = ["technical", "behavioral"]

    if (!validDifficulties.includes(difficultyLevel)) {
      return NextResponse.json({ error: "Invalid difficulty level" }, { status: 400 })
    }

    if (!validTypes.includes(interviewType)) {
      return NextResponse.json({ error: "Invalid interview type" }, { status: 400 })
    }

    // Insert into database
    const { data, error } = await supabase.from("pre_interview_setup").insert([
      {
        user_id: userId,
        difficulty_level: difficultyLevel,
        interview_type: interviewType,
        resume_url: resumeUrl || null,
        resume_filename: resumeFilename || null,
        resume_content: resumeContent || null,
      },
    ])

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save pre-interview setup" }, { status: 500 })
    }

    return NextResponse.json({ message: "Pre-interview setup saved successfully", data }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("pre_interview_setup")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to fetch pre-interview setup" }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
