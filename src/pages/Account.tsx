import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Package,
  MapPin,
  Heart,
  Bell,
  Gift,
  Star,
  TrendingDown,
  Boxes,
  Undo2,
  ShieldCheck,
  Repeat,
  LogOut,
  ChevronRight,
  Eye,
  Truck,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Phone,
  ShoppingCart,
  Edit3,
  CheckCircle2,
  Crown,
  ArrowUpRight,
  Menu,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { AccountSidebarNav, AccountProfileCard } from "@/components/cellexa/AccountSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Account sidebar nav now lives in @/components/cellexa/AccountSidebar

const stats = [
  { label: "Active Orders", value: "3", icon: Package, tone: "primary", hint: "2 shipping today" },
  { label: "Wishlist", value: "12", icon: Heart, tone: "promo", hint: "2 on sale" },
  { label: "Loyalty Points", value: "2,480", icon: Gift, tone: "success", hint: "Gold tier" },
  { label: "Notifications", value: "5", icon: Bell, tone: "primary", hint: "3 new today" },
  { label: "Pending Returns", value: "1", icon: Undo2, tone: "warning", hint: "Awaiting pickup" },
  { label: "To Review", value: "4", icon: Star, tone: "promo", hint: "Earn 200 pts" },
];

const orders = [
  {
    id: "CLX-2024-008812",
    date: "18 Apr 2026",
    status: "In Transit",
    statusTone: "primary",
    items: 2,
    total: "LKR 384,500",
    eta: "Arrives Mon, 22 Apr",
  },
  {
    id: "CLX-2024-008764",
    date: "10 Apr 2026",
    status: "Delivered",
    statusTone: "success",
    items: 1,
    total: "LKR 42,990",
    eta: "Delivered 14 Apr",
  },
  {
    id: "CLX-2024-008701",
    date: "02 Apr 2026",
    status: "Processing",
    statusTone: "warning",
    items: 3,
    total: "LKR 128,750",
    eta: "Ships in 1-2 days",
  },
];

const wishlist = [
  {
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: "LKR 489,990",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&q=80",
    inStock: true,
  },
  {
    name: "Galaxy Buds3 Pro",
    brand: "Samsung",
    price: "LKR 38,500",
    img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&q=80",
    inStock: true,
  },
  {
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: "LKR 124,900",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80",
    inStock: false,
  },
];

const notifications = [
  {
    icon: TrendingDown,
    tone: "promo",
    title: "Price drop on iPhone 15 Pro Max",
    text: "Now LKR 489,990 — saved LKR 18,000",
    time: "2h ago",
  },
  {
    icon: Boxes,
    tone: "success",
    title: "Sony WH-1000XM5 back in stock",
    text: "Available in Silver and Black",
    time: "Yesterday",
  },
  {
    icon: Truck,
    tone: "primary",
    title: "Order CLX-2024-008812 shipped",
    text: "Out for delivery — arriving Monday",
    time: "2 days ago",
  },
];

const shortcuts = [
  { icon: Edit3, label: "Edit Profile", to: "/account/profile" },
  { icon: Truck, label: "Track Orders", to: "/account" },
  { icon: Heart, label: "Manage Wishlist", to: "/account" },
  { icon: Undo2, label: "View Returns", to: "/account" },
  { icon: ShieldCheck, label: "Warranty Claim", to: "/account" },
  { icon: Repeat, label: "Trade-In", to: "/account" },
];

const toneClasses: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  promo: "bg-promo/10 text-promo",
  success: "bg-emerald-500/10 text-emerald-600",
  warning: "bg-warning/15 text-warning-foreground",
};

const statusClasses: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-600",
  warning: "bg-warning/20 text-foreground",
};

// Sidebar nav comes from shared AccountSidebar component

