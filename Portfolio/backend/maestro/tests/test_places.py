from app.yumi.mock import _load

PLACES = _load("places.json")
PARTNER = next(p["id"] for p in PLACES if p["yumiReservable"])
NOT_PARTNER = next(p["id"] for p in PLACES if not p["yumiReservable"])


def test_place_detail(client):
    response = client.get(f"/api/places/{PARTNER}")

    assert response.status_code == 200
    assert response.json()["reservationChannels"][0] == "yumi"


def test_missing_place_is_404(client):
    response = client.get("/api/places/nope")

    assert response.status_code == 404
    assert response.json()["detail"]["code"] == "not_found"


def test_live_status_waits_for_the_owner(client):
    asked = client.post(
        f"/api/places/{PARTNER}/live-status", json={"kind": "wait", "topic": "wait"}
    ).json()
    assert asked["status"] == "pending"

    answered = client.get(f"/api/live-status/{asked['queryId']}", params={"wait": 1})

    assert answered.json()["status"] == "limited"
    assert answered.json()["note"]


def test_live_status_reuses_a_fresh_answer(client):
    ask = {"kind": "wait", "topic": "wait"}
    first = client.post(f"/api/places/{PARTNER}/live-status", json=ask).json()
    client.get(f"/api/live-status/{first['queryId']}", params={"wait": 1})

    again = client.post(f"/api/places/{PARTNER}/live-status", json=ask).json()

    assert again["reused"] is True
    assert again["status"] == "limited"


def test_non_partner_is_phone_only(client):
    response = client.post(
        f"/api/places/{NOT_PARTNER}/live-status", json={"kind": "wait", "topic": "wait"}
    )

    assert response.status_code == 422
    assert response.json()["detail"]["code"] == "live_status_not_available"


def test_reservation_gets_confirmed(client):
    booked = client.post(
        f"/api/places/{PARTNER}/reservations",
        json={
            "reservationTime": "2026-10-17T18:00:00+09:00",
            "guestCount": 2,
            "guestPhone": "010-0000-0000",
        },
    ).json()
    assert booked["status"] == "pending"

    settled = client.get(
        f"/api/reservations/{booked['reservationId']}", params={"wait": 1}
    )

    assert settled.json()["status"] == "confirmed"


def test_reservation_at_non_partner_is_refused(client):
    response = client.post(
        f"/api/places/{NOT_PARTNER}/reservations",
        json={
            "reservationTime": "2026-10-17T18:00:00+09:00",
            "guestCount": 2,
            "guestPhone": "010-0000-0000",
        },
    )

    assert response.json()["detail"]["code"] == "reservation_not_available"
