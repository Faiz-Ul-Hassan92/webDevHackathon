Collaborators: 
(1) Faiz Ul Hassan 92
(2) Malik-Ali-Awan
(3) mAhsan 
(4) M Hamza nadeem


# 🚀 Career AI Platform

A sophisticated career preparation platform that uses **Next.js**, **FastAPI**, and **Generative AI (Llama 3.3 via Groq)** to analyze resumes and provide intelligent insights.

> **Current Status:** Phase 1 Complete (AI Resume Parsing & Profiling)

## ✨ Features Implemented

*   **📄 Smart PDF Upload:** Drag-and-drop interface for PDF resumes.
*   **🧠 AI Resume Analysis:** Uses `llama-3.3-70b-versatile` to read complex resume layouts.
*   **💎 Structured Data Extraction:** Automatically converts raw text into a strict JSON schema:
    *   Personal Info & Social Links (GitHub, LinkedIn).
    *   Skills & Tech Stack.
    *   Work Experience (Company, Role, Dates, Details).
    *   Education & Projects.
    *   Calculated Years of Experience.
*   **📊 Interactive Dashboard:** Visualizes the extracted profile with a clean, modern UI.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React

### Backend
*   **Framework:** FastAPI
*   **Language:** Python 3.10+
*   **AI Orchestration:** LangChain
*   **LLM Provider:** Groq (Llama 3.3)
*   **Validation:** Pydantic

---

## ⚙️ Setup & Installation

### 1. Prerequisites
*   Node.js (v18+)
*   Python (v3.10+)
*   A free API Key from [Groq Console](https://console.groq.com)
*   A [Supabase](https://supabase.com) project (for future DB features)

### 2. Backend Setup (The Brain)

Navigate to the backend folder:
```bash
cd backend



Create a virtual environment (optional but recommended):
code
Bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
Install dependencies:
code
Bash
pip install -r requirements.txt
Create a .env file in backend/.env:
code
Ini
GROQ_API_KEY=gsk_your_groq_api_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SECRET_KEY=any_secret_string
Run the Server:
code
Bash
uvicorn main:app --reload
Server runs on: http://localhost:8000
3. Frontend Setup (The UI)
Open a new terminal and navigate to the frontend folder:
code
Bash
cd frontend
Install dependencies:
code
Bash
npm install
Run the Development Server:
code
Bash
npm run dev
App runs on: http://localhost:3000
🚀 How to Use
Ensure both Backend (port 8000) and Frontend (port 3000) are running.
Open your browser to http://localhost:3000/dashboard/resume.
Upload a PDF Resume.
Wait for the AI to process (usually 3-5 seconds).
View your detailed AI Profile.
📂 Project Structure
code
Text
career-ai-platform/
├── backend/
│   ├── app/
│   │   ├── api/        # Endpoints (resume.py)
│   │   ├── services/   # Logic (pdf_parser.py)
│   │   ├── schemas/    # Data Models (resume_schema.py)
│   │   └── core/       # Config
│   └── main.py         # Entry Point
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   └── dashboard/resume/  # The Result Page
    │   ├── components/features/   # ResumeUploader.tsx
    │   └── types/                 # TypeScript Interfaces
    └── public/