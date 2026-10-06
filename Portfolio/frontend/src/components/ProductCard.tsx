import heartIcon from "../assets/figma/v3/icons/heart.svg";
import type { BadgeTone, Product } from "../data/mock";

interface ProductCardProps {
  product: Product;
  /** 카드 폭. 기본값은 가로 캐러셀용(한 화면 2.2 → 3.3 → 4 → 5장), 그리드에서는 'w-full' 등으로 덮어쓴다 */
  widthClass?: string;
}

const CAROUSEL_WIDTH_CLASS =
  "w-[calc((100%-12px)/2.2)] shrink-0 snap-start sm:w-[calc((100%-32px)/3.3)] md:w-[calc((100%-48px)/4)] lg:w-[calc((100%-64px)/5)]";

const BADGE_CLASS: Record<BadgeTone, string> = {
  gray: "bg-regular font-medium text-sub",
  accent: "bg-[#FFF7ED] font-semibold text-accent",
  accentStrong: "bg-[#FFEDD5] font-semibold text-accent",
};

const formatWon = (value: number) => `${value.toLocaleString("ko-KR")}원`;

// 컴팩트(B) 스케일 — 모바일 B-2 → sm B-3 → lg B-4. 스토어명 12(R)·상품명 14(M)은 고정, 제목=가격(SB), 정가(R)
export default function ProductCard({
  product,
  widthClass = CAROUSEL_WIDTH_CLASS,
}: ProductCardProps) {
  const {
    image,
    store,
    name,
    listPrice,
    discountRate,
    price,
    badge,
    highlighted,
  } = product;
  // 카드 없는 썸네일(라운드 12)은 텍스트를 2px 들여 둥근 모서리와 맞춘다. 강조 카드 안 썸네일(라운드 8)은 들여쓰지 않는다.
  const indent = highlighted ? "" : "px-0.5";

  return (
    <article
      className={`relative flex flex-col justify-between ${widthClass} ${highlighted ? "rounded-card-sm bg-white p-1" : ""}`}>
      <div className="flex flex-col gap-3">
        <div
          className={`relative overflow-hidden bg-light ${highlighted ? "rounded-thumb-sm" : "rounded-thumb"}`}>
          <img
            src={image}
            alt={name}
            className="block aspect-square w-full object-cover"
          />
          <button
            type="button"
            aria-label="찜하기"
            className="absolute top-2 right-2 z-10 flex size-7 items-center justify-center rounded-full bg-white/70">
            <img src={heartIcon} alt="" className="size-4" />
          </button>
        </div>

        <div className={`flex flex-col ${indent}`}>
          <p className="truncate text-12 font-regular text-sub">{store}</p>
          <h3 className="mt-1 truncate text-14 font-medium text-main">
            {/* 카드 전체를 덮는 링크 (찜 버튼은 z-10 으로 위에 둔다). 목업이라 모든 카드가 같은 상세 페이지로 간다 */}
            <a href="#/detail" className="after:absolute after:inset-0">
              {name}
            </a>
          </h3>
          <p className="text-12 text-sub-weak tabular-nums line-through sm:text-13">
            {formatWon(listPrice)}
          </p>
          <p className="mt-1.5 flex gap-1 text-16 font-semibold tabular-nums whitespace-nowrap sm:mt-2 sm:gap-2 sm:text-18 lg:text-20">
            <span className="text-accent">{discountRate}%</span>
            <span className="text-main">{formatWon(price)}</span>
          </p>
        </div>
      </div>

      <div className={`flex pt-3 ${indent}`}>
        <span
          className={`flex h-5 items-center rounded-badge px-2 text-11 whitespace-nowrap ${BADGE_CLASS[badge.tone ?? "gray"]}`}>
          {badge.text}
        </span>
      </div>
    </article>
  );
}
