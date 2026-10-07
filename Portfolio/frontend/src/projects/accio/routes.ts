/** 쇼핑몰은 포트폴리오 안에서 `#/accio/…` 아래에 있다 */
export const ACCIO_BASE = '/accio'

/** 쇼핑몰 안 주소. accioHref() → '#/accio', accioHref('/list') → '#/accio/list' */
export function accioHref(path = '') {
  return `#${ACCIO_BASE}${path}`
}

/** 접두어가 없던 예전 주소('#/home', '#/list' …) → 쇼핑몰 안 경로. 공유된 옛 링크가 계속 열리게 한다 */
export const LEGACY_ROUTES: Record<string, string> = {
  '/home': '/',
  '/login': '/login',
  '/list': '/list',
  '/detail': '/detail',
  '/ai': '/ai',
  '/cart': '/cart',
  '/mypage': '/mypage',
  '/order': '/order',
  '/support': '/support',
}
