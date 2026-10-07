import { BRAND_BUTTON_CLASS, Screen } from '../components'
import { opusNumber } from '../format'
import { maestroHref } from '../routes'
import { useMaestro } from '../store'

// 피그마 HOME(7:1750) — 소개 · 오선보 · 시작 버튼
export default function HomeScreen() {
  const { meals, score } = useMaestro()

  return (
    <Screen className="justify-between px-5 py-14">
      <div className="flex flex-col gap-3">
        <p lang="en" className="text-40 font-semibold text-maestro">
          MAESTRO
        </p>
        <div className="flex flex-col gap-1">
          <h1 className="text-28 font-medium text-main">
            계획은
            <br />
            당신이,
            <br />
            지휘는
            <br />
            마에스트로가.
          </h1>
          <p className="text-14 break-keep text-sub">
            짜둔 일정에 상황별 플랜 B를 미리 붙여둡니다. 틀어지는 순간, 버튼 하나면 충분해요.
          </p>
        </div>
      </div>

      {/* 오선보 — 일정 날짜로 붙인 작품 번호 */}
      <div aria-hidden="true" className="my-10 flex flex-col gap-1">
        <p lang="en" className="text-right font-maestro-opus text-14 tracking-normal text-sub italic">
          {opusNumber(meals[0]?.date ?? '2026-10-17')}
        </p>
        <div className="flex h-[50px] flex-col gap-[11px]">
          {[0, 1, 2, 3, 4].map((line) => (
            <span key={line} className="h-px w-full bg-[#999999]" />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2.5 pt-5">
        <a href={maestroHref('/plan')} className={BRAND_BUTTON_CLASS}>
          계획 만들기
        </a>
        {score && (
          <a href={maestroHref('/score')} className="py-1 text-12 text-sub">
            이미 만든 계획 불러오기
          </a>
        )}
      </div>
    </Screen>
  )
}
