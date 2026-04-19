import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Star,
  Edit3,
  Eye,
  Trash2,
  Camera,
  CheckCircle2,
  Clock,
  PenLine,
  ThumbsUp,
  Award,
  Sparkles,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  PackageCheck,
  Inbox,
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

type Tab = "published" | "pending" | "waiting";

interface Published {
  id: string;
  product: string;
  brand: string;
  variant: string;
  img: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  helpful: number;
  photos: number;
  verified: boolean;
}

interface Pending {
  id: string;
  product: string;
  brand: string;
  img: string;
  draftRating: number;
  draftText: string;
  savedOn: string;
}

interface Waiting {
  id: string;
  product: string;
  brand: string;
  img: string;
  deliveredOn: string;
  earnPts: number;
  daysLeft: number;
}

const PUBLISHED: Published[] = [
  {
    id: "rv-1",
    product: "iPhone 15 Pro Max",
    brand: "Apple",
    variant: "256GB · Natural Titanium",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=240&q=80",
    rating: 5,
    title: "Worth every rupee",
    text: "Camera quality is stunning, especially in low light around Galle Face at night. Battery comfortably lasts a full work day in Colombo with heavy use. Cellexa delivery was next-day and properly sealed.",
    date: "12 Apr 2026",
    helpful: 24,
    photos: 3,
    verified: true,
  },
  {
    id: "rv-2",
    product: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    variant: "USB-C · MagSafe Case",
    img: "https://images.unsplash.com/photo-1606220588911-5117e04b71ae?w=240&q=80",
    rating: 4,
    title: "Great noise cancellation",
    text: "Perfect for the commute on the Galle Road. Sound is clean, ANC is excellent. Only wish the case was a bit smaller.",
    date: "02 Apr 2026",
    helpful: 11,
    photos: 1,
    verified: true,
  },
  {
    id: "rv-3",
    product: "Sony WH-1000XM5",
    brand: "Sony",
    variant: "Midnight Black",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=240&q=80",
    rating: 5,
    title: "Studio-grade audio",
    text: "Best over-ear I've owned. Comfortable for long flights to Singapore and the Cellexa warranty support gave me peace of mind.",
    date: "21 Mar 2026",
    helpful: 38,
    photos: 2,
    verified: true,
  },
];

const PENDING: Pending[] = [
  {
    id: "pd-1",
    product: "Galaxy S24 Ultra",
    brand: "Samsung",
    img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=240&q=80",
    draftRating: 4,
    draftText:
      "S Pen is a productivity boost. Display brightness outdoors in Colombo is unreal...",
    savedOn: "Saved 2 days ago",
  },
];

const WAITING: Waiting[] = [
  {
    id: "wt-1",
    product: "MagSafe Charger",
    brand: "Apple",
    img: "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?w=240&q=80",
    deliveredOn: "Delivered 18 Apr 2026",
    earnPts: 50,
    daysLeft: 12,
  },
  {
    id: "wt-2",
    product: 'iPad Air 11" M2',
    brand: "Apple",
    img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=240&q=80",
    deliveredOn: "Delivered 09 Apr 2026",
    earnPts: 75,
    daysLeft: 6,
  },
  {
    id: "wt-3",
    product: "Galaxy Buds3 Pro",
    brand: "Samsung",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=240&q=80",
    deliveredOn: "Delivered 02 Apr 2026",
    earnPts: 50,
    daysLeft: 2,
  },
];

