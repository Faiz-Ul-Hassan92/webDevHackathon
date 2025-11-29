from typing import List, Optional
from pydantic import BaseModel, Field

# 1. Contact Information
class ContactInfo(BaseModel):
    name: str = Field(..., description="Full name of the candidate")
    email: Optional[str] = Field(None, description="Email address")
    phone: Optional[str] = Field(None, description="Phone number")
    linkedin: Optional[str] = Field(None, description="LinkedIn profile URL")
    github: Optional[str] = Field(None, description="GitHub profile or portfolio URL")

# 2. Education Structure
class EducationItem(BaseModel):
    institution: str = Field(..., description="University or School name")
    degree: str = Field(..., description="Degree obtained (e.g., B.S. Computer Science)")
    year: Optional[str] = Field(None, description="Graduation year or range")
    gpa: Optional[str] = Field(None, description="GPA if mentioned")

# 3. Work Experience Structure
class ExperienceItem(BaseModel):
    title: str = Field(..., description="Job title")
    company: str = Field(..., description="Company name")
    duration: Optional[str] = Field(None, description="Dates of employment")
    description: List[str] = Field(..., description="Bullet points summarizing responsibilities")
    skills_used: List[str] = Field([], description="Technologies or skills specifically mentioned in this role")

# 4. Project Structure
class ProjectItem(BaseModel):
    name: str = Field(..., description="Project name")
    description: str = Field(..., description="Brief description of the project")
    tech_stack: List[str] = Field([], description="technologies used (e.g., React, Python)")
    link: Optional[str] = Field(None, description="Link to the project if available")

# 5. The Main Resume Profile
class ResumeData(BaseModel):
    contact_info: ContactInfo
    summary: Optional[str] = Field(None, description="A brief professional summary generated from the resume")
    skills: List[str] = Field(..., description="List of technical and soft skills extracted")
    education: List[EducationItem]
    experience: List[ExperienceItem]
    projects: List[ProjectItem]
    
    # Metadata for our system
    years_of_experience: float = Field(0.0, description="Estimated total years of professional experience")
    primary_role: str = Field("Developer", description="Inferred primary role (e.g. Backend Engineer, Data Scientist)")