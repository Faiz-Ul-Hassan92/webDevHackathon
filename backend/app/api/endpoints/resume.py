from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.schemas.resume_schema import ResumeData
from app.services.pdf_parser import parse_resume_with_ai

router = APIRouter()

@router.post("/analyze", response_model=ResumeData)
async def analyze_resume(file: UploadFile = File(...)):
    """
    Upload a PDF resume, parse it using AI, and return structured JSON data.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF allowed.")
    
    # Call the service logic
    try:
        resume_data = await parse_resume_with_ai(file)
        return resume_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))