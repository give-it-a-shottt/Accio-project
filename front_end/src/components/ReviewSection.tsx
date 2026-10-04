import { useState } from 'react'
import { PRODUCT_DETAIL, PRODUCT_REVIEWS, type ProductReview } from '../data/mock'
import { formatCount } from '../utils/format'
import { StarIcon } from './icons'
import { CARD_CLASS } from './layout'

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex" role="img" aria-label={`5점 만점에 ${rating}점`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} size={size} className={n <= Math.round(rating) ? 'text-accent' : 'text-[#e5e5ec]'} />
      ))}
    </span>
  )
}

function ReviewItem({ review }: { review: ProductReview }) {
  const [helped, setHelped] = useState(false)

  return (
    <li className="flex flex-col gap-3 py-6 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-regular text-13 font-semibold text-sub"
          >
            {review.author.slice(0, 1)}
          </span>
          <span className="flex flex-col">
            <span className="text-14 font-medium text-main">{review.author}</span>
            <span className="text-12 text-sub-weak tabular-nums">
              {review.date} · {review.option}
            </span>
          </span>
        </div>
        <Stars rating={review.rating} size={14} />
      </div>

      <p className="max-w-180 text-14 break-keep text-sub">{review.body}</p>

      {review.photos.length > 0 && (
        <div className="flex gap-2">
          {review.photos.map((photo) => (
            <img key={photo} src={photo} alt="리뷰 사진" className="size-20 rounded-thumb-sm bg-light object-cover" />
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-pressed={helped}
          onClick={() => setHelped((h) => !h)}
          className={`h-9 rounded-full border px-4 text-13 font-medium tabular-nums ${helped ? 'border-black text-main' : 'border-regular text-sub hover:border-black'}`}
        >
          도움돼요 {formatCount(review.helpful + (helped ? 1 : 0))}
        </button>
        <button type="button" className="text-13 text-sub-weak hover:text-main">
          신고
        </button>
      </div>
    </li>
  )
}

// 상품 상세의 리뷰 탭. 별점은 상세 상단과 같은 포인트 컬러, 분포 막대는 무채색으로 둔다.
export default function ReviewSection() {
  const { distribution, filters, sorts, items } = PRODUCT_REVIEWS
  const [filter, setFilter] = useState(filters[0])
  const [sort, setSort] = useState(sorts[0])
  const total = distribution.reduce((sum, { count }) => sum + count, 0)

  const visible = items
    .filter((review) => filter !== '포토리뷰' || review.photos.length > 0)
    .sort((a, b) => (sort === '도움순' ? b.helpful - a.helpful : b.date.localeCompare(a.date)))

  return (
    <div className="flex flex-col gap-6">
      <section aria-label="평점 요약" className={`flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-10 sm:px-10 ${CARD_CLASS}`}>
        <div className="flex shrink-0 flex-col items-center gap-2 sm:w-40">
          <p className="text-48 font-semibold text-main tabular-nums">{PRODUCT_DETAIL.rating}</p>
          <Stars rating={PRODUCT_DETAIL.rating} />
          <p className="text-13 text-sub-weak tabular-nums">리뷰 {formatCount(total)}개</p>
        </div>
        <ul className="flex min-w-0 flex-1 flex-col gap-2">
          {distribution.map(({ score, count }) => (
            <li key={score} className="grid grid-cols-[32px_minmax(0,1fr)_48px] items-center gap-3 text-13 tabular-nums">
              <span className="text-sub">{score}점</span>
              <span className="h-2 overflow-hidden rounded-full bg-regular" aria-hidden="true">
                <span className="block h-full rounded-full bg-main" style={{ width: `${(count / total) * 100}%` }} />
              </span>
              <span className="text-right text-sub-weak">{formatCount(count)}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="radiogroup" aria-label="리뷰 필터" className="flex gap-2">
          {filters.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={filter === option}
              onClick={() => setFilter(option)}
              className={`h-9 rounded-full px-4 text-13 font-semibold ${filter === option ? 'bg-main text-white' : 'border border-regular bg-white text-sub'}`}
            >
              {option}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label="정렬" className="flex items-center gap-1">
          {sorts.map((option, i) => (
            <span key={option} className="flex items-center gap-1">
              {i > 0 && <span className="h-3 border-l border-regular" aria-hidden="true" />}
              <button
                type="button"
                role="radio"
                aria-checked={sort === option}
                onClick={() => setSort(option)}
                className={`h-9 px-2 text-13 ${sort === option ? 'font-semibold text-main' : 'font-medium text-sub-weak'}`}
              >
                {option}
              </button>
            </span>
          ))}
        </div>
      </div>

      <section aria-label="리뷰 목록" className={`p-6 ${CARD_CLASS}`}>
        {visible.length === 0 ? (
          <p className="py-12 text-center text-14 text-sub-weak">조건에 맞는 리뷰가 없어요</p>
        ) : (
          <ul className="divide-y divide-light">
            {visible.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </ul>
        )}
      </section>

      <button
        type="button"
        className="h-12 rounded-card-sm border border-regular bg-white text-14 font-medium text-main hover:border-black"
      >
        리뷰 더 보기
      </button>
    </div>
  )
}
