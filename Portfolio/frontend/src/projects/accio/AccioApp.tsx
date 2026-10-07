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

interface AccioAppProps {
  /** '#/accio' 뒤의 경로. '/' 는 쇼핑몰 홈 */
  path: string;
}

// Accio 쇼핑몰 — 포트폴리오 안에서 '#/accio/…' 로 연다. 모르는 경로는 쇼핑몰 홈으로 보낸다.
export default function AccioApp({ path }: AccioAppProps) {
  if (path === "/login") return <LoginPage />;
  if (path === "/list") return <ListPage />;
  if (path === "/detail") return <DetailPage />;
  if (path === "/ai") return <AiChatPage />;
  if (path === "/cart") return <CartPage />;
  if (path === "/mypage") return <MyPage />;
  if (path === "/order") return <OrderTrackingPage />;
  if (path === "/support") return <SupportPage />;

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
