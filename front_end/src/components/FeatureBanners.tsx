import { useRef, useState } from 'react'
import chevronLeft from '../assets/figma/v3/icons/chevron-left-sm.svg'
import chevronRight from '../assets/figma/v3/icons/chevron-right-sm.svg'
import type { FeatureBanner } from '../data/mock'
import { BLEED_CLASS } from './layout'

interface FeatureBannersProps {
  banners: FeatureBanner[]
}

export default function FeatureBanners({ banners }: FeatureBannersProps) {
  // lg 이상은 5장이 한 줄에 모두 보이므로, 이전/다음은 시작 카드를 한 칸씩 회전시킨다.
  // lg 미만은 가로 스와이프 캐러셀이라 이전/다음이 트랙을 한 장씩 스크롤한다.
  const trackRef = useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(0)
  const [scrolled, setScrolled] = useState(0)
  const count = banners.length
  const ordered = banners.map((_, i) => banners[(start + i) % count])

  const getStep = (track: HTMLDivElement) => {
    const [first, second] = track.children as HTMLCollectionOf<HTMLElement>
    return second ? second.offsetLeft - first.offsetLeft : track.clientWidth
  }
  const isAtEnd = (track: HTMLDivElement) => track.scrollLeft + track.clientWidth >= track.scrollWidth - 1

  const move = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track || track.scrollWidth <= track.clientWidth) {
      setStart((prev) => (prev + dir + count) % count)
      return
    }
    if (dir === 1 && isAtEnd(track)) track.scrollTo({ left: 0, behavior: 'smooth' })
    else if (dir === -1 && track.scrollLeft <= 0) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' })
    else track.scrollBy({ left: dir * getStep(track), behavior: 'smooth' })
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    setScrolled(isAtEnd(track) ? count - 1 : Math.round(track.scrollLeft / getStep(track)))
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className={`scrollbar-none flex w-full snap-x snap-mandatory gap-3.5 overflow-x-auto lg:justify-center ${BLEED_CLASS}`}
      >
        {ordered.map((banner) => (
          <article
            key={banner.id}
            className="relative h-64 w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:w-[44%] md:w-[31%] lg:w-auto lg:min-w-0 lg:flex-1 lg:shrink"
            style={{ background: banner.background }}
          >
            <img src={banner.image} alt="" className="absolute inset-0 size-full object-cover opacity-75" />
            <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.3)] to-transparent p-4 font-noto">
              <p
                className="pb-1 text-[10px] leading-[15px] font-bold tracking-[0.5px] uppercase"
                style={{ color: banner.labelColor }}
              >
                {banner.label}
              </p>
              <h3 className="pb-1 text-base leading-5 font-bold tracking-noto whitespace-nowrap text-white drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]">
                {banner.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="truncate text-[11px] leading-[16.5px] font-light tracking-noto text-[#D1D5DB]">{banner.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <button type="button" aria-label="이전 배너" onClick={() => move(-1)}>
          <img src={chevronLeft} alt="" className="size-3.5" />
        </button>
        <span className="pl-3 font-mono text-[11px] leading-4 tracking-noto whitespace-nowrap text-[#4B5563]">
          {((start + scrolled) % count) + 1} / {count}
        </span>
        <button type="button" aria-label="다음 배너" onClick={() => move(1)} className="ml-3">
          <img src={chevronRight} alt="" className="size-3.5" />
        </button>
      </div>
    </section>
  )
}
