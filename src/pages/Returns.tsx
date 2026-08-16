import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Undo2, Plus, Clock, CheckCircle2, XCircle, Truck, Banknote, Info } from "lucide-react";
import AccountLayout from "@/components/cellexa/AccountLayout";
import { Button } from "@/components/ui/button";
import { orders } from "@/data/account";
import { fmtLKR, getProduct } from "@/data/catalog";
import { cn } from "@/lib/utils";

type ReturnStatus = "requested" | "approved" | "collected" | "refunded" | "rejected";

const statusMeta: Record<ReturnStatus, { label: string; cls: string; icon: typeof Clock }> = {
  requested: { label: "Awaiting review", cls: "border-promo/25 bg-promo/10 text-promo", icon: Clock },
  approved: { label: "Approved", cls: "border-primary/25 bg-accent text-accent-foreground", icon: CheckCircle2 },
  collected: { label: "Collected", cls: "border-primary/25 bg-accent text-accent-foreground", icon: Truck },
  refunded: { label: "Refunded", cls: "border-success/25 bg-success/10 text-success", icon: Banknote },
  rejected: { label: "Not eligible", cls: "border-border bg-secondary text-muted-foreground", icon: XCircle },
};

const myReturns = [
  { id: "RT-260716-0219", orderId: "NX-260614-5023", productId: "oneplus-13r", reason: "Changed my mind", status: "refunded" as ReturnStatus, opened: "16 Jun 2026", closed: "21 Jun 2026", amount: 204900 },
  { id: "RT-260512-0147", orderId: "NX-260503-4471", productId: "ipad-air-5th-gen", reason: "Screen had a dead pixel", status: "collected" as ReturnStatus, opened: "12 May 2026", amount: 165000 },
];

const reasons = [
  "Changed my mind",
  "Arrived damaged",
  "Wrong item delivered",
  "Not as described",
  "Faulty on arrival",
];

const steps = [
  { n: 1, title: "Tell us what's wrong", desc: "Pick the order and a reason. Photos help for damage." },
  { n: 2, title: "We review it", desc: "Usually within one working day." },
  { n: 3, title: "Free pickup", desc: "Our courier collects from your address." },
  { n: 4, title: "Refund issued", desc: "3–5 working days to the original payment method." },
];

const Returns = () => {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState(orders.find((o) => o.status === "delivered")!.id);
  const [reason, setReason] = useState(reasons[0]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Returns & refunds — Nexzon";
  }, []);

  const eligible = orders.filter((o) => o.status === "delivered");

  return (
    <AccountLayout
      title="Returns & refunds"
      subtitle="7 days to change your mind on unopened items."
      actions={
        <Button onClick={() => { setOpen((v) => !v); setSent(false); }} variant={open ? "outline" : "default"}>
          {open ? "Cancel" : <><Plus className="h-4 w-4" /> Start a return</>}
        </Button>
      }
    >
      {open && (
        <div className="rounded-2xl border border-primary/30 bg-card p-6 shadow-card">
          {sent ? (
            <div className="py-4 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
              <h2 className="mt-3 font-display text-lg font-bold">Return requested</h2>
              <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
                We've logged a return against {orderId} for "{reason}". You'll hear from us within one
                working day, and we'll arrange a free pickup.
              </p>
              <Button variant="outline" className="mt-5" onClick={() => { setOpen(false); setSent(false); }}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <h2 className="font-display text-base font-bold">What are you returning?</h2>
              <div className="mt-4 grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="rt-order" className="text-xs font-semibold text-foreground">Order</label>
                  <select
                    id="rt-order"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                  >
                    {eligible.map((o) => (
                      <option key={o.id} value={o.id}>{o.id} — {o.placed}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="rt-reason" className="text-xs font-semibold text-foreground">Reason</label>
                  <select
                    id="rt-reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                  >
                    {reasons.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                <label htmlFor="rt-note" className="text-xs font-semibold text-foreground">Anything else?</label>
                <textarea
                  id="rt-note"
                  rows={3}
                  maxLength={500}
                  placeholder="Optional — the more detail, the faster we can approve it."
                  className="w-full rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary focus:bg-background"
                />
              </div>
              <Button type="submit" className="mt-4">Submit return request</Button>
            </form>
          )}
        </div>
      )}

      {/* How it works */}
      <section className={cn(open && "mt-6")}>
        <h2 className="font-display text-lg font-bold">How returns work</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-sm font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* History */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold">Your returns</h2>
        <div className="mt-4 space-y-3">
          {myReturns.map((r) => {
            const p = getProduct(r.productId);
            const meta = statusMeta[r.status];
            return (
              <article key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {p && (
                    <Link to={`/product/${p.id}`} className="isolate grid h-20 w-20 shrink-0 place-items-center self-center rounded-xl bg-white">
                      <img src={p.image} alt="" className="h-16 w-auto object-contain mix-blend-multiply" />
                    </Link>
                  )}
                  <div className="min-w-0 flex-1">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold", meta.cls)}>
                      <meta.icon className="h-3.5 w-3.5" /> {meta.label}
                    </span>
                    <h3 className="mt-1.5 font-display text-sm font-bold text-foreground">{p?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {r.id} · from order{" "}
                      <Link to={`/account/orders/${r.orderId}`} className="font-semibold text-primary hover:underline">{r.orderId}</Link>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      "{r.reason}" · opened {r.opened}{r.closed ? ` · closed ${r.closed}` : ""}
                    </p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <p className="text-xs text-muted-foreground">Refund</p>
                    <p className="font-display text-base font-extrabold text-foreground">{fmtLKR(r.amount)}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <p className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        Faulty items are handled under warranty rather than as returns — start those from{" "}
        <Link to="/account/warranty" className="font-semibold text-primary hover:underline">warranty & repairs</Link>.
        Full terms in the{" "}
        <Link to="/returns-policy" className="font-semibold text-primary hover:underline">returns policy</Link>.
      </p>
    </AccountLayout>
  );
};

export default Returns;
