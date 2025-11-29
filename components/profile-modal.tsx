"use client"

import { useState } from "react"
import { X, Mail, MapPin, FileText, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    location: "San Francisco, CA",
    resumeFile: "resume_2024.pdf",
    joinedDate: "January 2024",
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" onClick={onClose}>
      <div
        className="bg-background rounded-xl border border-border shadow-xl max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Profile</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-1 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-white">JD</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">Job Seeker</p>
          </div>

          {/* Profile Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-cyan-500" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-cyan-500" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-foreground">{profile.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-cyan-500" />
              <div>
                <p className="text-xs text-muted-foreground">Current Resume</p>
                <p className="text-sm font-medium text-foreground">{profile.resumeFile}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border"></div>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                // Handle edit profile
                console.log("Edit profile clicked")
              }}
            >
              Edit Profile
            </Button>

            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                // Handle logout
                console.log("Logout clicked")
                onClose()
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
