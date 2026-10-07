import { useEffect, useRef, useState } from 'react'
import { ApiError, askWaitTime, getPlace, waitForAnswer } from '../api'
import { BRAND_BUTTON_BASE, PartnerTag, PlacePhoto, Screen, Tag } from '../components'
import { closingTime, joinInfo, openText, parkingText, priceBand, stationText, trustBadges } from '../format'
import { maestroHref } from '../routes'
import { useMaestro } from '../store'
import type { LiveStatus, Place, Score, SituationKey } from '../types'

/** 악보에 이미 받아 둔 매장이면 그걸 쓴다 — 유미를 다시 부르지 않는다 */
function findInScore(score: Score | null, id: string, mealIndex: number, situation: SituationKey | null) {
  const meal = score?.meals[mealIndex]
  if (!meal) return null
  if (meal.main?.id === id) return meal.main
  const lists = situation ? [meal.variations[situation]] : Object.values(meal.variations)
  return lists.flat().find((place) => place?.id === id) ?? null
}

const ANSWER_TEXT: Record<string, string> = {
  available: '지금 바로 가능해요',
  limited: '조금 기다려야 해요',
  unavailable: '지금은 어려워요',
  soon: '곧 가능해요',
  not_offered: '이 매장은 그 서비스를 하지 않아요',
  no_response: '사장님이 5분 안에 답하지 않았어요',
}

type Inquiry =
  | { state: 'idle' }
  | { state: 'asking' }
  | { state: 'answered'; answer: LiveStatus }
  | { state: 'failed'; message: string }

interface PlaceScreenProps {
  id: string
  params: URLSearchParams
}

// 피그마 식당 상세(7:2014)
export default function PlaceScreen({ id, params }: PlaceScreenProps) {
  const { score } = useMaestro()
  const mealIndex = Number(params.get('meal') ?? 0)
  const situationKey = params.get('s') as SituationKey | null
  const number = params.get('n')
  const inScore = findInScore(score, id, mealIndex, situationKey)
  const [fetched, setFetched] = useState<{ id: string; place: Place | null; error?: string } | null>(null)
  const place = inScore ?? (fetched?.id === id ? fetched.place : null)

  // 악보에 없는 매장(주소로 바로 들어온 경우)만 백엔드에서 받는다
  useEffect(() => {
    if (inScore) return
    let cancelled = false
    getPlace(id)
      .then((result) => !cancelled && setFetched({ id, place: result }))
      .catch((e: unknown) => {
        if (!cancelled) setFetched({ id, place: null, error: e instanceof ApiError ? e.message : '매장을 불러오지 못했어요.' })
      })
    return () => {
      cancelled = true
    }
  }, [id, inScore])

  const meal = score?.meals[mealIndex]
  const situation = score?.situations.find((s) => s.key === situationKey)
  const backHref = maestroHref('/live', { meal: mealIndex, s: situationKey ?? undefined })

  if (!place) {
    return (
      <Screen className="gap-4 px-5 pt-5">
        <a href={backHref} aria-label="뒤로" className="flex size-9 items-center justify-center text-[22px] leading-none text-main">
          ‹
        </a>
        <p role={fetched?.error ? 'alert' : 'status'} className="text-14 text-sub">
          {fetched?.error ?? '매장 정보를 불러오는 중이에요…'}
        </p>
      </Screen>
    )
  }

  const label = situation
    ? `VARIATION ${String(number ?? 1).padStart(2, '0')} · ${situation.label}`
    : `MAIN · ${meal ? `${meal.at.slice(11, 16)} ${meal.dong}` : ''}`
  const menu = place.menuSummary?.items[0]
  const rows: [string, string | null][] = [
    ['메뉴 · 가격대', joinInfo(menu, priceBand(place)) || null],
    ['영업시간', joinInfo(openText(place), meal ? closingTime(place, meal.at) : null) || null],
    ['주차', parkingText(place)],
    ['가까운 역', stationText(place)],
  ]
  const badges = trustBadges(place)

  return (
    <Screen>
      <div className="relative">
        <PlacePhoto place={place} className="h-[282px] w-full" />
        <a
          href={backHref}
          aria-label="뒤로"
          className="absolute top-[30px] left-3 flex size-9 items-center justify-center rounded-full bg-white text-[22px] leading-none text-main"
        >
          ‹
        </a>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 pt-[18px]">
        <div className="flex flex-col gap-2">
          <p className="text-11 text-sub">{label}</p>
          <h1 className="text-24 font-semibold text-main">{place.name}</h1>
          <div className="flex flex-wrap gap-1.5">
            {place.yumiReservable ? <PartnerTag /> : <Tag>📞 전화만 가능</Tag>}
            {badges.map((badge) => (
              <Tag key={badge}>{badge}</Tag>
            ))}
          </div>
        </div>

        {place.aiSummary && (
          <blockquote className="flex gap-3">
            <span aria-hidden="true" className="w-0.5 shrink-0 self-stretch bg-[#505050]" />
            <p className="font-maestro-quote text-14 leading-[1.7] tracking-normal text-sub">“{place.aiSummary}”</p>
          </blockquote>
        )}

        <dl className="flex flex-col rounded-card bg-light px-4">
          {rows.map(([term, value], index) => (
            <div
              key={term}
              className={`flex items-start justify-between gap-4 py-3 text-13 font-medium ${index < rows.length - 1 ? 'border-b border-white' : ''}`}
            >
              <dt className="shrink-0 text-main">{term}</dt>
              <dd className="text-right text-sub">{value ?? '정보 없음'}</dd>
            </div>
          ))}
        </dl>

        <PlaceActions place={place} />
      </div>
    </Screen>
  )
}

