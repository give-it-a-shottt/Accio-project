from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # .env 파일과 환경변수에서 값을 읽는다. 환경변수 이름은 필드 이름의 대문자(YUMI_MODE 등)
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Maestro API"
    environment: Literal["local", "production"] = "local"
    # 배포하면 프론트 주소(Vercel 도메인)를 여기에 더한다
    cors_origins: list[str] = ["http://localhost:5173"]

    # mock: fixtures/*.json 으로 응답 (키 없이 개발·발표 백업) / real: 헤이유미 API 호출
    yumi_mode: Literal["mock", "real"] = "mock"
    yumi_api_key: str = ""
    yumi_base_url: str = "https://api.heyyumi.ai"


@lru_cache
def get_settings() -> Settings:
    return Settings()
