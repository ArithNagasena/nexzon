import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Bell,
  Package,
  Truck,
  Tag,
  TrendingDown,
  Boxes,
  Gift,
  Megaphone,
  CheckCircle2,
  Check,
  Trash2,
  Settings,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Filter,
  Inbox,
  Star,
  ArrowRight,
  type LucideIcon,
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

type NotifCategory = "orders" | "promotions" | "alerts";
type NotifType =
  | "order_placed"
  | "order_shipped"
  | "order_delivered"
  | "preorder"
  | "promo"
  | "price_drop"
  | "back_in_stock"
  | "loyalty"
  | "review";

interface Notif {
  id: string;
  type: NotifType;
  category: NotifCategory;
  title: string;
  message: string;
  time: string;
  read: boolean;
  pinned?: boolean;
  cta?: { label: string; to: string };
  thumb?: string;
}

const TYPE_META: Record<
  NotifType,
  { Icon: LucideIcon; tag: string; tone: string; ring: string }
> = {
  order_placed: {
    Icon: Package,
    tag: "Order",
    tone: "bg-primary/12 text-primary",
    ring: "ring-primary/20",
  },
  order_shipped: {
    Icon: Truck,
    tag: "Shipped",
    tone: "bg-primary/12 text-primary",
    ring: "ring-primary/20",
  },
  order_delivered: {
    Icon: CheckCircle2,
    tag: "Delivered",
    tone: "bg-success/15 text-success",
    ring: "ring-success/25",
  },
  preorder: {
    Icon: Boxes,
    tag: "Pre-Order",
    tone: "bg-primary/12 text-primary",
    ring: "ring-primary/20",
  },
  promo: {
    Icon: Megaphone,
    tag: "Promotion",
    tone: "bg-promo/15 text-promo",
    ring: "ring-promo/25",
  },
  price_drop: {
    Icon: TrendingDown,
    tag: "Price Drop",
    tone: "bg-warning/20 text-warning",
    ring: "ring-warning/30",
  },
  back_in_stock: {
    Icon: Boxes,
    tag: "Back in Stock",
    tone: "bg-success/15 text-success",
    ring: "ring-success/25",
  },
  loyalty: {
    Icon: Gift,
    tag: "Rewards",
    tone: "bg-primary/12 text-primary",
    ring: "ring-primary/20",
  },
  review: {
    Icon: Star,
    tag: "Review",
    tone: "bg-warning/20 text-warning",
    ring: "ring-warning/30",
  },
};

const INITIAL: Notif[] = [
  {
    id: "n-001",
    type: "order_shipped",
    category: "orders",
    title: "Your order CLX-2024-008812 has shipped",
    message:
      "Pronto Express picked up your iPhone 15 Pro Max bundle. Estimated delivery: Mon, 22 Apr.",
    time: "12 min ago",
    read: false,
    pinned: true,
    cta: { label: "Track Order", to: "/track-order" },
    thumb:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=160&q=80",
  },
  {
    id: "n-002",
    type: "price_drop",
    category: "alerts",
    title: "Price drop on Sony WH-1000XM5",
    message:
      "Now LKR 112,000 — down LKR 8,000 from your wishlist price. Limited time at Cellexa.",
    time: "1 hour ago",
    read: false,
    cta: { label: "View Deal", to: "/product/p-sony-wh1000" },
    thumb:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=160&q=80",
  },
  {
    id: "n-003",
    type: "back_in_stock",
    category: "alerts",
    title: "Pixel 8 Pro is back in stock",
    message:
      "Bay Blue 256GB is available again. Order before 5 PM for next-day delivery in Colombo.",
    time: "3 hours ago",
    read: false,
    cta: { label: "Buy Now", to: "/product/p-pixel-8" },
    thumb:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=160&q=80",
  },
  {
    id: "n-004",
    type: "promo",
    category: "promotions",
    title: "Avurudu Festive Sale — up to 25% off",
    message:
      "Smartphones, audio, and laptops on offer until Sunday midnight. Plus free island-wide delivery on orders over LKR 25,000.",
    time: "Yesterday",
    read: false,
    cta: { label: "Shop Sale", to: "/shop" },
  },
  {
    id: "n-005",
    type: "order_delivered",
    category: "orders",
    title: "Order CLX-2024-008756 delivered",
    message:
      "Your AirPods Pro (2nd Gen) has been delivered. Tap to leave a quick review and earn 50 reward points.",
    time: "2 days ago",
    read: true,
    cta: { label: "Write Review", to: "/account/orders/CLX-2024-008756" },
    thumb:
      "https://images.unsplash.com/photo-1606220588911-5117e04b71ae?w=160&q=80",
  },
  {
    id: "n-006",
    type: "preorder",
    category: "orders",
    title: "Apple Watch Ultra 2 pre-order confirmed",
    message:
      "Estimated dispatch: 02 May 2026. We will notify you the moment it ships.",
    time: "3 days ago",
    read: true,
    cta: { label: "View Pre-Order", to: "/account/orders" },
  },
  {
    id: "n-007",
    type: "loyalty",
    category: "promotions",
    title: "You earned 240 Cellexa Reward points",
    message:
      "You're 260 points away from Platinum tier — unlock free express delivery and early sale access.",
    time: "5 days ago",
    read: true,
    cta: { label: "View Rewards", to: "/account" },
  },
  {
    id: "n-008",
    type: "review",
    category: "alerts",
    title: "How was your Galaxy S24 Ultra?",
    message:
      "Share your experience to help fellow shoppers across Sri Lanka.",
    time: "1 week ago",
    read: true,
    cta: { label: "Rate Product", to: "/product/p-galaxy-s24" },
  },
];