function PlaceActions({ place }: { place: Place }) {
  const [inquiry, setInquiry] = useState<Inquiry>({ state: 'idle' })
  const alive = useRef(true)
  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
    }
  }, [])

  // 실시간 문의 — 사장님 답이 올 때까지(최대 약 5분) 몇 번 나눠 기다린다
  const ask = async () => {
    setInquiry({ state: 'asking' })
    try {
      let answer = await askWaitTime(place.id)
      for (let tries = 0; answer.status === 'pending' && tries < 30 && alive.current; tries += 1) {
        answer = await waitForAnswer(answer.queryId)
      }
      if (alive.current) setInquiry({ state: 'answered', answer })
    } catch (e) {
      if (alive.current) setInquiry({ state: 'failed', message: e instanceof ApiError ? e.message : '문의를 보내지 못했어요.' })
    }
  }

  const directions = `https://map.kakao.com/link/to/${encodeURIComponent(place.name)},${place.location.lat},${place.location.lng}`

  return (
    <div className="sticky bottom-0 mt-auto flex flex-col gap-3 bg-white pt-3 pb-[34px]">
      {inquiry.state !== 'idle' && (
        <div role="status" className="rounded-card-sm bg-light px-4 py-3 text-13 break-keep text-main">
          {inquiry.state === 'asking' && '사장님께 지금 웨이팅을 묻는 중이에요…'}
          {inquiry.state === 'failed' && inquiry.message}
          {inquiry.state === 'answered' && (
            <>
              <p className="font-semibold">
                {ANSWER_TEXT[inquiry.answer.status] ?? inquiry.answer.status}
                {inquiry.answer.note && ` · ${inquiry.answer.note}`}
              </p>
              {inquiry.answer.simulated && (
                <p className="mt-1 text-12 text-sub">체험용 답변이에요. 실제 매장에는 보내지 않았어요.</p>
              )}
            </>
          )}
        </div>
      )}
      <div className="flex gap-2">
        <a
          href={directions}
          target="_blank"
          rel="noreferrer"
          className="flex h-14 w-[137px] shrink-0 items-center justify-center rounded-card-sm border border-black bg-white text-14 font-semibold text-main"
        >
          길찾기
        </a>
        {place.yumiReservable ? (
          <button
            type="button"
            onClick={ask}
            disabled={inquiry.state === 'asking'}
            className={`${BRAND_BUTTON_BASE} rounded-card-sm text-14`}
          >
            실시간 문의
          </button>
        ) : place.phone ? (
          <a href={`tel:${place.phone}`} className={`${BRAND_BUTTON_BASE} rounded-card-sm text-14`}>
            전화하기
          </a>
        ) : (
          <button type="button" disabled className={`${BRAND_BUTTON_BASE} rounded-card-sm text-14`}>
            문의 정보 없음
          </button>
        )}
      </div>
    </div>
  )
}
