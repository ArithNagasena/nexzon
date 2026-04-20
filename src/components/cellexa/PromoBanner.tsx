import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import promoAudio from "@/assets/promo-audio.jpg";
import promoPreorder from "@/assets/promo-preorder.jpg";

const PromoBanner = () => (
  <section className="bg-background pb-14 sm:pb-20">
    <div className="container-page">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Big banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-promo p-6 text-promo-foreground shadow-lift sm:p-10 lg:col-span-2">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid items-center gap-6 sm:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                Audio Sale
              </span>
              <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                Premium Audio,<br /> up to 30% off.
              </h3>
              <p className="mt-3 max-w-sm text-sm text-white/90 sm:text-base">
                Shop Sony, Bose, JBL &amp; AirPods. Free islandwide delivery on all audio orders this week.
              </p>
              <Button asChild variant="hero" size="lg" className="mt-5">
                <Link to="/category/audio">Shop Audio <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="relative h-44 sm:h-56">
              <img
                src={promoAudio}
                alt="Premium headphones promotion"
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-xl object-cover mix-blend-luminosity opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Small banner */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-deep p-6 text-primary-foreground shadow-lift sm:p-8">
          <img
            src={promoPreorder}
            alt="Flagship phone pre-order"
            loading="lazy"
            className="pointer-events-none absolute -right-6 bottom-0 h-48 w-auto object-contain opacity-70 mix-blend-luminosity sm:-right-4 sm:h-56"
          />
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-56 w-56 rounded-full bg-primary-glow/40 blur-3xl" />
          <div className="relative">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
              Pre-Order
            </span>
            <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
              Latest flagship launches.
            </h3>
            <p className="mt-2 text-sm text-white/85">
              Be first in line. Reserve with just LKR 5,000.
            </p>
          </div>
          <div className="relative mt-5 flex items-center gap-3">
            <Button asChild variant="hero" size="default">
              <Link to="/shop">Reserve Now</Link>
            </Button>
            <span className="text-sm font-semibold text-white/85">From LKR 8,500/mo</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PromoBanner;
