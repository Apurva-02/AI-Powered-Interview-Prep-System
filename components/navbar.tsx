"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavbarProps {
  isLoggedIn?: boolean
  onGetStarted?: () => void
  onLogout?: () => void
}

export function Navbar({ isLoggedIn = false, onGetStarted, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Interview", href: "/interview-ui" },
    { label: "Demo", href: "/demo" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
              OA
            </div>
            <span className="hidden sm:inline group-hover:text-accent transition-colors duration-300">OneselfAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300" />
                </Button>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2 relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent/10 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-accent transition-colors duration-300">
                    Account
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${showProfileMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {showProfileMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link href="/profile">
                      <button className="w-full text-left px-4 py-2 hover:bg-accent/10 flex items-center gap-2 transition-colors duration-300 group">
                        <User className="w-4 h-4 group-hover:text-accent transition-colors duration-300" />
                        <span className="group-hover:text-accent transition-colors duration-300">My Profile</span>
                      </button>
                    </Link>
                    <Link href="/settings">
                      <button className="w-full text-left px-4 py-2 hover:bg-accent/10 flex items-center gap-2 transition-colors duration-300 group">
                        <Settings className="w-4 h-4 group-hover:text-accent transition-colors duration-300" />
                        <span className="group-hover:text-accent transition-colors duration-300">Settings</span>
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        onLogout?.()
                        setShowProfileMenu(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-500/10 flex items-center gap-2 text-destructive transition-colors duration-300 group"
                    >
                      <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-all duration-300 group"
            >
              {isOpen ? (
                <X size={24} className="group-hover:text-accent transition-colors duration-300" />
              ) : (
                <Menu size={24} className="group-hover:text-accent transition-colors duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            {!isLoggedIn && (
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-2"
                onClick={() => {
                  onGetStarted?.()
                  setIsOpen(false)
                }}
              >
                Get Started
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
