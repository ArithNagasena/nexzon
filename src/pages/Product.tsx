import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Undo2,
  Wallet,
  Minus,
  Plus,
  Check,
  PackageSearch,
  GitCompareArrows,
  BadgeCheck,
} from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import ProductCard from "@/components/NexZon/ProductCard";
import BuybackPanel from "@/components/NexZon/BuybackPanel";
import { Button } from "@/components/ui/button";
import { allProducts, buildSpecs, fmtLKR, getProduct } from "@/data/catalog";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "Specifications", "Reviews"] as const;
type Tab = (typeof TABS)[number];

const ratingBreakdown = [
  { stars: 5, pct: 84 },
  { stars: 4, pct: 11 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

const customerReviews = [
  { name: "Arith Nagasena", when: "2 weeks ago", rating: 5, title: "Exactly as described", body: "Sealed box, Sri Lanka warranty card inside, and it arrived in Kandy two days after I ordered. The installment plan took two minutes to set up at checkout." },
  { name: "Fathima Rizwan", when: "1 month ago", rating: 5, title: "Camera is the reason to buy", body: "Low-light shots are noticeably better than my old phone. Battery comfortably lasts a full clinic day with plenty to spare." },
  { name: "Mohamed Aslam", when: "2 months ago", rating: 4, title: "Great, but heavy", body: "No complaints about performance. It is on the heavier side though — you notice it after a long call. Delivery was a day later than quoted but they phoned ahead." },
];

const Stars = ({ n, className }: { n: number; className?: string }) => (
  <div className={cn("flex items-center gap-0.5", className)} aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} aria-hidden className={cn("h-4 w-4", i < Math.round(n) ? "fill-warning text-warning" : "fill-muted text-muted")} />
    ))}
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container-page grid place-items-center py-24 text-center">
      <PackageSearch className="h-12 w-12 text-muted-foreground/60" />
      <h1 className="mt-4 font-display text-2xl font-extrabold">We couldn't find that product</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The link may be out of date, or the item is no longer stocked.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild><Link to="/category/smartphones">Browse smartphones</Link></Button>
        <Button asChild variant="outline"><Link to="/shop">See everything</Link></Button>
      </div>
    </main>
    <Footer />
  </div>
);

