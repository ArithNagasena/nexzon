import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard, { type Product } from "./ProductCard";
import MobileReveal from "./MobileReveal";
import iphoneAir from "@/assets/iphone-air.png";
import galaxyS26Plus from "@/assets/galaxy-s26-plus.png";
import galaxyZFlip7 from "@/assets/galaxy-z-flip7.png";
import pixel9ProFold from "@/assets/pixel-9-pro-fold.png";
import iphone17e from "@/assets/iphone-17e.png";
import oneplus13r from "@/assets/oneplus-13r.png";
import airpodsPro3 from "@/assets/airpods-pro-3.png";
import appleWatchS11 from "@/assets/apple-watch-s11.png";

/* Names and pricing are kept in step with the same products on the Category,
   Compare and Product pages so the store never quotes two prices for one item. */
const newArrivals: Product[] = [
  { id: "iphone-air-256gb", name: "Apple iPhone Air 256GB", brand: "Apple", price: 339900, oldPrice: 369000, rating: 4.8, reviews: 248, image: iphoneAir, badge: { label: "New", tone: "primary" } },
  { id: "galaxy-s26-plus", name: "Samsung Galaxy S26+ 512GB", brand: "Samsung", price: 459900, oldPrice: 489900, rating: 4.8, reviews: 164, image: galaxyS26Plus, badge: { label: "New", tone: "primary" } },
  { id: "galaxy-z-flip-7", name: "Samsung Galaxy Z Flip 7", brand: "Samsung", price: 399900, oldPrice: 449000, rating: 4.6, reviews: 192, image: galaxyZFlip7, badge: { label: "Trending", tone: "promo" } },
  { id: "pixel-9-pro-fold", name: "Google Pixel 9 Pro Fold", brand: "Google", price: 549900, oldPrice: 599000, rating: 4.7, reviews: 184, image: pixel9ProFold, badge: { label: "Foldable", tone: "primary" } },
  { id: "iphone-17e-128gb", name: "Apple iPhone 17e 128GB", brand: "Apple", price: 219900, oldPrice: 234900, rating: 4.7, reviews: 612, image: iphone17e, badge: { label: "New", tone: "success" } },
  { id: "oneplus-13r", name: "OnePlus 13R 16GB", brand: "OnePlus", price: 204900, oldPrice: 229000, rating: 4.8, reviews: 88, image: oneplus13r, badge: { label: "Hot", tone: "promo" } },
  { id: "airpods-pro-3", name: "AirPods Pro 3 with USB-C", brand: "Apple", price: 89900, oldPrice: 99900, rating: 4.9, reviews: 1820, image: airpodsPro3, badge: { label: "Bundle", tone: "primary" } },
  { id: "apple-watch-series-11", name: "Apple Watch Series 11 — GPS", brand: "Apple", price: 195000, rating: 4.8, reviews: 612, image: appleWatchS11 },
];

const NewArrivals = () => (
  <section className="bg-background section-y">
    <div className="container-page">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Just landed</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">New Arrivals</h2>
          <p className="mt-2 hidden max-w-lg text-sm text-muted-foreground sm:block">
            Handpicked fresh stock from the world's most trusted brands.
          </p>
        </div>
        <Link to="/shop" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Eight cards is four rows of scrolling on a phone — start at two rows. */}
      <MobileReveal
        initial={4}
        breakpoint="md"
        moreLabel="Show more arrivals"
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
        {newArrivals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </MobileReveal>
    </div>
  </section>
);

export default NewArrivals;
