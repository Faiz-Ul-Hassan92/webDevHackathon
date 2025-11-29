"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Loader2 } from "lucide-react"

interface UploadSectionProps {
  onUploadSuccess: (data: { name: string; skills: string[] }) => void
}

export default function UploadSection({ onUploadSuccess }: UploadSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.includes("pdf") && !file.name.endsWith(".doc") && !file.name.endsWith(".docx")) {
      alert("Please upload a PDF or DOC file")
      return
    }

    setIsLoading(true)
    // Simulate file processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock data extraction from resume
    const mockData = {
      name: "Alex Johnson",
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "SQL", "GraphQL", "Docker"],
    }

    onUploadSuccess(mockData)
    setIsLoading(false)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Find Your Perfect Job Match
        </h2>
        <p className="text-lg text-muted-foreground text-balance">
          Upload your resume and let our AI match you with the best job opportunities
        </p>
      </div>

      <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
        <CardContent className="pt-8">
          <div
            className={`text-center transition-colors ${dragActive ? "bg-primary/5" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>

              <div>
                <p className="text-lg font-semibold text-foreground">
                  {dragActive ? "Drop your resume here" : "Drag and drop your resume"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">or click to browse (PDF, DOC, DOCX)</p>
              </div>

              <Button onClick={() => inputRef.current?.click()} disabled={isLoading} size="lg" className="mt-4">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Select File
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "⚡", title: "Instant Analysis", desc: "Your resume is analyzed in seconds" },
          { icon: "🎯", title: "Smart Matching", desc: "AI finds the best job fits for you" },
          { icon: "📊", title: "Real Opportunities", desc: "Access to thousands of job listings" },
        ].map((feature, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
