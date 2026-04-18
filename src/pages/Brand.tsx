import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  Star,
  Sparkles,
  ShieldCheck,
  Wallet,
  Truck,
  BadgeCheck,
  ArrowRight,
  Award,
  Cpu,
  Layers,
  Package,
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

import brandHero from "@/assets/brand-hero-samsung.jpg";
import phone1 from "@/assets/product-phone-1.jpg";
import phone2 from "@/assets/product-phone-2.jpg";
import phone3 from "@/assets/product-phone-3.jpg";
import tablet from "@/assets/product-tablet.jpg";
import watch from "@/assets/product-watch.jpg";
import earbuds from "@/assets/product-earbuds.jpg";
import headphones from "@/assets/product-headphones.jpg";
import controller from "@/assets/product-controller.jpg";
import productCase from "@/assets/product-case.jpg";
import charger from "@/assets/product-charger.jpg";

/* -------------------- Brand catalog (Samsung default) -------------------- */
type BrandProduct = Product & {
  category: string;
  series: string;
  storage?: string;
  ram?: string;
  color: string;
  fiveG?: boolean;
};

const samsungProducts: BrandProduct[] = [
  { id: "s1",  name: "Samsung Galaxy S24 Ultra 5G 512GB",          brand: "Samsung", price: 459000, oldPrice: 489000, rating: 4.8, reviews: 248, image: phone2, badge: { label: "Hot Deal", tone: "promo" },  category: "Smartphones", series: "Galaxy S",   storage: "512GB", ram: "12GB", color: "Black",   fiveG: true },
  { id: "s2",  name: "Samsung Galaxy S24+ 5G 256GB Marble Gray",   brand: "Samsung", price: 329000, oldPrice: 355000, rating: 4.7, reviews: 184, image: phone2, badge: { label: "New", tone: "primary" },     category: "Smartphones", series: "Galaxy S",   storage: "256GB", ram: "12GB", color: "Titanium",fiveG: true },
  { id: "s3",  name: "Samsung Galaxy Z Flip5 5G 256GB Mint",       brand: "Samsung", price: 329000, oldPrice: 365000, rating: 4.6, reviews: 142, image: phone1, badge: { label: "Foldable", tone: "primary" }, category: "Smartphones", series: "Galaxy Z",  storage: "256GB", ram: "8GB",  color: "Green",   fiveG: true },
  { id: "s4",  name: "Samsung Galaxy Z Fold5 5G 512GB Phantom",    brand: "Samsung", price: 549000, oldPrice: 589000, rating: 4.7, reviews: 76,  image: phone1, badge: { label: "Foldable", tone: "primary" }, category: "Smartphones", series: "Galaxy Z",  storage: "512GB", ram: "12GB", color: "Black",   fiveG: true },
  { id: "s5",  name: "Samsung Galaxy A55 5G 256GB Awesome Navy",   brand: "Samsung", price: 109000, oldPrice: 119000, rating: 4.6, reviews: 212, image: phone3, badge: { label: "Best Value", tone: "success" }, category: "Smartphones", series: "Galaxy A", storage: "256GB", ram: "8GB",  color: "Blue",    fiveG: true },
  { id: "s6",  name: "Samsung Galaxy A15 5G 128GB Light Blue",     brand: "Samsung", price: 54900,                  rating: 4.5, reviews: 218, image: phone3,                                              category: "Smartphones", series: "Galaxy A",   storage: "128GB", ram: "6GB",  color: "Blue",    fiveG: true },
  { id: "s7",  name: "Samsung Galaxy Tab S9 FE 128GB Wi-Fi",       brand: "Samsung", price: 169000,                  rating: 4.7, reviews: 73,  image: tablet, badge: { label: "New", tone: "primary" },    category: "Tablets",     series: "Galaxy Tab", storage: "128GB", ram: "6GB",  color: "Black" },
  { id: "s8",  name: "Samsung Galaxy Tab S9 Ultra 5G 256GB",       brand: "Samsung", price: 359000, oldPrice: 389000, rating: 4.8, reviews: 64,  image: tablet, badge: { label: "Pre-Order", tone: "warning" }, category: "Tablets", series: "Galaxy Tab", storage: "256GB", ram: "12GB", color: "Titanium", fiveG: true },
  { id: "s9",  name: "Samsung Galaxy Buds3 Pro Silver",            brand: "Samsung", price: 65900, oldPrice: 72000,  rating: 4.6, reviews: 189, image: earbuds, badge: { label: "Hot", tone: "promo" },     category: "Audio",       series: "Galaxy Buds", color: "White" },
  { id: "s10", name: "Samsung Galaxy Buds FE Graphite",            brand: "Samsung", price: 27900,                  rating: 4.5, reviews: 124, image: earbuds,                                              category: "Audio",       series: "Galaxy Buds", color: "Black" },
  { id: "s11", name: "Samsung Galaxy Watch 7 LTE 44mm Silver",     brand: "Samsung", price: 89500, oldPrice: 99000,  rating: 4.7, reviews: 156, image: watch, badge: { label: "Best Seller", tone: "success" }, category: "Wearables", series: "Galaxy Watch", color: "Titanium" },
  { id: "s12", name: "Samsung Galaxy Watch 7 Classic 47mm",        brand: "Samsung", price: 119000,                  rating: 4.7, reviews: 98,  image: watch,                                              category: "Wearables",   series: "Galaxy Watch", color: "Black" },
  { id: "s13", name: "Samsung 45W Super Fast Charger USB-C",       brand: "Samsung", price: 12900, oldPrice: 14900,  rating: 4.7, reviews: 312, image: charger, badge: { label: "-13%", tone: "promo" },   category: "Accessories", series: "Power",      color: "Black" },
  { id: "s14", name: "Samsung Smart Cover for Galaxy S24 Ultra",   brand: "Samsung", price: 8900,                    rating: 4.5, reviews: 88,  image: productCase,                                          category: "Accessories", series: "Cases",      color: "Black" },
  { id: "s15", name: "Samsung Galaxy Watch FE 40mm Pink Gold",     brand: "Samsung", price: 64900, oldPrice: 72000,  rating: 4.6, reviews: 64,  image: watch, badge: { label: "New", tone: "primary" },    category: "Wearables",   series: "Galaxy Watch", color: "Pink" },
  { id: "s16", name: "Samsung HW-Q990C Soundbar Wireless Atmos",   brand: "Samsung", price: 289000, oldPrice: 319000, rating: 4.8, reviews: 41,  image: headphones,                                           category: "Audio",       series: "Soundbar",   color: "Black" },
  { id: "s17", name: "Samsung Galaxy SmartTag2",                   brand: "Samsung", price: 7900,                    rating: 4.7, reviews: 142, image: productCase,                                          category: "Accessories", series: "SmartThings", color: "White" },
  { id: "s18", name: "Samsung 25W Power Bank 10000mAh",            brand: "Samsung", price: 9900,                    rating: 4.6, reviews: 218, image: charger,                                              category: "Accessories", series: "Power",      color: "White" },
];

