import { DIGITAL_SECTION, MY_PAGE, type OrderStatus } from '../data/mock'
import { formatCount, formatWon } from '../utils/format'
import { ChevronRightIcon } from './icons'
import { CARD_CLASS } from './layout'
import PageLayout from './PageLayout'
import ProductCard from './ProductCard'

// 상태 배지는 클릭 요소가 아니라 포인트 컬러 없이 무채색 단계로만 구분한다
const STATUS_BADGE_CLASS: Record<OrderStatus, string> = {
  배송중: 'bg-main text-white',
  배송완료: 'bg-regular text-main',
  구매확정: 'border border-regular text-sub-weak',
}

const STATUS_ACTION: Record<OrderStatus, { label: string; href: string; strong?: boolean }> = {
  배송중: { label: '배송 조회', href: '#/order' },
  배송완료: { label: '리뷰 쓰기', href: '#/detail', strong: true },
  구매확정: { label: '재구매', href: '#/detail' },
}

function SectionHeader({ title, linkLabel }: { title: string; linkLabel: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-18 font-semibold text-main sm:text-20">{title}</h2>
      <a href="#" className="flex h-11 items-center gap-1 text-13 font-medium text-sub hover:text-main">
        {linkLabel}
        <ChevronRightIcon size={16} />
      </a>
    </div>
  )
}

// 왼쪽 프로필·메뉴 카드 + 오른쪽 섹션 카드들 (Card UI 전체 그룹, 카드 간 16).
// lg 미만에서는 메뉴가 프로필 아래 가로 스크롤 칩으로 바뀐다.
export default function MyPage() {
  return (
    <PageLayout title="마이페이지">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <nav aria-label="마이페이지 메뉴" className={`overflow-hidden lg:w-65 lg:shrink-0 ${CARD_CLASS}`}>
          <div className="flex items-center gap-3 p-6">
            <div
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-regular text-18 font-semibold text-sub"
            >
              {MY_PAGE.name.slice(0, 1)}
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-18 font-semibold text-main">{MY_PAGE.name}님</p>
              <p className="text-13 text-sub-weak tabular-nums">
                {MY_PAGE.grade} 등급 · {formatCount(MY_PAGE.point)}P
              </p>
            </div>
          </div>
          <ul className="scrollbar-none flex gap-2 overflow-x-auto px-6 pb-5 lg:flex-col lg:gap-0 lg:border-t lg:border-light lg:px-0 lg:py-2">
            {MY_PAGE.menu.map(({ label, count, href }, i) => (
              <li key={label} className="shrink-0">
                <a
                  href={href}
                  aria-current={i === 0 ? 'page' : undefined}
                  className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-13 whitespace-nowrap lg:h-12 lg:justify-between lg:rounded-none lg:border-0 lg:px-6 lg:text-14 ${i === 0 ? 'border-black font-semibold text-main lg:bg-light' : 'border-regular font-medium text-main hover:bg-light'}`}
                >
                  <span>{label}</span>
                  {count !== undefined && (
                    <span className={`text-13 tabular-nums ${i === 0 ? 'text-main' : 'text-sub-weak'}`}>{count}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <section aria-label="주문 현황" className={`overflow-hidden ${CARD_CLASS}`}>
            {/* 칸 사이 1px 틈으로 구분선을 만든다 (2열 → 4열 모두 대응) */}
            <ul className="grid grid-cols-2 gap-px bg-light sm:grid-cols-4">
              {MY_PAGE.orderSummary.map(({ label, count, actionable }) => (
                <li key={label} className="bg-white">
                  <a href="#" className="flex flex-col items-center gap-1 px-4 py-6 hover:bg-light">
                    <span className={`text-28 font-semibold tabular-nums ${actionable ? 'text-accent' : 'text-main'}`}>
                      {count}
                    </span>
                    <span className="text-13 font-medium text-sub">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className={`px-6 pt-4 pb-8 ${CARD_CLASS}`}>
            <SectionHeader title="최근 주문" linkLabel="전체보기" />
            <ul className="divide-y divide-light">
              {MY_PAGE.recentOrders.map((order) => {
                const action = STATUS_ACTION[order.status]
                return (
                  <li key={order.id} className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="size-16 shrink-0 overflow-hidden rounded-thumb-sm bg-light">
                      {order.image && <img src={order.image} alt="" className="size-full object-cover" />}
                    </div>
                    <div className="flex min-w-0 flex-1 basis-40 flex-col">
                      <span className="text-12 font-medium text-sub-weak tabular-nums">
                        {order.date} · {order.id}
                      </span>
                      <a href="#/order" className="mt-1 truncate text-16 font-semibold text-main">
                        {order.title}
                      </a>
                      <span className="mt-1.5 text-12 text-sub tabular-nums">{formatWon(order.amount)}</span>
                    </div>
                    <div className="flex items-center gap-3 max-sm:w-full max-sm:justify-between max-sm:pl-20">
                      <span className={`rounded-badge px-2 py-1 text-12 font-medium ${STATUS_BADGE_CLASS[order.status]}`}>
                        {order.status}
                      </span>
                      <a
                        href={action.href}
                        className={`flex h-11 items-center rounded-card-sm border px-4 text-13 text-main ${action.strong ? 'border-black font-semibold' : 'border-regular font-medium hover:border-black'}`}
                      >
                        {action.label}
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className={`px-6 pt-4 pb-8 ${CARD_CLASS}`}>
            <SectionHeader title="최근 본 상품" linkLabel="24개 모두 보기" />
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4">
              {DIGITAL_SECTION.products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} widthClass="w-full min-w-0" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
