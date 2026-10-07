// 마에스트로 백엔드(Portfolio/backend/maestro) 응답 모양 — camelCase 로 온다

export type SituationKey = 'stuffy' | 'rain' | 'mood' | 'waiting' | 'budget' | 'tired'
export type MealKind = 'breakfast' | 'lunch' | 'cafe' | 'dinner' | 'late_night'

export interface Situation {
  key: SituationKey
  emoji: string
  label: string
  reason: string
}

export interface BusinessHours {
  day: string // mon … sun
  open: string | null
  close: string | null
  closed: boolean
}

export interface Place {
  id: string
  name: string
  categoryLabel: string | null
  location: { lat: number; lng: number }
  address: { road: string | null } | null
  distanceM: number | null
  phone: string | null
  yumiReservable: boolean
  businessHours: BusinessHours[]
  openNow: { open: boolean | null } | null
  price: { level: number | null; avg: number | null } | null
  menuSummary: { count: number; items: string[] } | null
  nearestStation: { station: string; walkMin: number } | null
  serviceAttributes: Record<string, unknown>
  atmosphere: string[]
  aiSummary: string | null
  reputation: { crossSourceConfirmed: boolean; recentlyActive: boolean; regularsFavorite: boolean } | null
  legacy: unknown
}

export interface MealScore {
  at: string // 2026-10-17T12:00:00
  kind: MealKind
  dong: string
  people: number
  main: Place | null
  variations: Record<SituationKey, Place[]>
}

export interface Score {
  situations: Situation[]
  meals: MealScore[]
}

export interface LiveStatus {
  queryId: string
  status: string // pending → available / limited / unavailable / soon / not_offered / no_response
  note: string | null
  simulated: boolean
}
