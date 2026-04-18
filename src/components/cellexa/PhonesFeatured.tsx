import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Camera, BatteryFull } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard, { type Product } from "./ProductCard";
import featurePhone from "@/assets/feature-phone.jpg";
import phone1 from "@/assets/product-phone-1.jpg";
import phone2 from "@/assets/product-phone-2.jpg";
import phone3 from "@/assets/product-phone-3.jpg";

const phones: Product[] = [
  { id: "p1", name: "iPhone 15 Pro Max 256GB", brand: "Apple", price: 489000, oldPrice: 525000, rating: 4.9, reviews: 312, image: phone1, badge: { label: "Editor's Pick", tone: "primary" } },
  { id: "p2", name: "Samsung Galaxy S24 Ultra 512GB", brand: "Samsung", price: 459000, rating: 4.8, reviews: 248, image: phone2 },
  { id: "p3", name: "Xiaomi 14 Pro 5G 256GB", brand: "Xiaomi", price: 219000, oldPrice: 245000, rating: 4.7, reviews: 98, image: phone3, badge: { label: "Value", tone: "success" } },
];

const PhonesFeatured = () => (
  <section className="bg-background py-14 sm:py-20">
    <div className="container-page">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Spotlight · Smartphones</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">The flagships, decoded.</h2>
        </div>
        <Link to="/category/smartphones" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          Shop all phones <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Editorial banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-deep p-6 text-primary-foreground shadow-lift sm:p-10 lg:col-span-2 lg:row-span-1">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary-glow/40 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
              Now Available
            </span>
            <h3 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] sm:text-4xl">
              Power that fits in your pocket.
            </h3>
            <p className="mt-3 text-sm text-white/85 sm:text-base">
              Pro-grade cameras, lightning chips, and all-day battery — all backed by genuine warranty.
            </p>

            <ul className="mt-5 grid grid-cols-3 gap-3 text-xs text-white/90">
              <li className="flex flex-col items-start gap-1.5"><Cpu className="h-4 w-4" /><span>Latest chips</span></li>
              <li className="flex flex-col items-start gap-1.5"><Camera className="h-4 w-4" /><span>Pro cameras</span></li>
              <li className="flex flex-col items-start gap-1.5"><BatteryFull className="h-4 w-4" /><span>All-day battery</span></li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/category/smartphones">Explore Collection</Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/shop">Compare</Link>
              </Button>
            </div>

            <img
              src={featurePhone}
              alt="Featured flagship smartphone"
              loading="lazy"
              className="pointer-events-none absolute -bottom-8 -right-6 hidden h-64 w-auto rotate-12 drop-shadow-2xl md:block"
            />
          </div>
        </div>

        {/* Featured phones */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-3">
          {phones.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PhonesFeatured;
