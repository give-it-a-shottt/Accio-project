import menuIcon from '../assets/figma/v3/icons/menu.svg'
import { CATEGORIES } from '../data/mock'
import Container from './Container'

export default function CategoryNav() {
  return (
    <nav className="border-b border-[#E5E7EB] bg-white">
      <Container className="flex h-11 items-center">
        <div className="scrollbar-none flex min-w-0 flex-1 items-center gap-6 overflow-x-auto pr-4">
          <button type="button" className="mr-2 flex shrink-0 items-center gap-2 py-1">
            <img src={menuIcon} alt="" className="size-4" />
            <span className="text-base leading-[1.4] font-semibold tracking-kr whitespace-nowrap text-[#111111]">전체 카테고리</span>
          </button>

          <span className="h-3.5 w-px shrink-0 bg-[#F1F1F5]" aria-hidden="true" />

          <ul className="flex shrink-0 items-center gap-5">
            {CATEGORIES.map((category, i) => (
              <li key={category}>
                <a
                  href="#"
                  className={`text-[13px] leading-[1.45] font-medium tracking-kr whitespace-nowrap ${i === 0 ? 'text-accent' : 'text-[#374151]'}`}
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
