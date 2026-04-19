import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  Wallet,
  BadgeCheck,
  RefreshCcw,
  CreditCard,
  Minus,
  Plus,
  Share2,
  GitCompare,
  Check,
  Cpu,
  Camera,
  Battery,
  Smartphone,
  Wifi,
  HardDrive,
  ChevronLeft,
} from "lucide-react";

import PromoBar from "@/components/cellexa/PromoBar";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import ProductCard, { type Product } from "@/components/cellexa/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import phone1 from "@/assets/iphone-17-pro-max-orange.png";
import phone2 from "@/assets/iphone-17-pro-max-white.png";
import phone3 from "@/assets/iphone-17-pro-max-camera.png";
import tablet from "@/assets/product-tablet.jpg";
import phone4 from "@/assets/iphone-17-pro-max-blue.png";
import earbuds from "@/assets/product-earbuds.jpg";
import watch from "@/assets/product-watch.jpg";
import productCase from "@/assets/product-case.jpg";
import charger from "@/assets/product-charger.jpg";
import accessoryImg1 from "@/assets/apple-watch-s11.png";

/* -------------------- Product data -------------------- */
const productDetails = {
  id: "galaxy-s24-ultra",
  brand: "Apple",
  brandSlug: "apple",
  category: "Smartphones",
  categorySlug: "smartphones",
  name: "iPhone 17 Pro Max",
  tagline: "The most powerful iPhone ever — heat-forged aluminum unibody, A19 Pro chip, and up to 39 hrs video playback.",
  rating: 4.8,
  reviews: 1248,
  sold: "2,500+",
  price: 449900,
  oldPrice: 519900,
  badges: ["Best Seller"],
  inStock: true,
  stockCount: 14,
  images: [phone1, phone2, phone3, phone4],
  colors: [
    { name: "Cosmic Orange", value: "#d96b3a" },
    { name: "Silver", value: "#e8e8ea" },
    { name: "Deep Blue", value: "#2b3a5a" },
  ],
  storage: ["256GB", "512GB", "1TB", "2TB"],
  ram: ["12GB"],
  highlights: [
    { icon: Smartphone, label: "Display", value: '6.9" Super Retina XDR OLED, 120Hz ProMotion' },
    { icon: Camera, label: "Camera", value: "48MP Fusion Triple + 18MP Selfie" },
    { icon: Battery, label: "Battery", value: "Up to 37 hrs video, 40W Fast Charge" },
    { icon: Cpu, label: "Processor", value: "Apple A19 Pro chip" },
    { icon: Wifi, label: "Connectivity", value: "5G, Wi-Fi 7, BT 6.0" },
    { icon: HardDrive, label: "Storage", value: "Up to 2TB, 12GB RAM" },
  ],
  specs: [
    { group: "Display", rows: [
      ["Size", "6.9 inches"],
      ["Type", "Super Retina XDR OLED, LTPO, 120Hz ProMotion"],
      ["Resolution", "2868 x 1320 (460 ppi)"],
      ["Protection", "Ceramic Shield 2"],
      ["Brightness", "3000 nits peak (outdoor)"],
    ]},
    { group: "Performance", rows: [
      ["Chipset", "Apple A19 Pro (3nm)"],
      ["RAM", "12 GB"],
      ["Storage", "256GB / 512GB / 1TB / 2TB"],
      ["OS", "iOS 26"],
    ]},
    { group: "Camera", rows: [
      ["Main", "48 MP Fusion, f/1.78, OIS"],
      ["Ultrawide", "48 MP, f/2.2, 120° field of view"],
      ["Telephoto", "48 MP, 8x optical zoom (tetraprism)"],
      ["Front", "18 MP Center Stage, f/1.9"],
      ["Video", "4K Dolby Vision @ 120fps, ProRes RAW"],
    ]},
    { group: "Battery & Charging", rows: [
      ["Capacity", "Up to 37 hours video playback"],
      ["Wired", "40W USB-C Fast Charging"],
      ["Wireless", "25W MagSafe, 15W Qi2"],
    ]},
    { group: "Design & Build", rows: [
      ["Frame", "Aerospace-grade Aluminum unibody"],
      ["Back", "Ceramic Shield with vapor chamber cooling"],
      ["Water Resistance", "IP68 (6m up to 30 mins)"],
      ["Weight", "233 g"],
    ]},
    { group: "In the Box", rows: [
      ["Contents", "iPhone 17 Pro Max, USB-C Charge Cable (1m), Documentation"],
      ["Warranty", "1-year limited Apple warranty (Sri Lanka)"],
    ]},
  ],
};