/* -------------------- Brand registry (extensible) -------------------- */
type BrandConfig = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  productCount: number;
  series: string[];
  pillars: { icon: typeof Cpu; title: string; desc: string }[];
  highlight: { eyebrow: string; title: string; desc: string };
  catalog: BrandProduct[];
};

const samsungConfig: BrandConfig = {
  name: "Samsung",
  slug: "samsung",
  tagline: "Galaxy power for every moment.",
  description:
    "Authorized Samsung products at Cellexa — flagship Galaxy smartphones, tablets, earbuds, wearables and accessories with full local warranty.",
  productCount: samsungProducts.length,
  series: ["Galaxy S", "Galaxy Z", "Galaxy A", "Galaxy Tab", "Galaxy Watch", "Galaxy Buds", "Soundbar", "Power"],
  pillars: [
    { icon: Cpu,     title: "Innovation",       desc: "Industry-leading displays, AI features and fold-tech." },
    { icon: Award,   title: "Flagship Quality", desc: "Premium materials, cameras and performance." },
    { icon: Layers,  title: "One Ecosystem",    desc: "Seamless sync across phones, tabs, watches & buds." },
    { icon: ShieldCheck, title: "Genuine + Warranty", desc: "Backed by Samsung Sri Lanka authorized service." },
  ],
  highlight: {
    eyebrow: "Top Samsung Picks",
    title: "Latest Galaxy devices, hand-picked.",
    desc: "Our team's most-loved Samsung flagships right now — all genuine, warranty-backed, with 0% installments.",
  },
  catalog: samsungProducts,
};

