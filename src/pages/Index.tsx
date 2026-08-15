import Header from "@/components/cellexa/Header";
import Hero from "@/components/cellexa/Hero";
import PhoneSpotlight from "@/components/cellexa/PhoneSpotlight";
import Categories from "@/components/cellexa/Categories";
import FlashDeals from "@/components/cellexa/FlashDeals";
import Brands from "@/components/cellexa/Brands";
import NewArrivals from "@/components/cellexa/NewArrivals";
import PromoBanners from "@/components/cellexa/PromoBanners";
import BestSellers from "@/components/cellexa/BestSellers";
import ValueBento from "@/components/cellexa/ValueBento";
import Testimonials from "@/components/cellexa/Testimonials";
import FAQ from "@/components/cellexa/FAQ";
import Newsletter from "@/components/cellexa/Newsletter";
import Footer from "@/components/cellexa/Footer";
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
