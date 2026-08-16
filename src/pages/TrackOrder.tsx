import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CheckCircle2,
  Package,
  Truck,
  Home,
  MapPin,
  Phone,
  Copy,
  ChevronRight,
  Clock,
  MessageSquare,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";
import { addresses, orders, statusMeta } from "@/data/account";
import { fmtLKR, getProduct } from "@/data/catalog";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const tracked = orders.find((o) => o.status === "in-transit")!;

const timeline = [
  { icon: CheckCircle2, title: "Order confirmed", place: "Nexzon Colombo", when: "12 Aug, 4:12 PM", done: true },
  { icon: Package, title: "Packed and sealed", place: "Dharmapala Mawatha warehouse", when: "13 Aug, 10:35 AM", done: true },
  { icon: Truck, title: "Collected by courier", place: "Pronto Express · Colombo hub", when: "15 Aug, 8:50 AM", done: true, current: true },
  { icon: MapPin, title: "Out for delivery", place: "Colombo 07 route", when: "Expected 17 Aug", done: false },
  { icon: Home, title: "Delivered", place: "Horton Place", when: "Expected 17–19 Aug", done: false },
];

const TrackOrder = () => {
  const [query, setQuery] = useState(tracked.id);
  const [shown, setShown] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.title = "Track your delivery — Nexzon";
  }, []);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const hit = orders.some((o) => o.id.toLowerCase() === query.trim().toLowerCase());
    setShown(hit);
    setNotFound(!hit);
  };

  const items = tracked.itemIds.map((i) => ({ qty: i.qty, p: getProduct(i.id) })).filter((x) => x.p);
  const meta = statusMeta[tracked.status];
  const home = addresses.find((a) => a.isDefault)!;

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <main>
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Track your delivery</span>
          </nav>
        </div>

        {/* Search */}
        <section className="container-page pt-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground sm:p-12">
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Where's my order?</h1>
            <p className="mt-3 max-w-lg text-sm text-white/85">
              Enter your order number — it's in your confirmation email and starts with NX. No sign-in needed.
            </p>
            <form onSubmit={search} className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="NX-260812-7734"
                  aria-label="Order number"
                  className="h-12 w-full rounded-xl border-0 bg-white pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-white"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="h-12">Track order</Button>
            </form>
            {notFound && (
              <p role="alert" className="mt-3 text-sm font-semibold text-warning">
                We couldn't find that order number. Check the email confirmation, or call {site.phoneDisplay}.
              </p>
            )}
          </div>
        </section>

        {shown && (
          <section className="container-page py-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-8">
              {/* Timeline */}
              <div className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
                  <div>
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold", meta.cls)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} /> {meta.label}
                    </span>
                    <h2 className="mt-2 font-display text-xl font-extrabold">{tracked.id}</h2>
                    <p className="text-xs text-muted-foreground">Placed {tracked.placed}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Arriving</p>
                    <p className="font-display text-base font-bold text-foreground">{tracked.eta}</p>
                  </div>
                </div>

                <ol className="mt-6">
                  {timeline.map((t, i) => (
                    <li key={t.title} className="relative flex gap-4 pb-8 last:pb-0">
                      {i < timeline.length - 1 && (
                        <span className={cn("absolute left-[19px] top-10 h-full w-0.5", t.done ? "bg-success" : "bg-border")} />
                      )}
                      <span
                        className={cn(
                          "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full",
                          t.done ? "bg-success text-success-foreground" : "border-2 border-border bg-card text-muted-foreground",
                          t.current && "ring-4 ring-success/20",
                        )}
                      >
                        <t.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 pt-1.5">
                        <p className={cn("font-display text-sm font-bold", t.done ? "text-foreground" : "text-muted-foreground")}>
                          {t.title}
                          {t.current && (
                            <span className="ml-2 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                              Now
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{t.place}</p>
                        <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="h-3 w-3" /> {t.when}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-2 flex flex-wrap items-center gap-3 rounded-xl bg-surface p-4">
                  <Truck className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm">
                    <strong className="text-foreground">{tracked.courier}</strong>
                    <span className="text-muted-foreground"> · {tracked.tracking}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(tracked.tracking ?? "")}
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy tracking number
                  </button>
                </div>
              </div>

              {/* Side */}
              <aside className="min-w-0 space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h2 className="font-display text-base font-bold">In this delivery</h2>
                  <ul className="mt-4 space-y-3">
                    {items.map(({ qty, p }) => (
                      <li key={p!.id} className="flex items-center gap-3">
                        <span className="isolate relative grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white">
                          <img src={p!.image} alt="" className="h-12 w-auto object-contain mix-blend-multiply" />
                          {qty > 1 && (
                            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
                              {qty}
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">{p!.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm">
                    <span className="text-muted-foreground">Order total</span>
                    <span className="font-display font-extrabold text-foreground">{fmtLKR(tracked.total)}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h2 className="flex items-center gap-2 font-display text-base font-bold">
                    <MapPin className="h-4 w-4 text-primary" /> Delivering to
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {home.name}<br />
                    {home.street}<br />
                    {home.city} {home.postcode}<br />
                    <span className="text-muted-foreground">{home.phone}</span>
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                    <Link to="/account/profile">Change address</Link>
                  </Button>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="font-display text-base font-bold">Problem with this delivery?</h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Our team can reroute, reschedule or chase the courier for you.
                  </p>
                  <div className="mt-4 grid gap-2">
                    <Button asChild size="sm">
                      <a href={site.phoneHref}><Phone className="h-3.5 w-3.5" /> {site.phoneDisplay}</a>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/help"><MessageSquare className="h-3.5 w-3.5" /> Message support</Link>
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
