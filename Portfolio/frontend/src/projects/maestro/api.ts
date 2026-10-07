import type { LiveStatus, Place, Score } from './types'

// 유미 API 키는 백엔드에만 있다. 프론트는 마에스트로 백엔드만 부른다.
const API_URL: string = import.meta.env.VITE_MAESTRO_API_URL ?? 'http://localhost:8001'

export class ApiError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.code = code
  }
}

// 무료 서버(Render)는 15분 동안 요청이 없으면 잠들고, 다음 첫 요청에 깨어나는 데 1분쯤 걸린다.
// 첫 응답을 받기 전에 요청이 늦어지면 'waking' 으로 바꿔 화면에 안내를 띄운다.
// 한 번 응답을 받은 뒤의 느린 요청(유미 검색 등)은 서버가 잠든 게 아니라서 안내하지 않는다.
export type ServerState = 'unknown' | 'waking' | 'awake'
const WAKE_HINT_MS = 2500
let serverState: ServerState = 'unknown'
const serverListeners = new Set<() => void>()

function setServerState(next: ServerState) {
  if (serverState === next) return
  serverState = next
  serverListeners.forEach((listener) => listener())
}

export function subscribeServerState(listener: () => void) {
  serverListeners.add(listener)
  return () => serverListeners.delete(listener)
}

export function getServerState() {
  return serverState
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  const hint =
    serverState === 'awake' ? undefined : setTimeout(() => serverState !== 'awake' && setServerState('waking'), WAKE_HINT_MS)
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    })
  } catch {
    if (serverState === 'waking') setServerState('unknown')
    throw new ApiError('offline', '서버에 연결하지 못했어요. 마에스트로 백엔드가 켜져 있는지 확인해 주세요.')
  } finally {
    clearTimeout(hint)
  }
  setServerState('awake')
  if (!response.ok) {
    // 백엔드 오류는 {"detail": {"code", "message"}} 모양이다
    const body = await response.json().catch(() => null)
    const detail = body?.detail
    if (detail?.code) throw new ApiError(detail.code, detail.message)
    throw new ApiError('unknown', '잠시 후 다시 시도해 주세요.')
  }
  return response.json() as Promise<T>
}

/** 서버를 미리 깨운다 — 사용자가 일정을 고르는 동안 깨어나도록 마에스트로에 들어오자마자 부른다 */
let waking: Promise<unknown> | null = null
export function wakeServer() {
  if (serverState === 'awake' || waking) return
  waking = request('/health')
    .catch(() => {})
    .finally(() => {
      waking = null
    })
}

export interface MealRequest {
  at: string // 2026-10-17T12:00
  dong: string
  people: number
  mainPlaceId?: string
}

/** 지휘 시작 — 끼니별 메인과 상황별 대안을 한 번에 만든다 */
export function createScore(meals: MealRequest[]) {
  return request<Score>('/api/score', { method: 'POST', body: JSON.stringify({ meals }) })
}

export function getPlace(id: string) {
  return request<Place>(`/api/places/${encodeURIComponent(id)}`)
}

/** 실시간 문의 — 백엔드는 실제 사장님께 보내지 않고 체험용으로 답한다(simulated) */
export function askWaitTime(placeId: string) {
  return request<LiveStatus>(`/api/places/${encodeURIComponent(placeId)}/live-status`, {
    method: 'POST',
    body: JSON.stringify({ kind: 'wait', topic: 'wait', question: '지금 웨이팅 얼마나 돼요?' }),
  })
}

export function waitForAnswer(queryId: string) {
  return request<LiveStatus>(`/api/live-status/${encodeURIComponent(queryId)}?wait=10`)
}
