// 'use client';

// import { useState } from 'react';
// import ResumeUploader from '@/components/features/ResumeUploader';
// import { ResumeData } from '@/types';
// import { Briefcase, GraduationCap, Code, User, Github, Linkedin, Mail } from 'lucide-react';


// // Helper to ensure links start with https://
// const ensureUrl = (url: string) => {
//   if (!url) return '#';
//   if (url.startsWith('http://') || url.startsWith('https://')) return url;
//   return `https://${url}`;
// };


// export default function ResumePage() {
//   const [resumeData, setResumeData] = useState<ResumeData | null>(null);

//   if (!resumeData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">AI Resume Analyst</h1>
//           <p className="text-gray-600 mt-2">Upload your resume to extract insights and match jobs.</p>
//         </div>
//         <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-2">
//           <ResumeUploader onUploadSuccess={(data) => setResumeData(data)} />
//         </div>
//       </div>
//     );
//   }

//   // The Result View
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-5xl mx-auto space-y-6">
        
//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">{resumeData.contact_info.name}</h1>
//               <div className="flex gap-4 mt-3 text-gray-600">
//                 {resumeData.contact_info.email && (
//                   <span className="flex items-center gap-1">
//                     <Mail className="w-4 h-4" /> {resumeData.contact_info.email}
//                   </span>
//                 )}
                
//               </div>
//             </div>
//             <div className="bg-blue-50 px-4 py-2 rounded-lg text-blue-700 font-semibold">
//               {resumeData.years_of_experience} Years Exp
//             </div>
//           </div>
          
//           {resumeData.summary && (
//             <div className="mt-6 p-4 bg-gray-50 rounded-lg text-gray-700 italic border-l-4 border-blue-500">
//               "{resumeData.summary}"
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
//           {/* Left Column: Skills & Education */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <Code className="w-5 h-5 text-purple-600" /> Skills
//               </h2>
//               <div className="flex flex-wrap gap-2">
//                 {resumeData.skills.map((skill, i) => (
//                   <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <GraduationCap className="w-5 h-5 text-green-600" /> Education
//               </h2>
//               <div className="space-y-4">
//                 {resumeData.education.map((edu, i) => (
//                   <div key={i} className="pb-4 border-b last:border-0 last:pb-0">
//                     <div className="font-semibold">{edu.institution}</div>
//                     <div className="text-sm text-gray-600">{edu.degree}</div>
//                     <div className="text-xs text-gray-400 mt-1">{edu.year}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Experience & Projects */}
//           <div className="md:col-span-2 space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <Briefcase className="w-5 h-5 text-blue-600" /> Experience
//               </h2>
//               <div className="space-y-6">
//                 {resumeData.experience.map((exp, i) => (
//                   <div key={i} className="relative pl-6 border-l-2 border-gray-200">
//                     <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
//                     <h3 className="font-bold text-lg">{exp.title}</h3>
//                     <div className="text-gray-600 mb-2">{exp.company} • {exp.duration}</div>
//                     <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
//                       {exp.description.map((point, j) => (
//                         <li key={j}>{point}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {resumeData.projects.length > 0 && (
//               <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//                 <h2 className="text-xl font-semibold mb-4">Projects</h2>
//                 <div className="grid grid-cols-1 gap-4">
//                   {resumeData.projects.map((proj, i) => (
//                     <div key={i} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
//                       <div className="font-bold text-gray-800">{proj.name}</div>
//                       <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
//                       <div className="flex gap-2 mt-3">
//                         {proj.tech_stack.map((t, j) => (
//                           <span key={j} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
//                             {t}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//         </div>
        
//         <button 
//           onClick={() => setResumeData(null)}
//           className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform font-medium"
//         >
//           Upload Another Resume
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import ResumeUploader from '@/components/features/ResumeUploader';
import JobCard from '@/components/features/JobCard';
import { ResumeData } from '@/types';
import { Briefcase, GraduationCap, Code, Github, Linkedin, Mail, ExternalLink, Search, Loader2 } from 'lucide-react';

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
  description?: string;
  source: string;
}

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  
  // New State for Jobs
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [jobError, setJobError] = useState('');

  const ensureUrl = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  // The function to call our new Backend API
  const findJobs = async () => {
    if (!resumeData) return;
    
    setIsLoadingJobs(true);
    setJobError('');
    setJobs([]);

    try {
      const response = await fetch('http://localhost:8000/api/v1/jobs/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: resumeData.primary_role || "Software Engineer", 
          skills: resumeData.skills,
          location: "Remote" 
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch jobs');
      
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setJobError('Could not find jobs at the moment. Try again later.');
    } finally {
      setIsLoadingJobs(false);
    }
  };

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Resume Analyst</h1>
          <p className="text-gray-600 mt-2">Upload your resume to extract insights and match jobs.</p>
        </div>
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-2">
          <ResumeUploader onUploadSuccess={(data) => setResumeData(data)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{resumeData.contact_info.name}</h1>
              <p className="text-lg text-blue-600 font-medium mt-1">{resumeData.primary_role}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
                {resumeData.contact_info.email && (
                  <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                    <Mail className="w-4 h-4" /> {resumeData.contact_info.email}
                  </span>
                )}
                {resumeData.contact_info.linkedin && (
                  <a href={ensureUrl(resumeData.contact_info.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                )}
                {resumeData.contact_info.github && (
                  <a href={ensureUrl(resumeData.contact_info.github)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-800 hover:underline">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold">
                {resumeData.years_of_experience} Years Exp
              </div>
              
              {/* THE FIND JOBS BUTTON */}
              <button 
                onClick={findJobs}
                disabled={isLoadingJobs}
                className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isLoadingJobs ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" /> Find Matching Jobs
                  </>
                )}
              </button>
            </div>
          </div>
          
          {resumeData.summary && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-gray-700 italic border-l-4 border-blue-500">
              "{resumeData.summary}"
            </div>
          )}
        </div>

        {/* JOB RESULTS SECTION (Appears when jobs are found) */}
        {(jobs.length > 0 || isLoadingJobs || jobError) && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-600" /> 
                Recommended Opportunities
             </h2>
             
             {jobError && (
               <div className="p-4 bg-red-50 text-red-600 rounded-lg">{jobError}</div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, idx) => (
                  <JobCard key={idx} job={job} />
                ))}
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Skills & Education */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-600" /> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" /> Education
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="pb-4 border-b last:border-0 last:pb-0">
                    <div className="font-semibold text-gray-900">{edu.institution}</div>
                    <div className="text-sm text-gray-600">{edu.degree}</div>
                    <div className="text-xs text-gray-400 mt-1">{edu.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience & Projects */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Experience Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" /> Experience
              </h2>
              <div className="space-y-8">
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-gray-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                    <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
                    <div className="text-gray-600 mb-2 font-medium">{exp.company} • {exp.duration}</div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      {exp.description.map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            {resumeData.projects.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" /> Projects
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {resumeData.projects.map((proj, i) => (
                    <div key={i} className="group p-4 border rounded-lg hover:border-orange-300 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                            {proj.name}
                        </div>
                        {proj.link && (
                            <a href={ensureUrl(proj.link)} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600">
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2 mb-3">{proj.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tech_stack.map((t, j) => (
                          <span key={j} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
