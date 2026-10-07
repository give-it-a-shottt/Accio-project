import gukbapPhoto from './assets/photo-gukbap.jpg'
import jukPhoto from './assets/photo-juk.jpg'
import lightMealPhoto from './assets/photo-light-meal.jpg'
import type { MealKind, Place, Score } from './types'

const WEEKDAY_KO = ['일', '월', '화', '수', '목', '금', '토']
const WEEKDAY_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

function toDate(date: string) {
  // '2026-10-17' 을 현지 날짜로 (UTC 로 읽으면 하루 어긋날 수 있다)
  const [y, m, d] = date.slice(0, 10).split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** '토' */
export function weekdayKo(date: string) {
  return WEEKDAY_KO[toDate(date).getDay()]
}

/** 'SCORE · 10.17 SAT' 의 '10.17 SAT' */
export function scoreDate(date: string) {
  const day = toDate(date)
  const mm = String(day.getMonth() + 1).padStart(2, '0')
  const dd = String(day.getDate()).padStart(2, '0')
  return `${mm}.${dd} ${WEEKDAY_EN[day.getDay()]}`
}

/** 'Op. 1017' — 일정 날짜로 붙이는 작품 번호 */
export function opusNumber(date: string) {
  return `Op. ${scoreDate(date).slice(0, 5).replace('.', '')}`
}

/** '10.17' */
export function shortDate(date: string) {
  return scoreDate(date).slice(0, 5)
}

export const KIND_LABEL: Record<MealKind, string> = {
  breakfast: 'BREAKFAST',
  lunch: 'LUNCH',
  cafe: 'CAFE',
  dinner: 'DINNER',
  late_night: 'LATE NIGHT',
}

/** '1만원대' */
export function priceBand(place: Place) {
  const avg = place.price?.avg
  if (!avg) return null
  if (avg < 10_000) return '1만원 미만'
  return `${Math.floor(avg / 10_000)}만원대`
}

/** 검색 중심에서 걸어서 몇 분 (분속 70m) */
export function walkText(place: Place) {
  if (place.distanceM == null) return null
  return `도보 ${Math.max(1, Math.round(place.distanceM / 70))}분`
}

export function openText(place: Place) {
  const open = place.openNow?.open
  if (open === true) return '영업 중'
  if (open === false) return '지금은 영업 전'
  return null
}

/** 그날 마감 시각 (영업시간이 없으면 null) */
export function closingTime(place: Place, date: string) {
  const day = DAY_KEYS[toDate(date).getDay()]
  const hours = place.businessHours.find((h) => h.day === day)
  if (!hours) return null
  if (hours.closed) return '휴무'
  return hours.close ? `${hours.close} 마감` : null
}

export function parkingText(place: Place) {
  const attrs = place.serviceAttributes
  if (attrs.parking === false) return '불가'
  if (attrs.parking !== true) return '정보 없음'
  const types: Record<string, string> = { onsite: '가능', valet: '발렛 가능', partner: '제휴 주차', nearby: '근처 주차장' }
  return types[String(attrs.parking_type)] ?? '가능'
}

export function stationText(place: Place) {
  const station = place.nearestStation
  return station ? `${station.station}역 도보 ${station.walkMin}분` : null
}

/** '국밥 · 1만원대 · 도보 4분 · 영업 중' 처럼 있는 정보만 이어 붙인다 */
export function joinInfo(...parts: (string | null | undefined)[]) {
  return parts.filter(Boolean).join(' · ')
}

/** 검증 배지 — 유미 reputation·legacy 근거가 있을 때만 붙인다 */
export function trustBadges(place: Place) {
  const badges: string[] = []
  if (place.legacy) badges.push('노포')
  if (place.reputation?.crossSourceConfirmed) badges.push('교차검증')
  if (place.reputation?.recentlyActive) badges.push('최근 활동')
  return badges
}

export function waitingExpected(place: Place) {
  return place.serviceAttributes.waiting_expected === true
}

// 실제 매장 사진은 유미 media 등급(8토큰)이라 받지 않는다 — 음식 종류에 맞는 예시 사진을 쓴다
export function examplePhoto(place: Place | null) {
  if (!place) return lightMealPhoto
  const text = [place.name, place.categoryLabel, ...(place.menuSummary?.items ?? [])].join(' ')
  if (/죽|샐러드|포케|비건|차$|찻집/.test(text)) return jukPhoto
  const subtype = String(place.serviceAttributes.venue_subtype ?? '')
  if (['gukbap_soup', 'noodles', 'jjigae', 'korean', 'korean_bbq'].includes(subtype)) return gukbapPhoto
  return lightMealPhoto
}

/** 지금 연주 중인 끼니 — 아직 끝나지 않은(시작 90분 안) 첫 끼니, 다 지났으면 마지막 */
export function currentMealIndex(score: Score) {
  const now = Date.now()
  const index = score.meals.findIndex((meal) => now < new Date(meal.at).getTime() + 90 * 60_000)
  return index === -1 ? score.meals.length - 1 : index
}

