import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Download,
  RotateCcw,
  Undo2,
  HelpCircle,
  MessageCircle,
  Phone,
  ShieldCheck,
  Copy,
  Printer,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import {
  AccountSidebarNav,
  AccountProfileCard,
} from "@/components/cellexa/AccountSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

interface OrderItemDetail {
  name: string;
  brand: string;
  variant: string;
  qty: number;
  price: number;
  img: string;
}

const ORDER = {
  id: "CLX-2024-008812",
  date: "18 Apr 2026, 11:42 AM",
  status: "Shipped" as const,
  payment: "Visa •• 4821",
  delivery: "Pronto Express • Standard Delivery",
  eta: "Arrives Mon, 22 Apr 2026",
  trackingNo: "PRX-LK-883201224",
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
  ] as OrderItemDetail[],
  subtotal: 384500,
  discount: -8000,
  delivery_fee: 0,
  tax: 0,
  total: 376500,
};

const TIMELINE = [
  {
    label: "Order Placed",
    desc: "We received your order",
    time: "18 Apr, 11:42 AM",
    done: true,
    icon: CheckCircle2,
  },
  {
    label: "Payment Confirmed",
    desc: "Visa •• 4821",
    time: "18 Apr, 11:43 AM",
    done: true,
    icon: CheckCircle2,
  },
  {
    label: "Packed & Ready",
    desc: "Dispatched from Colombo warehouse",
    time: "19 Apr, 09:15 AM",
    done: true,
    icon: Package,
  },
  {
    label: "Out for Delivery",
    desc: "Pronto Express courier",
    time: "Expected 22 Apr",
    done: false,
    active: true,
    icon: Truck,
  },
  {
    label: "Delivered",
    desc: "Signature on delivery",
    time: "Pending",
    done: false,
    icon: CheckCircle2,
  },
];

const fmt = (n: number) =>
  `LKR ${Math.abs(n).toLocaleString("en-LK")}`;

const OrderDetails = () => {
  const { id } = useParams();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const orderId = id ?? ORDER.id;

  const copyTracking = () => {
    navigator.clipboard.writeText(ORDER.trackingNo);
    toast.success("Tracking number copied");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb + Title */}
      <section className="border-b border-border/60 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container py-6 md:py-8">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/account" className="hover:text-primary">My Account</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/account/orders" className="hover:text-primary">Orders</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground">{orderId}</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Order Details
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Order <span className="font-semibold text-foreground">{orderId}</span> · Placed on {ORDER.date}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Menu className="h-4 w-4" />
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto p-0">
                  <div className="space-y-5 p-5">
                    <AccountProfileCard />
                    <AccountSidebarNav
                      onNavigate={() => setMobileNavOpen(false)}
                      activePath="/account/orders"
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={() => window.print()}>
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Layout */}
      <section className="container py-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <AccountProfileCard />
              <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card">
                <AccountSidebarNav activePath="/account/orders" />
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="space-y-6">
            {/* Status banner */}
            <div className="overflow-hidden rounded-3xl border border-primary/15 bg-gradient-hero text-primary-foreground shadow-lift">
              <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    <Truck className="h-3.5 w-3.5" />
                    {ORDER.status}
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold md:text-2xl">
                    {ORDER.eta}
                  </h2>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Your package is on its way with {ORDER.delivery.split("•")[0].trim()}.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-lg bg-white/15 px-3 py-1.5 font-mono font-semibold backdrop-blur-sm">
                      {ORDER.trackingNo}
                    </span>
                    <button
                      onClick={copyTracking}
                      className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1.5 font-semibold transition hover:bg-white/25"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 lg:flex-col">
                  <Button variant="hero" size="sm">
                    <Truck className="h-4 w-4" />
                    Track Order
                  </Button>
                  <Button variant="heroOutline" size="sm">
                    <Download className="h-4 w-4" />
                    Invoice
                  </Button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-foreground">Delivery Timeline</h3>
                <span className="text-xs text-muted-foreground">5 stages</span>
              </div>
              <ol className="relative space-y-5">
                {TIMELINE.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === TIMELINE.length - 1;
                  return (
                    <li key={step.label} className="relative flex gap-4">
                      {!isLast && (
                        <span
                          className={`absolute left-[19px] top-10 h-[calc(100%-8px)] w-0.5 ${
                            step.done ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                      <div
                        className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 ${
                          step.done
                            ? "border-primary bg-primary text-primary-foreground"
                            : step.active
                              ? "border-primary bg-primary/10 text-primary animate-pulse"
                              : "border-border bg-secondary text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <p className={`text-sm font-bold ${step.done || step.active ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                          <span className="text-xs text-muted-foreground">{step.time}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{step.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Items */}
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Items in this order</h3>
                  <p className="text-xs text-muted-foreground">{ORDER.items.length} products</p>
                </div>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="h-4 w-4" />
                  Reorder all
                </Button>
              </div>
              <ul className="divide-y divide-border/60">
                {ORDER.items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-secondary/60">
                      <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{item.brand}</p>
                      <p className="mt-0.5 truncate text-sm font-bold text-foreground">{item.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.variant}</p>
                      <p className="mt-1 text-xs font-medium text-muted-foreground">Qty: <span className="text-foreground">{item.qty}</span></p>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                      <p className="text-sm font-bold text-foreground">{fmt(item.price * item.qty)}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-3 text-xs">Buy again</Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Two column: address/payment & summary */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card">
                <div className="mb-3 flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Shipping Address</h3>
                </div>
                <div className="text-sm text-foreground">
                  <p className="font-bold">{ORDER.address.name}</p>
                  <p className="mt-1 text-muted-foreground">{ORDER.address.line1}</p>
                  <p className="text-muted-foreground">{ORDER.address.line2}</p>
                  <p className="text-muted-foreground">{ORDER.address.city}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Phone className="h-3 w-3 text-primary" />
                    {ORDER.address.phone}
                  </p>
                </div>
                <div className="mt-4 rounded-xl border border-border/60 bg-secondary/40 p-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Truck className="h-3.5 w-3.5 text-primary" />
                    <span className="font-semibold text-foreground">{ORDER.delivery}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card">
                <div className="mb-3 flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Payment Summary</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({ORDER.items.length} items)</span>
                    <span className="text-foreground">{fmt(ORDER.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Discount</span>
                    <span className="font-semibold text-promo">− {fmt(ORDER.discount)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="font-semibold text-promo">FREE</span>
                  </div>
                  <div className="my-2 border-t border-dashed border-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Total Paid</span>
                    <span className="font-display text-xl font-bold text-primary">{fmt(ORDER.total)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Paid with {ORDER.payment}</p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary/5 px-3 py-2 text-xs font-semibold text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Nexzon Buyer Protection active
                </div>
              </div>
            </div>

            {/* Action row */}
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-card">
              <h3 className="font-display text-base font-bold text-foreground">Order actions</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Manage your order with one tap</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <Button variant="default">
                  <Truck className="h-4 w-4" />
                  Track Order
                </Button>
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4" />
                  Reorder
                </Button>
                <Button variant="outline">
                  <Undo2 className="h-4 w-4" />
                  Request Return
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4" />
                  Download Invoice
                </Button>
              </div>
            </div>

            {/* Help card */}
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-gradient-brand-soft p-6 shadow-card md:p-7">
              <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lift">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">Need help with this order?</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Our Sri Lanka–based customer care is available 7 days a week to help with delivery, returns, or warranty.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default" size="sm">
                    <MessageCircle className="h-4 w-4" />
                    Live Chat
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                    011 234 5678
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderDetails;
