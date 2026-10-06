import accioHome from '../assets/portfolio/home.png'

// 검색형 포트폴리오 데이터 — 기준: 「검색형 포트폴리오 구상안」 Search Portfolio.dc.html
// Accio 를 뺀 사례·지표는 시안의 예시 값이다. 실제 사례를 정리하면 여기서 바꾼다.

export type CaseType = 'Front' | 'Back'

export interface PortfolioCase {
  slug: string
  type: CaseType
  code: string
  date: string
  title: string
  description: string
  metrics: { label: string; value: string }[]
  tags: string[]
  /** 화면에 보이지 않는 추가 검색어 */
  keywords: string
  /** Front 썸네일. 없으면 자리표시를 보여준다 */
  image?: string
  /** 눌렀을 때 갈 곳. 없으면 링크 없이 보여준다 */
  href?: string
}

export const CASES: PortfolioCase[] = [
  {
    slug: 'accio',
    type: 'Front',
    code: 'PROJECT 01',
    date: '2025.11',
    title: 'Accio — AI 자연어 검색 쇼핑몰',
    description:
      '“USB 여러 개 꽂는 거”처럼 모호한 말도 알아듣는 쇼핑몰. 디자인 시스템을 정의하고 대화형 검색부터 장바구니·주문까지 구현.',
    metrics: [
      { label: '기간', value: '2025.10 – 11' },
      { label: '팀', value: '5명' },
    ],
    tags: ['React', 'TypeScript', 'Tailwind'],
    keywords: 'accio 아씨오 쇼핑몰 이커머스 ai 검색 리액트 디자인 시스템',
    image: accioHome,
    href: '#/home',
  },
  {
    slug: 'traffic-scale-out',
    type: 'Back',
    code: 'CASE 01',
    date: '2026.03',
    title: '트래픽 10배 급증 시 API 서버 수평 확장',
    description: '이벤트 오픈 직후 요청이 몰려 응답이 지연되는 상황. 오토스케일링 정책과 로드밸런서 헬스체크를 재설계해 해결.',
    metrics: [
      { label: '처리량', value: '1.2k → 12k RPS' },
      { label: '에러율', value: '4.1% → 0.2%' },
    ],
    tags: ['오토스케일링', '로드밸런서', '부하테스트'],
    keywords: '트래픽 급증 서버 확장 스케일',
  },
  {
    slug: 'connection-pool',
    type: 'Back',
    code: 'CASE 02',
    date: '2026.04',
    title: 'DB 커넥션 풀 고갈로 인한 장애 대응',
    description: '슬로우 쿼리가 커넥션을 붙잡아 전체 API가 멈춘 상황. 풀 사이즈 튜닝과 쿼리 타임아웃으로 재발 방지.',
    metrics: [{ label: 'p95 응답', value: '2.4s → 210ms' }],
    tags: ['MySQL', 'HikariCP', '장애대응'],
    keywords: '커넥션 풀 DB 데이터베이스 장애',
  },
  {
    slug: 'n-plus-one',
    type: 'Back',
    code: 'CASE 03',
    date: '2026.05',
    title: 'N+1 쿼리로 느려진 목록 API 개선',
    description: '연관 엔티티 조회 시 쿼리가 행 수만큼 실행되던 문제. fetch join과 배치 조회로 쿼리 수를 줄임.',
    metrics: [
      { label: '쿼리 수', value: '101 → 2' },
      { label: '응답', value: '840ms → 90ms' },
    ],
    tags: ['JPA', '쿼리최적화'],
    keywords: 'N+1 쿼리 성능 개선 JPA',
  },
  {
    slug: 'redis-cache',
    type: 'Back',
    code: 'CASE 04',
    date: '2026.06',
    title: 'Redis 캐시 도입과 캐시 스탬피드 방지',
    description: '인기 상품 조회가 DB에 집중되던 문제. 캐시 계층을 추가하고 만료 시점 분산으로 동시 재조회를 막음.',
    metrics: [
      { label: '캐시 히트율', value: '92%' },
      { label: 'DB 부하', value: '-70%' },
    ],
    tags: ['Redis', '캐시전략'],
    keywords: '캐시 레디스 성능 개선',
  },
  {
    slug: 'blue-green-deploy',
    type: 'Back',
    code: 'CASE 05',
    date: '2026.07',
    title: 'Blue/Green 무중단 배포 파이프라인 구축',
    description: '배포마다 수 분간 서비스가 끊기던 문제. CI/CD 파이프라인과 트래픽 전환 방식으로 다운타임 제거.',
    metrics: [{ label: '다운타임', value: '3분 → 0' }],
    tags: ['GitHub Actions', 'Docker', 'CI/CD'],
    keywords: '무중단 배포 자동화 파이프라인',
  },
  {
    slug: 'message-queue',
    type: 'Back',
    code: 'CASE 06',
    date: '2026.08',
    title: '메시지 큐로 결제 알림 비동기 처리',
    description: '결제 완료 후 알림 발송이 응답을 붙잡던 문제. 메시지 큐로 분리해 응답 시간과 장애 전파를 줄임.',
    metrics: [{ label: '응답', value: '900ms → 120ms' }],
    tags: ['Kafka', '비동기'],
    keywords: '메시지 큐 비동기 카프카 결제',
  },
  {
    slug: 'design-system-ui',
    type: 'Front',
    code: 'PROJECT 02',
    date: '2026.02',
    title: '디자인 시스템 기반 포트폴리오 UI',
    description: '컬러·타이포·여백 토큰을 정의하고 컴포넌트로 정리해 화면 전반의 일관성을 맞춘 작업.',
    metrics: [{ label: '컴포넌트', value: '24개' }],
    tags: ['디자인시스템', 'Figma'],
    keywords: '디자인 시스템 UI 토큰',
  },
  {
    slug: 'dashboard-rendering',
    type: 'Front',
    code: 'PROJECT 03',
    date: '2026.05',
    title: '대시보드 렌더링 성능 개선',
    description: '수천 행 테이블에서 스크롤이 끊기던 문제. 가상 스크롤과 메모이제이션으로 렌더링 비용을 줄임.',
    metrics: [{ label: 'LCP', value: '3.1s → 1.2s' }],
    tags: ['React', '가상스크롤'],
    keywords: '성능 개선 렌더링 대시보드',
  },
  {
    slug: 'search-portfolio',
    type: 'Front',
    code: 'PROJECT 04',
    date: '2026.09',
    title: '검색형 포트폴리오 인터페이스',
    description: '포트폴리오를 검색으로 탐색하도록 설계한 인터페이스. 자동완성과 키보드 탐색을 지원.',
    metrics: [{ label: '단축키', value: '/ 로 검색' }],
    tags: ['UX', '검색'],
    keywords: '검색 UX 인터페이스',
  },
]

