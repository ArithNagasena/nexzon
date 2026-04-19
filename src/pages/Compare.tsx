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
  Zap,
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
} from "@/components/ui/dialog";
import galaxyS26UltraImg from "@/assets/galaxy-s26-ultra.png";
import iphone17ProMaxImg from "@/assets/iphone-17-pro-max.png";
import iphone17eImg from "@/assets/iphone-17e.png";

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
    displaySize: number;
    processor: string;
    processorScore: number;
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

/* Real-world spec data sourced from official Apple & Samsung announcements / leaks */
const CATALOG: CompareProduct[] = [
  {
    id: "galaxy-s26-ultra",
    name: "Samsung Galaxy S26 Ultra 5G 512GB",
    brand: "Samsung",
    image: galaxyS26UltraImg,
    price: 489900,
    oldPrice: 519900,
    rating: 4.9,
    reviews: 312,
    inStock: true,
    specs: {
      display: '6.9" QHD+ Dynamic AMOLED 2X, 1–120Hz, 2600 nits',
      displaySize: 6.9,
      processor: "Snapdragon 8 Elite Gen 5 for Galaxy (3nm)",
      processorScore: 99,
      ram: "16 GB LPDDR5X",
      ramGB: 16,
      storage: "512 GB UFS 4.0",
      storageGB: 512,
      rearCamera: "200 MP Main + 50 MP Periscope (5x) + 50 MP Tele (3x) + 50 MP UW",
      cameraMP: 200,
      frontCamera: "12 MP Dual Pixel AF",
      battery: "5000 mAh (Si-C)",
      batteryMAh: 5000,
      charging: "60W wired, 25W wireless Qi2",
      os: "Android 16, One UI 8",
      connectivity: "5G, Wi-Fi 7, BT 5.4, UWB, USB-C 3.2",
      sim: "Nano-SIM + eSIM",
      waterResist: "IP68 (1.5m / 30 min)",
      weight: "218 g",
      colors: "Titanium Silver, Black, Jade, Orange",
      warranty: "1 Year Samsung Sri Lanka Warranty",
      availability: "In stock — Colombo, Kandy & Galle",
    },
  },
  {
    id: "iphone-17-pro-max",
    name: "Apple iPhone 17 Pro Max 512GB",
    brand: "Apple",
    image: iphone17ProMaxImg,
    price: 524900,
    rating: 4.9,
    reviews: 287,
    inStock: true,
    specs: {
      display: '6.9" Super Retina XDR LTPO OLED, 1–120Hz ProMotion, 3000 nits',
      displaySize: 6.9,
      processor: "Apple A19 Pro (3nm, 6-core CPU, 6-core GPU)",
      processorScore: 100,
      ram: "12 GB LPDDR5X",
      ramGB: 12,
      storage: "512 GB NVMe",
      storageGB: 512,
      rearCamera: "48 MP Fusion + 48 MP Telephoto (8x) + 48 MP Ultra-Wide",
      cameraMP: 48,
      frontCamera: "18 MP Center Stage",
      battery: "5088 mAh",
      batteryMAh: 5088,
      charging: "40W wired, 25W MagSafe wireless",
      os: "iOS 26",
      connectivity: "5G, Wi-Fi 7, BT 6.0, USB-C 3.2 (10Gbps)",
      sim: "Dual eSIM",
      waterResist: "IP68 (6m / 30 min)",
      weight: "233 g",
      colors: "Cosmic Orange, Deep Blue, Silver, Black",
      warranty: "1 Year Apple International Warranty",
      availability: "Ships in 24 hours",
    },
  },
];