const Stars = ({
  value,
  size = "sm",
  interactive = false,
  onChange,
}: {
  value: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (n: number) => void;
}) => {
  const dim =
    size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(i)}
          className={`${interactive ? "cursor-pointer transition hover:scale-110" : "cursor-default"}`}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
        >
          <Star
            className={`${dim} ${
              i <= Math.round(value)
                ? "fill-warning text-warning"
                : "text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const Reviews = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("published");

  const stats = useMemo(() => {
    const total = PUBLISHED.length;
    const avg = total
      ? PUBLISHED.reduce((s, r) => s + r.rating, 0) / total
      : 0;
    const dist = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: PUBLISHED.filter((r) => r.rating === star).length,
    }));
    const helpful = PUBLISHED.reduce((s, r) => s + r.helpful, 0);
    return { total, avg, dist, helpful };
  }, []);

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
          <span className="font-semibold text-foreground">My Reviews</span>
        </nav>

        {/* Page header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              My Reviews
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Share your experience with Cellexa products and earn loyalty points on every published review.
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

          {/* Main */}
          <section className="space-y-6">
            {/* Stats summary */}
            <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
              <div className="overflow-hidden rounded-2xl border border-border/70 bg-gradient-hero p-5 text-primary-foreground shadow-lift sm:p-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  <Award className="h-3.5 w-3.5" /> Top Reviewer
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div>
                    <div className="font-display text-3xl font-extrabold sm:text-4xl">
                      {stats.avg.toFixed(1)}
                    </div>
                    <div className="mt-1">
                      <Stars value={stats.avg} size="sm" />
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground/80">
                      Avg rating
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-extrabold sm:text-4xl">
                      {stats.total}
                    </div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-primary-foreground/80">
                      Published
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-extrabold sm:text-4xl">
                      {stats.helpful}
                    </div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-primary-foreground/80">
                      Helpful votes
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-primary-foreground/85">
                  You've helped <span className="font-bold text-white">{stats.helpful}+ shoppers</span> across Sri Lanka make smarter choices.
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-sm font-extrabold text-foreground">
                    Rating distribution
                  </h3>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {stats.total} review{stats.total !== 1 ? "s" : ""}
                  </span>
                </div>
                <ul className="space-y-2">
                  {stats.dist.map((d) => {
                    const pct = stats.total ? (d.count / stats.total) * 100 : 0;
                    return (
                      <li key={d.star} className="flex items-center gap-2 text-xs">
                        <span className="inline-flex w-8 items-center gap-0.5 font-semibold text-foreground">
                          {d.star}
                          <Star className="h-3 w-3 fill-warning text-warning" />
                        </span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-right font-medium text-muted-foreground">
                          {d.count}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Tabs toolbar */}
            <div className="rounded-2xl border border-border/70 bg-card p-2 shadow-card">
              <div className="flex flex-wrap items-center gap-1">
                {(
                  [
                    { k: "published", label: "Published", count: PUBLISHED.length, Icon: CheckCircle2 },
                    { k: "pending", label: "Pending Drafts", count: PENDING.length, Icon: PenLine },
                    { k: "waiting", label: "Waiting for Review", count: WAITING.length, Icon: Clock },
                  ] as { k: Tab; label: string; count: number; Icon: typeof Star }[]
                ).map((t) => {
                  const active = tab === t.k;
                  return (
                    <button
                      key={t.k}
                      onClick={() => setTab(t.k)}
                      className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold transition sm:flex-none sm:text-sm ${
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <t.Icon className="h-4 w-4" />
                      <span>{t.label}</span>
                      <span
                        className={`rounded-full px-1.5 text-[10px] ${
                          active ? "bg-white/20" : "bg-secondary text-foreground"
                        }`}
                      >
                        {t.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PUBLISHED */}
            {tab === "published" &&
              (PUBLISHED.length === 0 ? (
                <EmptyState
                  Icon={Star}
                  title="No published reviews yet"
                  desc="Once you publish a review, it'll show up here."
                />
              ) : (
                <ul className="space-y-4">
                  {PUBLISHED.map((r) => (
                    <li
                      key={r.id}
                      className="rounded-2xl border border-border/70 bg-card p-4 shadow-card transition hover:shadow-lift sm:p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                          to={`/product/${r.id}`}
                          className="flex shrink-0 items-start gap-3 sm:w-56"
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-20 sm:w-20">
                            <img
                              src={r.img}
                              alt={r.product}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                              {r.brand}
                            </div>
                            <div className="line-clamp-2 text-sm font-bold text-foreground hover:text-primary">
                              {r.product}
                            </div>
                            <div className="truncate text-xs text-muted-foreground">
                              {r.variant}
                            </div>
                          </div>
                        </Link>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Stars value={r.rating} size="md" />
                            <span className="font-semibold text-foreground">{r.rating}.0</span>
                            {r.verified && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
                                <ShieldCheck className="h-3 w-3" /> Verified buyer
                              </span>
                            )}
                            <span className="ml-auto text-xs font-medium text-muted-foreground">
                              {r.date}
                            </span>
                          </div>
                          <h4 className="mt-2 text-sm font-extrabold text-foreground sm:text-base">
                            {r.title}
                          </h4>
                          <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{r.text}</p>

                          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            {r.photos > 0 && (
                              <span className="inline-flex items-center gap-1 font-semibold">
                                <Camera className="h-3.5 w-3.5" /> {r.photos} photo{r.photos > 1 ? "s" : ""}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 font-semibold">
                              <ThumbsUp className="h-3.5 w-3.5 text-primary" /> {r.helpful} helpful
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button asChild size="sm" variant="brand" className="h-9 rounded-xl">
                              <Link to={`/product/${r.id}`}>
                                <Eye className="mr-1.5 h-4 w-4" /> View Product
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" className="h-9 rounded-xl">
                              <Edit3 className="mr-1.5 h-4 w-4" /> Edit Review
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => toast.success("Review deleted")}
                            >
                              <Trash2 className="mr-1.5 h-4 w-4" /> Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}

            {/* PENDING */}
            {tab === "pending" &&
              (PENDING.length === 0 ? (
                <EmptyState
                  Icon={PenLine}
                  title="No drafts saved"
                  desc="Drafts you start writing will appear here so you can finish later."
                />
              ) : (
                <ul className="space-y-4">
                  {PENDING.map((p) => (
                    <li
                      key={p.id}
                      className="rounded-2xl border border-border/70 bg-card p-4 shadow-card sm:p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex shrink-0 items-start gap-3 sm:w-56">
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-20 sm:w-20">
                            <img
                              src={p.img}
                              alt={p.product}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                              {p.brand}
                            </div>
                            <div className="line-clamp-2 text-sm font-bold text-foreground">
                              {p.product}
                            </div>
                            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning">
                              <Clock className="h-3 w-3" /> Draft
                            </div>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Stars value={p.draftRating} size="md" interactive />
                            <span className="text-xs font-medium text-muted-foreground">
                              {p.savedOn}
                            </span>
                          </div>
                          <p className="mt-2 line-clamp-2 rounded-xl bg-secondary/50 p-3 text-sm italic text-muted-foreground">
                            "{p.draftText}"
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button size="sm" variant="brand" className="h-9 rounded-xl">
                              <PenLine className="mr-1.5 h-4 w-4" /> Continue Draft
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => toast.success("Draft discarded")}
                            >
                              <Trash2 className="mr-1.5 h-4 w-4" /> Discard
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}

            {/* WAITING */}
            {tab === "waiting" &&
              (WAITING.length === 0 ? (
                <EmptyState
                  Icon={PackageCheck}
                  title="Nothing waiting for a review"
                  desc="Items you receive in the future will appear here for quick reviewing."
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {WAITING.map((w) => (
                    <div
                      key={w.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <div className="flex gap-3 p-4">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                          <img
                            src={w.img}
                            alt={w.product}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {w.brand}
                          </div>
                          <div className="line-clamp-2 text-sm font-bold text-foreground">
                            {w.product}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">{w.deliveredOn}</div>
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                              <Sparkles className="h-3 w-3" /> Earn {w.earnPts} pts
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold text-warning">
                              <Clock className="h-3 w-3" /> {w.daysLeft}d left
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border/70 bg-secondary/30 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Quick rate
                          </span>
                          <Stars value={0} size="md" interactive onChange={(n) =>
                            toast.success(`Started ${n}-star review`)
                          } />
                        </div>
                        <Button size="sm" variant="brand" className="h-9 w-full rounded-xl">
                          <PenLine className="mr-1.5 h-4 w-4" /> Write Review
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            {/* Help card */}
            <div className="grid gap-4 rounded-2xl border border-border/70 bg-gradient-brand-soft p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-extrabold text-foreground">
                    Review guidelines
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Honest reviews help fellow Cellexa shoppers across Sri Lanka. Each published review with a photo earns you bonus loyalty points.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <ShieldCheck className="h-3 w-3 text-primary" /> Verified buyer badge
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <Sparkles className="h-3 w-3 text-primary" /> +50 pts per review
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

const EmptyState = ({
  Icon,
  title,
  desc,
}: {
  Icon: typeof Star;
  title: string;
  desc: string;
}) => (
  <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card sm:p-14">
    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand-soft text-primary">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{desc}</p>
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
      <Button asChild variant="brand" className="rounded-xl">
        <Link to="/account/orders">
          <Inbox className="mr-1.5 h-4 w-4" /> View My Orders
        </Link>
      </Button>
      <Button asChild variant="outline" className="rounded-xl">
        <Link to="/shop">Continue Shopping</Link>
      </Button>
    </div>
  </div>
);

export default Reviews;
