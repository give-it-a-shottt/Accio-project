import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.yumi.deps import get_yumi_client
from app.yumi.mock import MockYumiClient


@pytest.fixture
def client():
    """사장님 답이 0.2초 만에 오는 mock 으로 바꿔 끼운 테스트 클라이언트."""
    yumi = MockYumiClient(answer_delay=0.2)
    app.dependency_overrides[get_yumi_client] = lambda: yumi
    yield TestClient(app)
    app.dependency_overrides.clear()
