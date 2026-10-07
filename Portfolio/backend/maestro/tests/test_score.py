PLAN = {
    "meals": [
        {"at": "2026-10-17T12:00", "dong": "을지로", "people": 2},
        {"at": "2026-10-17T18:00", "dong": "성수", "people": 2},
    ]
}


def test_score_prepares_three_places_per_situation(client):
    response = client.post("/api/score", json=PLAN)

    assert response.status_code == 200
    score = response.json()
    assert [s["key"] for s in score["situations"]] == [
        "stuffy",
        "rain",
        "mood",
        "waiting",
        "budget",
        "tired",
    ]
    for meal in score["meals"]:
        assert meal["main"] is not None
        for places in meal["variations"].values():
            assert len(places) == 3
            ids = {p["id"] for p in places}
            # 메인 식당은 대안에 다시 나오지 않는다
            assert meal["main"]["id"] not in ids
            # 폐업 신호가 있는 곳은 빠진다
            assert not any(p["possiblyClosed"] for p in places)


def test_score_uses_the_chosen_main_place(client):
    plan = {
        "meals": [
            {"at": "2026-10-17T18:00", "dong": "성수", "mainPlaceId": "mock-ss-01"}
        ]
    }

    [meal] = client.post("/api/score", json=plan).json()["meals"]

    assert meal["main"]["name"] == "성수 해담화로"
    assert meal["people"] == 2  # 인원을 비우면 2명


def test_score_picks_the_region_with_places(client):
    # '성수'는 성수1가1동·성수2가1동 두 곳이 나오는데, 매장이 있는 쪽을 고른다
    [meal] = client.post("/api/score", json=PLAN).json()["meals"][1:]

    assert meal["region"]["dong"] == "성수1가1동"


def test_unknown_neighborhood_is_explained(client):
    plan = {"meals": [{"at": "2026-10-17T12:00", "dong": "부산"}]}

    response = client.post("/api/score", json=plan)

    assert response.status_code == 422
    assert response.json()["detail"]["code"] == "region_not_found"


def test_unknown_main_place_is_404(client):
    plan = {
        "meals": [{"at": "2026-10-17T12:00", "dong": "을지로", "mainPlaceId": "nope"}]
    }

    assert client.post("/api/score", json=plan).status_code == 404


def test_plan_needs_at_least_one_meal(client):
    assert client.post("/api/score", json={"meals": []}).status_code == 422


def test_daily_quota_is_explained(client):
    from app.main import app
    from app.yumi.client import YumiError
    from app.yumi.deps import get_yumi_client
    from app.yumi.mock import MockYumiClient

    class OutOfQuota(MockYumiClient):
        async def search_nearby(self, query):
            raise YumiError(429, "Daily quota exceeded")

    app.dependency_overrides[get_yumi_client] = OutOfQuota

    response = client.post("/api/score", json=PLAN)

    assert response.status_code == 429
    assert response.json()["detail"]["code"] == "yumi_quota_exceeded"


def test_score_asks_yumi_once_per_meal(client):
    from app.main import app
    from app.yumi.deps import get_yumi_client
    from app.yumi.mock import MockYumiClient

    class Counting(MockYumiClient):
        searches = 0

        async def search_nearby(self, query):
            Counting.searches += 1
            return await super().search_nearby(query)

    app.dependency_overrides[get_yumi_client] = Counting

    client.post("/api/score", json=PLAN)

    assert Counting.searches == len(PLAN["meals"])
