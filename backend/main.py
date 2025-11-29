from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobRequest(BaseModel):
    job_url: str

def scrape_job_posting(url: str) -> dict:
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        text = soup.get_text(separator='\n', strip=True)
        
        return {
            "url": url,
            "content": text[:5000]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to scrape: {str(e)}")

def generate_questions(job_data: dict) -> dict:
    prompt = f"""Analyze this job posting and generate interview questions:

Job Content:
{job_data['content']}

Generate:
1. 5 behavioral questions tailored to this specific role's requirements and work environment
2. 5 technical questions based on the required skills and tech stack

Format as JSON:
{{
  "behavioral": ["question1", "question2", ...],
  "technical": ["question1", "question2", ...]
}}"""

    headers = {
        "Authorization": f"Bearer {os.getenv('NVIDIA_API_KEY')}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "meta/llama-3.1-405b-instruct",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 1500
    }
    
    response = requests.post(
        "https://integrate.api.nvidia.com/v1/chat/completions",
        headers=headers,
        json=payload
    )
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"NVIDIA API error: {response.text}")
    
    result = response.json()
    response_text = result['choices'][0]['message']['content']
    
    if "```json" in response_text:
        response_text = response_text.split("```json")[1].split("```")[0]
    elif "```" in response_text:
        response_text = response_text.split("```")[1].split("```")[0]
    
    questions = json.loads(response_text.strip())
    return questions

@app.post("/generate-interview-prep")
async def create_interview_prep(request: JobRequest):
    job_data = scrape_job_posting(request.job_url)
    questions = generate_questions(job_data)
    
    return {
        "job_url": request.job_url,
        "questions": questions
    }

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)