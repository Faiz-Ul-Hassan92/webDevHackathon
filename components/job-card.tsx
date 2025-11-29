"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Briefcase } from "lucide-react"
import InterviewModal from "./interview-modal"

interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  match: number
  skills: string[]
  description: string
}

interface JobCardProps {
  job: Job
}

function getMatchColor(match: number) {
  if (match >= 90) return "bg-green-500/10 text-green-700 border-green-200"
  if (match >= 80) return "bg-blue-500/10 text-blue-700 border-blue-200"
  return "bg-yellow-500/10 text-yellow-700 border-yellow-200"
}

export default function JobCard({ job }: JobCardProps) {
  const [showInterview, setShowInterview] = useState(false)

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
        <CardContent className="pt-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-lg border font-semibold text-sm whitespace-nowrap ${getMatchColor(job.match)}`}
            >
              {job.match}% Match
            </div>
          </div>

          <p className="text-foreground mb-4 text-sm">{job.description}</p>

          <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-border text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground">{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground truncate">{job.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground">Full-time</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 mt-auto">
            <Button className="flex-1" onClick={() => setShowInterview(true)}>
              Start Interview
            </Button>
          </div>
        </CardContent>
      </Card>

      <InterviewModal
        isOpen={showInterview}
        onClose={() => setShowInterview(false)}
        jobTitle={job.title}
        jobId={job.id}
      />
    </>
  )
}
