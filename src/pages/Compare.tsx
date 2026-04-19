import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  Plus,
  Star,
  ShoppingCart,
  Eye,
  Trash2,
  Search,
  Scale,
  Cpu,
  Smartphone,
  Camera,
  Battery,
  Wifi,
  HardDrive,
  ShieldCheck,
  PackageCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import ProductCard, { Product } from "@/components/cellexa/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CompareProduct = {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  specs: {
    display: string;
    displaySize: number; // for highlight (bigger better)
    processor: string;
    processorScore: number; // higher better
    ram: string;
    ramGB: number;
    storage: string;
    storageGB: number;
    rearCamera: string;
    cameraMP: number;
    frontCamera: string;
    battery: string;
    batteryMAh: number;
    charging: string;
    os: string;
    connectivity: string;
    sim: string;
    waterResist: string;
    weight: string;
    colors: string;
    warranty: string;
    availability: string;
  };
};

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

const CATALOG: CompareProduct[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro 256GB",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1696446702183-be5c40e3b6c7?w=800&auto=format&fit=crop",
    price: 379900,
    oldPrice: 410000,
    rating: 4.9,
    reviews: 1284,
    inStock: true,
    specs: {
      display: '6.1" Super Retina XDR OLED, 120Hz',
      displaySize: 6.1,
      processor: "Apple A17 Pro (3nm)",
      processorScore: 98,
      ram: "8 GB",
      ramGB: 8,
      storage: "256 GB",
      storageGB: 256,
      rearCamera: "48 MP + 12 MP UW + 12 MP Tele",
      cameraMP: 48,
      frontCamera: "12 MP TrueDepth",
      battery: "3274 mAh",
      batteryMAh: 3274,
      charging: "27W wired, 15W MagSafe",
      os: "iOS 17",
      connectivity: "5G, Wi-Fi 6E, BT 5.3, USB-C",
      sim: "Nano-SIM + eSIM",
      waterResist: "IP68 (6m / 30 min)",
      weight: "187 g",
      colors: "Natural, Blue, White, Black Titanium",
      warranty: "1 Year Apple Warranty",
      availability: "Ships in 24 hours",
    },
  },
  {
    id: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 512GB",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop",
    price: 419900,
    rating: 4.8,
    reviews: 942,
    inStock: true,
    specs: {
      display: '6.8" Dynamic AMOLED 2X, 120Hz',
      displaySize: 6.8,
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      processorScore: 96,
      ram: "12 GB",
      ramGB: 12,
      storage: "512 GB",
      storageGB: 512,
      rearCamera: "200 MP + 50 MP Tele + 12 MP UW + 10 MP",
      cameraMP: 200,
      frontCamera: "12 MP",
      battery: "5000 mAh",
      batteryMAh: 5000,
      charging: "45W wired, 15W wireless",
      os: "Android 14, One UI 6.1",
      connectivity: "5G, Wi-Fi 7, BT 5.3, USB-C",
      sim: "Nano-SIM + eSIM",
      waterResist: "IP68 (1.5m / 30 min)",
      weight: "232 g",
      colors: "Titanium Gray, Black, Violet, Yellow",
      warranty: "1 Year Samsung Warranty",
      availability: "In stock — Colombo & Kandy",
    },
  },
  {
    id: "pixel-8-pro",
    name: "Google Pixel 8 Pro 256GB",
    brand: "Google",
    image:
      "https://images.unsplash.com/photo-1696446700082-1bedc52a3d3a?w=800&auto=format&fit=crop",
    price: 289900,
    oldPrice: 319000,
    rating: 4.7,
    reviews: 612,
    inStock: true,
    specs: {
      display: '6.7" LTPO OLED, 120Hz',
      displaySize: 6.7,
      processor: "Google Tensor G3",
      processorScore: 88,
      ram: "12 GB",
      ramGB: 12,
      storage: "256 GB",
      storageGB: 256,
      rearCamera: "50 MP + 48 MP UW + 48 MP Tele",
      cameraMP: 50,
      frontCamera: "10.5 MP",
      battery: "5050 mAh",
      batteryMAh: 5050,
      charging: "30W wired, 23W wireless",
      os: "Android 14",
      connectivity: "5G, Wi-Fi 7, BT 5.3, USB-C",
      sim: "Nano-SIM + eSIM",
      waterResist: "IP68",
      weight: "213 g",
      colors: "Obsidian, Porcelain, Bay",
      warranty: "1 Year Cellexa Warranty",
      availability: "Ships in 2-3 days",
    },
  },
  {
    id: "xiaomi-14-pro",
    name: "Xiaomi 14 Pro 512GB",
    brand: "Xiaomi",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop",
    price: 249900,
    rating: 4.6,
    reviews: 388,
    inStock: false,
    specs: {
      display: '6.73" LTPO AMOLED, 120Hz',
      displaySize: 6.73,
      processor: "Snapdragon 8 Gen 3",
      processorScore: 94,
      ram: "12 GB",
      ramGB: 12,
      storage: "512 GB",
      storageGB: 512,
      rearCamera: "50 MP Leica + 50 MP UW + 50 MP Tele",
      cameraMP: 50,
      frontCamera: "32 MP",
      battery: "4880 mAh",
      batteryMAh: 4880,
      charging: "120W wired, 50W wireless",
      os: "Android 14, HyperOS",
      connectivity: "5G, Wi-Fi 7, BT 5.4, USB-C",
      sim: "Dual Nano-SIM",
      waterResist: "IP68",
      weight: "223 g",
      colors: "Black, White, Titanium",
      warranty: "1 Year Cellexa Warranty",
      availability: "Pre-order — ships in 7 days",
    },
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12 256GB",
    brand: "OnePlus",
    image:
      "https://images.unsplash.com/photo-1707412512111-15370c1eb6c4?w=800&auto=format&fit=crop",
    price: 219900,
    rating: 4.7,
    reviews: 421,
    inStock: true,
    specs: {
      display: '6.82" LTPO AMOLED, 120Hz',
      displaySize: 6.82,
      processor: "Snapdragon 8 Gen 3",
      processorScore: 94,
      ram: "12 GB",
      ramGB: 12,
      storage: "256 GB",
      storageGB: 256,
      rearCamera: "50 MP + 64 MP Tele + 48 MP UW",
      cameraMP: 50,
      frontCamera: "32 MP",
      battery: "5400 mAh",
      batteryMAh: 5400,
      charging: "100W wired, 50W wireless",
      os: "Android 14, OxygenOS 14",
      connectivity: "5G, Wi-Fi 7, BT 5.4, USB-C",
      sim: "Dual Nano-SIM",
      waterResist: "IP65",
      weight: "220 g",
      colors: "Silky Black, Flowy Emerald",
      warranty: "1 Year Cellexa Warranty",
      availability: "In stock",
    },
  },
];

