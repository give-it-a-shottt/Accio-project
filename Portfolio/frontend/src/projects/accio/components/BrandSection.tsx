import { useState } from "react";
import brandNext from "../assets/figma/v3/icons/brand-next.svg";
import brandPrev from "../assets/figma/v3/icons/brand-prev.svg";
import heartFill from "../assets/figma/v3/icons/heart-fill.svg";
import { BRAND_SECTION } from "../data/mock";
import { BLEED_CLASS } from "./layout";

const TAG_CLASS = {
  sale: "bg-[#FEE2E2] text-[#DC2626]",
  today: "bg-[#FCE7F3] text-[#DB2777]",
};

const NAV_BUTTON_CLASS =
  "absolute top-1/2 flex size-9 sm:size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-[2px]";

export default function BrandSection() {
  const { title, brands, banner, likes, products } = BRAND_SECTION;
  const [active, setActive] = useState(0);
  const move = (dir: 1 | -1) =>
    setActive((prev) => (prev + dir + brands.length) % brands.length);

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-18 font-semibold text-main sm:text-20">
          <span className="text-accent">주목</span>
          {title}
        </h2>
        {/* 칩이 넘칠 때는 왼쪽부터 스크롤되도록 safe center */}
        <div
          className={`scrollbar-none flex items-center justify-center-safe gap-2 overflow-x-auto py-1 ${BLEED_CLASS}`}>
          {brands.map((brand, i) => (
            <button
              key={brand}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`flex h-8 shrink-0 items-center rounded-full px-4 text-14 whitespace-nowrap ${
                i === active
                  ? "bg-accent font-medium text-white"
                  : "border border-regular bg-white text-sub"
              }`}>
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-56 overflow-hidden rounded-card sm:h-72 lg:h-80 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <img
          src={banner}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 p-4 lg:gap-4">
          <h3 className="text-24 font-semibold text-white sm:text-28 lg:text-32 drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.05)]">
            {brands[active]}
          </h3>
          <p className="flex items-center gap-1 text-14 font-medium text-white/90 lg:text-16">
            <img src={heartFill} alt="" className="size-4" />
            {likes.toLocaleString("ko-KR")}명이 좋아합니다.
          </p>
        </div>
        <button
          type="button"
          aria-label="이전 브랜드"
          onClick={() => move(-1)}
          className={`${NAV_BUTTON_CLASS} left-3 sm:left-4`}>
          <img src={brandPrev} alt="" className="size-5" />
        </button>
        <button
          type="button"
          aria-label="다음 브랜드"
          onClick={() => move(1)}
          className={`${NAV_BUTTON_CLASS} right-3 sm:right-4`}>
          <img src={brandNext} alt="" className="size-5" />
        </button>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-card-sm border border-light bg-white p-3">
            <div className="size-20 shrink-0 overflow-hidden rounded-thumb-sm bg-light">
              <img
                src={product.image}
                alt={product.name}
                className="size-full object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h4 className="truncate text-12 text-main">{product.name}</h4>
              <p className="flex items-baseline gap-1 whitespace-nowrap">
                {product.listPrice && (
                  <span className="text-12 text-sub-weak tabular-nums line-through">
                    {product.listPrice.toLocaleString("ko-KR")}원
                  </span>
                )}
                <span className="text-16 font-semibold text-accent tabular-nums">
                  {product.price.toLocaleString("ko-KR")}원~
                </span>
              </p>
              <div className="flex items-center gap-1">
                {product.tags.map((tag) => (
                  <span
                    key={tag.text}
                    className={`flex h-5 items-center rounded-badge px-2 text-11 font-semibold whitespace-nowrap ${TAG_CLASS[tag.tone]}`}>
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
