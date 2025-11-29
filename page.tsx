"use client"

import Header from "@/components/header"
import UploadSection from "@/components/upload-section"
import JobMatches from "@/components/job-matches"
import { useState } from "react"

export default function Home() {
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [resumeData, setResumeData] = useState<{ name: string; skills: string[] } | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!resumeUploaded ? (
          <UploadSection
            onUploadSuccess={(data) => {
              setResumeData(data)
              setResumeUploaded(true)
            }}
          />
        ) : (
          <JobMatches resumeData={resumeData} onStartOver={() => setResumeUploaded(false)} />
        )}
      </div>
    </main>
  )
}