const RECOMMENDED: Product[] = [
  {
    id: "airpods-pro-2",
    name: "AirPods Pro (2nd Generation) USB-C",
    brand: "Apple",
    price: 89900,
    oldPrice: 99900,
    rating: 4.9,
    reviews: 2104,
    image:
      "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&auto=format&fit=crop",
    badge: { label: "Best Seller", tone: "primary" },
  },
  {
    id: "galaxy-buds-3",
    name: "Galaxy Buds 3 Pro",
    brand: "Samsung",
    price: 64900,
    rating: 4.7,
    reviews: 538,
    image:
      "https://images.unsplash.com/photo-1606741965509-717b9b4e3d4d?w=800&auto=format&fit=crop",
    badge: { label: "New", tone: "success" },
  },
  {
    id: "ipad-air",
    name: 'iPad Air 11" (M2) 128GB Wi-Fi',
    brand: "Apple",
    price: 219900,
    rating: 4.8,
    reviews: 412,
    image:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop",
  },
  {
    id: "watch-series-9",
    name: "Apple Watch Series 9 GPS 45mm",
    brand: "Apple",
    price: 129900,
    oldPrice: 139900,
    rating: 4.8,
    reviews: 880,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop",
    badge: { label: "Save 7%", tone: "promo" },
  },
];

