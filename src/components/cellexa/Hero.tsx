import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-megasale.jpg";

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-deep">
    {/* decorative glow */}
    <div className="pointer-events-none absolute -top-20 -right-20 h-[480px] w-[480px] rounded-full bg-primary-glow/30 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />

    <div className="container-page relative grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:py-20">
      {/* Copy */}
      <div className="relative z-10 text-primary-foreground">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md ring-1 ring-white/20">
          <Sparkles className="h-3.5 w-3.5" />
          Cellexa Mega Tech Sale · Limited Time
        </span>
        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
          Sri Lanka's <br className="hidden sm:block" />
          Smartest place <br className="hidden sm:block" />
          to <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">upgrade.</span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
          Save up to <span className="font-bold text-white">25% off</span> on the latest flagship smartphones, audio &amp; accessories.
          Genuine products, islandwide delivery, and 0% installment plans.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild variant="hero" size="xl">
            <Link to="/shop">Shop Now <ArrowRight className="h-5 w-5" /></Link>
          </Button>
          <Button asChild variant="heroOutline" size="xl">
            <Link to="/shop">View Deals</Link>
          </Button>
        </div>

        {/* mini stats */}
        <div className="mt-9 grid max-w-md grid-cols-3 gap-2 border-t border-white/15 pt-6 text-white/85">
          <div>
            <div className="font-display text-2xl font-extrabold text-white">120K+</div>
            <div className="text-xs">Happy Customers</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-white">500+</div>
            <div className="text-xs">Genuine Products</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-white">4.9★</div>
            <div className="text-xs">Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Hero visual */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 mx-auto h-[80%] w-[80%] rounded-full bg-primary-glow/30 blur-3xl" />
        <img
          src={heroImg}
          alt="Latest flagship smartphones available at Cellexa mega tech sale"
          width={1600}
          height={900}
          className="relative w-full max-w-2xl mx-auto drop-shadow-2xl animate-float"
        />
        {/* floating offer pill */}
        <div className="absolute left-2 top-6 hidden rounded-2xl bg-white p-3 pr-4 shadow-glow sm:flex sm:items-center sm:gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-promo text-promo-foreground font-extrabold">25%</div>
          <div className="text-left">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Mega Sale</div>
            <div className="text-sm font-bold text-foreground">Up to 25% OFF</div>
          </div>
        </div>
        <div className="absolute bottom-4 right-2 hidden rounded-2xl bg-white p-3 pr-4 shadow-glow md:flex md:items-center md:gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-success text-success-foreground font-extrabold">0%</div>
          <div className="text-left">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Installments</div>
            <div className="text-sm font-bold text-foreground">From LKR 8,500/mo</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
