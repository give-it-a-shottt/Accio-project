import type { ComponentType } from 'react'
import StayLoginDemo from './StayLoginDemo'

/** Design 사례 slug → 최종안을 실제로 동작하게 만든 화면. 새 사례를 올릴 때 여기에 등록한다 */
export const DESIGN_DEMOS: Record<string, ComponentType> = {
  'stay-login': StayLoginDemo,
}
