import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Heart,
  ShoppingCart,
  Trash2,
  Eye,
  Share2,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Filter,
  PackageX,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import {
  AccountSidebarNav,
  AccountProfileCard,
} from "@/components/cellexa/AccountSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard, { type Product } from "@/components/cellexa/ProductCard";
import { toast } from "sonner";

type Stock = "in" | "low" | "out" | "preorder";

interface WishItem {
  id: string;
  brand: string;
  name: string;
  variant: string;
  price: number;
  oldPrice?: number;
  stock: Stock;
  addedOn: string;
  img: string;
}

const INITIAL: WishItem[] = [
  {
    id: "p-iphone-15-pm",
    brand: "Apple",
    name: "iPhone 15 Pro Max",
    variant: "256GB · Natural Titanium",
    price: 365000,
    oldPrice: 389000,
    stock: "in",
    addedOn: "Added 12 Apr",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=480&q=80",
  },
  {
    id: "p-galaxy-s24",
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    variant: "512GB · Titanium Black",
    price: 332000,
    oldPrice: 355000,
    stock: "low",
    addedOn: "Added 09 Apr",
    img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=480&q=80",
  },
  {
    id: "p-airpods-pro",
    brand: "Apple",
    name: "AirPods Pro (2nd Gen)",
    variant: "USB-C · MagSafe Case",
    price: 78500,
    stock: "in",
    addedOn: "Added 04 Apr",
    img: "https://images.unsplash.com/photo-1606220588911-5117e04b71ae?w=480&q=80",
  },
  {
    id: "p-watch-ultra",
    brand: "Apple",
    name: "Apple Watch Ultra 2",
    variant: "49mm · Trail Loop",
    price: 245000,
    stock: "preorder",
    addedOn: "Added 02 Apr",
    img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=480&q=80",
  },
  {
    id: "p-pixel-8",
    brand: "Google",
    name: "Pixel 8 Pro",
    variant: "256GB · Bay Blue",
    price: 198000,
    oldPrice: 215000,
    stock: "out",
    addedOn: "Added 28 Mar",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=480&q=80",
  },
  {
    id: "p-sony-wh1000",
    brand: "Sony",
    name: "WH-1000XM5 Headphones",
    variant: "Midnight Black",
    price: 112000,
    stock: "in",
    addedOn: "Added 22 Mar",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=480&q=80",
  },
];

const RECOMMENDED: Product[] = [
  {
    id: "r-oneplus-12",
    brand: "OnePlus",
    name: "OnePlus 12R 5G 256GB",
    price: 142000,
    oldPrice: 158000,
    rating: 4.7,
    reviews: 218,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    badge: { label: "Hot", tone: "promo" },
  },
  {
    id: "r-ipad-air",
    brand: "Apple",
    name: 'iPad Air 11" M2 128GB Wi-Fi',
    price: 218000,
    rating: 4.9,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80",
    badge: { label: "New", tone: "primary" },
  },
  {
    id: "r-buds-pro",
    brand: "Samsung",
    name: "Galaxy Buds3 Pro ANC",
    price: 58500,
    oldPrice: 64500,
    rating: 4.6,
    reviews: 184,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    badge: { label: "-9%", tone: "success" },
  },
  {
    id: "r-mbp-14",
    brand: "Apple",
    name: 'MacBook Pro 14" M3 512GB',
    price: 612000,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
  },
];

const fmt = (n: number) =>
  `LKR ${n.toLocaleString("en-LK", { minimumFractionDigits: 0 })}`;

const stockBadge: Record<Stock, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  in: { label: "In Stock", cls: "bg-success/15 text-success", Icon: CheckCircle2 },
  low: { label: "Low Stock", cls: "bg-warning/20 text-warning", Icon: AlertCircle },
  out: { label: "Out of Stock", cls: "bg-destructive/15 text-destructive", Icon: PackageX },
  preorder: { label: "Pre-Order", cls: "bg-primary/15 text-primary", Icon: Clock },
};

