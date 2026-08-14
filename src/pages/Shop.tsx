import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  Star,
  Grid3x3,
  LayoutGrid,
  ShieldCheck,
  Wallet,
  Truck,
  BadgeCheck,
} from "lucide-react";
import PromoBar from "@/components/cellexa/PromoBar";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import ProductCard, { type Product } from "@/components/cellexa/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import phone1 from "@/assets/product-phone-1.jpg";
import phone2 from "@/assets/product-phone-2.jpg";
import phone3 from "@/assets/product-phone-3.jpg";
import headphones from "@/assets/product-headphones.jpg";
import earbuds from "@/assets/product-earbuds.jpg";
import tablet from "@/assets/product-tablet.jpg";
import watch from "@/assets/product-watch.jpg";
import controller from "@/assets/product-controller.jpg";
import productCase from "@/assets/product-case.jpg";
import charger from "@/assets/product-charger.jpg";

/* -------------------- Mock catalog -------------------- */
const allProducts: (Product & { category: string })[] = [
  { id: "1", category: "Smartphones", name: "Apple iPhone 15 Pro Max 256GB Titanium", brand: "Apple", price: 489000, oldPrice: 525000, rating: 4.9, reviews: 312, image: phone1, badge: { label: "New", tone: "primary" } },
  { id: "2", category: "Smartphones", name: "Samsung Galaxy S24 Ultra 5G 512GB", brand: "Samsung", price: 459000, oldPrice: 489000, rating: 4.8, reviews: 248, image: phone2, badge: { label: "Hot Deal", tone: "promo" } },
  { id: "3", category: "Audio", name: "Sony WH-1000XM5 Wireless Noise Cancelling", brand: "Sony", price: 119000, oldPrice: 135000, rating: 4.9, reviews: 421, image: headphones, badge: { label: "Best Seller", tone: "success" } },
  { id: "4", category: "Tablets", name: "Apple iPad Pro 11\" M4 Wi-Fi 256GB", brand: "Apple", price: 365000, rating: 4.9, reviews: 87, image: tablet, badge: { label: "Pre-Order", tone: "warning" } },
  { id: "5", category: "Accessories", name: "Samsung Galaxy Watch 7 44mm LTE", brand: "Samsung", price: 89500, oldPrice: 99000, rating: 4.7, reviews: 156, image: watch },
  { id: "6", category: "Audio", name: "Apple AirPods Pro (2nd Gen) USB-C", brand: "Apple", price: 79900, oldPrice: 89000, rating: 4.9, reviews: 538, image: earbuds, badge: { label: "Genuine", tone: "success" } },
  { id: "7", category: "Smartphones", name: "Xiaomi Redmi Note 13 Pro+ 5G 256GB", brand: "Xiaomi", price: 119500, oldPrice: 134000, rating: 4.6, reviews: 192, image: phone3, badge: { label: "-12%", tone: "promo" } },
  { id: "8", category: "Gaming", name: "Sony DualSense Wireless Controller PS5", brand: "Sony", price: 24900, rating: 4.8, reviews: 274, image: controller },
  { id: "9", category: "Accessories", name: "Apple Silicone MagSafe Case — iPhone 15 Pro", brand: "Apple", price: 18500, rating: 4.7, reviews: 142, image: productCase, badge: { label: "Genuine", tone: "success" } },
  { id: "10", category: "Accessories", name: "Anker 65W GaN PIQ 3.0 Fast Charger", brand: "Anker", price: 12900, oldPrice: 15500, rating: 4.8, reviews: 320, image: charger, badge: { label: "Hot Deal", tone: "promo" } },
  { id: "11", category: "Smartphones", name: "OnePlus 12R 5G 256GB Cool Blue", brand: "OnePlus", price: 159000, oldPrice: 175000, rating: 4.7, reviews: 98, image: phone3, badge: { label: "New", tone: "primary" } },
  { id: "12", category: "Audio", name: "JBL Tune 770NC Wireless Headphones", brand: "JBL", price: 39500, oldPrice: 45000, rating: 4.6, reviews: 211, image: headphones },
  { id: "13", category: "Tablets", name: "Samsung Galaxy Tab S9 FE 128GB Wi-Fi", brand: "Samsung", price: 169000, rating: 4.7, reviews: 73, image: tablet, badge: { label: "New", tone: "primary" } },
  { id: "14", category: "Audio", name: "Sony LinkBuds S True Wireless Earbuds", brand: "Sony", price: 49900, oldPrice: 58000, rating: 4.6, reviews: 184, image: earbuds, badge: { label: "-14%", tone: "promo" } },
  { id: "15", category: "Gaming", name: "Logitech G Pro X Superlight 2 Mouse", brand: "Logitech", price: 54900, rating: 4.9, reviews: 162, image: controller, badge: { label: "Best Seller", tone: "success" } },
  { id: "16", category: "Accessories", name: "Apple Watch Series 9 GPS 45mm", brand: "Apple", price: 145000, oldPrice: 159000, rating: 4.8, reviews: 245, image: watch },
];

