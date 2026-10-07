// ── 피처 배너 assets ─────────────────────────────────────────────────────
import bannerDiary from "../assets/figma/v3/banners/diary.jpg";
import bannerHeadphone from "../assets/figma/v3/banners/headphone.jpg";
import bannerSkincare from "../assets/figma/v3/banners/skincare.jpg";
import bannerFurniture from "../assets/figma/v3/banners/furniture.jpg";
import bannerSeason from "../assets/figma/v3/banners/season.jpg";

// ── 숏폼 섹션 assets ─────────────────────────────────────────────────────
import shortform1 from "../assets/figma/v3/shortform/1.jpg";
import shortform2 from "../assets/figma/v3/shortform/2.jpg";
import shortform3 from "../assets/figma/v3/shortform/3.jpg";
import shortform4 from "../assets/figma/v3/shortform/4.jpg";
import shortform5 from "../assets/figma/v3/shortform/5.jpg";

// ── 상품 카드 assets (섹션별) ─────────────────────────────────────────────
import trending1 from "../assets/figma/v3/products/trending-1.jpg";
import trending2 from "../assets/figma/v3/products/trending-2.jpg";
import trending3 from "../assets/figma/v3/products/trending-3.jpg";
import trending4 from "../assets/figma/v3/products/trending-4.jpg";
import trending5 from "../assets/figma/v3/products/trending-5.jpg";
import gourmet1 from "../assets/figma/v3/products/gourmet-1.jpg";
import gourmet2 from "../assets/figma/v3/products/gourmet-2.jpg";
import gourmet3 from "../assets/figma/v3/products/gourmet-3.jpg";
import gourmet4 from "../assets/figma/v3/products/gourmet-4.jpg";
import gourmet5 from "../assets/figma/v3/products/gourmet-5.jpg";
import digital1 from "../assets/figma/v3/products/digital-1.jpg";
import digital2 from "../assets/figma/v3/products/digital-2.jpg";
import digital3 from "../assets/figma/v3/products/digital-3.jpg";
import digital4 from "../assets/figma/v3/products/digital-4.jpg";
import digital5 from "../assets/figma/v3/products/digital-5.jpg";
import living1 from "../assets/figma/v3/products/living-1.jpg";
import living2 from "../assets/figma/v3/products/living-2.jpg";
import living3 from "../assets/figma/v3/products/living-3.jpg";
import living4 from "../assets/figma/v3/products/living-4.jpg";
import living5 from "../assets/figma/v3/products/living-5.jpg";

// ── 브랜드 섹션 assets ───────────────────────────────────────────────────
import brandBanner from "../assets/figma/v3/brand/banner.jpg";
import brandProduct from "../assets/figma/v3/brand/product.jpg";

// ── 상품 상세 assets ─────────────────────────────────────────────────────
import detailMain from "../assets/figma/v3/detail/main.jpg";
import detailThumb2 from "../assets/figma/v3/detail/thumb-2.jpg";
import detailThumb3 from "../assets/figma/v3/detail/thumb-3.jpg";
import detailThumb4 from "../assets/figma/v3/detail/thumb-4.jpg";
import detailThumb5 from "../assets/figma/v3/detail/thumb-5.jpg";
import detailContent from "../assets/figma/v3/detail/content.svg";
import { accioHref } from "../routes";

// ── 상단 유틸리티 바 / 헤더 ──────────────────────────────────────────────
export const WELCOME_NOTICE = "지금 가입하면 첫 구매 10% 쿠폰 & 무료배송";

export const UTILITY_LINKS = [
  { label: "로그인/회원가입", href: accioHref("/login") },
  { label: "고객센터", href: accioHref("/support") },
  { label: "알림", href: "#" },
  // 주문 목록은 마이페이지에 있고, 개별 배송 조회는 거기서 들어간다
  { label: "주문/배송", href: accioHref("/mypage") },
];

