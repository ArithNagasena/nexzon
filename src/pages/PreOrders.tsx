import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarClock,
  ShieldCheck,
  Truck,
  Undo2,
  Gift,
  ChevronRight,
  Sparkles,
  Info,
  ArrowRight,
  Check,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import iphone18 from "@/assets/iphone-17-pro-max.png";
import watchS12 from "@/assets/apple-watch-s11.png";
import airpodsPro4 from "@/assets/airpods-pro-3.png";
import pixel11 from "@/assets/google-pixel-10.png";
import oneplus15 from "@/assets/oneplus-13r.png";
import tabS12 from "@/assets/preorder-tablet.png";
import galaxyRing2 from "@/assets/preorder-ring.png";
import galaxyS27 from "@/assets/galaxy-s26-ultra.png";

type Status = "open" | "limited" | "coming";

type Launch = {
  id: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  deposit: number;
  releaseISO: string;
  status: Status;
  specs: string[];
  bundle?: string;
};

/* Upcoming launches. Product imagery is the previous generation used as a
   stand-in — unreleased hardware has no official photography yet, which is
   why every card is marked as a render. */
const launches: Launch[] = [
  {
    id: "iphone-18-pro-max",
    brand: "Apple",
    name: "iPhone 18 Pro Max 256GB",
    image: iphone18,
    price: 469900,
    deposit: 25000,
    releaseISO: "2026-09-18",
    status: "open",
    specs: ["6.9\" ProMotion", "A20 Pro chip", "48MP triple camera", "Titanium frame"],
    bundle: "Launch bundle: MagSafe charger + 12 months screen protection, free.",
  },
  {
    id: "apple-watch-series-12",
    brand: "Apple",
    name: "Apple Watch Series 12 — 46mm",
    image: watchS12,
    price: 215000,
    deposit: 10000,
    releaseISO: "2026-09-25",
    status: "limited",
    specs: ["Always-on display", "Blood-oxygen sensing", "5-day battery"],
  },
  {
    id: "airpods-pro-4",
    brand: "Apple",
    name: "AirPods Pro 4",
    image: airpodsPro4,
    price: 94900,
    deposit: 7500,
    releaseISO: "2026-09-25",
    status: "open",
    specs: ["Adaptive ANC", "USB-C case", "Up to 8h playback"],
  },
  {
    id: "pixel-11-pro",
    brand: "Google",
    name: "Google Pixel 11 Pro 256GB",
    image: pixel11,
    price: 379900,
    deposit: 15000,
    releaseISO: "2026-10-16",
    status: "open",
    specs: ["Tensor G6", "50MP + 5x telephoto", "7 years of updates"],
  },
  {
    id: "oneplus-15",
    brand: "OnePlus",
    name: "OnePlus 15 512GB",
    image: oneplus15,
    price: 289900,
    deposit: 12000,
    releaseISO: "2026-11-06",
    status: "open",
    specs: ["6,000mAh battery", "100W SuperVOOC", "16GB RAM"],
  },
  {
    id: "galaxy-tab-s12-ultra",
    brand: "Samsung",
    name: "Galaxy Tab S12 Ultra (14.6\")",
    image: tabS12,
    price: 329900,
    deposit: 15000,
    releaseISO: "2026-11-20",
    status: "coming",
    specs: ["14.6\" AMOLED 120Hz", "S Pen included", "11,200mAh"],
  },
  {
    id: "galaxy-ring-2",
    brand: "Samsung",
    name: "Galaxy Ring 2",
    image: galaxyRing2,
    price: 118000,
    deposit: 8000,
    releaseISO: "2026-12-04",
    status: "coming",
    specs: ["7-day battery", "Sleep & recovery tracking", "Titanium finish"],
  },
  {
    id: "galaxy-s27-ultra",
    brand: "Samsung",
    name: "Galaxy S27 Ultra 512GB",
    image: galaxyS27,
    price: 549900,
    deposit: 25000,
    releaseISO: "2027-02-12",
    status: "coming",
    specs: ["200MP main camera", "Snapdragon 8 Elite Gen 5", "S Pen built in"],
  },
];

const STATUS: Record<Status, { label: string; cls: string; dot: string }> = {
  open: { label: "Pre-order open", cls: "border-success/25 bg-success/10 text-success", dot: "bg-success" },
  limited: { label: "Limited allocation", cls: "border-promo/25 bg-promo/10 text-promo", dot: "bg-promo" },
  coming: { label: "Register interest", cls: "border-border bg-secondary text-muted-foreground", dot: "bg-muted-foreground" },
};

