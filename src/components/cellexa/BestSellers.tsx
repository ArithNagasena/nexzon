import { Flame } from "lucide-react";
import ProductCard, { type Product } from "./ProductCard";
import phone1 from "@/assets/product-phone-1.jpg";
import phone3 from "@/assets/product-phone-3.jpg";
import earbuds from "@/assets/product-earbuds.jpg";
import controller from "@/assets/product-controller.jpg";
import charger from "@/assets/product-charger.jpg";
import productCase from "@/assets/product-case.jpg";
import watch from "@/assets/product-watch.jpg";
import headphones from "@/assets/product-headphones.jpg";

const trending: Product[] = [
  { id: "t1", name: "Apple AirPods Pro (2nd Gen) USB-C", brand: "Apple", price: 79900, oldPrice: 89000, rating: 4.9, reviews: 538, image: earbuds, badge: { label: "#1 Trending", tone: "promo" } },
  { id: "t2", name: "Anker 20W MagSafe Wireless Charger", brand: "Anker", price: 6900, oldPrice: 8900, rating: 4.7, reviews: 348, image: charger, badge: { label: "Hot Deal", tone: "promo" } },
  { id: "t3", name: "Sony DualSense PS5 Controller — Midnight Black", brand: "Sony", price: 24900, rating: 4.8, reviews: 274, image: controller },
  { id: "t4", name: "Premium Leather Folio Case for iPhone 15", brand: "Cellexa", price: 7500, oldPrice: 9500, rating: 4.6, reviews: 142, image: productCase, badge: { label: "-21%", tone: "promo" } },
  { id: "t5", name: "Samsung Galaxy Watch 7 LTE 44mm", brand: "Samsung", price: 89500, oldPrice: 99000, rating: 4.7, reviews: 156, image: watch },
  { id: "t6", name: "Sony WH-1000XM5 Headphones — Black", brand: "Sony", price: 119000, oldPrice: 135000, rating: 4.9, reviews: 421, image: headphones, badge: { label: "Best Seller", tone: "success" } },
  { id: "t7", name: "iPhone 15 Pro Max 256GB — Natural Titanium", brand: "Apple", price: 489000, rating: 4.9, reviews: 312, image: phone1 },
  { id: "t8", name: "Xiaomi 14 Pro 5G 256GB — White", brand: "Xiaomi", price: 219000, oldPrice: 245000, rating: 4.7, reviews: 98, image: phone3, badge: { label: "-11%", tone: "promo" } },
];

const BestSellers = () => (
  <section className="bg-surface py-14 sm:py-20">
    <div className="container-page">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-promo">
            <Flame className="h-3.5 w-3.5" /> Hot right now
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Best Sellers &amp; Trending</h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          {["All", "Phones", "Audio", "Accessories", "Gaming"].map((t, i) => (
            <button
              key={t}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-foreground text-background"
                  : "bg-card text-foreground/70 hover:bg-secondary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {trending.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  </section>
);

export default BestSellers;
