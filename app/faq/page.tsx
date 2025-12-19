"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, HelpCircle, Zap, Shield, Users, Award } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const faqCategories = [
    {
      category: "Getting Started",
      icon: Zap,
      color: "from-purple-500 to-blue-500",
      questions: [
        {
          q: "What is OneselfAI?",
          a: "OneselfAI is an advanced AI-powered interview preparation platform designed to help professionals practice and master their interview skills. Our platform uses cutting-edge artificial intelligence to simulate real interview scenarios with personalized feedback.",
        },
        {
          q: "How do I get started?",
          a: "Simply sign up with your email or Google account, complete your profile, and upload your resume. You'll then have access to our full suite of interview preparation tools and can start practicing immediately.",
        },
        {
          q: "Do I need any special equipment?",
          a: "You'll need a computer with a webcam and microphone for the best experience. Our platform works on Windows, Mac, and Linux systems.",
        },
      ],
    },
    {
      category: "Features & Capabilities",
      icon: Award,
      color: "from-blue-500 to-cyan-500",
      questions: [
        {
          q: "How does the AI interviewer work?",
          a: "Our AI interviewer analyzes your resume and generates personalized questions based on your skills and target role. It adapts follow-up questions based on your responses, creating a realistic interview experience.",
        },
        {
          q: "What is Facial Emotion Recognition?",
          a: "This advanced feature uses computer vision to analyze your facial expressions during practice interviews. It provides feedback on your confidence levels, nervousness, and engagement throughout the interview.",
        },
        {
          q: "How does Speech Pattern Analysis work?",
          a: "Our system analyzes your speech pace, identifies filler words, detects pauses, and evaluates your tone. This helps you improve your communication skills and speak more confidently.",
        },
      ],
    },
    {
      category: "Performance & Results",
      icon: Users,
      color: "from-cyan-500 to-teal-500",
      questions: [
        {
          q: "How long does it take to see results?",
          a: "Most users see noticeable improvements in their interview performance within 2-3 weeks of regular practice. Consistent practice with our platform typically leads to better confidence and communication skills.",
        },
        {
          q: "What does the Dynamic Scoring System measure?",
          a: "Our scoring system evaluates multiple dimensions including answer quality, emotional stability, communication skills, technical knowledge, and overall presentation. You receive detailed feedback on each area.",
        },
        {
          q: "Can I track my progress?",
          a: "Yes! Our dashboard provides comprehensive analytics showing your improvement over time, including performance trends, weak areas, and personalized recommendations.",
        },
      ],
    },
    {
      category: "Security & Privacy",
      icon: Shield,
      color: "from-teal-500 to-green-500",
      questions: [
        {
          q: "Is my data secure?",
          a: "Absolutely. We use industry-standard encryption (SSL/TLS) and follow GDPR compliance standards. Your data is stored securely and never shared with third parties.",
        },
        {
          q: "What happens to my interview recordings?",
          a: "Your interview recordings are stored securely on our servers and are only accessible to you. You can delete them anytime from your dashboard.",
        },
        {
          q: "How is my personal information protected?",
          a: "We implement multiple layers of security including data encryption, secure authentication, and regular security audits. Your privacy is our top priority.",
        },
      ],
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about OneselfAI and how it can help you ace your interviews.
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {faqCategories.map((categoryData, categoryIndex) => {
                const CategoryIcon = categoryData.icon
                return (
                  <div key={categoryIndex}>
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${categoryData.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <CategoryIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold">{categoryData.category}</h2>
                        <p className="text-muted-foreground text-sm">{categoryData.questions.length} questions</p>
                      </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-4">
                      {categoryData.questions.map((item, questionIndex) => {
                        const globalIndex = categoryIndex * 10 + questionIndex
                        const isExpanded = expandedIndex === globalIndex

                        return (
                          <Card
                            key={questionIndex}
                            className="p-0 border border-accent/10 overflow-hidden hover:border-accent/30 transition-all duration-300 group cursor-pointer"
                          >
                            <button
                              onClick={() => setExpandedIndex(isExpanded ? null : globalIndex)}
                              className="w-full p-6 sm:p-8 flex items-start justify-between gap-4 hover:bg-accent/5 transition-colors duration-300"
                            >
                              <div className="text-left flex-1">
                                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors duration-300">
                                  {item.q}
                                </h3>
                              </div>
                              <ChevronDown
                                className={`w-5 h-5 text-accent flex-shrink-0 mt-1 transition-transform duration-300 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Answer */}
                            {isExpanded && (
                              <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-accent/10 bg-accent/5">
                                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                              </div>
                            )}
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 sm:py-32 bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help. Reach out to us anytime.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Master Your Interviews?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Start practicing with OneselfAI today and transform your interview skills.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
