import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  MapPin,
  CreditCard,
  Mail,
  Copy,
  ArrowRight,
  Headphones,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import ProductCard from "@/components/NexZon/ProductCard";
import { Button } from "@/components/ui/button";
import { allProducts, fmtLKR, getProduct, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/utils";

/* Mirrors the checkout basket so the confirmation matches what was charged. */
const lines = [
  { id: "iphone-17-pro-max", qty: 1 },
  { id: "airpods-pro-3", qty: 1 },
  { id: "apple-watch-series-11", qty: 2 },
];

const ORDER_NO = "NX-260815-4821";

const stages = [
  { icon: CheckCircle2, title: "Order confirmed", desc: "We've received your order", done: true },
  { icon: Package, title: "Packed", desc: "Checked and sealed in Colombo", done: false },
  { icon: Truck, title: "Out for delivery", desc: "Handed to our courier", done: false },
  { icon: Home, title: "Delivered", desc: "Signed for at your door", done: false },
];

const addWorkingDays = (from: Date, days: number) => {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) added++; // Sundays are not delivery days
  }
  return d;
};

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

const OrderSuccess = () => {
  useEffect(() => {
    document.title = `Order ${ORDER_NO} confirmed — Nexzon`;
  }, []);

  const items = useMemo(
    () => lines.map((l) => ({ qty: l.qty, p: getProduct(l.id) })).filter((x) => x.p) as { qty: number; p: CatalogItem }[],
    [],
  );

  const subtotal = items.reduce((s, { qty, p }) => s + p.price * qty, 0);
  const shipping = subtotal >= 25000 ? 0 : 600;
  const total = subtotal + shipping;

  const window = useMemo(() => {
    const now = new Date();
    return { from: addWorkingDays(now, 1), to: addWorkingDays(now, 3) };
  }, []);

  const suggestions = useMemo(
    () => allProducts.filter((p) => !lines.some((l) => l.id === p.id)).slice(0, 4),
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Confirmation hero */}
        <section className="container-page pt-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Payment received
                </span>
                <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                  Thank you — your order is confirmed.
                </h1>
                <p className="mt-3 max-w-lg text-sm text-white/85 sm:text-base">
                  We've emailed your invoice and tracking link. Our team packs and dispatches from Colombo,
                  and you'll get an SMS the moment it leaves the warehouse.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur lg:w-64">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Order number</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-display text-xl font-extrabold tabular-nums">{ORDER_NO}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(ORDER_NO)}
                    aria-label="Copy order number"
                    className="grid h-7 w-7 place-items-center rounded-lg bg-white/15 transition-colors hover:bg-white/25"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-4 flex items-start gap-2 border-t border-white/15 pt-4 text-xs text-white/80">
                  <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Arriving <strong className="text-white">{fmtDate(window.from)}</strong> –{" "}
                    <strong className="text-white">{fmtDate(window.to)}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tracking timeline */}
        <section className="container-page pt-10">
          <h2 className="font-display text-xl font-bold">Where your order is</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <li
                key={s.title}
                className={cn(
                  "relative rounded-2xl border p-5",
                  s.done ? "border-success/30 bg-success/5" : "border-border bg-card",
                )}
              >
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-xl",
                    s.done ? "bg-success text-success-foreground" : "bg-secondary text-muted-foreground",
                  )}
                >
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display text-sm font-bold text-foreground">{s.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                {s.done && (
                  <span className="mt-2 inline-block text-[11px] font-bold uppercase tracking-wider text-success">
                    Done
                  </span>
                )}
                {i === 0 && (
                  <span className="absolute right-4 top-5 text-[11px] text-muted-foreground">Just now</span>
                )}
              </li>
            ))}
          </ol>

          <Button asChild className="mt-5">
            <Link to="/track-order">Track this order <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </section>

        {/* Order detail */}
        <section className="container-page pt-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
            <div className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold">What you ordered</h2>
              <ul className="mt-4 divide-y divide-border">
                {items.map(({ qty, p }) => (
                  <li key={p.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <Link to={`/product/${p.id}`} className="isolate relative grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-white">
                      <img src={p.image} alt={p.name} className="h-16 w-auto object-contain mix-blend-multiply" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
                        {qty}
                      </span>
                    </Link>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{p.brand}</span>
                      <Link to={`/product/${p.id}`} className="block font-display text-sm font-bold leading-tight text-foreground hover:text-primary">
                        {p.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">{p.warranty}</p>
                    </div>
                    <div className="shrink-0 text-right text-sm font-bold text-foreground">
                      {fmtLKR(p.price * qty)}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> Delivering to
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    Arith Nagasena<br />
                    No. 142, Galle Road<br />
                    Colombo 03, Colombo District<br />
                    +94 71 234 5678
                  </p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <CreditCard className="h-3.5 w-3.5 text-primary" /> Paid with
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    Visa ending 4242<br />
                    <span className="text-muted-foreground">Charged {fmtLKR(total)} on {fmtDate(new Date())}</span>
                  </p>
                </div>
              </div>
            </div>

            <aside className="min-w-0">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h2 className="font-display text-lg font-bold">Payment summary</h2>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{fmtLKR(subtotal)}</dd></div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Delivery</dt>
                    <dd className={cn("font-semibold", shipping === 0 && "text-success")}>{shipping === 0 ? "Free" : fmtLKR(shipping)}</dd>
                  </div>
                </dl>
                <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                  <span className="text-sm font-semibold">Total paid</span>
                  <span className="font-display text-2xl font-extrabold">{fmtLKR(total)}</span>
                </div>

                <div className="mt-5 grid gap-2">
                  <Button asChild variant="outline"><Link to="/account/orders">View my orders</Link></Button>
                  <Button asChild variant="ghost" size="sm"><Link to="/category/smartphones">Continue shopping</Link></Button>
                </div>

                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {[
                    { icon: Mail, t: "Invoice sent to arith@example.lk" },
                    { icon: ShieldCheck, t: "Warranty registered automatically" },
                    { icon: Headphones, t: "Support 9 AM – 9 PM, seven days" },
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

        {/* Suggestions */}
        <section className="container-page py-14">
          <h2 className="font-display text-xl font-bold">Complete your setup</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add these to your order within 2 hours and we'll ship everything together.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {suggestions.map((s) => (
              <ProductCard key={s.id} product={s} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
