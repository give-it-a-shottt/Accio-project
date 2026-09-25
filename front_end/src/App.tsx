import AiSearchHero from "./components/AiSearchHero";
import BrandSection from "./components/BrandSection";
import CategoryNav from "./components/CategoryNav";
import Container from "./components/Container";
import FeatureBanners from "./components/FeatureBanners";
import Footer from "./components/Footer";
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

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <TopUtilityHeader />
      <MainHeader />
      <CategoryNav />
      <main className="mt-3">
        <Container className="flex flex-col items-center gap-8 py-4 sm:py-6 lg:gap-10">
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
      <div className="mt-16 lg:mt-33.25">
        <Footer />
      </div>
    </div>
  );
}

export default App;
