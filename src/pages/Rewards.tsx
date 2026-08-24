import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Crown, Gift, ArrowUpRight, ArrowDownRight, Ticket, Users, Star, Check } from "lucide-react";
import AccountLayout from "@/components/NexZon/AccountLayout";
import { Button } from "@/components/ui/button";
import { customer, pointsLedger, rewardTiers } from "@/data/account";
import { fmtLKR } from "@/data/catalog";
import { cn } from "@/lib/utils";

const vouchers = [
  { id: "v1", cost: 1000, value: 1000, label: "LKR 1,000 off any order" },
  { id: "v2", cost: 2500, value: 3000, label: "LKR 3,000 off orders over LKR 50,000" },
  { id: "v3", cost: 4500, value: 6000, label: "LKR 6,000 off orders over LKR 150,000" },
  { id: "v4", cost: 6000, value: 0, label: "Nexzon Care — 12 months free" },
];

const earnMore = [
  { icon: Star, title: "Write a review", points: 200, desc: "For any delivered order" },
  { icon: Users, title: "Refer a friend", points: 500, desc: "When their first order ships" },
  { icon: Gift, title: "Birthday bonus", points: 300, desc: `Every ${customer.birthday}` },
];

const Rewards = () => {
  useEffect(() => {
    document.title = "Rewards — Nexzon";
  }, []);

  const target = customer.points + customer.pointsToNextTier;
  const progress = Math.round((customer.points / target) * 100);
  const currentIdx = rewardTiers.findIndex((t) => t.name === customer.tier);

  return (
    <AccountLayout
      title="Rewards"
      subtitle={`${customer.points.toLocaleString()} points · ${customer.tier} member`}
      actions={<Button asChild variant="outline"><Link to="/shop">Earn on your next order</Link></Button>}
    >
      {/* Balance + progress */}
      <div className="overflow-hidden rounded-2xl bg-gradient-deep p-6 text-primary-foreground sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
              <Crown className="h-3.5 w-3.5 text-warning" /> {customer.tier}
            </span>
            <p className="mt-4 font-display text-5xl font-extrabold leading-none tabular-nums">
              {customer.points.toLocaleString()}
            </p>
            <p className="mt-1.5 text-sm text-white/75">
              points available · worth about {fmtLKR(Math.floor(customer.points / 1000) * 1000)} in vouchers
            </p>
          </div>
          <div className="lg:w-72">
            <div className="flex justify-between text-xs text-white/70">
              <span>{customer.tier}</span>
              <span>{customer.nextTier}</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-warning transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-white/70">
              {customer.pointsToNextTier.toLocaleString()} points to go
            </p>
          </div>
        </div>
      </div>

      {/* Tiers */}
      <section className="mt-6">
        <h2 className="font-display text-lg font-bold">Membership tiers</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rewardTiers.map((t, i) => {
            const current = i === currentIdx;
            const reached = i <= currentIdx;
            return (
              <div
                key={t.name}
                className={cn(
                  "rounded-2xl border p-5 shadow-soft",
                  current ? "border-primary bg-accent" : reached ? "border-success/30 bg-card" : "border-border bg-card",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-foreground">{t.name}</h3>
                  {current && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">You</span>
                  )}
                  {reached && !current && <Check className="h-4 w-4 text-success" />}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.from.toLocaleString()}+ points</p>
                <ul className="mt-3 space-y-1.5">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Vouchers */}
        <section className="min-w-0">
          <h2 className="font-display text-lg font-bold">Redeem your points</h2>
          <div className="mt-4 space-y-3">
            {vouchers.map((v) => {
              const affordable = customer.points >= v.cost;
              return (
                <div
                  key={v.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", affordable ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground")}>
                    <Ticket className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-bold text-foreground">{v.label}</p>
                    <p className="text-xs text-muted-foreground">{v.cost.toLocaleString()} points</p>
                  </div>
                  <Button size="sm" variant={affordable ? "default" : "outline"} disabled={!affordable} className="shrink-0">
                    {affordable ? "Redeem" : `${(v.cost - customer.points).toLocaleString()} more`}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Ledger */}
          <h2 className="mt-8 font-display text-lg font-bold">Points history</h2>
          <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card px-5 shadow-soft">
            {pointsLedger.map((l) => (
              <li key={l.id} className="flex items-center gap-4 py-4">
                <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full", l.points > 0 ? "bg-success/10 text-success" : "bg-promo/10 text-promo")}>
                  {l.points > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{l.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{l.detail} · {l.when}</p>
                </div>
                <span className={cn("shrink-0 font-display text-sm font-extrabold tabular-nums", l.points > 0 ? "text-success" : "text-promo")}>
                  {l.points > 0 ? "+" : ""}{l.points.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Earn more */}
        <aside className="min-w-0">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-base font-bold">Earn more points</h2>
            <ul className="mt-4 space-y-4">
              {earnMore.map((e) => (
                <li key={e.title} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <e.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{e.desc}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-success">+{e.points}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="sm" className="mt-5 w-full">
              <Link to="/account/reviews">Write a review</Link>
            </Button>
          </div>

          <p className="mt-4 rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
            Points are credited once an order is delivered and expire 24 months after they're earned.
          </p>
        </aside>
      </div>
    </AccountLayout>
  );
};

export default Rewards;
