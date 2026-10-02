import { useEffect } from "react";
import AiSearchHero from "./components/AiSearchHero";
import BrandSection from "./components/BrandSection";
import CategoryNav from "./components/CategoryNav";
import Container from "./components/Container";
import DetailPage from "./components/DetailPage";
import FeatureBanners from "./components/FeatureBanners";
import Footer from "./components/Footer";
import ListPage from "./components/ListPage";
import LoginPage from "./components/LoginPage";
import MainHeader from "./components/MainHeader";
import ProductSection from "./components/ProductSection";
import ShortFormSection from "./components/ShortFormSection";
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

  if (route === "/login") return <LoginPage />;
  if (route === "/list") return <ListPage />;
  if (route === "/detail") return <DetailPage />;

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