export const HEADER_SEARCH_PLACEHOLDER =
  "지금인기: 프리미엄 오일, 가을 가구 특가";

export const CART_COUNT = 2;

export const CATEGORIES = [
  "신상 특가",
  "뷰티/헬스케어",
  "디지털/가전",
  "가구/수납",
  "패션/잡화",
  "식품/생필품",
  "키즈",
  "도서",
  "해외직구",
  "골프/레저",
  "남성",
];

// ── AI 검색 히어로 ───────────────────────────────────────────────────────
export const AI_SEARCH = {
  title: "찾는 걸 말로 설명해 보세요",
  subtitle: "ACCIO가 알아서 골라드려요",
  placeholder: "원하는 물건, 가격대나 분위기 등을 편하게 말씀해보세요",
  /** 모바일(sm 미만)에서는 긴 문구가 잘리므로 짧은 문구를 쓴다 */
  placeholderShort: "원하는 물건을 편하게 말씀해보세요",
  chips: [
    "10만원 이하 가을 무드 조명",
    "달달한 제철 과일 추천해줘",
    "20대 남자친구 가성비 선물, 지갑 말고",
  ],
};

// ── 피처 배너 ────────────────────────────────────────────────────────────
export interface FeatureBanner {
  id: string;
  image: string;
  background: string;
  label: string;
  labelColor: string;
  title: string[];
  description: string;
}

export const FEATURE_BANNERS: FeatureBanner[] = [
  {
    id: "diary",
    image: bannerDiary,
    background: "#171717",
    label: "STATIONERY",
    labelColor: "#F2641D",
    title: ["폭신한 털이", "새겨진 다이어리"],
    description: "포근하고 따뜻한 겨울 다이어리 컬렉션",
  },
  {
    id: "headphone",
    image: bannerHeadphone,
    background: "#172554",
    label: "AUDIO TECH",
    labelColor: "#38BDF8",
    title: ["프리미엄 무선", "헤드폰 특가"],
    description: "노이즈캔슬링, 지금 바로 35% 할인",
  },
  {
    id: "skincare",
    image: bannerSkincare,
    background: "#3B0764",
    label: "BEAUTY POPUP",
    labelColor: "#F472B6",
    title: ["피부를 빛나게", "하는 스킨케어"],
    description: "NEW TOP 10 뷰티 브랜드 팝업스토어",
  },
  {
    id: "furniture",
    image: bannerFurniture,
    background: "#1E1B4B",
    label: "LIVING & ROOM",
    labelColor: "#A5B4FC",
    title: ["편안한 집을 위한", "가구 특가"],
    description: "소파/테이블/침대 최대 50% 할인",
  },
  {
    id: "season",
    image: bannerSeason,
    background: "#042F2E",
    label: "SEASON SPECIAL",
    labelColor: "#5EEAD4",
    title: ["활기찬 시즌을 위한", "에센셜 셀렉션"],
    description: "한정수량 프리오더 오픈",
  },
];

// ── 숏폼으로 보는 추천 상품 ────────────────────────────────────────────────
export interface ShortFormItem {
  id: string;
  image: string;
  /** views: 반투명 조회수 태그, live: 주황 LIVE 태그 */
  tag: { kind: "views" | "live"; text: string };
  brand: string;
  name: string;
  price: number;
}

