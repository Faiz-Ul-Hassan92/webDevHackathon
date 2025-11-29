from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import resume

app = FastAPI(title=settings.PROJECT_NAME)

# CORS (Allows Next.js on localhost:3000 to talk to Python on localhost:8000)
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(resume.router, prefix="/api/v1/resume", tags=["Resume"])

@app.get("/")
def root():
    return {"message": "Career AI API is running"}

# Run this if executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)