import { motion } from 'motion/react'
import { searchHref, type ResultTab } from './routes'
import SearchBox from './SearchBox'

/** 인트로의 'JSH' 제목이 이 로고 자리로 날아와 바뀐다 */
export const LOGO_LAYOUT_ID = 'jsh-logo'

const NAV: { tab: Exclude<ResultTab, 'all'>; label: string }[] = [
  { tab: 'front', label: 'Front' },
  { tab: 'back', label: 'Back' },
]

interface PortfolioHeaderProps {
  /** 결과 화면에서만 가운데 검색창을 보여준다 */
  search?: { query: string; onSearch: (query: string) => void }
  activeTab?: ResultTab
}

// 로고 · (결과 화면) 검색창 · Front/Back 바로가기. md 미만에서는 검색창이 두 번째 줄로 내려간다.
export default function PortfolioHeader({ search, activeTab = 'all' }: PortfolioHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-5 sm:px-10">
      <a href="#/" aria-label="jsh 포트폴리오 홈" className="shrink-0">
        <motion.span
          layoutId={LOGO_LAYOUT_ID}
          lang="en"
          className="block text-20 font-semibold tracking-normal text-main"
        >
          jsh<span className="text-portfolio">.</span>
        </motion.span>
      </a>

      {search && (
        <div className="order-last w-full md:order-none md:max-w-160 md:flex-1">
          {/* 검색어가 바뀌면 입력값도 새로 맞춘다 */}
          <SearchBox key={search.query} size="md" defaultValue={search.query} onSearch={search.onSearch} />
        </div>
      )}

      <nav aria-label="분야 바로가기" className="flex shrink-0 gap-1 rounded-full border border-regular p-1">
        {NAV.map(({ tab, label }) => {
          const active = activeTab === tab
          return (
            <a
              key={tab}
              href={searchHref('', tab)}
              aria-current={active ? 'page' : undefined}
              lang="en"
              className={`rounded-full px-4 py-2 text-14 font-medium tracking-normal ${active ? 'bg-main text-white' : 'text-main hover:bg-light'}`}
            >
              {label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