export const SHORTFORM_SECTION = {
  totalPages: 4,
  items: [
    {
      id: "sf-1",
      image: shortform1,
      tag: { kind: "views", text: "1.2만 회 시청" },
      brand: "라움클래스",
      name: "스카프 타이 실크 블라우스 - 베이지",
      price: 37500,
    },
    {
      id: "sf-2",
      image: shortform2,
      tag: { kind: "live", text: "LIVE 특가" },
      brand: "클래식무드",
      name: "소프트 웜 크림 자켓 테일러드 셋업",
      price: 129000,
    },
    {
      id: "sf-3",
      image: shortform3,
      tag: { kind: "views", text: "8.5천 회 시청" },
      brand: "누아리스튜디오",
      name: "울 카멜 블렌드 핏 싱글 자켓",
      price: 89000,
    },
    {
      id: "sf-4",
      image: shortform4,
      tag: { kind: "views", text: "2.4만 회 시청" },
      brand: "라세레",
      name: "스트레이트 데님 & 베이지 슬랙스 코디",
      price: 98000,
    },
    {
      id: "sf-5",
      image: shortform5,
      tag: { kind: "views", text: "4.1천 회 시청" },
      brand: "라세레",
      name: "오버사이즈핏 테일러드 블레이저",
      price: 98000,
    },
  ] as ShortFormItem[],
};

// ── 상품 캐러셀 섹션 ─────────────────────────────────────────────────────
export interface TitleSegment {
  text: string;
  highlight?: boolean;
}

/** gray: 기본 회색 배지, accent/accentStrong: 주황 강조 배지 (배경 농도만 다름) */
export type BadgeTone = "gray" | "accent" | "accentStrong";

export interface Product {
  id: string;
  image: string;
  store: string;
  name: string;
  listPrice: number;
  discountRate: number;
  price: number;
  badge: { text: string; tone?: BadgeTone };
  /** 시안의 흰 배경 + 4px 안쪽 여백 강조 카드 */
  highlighted?: boolean;
}

export interface ProductSectionData {
  id: string;
  title: TitleSegment[];
  subtitle: string;
  /** 시안에서 헤더 하단 여백(12px) 없이 구분선이 바로 붙는 섹션 */
  compactHeader?: boolean;
  products: Product[];
}

export const TRENDING_SECTION: ProductSectionData = {
  id: "trending",
  title: [
    { text: "지금 관심도 " },
    { text: "급상승", highlight: true },
    { text: " 중인 상품" },
  ],
  subtitle: "실시간으로 소비자들이 가장 많이 장바구니에 담고 있어요",
  compactHeader: true,
  products: [
    {
      id: "trending-1",
      image: trending1,
      store: "프리미엄마켓",
      name: "숙성 프라임 립아이스테이크 400g",
      listPrice: 50000,
      discountRate: 20,
      price: 39900,
      badge: { text: "무료배송" },
    },
    {
      id: "trending-2",
      image: trending2,
      store: "이탈리안밀",
      name: "생트러플 엔젤 헤어 파스타 밀키트",
      listPrice: 25500,
      discountRate: 18,
      price: 20800,
      badge: { text: "쿠폰적용" },
    },
    {
      id: "trending-3",
      image: trending3,
      store: "아티잔베이커스",
      name: "프랑스 천연 발효 크루아상 8입",
      listPrice: 28600,
      discountRate: 23,
      price: 22000,
      badge: { text: "무료배송" },
    },
    {
      id: "trending-4",
      image: trending4,
      store: "디지털플레이어",
      name: "초슬림 알루미늄 울트라북 15.6인치",
      listPrice: 1720000,
      discountRate: 11,
      price: 1499000,
      badge: { text: "ACCIO 단독", tone: "accent" },
    },
    {
      id: "trending-5",
      image: trending5,
      store: "픽셀온",
      name: "27인치 165Hz IPS 게이밍 모니터",
      listPrice: 399000,
      discountRate: 18,
      price: 329000,
      badge: { text: "무료배송" },
    },
  ],
};

