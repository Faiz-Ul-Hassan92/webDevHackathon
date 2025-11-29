import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Career AI Platform"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "YOUR_SUPER_SECRET_KEY_HERE"
    
    # External APIs
    GROQ_API_KEY: str  # Changed from OPENAI_API_KEY
    
    # Database (Supabase)
    SUPABASE_URL: str
    SUPABASE_KEY: str

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()