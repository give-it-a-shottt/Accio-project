import { CASES } from '../../data/portfolio'
import { ChevronRightIcon } from '../icons'
import CaseMeta from './CaseMeta'
import { DESIGN_DEMOS } from './demos'
import { searchHref } from './routes'

const DESIGN_LIST_HREF = searchHref('', 'design')

function BackLink() {
  return (
    <a href={DESIGN_LIST_HREF} className="flex w-fit items-center gap-1 text-14 font-medium text-sub hover:text-main">
      <ChevronRightIcon size={16} className="rotate-180" />
      <span>
        <span lang="en">Design</span> 사례 목록
      </span>
    </a>
  )
}

interface DesignCaseDetailProps {
  slug: string
}

// Design 사례 상세 — 문제 정의 → 시안 비교(가로 나열) → 최종안 실제 동작 화면.
export default function DesignCaseDetail({ slug }: DesignCaseDetailProps) {
  const item = CASES.find((candidate) => candidate.slug === slug && candidate.design)

  if (!item?.design) {
    return (
      <main className="mx-auto flex w-full max-w-300 flex-1 flex-col gap-2 px-5 pt-16 pb-20 sm:px-10">
        <h1 className="text-20 font-semibold break-keep text-main">사례를 찾을 수 없어요.</h1>
        <p className="text-14 text-sub">주소가 바뀌었거나 아직 올리지 않은 사례예요.</p>
        <div className="mt-4">
          <BackLink />
        </div>
      </main>
    )
  }

  const { app, problem, variants, finalIndex } = item.design
  const Demo = DESIGN_DEMOS[item.slug]

  return (
    <main className="mx-auto flex w-full max-w-300 flex-1 flex-col px-5 pt-6 pb-20 sm:px-10">
      <BackLink />

      <header className="mt-8 flex flex-col">
        <CaseMeta item={item} />
        <h1 className="mt-3 text-24 font-semibold break-keep text-main sm:text-32">{item.title}</h1>
        <p className="mt-3 max-w-180 text-16 break-keep text-sub">{item.description}</p>
        <dl className="mt-6 flex max-w-180 flex-col gap-4 rounded-card bg-light p-6">
          {[
            { term: '서비스', detail: app },
            { term: '문제', detail: problem },
          ].map(({ term, detail }) => (
            <div key={term} className="flex flex-col gap-1 sm:flex-row sm:gap-8">
              <dt className="w-12 shrink-0 text-14 font-semibold text-main">{term}</dt>
              <dd className="text-14 break-keep text-sub">{detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 flex flex-wrap gap-2 text-13 text-sub-weak">
          {item.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
      </header>

      <section aria-labelledby="variants-title" className="mt-16">
        <h2 id="variants-title" className="text-20 font-semibold text-main">
          시안 비교
        </h2>
        <p className="mt-1 text-14 text-sub">왼쪽부터 순서대로 고쳐 나간 과정이에요.</p>
        {/* 화면이 좁으면 시안 목록만 가로로 넘긴다 */}
        <ol className="scrollbar-none -mx-5 mt-6 flex snap-x scroll-px-5 gap-6 overflow-x-auto px-5 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0">
          {variants.map((variant, index) => {
            const isFinal = index === finalIndex
            return (
              <li key={variant.label} className="w-60 shrink-0 snap-start sm:w-70">
                <figure className="flex flex-col gap-3">
                  <img
                    src={variant.image}
                    alt={`${variant.label} 화면`}
                    width={400}
                    height={860}
                    loading="lazy"
                    className={`h-auto w-full rounded-thumb border ${isFinal ? 'border-black' : 'border-regular'}`}
                  />
                  <figcaption className="flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-15 font-semibold text-main">
                      {variant.label}
                      {isFinal && (
                        <span className="rounded-badge bg-main px-2 py-0.5 text-12 font-semibold text-white">최종</span>
                      )}
                    </span>
                    <span className="text-14 break-keep text-sub">{variant.note}</span>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ol>
      </section>

      {Demo && (
        <section aria-labelledby="demo-title" className="mt-16 flex flex-wrap items-start gap-x-16 gap-y-8">
          <div className="flex min-w-60 flex-[1_1_280px] flex-col gap-2 lg:pt-10">
            <h2 id="demo-title" className="text-20 font-semibold text-main">
              최종안 실제 화면
            </h2>
            <p className="text-14 break-keep text-sub">
              {variants[finalIndex].label}을 실제로 동작하는 화면으로 만들었어요. 직접 입력해 보세요. 비밀번호 보기, 아이디 저장이
              동작하고, 로그인 버튼을 누르면 안내가 떠요.
            </p>
            <p className="text-13 break-keep text-sub-weak">실제 인증은 연결하지 않은 데모예요.</p>
          </div>
          {/* 휴대폰 틀 — 400px 시안 폭을 넘지 않고, 좁은 화면에서는 줄어든다 */}
          <div className="w-full max-w-100 overflow-hidden rounded-[32px] border-[6px] border-black">
            <Demo />
          </div>
        </section>
      )}

      <a
        href={DESIGN_LIST_HREF}
        className="mt-16 flex w-fit items-center gap-1 rounded-full border border-regular px-5 py-3 text-14 font-medium text-main hover:bg-light"
      >
        <span>
          다른 <span lang="en">Design</span> 사례 보기
        </span>
        <ChevronRightIcon size={16} />
      </a>
    </main>
  )
}
