import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Heart,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Wallet,
  Lock,
  Tag,
  ArrowRight,
  Check,
  Gift,
  CreditCard,
  RefreshCcw,
} from "lucide-react";

import PromoBar from "@/components/cellexa/PromoBar";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import ProductCard, { type Product } from "@/components/cellexa/ProductCard";
import { Button } from "@/components/ui/button";

import phone1 from "@/assets/product-phone-1.jpg";
import phone2 from "@/assets/product-phone-2.jpg";
import phone3 from "@/assets/product-phone-3.jpg";
import tablet from "@/assets/product-tablet.jpg";
import earbuds from "@/assets/product-earbuds.jpg";
import watch from "@/assets/product-watch.jpg";
import headphones from "@/assets/product-headphones.jpg";
import productCase from "@/assets/product-case.jpg";
import charger from "@/assets/product-charger.jpg";

/* -------------------- Types & data -------------------- */
type CartItem = {
  id: string;
  name: string;
  brand: string;
  brandSlug: string;
  image: string;
  price: number;
  oldPrice?: number;
  qty: number;
  stock: number;
  variant: { color?: string; storage?: string; ram?: string };
  badge?: string;
  warranty?: string;
};

const initialCart: CartItem[] = [
  {
    id: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 5G",
    brand: "Samsung",
    brandSlug: "samsung",
    image: phone1,
    price: 449900,
    oldPrice: 519900,
    qty: 1,
    stock: 14,
    variant: { color: "Titanium Black", storage: "512GB", ram: "12GB" },
    badge: "Best Seller",
    warranty: "1-Year Samsung SL Warranty",
  },
  {
    id: "buds3-pro",
    name: "Samsung Galaxy Buds3 Pro",
    brand: "Samsung",
    brandSlug: "samsung",
    image: earbuds,
    price: 64900,
    oldPrice: 74900,
    qty: 2,
    stock: 32,
    variant: { color: "Silver" },
    badge: "Bundle Deal",
    warranty: "1-Year Warranty",
  },
  {
    id: "case-s24",
    name: "S24 Ultra Silicone Case with S Pen Slot",
    brand: "Samsung",
    brandSlug: "samsung",
    image: productCase,
    price: 7500,
    oldPrice: 9500,
    qty: 1,
    stock: 50,
    variant: { color: "Navy" },
    warranty: "Genuine Accessory",
  },
];

const recommended: Product[] = [
  { id: "p2", name: "Samsung Galaxy S24+ 5G 256GB", brand: "Samsung", price: 329900, oldPrice: 369900, rating: 4.7, reviews: 612, image: phone2, badge: { label: "Hot Deal", tone: "promo" } },
  { id: "p3", name: "Samsung Galaxy Z Fold5 5G 512GB", brand: "Samsung", price: 559900, rating: 4.6, reviews: 234, image: phone3, badge: { label: "Foldable", tone: "primary" } },
  { id: "p4", name: "Samsung Galaxy Tab S9 Ultra Wi-Fi", brand: "Samsung", price: 389900, oldPrice: 429900, rating: 4.7, reviews: 188, image: tablet, badge: { label: "New", tone: "success" } },
  { id: "p5", name: "Samsung Galaxy Watch6 Classic 47mm", brand: "Samsung", price: 119900, rating: 4.5, reviews: 302, image: watch },
  { id: "p6", name: "Sony WH-1000XM5 Wireless ANC", brand: "Sony", price: 119900, oldPrice: 134900, rating: 4.8, reviews: 540, image: headphones, badge: { label: "Editor's Pick", tone: "primary" } },
];

const accessories: Product[] = [
  { id: "a1", name: "Samsung 45W Travel Adapter (USB-C)", brand: "Samsung", price: 8900, rating: 4.7, reviews: 540, image: charger, badge: { label: "Genuine", tone: "success" } },
  { id: "a3", name: "Samsung Galaxy Buds3 Pro", brand: "Samsung", price: 64900, oldPrice: 74900, rating: 4.6, reviews: 421, image: earbuds, badge: { label: "Bundle", tone: "primary" } },
  { id: "a2", name: "S24 Ultra Silicone Case with S Pen Slot", brand: "Samsung", price: 7500, oldPrice: 9500, rating: 4.6, reviews: 188, image: productCase },
  { id: "a4", name: "Samsung Galaxy Watch6 Classic", brand: "Samsung", price: 119900, rating: 4.5, reviews: 302, image: watch },
];

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

