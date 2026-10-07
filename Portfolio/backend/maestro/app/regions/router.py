from typing import Annotated

from fastapi import APIRouter, Depends, Query

from app.yumi.client import YumiClient
from app.yumi.deps import get_yumi_client
from app.yumi.models import Region

router = APIRouter(prefix="/api/regions", tags=["regions"])


@router.get("")
async def search_regions(
    dong: Annotated[
        str, Query(min_length=1, description="동네 이름 (예: 을지로, 성수)")
    ],
    yumi: Annotated[YumiClient, Depends(get_yumi_client)],
) -> list[Region]:
    """일정 입력에서 동네를 고를 때 쓴다. 이름이 겹치면 후보가 여러 개 온다."""
    return await yumi.resolve_region(dong)
