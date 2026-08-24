import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingDown, Bell, BellOff, Trash2, Plus, Check, Target } from "lucide-react";
import AccountLayout from "@/components/NexZon/AccountLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { allProducts, fmtLKR, getProduct } from "@/data/catalog";
import { cn } from "@/lib/utils";

type Alert = {
  id: string;
  productId: string;
  target: number;
  active: boolean;
  createdAt: string;
  hit?: { on: string; price: number };
};

const START: Alert[] = [
  { id: "a1", productId: "pixel-10-pro", target: 350000, active: true, createdAt: "2 Aug 2026", hit: { on: "14 Aug 2026", price: 349900 } },
  { id: "a2", productId: "galaxy-s26-ultra", target: 480000, active: true, createdAt: "28 Jul 2026" },
  { id: "a3", productId: "honor-magic-v5", target: 500000, active: true, createdAt: "19 Jul 2026" },
  { id: "a4", productId: "iphone-15-pro-max", target: 440000, active: false, createdAt: "3 Jun 2026" },
];

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(START);
  const [adding, setAdding] = useState(false);
  const [pick, setPick] = useState(allProducts[3].id);
  const [target, setTarget] = useState("");

  useEffect(() => {
    document.title = "Price alerts — Nexzon";
  }, []);

  const active = alerts.filter((a) => a.active).length;
  const triggered = alerts.filter((a) => a.hit).length;

  const toggle = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  const remove = (id: string) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(target.replace(/\D/g, ""));
    if (!n) return;
    setAlerts((prev) => [
      { id: `a${Date.now()}`, productId: pick, target: n, active: true, createdAt: "Just now" },
      ...prev,
    ]);
    setAdding(false);
    setTarget("");
  };

  return (
    <AccountLayout
      title="Price alerts"
      subtitle={`${active} active · ${triggered} hit your target`}
      actions={
        <Button onClick={() => setAdding((v) => !v)} variant={adding ? "outline" : "default"}>
          {adding ? "Cancel" : <><Plus className="h-4 w-4" /> New alert</>}
        </Button>
      }
    >
      {adding && (
        <form onSubmit={add} className="rounded-2xl border border-primary/30 bg-card p-6 shadow-card">
          <h2 className="font-display text-base font-bold">Watch a product</h2>
          <div className="mt-4 grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="pa-product" className="text-xs font-semibold text-foreground">Product</label>
              <select
                id="pa-product"
                value={pick}
                onChange={(e) => setPick(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                {allProducts.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} — {fmtLKR(p.price)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="pa-target" className="text-xs font-semibold text-foreground">Alert me below</label>
              <input
                id="pa-target"
                required
                inputMode="numeric"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g. 320000"
                className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary focus:bg-background"
              />
            </div>
          </div>
          <Button type="submit" className="mt-4">Create alert</Button>
        </form>
      )}

      {alerts.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <BellOff className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <h2 className="mt-3 font-display text-lg font-bold">No price alerts yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us your price and we'll email the moment a product drops to it.
          </p>
        </div>
      ) : (
        <ul className={cn("space-y-3", adding && "mt-5")}>
          {alerts.map((a) => {
            const p = getProduct(a.productId);
            if (!p) return null;
            const distance = p.price - a.target;
            const pct = Math.min(100, Math.max(0, Math.round((a.target / p.price) * 100)));
            return (
              <li key={a.id} className={cn("rounded-2xl border bg-card p-5 shadow-soft", a.hit ? "border-success/30" : "border-border")}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link to={`/product/${p.id}`} className="isolate grid h-20 w-20 shrink-0 place-items-center self-center rounded-xl bg-white">
                    <img src={p.image} alt="" className="h-16 w-auto object-contain mix-blend-multiply" />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${p.id}`} className="block font-display text-sm font-bold text-foreground hover:text-primary">
                      {p.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">Watching since {a.createdAt}</p>

                    {a.hit ? (
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1 text-[11px] font-bold text-success">
                        <Check className="h-3.5 w-3.5" /> Hit {fmtLKR(a.hit.price)} on {a.hit.on}
                      </p>
                    ) : (
                      <div className="mt-2.5 max-w-xs">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>Now {fmtLKR(p.price)}</span>
                          <span className="inline-flex items-center gap-1"><Target className="h-3 w-3" /> {fmtLKR(a.target)}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {fmtLKR(distance)} above your target
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                    <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <Switch checked={a.active} onCheckedChange={() => toggle(a.id)} aria-label={`Alert for ${p.name}`} />
                      {a.active ? <Bell className="h-3.5 w-3.5 text-primary" /> : <BellOff className="h-3.5 w-3.5" />}
                    </label>
                    <button
                      onClick={() => remove(a.id)}
                      aria-label={`Delete alert for ${p.name}`}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
        <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        We check prices hourly. Alerts arrive by email, and by SMS if you've enabled it in{" "}
        <Link to="/account/profile" className="font-semibold text-primary hover:underline">preferences</Link>.
      </p>
    </AccountLayout>
  );
};

export default PriceAlerts;