const steps = [
  { n: 1, title: "Reserve", desc: "Pay a small refundable deposit to hold your unit and colour." },
  { n: 2, title: "We confirm", desc: "You get an email the moment your allocation is secured with the distributor." },
  { n: 3, title: "Pay the balance", desc: "Only when stock lands in Colombo — never before." },
  { n: 4, title: "Launch-day delivery", desc: "Dispatched islandwide on release day, ahead of general sale." },
];

const perks = [
  { icon: ShieldCheck, title: "Price protection", desc: "If the launch price drops, you pay the lower one." },
  { icon: Truck, title: "Day-one delivery", desc: "Reserved units ship before general stock." },
  { icon: Undo2, title: "Free cancellation", desc: "Full deposit refund any time before dispatch." },
  { icon: Gift, title: "Launch bundles", desc: "Accessories and care plans included on selected models." },
];

const faqs = [
  { q: "When is my card charged?", a: "Only the deposit is taken today. The balance is collected when the device reaches our Colombo warehouse, so you are never paying in full for stock that has not arrived." },
  { q: "Can I cancel a pre-order?", a: "Yes — cancel from your account any time before dispatch and the deposit is refunded in full to your original payment method within 3–5 working days." },
  { q: "What if the release date moves?", a: "Manufacturers occasionally shift launch dates. We email you as soon as we know, and you can keep the reservation or cancel for a full refund." },
  { q: "Is the pre-order price guaranteed?", a: "The price you see is the expected launch price. If the official Sri Lankan price comes in lower, we charge the lower amount. If it comes in higher, your quoted price is honoured." },
  { q: "Do pre-orders include local warranty?", a: "Yes. Every pre-order is official regional stock with the full manufacturer warranty serviced in Sri Lanka, plus optional Nexzon Care." },
];

const fmtLKR = (n: number) => "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const monthKey = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { month: "long", year: "numeric" });

