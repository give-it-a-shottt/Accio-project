import { useEffect } from "react";
import AiChatPage from "./components/AiChatPage";
import AiSearchHero from "./components/AiSearchHero";
import BrandSection from "./components/BrandSection";
import CartPage from "./components/CartPage";
import CategoryNav from "./components/CategoryNav";
import Container from "./components/Container";
import DetailPage from "./components/DetailPage";
import FeatureBanners from "./components/FeatureBanners";
import Footer from "./components/Footer";
import ListPage from "./components/ListPage";
import LoginPage from "./components/LoginPage";
import MainHeader from "./components/MainHeader";
import MyPage from "./components/MyPage";
import OrderTrackingPage from "./components/OrderTrackingPage";
import PortfolioApp from "./components/portfolio/PortfolioApp";
import ProductSection from "./components/ProductSection";
import ShortFormSection from "./components/ShortFormSection";
import SupportPage from "./components/SupportPage";
import TopUtilityHeader from "./components/TopUtilityHeader";
import {
  DIGITAL_SECTION,
  FEATURE_BANNERS,
  GOURMET_SECTION,
  LIVING_SECTION,
  TRENDING_SECTION,
} from "./data/mock";
import useHashRoute from "./hooks/useHashRoute";

function App() {
  const route = useHashRoute();

  // 해시 라우팅은 페이지를 바꿔도 스크롤이 유지되므로 맨 위로 올린다
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // 첫 화면은 검색형 포트폴리오('#/', '#/search?q=…', '#/case/…'), 쇼핑몰 홈은 '#/home' (그 밖의 주소도 홈으로 보낸다)
  const [path, search = ""] = route.split("?");
  if (path === "/" || path === "/search")
    return <PortfolioApp path={path} params={new URLSearchParams(search)} />;
  // 사례 상세 '#/case/{slug}'
  if (path.startsWith("/case/"))
    return <PortfolioApp path="/case" params={new URLSearchParams(search)} slug={path.slice("/case/".length)} />;
  if (route === "/login") return <LoginPage />;
  if (route === "/list") return <ListPage />;
  if (route === "/detail") return <DetailPage />;
  if (route === "/ai") return <AiChatPage />;
  if (route === "/cart") return <CartPage />;
  if (route === "/mypage") return <MyPage />;
  if (route === "/order") return <OrderTrackingPage />;
  if (route === "/support") return <SupportPage />;

  return (
    <div className="flex min-h-svh flex-col bg-white">
      <TopUtilityHeader />
      <MainHeader />
      <CategoryNav />
      <main>
        <Container className="flex flex-col items-center gap-8 pt-6 sm:gap-10 sm:pt-8 lg:gap-15 lg:pt-10">
          <AiSearchHero />
          <FeatureBanners banners={FEATURE_BANNERS} />
          <ShortFormSection />
          <ProductSection section={TRENDING_SECTION} />
          <ProductSection section={GOURMET_SECTION} />
          <BrandSection />
          <ProductSection section={DIGITAL_SECTION} />
          <ProductSection section={LIVING_SECTION} />
        </Container>
      </main>
      <div className="mt-16 lg:mt-32">
        <Footer />
      </div>
    </div>
  );
}

export default App;
