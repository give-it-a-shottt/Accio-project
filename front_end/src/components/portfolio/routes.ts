export type ResultTab = 'all' | 'front' | 'back'

const TABS: ResultTab[] = ['all', 'front', 'back']

/** `#/search?q=…&tab=…` 주소. 빈 검색어와 '전체' 탭은 주소에서 뺀다 */
export function searchHref(query = '', tab: ResultTab = 'all') {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (tab !== 'all') params.set('tab', tab)
  const search = params.toString()
  return `#/search${search ? `?${search}` : ''}`
}

export function readTab(value: string | null): ResultTab {
  return TABS.includes(value as ResultTab) ? (value as ResultTab) : 'all'
}

export function goTo(href: string) {
  window.location.hash = href.replace(/^#/, '')
}
