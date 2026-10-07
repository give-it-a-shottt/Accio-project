import currentDot from '../assets/timeline-current.svg'
import marker from '../assets/timeline-marker.svg'
import { BRAND_BUTTON_BASE, BRAND_BUTTON_CLASS, Footer, Screen, SectionLabel, StepNav, Tag } from '../components'
import { currentMealIndex, KIND_LABEL, scoreDate, trustBadges } from '../format'
import { maestroHref } from '../routes'
import { useMaestro } from '../store'
import type { MealScore, Score } from '../types'

function variationCount(meal: MealScore) {
  return Object.values(meal.variations).reduce((sum, places) => sum + places.length, 0)
}

function scoreTitle(score: Score) {
  const first = score.meals[0].dong
  const last = score.meals.at(-1)!.dong
  return first === last ? `${first}에서의 하루` : `${first}에서 ${last}까지`
}

// 피그마 악보 보기(7:1844) — 끼니 타임라인
export default function ScoreScreen() {
  const { score } = useMaestro()

  if (!score || score.meals.length === 0) {
    return (
      <Screen className="gap-4 px-5 pt-3.5">
        <StepNav backHref={maestroHref('/plan')} />
        <h1 className="text-24 font-semibold text-main">아직 만든 악보가 없어요</h1>
        <p className="text-14 text-sub">일정을 적고 '지휘 시작'을 누르면 끼니마다 플랜 B가 준비돼요.</p>
        <a href={maestroHref('/plan')} className={`${BRAND_BUTTON_CLASS} mt-4`}>
          계획 만들기
        </a>
      </Screen>
    )
  }

  const current = currentMealIndex(score)
  const total = score.meals.reduce((sum, meal) => sum + variationCount(meal), 0)

  return (
    <Screen>
      <div className="flex flex-col px-5 pt-3.5">
        <StepNav backHref={maestroHref('/plan')} step="2 / 2" />
        <div className="mt-2 flex flex-col gap-2">
          <SectionLabel muted>
            <span lang="en">SCORE · {scoreDate(score.meals[0].at)}</span>
          </SectionLabel>
          <div className="flex flex-col gap-0.5 text-main">
            <h1 className="text-24 font-semibold">{scoreTitle(score)}</h1>
            <p className="text-14 font-medium">
              예정 {score.meals.length} · 플랜B {total}
            </p>
          </div>
        </div>

        <ol className="relative flex flex-col gap-5 pt-[30px] pb-6">
          <span aria-hidden="true" className="absolute top-9 bottom-6 left-[59px] border-l border-regular" />
          {score.meals.map((meal, index) => {
            const count = variationCount(meal)
            const badges = meal.main ? trustBadges(meal.main) : []
            if (meal.main?.yumiReservable) badges.push('바로 문의')
            return (
              <li key={meal.at + index} className="relative flex items-start gap-2.5">
                <div className="flex w-[72px] shrink-0 flex-col pt-3">
                  <span className="text-15 font-semibold text-main">{meal.at.slice(11, 16)}</span>
                  <span lang="en" className="text-11 text-sub-weak">
                    {KIND_LABEL[meal.kind]}
                  </span>
                </div>
                <img src={marker} alt="" width={14} height={14} className="absolute top-[18px] left-[53px]" />
                {index === current && (
                  <img src={currentDot} alt="" width={8} height={8} className="absolute top-[21px] left-[56px]" />
                )}
                <a
                  href={maestroHref('/live', { meal: index })}
                  aria-current={index === current ? 'step' : undefined}
                  className="flex min-w-0 flex-1 flex-col gap-1 rounded-card bg-regular p-4"
                >
                  <span className="text-11 text-main">
                    {meal.dong} · {meal.people}명
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-20 font-medium text-main">{meal.main?.name ?? '추천 식당을 찾지 못했어요'}</span>
                    {badges.length > 0 && (
                      <span className="flex flex-wrap gap-1.5">
                        {badges.map((badge) => (
                          <Tag key={badge} muted>
                            {badge}
                          </Tag>
                        ))}
                      </span>
                    )}
                  </span>
                  <span aria-hidden="true" className="mt-1 h-px w-full bg-main" />
                  <span className="flex items-start justify-between text-11 text-sub-weak">
                    <span className="whitespace-pre">플랜 B  ·  {count}개</span>
                    <span aria-hidden="true">›</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>

      <Footer>
        <a href={maestroHref('/live', { meal: current })} className={`${BRAND_BUTTON_BASE} rounded-card-sm text-15`}>
          당일 모드 시작
        </a>
      </Footer>
    </Screen>
  )
}