export const GOURMET_SECTION: ProductSectionData = {
  id: "gourmet",
  title: [
    { text: "미식가", highlight: true },
    { text: "들이 찾는 오늘의 추천" },
  ],
  subtitle: "엄선된 신선 식재료부터 셰프의 시크릿 밀키트까지",
  products: [
    {
      id: "gourmet-1",
      image: gourmet1,
      store: "프리미엄마켓",
      name: "초신선 채끝 스테이크 시즈닝 팩",
      listPrice: 50000,
      discountRate: 20,
      price: 39900,
      badge: { text: "새벽배송" },
    },
    {
      id: "gourmet-2",
      image: gourmet2,
      store: "이탈리안밀",
      name: "바질 페스토 파케리 파스타 세트",
      listPrice: 25500,
      discountRate: 18,
      price: 20800,
      badge: { text: "냉장포장" },
    },
    {
      id: "gourmet-3",
      image: gourmet3,
      store: "아티잔베이커스",
      name: "발효 버터 크루아상 생지 세트",
      listPrice: 28600,
      discountRate: 23,
      price: 22000,
      badge: { text: "당일발송" },
    },
    {
      id: "gourmet-4",
      image: gourmet4,
      store: "오션프레시",
      name: "노르웨이 생연어 스테이크 필렛 500g",
      listPrice: 43000,
      discountRate: 19,
      price: 34900,
      badge: { text: "새벽배송" },
    },
    {
      id: "gourmet-5",
      image: gourmet5,
      store: "프루츠샤인",
      name: "제철 프리미엄 샤인&애플 선물세트",
      listPrice: 69000,
      discountRate: 14,
      price: 59000,
      badge: { text: "특가할인", tone: "accentStrong" },
      highlighted: true,
    },
  ],
};

export const DIGITAL_SECTION: ProductSectionData = {
  id: "digital",
  title: [
    { text: "일상을 업그레이드하는 " },
    { text: "디지털 PICK", highlight: true },
  ],
  subtitle: "스마트한 라이프스타일을 위한 IT 기기 모음전",
  products: [
    {
      id: "digital-1",
      image: digital1,
      store: "디지털플레이어",
      name: "초슬림 알루미늄 슬림북 15",
      listPrice: 1720000,
      discountRate: 11,
      price: 1499000,
      badge: { text: "무료배송" },
    },
    {
      id: "digital-2",
      image: digital2,
      store: "픽셀온",
      name: "27인치 165Hz 광시야각 모니터",
      listPrice: 399000,
      discountRate: 18,
      price: 329000,
      badge: { text: "당일배송" },
    },
    {
      id: "digital-3",
      image: digital3,
      store: "키노바 (KEYNOVA)",
      name: "레트로 커스텀 기계식 무선키보드",
      listPrice: 189000,
      discountRate: 21,
      price: 149000,
      badge: { text: "무료배송" },
    },
    {
      id: "digital-4",
      image: digital4,
      store: "MINIX",
      name: "초소형 홈 오피스 미니 PC",
      listPrice: 809000,
      discountRate: 13,
      price: 699000,
      badge: { text: "안전포장" },
    },
    {
      id: "digital-5",
      image: digital5,
      store: "네오마우스",
      name: "인체공학형 무소음 무선 마우스",
      listPrice: 89000,
      discountRate: 22,
      price: 69000,
      badge: { text: "무료배송" },
    },
  ],
};

export const LIVING_SECTION: ProductSectionData = {
  id: "living",
  title: [
    { text: "집을 바꾸는 " },
    { text: "홈&리빙", highlight: true },
    { text: " 셀렉션" },
  ],
  subtitle: "머무르고 싶은 공간을 위한 감성 가구와 소품",
  products: [
    {
      id: "living-1",
      image: living1,
      store: "크레마랩",
      name: "반자동 에스프레소 머신 화이트",
      listPrice: 699000,
      discountRate: 14,
      price: 599000,
      badge: { text: "무료배송" },
    },
    {
      id: "living-2",
      image: living2,
      store: "더룸 라이프",
      name: "패브릭 모듈러 로우 소파",
      listPrice: 460000,
      discountRate: 20,
      price: 369000,
      badge: { text: "설치배송" },
    },
    {
      id: "living-3",
      image: living3,
      store: "루미에르",
      name: "선셋 글라스 앰비언트 테이블 램프",
      listPrice: 128000,
      discountRate: 22,
      price: 99000,
      badge: { text: "무료배송" },
    },
    {
      id: "living-4",
      image: living4,
      store: "세렌데코",
      name: "순면 80수 호텔 베딩 풀세트 (Q)",
      listPrice: 218000,
      discountRate: 18,
      price: 178000,
      badge: { text: "선물포장" },
    },
    {
      id: "living-5",
      image: living5,
      store: "에어웰",
      name: "타워형 헤파필터 무소음 공기청정기",
      listPrice: 549000,
      discountRate: 16,
      price: 459000,
      badge: { text: "무료배송" },
    },
  ],
};

