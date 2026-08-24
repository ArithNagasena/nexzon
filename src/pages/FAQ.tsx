import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Search,
  ShoppingBag,
  Truck,
  CreditCard,
  ShieldCheck,
  Undo2,
  CalendarClock,
  UserCircle2,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/data/site";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  items: FaqItem[];
}

const GROUPS: FaqGroup[] = [
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
    items: [
      {
        q: "How do I place an order on Nexzon?",
        a: "Browse the shop, add items to your cart, then proceed to checkout. You can pay securely online or choose Cash on Delivery for eligible items. Once placed, you'll get an instant order confirmation by email and SMS.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "You can cancel or edit an order within 1 hour of placing it from My Account → Orders. After that, the order enters processing and changes may not be possible — contact support for assistance.",
      },
      {
        q: "Where can I see my order history?",
        a: "Sign in and go to My Account → Orders. You'll find every past purchase, invoices, tracking info, and the option to reorder with one tap.",
      },
      {
        q: "Do I need an account to place an order?",
        a: "Guest checkout is available, but creating an account lets you track orders, save addresses, earn rewards, and get faster checkouts.",
      },
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: Truck,
    items: [
      {
        q: "How long does delivery take?",
        a: "Colombo and suburbs: 1–2 business days. Other areas in Sri Lanka: 2–4 business days. Express delivery is available at checkout for select cities.",
      },
      {
        q: "Is delivery free?",
        a: "Free island-wide delivery on orders over LKR 25,000. Below that, a flat fee of LKR 450 applies (LKR 250 within Colombo).",
      },
      {
        q: "Can I track my order?",
        a: "Yes — every order gets a live tracking link via SMS and email. You can also track it anytime from My Account → Order Tracking.",
      },
      {
        q: "Do you deliver outside Sri Lanka?",
        a: "Currently we only deliver within Sri Lanka. International shipping is coming soon — sign up for our newsletter to be notified.",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Visa, Mastercard, Amex, FriMi, eZ Cash, bank transfer, and Cash on Delivery (eligible items only). All online payments are processed via PCI-DSS secure gateways.",
      },
      {
        q: "Do you offer installment plans?",
        a: "Yes — 0% interest installments are available with selected banks (Commercial, Sampath, HNB, NDB, NTB) for 3, 6, and 12 months on eligible products.",
      },
      {
        q: "Is it safe to save my card on Nexzon?",
        a: "Saved cards are tokenized by our payment partner — we never see or store your full card number. You can remove saved cards anytime from My Account → Profile.",
      },
      {
        q: "When will my card be charged?",
        a: "For in-stock items, the charge is processed immediately. For pre-orders, you're only charged when the item ships.",
      },
    ],
  },
  {
    id: "warranty",
    label: "Warranty",
    icon: ShieldCheck,
    items: [
      {
        q: "What warranty do Nexzon products come with?",
        a: "All products carry the official manufacturer warranty (typically 12–24 months). Nexzon Care, our optional extended plan, adds accidental damage protection.",
      },
      {
        q: "How do I file a warranty claim?",
        a: "Go to My Account → Warranty & Claims, select the product, choose an issue category, describe the problem and upload photos. Our team responds within 24 hours.",
      },
      {
        q: "Is there free pickup for warranty repairs?",
        a: "Yes — for in-warranty issues we offer free island-wide pickup and drop-off. Out-of-warranty repairs include a small logistics fee.",
      },
      {
        q: "Are physical/liquid damages covered?",
        a: "Manufacturer warranty does not cover physical or liquid damage. Nexzon Care covers accidental damage with a small service fee per claim.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns",
    icon: Undo2,
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 14-day return window from the delivery date for unused items in original packaging with all accessories. See My Account → Returns to start a request.",
      },
      {
        q: "How long does a refund take?",
        a: "Once we receive and inspect the returned item, refunds are processed within 3–5 business days to your original payment method.",
      },
      {
        q: "Can I exchange instead of refund?",
        a: "Yes — choose Replacement or Store Credit when you submit a return request. Store credit never expires and can be combined with promotions.",
      },
      {
        q: "Who pays for return shipping?",
        a: "If the return is due to a defect or our error, return shipping is free. For change-of-mind returns, a small pickup fee applies.",
      },
    ],
  },
  {
    id: "preorders",
    label: "Pre-Orders",
    icon: CalendarClock,
    items: [
      {
        q: "How do pre-orders work?",
        a: "Reserve upcoming devices before launch with a small deposit or full payment. You're guaranteed a unit on launch day, often with launch-day bonuses.",
      },
      {
        q: "Can I cancel a pre-order?",
        a: "Yes — cancel anytime before the item ships from My Account → Orders. Any deposit is refunded to your original payment method within 5 business days.",
      },
      {
        q: "When will I be charged for a pre-order?",
        a: "If you paid a deposit, the balance is charged when stock arrives and your order is ready to ship. Full pre-payments are charged at order time.",
      },
      {
        q: "Will my pre-order ship on launch day?",
        a: "Yes — pre-orders are always prioritized over regular orders and dispatched on the official launch day.",
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    icon: UserCircle2,
    items: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login screen and enter your email. We'll send a secure reset link valid for 30 minutes.",
      },
      {
        q: "How do I update my profile or address?",
        a: "Sign in and go to My Account → Profile. You can manage personal details, addresses, saved cards and notification preferences.",
      },
      {
        q: "How do loyalty points work?",
        a: "Earn points on every purchase — 1 point per LKR 100 spent. Redeem points at checkout or in My Account → Loyalty & Rewards. Tier benefits unlock bigger perks.",
      },
      {
        q: "How do I delete my account?",
        a: "Contact support from the help section below. We'll process your request within 7 days, in line with our privacy policy.",
      },
    ],
  },
];

