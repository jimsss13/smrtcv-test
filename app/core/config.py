from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "smrtcv-backend"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"

    # Cosmos DB
    COSMOS_DB_URL: str
    COSMOS_DB_KEY: str
    COSMOS_DB_NAME: str
    COSMOS_DB_CONTAINER: str

    # OpenAI
    OPENAI_API_KEY: str
    OPENAI_MODEL: str

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS
    BACKEND_CORS_ORIGINS: List[str]

    # Azure Face API
    AZURE_FACE_ENDPOINT: str
    AZURE_FACE_KEY: str

    # Azure AI Content Safety
    AZURE_CONTENT_SAFETY_ENDPOINT: str
    AZURE_CONTENT_SAFETY_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
