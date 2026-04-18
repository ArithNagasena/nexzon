import { ArrowRight } from "lucide-react";
import ProductCard, { type Product } from "./ProductCard";
import phone1 from "@/assets/product-phone-1.jpg";
import phone2 from "@/assets/product-phone-2.jpg";
import phone3 from "@/assets/product-phone-3.jpg";
import headphones from "@/assets/product-headphones.jpg";
import earbuds from "@/assets/product-earbuds.jpg";
import tablet from "@/assets/product-tablet.jpg";
import watch from "@/assets/product-watch.jpg";
import controller from "@/assets/product-controller.jpg";

const newArrivals: Product[] = [
  { id: "1", name: "Apple iPhone 15 Pro Max 256GB Titanium", brand: "Apple", price: 489000, oldPrice: 525000, rating: 4.9, reviews: 312, image: phone1, badge: { label: "New", tone: "primary" } },
  { id: "2", name: "Samsung Galaxy S24 Ultra 5G 512GB", brand: "Samsung", price: 459000, oldPrice: 489000, rating: 4.8, reviews: 248, image: phone2, badge: { label: "New", tone: "primary" } },
  { id: "3", name: "Sony WH-1000XM5 Wireless Noise Cancelling", brand: "Sony", price: 119000, oldPrice: 135000, rating: 4.9, reviews: 421, image: headphones, badge: { label: "Hot", tone: "promo" } },
  { id: "4", name: "Apple iPad Pro 11\" M4 Wi-Fi 256GB + Keyboard", brand: "Apple", price: 365000, rating: 4.9, reviews: 87, image: tablet, badge: { label: "Pre-Order", tone: "warning" } },
  { id: "5", name: "Samsung Galaxy Watch 7 44mm LTE", brand: "Samsung", price: 89500, oldPrice: 99000, rating: 4.7, reviews: 156, image: watch },
  { id: "6", name: "Apple AirPods Pro (2nd Gen) USB-C", brand: "Apple", price: 79900, oldPrice: 89000, rating: 4.9, reviews: 538, image: earbuds, badge: { label: "Best Seller", tone: "success" } },
  { id: "7", name: "Xiaomi Redmi Note 13 Pro+ 5G 256GB", brand: "Xiaomi", price: 119500, oldPrice: 134000, rating: 4.6, reviews: 192, image: phone3, badge: { label: "-12%", tone: "promo" } },
  { id: "8", name: "Sony DualSense Wireless Controller PS5", brand: "Sony", price: 24900, rating: 4.8, reviews: 274, image: controller },
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
        <a href="#" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          View all <ArrowRight className="h-4 w-4" />
        </a>
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
