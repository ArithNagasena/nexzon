import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import smartphones from "@/assets/cat-smartphones.jpg";
import tablets from "@/assets/cat-tablets.jpg";
import audio from "@/assets/cat-audio.jpg";
import accessories from "@/assets/cat-accessories.jpg";

const categories = [
  { name: "Smartphones", slug: "smartphones", img: smartphones, hint: "Latest flagships" },
  { name: "Tablets", slug: "tablets", img: tablets, hint: "Work & play" },
  { name: "Audio", slug: "audio", img: audio, hint: "Headphones & buds" },
  { name: "Accessories", slug: "accessories", img: accessories, hint: "Cases, chargers & more" },
];

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-surface via-background to-surface">
    {/* soft decorative accents */}
    <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-primary-glow/10 blur-3xl" />

    <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-24">
      {/* Left: copy */}
      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Sri Lanka's trusted tech store
        </span>

        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
          Discover the latest{" "}
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            tech
          </span>{" "}
          for every lifestyle.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Shop genuine smartphones, tablets, audio gear and accessories from the brands you love —
          curated, certified, and delivered islandwide.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild size="xl" className="rounded-xl">
            <Link to="/shop">
              Shop Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="rounded-xl border-2">
            <Link to="/shop">Browse Categories</Link>
          </Button>
        </div>

        {/* trust row */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            100% Genuine Products
          </div>
          <div className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            Islandwide Delivery
          </div>
          <div className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            0% Installments
          </div>
        </div>
      </div>

      {/* Right: category tiles */}
      <div className="relative">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                i === 0 ? "sm:translate-y-4" : ""
              } ${i === 3 ? "sm:translate-y-4" : ""}`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-surface">
                <img
                  src={c.img}
                  alt={`${c.name} at Cellexa`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent p-4 pt-10">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {c.hint}
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-foreground sm:text-lg">
                    {c.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
