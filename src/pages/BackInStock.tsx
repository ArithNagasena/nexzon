import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Bell,
  BellOff,
  Trash2,
  Eye,
  ShoppingCart,
  CheckCircle2,
  Clock,
  PackageX,
  Boxes,
  Sparkles,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Plus,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import {
  AccountSidebarNav,
  AccountProfileCard,
} from "@/components/cellexa/AccountSidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

type Status = "active" | "available" | "expired";

interface StockAlert {
  id: string;
  brand: string;
  name: string;
  variant: string;
  img: string;
  lastPrice: number;
  status: Status;
  enabled: boolean;
  setOn: string;
  availableOn?: string;
  expectedRestock?: string;
  waitlistPosition?: number;
}

const fmt = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

const INITIAL: StockAlert[] = [
  {
    id: "b1",
    brand: "Apple",
    name: "iPhone 15 Pro Max 1TB",
    variant: "Blue Titanium",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=480&q=80",
    lastPrice: 545000,
    status: "available",
    enabled: true,
    setOn: "Set 28 Mar",
    availableOn: "Back in stock 2 hours ago",
  },
  {
    id: "b2",
    brand: "Samsung",
    name: "Galaxy S24 Ultra 512GB",
    variant: "Titanium Violet",
    img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=480&q=80",
    lastPrice: 425000,
    status: "active",
    enabled: true,
    setOn: "Set 05 Apr",
    expectedRestock: "Expected within 7 days",
    waitlistPosition: 14,
  },
  {
    id: "b3",
    brand: "Sony",
    name: "PlayStation 5 Slim Disc Edition",
    variant: "White · 1TB",
    img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=480&q=80",
    lastPrice: 168000,
    status: "active",
    enabled: true,
    setOn: "Set 11 Apr",
    expectedRestock: "Expected within 14 days",
    waitlistPosition: 42,
  },
  {
    id: "b4",
    brand: "Apple",
    name: "AirPods Pro 2 (USB-C)",
    variant: "MagSafe Charging Case",
    img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=480&q=80",
    lastPrice: 78500,
    status: "available",
    enabled: false,
    setOn: "Set 22 Mar",
    availableOn: "Back in stock yesterday",
  },
  {
    id: "b5",
    brand: "Dyson",
    name: "Dyson V15 Detect Absolute Vacuum",
    variant: "Yellow / Nickel",
    img: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?w=480&q=80",
    lastPrice: 285000,
    status: "active",
    enabled: true,
    setOn: "Set 09 Apr",
    expectedRestock: "Awaiting shipment",
    waitlistPosition: 7,
  },
  {
    id: "b6",
    brand: "Nintendo",
    name: "Switch OLED Model — Mario Red",
    variant: "Special Edition",
    img: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=480&q=80",
    lastPrice: 112000,
    status: "expired",
    enabled: false,
    setOn: "Set 12 Jan",
  },
];

const statusMeta: Record<
  Status,
  { label: string; cls: string; tone: string; Icon: LucideIcon }
> = {
  active: {
    label: "Waiting",
    cls: "bg-primary/10 text-primary",
    tone: "border-border/70",
    Icon: Clock,
  },
  available: {
    label: "Available now",
    cls: "bg-success/15 text-success",
    tone: "border-success/40",
    Icon: CheckCircle2,
  },
  expired: {
    label: "Expired",
    cls: "bg-muted text-muted-foreground",
    tone: "border-border/40 opacity-80",
    Icon: PackageX,
  },
};

