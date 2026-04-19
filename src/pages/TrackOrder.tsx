import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  HelpCircle,
  MessageCircle,
  Phone,
  ShieldCheck,
  Copy,
  Search,
  ShoppingBag,
  FileText,
  Box,
  PackageCheck,
  Bike,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import {
  AccountSidebarNav,
  AccountProfileCard,
} from "@/components/cellexa/AccountSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

const ORDER = {
  id: "CLX-2024-008812",
  date: "18 Apr 2026, 11:42 AM",
  status: "Out for Delivery" as const,
  eta: "Today, by 6:30 PM",
  etaDate: "Mon, 22 Apr 2026",
  trackingNo: "PRX-LK-883201224",
  courier: {
    name: "Pronto Express",
    service: "Standard Delivery",
    rider: "Kasun Silva",
    phone: "+94 76 882 1190",
  },
  address: {
    name: "Nuwan Perera",
    line1: "No. 24/B, Lake View Avenue",
    line2: "Battaramulla 10120",
    city: "Colombo District",
    phone: "+94 77 234 5678",
  },
  items: [
    {
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      variant: "256GB · Natural Titanium",
      qty: 1,
      price: 365000,
      img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=240&q=80",
    },
    {
      name: "MagSafe Charger",
      brand: "Apple",
      variant: "1m · White",
      qty: 1,
      price: 19500,
      img: "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?w=240&q=80",
    },
  ],
  total: 376500,
};

const fmt = (n: number) =>
  `LKR ${n.toLocaleString("en-LK", { minimumFractionDigits: 0 })}`;

type StageKey =
  | "placed"
  | "confirmed"
  | "packed"
  | "shipped"
  | "out"
  | "delivered";

const STAGES: {
  key: StageKey;
  title: string;
  icon: typeof Package;
  desc: string;
  time: string;
}[] = [
  {
    key: "placed",
    title: "Order Placed",
    icon: ShoppingBag,
    desc: "We received your order and payment confirmation.",
    time: "18 Apr · 11:42 AM",
  },
  {
    key: "confirmed",
    title: "Confirmed",
    icon: CheckCircle2,
    desc: "Order verified by Cellexa fulfillment center.",
    time: "18 Apr · 12:08 PM",
  },
  {
    key: "packed",
    title: "Packed",
    icon: Box,
    desc: "Items packed securely at our Colombo warehouse.",
    time: "19 Apr · 09:15 AM",
  },
  {
    key: "shipped",
    title: "Shipped",
    icon: PackageCheck,
    desc: "Handed over to Pronto Express courier partner.",
    time: "20 Apr · 04:30 PM",
  },
  {
    key: "out",
    title: "Out for Delivery",
    icon: Bike,
    desc: "Your rider Kasun is on the way to your address.",
    time: "Today · 09:48 AM",
  },
  {
    key: "delivered",
    title: "Delivered",
    icon: PackageCheck,
    desc: "Package handed over to recipient.",
    time: "Pending",
  },
];

const CURRENT_STAGE_INDEX = 4; // Out for Delivery