const Wishlist = () => {
  const [items, setItems] = useState<WishItem[]>(INITIAL);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | Stock>("all");
  const [sort, setSort] = useState<"recent" | "low" | "high">("recent");

  const filtered = useMemo(() => {
    let arr = filter === "all" ? items : items.filter((i) => i.stock === filter);
    if (sort === "low") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "high") arr = [...arr].sort((a, b) => b.price - a.price);
    return arr;
  }, [items, filter, sort]);

  const totalValue = items.reduce((s, i) => s + i.price, 0);
  const inStockCount = items.filter((i) => i.stock === "in" || i.stock === "low").length;

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Removed from wishlist");
  };
  const addToCart = (item: WishItem) => {
    if (item.stock === "out") return toast.error("Out of stock");
    toast.success(`${item.name} added to cart`);
  };
  const moveAllToCart = () => {
    const movable = items.filter((i) => i.stock !== "out");
    if (!movable.length) return toast.error("No available items to move");
    toast.success(`${movable.length} items moved to cart`);
  };
  const clearAll = () => {
    setItems([]);
    toast.success("Wishlist cleared");
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
          <Link to="/account" className="hover:text-foreground">My Account</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-foreground">Wishlist</span>
        </nav>

        {/* Page header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              My Wishlist
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              {items.length} saved item{items.length !== 1 ? "s" : ""} · {inStockCount} ready to ship · Total value{" "}
              <span className="font-semibold text-foreground">{fmt(totalValue)}</span>
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
                  <AccountSidebarNav onNavigate={() => setMobileNavOpen(false)} activePath="/account" />
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
                      { k: "all", label: "All" },
                      { k: "in", label: "In Stock" },
                      { k: "low", label: "Low Stock" },
                      { k: "preorder", label: "Pre-Order" },
                      { k: "out", label: "Out of Stock" },
                    ] as { k: "all" | Stock; label: string }[]
                  ).map((tab) => {
                    const count =
                      tab.k === "all"
                        ? items.length
                        : items.filter((i) => i.stock === tab.k).length;
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
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Filter className="h-3.5 w-3.5" /> Sort
                  </div>
                  <Select value={sort} onValueChange={(v: "recent" | "low" | "high") => setSort(v)}>
                    <SelectTrigger className="h-9 w-[160px] rounded-xl text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recently Added</SelectItem>
                      <SelectItem value="low">Price: Low to High</SelectItem>
                      <SelectItem value="high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="brand"
                    size="sm"
                    className="rounded-xl"
                    onClick={moveAllToCart}
                    disabled={!items.length}
                  >
                    <ShoppingCart className="mr-1.5 h-4 w-4" /> Move All to Cart
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

            {/* Items grid or empty state */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card sm:p-14">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand-soft text-primary">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">
                  {items.length === 0 ? "Your wishlist is empty" : "No items match this filter"}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {items.length === 0
                    ? "Save phones, laptops, audio gear and accessories to keep track of price drops and stock alerts."
                    : "Try a different filter or browse the latest arrivals at Cellexa."}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <Button asChild variant="brand" className="rounded-xl">
                    <Link to="/shop">
                      <ShoppingCart className="mr-1.5 h-4 w-4" /> Browse Shop
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link to="/category/smartphones">View Smartphones</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((item) => {
                  const sb = stockBadge[item.stock];
                  const discount =
                    item.oldPrice && item.oldPrice > item.price
                      ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
                      : 0;
                  const disabled = item.stock === "out";
                  return (
                    <article
                      key={item.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <Link
                        to={`/product/${item.id}`}
                        className="relative block aspect-[5/4] overflow-hidden bg-gradient-brand-soft"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                          {discount > 0 && (
                            <span className="rounded-md bg-foreground px-2 py-0.5 text-[10px] font-bold text-background">
                              -{discount}%
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${sb.cls}`}
                          >
                            <sb.Icon className="h-3 w-3" /> {sb.label}
                          </span>
                        </div>
                        <button
                          aria-label="Remove from wishlist"
                          onClick={(e) => {
                            e.preventDefault();
                            remove(item.id);
                          }}
                          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-destructive shadow-soft backdrop-blur transition hover:bg-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </Link>

                      <div className="flex flex-1 flex-col p-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {item.brand}
                        </div>
                        <Link
                          to={`/product/${item.id}`}
                          className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-foreground hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-1 truncate text-xs text-muted-foreground">{item.variant}</div>

                        <div className="mt-3 flex items-end justify-between gap-2">
                          <div>
                            <div className="font-display text-lg font-extrabold text-foreground">
                              {fmt(item.price)}
                            </div>
                            {item.oldPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                {fmt(item.oldPrice)}
                              </div>
                            )}
                          </div>
                          <span className="text-[11px] font-medium text-muted-foreground">
                            {item.addedOn}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                          <Button
                            variant="brand"
                            size="sm"
                            className="h-10 rounded-xl"
                            disabled={disabled}
                            onClick={() => addToCart(item)}
                          >
                            <ShoppingCart className="mr-1.5 h-4 w-4" />
                            {item.stock === "preorder" ? "Pre-Order" : "Add to Cart"}
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="h-10 rounded-xl"
                            aria-label="View product"
                          >
                            <Link to={`/product/${item.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Recommended */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    <Sparkles className="h-3 w-3" /> Picked for you
                  </div>
                  <h3 className="mt-2 font-display text-lg font-extrabold text-foreground sm:text-xl">
                    You may also like
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your saved items and browsing across Cellexa.
                  </p>
                </div>
                <Button asChild variant="ghost" size="sm" className="rounded-xl">
                  <Link to="/shop">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {RECOMMENDED.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

            {/* Help card */}
            <div className="grid gap-4 rounded-2xl border border-border/70 bg-gradient-brand-soft p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-extrabold text-foreground">
                    Need help choosing?
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Our Cellexa product specialists can compare specs, check warranty, and arrange island-wide delivery from Colombo to Jaffna.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <ShieldCheck className="h-3 w-3 text-primary" /> Authentic products
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <Share2 className="h-3 w-3 text-primary" /> Share wishlist
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

export default Wishlist;
