import { useState, type ReactNode } from 'react'
import { CART_COUPON, CART_ITEMS, type CartItem } from '../data/mock'
import { formatWon } from '../utils/format'
import { CheckIcon, MinusIcon, PlusIcon } from './icons'
import { CARD_CLASS } from './layout'
import PageLayout from './PageLayout'

const MAX_QUANTITY = 99
const STEPS = ['장바구니', '주문서', '주문완료']

// 체크박스 — 목록 필터(ListPage)와 같은 검정 채움 스타일
// 옆에 보이는 글자가 있으면 children 으로, 없으면 label 로 이름을 붙인다
function Checkbox({
  checked,
  onChange,
  label,
  children,
}: {
  checked: boolean
  onChange: () => void
  label?: string
  children?: ReactNode
}) {
  return (
    <label className="flex min-h-11 shrink-0 cursor-pointer items-center gap-3">
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`flex size-5 items-center justify-center rounded-badge text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${checked ? 'bg-main' : 'border-[1.5px] border-regular bg-white'}`}
      >
        {checked && <CheckIcon size={16} />}
      </span>
      {children}
    </label>
  )
}

// 장바구니 아이템은 리스트 아이템 B 스케일 — 모바일 B-2 → sm B-3 → lg B-4
function CartRow({
  item,
  checked,
  onToggle,
  onQuantity,
  onRemove,
}: {
  item: CartItem
  checked: boolean
  onToggle: () => void
  onQuantity: (quantity: number) => void
  onRemove: () => void
}) {
  const discountRate = Math.round((1 - item.price / item.listPrice) * 100)

  return (
    <li className="flex gap-3 p-5 sm:gap-4 sm:p-6">
      <div className="-mt-3">
        <Checkbox checked={checked} onChange={onToggle} label={`${item.name} 선택`} />
      </div>
      <div className="size-20 shrink-0 overflow-hidden rounded-thumb bg-light sm:size-24">
        {item.image && <img src={item.image} alt="" className="size-full object-cover" />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex min-w-0 flex-col items-start">
          <span className="text-12 font-medium text-main lg:text-13">{item.brand}</span>
          <a href="#/detail" className="mt-1 line-clamp-2 text-16 font-semibold text-main sm:text-18 lg:text-20">
            {item.name}
          </a>
          <span className="mt-1.5 text-12 text-sub sm:mt-2 sm:text-13">
            {item.option} · {item.delivery}
          </span>

          <div className="mt-4 flex h-10 items-center rounded-full border border-regular bg-white">
            <button
              type="button"
              aria-label="수량 빼기"
              disabled={item.quantity <= 1}
              onClick={() => onQuantity(item.quantity - 1)}
              className="flex size-10 items-center justify-center text-main disabled:cursor-default disabled:text-disabled"
            >
              <MinusIcon size={16} />
            </button>
            <output aria-label="수량" className="min-w-6 text-center text-14 font-semibold text-main tabular-nums">
              {item.quantity}
            </output>
            <button
              type="button"
              aria-label="수량 더하기"
              disabled={item.quantity >= MAX_QUANTITY}
              onClick={() => onQuantity(item.quantity + 1)}
              className="flex size-10 items-center justify-center text-main disabled:cursor-default disabled:text-disabled"
            >
              <PlusIcon size={16} />
            </button>
          </div>
        </div>

        <div className="flex shrink-0 flex-row-reverse items-end justify-between sm:flex-col sm:items-end">
          <button type="button" onClick={onRemove} className="h-8 text-13 font-medium text-sub-weak hover:text-main">
            삭제
          </button>
          <div className="flex flex-col sm:items-end">
            <span className="text-12 text-sub-weak tabular-nums line-through sm:text-13">
              {formatWon(item.listPrice * item.quantity)}
            </span>
            <span className="mt-1 flex gap-1.5 text-18 font-semibold tabular-nums lg:text-20">
              <span className="text-accent">{discountRate}%</span>
              <span className="text-main">{formatWon(item.price * item.quantity)}</span>
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function CartPage() {
  const [items, setItems] = useState(CART_ITEMS)
  const [selected, setSelected] = useState(() => new Set(CART_ITEMS.map((item) => item.id)))

  const selectedItems = items.filter((item) => selected.has(item.id))
  const allSelected = items.length > 0 && selectedItems.length === items.length
  const listTotal = selectedItems.reduce((sum, item) => sum + item.listPrice * item.quantity, 0)
  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const couponGap = CART_COUPON.threshold - total

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(items.map((item) => item.id)))
  const setQuantity = (id: string, quantity: number) =>
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  const remove = (ids: string[]) => {
    setItems((prev) => prev.filter((item) => !ids.includes(item.id)))
    setSelected((prev) => new Set([...prev].filter((id) => !ids.includes(id))))
  }

  return (
    <PageLayout
      title="장바구니"
      description={`담은 상품 ${items.length}개`}
      aside={
        <ol aria-label="주문 단계" className="flex gap-4 text-13">
          {STEPS.map((step, i) => (
            <li
              key={step}
              aria-current={i === 0 ? 'step' : undefined}
              className={i === 0 ? 'font-semibold text-main' : 'font-medium text-disabled'}
            >
              {String(i + 1).padStart(2, '0')} {step}
            </li>
          ))}
        </ol>
      }
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <section aria-label="담은 상품" className={`min-w-0 flex-1 overflow-hidden ${CARD_CLASS}`}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
              <p className="text-15 text-sub">장바구니가 비어 있어요</p>
              <a href="#/home" className="flex h-11 items-center rounded-full border border-black px-5 text-14 font-semibold text-main">
                쇼핑하러 가기
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4 border-b border-light px-5 py-3 sm:px-6">
                <Checkbox checked={allSelected} onChange={toggleAll}>
                  <span className="text-14 font-medium text-main tabular-nums">
                    전체선택 ({selectedItems.length}/{items.length})
                  </span>
                </Checkbox>
                <button
                  type="button"
                  disabled={selectedItems.length === 0}
                  onClick={() => remove(selectedItems.map((item) => item.id))}
                  className="h-11 text-13 font-medium text-sub hover:text-main disabled:cursor-default disabled:text-disabled"
                >
                  선택삭제
                </button>
              </div>
              <ul className="divide-y divide-light">
                {items.map((item) => (
                  <CartRow
                    key={item.id}
                    item={item}
                    checked={selected.has(item.id)}
                    onToggle={() => toggle(item.id)}
                    onQuantity={(quantity) => setQuantity(item.id, quantity)}
                    onRemove={() => remove([item.id])}
                  />
                ))}
              </ul>
            </>
          )}
        </section>

        <aside aria-label="결제 예정 금액" className="flex flex-col gap-4 lg:sticky lg:top-6 lg:w-90 lg:shrink-0">
          <div className={`flex flex-col gap-4 p-6 ${CARD_CLASS}`}>
            <h2 className="text-18 font-semibold text-main">결제 예정 금액</h2>
            <dl className="flex flex-col gap-3 text-14 tabular-nums">
              <div className="flex justify-between">
                <dt className="text-sub">상품금액</dt>
                <dd className="font-medium text-main">{formatWon(listTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sub">할인금액</dt>
                <dd className="font-medium text-main">−{formatWon(listTotal - total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sub">배송비</dt>
                <dd className="font-medium text-main">0원</dd>
              </div>
            </dl>
            <div className="flex items-baseline justify-between border-t border-light pt-4">
              <span className="text-15 font-semibold text-main">총 결제금액</span>
              <span className="text-24 font-semibold text-main tabular-nums">{formatWon(total)}</span>
            </div>
            <button
              type="button"
              disabled={selectedItems.length === 0}
              className="h-14 rounded-card-sm bg-accent text-16 font-semibold text-white disabled:cursor-default disabled:bg-regular disabled:text-disabled"
            >
              {selectedItems.length === 0 ? '상품을 선택해 주세요' : `${formatWon(total)} 주문하기`}
            </button>
          </div>

          {total > 0 && (
            <div className={`flex flex-col gap-3 px-6 py-5 ${CARD_CLASS}`}>
              <p className="text-13 text-sub">
                {couponGap > 0
                  ? `${formatWon(couponGap)} 더 담으면 ${CART_COUPON.rate}% 추가 쿠폰을 받아요.`
                  : `${CART_COUPON.rate}% 추가 쿠폰을 받을 수 있어요.`}
              </p>
              <div className="h-1 overflow-hidden rounded-full bg-regular" aria-hidden="true">
                <div className="h-full bg-main" style={{ width: `${Math.min(100, (total / CART_COUPON.threshold) * 100)}%` }} />
              </div>
            </div>
          )}
        </aside>
      </div>
    </PageLayout>
  )
}
