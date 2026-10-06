from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_liveness_returns_ok():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "environment": "local"}


def test_readiness_checks_database():
    response = client.get("/health/db")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"
