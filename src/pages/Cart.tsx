import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Heart,
  Tag,
  Truck,
  ShieldCheck,
  Undo2,
  ShoppingBag,
  Check,
  X,
  ArrowRight,
  Wallet,
} from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import ProductCard from "@/components/NexZon/ProductCard";
import { Button } from "@/components/ui/button";
import { allProducts, fmtLKR, getProduct, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/utils";

const FREE_SHIPPING_AT = 25000;
const DELIVERY_FEE = 600;

const COUPONS: Record<string, { type: "pct" | "flat"; value: number; label: string }> = {
  NEXZON10: { type: "pct", value: 10, label: "10% off your order" },
  WELCOME1000: { type: "flat", value: 1000, label: "LKR 1,000 off your first order" },
  FREESHIP: { type: "flat", value: DELIVERY_FEE, label: "Free delivery" },
};

type Line = { id: string; qty: number };

const START: Line[] = [
  { id: "iphone-17-pro-max", qty: 1 },
  { id: "airpods-pro-3", qty: 1 },
  { id: "apple-watch-series-11", qty: 2 },
];

const CartPage = () => {
  const [lines, setLines] = useState<Line[]>(START);
  const [saved, setSaved] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; label: string; off: number } | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const items = useMemo(
    () => lines.map((l) => ({ line: l, p: getProduct(l.id) })).filter((x) => x.p) as { line: Line; p: CatalogItem }[],
    [lines],
  );

  const subtotal = items.reduce((s, { line, p }) => s + p.price * line.qty, 0);
  const listTotal = items.reduce((s, { line, p }) => s + (p.oldPrice ?? p.price) * line.qty, 0);
  const productSavings = listTotal - subtotal;
  const couponOff = applied
    ? applied.code === "NEXZON10"
      ? Math.round(subtotal * 0.1)
      : applied.off
    : 0;
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_AT || applied?.code === "FREESHIP" ? 0 : DELIVERY_FEE;
  const total = Math.max(0, subtotal - couponOff) + shipping;
  const toFreeShipping = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  const setQty = (id: string, d: number) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.min(10, Math.max(1, l.qty + d)) } : l)));
  const remove = (id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
    setNote("Item removed from your cart.");
  };
  const saveForLater = (id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
    setSaved((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setNote("Moved to saved items.");
  };
  const restore = (id: string) => {
    setSaved((prev) => prev.filter((x) => x !== id));
    setLines((prev) => (prev.some((l) => l.id === id) ? prev : [...prev, { id, qty: 1 }]));
  };

  const applyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const key = code.trim().toUpperCase();
    const c = COUPONS[key];
    if (!c) {
      setNote(`"${key}" isn't a valid code.`);
      return;
    }
    setApplied({ code: key, label: c.label, off: c.type === "flat" ? c.value : 0 });
    setNote(null);
    setCode("");
  };

  const suggestions = useMemo(
    () => allProducts.filter((p) => !lines.some((l) => l.id === p.id) && !saved.includes(p.id)).slice(0, 4),
    [lines, saved],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Cart</span>
          </nav>
        </div>

        <section className="container-page pt-6">
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            Your cart{" "}
            <span className="text-lg font-semibold text-muted-foreground">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </section>

        {items.length === 0 ? (
          <section className="container-page py-10 sm:py-16">
            <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-card p-6 text-center sm:p-10">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h2 className="mt-4 font-display text-xl font-bold">Your cart is empty</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse the latest phones, audio and accessories — free delivery over {fmtLKR(FREE_SHIPPING_AT)}.
              </p>
              <Button asChild className="mt-6"><Link to="/category/smartphones">Start shopping</Link></Button>
            </div>
          </section>
        ) : (
          <section className="container-page pt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
              <div className="min-w-0">
                {/* Free-shipping progress */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 shrink-0 text-primary" />
                    {toFreeShipping > 0 ? (
                      <span className="text-foreground">
                        Add <strong>{fmtLKR(toFreeShipping)}</strong> more for free islandwide delivery
                      </span>
                    ) : (
                      <span className="font-semibold text-success">
                        You've unlocked free islandwide delivery
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", progress >= 100 ? "bg-success" : "bg-primary")}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {note && (
                  <div role="status" className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary px-4 py-2.5 text-xs">
                    <span className="text-foreground">{note}</span>
                    <button onClick={() => setNote(null)} aria-label="Dismiss" className="text-muted-foreground hover:text-foreground">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                {/* Lines */}
                <div className="mt-4 space-y-3">
                  {items.map(({ line, p }) => (
                    <article key={p.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row">
                      <Link to={`/product/${p.id}`} className="isolate grid h-28 w-28 shrink-0 place-items-center self-center rounded-xl bg-white">
                        <img src={p.image} alt={p.name} className="h-24 w-auto object-contain mix-blend-multiply" />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{p.brand}</span>
                        <Link to={`/product/${p.id}`} className="block font-display text-base font-bold leading-tight text-foreground hover:text-primary">
                          {p.name}
                        </Link>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-success">
                          <Check className="h-3.5 w-3.5" /> In stock · ships in 24 hours
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <div className="flex items-center rounded-xl border border-border">
                            <button onClick={() => setQty(p.id, -1)} aria-label={`Decrease quantity of ${p.name}`} className="grid h-9 w-9 place-items-center text-muted-foreground hover:text-primary">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold tabular-nums">{line.qty}</span>
                            <button onClick={() => setQty(p.id, 1)} aria-label={`Increase quantity of ${p.name}`} className="grid h-9 w-9 place-items-center text-muted-foreground hover:text-primary">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button onClick={() => saveForLater(p.id)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary">
                            <Heart className="h-3.5 w-3.5" /> Save for later
                          </button>
                          <button onClick={() => remove(p.id)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="shrink-0 text-right sm:w-40">
                        {p.oldPrice && (
                          <div className="text-xs text-muted-foreground line-through">{fmtLKR(p.oldPrice * line.qty)}</div>
                        )}
                        <div className="font-display text-lg font-extrabold text-foreground">{fmtLKR(p.price * line.qty)}</div>
                        <div className="mt-1 text-[11px] text-muted-foreground">
                          {fmtLKR(Math.round((p.price * line.qty) / 12))}/mo × 12
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Saved for later */}
                {saved.length > 0 && (
                  <div className="mt-8">
                    <h2 className="font-display text-lg font-bold">Saved for later ({saved.length})</h2>
                    <div className="mt-3 space-y-3">
                      {saved.map((id) => {
                        const p = getProduct(id);
                        if (!p) return null;
                        return (
                          <div key={id} className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
                            <div className="isolate grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-white">
                              <img src={p.image} alt="" className="h-14 w-auto object-contain mix-blend-multiply" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-semibold text-foreground">{p.name}</div>
                              <div className="text-xs text-muted-foreground">{fmtLKR(p.price)}</div>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => restore(id)}>
                              <Undo2 className="h-3.5 w-3.5" /> Move to cart
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Summary */}
              <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h2 className="font-display text-lg font-bold">Order summary</h2>

                  <form onSubmit={applyCode} className="mt-4">
                    <label htmlFor="coupon" className="text-xs font-semibold text-foreground">Promo code</label>
                    <div className="mt-1.5 flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="coupon"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="NEXZON10"
                          className="h-10 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm uppercase outline-none placeholder:normal-case placeholder:text-muted-foreground focus:border-primary focus:bg-background"
                        />
                      </div>
                      <Button type="submit" variant="outline" className="h-10">Apply</Button>
                    </div>
                  </form>

                  {applied && (
                    <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-success/10 px-3 py-2 text-xs">
                      <span className="font-semibold text-success">{applied.code} · {applied.label}</span>
                      <button onClick={() => setApplied(null)} aria-label="Remove promo code" className="text-success hover:opacity-70">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  <dl className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm">
                    <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{fmtLKR(subtotal)}</dd></div>
                    {productSavings > 0 && (
                      <div className="flex justify-between"><dt className="text-muted-foreground">Product savings</dt><dd className="font-semibold text-success">−{fmtLKR(productSavings)}</dd></div>
                    )}
                    {couponOff > 0 && (
                      <div className="flex justify-between"><dt className="text-muted-foreground">Promo ({applied?.code})</dt><dd className="font-semibold text-success">−{fmtLKR(couponOff)}</dd></div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Delivery</dt>
                      <dd className={cn("font-semibold", shipping === 0 && "text-success")}>{shipping === 0 ? "Free" : fmtLKR(shipping)}</dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                    <span className="text-sm font-semibold text-foreground">Total</span>
                    <span className="font-display text-2xl font-extrabold text-foreground">{fmtLKR(total)}</span>
                  </div>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Wallet className="h-3.5 w-3.5 text-primary" /> or {fmtLKR(Math.round(total / 12))}/month × 12 at 0%
                  </p>

                  <Button asChild size="lg" className="mt-5 w-full">
                    <Link to="/checkout">Proceed to checkout <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
                    <Link to="/category/smartphones">Continue shopping</Link>
                  </Button>

                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {[
                      { icon: ShieldCheck, t: "Genuine stock, warranty-backed" },
                      { icon: Truck, t: "Islandwide delivery, 1–3 working days" },
                      { icon: Undo2, t: "7-day returns on unopened items" },
                    ].map((r) => (
                      <li key={r.t} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <r.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {r.t}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <section className="container-page py-14">
            <h2 className="font-display text-xl font-bold">Frequently bought together</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {suggestions.map((s) => (
                <ProductCard key={s.id} product={s} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
