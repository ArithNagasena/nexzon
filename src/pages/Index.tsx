import Header from "@/components/NexZon/Header";
import Hero from "@/components/NexZon/Hero";
import PhoneSpotlight from "@/components/NexZon/PhoneSpotlight";
import Categories from "@/components/NexZon/Categories";
import FlashDeals from "@/components/NexZon/FlashDeals";
import Brands from "@/components/NexZon/Brands";
import NewArrivals from "@/components/NexZon/NewArrivals";
import PromoBanners from "@/components/NexZon/PromoBanners";
import BestSellers from "@/components/NexZon/BestSellers";
import ValueBento from "@/components/NexZon/ValueBento";
import Testimonials from "@/components/NexZon/Testimonials";
import FAQ from "@/components/NexZon/FAQ";
import Newsletter from "@/components/NexZon/Newsletter";
import Footer from "@/components/NexZon/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Nexzon — Smartphones, Audio & Tech Online in Sri Lanka";
    const desc = "Shop the latest smartphones, tablets, audio & accessories in Sri Lanka. Genuine products, islandwide delivery, COD & 0% installments at Nexzon.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PhoneSpotlight />
        <Categories />
        <FlashDeals />
        <Brands />
        <NewArrivals />
        <PromoBanners />
        <BestSellers />
        <ValueBento />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
