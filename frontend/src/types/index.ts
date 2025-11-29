export interface ResumeData {
  contact_info: {
    name: string;
    email?: string;
    linkedin?: string;
    github?: string;
  };
  summary?: string;
  skills: string[];
  education: {
    institution: string;
    degree: string;
    year?: string;
  }[];
  experience: {
    title: string;
    company: string;
    duration?: string;
    description: string[];
  }[];
  projects: {
    name: string;
    description: string;
    tech_stack: string[];
    link?: string; // Added link support for projects
  }[];
  years_of_experience: number;
  primary_role?: string; // <--- This was missing!
}