type SpecRow = {
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  rows: {
    label: string;
    key: keyof CompareProduct["specs"];
    /** key on specs to compare numerically; bigger value wins */
    compareKey?: keyof CompareProduct["specs"];
    higherBetter?: boolean;
  }[];
};

const SPEC_GROUPS: SpecRow[] = [
  {
    group: "Display",
    icon: Smartphone,
    rows: [
      { label: "Display", key: "display", compareKey: "displaySize", higherBetter: true },
    ],
  },
  {
    group: "Performance",
    icon: Cpu,
    rows: [
      { label: "Processor", key: "processor", compareKey: "processorScore", higherBetter: true },
      { label: "RAM", key: "ram", compareKey: "ramGB", higherBetter: true },
    ],
  },
  {
    group: "Storage",
    icon: HardDrive,
    rows: [
      { label: "Storage", key: "storage", compareKey: "storageGB", higherBetter: true },
    ],
  },
  {
    group: "Camera",
    icon: Camera,
    rows: [
      { label: "Rear Camera", key: "rearCamera", compareKey: "cameraMP", higherBetter: true },
      { label: "Front Camera", key: "frontCamera" },
    ],
  },
  {
    group: "Battery & Charging",
    icon: Battery,
    rows: [
      { label: "Battery", key: "battery", compareKey: "batteryMAh", higherBetter: true },
      { label: "Charging", key: "charging" },
    ],
  },
  {
    group: "Connectivity",
    icon: Wifi,
    rows: [
      { label: "Network & Wireless", key: "connectivity" },
      { label: "SIM", key: "sim" },
    ],
  },
  {
    group: "Build & Design",
    icon: ShieldCheck,
    rows: [
      { label: "Water Resistance", key: "waterResist" },
      { label: "Weight", key: "weight" },
      { label: "Colors", key: "colors" },
      { label: "Operating System", key: "os" },
    ],
  },
  {
    group: "Warranty & Availability",
    icon: PackageCheck,
    rows: [
      { label: "Warranty", key: "warranty" },
      { label: "Availability", key: "availability" },
    ],
  },
];