const RECOMMENDED: Product[] = [
  {
    id: "iphone-17e",
    name: "Apple iPhone 17e 128GB",
    brand: "Apple",
    price: 219900,
    oldPrice: 234900,
    rating: 4.7,
    reviews: 612,
    image: iphone17eImg,
    badge: { label: "New", tone: "success" },
  },
  {
    id: "galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra 256GB",
    brand: "Samsung",
    price: 419900,
    oldPrice: 449900,
    rating: 4.8,
    reviews: 1284,
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/levant/2501/gallery/levant-galaxy-s25-ultra-s928-sm-s938bzkcmea-thumb-543237295",
    badge: { label: "Best Seller", tone: "primary" },
  },
  {
    id: "iphone-15-pro-max",
    name: "Apple iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: 379900,
    oldPrice: 419900,
    rating: 4.9,
    reviews: 2104,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-naturaltitanium-select?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693010532225",
    badge: { label: "Save 10%", tone: "promo" },
  },
  {
    id: "google-pixel-10",
    name: "Google Pixel 10 Pro 256GB",
    brand: "Google",
    price: 289900,
    rating: 4.7,
    reviews: 488,
    image:
      "https://lh3.googleusercontent.com/Z9aBC_-OAS9oQX1WRUnwm-NWdbUTk_Hw-MFHlFEf_OF8YTqj-zYxTSBzLPHowFh3vnPwzXeu2X5IZ2qjQfzcg2Pqw1jYK7w=rw-e365-w3000",
    badge: { label: "Hot", tone: "warning" },
  },
];

