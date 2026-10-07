import { useState } from 'react'
import logo from '../assets/figma/v3/logo.svg'
import { AI_CHAT } from '../data/mock'
import { formatWon } from '../utils/format'
import { ArrowUpIcon } from '../../../shared/icons'
import PageLayout from './PageLayout'
import { accioHref } from '../routes'

// AI 대화 검색 결과. 읽기 폭 880px 가운데 정렬, 추천 상품은 미니 카드(B-2) 2열 → 모바일 1열.
// AI 표시는 반짝이 아이콘 대신 ACCIO 워드마크로 한다.
export default function AiChatPage() {
  const [draft, setDraft] = useState('')

  return (
    <PageLayout title="AI 검색" description={`추천 상품 ${AI_CHAT.picks.length}개`} narrow>
      <section aria-label="대화" className="flex flex-col gap-8">
        <p className="ml-auto max-w-[85%] rounded-card rounded-br-badge bg-main px-5 py-3 text-15 text-white sm:max-w-130">
          {AI_CHAT.query}
        </p>

        <article className="flex flex-col gap-4">
          <img src={logo} alt="ACCIO 답변" className="h-4 w-auto self-start" />

          <p className="max-w-180 text-15 break-keep text-sub">{AI_CHAT.answer}</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-12 font-medium text-sub-weak">이렇게 이해했어요</span>
            {AI_CHAT.understood.map((condition) => (
              <span key={condition} className="rounded-badge bg-regular px-2 py-1 text-12 font-medium text-sub">
                {condition}
              </span>
            ))}
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {AI_CHAT.picks.map((pick) => (
              <li key={pick.id}>
                {/* 썸네일 안쪽 여백(12) 보다 텍스트 쪽 여백(20)을 크게 둔다 */}
                <a
                  href={accioHref('/detail')}
                  className="flex items-center gap-4 rounded-card-sm border border-regular bg-white py-3 pr-5 pl-3 transition-colors hover:border-black"
                >
                  <div className="size-22 shrink-0 overflow-hidden rounded-thumb-sm bg-light">
                    {pick.image && <img src={pick.image} alt="" className="size-full object-cover" />}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col items-start">
                    <span className="text-12 font-medium text-main">{pick.brand}</span>
                    <span className="mt-1 max-w-full truncate text-16 font-semibold text-main">{pick.name}</span>
                    <span className="mt-1.5 text-16 font-semibold text-main tabular-nums">{formatWon(pick.price)}</span>
                    <span className="mt-2 rounded-badge bg-accent-soft px-2 py-0.5 text-12 font-medium text-accent-strong">
                      {pick.reason}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {AI_CHAT.followUps.map((followUp) => (
              <button
                key={followUp}
                type="button"
                onClick={() => setDraft(followUp)}
                className="h-11 rounded-full border border-regular bg-white px-5 text-14 font-medium text-main hover:border-black"
              >
                {followUp}
              </button>
            ))}
          </div>
        </article>
      </section>

      {/* 대화가 길어져도 입력창이 화면 아래에 남도록 붙인다 */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setDraft('')
        }}
        className="sticky bottom-4 mt-4 flex h-15 items-center gap-2 rounded-full border border-black bg-white pr-2 pl-6 shadow-[0px_8px_24px_-8px_rgba(17,17,17,0.15)]"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={AI_CHAT.placeholder}
          aria-label="이어서 물어보기"
          className="min-w-0 flex-1 bg-transparent text-15 text-main outline-none placeholder:text-disabled"
        />
        <button
          type="submit"
          aria-label="보내기"
          disabled={!draft.trim()}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-white disabled:cursor-default disabled:bg-regular disabled:text-disabled"
        >
          <ArrowUpIcon />
        </button>
      </form>
      <p className="-mt-4 pl-6 text-12 text-sub-weak">{AI_CHAT.disclaimer}</p>
    </PageLayout>
  )
}
