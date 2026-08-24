import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Package, TrendingDown, Gift, Boxes, ShieldAlert, BellOff, CheckCheck, Bell } from "lucide-react";
import AccountLayout from "@/components/NexZon/AccountLayout";
import { Button } from "@/components/ui/button";
import { notifications as seed, type Notification } from "@/data/account";
import { cn } from "@/lib/utils";

const kindMeta = {
  order: { icon: Package, label: "Orders", cls: "bg-accent text-accent-foreground" },
  price: { icon: TrendingDown, label: "Price drops", cls: "bg-promo/10 text-promo" },
  stock: { icon: Boxes, label: "Back in stock", cls: "bg-success/10 text-success" },
  reward: { icon: Gift, label: "Rewards", cls: "bg-warning/15 text-warning-foreground" },
  account: { icon: ShieldAlert, label: "Account", cls: "bg-secondary text-muted-foreground" },
} as const;

const tabs = ["All", "Unread", "Orders", "Price drops", "Rewards"] as const;
type Tab = (typeof tabs)[number];

const Notifications = () => {
  const [items, setItems] = useState<Notification[]>(seed);
  const [tab, setTab] = useState<Tab>("All");

  useEffect(() => {
    document.title = "Notifications — Nexzon";
  }, []);

  const unread = items.filter((n) => n.unread).length;

  const shown = useMemo(() => {
    switch (tab) {
      case "Unread": return items.filter((n) => n.unread);
      case "Orders": return items.filter((n) => n.kind === "order");
      case "Price drops": return items.filter((n) => n.kind === "price");
      case "Rewards": return items.filter((n) => n.kind === "reward");
      default: return items;
    }
  }, [items, tab]);

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  const toggle = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));

  return (
    <AccountLayout
      title="Notifications"
      subtitle={unread > 0 ? `${unread} unread` : "You're all caught up"}
      actions={
        <Button variant="outline" onClick={markAll} disabled={unread === 0}>
          <CheckCheck className="h-4 w-4" /> Mark all read
        </Button>
      }
    >
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-primary",
              )}
            >
              {t}
              {t === "Unread" && unread > 0 && (
                <span className={cn("ml-1.5", active ? "text-primary-foreground/70" : "text-promo")}>{unread}</span>
              )}
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <BellOff className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <h2 className="mt-3 font-display text-lg font-bold">Nothing here</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {tab === "Unread" ? "Every notification has been read." : `No ${tab.toLowerCase()} notifications yet.`}
          </p>
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {shown.map((n) => {
            const meta = kindMeta[n.kind];
            return (
              <li
                key={n.id}
                className={cn(
                  "rounded-2xl border bg-card p-5 shadow-soft transition-all",
                  n.unread ? "border-primary/30" : "border-border",
                )}
              >
                <div className="flex items-start gap-4">
                  <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", meta.cls)}>
                    <meta.icon className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {meta.label}
                      </span>
                      {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-promo" aria-label="Unread" />}
                      <span className="ml-auto text-xs text-muted-foreground">{n.when}</span>
                    </div>
                    <h2 className="mt-1 font-display text-sm font-bold leading-snug text-foreground">{n.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{n.body}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {n.to && (
                        <Button asChild size="sm" variant="outline">
                          <Link to={n.to}>Open</Link>
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => toggle(n.id)}>
                        <Bell className="h-3.5 w-3.5" /> Mark as {n.unread ? "read" : "unread"}
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-6 rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground">
        Choose which of these reach you by email or SMS in{" "}
        <Link to="/account/profile" className="font-semibold text-primary hover:underline">
          profile preferences
        </Link>
        .
      </p>
    </AccountLayout>
  );
};

export default Notifications;
