import { useSyncExternalStore } from 'react'
import type { Score } from './types'

/** 일정 입력의 끼니 한 줄 — '토 12:00 · 을지로 · 2명' */
export interface PlanMeal {
  id: string
  date: string // 2026-10-17
  time: string // 12:00
  dong: string
  people: number
}

interface MaestroState {
  meals: PlanMeal[]
  score: Score | null
}

const STORAGE_KEY = 'maestro-plan-v1'
// 해커톤 날(10.17 토) 을지로 → 성수 — 피그마 시안의 예시 일정
const SAMPLE_MEALS: PlanMeal[] = [
  { id: 'm1', date: '2026-10-17', time: '12:00', dong: '을지로', people: 2 },
  { id: 'm2', date: '2026-10-17', time: '15:30', dong: '을지로', people: 2 },
  { id: 'm3', date: '2026-10-17', time: '18:00', dong: '성수', people: 2 },
]

// 만든 악보를 저장해 두면 새로고침해도 유미를 다시 부르지 않는다(하루 한도가 작다).
// 저장소를 못 쓰는 환경이면 이번 방문 동안만 기억한다.
function load(): MaestroState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as MaestroState
  } catch {
    // 저장소를 못 쓰면 예시 일정으로 시작한다
  }
  return { meals: SAMPLE_MEALS, score: null }
}

let state = load()
const listeners = new Set<() => void>()

function update(next: Partial<MaestroState>) {
  state = { ...state, ...next }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // 저장하지 못해도 화면은 그대로 쓸 수 있다
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useMaestro() {
  return useSyncExternalStore(subscribe, () => state)
}

/** 끼니를 시간순으로 둔다 */
function sorted(meals: PlanMeal[]) {
  return [...meals].sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
}

export function saveMeal(meal: PlanMeal) {
  const others = state.meals.filter((m) => m.id !== meal.id)
  // 일정이 바뀌면 예전 악보는 맞지 않으니 비운다
  update({ meals: sorted([...others, meal]), score: null })
}

export function removeMeal(id: string) {
  update({ meals: state.meals.filter((m) => m.id !== id), score: null })
}

export function saveScore(score: Score) {
  update({ score })
}

export function newMealId() {
  return `m${Date.now().toString(36)}`
}
