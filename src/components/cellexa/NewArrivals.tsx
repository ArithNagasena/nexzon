import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard, { type Product } from "./ProductCard";
import phone1 from "@/assets/product-meta-quest-3.png";
import phone2 from "@/assets/product-jbl-soundgear-frames.png";
import phone3 from "@/assets/product-apple-watch-ultra-2.png";
import headphones from "@/assets/product-airpods-max.png";
import earbuds from "@/assets/product-ipad-air.png";
import tablet from "@/assets/product-insta360-go3.png";
import watch from "@/assets/product-g29-racing-wheel.png";
import controller from "@/assets/product-nintendo-switch.png";

const newArrivals: Product[] = [
  { id: "1", name: "Meta Quest 3", brand: "Meta", price: 194000, oldPrice: 219000, rating: 4.9, reviews: 312, image: phone1, badge: { label: "New", tone: "primary" } },
  { id: "2", name: "JBL Soundgear Frames Audio Glasses", brand: "JBL", price: 49000, oldPrice: 58000, rating: 4.8, reviews: 248, image: phone2, badge: { label: "New", tone: "primary" } },
  { id: "3", name: "AirPods Max", brand: "Apple", price: 175000, oldPrice: 199000, rating: 4.9, reviews: 421, image: headphones, badge: { label: "Hot", tone: "promo" } },
  { id: "4", name: "Insta360 Go 3 Action Camera", brand: "Insta360", price: 140000, oldPrice: 165000, rating: 4.9, reviews: 87, image: tablet, badge: { label: "New", tone: "primary" } },
  { id: "5", name: "G29 Driving Force Racing Wheel", brand: "Logitech", price: 115900, oldPrice: 129000, rating: 4.7, reviews: 156, image: watch },
  { id: "6", name: "Apple iPad Air 5th Gen", brand: "Apple", price: 165000, oldPrice: 189000, rating: 4.9, reviews: 538, image: earbuds, badge: { label: "Best Seller", tone: "success" } },
  { id: "7", name: "Apple Watch Ultra 2", brand: "Apple", price: 309000, oldPrice: 345000, rating: 4.6, reviews: 192, image: phone3, badge: { label: "-10%", tone: "promo" } },
  { id: "8", name: "Nintendo Switch", brand: "Nintendo", price: 99000, oldPrice: 115000, rating: 4.8, reviews: 274, image: controller },
];

const NewArrivals = () => (
  <section className="bg-background py-14 sm:py-20">
    <div className="container-page">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Just landed</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">New Arrivals</h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Handpicked fresh stock from the world's most trusted brands.
          </p>
        </div>
        <Link to="/shop" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {newArrivals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  </section>
);

export default NewArrivals;
