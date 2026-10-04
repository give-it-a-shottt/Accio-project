import { UTILITY_LINKS, WELCOME_NOTICE } from '../data/mock'
import Container from './Container'

export default function TopUtilityHeader() {
  return (
    <div className="border-b border-light bg-white">
      <Container className="flex h-9 items-center justify-end gap-4 md:justify-between">
        <p className="hidden min-w-0 truncate text-12 text-sub md:block">{WELCOME_NOTICE}</p>

        <nav className="flex shrink-0 items-center">
          {UTILITY_LINKS.map(({ label, href }, i) => (
            <div key={label} className="flex items-center">
              {i > 0 && (
                <span className="mx-3 h-3 border-l border-regular sm:mx-4" aria-hidden="true" />
              )}
              <a href={href} className="text-12 whitespace-nowrap text-sub">
                {label}
              </a>
            </div>
          ))}
        </nav>
      </Container>
    </div>
  )
}
