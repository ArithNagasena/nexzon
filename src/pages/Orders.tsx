import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Search,
  Package,
  Truck,
  Eye,
  RotateCcw,
  Filter,
  Calendar,
  ShoppingBag,
  HelpCircle,
  MessageCircle,
  Phone,
  CheckCircle2,
  Clock,
  XCircle,
  Inbox,
  Download,
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

type OrderStatus =
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

interface OrderItem {
  name: string;
  img: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  itemCount: number;
  total: string;
  payment: string;
  eta: string;
  items: OrderItem[];
}

const ORDERS: Order[] = [
  {
    id: "CLX-2024-008812",
    date: "18 Apr 2026",
    status: "Shipped",
    itemCount: 2,
    total: "LKR 384,500",
    payment: "Visa •• 4821",
    eta: "Arrives Mon, 22 Apr",
    items: [
      { name: "iPhone 15 Pro Max 256GB", img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=160&q=80" },
      { name: "MagSafe Charger", img: "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?w=160&q=80" },
    ],
  },
  {
    id: "CLX-2024-008764",
    date: "10 Apr 2026",
    status: "Delivered",
    itemCount: 1,
    total: "LKR 42,990",
    payment: "Cash on Delivery",
    eta: "Delivered 14 Apr",
    items: [
      { name: "Galaxy Buds3 Pro", img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=160&q=80" },
    ],
  },
  {
    id: "CLX-2024-008701",
    date: "02 Apr 2026",
    status: "Processing",
    itemCount: 3,
    total: "LKR 128,750",
    payment: "Mastercard •• 9142",
    eta: "Ships in 1–2 days",
    items: [
      { name: "Sony WH-1000XM5", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=160&q=80" },
      { name: "JBL Charge 5", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=160&q=80" },
      { name: "Anker PowerCore", img: "https://images.unsplash.com/photo-1609592394281-c1d3a3b1f88c?w=160&q=80" },
    ],
  },
  {
    id: "CLX-2024-008552",
    date: "21 Mar 2026",
    status: "Delivered",
    itemCount: 2,
    total: "LKR 215,400",
    payment: "Visa •• 4821",
    eta: "Delivered 25 Mar",
    items: [
      { name: "iPad Air M2 11\"", img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=160&q=80" },
      { name: "Apple Pencil Pro", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=160&q=80" },
    ],
  },
  {
    id: "CLX-2024-008410",
    date: "08 Mar 2026",
    status: "Cancelled",
    itemCount: 1,
    total: "LKR 64,500",
    payment: "Refunded to Visa",
    eta: "Cancelled by customer",
    items: [
      { name: "Xiaomi 14T Pro", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&q=80" },
    ],
  },
  {
    id: "CLX-2024-008337",
    date: "27 Feb 2026",
    status: "Delivered",
    itemCount: 4,
    total: "LKR 18,900",
    payment: "FriMi Wallet",
    eta: "Delivered 02 Mar",
    items: [
      { name: "USB-C Cables 2m", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=160&q=80" },
      { name: "Tempered Glass", img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=160&q=80" },
      { name: "20W Charger", img: "https://images.unsplash.com/photo-1609592394281-c1d3a3b1f88c?w=160&q=80" },
      { name: "Phone Stand", img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=160&q=80" },
    ],
  },
];

const TABS: { key: "All" | OrderStatus; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Processing", label: "Processing" },
  { key: "Shipped", label: "Shipped" },
  { key: "Delivered", label: "Delivered" },
  { key: "Cancelled", label: "Cancelled" },
];

const statusBadge: Record<OrderStatus, { cls: string; icon: typeof Clock }> = {
  Processing: { cls: "bg-warning/20 text-foreground", icon: Clock },
  Shipped: { cls: "bg-primary/10 text-primary", icon: Truck },
  Delivered: { cls: "bg-emerald-500/10 text-emerald-600", icon: CheckCircle2 },
  Cancelled: { cls: "bg-destructive/10 text-destructive", icon: XCircle },
};

const Orders = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"All" | OrderStatus>("All");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: ORDERS.length };
    for (const o of ORDERS) map[o.status] = (map[o.status] ?? 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(() => {
    return ORDERS.filter((o) => {
      const matchTab = activeTab === "All" || o.status === activeTab;
      const matchSearch =
        !search.trim() || o.id.toLowerCase().includes(search.trim().toLowerCase());
      return matchTab && matchSearch;
    });
  }, [activeTab, search]);

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
            <span className="font-semibold text-foreground">Orders</span>
          </nav>

          {/* Page header */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                My Orders
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Track shipments, reorder favorites, and download invoices for past purchases.
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
                  activePath="/account/orders"
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
                  <AccountSidebarNav activePath="/account/orders" />
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="space-y-6 lg:col-span-9">
              {/* Toolbar */}
              <section className="rounded-2xl border border-border/70 bg-card p-4 shadow-card sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Tabs */}
                  <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {TABS.map((t) => {
                      const active = activeTab === t.key;
                      return (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setActiveTab(t.key)}
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                            active
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                          }`}
                        >
                          {t.label}
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                              active
                                ? "bg-primary-foreground/20 text-primary-foreground"
                                : "bg-background text-foreground"
                            }`}
                          >
                            {counts[t.key] ?? 0}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                </div>
              </section>

              {/* Orders list */}
              {filtered.length === 0 ? (
                <section className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Inbox className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight">
                    No orders found
                  </h3>
                  <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
                    {search.trim()
                      ? `We couldn't find any orders matching "${search}". Try a different number or clear filters.`
                      : `You don't have any ${activeTab !== "All" ? activeTab.toLowerCase() : ""} orders yet. Start exploring our latest tech to fill it up!`}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    {(search.trim() || activeTab !== "All") && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearch("");
                          setActiveTab("All");
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                    <Button variant="brand" asChild>
                      <Link to="/shop">
                        <ShoppingBag className="h-4 w-4" />
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>
                </section>
              ) : (
                <section className="space-y-4">
                  {filtered.map((o) => {
                    const Badge = statusBadge[o.status];
                    return (
                      <article
                        key={o.id}
                        className="rounded-2xl border border-border/70 bg-card shadow-card transition-shadow hover:shadow-lift"
                      >
                        {/* Top meta */}
                        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-3.5">
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                            <div>
                              <span className="block text-[10px] font-bold uppercase tracking-wider">
                                Order
                              </span>
                              <span className="font-mono text-sm font-bold text-foreground">
                                {o.id}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[10px] font-bold uppercase tracking-wider">
                                Placed
                              </span>
                              <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                {o.date}
                              </span>
                            </div>
                            <div className="hidden sm:block">
                              <span className="block text-[10px] font-bold uppercase tracking-wider">
                                Total
                              </span>
                              <span className="text-sm font-extrabold text-foreground">
                                {o.total}
                              </span>
                            </div>
                            <div className="hidden md:block">
                              <span className="block text-[10px] font-bold uppercase tracking-wider">
                                Payment
                              </span>
                              <span className="text-sm font-semibold text-foreground">
                                {o.payment}
                              </span>
                            </div>
                          </div>

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${Badge.cls}`}
                          >
                            <Badge.icon className="h-3 w-3" />
                            {o.status}
                          </span>
                        </header>

                        {/* Body */}
                        <div className="grid gap-4 p-5 sm:grid-cols-12 sm:items-center">
                          {/* Thumbnails */}
                          <div className="sm:col-span-5">
                            <div className="flex items-center -space-x-2">
                              {o.items.slice(0, 4).map((it, i) => (
                                <img
                                  key={i}
                                  src={it.img}
                                  alt={it.name}
                                  loading="lazy"
                                  className="h-14 w-14 rounded-xl border-2 border-card object-cover shadow-sm"
                                />
                              ))}
                              {o.items.length > 4 && (
                                <span className="grid h-14 w-14 place-items-center rounded-xl border-2 border-card bg-secondary text-xs font-bold text-foreground shadow-sm">
                                  +{o.items.length - 4}
                                </span>
                              )}
                            </div>
                            <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                              {o.items.map((i) => i.name).join(" · ")}
                            </p>
                          </div>

                          {/* Meta */}
                          <div className="sm:col-span-3">
                            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {o.itemCount} {o.itemCount === 1 ? "item" : "items"}
                            </div>
                            <div className="mt-0.5 text-sm font-semibold text-foreground">
                              {o.eta}
                            </div>
                            <div className="mt-1 text-base font-extrabold text-primary sm:hidden">
                              {o.total}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 sm:col-span-4 sm:justify-end">
                            <Button variant="outline" size="sm" className="rounded-lg" asChild>
                              <Link to={`/account/orders/${o.id}`}>
                                <Eye className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">View Details</span>
                                <span className="sm:hidden">View</span>
                              </Link>
                            </Button>
                            {o.status === "Shipped" || o.status === "Processing" ? (
                              <Button variant="brand" size="sm" className="rounded-lg">
                                <Truck className="h-3.5 w-3.5" />
                                Track Order
                              </Button>
                            ) : o.status === "Delivered" ? (
                              <>
                                <Button variant="outline" size="sm" className="rounded-lg">
                                  <Download className="h-3.5 w-3.5" />
                                  <span className="hidden sm:inline">Invoice</span>
                                </Button>
                                <Button variant="brand" size="sm" className="rounded-lg">
                                  <RotateCcw className="h-3.5 w-3.5" />
                                  Reorder
                                </Button>
                              </>
                            ) : (
                              <Button variant="brand" size="sm" className="rounded-lg">
                                <RotateCcw className="h-3.5 w-3.5" />
                                Reorder
                              </Button>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </section>
              )}

              {/* Support */}
              <section className="overflow-hidden rounded-2xl border border-border/70 bg-gradient-brand-soft p-6 shadow-card sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lift">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                        Need help with an order?
                      </h3>
                      <p className="mt-1 max-w-lg text-sm text-muted-foreground">
                        Our Colombo support team can help with delivery questions, returns, and
                        warranty claims — 7 days a week.
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

export default Orders;