const TrackOrder = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState(ORDER.id);

  const copyTracking = () => {
    navigator.clipboard.writeText(ORDER.trackingNo);
    toast.success("Tracking number copied");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 via-background to-background">
      <Header />

      <main className="container mx-auto px-3 py-6 sm:px-4 sm:py-8 lg:py-10">
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/account" className="hover:text-foreground">My Account</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-foreground">Track Order</span>
        </nav>

        {/* Page header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Track Your Order
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Live status updates from our warehouse to your doorstep across Sri Lanka.
            </p>
          </div>
          <div className="lg:hidden">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Menu className="mr-2 h-4 w-4" /> Account Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto p-5">
                <div className="space-y-5">
                  <AccountProfileCard />
                  <AccountSidebarNav
                    onNavigate={() => setMobileNavOpen(false)}
                    activePath="/account"
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <AccountProfileCard />
              <div className="rounded-2xl border border-border/70 bg-card p-3 shadow-card">
                <AccountSidebarNav activePath="/account" />
              </div>
            </div>
          </aside>

          {/* Main content */}
          <section className="space-y-6">
            {/* Tracking lookup */}
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card sm:p-5">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Track another order
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Enter order number e.g. CLX-2024-008812"
                    className="h-11 rounded-xl pl-9"
                  />
                </div>
                <Button
                  variant="brand"
                  className="h-11 rounded-xl"
                  onClick={() => toast.success("Order located", { description: ORDER.id })}
                >
                  Track Order
                </Button>
              </div>
            </div>

            {/* Status hero */}
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    <Truck className="h-3.5 w-3.5" />
                    {ORDER.status}
                  </div>
                  <h2 className="mt-3 font-display text-xl font-extrabold text-foreground sm:text-2xl">
                    Estimated arrival {ORDER.eta}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ORDER.etaDate} · Order {ORDER.id}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-lg bg-secondary px-2.5 py-1 font-mono text-foreground">
                      {ORDER.trackingNo}
                    </span>
                    <button
                      onClick={copyTracking}
                      className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1 font-semibold text-foreground transition hover:bg-secondary/70"
                    >
                      <Copy className="h-3 w-3" /> Copy
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild variant="brand" size="sm" className="rounded-xl">
                    <Link to={`/account/orders/${ORDER.id}`}>
                      <FileText className="mr-1.5 h-4 w-4" /> Order Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Phone className="mr-1.5 h-4 w-4" /> Call Rider
                  </Button>
                </div>
              </div>

              {/* Mini progress bar */}
              <div className="mt-6">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${((CURRENT_STAGE_INDEX + 1) / STAGES.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Placed</span>
                  <span>Packed</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>

            {/* Courier + Address */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
                <div className="mb-3 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Courier Partner
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand-soft font-display text-sm font-bold text-primary">
                    PE
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-bold text-foreground">{ORDER.courier.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{ORDER.courier.service}</div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 rounded-xl bg-secondary/60 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rider</span>
                    <span className="font-semibold text-foreground">{ORDER.courier.rider}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Contact</span>
                    <a href={`tel:${ORDER.courier.phone}`} className="font-semibold text-primary hover:underline">
                      {ORDER.courier.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Delivery Address
                  </h3>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold text-foreground">{ORDER.address.name}</div>
                  <div className="text-muted-foreground">{ORDER.address.line1}</div>
                  <div className="text-muted-foreground">{ORDER.address.line2}</div>
                  <div className="text-muted-foreground">{ORDER.address.city}</div>
                  <div className="pt-1 font-medium text-foreground">{ORDER.address.phone}</div>
                </div>
              </div>
            </div>

            {/* Tracking timeline */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-lg font-extrabold text-foreground">
                  Tracking Timeline
                </h3>
                <span className="text-xs font-semibold text-muted-foreground">
                  {CURRENT_STAGE_INDEX + 1} / {STAGES.length} steps
                </span>
              </div>

              <ol className="relative space-y-5">
                {STAGES.map((stage, idx) => {
                  const completed = idx < CURRENT_STAGE_INDEX;
                  const current = idx === CURRENT_STAGE_INDEX;
                  const Icon = stage.icon;
                  return (
                    <li key={stage.key} className="relative flex gap-4">
                      {/* line */}
                      {idx !== STAGES.length - 1 && (
                        <span
                          className={`absolute left-[19px] top-10 h-[calc(100%-12px)] w-0.5 ${
                            completed ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                      {/* dot */}
                      <div
                        className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 transition ${
                          completed
                            ? "border-primary bg-primary text-primary-foreground"
                            : current
                              ? "border-primary bg-primary/10 text-primary ring-4 ring-primary/15"
                              : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                        {current && (
                          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse rounded-full bg-promo ring-2 ring-card" />
                        )}
                      </div>
                      {/* content */}
                      <div className="flex-1 pb-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div
                            className={`font-bold ${
                              completed || current ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {stage.title}
                            {current && (
                              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-promo/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-promo">
                                <Clock className="h-2.5 w-2.5" /> In progress
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-medium text-muted-foreground">{stage.time}</div>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">{stage.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Items summary */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-extrabold text-foreground">
                  Shipment Contents
                </h3>
                <span className="text-xs font-semibold text-muted-foreground">
                  {ORDER.items.length} item{ORDER.items.length > 1 ? "s" : ""}
                </span>
              </div>
              <ul className="divide-y divide-border/70">
                {ORDER.items.map((item) => (
                  <li key={item.name} className="flex gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4">
                    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-secondary sm:h-20 sm:w-20">
                      <img src={item.img} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {item.brand}
                      </div>
                      <div className="truncate font-bold text-foreground">{item.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{item.variant}</div>
                      <div className="mt-1 text-xs font-semibold text-muted-foreground">
                        Qty {item.qty}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">{fmt(item.price)}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3">
                <span className="text-sm font-semibold text-foreground">Order Total</span>
                <span className="font-display text-lg font-extrabold text-primary">{fmt(ORDER.total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid gap-3 sm:grid-cols-3">
              <Button asChild variant="brand" className="h-12 rounded-xl">
                <Link to={`/account/orders/${ORDER.id}`}>
                  <FileText className="mr-1.5 h-4 w-4" /> View Order Details
                </Link>
              </Button>
              <Button variant="outline" className="h-12 rounded-xl">
                <MessageCircle className="mr-1.5 h-4 w-4" /> Contact Support
              </Button>
              <Button asChild variant="secondary" className="h-12 rounded-xl">
                <Link to="/shop">
                  <ShoppingBag className="mr-1.5 h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
            </div>

            {/* Help card */}
            <div className="grid gap-4 rounded-2xl border border-border/70 bg-gradient-brand-soft p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-extrabold text-foreground">
                    Delivery issue or delay?
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Our Cellexa support team is available 8 AM – 9 PM daily across Sri Lanka. Get instant help with your shipment.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <ShieldCheck className="h-3 w-3 text-primary" /> Insured shipment
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <Phone className="h-3 w-3 text-primary" /> +94 11 234 5678
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="brand" size="sm" className="rounded-xl">
                  <MessageCircle className="mr-1.5 h-4 w-4" /> Live Chat
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl bg-card">
                  Help Center
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
