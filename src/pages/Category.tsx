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
  Camera,
  Smartphone,
  Zap,
  ArrowRight,
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

import heroSmartphones from "@/assets/smartphones-hero.jpeg";
import phone1 from "@/assets/product-iphone-pink.png";
import galaxyS25Fe from "@/assets/galaxy-s25-fe.png";
import honorMagicV5 from "@/assets/honor-magic-v5.png";
import iphoneAir from "@/assets/iphone-air.png";
import galaxyZFlip7 from "@/assets/galaxy-z-flip7.png";
import oneplus13r from "@/assets/oneplus-13r.png";
import iphone16 from "@/assets/iphone-16.png";
import pixel9ProXl from "@/assets/pixel-9-pro-xl.png";
import iphone13 from "@/assets/iphone-13.png";
import oneplusNordCe5 from "@/assets/oneplus-nord-ce5.png";
import iphone16e from "@/assets/iphone-16e.png";
import pixel9ProFold from "@/assets/pixel-9-pro-fold.png";
import phone2 from "@/assets/product-iphone-pink.png";
import phone3 from "@/assets/product-iphone-pink.png";
import featurePhone from "@/assets/feature-phone.jpg";

/* -------------------- Catalog (smartphones) -------------------- */
const catalog: (Product & { sub: string; storage: string; ram: string; color: string; screen: number; battery: number; fiveG: boolean })[] = [
  { id: "p1",  name: "Samsung Galaxy S25 FE",   brand: "Samsung",   price: 260299, oldPrice: 525000, rating: 4.9, reviews: 312, image: galaxyS25Fe, badge: { label: "New", tone: "primary" },     sub: "Flagship",  storage: "256GB", ram: "8GB",  color: "Titanium", screen: 6.7, battery: 4422, fiveG: true },
  { id: "p2",  name: "Apple iPhone Air 256GB",        brand: "Apple", price: 339900, oldPrice: 369000, rating: 4.8, reviews: 248, image: iphoneAir, badge: { label: "Hot Deal", tone: "promo" },  sub: "Flagship",  storage: "256GB", ram: "12GB", color: "White",    screen: 6.8, battery: 5000, fiveG: true },
  { id: "p3",  name: "Samsung Galaxy Z Flip 7",        brand: "Samsung",  price: 399900, oldPrice: 449000, rating: 4.6, reviews: 192, image: galaxyZFlip7, badge: { label: "-11%", tone: "promo" },     sub: "Foldable", storage: "256GB", ram: "12GB", color: "Coral",     screen: 6.7, battery: 5000, fiveG: true },
  { id: "p4",  name: "Apple iPhone 16",                            brand: "Apple", price: 279900, oldPrice: 309000, rating: 4.7, reviews: 98,  image: iphone16, badge: { label: "New", tone: "primary" },     sub: "Flagship",  storage: "256GB", ram: "8GB",  color: "Ultramarine", screen: 6.1, battery: 3561, fiveG: true },
  { id: "p5",  name: "HONOR Magic V5 Foldable",          brand: "HONOR", price: 569900, oldPrice: 629000, rating: 4.6, reviews: 142, image: honorMagicV5, badge: { label: "Foldable", tone: "primary" }, sub: "Foldable", storage: "256GB", ram: "8GB",  color: "Black",     screen: 6.7, battery: 3700, fiveG: true },
  { id: "p6",  name: "Google Pixel 9 Pro XL",                      brand: "Google", price: 329900, oldPrice: 365000, rating: 4.8, reviews: 421, image: pixel9ProXl,                                              sub: "Flagship",  storage: "256GB", ram: "16GB", color: "Obsidian",  screen: 6.8, battery: 5060, fiveG: true },
  { id: "p7",  name: "Apple iPhone 16e",                            brand: "Apple",   price: 250900, oldPrice: 279000, rating: 4.7, reviews: 76,  image: iphone16e, badge: { label: "New", tone: "primary" }, sub: "Flagship",  storage: "128GB", ram: "8GB",  color: "White",    screen: 6.1, battery: 4005, fiveG: true },
  { id: "p8",  name: "Google Pixel 9 Pro Fold",                     brand: "Google",  price: 549900, oldPrice: 599000, rating: 4.7, reviews: 184, image: pixel9ProFold, badge: { label: "Foldable", tone: "primary" }, sub: "Foldable", storage: "256GB", ram: "16GB", color: "Porcelain", screen: 8.0, battery: 4650, fiveG: true },
  { id: "p9",  name: "OnePlus 13R 16GB",                          brand: "OnePlus",  price: 204900, oldPrice: 229000, rating: 4.8, reviews: 88,  image: oneplus13r, badge: { label: "Hot", tone: "promo" },        sub: "Flagship",  storage: "256GB", ram: "16GB", color: "Rose Gold", screen: 6.78, battery: 5400, fiveG: true },
  { id: "p10", name: "iPhone 17e 256GB", brand: "Apple", price: 405000, rating: 4.6, reviews: 64, image: phone2, sub: "Flagship", storage: "256GB", ram: "12GB", color: "Green", screen: 6.8, battery: 5600, fiveG: true },
  { id: "p11", name: "OnePlus Nord CE5",                            brand: "OnePlus", price: 119900, oldPrice: 134000, rating: 4.5, reviews: 121, image: oneplusNordCe5, badge: { label: "-9%", tone: "promo" },     sub: "Mid-Range", storage: "256GB", ram: "8GB",  color: "Silver",   screen: 6.7, battery: 5200, fiveG: true },
  { id: "p12", name: "Apple iPhone 13",                              brand: "Apple",    price: 149900, oldPrice: 169000, rating: 4.5, reviews: 92,  image: iphone13,                                              sub: "Mid-Range", storage: "128GB", ram: "4GB",  color: "Pink",   screen: 6.1, battery: 3240, fiveG: true },
  { id: "p13", name: "Xiaomi Redmi 13C 128GB Midnight Black",     brand: "Xiaomi",  price: 39900, oldPrice: 45000,  rating: 4.4, reviews: 312, image: phone3, badge: { label: "Best Value", tone: "success" }, sub: "Budget", storage: "128GB", ram: "6GB",  color: "Black",    screen: 6.74, battery: 5000, fiveG: false },
  { id: "p14", name: "Samsung Galaxy A15 5G 128GB Light Blue",    brand: "Samsung", price: 54900,                  rating: 4.5, reviews: 218, image: phone2,                                              sub: "Budget",    storage: "128GB", ram: "6GB",  color: "Blue",     screen: 6.5, battery: 5000, fiveG: true },
  { id: "p15", name: "Samsung Galaxy Z Fold5 5G 512GB",           brand: "Samsung", price: 549000, oldPrice: 589000, rating: 4.7, reviews: 76,  image: phone2, badge: { label: "Foldable", tone: "primary" }, sub: "Foldable", storage: "512GB", ram: "12GB", color: "Black", screen: 7.6, battery: 4400, fiveG: true },
  { id: "p16", name: "OnePlus 12 5G 256GB Silky Black",           brand: "OnePlus", price: 229000, oldPrice: 249000, rating: 4.8, reviews: 156, image: phone1, badge: { label: "Best Seller", tone: "success" }, sub: "Flagship", storage: "256GB", ram: "12GB", color: "Black", screen: 6.82, battery: 5400, fiveG: true },
];

