import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronRight,
  Lock,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Wallet,
  CreditCard,
  Banknote,
  Building2,
  Tag,
  Gift,
  ArrowRight,
  RefreshCcw,
  MapPin,
  User,
  Phone,
  Mail,
  Pencil,
} from "lucide-react";

import PromoBar from "@/components/cellexa/PromoBar";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";

import phone1 from "@/assets/product-phone-1.jpg";
import earbuds from "@/assets/product-earbuds.jpg";
import productCase from "@/assets/product-case.jpg";

/* -------------------- Order data (mirrors cart) -------------------- */
type OrderItem = {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
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
    oldPrice: 519900,
    qty: 1,
    variant: "Titanium Black · 512GB · 12GB",
  },
  {
    id: "buds3-pro",
    name: "Samsung Galaxy Buds3 Pro",
    brand: "Samsung",
    image: earbuds,
    price: 64900,
    oldPrice: 74900,
    qty: 2,
    variant: "Silver",
  },
  {
    id: "case-s24",
    name: "S24 Ultra Silicone Case (S Pen Slot)",
    brand: "Samsung",
    image: productCase,
    price: 7500,
    oldPrice: 9500,
    qty: 1,
    variant: "Navy",
  },
];

const districts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle",
];

const provinces = [
  "Western", "Central", "Southern", "Northern", "Eastern",
  "North Western", "North Central", "Uva", "Sabaragamuwa",
];

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

/* Coupon registry */
const COUPONS: Record<string, { type: "pct" | "flat"; value: number; label: string }> = {
  CELLEXA10: { type: "pct", value: 10, label: "10% off entire order" },
  WELCOME5K: { type: "flat", value: 5000, label: "LKR 5,000 off" },
  GALAXY15: { type: "pct", value: 15, label: "15% off Galaxy items" },
};


/* -------------------- Stepper -------------------- */
const Stepper = () => {
  const steps = [
    { n: 1, label: "Cart", done: true, to: "/cart" as const },
    { n: 2, label: "Checkout", done: false, current: true },
    { n: 3, label: "Confirmation", done: false },
  ];
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-all ${
                s.done
                  ? "bg-success text-success-foreground"
                  : s.current
                  ? "bg-gradient-hero text-primary-foreground shadow-lift"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s.done ? <Check className="h-4 w-4" /> : s.n}
            </span>
            {s.to ? (
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
          {i < steps.length - 1 && (
            <span className="h-px w-6 bg-border sm:w-12" />
          )}
        </li>
      ))}
    </ol>
  );
};

