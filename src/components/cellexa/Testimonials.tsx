import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Dilshan P.",
    location: "Colombo 05",
    text: "Ordered an iPhone 15 Pro on Saturday, delivered to my door on Monday. Sealed box, genuine product, and the installment plan made it so easy.",
    product: "iPhone 15 Pro",
  },
  {
    name: "Nimesha R.",
    location: "Kandy",
    text: "Excellent customer service. They helped me choose the right Galaxy phone over WhatsApp and the COD option was perfect for me.",
    product: "Galaxy S24",
  },
  {
    name: "Tharindu W.",
    location: "Galle",
    text: "Best price I found in Sri Lanka for Sony XM5. Fast islandwide delivery and warranty card included. Will definitely shop again.",
    product: "Sony WH-1000XM5",
  },
];

const Testimonials = () => (
  <section className="bg-background py-14 sm:py-20">
    <div className="container-page">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Trusted by 120,000+ customers</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">What our customers say</h2>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-warning text-warning" />
            ))}
          </div>
          <div className="text-sm">
            <span className="font-bold text-foreground">4.9 / 5</span>
            <span className="ml-1 text-muted-foreground">· 8,200+ reviews</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.name} className="relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
            <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
            <div className="flex items-center gap-1 text-warning">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-warning" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{r.text}"</p>
            <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-deep font-bold text-primary-foreground">
                {r.name[0]}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.location} · {r.product}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
