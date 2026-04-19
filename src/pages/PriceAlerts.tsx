import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  TrendingDown,
  TrendingUp,
  Bell,
  BellOff,
  Trash2,
  Eye,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Clock,
  PackageX,
  Sparkles,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Plus,
  Target,
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

type Status = "active" | "triggered" | "expired";
type Stock = "in" | "low" | "out";

interface Alert {
  id: string;
  brand: string;
  name: string;
  variant: string;
  img: string;
  current: number;
  previous: number;
  target: number;
  status: Status;
  stock: Stock;
  enabled: boolean;
  setOn: string;
  triggeredOn?: string;
}

const INITIAL: Alert[] = [
  {
    id: "a1",
    brand: "Sony",
    name: "WH-1000XM5 Wireless Headphones",
    variant: "Midnight Black",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=480&q=80",
    current: 112000,
    previous: 124000,
    target: 115000,
    status: "triggered",
    stock: "in",
    enabled: true,
    setOn: "Set 02 Apr",
    triggeredOn: "Triggered 1 hour ago",
  },
  {
    id: "a2",
    brand: "Apple",
    name: "iPhone 15 Pro Max 256GB",
    variant: "Natural Titanium",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=480&q=80",
    current: 365000,
    previous: 389000,
    target: 350000,
    status: "active",
    stock: "in",
    enabled: true,
    setOn: "Set 12 Apr",
  },
  {
    id: "a3",
    brand: "Samsung",
    name: "Galaxy S24 Ultra 512GB",
    variant: "Titanium Black",
    img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=480&q=80",
    current: 332000,
    previous: 332000,
    target: 310000,
    status: "active",
    stock: "low",
    enabled: true,
    setOn: "Set 09 Apr",
  },
  {
    id: "a4",
    brand: "Apple",
    name: 'iPad Air 11" M2 128GB Wi-Fi',
    variant: "Space Gray",
    img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=480&q=80",
    current: 218000,
    previous: 225000,
    target: 200000,
    status: "active",
    stock: "in",
    enabled: false,
    setOn: "Set 28 Mar",
  },
  {
    id: "a5",
    brand: "Google",
    name: "Pixel 8 Pro 256GB",
    variant: "Bay Blue",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=480&q=80",
    current: 198000,
    previous: 215000,
    target: 195000,
    status: "triggered",
    stock: "out",
    enabled: false,
    setOn: "Set 22 Mar",
    triggeredOn: "Triggered 2 days ago",
  },
  {
    id: "a6",
    brand: "OnePlus",
    name: "OnePlus 12R 5G 256GB",
    variant: "Cool Blue",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=480&q=80",
    current: 142000,
    previous: 158000,
    target: 130000,
    status: "expired",
    stock: "in",
    enabled: false,
    setOn: "Set 04 Feb",
  },
];

const fmt = (n: number) =>
  `LKR ${n.toLocaleString("en-LK", { minimumFractionDigits: 0 })}`;

const stockMeta: Record<Stock, { label: string; cls: string; Icon: LucideIcon }> = {
  in: { label: "In Stock", cls: "bg-success/15 text-success", Icon: CheckCircle2 },
  low: { label: "Low Stock", cls: "bg-warning/20 text-warning", Icon: AlertCircle },
  out: { label: "Out of Stock", cls: "bg-destructive/15 text-destructive", Icon: PackageX },
};

const statusMeta: Record<
  Status,
  { label: string; cls: string; Icon: LucideIcon; tone: string }
> = {
  active: {
    label: "Active",
    cls: "bg-primary/12 text-primary",
    Icon: Bell,
    tone: "border-primary/20",
  },
  triggered: {
    label: "Triggered",
    cls: "bg-success/15 text-success",
    Icon: TrendingDown,
    tone: "border-success/30",
  },
  expired: {
    label: "Expired",
    cls: "bg-muted text-muted-foreground",
    Icon: Clock,
    tone: "border-border",
  },
};

