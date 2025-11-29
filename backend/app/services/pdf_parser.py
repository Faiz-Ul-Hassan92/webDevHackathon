import json
from fastapi import UploadFile, HTTPException
import PyPDF2
from langchain_groq import ChatGroq  # Changed import
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser

# Import the schema
from app.schemas.resume_schema import ResumeData
from app.core.config import settings

async def extract_text_from_pdf(file: UploadFile) -> str:
    """
    Reads the raw text from a PDF file.
    """
    try:
        reader = PyPDF2.PdfReader(file.file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF: {str(e)}")

async def parse_resume_with_ai(file: UploadFile) -> ResumeData:
    """
    1. Extracts text from PDF
    2. Sends text to LLM (Groq) to extract structured JSON
    """
    # 1. Get raw text
    resume_text = await extract_text_from_pdf(file)
    
    # 2. Setup LLM (Groq)
    # using llama3-70b-8192 for high intelligence, or llama3-8b-8192 for speed
    llm = ChatGroq(
        model_name="llama-3.3-70b-versatile",
        temperature=0.0,
        api_key=settings.GROQ_API_KEY
    )

    # 3. Setup Parser
    parser = PydanticOutputParser(pydantic_object=ResumeData)

    # 4. Define Prompt
    prompt_template = """
    You are an expert technical recruiter and resume parser.
    Extract the following information from the resume text below.
    
    Instructions:
    - Extract skills accurately.
    - Summarize experience into bullet points.
    - Estimate the 'years_of_experience' as a number (e.g. 2.5).
    - If a field is missing, leave it null or empty list.
    - Format the output EXACTLY as the JSON instructions below.

    {format_instructions}

    RESUME TEXT:
    {resume_text}
    """

    prompt = ChatPromptTemplate.from_template(prompt_template)
    
    # 5. Chain the operations
    chain = prompt | llm | parser

    # 6. Execute
    try:
        # Groq has a token limit, so we slice the text if it's too huge. 
        # 6000 chars is usually enough for a 2-page resume.
        output = chain.invoke({
            "resume_text": resume_text[:6000], 
            "format_instructions": parser.get_format_instructions()
        })
        return output
    except Exception as e:
        print(f"AI Parse Error: {e}")
        # Sometimes Groq output might need a retry or format fix, but Pydantic parser handles most
        raise HTTPException(status_code=500, detail=f"Failed to parse resume: {str(e)}")