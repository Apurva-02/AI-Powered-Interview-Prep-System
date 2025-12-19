"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DemoPage() {
  const [isLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-600/10 to-blue-600/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Live Demo
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch our AI interviewer in action. See how OneselfAI provides real-time feedback and personalized
                interview practice.
              </p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
              {/* YouTube Video Embed */}
              <div className="relative w-full bg-black aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="OneselfAI Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Practice?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your first AI-powered interview practice session today and get personalized feedback.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Interview Practice
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
