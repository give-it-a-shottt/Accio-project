import heartIcon from '../assets/figma/v3/icons/heart.svg'
import type { BadgeTone, Product } from '../data/mock'

interface ProductCardProps {
  product: Product
}

const BADGE_CLASS: Record<BadgeTone, string> = {
  gray: 'bg-[#F3F4F6] font-medium text-[#4B5563]',
  accent: 'bg-[#FFF7ED] font-bold text-accent',
  accentStrong: 'bg-[#FFEDD5] font-bold text-accent',
}

const formatWon = (value: number) => `${value.toLocaleString('ko-KR')}원`

export default function ProductCard({ product }: ProductCardProps) {
  const { image, store, name, listPrice, discountRate, price, badge, notoName, highlighted } = product

  return (
    <article
      className={`flex w-[calc((100%-12px)/2.2)] shrink-0 snap-start flex-col justify-between sm:w-[calc((100%-32px)/3.3)] md:w-[calc((100%-48px)/4)] xl:h-[352.8px] lg:w-[calc((100%-64px)/5)] ${highlighted ? 'rounded-xl bg-white p-1' : ''}`}
    >
      <div className="flex flex-col gap-[1.5px]">
        <div className={`relative overflow-hidden bg-[#F3F4F6] pb-3.5 ${highlighted ? 'rounded-lg' : 'rounded-xl'}`}>
          <img src={image} alt={name} className="block aspect-square w-full object-cover" />
          <button
            type="button"
            aria-label="찜하기"
            className="absolute top-2.5 right-2.5 rounded-full bg-white/70 p-1.5"
          >
            <img src={heartIcon} alt="" className="size-4" />
          </button>
        </div>

        <p className="text-[11px] leading-[1.45] font-medium tracking-kr truncate text-[#505050]">{store}</p>
        <h3
          className={`truncate text-xs text-[#111111] ${notoName ? 'font-noto leading-4 tracking-noto' : 'leading-[1.45] font-medium tracking-kr'}`}
        >
          {name}
        </h3>
        <p className="text-[13px] leading-[1.45] tracking-kr text-[#999999]">{formatWon(listPrice)}</p>
        <p className="flex gap-1 text-base leading-[1.4] font-semibold sm:gap-1.5 sm:text-lg lg:text-xl tracking-kr whitespace-nowrap">
          <span className="text-accent">{discountRate}%</span>
          <span className="text-[#111827]">{formatWon(price)}</span>
        </p>
      </div>

      <div className="flex pt-[13px]">
        <span
          className={`rounded px-1.5 py-0.5 font-noto text-[10px] leading-[15px] tracking-noto whitespace-nowrap ${BADGE_CLASS[badge.tone ?? 'gray']}`}
        >
          {badge.text}
        </span>
      </div>
    </article>
  )
}
