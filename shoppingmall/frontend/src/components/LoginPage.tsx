import kakaoLogo from '../assets/figma/v3/login/kakao-logo.png'
import naverLogo from '../assets/figma/v3/login/naver-logo.png'
import visual from '../assets/figma/v3/login/visual.png'

const INPUT_CLASS =
  'h-[34px] w-full rounded-badge border border-light px-2 pb-2 text-11 tracking-normal text-main outline-none placeholder:text-disabled focus:border-regular'
const PILL_BUTTON_CLASS = 'flex h-[34px] w-full items-center justify-center gap-2 rounded-full p-2 text-12'

// 시안 1320px 기준: 1060×766 컨테이너 = 왼쪽 비주얼 420px + 오른쪽 로그인 영역. lg 미만에서는 비주얼을 숨기고 폼만 가운데 둔다.
export default function LoginPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-white px-4 py-2 sm:px-6 lg:px-25">
      <div className="flex w-full max-w-[1060px] items-stretch overflow-clip lg:h-[766px]">
        <div className="relative hidden w-[420px] shrink-0 overflow-hidden rounded-[50px] lg:block">
          <img src={visual} alt="" className="absolute inset-0 size-full object-cover" />
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center p-5">
          <div className="flex w-full max-w-[321px] flex-col gap-6">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-0.5">
                  <div className="flex flex-col py-1">
                    <p className="text-13 font-medium text-sub">스마트한 쇼핑의 시작</p>
                    <h1 className="text-24 font-semibold break-keep text-main">로그인하고 맞춤 혜택을 확인하세요</h1>
                  </div>
                  <p className="text-13 text-sub">회원님만을 위한 특가와 쿠폰이 준비되어 있어요</p>
                </div>

                <div className="flex flex-col gap-2">
                  <input type="email" placeholder="Email" aria-label="이메일" autoComplete="email" className={INPUT_CLASS} />
                  <input
                    type="password"
                    placeholder="Password"
                    aria-label="비밀번호"
                    autoComplete="current-password"
                    className={INPUT_CLASS}
                  />
                  <a href="#" className="px-0.5 text-11 text-sub-weak">
                    비밀번호를 잊어 버리셨나요?
                  </a>
                </div>
              </div>

              <button type="submit" className={`${PILL_BUTTON_CLASS} bg-accent font-semibold text-white`}>
                로그인
              </button>
            </form>

            <div className="flex items-center gap-3 px-2" role="separator">
              <span className="h-px flex-1 bg-regular" aria-hidden="true" />
              <span className="text-11 text-sub-weak">OR</span>
              <span className="h-px flex-1 bg-regular" aria-hidden="true" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <button type="button" className={`${PILL_BUTTON_CLASS} bg-[#fcd100] font-medium text-main`}>
                {/* 스프라이트 이미지에서 말풍선 아이콘 부분만 잘라 보여준다 */}
                <span className="relative h-[19px] w-5 shrink-0 overflow-hidden rounded-full">
                  <img src={kakaoLogo} alt="" className="absolute top-0 left-0 h-[100.6%] w-[370.37%] max-w-none" />
                </span>
                카카오로 시작하기
              </button>
              <button type="button" className={`${PILL_BUTTON_CLASS} bg-[#03cf5d] font-medium text-white`}>
                <img src={naverLogo} alt="" className="size-[22px] shrink-0 rounded-full object-cover" />
                네이버로 시작하기
              </button>
              <p className="w-full text-center text-12 font-medium text-main">
                <span className="font-regular text-sub">회원이 아니신가요?</span>{' '}
                <a href="#">회원가입</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
