import { useState } from 'react'
import moreChevron from '../assets/figma/v3/icons/more-chevron.svg'
import playIcon from '../assets/figma/v3/icons/play.svg'
import { SHORTFORM_SECTION } from '../data/mock'

const TAG_CLASS = 'absolute bottom-2.5 left-2.5 rounded px-2 py-0.5 text-[11px] leading-[1.45] tracking-kr whitespace-nowrap'

export default function ShortFormSection() {
  const { items, totalPages } = SHORTFORM_SECTION
  const [page, setPage] = useState(1)

  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden rounded-2xl bg-[#1C1917] px-4 py-6 sm:gap-[19.7px] sm:rounded-3xl sm:p-8 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        <h2 className="text-xl leading-[1.4] font-semibold tracking-kr whitespace-nowrap text-white">
          <span className="text-accent">숏폼</span>으로 보는 추천 상품
        </h2>
        <a href="#" className="flex items-center gap-1 text-xs leading-[1.45] whitespace-nowrap text-[#A5A5AF]">
          더보기
          <img src={moreChevron} alt="" className="size-3" />
        </a>
      </div>

      {/* lg 미만은 가로 스와이프. 카드 좌우 여백까지 트랙을 늘려 끝까지 스크롤되게 한다 */}
      <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-[4.3px] sm:-mx-8 sm:scroll-px-8 sm:gap-3.5 sm:px-8 lg:mx-0 lg:justify-center lg:px-0">
        {items.map((item) => (
          <article key={item.id} className="flex w-[42%] shrink-0 snap-start flex-col gap-2.5 sm:w-[30%] md:w-[23%] lg:w-auto lg:min-w-0 lg:flex-1 lg:shrink">
            <div className="relative aspect-[9/14] w-full xl:aspect-auto xl:h-[326.03px] overflow-hidden rounded-xl bg-[#292524]">
              <img src={item.image} alt={item.name} className="size-full object-cover" />
              <span className="absolute top-2.5 right-2.5 flex size-6 items-center justify-center rounded-full bg-black/40 pr-[5px] pl-[7px] backdrop-blur-[2px]">
                <img src={playIcon} alt="" className="size-3 shrink-0" />
              </span>
              {item.tag.kind === 'live' ? (
                <span className={`${TAG_CLASS} bg-accent text-white`}>{item.tag.text}</span>
              ) : (
                <span className={`${TAG_CLASS} bg-black/60 text-[#E5E7EB] backdrop-blur-[2px]`}>{item.tag.text}</span>
              )}
            </div>

            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] leading-[1.45] font-medium tracking-kr text-[#9CA3AF]">{item.brand}</p>
              <h4 className="truncate text-xs leading-[1.45] tracking-kr text-[#E5E7EB]">{item.name}</h4>
              <p className="text-base leading-[1.4] font-semibold tracking-kr whitespace-nowrap text-white sm:text-xl">
                {item.price.toLocaleString('ko-KR')}원
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] leading-[1.45] tracking-kr whitespace-nowrap">
        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} className="text-[#78716C]">
          이전
        </button>
        <span className="font-noto tracking-noto text-[#78716C]" aria-hidden="true">
          •
        </span>
        <span className="text-[#D6D3D1]">
          {page} / {totalPages}
        </span>
        <span className="font-noto tracking-noto text-[#78716C]" aria-hidden="true">
          •
        </span>
        <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="text-[#78716C]">
          다음
        </button>
      </div>
    </section>
  )
}
