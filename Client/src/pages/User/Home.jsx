import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";

import HeroSection from "../../components/User/Home/HeroSection";
import ProductSection from "../../components/User/Home/ProductSection";
import BridalCollection from "../../components/User/Home/BridalCollection";
import StatsSection from "../../components/User/Home/StatsSection";
import FashionSection from "../../components/User/Home/FashionSection";
import StoreSection from "../../components/User/Home/StoreSection";
import NewsletterSection from "../../components/User/Home/NewsletterSection";

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4">
          <HeroSection />
          <ProductSection />
          <BridalCollection />
          <StatsSection />
          <FashionSection />
          <StoreSection />
          <NewsletterSection />
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;