import { Link } from "react-router-dom";
import {
  ChevronRight,
  CalendarClock,
  Sparkles,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Wallet,
  Bell,
  PackageCheck,
  CreditCard,
  Clock,
  Rocket,
  Gift,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

import PromoBar from "@/components/cellexa/PromoBar";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import galaxyS26 from "@/assets/galaxy-s26-ultra.png";
import iphone17ProMax from "@/assets/galaxy-s26-plus.png";
import pixel10 from "@/assets/preorder-tablet.png";
import iphone17e from "@/assets/iphone-17e.png";

/* -------------------- Types & data -------------------- */
type PreOrderStatus = "open" | "limited" | "closing" | "coming";

type PreOrderProduct = {
  id: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  releaseDate: string; // human readable
  releaseISO: string; // for datetime
  deposit: number;
  status: PreOrderStatus;
  highlight?: string;
};

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

const STATUS_META: Record<
  PreOrderStatus,
  { label: string; className: string; dot: string }
> = {
  open: {
    label: "Pre-Order Open",
    className: "bg-success/10 text-success border-success/20",
    dot: "bg-success",
  },
  limited: {
    label: "Limited Stock",
    className: "bg-warning/15 text-warning-foreground border-warning/30",
    dot: "bg-warning",
  },
  closing: {
    label: "Closing Soon",
    className: "bg-promo/10 text-promo border-promo/20",
    dot: "bg-promo",
  },
  coming: {
    label: "Coming Soon",
    className: "bg-accent text-accent-foreground border-primary/20",
    dot: "bg-primary",
  },
};

const FEATURED: PreOrderProduct = {
  id: "galaxy-s26-ultra-preorder",
  brand: "Samsung",
  name: "Galaxy S26 Ultra 5G — 512GB Titanium",
  image: galaxyS26,
  price: 489900,
  releaseDate: "May 24, 2026",
  releaseISO: "2026-05-24",
  deposit: 25000,
  status: "open",
  highlight: "Exclusive launch bundle: free Galaxy Buds3 Pro + 1 year screen protection.",
};

const PREORDERS: PreOrderProduct[] = [
  {
    id: "iphone-17-pro-max-preorder",
    brand: "Samsung",
    name: "Samsung S26+ 512GB",
    image: iphone17ProMax,
    price: 459900,
    releaseDate: "May 09, 2026",
    releaseISO: "2026-05-09",
    deposit: 20000,
    status: "limited",
  },
  {
    id: "pixel-10-pro-preorder",
    brand: "Google",
    name: "Pixel 10 Pro 256GB — Obsidian",
    image: pixel10,
    price: 309900,
    releaseDate: "Jun 02, 2026",
    releaseISO: "2026-06-02",
    deposit: 15000,
    status: "open",
  },
  {
    id: "iphone-17e-preorder",
    brand: "Apple",
    name: "iPhone 17e 128GB — Midnight",
    image: iphone17e,
    price: 219900,
    releaseDate: "Apr 30, 2026",
    releaseISO: "2026-04-30",
    deposit: 10000,
    status: "closing",
  },
];

/* -------------------- Small components -------------------- */
const StatusPill = ({ status }: { status: PreOrderStatus }) => {
  const m = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${m.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
};

const PreOrderCard = ({ product }: { product: PreOrderProduct }) => {
  const isComingSoon = product.status === "coming";
  return (
    <article className="card-product group flex flex-col">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-gradient-brand-soft"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <StatusPill status={product.status} />
        </div>
        <div className="absolute right-3 top-3">
          <span className="badge-promo bg-foreground/90 text-background backdrop-blur">
            <CalendarClock className="h-3 w-3" /> {product.releaseDate}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
          {product.brand}
        </span>
        <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-bold leading-snug text-foreground">
          {product.name}
        </h3>

        <div className="mt-1 rounded-xl border border-border/60 bg-surface px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-muted-foreground">
                Expected price
              </span>
              <span className="font-display text-lg font-extrabold text-foreground">
                {fmtLKR(product.price)}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-medium text-muted-foreground">
                Deposit
              </span>
              <span className="text-sm font-bold text-primary">
                {fmtLKR(product.deposit)}
              </span>
            </div>
          </div>
        </div>

        <Button
          className="mt-2 w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep"
          disabled={isComingSoon}
        >
          {isComingSoon ? (
            <>
              <Bell className="h-4 w-4" /> Notify Me
            </>
          ) : (
            <>
              <Rocket className="h-4 w-4" /> Pre-Order Now
            </>
          )}
        </Button>
      </div>
    </article>
  );
};

/* -------------------- Page -------------------- */
const PreOrders = () => {
  return (
    <div className="min-h-screen bg-background">
      <PromoBar />
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-surface/60">
          <div className="container-page py-3">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/shop" className="hover:text-primary">
                Shop
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">Pre-Orders</span>
            </nav>
          </div>
        </div>

        {/* Page header */}
        <section className="container-page pt-8 md:pt-10 animate-fade-in">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                Pre-Orders
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                Reserve the latest smartphones, wearables and audio gear before
                they hit the shelves. Pay a small deposit today and get
                priority delivery on launch day — backed by Cellexa's full
                warranty and easy returns.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-success" />
              100% refundable deposit
            </div>
          </div>
        </section>

        {/* Featured launch */}
        <section className="container-page mt-8 md:mt-10">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand-soft">
            <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:gap-10 md:p-10">
              <div className="order-2 md:order-1">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                  <Rocket className="h-3.5 w-3.5" /> Featured Launch
                </span>
                <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                  {FEATURED.name}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  {FEATURED.highlight}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border/60 bg-card p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <CalendarClock className="h-3.5 w-3.5" /> Launch
                    </div>
                    <div className="mt-1 text-sm font-bold text-foreground">
                      {FEATURED.releaseDate}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <Wallet className="h-3.5 w-3.5" /> Deposit
                    </div>
                    <div className="mt-1 text-sm font-bold text-primary">
                      {fmtLKR(FEATURED.deposit)}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card p-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <BadgeCheck className="h-3.5 w-3.5" /> Price
                    </div>
                    <div className="mt-1 text-sm font-bold text-foreground">
                      {fmtLKR(FEATURED.price)}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep">
                    <Rocket className="h-4 w-4" /> Pre-Order Now
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 rounded-xl border-border/70"
                  >
                    <Bell className="h-4 w-4" /> Notify on Launch
                  </Button>
                  <StatusPill status={FEATURED.status} />
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative mx-auto aspect-square w-full max-w-md rounded-3xl bg-card/70 p-6 shadow-lift backdrop-blur">
                  <img
                    src={FEATURED.image}
                    alt={FEATURED.name}
                    className="h-full w-full object-contain animate-float"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-soft">
                    <Sparkles className="h-3.5 w-3.5" /> New Launch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container-page mt-10 md:mt-14">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <PackageCheck className="h-5 w-5" />,
                title: "Priority Delivery",
                desc: "Be first in line on launch day with same-day dispatch.",
              },
              {
                icon: <Gift className="h-5 w-5" />,
                title: "Launch Bonuses",
                desc: "Exclusive bundles, accessories and gift vouchers.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Refundable Deposit",
                desc: "Change your mind? Cancel any time before dispatch.",
              },
              {
                icon: <Truck className="h-5 w-5" />,
                title: "Free Island-wide",
                desc: "Free delivery across Sri Lanka on every pre-order.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lift hover:border-primary/30"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                  {b.icon}
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-foreground">
                  {b.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section className="container-page mt-12 md:mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Available for Pre-Order
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Hand-picked upcoming devices — reserve yours before stocks run
                out.
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
            >
              Browse all devices →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {PREORDERS.map((p) => (
              <PreOrderCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="container-page mt-14 md:mt-20">
          <div className="rounded-3xl border border-border/60 bg-surface/60 p-6 md:p-10">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                <Clock className="h-3.5 w-3.5" /> Simple Process
              </span>
              <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                How Pre-Order Works
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                Reserve your device in three easy steps and we'll take care of
                the rest.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: <CreditCard className="h-5 w-5" />,
                  title: "Place Your Pre-Order",
                  desc: "Pick your device, pay a small refundable deposit and lock in launch pricing.",
                },
                {
                  step: "02",
                  icon: <Bell className="h-5 w-5" />,
                  title: "Stay Updated",
                  desc: "Get SMS and email updates on stock arrival and your dispatch schedule.",
                },
                {
                  step: "03",
                  icon: <PackageCheck className="h-5 w-5" />,
                  title: "Receive on Launch Day",
                  desc: "Pay the balance, then enjoy priority delivery the moment your device arrives.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="relative rounded-2xl border border-border/60 bg-card p-5 shadow-soft"
                >
                  <span className="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-extrabold tracking-wider text-primary-foreground">
                    STEP {s.step}
                  </span>
                  <div className="mt-2 grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    {s.icon}
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ + Support */}
        <section className="container-page mt-14 md:mt-20 mb-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  Pre-Order FAQ
                </h2>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything you need to know before reserving your next device.
              </p>

              <Accordion type="single" collapsible className="mt-5 space-y-3">
                {[
                  {
                    q: "Is the pre-order deposit refundable?",
                    a: "Yes. Your deposit is fully refundable any time before your device is dispatched. Refunds are processed back to the original payment method within 3–5 business days.",
                  },
                  {
                    q: "When will I be charged the full price?",
                    a: "You only pay the deposit at checkout. The remaining balance is charged on the day your device is ready for dispatch — never before launch.",
                  },
                  {
                    q: "Will the price change before launch?",
                    a: "No. The launch price you see at pre-order is locked in for you, even if the official retail price changes later.",
                  },
                  {
                    q: "Can I cancel or change my pre-order?",
                    a: "Absolutely. Manage your pre-orders from your Cellexa account — change variants, color or cancel until the dispatch confirmation email is sent.",
                  },
                  {
                    q: "How will I know when my device ships?",
                    a: "We'll keep you posted via SMS and email at every step — confirmation, stock arrival, payment reminder and dispatch tracking.",
                  },
                ].map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="rounded-2xl border border-border/60 bg-card px-4 shadow-soft"
                  >
                    <AccordionTrigger className="text-left text-sm font-bold text-foreground hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand-soft p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">
                  Need help with a pre-order?
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Our launch concierge team is online 7 days a week to answer
                  your questions and help you reserve the right device.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Button
                    asChild
                    className="w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-deep"
                  >
                    <Link to="/help">
                      Chat with Support <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full gap-2 rounded-xl border-border/70"
                  >
                    <Link to="/faq">View All FAQs</Link>
                  </Button>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-success" />{" "}
                    Authentic devices
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-primary" /> Free delivery
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

export default PreOrders;
