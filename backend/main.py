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

class AnswerRequest(BaseModel):
    question: str
    answer: str
    question_type: str

def scrape_job_posting(url: str) -> dict:
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        text = soup.get_text(separator='\n', strip=True)
        
        return {"url": url, "content": text[:5000]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to scrape: {str(e)}")

def call_nvidia_api(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {os.getenv('NVIDIA_API_KEY')}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "meta/llama-3.1-405b-instruct",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 2000
    }
    
    response = requests.post(
        "https://integrate.api.nvidia.com/v1/chat/completions",
        headers=headers,
        json=payload
    )
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"API error: {response.text}")
    
    return response.json()['choices'][0]['message']['content']

@app.post("/generate-interview-prep")
async def create_interview_prep(request: JobRequest):
    job_data = scrape_job_posting(request.job_url)
    
    # Generate questions
    questions_prompt = f"""Job Content: {job_data['content']}

Generate 5 behavioral and 5 technical questions. Format as JSON:
{{"behavioral": ["q1", "q2", ...], "technical": ["q1", "q2", ...]}}"""
    
    questions_text = call_nvidia_api(questions_prompt)
    
    if "```json" in questions_text:
        questions_text = questions_text.split("```json")[1].split("```")[0]
    elif "```" in questions_text:
        questions_text = questions_text.split("```")[1].split("```")[0]
    
    questions = json.loads(questions_text.strip())
    
    # Generate job summary
    summary_prompt = f"""Job Content: {job_data['content']}

Provide a brief summary (2-3 sentences) of:
1. Company description
2. Job role and key responsibilities

Format as JSON:
{{"company": "...", "role": "..."}}"""
    
    summary_text = call_nvidia_api(summary_prompt)
    
    if "```json" in summary_text:
        summary_text = summary_text.split("```json")[1].split("```")[0]
    elif "```" in summary_text:
        summary_text = summary_text.split("```")[1].split("```")[0]
    
    summary = json.loads(summary_text.strip())
    
    return {
        "job_url": request.job_url,
        "summary": summary,
        "questions": questions
    }

@app.post("/evaluate-answer")
async def evaluate_answer(request: AnswerRequest):
    prompt = f"""As an experienced interviewer, evaluate this {request.question_type} interview answer.

Question: {request.question}
Candidate's Answer: {request.answer}

Provide a score out of 10 and brief feedback (2-3 sentences). You must provide a score, dont return question mark

You MUST respond with ONLY valid JSON in this exact format:
{{"score": 8, "feedback": "Your feedback here"}}

Do not include any text before or after the JSON."""
    
    result_text = call_nvidia_api(prompt)
    
    # More aggressive JSON extraction
    result_text = result_text.strip()
    if "```json" in result_text:
        result_text = result_text.split("```json")[1].split("```")[0].strip()
    elif "```" in result_text:
        result_text = result_text.split("```")[1].split("```")[0].strip()
    
    # Find JSON object in response
    start = result_text.find('{')
    end = result_text.rfind('}') + 1
    if start != -1 and end > start:
        result_text = result_text[start:end]
    
    try:
        result = json.loads(result_text)
        return result
    except json.JSONDecodeError as e:
        print(f"Failed to parse: {result_text}")
        raise HTTPException(status_code=500, detail=f"Invalid JSON from API: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "ok"}



class BatchAnswerRequest(BaseModel):
    answers: list[dict]  # [{"question": "...", "answer": "...", "type": "..."}]

@app.post("/evaluate-batch")
async def evaluate_batch(request: BatchAnswerRequest):
    # Format all Q&A pairs
    qa_text = ""
    for i, item in enumerate(request.answers, 1):
        qa_text += f"\n{i}. [{item['type'].upper()}] {item['question']}\nAnswer: {item['answer']}\n"
    
    prompt = f"""You are an experienced interviewer evaluating 10 interview answers. Score each answer 1-10 and provide brief feedback.

{qa_text}

Respond with ONLY this JSON array (no other text):
[
  {{"score": 8, "feedback": "Brief feedback here"}},
  {{"score": 7, "feedback": "Brief feedback here"}},
  ...
]"""
    
    result_text = call_nvidia_api(prompt)
    
    # Extract JSON array
    result_text = result_text.strip()
    if "```json" in result_text:
        result_text = result_text.split("```json")[1].split("```")[0].strip()
    elif "```" in result_text:
        result_text = result_text.split("```")[1].split("```")[0].strip()
    
    start = result_text.find('[')
    end = result_text.rfind(']') + 1
    if start != -1 and end > start:
        result_text = result_text[start:end]
    
    try:
        results = json.loads(result_text)
        return {"evaluations": results}
    except json.JSONDecodeError as e:
        print(f"Failed to parse: {result_text}")
        raise HTTPException(status_code=500, detail=f"Invalid JSON: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)