const PriceAlerts = () => {
  const [items, setItems] = useState<Alert[]>(INITIAL);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | Status>("all");

  const counts = useMemo(
    () => ({
      all: items.length,
      active: items.filter((i) => i.status === "active").length,
      triggered: items.filter((i) => i.status === "triggered").length,
      expired: items.filter((i) => i.status === "expired").length,
    }),
    [items],
  );

  const totalSavings = useMemo(
    () =>
      items
        .filter((i) => i.status === "triggered")
        .reduce((s, i) => s + Math.max(i.previous - i.current, 0), 0),
    [items],
  );

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter],
  );

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    );
  };
  const remove = (id: string) => {
    setItems((prev) => prev.filter((a) => a.id !== id));
    toast.success("Alert removed");
  };
  const clearTriggered = () => {
    setItems((prev) => prev.filter((a) => a.status !== "triggered"));
    toast.success("Triggered alerts cleared");
  };
  const addToCart = (a: Alert) => {
    if (a.stock === "out") return toast.error("Out of stock");
    toast.success(`${a.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="bg-gradient-to-b from-background to-secondary/40 pb-16">
        <div className="container-page pt-6 sm:pt-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/account" className="hover:text-primary">My Account</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-foreground">Price Drop Alerts</span>
          </nav>

          {/* Page header */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Price Drop Alerts
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Track Cellexa products and get notified the moment prices fall in Sri Lanka.
              </p>
            </div>

            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                  Account Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto p-6">
                <div className="mb-6">
                  <p className="font-display text-lg font-extrabold">Account</p>
                </div>
                <AccountSidebarNav
                  onNavigate={() => setMobileNavOpen(false)}
                  activePath="/account/price-alerts"
                />
              </SheetContent>
            </Sheet>
          </div>

          <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 space-y-4">
                <AccountProfileCard />
                <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card">
                  <AccountSidebarNav activePath="/account/price-alerts" />
                </div>
              </div>
            </aside>

            {/* Main */}
            <section className="space-y-6 lg:col-span-9">
            {/* Toolbar */}
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { k: "all", label: "All", count: counts.all },
                      { k: "active", label: "Active", count: counts.active },
                      { k: "triggered", label: "Triggered", count: counts.triggered },
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
                      <Plus className="mr-1.5 h-4 w-4" /> New Alert
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={clearTriggered}
                    disabled={!counts.triggered}
                  >
                    <Trash2 className="mr-1.5 h-4 w-4" /> Clear triggered
                  </Button>
                </div>
              </div>
            </div>

            {/* List or empty */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card sm:p-14">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand-soft text-primary">
                  <TrendingDown className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">
                  {items.length === 0 ? "No price alerts yet" : "Nothing in this view"}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {items.length === 0
                    ? "Browse Cellexa, set a target price on any product, and we'll notify you the second it drops."
                    : "Switch tabs above to see other alerts."}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <Button asChild variant="brand" className="rounded-xl">
                    <Link to="/shop">
                      <Plus className="mr-1.5 h-4 w-4" /> Browse &amp; Track
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
                  const drop = a.previous - a.current;
                  const dropPct = a.previous
                    ? Math.round((drop / a.previous) * 100)
                    : 0;
                  const dropped = drop > 0;
                  const targetMet = a.current <= a.target;
                  const sm = stockMeta[a.stock];
                  const stm = statusMeta[a.status];
                  const distanceToTarget = a.current - a.target;
                  const targetProgress = Math.min(
                    100,
                    Math.max(
                      0,
                      ((a.previous - a.current) / Math.max(a.previous - a.target, 1)) * 100,
                    ),
                  );

                  return (
                    <li
                      key={a.id}
                      className={`relative overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift ${stm.tone}`}
                    >
                      {a.status === "triggered" && (
                        <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-l from-success to-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-soft">
                          🎉 Price drop hit
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
                          {dropped && (
                            <span className="absolute left-2 top-2 rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-bold text-background">
                              -{dropPct}%
                            </span>
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
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${sm.cls}`}
                            >
                              <sm.Icon className="h-3 w-3" /> {sm.label}
                            </span>
                            <span className="ml-auto text-[11px] font-medium text-muted-foreground">
                              {a.triggeredOn ?? a.setOn}
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

                          {/* Price block */}
                          <div className="mt-3 flex flex-wrap items-end gap-3">
                            <div>
                              <div className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
                                {fmt(a.current)}
                              </div>
                              {dropped && (
                                <div className="text-xs text-muted-foreground line-through">
                                  was {fmt(a.previous)}
                                </div>
                              )}
                            </div>
                            {dropped && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-1 text-xs font-bold text-success">
                                <TrendingDown className="h-3.5 w-3.5" />
                                Save {fmt(drop)}
                              </span>
                            )}
                            {!dropped && a.status === "active" && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-bold text-muted-foreground">
                                <TrendingUp className="h-3.5 w-3.5" /> Holding price
                              </span>
                            )}
                          </div>



                          {/* Footer actions */}
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <Button
                              size="sm"
                              variant="brand"
                              className="h-9 rounded-xl"
                              disabled={a.stock === "out"}
                              onClick={() => addToCart(a)}
                            >
                              <ShoppingCart className="mr-1.5 h-4 w-4" /> Add to Cart
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
                    How price alerts work
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Cellexa monitors prices every hour and notifies you by email and in-app the moment your target is reached. Alerts auto-expire after 90 days.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <ShieldCheck className="h-3 w-3 text-primary" /> Hourly checks
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <Sparkles className="h-3 w-3 text-primary" /> Real-time notifications
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PriceAlerts;
