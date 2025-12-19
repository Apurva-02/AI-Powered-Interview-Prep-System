import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                OA
              </div>
              <span>OneselfAI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Master your interviews with AI-powered preparation and real-time feedback. Developed by Oneself
              Technologies.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#interview"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  Interview Practice
                </Link>
              </li>
              <li>
                <Link
                  href="#dashboard"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#demo" className="text-muted-foreground hover:text-accent transition-colors duration-300">
                  Live Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300 group cursor-pointer">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>+91 8010212475</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300 group cursor-pointer">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>+91 8007029012</span>
              </li>
              <li>
                <a
                  href="mailto:info.oneselftechnologies@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="break-all">info.oneselftechnologies@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 OneselfAI by Oneself Technologies. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
