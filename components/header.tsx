"use client"

import { useState } from "react"
import { User } from "lucide-react"
import ProfileModal from "./profile-modal"

export default function Header() {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <>
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">JobFinder AI</h1>
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </a>
          </nav>

          <button
            onClick={() => setShowProfile(true)}
            className="p-2 hover:bg-accent rounded-full transition flex items-center justify-center"
            aria-label="Open profile"
          >
            <User className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  )
}
