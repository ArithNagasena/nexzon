import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Search,
  Star,
  Camera,
  Gamepad2,
  BatteryFull,
  Wallet,
  LayoutGrid,
  Rows3,
  ArrowRight,
  Cpu,
  Smartphone,
  Signal,
  Trophy,
  X,
} from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import ProductCard, { type Product } from "@/components/NexZon/ProductCard";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { phones as catalog, fmtLKR, type CatalogItem } from "@/data/catalog";
import iphone17ProMax from "@/assets/iphone-17-pro-max.png";


const useCases = [
  { id: "camera", label: "Best cameras", desc: "48MP and up", icon: Camera },
  { id: "gaming", label: "Built for gaming", desc: "12GB+ RAM", icon: Gamepad2 },
  { id: "battery", label: "All-day battery", desc: "5,000mAh+", icon: BatteryFull },
  { id: "value", label: "Value picks", desc: "Under LKR 270,000", icon: Wallet },
];

const picks = [
  { id: "iphone-17-pro-max", crown: "Best overall", why: "The most complete phone we sell — a 48MP main sensor, the fastest chip on the shelf, and resale value that holds." },
  { id: "galaxy-s26-ultra", crown: "Best camera", why: "A 200MP sensor with a proper optical zoom range. If photography decides your purchase, this is it." },
  { id: "oneplus-13r", crown: "Best value", why: "16GB of RAM and a 6,000mAh cell for well under half the price of the flagships above." },
];

const brandList = ["Apple", "Samsung", "Google", "OnePlus", "HONOR"];

const guide = [
  { q: "How much should I spend on a phone in Sri Lanka?", a: "Under LKR 150,000 gets a dependable everyday phone. LKR 200,000–300,000 is the sweet spot for a great camera and years of updates. Above LKR 400,000 you are paying for zoom lenses, foldables and top-end chips." },
  { q: "Is a foldable worth it?", a: "A flip saves pocket space; a book-style fold gives you a tablet-sized screen. Both cost more and weigh more than a slab phone. Buy one because you want the form factor, not for the camera." },
  { q: "Do I need 12GB of RAM?", a: "For messaging, video and photos, 8GB is plenty. 12GB and above matters if you keep many apps resident or play demanding games for long sessions." },
  { q: "Will my phone work on all Sri Lankan networks?", a: "Every handset here is dual-SIM and supports 5G on Dialog and Mobitel where coverage exists. Devices are the international model, not carrier-locked." },
];


