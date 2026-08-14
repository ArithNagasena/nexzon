import { Link } from "react-router-dom";

const brands = ["Apple", "Samsung", "Xiaomi", "Sony", "JBL", "Logitech", "ASUS", "OnePlus", "Bose", "Anker"];

const Brands = () => (
  <section className="border-y border-border bg-background py-12 sm:py-16">
    <div className="container-page">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Authorized retailer</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">Featured brands we carry</h2>
        </div>
        <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">All brands →</Link>
      </div>
    </div>

    <div className="overflow-hidden">
      <div className="marquee-track flex w-max gap-3 hover:[animation-play-state:paused] sm:gap-4">
        {[...brands, ...brands].map((b, i) => (
          <Link
            key={`${b}-${i}`}
            to={`/brand/${b.toLowerCase()}`}
            className="group flex h-20 shrink-0 items-center justify-center rounded-xl border border-border bg-card px-8 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift sm:h-24"
          >
            <span className="font-display text-xl font-extrabold tracking-tight text-foreground/70 transition-colors group-hover:text-primary sm:text-2xl">
              {b}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Brands;