type SpecRow = {
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  rows: {
    label: string;
    key: keyof CompareProduct["specs"];
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

const MAX_SLOTS = 2;

const Compare = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "galaxy-s26-ultra",
    "iphone-17-pro-max",
  ]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
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

  const openPicker = (slotIdx: number | null) => {
    setPickerSlot(slotIdx);
    setSearch("");
    setPickerOpen(true);
  };

  const choose = (id: string) => {
    if (selectedIds.includes(id)) {
      setPickerOpen(false);
      return;
    }
    setSelectedIds((current) => {
      // Replace specific slot
      if (pickerSlot !== null && current[pickerSlot] !== undefined) {
        const next = [...current];
        next[pickerSlot] = id;
        return next;
      }
      // Append if room
      if (current.length < MAX_SLOTS) return [...current, id];
      return current;
    });
    setPickerOpen(false);
  };

  const availableToAdd = CATALOG.filter(
    (p) =>
      !selectedIds.includes(p.id) &&
      (search.trim() === "" ||
        (p.name + " " + p.brand).toLowerCase().includes(search.toLowerCase())),
  );

  const slots = Array.from({ length: MAX_SLOTS }).map((_, i) => products[i] ?? null);
  const filledCount = products.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Simple breadcrumb header (Cart-style) */}
        <div className="border-b border-border/60 bg-surface/60">
          <div className="container-page py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/shop" className="hover:text-primary">Shop</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">Compare Products</span>
            </nav>
          </div>
        </div>

        {/* Title bar */}
        <section className="container-page pb-2 pt-6 sm:pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Compare Products
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                See key specs of selected products side by side to help you decide faster.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="rounded-full border border-border bg-background px-3 py-1.5 font-medium">
                <span className="text-foreground">{filledCount}</span>
                <span className="text-muted-foreground"> / {MAX_SLOTS} selected</span>
              </div>
              <Button variant="outline" asChild size="sm">
                <Link to="/shop">Browse Shop</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Comparison area */}
        <section className="container-page py-6 sm:py-8">
          {/* Product header cards removed per request */}

          {/* Empty state */}
          {filledCount === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
              <Zap className="mx-auto h-10 w-10 text-muted-foreground" />
              <h2 className="mt-3 font-display text-xl font-bold">
                No products selected
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add up to {MAX_SLOTS} products to compare specs side by side.
              </p>
              <Button className="mt-5" onClick={() => openPicker(null)}>
                <Plus className="h-4 w-4" /> Add a Product
              </Button>
            </div>
          )}

          {/* Spec table */}
          {filledCount > 0 && (
            <div className="mt-8 overflow-hidden rounded-2xl border-2 border-border bg-card shadow-soft">
              <div className="flex items-center justify-between border-b-2 border-border bg-surface/60 px-5 py-4">
                <h2 className="font-display text-lg font-bold sm:text-xl">
                  Full Specifications
                </h2>
              </div>


              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-sm">
                  <colgroup>
                    <col className="w-[24%]" />
                    {slots.map((_, i) => (
                      <col key={i} className="w-[38%]" />
                    ))}
                  </colgroup>


                  <thead>
                    <tr className="border-b-2 border-border bg-surface/40">
                      <th
                        scope="col"
                        className="border-r border-border px-4 py-5 text-left align-bottom"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Product
                        </span>
                      </th>
                      {slots.map((p, i) => (
                        <th
                          key={`hdr-${i}`}
                          scope="col"
                          className={`px-4 py-5 align-bottom ${
                            i < slots.length - 1 ? "border-r border-border" : ""
                          }`}
                        >
                          {p ? (
                            <div className="flex flex-col items-center gap-3 text-center">
                              <div className="grid h-48 w-48 place-items-center overflow-hidden rounded-xl border border-border bg-background sm:h-56 sm:w-56">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  loading="lazy"
                                  className="h-full w-full object-contain p-3"
                                />
                              </div>
                              <div>
                                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                  {p.brand}
                                </div>
                                <div className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-foreground">
                                  {p.name}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openPicker(i)}
                                >
                                  Change
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => remove(p.id)}
                                  aria-label="Remove product"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => openPicker(i)}
                              className="mx-auto grid h-48 w-48 place-items-center rounded-xl border-2 border-dashed border-border bg-surface/40 text-muted-foreground transition-colors hover:border-primary hover:text-primary sm:h-56 sm:w-56"
                            >
                              <div className="flex flex-col items-center gap-2">
                                <Plus className="h-6 w-6" />
                                <span className="text-xs font-semibold">Add product</span>
                              </div>
                            </button>
                          )}
                        </th>
                      ))}
                    </tr>

                    <tr className="border-b-2 border-border bg-background">
                      <th
                        scope="row"
                        className="border-r border-border px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground"
                      >
                        Price
                      </th>
                      {slots.map((p, i) => (
                        <td
                          key={`price-${i}`}
                          className={`px-4 py-3 text-center align-middle ${
                            i < slots.length - 1 ? "border-r border-border" : ""
                          }`}
                        >
                          {p ? (
                            <div className="flex flex-col items-center">
                              <span className="font-display text-lg font-extrabold text-foreground">
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
                  </thead>


                  <tbody>
                    {SPEC_GROUPS.map((group) => (
                      <FragmentGroup
                        key={group.group}
                        group={group}
                        slots={slots}
                        
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 border-t-2 border-border bg-surface/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Specifications are for reference only. Final specs may vary by region.
                </p>
                <div className="flex flex-wrap gap-2">
                  {filledCount < MAX_SLOTS && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openPicker(null)}
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
                <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Recommended for you
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
              {pickerSlot !== null ? "Change product" : "Add a product to compare"}
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
                  onClick={() => choose(p.id)}
                  className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary/40 hover:shadow-soft"
                >
                  <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-gradient-brand-soft">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-contain p-1"
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
}: {
  group: SpecRow;
  slots: (CompareProduct | null)[];
}) => {
  const Icon = group.icon;
  return (
    <>
      <tr className="border-y-2 border-border bg-surface/60">
        <th
          scope="row"
          colSpan={1 + slots.length}
          className="px-4 py-3 text-left"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
            <Icon className="h-4 w-4 text-primary" />
            {group.group}
          </span>
        </th>
      </tr>
      {group.rows.map((row, rowIdx) => (
        <tr
          key={row.label}
          className={`border-b border-border ${
            rowIdx % 2 === 0 ? "bg-background" : "bg-surface/30"
          }`}
        >
          <th
            scope="row"
            className="border-r border-border px-4 py-3.5 text-left align-top text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {row.label}
          </th>
          {slots.map((p, i) => (
            <td
              key={`${row.label}-${i}`}
              className={`px-4 py-3.5 align-top ${
                i < slots.length - 1 ? "border-r border-border" : ""
              }`}
            >
              {p ? (
                <span className="text-sm leading-snug text-foreground">
                  {p.specs[row.key] as string}
                </span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default Compare;
