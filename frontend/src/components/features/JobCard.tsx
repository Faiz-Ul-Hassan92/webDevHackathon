import React from 'react';
import { MapPin, Building, ExternalLink, Briefcase, Zap, CheckCircle } from 'lucide-react';

interface JobCardProps {
  job: {
    title: string;
    company: string;
    location: string;
    link: string;
    description?: string;
    source: string;
    relevance_score?: number; // New Field
    match_reason?: string;    // New Field
  };
}

export default function JobCard({ job }: JobCardProps) {
  // Determine color based on score
  const score = job.relevance_score || 0;
  let scoreColor = "bg-gray-100 text-gray-600";
  if (score >= 80) scoreColor = "bg-green-100 text-green-700";
  else if (score >= 60) scoreColor = "bg-yellow-100 text-yellow-700";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 transition-all group flex flex-col h-full">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
            <Building className="w-4 h-4" />
            <span className="font-medium">{job.company}</span>
          </div>
        </div>
        
        {/* Score Badge */}
        {job.relevance_score && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${scoreColor}`}>
            <Zap className="w-3 h-3" />
            {job.relevance_score}% Match
          </div>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {job.location}
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-3 h-3" />
          {job.source}
        </div>
      </div>

      {/* Match Reason (AI Insight) */}
      {job.match_reason && (
        <div className="mb-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-800 leading-relaxed">
              <span className="font-semibold">Why it fits:</span> {job.match_reason}
            </p>
          </div>
        </div>
      )}

      {/* Footer / Apply Button */}
      <div className="mt-auto pt-2">
        <a 
          href={job.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-900 hover:text-white transition-all text-sm"
        >
          Apply Now <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}