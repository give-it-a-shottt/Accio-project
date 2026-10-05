import { useEffect } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps, type Transition } from 'motion/react'
import characterImg from '../../assets/portfolio/character.jpg'
import dividerImg from '../../assets/portfolio/divider.svg'
import { ArrowRightIcon } from '../icons'
import { EASE_OUT, INTRO_SECONDS } from './motion'
import { LOGO_LAYOUT_ID } from './PortfolioHeader'

// ── 모션 (Figma 「모션애니메이션」 258:1533, 3.2초 타임라인) ────────────────
// 시안 미리보기는 반복 재생이지만, 첫 화면 인트로라 한 번만 재생하고 마지막 상태에 머문다.
const DURATION = 3.2
const SPRING = (t: number) => 1 - Math.exp(-t * 7.6657) * (Math.cos(t * 6.7605) + 1.1339 * Math.sin(t * 6.7605))

type Values = Record<string, number>
type MotionProps = Pick<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'transition'>

/** 시작 전 멈춤 → [start, end] 구간에 EASE_OUT 으로 등장 → 끝까지 유지. 대부분의 요소가 이 패턴이다 */
function enter(from: Values, to: Values, start: number, end: number): MotionProps {
  return {
    initial: from,
    animate: Object.fromEntries(Object.keys(from).map((key) => [key, [from[key], from[key], to[key], to[key]]])),
    transition: { duration: DURATION, times: [0, start, end, 1], ease: ['linear', EASE_OUT, 'linear'] },
  }
}

