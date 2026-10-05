import { useState } from 'react'
import { ORDER_TRACKING } from '../data/mock'
import { CARD_CLASS } from './layout'
import PageLayout from './PageLayout'

// 주문 요약 카드(진행 단계) 아래에 배송 추적 + 배송지 카드. 진행 표시는 아이콘 대신 4칸 막대와 글자로만 보여준다.
export default function OrderTrackingPage() {
  const { orderId, orderedAt, title, steps, currentStep, eta, carrier, invoice, events, address } = ORDER_TRACKING
  const [copied, setCopied] = useState(false)

  const copyInvoice = async () => {
    try {
      await navigator.clipboard.writeText(invoice)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 권한이 없으면 운송장 번호가 화면에 그대로 보이므로 따로 알리지 않는다
    }
  }

  return (
    <PageLayout title="주문/배송 조회" description="배송 상태는 택배사 정보를 기준으로 10분마다 새로 고쳐요.">
      <section className={`flex flex-col gap-6 px-6 pt-6 pb-8 ${CARD_CLASS}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-13 font-medium text-sub-weak tabular-nums">
              주문번호 {orderId} · {orderedAt} 결제
            </p>
            <h2 className="text-18 font-semibold text-main sm:text-20">{title}</h2>
          </div>
          <span className="shrink-0 rounded-badge bg-main px-2 py-1 text-12 font-medium text-white">
            {steps[currentStep].label}
          </span>
        </div>

        <div className="flex flex-col gap-1 rounded-card-sm bg-light px-5 py-5 sm:px-6">
          <p className="text-14 font-medium text-main">도착 예정</p>
          <p className="text-20 font-semibold text-main sm:text-24">{eta}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-14 text-sub tabular-nums">
              {carrier} {invoice}
            </span>
            <button
              type="button"
              onClick={copyInvoice}
              className="h-8 rounded-full border border-regular bg-white px-3 text-12 font-medium text-main hover:border-black"
            >
              {copied ? '복사했어요' : '운송장 복사'}
            </button>
          </div>
        </div>

        <ol aria-label="배송 단계" className="grid grid-cols-4 gap-1">
          {steps.map((step, i) => {
            const done = i <= currentStep
            return (
              <li key={step.label} aria-current={i === currentStep ? 'step' : undefined} className="flex flex-col gap-3">
                <span aria-hidden="true" className={`h-1 rounded-full ${done ? 'bg-main' : 'bg-regular'}`} />
                <span className="flex flex-col">
                  <span
                    className={`text-13 sm:text-14 ${i === currentStep ? 'font-semibold text-main' : done ? 'font-medium text-main' : 'font-medium text-disabled'}`}
                  >
                    {step.label}
                  </span>
                  <span className={`text-12 tabular-nums ${done ? 'text-sub-weak' : 'text-disabled'}`}>{step.time}</span>
                </span>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <section className={`min-w-0 flex-1 px-6 pt-6 pb-8 ${CARD_CLASS}`}>
          <h2 className="mb-4 text-18 font-semibold text-main">배송 추적</h2>
          <ol>
            {events.map((event, i) => {
              const latest = i === 0
              const last = i === events.length - 1
              return (
                <li key={event.time} className="grid grid-cols-[88px_20px_minmax(0,1fr)] gap-x-3 sm:grid-cols-[96px_20px_minmax(0,1fr)]">
                  <span className="pt-3 text-13 text-sub-weak tabular-nums">{event.time}</span>
                  {/* 세로 선 + 점. 가장 최근 단계만 채운 점으로 강조한다 */}
                  <span aria-hidden="true" className="flex flex-col items-center">
                    <span className={`h-4 w-px ${i === 0 ? '' : 'bg-regular'}`} />
                    {latest ? (
                      <span className="size-3 rounded-full bg-main ring-4 ring-[#f1f1f5]" />
                    ) : (
                      <span className="size-2 rounded-full border-2 border-regular bg-white" />
                    )}
                    {!last && <span className="w-px flex-1 bg-regular" />}
                  </span>
                  <span className={`flex flex-wrap gap-x-4 gap-y-1 pt-3 ${last ? '' : 'pb-5'}`}>
                    <span className={`min-w-18 text-14 text-main ${latest ? 'font-semibold' : 'font-medium'}`}>
                      {event.status}
                    </span>
                    <span className="text-14 text-sub">{event.place}</span>
                  </span>
                </li>
              )
            })}
          </ol>
        </section>

        <aside className={`flex flex-col gap-4 px-6 pt-6 pb-8 lg:w-90 lg:shrink-0 ${CARD_CLASS}`}>
          <h2 className="text-18 font-semibold text-main">배송지</h2>
          <dl className="flex flex-col gap-3 text-14 text-main">
            {[
              ['받는 분', `${address.name} · ${address.phone}`],
              ['주소', address.address],
              ['요청사항', address.request],
            ].map(([term, detail]) => (
              <div key={term} className="flex flex-col gap-1">
                <dt className="text-12 font-medium text-sub-weak">{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-2 border-t border-light pt-4">
            <button
              type="button"
              disabled
              aria-describedby="address-locked"
              className="h-11 rounded-card-sm border border-regular bg-regular text-14 font-medium text-disabled"
            >
              배송지 변경
            </button>
            <p id="address-locked" className="text-12 text-sub-weak">
              배송이 시작되면 배송지를 바꿀 수 없어요.
            </p>
          </div>
          <a
            href="#/support"
            className="flex h-11 items-center justify-center rounded-card-sm border border-black text-14 font-semibold text-main"
          >
            배송 문의하기
          </a>
        </aside>
      </div>
    </PageLayout>
  )
}
