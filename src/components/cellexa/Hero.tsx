import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import iphone17Lineup from "@/assets/iphone-17-lineup.png";

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-surface via-background to-primary/5">
    {/* decorative flowing accents */}
    <div className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full bg-primary-glow/15 blur-3xl" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_100%)]" />

    {/* giant outlined headline behind product */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[18vw] font-extrabold leading-none tracking-tighter text-foreground/[0.04] sm:text-[14vw] lg:text-[12rem]"
    >
      New Series
    </div>

    <div className="container-page relative grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:gap-6 lg:py-20">
      {/* Left: copy */}
      <div className="relative z-10 lg:col-span-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Just Launched
        </div>

        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
          Experience the{" "}
          <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            iPhone 17
          </span>{" "}
          Series.
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Next-level performance, breathtaking cameras and four stunning new colours.
          Pre-order now with 0% installments and islandwide delivery.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="rounded-xl shadow-lift">
            <Link to="/category/smartphones">
              Pre-Order Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl border-2">
            <Link to="/shop">Explore Lineup</Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            iPhone 17 Pro
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            iPhone 17
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            iPhone 17 Air
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            iPhone 17e
          </span>
        </div>
      </div>

      {/* Right: product showcase */}
      <div className="relative lg:col-span-7">
        <div className="relative">
          {/* glow behind phones */}
          <div className="absolute inset-0 -z-10 mx-auto h-3/4 w-3/4 translate-y-1/4 rounded-full bg-gradient-to-tr from-primary/20 via-primary-glow/20 to-transparent blur-3xl" />
          <img
            src={iphone17Lineup}
            alt="iPhone 17 Series lineup — Pro, Standard, Air and 17e in four colours"
            width={1920}
            height={1080}
            className="relative z-10 mx-auto w-full max-w-2xl drop-shadow-2xl"
          />
          {/* reflective floor */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* floating price tag */}
        <div className="absolute right-2 top-2 hidden rounded-2xl border border-border bg-card/95 p-3 shadow-lift backdrop-blur sm:block lg:right-0 lg:top-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Starting from
          </div>
          <div className="mt-0.5 font-display text-xl font-extrabold text-foreground">
            LKR 250,900
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