const Notifications = () => {
  const [items, setItems] = useState<Notif[]>(INITIAL);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | NotifCategory>("all");

  const counts = useMemo(
    () => ({
      all: items.length,
      unread: items.filter((i) => !i.read).length,
      orders: items.filter((i) => i.category === "orders").length,
      promotions: items.filter((i) => i.category === "promotions").length,
      alerts: items.filter((i) => i.category === "alerts").length,
    }),
    [items],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "unread") return items.filter((i) => !i.read);
    return items.filter((i) => i.category === filter);
  }, [items, filter]);

  const toggleRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  };
  const remove = (id: string) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification removed");
  };
  const markAllRead = () => {
    if (!counts.unread) return;
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };
  const clearAll = () => {
    setItems([]);
    toast.success("Notifications cleared");
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
          <span className="font-semibold text-foreground">Notifications</span>
        </nav>

        {/* Page header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Notifications
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              {counts.unread > 0 ? (
                <>
                  You have{" "}
                  <span className="font-semibold text-primary">
                    {counts.unread} unread
                  </span>{" "}
                  update{counts.unread !== 1 ? "s" : ""} from Cellexa.
                </>
              ) : (
                "You're all caught up — no unread notifications."
              )}
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
          {/* Sidebar */}
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
            {/* Toolbar */}
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { k: "all", label: "All", count: counts.all },
                      { k: "unread", label: "Unread", count: counts.unread },
                      { k: "orders", label: "Orders", count: counts.orders },
                      {
                        k: "promotions",
                        label: "Promotions",
                        count: counts.promotions,
                      },
                      { k: "alerts", label: "Alerts", count: counts.alerts },
                    ] as {
                      k: "all" | "unread" | NotifCategory;
                      label: string;
                      count: number;
                    }[]
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
                  <Button
                    variant="brand"
                    size="sm"
                    className="rounded-xl"
                    onClick={markAllRead}
                    disabled={!counts.unread}
                  >
                    <Check className="mr-1.5 h-4 w-4" /> Mark all read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    asChild
                  >
                    <Link to="/account/profile">
                      <Settings className="mr-1.5 h-4 w-4" /> Preferences
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={clearAll}
                    disabled={!items.length}
                  >
                    <Trash2 className="mr-1.5 h-4 w-4" /> Clear
                  </Button>
                </div>
              </div>
            </div>

            {/* List or empty */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card sm:p-14">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand-soft text-primary">
                  <Inbox className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">
                  {items.length === 0
                    ? "No notifications yet"
                    : "Nothing in this view"}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {items.length === 0
                    ? "We'll let you know about order updates, price drops, restocks, and Cellexa promos here."
                    : "Switch tabs above to see other notifications."}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <Button asChild variant="brand" className="rounded-xl">
                    <Link to="/shop">
                      <ArrowRight className="mr-1.5 h-4 w-4" /> Browse Shop
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link to="/account/profile">
                      <Settings className="mr-1.5 h-4 w-4" /> Notification Settings
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card">
                <ul className="divide-y divide-border/70">
                  {filtered.map((n) => {
                    const meta = TYPE_META[n.type];
                    const Icon = meta.Icon;
                    return (
                      <li
                        key={n.id}
                        className={`group relative flex gap-3 p-4 transition hover:bg-secondary/40 sm:gap-4 sm:p-5 ${
                          !n.read ? "bg-primary/[0.03]" : ""
                        }`}
                      >
                        {!n.read && (
                          <span className="absolute left-0 top-0 h-full w-1 bg-primary" />
                        )}

                        {/* Icon / thumb */}
                        <div className="relative shrink-0">
                          {n.thumb ? (
                            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-secondary sm:h-14 sm:w-14">
                              <img
                                src={n.thumb}
                                alt=""
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                              <span
                                className={`absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full ring-2 ring-card ${meta.tone}`}
                              >
                                <Icon className="h-3 w-3" />
                              </span>
                            </div>
                          ) : (
                            <div
                              className={`grid h-12 w-12 place-items-center rounded-xl ring-1 sm:h-14 sm:w-14 ${meta.tone} ${meta.ring}`}
                            >
                              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                          )}
                        </div>

                        {/* Body */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.tone}`}
                            >
                              {meta.tag}
                            </span>
                            {n.pinned && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning">
                                <Bell className="h-2.5 w-2.5" /> Pinned
                              </span>
                            )}
                            {!n.read && (
                              <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                            )}
                            <span className="ml-auto text-[11px] font-medium text-muted-foreground">
                              {n.time}
                            </span>
                          </div>

                          <h3
                            className={`mt-1.5 text-sm leading-snug sm:text-[15px] ${
                              n.read
                                ? "font-semibold text-foreground/85"
                                : "font-bold text-foreground"
                            }`}
                          >
                            {n.title}
                          </h3>
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                            {n.message}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {n.cta && (
                              <Button
                                asChild
                                size="sm"
                                variant="brand"
                                className="h-8 rounded-lg text-xs"
                              >
                                <Link to={n.cta.to}>
                                  {n.cta.label}
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 rounded-lg text-xs text-muted-foreground hover:text-foreground"
                              onClick={() => toggleRead(n.id)}
                            >
                              <Check className="mr-1 h-3 w-3" />
                              {n.read ? "Mark unread" : "Mark as read"}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 rounded-lg text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => remove(n.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" /> Remove
                            </Button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Quick links */}
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  Icon: TrendingDown,
                  label: "Price Alerts",
                  desc: "Manage tracked products",
                  to: "/account",
                },
                {
                  Icon: Boxes,
                  label: "Back-in-Stock",
                  desc: "Pending restock alerts",
                  to: "/account",
                },
                {
                  Icon: Tag,
                  label: "Promotions",
                  desc: "Active offers for you",
                  to: "/shop",
                },
              ].map((q) => (
                <Link
                  key={q.label}
                  to={q.to}
                  className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand-soft text-primary">
                    <q.Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-foreground">{q.label}</div>
                    <div className="truncate text-xs text-muted-foreground">{q.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              ))}
            </div>

            {/* Help card */}
            <div className="grid gap-4 rounded-2xl border border-border/70 bg-gradient-brand-soft p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-extrabold text-foreground">
                    Notification preferences
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Choose how Cellexa reaches you — email, SMS, or in-app — for orders, deals, and stock alerts across Sri Lanka.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <ShieldCheck className="h-3 w-3 text-primary" /> Spam-free updates
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <Bell className="h-3 w-3 text-primary" /> Real-time alerts
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="brand" size="sm" className="rounded-xl">
                  <Link to="/account/profile">
                    <Settings className="mr-1.5 h-4 w-4" /> Manage Preferences
                  </Link>
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

export default Notifications;
