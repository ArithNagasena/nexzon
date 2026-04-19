import { Link } from "react-router-dom";
import {
  ChevronRight,
  Search,
  ShoppingBag,
  Truck,
  CreditCard,
  ShieldCheck,
  Undo2,
  Repeat,
  UserCircle2,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  Package,
  FileQuestion,
  Headphones,
  Clock,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  to: string;
  count: number;
}

const CATEGORIES: Category[] = [
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
    desc: "Place, modify or cancel your orders",
    to: "/faq#faq-orders",
    count: 12,
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: Truck,
    desc: "Shipping times, fees and tracking",
    to: "/faq#faq-delivery",
    count: 9,
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    desc: "Methods, installments and refunds",
    to: "/faq#faq-payments",
    count: 11,
  },
  {
    id: "warranty",
    label: "Warranty",
    icon: ShieldCheck,
    desc: "Coverage, claims and Cellexa Care",
    to: "/account/warranty",
    count: 8,
  },
  {
    id: "returns",
    label: "Returns",
    icon: Undo2,
    desc: "Return policy, refunds & exchanges",
    to: "/account/returns",
    count: 7,
  },
  {
    id: "tradein",
    label: "Trade-In",
    icon: Repeat,
    desc: "Upgrade your device for credit",
    to: "/account/trade-in",
    count: 6,
  },
  {
    id: "account",
    label: "Account",
    icon: UserCircle2,
    desc: "Login, profile, addresses & rewards",
    to: "/faq#faq-account",
    count: 10,
  },
  {
    id: "preorders",
    label: "Pre-Orders",
    icon: Package,
    desc: "Reservations and launch-day delivery",
    to: "/faq#faq-preorders",
    count: 5,
  },
];

interface QuickAction {
  label: string;
  desc: string;
  icon: LucideIcon;
  to: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Track Order",
    desc: "Check the status of any order in real time",
    icon: Truck,
    to: "/track-order",
  },
  {
    label: "Start a Return",
    desc: "Request a refund or replacement in minutes",
    icon: Undo2,
    to: "/account/returns",
  },
  {
    label: "File a Warranty Claim",
    desc: "Get your device repaired under warranty",
    icon: ShieldCheck,
    to: "/account/warranty",
  },
  {
    label: "Contact Support",
    desc: "Chat, call or email our team directly",
    icon: Headphones,
    to: "#contact",
  },
];

interface Article {
  title: string;
  category: string;
  to: string;
}

