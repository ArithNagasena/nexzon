/**
 * Launch campaigns.
 *
 * The number that matters on this page is deposits held against units not yet
 * in the warehouse — that is customer money sitting on a promise, and it is
 * why allocation caps exist.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarClock, Plus, Wallet, Users, Check, X, Package } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  Card,
  Detail,
  Field,
  Note,
  Panel,
  Pill,
  SectionCard,
  Select,
  StatCard,
  TextArea,
  TextInput,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { allProducts, fmtLKR, getProduct } from "@/data/catalog";
import {
  daysToRelease,
  depositsHeld,
  launchMeta,
  launches,
  queueFor,
  reservedCount,
  totalDepositsHeld,
} from "@/data/admin/preorders";
import { cn } from "@/lib/utils";

const PreOrders = () => {
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState("");

  const active = launches.filter((l) => l.stage !== "closed");
  const totalReserved = launches.reduce((n, l) => n + reservedCount(l.id), 0);
  const unpaid = launches.reduce((n, l) => n + queueFor(l.id).filter((r) => !r.depositPaid).length, 0);

  return (
    <AdminPage
      title="Pre-orders"
      subtitle={`${active.length} open launches holding ${fmtLKR(totalDepositsHeld())} in deposits`}
      actions={
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" /> New launch
        </Button>
      }
    >
      {created && (
        <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-success/25 bg-success/10 p-4 text-sm font-medium text-success">
          <span className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{created}</span>
          </span>
          <button type="button" onClick={() => setCreated("")} aria-label="Dismiss" className="shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Deposits held" value={fmtLKR(totalDepositsHeld())} sub="Customer money against unshipped stock" icon={Wallet} tone="warning" />
        <StatCard label="Units reserved" value={String(totalReserved)} sub="Across every launch" icon={Users} tone="primary" />
        <StatCard label="Open launches" value={String(active.length)} sub={`${launches.length - active.length} closed`} icon={CalendarClock} tone="success" />
        <StatCard label="Deposits unpaid" value={String(unpaid)} sub="Reservations at risk of lapsing" icon={Package} tone="destructive" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {launches.map((l) => {
          const meta = launchMeta[l.stage];
          const reserved = reservedCount(l.id);
          const fill = Math.min(100, Math.round((reserved / l.allocation) * 100));
          const days = daysToRelease(l.releaseISO);
          const image = getProduct(l.imageFrom)?.image;

          return (
            <Card key={l.id} className="flex flex-col overflow-hidden">
              <div className="flex items-start gap-4 border-b border-border bg-surface p-5">
                {image && (
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-white">
                    <img src={image} alt="" className="h-14 w-auto object-contain mix-blend-multiply" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-muted-foreground">{l.brand}</span>
                  <Link to={`/admin/pre-orders/${l.id}`} className="block font-display text-sm font-bold text-foreground hover:text-primary">
                    {l.name}
                  </Link>
                  <span className="mt-1.5 block">
                    <Pill tone={meta.cls}>{meta.label}</Pill>
                  </span>
                </span>
              </div>

              <div className="flex-1 space-y-3 p-5">
                <div className="grid grid-cols-2 gap-3">
                  <Detail label="Price">{fmtLKR(l.price)}</Detail>
                  <Detail label="Deposit">{fmtLKR(l.deposit)}</Detail>
                  <Detail label="Release">{l.release}</Detail>
                  <Detail label={days >= 0 ? "Days to go" : "Released"}>
                    {days >= 0 ? `${days} days` : `${Math.abs(days)} days ago`}
                  </Detail>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      {reserved} of {l.allocation} allocated
                    </span>
                    <span className={cn("tabular-nums", fill >= 100 ? "font-bold text-promo" : "text-muted-foreground")}>
                      {fill}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={cn("h-full rounded-full", fill >= 100 ? "bg-promo" : "bg-primary")}
                      style={{ width: `${fill}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-surface p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Deposits held</p>
                  <p className="mt-0.5 font-display text-base font-extrabold tabular-nums text-foreground">
                    {fmtLKR(depositsHeld(l.id))}
                  </p>
                </div>

                {l.bundle && <p className="text-xs text-muted-foreground">{l.bundle}</p>}
              </div>

              <div className="border-t border-border p-4">
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to={`/admin/pre-orders/${l.id}`}>
                    Manage queue <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-5">
        <SectionCard title="Why the allocation cap matters" desc="The one rule that keeps launch day from oversellng">
          <p className="max-w-3xl text-sm text-muted-foreground">
            A reservation is a promise made against stock that does not exist yet. Units are allocated strictly down the
            queue in the order reservations were taken, and the cap is what stops the shop selling more than the
            distributor has confirmed. Anything past the cap keeps its place and waits for the next shipment rather than
            being refused.
          </p>
        </SectionCard>
      </div>

      {/* Create launch */}
      <Panel
        open={open}
        onClose={() => setOpen(false)}
        title="New launch campaign"
        subtitle="Opens a reservation queue on the storefront pre-orders page"
        footer={
          <>
            <Button
              onClick={() => {
                setCreated("Launch created. The reservation queue is now open on the storefront pre-orders page.");
                setOpen(false);
              }}
            >
              <Check className="h-4 w-4" /> Create launch
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Device name">
            <TextInput placeholder="iPhone 18 Pro Max 256GB" />
          </Field>
          <Field label="Brand">
            <TextInput placeholder="Apple" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full price (LKR)">
              <TextInput type="number" placeholder="469900" />
            </Field>
            <Field label="Deposit (LKR)" hint="Refundable if the launch slips.">
              <TextInput type="number" placeholder="25000" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Release date">
              <TextInput type="date" defaultValue="2026-09-18" />
            </Field>
            <Field label="Allocation cap" hint="Units the distributor has confirmed.">
              <TextInput type="number" placeholder="120" />
            </Field>
          </div>
          <Field label="Status">
            <Select defaultValue="coming">
              <option value="coming">Coming soon — no reservations yet</option>
              <option value="open">Open — taking reservations</option>
              <option value="limited">Limited — near the cap</option>
            </Select>
          </Field>
          <Field label="Preview imagery" hint="Used on the campaign card until official photography is released.">
            <Select defaultValue={allProducts[0].id}>
              {allProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Launch bundle" hint="Shown on the campaign card. Leave blank for none.">
            <TextArea placeholder="MagSafe charger and 12 months of screen protection, free." />
          </Field>
          <Note>
            Every card on the storefront is marked as a render until official photography is released, so nobody
            mistakes it for the final device.
          </Note>
        </div>
      </Panel>
    </AdminPage>
  );
};

export default PreOrders;
