import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Check,
  Truck,
  Store,
  Zap,
  CreditCard,
  Wallet,
  Banknote,
  Landmark,
  Gift,
  Lock,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Pencil,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { fmtLKR, getProduct, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const lines = [
  { id: "iphone-17-pro-max", qty: 1 },
  { id: "airpods-pro-3", qty: 1 },
  { id: "apple-watch-series-11", qty: 2 },
];

const districts = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Galle", "Matara", "Jaffna", "Kurunegala", "Anuradhapura", "Batticaloa"];

const deliveryOptions = [
  { id: "standard", icon: Truck, title: "Standard delivery", eta: "1–3 working days", fee: 0, note: "Free over LKR 25,000" },
  { id: "express", icon: Zap, title: "Express delivery", eta: "Next working day", fee: 950, note: "Order before 2 PM" },
  { id: "pickup", icon: Store, title: "Collect in store", eta: "Ready in 2 hours", fee: 0, note: site.address.short },
] as const;

const paymentOptions = [
  { id: "card", icon: CreditCard, title: "Credit / debit card", note: "Visa, Mastercard, Amex" },
  { id: "installment", icon: Wallet, title: "0% installment plan", note: "3, 6, 12 or 24 months" },
  { id: "cod", icon: Banknote, title: "Cash on delivery", note: "Inspect before you pay" },
  { id: "bank", icon: Landmark, title: "Bank transfer", note: "Direct deposit to Nexzon account" },
] as const;

const slots = ["9 AM – 12 PM", "12 PM – 3 PM", "3 PM – 6 PM", "6 PM – 9 PM"];

type Delivery = (typeof deliveryOptions)[number]["id"];
type Payment = (typeof paymentOptions)[number]["id"];

const Step = ({ n, title, done, children }: { n: number; title: string; done?: boolean; children: React.ReactNode }) => (
  <section className="overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6">
    <h2 className="flex items-center gap-3 font-display text-lg font-bold">
      <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold",
        done ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground")}>
        {done ? <Check className="h-4 w-4" /> : n}
      </span>
      {title}
    </h2>
    <div className="mt-5">{children}</div>
  </section>
);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [payment, setPayment] = useState<Payment>("card");
  const [months, setMonths] = useState<3 | 6 | 12 | 24>(12);
  const [slot, setSlot] = useState(slots[1]);
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState("");
  const [terms, setTerms] = useState(true);
  const [placing, setPlacing] = useState(false);

  const items = useMemo(
    () => lines.map((l) => ({ qty: l.qty, p: getProduct(l.id) })).filter((x) => x.p) as { qty: number; p: CatalogItem }[],
    [],
  );

  const subtotal = items.reduce((s, { qty, p }) => s + p.price * qty, 0);
  const deliveryOpt = deliveryOptions.find((d) => d.id === delivery)!;
  const shipping = delivery === "standard" && subtotal >= 25000 ? 0 : deliveryOpt.fee;
  const total = subtotal + shipping;
  const perMonth = Math.round(total / months);

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    window.setTimeout(() => navigate("/order/success"), 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/cart" className="hover:text-primary">Cart</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Checkout</span>
          </nav>
        </div>

        <section className="container-page pt-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Checkout</h1>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-success" /> Secure encrypted checkout
            </p>
          </div>
        </section>

        <form onSubmit={placeOrder}>
          <section className="container-page py-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-8">
              <div className="min-w-0 space-y-5">
                {/* 1. Contact */}
                <Step n={1} title="Contact details">
                  <div className="grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-semibold">Full name</Label>
                      <Input id="name" required placeholder="Nuwan Jayasuriya" className="h-11 rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-semibold">Mobile number</Label>
                      <Input id="phone" type="tel" required placeholder="+94 7X XXX XXXX" className="h-11 rounded-xl" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="email" className="text-xs font-semibold">Email</Label>
                      <Input id="email" type="email" required placeholder="you@example.lk" className="h-11 rounded-xl" />
                      <p className="text-[11px] text-muted-foreground">Order updates and your invoice go here.</p>
                    </div>
                  </div>
                </Step>

                {/* 2. Delivery */}
                <Step n={2} title="Delivery">
                  <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-3">
                    {deliveryOptions.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDelivery(d.id)}
                        aria-pressed={delivery === d.id}
                        className={cn(
                          "rounded-xl border p-4 text-left transition-all",
                          delivery === d.id ? "border-primary bg-accent shadow-lift" : "border-border hover:border-primary/40",
                        )}
                      >
                        <d.icon className={cn("h-5 w-5", delivery === d.id ? "text-primary" : "text-muted-foreground")} />
                        <div className="mt-2 text-sm font-bold text-foreground">{d.title}</div>
                        <div className="text-xs text-muted-foreground">{d.eta}</div>
                        <div className="mt-1.5 text-xs font-semibold text-foreground">
                          {d.fee === 0 ? "Free" : fmtLKR(d.fee)}
                          <span className="ml-1 font-normal text-muted-foreground">· {d.note}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {delivery !== "pickup" ? (
                    <>
                      <div className="mt-5 grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label htmlFor="address" className="text-xs font-semibold">Street address</Label>
                          <Input id="address" required placeholder="No. 142, Galle Road" className="h-11 rounded-xl" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="city" className="text-xs font-semibold">City</Label>
                          <Input id="city" required placeholder="Colombo 03" className="h-11 rounded-xl" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="district" className="text-xs font-semibold">District</Label>
                          <select id="district" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary">
                            {districts.map((d) => <option key={d}>{d}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="text-xs font-semibold text-foreground">Preferred delivery window</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {slots.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSlot(s)}
                              aria-pressed={slot === s}
                              className={cn(
                                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                                slot === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40",
                              )}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mt-5 flex items-start gap-3 rounded-xl bg-surface p-4">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="text-sm">
                        <p className="font-semibold text-foreground">Nexzon Colombo</p>
                        <p className="text-muted-foreground">{site.address.full} · Open 9 AM – 9 PM daily</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 space-y-3 border-t border-border pt-5">
                    <div className="flex items-start gap-2.5">
                      <Checkbox id="gift" checked={isGift} onCheckedChange={(v) => setIsGift(Boolean(v))} className="mt-0.5" />
                      <Label htmlFor="gift" className="cursor-pointer text-sm font-medium">
                        <span className="inline-flex items-center gap-1.5"><Gift className="h-3.5 w-3.5 text-primary" /> This is a gift</span>
                        <span className="block text-xs font-normal text-muted-foreground">We'll leave the price off the invoice and include a note.</span>
                      </Label>
                    </div>
                    {isGift && (
                      <textarea
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        maxLength={200}
                        rows={3}
                        placeholder="Add a short message for the recipient…"
                        className="w-full rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary focus:bg-background"
                      />
                    )}
                  </div>
                </Step>

                {/* 3. Payment */}
                <Step n={3} title="Payment">
                  <div className="grid gap-3 [&>*]:min-w-0 sm:grid-cols-2">
                    {paymentOptions.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setPayment(o.id)}
                        aria-pressed={payment === o.id}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                          payment === o.id ? "border-primary bg-accent shadow-lift" : "border-border hover:border-primary/40",
                        )}
                      >
                        <o.icon className={cn("mt-0.5 h-5 w-5 shrink-0", payment === o.id ? "text-primary" : "text-muted-foreground")} />
                        <span>
                          <span className="block text-sm font-bold text-foreground">{o.title}</span>
                          <span className="block text-xs text-muted-foreground">{o.note}</span>
                        </span>
                      </button>
                    ))}
                  </div>

                  {payment === "card" && (
                    <div className="mt-5 grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
                      <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="card" className="text-xs font-semibold">Card number</Label>
                        <Input id="card" inputMode="numeric" placeholder="0000 0000 0000 0000" className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="exp" className="text-xs font-semibold">Expiry</Label>
                        <Input id="exp" placeholder="MM / YY" className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cvc" className="text-xs font-semibold">CVC</Label>
                        <Input id="cvc" inputMode="numeric" placeholder="123" className="h-11 rounded-xl" />
                      </div>
                    </div>
                  )}

                  {payment === "installment" && (
                    <div className="mt-5">
                      <p className="text-xs font-semibold text-foreground">Choose your plan</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {([3, 6, 12, 24] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMonths(m)}
                            aria-pressed={months === m}
                            className={cn(
                              "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
                              months === m ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40",
                            )}
                          >
                            {m} months
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 rounded-xl bg-accent p-3 text-sm font-semibold text-accent-foreground">
                        {fmtLKR(perMonth)} per month for {months} months · 0% interest
                      </p>
                    </div>
                  )}

                  {payment === "cod" && (
                    <p className="mt-5 rounded-xl bg-surface p-4 text-sm text-muted-foreground">
                      Pay the courier in cash when your order arrives. You may open and inspect the package before
                      paying. Available islandwide for orders up to LKR 200,000.
                    </p>
                  )}

                  {payment === "bank" && (
                    <div className="mt-5 rounded-xl bg-surface p-4 text-sm">
                      <p className="font-semibold text-foreground">Nexzon Electronics (Pvt) Ltd</p>
                      <p className="mt-1 text-muted-foreground">Commercial Bank · A/C 8001234567 · Colombo 03</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Email your deposit slip to {site.email} and we'll release the order the same day.
                      </p>
                    </div>
                  )}
                </Step>

                {/* 4. Review */}
                <Step n={4} title="Review & place order">
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between gap-4"><span className="text-muted-foreground">Delivery</span><span className="font-semibold text-foreground">{deliveryOpt.title} · {deliveryOpt.eta}</span></li>
                    {delivery !== "pickup" && (
                      <li className="flex justify-between gap-4"><span className="text-muted-foreground">Window</span><span className="font-semibold text-foreground">{slot}</span></li>
                    )}
                    <li className="flex justify-between gap-4"><span className="text-muted-foreground">Payment</span><span className="font-semibold text-foreground">{paymentOptions.find((o) => o.id === payment)!.title}</span></li>
                    {isGift && (
                      <li className="flex justify-between gap-4"><span className="text-muted-foreground">Gift</span><span className="font-semibold text-foreground">Yes, price hidden</span></li>
                    )}
                  </ul>

                  <div className="mt-5 flex items-start gap-2.5 border-t border-border pt-5">
                    <Checkbox id="terms" checked={terms} onCheckedChange={(v) => setTerms(Boolean(v))} className="mt-0.5" />
                    <Label htmlFor="terms" className="cursor-pointer text-xs font-medium leading-snug text-muted-foreground">
                      I agree to Nexzon's <Link to="/help" className="font-semibold text-primary hover:underline">Terms of Service</Link> and{" "}
                      <Link to="/returns-policy" className="font-semibold text-primary hover:underline">Returns Policy</Link>.
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="mt-5 w-full" disabled={!terms || placing}>
                    {placing ? "Placing your order…" : <>Place order · {fmtLKR(total)}</>}
                  </Button>
                </Step>
              </div>

              {/* Summary */}
              <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold">Your order</h2>
                    <Link to="/cart" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      <Pencil className="h-3 w-3" /> Edit
                    </Link>
                  </div>

                  <ul className="mt-4 space-y-3">
                    {items.map(({ qty, p }) => (
                      <li key={p.id} className="flex items-center gap-3">
                        <div className="isolate relative grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white">
                          <img src={p.image} alt="" className="h-12 w-auto object-contain mix-blend-multiply" />
                          <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
                            {qty}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-foreground">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{fmtLKR(p.price)} each</div>
                        </div>
                        <div className="text-sm font-bold text-foreground">{fmtLKR(p.price * qty)}</div>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm">
                    <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{fmtLKR(subtotal)}</dd></div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{deliveryOpt.title}</dt>
                      <dd className={cn("font-semibold", shipping === 0 && "text-success")}>{shipping === 0 ? "Free" : fmtLKR(shipping)}</dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="font-display text-2xl font-extrabold">{fmtLKR(total)}</span>
                  </div>
                  {payment === "installment" && (
                    <p className="mt-1 text-xs text-muted-foreground">{fmtLKR(perMonth)}/month × {months} at 0%</p>
                  )}

                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {[
                      { icon: ShieldCheck, t: "Genuine stock, warranty-backed" },
                      { icon: Lock, t: "Card details never stored on our servers" },
                    ].map((r) => (
                      <li key={r.t} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <r.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {r.t}
                      </li>
                    ))}
                  </ul>

                  <Link to="/help" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                    Need help with this order? <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
