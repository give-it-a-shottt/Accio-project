import { useEffect, useRef, useState } from 'react'
import logo from '../assets/figma/v3/logo.svg'
import { SUPPORT } from '../data/mock'
import { ArrowUpIcon, ChevronDownIcon, ParcelIcon, ReceiptIcon, SwapIcon } from '../../../shared/icons'
import { CARD_CLASS } from './layout'
import PageLayout from './PageLayout'

const CATEGORY_ICON = {
  delivery: ParcelIcon,
  exchange: SwapIcon,
  payment: ReceiptIcon,
}

function SupportChat() {
  const { chat } = SUPPORT
  const [messages, setMessages] = useState(chat.messages)
  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLOListElement>(null)

  // 새 메시지가 붙으면 대화창 맨 아래로 내린다
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: trimmed },
      { from: 'bot', text: chat.replies[trimmed] ?? chat.fallbackReply },
    ])
    setDraft('')
  }

  return (
    <section aria-label="AI 상담" className={`flex flex-col overflow-hidden lg:sticky lg:top-6 lg:w-95 lg:shrink-0 ${CARD_CLASS}`}>
      <div className="flex items-center justify-between gap-3 bg-main px-5 py-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="ACCIO" className="h-4 w-auto" />
          <span className="text-15 font-semibold text-white">{chat.title}</span>
        </div>
        <span className="text-12 text-[#a5a5af]">{chat.responseTime}</span>
      </div>

      <ol ref={listRef} aria-live="polite" className="flex h-105 flex-col gap-3 overflow-y-auto p-5">
        {messages.map((message, i) => (
          <li
            key={i}
            className={`max-w-[85%] rounded-card-sm px-4 py-3 text-14 break-keep ${message.from === 'user' ? 'self-end rounded-br-badge bg-main text-white' : 'self-start rounded-bl-badge bg-light text-main'}`}
          >
            {message.text}
          </li>
        ))}
        <li className="flex flex-wrap gap-2 pt-1">
          {chat.quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => send(reply)}
              className="h-9 rounded-full border border-regular bg-white px-4 text-13 font-medium text-main hover:border-black"
            >
              {reply}
            </button>
          ))}
        </li>
      </ol>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(draft)
        }}
        className="flex items-center gap-2 border-t border-light p-4"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={chat.placeholder}
          aria-label="상담 메시지"
          className="h-11 min-w-0 flex-1 rounded-full bg-regular px-4 text-14 text-main outline-none placeholder:text-disabled"
        />
        <button
          type="submit"
          aria-label="보내기"
          disabled={!draft.trim()}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-white disabled:cursor-default disabled:bg-regular disabled:text-disabled"
        >
          <ArrowUpIcon />
        </button>
      </form>
    </section>
  )
}

// 왼쪽: 문의 유형 + 자주 묻는 질문, 오른쪽: AI 상담 창 (lg 미만에서는 아래로 쌓인다)
export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <PageLayout title="고객센터" description={SUPPORT.description}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <ul className="grid gap-3 sm:grid-cols-3">
            {SUPPORT.categories.map(({ id, label, description }) => {
              const Icon = CATEGORY_ICON[id]
              return (
                <li key={id}>
                  <a href="#" className={`flex h-full flex-col gap-4 p-5 hover:border-black ${CARD_CLASS}`}>
                    <span className="flex size-11 items-center justify-center rounded-card-sm bg-light text-main">
                      <Icon size={22} />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-16 font-semibold text-main">{label}</span>
                      <span className="text-13 text-sub">{description}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          <section className={`px-6 pt-6 pb-4 ${CARD_CLASS}`}>
            <h2 className="mb-2 text-18 font-semibold text-main">자주 묻는 질문</h2>
            <ul className="divide-y divide-light">
              {SUPPORT.faqs.map(({ question, answer }, i) => {
                const open = openFaq === i
                return (
                  <li key={question}>
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={open}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-15 font-medium text-main"
                      >
                        {question}
                        <ChevronDownIcon size={18} className={`shrink-0 text-sub-weak transition-transform ${open ? 'rotate-180' : ''}`} />
                      </button>
                    </h3>
                    <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!open} className="pb-5">
                      <p className="rounded-card-sm bg-light px-5 py-4 text-14 break-keep text-sub">{answer}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>

        <SupportChat />
      </div>
    </PageLayout>
  )
}
