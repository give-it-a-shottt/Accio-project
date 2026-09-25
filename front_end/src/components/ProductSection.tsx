import { useRef } from 'react'
import arrowLeft from '../assets/figma/v3/icons/arrow-left.svg'
import arrowRight from '../assets/figma/v3/icons/arrow-right.svg'
import type { ProductSectionData } from '../data/mock'
import { BLEED_CLASS } from './layout'
import ProductCard from './ProductCard'

interface ProductSectionProps {
  section: ProductSectionData
}

const ARROW_CLASS = 'flex size-7 items-center justify-center rounded-full border border-[#E5E7EB]'

export default function ProductSection({ section }: ProductSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollRow = (dir: 1 | -1) => {
    const track = trackRef.current
    track?.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="flex w-full flex-col gap-4">
      <div
        className={`flex items-end justify-between border-b border-[#F3F4F6] ${section.compactHeader ? '' : 'pb-3'}`}
      >
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2
            className="flex flex-wrap items-center text-lg leading-[1.4] font-semibold tracking-kr text-[#111111] sm:text-xl"
            style={{ gap: section.titleGap }}
          >
            {section.title.map((segment) => (
              <span key={segment.text} className={segment.highlight ? 'text-accent' : undefined}>
                {segment.text}
              </span>
            ))}
          </h2>
          <p
            className={`leading-[1.45] tracking-kr text-[#767676] ${section.subtitleSize === 13 ? 'text-[13px]' : 'text-xs'}`}
          >
            {section.subtitle}
          </p>
        </div>

        {/* md 미만은 스와이프로 넘기므로 화살표를 숨긴다 */}
        <div className="hidden shrink-0 items-center gap-1.5 md:flex">
          <button type="button" aria-label="이전 상품" onClick={() => scrollRow(-1)} className={ARROW_CLASS}>
            <img src={arrowLeft} alt="" className="size-3.5" />
          </button>
          <button type="button" aria-label="다음 상품" onClick={() => scrollRow(1)} className={ARROW_CLASS}>
            <img src={arrowRight} alt="" className="size-3.5" />
          </button>
        </div>
      </div>

      <div ref={trackRef} className={`scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto sm:gap-4 ${BLEED_CLASS}`}>
        {section.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