const categories = ["Smartphones", "Tablets", "Accessories", "Audio", "Gaming"];
const brands = ["Apple", "Samsung", "Xiaomi", "Sony", "JBL", "Logitech", "OnePlus", "Anker"];
const ratings = [4, 3, 2, 1];
const storages = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const rams = ["4GB", "6GB", "8GB", "12GB", "16GB"];
const colors = [
  { name: "Black", hex: "#0F172A" },
  { name: "White", hex: "#F8FAFC" },
  { name: "Blue", hex: "#2563EB" },
  { name: "Titanium", hex: "#9CA3AF" },
  { name: "Gold", hex: "#D4AF37" },
  { name: "Green", hex: "#10B981" },
];
const features = ["5G", "Wireless", "Fast Charging", "Water Resistant", "Bluetooth 5.3"];

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

/* -------------------- Filter sidebar -------------------- */
type FilterState = {
  cats: string[];
  brands: string[];
  price: [number, number];
  inStock: boolean;
  rating: number | null;
  warranty: boolean;
  storages: string[];
  rams: string[];
  colors: string[];
  features: string[];
  preorder: boolean;
  promo: boolean;
};

const defaultFilters: FilterState = {
  cats: [],
  brands: [],
  price: [0, 600000],
  inStock: false,
  rating: null,
  warranty: false,
  storages: [],
  rams: [],
  colors: [],
  features: [],
  preorder: false,
  promo: false,
};

