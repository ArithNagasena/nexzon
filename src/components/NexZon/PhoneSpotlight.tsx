import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import iphoneCameraDetail from "@/assets/iphone-17-pro-max-camera.png";
import iphoneWhite from "@/assets/iphone-17-pro-max-white.png";
import galaxyS26Ultra from "@/assets/galaxy-s26-ultra.png";
import pixel10 from "@/assets/google-pixel-10.png";
import honorMagicV5 from "@/assets/honor-magic-v5.png";

const lineup = [
  { name: "iPhone 17 Pro Max", brand: "Apple", price: "From LKR 429,000", image: iphoneWhite },
  { name: "Galaxy S26 Ultra", brand: "Samsung", price: "From LKR 399,000", image: galaxyS26Ultra },
  { name: "Google Pixel 10", brand: "Google", price: "From LKR 349,000", image: pixel10 },
  { name: "Honor Magic V5", brand: "Honor", price: "From LKR 459,000", image: honorMagicV5 },
];

const PhoneSpotlight = () => (
  <section className="bg-background section-y">
    <div className="container-page">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Smartphones, elevated</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">This season's flagship lineup</h2>
          {/* Section blurbs are desktop-only throughout the homepage — on a phone
              they push the actual products another screen down. */}
          <p className="mt-2 hidden max-w-lg text-sm text-muted-foreground sm:block">
            Our best-selling category — flagships, foldables and everyday drivers, from four brands.
          </p>
        </div>
        <Link
          to="/category/smartphones"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          <span className="sm:hidden">All phones</span>
          <span className="hidden sm:inline">Shop all smartphones</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-gradient-deep">
        <div className="grid items-center gap-6 p-6 sm:gap-8 sm:p-10 md:grid-cols-2 lg:p-12">
          <div className="flex flex-col gap-3">
            <span className="inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              New Arrival
            </span>
            <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
              <span className="sm:hidden">iPhone 17 Pro Max. Titanium.</span>
              <span className="hidden sm:inline">iPhone 17 Pro Max. Titanium. Unreal camera system.</span>
            </h3>
            <p className="text-sm font-semibold text-white/90">From LKR 429,000 · or LKR 17,900/mo</p>
            <Button asChild variant="hero" size="lg" className="mt-2 w-fit">
              <Link to="/product/iphone-17-pro-max">Shop iPhone 17 Pro Max</Link>
            </Button>
          </div>

          {/* Product stage. The source PNGs have no alpha channel, so `mix-blend-multiply`
              is what knocks out their white box. `isolate` confines that blend to this
              light panel — over a photo or the violet gradient it smears instead. */}
          <div className="isolate overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-secondary p-4 sm:p-6">
            <img
              src={iphoneCameraDetail}
              alt="iPhone 17 Pro Max camera system"
              loading="lazy"
              className="animate-float mx-auto h-40 w-auto object-contain mix-blend-multiply sm:h-56 lg:h-72"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-4">
        {lineup.map((p) => (
          <Link
            key={p.name}
            to="/category/smartphones"
            className="card-product group flex flex-col items-center gap-1.5 p-3 text-center sm:gap-2 sm:p-5"
          >
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-24 object-contain transition-transform duration-500 group-hover:scale-105 sm:h-32 lg:h-40"
            />
            <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:block">
              {p.brand}
            </span>
            <h3 className="font-display text-sm font-bold text-foreground sm:text-base">{p.name}</h3>
            <span className="text-sm font-extrabold text-foreground">{p.price}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default PhoneSpotlight;
