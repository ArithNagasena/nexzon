import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  Gift,
  Heart,
  ArrowRight,
  Crown,
  Bell,
  Star,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";
import AccountLayout from "@/components/NexZon/AccountLayout";
import { Button } from "@/components/ui/button";
import { customer, notifications, orders, statusMeta, pendingReviews } from "@/data/account";
import { fmtLKR, getProduct } from "@/data/catalog";
import { cn } from "@/lib/utils";

const Account = () => {
  useEffect(() => {
    document.title = `${customer.firstName}'s account — Nexzon`;
  }, []);

  const active = orders.filter((o) => o.status === "in-transit" || o.status === "processing");
  const delivered = orders.filter((o) => o.status === "delivered");
  const unread = notifications.filter((n) => n.unread);
  const lifetime = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const tierProgress = Math.round((customer.points / (customer.points + customer.pointsToNextTier)) * 100);

  const stats = [
    { icon: Package, label: "Orders placed", value: String(orders.length), to: "/account/orders" },
    { icon: Truck, label: "In progress", value: String(active.length), to: "/account/orders" },
    { icon: Gift, label: "Reward points", value: customer.points.toLocaleString(), to: "/account/rewards" },
    { icon: Heart, label: "Lifetime spend", value: fmtLKR(lifetime), to: "/account/orders" },
  ];

  const shortcuts = [
    { icon: Truck, title: "Track a delivery", desc: "Live courier updates", to: "/track-order" },
    { icon: Star, title: "Write a review", desc: `${pendingReviews.length} waiting · 200 pts each`, to: "/account/reviews" },
    { icon: TrendingDown, title: "Price alerts", desc: "Watch a product's price", to: "/account/price-alerts" },
    { icon: ShieldCheck, title: "Warranty & repairs", desc: "Raise a claim", to: "/account/warranty" },
  ];

  return (
    <AccountLayout
      title={`Hello, ${customer.firstName}`}
      subtitle={`${customer.tier} member since ${customer.memberSince}`}
      actions={
        <Button asChild variant="outline">
          <Link to="/account/profile">Edit profile</Link>
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <s.icon className="h-5 w-5 text-primary" />
            <div className="mt-3 font-display text-xl font-extrabold text-foreground">{s.value}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Tier progress */}
      <div className="mt-5 overflow-hidden rounded-2xl bg-gradient-deep p-6 text-primary-foreground">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
              <Crown className="h-3.5 w-3.5 text-warning" /> {customer.tier}
            </span>
            <h2 className="mt-3 font-display text-xl font-extrabold">
              {customer.pointsToNextTier.toLocaleString()} points to {customer.nextTier}
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Platinum unlocks 2 points per LKR 100 and a year of Nexzon Care on us.
            </p>
          </div>
          <Button asChild variant="hero" className="shrink-0">
            <Link to="/account/rewards">View rewards</Link>
          </Button>
        </div>
        <div className="mt-5">
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-warning transition-all" style={{ width: `${tierProgress}%` }} />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] text-white/60">
            <span>{customer.points.toLocaleString()} pts</span>
            <span>{(customer.points + customer.pointsToNextTier).toLocaleString()} pts</span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Active orders */}
        <section className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-bold">Orders in progress</h2>
            <Link to="/account/orders" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              All orders <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {active.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Nothing on its way right now.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {active.map((o) => {
                const first = getProduct(o.itemIds[0].id);
                const extra = o.itemIds.length - 1;
                const meta = statusMeta[o.status];
                return (
                  <li key={o.id}>
                    <Link
                      to={`/account/orders/${o.id}`}
                      className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-secondary"
                    >
                      {first && (
                        <span className="isolate grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-white">
                          <img src={first.image} alt="" className="h-14 w-auto object-contain mix-blend-multiply" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold", meta.cls)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} /> {meta.label}
                        </span>
                        <span className="mt-1 block truncate text-sm font-bold text-foreground">
                          {first?.name}
                          {extra > 0 && <span className="font-normal text-muted-foreground"> +{extra} more</span>}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {o.id} · {o.eta ?? o.placed}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-bold text-foreground">{fmtLKR(o.total)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            {delivered.length} delivered orders in your history.
          </p>
        </section>

        {/* Notifications */}
        <section className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold">Latest</h2>
            {unread.length > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-promo px-1.5 text-[10px] font-bold text-promo-foreground">
                {unread.length}
              </span>
            )}
          </div>
          <ul className="mt-4 space-y-3">
            {notifications.slice(0, 3).map((n) => (
              <li key={n.id}>
                <Link to={n.to ?? "/account/notifications"} className="group block">
                  <span className="flex items-start gap-2.5">
                    <Bell className={cn("mt-0.5 h-4 w-4 shrink-0", n.unread ? "text-primary" : "text-muted-foreground")} />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                        {n.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{n.when}</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" size="sm" className="mt-4 w-full">
            <Link to="/account/notifications">See all notifications</Link>
          </Button>
        </section>
      </div>

      {/* Shortcuts */}
      <section className="mt-5">
        <h2 className="font-display text-lg font-bold">Quick actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {shortcuts.map((s) => (
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
    </AccountLayout>
  );
};

export default Account;
