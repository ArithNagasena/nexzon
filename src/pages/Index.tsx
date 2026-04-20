import Header from "@/components/cellexa/Header";
import Hero from "@/components/cellexa/Hero";
import TrustStrip from "@/components/cellexa/TrustStrip";
import Categories from "@/components/cellexa/Categories";
import Brands from "@/components/cellexa/Brands";
import NewArrivals from "@/components/cellexa/NewArrivals";
import PromoBanner from "@/components/cellexa/PromoBanner";


import InstallmentBanner from "@/components/cellexa/InstallmentBanner";
import Testimonials from "@/components/cellexa/Testimonials";
import FAQ from "@/components/cellexa/FAQ";
import Newsletter from "@/components/cellexa/Newsletter";
import Footer from "@/components/cellexa/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Cellexa — Smartphones, Audio & Tech Online in Sri Lanka";
    const desc = "Shop the latest smartphones, tablets, audio & accessories in Sri Lanka. Genuine products, islandwide delivery, COD & 0% installments at Cellexa.";
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
        <TrustStrip />
        <Categories />
        <Brands />
        <NewArrivals />
        <PromoBanner />
        
        <InstallmentBanner />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