export const KEYWORDS: { label: string; type: CaseType }[] = [
  { label: '트래픽 급증', type: 'Back' },
  { label: '커넥션 풀', type: 'Back' },
  { label: 'N+1 쿼리', type: 'Back' },
  { label: '캐시', type: 'Back' },
  { label: '무중단 배포', type: 'Back' },
  { label: '메시지 큐', type: 'Back' },
  { label: '성능 개선', type: 'Front' },
  { label: '디자인 시스템', type: 'Front' },
]

// ── 검색 ────────────────────────────────────────────────────────────────
const haystack = (item: PortfolioCase) =>
  [item.title, item.description, item.tags.join(' '), item.keywords].join(' ').toLowerCase()

/** 공백으로 나눈 모든 단어가 제목·설명·태그·검색어 어딘가에 들어 있으면 일치 */
export function matchesQuery(item: PortfolioCase, query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const text = haystack(item)
  return words.every((word) => text.includes(word))
}

export interface Suggestion {
  text: string
  type: CaseType
}

/** 빈 입력이면 추천 키워드, 입력이 있으면 키워드 + 사례 제목 중 부분 일치 */
export function getSuggestions(query: string, limit = 6): Suggestion[] {
  const q = query.trim().toLowerCase()
  if (!q) return KEYWORDS.slice(0, limit).map(({ label, type }) => ({ text: label, type }))
  const pool = [
    ...KEYWORDS.map(({ label, type }) => ({ text: label, type })),
    ...CASES.map(({ title, type }) => ({ text: title, type })),
  ]
  return pool.filter(({ text }) => text.toLowerCase().includes(q)).slice(0, limit)
}

/** 자동완성에서 일치한 부분만 굵게 보여주기 위해 앞·일치·뒤로 나눈다 */
export function splitMatch(text: string, query: string) {
  const q = query.trim()
  const index = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1
  if (index < 0) return { before: text, match: '', after: '' }
  return { before: text.slice(0, index), match: text.slice(index, index + q.length), after: text.slice(index + q.length) }
}
