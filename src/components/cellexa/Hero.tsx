import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-megasale.jpg";

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-hero">
    {/* subtle decorative accents */}
    <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-primary-glow/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 -left-24 h-[360px] w-[360px] rounded-full bg-primary/5 blur-3xl" />
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, hsl(220 30% 60% / 0.18) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    />

    <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
      {/* Copy */}
      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-deep shadow-soft backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          New Season · Curated Tech Collection
        </span>

        <h1 className="mt-5 font-display text-[2.5rem] font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
          Premium tech,
          <br />
          <span className="text-primary-deep">delivered with trust.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Discover the latest flagship smartphones, audio and accessories from the world's most trusted brands —
          backed by genuine warranty, islandwide delivery, and 0% installment plans across Sri Lanka.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="hero" size="xl">
            Shop Now <ArrowRight className="h-5 w-5" />
          </Button>
          <Button variant="heroOutline" size="xl">
            Explore Collection
          </Button>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Authorized retailer · 100% genuine products
        </div>

        {/* mini stats */}
        <div className="mt-10 grid max-w-lg grid-cols-3 gap-2 border-t border-border pt-6">
          <div>
            <div className="font-display text-2xl font-extrabold text-primary-deep">120K+</div>
            <div className="text-xs text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-primary-deep">500+</div>
            <div className="text-xs text-muted-foreground">Genuine Products</div>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-primary-deep">4.9★</div>
            <div className="text-xs text-muted-foreground">Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Hero visual */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 mx-auto h-[78%] w-[78%] rounded-full bg-primary-glow/15 blur-3xl" />
        <img
          src={heroImg}
          alt="Latest flagship smartphones available at Cellexa"
          width={1600}
          height={900}
          className="relative w-full max-w-2xl mx-auto animate-float"
          style={{ filter: "drop-shadow(0 24px 32px hsl(222 55% 18% / 0.18))" }}
        />

        {/* curated floating cards */}
        <div className="absolute left-0 top-4 hidden rounded-2xl border border-border bg-background/95 p-3 pr-4 shadow-lift backdrop-blur sm:flex sm:items-center sm:gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary-deep font-extrabold text-sm">
            25%
          </div>
          <div className="text-left">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Season Offer</div>
            <div className="text-sm font-bold text-foreground">Up to 25% off</div>
          </div>
        </div>
        <div className="absolute bottom-2 right-0 hidden rounded-2xl border border-border bg-background/95 p-3 pr-4 shadow-lift backdrop-blur md:flex md:items-center md:gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary-deep font-extrabold text-sm">
            0%
          </div>
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