const Account = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="bg-gradient-to-b from-background to-secondary/40 pb-16">
        <div className="container-page pt-6 sm:pt-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-foreground">My Account</span>
          </nav>

          {/* Page header */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                My Account
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Manage orders, wishlist, rewards, and your Nexzon profile in one place.
              </p>
            </div>

            {/* Mobile nav trigger */}
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
                <AccountSidebarNav onNavigate={() => setMobileNavOpen(false)} activePath="/account" />
              </SheetContent>
            </Sheet>
          </div>

          {/* Layout */}
          <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
            {/* Sidebar (desktop) */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 space-y-4">
                <AccountProfileCard />
                <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card">
                  <AccountSidebarNav activePath="/account" />
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="space-y-6 lg:col-span-9">
              {/* Welcome hero */}
              <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-card sm:p-8">
                <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/5 blur-2xl" />

                <div className="relative grid gap-6 sm:grid-cols-5 sm:items-center">
                  <div className="sm:col-span-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      Welcome back
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
                      Hi Nuwan 👋 <br className="hidden sm:block" />
                      <span className="text-primary">You have 3 active orders</span> in motion.
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Track shipments, redeem points, or pick up where you left off shopping.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm">
                        <Truck className="h-4 w-4" /> Track Orders
                      </Button>
                      <Button variant="outline" size="sm">
                        <ShoppingCart className="h-4 w-4" /> Continue Shopping
                      </Button>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="rounded-2xl border border-border/70 bg-surface p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-primary" />
                          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                            Gold Tier
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">2,480 pts</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full w-[68%] rounded-full bg-primary" />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        520 points to <span className="font-bold text-primary">Platinum</span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Stats */}
              <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border/70 bg-card p-4 shadow-card transition-shadow hover:shadow-lift"
                  >
                    <div className={`grid h-9 w-9 place-items-center rounded-lg ${toneClasses[s.tone]}`}>
                      <s.icon className="h-4 w-4" />
                    </div>
                    <div className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
                      {s.value}
                    </div>
                    <div className="text-xs font-semibold text-foreground">{s.label}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{s.hint}</div>
                  </div>
                ))}
              </section>

              {/* Recent orders */}
              <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-extrabold tracking-tight">
                      Recent Orders
                    </h3>
                    <p className="text-xs text-muted-foreground">Your latest 3 purchases</p>
                  </div>
                  <Link
                    to="/account/orders"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    View all <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="mt-4 space-y-3">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background p-4 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                          <Package className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-sm font-bold text-foreground">
                              {o.id}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusClasses[o.statusTone]}`}
                            >
                              {o.status}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {o.date} · {o.items} {o.items === 1 ? "item" : "items"} · {o.eta}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <div className="text-right">
                          <div className="font-display text-base font-extrabold text-foreground">
                            {o.total}
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                          <Button variant="default" size="sm">
                            <Truck className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Track</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Wishlist + Loyalty grid */}
              <section className="grid gap-6 lg:grid-cols-3">
                {/* Wishlist */}
                <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-extrabold tracking-tight">
                        Wishlist Snapshot
                      </h3>
                      <p className="text-xs text-muted-foreground">12 saved items</p>
                    </div>
                    <Link
                      to="/account"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      Manage <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="mt-4 space-y-3">
                    {wishlist.map((w) => (
                      <div
                        key={w.name}
                        className="flex items-center gap-3 rounded-xl border border-border/70 bg-background p-3 transition-colors hover:border-primary/40"
                      >
                        <img
                          src={w.img}
                          alt={w.name}
                          className="h-14 w-14 shrink-0 rounded-lg border border-border/70 object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-bold text-foreground">
                            {w.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{w.brand}</div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-sm font-extrabold text-primary">{w.price}</span>
                            {w.inStock ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                                <CheckCircle2 className="h-3 w-3" /> In stock
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-destructive">
                                Out of stock
                              </span>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" disabled={!w.inStock}>
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">
                            {w.inStock ? "Add to cart" : "Notify me"}
                          </span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Loyalty */}
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card">
                  <div className="relative bg-gradient-deep p-6 text-primary-foreground">
                    <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
                    <div className="relative">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                        <Crown className="h-4 w-4 text-primary-glow" /> Loyalty
                      </div>
                      <div className="mt-3 font-display text-4xl font-extrabold tracking-tight">
                        2,480
                      </div>
                      <div className="text-xs text-primary-foreground/85">Nexzon Points</div>

                      <div className="mt-5">
                        <div className="flex items-center justify-between text-[11px] font-semibold">
                          <span>Gold</span>
                          <span className="text-primary-glow">Platinum</span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/20">
                          <div className="h-full w-[68%] rounded-full bg-primary-glow" />
                        </div>
                        <p className="mt-2 text-xs text-primary-foreground/85">
                          520 points to next tier
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Gift className="mt-0.5 h-3.5 w-3.5 text-primary" />
                      Redeem points for accessories or shipping discounts.
                    </div>
                    <Button variant="brand" size="sm" className="w-full">
                      View Rewards
                    </Button>
                  </div>
                </div>
              </section>

              {/* Notifications + Shortcuts */}
              <section className="grid gap-6 lg:grid-cols-3">
                {/* Notifications */}
                <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-extrabold tracking-tight">
                        Alerts & Notifications
                      </h3>
                      <p className="text-xs text-muted-foreground">Stay on top of deals & orders</p>
                    </div>
                    <Link
                      to="/account"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      View all <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="mt-4 space-y-3">
                    {notifications.map((n, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-border/70 bg-background p-4 transition-colors hover:border-primary/40"
                      >
                        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${toneClasses[n.tone]}`}>
                          <n.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <div className="text-sm font-bold text-foreground">{n.title}</div>
                            <span className="text-[11px] text-muted-foreground">{n.time}</span>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">{n.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shortcuts */}
                <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                  <h3 className="font-display text-lg font-extrabold tracking-tight">
                    Quick Actions
                  </h3>
                  <p className="text-xs text-muted-foreground">Account shortcuts</p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {shortcuts.map((s) => (
                      <Link
                        key={s.label}
                        to={s.to}
                        className="group flex flex-col items-start gap-2 rounded-xl border border-border/70 bg-background p-3 transition-colors hover:border-primary/40 hover:bg-accent/40"
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <s.icon className="h-4 w-4" />
                        </span>
                        <span className="text-xs font-semibold text-foreground">{s.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* Support card */}
              <section className="overflow-hidden rounded-2xl border border-border/70 bg-gradient-brand-soft p-6 shadow-card sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lift">
                      <HelpCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                        Need a hand with your account?
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Our Colombo support team is online 7 days a week to help with orders,
                        warranty, and trade-ins.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="lg">
                      <HelpCircle className="h-4 w-4" /> FAQ
                    </Button>
                    <Button variant="outline" size="lg">
                      <Phone className="h-4 w-4" /> Call
                    </Button>
                    <Button variant="brand" size="lg">
                      <MessageCircle className="h-4 w-4" /> Live Chat
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
