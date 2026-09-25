import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

// 시안(1280px) 기준 좌우 여백 40px + 안쪽 16px → 콘텐츠 폭 1168px. 배경은 전체 폭, 콘텐츠만 최대 1200px 로 가운데 정렬한다.
// lg 미만에서는 좌우 여백을 16px(모바일) / 24px(태블릿)로 줄인다. 가로 캐러셀은 BLEED_CLASS 로 이 여백까지 채운다.
export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <div className={`mx-auto w-full max-w-[1200px] lg:px-4 ${className}`}>{children}</div>
    </div>
  )
}
