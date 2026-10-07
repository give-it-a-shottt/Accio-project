# Maestro API

마에스트로(YUMITHON 2026) 백엔드. 짜둔 일정의 끼니마다 상황 6개별 대안 식당(변주)을 미리 찾아 두고, 헤이유미 API 키를 프론트에 노출하지 않도록 중계한다.

## 실행

```bash
uv sync
cp .env.example .env          # YUMI_MODE=mock 이면 키 없이 동작
uv run fastapi dev app/main.py --port 8001
```

- API 문서: http://localhost:8001/docs
- 상태 확인: http://localhost:8001/health (지금 mock 인지 real 인지도 보여준다)

```bash
uv run pytest        # 테스트
uv run ruff check    # 린트
uv run ruff format   # 포맷
```

## API

| 메서드 | 경로 | 화면 |
| --- | --- | --- |
| GET | `/api/regions?dong=을지로` | 일정 입력 — 동네 고르기 |
| GET | `/api/situations` | 당일 모드 — 상황 타일 6개 |
| POST | `/api/score` | 지휘 시작 — 끼니별 메인 + 상황별 대안 3곳 |
| GET | `/api/places/{id}` | 식당 상세 |
| POST | `/api/places/{id}/live-status` | 실시간 문의 (파트너만, 아니면 422 → 전화 안내) |
| GET | `/api/live-status/{queryId}?wait=10` | 문의 답 기다리기 (pending 이면 다시 묻기) |
| POST | `/api/places/{id}/reservations` | 예약 요청 (파트너만) |
| GET | `/api/reservations/{id}?wait=10` | 예약 확정 기다리기 |

오류는 `{"detail": {"code", "message"}}` 형태다 (`not_found`, `region_not_found`, `live_status_not_available`, `reservation_not_available`).

`POST /api/score` 예시:

```json
{ "meals": [
  { "at": "2026-10-17T12:00", "dong": "을지로", "people": 2 },
  { "at": "2026-10-17T18:00", "dong": "성수", "people": 2, "mainPlaceId": "mock-ss-01" }
] }
```

## 구조

| 경로 | 하는 일 |
| --- | --- |
| `app/core/` | 설정(`YUMI_MODE` 로 mock ↔ real), camelCase 기반 모델, 오류 응답 |
| `app/yumi/client.py` | 유미 클라이언트 인터페이스 — mock 과 real 이 같은 기능을 갖춘다 |
| `app/yumi/real.py` | 헤이유미 REST (키는 헤더로, 같은 검색 10분 캐시, 동시 4개, 429·시간 초과 처리) |
| `app/yumi/mock.py`, `fixtures/` | 키 없이 쓰는 가짜 유미 (을지로·성수 가상 매장 29곳) |
| `app/yumi/filters.py` | 유미 필터를 매장 데이터로 판정 — mock 흉내와 상황별 고르기에 같이 쓴다 |
| `app/situations.py` | 상황 6개 → 매장을 고르는 조건 |
| `app/score/` | 악보 만들기 — 끼니마다 검색 1번, 그 안에서 메인과 상황별 대안 3곳을 고른다 |
| `app/places/`, `app/regions/` | 상세·실시간 문의·예약, 동네 검색 |

## 유미 사용 원칙

- **하루 한도가 70요청이다** (2026-10-07 확인, 429 `Daily quota exceeded`, 자정 무렵 초기화).
  그래서 끼니마다 검색은 한 번만 하고(추천순 100곳, edge 등급), 상황 6개는 그 결과 안에서 고른다.
  악보 1번 = 끼니 수 + 처음 보는 동네 수. 한도를 넘기면 `429 yumi_quota_exceeded` 로 바로 알려준다.
- 개발·테스트는 `YUMI_MODE=mock` 으로 하고, real 은 확인할 때만 켠다. 프론트는 만든 악보를 저장해서 새로고침해도 다시 부르지 않는다.
- **실시간 문의·예약은 실제 사장님께 보내지 않는다.** real 모드에서도 HTTP 를 보내지 않고 흉내 낸 답을 준다(`simulated: true`).
  `tests/test_yumi_real.py::test_owner_calls_never_reach_yumi` 가 이걸 지킨다.

## 실제 응답에서 확인한 것 (2026-10-07)

1. 응답 봉투 `{success, data, meta}` — `data` 만 꺼낸다
2. '을지로'·'성수'는 동이 아니라 상권(`kind: district`, `radiusM`)으로 풀린다 — 코드·동은 빈 값
3. `atmosphere` 는 soft 필터(순위만 올림), 비어 있으면 `null` 로 온다
4. 1만원대 국밥집이 `price.level` 2 — '저렴'은 평균 가격(1만2천원 이하)으로 본다
5. 인기 매장은 `serviceAttributes.waiting_expected: true` — 웨이팅 상황에서 뺀다
6. 검증 배지는 `reputation`(교차검증·최근 활동)과 `legacy`(백년가게)에서 온다
7. 추천순 검색은 10초를 넘기기도 한다 — 시간 제한 20초, 한 번 더 시도