/* Minimal stubs for other brands (reuse layout) */
const fallbackBrand = (name: string, slug: string): BrandConfig => ({
  name,
  slug,
  tagline: `Discover the latest from ${name}.`,
  description: `Genuine ${name} products available at Cellexa with islandwide delivery, 0% installments and full warranty.`,
  productCount: 0,
  series: [],
  pillars: samsungConfig.pillars,
  highlight: {
    eyebrow: `Top ${name} Picks`,
    title: `Editor's choice from ${name}.`,
    desc: `Our most-loved ${name} products at Cellexa — all genuine and warranty-backed.`,
  },
  catalog: samsungProducts.map((p) => ({ ...p, brand: name })),
});

const brandRegistry: Record<string, BrandConfig> = {
  samsung: samsungConfig,
  apple: fallbackBrand("Apple", "apple"),
  xiaomi: fallbackBrand("Xiaomi", "xiaomi"),
  sony: fallbackBrand("Sony", "sony"),
  jbl: fallbackBrand("JBL", "jbl"),
  logitech: fallbackBrand("Logitech", "logitech"),
  asus: fallbackBrand("ASUS", "asus"),
  oneplus: fallbackBrand("OnePlus", "oneplus"),
  bose: fallbackBrand("Bose", "bose"),
  anker: fallbackBrand("Anker", "anker"),
};

const ratings = [4, 3, 2, 1];
const storages = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const rams = ["4GB", "6GB", "8GB", "12GB", "16GB"];
const colors = [
  { name: "Black", hex: "#0F172A" },
  { name: "White", hex: "#F8FAFC" },
  { name: "Blue", hex: "#2563EB" },
  { name: "Titanium", hex: "#9CA3AF" },
  { name: "Green", hex: "#10B981" },
  { name: "Pink", hex: "#F472B6" },
];
const featureOpts = ["5G", "Wireless", "Fast Charging", "Water Resistant"];

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

/* -------------------- Filter sidebar -------------------- */
type FilterState = {
  cats: string[];
  series: string[];
  price: [number, number];
  inStock: boolean;
  rating: number | null;
  warranty: boolean;
  storages: string[];
  rams: string[];
  colors: string[];
  features: string[];
  promo: boolean;
  preorder: boolean;
};

const defaultFilters: FilterState = {
  cats: [],
  series: [],
  price: [0, 600000],
  inStock: false,
  rating: null,
  warranty: false,
  storages: [],
  rams: [],
  colors: [],
  features: [],
  promo: false,
  preorder: false,
};

