import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useFrameLayer } from '../../shared/frameLayer'
import MobileFrame from '../../shared/MobileFrame'
import { getServerState, subscribeServerState } from './api'
import { examplePhoto } from './format'
import type { Place } from './types'

// 피그마 시안은 375×812 휴대폰 화면이다. 넓은 화면에서는 가운데에 둥근 휴대폰 틀로 보여준다.
export function Screen({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <MobileFrame width={375} height={812}>
      <ServerWakeNotice />
      <div className={`flex flex-1 flex-col ${className}`}>{children}</div>
    </MobileFrame>
  )
}

/** 잠든 무료 서버가 깨어나는 동안 화면 위에 띄우는 안내 */
function ServerWakeNotice() {
  const state = useSyncExternalStore(subscribeServerState, getServerState)
  return (
    <div role="status" aria-live="polite" className="sticky top-0 z-30">
      {state === 'waking' && (
        <p className="flex items-center gap-2 bg-light px-5 py-2.5 text-12 break-keep text-main">
          <span aria-hidden="true" className="size-1.5 shrink-0 animate-pulse rounded-full bg-maestro" />
          서버를 깨우는 중이에요. 무료 서버라 처음 한 번은 1분쯤 걸려요.
        </p>
      )}
    </div>
  )
}

/** 화면 아래에 붙는 버튼 영역 */
export function Footer({ children }: { children: ReactNode }) {
  return <div className="sticky bottom-0 mt-auto bg-white px-5 pt-3 pb-[34px]">{children}</div>
}

/** 보라 버튼 — 모서리(8 / 12)와 글자 크기(14 / 15)는 화면마다 달라서 따로 붙인다 */
export const BRAND_BUTTON_BASE =
  'flex h-14 w-full items-center justify-center bg-maestro font-semibold text-white disabled:opacity-60'
export const BRAND_BUTTON_CLASS = `${BRAND_BUTTON_BASE} rounded-thumb-sm text-15`

/** '— SCORE · 10.17 SAT' 처럼 앞에 짧은 선이 붙는 라벨 */
export function SectionLabel({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-11 ${muted ? 'text-sub' : 'text-main'}`}>
      <span aria-hidden="true" className={`h-px w-4 ${muted ? 'bg-[#505050]' : 'bg-main'}`} />
      {children}
    </p>
  )
}

/** 화면 위 '‹' 와 단계 표시 */
export function StepNav({ backHref, step }: { backHref: string; step?: string }) {
  return (
    <div className="flex items-center justify-between text-main">
      <a href={backHref} aria-label="뒤로" className="-ml-2 flex size-9 items-center justify-center text-[22px] leading-none">
        ‹
      </a>
      {step && <p className="text-12">{step}</p>}
    </div>
  )
}

/** 검증 배지 — 외곽선 알약 */
export function Tag({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <span className={`rounded-full border border-black px-2 py-[3px] text-11 ${muted ? 'text-sub' : 'text-main'}`}>
      {children}
    </span>
  )
}

/** 유미 파트너 매장 — 앱으로 바로 문의할 수 있다 */
export function PartnerTag() {
  return <span className="rounded-full bg-maestro px-2 py-[3px] text-[10px] leading-[1.55] text-white">● 바로 문의</span>
}

/** 음식 종류에 맞춘 예시 사진 — 실제 매장 사진이 아니라고 밝혀 둔다 */
export function PlacePhoto({ place, number, className = '' }: { place: Place | null; number?: string; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden bg-regular ${className}`}>
      <img src={examplePhoto(place)} alt="" className="absolute inset-0 size-full object-cover" />
      <span className="absolute bottom-2.5 left-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-0.5 text-[10px] leading-[1.5] text-white">
        {number && <span lang="en">{number}</span>}
        예시 사진
      </span>
    </div>
  )
}

interface BottomSheetProps {
  onClose: () => void
  labelledBy: string
  children: ReactNode
}

/** 아래에서 올라오는 시트. 배경을 누르거나 Esc 로 닫는다. */
export function BottomSheet({ onClose, labelledBy, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const layer = useFrameLayer()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    sheetRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    // 시트가 열린 동안 뒤 화면이 같이 스크롤되지 않게 한다
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [onClose])

  // 휴대폰 틀 안에 띄운다 — 휴대폰에서는 화면 전체, 넓은 화면에서는 둥근 틀 안
  return createPortal(
    <div className="fixed inset-0 z-40 sm:absolute">
      <motion.button
          type="button"
          aria-label="닫기"
          onClick={onClose}
        className="absolute inset-0 bg-maestro-dim"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        initial={reduceMotion ? false : { y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        className="scrollbar-none absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col overflow-y-auto rounded-t-[25px] bg-white outline-none sm:max-h-[92%]"
      >
        <div aria-hidden="true" className="flex h-6 shrink-0 items-center justify-center">
          <span className="h-1 w-9 rounded-[2px] bg-[#767676]" />
        </div>
        {children}
      </motion.div>
    </div>,
    layer ?? document.body,
  )
}