// ── 주목해야 할 브랜드 ───────────────────────────────────────────────────
export interface BrandProduct {
  id: string;
  image: string;
  name: string;
  listPrice?: number;
  price: number;
  tags: { text: string; tone: "sale" | "today" }[];
}

export const BRAND_SECTION = {
  title: "해야 할 브랜드",
  brands: [
    "페리페라",
    "리스키",
    "티르티르",
    "제로이드",
    "로라메르시에",
    "블랑두스",
    "VT",
    "아렌시아",
    "아비브",
    "레이어랩",
  ],
  banner: brandBanner,
  likes: 31099,
  products: [
    {
      id: "brand-1",
      image: brandProduct,
      name: "[곡물라떼 컬러 NEW] 페리페라 무드 글로이 틴트 32 Colors",
      listPrice: 13000,
      price: 9300,
      tags: [
        { text: "세일", tone: "sale" },
        { text: "오늘드림", tone: "today" },
      ],
    },
    {
      id: "brand-2",
      image: brandProduct,
      name: "페리페라 스피디 스키니 브로우 8 Colors",
      price: 6000,
      tags: [{ text: "오늘드림", tone: "today" }],
    },
  ] as BrandProduct[],
};

// ── 푸터 ─────────────────────────────────────────────────────────────────
export const FOOTER_DESCRIPTION = [
  "ACCIO는 고객이 꿈꾸는 모든 상품을 빠르고 찾아주는 감",
  "각 중심 커머스 플랫폼입니다.",
];

export const FOOTER_LINK_GROUPS = [
  {
    title: "고객센터",
    links: [
      { label: "공지사항" },
      { label: "자주 묻는 질문" },
      { label: "1:1 문의" },
      { label: "제휴/광고 문의" },
    ],
  },
  {
    title: "회사",
    links: [
      { label: "회사소개" },
      { label: "채용정보" },
      { label: "개인정보처리방침", emphasis: true },
      { label: "서비스이용약관" },
    ],
  },
  {
    title: "서비스",
    links: [
      { label: "품질보증" },
      { label: "안전결제" },
      { label: "멤버십" },
      { label: "공지사항" },
    ],
  },
];

export const FOOTER_COPYRIGHT = "© 2024 ACCIO Inc. All rights reserved.";

export const FOOTER_LEGAL = [
  "(주) 아씨오 커머스",
  "사업자등록번호: 120-81-00000",
  "통신판매업신고: 제2024-서울강남-0000호",
];

// ── 상품 리스트 페이지 ───────────────────────────────────────────────────
export interface ListFilterGroup {
  title: string;
  options: string[];
}

export const LIST_PAGE = {
  breadcrumb: ["홈", "디지털/가전", "음향기기"],
  title: "무선 이어폰",
  totalCount: 1284,
  filterGroups: [
    { title: "가격", options: ["3만원 이하", "3~6만원", "6~10만원", "10만원 이상"] },
    { title: "브랜드", options: ["사운드랩", "노바텍", "무브"] },
  ] satisfies ListFilterGroup[],
  /** 시안 기본 선택값 (가격 › 3~6만원) */
  defaultCheckedFilters: ["가격:3~6만원"],
  ratingFilter: { title: "평점", text: "4.0 이상 · 4.5 이상" },
  sortOptions: ["추천순", "낮은 가격순", "리뷰 많은순", "신상품순"],
  pageCount: 3,
  // 시안은 급상승 섹션 1~4번 상품을 5줄 반복한다
  products: Array.from({ length: 5 }, (_, row) =>
    TRENDING_SECTION.products.slice(0, 4).map((product) => ({ ...product, id: `list-${row}-${product.id}` })),
  ).flat() satisfies Product[],
};