const POPULAR: Article[] = [
  {
    title: "How long does delivery take in Sri Lanka?",
    category: "Delivery",
    to: "/faq#faq-delivery",
  },
  {
    title: "What is your return and refund policy?",
    category: "Returns",
    to: "/faq#faq-returns",
  },
  {
    title: "Do you offer 0% installment plans?",
    category: "Payments",
    to: "/faq#faq-payments",
  },
  {
    title: "How do I file a warranty claim?",
    category: "Warranty",
    to: "/faq#faq-warranty",
  },
  {
    title: "How do I cancel or modify an order?",
    category: "Orders",
    to: "/faq#faq-orders",
  },
  {
    title: "How do loyalty points and tiers work?",
    category: "Rewards",
    to: "/faq#faq-account",
  },
];

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-brand-soft">
        <div className="container-page py-10 sm:py-14 lg:py-16">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-foreground">Help &amp; Support</span>
          </div>

          <div className="mx-auto mt-6 max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              Customer Support
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              We're here to help
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Browse support topics, manage your orders or talk to a real
              person — whichever works for you.
            </p>

            {/* Search */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-2xl border border-border/70 bg-card p-1.5 shadow-card"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
              <Input
                placeholder="Search for help with orders, delivery, returns…"
                className="flex-1 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link to="/faq">Search</Link>
              </Button>
            </form>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <span>Popular:</span>
              {[
                { l: "refund", to: "/faq#faq-returns" },
                { l: "tracking", to: "/track-order" },
                { l: "warranty claim", to: "/account/warranty" },
                { l: "installments", to: "/faq#faq-payments" },
              ].map((p) => (
                <Link
                  key={p.l}
                  to={p.to}
                  className="rounded-full bg-card px-2 py-0.5 font-medium text-foreground hover:text-primary"
                >
                  {p.l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-page space-y-10 py-10 lg:py-14">
        {/* Quick actions */}
        <section>
          <SectionHeader
            title="Quick actions"
            subtitle="The fastest way to get things done"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_ACTIONS.map((q) => (
              <Link
                key={q.label}
                to={q.to}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <q.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-foreground">
                  {q.label}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{q.desc}</p>
                <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </section>

        {/* Support categories */}
        <section>
          <SectionHeader
            title="Browse by topic"
            subtitle="Find answers organized by what you need help with"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={c.to}
                className="group rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand-soft text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-foreground">
                    {c.count} articles
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-foreground">
                  {c.label}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular articles */}
        <section>
          <SectionHeader
            title="Popular articles"
            subtitle="The questions our customers ask most"
            action={
              <Button variant="outline" size="sm" asChild className="gap-1.5">
                <Link to="/faq">
                  All FAQs
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {POPULAR.map((a, i) => (
              <Link
                key={a.title}
                to={a.to}
                className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-card"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <FileQuestion className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                    {a.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {a.category}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </section>

        {/* Contact support */}
        <section id="contact">
          <SectionHeader
            title="Talk to our team"
            subtitle="Real people, fast replies, 7 days a week"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <ContactCard
              icon={MessageCircle}
              title="Live Chat"
              desc="Average reply under 2 minutes"
              meta="Online now"
              metaTone="online"
              cta="Start chat"
              accent
            />
            <ContactCard
              icon={Phone}
              title="WhatsApp"
              desc="+94 77 123 4567"
              meta="Reply within 5 min"
              metaTone="online"
              cta="Open WhatsApp"
            />
            <ContactCard
              icon={Mail}
              title="Email Support"
              desc="help@cellexa.lk"
              meta="Reply within 12 hours"
              metaTone="muted"
              cta="Send email"
            />
          </div>

          {/* Hours + locations */}
          <div className="mt-4 grid gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
            <InfoBlock
              icon={Clock}
              title="Support hours"
              lines={["Mon – Sat: 9:00 AM – 9:00 PM", "Sunday: 10:00 AM – 6:00 PM"]}
            />
            <InfoBlock
              icon={Phone}
              title="Hotline"
              lines={["+94 11 234 5678", "Toll-free island-wide"]}
            />
            <InfoBlock
              icon={MapPin}
              title="Service centers"
              lines={[
                "Colombo · Kandy · Galle",
                "Jaffna · Negombo · Kurunegala",
              ]}
            />
          </div>
        </section>

        {/* CTA banner */}
        <section className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-hero text-primary-foreground shadow-lift">
          <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  Still can't find what you need?
                </h2>
                <p className="mt-1 text-sm opacity-90">
                  Send us a message — a real human will reply within hours.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="hero" size="lg" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat now
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/faq">Browse FAQ</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

const SectionHeader = ({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) => (
  <div className="mb-4 flex items-end justify-between gap-3">
    <div>
      <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
    {action}
  </div>
);

const ContactCard = ({
  icon: Icon,
  title,
  desc,
  meta,
  metaTone,
  cta,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  meta: string;
  metaTone: "online" | "muted";
  cta: string;
  accent?: boolean;
}) => (
  <div
    className={`group relative overflow-hidden rounded-2xl border p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift ${
      accent
        ? "border-primary/20 bg-gradient-brand-soft"
        : "border-border/70 bg-card"
    }`}
  >
    <div className="flex items-start justify-between">
      <div
        className={`grid h-12 w-12 place-items-center rounded-xl ${
          accent
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
          metaTone === "online"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-secondary text-foreground"
        }`}
      >
        {metaTone === "online" && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
        )}
        {meta}
      </span>
    </div>
    <h3 className="mt-3 font-display text-lg font-bold text-foreground">
      {title}
    </h3>
    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    <Button
      className="mt-4 w-full gap-2"
      variant={accent ? "default" : "outline"}
      size="sm"
    >
      {cta}
      <ArrowRight className="h-3.5 w-3.5" />
    </Button>
  </div>
);

const InfoBlock = ({
  icon: Icon,
  title,
  lines,
}: {
  icon: LucideIcon;
  title: string;
  lines: string[];
}) => (
  <div className="flex items-start gap-3">
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
      <Icon className="h-4 w-4" />
    </div>
    <div className="min-w-0">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      {lines.map((l) => (
        <div key={l} className="text-sm font-semibold text-foreground">
          {l}
        </div>
      ))}
    </div>
  </div>
);

export default Help;
