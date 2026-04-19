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

      <main className="container-page py-10 md:py-14">
        <div className="mx-auto max-w-2xl">
          {/* Success header */}
          <div className="text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="h-8 w-8" strokeWidth={2.5} />
            </div>
            <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground md:text-3xl">
              Order placed successfully
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for your purchase. A confirmation has been sent to your email.
            </p>
          </div>

          {/* Order meta */}
          <div className="mt-8 rounded-xl border border-border bg-card p-5">
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <div>
                <div className="text-xs text-muted-foreground">Order number</div>
                <div className="mt-0.5 font-semibold text-foreground">{orderNumber}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Order date</div>
                <div className="mt-0.5 font-semibold text-foreground">{orderDate}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Estimated delivery</div>
                <div className="mt-0.5 font-semibold text-foreground">{eta}</div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-3">
              <h2 className="text-sm font-bold text-foreground">Order items ({itemCount})</h2>
            </div>
            <ul className="divide-y divide-border">
              {orderItems.map((it) => (
                <li key={it.id} className="flex gap-3 p-4">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-surface">
                    <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{it.name}</div>
                    <div className="text-xs text-muted-foreground">{it.variant}</div>
                    <div className="text-xs text-muted-foreground">Qty: {it.qty}</div>
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {fmtLKR(it.price * it.qty)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary + Address */}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold text-foreground">Shipping address</h2>
              <div className="mt-3 space-y-0.5 text-sm">
                <div className="font-semibold text-foreground">Nimal Perera</div>
                <div className="text-muted-foreground">No. 42, Galle Road</div>
                <div className="text-muted-foreground">Colombo 03, 00300</div>
                <div className="text-muted-foreground">+94 77 123 4567</div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold text-foreground">Payment summary</h2>
              <div className="mt-3 space-y-2 text-sm">
                <Row label="Subtotal" value={fmtLKR(subtotal)} />
                <Row label="Discount" value={`− ${fmtLKR(discount)}`} valueClass="text-promo" />
                <Row
                  label="Delivery"
                  value={deliveryFee === 0 ? "FREE" : fmtLKR(deliveryFee)}
                  valueClass={deliveryFee === 0 ? "text-success font-bold" : undefined}
                />
                <div className="my-1 border-t border-border" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Total paid</span>
                  <span className="font-display text-lg font-extrabold text-foreground">{fmtLKR(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link to="/orders">View my orders</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/shop">Continue shopping <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
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