// ── 상품 상세 페이지 ─────────────────────────────────────────────────────
export const PRODUCT_DETAIL = {
  brand: "사운드랩",
  name: "노이즈캔슬링 무선 이어폰 SL-900 (블루투스 5.3)",
  rating: 4.8,
  reviewCount: 2341,
  wishCount: 812,
  listPrice: 89000,
  discountRate: 35,
  price: 57900,
  shippingNote: "무료배송 · 내일(수) 도착 예정",
  colors: ["블랙", "화이트", "샌드"],
  images: [detailMain, detailThumb2, detailThumb3, detailThumb4, detailThumb5],
  /** 상세정보 탭의 통이미지 */
  contentImage: detailContent,
};

// ── 상품 상세 · 리뷰 탭 ─────────────────────────────────────────────────
export interface ProductReview {
  id: string;
  author: string;
  /** 정렬에 쓰므로 YYYY.MM.DD 형식을 지킨다 */
  date: string;
  option: string;
  rating: number;
  body: string;
  photos: string[];
  helpful: number;
}

export const PRODUCT_REVIEWS = {
  /** 5점 → 1점 순. 합계가 PRODUCT_DETAIL.reviewCount 와 같다 */
  distribution: [
    { score: 5, count: 1918 },
    { score: 4, count: 258 },
    { score: 3, count: 94 },
    { score: 2, count: 47 },
    { score: 1, count: 24 },
  ],
  filters: ["전체", "포토리뷰"],
  sorts: ["최신순", "도움순"],
  items: [
    {
      id: "r1",
      author: "김*훈",
      date: "2026.09.15",
      option: "블랙",
      rating: 5,
      body: "지하철에서 노이즈캔슬링 켜니 확실히 조용해집니다. 배터리도 하루 종일 쓰고 20% 남았어요. 이 가격대에서는 최고인 듯.",
      photos: [detailThumb2, detailThumb3],
      helpful: 128,
    },
    {
      id: "r2",
      author: "이*영",
      date: "2026.09.11",
      option: "화이트",
      rating: 4,
      body: "음질은 만족스러운데 케이스가 살짝 커요. 주머니에 넣으면 티가 나요. 그래도 착용감은 가볍고 좋습니다.",
      photos: [detailThumb4, detailThumb5],
      helpful: 64,
    },
    {
      id: "r3",
      author: "박*수",
      date: "2026.09.03",
      option: "샌드",
      rating: 5,
      body: "통화 품질 보고 샀는데 상대방이 잘 들린다고 하네요. 재구매 의사 있습니다.",
      photos: [],
      helpful: 41,
    },
  ] satisfies ProductReview[],
};

// ── AI 대화 검색 결과 ───────────────────────────────────────────────────
export const AI_CHAT = {
  query: "4만원대 가성비 좋은 무선 이어폰 찾아줘",
  answer:
    "4만원대 전후에서 노이즈캔슬링과 배터리 성능이 좋은 제품 4개를 골랐어요. 통화 품질을 우선한다면 첫 번째를, 착용감을 우선한다면 세 번째를 추천해요.",
  /** AI 가 질문을 어떻게 이해했는지 보여주는 조건 */
  understood: ["4만원대 전후", "무선 이어폰", "가성비 우선"],
  picks: [
    { id: "n-talk", brand: "노바텍", name: "통화특화 이어폰 N-Talk", price: 45900, reason: "통화 품질 1위" },
    { id: "sl-900", brand: "사운드랩", name: "노이즈캔슬링 SL-900", price: 57900, reason: "ANC 성능 우수", image: detailMain },
    { id: "mv-air", brand: "무브", name: "스포츠 이어폰 MV-Air", price: 38500, reason: "착용감 호평" },
    { id: "eco-lite", brand: "에코", name: "초경량 이어폰 Eco Lite", price: 29900, reason: "가성비 최고" },
  ] as { id: string; brand: string; name: string; price: number; reason: string; image?: string }[],
  followUps: ["배터리 더 긴 걸로", "3만원대도 보여줘", "리뷰 많은 순으로"],
  placeholder: "이어서 물어보기…",
  disclaimer: "가격과 재고는 실시간으로 바뀔 수 있어요.",
};