const GREETING = enter({ opacity: 0, y: 18 }, { opacity: 1, y: 0 }, 0.0875, 0.2438)
const TITLE = enter({ opacity: 0, scaleX: 0.985, scaleY: 0.985, y: 36 }, { opacity: 1, scaleX: 1, scaleY: 1, y: 0 }, 0.2125, 0.4)
const DESCRIPTION = enter({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.35, 0.5063)
const CHARACTER_LABEL = enter({ opacity: 0, y: 14 }, { opacity: 1, y: 0 }, 0.425, 0.5688)
const DIVIDER = enter({ opacity: 0, scaleX: 0.08 }, { opacity: 1, scaleX: 1 }, 0.4844, 0.6406)
const SCROLL_HINT = enter({ opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0.625, 0.7688)

// 캐릭터: 오른쪽 아래에서 들어온 뒤 스프링으로 가볍게 흔들며 인사
const CHARACTER_ENTER: Transition = { duration: DURATION, times: [0, 0.1813, 1], ease: [EASE_OUT, 'linear'] }
const CHARACTER: MotionProps = {
  initial: { opacity: 0, rotate: 0, scaleX: 0.96, scaleY: 0.96, x: 72, y: 18 },
  animate: {
    opacity: [0, 1, 1],
    rotate: [0, 2, -2, 1.2, 0, 0],
    scaleX: [0.96, 1, 1],
    scaleY: [0.96, 1, 1],
    x: [72, 0, 0],
    y: [18, 0, 0],
  },
  transition: {
    opacity: CHARACTER_ENTER,
    scaleX: CHARACTER_ENTER,
    scaleY: CHARACTER_ENTER,
    x: CHARACTER_ENTER,
    y: CHARACTER_ENTER,
    rotate: {
      duration: DURATION,
      times: [0, 0.225, 0.3063, 0.3813, 0.4625, 1],
      ease: [SPRING, SPRING, SPRING, SPRING, 'linear'],
    },
  },
}

// 제목 옆 점: 커졌다가 스프링으로 제자리
const DOT_TIMES = [0, 0.3281, 0.4313, 0.5438, 1]
const DOT_SCALE: Transition = { duration: DURATION, times: DOT_TIMES, ease: ['linear', SPRING, SPRING, 'linear'] }
const DOT_ACCENT: MotionProps = {
  initial: { opacity: 0, scaleX: 0.4, scaleY: 0.4 },
  animate: { opacity: [0, 0, 0.5, 0.35, 0.35], scaleX: [0.4, 0.4, 1.35, 1, 1], scaleY: [0.4, 0.4, 1.35, 1, 1] },
  transition: {
    opacity: { duration: DURATION, times: DOT_TIMES, ease: ['linear', EASE_OUT, SPRING, 'linear'] },
    scaleX: DOT_SCALE,
    scaleY: DOT_SCALE,
  },
}

/** 이 중 하나라도 일어나면 기다리지 않고 바로 검색 화면으로 넘어간다 */
const SKIP_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchmove'] as const

interface PortfolioHeroProps {
  /** 3.5초가 지나거나 사용자가 클릭·키·스크롤·Skip 을 하면 불린다 */
  onDone: () => void
}

// 포트폴리오 인트로. 시안(1920×1080)의 좌우 여백 120 · 캐릭터 440×520 을 기준으로, 작은 화면에서는 위아래로 쌓는다.
// 제목은 확장(C) 스케일 32 → 40 → 56. 하단 구분선이 진행 막대가 되어 3.5초 동안 채워진다.
export default function PortfolioHero({ onDone }: PortfolioHeroProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, INTRO_SECONDS * 1000)
    SKIP_EVENTS.forEach((type) => window.addEventListener(type, onDone, { passive: true }))
    return () => {
      window.clearTimeout(timer)
      SKIP_EVENTS.forEach((type) => window.removeEventListener(type, onDone))
    }
  }, [onDone])

  // 움직임 줄이기 설정이면 애니메이션 없이 마지막 상태를 바로 보여준다
  const reduceMotion = useReducedMotion()
  const motionProps = (props: MotionProps) => (reduceMotion ? {} : props)

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-light">
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-[#eef2ff] to-[#f7f7fb] to-60%" />

      <div className="relative mx-auto flex min-h-svh max-w-480 flex-col px-5 sm:px-10 lg:px-30">
        {/* lg: 남는 높이 안에서 가운데 두되 위아래 여백 차(112 - 32)만큼 내려, 1080 높이에서 시안 좌표(캐릭터 200 · 텍스트 280)와 같아진다.
            화면이 낮으면 그만큼 위로 당겨져 하단 진행 막대와 겹치지 않는다 */}
        <div className="flex flex-1 flex-col justify-center gap-12 py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:content-center lg:items-start lg:gap-10 lg:pt-28 lg:pb-8">
          <div className="relative lg:pt-20">
            <motion.div {...motionProps(GREETING)} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-5.5 w-0.75 rounded-[2px] bg-portfolio" />
              <p lang="en" className="text-13 font-medium tracking-normal text-sub-weak">
                Hello, welcome to
              </p>
            </motion.div>

            <motion.h1
              {...motionProps(TITLE)}
              id="hero-title"
              lang="en"
              className="mt-4.5 flex flex-col gap-1 text-32 tracking-normal sm:text-40 lg:-ml-3 lg:text-56"
            >
              {/* 인트로가 끝나면 이 글자가 헤더의 'jsh.' 로고 자리로 날아간다 */}
              <motion.span layoutId={LOGO_LAYOUT_ID} className="w-fit font-semibold text-main">
                JSH
              </motion.span>
              <span className="font-medium text-portfolio">PORTFOLIO</span>
            </motion.h1>

            {/* 시안의 점(#486AF4, 불투명도 50%)을 통일한 포인트 파랑으로 그린다 */}
            <motion.span
              {...motionProps(DOT_ACCENT)}
              aria-hidden="true"
              className="absolute top-42.5 left-140 hidden size-2 rounded-full bg-portfolio/50 opacity-35 lg:block"
            />

            <motion.div
              {...motionProps(DESCRIPTION)}
              lang="en"
              className="mt-10 flex flex-col gap-2 text-16 font-medium tracking-normal sm:text-18 lg:mt-25 lg:text-20"
            >
              <p className="text-sub">Crafting clean interfaces</p>
              <p className="text-sub-weak">with thoughtful experience.</p>
            </motion.div>
          </div>

          <div className="flex w-full flex-col items-start lg:mr-40 lg:w-110">
            <motion.div
              {...motionProps(CHARACTER)}
              className="relative aspect-[440/520] w-full max-w-110 overflow-hidden"
            >
              {/* 세로로 긴 원본(736×1452)에서 머리~가슴만 보이도록 아래쪽에 맞춰 자른다 */}
              <img
                src={characterImg}
                alt="JSH 캐릭터 일러스트"
                className="size-full object-cover object-[50%_74%]"
              />
            </motion.div>

            <motion.div
              {...motionProps(CHARACTER_LABEL)}
              className="mt-2.5 ml-10 flex items-center rounded-full border border-light bg-white px-3 py-1.5 shadow-[0px_2px_4px_rgba(18,18,31,0.06)]"
            >
              <p lang="en" className="text-13 font-medium tracking-normal whitespace-nowrap text-sub-weak">
                JSH · Front-end Developer
              </p>
            </motion.div>
          </div>
        </div>

        <div className="pb-10 lg:pb-[min(152px,14.1svh)]">
          {/* 구분선을 트랙으로, 그 위에 포인트 파랑이 3.5초 동안 채워진다 */}
          <motion.div {...motionProps(DIVIDER)} aria-hidden="true" className="relative h-px w-full">
            <img src={dividerImg} alt="" className="block size-full" />
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTRO_SECONDS, ease: 'linear' }}
              className="absolute -top-px left-0 h-0.5 w-full origin-left bg-portfolio"
            />
          </motion.div>
          <motion.div {...motionProps(SCROLL_HINT)} className="mt-2 flex items-center justify-between gap-4 lg:mt-0">
            <p className="text-12 text-sub-weak">잠시 후 검색 화면으로 넘어가요</p>
            <button
              type="button"
              onClick={onDone}
              lang="en"
              className="flex min-h-11 items-center gap-1 text-13 font-medium tracking-normal text-sub hover:text-main"
            >
              Skip
              <ArrowRightIcon size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