/* Coupon registry */
const COUPONS: Record<string, { type: "pct" | "flat"; value: number; label: string }> = {
  CELLEXA10: { type: "pct", value: 10, label: "10% off entire order" },
  WELCOME5K: { type: "flat", value: 5000, label: "LKR 5,000 off" },
  GALAXY15: { type: "pct", value: 15, label: "15% off Galaxy items" },
};

/* -------------------- Page -------------------- */
const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>(initialCart);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [codeMsg, setCodeMsg] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  const updateQty = (id: string, delta: number) =>
    setItems((arr) =>
      arr.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, Math.min(it.stock, it.qty + delta)) } : it
      )
    );

  const removeItem = (id: string) => setItems((arr) => arr.filter((i) => i.id !== id));

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const youSave = useMemo(
    () => items.reduce((s, i) => s + Math.max(0, (i.oldPrice ?? i.price) - i.price) * i.qty, 0),
    [items]
  );
  const couponDiscount = useMemo(() => {
    if (!applied) return 0;
    return applied.discount;
  }, [applied]);
  const delivery = subtotal > 50000 || subtotal === 0 ? 0 : 850;
  const total = Math.max(0, subtotal - couponDiscount + delivery);
  const installment = Math.round(total / 12);
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  const applyCode = () => {
    const k = code.trim().toUpperCase();
    if (!k) return;
    const c = COUPONS[k];
    if (!c) {
      setCodeMsg({ tone: "err", text: "Invalid code. Try CELLEXA10 or WELCOME5K." });
      setApplied(null);
      return;
    }
    const value = c.type === "pct" ? Math.round((subtotal * c.value) / 100) : c.value;
    setApplied({ code: k, discount: value, label: c.label });
    setCodeMsg({ tone: "ok", text: `Applied: ${c.label}` });
  };

  const clearCode = () => {
    setApplied(null);
    setCode("");
    setCodeMsg(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <PromoBar />
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-surface/60">
          <div className="container-page py-3">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/shop" className="hover:text-primary">Shop</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">Your Cart</span>
            </nav>
          </div>
        </div>

        {/* Page header */}
        <section className="container-page pt-8 md:pt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                Your Cart
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {items.length === 0
                  ? "Your cart is empty — let's find something great."
                  : `${itemCount} ${itemCount === 1 ? "item" : "items"} ready for checkout. Genuine products with full warranty.`}
              </p>
            </div>
          </div>
        </section>

        {/* Cart layout */}
        <section className="container-page py-6 md:py-8">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Items */}
              <div className="lg:col-span-8">
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
                  <div className="hidden grid-cols-[1fr_120px_140px_40px] items-center gap-4 border-b border-border/60 bg-surface px-5 py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground md:grid">
                    <span>Product</span>
                    <span className="text-center">Quantity</span>
                    <span className="text-right">Subtotal</span>
                    <span />
                  </div>

                  <ul className="divide-y divide-border/60">
                    {items.map((it) => {
                      const lineTotal = it.price * it.qty;
                      const lineOld = (it.oldPrice ?? it.price) * it.qty;
                      const itemDiscount =
                        it.oldPrice && it.oldPrice > it.price
                          ? Math.round(((it.oldPrice - it.price) / it.oldPrice) * 100)
                          : 0;

                      return (
                        <li key={it.id} className="p-4 sm:p-5">
                          <div className="grid gap-4 md:grid-cols-[1fr_120px_140px_40px] md:items-center">
                            {/* Product cell */}
                            <div className="flex gap-4">
                              <Link
                                to={`/product/${it.id}`}
                                className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-gradient-brand-soft sm:h-28 sm:w-28"
                              >
                                <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                                {itemDiscount > 0 && (
                                  <span className="absolute left-1.5 top-1.5 rounded-full bg-promo px-1.5 py-0.5 text-[10px] font-bold text-promo-foreground">
                                    -{itemDiscount}%
                                  </span>
                                )}
                              </Link>
                              <div className="min-w-0 flex-1">
                                <Link
                                  to={`/brand/${it.brandSlug}`}
                                  className="text-[11px] font-bold uppercase tracking-wider text-primary hover:underline"
                                >
                                  {it.brand}
                                </Link>
                                <Link
                                  to={`/product/${it.id}`}
                                  className="mt-0.5 block text-sm font-bold leading-snug text-foreground hover:text-primary sm:text-base"
                                >
                                  {it.name}
                                </Link>
                                {/* Variant chips */}
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {it.variant.color && (
                                    <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                                      {it.variant.color}
                                    </span>
                                  )}
                                  {it.variant.storage && (
                                    <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                                      {it.variant.storage}
                                    </span>
                                  )}
                                  {it.variant.ram && (
                                    <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                                      {it.variant.ram} RAM
                                    </span>
                                  )}
                                </div>


                                {/* Mobile price */}
                                <div className="mt-3 flex items-baseline gap-2 md:hidden">
                                  <span className="font-display text-base font-extrabold text-foreground">
                                    {fmtLKR(it.price)}
                                  </span>
                                  {it.oldPrice && (
                                    <span className="text-xs text-muted-foreground line-through">
                                      {fmtLKR(it.oldPrice)}
                                    </span>
                                  )}
                                </div>

                                {/* Inline actions */}
                                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                                  <button className="inline-flex items-center gap-1.5 font-semibold text-foreground/80 hover:text-primary">
                                    <Heart className="h-3.5 w-3.5" /> Move to Wishlist
                                  </button>
                                  <button
                                    onClick={() => removeItem(it.id)}
                                    className="inline-flex items-center gap-1.5 font-semibold text-foreground/80 hover:text-destructive"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" /> Remove
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center justify-start md:justify-center">
                              <div className="inline-flex items-center rounded-xl border border-border bg-card">
                                <button
                                  onClick={() => updateQty(it.id, -1)}
                                  className="grid h-10 w-10 place-items-center rounded-l-xl text-foreground hover:bg-secondary hover:text-primary"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-10 text-center text-sm font-bold">{it.qty}</span>
                                <button
                                  onClick={() => updateQty(it.id, 1)}
                                  className="grid h-10 w-10 place-items-center rounded-r-xl text-foreground hover:bg-secondary hover:text-primary"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="hidden flex-col items-end md:flex">
                              <span className="font-display text-base font-extrabold text-foreground">
                                {fmtLKR(lineTotal)}
                              </span>
                              {it.oldPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {fmtLKR(lineOld)}
                                </span>
                              )}
                            </div>

                            {/* Remove icon (desktop) */}
                            <button
                              onClick={() => removeItem(it.id)}
                              className="hidden h-10 w-10 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive md:grid"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-surface/60 px-5 py-3 text-sm">
                    <Link to="/shop" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
                      <ChevronRight className="h-4 w-4 rotate-180" /> Continue Shopping
                    </Link>
                    <button
                      onClick={() => setItems([])}
                      className="text-xs font-semibold text-muted-foreground hover:text-destructive"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                {/* Promo code */}
                <div className="mt-4 rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-hero text-primary-foreground">
                      <Tag className="h-5 w-5" />
                    </span>
                    <div className="flex-1 min-w-[200px]">
                      <div className="text-sm font-bold text-foreground">Have a promo code?</div>
                      <div className="text-xs text-muted-foreground">Try CELLEXA10 or WELCOME5K at checkout.</div>
                    </div>
                    <div className="flex w-full items-center gap-2 sm:w-auto">
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter code"
                        className="h-11 flex-1 rounded-xl border border-border bg-surface px-4 text-sm font-semibold uppercase tracking-wider outline-none focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 sm:w-56"
                      />
                      {applied ? (
                        <Button variant="outline" onClick={clearCode}>Remove</Button>
                      ) : (
                        <Button onClick={applyCode}>Apply</Button>
                      )}
                    </div>
                  </div>
                  {codeMsg && (
                    <p className={`mt-2 text-xs font-medium ${codeMsg.tone === "ok" ? "text-success" : "text-destructive"}`}>
                      {codeMsg.text}
                    </p>
                  )}
                </div>

                {/* Trust strip */}
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-card p-3 text-sm md:grid-cols-4">
                  {[
                    { icon: Truck, label: "Islandwide", sub: "Delivery" },
                    { icon: ShieldCheck, label: "1-Year", sub: "Warranty" },
                    { icon: BadgeCheck, label: "100%", sub: "Genuine" },
                    { icon: RefreshCcw, label: "7-Day", sub: "Returns" },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2.5">
                      <t.icon className="h-5 w-5 shrink-0 text-primary" />
                      <div className="leading-tight">
                        <div className="text-xs font-bold text-foreground">{t.label}</div>
                        <div className="text-[11px] text-muted-foreground">{t.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
                    <div className="border-b border-border/60 bg-surface px-5 py-4">
                      <h2 className="font-display text-lg font-extrabold text-foreground">Order Summary</h2>
                      <p className="text-xs text-muted-foreground">{itemCount} {itemCount === 1 ? "item" : "items"} · LKR pricing incl. taxes</p>
                    </div>
                    <div className="space-y-3 p-5 text-sm">
                      <Row label="Subtotal" value={fmtLKR(subtotal)} />
                      {youSave > 0 && (
                        <Row label="Item discounts" value={`− ${fmtLKR(youSave)}`} valueClass="text-success" />
                      )}
                      {applied && (
                        <Row
                          label={
                            <span className="inline-flex items-center gap-1.5">
                              <Gift className="h-4 w-4 text-promo" />
                              Promo <span className="font-mono text-xs font-bold text-promo">{applied.code}</span>
                            </span>
                          }
                          value={`− ${fmtLKR(couponDiscount)}`}
                          valueClass="text-promo"
                        />
                      )}
                      <Row
                        label="Delivery"
                        value={delivery === 0 ? "FREE" : fmtLKR(delivery)}
                        valueClass={delivery === 0 ? "text-success font-bold" : undefined}
                      />
                      {subtotal > 0 && subtotal < 50000 && (
                        <p className="rounded-lg bg-accent/60 px-3 py-2 text-[11px] font-medium text-accent-foreground">
                          Add {fmtLKR(50000 - subtotal)} more for FREE islandwide delivery.
                        </p>
                      )}

                      <div className="my-2 border-t border-border/60" />

                      <div className="flex items-end justify-between">
                        <span className="text-sm font-bold text-foreground">Estimated Total</span>
                        <span className="font-display text-2xl font-extrabold text-foreground">
                          {fmtLKR(total)}
                        </span>
                      </div>

                      <div className="rounded-xl border border-dashed border-primary/30 bg-accent/40 px-3 py-2.5">
                        <p className="inline-flex items-center gap-2 text-xs font-medium text-foreground/80">
                          <CreditCard className="h-4 w-4 text-primary" />
                          or 12 × <span className="font-bold">{fmtLKR(installment)}</span> at 0% installments
                        </p>
                      </div>

                      <Button asChild size="lg" className="mt-2 w-full">
                        <Link to="/checkout">
                          Proceed to Checkout <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button asChild variant="outline" size="lg" className="w-full">
                        <Link to="/shop">Continue Shopping</Link>
                      </Button>

                      <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-muted-foreground">
                        <Lock className="h-3 w-3" /> Secure SSL checkout
                      </div>
                    </div>
                  </div>

                  {/* Payment methods */}
                  <div className="rounded-2xl border border-border/60 bg-card p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">We Accept</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["VISA", "Master", "AMEX", "FriMi", "HNB", "Sampath", "COD"].map((m) => (
                        <span
                          key={m}
                          className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] font-bold tracking-wide text-foreground/80"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Wallet className="h-3.5 w-3.5 text-primary" />
                      0% installments with HNB, Sampath, Commercial Bank, BOC & NDB
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </section>

        {/* Recommended */}
        {items.length > 0 && (
          <section className="container-page pb-12 md:pb-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold md:text-3xl">You May Also Like</h2>
                <p className="text-sm text-muted-foreground">Popular picks customers add to their order.</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/shop">View All <ChevronRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {recommended.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}

        {/* Accessories suggestions */}
        {items.length > 0 && (
          <section className="bg-gradient-brand-soft py-12 md:py-16">
            <div className="container-page">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold md:text-3xl">Frequently Bought Together</h2>
                  <p className="text-sm text-muted-foreground">Genuine accessories to complete your setup.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {accessories.map((a) => (
                  <ProductCard key={a.id} product={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

/* -------------------- Helpers -------------------- */
const Row = ({
  label,
  value,
  valueClass = "",
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  valueClass?: string;
}) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className={`font-semibold text-foreground ${valueClass}`}>{value}</span>
  </div>
);

const EmptyCart = () => (
  <div className="rounded-2xl border border-border/60 bg-card p-10 text-center md:p-16">
    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-hero text-primary-foreground">
      <Heart className="h-7 w-7" />
    </div>
    <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground">Your cart is empty</h2>
    <p className="mt-1 text-sm text-muted-foreground">
      Browse the latest smartphones, audio gear, and accessories to get started.
    </p>
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
      <Button asChild size="lg">
        <Link to="/shop">Start Shopping <ArrowRight className="h-4 w-4" /></Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <Link to="/category/smartphones">Browse Smartphones</Link>
      </Button>
    </div>
  </div>
);

export default CartPage;