const reviewsData = {
  average: 4.8,
  total: 1248,
  breakdown: [
    { stars: 5, count: 942 },
    { stars: 4, count: 220 },
    { stars: 3, count: 58 },
    { stars: 2, count: 18 },
    { stars: 1, count: 10 },
  ],
  items: [
    {
      name: "Dinesh P.",
      city: "Colombo",
      rating: 5,
      date: "2 weeks ago",
      title: "Best iPhone Apple has ever made",
      body: "Coming from the iPhone 15 Pro Max, the A19 Pro chip is blazing fast and the new aluminum unibody feels incredible. The 8x telephoto is a game changer for low-light shots. Cellexa delivered next day in Colombo with a sealed box.",
      verified: true,
    },
    {
      name: "Hasini R.",
      city: "Kandy",
      rating: 5,
      date: "1 month ago",
      title: "Battery life is unreal",
      body: "37 hours of video playback is no joke — easily lasts me 2 days with normal use. ProMotion 120Hz is buttery smooth and iOS 26 with Apple Intelligence is genuinely useful. Genuine Apple warranty card included.",
      verified: true,
    },
    {
      name: "Roshan M.",
      city: "Galle",
      rating: 4,
      date: "1 month ago",
      title: "Stunning camera, slightly heavy",
      body: "48MP Fusion camera produces incredible detail and the new vapor chamber keeps it cool during 4K ProRes recording. Only gripe is the 233g weight — noticeable after long use. Installment plan from Cellexa made it affordable.",
      verified: true,
    },
  ],
};

const relatedProducts: Product[] = [
  { id: "p2", name: "Samsung Galaxy S24+ 5G 256GB", brand: "Samsung", price: 329900, oldPrice: 369900, rating: 4.7, reviews: 612, image: phone2, badge: { label: "Hot Deal", tone: "promo" } },
  { id: "p3", name: "Samsung Galaxy Z Fold5 5G 512GB", brand: "Samsung", price: 559900, rating: 4.6, reviews: 234, image: phone3, badge: { label: "Foldable", tone: "primary" } },
  { id: "p4", name: "Samsung Galaxy Tab S9 Ultra Wi-Fi", brand: "Samsung", price: 389900, oldPrice: 429900, rating: 4.7, reviews: 188, image: tablet, badge: { label: "New", tone: "success" } },
  { id: "p5", name: "Samsung Galaxy Buds3 Pro", brand: "Samsung", price: 64900, oldPrice: 74900, rating: 4.6, reviews: 421, image: earbuds, badge: { label: "Best Seller", tone: "warning" } },
  { id: "p6", name: "Samsung Galaxy Watch6 Classic 47mm", brand: "Samsung", price: 119900, rating: 4.5, reviews: 302, image: watch },
];

const accessories: Product[] = [
  { id: "a1", name: "Apple Watch Series 11 – GPS", brand: "Apple", price: 14900, rating: 4.8, reviews: 612, image: accessoryImg1 },
  { id: "a2", name: "iPhone 17 Pro Max FineWoven Case with MagSafe", brand: "Apple", price: 18900, oldPrice: 21900, rating: 4.7, reviews: 254, image: productCase },
  { id: "a3", name: "AirPods Pro 3 with USB-C", brand: "Apple", price: 89900, oldPrice: 99900, rating: 4.9, reviews: 1820, image: earbuds, badge: { label: "Bundle", tone: "primary" } },
  { id: "a4", name: "Apple Watch Series 11 (45mm GPS)", brand: "Apple", price: 159900, rating: 4.8, reviews: 740, image: watch },
];

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

