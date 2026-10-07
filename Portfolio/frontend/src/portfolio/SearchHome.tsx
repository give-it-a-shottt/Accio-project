import { motion, useReducedMotion } from 'motion/react'
import { KEYWORDS } from './data'
import { EASE_OUT } from './motion'
import { searchHref } from './routes'
import SearchBox from './SearchBox'

// 키워드 칩 앞 점 — Back 은 포인트 파랑, Front 는 회색, Design 은 주황
const TYPE_DOT_CLASS = {
  Back: 'bg-portfolio',
  Front: 'bg-icon-disabled',
  Design: 'bg-accent',
}

interface SearchHomeProps {
  onSearch: (query: string) => void
}

// 검색 홈 — 구글처럼 가운데 검색창 하나. 인트로가 걷히면 위에서부터 차례로 떠오른다.
// 제목은 확장(C) 스케일 C-2 → C-3 → 시안의 40px.
export default function SearchHome({ onSearch }: SearchHomeProps) {
  const reduceMotion = useReducedMotion()
  const rise = (order: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.15 + order * 0.08, ease: EASE_OUT },
        }

  return (
    <main className="flex flex-1 flex-col items-center px-6 pt-[16vh] pb-20">
      <div className="flex w-full max-w-180 flex-col items-center text-center">
        <motion.p {...rise(0)} className="flex flex-wrap items-center justify-center gap-3">
          <span lang="en" className="rounded-full border border-regular px-3 py-1 text-13 font-medium tracking-normal text-sub">
            Portfolio Search
          </span>
          <span className="text-13 text-sub-weak">문제 해결 사례 아카이브</span>
        </motion.p>
        <motion.h1 {...rise(1)} className="mt-4 text-28 font-semibold break-keep text-main sm:text-32 lg:text-40">
          어떤 문제가 궁금하세요?
        </motion.h1>
        <motion.p {...rise(2)} className="mt-4 text-16 break-keep text-sub sm:text-18">
          실제 업무에서 마주칠 문제를 가상으로 만들고, 어떻게 해결했는지 기록했습니다.
        </motion.p>

        {/* 자동완성 목록이 아래 키워드 칩 위로 펼쳐지도록 쌓임 순서를 올린다 */}
        <motion.div {...rise(3)} className="relative z-10 mt-10 w-full text-left">
          <SearchBox size="lg" onSearch={onSearch} />
        </motion.div>

        <motion.div {...rise(4)} className="mt-8 flex flex-col items-center gap-3">
          <p className="text-13 font-medium text-sub-weak">추천 키워드</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {KEYWORDS.map(({ label, type }) => (
              <li key={label}>
                <a
                  href={searchHref(label)}
                  className="flex items-center gap-2 rounded-full border border-regular bg-white px-4 py-2 text-14 font-medium text-main hover:border-black hover:bg-light"
                >
                  <span aria-hidden="true" className={`size-1.5 rounded-full ${TYPE_DOT_CLASS[type]}`} />
                  {label}
                  <span className="sr-only">({type})</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  )
}
