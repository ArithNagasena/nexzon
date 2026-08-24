import { Link } from "react-router-dom";
import {
  ChevronRight,
  Undo2,
  CheckCircle2,
  XCircle,
  Clock,
  Wallet,
  Truck,
  PackageCheck,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  FileText,
  RefreshCcw,
  CreditCard,
  Gift,
  Wrench,
  Smartphone,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { id: "eligibility", label: "Eligibility" },
  { id: "non-returnable", label: "Non-returnable" },
  { id: "refunds", label: "Refunds" },
  { id: "timelines", label: "Timelines" },
  { id: "process", label: "How it works" },
  { id: "exceptions", label: "Exceptions" },
];

const ELIGIBILITY = [
  {
    icon: CheckCircle2,
    title: "14-day return window",
    desc: "Request a return within 14 days from the delivery date.",
  },
  {
    icon: PackageCheck,
    title: "Original condition",
    desc: "Item must be unused, undamaged and in original packaging with all accessories.",
  },
  {
    icon: FileText,
    title: "Proof of purchase",
    desc: "Order number or invoice is required to start a return.",
  },
  {
    icon: ShieldCheck,
    title: "Defect-free coverage",
    desc: "Defective or wrong items are eligible for free return and full refund.",
  },
];

const NON_RETURNABLE = [
  "SIM cards, prepaid cards and digital activation codes",
  "Software, app subscriptions and digital downloads",
  "Items with broken security seals or tampered packaging",
  "Personalized or custom-engraved products",
  "Earbuds, headphones and wearables once unsealed (for hygiene)",
  "Items damaged due to misuse, drops or liquid exposure",
  "Free gifts, promotional items and clearance final-sale items",
];

const REFUND_METHODS: {
  icon: LucideIcon;
  title: string;
  time: string;
  desc: string;
  tone: "primary" | "emerald" | "amber";
}[] = [
  {
    icon: CreditCard,
    title: "Original payment method",
    time: "3 – 5 business days",
    desc: "Refunded back to the card or wallet you paid with after inspection.",
    tone: "primary",
  },
  {
    icon: Gift,
    title: "Nexzon store credit",
    time: "Instant on approval",
    desc: "Receive 5% bonus credit. Never expires, stackable with promotions.",
    tone: "emerald",
  },
  {
    icon: RefreshCcw,
    title: "Replacement",
    time: "5 – 7 business days",
    desc: "We ship a brand-new identical unit at no extra cost.",
    tone: "amber",
  },
];

const TIMELINES = [
  { stage: "Request submitted", time: "Day 0", desc: "You file a return from your account." },
  { stage: "Approved & pickup scheduled", time: "Within 24 hrs", desc: "We email a pickup slot — free island-wide." },
  { stage: "Item collected & inspected", time: "Day 2 – 4", desc: "Quality check at our service center." },
  { stage: "Refund issued", time: "Day 5 – 7", desc: "Money returned via your chosen method." },
];

const PROCESS = [
  {
    icon: Smartphone,
    title: "Start a request",
    desc: "Go to My Account → Returns and select the order item. Choose a reason and preferred resolution.",
  },
  {
    icon: Truck,
    title: "We pick it up",
    desc: "Free pickup is scheduled at your address — no need to print a label or visit a courier.",
  },
  {
    icon: PackageCheck,
    title: "Quality inspection",
    desc: "Our team verifies the item condition within 2 business days of receiving it.",
  },
  {
    icon: Wallet,
    title: "Get your refund",
    desc: "Refund is issued to your original payment method, store credit, or as a replacement.",
  },
];

const EXCEPTIONS = [
  {
    icon: ShieldCheck,
    title: "Defective on arrival",
    desc: "Report within 48 hours of delivery for a free replacement or full refund.",
  },
  {
    icon: Wrench,
    title: "Warranty issues",
    desc: "After 14 days, defects are handled under manufacturer warranty via Warranty & Claims.",
    cta: { label: "File a claim", to: "/account/warranty" },
  },
  {
    icon: AlertTriangle,
    title: "Wrong item delivered",
    desc: "We cover all return shipping and prioritize re-delivery within 48 hours.",
  },
];

const ReturnsPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-brand-soft">
        <div className="container mx-auto px-4 py-10 sm:py-14 lg:py-16">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/help" className="hover:text-foreground">Help</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-foreground">Returns &amp; Refund Policy</span>
          </div>

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              Customer Promise
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Returns &amp; Refund Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Shop with confidence. Our 14-day, hassle-free return promise covers
              every order with free island-wide pickup and fast refunds.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Button asChild size="lg" className="gap-2">
                <Link to="/account/returns">
                  <Undo2 className="h-4 w-4" />
                  Start a Return
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/help">
                  <HelpCircle className="h-4 w-4" />
                  Get Help
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-[11px] text-muted-foreground">
              Last updated: 18 April 2026
            </p>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="border-b border-border/60 bg-card">
        <div className="container mx-auto grid gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, label: "14-day window", desc: "From delivery date" },
            { icon: Truck, label: "Free pickup", desc: "Island-wide, insured" },
            { icon: Wallet, label: "Fast refunds", desc: "3–5 business days" },
            { icon: ShieldCheck, label: "100% protected", desc: "Buyer guarantee" },
          ].map((h) => (
            <div key={h.label} className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <h.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{h.label}</div>
                <div className="text-xs text-muted-foreground">{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-border/70 bg-card p-4 shadow-card">
              <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                On this page
              </p>
              <ul className="space-y-0.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-border/60 pt-3">
                <Button asChild size="sm" className="w-full gap-1.5">
                  <Link to="/account/returns">
                    <Undo2 className="h-3.5 w-3.5" />
                    Start a Return
                  </Link>
                </Button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0 space-y-8">
            {/* Mobile chip nav */}
            <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="shrink-0 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary"
                >
                  {s.label}
                </a>
              ))}
            </nav>

            {/* Eligibility */}
            <PolicySection
              id="eligibility"
              icon={CheckCircle2}
              title="Return Eligibility"
              subtitle="What qualifies for a return"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {ELIGIBILITY.map((e) => (
                  <div
                    key={e.title}
                    className="rounded-xl border border-border/70 bg-background p-4 transition-shadow hover:shadow-card"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <e.icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-2.5 text-sm font-bold text-foreground">{e.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{e.desc}</p>
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* Non-returnable */}
            <PolicySection
              id="non-returnable"
              icon={XCircle}
              title="Non-Returnable Items"
              subtitle="These items can't be returned for hygiene, safety or licensing reasons"
              tone="rose"
            >
              <ul className="grid gap-2 sm:grid-cols-2">
                {NON_RETURNABLE.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-lg border border-border/70 bg-background px-3 py-2.5 text-sm text-foreground"
                  >
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            {/* Refunds */}
            <PolicySection
              id="refunds"
              icon={Wallet}
              title="Refund Conditions & Methods"
              subtitle="Choose how you'd like to receive your refund"
            >
              <div className="grid gap-3 lg:grid-cols-3">
                {REFUND_METHODS.map((m) => {
                  const tones = {
                    primary: "bg-primary/10 text-primary",
                    emerald: "bg-emerald-50 text-emerald-600",
                    amber: "bg-amber-50 text-amber-600",
                  };
                  return (
                    <div
                      key={m.title}
                      className="rounded-xl border border-border/70 bg-background p-4 transition-shadow hover:shadow-card"
                    >
                      <div className="flex items-start justify-between">
                        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tones[m.tone]}`}>
                          <m.icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-foreground">
                          {m.time}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-base font-bold text-foreground">{m.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-primary/15 bg-gradient-brand-soft p-4 text-xs">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Good to know
                </div>
                <p className="mt-1 text-muted-foreground">
                  Refunds exclude original delivery fees unless the return is due to
                  a defect or our error. Bank processing time may add 1–2 extra days
                  depending on your provider.
                </p>
              </div>
            </PolicySection>

            {/* Timelines */}
            <PolicySection
              id="timelines"
              icon={Clock}
              title="Refund Timelines"
              subtitle="What to expect, step by step"
            >
              <ol className="relative space-y-4 border-l-2 border-primary/20 pl-5">
                {TIMELINES.map((t, i) => (
                  <li key={t.stage} className="relative">
                    <span className="absolute -left-[1.65rem] top-0 grid h-7 w-7 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground shadow-sm">
                      {i + 1}
                    </span>
                    <div className="rounded-xl border border-border/70 bg-background p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-foreground">{t.stage}</h3>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {t.time}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </PolicySection>

            {/* Process */}
            <PolicySection
              id="process"
              icon={RefreshCcw}
              title="The Refund Process"
              subtitle="Simple, transparent and fully managed by us"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {PROCESS.map((p, i) => (
                  <div
                    key={p.title}
                    className="rounded-xl border border-border/70 bg-background p-4 transition-shadow hover:shadow-card"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <p.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-foreground">{p.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* Exceptions */}
            <PolicySection
              id="exceptions"
              icon={AlertTriangle}
              title="Exceptions & Special Cases"
              subtitle="Situations that follow a different process"
            >
              <div className="space-y-3">
                {EXCEPTIONS.map((ex) => (
                  <div
                    key={ex.title}
                    className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
                        <ex.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">{ex.title}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">{ex.desc}</p>
                      </div>
                    </div>
                    {ex.cta && (
                      <Button asChild variant="outline" size="sm" className="gap-1.5 sm:shrink-0">
                        <Link to={ex.cta.to}>
                          {ex.cta.label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* CTA banner */}
            <section className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-hero text-primary-foreground shadow-lift">
              <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
                    <Undo2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold sm:text-2xl">
                      Ready to start a return?
                    </h2>
                    <p className="mt-1 text-sm opacity-90">
                      It takes under 2 minutes — pickup is free and refunds are fast.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="hero" size="lg" className="gap-2">
                    <Link to="/account/returns">
                      <Undo2 className="h-4 w-4" />
                      Start a Return
                    </Link>
                  </Button>
                  <Button asChild variant="heroOutline" size="lg" className="gap-2">
                    <Link to="/track-order">
                      <Truck className="h-4 w-4" />
                      Track Order
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Help shortcut */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/faq"
                className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-bold text-foreground">
                    Have questions?
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Browse our return &amp; refund FAQs
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>

              <Link
                to="/help"
                className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Headphones className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-bold text-foreground">
                    Talk to support
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Live chat, WhatsApp or email — 7 days a week
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const PolicySection = ({
  id,
  icon: Icon,
  title,
  subtitle,
  tone = "primary",
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  tone?: "primary" | "rose";
  children: React.ReactNode;
}) => {
  const iconCls =
    tone === "rose"
      ? "bg-rose-50 text-rose-600"
      : "bg-primary/10 text-primary";
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6"
    >
      <div className="mb-4 flex items-center gap-3 border-b border-border/60 pb-4">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${iconCls}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
};

export default ReturnsPolicy;