/* -------------------- Page -------------------- */
const ProductPage = () => {
  const { id } = useParams();
  const p = productDetails;

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(p.colors[0].name);
  const [storage, setStorage] = useState(p.storage[1]);
  const [qty, setQty] = useState(1);

  const discount = useMemo(
    () => (p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0),
    [p.oldPrice, p.price]
  );

  const installment = useMemo(() => Math.round(p.price / 12), [p.price]);

  return (
    <div className="min-h-screen bg-background">
      <PromoBar />
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border/60 bg-surface/60">
          <div className="container-page py-3">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/shop" className="hover:text-primary">Shop</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={`/category/${p.categorySlug}`} className="hover:text-primary">{p.category}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={`/brand/${p.brandSlug}`} className="hover:text-primary">{p.brand}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="line-clamp-1 font-medium text-foreground">{p.name}</span>
            </nav>
          </div>
        </div>

        {/* Main overview */}
        <section className="container-page py-6 md:py-10">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <div className="grid gap-4 md:grid-cols-[88px_1fr]">
                {/* Thumbnails */}
                <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
                  {p.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-gradient-brand-soft transition-all md:w-full ${
                        activeImage === i ? "border-primary shadow-lift" : "border-border hover:border-primary/40"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="order-1 relative aspect-square overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand-soft md:order-2">
                  <img
                    src={p.images[activeImage]}
                    alt={p.name}
                    className="h-full w-full object-cover transition-all"
                  />
                  {/* Badges */}
                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    {discount > 0 && (
                      <span className="badge-promo bg-promo text-promo-foreground">-{discount}%</span>
                    )}
                    {p.badges.map((b) => (
                      <span key={b} className="badge-promo bg-foreground text-background">{b}</span>
                    ))}
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={() => setActiveImage((i) => (i === 0 ? p.images.length - 1 : i - 1))}
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 shadow-soft backdrop-blur hover:bg-background"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i === p.images.length - 1 ? 0 : i + 1))}
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/90 shadow-soft backdrop-blur hover:bg-background"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Share */}
                  <button className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 shadow-soft backdrop-blur hover:bg-background" aria-label="Share">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Buy panel */}
            <div className="lg:col-span-5">
              <div className="flex flex-col gap-4">
                <div>
                  <Link to={`/brand/${p.brandSlug}`} className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
                    {p.brand}
                  </Link>
                  <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                    {p.name}
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                </div>

                {/* Rating row */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="inline-flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className={`h-4 w-4 ${i <= Math.round(p.rating) ? "fill-warning text-warning" : "text-muted-foreground/40"}`} />
                    ))}
                    <span className="ml-1 font-semibold">{p.rating}</span>
                  </div>
                  <a href="#reviews" className="text-muted-foreground hover:text-primary">{p.reviews.toLocaleString()} reviews</a>
                </div>

                {/* Price */}
                <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/40 to-surface p-5">
                  <div className="flex flex-wrap items-end gap-3">
                    <span className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
                      {fmtLKR(p.price)}
                    </span>
                    {p.oldPrice && (
                      <span className="pb-1 text-base text-muted-foreground line-through">
                        {fmtLKR(p.oldPrice)}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="pb-1 text-sm font-bold text-promo">Save {discount}%</span>
                    )}
                  </div>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-foreground/80">
                    <CreditCard className="h-4 w-4 text-primary" />
                    or 12 × <span className="font-semibold">{fmtLKR(installment)}</span> with 0% installments
                  </p>
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2 text-sm">
                  {p.inStock ? (
                    <>
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-success/15">
                        <Check className="h-3 w-3 text-success" />
                      </span>
                      <span className="font-semibold text-success">In Stock</span>
                      <span className="text-muted-foreground">· Only {p.stockCount} left at this price</span>
                    </>
                  ) : (
                    <span className="font-semibold text-promo">Out of Stock</span>
                  )}
                </div>

                {/* Color */}
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">Color</span>
                    <span className="text-muted-foreground">{color}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setColor(c.name)}
                        title={c.name}
                        className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                          color === c.name ? "border-primary shadow-lift" : "border-border hover:border-primary/40"
                        }`}
                        style={{ backgroundColor: c.value }}
                        aria-label={c.name}
                      >
                        {color === c.name && (
                          <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <div className="mb-2 text-sm font-semibold text-foreground">Storage</div>
                  <div className="flex flex-wrap gap-2">
                    {p.storage.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStorage(s)}
                        className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                          storage === s
                            ? "border-primary bg-accent text-primary"
                            : "border-border bg-card text-foreground hover:border-primary/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity + actions */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="inline-flex items-center rounded-xl border border-border bg-card">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="grid h-11 w-11 place-items-center text-foreground hover:text-primary"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="grid h-11 w-11 place-items-center text-foreground hover:text-primary"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <Button size="lg" className="flex-1 min-w-[160px]">
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                  </Button>
                  <Button size="lg" variant="brand" className="flex-1 min-w-[160px]">
                    <Zap className="h-4 w-4" /> Buy Now
                  </Button>
                </div>

                <div className="flex items-stretch gap-2">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 gap-2 border-2 border-primary bg-primary/5 font-bold text-primary shadow-soft hover:bg-primary hover:text-primary-foreground"
                  >
                    <GitCompare className="h-5 w-5" /> Compare with other phones
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    aria-label="Add to wishlist"
                    className="aspect-square px-0"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Tabs: Specs / Description */}
        <section className="container-page pb-10 pt-10 md:pb-14">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full justify-start gap-1 overflow-x-auto rounded-xl bg-surface p-1">
              <TabsTrigger value="specs" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-soft">Specifications</TabsTrigger>
              <TabsTrigger value="desc" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-soft">Description</TabsTrigger>
              <TabsTrigger value="warranty" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-soft">Warranty & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {p.specs.map((g) => (
                  <div key={g.group} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
                    <div className="border-b border-border/60 bg-surface px-5 py-3 text-sm font-bold text-foreground">
                      {g.group}
                    </div>
                    <Table>
                      <TableBody>
                        {g.rows.map(([k, v]) => (
                          <TableRow key={k}>
                            <TableCell className="w-[40%] py-3 text-sm font-medium text-muted-foreground">{k}</TableCell>
                            <TableCell className="py-3 text-sm font-semibold text-foreground">{v}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="desc" className="mt-6">
              <div className="prose max-w-none rounded-2xl border border-border/60 bg-card p-6">
                <p className="text-sm leading-relaxed text-foreground/80">
                  The Galaxy S24 Ultra is Samsung's most advanced smartphone ever, built with a premium titanium frame and powered by Galaxy AI for next-level photography, productivity, and translation.
                  Capture every moment in stunning 200MP detail, write or sketch effortlessly with the embedded S Pen, and enjoy all-day performance with the Snapdragon 8 Gen 3 for Galaxy chip.
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
                  {[
                    "Galaxy AI: Live Translate, Note Assist, Circle to Search",
                    "ProVisual Engine with 200MP Adaptive Pixel sensor",
                    "Built-in S Pen — no Bluetooth pairing needed",
                    "Vision Booster for outstanding outdoor visibility",
                    "5000 mAh all-day battery, 45W Super Fast Charging",
                    "7 generations of Android upgrades & security updates",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="warranty" className="mt-6">
              <div className="grid gap-4 rounded-2xl border border-border/60 bg-card p-6 md:grid-cols-3">
                {[
                  { icon: ShieldCheck, t: "1-Year Warranty", b: "Full manufacturer warranty handled in Sri Lanka by authorized service centers." },
                  { icon: RefreshCcw, t: "7-Day Returns", b: "Unopened items can be returned within 7 days for a full refund or exchange." },
                  { icon: Truck, t: "Islandwide Delivery", b: "1–3 business days. Cash on delivery available on eligible items." },
                ].map((w) => (
                  <div key={w.t} className="rounded-xl bg-surface p-4">
                    <w.icon className="mb-2 h-5 w-5 text-primary" />
                    <div className="text-sm font-bold text-foreground">{w.t}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{w.b}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Offers strip */}
        <section className="container-page pb-10 md:pb-14">
          <div className="grid gap-3 rounded-2xl border border-border/60 bg-gradient-brand-soft p-4 sm:p-5 md:grid-cols-3">
            {[
              { icon: Wallet, title: "0% Installments", body: "Up to 12 months with HNB, Sampath, Commercial Bank" },
              { icon: Truck, title: "Free Islandwide Delivery", body: "1–3 business days for orders over LKR 50,000" },
              { icon: BadgeCheck, title: "Authorized Reseller", body: "Sealed box with full Sri Lanka warranty" },
            ].map((o) => (
              <div key={o.title} className="flex items-start gap-3 rounded-xl bg-background/70 p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <o.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-bold text-foreground">{o.title}</div>
                  <div className="text-xs text-muted-foreground">{o.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="reviews" className="bg-surface/60 py-12 md:py-16">
          <div className="container-page">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold md:text-3xl">Ratings & Reviews</h2>
                <p className="text-sm text-muted-foreground">Verified feedback from Cellexa customers.</p>
              </div>
              <Button variant="outline" size="sm">Write a Review</Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              {/* Summary */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-border/60 bg-card p-6">
                  <div className="flex items-end gap-3">
                    <span className="font-display text-5xl font-extrabold text-foreground">{reviewsData.average}</span>
                    <div className="pb-1">
                      <div className="inline-flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className={`h-4 w-4 ${i <= Math.round(reviewsData.average) ? "fill-warning text-warning" : "text-muted-foreground/40"}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{reviewsData.total.toLocaleString()} ratings</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2">
                    {reviewsData.breakdown.map((r) => {
                      const pct = (r.count / reviewsData.total) * 100;
                      return (
                        <div key={r.stars} className="flex items-center gap-2 text-xs">
                          <span className="w-6 text-muted-foreground">{r.stars}★</span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                            <div className="h-full rounded-full bg-warning" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-10 text-right font-medium text-muted-foreground">{r.count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="lg:col-span-8">
                <div className="space-y-3">
                  {reviewsData.items.map((rv) => (
                    <article key={rv.name} className="rounded-2xl border border-border/60 bg-card p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-hero text-sm font-bold text-primary-foreground">
                            {rv.name.charAt(0)}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                              {rv.name}
                              {rv.verified && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                                  <BadgeCheck className="h-3 w-3" /> Verified
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{rv.city} · {rv.date}</p>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i <= rv.rating ? "fill-warning text-warning" : "text-muted-foreground/40"}`} />
                          ))}
                        </div>
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-foreground">{rv.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/80">{rv.body}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accessories */}
        <section className="bg-gradient-brand-soft py-12 md:py-16">
          <div className="container-page">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold md:text-3xl">Pair With Accessories</h2>
                <p className="text-sm text-muted-foreground">Genuine Apple accessories, ready for your iPhone 17 Pro Max.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {accessories.map((a) => (
                <ProductCard key={a.id} product={a} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-page py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-2xl font-extrabold md:text-3xl">Product FAQs</h2>
              <p className="mt-2 text-sm text-muted-foreground">Quick answers to the questions our customers ask most.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/shop">Contact Support</Link>
              </Button>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="rounded-2xl border border-border/60 bg-card px-4">
                {[
                  { q: "Is this an authentic Samsung Sri Lanka product?", a: "Yes. Cellexa is an authorized reseller. You'll receive a sealed box with full 1-year manufacturer warranty serviced by Samsung Sri Lanka." },
                  { q: "How long does delivery take?", a: "Colombo orders typically arrive next business day. Outstation orders take 1–3 business days. Free delivery for orders above LKR 50,000." },
                  { q: "Can I pay in installments?", a: "Yes — 0% installment plans up to 12 months are available with HNB, Sampath, Commercial Bank, BOC and NDB credit cards." },
                  { q: "Is cash on delivery available?", a: "COD is available islandwide on eligible items. A small handling fee may apply for orders above LKR 100,000." },
                  { q: "What's your return policy?", a: "Unopened items can be returned within 7 days for a full refund or exchange. Defective units are covered under warranty." },
                ].map((f) => (
                  <AccordionItem key={f.q} value={f.q} className="border-border/60 last:border-0">
                    <AccordionTrigger className="text-left text-sm font-bold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile buy bar */}
      <div className="sticky bottom-0 z-30 border-t border-border/70 bg-background/95 px-3 py-2 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <div className="text-[11px] text-muted-foreground line-through">{p.oldPrice && fmtLKR(p.oldPrice)}</div>
            <div className="font-display text-lg font-extrabold text-foreground leading-none">{fmtLKR(p.price)}</div>
          </div>
          <Button size="sm" variant="outline" className="h-11">
            <ShoppingCart className="h-4 w-4" /> Cart
          </Button>
          <Button size="sm" variant="brand" className="h-11">
            <Zap className="h-4 w-4" /> Buy Now
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
