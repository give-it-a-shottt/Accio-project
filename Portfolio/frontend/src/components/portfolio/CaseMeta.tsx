import type { PortfolioCase } from '../../data/portfolio'

const TYPE_BADGE_CLASS = {
  Back: 'bg-portfolio-soft text-portfolio',
  Front: 'bg-regular text-icon-main',
  Design: 'bg-accent-soft text-accent-strong',
}

// 사례 위쪽 한 줄 — 분류 배지 · 코드 · 날짜. 결과 목록과 상세 화면이 함께 쓴다.
export default function CaseMeta({ item }: { item: PortfolioCase }) {
  return (
    <p className="flex items-center gap-2 text-13 tracking-normal text-sub-weak">
      <span lang="en" className={`rounded-badge px-2 py-0.5 text-12 font-semibold ${TYPE_BADGE_CLASS[item.type]}`}>
        {item.type}
      </span>
      <span lang="en" className="font-medium">
        {item.code}
      </span>
      <span aria-hidden="true">·</span>
      <span>{item.date}</span>
    </p>
  )
}
