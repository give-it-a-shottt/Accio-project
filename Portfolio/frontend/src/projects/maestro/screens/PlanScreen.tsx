import { useCallback, useId, useState, type ChangeEvent, type MouseEvent } from 'react'
import { ApiError, createScore } from '../api'
import fabAdd from '../assets/fab-add.svg'
import { BottomSheet, BRAND_BUTTON_CLASS, Footer, Screen, SectionLabel, StepNav } from '../components'
import { scoreDate, shortDate, weekdayKo } from '../format'
import { goTo, maestroHref } from '../routes'
import { newMealId, removeMeal, saveMeal, saveScore, useMaestro, type PlanMeal } from '../store'

const MAX_MEALS = 5
const DONG_CHOICES = ['을지로', '성수', '익선동', '연남']

// 피그마 일정 입력(21:27) — 끼니 카드 목록, 누르면 끼니 수정 시트(29:73)
export default function PlanScreen() {
  const { meals, score } = useMaestro()
  const [editing, setEditing] = useState<PlanMeal | null>(null)
  const [conducting, setConducting] = useState(false)
  const [error, setError] = useState('')
  const closeSheet = useCallback(() => setEditing(null), [])

  const addMeal = () => {
    const last = meals.at(-1)
    setEditing({
      id: newMealId(),
      date: last?.date ?? '2026-10-17',
      time: '19:00',
      dong: last?.dong ?? '을지로',
      people: last?.people ?? 2,
    })
  }

  // 지휘 시작 — 끼니별 메인과 상황별 대안을 한 번에 만들어 둔다
  const conduct = async () => {
    setConducting(true)
    setError('')
    try {
      const result = await createScore(
        meals.map(({ date, time, dong, people }) => ({ at: `${date}T${time}`, dong, people })),
      )
      saveScore(result)
      goTo(maestroHref('/score'))
    } catch (e) {
      setError(e instanceof ApiError ? e.message : '잠시 후 다시 시도해 주세요.')
    } finally {
      setConducting(false)
    }
  }

  return (
    <Screen>
      <div className="flex flex-col gap-[26px] px-5 pt-3.5">
        <StepNav backHref={maestroHref()} step="1 / 2" />
        <div className="flex flex-col gap-2">
          <SectionLabel>
            <span lang="en">SCORE · {meals[0] ? scoreDate(meals[0].date) : '—'}</span>
          </SectionLabel>
          <div className="flex flex-col gap-1 text-main">
            <h1 className="text-24 font-semibold">오늘의 계획</h1>
            <p className="text-12">끼니마다 시간, 동네, 인원만 적어주세요.</p>
          </div>
        </div>

        {meals.length > 0 ? (
          <ul className="flex flex-col gap-3.5">
            {meals.map((meal, index) => {
              const main = score?.meals[index]?.main
              return (
                <li key={meal.id}>
                  <button
                    type="button"
                    onClick={() => setEditing(meal)}
                    className="flex w-full flex-col gap-3 rounded-thumb-sm bg-regular p-4 text-left"
                  >
                    <span className="flex w-full items-center justify-between font-semibold text-main">
                      <span className="text-18">
                        {weekdayKo(meal.date)} {meal.time} · {meal.dong}
                      </span>
                      <span className="text-15">{meal.people}명</span>
                    </span>
                    <span aria-hidden="true" className="h-px w-full bg-main" />
                    <span className="flex w-full items-start justify-between text-sub">
                      <span className="text-12">메인 식당</span>
                      <span className="text-13">{main?.name ?? '지휘 시작 때 추천해요'}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="rounded-thumb-sm bg-regular p-4 text-13 text-sub">아래 + 를 눌러 첫 끼니를 적어 주세요.</p>
        )}
      </div>

      <Footer>
        {meals.length < MAX_MEALS && (
          <button type="button" onClick={addMeal} aria-label="끼니 추가" className="absolute -top-[60px] right-[18px] size-[52px] rounded-full">
            <img src={fabAdd} alt="" width={52} height={52} />
          </button>
        )}
        {error && (
          <p role="alert" className="mb-3 text-13 break-keep text-sub">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={conduct}
          disabled={conducting || meals.length === 0}
          aria-busy={conducting}
          className={BRAND_BUTTON_CLASS}
        >
          {conducting ? '플랜 B 준비 중…' : '지휘 시작'}
        </button>
      </Footer>

      {editing && (
        <MealSheet
          meal={editing}
          isNew={!meals.some((m) => m.id === editing.id)}
          canRemove={meals.length > 1}
          onClose={closeSheet}
        />
      )}
    </Screen>
  )
}

interface MealSheetProps {
  meal: PlanMeal
  isNew: boolean
  canRemove: boolean
  onClose: () => void
}

const FIELD_CLASS =
  'relative flex h-[50px] flex-1 items-center justify-center rounded-thumb-sm border border-regular text-14 text-main focus-within:border-black'
const ROUND_BUTTON_CLASS =
  'flex size-[38px] items-center justify-center rounded-full border border-black text-16 text-black disabled:opacity-30'

// 날짜·시간은 휴대폰 기본 선택기를 띄우고, 보이는 글자는 시안 모양('토 10.17')으로 둔다
function openPicker(e: MouseEvent<HTMLInputElement>) {
  try {
    e.currentTarget.showPicker()
  } catch {
    // showPicker 가 없는 브라우저는 기본 동작으로 연다
  }
}

function MealSheet({ meal, isNew, canRemove, onClose }: MealSheetProps) {
  const id = useId()
  const [draft, setDraft] = useState(meal)
  const [customDong, setCustomDong] = useState(!DONG_CHOICES.includes(meal.dong))
  const set = (patch: Partial<PlanMeal>) => setDraft((d) => ({ ...d, ...patch }))
  const onText = (key: 'date' | 'time' | 'dong') => (e: ChangeEvent<HTMLInputElement>) => set({ [key]: e.target.value })

  const save = () => {
    saveMeal({ ...draft, dong: draft.dong.trim() || '을지로' })
    onClose()
  }

  return (
    <BottomSheet onClose={onClose} labelledBy={`${id}-title`}>
      <div className="flex flex-col gap-5 px-5 pb-[34px]">
        <div className="flex items-center justify-between">
          <h2 id={`${id}-title`} className="text-24 font-semibold text-main">
            {isNew ? '끼니 추가' : '계획 수정'}
          </h2>
          {!isNew && canRemove && (
            <button
              type="button"
              onClick={() => {
                removeMeal(meal.id)
                onClose()
              }}
              className="text-13 text-sub"
            >
              이 끼니 빼기
            </button>
          )}
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-16 font-medium text-main">시간</legend>
          <div className="flex gap-2">
            <label className={FIELD_CLASS}>
              {weekdayKo(draft.date)} {shortDate(draft.date)}
              <input
                type="date"
                aria-label="날짜"
                value={draft.date}
                required
                onChange={onText('date')}
                onClick={openPicker}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </label>
            <label className={FIELD_CLASS}>
              {draft.time}
              <input
                type="time"
                aria-label="시각"
                value={draft.time}
                required
                onChange={onText('time')}
                onClick={openPicker}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <div className="flex items-start justify-between text-main">
            <legend className="text-16 font-medium">동네</legend>
            <button type="button" onClick={() => setCustomDong((v) => !v)} className="text-13">
              {customDong ? '목록에서 고르기' : '주소입력'}
            </button>
          </div>
          {customDong ? (
            <input
              type="text"
              aria-label="동네 이름"
              value={draft.dong}
              onChange={onText('dong')}
              placeholder="예: 망원, 서촌, 홍대"
              className="h-[38px] rounded-thumb-sm border border-black px-3.5 text-13 text-main outline-none placeholder:text-disabled"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {DONG_CHOICES.map((dong) => {
                const selected = draft.dong === dong
                return (
                  <button
                    key={dong}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => set({ dong })}
                    className={`h-[38px] rounded-thumb-sm border border-black px-3.5 text-12 ${selected ? 'bg-main text-white' : 'text-main'}`}
                  >
                    {dong}
                  </button>
                )
              })}
            </div>
          )}
        </fieldset>

        <div className="flex items-center justify-between">
          <p id={`${id}-people`} className="text-16 font-medium text-main">
            인원
          </p>
          <div role="group" aria-labelledby={`${id}-people`} className="flex items-center gap-4">
            <button
              type="button"
              aria-label="한 명 줄이기"
              disabled={draft.people <= 1}
              onClick={() => set({ people: draft.people - 1 })}
              className={ROUND_BUTTON_CLASS}
            >
              −
            </button>
            <p aria-live="polite" className="w-8 text-center text-14 font-semibold text-black">
              {draft.people}명
            </p>
            <button
              type="button"
              aria-label="한 명 늘리기"
              disabled={draft.people >= 20}
              onClick={() => set({ people: draft.people + 1 })}
              className={ROUND_BUTTON_CLASS}
            >
              +
            </button>
          </div>
        </div>

        <button type="button" onClick={save} className={`${BRAND_BUTTON_CLASS} mt-2`}>
          저장
        </button>
      </div>
    </BottomSheet>
  )
}
