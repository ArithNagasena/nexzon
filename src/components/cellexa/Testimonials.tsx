import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Aisha Rahman",
    role: "Product Designer",
    text: "Cellexa nailed the experience from browse to delivery. My new Pro 15 arrived next day perfectly packaged. The 0% installment made it effortless.",
  },
  {
    name: "Daniel Perera",
    role: "Software Engineer",
    text: "I've bought four devices through Cellexa now. Authentic stock, fair prices, and their support team actually knows the products. Hard to beat.",
  },
  {
    name: "Maya Fernando",
    role: "Photographer",
    text: "The curated collections helped me build a complete workspace setup in one go. Everything works together beautifully.",
  },
];

const Testimonials = () => (
  <section className="bg-surface pb-16 pt-4 sm:pb-24 sm:pt-6">
    <div className="container-page">
      {/* Centered header */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Loved by 120,000+ customers
        </span>
        <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
          A premium experience,
          <br />
          end to end.
        </h2>
      </div>

      {/* Reviews */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <article
            key={r.name}
            className="relative rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Quote className="absolute right-5 top-5 h-7 w-7 text-primary/20" />

            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>

            {/* Quote */}
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              "{r.text}"
            </p>

            {/* Divider + author */}
            <div className="mt-6 border-t border-border pt-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground text-sm font-bold text-background">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
