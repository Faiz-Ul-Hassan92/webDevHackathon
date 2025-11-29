from typing import Optional, List
from pydantic import BaseModel, Field

class JobListing(BaseModel):
    title: str = Field(..., description="Job Title")
    company: str = Field(..., description="Company Name")
    location: Optional[str] = Field("Remote/Unknown", description="Job Location")
    link: str = Field(..., description="URL to the job posting")
    source: str = Field("Web Search", description="Where this job was found")
    description: Optional[str] = Field(None, description="Brief snippet or description")
    
    # We will calculate these later with AI
    relevance_score: int = Field(0, description="0-100 score of how well it fits")
    match_reason: Optional[str] = Field(None, description="Why this job is a good fit")

class JobList(BaseModel):
    jobs: List[JobListing]