"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import JobCard from "./job-card"

interface JobMatchesProps {
  resumeData: { name: string; skills: string[] } | null
  onStartOver: () => void
}

const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Tech Innovators Inc",
    location: "San Francisco, CA",
    salary: "$150K - $190K",
    match: 95,
    skills: ["React", "TypeScript", "Node.js"],
    description: "Build scalable web applications with a talented team",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "Cloud Systems Ltd",
    location: "New York, NY",
    salary: "$140K - $180K",
    match: 88,
    skills: ["TypeScript", "Python", "AWS", "Docker"],
    description: "Lead development of cloud-native applications",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "Data Solutions Co",
    location: "Remote",
    salary: "$120K - $160K",
    match: 82,
    skills: ["Python", "SQL", "GraphQL", "Docker"],
    description: "Design and implement robust backend systems",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "Infrastructure Pro",
    location: "Austin, TX",
    salary: "$130K - $170K",
    match: 79,
    skills: ["AWS", "Docker", "Python"],
    description: "Manage and optimize cloud infrastructure",
  },
  {
    id: 5,
    title: "Frontend Engineer",
    company: "Design Systems Co",
    location: "Los Angeles, CA",
    salary: "$125K - $165K",
    match: 75,
    skills: ["React", "TypeScript", "CSS"],
    description: "Create beautiful and responsive user interfaces",
  },
]

export default function JobMatches({ resumeData, onStartOver }: JobMatchesProps) {
  const topJobs = mockJobs.slice(0, 5)

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Perfect Matches for {resumeData?.name}</h2>
            <p className="text-muted-foreground">Based on your resume analysis, here are your top 5 opportunities</p>
          </div>
          <Button variant="outline" onClick={onStartOver}>
            Upload New Resume
          </Button>
        </div>
      </div>

      {/* Skills Summary */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base">Detected Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {resumeData?.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {topJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardContent className="pt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Ready to apply?</h3>
            <p className="text-muted-foreground mb-6">
              Start an interview with any job to learn more and show your expertise
            </p>
            <Button size="lg">Explore More Jobs</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
