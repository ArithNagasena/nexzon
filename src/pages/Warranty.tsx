import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Plus, Wrench, CheckCircle2, Clock, Truck, Info, CalendarClock } from "lucide-react";
import AccountLayout from "@/components/NexZon/AccountLayout";
import { Button } from "@/components/ui/button";
import { orders } from "@/data/account";
import { getProduct } from "@/data/catalog";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type ClaimStatus = "submitted" | "collected" | "in-repair" | "returned";

const claimMeta: Record<ClaimStatus, { label: string; cls: string; icon: typeof Clock }> = {
  submitted: { label: "Submitted", cls: "border-promo/25 bg-promo/10 text-promo", icon: Clock },
  collected: { label: "Collected", cls: "border-primary/25 bg-accent text-accent-foreground", icon: Truck },
  "in-repair": { label: "In repair", cls: "border-primary/25 bg-accent text-accent-foreground", icon: Wrench },
  returned: { label: "Returned to you", cls: "border-success/25 bg-success/10 text-success", icon: CheckCircle2 },
};

/** Devices owned, with warranty windows measured from delivery. */
const coverage = [
  { productId: "oneplus-13r", orderId: "NX-260614-5023", start: "17 Jun 2026", end: "17 Jun 2027", monthsLeft: 10, care: false },
  { productId: "ipad-air-5th-gen", orderId: "NX-260503-4471", start: "6 May 2026", end: "6 May 2027", monthsLeft: 9, care: true },
  { productId: "iphone-17-pro-max", orderId: "NX-260812-7734", start: "Pending delivery", end: "—", monthsLeft: 12, care: false },
];

const claims = [
  { id: "WC-260702-0088", productId: "ipad-air-5th-gen", issue: "Dead pixel, top-left of the display", status: "in-repair" as ClaimStatus, opened: "2 Jul 2026", eta: "Back by 22 Aug" },
];

const Warranty = () => {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [device, setDevice] = useState(coverage[0].productId);

  useEffect(() => {
    document.title = "Warranty & repairs — Nexzon";
  }, []);

  return (
    <AccountLayout
      title="Warranty & repairs"
      subtitle="Every device you've bought, and its cover."
      actions={
        <Button onClick={() => { setOpen((v) => !v); setSent(false); }} variant={open ? "outline" : "default"}>
          {open ? "Cancel" : <><Plus className="h-4 w-4" /> Raise a claim</>}
        </Button>
      }
    >
      {open && (
        <div className="rounded-2xl border border-primary/30 bg-card p-6 shadow-card">
          {sent ? (
            <div className="py-4 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
              <h2 className="mt-3 font-display text-lg font-bold">Claim submitted</h2>
              <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
                We'll confirm by email within one working day and arrange a free pickup from your address.
                Urgent? Call {site.phoneDisplay}.
              </p>
              <Button variant="outline" className="mt-5" onClick={() => { setOpen(false); setSent(false); }}>Done</Button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <h2 className="font-display text-base font-bold">What's wrong with it?</h2>
              <div className="mt-4 space-y-1.5">
                <label htmlFor="wc-device" className="text-xs font-semibold text-foreground">Device</label>
                <select
                  id="wc-device"
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                >
                  {coverage.map((c) => {
                    const p = getProduct(c.productId);
                    return <option key={c.productId} value={c.productId}>{p?.name} — {c.orderId}</option>;
                  })}
                </select>
              </div>
              <div className="mt-4 space-y-1.5">
                <label htmlFor="wc-issue" className="text-xs font-semibold text-foreground">Describe the fault</label>
                <textarea
                  id="wc-issue"
                  required
                  rows={4}
                  maxLength={800}
                  placeholder="When did it start? Does it happen every time? Anything you've already tried?"
                  className="w-full rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary focus:bg-background"
                />
              </div>
              <Button type="submit" className="mt-4">Submit claim</Button>
            </form>
          )}
        </div>
      )}

      {/* Open claims */}
      {claims.length > 0 && (
        <section className={cn(open && "mt-6")}>
          <h2 className="font-display text-lg font-bold">Open claims</h2>
          <div className="mt-4 space-y-3">
            {claims.map((c) => {
              const p = getProduct(c.productId);
              const meta = claimMeta[c.status];
              return (
                <article key={c.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {p && (
                      <span className="isolate grid h-20 w-20 shrink-0 place-items-center self-center rounded-xl bg-white">
                        <img src={p.image} alt="" className="h-16 w-auto object-contain mix-blend-multiply" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold", meta.cls)}>
                        <meta.icon className="h-3.5 w-3.5" /> {meta.label}
                      </span>
                      <h3 className="mt-1.5 font-display text-sm font-bold text-foreground">{p?.name}</h3>
                      <p className="text-xs text-muted-foreground">{c.id} · opened {c.opened}</p>
                      <p className="mt-1 text-sm text-muted-foreground">"{c.issue}"</p>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarClock className="h-3.5 w-3.5 text-primary" /> {c.eta}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Coverage */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold">Your devices</h2>
        <div className="mt-4 space-y-3">
          {coverage.map((c) => {
            const p = getProduct(c.productId);
            const pct = Math.round((c.monthsLeft / 12) * 100);
            return (
              <div key={c.productId} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {p && (
                    <Link to={`/product/${p.id}`} className="isolate grid h-20 w-20 shrink-0 place-items-center self-center rounded-xl bg-white">
                      <img src={p.image} alt="" className="h-16 w-auto object-contain mix-blend-multiply" />
                    </Link>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-sm font-bold text-foreground">{p?.name}</h3>
                      {c.care && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                          Nexzon Care
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      From order{" "}
                      <Link to={`/account/orders/${c.orderId}`} className="font-semibold text-primary hover:underline">{c.orderId}</Link>
                      {" "}· {c.start} → {c.end}
                    </p>
                    <div className="mt-2.5 max-w-xs">
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className={cn("h-full rounded-full", pct > 25 ? "bg-success" : "bg-promo")} style={{ width: `${pct}%` }} />
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">{c.monthsLeft} months of cover left</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0" onClick={() => { setDevice(c.productId); setOpen(true); setSent(false); }}>
                    <Wrench className="h-3.5 w-3.5" /> Claim
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        Manufacturer warranty covers manufacturing faults, not accidental or liquid damage.{" "}
        <Link to="/faq" className="font-semibold text-primary hover:underline">Nexzon Care</Link> adds accidental
        damage cover for a small fee per claim.
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        {orders.length} orders on file · claims are handled by our Colombo service desk.
      </p>
    </AccountLayout>
  );
};

export default Warranty;
