from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/xiyou_tiancheng"
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    class Config:
        env_file = ".env"

settings = Settings()
