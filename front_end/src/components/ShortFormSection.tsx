import { useState } from 'react'
import moreChevron from '../assets/figma/v3/icons/more-chevron.svg'
import playIcon from '../assets/figma/v3/icons/play.svg'
import { SHORTFORM_SECTION } from '../data/mock'

const TAG_CLASS = 'absolute bottom-2 left-2 flex h-5 items-center rounded-badge px-2 text-11 whitespace-nowrap'

export default function ShortFormSection() {
  const { items, totalPages } = SHORTFORM_SECTION
  const [page, setPage] = useState(1)

  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden rounded-card bg-[#1C1917] px-4 py-6 sm:gap-5 sm:p-8 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        <h2 className="text-18 font-semibold whitespace-nowrap text-white sm:text-20">
          <span className="text-accent">숏폼</span>으로 보는 추천 상품
        </h2>
        <a href="#" className="flex items-center gap-1 text-12 whitespace-nowrap text-[#A5A5AF]">
          더보기
          <img src={moreChevron} alt="" className="size-3" />
        </a>
      </div>

      {/* lg 미만은 가로 스와이프. 카드 좌우 여백까지 트랙을 늘려 끝까지 스크롤되게 한다 */}
      <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-1 sm:-mx-8 sm:scroll-px-8 sm:gap-4 sm:px-8 lg:mx-0 lg:justify-center lg:px-0">
        {items.map((item) => (
          <article key={item.id} className="flex w-[42%] shrink-0 snap-start flex-col gap-3 sm:w-[30%] md:w-[23%] lg:w-auto lg:min-w-0 lg:flex-1 lg:shrink">
            <div className="relative aspect-[9/14] w-full overflow-hidden rounded-thumb bg-[#292524]">
              <img src={item.image} alt={item.name} className="size-full object-cover" />
              <span className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-black/40 backdrop-blur-[2px]">
                {/* 재생 삼각형의 무게중심 보정 */}
                <img src={playIcon} alt="" className="size-3 shrink-0 translate-x-px" />
              </span>
              {item.tag.kind === 'live' ? (
                <span className={`${TAG_CLASS} bg-accent text-white`}>{item.tag.text}</span>
              ) : (
                <span className={`${TAG_CLASS} bg-black/60 text-[#E5E7EB] backdrop-blur-[2px]`}>{item.tag.text}</span>
              )}
            </div>

            <div className="flex flex-col px-0.5">
              <p className="text-12 font-medium text-[#9CA3AF] lg:text-13">{item.brand}</p>
              <h4 className="mt-1 truncate text-12 text-[#E5E7EB] sm:text-13">{item.name}</h4>
              <p className="mt-1.5 text-16 font-semibold tabular-nums whitespace-nowrap text-white sm:mt-2 sm:text-18 lg:text-20">
                {item.price.toLocaleString('ko-KR')}원
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-11 whitespace-nowrap">
        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} className="text-[#78716C]">
          이전
        </button>
        <span className="text-[#78716C]" aria-hidden="true">
          •
        </span>
        <span className="text-[#D6D3D1]">
          {page} / {totalPages}
        </span>
        <span className="text-[#78716C]" aria-hidden="true">
          •
        </span>
        <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="text-[#78716C]">
          다음
        </button>
      </div>
    </section>
  )
}
