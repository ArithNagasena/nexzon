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
  <section className="bg-background py-14 sm:py-20">
    <div className="container-page">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Smartphones, elevated</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">This season's flagship lineup</h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Our best-selling category — flagships, foldables and everyday drivers, from four brands.
          </p>
        </div>
        <Link
          to="/category/smartphones"
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:inline-flex"
        >
          Shop all smartphones <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-gradient-deep">
        <div className="grid items-center gap-8 p-8 sm:p-12 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <span className="inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              New Arrival
            </span>
            <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              iPhone 17 Pro Max. Titanium. Unreal camera system.
            </h3>
            <p className="text-sm font-semibold text-white/90">From LKR 429,000 · or LKR 17,900/mo</p>
            <Button asChild variant="hero" size="lg" className="mt-2 w-fit">
              <Link to="/product/iphone-17-pro-max">Shop iPhone 17 Pro Max</Link>
            </Button>
          </div>

          {/* Product stage. The source PNGs have no alpha channel, so `mix-blend-multiply`
              is what knocks out their white box. `isolate` confines that blend to this
              light panel — over a photo or the violet gradient it smears instead. */}
          <div className="isolate overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-secondary p-6">
            <img
              src={iphoneCameraDetail}
              alt="iPhone 17 Pro Max camera system"
              loading="lazy"
              className="animate-float mx-auto h-56 w-auto object-contain mix-blend-multiply sm:h-72"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {lineup.map((p) => (
          <Link
            key={p.name}
            to="/category/smartphones"
            className="card-product group flex flex-col items-center gap-2 p-5 text-center"
          >
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-32 object-contain transition-transform duration-500 group-hover:scale-105 sm:h-40"
            />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {p.brand}
            </span>
            <h3 className="font-display font-bold text-foreground">{p.name}</h3>
            <span className="text-sm font-extrabold text-foreground">{p.price}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default PhoneSpotlight;
