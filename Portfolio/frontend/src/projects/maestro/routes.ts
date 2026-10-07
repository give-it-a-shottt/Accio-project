/** 마에스트로는 포트폴리오 안에서 `#/maestro/…` 아래에 있다 */
export const MAESTRO_BASE = '/maestro'

/** 마에스트로 안 주소. maestroHref() → '#/maestro', maestroHref('/live', { meal: 0 }) → '#/maestro/live?meal=0' */
export function maestroHref(path = '', params: Record<string, string | number | undefined> = {}) {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value))
  }
  const query = search.toString()
  return `#${MAESTRO_BASE}${path}${query ? `?${query}` : ''}`
}

export function goTo(href: string) {
  window.location.hash = href.replace(/^#/, '')
}