const FilterSidebar = ({
  brand,
  filters,
  setFilters,
}: {
  brand: BrandConfig;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}) => {
  const cats = useMemo(
    () => Array.from(new Set(brand.catalog.map((p) => p.category))),
    [brand],
  );

  const toggle = <K extends keyof FilterState>(key: K, value: string) => {
    setFilters((f) => {
      const arr = f[key] as unknown as string[];
      const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
      return { ...f, [key]: next } as FilterState;
    });
  };

  return (
    <aside className="space-y-3">
      <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-bold">Refine {brand.name}</h3>
          <button
            onClick={() => setFilters(defaultFilters)}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        </div>

        <Accordion type="multiple" defaultValue={["cat", "series", "price", "rating"]} className="w-full">
          <AccordionItem value="cat">
            <AccordionTrigger className="py-3 text-sm font-semibold">Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2.5 pt-1">
                {cats.map((c) => (
                  <label key={c} className="flex cursor-pointer items-center justify-between text-sm">
                    <span className="flex items-center gap-2.5">
                      <Checkbox
                        checked={filters.cats.includes(c)}
                        onCheckedChange={() => toggle("cats", c)}
                      />
                      <span className="text-foreground/90">{c}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {brand.catalog.filter((p) => p.category === c).length}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {brand.series.length > 0 && (
            <AccordionItem value="series">
              <AccordionTrigger className="py-3 text-sm font-semibold">Product Series</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {brand.series.map((s) => {
                    const active = filters.series.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggle("series", s)}
                        className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground/80 hover:border-primary/40"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="price">
            <AccordionTrigger className="py-3 text-sm font-semibold">Price (LKR)</AccordionTrigger>
            <AccordionContent>
              <div className="px-1 pb-1 pt-3">
                <Slider
                  value={filters.price}
                  min={0}
                  max={600000}
                  step={5000}
                  onValueChange={(v) =>
                    setFilters((f) => ({ ...f, price: [v[0], v[1]] as [number, number] }))
                  }
                />
                <div className="mt-3 flex items-center justify-between text-xs font-medium">
                  <span className="rounded-md bg-secondary px-2 py-1">{fmtLKR(filters.price[0])}</span>
                  <span className="text-muted-foreground">to</span>
                  <span className="rounded-md bg-secondary px-2 py-1">{fmtLKR(filters.price[1])}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="avail">
            <AccordionTrigger className="py-3 text-sm font-semibold">Availability</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-1">
                <label className="flex items-center justify-between text-sm">
                  <span>In stock only</span>
                  <Switch checked={filters.inStock} onCheckedChange={(v) => setFilters((f) => ({ ...f, inStock: v }))} />
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>Pre-order</span>
                  <Switch checked={filters.preorder} onCheckedChange={(v) => setFilters((f) => ({ ...f, preorder: v }))} />
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>On promotion</span>
                  <Switch checked={filters.promo} onCheckedChange={(v) => setFilters((f) => ({ ...f, promo: v }))} />
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>

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

          <AccordionItem value="warr">
            <AccordionTrigger className="py-3 text-sm font-semibold">Warranty</AccordionTrigger>
            <AccordionContent>
              <label className="flex items-center justify-between pt-1 text-sm">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-success" /> Warranty backed
                </span>
                <Switch checked={filters.warranty} onCheckedChange={(v) => setFilters((f) => ({ ...f, warranty: v }))} />
              </label>
            </AccordionContent>
          </AccordionItem>

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

          <AccordionItem value="feat">
            <AccordionTrigger className="py-3 text-sm font-semibold">Features</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2.5 pt-1">
                {featureOpts.map((f) => (
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

      <div className="rounded-2xl border border-border/70 bg-gradient-brand-soft p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background shadow-soft">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">0% Installments on {brand.name}</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Pay over 3, 6, 12 or 24 months with leading Sri Lankan banks.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

/* -------------------- Page -------------------- */
const Brand = () => {
  const params = useParams();
  const slug = (params.slug ?? "samsung").toLowerCase();
  const brand = brandRegistry[slug] ?? fallbackBrand(slug.charAt(0).toUpperCase() + slug.slice(1), slug);

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState("relevance");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    document.title = `${brand.name} — Genuine Products in Sri Lanka | Cellexa`;
    const desc = `Shop genuine ${brand.name} smartphones, tablets, audio, wearables & accessories at Cellexa. Warranty, 0% installments & islandwide delivery.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [brand.name]);

  const tabs = useMemo(() => {
    const cats = Array.from(new Set(brand.catalog.map((p) => p.category)));
    return ["All", ...cats, "New Launches", "Best Sellers"];
  }, [brand]);

  const filtered = useMemo(() => {
    let list = brand.catalog.filter((p) => {
      if (activeTab !== "All") {
        if (activeTab === "New Launches" && p.badge?.label !== "New") return false;
        if (activeTab === "Best Sellers" && p.badge?.label !== "Best Seller") return false;
        if (!["New Launches", "Best Sellers"].includes(activeTab) && p.category !== activeTab) return false;
      }
      if (filters.cats.length && !filters.cats.includes(p.category)) return false;
      if (filters.series.length && !filters.series.includes(p.series)) return false;
      if (p.price < filters.price[0] || p.price > filters.price[1]) return false;
      if (filters.rating && p.rating < filters.rating) return false;
      if (filters.storages.length && (!p.storage || !filters.storages.includes(p.storage))) return false;
      if (filters.rams.length && (!p.ram || !filters.rams.includes(p.ram))) return false;
      if (filters.colors.length && !filters.colors.includes(p.color)) return false;
      if (filters.features.includes("5G") && !p.fiveG) return false;
      if (filters.promo && !p.oldPrice) return false;
      if (filters.preorder && p.badge?.label !== "Pre-Order") return false;
      if (search && !`${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    switch (sort) {
      case "price-asc":  list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating":     list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest":     list = [...list].sort((a, b) => b.id.localeCompare(a.id)); break;
    }
    return list;
  }, [filters, sort, activeTab, search, brand]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice(0, page * perPage);

  const topPicks = useMemo(
    () =>
      [...brand.catalog]
        .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
        .slice(0, 3),
    [brand],
  );

  /* Active chips */
  const chips: { label: string; onRemove: () => void }[] = [];
  filters.cats.forEach((c) =>
    chips.push({ label: c, onRemove: () => setFilters((f) => ({ ...f, cats: f.cats.filter((x) => x !== c) })) }),
  );
  filters.series.forEach((s) =>
    chips.push({ label: s, onRemove: () => setFilters((f) => ({ ...f, series: f.series.filter((x) => x !== s) })) }),
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
        {/* Breadcrumb */}
        <section className="bg-background">
          <div className="container-page pt-5 sm:pt-6">
            <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/shop" className="hover:text-primary">Brands</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground">{brand.name}</span>
            </nav>
          </div>
        </section>

        {/* Brand hero */}
        <section className="bg-background pt-5 sm:pt-6">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-deep">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.1fr]">
                <div className="relative z-10 px-6 py-8 text-primary-foreground sm:px-10 sm:py-12 lg:py-16">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur ring-1 ring-white/20">
                    <BadgeCheck className="h-3 w-3" /> Authorized · Genuine Products
                  </span>
                  <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                    {brand.name}
                  </h1>
                  <p className="mt-2 font-display text-lg font-semibold text-white/90 sm:text-xl">
                    {brand.tagline}
                  </p>
                  <p className="mt-3 max-w-md text-sm text-white/80">
                    {brand.description}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button asChild variant="hero" size="lg" className="rounded-xl">
                      <a href="#brand-grid">
                        <Sparkles className="h-4 w-4" /> Shop {brand.name}
                      </a>
                    </Button>
                    <Button asChild variant="heroOutline" size="lg" className="rounded-xl">
                      <a href="#brand-grid">View New Arrivals <ArrowRight className="h-4 w-4" /></a>
                    </Button>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/85">
                    <span className="inline-flex items-center gap-1.5"><Package className="h-3.5 w-3.5" /> {brand.productCount}+ products</span>
                    <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Warranty backed</span>
                    <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Islandwide delivery</span>
                    <span className="inline-flex items-center gap-1.5"><Wallet className="h-3.5 w-3.5" /> 0% installments</span>
                  </div>
                </div>

                <div className="relative h-60 sm:h-80 lg:h-full lg:min-h-[420px]">
                  <img
                    src={brandHero}
                    alt={`${brand.name} product showcase`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary-deep)/0.6)] via-transparent to-transparent lg:from-[hsl(var(--primary-deep)/0.4)]" />
                  <div className="absolute bottom-4 right-4 hidden rounded-2xl border border-white/40 bg-white/90 px-4 py-3 shadow-lift backdrop-blur sm:block">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Exclusive</p>
                    <p className="text-sm font-bold text-foreground">Up to 30% off select models</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs / shortcuts */}
        <section className="bg-background pt-6">
          <div className="container-page">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {tabs.map((t) => {
                const active = activeTab === t;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why shop this brand */}
        <section className="bg-background pt-6">
          <div className="container-page">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {brand.pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand-soft text-primary">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-display text-sm font-bold text-foreground">{p.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="brand-grid" className="container-page py-7 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-[180px]">
                <FilterSidebar brand={brand} filters={filters} setFilters={setFilters} />
              </div>
            </div>

            {/* Right area */}
            <div className="min-w-0">
              {/* Brand merchandising strip */}
              <div className="mb-5 grid gap-3 sm:grid-cols-3">
                <div className="overflow-hidden rounded-2xl bg-gradient-deep p-4 text-primary-foreground sm:col-span-2">
                  <span className="badge-promo bg-white/15 text-white">Latest Launches</span>
                  <h3 className="mt-2 font-display text-lg font-extrabold sm:text-xl">
                    New {brand.name} flagships in stock now
                  </h3>
                  <p className="mt-1 text-sm text-white/85">
                    Pre-orders open. 0% installments available on selected models.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
                  <div className="flex items-center gap-2 text-primary">
                    <Layers className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Ecosystem</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    Bundle phone + buds + watch
                  </p>
                  <button className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    View bundles <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Toolbar */}
              <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-soft sm:p-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Search ${brand.name} products…`}
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
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="h-10 rounded-xl lg:hidden">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[88%] max-w-sm overflow-y-auto p-4">
                      <SheetHeader>
                        <SheetTitle>Refine {brand.name}</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <FilterSidebar brand={brand} filters={filters} setFilters={setFilters} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Active chips */}
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
                  <Package className="mx-auto h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-3 font-display text-lg font-bold">No {brand.name} products match your filters</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Try removing a few filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setFilters(defaultFilters); setSearch(""); setActiveTab("All"); }}>
                    Reset filters
                  </Button>
                </div>
              )}

              {/* Editorial highlight */}
              <section className="mt-10 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft">
                <div className="grid lg:grid-cols-[1.1fr_1fr]">
                  <div className="relative bg-gradient-deep p-6 text-primary-foreground sm:p-8">
                    <span className="badge-promo bg-white/15 text-white">
                      <Sparkles className="h-3 w-3" /> {brand.highlight.eyebrow}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
                      {brand.highlight.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-white/85">
                      {brand.highlight.desc}
                    </p>
                    <Button asChild variant="secondary" size="lg" className="mt-5 rounded-xl bg-white text-primary hover:bg-white/90">
                      <a href="#brand-grid">
                        Shop all {brand.name} <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <div className="grid gap-3 p-4 sm:grid-cols-3 sm:p-5">
                    {topPicks.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Pagination */}
              {filtered.length > perPage && (
                <div className="mt-8 flex flex-col items-center gap-5">
                  {visible.length < filtered.length && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Load more {brand.name} products
                    </Button>
                  )}
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                      {Array.from({ length: Math.min(totalPages, 4) }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink href="#" isActive={i === 0}>{i + 1}</PaginationLink>
                        </PaginationItem>
                      ))}
                      {totalPages > 4 && (
                        <PaginationItem><PaginationEllipsis /></PaginationItem>
                      )}
                      <PaginationItem><PaginationNext href="#" /></PaginationItem>
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

export default Brand;
