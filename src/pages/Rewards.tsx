import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Crown,
  Gift,
  Sparkles,
  TrendingUp,
  ShoppingBag,
  Star,
  Award,
  Zap,
  Truck,
  Headphones,
  Calendar,
  Cake,
  Share2,
  Ticket,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import {
  AccountSidebarNav,
  AccountProfileCard,
} from "@/components/cellexa/AccountSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const POINTS = 2480;
const NEXT_TIER_POINTS = 5000;
const TIER = "Gold";
const NEXT_TIER = "Platinum";
const PROGRESS = Math.round((POINTS / NEXT_TIER_POINTS) * 100);
const POINT_VALUE_LKR = 1; // 1 pt = LKR 1
const fmt = (n: number) =>
  `LKR ${n.toLocaleString("en-LK", { minimumFractionDigits: 0 })}`;

interface Reward {
  id: string;
  title: string;
  desc: string;
  cost: number;
  Icon: LucideIcon;
  tone: string;
  tag?: string;
}

const REWARDS: Reward[] = [
  {
    id: "r1",
    title: "LKR 500 Nexzon Voucher",
    desc: "Apply on any order above LKR 5,000 at checkout.",
    cost: 500,
    Icon: Ticket,
    tone: "from-primary to-primary-glow",
    tag: "Popular",
  },
  {
    id: "r2",
    title: "Free Express Delivery",
    desc: "Same-day Colombo / next-day island-wide shipping.",
    cost: 800,
    Icon: Truck,
    tone: "from-success to-primary",
  },
  {
    id: "r3",
    title: "LKR 1,500 Accessory Voucher",
    desc: "Cases, chargers, audio and smart accessories.",
    cost: 1200,
    Icon: Gift,
    tone: "from-promo to-warning",
  },
  {
    id: "r4",
    title: "Premium Support Pass",
    desc: "Priority phone & chat support for 90 days.",
    cost: 1500,
    Icon: Headphones,
    tone: "from-primary-deep to-primary",
  },
  {
    id: "r5",
    title: "LKR 3,000 Master Voucher",
    desc: "Use on smartphones, laptops, or wearables.",
    cost: 2400,
    Icon: Award,
    tone: "from-warning to-promo",
    tag: "Best value",
  },
  {
    id: "r6",
    title: "Early Sale Access (24 hr)",
    desc: "Shop Avurudu & Black Friday before everyone.",
    cost: 3000,
    Icon: Zap,
    tone: "from-primary to-primary-deep",
    tag: "Platinum",
  },
];

interface History {
  id: string;
  type: "earn" | "redeem";
  title: string;
  date: string;
  pts: number;
}

const HISTORY: History[] = [
  { id: "h1", type: "earn", title: "Order CLX-2024-008812 · iPhone 15 Pro Max", date: "18 Apr 2026", pts: 365 },
  { id: "h2", type: "redeem", title: "LKR 500 Voucher applied", date: "12 Apr 2026", pts: 500 },
  { id: "h3", type: "earn", title: "Product review · Galaxy S24 Ultra", date: "08 Apr 2026", pts: 50 },
  { id: "h4", type: "earn", title: "Order CLX-2024-008756 · AirPods Pro", date: "02 Apr 2026", pts: 78 },
  { id: "h5", type: "earn", title: "Birthday bonus 🎂", date: "28 Mar 2026", pts: 250 },
  { id: "h6", type: "earn", title: "Referred a friend · Tharindu", date: "20 Mar 2026", pts: 300 },
  { id: "h7", type: "redeem", title: "Free Express Delivery used", date: "14 Mar 2026", pts: 800 },
];

const EARN_WAYS: { Icon: LucideIcon; title: string; desc: string; pts: string }[] = [
  { Icon: ShoppingBag, title: "Shop & spend", desc: "Earn 1 point for every LKR 100 spent at Nexzon.", pts: "1 pt / 100 LKR" },
  { Icon: Star, title: "Write reviews", desc: "Share your honest product experience with photos.", pts: "+50 pts" },
  { Icon: Share2, title: "Refer a friend", desc: "They get LKR 1,000 off, you earn 300 pts.", pts: "+300 pts" },
  { Icon: Cake, title: "Birthday bonus", desc: "Auto-credited every year on your birthday.", pts: "+250 pts" },
  { Icon: Calendar, title: "Anniversary reward", desc: "Celebrate each year as a Nexzon member.", pts: "+500 pts" },
  { Icon: Sparkles, title: "Complete profile", desc: "Add address, phone, and preferences.", pts: "+100 pts" },
];

