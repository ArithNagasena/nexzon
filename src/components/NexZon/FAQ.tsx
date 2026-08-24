import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, MessageCircle, Phone, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

type Faq = { topic: string; q: string; a: string };

const faqs: Faq[] = [
  {
    topic: "Delivery",
    q: "Do you deliver islandwide?",
    a: "Yes — we deliver to all 25 districts. Orders placed before 2 PM are dispatched the same day. Standard delivery takes 1–3 working days depending on your location.",
  },
  {
    topic: "Delivery",
    q: "How much does delivery cost?",
    a: "Delivery is free on orders over LKR 25,000. Below that it is LKR 400 within Colombo and LKR 600 elsewhere in the island.",
  },
  {
    topic: "Delivery",
    q: "Can I track my order?",
    a: "Every order gets an SMS and email with a tracking link the moment it is dispatched. You can also follow it from Track Order without signing in.",
  },
  {
    topic: "Payments",
    q: "Is Cash on Delivery available?",
    a: "Yes, islandwide, for orders up to LKR 200,000. You may inspect the package before paying our courier.",
  },
  {
    topic: "Payments",
    q: "What payment methods do you accept?",
    a: "Visa, Mastercard, Amex, LankaQR, FriMi, eZ Cash and direct bank transfer. Card details are never stored on our servers.",
  },
  {
    topic: "Payments",
    q: "How do the 0% installment plans work?",
    a: "Choose 3, 6 or 12 months at checkout with a credit card from a partner bank. The bank splits the amount with no added interest — you pay exactly the listed price.",
  },
  {
    topic: "Warranty",
    q: "Are your products genuine and warranty-backed?",
    a: "Every product is sourced from authorized distributors and carries the full manufacturer warranty, typically 12–24 months, serviced locally.",
  },
  {
    topic: "Warranty",
    q: "How do I make a warranty claim?",
    a: "Submit the warranty form from your account with your order number. We arrange pickup, handle the service centre on your behalf, and return the device to you.",
  },
  {
    topic: "Warranty",
    q: "What does Nexzon Care add?",
    a: "Nexzon Care is an optional extended plan covering accidental damage — drops and liquid — which the manufacturer warranty excludes. A small service fee applies per claim.",
  },
  {
    topic: "Returns",
    q: "What is your return policy?",
    a: "Unopened products can be returned within 7 days of delivery for a full refund. Faulty items are handled under warranty rather than as returns.",
  },
  {
    topic: "Returns",
    q: "How long do refunds take?",
    a: "Once we receive the item, refunds are issued within 3–5 working days to your original payment method. COD orders are refunded by bank transfer.",
  },
  {
    topic: "Pre-Orders",
    q: "Can I pre-order upcoming smartphones?",
    a: "Yes. Pre-orders open as soon as a launch is announced. A deposit from LKR 5,000 reserves your unit and is fully refundable any time before dispatch.",
  },
  {
    topic: "Pre-Orders",
    q: "When am I charged for a pre-order?",
    a: "Only the deposit is taken upfront. The balance is collected when the device is ready to ship, so you are never charged in full for stock that has not arrived.",
  },
  {
    topic: "Pre-Orders",
    q: "Can I trade in my old phone?",
    a: "Yes — get an instant valuation from the Trade-In page and the credit is applied to your order, including pre-orders. We collect the old device on delivery.",
  },
];

const topics = ["All", "Delivery", "Payments", "Warranty", "Returns", "Pre-Orders"];

const channelShell =
  "group flex flex-col items-center gap-1.5 sm:flex-row sm:items-center sm:gap-3";

const supportChannels = [
  { icon: Phone, label: "Call us", value: site.phoneDisplay, to: site.phoneHref, external: true },
  { icon: MessageCircle, label: "Live chat", value: site.hours, to: "/help", external: false },
  { icon: LifeBuoy, label: "Help centre", value: "Guides & policies", to: "/help", external: false },
];

/** How many questions a phone shows before "Show all questions". */
const MOBILE_FAQ_LIMIT = 5;

const FAQ = () => {
  const [topic, setTopic] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const shown = topic === "All" ? faqs : faqs.filter((f) => f.topic === topic);
  const overflow = Math.max(0, shown.length - MOBILE_FAQ_LIMIT);

  return (
    <section className="bg-background section-y">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Help centre</span>
          <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">Questions, answered</h2>
          <p className="mt-3 hidden text-sm leading-relaxed text-muted-foreground sm:block">
            Delivery, payments, warranty, returns and pre-orders — the things worth knowing before you buy.
          </p>
        </div>

        {/* Topic filter — a single swipeable row on a phone instead of three wrapped
            rows of chips; centred wrapping again once there's width for it. */}
        <div className="-mx-4 mt-6 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-8 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {topics.map((t) => {
            const active = t === topic;
            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTopic(t);
                  setShowAll(false);
                }}
                aria-pressed={active}
                className={cn(
                  "shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-primary",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Remounting on topic change keeps the open item in step with what is listed. */}
        <Accordion
          key={topic}
          type="single"
          collapsible
          className="mx-auto mt-6 grid max-w-5xl items-start gap-3 sm:mt-8 lg:grid-cols-2"
        >
          {shown.map((f, i) => (
            /* `contents` keeps each item a direct grid child; the wrapper only
               exists to drop the overflow questions below `lg`. */
            <div
              key={f.q}
              className={showAll || i < MOBILE_FAQ_LIMIT ? "contents" : "hidden lg:contents"}
            >
              <AccordionItem
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-soft"
              >
                <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>

        {overflow > 0 && !showAll && (
          <div className="mt-5 flex justify-center lg:hidden">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-colors hover:border-primary/40"
            >
              Show all questions ({overflow}) <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Support strip */}
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-border bg-surface p-5 sm:mt-10 sm:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center md:gap-6">
            {/* Same trim as the footer's contact strip: three tap targets on a
                phone, icon + label + value once there is room. */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {supportChannels.map((c) =>
                c.external ? (
                  <a key={c.label} href={c.to} className={channelShell}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 text-center sm:text-left">
                      <span className="block text-xs font-semibold text-foreground sm:text-sm">{c.label}</span>
                      <span className="hidden truncate text-xs text-muted-foreground sm:block">{c.value}</span>
                    </span>
                  </a>
                ) : (
                  <Link key={c.label} to={c.to} className={channelShell}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 text-center sm:text-left">
                      <span className="block text-xs font-semibold text-foreground sm:text-sm">{c.label}</span>
                      <span className="hidden truncate text-xs text-muted-foreground sm:block">{c.value}</span>
                    </span>
                  </Link>
                ),
              )}
            </div>

            <Link
              to="/faq"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Browse all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
