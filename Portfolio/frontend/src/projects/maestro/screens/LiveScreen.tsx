import { useReducedMotion } from 'motion/react'
import { useCallback, useId, useRef, useState, type FormEvent } from 'react'
import { ChevronRightIcon } from '../../../shared/icons'
import pageDot from '../assets/page-dot.svg'
import { BottomSheet, BRAND_BUTTON_CLASS, Footer, PartnerTag, PlacePhoto, Screen, Tag } from '../components'
import { currentMealIndex, joinInfo, openText, priceBand, trustBadges, waitingExpected, walkText } from '../format'
import { goTo, maestroHref } from '../routes'
import { useMaestro } from '../store'
import type { MealScore, Place, Situation, SituationKey } from '../types'
import ScoreScreen from './ScoreScreen'

// 직접 말하기 — 문장 속 낱말로 상황을 찾는다. '비싸'가 '비'에 걸리지 않게 예산을 먼저 본다.
const SPOKEN_HINTS: [SituationKey, string[]][] = [
  ['budget', ['비싸', '예산', '돈이', '저렴', '싸게', '가격']],
  ['waiting', ['웨이팅', '줄이', '줄 서', '기다', '대기', '자리가 없']],
  ['tired', ['피곤', '지쳤', '지쳐', '힘들', '다리 아', '쉬고', '졸려']],
  ['stuffy', ['더부룩', '소화', '배불', '체한', '체했', '느끼', '속이']],
  ['mood', ['기분', '우울', '짜증', '속상', '조용한']],
  ['rain', ['비 와', '비와', '비가', '우산', '소나기', '장마', '눈 와', '눈이']],
]

function situationFromSpeech(text: string): SituationKey | null {
  const spoken = text.replace(/\s+/g, ' ')
  return SPOKEN_HINTS.find(([, words]) => words.some((word) => spoken.includes(word)))?.[0] ?? null
}

interface LiveScreenProps {
  params: URLSearchParams
}

