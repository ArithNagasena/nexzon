import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-editorial.jpg";

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-surface via-background to-surface">
    {/* subtle premium ambient accents */}
    <div className="pointer-events-none absolute -top-32 right-1/3 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full bg-primary-glow/10 blur-3xl" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.04),transparent_60%)]" />

    <div className="container-page relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
      {/* Copy */}
      <div className="relative z-10 lg:col-span-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          The 2025 Collection
        </span>

        <h1 className="mt-6 font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
          Technology,
          <br />
          <span className="italic font-light text-muted-foreground">thoughtfully</span> curated.
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-[17px]">
          Discover the season's most refined smartphones, tablets and audio —
          handpicked for design, performance and lasting craftsmanship.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link to="/shop">
              Explore the Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="rounded-full px-6 text-foreground hover:bg-secondary">
            <Link to="/category/smartphones">Shop Smartphones</Link>
          </Button>
        </div>

        {/* trust line */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Authentic, warranty-backed
          </span>
          <span className="hidden h-3 w-px bg-border sm:inline-block" />
          <span>Islandwide delivery</span>
          <span className="hidden h-3 w-px bg-border sm:inline-block" />
          <span>0% installment plans</span>
        </div>
      </div>

      {/* Visual */}
      <div className="relative lg:col-span-6">
        <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-[2rem] bg-surface ring-1 ring-border/60 shadow-[0_40px_80px_-30px_hsl(var(--foreground)/0.18)]">
          <img
            src={heroImg}
            alt="Curated arrangement of premium smartphones, tablet, earbuds and smartwatch"
            width={1280}
            height={1280}
            className="h-full w-full object-cover"
          />
          {/* soft top sheen */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background/40 to-transparent" />
        </div>

        {/* refined floating chip */}
        <div className="absolute -bottom-5 left-4 hidden items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lift backdrop-blur sm:flex">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Cellexa Promise
            </div>
            <div className="text-sm font-semibold text-foreground">2-Year Warranty</div>
          </div>
        </div>

        <div className="absolute -top-4 right-4 hidden items-center gap-2 rounded-full border border-border bg-card/95 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur md:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          New arrivals weekly
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
