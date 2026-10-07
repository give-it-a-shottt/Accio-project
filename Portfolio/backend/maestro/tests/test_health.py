from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_liveness_reports_mode():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "environment": "local",
        "yumi_mode": "mock",
    }
