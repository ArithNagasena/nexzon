import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  BadgeCheck,
  RefreshCcw,
  Headphones,
  Download,
  ArrowRight,
  Lock,
  Sparkles,
  User,
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

/* -------------------- Order data (mock) -------------------- */
type OrderItem = {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  qty: number;
  variant: string;
};

const orderItems: OrderItem[] = [
  {
    id: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 5G",
    brand: "Samsung",
    image: phone1,
    price: 449900,
    qty: 1,
    variant: "Titanium Black · 512GB · 12GB",
  },
  {
    id: "buds3-pro",
    name: "Samsung Galaxy Buds3 Pro",
    brand: "Samsung",
    image: earbuds,
    price: 64900,
    qty: 2,
    variant: "Silver",
  },
  {
    id: "case-s24",
    name: "S24 Ultra Silicone Case (S Pen Slot)",
    brand: "Samsung",
    image: productCase,
    price: 7500,
    qty: 1,
    variant: "Navy",
  },
];

const recommended: Product[] = [
  { id: "p2", name: "Samsung Galaxy S24+ 5G 256GB", brand: "Samsung", price: 329900, oldPrice: 369900, rating: 4.7, reviews: 612, image: phone2, badge: { label: "Hot Deal", tone: "promo" } },
  { id: "p3", name: "Samsung Galaxy Z Fold5 5G 512GB", brand: "Samsung", price: 559900, rating: 4.6, reviews: 234, image: phone3, badge: { label: "Foldable", tone: "primary" } },
  { id: "p4", name: "Samsung Galaxy Tab S9 Ultra Wi-Fi", brand: "Samsung", price: 389900, oldPrice: 429900, rating: 4.7, reviews: 188, image: tablet, badge: { label: "New", tone: "success" } },
  { id: "p5", name: "Samsung Galaxy Watch6 Classic 47mm", brand: "Samsung", price: 119900, rating: 4.5, reviews: 302, image: watch },
  { id: "p6", name: "Sony WH-1000XM5 Wireless ANC", brand: "Sony", price: 119900, oldPrice: 134900, rating: 4.8, reviews: 540, image: headphones, badge: { label: "Editor's Pick", tone: "primary" } },
];

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });


/* -------------------- Stepper -------------------- */
const Stepper = () => {
  const steps = [
    { n: 1, label: "Cart", done: true, to: "/cart" as const },
    { n: 2, label: "Checkout", done: true, to: "/checkout" as const },
    { n: 3, label: "Confirmation", done: true, current: true },
  ];
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-all ${
                s.current
                  ? "bg-gradient-hero text-primary-foreground shadow-lift"
                  : s.done
                  ? "bg-success text-success-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s.done && !s.current ? <Check className="h-4 w-4" /> : s.current ? <Check className="h-4 w-4" /> : s.n}
            </span>
            {s.to && !s.current ? (
              <Link to={s.to} className="text-sm font-semibold text-foreground hover:text-primary">
                {s.label}
              </Link>
            ) : (
              <span
                className={`text-sm font-semibold ${
                  s.current ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            )}
          </div>
          {i < steps.length - 1 && <span className="h-px w-6 bg-border sm:w-12" />}
        </li>
      ))}
    </ol>
  );
};

/* -------------------- Page -------------------- */
const OrderSuccessPage = () => {
  const subtotal = useMemo(() => orderItems.reduce((s, i) => s + i.price * i.qty, 0), []);
  const discount = 5000;
  const deliveryFee = 0;
  const total = subtotal - discount + deliveryFee;
  const itemCount = orderItems.reduce((s, i) => s + i.qty, 0);

  // Stable mock order metadata
  const orderNumber = "CLX-2026-04812";
  const orderDate = new Date().toLocaleDateString("en-LK", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const eta = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-LK", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <PromoBar />
      <Header />

      <main>
        {/* Hero success */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-brand-soft" />
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary-glow/20 blur-3xl" />

          <div className="container-page relative py-12 md:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-success text-success-foreground shadow-glow animate-float">
                <CheckCircle2 className="h-10 w-10" strokeWidth={2.5} />
              </div>
              <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-success">
                <Sparkles className="h-3.5 w-3.5" /> Payment Successful
              </p>
              <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
                Thank you, your order is confirmed!
              </h1>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                We're getting your order ready. You'll receive an email and SMS update once it's on its way.
              </p>

              <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3">
                <div className="rounded-2xl border border-border/60 bg-background px-5 py-3 text-left shadow-soft">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Order Number</div>
                  <div className="font-display text-lg font-extrabold text-primary">{orderNumber}</div>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background px-5 py-3 text-left shadow-soft">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Estimated Delivery</div>
                  <div className="font-display text-lg font-extrabold text-foreground">{eta}</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-primary" /> Receipt sent to nimal@email.com
                </span>
                <span className="hidden h-3 w-px bg-border sm:inline-block" />
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-primary" /> SMS sent to +94 77 ••• 4567
                </span>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                <Button asChild size="lg">
                  <Link to="/shop">
                    <Truck className="h-4 w-4" /> Track Order
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/shop">
                    Continue Shopping <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Order details */}
        <section className="container-page py-10 md:py-14">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Items + delivery */}
            <div className="lg:col-span-8 space-y-5">
              {/* Items */}
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
                <div className="flex items-center justify-between border-b border-border/60 bg-surface px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero text-primary-foreground">
                      <Package className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="font-display text-lg font-extrabold text-foreground">Items in this Order</h2>
                      <p className="text-xs text-muted-foreground">{itemCount} {itemCount === 1 ? "item" : "items"} · all genuine with warranty</p>
                    </div>
                  </div>
                  <span className="hidden rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-bold text-success md:inline-flex">
                    Processing
                  </span>
                </div>

                <ul className="divide-y divide-border/60">
                  {orderItems.map((it) => (
                    <li key={it.id} className="flex gap-4 p-5">
                      <Link
                        to={`/product/${it.id}`}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-gradient-brand-soft sm:h-24 sm:w-24"
                      >
                        <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                        <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-foreground px-1 text-[11px] font-bold text-background">
                          {it.qty}
                        </span>
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link to={`/brand/${it.brand.toLowerCase()}`} className="text-[11px] font-bold uppercase tracking-wider text-primary hover:underline">
                          {it.brand}
                        </Link>
                        <Link to={`/product/${it.id}`} className="mt-0.5 block text-sm font-bold leading-snug text-foreground hover:text-primary sm:text-base">
                          {it.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">{it.variant}</p>
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-success">
                          <ShieldCheck className="h-3 w-3" /> 1-Year Warranty Included
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-base font-extrabold text-foreground">{fmtLKR(it.price * it.qty)}</div>
                        <div className="text-[11px] text-muted-foreground">{fmtLKR(it.price)} × {it.qty}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery + Address grid */}
              <div className="grid gap-5 md:grid-cols-2">
                <DetailCard
                  icon={Truck}
                  title="Delivery Timeline"
                  badge="Standard · Free"
                >
                  <ol className="mt-3 space-y-3">
                    {[
                      { label: "Order Confirmed", time: "Just now", done: true, current: true },
                      { label: "Packed & Ready", time: "Within 24 hours", done: false },
                      { label: "Out for Delivery", time: "1–2 business days", done: false },
                      { label: "Delivered", time: eta, done: false },
                    ].map((s, i, arr) => (
                      <li key={s.label} className="relative flex gap-3 pl-1">
                        <div className="flex flex-col items-center">
                          <span
                            className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold ${
                              s.current
                                ? "bg-gradient-hero text-primary-foreground shadow-lift"
                                : s.done
                                ? "bg-success text-success-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {s.done || s.current ? <Check className="h-3 w-3" /> : i + 1}
                          </span>
                          {i < arr.length - 1 && <span className="mt-1 h-7 w-px bg-border" />}
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${s.current ? "text-primary" : "text-foreground"}`}>{s.label}</div>
                          <div className="text-xs text-muted-foreground">{s.time}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <Button asChild size="sm" className="mt-4 w-full">
                    <Link to="/shop">Track Order <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </DetailCard>

                <DetailCard icon={MapPin} title="Shipping Address" badge="Western Province">
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="font-bold text-foreground">Nimal Perera</div>
                    <div className="text-muted-foreground">No. 42, Galle Road</div>
                    <div className="text-muted-foreground">Unit 5B, near Liberty Plaza</div>
                    <div className="text-muted-foreground">Colombo 03, 00300</div>
                    <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                      <Phone className="h-3.5 w-3.5 text-primary" /> +94 77 123 4567
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl bg-surface px-3 py-2.5 text-xs text-muted-foreground">
                    Our courier will call you 30 minutes before delivery. Please keep your phone reachable.
                  </div>
                </DetailCard>

                <DetailCard icon={CreditCard} title="Payment" badge="Paid">
                  <div className="mt-3 space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Method</span>
                      <span className="font-semibold text-foreground">Credit Card · •••• 4242</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="inline-flex items-center gap-1 font-bold text-success">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Paid in full
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transaction ID</span>
                      <span className="font-mono text-[11px] font-semibold text-foreground">TXN-9F4A2B</span>
                    </div>
                  </div>
                </DetailCard>

                <DetailCard icon={Calendar} title="Order Reference" badge={orderNumber}>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Date</span>
                      <span className="font-semibold text-foreground">{orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items</span>
                      <span className="font-semibold text-foreground">{itemCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-semibold text-foreground">Standard (Free)</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <Download className="h-4 w-4" /> Download Invoice
                  </Button>
                </DetailCard>
              </div>

              {/* Next actions */}
              <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
                <h3 className="font-display text-lg font-extrabold text-foreground">What's next?</h3>
                <p className="text-xs text-muted-foreground">Useful links to manage your order and continue shopping.</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  <ActionTile icon={Truck} label="Track Order" to="/shop" />
                  <ActionTile icon={User} label="My Account" to="/shop" />
                  <ActionTile icon={Headphones} label="Contact Support" to="/shop" />
                  <ActionTile icon={ArrowRight} label="Keep Shopping" to="/shop" highlight />
                </div>
              </div>
            </div>

            {/* Summary */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
                  <div className="border-b border-border/60 bg-surface px-5 py-4">
                    <h2 className="font-display text-lg font-extrabold text-foreground">Order Summary</h2>
                    <p className="text-xs text-muted-foreground">Final totals incl. taxes</p>
                  </div>
                  <div className="space-y-2.5 p-5 text-sm">
                    <Row label="Subtotal" value={fmtLKR(subtotal)} />
                    <Row
                      label={
                        <span className="inline-flex items-center gap-1.5">Promo <span className="font-mono text-xs font-bold text-promo">CELLEXA10</span></span>
                      }
                      value={`− ${fmtLKR(discount)}`}
                      valueClass="text-promo"
                    />
                    <Row
                      label="Delivery"
                      value={deliveryFee === 0 ? "FREE" : fmtLKR(deliveryFee)}
                      valueClass={deliveryFee === 0 ? "text-success font-bold" : undefined}
                    />
                    <div className="my-1 border-t border-border/60" />
                    <div className="flex items-end justify-between">
                      <span className="text-sm font-bold text-foreground">Paid</span>
                      <span className="font-display text-2xl font-extrabold text-foreground">{fmtLKR(total)}</span>
                    </div>
                    <p className="inline-flex items-center gap-1.5 pt-2 text-[11px] text-muted-foreground">
                      <Lock className="h-3 w-3" /> Secured by 256-bit SSL encryption
                    </p>
                  </div>
                </div>

                {/* Trust strip */}
                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-card p-3 text-sm">
                  {[
                    { icon: BadgeCheck, label: "100%", sub: "Genuine" },
                    { icon: ShieldCheck, label: "1-Year", sub: "Warranty" },
                    { icon: RefreshCcw, label: "7-Day", sub: "Returns" },
                    { icon: Headphones, label: "7-Day", sub: "Support" },
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

                {/* Help card */}
                <div className="rounded-2xl border border-border/60 bg-gradient-brand-soft p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-background/80 text-primary">
                      <Headphones className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-bold text-foreground">Need help?</div>
                      <div className="text-xs text-muted-foreground">Our team is here 7 days a week.</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <a href="tel:+94112000000" className="flex items-center gap-2 font-semibold text-foreground hover:text-primary">
                      <Phone className="h-4 w-4 text-primary" /> +94 11 200 0000
                    </a>
                    <a href="mailto:hello@cellexa.lk" className="flex items-center gap-2 font-semibold text-foreground hover:text-primary">
                      <Mail className="h-4 w-4 text-primary" /> hello@cellexa.lk
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

/* -------------------- Helpers -------------------- */
const DetailCard = ({
  icon: Icon,
  title,
  badge,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="font-display text-base font-extrabold text-foreground">{title}</h3>
      </div>
      {badge && (
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground/70">
          {badge}
        </span>
      )}
    </div>
    {children}
  </div>
);

const ActionTile = ({
  icon: Icon,
  label,
  to,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
  highlight?: boolean;
}) => (
  <Link
    to={to}
    className={`group flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
      highlight
        ? "border-primary bg-gradient-hero text-primary-foreground hover:opacity-95"
        : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-accent"
    }`}
  >
    <span className="inline-flex items-center gap-2">
      <Icon className="h-4 w-4" /> {label}
    </span>
    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
  </Link>
);

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

export default OrderSuccessPage;
