import { useState } from "react";
import aiSearchIcon from "../assets/figma/v3/icons/ai-search.svg";
import micIcon from "../assets/figma/v3/icons/mic.svg";
import { AI_SEARCH } from "../data/mock";

export default function AiSearchHero() {
  const [query, setQuery] = useState("");

  return (
    <section className="flex w-full max-w-3xl flex-col gap-1 py-4 sm:py-8">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl leading-[1.3] sm:text-[32px] font-semibold tracking-kr text-[#111827]">
          {AI_SEARCH.title}
        </h1>
        <p className="pb-2 text-sm leading-[1.45] font-medium tracking-kr text-accent">
          {AI_SEARCH.subtitle}
        </p>
      </div>

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex h-13 w-full items-center rounded-full border-2 border-[rgba(242,100,29,0.2)] bg-white px-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={AI_SEARCH.placeholder}
          aria-label="AI 검색어"
          className="min-w-0 flex-1 bg-white pl-2 text-[13px] leading-[1.45] font-medium tracking-kr text-[#111111] outline-none placeholder:text-[#999999]"
        />
        <div className="flex shrink-0 items-center border-l border-[#E5E7EB] pl-3">
          <button
            type="button"
            aria-label="음성인식"
            className="rounded-full p-1.5">
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

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {AI_SEARCH.chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setQuery(chip)}
            className="rounded-full border border-[#E5E7EB] bg-[#F7F7FB] px-3.5 py-1.5 text-xs leading-[1.45] tracking-kr whitespace-nowrap text-[#767676]">
            {chip}
          </button>
        ))}
      </div>
    </section>
  );
}
