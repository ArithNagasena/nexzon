import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import iphoneHero from "@/assets/iphone-17-pro-max-blue.png";

const Hero = () => (
  <section className="container-page pt-1 pb-4 sm:pt-2 sm:pb-6 lg:pt-2 lg:pb-8">
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand-soft shadow-card">
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-promo/10 blur-3xl" />

      <div className="relative grid min-w-0 items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
        <div className="min-w-0">
          <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-sm">
            New · iPhone 17 Pro Max
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Discover next-gen tech.
          </h1>
          <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
            Flagship phones, audio &amp; gadgets — genuine, warrantied, delivered islandwide.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="lg">
              <Link to="/category/smartphones">Shop Smartphones</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">Explore All Deals</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Islandwide delivery · COD available · 0% installments
          </p>
        </div>

        <div className="relative flex h-72 min-w-0 items-center justify-center sm:h-96">
          <img
            src={iphoneHero}
            alt="iPhone 17 Pro Max"
            className="h-full max-w-full animate-float object-contain mix-blend-multiply"
          />
          <div className="absolute bottom-4 left-0 rounded-xl bg-white px-3 py-2 shadow-lift ring-1 ring-border sm:left-4">
            <div className="text-xs text-muted-foreground">iPhone 17 Pro Max</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">From LKR 429,000</span>
              <span className="badge-promo bg-promo text-promo-foreground">-12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