const FAQ = () => {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("orders");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GROUPS;
    return GROUPS.map((g) => ({
      ...g,
      items: g.items.filter(
        (it) =>
          it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q),
      ),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  const totalMatches = useMemo(
    () => filtered.reduce((sum, g) => sum + g.items.length, 0),
    [filtered],
  );

  const isSearching = query.trim().length > 0;

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
            <span className="font-semibold text-foreground">Help &amp; FAQ</span>
          </div>

          <div className="mx-auto mt-6 max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              Help Center
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How can we help you?
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Search our knowledge base or browse the most common questions
              about orders, delivery, warranty and more.
            </p>

            {/* Search */}
            <div className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-2xl border border-border/70 bg-card p-1.5 shadow-card">
              <div className="grid h-10 w-10 shrink-0 place-items-center text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions e.g. 'refund', 'warranty', 'tracking'…"
                className="flex-1 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery("")}
                  className="text-xs"
                >
                  Clear
                </Button>
              )}
            </div>
            {isSearching && (
              <p className="mt-2 text-xs text-muted-foreground">
                {totalMatches} result{totalMatches === 1 ? "" : "s"} for{" "}
                <span className="font-semibold text-foreground">
                  "{query}"
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="container-page py-8 lg:py-12">
        {/* Category chips (mobile + tablet jump nav) */}
        {!isSearching && (
          <div className="mb-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
            {GROUPS.map((g) => {
              const active = activeGroup === g.id;
              return (
                <a
                  key={g.id}
                  href={`#faq-${g.id}`}
                  onClick={() => setActiveGroup(g.id)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  <g.icon className="-ml-0.5 mr-1 inline h-3.5 w-3.5" />
                  {g.label}
                </a>
              );
            })}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar nav (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card">
                <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Categories
                </p>
                <ul className="space-y-0.5">
                  {GROUPS.map((g) => {
                    const active = activeGroup === g.id;
                    const Icon = g.icon;
                    return (
                      <li key={g.id}>
                        <a
                          href={`#faq-${g.id}`}
                          onClick={() => setActiveGroup(g.id)}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{g.label}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              active
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-foreground"
                            }`}
                          >
                            {g.items.length}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-2xl border border-primary/15 bg-gradient-brand-soft p-5 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-foreground">
                  Still need help?
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Our team is online 7 days a week.
                </p>
                <Button size="sm" className="mt-3 w-full gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Chat with us
                </Button>
              </div>
            </div>
          </aside>

          {/* Main FAQ list */}
          <main className="min-w-0 space-y-6">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-border bg-card px-6 py-16 text-center shadow-card">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                  <Search className="h-7 w-7" />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">
                  No matching questions
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a different keyword or contact our support team for help.
                </p>
                <Button
                  onClick={() => setQuery("")}
                  className="mt-4 gap-1.5"
                  size="sm"
                >
                  Clear search
                </Button>
              </div>
            ) : (
              filtered.map((g) => {
                const Icon = g.icon;
                return (
                  <section
                    key={g.id}
                    id={`faq-${g.id}`}
                    className="scroll-mt-24 rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6"
                  >
                    <div className="mb-3 flex items-center gap-3 border-b border-border/60 pb-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-display text-lg font-bold">
                          {g.label}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          {g.items.length} question
                          {g.items.length === 1 ? "" : "s"}
                        </p>
                      </div>
                    </div>

                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue={
                        isSearching ? `${g.id}-0` : undefined
                      }
                    >
                      {g.items.map((item, i) => (
                        <AccordionItem
                          key={i}
                          value={`${g.id}-${i}`}
                          className="border-border/60"
                        >
                          <AccordionTrigger className="text-left text-sm font-semibold hover:text-primary hover:no-underline">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                );
              })
            )}

            {/* Contact section */}
            <section className="overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-card">
              <div className="bg-gradient-hero px-5 py-5 text-primary-foreground sm:px-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-90">
                  <Sparkles className="h-3.5 w-3.5" />
                  Couldn't find what you need?
                </div>
                <h2 className="mt-1 font-display text-xl font-bold sm:text-2xl">
                  Talk to a Nexzon specialist
                </h2>
                <p className="mt-1 text-sm opacity-90">
                  Our friendly support team is here 7 days a week, 9 AM – 9 PM.
                </p>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
                <ContactCard
                  icon={MessageCircle}
                  title="Live Chat"
                  desc="Avg reply under 2 min"
                  cta="Start chat"
                />
                <ContactCard
                  icon={Phone}
                  title="Call us"
                  desc="+94 11 234 5678"
                  cta="Call now"
                />
                <ContactCard
                  icon={Mail}
                  title="Email"
                  desc={site.email}
                  cta="Send email"
                />
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const ContactCard = ({
  icon: Icon,
  title,
  desc,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  cta: string;
}) => (
  <div className="rounded-xl border border-border/70 bg-background p-4 transition-shadow hover:shadow-card">
    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="mt-3 text-sm font-bold text-foreground">{title}</h3>
    <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
    <Button variant="outline" size="sm" className="mt-3 w-full">
      {cta}
    </Button>
  </div>
);

export default FAQ;
