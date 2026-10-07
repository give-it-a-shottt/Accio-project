import bagIcon from '../assets/figma/v3/icons/bag.svg'
import searchIcon from '../assets/figma/v3/icons/search.svg'
import starIcon from '../assets/figma/v3/icons/star.svg'
import logo from '../assets/figma/v3/logo.svg'
import { CART_COUNT, HEADER_SEARCH_PLACEHOLDER } from '../data/mock'
import { accioHref } from '../routes'

export default function MainHeader() {
  return (
    <header className="border-b border-regular bg-white/95 px-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] backdrop-blur-[6px] sm:px-6 lg:px-10">
      {/* md 미만에서는 검색창이 두 번째 줄 전체 폭으로 내려간다 */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-y-3 py-3 md:h-16 md:flex-nowrap md:py-0 lg:pl-4">
        <a href={accioHref()} className="shrink-0">
          <img src={logo} alt="Accio" className="h-7 w-auto" />
        </a>

        <div className="ml-auto flex items-center">
          <a href="#" className="flex items-center gap-1 text-13 font-medium tracking-normal whitespace-nowrap text-accent">
            <img src={starIcon} alt="" className="size-4" />
            Ranking
          </a>
          <a
            href={accioHref('/cart')}
            className="ml-2 flex items-center gap-1 rounded-full border border-light bg-light p-1 text-13 font-medium whitespace-nowrap text-main"
          >
            <img src={bagIcon} alt="" className="size-4" />
            <span>장바구니</span>
            <span>{CART_COUNT}</span>
          </a>
        </div>

        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full md:ml-3 md:w-84">
          <input
            type="text"
            placeholder={HEADER_SEARCH_PLACEHOLDER}
            aria-label="상품 검색"
            className="h-9 w-full rounded-full border border-light py-2 pr-10 pl-4 text-13 text-main outline-none placeholder:text-disabled"
          />
          <button type="submit" aria-label="검색" className="absolute top-1/2 right-3 flex size-4 -translate-y-1/2">
            <img src={searchIcon} alt="" className="size-4" />
          </button>
        </form>
      </div>
    </header>
  )
}
