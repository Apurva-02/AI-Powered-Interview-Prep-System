"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, AlertCircle, Zap, TrendingUp, Rocket, Code2, Users } from "lucide-react"

export interface InterviewSetupData {
  difficultyLevel: "easy" | "medium" | "hard"
  interviewType: "technical" | "behavioral"
  resume: File | null
  resumeName: string
}

interface PreInterviewSetupProps {
  onComplete: (data: InterviewSetupData) => void
  onCancel: () => void
}

export function PreInterviewSetup({ onComplete, onCancel }: PreInterviewSetupProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [difficultyLevel, setDifficultyLevel] = useState<"easy" | "medium" | "hard">("medium")
  const [interviewType, setInterviewType] = useState<"technical" | "behavioral">("technical")
  const [resume, setResume] = useState<File | null>(null)
  const [resumeName, setResumeName] = useState("")
  const [error, setError] = useState("")

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setResume(file)
        setResumeName(file.name)
        setError("")
      } else {
        setError("Please upload a PDF or Word document")
      }
    }
  }

  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      if (!resume) {
        setError("Please upload your resume")
        return
      }
      onComplete({
        difficultyLevel,
        interviewType,
        resume,
        resumeName,
      })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3)
      setError("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-accent/20">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Interview Setup
              </h2>
              <p className="text-muted-foreground mt-2">Step {step} of 3 - Personalize Your Experience</p>
            </div>
            <button
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground hover:bg-accent/10 p-2 rounded-lg transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Difficulty Level */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Select Interview Difficulty Level</h3>
                <p className="text-muted-foreground">
                  Choose a difficulty level that matches your experience. This helps us customize the interview
                  questions to your level.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    level: "easy" as const,
                    title: "Easy",
                    description: "Beginner-friendly questions",
                    Icon: Zap,
                  },
                  {
                    level: "medium" as const,
                    title: "Medium",
                    description: "Intermediate level questions",
                    Icon: TrendingUp,
                  },
                  {
                    level: "hard" as const,
                    title: "Hard",
                    description: "Advanced challenging questions",
                    Icon: Rocket,
                  },
                ].map(({ level, title, description, Icon }) => (
                  <button
                    key={level}
                    onClick={() => setDifficultyLevel(level)}
                    className={`group p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      difficultyLevel === level
                        ? "border-accent bg-gradient-to-br from-accent/10 to-accent/5 shadow-lg"
                        : "border-accent/20 hover:border-accent/50 hover:bg-gradient-to-br hover:from-accent/5 hover:to-transparent hover:shadow-lg hover:-translate-y-1"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                        difficultyLevel === level
                          ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                          : "bg-accent/10 text-accent group-hover:bg-gradient-to-br group-hover:from-purple-600/20 group-hover:to-blue-600/20 group-hover:scale-110"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Interview Type */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Select Interview Type</h3>
                <p className="text-muted-foreground">
                  Choose the type of interview you want to practice. You can practice both types separately.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    type: "technical" as const,
                    title: "Technical Interview",
                    description: "Focus on technical skills, coding, and problem-solving",
                    Icon: Code2,
                  },
                  {
                    type: "behavioral" as const,
                    title: "Behavioral Interview",
                    description: "Focus on soft skills, experience, and communication",
                    Icon: Users,
                  },
                ].map(({ type, title, description, Icon }) => (
                  <button
                    key={type}
                    onClick={() => setInterviewType(type)}
                    className={`group p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      interviewType === type
                        ? "border-accent bg-gradient-to-br from-accent/10 to-accent/5 shadow-lg"
                        : "border-accent/20 hover:border-accent/50 hover:bg-gradient-to-br hover:from-accent/5 hover:to-transparent hover:shadow-lg hover:-translate-y-1"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                        interviewType === type
                          ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                          : "bg-accent/10 text-accent group-hover:bg-gradient-to-br group-hover:from-purple-600/20 group-hover:to-blue-600/20 group-hover:scale-110"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Resume Upload */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Upload Your Resume</h3>
                <p className="text-muted-foreground">
                  Upload your resume so our AI can generate personalized questions based on your experience and skills.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              <div className="border-2 border-dashed border-accent/30 rounded-xl p-8 text-center hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 group cursor-pointer">
                <label className="cursor-pointer block">
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-600/20 group-hover:to-blue-600/20 group-hover:scale-110 transition-all duration-300">
                      <Upload className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">PDF or Word document (max 10MB)</p>
                    </div>
                  </div>
                </label>
              </div>

              {resume && (
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{resumeName}</p>
                      <p className="text-xs text-muted-foreground">{(resume.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setResume(null)
                      setResumeName("")
                    }}
                    className="text-muted-foreground hover:text-foreground hover:bg-accent/20 p-2 rounded-lg transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="flex-1 border-accent/30 hover:border-accent/60 hover:bg-accent/5 transition-all duration-300 bg-transparent"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:-translate-y-1 text-white font-semibold transition-all duration-300"
            >
              {step === 3 ? "Start Interview" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