// 피그마 당일 모드(7:1911) — 지금 끼니 + 상황 타일 6개. 타일을 누르면 변주 결과(7:1953) 시트가 올라온다.
export default function LiveScreen({ params }: LiveScreenProps) {
  const { score } = useMaestro()
  const [speaking, setSpeaking] = useState(false)
  const closeSpeak = useCallback(() => setSpeaking(false), [])

  // 악보가 없으면 악보 화면의 안내를 그대로 보여준다
  if (!score || score.meals.length === 0) return <ScoreScreen />

  const asked = Number(params.get('meal'))
  const mealIndex =
    params.has('meal') && Number.isInteger(asked) && asked >= 0 && asked < score.meals.length
      ? asked
      : currentMealIndex(score)
  const meal = score.meals[mealIndex]
  const open = params.get('s') as SituationKey | null
  const situation = score.situations.find((s) => s.key === open)
  const main = meal.main

  const openSituation = (key: SituationKey) => goTo(maestroHref('/live', { meal: mealIndex, s: key }))
  const closeSituation = () => goTo(maestroHref('/live', { meal: mealIndex }))

  return (
    <Screen>
      <div className="flex flex-col gap-4 px-5 pt-4">
        <div className="flex items-center justify-between text-11 text-sub">
          <p>
            <span aria-hidden="true">● </span>
            <span lang="en">NOW PLAYING</span> · {meal.at.slice(11, 16)} {meal.dong}
          </p>
          <a href={maestroHref('/score')} className="text-12">
            악보 보기 ›
          </a>
        </div>

        <a
          href={main ? maestroHref(`/place/${main.id}`, { meal: mealIndex }) : undefined}
          className="flex flex-col overflow-hidden rounded-card bg-light"
        >
          <PlacePhoto place={main} className="h-[114px] w-full" />
          <span className="flex flex-col gap-[7px] p-4">
            <span className="flex items-center justify-between gap-3">
              <span className="truncate text-20 text-main">{main?.name ?? '메인 식당을 찾지 못했어요'}</span>
              {main && waitingExpected(main) && (
                <span className="shrink-0 text-11 font-medium text-icon-main">● 웨이팅 있음</span>
              )}
            </span>
            {main && (
              <span className="text-13 text-sub">
                {joinInfo(main.categoryLabel, priceBand(main), walkText(main), openText(main))}
              </span>
            )}
          </span>
        </a>

        <section aria-labelledby="situations-title" className="flex flex-col gap-3 pt-2.5">
          <h1 id="situations-title" className="text-24 font-semibold text-main">
            상황이 바뀌었나요?
          </h1>
          <ul className="grid grid-cols-2 gap-3">
            {score.situations.map((s) => (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => openSituation(s.key)}
                  aria-haspopup="dialog"
                  className={`flex h-[88px] w-full flex-col items-start justify-between rounded-card border bg-light px-4 py-3 text-left ${open === s.key ? 'border-black' : 'border-transparent'}`}
                >
                  <span aria-hidden="true" className="text-24 leading-[1.2]">
                    {s.emoji}
                  </span>
                  <span className="text-13 font-medium text-main">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Footer>
        <button
          type="button"
          onClick={() => setSpeaking(true)}
          className="flex h-14 w-full items-center justify-center rounded-thumb-sm bg-maestro text-14 font-medium text-white"
        >
          직접 말하기
        </button>
      </Footer>

      {situation && <VariationSheet meal={meal} mealIndex={mealIndex} situation={situation} onClose={closeSituation} />}
      {speaking && (
        <SpeakSheet
          situations={score.situations}
          onPick={(key) => {
            setSpeaking(false)
            openSituation(key)
          }}
          onClose={closeSpeak}
        />
      )}
    </Screen>
  )
}

const CARD_GAP = 12

interface VariationSheetProps {
  meal: MealScore
  mealIndex: number
  situation: Situation
  onClose: () => void
}

function VariationSheet({ meal, mealIndex, situation, onClose }: VariationSheetProps) {
  const id = useId()
  const places = meal.variations[situation.key] ?? []
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLUListElement>(null)

  const reduceMotion = useReducedMotion()

  const cardStep = () => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null
    return card ? card.offsetWidth + CARD_GAP : 0
  }

  // 넘긴 카드 위치로 아래 페이지 점을 맞춘다
  const onScroll = () => {
    const track = trackRef.current
    const step = cardStep()
    if (!track || !step) return
    setActive(Math.min(places.length - 1, Math.round(track.scrollLeft / step)))
  }

  // 마우스로는 옆으로 밀 수 없어서 화살표·페이지 점으로도 넘긴다
  const showCard = (index: number) => {
    trackRef.current?.scrollTo({ left: index * cardStep(), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <BottomSheet onClose={onClose} labelledBy={`${id}-title`}>
      <div className="flex flex-col gap-[5px] px-5 pt-2 pb-3">
        <p className="flex items-center gap-2 text-[10px] leading-[1.5] text-sub">
          <span aria-hidden="true" className="h-px w-4 bg-[#505050]" />
          <span>
            <span lang="en">VARIATION</span> · {situation.label}
          </span>
        </p>
        <h2 id={`${id}-title`} className="text-24 font-semibold text-main">
          플랜 B를 선택해주세요
        </h2>
        <p className="text-12 text-main">{situation.reason}</p>
      </div>

      {places.length > 0 ? (
        <>
          <div className="relative">
            <ul
              ref={trackRef}
              onScroll={onScroll}
              className="scrollbar-none flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5"
            >
              {places.map((place, index) => (
                <li key={place.id} className="w-[303px] max-w-[calc(100vw-72px)] shrink-0 snap-start">
                  <VariationCard place={place} number={String(index + 1).padStart(2, '0')} href={maestroHref(`/place/${place.id}`, { meal: mealIndex, s: situation.key, n: index + 1 })} />
                </li>
              ))}
            </ul>
            {/* 화살표는 마우스를 쓰는 화면에만 — 휴대폰은 손가락으로 민다 */}
            {active > 0 && (
              <CarouselArrow direction="prev" onClick={() => showCard(active - 1)} />
            )}
            {active < places.length - 1 && (
              <CarouselArrow direction="next" onClick={() => showCard(active + 1)} />
            )}
          </div>
          <div className="flex items-center justify-center pt-5">
            {places.map((place, index) => (
              <button
                key={place.id}
                type="button"
                onClick={() => showCard(index)}
                aria-label={`${index + 1}번째 대안 보기`}
                aria-current={index === active}
                className="flex h-6 items-center px-[2.5px]"
              >
                {index === active ? (
                  <span className="h-1 w-4 rounded-[2px] bg-main" />
                ) : (
                  <img src={pageDot} alt="" width={4} height={4} />
                )}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="mx-5 rounded-card bg-light p-5 text-14 break-keep text-sub">
          이 시간대에는 조건에 맞는 곳을 찾지 못했어요. 다른 상황을 골라 보세요.
        </p>
      )}

      <button type="button" onClick={onClose} className="mx-auto mt-7 mb-[34px] px-4 py-1 text-13 font-semibold text-main">
        다른 상황 고르기
      </button>
    </BottomSheet>
  )
}

function CarouselArrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? '이전 대안' : '다음 대안'}
      // 글자를 가리지 않게 카드 사진(높이 122px)의 가운데에 둔다
      className={`absolute top-[43px] hidden size-9 items-center justify-center rounded-full bg-white text-main shadow-[0_2px_8px_rgba(17,17,17,0.16)] pointer-fine:flex ${direction === 'prev' ? 'left-2' : 'right-2'}`}
    >
      <ChevronRightIcon size={18} className={direction === 'prev' ? 'rotate-180' : undefined} />
    </button>
  )
}

function VariationCard({ place, number, href }: { place: Place; number: string; href: string }) {
  const badges = trustBadges(place)
  return (
    <a href={href} className="flex h-[296px] flex-col overflow-hidden rounded-card bg-white">
      <PlacePhoto place={place} number={number} className="h-[122px] w-full" />
      <span className="flex min-h-0 flex-1 flex-col gap-2 bg-light p-4">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-20 font-semibold text-main">{place.name}</span>
          {place.yumiReservable && <PartnerTag />}
        </span>
        {place.aiSummary && <span className="line-clamp-2 text-14 text-main">{place.aiSummary}</span>}
        <span className="text-12 text-sub">{joinInfo(walkText(place), priceBand(place), openText(place))}</span>
        {badges.length > 0 && (
          <span className="mt-auto flex flex-wrap gap-1.5">
            {badges.map((badge) => (
              <Tag key={badge}>{badge}</Tag>
            ))}
          </span>
        )}
      </span>
    </a>
  )
}

interface SpeakSheetProps {
  situations: Situation[]
  onPick: (key: SituationKey) => void
  onClose: () => void
}

function SpeakSheet({ situations, onPick, onClose }: SpeakSheetProps) {
  const id = useId()
  const [text, setText] = useState('')
  const [missed, setMissed] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const key = situationFromSpeech(text)
    if (key) onPick(key)
    else setMissed(true)
  }

  return (
    <BottomSheet onClose={onClose} labelledBy={`${id}-title`}>
      <form onSubmit={submit} className="flex flex-col gap-4 px-5 pt-2 pb-[34px]">
        <h2 id={`${id}-title`} className="text-24 font-semibold text-main">
          지금 어떤가요?
        </h2>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setMissed(false)
          }}
          aria-label="지금 상황"
          aria-describedby={missed ? `${id}-missed` : undefined}
          placeholder="예: 점심 먹고 속이 더부룩해"
          className="h-[50px] rounded-thumb-sm border border-regular px-4 text-14 text-main outline-none placeholder:text-disabled focus:border-black"
        />
        {missed && (
          <p id={`${id}-missed`} role="alert" className="text-13 break-keep text-sub">
            아직 그 말은 이해하지 못했어요. 아래에서 골라 주세요.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {situations.map((s) => (
            <button key={s.key} type="button" onClick={() => onPick(s.key)} className="rounded-full border border-regular px-3 py-1.5 text-12 text-main">
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
        <button type="submit" disabled={!text.trim()} className={BRAND_BUTTON_CLASS}>
          지휘 맡기기
        </button>
      </form>
    </BottomSheet>
  )
}
