import { useState } from "react";
import aiSearchIcon from "../assets/figma/v3/icons/ai-search.svg";
import micIcon from "../assets/figma/v3/icons/mic.svg";
import { AI_SEARCH } from "../data/mock";
import useMediaQuery from "../hooks/useMediaQuery";
import { accioHref } from "../routes";

export default function AiSearchHero() {
  const [query, setQuery] = useState("");
  const isSm = useMediaQuery("(min-width: 40rem)");

  return (
    <section className="flex w-full max-w-3xl flex-col gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-24 font-semibold text-main sm:text-28 lg:text-32">
          {AI_SEARCH.title}
        </h1>
        <p className="text-14 font-medium text-accent lg:text-16">
          {AI_SEARCH.subtitle}
        </p>
      </div>

      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          // 목업이라 검색어와 상관없이 정해진 대화 결과 화면으로 간다
          window.location.hash = accioHref("/ai");
        }}
        className="flex h-13 w-full items-center rounded-full border-2 border-accent/20 bg-white px-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isSm ? AI_SEARCH.placeholder : AI_SEARCH.placeholderShort}
          aria-label="AI 검색어"
          className="min-w-0 flex-1 bg-white pl-2 text-13 font-medium text-main outline-none placeholder:text-disabled"
        />
        <div className="flex shrink-0 items-center border-l border-regular pl-3">
          <button
            type="button"
            aria-label="음성인식"
            className="flex size-8 items-center justify-center rounded-full">
            <img src={micIcon} alt="" className="size-5" />
          </button>
          <button
            type="submit"
            aria-label="검색"
            className="ml-2 rounded-full bg-accent p-2 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            <img src={aiSearchIcon} alt="" className="size-4" />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {AI_SEARCH.chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setQuery(chip)}
            className="flex h-8 items-center rounded-full border border-regular bg-light px-4 text-12 whitespace-nowrap text-sub-weak">
            {chip}
          </button>
        ))}
      </div>
    </section>
  );
}
