import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Globe,
  Smartphone,
  Cog,
  TrendingUp,
  Palette,
  Zap,
  Lightbulb,
  Users,
  Award,
  Shield,
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We leverage cutting-edge AI and machine learning to provide the most advanced interview preparation platform.",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: Users,
      title: "Accessibility",
      description:
        "Making professional interview coaching available to everyone, regardless of background or location.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We are committed to delivering the highest quality feedback and insights to help you succeed.",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "Your data is secure, private, and never shared. We maintain the highest standards of data protection.",
      gradient: "from-teal-500 to-green-500",
    },
  ]

  const services = [
    {
      title: "Website Development",
      description: "Modern, responsive, and SEO-optimized websites tailored to your brand.",
      icon: Globe,
      gradient: "from-purple-500 to-blue-500",
    },
    {
      title: "App Development",
      description: "Powerful, user-centric mobile and web apps built for performance and scalability.",
      icon: Smartphone,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Software Solutions",
      description: "Custom software to automate workflows and enhance productivity.",
      icon: Cog,
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      title: "Digital Marketing",
      description: "ROI-focused campaigns in SEO, social media, and paid ads to boost your online presence.",
      icon: TrendingUp,
      gradient: "from-teal-500 to-green-500",
    },
    {
      title: "Branding & UI/UX",
      description: "Elegant, intuitive design systems that tell your brand's story beautifully.",
      icon: Palette,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "AI Solutions",
      description: "Cutting-edge AI and machine learning solutions for modern businesses.",
      icon: Zap,
      gradient: "from-emerald-500 to-purple-500",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Oneself Technologies
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe technology should empower people — not complicate their lives. We are a full-stack digital
              solutions company specializing in custom website development, mobile and web applications, software
              solutions, and digital marketing strategies.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To empower businesses of all sizes through innovative, reliable, and human-centered technology —
                    making digital transformation accessible and impactful.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg border border-accent/20">
                  <p className="text-foreground font-semibold">
                    Founded with a vision to bridge creativity and technology, we've built a team of passionate
                    developers, designers, and strategists who transform ideas into impactful digital experiences.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To become a global technology partner known for creativity, transparency, and long-term client
                    success — helping brands evolve in an ever-changing digital world.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-accent/20">
                  <p className="text-foreground font-semibold">
                    Whether it's crafting a sleek corporate website, developing a scalable enterprise application, or
                    running a data-driven marketing campaign — we deliver excellence that drives real results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 sm:py-32 bg-card">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">What We Do</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive digital solutions tailored to your business needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const ServiceIcon = service.icon
                return (
                  <Card
                    key={index}
                    className="p-8 group cursor-pointer border border-accent/20 bg-gradient-to-br from-card via-card to-card/50 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:rotate-6`}
                      >
                        <ServiceIcon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 sm:py-32 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card
                    key={index}
                    className="p-8 group cursor-pointer border border-accent/20 bg-gradient-to-br from-card via-card to-card/50 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:rotate-6`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 sm:py-32 bg-card">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">What sets Oneself Technologies apart</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Client-First Approach", desc: "We listen, we understand, we deliver." },
                {
                  title: "End-to-End Expertise",
                  desc: "From concept to code to campaign — everything under one roof.",
                },
                { title: "Transparent Communication", desc: "Regular updates and complete project clarity." },
                { title: "Quality & Innovation", desc: "Every project reflects our passion for perfection." },
                { title: "On-Time Delivery", desc: "Commitment to deadlines, without compromising quality." },
                { title: "24/7 Support", desc: "We're always here to help you succeed." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-6 rounded-lg hover:bg-accent/5 transition-colors duration-300 group cursor-pointer"
                >
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let's Build the Future Together</h2>
            <p className="text-lg text-blue-100 mb-8">
              Whether you're a startup, enterprise, or agency — Oneself Technologies is your trusted partner for all
              things digital.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-blue-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
