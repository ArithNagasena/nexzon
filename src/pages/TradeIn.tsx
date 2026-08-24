import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Repeat, CheckCircle2, Clock, Truck, Banknote, Info, Smartphone, ArrowRight } from "lucide-react";
import AccountLayout from "@/components/NexZon/AccountLayout";
import { Button } from "@/components/ui/button";
import { fmtLKR, getProduct } from "@/data/catalog";
import { cn } from "@/lib/utils";

type TradeStatus = "quoted" | "collected" | "inspected" | "credited";

const meta: Record<TradeStatus, { label: string; cls: string; icon: typeof Clock }> = {
  quoted: { label: "Quote issued", cls: "border-promo/25 bg-promo/10 text-promo", icon: Clock },
  collected: { label: "Collected", cls: "border-primary/25 bg-accent text-accent-foreground", icon: Truck },
  inspected: { label: "Inspected", cls: "border-primary/25 bg-accent text-accent-foreground", icon: CheckCircle2 },
  credited: { label: "Credit applied", cls: "border-success/25 bg-success/10 text-success", icon: Banknote },
};

const history = [
  { id: "TI-260610-0342", model: "Google Pixel 8 Pro 256GB", status: "credited" as TradeStatus, quoted: 96000, final: 96000, when: "10 Jun 2026", appliedTo: "NX-260614-5023" },
  { id: "TI-251118-0197", model: "iPhone 12 128GB", status: "credited" as TradeStatus, quoted: 74000, final: 68000, when: "18 Nov 2025", appliedTo: "—", note: "Reduced after inspection: screen scratches" },
];

/** Indicative trade-in values by model and condition. */
const models = [
  { id: "iphone-14-pro", label: "iPhone 14 Pro 256GB", base: 168000 },
  { id: "iphone-13", label: "iPhone 13 128GB", base: 92000 },
  { id: "galaxy-s24-ultra", label: "Galaxy S24 Ultra 512GB", base: 154000 },
  { id: "pixel-8-pro", label: "Google Pixel 8 Pro 256GB", base: 96000 },
  { id: "oneplus-12", label: "OnePlus 12 256GB", base: 88000 },
];

const conditions = [
  { id: "flawless", label: "Flawless", desc: "No marks, boxed, all accessories", mult: 1 },
  { id: "good", label: "Good", desc: "Light wear, screen unmarked", mult: 0.85 },
  { id: "fair", label: "Fair", desc: "Visible scratches or dents", mult: 0.6 },
  { id: "faulty", label: "Faulty", desc: "Screen, battery or camera issue", mult: 0.3 },
];

const steps = [
  { n: 1, title: "Get a quote", desc: "Pick your model and condition for an instant estimate." },
  { n: 2, title: "Free pickup", desc: "We collect it with your new device's delivery." },
  { n: 3, title: "We inspect", desc: "Checked in Colombo within 48 hours." },
  { n: 4, title: "Credit applied", desc: "Straight off your order, or paid to your bank." },
];

const TradeIn = () => {
  const [model, setModel] = useState(models[0].id);
  const [condition, setCondition] = useState(conditions[1].id);
  const [quoted, setQuoted] = useState(false);

  useEffect(() => {
    document.title = "Trade-in — Nexzon";
  }, []);

  const estimate = useMemo(() => {
    const m = models.find((x) => x.id === model)!;
    const c = conditions.find((x) => x.id === condition)!;
    return Math.round((m.base * c.mult) / 1000) * 1000;
  }, [model, condition]);

  const upgradePick = getProduct("iphone-17-pro-max");

  return (
    <AccountLayout
      title="Trade-in"
      subtitle="Turn your old phone into credit against a new one."
    >
      {/* Calculator */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Smartphone className="h-4 w-4 text-primary" /> What are you trading in?
          </h2>

          <div className="mt-5 space-y-1.5">
            <label htmlFor="ti-model" className="text-xs font-semibold text-foreground">Model</label>
            <select
              id="ti-model"
              value={model}
              onChange={(e) => { setModel(e.target.value); setQuoted(false); }}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              {models.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>

          <fieldset className="mt-5">
            <legend className="text-xs font-semibold text-foreground">Condition</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {conditions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={condition === c.id}
                  onClick={() => { setCondition(c.id); setQuoted(false); }}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all",
                    condition === c.id ? "border-primary bg-accent shadow-lift" : "border-border hover:border-primary/40",
                  )}
                >
                  <span className="block text-sm font-bold text-foreground">{c.label}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{c.desc}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface p-5">
            <div>
              <p className="text-xs text-muted-foreground">Estimated credit</p>
              <p className="font-display text-3xl font-extrabold text-foreground">{fmtLKR(estimate)}</p>
            </div>
            <Button onClick={() => setQuoted(true)}>
              {quoted ? "Quote locked for 14 days" : "Lock this quote"}
            </Button>
          </div>

          {quoted && (
            <p role="status" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-success">
              <CheckCircle2 className="h-4 w-4" /> Quote saved — apply it at checkout within 14 days.
            </p>
          )}
        </div>

        <aside className="min-w-0 space-y-4">
          {upgradePick && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-base font-bold">Put it towards</h2>
              <Link to={`/product/${upgradePick.id}`} className="mt-4 block">
                <span className="isolate grid h-28 place-items-center rounded-xl bg-white">
                  <img src={upgradePick.image} alt="" className="h-24 w-auto object-contain mix-blend-multiply" />
                </span>
                <p className="mt-3 text-sm font-bold text-foreground">{upgradePick.name}</p>
              </Link>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Price</dt><dd className="font-semibold">{fmtLKR(upgradePick.price)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Your trade-in</dt><dd className="font-semibold text-success">−{fmtLKR(estimate)}</dd></div>
              </dl>
              <div className="mt-3 flex justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold">You pay</span>
                <span className="font-display text-lg font-extrabold">{fmtLKR(Math.max(0, upgradePick.price - estimate))}</span>
              </div>
              <Button asChild size="sm" className="mt-4 w-full">
                <Link to={`/product/${upgradePick.id}`}>Shop this <ArrowRight className="h-3.5 w-3.5" /></Link>
              </Button>
            </div>
          )}
        </aside>
      </div>

      {/* Steps */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold">How trade-in works</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">{s.n}</span>
              <h3 className="mt-3 font-display text-sm font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* History */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold">Your trade-ins</h2>
        <div className="mt-4 space-y-3">
          {history.map((h) => {
            const m = meta[h.status];
            const reduced = h.final < h.quoted;
            return (
              <article key={h.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold", m.cls)}>
                      <m.icon className="h-3.5 w-3.5" /> {m.label}
                    </span>
                    <h3 className="mt-1.5 font-display text-sm font-bold text-foreground">{h.model}</h3>
                    <p className="text-xs text-muted-foreground">{h.id} · {h.when}</p>
                    {h.note && <p className="mt-1 text-xs text-promo">{h.note}</p>}
                    {h.appliedTo !== "—" && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Applied to{" "}
                        <Link to={`/account/orders/${h.appliedTo}`} className="font-semibold text-primary hover:underline">{h.appliedTo}</Link>
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    {reduced && <p className="text-xs text-muted-foreground line-through">{fmtLKR(h.quoted)}</p>}
                    <p className="font-display text-base font-extrabold text-foreground">{fmtLKR(h.final)}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <p className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        Quotes are indicative. The final figure is confirmed after inspection — if it differs you can accept
        the revised amount or have the device returned free of charge.
      </p>
    </AccountLayout>
  );
};

export default TradeIn;
