import asyncio

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.yumi.client import NearbyQuery, PlaceNotFound
from app.yumi.mock import MockYumiClient

EULJIRO = {"lat": 37.5663, "lng": 126.9917}
yumi = MockYumiClient()


def search(**kwargs):
    return asyncio.run(yumi.search_nearby(NearbyQuery(**EULJIRO, **kwargs)))


def test_resolve_region_returns_every_candidate():
    regions = asyncio.run(yumi.resolve_region("성수"))

    assert [r.dong for r in regions] == ["성수1가1동", "성수2가1동"]


def test_nearby_stays_within_radius_nearest_first():
    places = search(radius=200)

    distances = [p.distance_m for p in places]
    assert places and all(d <= 200 for d in distances)
    assert distances == sorted(distances)


def test_nearby_filters_like_yumi():
    places = search(filters={"atmosphere": "quiet", "reservable": True})

    assert places
    assert all("quiet" in p.atmosphere for p in places)
    assert all(p.service_attributes["reservable"] for p in places)


def test_open_at_hides_closed_places():
    ids = {p.id for p in search(filters={"open_at": "now"})}

    assert "mock-ej-11" not in ids  # 정기 휴무인 냉면집


def test_unknown_filter_is_reported():
    with pytest.raises(ValueError, match="모르는 필터"):
        search(filters={"atmospher": "quiet"})


def test_get_place_raises_when_missing():
    with pytest.raises(PlaceNotFound):
        asyncio.run(yumi.get_place("no-such-place"))


def test_regions_endpoint_returns_camel_case():
    response = TestClient(app).get("/api/regions", params={"dong": "을지로"})

    assert response.status_code == 200
    [region] = response.json()
    assert region["fullName"] == "서울특별시 중구 을지로동"
    assert region["center"] == EULJIRO