/* -------------------- Field primitives -------------------- */
const Field = ({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground">
      {label} {required && <span className="text-promo">*</span>}
    </span>
    {children}
  </label>
);

const inputCls =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20";

/* -------------------- Page -------------------- */
const CheckoutPage = () => {
  const [delivery, setDelivery] = useState<"standard" | "express" | "pickup">("standard");
  const [payment, setPayment] = useState<"card" | "installment" | "cod" | "bank">("card");
  const [terms, setTerms] = useState(true);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [codeMsg, setCodeMsg] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [installmentMonths, setInstallmentMonths] = useState<3 | 6 | 12 | 24>(12);

  const subtotal = useMemo(
    () => orderItems.reduce((s, i) => s + i.price * i.qty, 0),
    []
  );
  const youSave = useMemo(
    () => orderItems.reduce((s, i) => s + Math.max(0, (i.oldPrice ?? i.price) - i.price) * i.qty, 0),
    []
  );

  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (delivery === "pickup") return 0;
    if (delivery === "express") return 1500;
    return subtotal > 50000 ? 0 : 850;
  }, [delivery, subtotal]);

  const couponDiscount = applied?.discount ?? 0;
  const codFee = payment === "cod" ? 250 : 0;
  const total = Math.max(0, subtotal - couponDiscount + deliveryFee + codFee);
  const monthly = Math.round(total / installmentMonths);
  const itemCount = orderItems.reduce((s, i) => s + i.qty, 0);

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
        {/* Stepper */}
        <section className="border-b border-border/60 bg-surface/60">
          <div className="container-page py-5">
            <Stepper />
          </div>
        </section>

        <section className="container-page py-8 md:py-10">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Form sections */}
            <div className="lg:col-span-8 space-y-5">
              {/* Contact */}
              <SectionCard
                step={1}
                title="Contact Information"
                subtitle="We'll send your receipt and delivery updates here."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full Name" required>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input className={`${inputCls} pl-10`} placeholder="Nimal Perera" />
                    </div>
                  </Field>
                  <Field label="Email" required>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input type="email" className={`${inputCls} pl-10`} placeholder="you@email.com" />
                    </div>
                  </Field>
                  <Field label="Phone" required className="md:col-span-2">
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input className={`${inputCls} pl-10`} placeholder="+94 77 123 4567" />
                    </div>
                  </Field>
                </div>
                <label className="mt-4 inline-flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                  Email me about new launches, deals, and exclusive offers.
                </label>
              </SectionCard>

              {/* Shipping */}
              <SectionCard
                step={2}
                title="Shipping Address"
                subtitle="Islandwide delivery available across all 25 districts."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Recipient Name" required>
                    <input className={inputCls} placeholder="Nimal Perera" />
                  </Field>
                  <Field label="Phone" required>
                    <input className={inputCls} placeholder="+94 77 123 4567" />
                  </Field>
                  <Field label="Street Address" required className="md:col-span-2">
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input className={`${inputCls} pl-10`} placeholder="No. 42, Galle Road" />
                    </div>
                  </Field>
                  <Field label="Apartment / Landmark (optional)" className="md:col-span-2">
                    <input className={inputCls} placeholder="Unit 5B, near Liberty Plaza" />
                  </Field>
                  <Field label="City" required>
                    <input className={inputCls} placeholder="Colombo 03" />
                  </Field>
                  <Field label="Postal Code">
                    <input className={inputCls} placeholder="00300" inputMode="numeric" />
                  </Field>
                  <Field label="District" required>
                    <select className={inputCls} defaultValue="Colombo">
                      {districts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Province" required>
                    <select className={inputCls} defaultValue="Western">
                      {provinces.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <label className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" className="h-4 w-4 rounded border-border accent-primary" />
                  Save this address for faster checkout next time.
                </label>
              </SectionCard>

              {/* Delivery */}
              <SectionCard
                step={3}
                title="Delivery Method"
                subtitle="Choose how fast you'd like to receive your order."
              >
                <div className="grid gap-3 md:grid-cols-3">
                  <DeliveryOption
                    selected={delivery === "standard"}
                    onSelect={() => setDelivery("standard")}
                    icon={Truck}
                    title="Standard Delivery"
                    eta="2–4 business days"
                    price={subtotal > 50000 ? "FREE" : fmtLKR(850)}
                    badge={subtotal > 50000 ? "Free over LKR 50k" : undefined}
                  />
                  <DeliveryOption
                    selected={delivery === "express"}
                    onSelect={() => setDelivery("express")}
                    icon={Truck}
                    title="Express Delivery"
                    eta="Next business day (Colombo)"
                    price={fmtLKR(1500)}
                    badge="Fastest"
                  />
                  <DeliveryOption
                    selected={delivery === "pickup"}
                    onSelect={() => setDelivery("pickup")}
                    icon={Building2}
                    title="Store Pickup"
                    eta="Ready in 2 hours"
                    price="FREE"
                    badge="Colombo 03"
                  />
                </div>
              </SectionCard>

              {/* Payment */}
              <SectionCard
                step={4}
                title="Payment Method"
                subtitle="All transactions are encrypted and processed securely."
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <PaymentOption
                    selected={payment === "card"}
                    onSelect={() => setPayment("card")}
                    icon={CreditCard}
                    title="Credit / Debit Card"
                    sub="Visa, Mastercard, Amex"
                    tags={["VISA", "Master", "AMEX", "FriMi"]}
                  />
                  <PaymentOption
                    selected={payment === "installment"}
                    onSelect={() => setPayment("installment")}
                    icon={Wallet}
                    title="0% Installments"
                    sub="HNB, Sampath, Commercial, BOC, NDB"
                    tags={["HNB", "Sampath", "Combank", "BOC", "NDB"]}
                    highlight="Most Popular"
                  />
                  <PaymentOption
                    selected={payment === "cod"}
                    onSelect={() => setPayment("cod")}
                    icon={Banknote}
                    title="Cash on Delivery"
                    sub="Pay when you receive your order"
                    tags={["Eligible items", "+ LKR 250 fee"]}
                  />
                  <PaymentOption
                    selected={payment === "bank"}
                    onSelect={() => setPayment("bank")}
                    icon={Building2}
                    title="Bank Transfer"
                    sub="Direct deposit to Cellexa account"
                    tags={["1–2 days verification"]}
                  />
                </div>

                {/* Card form */}
                {payment === "card" && (
                  <div className="mt-4 grid gap-4 rounded-xl bg-surface p-4 md:grid-cols-2">
                    <Field label="Card Number" required className="md:col-span-2">
                      <div className="relative">
                        <CreditCard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input className={`${inputCls} pl-10`} placeholder="1234 5678 9012 3456" inputMode="numeric" />
                      </div>
                    </Field>
                    <Field label="Cardholder Name" required>
                      <input className={inputCls} placeholder="As printed on card" />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Expiry" required>
                        <input className={inputCls} placeholder="MM / YY" inputMode="numeric" />
                      </Field>
                      <Field label="CVV" required>
                        <input className={inputCls} placeholder="•••" inputMode="numeric" />
                      </Field>
                    </div>
                  </div>
                )}

                {/* Installment plan */}
                {payment === "installment" && (
                  <div className="mt-4 rounded-xl bg-surface p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Choose plan
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[3, 6, 12, 24].map((m) => (
                        <button
                          key={m}
                          onClick={() => setInstallmentMonths(m as 3 | 6 | 12 | 24)}
                          className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                            installmentMonths === m
                              ? "border-primary bg-accent text-primary"
                              : "border-border bg-card text-foreground hover:border-primary/40"
                          }`}
                        >
                          {m} months · {fmtLKR(Math.round(total / m))} / mo
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      0% interest with eligible bank credit cards. Final approval by issuing bank.
                    </p>
                  </div>
                )}

                {payment === "cod" && (
                  <p className="mt-4 rounded-xl bg-accent/40 px-4 py-3 text-xs text-accent-foreground">
                    Pay in cash when your order arrives. Available islandwide on eligible items. A LKR 250 handling fee applies.
                  </p>
                )}

                {payment === "bank" && (
                  <p className="mt-4 rounded-xl bg-accent/40 px-4 py-3 text-xs text-accent-foreground">
                    You'll receive bank account details via email. Order ships once payment is verified (1–2 business days).
                  </p>
                )}
              </SectionCard>

              {/* Notes */}
              <SectionCard step={5} title="Order Notes (optional)" subtitle="Anything we should know about your delivery.">
                <textarea
                  rows={3}
                  className={`${inputCls} h-auto resize-none py-3`}
                  placeholder="Leave at reception, call before delivery, etc."
                />
              </SectionCard>
            </div>

            {/* Summary */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
                  <div className="flex items-center justify-between border-b border-border/60 bg-surface px-5 py-4">
                    <div>
                      <h2 className="font-display text-lg font-extrabold text-foreground">Your Order</h2>
                      <p className="text-xs text-muted-foreground">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
                    </div>
                    <Link to="/cart" className="text-xs font-semibold text-primary hover:underline">
                      Edit
                    </Link>
                  </div>

                  {/* Items */}
                  <ul className="max-h-[280px] divide-y divide-border/60 overflow-y-auto px-5">
                    {orderItems.map((it) => (
                      <li key={it.id} className="flex gap-3 py-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-gradient-brand-soft">
                          <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
                            {it.qty}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{it.brand}</p>
                          <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">{it.name}</p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">{it.variant}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-bold text-foreground">{fmtLKR(it.price * it.qty)}</span>
                          {it.oldPrice && (
                            <span className="text-[11px] text-muted-foreground line-through">
                              {fmtLKR(it.oldPrice * it.qty)}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Promo */}
                  <div className="border-t border-border/60 px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Tag className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Promo code"
                          className={`${inputCls} pl-10 uppercase tracking-wider`}
                        />
                      </div>
                      {applied ? (
                        <Button variant="outline" onClick={clearCode}>Remove</Button>
                      ) : (
                        <Button onClick={applyCode}>Apply</Button>
                      )}
                    </div>
                    {codeMsg && (
                      <p className={`mt-2 text-xs font-medium ${codeMsg.tone === "ok" ? "text-success" : "text-destructive"}`}>
                        {codeMsg.text}
                      </p>
                    )}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2.5 border-t border-border/60 px-5 py-4 text-sm">
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
                      label={delivery === "express" ? "Express Delivery" : delivery === "pickup" ? "Store Pickup" : "Delivery"}
                      value={deliveryFee === 0 ? "FREE" : fmtLKR(deliveryFee)}
                      valueClass={deliveryFee === 0 ? "text-success font-bold" : undefined}
                    />
                    {codFee > 0 && <Row label="COD Handling" value={fmtLKR(codFee)} />}

                    <div className="my-1 border-t border-border/60" />

                    <div className="flex items-end justify-between">
                      <span className="text-sm font-bold text-foreground">Total</span>
                      <span className="font-display text-2xl font-extrabold text-foreground">{fmtLKR(total)}</span>
                    </div>

                    {payment === "installment" && (
                      <div className="rounded-xl border border-dashed border-primary/30 bg-accent/40 px-3 py-2.5">
                        <p className="inline-flex items-center gap-2 text-xs font-medium text-foreground/80">
                          <CreditCard className="h-4 w-4 text-primary" />
                          {installmentMonths} × <span className="font-bold">{fmtLKR(monthly)}</span> at 0% interest
                        </p>
                      </div>
                    )}

                    <label className="flex items-start gap-2 pt-1 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
                      />
                      I agree to Cellexa's{" "}
                      <Link to="/" className="text-primary hover:underline">Terms</Link>{" "}
                      and{" "}
                      <Link to="/" className="text-primary hover:underline">Privacy Policy</Link>.
                    </label>

                    <Button asChild size="lg" disabled={!terms} className="mt-1 w-full">
                      <Link to="/order/success">
                        <Lock className="h-4 w-4" /> Place Order · {fmtLKR(total)}
                      </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="w-full">
                      <Link to="/cart">Back to Cart</Link>
                    </Button>
                  </div>
                </div>

                {/* Trust */}
                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-card p-3 text-sm">
                  {[
                    { icon: ShieldCheck, label: "1-Year", sub: "Warranty" },
                    { icon: BadgeCheck, label: "100%", sub: "Genuine" },
                    { icon: Truck, label: "Islandwide", sub: "Delivery" },
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

                <p className="text-center text-[11px] text-muted-foreground">
                  By placing your order you confirm the items and shipping details are correct.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Mobile sticky CTA */}
        <div className="sticky bottom-0 z-30 border-t border-border/70 bg-background/95 px-3 py-2 backdrop-blur lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="text-[11px] text-muted-foreground">Total</div>
              <div className="font-display text-lg font-extrabold leading-none text-foreground">{fmtLKR(total)}</div>
            </div>
            <Button asChild size="lg" className="h-12 flex-[2]">
              <Link to="/order/success">
                <Lock className="h-4 w-4" /> Place Order
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* -------------------- Sub-components -------------------- */
const SectionCard = ({
  step,
  title,
  subtitle,
  children,
}: {
  step: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
    <div className="flex items-start gap-3 border-b border-border/60 bg-surface px-5 py-4">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-hero text-sm font-bold text-primary-foreground">
        {step}
      </span>
      <div>
        <h2 className="font-display text-lg font-extrabold leading-tight text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
    <div className="p-5">{children}</div>
  </section>
);

const DeliveryOption = ({
  selected,
  onSelect,
  icon: Icon,
  title,
  eta,
  price,
  badge,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  eta: string;
  price: string;
  badge?: string;
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={`relative flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition-all ${
      selected
        ? "border-primary bg-accent/40 shadow-lift"
        : "border-border bg-card hover:border-primary/40"
    }`}
  >
    {badge && (
      <span className="absolute right-3 top-3 rounded-full bg-promo px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-promo-foreground">
        {badge}
      </span>
    )}
    <span
      className={`grid h-9 w-9 place-items-center rounded-xl ${
        selected ? "bg-gradient-hero text-primary-foreground" : "bg-secondary text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
    </span>
    <div className="text-sm font-bold text-foreground">{title}</div>
    <div className="text-xs text-muted-foreground">{eta}</div>
    <div className="mt-1 text-sm font-extrabold text-primary">{price}</div>
    <span
      className={`absolute bottom-3 right-3 grid h-5 w-5 place-items-center rounded-full border-2 transition-all ${
        selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
      }`}
    >
      {selected && <Check className="h-3 w-3" />}
    </span>
  </button>
);

const PaymentOption = ({
  selected,
  onSelect,
  icon: Icon,
  title,
  sub,
  tags,
  highlight,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
  tags?: string[];
  highlight?: string;
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={`relative flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
      selected
        ? "border-primary bg-accent/40 shadow-lift"
        : "border-border bg-card hover:border-primary/40"
    }`}
  >
    {highlight && (
      <span className="absolute -top-2 right-3 rounded-full bg-gradient-hero px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
        {highlight}
      </span>
    )}
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
        selected ? "bg-gradient-hero text-primary-foreground" : "bg-secondary text-foreground"
      }`}
    >
      <Icon className="h-5 w-5" />
    </span>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-foreground">{title}</span>
        <span
          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-all ${
            selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
          }`}
        >
          {selected && <Check className="h-3 w-3" />}
        </span>
      </div>
      <div className="text-xs text-muted-foreground">{sub}</div>
      {tags && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  </button>
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

export default CheckoutPage;
