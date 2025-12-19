"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Send, MapPin, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Reach out to us through any of these channels. We're here to help!
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Phone Card */}
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer border border-accent/10 bg-gradient-to-br from-card to-card/50 hover:bg-gradient-to-br hover:from-card/80 hover:to-card/30">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                          Phone
                        </h3>
                        <div className="space-y-2">
                          <a
                            href="tel:+918010212475"
                            className="text-muted-foreground group-hover:text-accent transition-colors duration-300 hover:underline block font-medium"
                          >
                            +91 8010212475
                          </a>
                          <a
                            href="tel:+918007029012"
                            className="text-muted-foreground group-hover:text-accent transition-colors duration-300 hover:underline block font-medium"
                          >
                            +91 8007029012
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Email Card */}
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer border border-accent/10 bg-gradient-to-br from-card to-card/50 hover:bg-gradient-to-br hover:from-card/80 hover:to-card/30">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                          Email
                        </h3>
                        <a
                          href="mailto:info.oneselftechnologies@gmail.com"
                          className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:underline break-all font-medium"
                        >
                          info.oneselftechnologies@gmail.com
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Address Card */}
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer border border-accent/10 bg-gradient-to-br from-card to-card/50 hover:bg-gradient-to-br hover:from-card/80 hover:to-card/30">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                          Location
                        </h3>
                        <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 font-medium">
                          Kolhapur, Maharashtra
                        </p>
                        <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                          Oneself Technologies
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="p-8 sm:p-12 border border-accent/10 bg-gradient-to-br from-card to-card/50">
                  <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name *</label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email *</label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="+91 XXXXXXXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="transition-all duration-300 focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject *</label>
                      <Input
                        type="text"
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message *</label>
                      <textarea
                        name="message"
                        placeholder="Your message..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                        required
                      />
                    </div>

                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-700 dark:text-green-400 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Thank you! We'll get back to you soon.
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-700 dark:text-red-400">
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
