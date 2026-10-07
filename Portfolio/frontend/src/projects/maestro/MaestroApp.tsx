import { useEffect } from 'react'
import { wakeServer } from './api'
import HomeScreen from './screens/HomeScreen'
import LiveScreen from './screens/LiveScreen'
import PlaceScreen from './screens/PlaceScreen'
import PlanScreen from './screens/PlanScreen'
import ScoreScreen from './screens/ScoreScreen'

interface MaestroAppProps {
  /** '#/maestro' 뒤의 경로. '/' 는 홈 */
  path: string
  params: URLSearchParams
}

// 마에스트로(YUMITHON 2026) — 홈 → 일정 입력 → 악보 → 당일 모드 → 변주 결과 → 식당 상세
export default function MaestroApp({ path, params }: MaestroAppProps) {
  // 무료 서버는 쉬다가 깨는 데 1분쯤 걸려서, 들어오자마자 미리 깨워 둔다
  useEffect(() => {
    wakeServer()
  }, [])

  if (path === '/plan') return <PlanScreen />
  if (path === '/score') return <ScoreScreen />
  if (path === '/live') return <LiveScreen params={params} />
  if (path.startsWith('/place/')) return <PlaceScreen id={decodeURIComponent(path.slice('/place/'.length))} params={params} />
  return <HomeScreen />
}