/** Live countdown to a launch date. */
const useCountdown = (iso: string) => {
  const target = useMemo(() => new Date(iso + "T00:00:00").getTime(), [iso]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const left = Math.max(0, target - now);
  return {
    days: Math.floor(left / 86_400_000),
    hours: Math.floor((left % 86_400_000) / 3_600_000),
    minutes: Math.floor((left % 3_600_000) / 60_000),
    seconds: Math.floor((left % 60_000) / 1000),
  };
};

const CountdownBoxes = ({ iso, tone = "dark" }: { iso: string; tone?: "dark" | "light" }) => {
  const t = useCountdown(iso);
  const items = [
    [t.days, "Days"],
    [t.hours, "Hrs"],
    [t.minutes, "Min"],
    [t.seconds, "Sec"],
  ] as const;
  return (
    <div
      className="flex items-center gap-2"
      role="timer"
      aria-label={`Launches in ${t.days} days ${t.hours} hours ${t.minutes} minutes`}
    >
      {items.map(([v, l]) => (
        <div key={l} className="text-center">
          <div
            className={cn(
              "grid h-12 w-12 place-items-center rounded-xl font-display text-lg font-extrabold tabular-nums sm:h-14 sm:w-14 sm:text-xl",
              tone === "dark" ? "bg-white/15 text-white backdrop-blur" : "bg-secondary text-foreground",
            )}
          >
            {String(v).padStart(2, "0")}
          </div>
          <div className={cn("mt-1 text-[10px] font-semibold uppercase tracking-wider", tone === "dark" ? "text-white/60" : "text-muted-foreground")}>
            {l}
          </div>
        </div>
      ))}
    </div>
  );
};

const StatusPill = ({ status }: { status: Status }) => {
  const s = STATUS[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold", s.cls)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
};

const PreOrders = () => {
  useEffect(() => {
    document.title = "Pre-Orders — Reserve the Next Launch | Nexzon";
    const desc =
      "Reserve upcoming smartphones, tablets and wearables at Nexzon Sri Lanka. Small refundable deposit, price protection and launch-day islandwide delivery.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const sorted = useMemo(
    () => [...launches].sort((a, b) => a.releaseISO.localeCompare(b.releaseISO)),
    [],
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  /* Group the calendar by launch month. */
  const months = useMemo(() => {
    const map = new Map<string, Launch[]>();
    rest.forEach((l) => {
      const k = monthKey(l.releaseISO);
      map.set(k, [...(map.get(k) ?? []), l]);
    });
    return [...map.entries()];
  }, [rest]);

  const openCount = launches.filter((l) => l.status !== "coming").length;
  const minDeposit = Math.min(...launches.map((l) => l.deposit));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Pre-Orders</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container-page pt-5">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep">
            <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div className="text-primary-foreground">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" /> {openCount} launches open now
                </span>
                <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                  Reserve the next generation.
                </h1>
                <p className="mt-4 max-w-md text-sm text-white/85 sm:text-base">
                  Hold your unit with a refundable deposit from {fmtLKR(minDeposit)}. Pay the balance only when
                  stock lands, and get it on launch day — before general sale.
                </p>

                <div className="mt-6">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                    Next launch · {featured.name}
                  </p>
                  <CountdownBoxes iso={featured.releaseISO} />
                </div>
              </div>

              <div className="isolate overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-secondary p-6">
                <img
                  src={featured.image}
                  alt={`${featured.name} render`}
                  className="mx-auto h-48 w-auto object-contain mix-blend-multiply sm:h-64"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="container-page pt-14">
          <h2 className="font-display text-xl font-bold">How pre-ordering works</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Featured launch */}
        <section className="container-page pt-14">
          <h2 className="font-display text-xl font-bold">Closing next</h2>
          <div className="mt-4 grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8 lg:grid-cols-[22rem_1fr]">
            <div className="isolate grid place-items-center rounded-2xl bg-gradient-to-br from-white via-white to-secondary p-6">
              <img
                src={featured.image}
                alt={`${featured.name} render`}
                className="h-56 w-auto object-contain mix-blend-multiply"
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={featured.status} />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {featured.brand}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                {featured.name}
              </h3>

              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {featured.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {s}
                  </li>
                ))}
              </ul>

              {featured.bundle && (
                <p className="mt-4 flex items-start gap-2 rounded-xl bg-accent p-3 text-sm font-medium text-accent-foreground">
                  <Gift className="mt-0.5 h-4 w-4 shrink-0" />
                  {featured.bundle}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-4">
                <div>
                  <div className="text-xs text-muted-foreground">Expected price</div>
                  <div className="font-display text-2xl font-extrabold text-foreground">{fmtLKR(featured.price)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Reserve today for</div>
                  <div className="font-display text-2xl font-extrabold text-primary">{fmtLKR(featured.deposit)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ships</div>
                  <div className="font-display text-lg font-bold text-foreground">{fmtDate(featured.releaseISO)}</div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link to="/checkout">Reserve for {fmtLKR(featured.deposit)}</Link>
                </Button>
                <CountdownBoxes iso={featured.releaseISO} tone="light" />
              </div>
            </div>
          </div>
        </section>

        {/* Launch calendar */}
        <section className="container-page pt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold">Launch calendar</h2>
              <p className="mt-1 text-sm text-muted-foreground">Everything we are taking reservations for, by month.</p>
            </div>
          </div>

          <div className="mt-5 space-y-8">
            {months.map(([month, items]) => (
              <div key={month}>
                <div className="mb-3 flex items-center gap-3">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">{month}</h3>
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">{items.length} launch{items.length > 1 ? "es" : ""}</span>
                </div>

                <div className="space-y-3">
                  {items.map((l) => (
                    <article
                      key={l.id}
                      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:flex-row sm:items-center"
                    >
                      <div className="grid h-28 w-28 shrink-0 place-items-center self-center rounded-xl bg-white">
                        <img src={l.image} alt={`${l.name} render`} loading="lazy" className="h-24 w-auto object-contain" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusPill status={l.status} />
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {l.brand}
                          </span>
                        </div>
                        <h4 className="mt-1.5 font-display text-base font-bold text-foreground">{l.name}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{l.specs.join(" · ")}</p>
                        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <CalendarClock className="h-3.5 w-3.5" /> Ships {fmtDate(l.releaseISO)}
                        </p>
                      </div>

                      <div className="shrink-0 sm:w-52 sm:text-right">
                        <div className="text-xs text-muted-foreground">Expected {fmtLKR(l.price)}</div>
                        <div className="font-display text-lg font-extrabold text-foreground">
                          {fmtLKR(l.deposit)} <span className="text-xs font-medium text-muted-foreground">deposit</span>
                        </div>
                        <Button asChild size="sm" variant={l.status === "coming" ? "outline" : "default"} className="mt-2 w-full sm:w-auto">
                          <Link to="/checkout">{l.status === "coming" ? "Notify me" : "Reserve"}</Link>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            Images are representative renders — unreleased hardware has no official photography yet. Final
            design, colours and Sri Lankan pricing are confirmed before your balance is charged.
          </p>
        </section>

        {/* Why pre-order */}
        <section className="container-page pt-14">
          <h2 className="font-display text-xl font-bold">Why reserve with Nexzon</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container-page py-14">
          <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pre-order FAQ</span>
              <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">Before you reserve</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The deposit is refundable and the price is protected. Anything else, ask us.
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link to="/help">
                  Contact support <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`f-${i}`}
                  className="mb-3 overflow-hidden rounded-xl border border-border bg-card px-5 shadow-soft"
                >
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PreOrders;