const FilterSidebar = ({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}) => {
  const toggle = <K extends keyof FilterState>(key: K, value: string) => {
    setFilters((f) => {
      const arr = f[key] as unknown as string[];
      const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
      return { ...f, [key]: next } as FilterState;
    });
  };

  return (
    <aside className="space-y-2">
      <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-bold">Filters</h3>
          <button
            onClick={() => setFilters(defaultFilters)}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        </div>

        <Accordion type="multiple" defaultValue={["cat", "brand", "price", "rating"]} className="w-full">
          {/* Category */}
          <AccordionItem value="cat">
            <AccordionTrigger className="py-3 text-sm font-semibold">Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2.5 pt-1">
                {categories.map((c) => (
                  <label key={c} className="flex cursor-pointer items-center justify-between text-sm">
                    <span className="flex items-center gap-2.5">
                      <Checkbox
                        checked={filters.cats.includes(c)}
                        onCheckedChange={() => toggle("cats", c)}
                      />
                      <span className="text-foreground/90">{c}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {allProducts.filter((p) => p.category === c).length}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Brand */}
          <AccordionItem value="brand">
            <AccordionTrigger className="py-3 text-sm font-semibold">Brand</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {brands.map((b) => {
                  const active = filters.brands.includes(b);
                  return (
                    <button
                      key={b}
                      onClick={() => toggle("brands", b)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-foreground/80 hover:border-primary/40"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price */}
          <AccordionItem value="price">
            <AccordionTrigger className="py-3 text-sm font-semibold">Price (LKR)</AccordionTrigger>
            <AccordionContent>
              <div className="px-1 pb-1 pt-3">
                <Slider
                  value={filters.price}
                  min={0}
                  max={600000}
                  step={5000}
                  onValueChange={(v) => setFilters((f) => ({ ...f, price: [v[0], v[1]] as [number, number] }))}
                />
                <div className="mt-3 flex items-center justify-between text-xs font-medium">
                  <span className="rounded-md bg-secondary px-2 py-1">{fmtLKR(filters.price[0])}</span>
                  <span className="text-muted-foreground">to</span>
                  <span className="rounded-md bg-secondary px-2 py-1">{fmtLKR(filters.price[1])}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Availability */}
          <AccordionItem value="avail">
            <AccordionTrigger className="py-3 text-sm font-semibold">Availability</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-1">
                <label className="flex items-center justify-between text-sm">
                  <span>In stock only</span>
                  <Switch
                    checked={filters.inStock}
                    onCheckedChange={(v) => setFilters((f) => ({ ...f, inStock: v }))}
                  />
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>Pre-order available</span>
                  <Switch
                    checked={filters.preorder}
                    onCheckedChange={(v) => setFilters((f) => ({ ...f, preorder: v }))}
                  />
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>On promotion</span>
                  <Switch
                    checked={filters.promo}
                    onCheckedChange={(v) => setFilters((f) => ({ ...f, promo: v }))}
                  />
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rating */}
          <AccordionItem value="rating">
            <AccordionTrigger className="py-3 text-sm font-semibold">Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                {ratings.map((r) => {
                  const active = filters.rating === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setFilters((f) => ({ ...f, rating: active ? null : r }))}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-all ${
                        active ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < r ? "fill-warning text-warning" : "text-muted-foreground/40"
                            }`}
                          />
                        ))}
                      </span>
                      <span className="text-xs text-muted-foreground">& up</span>
                    </button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Warranty */}
          <AccordionItem value="warr">
            <AccordionTrigger className="py-3 text-sm font-semibold">Warranty</AccordionTrigger>
            <AccordionContent>
              <label className="flex items-center justify-between pt-1 text-sm">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  Warranty backed only
                </span>
                <Switch
                  checked={filters.warranty}
                  onCheckedChange={(v) => setFilters((f) => ({ ...f, warranty: v }))}
                />
              </label>
            </AccordionContent>
          </AccordionItem>

          {/* Storage */}
          <AccordionItem value="storage">
            <AccordionTrigger className="py-3 text-sm font-semibold">Storage</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {storages.map((s) => {
                  const active = filters.storages.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggle("storages", s)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* RAM */}
          <AccordionItem value="ram">
            <AccordionTrigger className="py-3 text-sm font-semibold">RAM</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {rams.map((s) => {
                  const active = filters.rams.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggle("rams", s)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Color */}
          <AccordionItem value="color">
            <AccordionTrigger className="py-3 text-sm font-semibold">Color</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pt-1">
                {colors.map((c) => {
                  const active = filters.colors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      title={c.name}
                      onClick={() => toggle("colors", c.name)}
                      className={`relative h-8 w-8 rounded-full border-2 transition-all ${
                        active ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/40"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Features */}
          <AccordionItem value="feat">
            <AccordionTrigger className="py-3 text-sm font-semibold">Connectivity & Features</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2.5 pt-1">
                {features.map((f) => (
                  <label key={f} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox
                      checked={filters.features.includes(f)}
                      onCheckedChange={() => toggle("features", f)}
                    />
                    <span className="text-foreground/90">{f}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Trust card */}
      <div className="rounded-2xl border border-border/70 bg-gradient-brand-soft p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background shadow-soft">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">0% Installments</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Up to 36 months on selected banks. COD available islandwide.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

/* -------------------- Page -------------------- */
const Shop = () => {
  const [searchParams] = useSearchParams();
  // Only honour a ?cat= that matches a real category, so a bad URL falls back to "All".
  const catParam = searchParams.get("cat");
  const initialCat = catParam && categories.includes(catParam) ? catParam : "All";

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState("relevance");
  const [activeCat, setActiveCat] = useState<string>(initialCat);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [page, setPage] = useState(1);
  const perPage = 12;

  // Re-sync when the header search fires again while already on /shop.
  useEffect(() => {
    const cat = searchParams.get("cat");
    setSearch(searchParams.get("q") ?? "");
    setActiveCat(cat && categories.includes(cat) ? cat : "All");
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    document.title = "Shop All Products — Nexzon Sri Lanka";
    const desc = "Browse all smartphones, tablets, audio, gaming & accessories at Nexzon. LKR pricing, genuine products, warranty & islandwide delivery.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      if (activeCat !== "All" && p.category !== activeCat) return false;
      if (filters.cats.length && !filters.cats.includes(p.category)) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (p.price < filters.price[0] || p.price > filters.price[1]) return false;
      if (filters.rating && p.rating < filters.rating) return false;
      if (filters.promo && !p.oldPrice) return false;
      if (filters.preorder && p.badge?.label !== "Pre-Order") return false;
      if (search && !`${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }
    return list;
  }, [filters, sort, activeCat, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice(0, page * perPage);

  /* Active chips */
  const chips: { label: string; onRemove: () => void }[] = [];
  filters.cats.forEach((c) =>
    chips.push({ label: c, onRemove: () => setFilters((f) => ({ ...f, cats: f.cats.filter((x) => x !== c) })) }),
  );
  filters.brands.forEach((b) =>
    chips.push({ label: b, onRemove: () => setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) })) }),
  );
  filters.storages.forEach((s) =>
    chips.push({ label: s, onRemove: () => setFilters((f) => ({ ...f, storages: f.storages.filter((x) => x !== s) })) }),
  );
  filters.colors.forEach((c) =>
    chips.push({ label: c, onRemove: () => setFilters((f) => ({ ...f, colors: f.colors.filter((x) => x !== c) })) }),
  );
  if (filters.rating)
    chips.push({ label: `${filters.rating}★ & up`, onRemove: () => setFilters((f) => ({ ...f, rating: null })) });
  if (filters.warranty)
    chips.push({ label: "Warranty", onRemove: () => setFilters((f) => ({ ...f, warranty: false })) });
  if (filters.promo)
    chips.push({ label: "On Sale", onRemove: () => setFilters((f) => ({ ...f, promo: false })) });
  if (filters.preorder)
    chips.push({ label: "Pre-Order", onRemove: () => setFilters((f) => ({ ...f, preorder: false })) });

  return (
    <div className="min-h-screen bg-surface">
      <PromoBar />
      <Header />

      <main>
        {/* Breadcrumb + intro */}
        <section className="border-b border-border/60 bg-background">
          <div className="container-page py-6 sm:py-8">
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground">Shop</span>
            </nav>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">All Departments</span>
                <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Shop All Products</h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Browse the latest smartphones, tablets, audio gear, gaming and accessories — all genuine,
                  warranty-backed, and delivered islandwide.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 font-semibold">
                  <BadgeCheck className="h-3.5 w-3.5 text-success" /> Genuine
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 font-semibold">
                  <Truck className="h-3.5 w-3.5 text-primary" /> Islandwide
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 font-semibold">
                  <Wallet className="h-3.5 w-3.5 text-primary" /> 0% Installments
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container-page py-6 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-[180px]">
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </div>
            </div>

            {/* Right area */}
            <div className="min-w-0">
              {/* Inline promo */}
              <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-deep p-5 text-primary-foreground sm:p-6">
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <span className="badge-promo bg-white/15 text-white">Limited Time</span>
                    <h3 className="mt-2 font-display text-xl font-extrabold sm:text-2xl">
                      Mega Tech Sale — up to 30% off + 0% installments
                    </h3>
                    <p className="mt-1 text-sm text-white/85">
                      Genuine products. Warranty backed. Free islandwide delivery on orders over LKR 25,000.
                    </p>
                  </div>
                  <Button variant="secondary" size="lg" className="shrink-0 bg-white text-primary hover:bg-white/90">
                    View Deals
                  </Button>
                </div>
              </div>

              {/* Search + sort toolbar */}
              <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-soft sm:p-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search within results — iPhone, AirPods, Galaxy…"
                    className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
                    Showing <strong className="text-foreground">{visible.length}</strong> of{" "}
                    <strong className="text-foreground">{filtered.length}</strong>
                  </span>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="h-10 w-[180px] rounded-xl">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                      <SelectItem value="best">Best Selling</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Mobile filter button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="h-10 rounded-xl lg:hidden">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[88%] max-w-sm overflow-y-auto p-4">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <FilterSidebar filters={filters} setFilters={setFilters} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Category chips */}
              <div className="mb-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {["All", ...categories].map((c) => {
                  const active = activeCat === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setActiveCat(c)}
                      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                        active
                          ? "border-primary bg-primary text-primary-foreground shadow-soft"
                          : "border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-primary"
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {/* Active filter chips */}
              {chips.length > 0 && (
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Active:</span>
                  {chips.map((c, i) => (
                    <button
                      key={i}
                      onClick={c.onRemove}
                      className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
                    >
                      {c.label}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  <button
                    onClick={() => setFilters(defaultFilters)}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Grid */}
              {visible.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {visible.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                  <LayoutGrid className="mx-auto h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-3 font-display text-lg font-bold">No products match your filters</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try removing a few filters or clearing your search.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => { setFilters(defaultFilters); setSearch(""); setActiveCat("All"); }}>
                    Reset all filters
                  </Button>
                </div>
              )}

              {/* Load more + pagination */}
              {filtered.length > perPage && (
                <div className="mt-8 flex flex-col items-center gap-5">
                  {visible.length < filtered.length && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => setPage((p) => p + 1)}
                    >
                      <Grid3x3 className="h-4 w-4" />
                      Load more products
                    </Button>
                  )}
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      {Array.from({ length: Math.min(totalPages, 4) }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink href="#" isActive={i === 0}>{i + 1}</PaginationLink>
                        </PaginationItem>
                      ))}
                      {totalPages > 4 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
