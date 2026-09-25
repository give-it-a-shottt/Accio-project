import { useState } from 'react'
import brandNext from '../assets/figma/v3/icons/brand-next.svg'
import brandPrev from '../assets/figma/v3/icons/brand-prev.svg'
import heartFill from '../assets/figma/v3/icons/heart-fill.svg'
import { BRAND_SECTION } from '../data/mock'
import { BLEED_CLASS } from './layout'

const TAG_CLASS = {
  sale: 'bg-[#FEE2E2] text-[#DC2626]',
  today: 'bg-[#FCE7F3] text-[#DB2777]',
}

const NAV_BUTTON_CLASS =
  'absolute top-1/2 flex size-9 sm:size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-[2px]'

export default function BrandSection() {
  const { title, brands, banner, likes, products } = BRAND_SECTION
  const [active, setActive] = useState(0)
  const move = (dir: 1 | -1) => setActive((prev) => (prev + dir + brands.length) % brands.length)

  return (
    <section className="flex w-full flex-col gap-5 pt-4 sm:gap-6 sm:pt-6 font-noto tracking-noto">
      <div className="flex flex-col gap-4 sm:gap-5">
        <h2 className="text-center text-xl leading-8 sm:text-2xl font-bold tracking-[-0.6px] text-[#111827]">{title}</h2>
        {/* 칩이 넘칠 때는 왼쪽부터 스크롤되도록 safe center */}
        <div className={`scrollbar-none flex items-center justify-center-safe gap-2 overflow-x-auto py-1 ${BLEED_CLASS}`}>
          {brands.map((brand, i) => (
            <button
              key={brand}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm leading-5 whitespace-nowrap ${
                i === active ? 'bg-[#111827] font-medium text-white' : 'border border-[#E5E7EB] bg-white text-[#4B5563]'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-56 overflow-hidden rounded-2xl sm:h-72 lg:h-80 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <img src={banner} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4">
          <h3 className="pb-2 text-2xl leading-9 sm:text-[30px] font-extrabold tracking-[-0.75px] text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]">
            {brands[active]}
          </h3>
          <p className="flex items-center gap-1.5 text-sm leading-5 font-medium text-white/90">
            <img src={heartFill} alt="" className="size-4" />
            {likes.toLocaleString('ko-KR')}명이 좋아합니다.
          </p>
        </div>
        <button type="button" aria-label="이전 브랜드" onClick={() => move(-1)} className={`${NAV_BUTTON_CLASS} left-3 sm:left-4`}>
          <img src={brandPrev} alt="" className="size-5" />
        </button>
        <button type="button" aria-label="다음 브랜드" onClick={() => move(1)} className={`${NAV_BUTTON_CLASS} right-3 sm:right-4`}>
          <img src={brandNext} alt="" className="size-5" />
        </button>
      </div>

      <div className="flex flex-col gap-3 pt-1 md:flex-row md:gap-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex min-w-0 flex-1 items-center gap-3.5 rounded-xl border border-[#F3F4F6] bg-white p-3"
          >
            <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-[#F3F4F6]">
              <img src={product.image} alt={product.name} className="size-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h4 className="truncate text-xs leading-4 font-medium text-[#111827]">{product.name}</h4>
              <p className="flex items-baseline gap-1.5 whitespace-nowrap">
                {product.listPrice && (
                  <span className="text-xs leading-4 text-[#9CA3AF] line-through">
                    {product.listPrice.toLocaleString('ko-KR')}원
                  </span>
                )}
                <span className="text-sm leading-5 font-extrabold text-accent">{product.price.toLocaleString('ko-KR')}원~</span>
              </p>
              <div className="flex items-center gap-1 pt-0.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag.text}
                    className={`rounded px-1.5 py-0.5 text-[10px] leading-[15px] font-bold whitespace-nowrap ${TAG_CLASS[tag.tone]}`}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
