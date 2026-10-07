import menuIcon from '../assets/figma/v3/icons/menu.svg'
import { CATEGORIES } from '../data/mock'
import Container from './Container'
import { accioHref } from '../routes'

export default function CategoryNav() {
  return (
    <nav className="border-b border-regular bg-white">
      <Container className="flex h-11 items-center">
        <div className="scrollbar-none flex min-w-0 flex-1 items-center gap-6 overflow-x-auto pr-4">
          <button type="button" className="flex shrink-0 items-center gap-2 py-1 sm:mr-2">
            <img src={menuIcon} alt="" className="size-4" />
            {/* 모바일(sm 미만)에서는 아이콘만 보이고, 글자는 스크린리더용으로 남긴다 */}
            <span className="sr-only text-16 font-semibold whitespace-nowrap text-main sm:not-sr-only">전체 카테고리</span>
          </button>

          <span className="h-3 shrink-0 border-l border-light" aria-hidden="true" />

          <ul className="flex shrink-0 items-center gap-5">
            {CATEGORIES.map((category, i) => (
              <li key={category}>
                <a
                  href={accioHref('/list')}
                  className={`text-13 font-medium whitespace-nowrap ${i === 0 ? 'text-accent' : 'text-sub'}`}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  )
}
