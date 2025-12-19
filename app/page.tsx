"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Brain, Video, Mic, TrendingUp, Award, Sparkles, ChevronDown, Play } from "lucide-react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authType, setAuthType] = useState<"login" | "register">("login")

  const features = [
    {
      icon: Brain,
      title: "Resume-Based Questioning",
      description:
        "AI analyzes your resume to generate personalized interview questions tailored to your skills, experience, and target role.",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: Video,
      title: "Live AI Video Interview",
      description:
        "Practice with our AI interviewer through live video sessions that feel like real human interactions with adaptive follow-up questions.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Sparkles,
      title: "Facial Emotion Recognition",
      description:
        "Advanced computer vision tracks confidence, nervousness, and engagement through real-time facial expression analysis.",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      icon: Mic,
      title: "Speech Pattern Analysis",
      description:
        "Analyze speech pace, filler words, pauses, and tone to provide comprehensive communication feedback.",
      gradient: "from-teal-500 to-green-500",
    },
    {
      icon: TrendingUp,
      title: "Dynamic Scoring System",
      description:
        "Get scored on multiple dimensions including answer quality, emotional stability, and communication skills.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      title: "Adaptive Learning Modules",
      description:
        "Personalized training content and practice modules based on your performance and improvement areas.",
      gradient: "from-emerald-500 to-purple-500",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onGetStarted={() => setShowAuthModal(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
      <main className="min-h-screen">
        {/* HOME SECTION */}
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/85 to-indigo-900/90" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center space-y-8 text-white">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
                Master Your Interviews with AI
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto text-balance">
                Get real-time feedback, emotion analysis, and personalized coaching to ace your next interview.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    setShowAuthModal(true)
                    setAuthType("register")
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/interview-ui">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to prepare for your dream job.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="p-8 group cursor-pointer border border-accent/20 bg-gradient-to-br from-card via-card to-card/50 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:rotate-6`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* INTERVIEW SECTION */}
        <section id="interview" className="py-20 sm:py-32 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">AI Interview Practice</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Practice with our advanced AI interviewer that provides real-time feedback.
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 border border-accent/10">
              <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop"
                  alt="Professional Interviewer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                <Link href="/interview-ui" className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white text-xl font-semibold">Start Interview</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO SECTION */}
        <section id="demo" className="py-20 sm:py-32 bg-card">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Live Demo</h2>
              <p className="text-muted-foreground text-lg">
                Watch how OneselfAI helps you prepare for your interviews.
              </p>
            </div>

            <div className="bg-black rounded-2xl shadow-2xl overflow-hidden aspect-video hover:shadow-3xl transition-all duration-300 border border-accent/20">
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
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 sm:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">About OneselfAI</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Empowering professionals to ace their interviews with AI-powered preparation.
              </p>
            </div>

            <Link href="/about">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 sm:py-32 bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground text-lg">
                Have questions? We'd love to hear from you. Contact us anytime.
              </p>
            </div>

            <Link href="/contact">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Send us a Message
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Interview Skills?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of professionals who have improved their interview performance with OneselfAI.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                setShowAuthModal(true)
                setAuthType("register")
              }}
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {authType === "login" ? "Welcome Back" : "Join OneselfAI"}
              </h2>

              <div className="space-y-3 mb-6">
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-accent/5 transition-colors duration-300"
                  onClick={() => {
                    setIsLoggedIn(true)
                    setShowAuthModal(false)
                  }}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form className="space-y-4 mb-6">
                {authType === "register" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>

                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    setIsLoggedIn(true)
                    setShowAuthModal(false)
                  }}
                >
                  {authType === "login" ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {authType === "login" ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  onClick={() => setAuthType(authType === "login" ? "register" : "login")}
                  className="text-accent hover:underline font-medium transition-colors duration-300"
                >
                  {authType === "login" ? "Sign up" : "Sign in"}
                </button>
              </div>

              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                ✕
              </button>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </>
  )
}