// ── 장바구니 ────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  brand: string;
  name: string;
  option: string;
  listPrice: number;
  price: number;
  quantity: number;
  delivery: string;
  image?: string;
}

export const CART_ITEMS: CartItem[] = [
  {
    id: "sl-900",
    brand: "사운드랩",
    name: "노이즈캔슬링 무선 이어폰 SL-900",
    option: "블랙",
    listPrice: 89000,
    price: 57900,
    quantity: 1,
    delivery: "무료배송 · 내일 도착 예정",
    image: detailMain,
  },
  {
    id: "ampoule",
    brand: "글로우랩",
    name: "수분 진정 앰플 50ml 2개입",
    option: "기본",
    listPrice: 32000,
    price: 24500,
    quantity: 2,
    delivery: "무료배송 · 9/24 도착 예정",
  },
];

/** 결제금액이 threshold 이상이면 rate% 추가 쿠폰 */
export const CART_COUPON = { threshold: 120000, rate: 5 };

// ── 마이페이지 ──────────────────────────────────────────────────────────
export type OrderStatus = "배송중" | "배송완료" | "구매확정";

export const MY_PAGE = {
  name: "김쇼핑",
  grade: "WELCOME",
  point: 2320,
  menu: [
    { label: "주문 내역", count: 10, href: accioHref("/mypage") },
    { label: "취소·반품 내역", count: 1, href: "#" },
    { label: "찜한 상품", count: 3, href: "#" },
    { label: "최근 본 상품", count: 24, href: "#" },
    { label: "내 리뷰", count: 7, href: "#" },
    { label: "재구매", href: "#" },
    { label: "회원정보 수정", href: "#" },
  ] as { label: string; count?: number; href: string }[],
  orderSummary: [
    { label: "결제완료", count: 2 },
    { label: "배송중", count: 1 },
    { label: "배송완료", count: 7 },
    // 사용자가 해야 할 일이라 이 숫자만 포인트 컬러로 둔다
    { label: "작성할 리뷰", count: 3, actionable: true },
  ],
  recentOrders: [
    {
      id: "20260918-4471",
      date: "2026.09.18",
      title: "노이즈캔슬링 무선 이어폰 SL-900 외 1건",
      amount: 106900,
      status: "배송중",
      image: detailMain,
    },
    { id: "20260912-1180", date: "2026.09.12", title: "수분 진정 앰플 50ml 2개입", amount: 49000, status: "배송완료" },
    { id: "20260903-0932", date: "2026.09.03", title: "경량 바람막이 자켓", amount: 69000, status: "구매확정" },
  ] as { id: string; date: string; title: string; amount: number; status: OrderStatus; image?: string }[],
};

