from fastapi import APIRouter, HTTPException, Body
from typing import List
from app.schemas.job_schema import JobListing, JobList
from app.services.scraper import find_jobs_for_profile

router = APIRouter()

@router.post("/find", response_model=List[JobListing])
async def find_jobs(
    role: str = Body(..., embed=True),
    skills: List[str] = Body(..., embed=True),
    location: str = Body("Remote", embed=True)
):
    """
    Find jobs matching the provided role and skills.
    """
    if not role or not skills:
        raise HTTPException(status_code=400, detail="Role and Skills are required")
        
    jobs = await find_jobs_for_profile(role, skills, location)
    
    if not jobs:
        raise HTTPException(status_code=404, detail="No jobs found")
        
    return jobs