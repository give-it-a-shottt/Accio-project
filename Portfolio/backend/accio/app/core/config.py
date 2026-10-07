from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Accio API"
    environment: Literal["local", "production"] = "local"
    cors_origins: list[str] = ["http://localhost:5173"]
    database_url: str


@lru_cache
def get_settings() -> Settings:
    return Settings()