const ProductPage = () => {
  const { id } = useParams();
  const p = getProduct(id);

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState<string | null>(null);
  const [storage, setStorage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("Overview");

  useEffect(() => {
    if (!p) return;
    document.title = `${p.name} — ${fmtLKR(p.price)} | Nexzon`;
    setActiveImage(0);
    setColor(p.colors?.[0]?.name ?? null);
    setStorage(p.storageOptions?.[0] ?? p.storage ?? null);
    setQty(1);
    setTab("Overview");
  }, [p]);

  const related = useMemo(
    () => (p ? allProducts.filter((x) => x.categorySlug === p.categorySlug && x.id !== p.id).slice(0, 4) : []),
    [p],
  );

  if (!p) return <NotFound />;

  const gallery = p.gallery?.length ? p.gallery : [p.image];
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  const installment = Math.round(p.price / 12);
  const specGroups = buildSpecs(p);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/category/${p.categorySlug}`} className="hover:text-primary">{p.category}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{p.name}</span>
          </nav>
        </div>

        {/* Gallery + sticky buy rail */}
        <section className="container-page pt-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-10">
            <div>
              <div className="isolate overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-secondary p-5 sm:p-8">
                <img
                  src={gallery[activeImage]}
                  alt={p.name}
                  className="mx-auto h-60 w-auto object-contain mix-blend-multiply sm:h-80 lg:h-[26rem]"
                />
              </div>

              {gallery.length > 1 && (
                <div className="mt-3 flex gap-3">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      aria-pressed={activeImage === i}
                      className={cn(
                        "isolate grid h-20 w-20 place-items-center rounded-xl border-2 bg-white transition-colors",
                        activeImage === i ? "border-primary" : "border-border hover:border-primary/40",
                      )}
                    >
                      <img src={g} alt="" className="h-16 w-auto object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <BuybackPanel product={p} />
              </div>
            </div>

            {/* Buy rail */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex flex-wrap items-center gap-2">
                  <Link to={`/brand/${p.brand.toLowerCase()}`} className="text-[11px] font-bold uppercase tracking-wider text-primary hover:underline">
                    {p.brand}
                  </Link>
                  {p.badge && (
                    <span className="rounded-full bg-promo px-2 py-0.5 text-[10px] font-bold uppercase text-promo-foreground">
                      {p.badge.label}
                    </span>
                  )}
                </div>

                <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight text-foreground">{p.name}</h1>

                <div className="mt-2 flex items-center gap-2">
                  <Stars n={p.rating} />
                  <span className="text-sm font-semibold text-foreground">{p.rating}</span>
                  <a href="#reviews" onClick={() => setTab("Reviews")} className="text-xs text-muted-foreground hover:text-primary">
                    ({p.reviews} reviews)
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-end gap-3">
                  <span className="font-display text-3xl font-extrabold text-foreground">{fmtLKR(p.price)}</span>
                  {p.oldPrice && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">{fmtLKR(p.oldPrice)}</span>
                      <span className="rounded-full bg-promo px-2 py-0.5 text-[11px] font-bold text-promo-foreground">
                        Save {discount}%
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Wallet className="h-3.5 w-3.5 text-primary" />
                  or {fmtLKR(installment)}/month × 12 at 0%
                </p>

                {p.colors && (
                  <div className="mt-5">
                    <p className="text-xs font-semibold text-foreground">
                      Colour: <span className="font-normal text-muted-foreground">{color}</span>
                    </p>
                    <div className="mt-2 flex gap-2">
                      {p.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setColor(c.name)}
                          aria-label={c.name}
                          aria-pressed={color === c.name}
                          className={cn(
                            "h-9 w-9 rounded-full border-2 transition-transform",
                            color === c.name ? "border-primary scale-110" : "border-border hover:scale-105",
                          )}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {p.storageOptions && p.storageOptions.length > 1 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-foreground">Storage</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.storageOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStorage(s)}
                          aria-pressed={storage === s}
                          className={cn(
                            "rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                            storage === s
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground/75 hover:border-primary/40",
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex items-center rounded-xl border border-border">
                    <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-10 w-10 place-items-center text-muted-foreground hover:text-primary">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold tabular-nums" aria-live="polite">{qty}</span>
                    <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity" className="grid h-10 w-10 place-items-center text-muted-foreground hover:text-primary">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                    <Check className="h-3.5 w-3.5" /> In stock
                  </span>
                </div>

                <div className="mt-4 grid gap-2">
                  <Button asChild size="lg" className="w-full">
                    <Link to="/cart"><ShoppingCart className="h-4 w-4" /> Add to cart</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link to="/checkout">Buy now</Link>
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="ghost" size="sm"><Link to="/account/wishlist"><Heart className="h-4 w-4" /> Wishlist</Link></Button>
                    <Button asChild variant="ghost" size="sm"><Link to="/compare"><GitCompareArrows className="h-4 w-4" /> Compare</Link></Button>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {[
                    { icon: Truck, text: "Free islandwide delivery over LKR 25,000" },
                    { icon: ShieldCheck, text: p.warranty },
                    { icon: Undo2, text: "7-day returns on unopened items" },
                    { icon: BadgeCheck, text: "Genuine stock from authorized distributors" },
                  ].map((r) => (
                    <li key={r.text} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <r.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {r.text}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Tabbed detail */}
        <section id="reviews" className="container-page pt-14">
          <div className="flex gap-1 border-b border-border" role="tablist">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative px-4 py-3 text-sm font-semibold transition-colors",
                  tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
                {tab === t && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />}
              </button>
            ))}
          </div>

          <div className="py-8">
            {tab === "Overview" && (
              <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                <div>
                  <h2 className="font-display text-xl font-bold">About this {p.category.toLowerCase().replace(/s$/, "")}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {specGroups.flatMap((g) => g.rows).slice(0, 6).map(([k, v]) => (
                      <div key={k + v} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{k}</div>
                        <div className="mt-1 text-sm font-bold text-foreground">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">In the box</h3>
                  <ul className="mt-3 space-y-2">
                    {p.inBox.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === "Specifications" && (
              <div className="grid gap-4 md:grid-cols-2">
                {specGroups.map((g) => (
                  <div key={g.group} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                    <h3 className="border-b border-border bg-surface px-5 py-3 font-display text-sm font-bold uppercase tracking-wider text-foreground">
                      {g.group}
                    </h3>
                    <dl>
                      {g.rows.map(([k, v], i) => (
                        <div key={k} className={cn("flex gap-4 px-5 py-3 text-sm", i % 2 === 1 && "bg-surface/50")}>
                          <dt className="w-36 shrink-0 text-muted-foreground">{k}</dt>
                          <dd className="font-medium text-foreground">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            )}

            {tab === "Reviews" && (
              <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24 lg:self-start">
                  <div className="flex items-end gap-3">
                    <span className="font-display text-5xl font-extrabold leading-none">{p.rating}</span>
                    <div className="pb-1">
                      <Stars n={p.rating} />
                      <p className="mt-1 text-xs text-muted-foreground">{p.reviews} verified reviews</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {ratingBreakdown.map((b) => (
                      <li key={b.stars} className="flex items-center gap-2.5">
                        <span className="w-8 shrink-0 text-xs text-muted-foreground">{b.stars}★</span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <span className="block h-full rounded-full bg-warning" style={{ width: `${b.pct}%` }} />
                        </span>
                        <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{b.pct}%</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  {customerReviews.map((r) => (
                    <article key={r.name} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <div className="flex items-center justify-between gap-3">
                        <Stars n={r.rating} />
                        <span className="text-xs text-muted-foreground">{r.when}</span>
                      </div>
                      <h4 className="mt-2 font-display text-sm font-bold text-foreground">{r.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{r.body}</p>
                      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-hero text-[10px] font-bold text-primary-foreground">
                          {r.name.split(" ").map((x) => x[0]).join("")}
                        </span>
                        <span className="text-xs font-semibold text-foreground">{r.name}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-success">
                          <BadgeCheck className="h-3.5 w-3.5" /> Verified purchase
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="container-page pb-16 pt-4">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="font-display text-xl font-bold">You might also like</h2>
              <Link to={`/category/${p.categorySlug}`} className="text-sm font-semibold text-primary hover:underline">
                View all {p.category.toLowerCase()}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
