import { UTILITY_LINKS, WELCOME_NOTICE } from '../data/mock'
import Container from './Container'

export default function TopUtilityHeader() {
  return (
    <div className="border-b border-[#F3F4F6] bg-white">
      <Container className="flex h-9 items-center justify-end gap-4 md:justify-between">
        <p className="hidden min-w-0 truncate text-xs leading-[1.45] tracking-kr text-[#505050] md:block">{WELCOME_NOTICE}</p>

        <nav className="flex shrink-0 items-center">
          {UTILITY_LINKS.map((label, i) => (
            <div key={label} className="flex items-center">
              {i > 0 && (
                <span className="px-2.5 sm:px-4 font-noto text-xs leading-4 tracking-noto text-[#E5E7EB]" aria-hidden="true">
                  |
                </span>
              )}
              <a href="#" className="text-xs leading-[1.45] tracking-kr whitespace-nowrap text-[#505050]">
                {label}
              </a>
            </div>
          ))}
        </nav>
      </Container>
    </div>
  )
}