const subcats = ["All", "Flagship", "Mid-Range", "Budget", "Gaming", "Foldable", "5G", "New Launches"];
const brands = ["Apple", "Samsung", "Xiaomi", "OnePlus", "Google", "ASUS", "Honor", "Vivo", "Oppo"];
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
  { name: "Pink", hex: "#F472B6" },
];
const cameras = ["12MP+", "48MP+", "108MP+", "200MP+"];

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

/* Brand quick-shop tiles */
const brandTiles = [
  { name: "Apple", count: 28 },
  { name: "Samsung", count: 42 },
  { name: "Xiaomi", count: 36 },
  { name: "OnePlus", count: 14 },
  { name: "Google", count: 9 },
  { name: "ASUS", count: 7 },
  { name: "Honor", count: 11 },
  { name: "Vivo", count: 16 },
  { name: "Oppo", count: 18 },
];

/* -------------------- Filter sidebar -------------------- */
type FilterState = {
  brands: string[];
  price: [number, number];
  inStock: boolean;
  rating: number | null;
  warranty: boolean;
  storages: string[];
  rams: string[];
  colors: string[];
  screen: [number, number];
  battery: number;
  cameras: string[];
  fiveG: boolean;
  promo: boolean;
  preorder: boolean;
};

const defaultFilters: FilterState = {
  brands: [],
  price: [0, 600000],
  inStock: false,
  rating: null,
  warranty: false,
  storages: [],
  rams: [],
  colors: [],
  screen: [5.5, 8],
  battery: 0,
  cameras: [],
  fiveG: false,
  promo: false,
  preorder: false,
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
    <aside className="space-y-3">
      <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-bold">Refine</h3>
          <button
            onClick={() => setFilters(defaultFilters)}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        </div>

        <Accordion type="multiple" defaultValue={["brand", "price", "rating", "storage"]} className="w-full">
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

          <AccordionItem value="screen">
            <AccordionTrigger className="py-3 text-sm font-semibold">Screen size</AccordionTrigger>
            <AccordionContent>
              <div className="px-1 pb-1 pt-3">
                <Slider
                  value={filters.screen}
                  min={5}
                  max={8}
                  step={0.1}
                  onValueChange={(v) =>
                    setFilters((f) => ({ ...f, screen: [v[0], v[1]] as [number, number] }))
                  }
                />
                <div className="mt-3 flex items-center justify-between text-xs font-medium">
                  <span className="rounded-md bg-secondary px-2 py-1">{filters.screen[0].toFixed(1)}"</span>
                  <span className="text-muted-foreground">to</span>
                  <span className="rounded-md bg-secondary px-2 py-1">{filters.screen[1].toFixed(1)}"</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="battery">
            <AccordionTrigger className="py-3 text-sm font-semibold">Battery (mAh+)</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {[0, 4000, 5000, 5500].map((v) => {
                  const active = filters.battery === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setFilters((f) => ({ ...f, battery: v }))}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      {v === 0 ? "Any" : `${v}+`}
                    </button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cam">
            <AccordionTrigger className="py-3 text-sm font-semibold">Camera</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2.5 pt-1">
                {cameras.map((c) => (
                  <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox
                      checked={filters.cameras.includes(c)}
                      onCheckedChange={() => toggle("cameras", c)}
                    />
                    <span className="text-foreground/90">{c}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="5g">
            <AccordionTrigger className="py-3 text-sm font-semibold">5G Support</AccordionTrigger>
            <AccordionContent>
              <label className="flex items-center justify-between pt-1 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" /> 5G ready only
                </span>
                <Switch checked={filters.fiveG} onCheckedChange={(v) => setFilters((f) => ({ ...f, fiveG: v }))} />
              </label>
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
            <h4 className="text-sm font-bold text-foreground">0% Installments</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Pay in 3, 6, 12 or 24 months on selected smartphones with leading banks.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

/* -------------------- Page -------------------- */
const Category = () => {
  const params = useParams();
  const slug = params.slug ?? "smartphones";
  const titleMap: Record<string, string> = {
    smartphones: "Smartphones",
    tablets: "Tablets",
    accessories: "Accessories",
    audio: "Audio",
    gaming: "Gaming",
  };
  const categoryName = titleMap[slug] ?? "Smartphones";

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState("relevance");
  const [activeSub, setActiveSub] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    document.title = `${categoryName} — Best Prices in Sri Lanka | Nexzon`;
    const desc = `Shop the latest ${categoryName.toLowerCase()} at Nexzon. Genuine products, warranty support, 0% installments and islandwide delivery.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [categoryName]);

  const filtered = useMemo(() => {
    let list = catalog.filter((p) => {
      if (activeSub !== "All") {
        if (activeSub === "5G" && !p.fiveG) return false;
        if (activeSub === "New Launches" && p.badge?.label !== "New") return false;
        if (!["5G", "New Launches"].includes(activeSub) && p.sub !== activeSub) return false;
      }
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (p.price < filters.price[0] || p.price > filters.price[1]) return false;
      if (filters.rating && p.rating < filters.rating) return false;
      if (filters.storages.length && !filters.storages.includes(p.storage)) return false;
      if (filters.rams.length && !filters.rams.includes(p.ram)) return false;
      if (filters.colors.length && !filters.colors.includes(p.color)) return false;
      if (p.screen < filters.screen[0] || p.screen > filters.screen[1]) return false;
      if (filters.battery && p.battery < filters.battery) return false;
      if (filters.fiveG && !p.fiveG) return false;
      if (filters.promo && !p.oldPrice) return false;
      if (filters.preorder && p.badge?.label !== "Pre-Order") return false;
      if (search && !`${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest": list = [...list].sort((a, b) => Number(b.id.slice(1)) - Number(a.id.slice(1))); break;
    }
    return list;
  }, [filters, sort, activeSub, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice(0, page * perPage);

  /* Top flagships highlight */
  const topFlagships = useMemo(
    () => catalog.filter((p) => p.sub === "Flagship").slice(0, 3),
    [],
  );

  /* Active chips */
  const chips: { label: string; onRemove: () => void }[] = [];
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
  if (filters.fiveG)
    chips.push({ label: "5G", onRemove: () => setFilters((f) => ({ ...f, fiveG: false })) });
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
              <Link to="/shop" className="hover:text-primary">Shop</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground">{categoryName}</span>
            </nav>
          </div>
        </section>

        {/* Category hero */}
        <section className="bg-background pt-5 sm:pt-6">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-3xl border border-border/60">
              <img
                src={heroSmartphones}
                alt={`${categoryName} category banner`}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Featured brands */}
        <section className="bg-background pb-10 pt-[34px] sm:pb-14">
          <div className="container-page">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h2 className="font-display text-lg font-bold sm:text-xl">Shop by Brand</h2>
                <p className="text-xs text-muted-foreground">Top {categoryName.toLowerCase()} brands available at Nexzon.</p>
              </div>
              <Link to="/shop" className="hidden text-xs font-semibold text-primary hover:underline sm:inline">All brands →</Link>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
              {brandTiles.map((b) => {
                const slug = b.name.toLowerCase().replace(/\s+/g, "");
                return (
                  <Link
                    key={b.name}
                    to={`/brand/${b.name.toLowerCase()}`}
                    className="card-category group flex h-24 flex-col items-center justify-center gap-1.5 px-3 py-3 text-center"
                    aria-label={`Shop ${b.name}`}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt={`${b.name} logo`}
                      loading="lazy"
                      className="max-h-7 w-auto max-w-[70%] object-contain opacity-80 transition-all group-hover:opacity-100 group-hover:scale-105 dark:invert"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                      }}
                    />
                    <span className="font-display text-xs font-bold text-foreground/80 transition-colors group-hover:text-primary sm:text-sm">
                      {b.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <div className="container-page py-7 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-[180px]">
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </div>
            </div>

            {/* Right area */}
            <div className="min-w-0">
              {/* Category-specific merchandising */}

              {/* Toolbar */}
              <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-soft sm:p-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Search in ${categoryName.toLowerCase()}…`}
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
                        <SheetTitle>Refine</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <FilterSidebar filters={filters} setFilters={setFilters} />
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
                  <Smartphone className="mx-auto h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-3 font-display text-lg font-bold">No {categoryName.toLowerCase()} match your filters</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Try removing a few filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setFilters(defaultFilters); setSearch(""); setActiveSub("All"); }}>
                    Reset filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {filtered.length > perPage && (
                <div className="mt-8 flex flex-col items-center gap-5">
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

export default Category;
