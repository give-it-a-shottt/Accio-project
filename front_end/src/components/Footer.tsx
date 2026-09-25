import logo from '../assets/figma/v3/logo.svg'
import { FOOTER_COPYRIGHT, FOOTER_DESCRIPTION, FOOTER_LEGAL, FOOTER_LINK_GROUPS } from '../data/mock'
import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white pt-10 pb-12 lg:pt-12 lg:pb-14 font-noto tracking-noto">
      <Container>
        {/* lg 미만: 소개 문구 한 줄 + 링크 3열 그리드 */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 border-b border-[#F3F4F6] pb-10 lg:flex lg:gap-8">
          <div className="col-span-3 flex min-w-0 flex-1 flex-col gap-3 lg:pb-[33px]">
            <img src={logo} alt="Accio" className="h-[27.55px] w-[94px]" />
            <p className="text-xs leading-[19.5px] text-[#6B7280]">
              {FOOTER_DESCRIPTION.map((line) => (
                // 시안의 줄바꿈 위치가 단어 중간이라 좁은 화면에서는 이어 붙여 자연스럽게 줄바꿈한다
                <span key={line} className="lg:block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title} className="flex min-w-0 flex-1 flex-col gap-3">
              <h4 className="text-xs leading-4 font-bold text-[#111827]">{group.title}</h4>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href="#"
                      className={`block text-xs leading-4 ${link.emphasis ? 'font-semibold text-[#374151]' : 'text-[#6B7280]'}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[11px] leading-4 text-[#9CA3AF] lg:flex-row lg:items-center lg:justify-between">
          <p>{FOOTER_COPYRIGHT}</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {FOOTER_LEGAL.map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </footer>
  )
}
