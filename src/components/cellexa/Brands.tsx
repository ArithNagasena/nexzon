const brands = ["Apple", "Samsung", "Xiaomi", "Sony", "JBL", "Logitech", "ASUS", "OnePlus", "Bose", "Anker"];

const Brands = () => (
  <section className="border-y border-border bg-background py-12 sm:py-16">
    <div className="container-page">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Authorized retailer</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">Featured brands we carry</h2>
        </div>
        <a href="#" className="text-sm font-semibold text-primary hover:underline">All brands →</a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 lg:grid-cols-5">
        {brands.slice(0, 10).map((b) => (
          <a
            key={b}
            href="#"
            className="group flex h-20 items-center justify-center rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift sm:h-24"
          >
            <span className="font-display text-xl font-extrabold tracking-tight text-foreground/70 transition-colors group-hover:text-primary sm:text-2xl">
              {b}
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Brands;