const TIERS: {
  name: string;
  range: string;
  current?: boolean;
  perks: string[];
  tone: string;
}[] = [
  {
    name: "Silver",
    range: "0 – 999 pts",
    perks: ["Standard delivery", "Birthday bonus", "Member-only emails"],
    tone: "from-muted to-secondary",
  },
  {
    name: "Gold",
    range: "1,000 – 4,999 pts",
    current: true,
    perks: ["Free Colombo delivery", "Extended 14-day returns", "Priority chat support"],
    tone: "from-warning to-promo",
  },
  {
    name: "Platinum",
    range: "5,000+ pts",
    perks: ["Free island-wide express", "30-day returns", "Early sale access (24 hr)", "Dedicated specialist"],
    tone: "from-primary to-primary-deep",
  },
];

const Rewards = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const redeem = (r: Reward) => {
    if (POINTS < r.cost) return toast.error("Not enough points yet");
    toast.success(`${r.title} redeemed`, {
      description: `${r.cost} points used · check your vouchers`,
    });
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
          <span className="font-semibold text-foreground">Loyalty &amp; Rewards</span>
        </nav>

        {/* Page header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Loyalty &amp; Rewards
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Earn Nexzon points on every purchase and unlock perks across Sri Lanka.
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
            {/* Hero balance card */}
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-hero p-6 text-primary-foreground shadow-lift sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    <Crown className="h-3.5 w-3.5" /> {TIER} Member
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                      {POINTS.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">
                      points
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-primary-foreground/85">
                    Worth approximately{" "}
                    <span className="font-bold text-white">{fmt(POINTS * POINT_VALUE_LKR)}</span> in Nexzon vouchers.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button variant="hero" size="sm" className="rounded-xl">
                      <Gift className="mr-1.5 h-4 w-4" /> Redeem Rewards
                    </Button>
                    <Button variant="heroOutline" size="sm" className="rounded-xl">
                      <ShoppingBag className="mr-1.5 h-4 w-4" /> Shop to Earn More
                    </Button>
                  </div>
                </div>

                {/* Tier progress */}
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm ring-1 ring-white/15">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span>{TIER}</span>
                    <span className="opacity-80">{NEXT_TIER}</span>
                  </div>
                  <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-700"
                      style={{ width: `${PROGRESS}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-semibold">{POINTS.toLocaleString()} pts</span>
                    <span className="opacity-80">{NEXT_TIER_POINTS.toLocaleString()} pts</span>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-snug">
                    Just{" "}
                    <span className="font-extrabold">
                      {(NEXT_TIER_POINTS - POINTS).toLocaleString()} pts
                    </span>{" "}
                    away from <span className="font-extrabold">{NEXT_TIER}</span> perks.
                  </p>
                </div>
              </div>

              {/* Mini stats */}
              <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Lifetime Earned", value: "8,420" },
                  { label: "Redeemed", value: "1,300" },
                  { label: "Expiring Soon", value: "120" },
                  { label: "Member Since", value: "2023" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur-sm ring-1 ring-white/10">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground/75">
                      {s.label}
                    </div>
                    <div className="mt-0.5 font-display text-lg font-extrabold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tier ladder */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    <Crown className="h-3 w-3" /> Membership Tiers
                  </div>
                  <h3 className="mt-2 font-display text-lg font-extrabold text-foreground sm:text-xl">
                    Your Nexzon journey
                  </h3>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  Resets every 12 months
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {TIERS.map((t) => (
                  <div
                    key={t.name}
                    className={`relative overflow-hidden rounded-2xl border p-5 transition ${
                      t.current
                        ? "border-primary bg-primary/[0.04] shadow-card"
                        : "border-border/70 bg-secondary/30"
                    }`}
                  >
                    {t.current && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                        <CheckCircle2 className="h-3 w-3" /> Current
                      </span>
                    )}
                    <div
                      className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${t.tone} text-white shadow-soft`}
                    >
                      <Crown className="h-5 w-5" />
                    </div>
                    <div className="mt-3 font-display text-lg font-extrabold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground">{t.range}</div>
                    <ul className="mt-3 space-y-1.5">
                      {t.perks.map((p) => (
                        <li key={p} className="flex items-start gap-1.5 text-xs text-foreground/85">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Available rewards */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    <Gift className="h-3 w-3" /> Redeem
                  </div>
                  <h3 className="mt-2 font-display text-lg font-extrabold text-foreground sm:text-xl">
                    Available rewards
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Trade your points for vouchers, perks, and Nexzon exclusives.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {REWARDS.map((r) => {
                  const affordable = POINTS >= r.cost;
                  const Icon = r.Icon;
                  return (
                    <div
                      key={r.id}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <div className={`relative h-24 overflow-hidden bg-gradient-to-br ${r.tone}`}>
                        <Icon className="absolute -right-3 -bottom-3 h-24 w-24 text-white/15" />
                        <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        {r.tag && (
                          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                            {r.tag}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h4 className="text-sm font-bold text-foreground">{r.title}</h4>
                        <p className="mt-0.5 text-xs text-muted-foreground">{r.desc}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="font-display text-lg font-extrabold text-primary">
                              {r.cost.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              pts
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant={affordable ? "brand" : "outline"}
                            disabled={!affordable}
                            className="h-8 rounded-lg text-xs"
                            onClick={() => redeem(r)}
                          >
                            {affordable ? (
                              <>
                                Redeem <ArrowRight className="ml-1 h-3 w-3" />
                              </>
                            ) : (
                              <>
                                <Clock className="mr-1 h-3 w-3" />{" "}
                                {(r.cost - POINTS).toLocaleString()} more
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Two-column: history + earn ways */}
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              {/* History */}
              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-foreground">
                      Points history
                    </h3>
                    <p className="text-xs text-muted-foreground">Last 30 days activity</p>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-xl text-primary">
                    View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>

                {HISTORY.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-8 text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-card text-muted-foreground">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h4 className="mt-3 font-bold text-foreground">No activity yet</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Place your first order to start earning Nexzon points.
                    </p>
                    <Button asChild variant="brand" size="sm" className="mt-3 rounded-xl">
                      <Link to="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <ul className="divide-y divide-border/70">
                    {HISTORY.map((h) => {
                      const earn = h.type === "earn";
                      return (
                        <li key={h.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                          <div
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                              earn ? "bg-success/15 text-success" : "bg-promo/15 text-promo"
                            }`}
                          >
                            {earn ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-foreground">
                              {h.title}
                            </div>
                            <div className="text-xs text-muted-foreground">{h.date}</div>
                          </div>
                          <div
                            className={`text-right font-display text-sm font-extrabold ${
                              earn ? "text-success" : "text-promo"
                            }`}
                          >
                            {earn ? "+" : "−"}
                            {h.pts}
                            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              pts
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Earn ways */}
              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    <TrendingUp className="h-3 w-3" /> Earn faster
                  </div>
                  <h3 className="mt-2 font-display text-lg font-extrabold text-foreground">
                    How to earn more points
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {EARN_WAYS.map((w) => (
                    <li
                      key={w.title}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/30 p-3 transition hover:border-primary/30 hover:bg-primary/[0.03]"
                    >
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand-soft text-primary">
                        <w.Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-sm font-bold text-foreground">{w.title}</div>
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                            {w.pts}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{w.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reward rules */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
              <h3 className="font-display text-lg font-extrabold text-foreground">
                Reward rules
              </h3>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {[
                  "1 point earned per LKR 100 spent (excluding delivery & taxes).",
                  "Points are credited 24 hours after order delivery.",
                  "1 point = LKR 1 in voucher value at checkout.",
                  "Points expire 12 months after the last earning activity.",
                  "Rewards are non-transferable and cannot be exchanged for cash.",
                  "Tier benefits apply only while you remain in that tier.",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help card */}
            <div className="grid gap-4 rounded-2xl border border-border/70 bg-gradient-brand-soft p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-extrabold text-foreground">
                    Questions about rewards?
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Our Nexzon loyalty team can help with point credits, voucher issues, and tier upgrades across Sri Lanka.
                  </p>
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rewards;