// ── 주문/배송 조회 ──────────────────────────────────────────────────────
export const ORDER_TRACKING = {
  orderId: "20260918-4471",
  orderedAt: "2026.09.18",
  title: "노이즈캔슬링 무선 이어폰 SL-900 외 1건",
  steps: [
    { label: "결제완료", time: "09.18 14:21" },
    { label: "상품준비", time: "09.19 18:30" },
    { label: "배송중", time: "09.21 07:40" },
    { label: "배송완료", time: "예정" },
  ],
  /** steps 중 현재 단계 index */
  currentStep: 2,
  eta: "오늘 18:00 이전 도착 예정",
  carrier: "대한통운",
  invoice: "5412-8890-1123",
  /** 최신 → 과거 순 */
  events: [
    { time: "09.21 07:40", status: "배송출발", place: "서울 강남 지점" },
    { time: "09.20 22:10", status: "간선상차", place: "옥천 HUB" },
    { time: "09.20 15:02", status: "집화처리", place: "용인 물류센터" },
    { time: "09.19 18:30", status: "상품준비", place: "사운드랩 판매자" },
  ],
  address: {
    name: "김쇼핑",
    phone: "010-****-1123",
    address: "서울 강남구 테헤란로 000, 12층",
    request: "문 앞에 놓아주세요",
  },
};

// ── 고객센터 ────────────────────────────────────────────────────────────
export const SUPPORT = {
  description: "AI 상담원이 24시간 먼저 답변해 드려요.",
  categories: [
    { id: "delivery", label: "배송 문의", description: "배송 조회 · 지연 · 주소 변경" },
    { id: "exchange", label: "교환·반품", description: "신청 · 회수 · 진행 상태" },
    { id: "payment", label: "결제·환불", description: "결제 수단 · 환불 일정" },
  ] as { id: "delivery" | "exchange" | "payment"; label: string; description: string }[],
  faqs: [
    {
      question: "배송은 보통 얼마나 걸리나요?",
      answer:
        "결제 후 평일 기준 1~2일 안에 출발하고, 출발 다음 날 도착해요. 판매자마다 출발일이 달라 상품 페이지의 도착 예정일을 확인해 주세요.",
    },
    {
      question: "교환·반품 신청은 어디서 하나요?",
      answer: "마이페이지 › 주문 내역에서 해당 주문의 ‘교환·반품 신청’을 눌러 주세요. 상품 수령 후 7일 안에 신청할 수 있어요.",
    },
    {
      question: "AI 검색 결과는 어떻게 만들어지나요?",
      answer:
        "입력한 문장에서 가격대·용도·선호 조건을 뽑은 뒤, 상품 정보와 실제 구매 리뷰를 함께 비교해 골라요. 광고 상품은 결과에 섞지 않아요.",
    },
    {
      question: "포인트 사용 조건이 궁금해요",
      answer: "1,000P 이상 모이면 1P = 1원으로 결제할 때 쓸 수 있어요. 적립일로부터 1년 동안 유효해요.",
    },
    {
      question: "판매자 입점은 어떻게 하나요?",
      answer: "페이지 하단 ‘입점 문의’에서 사업자 정보와 판매 상품군을 남겨 주시면 영업일 3일 안에 연락드려요.",
    },
  ],
  chat: {
    title: "상담",
    responseTime: "평균 3초 응답",
    placeholder: "메시지를 입력하세요",
    messages: [
      { from: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" },
      { from: "user", text: "어제 주문한 이어폰 언제 와요?" },
      {
        from: "bot",
        text: "주문번호 20260918-4471 상품은 현재 배송중이며 오늘 18:00 이전 도착 예정이에요.",
      },
    ] as { from: "bot" | "user"; text: string }[],
    quickReplies: ["배송지 변경", "주문 취소"],
    /** 목업 응답 — 빠른 답변은 정해진 답을, 그 밖의 입력은 fallback 을 돌려준다 */
    replies: {
      "배송지 변경": "이미 배송이 시작돼서 배송지는 바꿀 수 없어요. 대신 배송기사님께 요청사항을 전달해 드릴까요?",
      "주문 취소": "배송중인 상품은 취소 대신 반품으로 진행돼요. 상품을 받은 뒤 마이페이지에서 반품을 신청해 주세요.",
    } as Record<string, string>,
    fallbackReply: "확인하고 있어요. 잠시만 기다려 주세요.",
  },
};