const BackInStock = () => {
  const [items, setItems] = useState<StockAlert[]>(INITIAL);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const counts = useMemo(
    () => ({
      all: items.length,
      active: items.filter((i) => i.status === "active").length,
      available: items.filter((i) => i.status === "available").length,
      expired: items.filter((i) => i.status === "expired").length,
    }),
    [items],
  );

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter],
  );

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    );

  const remove = (id: string) => {
    setItems((prev) => prev.filter((a) => a.id !== id));
    toast.success("Alert removed");
  };

  const clearExpired = () => {
    setItems((prev) => prev.filter((a) => a.status !== "expired"));
    toast.success("Expired alerts cleared");
  };

  const addToCart = (a: StockAlert) => {
    if (a.status !== "available") return toast.error("Not available yet");
    toast.success(`${a.name} added to cart`);
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
          <span className="font-semibold text-foreground">Back-in-Stock Alerts</span>
        </nav>

        {/* Page header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Back-in-Stock Alerts
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              We'll ping you the moment your favourite Cellexa products are restocked in Sri Lanka.
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
                    activePath="/account/back-in-stock"
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <AccountProfileCard />
              <div className="rounded-2xl border border-border/70 bg-card p-3 shadow-card">
                <AccountSidebarNav activePath="/account/back-in-stock" />
              </div>
            </div>
          </aside>

          {/* Main */}
          <section className="space-y-6">
            {/* Stat strip */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Tracking", value: counts.all, Icon: Boxes, cls: "from-primary to-primary-glow" },
                { label: "Waiting", value: counts.active, Icon: Clock, cls: "from-primary-deep to-primary" },
                { label: "Available", value: counts.available, Icon: PackageCheck, cls: "from-success to-primary" },
                { label: "Expired", value: counts.expired, Icon: PackageX, cls: "from-muted-foreground to-foreground" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-card"
                >
                  <div
                    className={`absolute -right-4 -top-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br ${s.cls} text-white opacity-90`}
                  >
                    <s.Icon className="h-5 w-5" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { k: "all", label: "All", count: counts.all },
                      { k: "active", label: "Active", count: counts.active },
                      { k: "available", label: "Available", count: counts.available },
                      { k: "expired", label: "Expired", count: counts.expired },
                    ] as { k: "all" | Status; label: string; count: number }[]
                  ).map((tab) => {
                    const active = filter === tab.k;
                    return (
                      <button
                        key={tab.k}
                        onClick={() => setFilter(tab.k)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                          active
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                        <span
                          className={`rounded-full px-1.5 text-[10px] ${
                            active ? "bg-white/20" : "bg-card"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button asChild variant="brand" size="sm" className="rounded-xl">
                    <Link to="/shop">
                      <Plus className="mr-1.5 h-4 w-4" /> Track New Product
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={clearExpired}
                    disabled={!counts.expired}
                  >
                    <Trash2 className="mr-1.5 h-4 w-4" /> Clear expired
                  </Button>
                </div>
              </div>
            </div>

            {/* List or empty */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card sm:p-14">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand-soft text-primary">
                  <Boxes className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">
                  {items.length === 0 ? "No back-in-stock alerts yet" : "Nothing in this view"}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {items.length === 0
                    ? "Find a sold-out product and tap Notify Me — we'll ping you the second it's restocked."
                    : "Switch tabs above to view alerts in other states."}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <Button asChild variant="brand" className="rounded-xl">
                    <Link to="/shop">
                      <Plus className="mr-1.5 h-4 w-4" /> Browse Products
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link to="/account/wishlist">View Wishlist</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="space-y-4">
                {filtered.map((a) => {
                  const stm = statusMeta[a.status];
                  const isAvailable = a.status === "available";
                  return (
                    <li
                      key={a.id}
                      className={`relative overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift ${stm.tone}`}
                    >
                      {isAvailable && (
                        <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-l from-success to-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-soft">
                          ✓ Back in stock
                        </div>
                      )}

                      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
                        {/* Image */}
                        <Link
                          to={`/product/${a.id}`}
                          className="relative block h-28 w-full shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-28 sm:w-28"
                        >
                          <img
                            src={a.img}
                            alt={a.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                          {a.status === "expired" && (
                            <div className="absolute inset-0 grid place-items-center bg-foreground/40 backdrop-blur-[1px]">
                              <span className="rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-bold text-background">
                                EXPIRED
                              </span>
                            </div>
                          )}
                        </Link>

                        {/* Body */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${stm.cls}`}
                            >
                              <stm.Icon className="h-3 w-3" />
                              {stm.label}
                            </span>
                            {a.waitlistPosition && a.status === "active" && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-foreground">
                                #{a.waitlistPosition} in queue
                              </span>
                            )}
                            <span className="ml-auto text-[11px] font-medium text-muted-foreground">
                              {a.availableOn ?? a.expectedRestock ?? a.setOn}
                            </span>
                          </div>

                          <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                            {a.brand}
                          </div>
                          <Link
                            to={`/product/${a.id}`}
                            className="line-clamp-2 text-sm font-bold text-foreground hover:text-primary sm:text-base"
                          >
                            {a.name}
                          </Link>
                          <div className="truncate text-xs text-muted-foreground">{a.variant}</div>

                          {/* Price + meta */}
                          <div className="mt-3 flex flex-wrap items-end gap-3">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                Last known price
                              </div>
                              <div className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
                                {fmt(a.lastPrice)}
                              </div>
                            </div>
                            {isAvailable ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-1 text-xs font-bold text-success">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Ready to ship
                              </span>
                            ) : a.status === "active" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                                <Clock className="h-3.5 w-3.5" />
                                {a.expectedRestock ?? "Awaiting restock"}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                                <PackageX className="h-3.5 w-3.5" /> No longer tracked
                              </span>
                            )}
                          </div>

                          {/* Footer actions */}
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <Button
                              size="sm"
                              variant="brand"
                              className="h-9 rounded-xl"
                              disabled={!isAvailable}
                              onClick={() => addToCart(a)}
                            >
                              <ShoppingCart className="mr-1.5 h-4 w-4" />
                              {isAvailable ? "Add to Cart" : "Not available"}
                            </Button>
                            <Button asChild size="sm" variant="outline" className="h-9 rounded-xl">
                              <Link to={`/product/${a.id}`}>
                                <Eye className="mr-1.5 h-4 w-4" /> View Product
                              </Link>
                            </Button>
                            <div className="ml-auto flex items-center gap-3">
                              <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                                {a.enabled ? (
                                  <Bell className="h-3.5 w-3.5 text-primary" />
                                ) : (
                                  <BellOff className="h-3.5 w-3.5" />
                                )}
                                <span className="hidden sm:inline">
                                  {a.enabled ? "Alert on" : "Alert off"}
                                </span>
                                <Switch
                                  checked={a.enabled}
                                  onCheckedChange={() => toggle(a.id)}
                                  disabled={a.status === "expired"}
                                />
                              </label>
                              <Button
                                size="icon"
                                variant="ghost"
                                aria-label="Remove alert"
                                className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => remove(a.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Help card */}
            <div className="grid gap-4 rounded-2xl border border-border/70 bg-gradient-brand-soft p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-extrabold text-foreground">
                    How back-in-stock alerts work
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Cellexa watches inventory in real time and notifies you by email and in-app the moment a product is restocked. Alerts auto-expire after 60 days.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <ShieldCheck className="h-3 w-3 text-primary" /> Live inventory sync
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <Sparkles className="h-3 w-3 text-primary" /> Priority queue position
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="brand" size="sm" className="rounded-xl">
                  <Link to="/account/profile">Manage Preferences</Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl bg-card">
                  <MessageCircle className="mr-1.5 h-4 w-4" /> Contact Support
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

export default BackInStock;