const Compare = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "iphone-15-pro",
    "galaxy-s24-ultra",
    "pixel-8-pro",
  ]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");

  const products = useMemo(
    () =>
      selectedIds
        .map((id) => CATALOG.find((p) => p.id === id))
        .filter((p): p is CompareProduct => Boolean(p)),
    [selectedIds],
  );

  const remove = (id: string) =>
    setSelectedIds((s) => s.filter((x) => x !== id));

  const add = (id: string) => {
    if (selectedIds.length >= 3) return;
    if (selectedIds.includes(id)) return;
    setSelectedIds((s) => [...s, id]);
    setPickerOpen(false);
  };

  const availableToAdd = CATALOG.filter(
    (p) =>
      !selectedIds.includes(p.id) &&
      (search.trim() === "" ||
        (p.name + " " + p.brand).toLowerCase().includes(search.toLowerCase())),
  );

  const bestPrice = Math.min(...products.map((p) => p.price));

  // Determine per-row best index (only when compareKey present and >1 product)
  const bestIndexForRow = (
    compareKey?: keyof CompareProduct["specs"],
    higherBetter = true,
  ): number | null => {
    if (!compareKey || products.length < 2) return null;
    const values = products.map((p) => p.specs[compareKey] as number);
    if (values.some((v) => typeof v !== "number")) return null;
    const target = higherBetter ? Math.max(...values) : Math.min(...values);
    // Return -1 if multiple share best (don't highlight)
    const winners = values.filter((v) => v === target).length;
    if (winners > 1) return -1;
    return values.indexOf(target);
  };

  const slots = Array.from({ length: 3 }).map((_, i) => products[i] ?? null);
  const filledCount = products.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb + title */}
        <section className="border-b border-border/60 bg-gradient-soft">
          <div className="container-page py-6 sm:py-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/shop" className="hover:text-primary">Shop</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">Compare</span>
            </nav>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  <Scale className="h-3.5 w-3.5" /> Side-by-side comparison
                </span>
                <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Compare Products
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  Compare up to 3 products side by side. We highlight the better value for each spec to help you decide faster.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="rounded-full border border-border bg-background px-3 py-1.5 font-medium">
                  <span className="text-primary">{filledCount}</span>
                  <span className="text-muted-foreground"> / 3 selected</span>
                </div>
                <Button variant="outline" asChild size="sm">
                  <Link to="/shop">Browse Shop</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison area */}
        <section className="container-page py-8 sm:py-10">
          {/* Product header cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {slots.map((p, i) => {
              if (!p) {
                return (
                  <AddSlot
                    key={`empty-${i}`}
                    onClick={() => setPickerOpen(true)}
                  />
                );
              }
              const isCheapest = p.price === bestPrice && filledCount > 1;
              return (
                <article
                  key={p.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:shadow-lift"
                >
                  {isCheapest && (
                    <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-success-foreground shadow-sm">
                      <Sparkles className="h-3 w-3" /> Best Price
                    </div>
                  )}
                  <button
                    aria-label="Remove from comparison"
                    onClick={() => remove(p.id)}
                    className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition-all hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <Link
                    to={`/product/${p.id}`}
                    className="block aspect-square overflow-hidden bg-gradient-brand-soft"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {p.brand}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium">
                        <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                        {p.rating}
                        <span className="text-muted-foreground">({p.reviews})</span>
                      </span>
                    </div>

                    <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug">
                      {p.name}
                    </h3>

                    <div className="flex items-end gap-2">
                      <span className="font-display text-xl font-extrabold text-foreground">
                        {fmtLKR(p.price)}
                      </span>
                      {p.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {fmtLKR(p.oldPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {p.inStock ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 font-semibold text-success">
                          <Check className="h-3 w-3" /> In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-1 font-semibold text-destructive">
                          <X className="h-3 w-3" /> Out of Stock
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
                      <Button asChild variant="outline" className="flex-1">
                        <Link to={`/product/${p.id}`}>
                          <Eye className="h-4 w-4" /> View
                        </Link>
                      </Button>
                      <Button className="flex-1" disabled={!p.inStock}>
                        <ShoppingCart className="h-4 w-4" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty state */}
          {filledCount === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
              <Scale className="mx-auto h-10 w-10 text-muted-foreground" />
              <h2 className="mt-3 font-display text-xl font-bold">
                No products selected
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add up to 3 products to compare specs side by side.
              </p>
              <Button className="mt-5" onClick={() => setPickerOpen(true)}>
                <Plus className="h-4 w-4" /> Add a Product
              </Button>
            </div>
          )}

          {/* Spec table */}
          {filledCount > 0 && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <div className="flex items-center justify-between border-b border-border bg-gradient-brand-soft px-5 py-4">
                <h2 className="font-display text-lg font-bold sm:text-xl">
                  Specifications
                </h2>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  Better values are <span className="font-semibold text-primary">highlighted</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <colgroup>
                    <col className="w-[34%] sm:w-[28%]" />
                    {slots.map((_, i) => (
                      <col key={i} className="w-[22%] sm:w-[24%]" />
                    ))}
                  </colgroup>

                  <tbody>
                    {/* Price summary row */}
                    <tr className="border-b border-border/70 bg-surface/60">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-xs text-muted-foreground"
                      >
                        Price
                      </th>
                      {slots.map((p, i) => (
                        <td
                          key={`price-${i}`}
                          className={`px-4 py-3 align-middle ${
                            p && p.price === bestPrice && filledCount > 1
                              ? "bg-primary/5"
                              : ""
                          }`}
                        >
                          {p ? (
                            <div className="flex flex-col">
                              <span
                                className={`font-display font-extrabold ${
                                  p.price === bestPrice && filledCount > 1
                                    ? "text-primary"
                                    : "text-foreground"
                                }`}
                              >
                                {fmtLKR(p.price)}
                              </span>
                              {p.oldPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {fmtLKR(p.oldPrice)}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {SPEC_GROUPS.map((group) => (
                      <FragmentGroup
                        key={group.group}
                        group={group}
                        slots={slots}
                        bestIndexForRow={bestIndexForRow}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 border-t border-border bg-surface/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Specifications are for reference only. Final specs may vary by region.
                </p>
                <div className="flex flex-wrap gap-2">
                  {filledCount < 3 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPickerOpen(true)}
                    >
                      <Plus className="h-4 w-4" /> Add another product
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIds([])}
                  >
                    <Trash2 className="h-4 w-4" /> Clear all
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Recommended */}
        <section className="border-t border-border/60 bg-gradient-soft">
          <div className="container-page py-12 sm:py-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  <Sparkles className="h-3.5 w-3.5" /> Recommended for you
                </span>
                <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  You may also like
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
              >
                View all →
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {RECOMMENDED.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Product picker dialog */}
      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Add a product to compare
            </DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search smartphones, brands…"
              className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mt-2 max-h-[55vh] space-y-2 overflow-y-auto pr-1">
            {availableToAdd.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No products match your search.
              </p>
            ) : (
              availableToAdd.map((p) => (
                <button
                  key={p.id}
                  onClick={() => add(p.id)}
                  className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary/40 hover:shadow-soft"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-brand-soft">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {p.brand}
                    </div>
                    <div className="text-sm font-bold leading-tight">
                      {p.name}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-primary">
                      {fmtLKR(p.price)}
                    </div>
                  </div>
                  <div className="shrink-0 rounded-full bg-primary/10 p-2 text-primary">
                    <Plus className="h-4 w-4" />
                  </div>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AddSlot = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-surface/60 p-8 text-center transition-all hover:border-primary hover:bg-accent/40"
  >
    <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
      <Plus className="h-6 w-6" />
    </div>
    <div>
      <div className="font-display text-base font-bold">Add a product</div>
      <div className="mt-1 text-xs text-muted-foreground">
        Pick a product to compare side by side
      </div>
    </div>
  </button>
);

const FragmentGroup = ({
  group,
  slots,
  bestIndexForRow,
}: {
  group: SpecRow;
  slots: (CompareProduct | null)[];
  bestIndexForRow: (
    compareKey?: keyof CompareProduct["specs"],
    higherBetter?: boolean,
  ) => number | null;
}) => {
  const Icon = group.icon;
  return (
    <>
      <tr className="border-y border-border bg-surface/40">
        <th
          scope="row"
          colSpan={1 + slots.length}
          className="px-4 py-2.5 text-left"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/80">
            <Icon className="h-4 w-4 text-primary" />
            {group.group}
          </span>
        </th>
      </tr>
      {group.rows.map((row) => {
        const bestIdx = bestIndexForRow(row.compareKey, row.higherBetter);
        // Account for products array index vs slots index (slots may include nulls)
        const productIndices = slots.map((s, idx) => (s ? idx : -1));
        const realProducts = slots.filter(Boolean) as CompareProduct[];
        // bestIdx is index in realProducts; map to slot index
        const bestSlotIdx =
          bestIdx !== null && bestIdx >= 0
            ? productIndices.filter((i) => i !== -1)[bestIdx]
            : bestIdx;

        return (
          <tr key={row.label} className="border-b border-border/60">
            <th
              scope="row"
              className="px-4 py-3 text-left align-top font-medium text-muted-foreground"
            >
              {row.label}
            </th>
            {slots.map((p, i) => {
              const isBest =
                bestSlotIdx !== null && bestSlotIdx === i && p !== null;
              return (
                <td
                  key={`${row.label}-${i}`}
                  className={`px-4 py-3 align-top ${
                    isBest ? "bg-primary/5" : ""
                  }`}
                >
                  {p ? (
                    <div className="flex items-start gap-2">
                      <span
                        className={`text-sm leading-snug ${
                          isBest ? "font-semibold text-primary" : "text-foreground"
                        }`}
                      >
                        {p.specs[row.key] as string}
                      </span>
                      {isBest && (
                        <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                          Best
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default Compare;