const SpecPill = ({ icon: Icon, children }: { icon: typeof Cpu; children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground/75">
    <Icon className="h-3.5 w-3.5 text-primary" />
    {children}
  </span>
);

/* List-view row — the grid uses ProductCard, this shows the specs instead. */
const PhoneRow = ({ p }: { p: CatalogItem }) => {
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  return (
    <Link
      to={`/product/${p.id}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:flex-row sm:items-center"
    >
      <div className="grid h-32 w-32 shrink-0 place-items-center self-center rounded-xl bg-white">
        <img src={p.image} alt={p.name} loading="lazy" className="h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{p.brand}</span>
        <h3 className="font-display text-base font-bold leading-tight text-foreground">{p.name}</h3>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="text-xs font-semibold text-foreground">{p.rating}</span>
          <span className="text-xs text-muted-foreground">({p.reviews})</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <SpecPill icon={Smartphone}>{p.screen}"</SpecPill>
          <SpecPill icon={Cpu}>{p.ram} RAM</SpecPill>
          <SpecPill icon={BatteryFull}>{(p.battery ?? 0).toLocaleString()}mAh</SpecPill>
          <SpecPill icon={Camera}>{p.camera}MP</SpecPill>
          {p.fiveG && <SpecPill icon={Signal}>5G</SpecPill>}
        </div>
      </div>

      <div className="shrink-0 sm:w-44 sm:text-right">
        {p.oldPrice && (
          <div className="text-xs text-muted-foreground line-through">{fmtLKR(p.oldPrice)}</div>
        )}
        <div className="font-display text-xl font-extrabold text-foreground">{fmtLKR(p.price)}</div>
        {discount > 0 && (
          <span className="mt-1 inline-block rounded-full bg-promo px-2 py-0.5 text-[10px] font-bold text-promo-foreground">
            Save {discount}%
          </span>
        )}
        <div className="mt-1 text-[11px] text-muted-foreground">
          or {fmtLKR(Math.round(p.price / 12))}/mo × 12
        </div>
      </div>
    </Link>
  );
};

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

  const [useCase, setUseCase] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = `${categoryName} — Best Prices in Sri Lanka | Nexzon`;
    const desc = `Compare and buy ${categoryName.toLowerCase()} at Nexzon. Genuine stock, warranty support, 0% installments and islandwide delivery.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [categoryName]);

  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const filtered = useMemo(() => {
    let list = catalog.filter((p) => {
      if (useCase && !(p.uses ?? []).includes(useCase)) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (search && !`${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "battery": list = [...list].sort((a, b) => (b.battery ?? 0) - (a.battery ?? 0)); break;
    }
    return list;
  }, [useCase, brands, sort, search]);

  const pickCards = picks
    .map((k) => ({ ...k, phone: catalog.find((c) => c.id === k.id)! }))
    .filter((k) => k.phone);

  const hasFilters = Boolean(useCase) || brands.length > 0 || search.length > 0;
  const reset = () => {
    setUseCase(null);
    setBrands([]);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{categoryName}</span>
          </nav>
        </div>

        {/* Split hero */}
        <section className="container-page pt-5">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep">
            <div className="grid items-center gap-6 p-6 sm:gap-8 sm:p-10 lg:grid-cols-2 lg:p-12">
              <div className="text-primary-foreground">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                  <Trophy className="h-3.5 w-3.5" /> {catalog.length} models in stock
                </span>
                <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                  {categoryName}, chosen properly.
                </h1>
                <p className="mt-4 hidden max-w-md text-sm text-white/85 sm:block sm:text-base">
                  Filter by what you actually care about — camera, battery, gaming or price — and compare
                  the specs side by side before you commit.
                </p>
                <dl className="mt-5 flex flex-wrap gap-5 sm:mt-6 sm:gap-6">
                  {[
                    { k: "From", v: fmtLKR(Math.min(...catalog.map((c) => c.price))) },
                    { k: "Brands", v: String(brandList.length) },
                    { k: "Installments", v: "0% · 12mo" },
                  ].map((s) => (
                    <div key={s.k}>
                      <dt className="text-[11px] uppercase tracking-wider text-white/60">{s.k}</dt>
                      <dd className="font-display text-lg font-extrabold">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="isolate overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-secondary p-6">
                <img
                  src={iphone17ProMax}
                  alt="Featured smartphone"
                  className="mx-auto h-48 w-auto object-contain mix-blend-multiply sm:h-64"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Use-case tiles */}
        <section className="container-page pt-12">
          <h2 className="font-display text-xl font-bold">What matters most to you?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => {
              const active = useCase === u.id;
              return (
                <button
                  key={u.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setUseCase(active ? null : u.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5",
                    active
                      ? "border-primary bg-accent shadow-lift"
                      : "border-border bg-card shadow-soft hover:border-primary/40",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors",
                      active ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
                    )}
                  >
                    <u.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-foreground">{u.label}</span>
                    <span className="block text-xs text-muted-foreground">{u.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Editor's picks */}
        <section className="container-page pt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold">Our picks this month</h2>
              <p className="mt-1 text-sm text-muted-foreground">Three phones we would recommend without hesitating.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {pickCards.map(({ crown, why, phone }) => (
              <Link
                key={phone.id}
                to={`/product/${phone.id}`}
                className="group flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="grid h-28 w-24 shrink-0 place-items-center rounded-xl bg-white">
                  <img src={phone.image} alt={phone.name} loading="lazy" className="h-24 w-auto object-contain" />
                </div>
                <div className="min-w-0">
                  <span className="inline-block rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                    {crown}
                  </span>
                  <h3 className="mt-2 font-display text-sm font-bold leading-tight text-foreground">{phone.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{why}</p>
                  <p className="mt-2 font-display text-base font-extrabold text-foreground">{fmtLKR(phone.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Catalog */}
        <section className="container-page pt-12">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative lg:w-72">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${categoryName.toLowerCase()}…`}
                  className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {brandList.map((b) => {
                  const active = brands.includes(b);
                  return (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleBrand(b)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground/75 hover:border-primary/40 hover:text-primary",
                      )}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 lg:ml-auto">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="h-10 w-[170px] rounded-xl">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="battery">Biggest Battery</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex overflow-hidden rounded-xl border border-border" role="group" aria-label="View">
                  {([["grid", LayoutGrid], ["list", Rows3]] as const).map(([v, Icon]) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={view === v}
                      aria-label={`${v} view`}
                      onClick={() => setView(v)}
                      className={cn(
                        "grid h-10 w-10 place-items-center transition-colors",
                        view === v ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-primary",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">
                <strong className="text-foreground">{filtered.length}</strong> of {catalog.length} models
              </span>
              {hasFilters && (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <X className="h-3 w-3" /> Clear filters
                </button>
              )}
            </div>
          </div>

          {filtered.length > 0 ? (
            view === "grid" ? (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="mt-5 flex flex-col gap-3">
                {filtered.map((p) => (
                  <PhoneRow key={p.id} p={p} />
                ))}
              </div>
            )
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <Smartphone className="mx-auto h-10 w-10 text-muted-foreground/60" />
              <h3 className="mt-3 font-display text-lg font-bold">Nothing matches those filters</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try clearing a filter or two.</p>
              <Button variant="outline" className="mt-4" onClick={reset}>Clear filters</Button>
            </div>
          )}
        </section>

        {/* Spec comparison */}
        <section className="container-page pt-14">
          <h2 className="font-display text-xl font-bold">Our picks, side by side</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Spec</th>
                  {pickCards.map(({ phone }) => (
                    <th key={phone.id} className="p-4 text-left font-display text-sm font-bold text-foreground">
                      {phone.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([
                  ["Price", (p: CatalogItem) => fmtLKR(p.price)],
                  ["Screen", (p: CatalogItem) => `${p.screen}"`],
                  ["RAM", (p: CatalogItem) => p.ram],
                  ["Storage", (p: CatalogItem) => p.storage],
                  ["Battery", (p: CatalogItem) => `${p.battery.toLocaleString()}mAh`],
                  ["Main camera", (p: CatalogItem) => `${p.camera}MP`],
                  ["Rating", (p: CatalogItem) => `${p.rating} / 5`],
                ] as const).map(([label, get], i) => (
                  <tr key={label} className={cn("border-b border-border last:border-0", i % 2 === 1 && "bg-surface/50")}>
                    <th scope="row" className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </th>
                    {pickCards.map(({ phone }) => (
                      <td key={phone.id} className="p-4 font-semibold text-foreground">{get(phone)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/compare" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Build your own comparison <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Buying guide */}
        <section className="container-page py-14">
          <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Buying guide</span>
              <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
                Not sure which one?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A few honest answers to the questions our Colombo store gets asked every day.
              </p>
              <Button asChild className="mt-5">
                <Link to="/help">Talk to a specialist</Link>
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {guide.map((g, i) => (
                <AccordionItem
                  key={g.q}
                  value={`g-${i}`}
                  className="mb-3 overflow-hidden rounded-xl border border-border bg-card px-5 shadow-soft"
                >
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {g.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {g.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Category;
