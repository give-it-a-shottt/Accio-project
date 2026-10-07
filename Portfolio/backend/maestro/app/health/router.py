from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.core.config import Settings, get_settings

router = APIRouter(prefix="/health", tags=["health"])


class HealthResponse(BaseModel):
    status: str
    environment: str
    yumi_mode: str


@router.get("")
async def liveness(
    settings: Annotated[Settings, Depends(get_settings)],
) -> HealthResponse:
    # 발표 직전에 지금 mock 인지 real 인지 확인하는 용도로도 쓴다
    return HealthResponse(
        status="ok", environment=settings.environment, yumi_mode=settings.yumi_mode
    )
