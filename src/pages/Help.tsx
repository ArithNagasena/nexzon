import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Package,
  Undo2,
  ShieldCheck,
  HelpCircle,
  Zap,
  Wrench,
  Repeat,
  Store,
} from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const channels = [
  {
    icon: Phone,
    name: "Call the hotline",
    detail: site.phoneDisplay,
    reply: "Answered in under a minute",
    hours: "Mon–Sun · 9 AM – 9 PM",
    href: site.phoneHref,
    cta: "Call now",
    highlight: true,
  },
  {
    icon: MessageSquare,
    name: "WhatsApp",
    detail: site.phoneDisplay,
    reply: "Typical reply in 10 minutes",
    hours: "Mon–Sun · 8 AM – 10 PM",
    href: `https://wa.me/9411294265`,
    cta: "Open WhatsApp",
    highlight: false,
  },
  {
    icon: Mail,
    name: "Email us",
    detail: site.email,
    reply: "Replied within one working day",
    hours: "Monitored 24/7",
    href: `mailto:${site.email}`,
    cta: "Send an email",
    highlight: false,
  },
];

const topics = [
  "An order I've placed",
  "Delivery or tracking",
  "Returns or refunds",
  "Warranty or repair",
  "Payment or installments",
  "Pre-orders",
  "Something else",
];

const selfServe = [
  { icon: Package, title: "Track an order", desc: "Live status without signing in", to: "/track-order" },
  { icon: Undo2, title: "Start a return", desc: "7 days on unopened items", to: "/account/returns" },
  { icon: ShieldCheck, title: "Claim warranty", desc: "We arrange the pickup", to: "/account/warranty" },
  { icon: HelpCircle, title: "Read the FAQ", desc: "14 common questions", to: "/faq" },
];

const inStore = [
  { icon: Wrench, text: "Walk-in diagnostics and warranty drop-off" },
  { icon: Repeat, text: "Trade-in valuation while you wait" },
  { icon: Store, text: "Collect online orders within 2 hours" },
];

const hoursTable = [
  ["Hotline", "9 AM – 9 PM", "9 AM – 9 PM", "10 AM – 6 PM"],
  ["WhatsApp", "8 AM – 10 PM", "8 AM – 10 PM", "10 AM – 6 PM"],
  ["Email", "Monitored", "Monitored", "Monitored"],
  ["Showroom", "9 AM – 9 PM", "9 AM – 9 PM", "Closed"],
];

const Help = () => {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(topics[0]);

  useEffect(() => {
    document.title = "Contact support — Nexzon";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Contact support</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container-page pt-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  Team online now
                </span>
                <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                  Talk to a real person.
                </h1>
                <p className="mt-4 max-w-lg text-sm text-white/85 sm:text-base">
                  No ticket queues and no bots. Our Colombo team handles orders, repairs and warranty
                  claims directly — usually within the same hour.
                </p>
              </div>

              <dl className="flex gap-8">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-white/60">Avg. reply</dt>
                  <dd className="font-display text-2xl font-extrabold">12 min</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-white/60">Resolved same day</dt>
                  <dd className="font-display text-2xl font-extrabold">91%</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="container-page pt-12">
          <h2 className="font-display text-xl font-bold">Pick a channel</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {channels.map((c) => (
              <div
                key={c.name}
                className={cn(
                  "flex flex-col rounded-2xl border p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift",
                  c.highlight ? "border-primary bg-accent" : "border-border bg-card",
                )}
              >
                <span className={cn("grid h-11 w-11 place-items-center rounded-xl", c.highlight ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground")}>
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-foreground">{c.name}</h3>
                <p className="mt-1 font-display text-lg font-extrabold text-primary">{c.detail}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                  <Zap className="h-3.5 w-3.5" /> {c.reply}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {c.hours}
                </p>
                <Button asChild variant={c.highlight ? "default" : "outline"} className="mt-5 w-full">
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {c.cta}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Form + hours */}
        <section className="container-page pt-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
            <div className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              {sent ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                  <h2 className="mt-4 font-display text-2xl font-extrabold">Message received</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    We've logged your request under <strong className="text-foreground">{topic}</strong> and
                    emailed you a copy. Expect a reply from the Colombo team within one working day — sooner
                    if it's about an order in transit.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button variant="outline" onClick={() => setSent(false)}>Send another message</Button>
                    <Button asChild><a href={site.phoneHref}>Call instead</a></Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold">Or send us a message</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Include your order number and we'll skip the back-and-forth.
                  </p>

                  <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div className="grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="c-name" className="text-xs font-semibold">Your name</Label>
                        <Input id="c-name" required placeholder="Arith Nagasena" className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="c-email" className="text-xs font-semibold">Email</Label>
                        <Input id="c-email" type="email" required placeholder="you@example.lk" className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="c-order" className="text-xs font-semibold">
                          Order number <span className="font-normal text-muted-foreground">(optional)</span>
                        </Label>
                        <Input id="c-order" placeholder="NX-260815-4821" className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="c-topic" className="text-xs font-semibold">What's it about?</Label>
                        <select
                          id="c-topic"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                          {topics.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="c-msg" className="text-xs font-semibold">Message</Label>
                      <textarea
                        id="c-msg"
                        required
                        rows={5}
                        maxLength={1000}
                        placeholder="Tell us what happened, and what you'd like us to do about it."
                        className="w-full rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary focus:bg-background"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      <Send className="h-4 w-4" /> Send message
                    </Button>
                  </form>
                </>
              )}
            </div>

            <aside className="min-w-0 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h2 className="font-display text-base font-bold">Support hours</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-2 font-semibold">Channel</th>
                        <th className="pb-2 font-semibold">Mon–Fri</th>
                        <th className="pb-2 font-semibold">Sat</th>
                        <th className="pb-2 font-semibold">Sun</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hoursTable.map(([ch, ...rest]) => (
                        <tr key={ch} className="border-b border-border last:border-0">
                          <td className="py-2.5 font-semibold text-foreground">{ch}</td>
                          {rest.map((v, i) => (
                            <td key={i} className={cn("py-2.5", v === "Closed" ? "text-muted-foreground" : "text-foreground/80")}>
                              {v}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="flex items-center gap-2 font-display text-base font-bold">
                  <MapPin className="h-4 w-4 text-primary" /> Visit the showroom
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {inStore.map((i) => (
                    <li key={i.text} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <i.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {i.text}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Self-serve */}
        <section className="container-page py-14">
          <h2 className="font-display text-xl font-bold">Faster on your own</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Most requests are handled instantly from your account.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {selfServe.map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display text-sm font-bold text-foreground">{s.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
