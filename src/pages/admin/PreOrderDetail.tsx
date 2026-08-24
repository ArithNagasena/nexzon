/**
 * Campaign detail — the reservation queue and what to do with it.
 *
 * The queue is ordered by when the reservation was taken and nothing else.
 * Allocating out of order is the fastest way to lose a launch-day customer,
 * so position is displayed as the first column and never sorted away.
 */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  Package,
  Users,
  Wallet,
  X,
  TriangleAlert,
  Undo2,
} from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  Card,
  Detail,
  DotPill,
  EmptyState,
  Note,
  Pill,
  SectionCard,
  StatCard,
  Td,
  Th,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { fmtLKR, getProduct } from "@/data/catalog";
import { fullName, getCustomer, tierMeta } from "@/data/admin/customers";
import { daysToRelease, depositsHeld, getLaunch, launchMeta, queueFor } from "@/data/admin/preorders";
import { cn } from "@/lib/utils";

const PreOrderDetail = () => {
  const { id } = useParams();
  const launch = getLaunch(id);
  const [done, setDone] = useState("");

  if (!launch) {
    return (
      <AdminPage title="Campaign not found" breadcrumb={[{ label: "Pre-orders", to: "/admin/pre-orders" }]}>
        <EmptyState
          icon={CalendarClock}
          title="No launch with that id"
          body="The campaign may have been removed, or the link is wrong."
          action={
            <Button asChild variant="outline">
              <Link to="/admin/pre-orders">Back to pre-orders</Link>
            </Button>
          }
        />
      </AdminPage>
    );
  }

  const queue = queueFor(launch.id);
  const allocated = queue.filter((r) => r.allocated);
  const waiting = queue.filter((r) => !r.allocated);
  const unpaid = queue.filter((r) => !r.depositPaid);
  const days = daysToRelease(launch.releaseISO);
  const meta = launchMeta[launch.stage];
  const image = getProduct(launch.imageFrom)?.image;
  const remaining = launch.allocation - allocated.length;

  return (
    <AdminPage
      title={launch.name}
      subtitle={`${launch.brand} · releases ${launch.release}${days >= 0 ? ` · ${days} days away` : ""}`}
      breadcrumb={[{ label: "Pre-orders", to: "/admin/pre-orders" }]}
      actions={
        <>
          <Button asChild variant="outline">
            <Link to="/admin/pre-orders">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <Button
            disabled={waiting.length === 0 || remaining <= 0}
            onClick={() =>
              setDone(
                `${Math.min(remaining, waiting.length)} units allocated down the queue in order. Those customers are asked for the balance.`,
              )
            }
          >
            <Check className="h-4 w-4" /> Allocate next {Math.max(0, Math.min(remaining, waiting.length))}
          </Button>
        </>
      }
    >
      {done && (
        <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-success/25 bg-success/10 p-4 text-sm font-medium text-success">
          <span className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{done}</span>
          </span>
          <button type="button" onClick={() => setDone("")} aria-label="Dismiss" className="shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {unpaid.length > 0 && (
        <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-warning/40 bg-warning/15 p-4 text-sm font-medium text-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {unpaid.length} reservation{unpaid.length === 1 ? " has" : "s have"} no deposit paid. They hold a queue
            position but should not be allocated stock ahead of a paid reservation behind them.
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="In the queue" value={String(queue.length)} sub={`${allocated.length} allocated, ${waiting.length} waiting`} icon={Users} tone="primary" />
        <StatCard label="Deposits held" value={fmtLKR(depositsHeld(launch.id))} sub={`${queue.length - unpaid.length} paid`} icon={Wallet} tone="warning" />
        <StatCard label="Allocation left" value={String(Math.max(0, remaining))} sub={`of ${launch.allocation} confirmed units`} icon={Package} tone={remaining <= 0 ? "destructive" : "success"} />
        <StatCard label="Value if all convert" value={fmtLKR(queue.length * launch.price)} sub="At the launch price" icon={CalendarClock} tone="primary" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <SectionCard
          title="Reservation queue"
          desc="Ordered by when the reservation was taken — never re-sorted"
          bodyClassName="p-0"
        >
          {queue.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">No reservations yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[44rem] border-collapse text-sm">
                <thead>
                  <tr>
                    <Th className="w-16 text-right">#</Th>
                    <Th>Customer</Th>
                    <Th>Variant</Th>
                    <Th>Placed</Th>
                    <Th>Deposit</Th>
                    <Th>Allocation</Th>
                    <Th className="text-right">Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((r) => {
                    const c = getCustomer(r.customerId);
                    return (
                      <Tr key={r.id} className={cn(!r.depositPaid && "bg-warning/5")}>
                        <Td className="text-right font-display font-extrabold tabular-nums text-muted-foreground">
                          {r.position}
                        </Td>
                        <Td>
                          {c ? (
                            <>
                              <Link to={`/admin/customers/${c.id}`} className="block text-sm font-semibold text-foreground hover:text-primary">
                                {fullName(c)}
                              </Link>
                              <span className="mt-1 block">
                                <Pill tone={tierMeta[c.tier].cls}>{c.tier}</Pill>
                              </span>
                            </>
                          ) : (
                            <span className="text-sm">Unknown</span>
                          )}
                        </Td>
                        <Td className="text-xs">{r.variant}</Td>
                        <Td className="whitespace-nowrap text-xs">{r.placed}</Td>
                        <Td>
                          {r.depositPaid ? (
                            <Pill tone="border-success/25 bg-success/10 text-success">
                              {fmtLKR(launch.deposit)} paid
                            </Pill>
                          ) : (
                            <Pill tone="border-warning/40 bg-warning/15 text-foreground">Unpaid</Pill>
                          )}
                        </Td>
                        <Td>
                          {r.allocated ? (
                            <DotPill tone="border-primary/25 bg-accent text-accent-foreground" dot="bg-primary">
                              Allocated
                            </DotPill>
                          ) : (
                            <span className="text-xs text-muted-foreground">Waiting</span>
                          )}
                        </Td>
                        <Td className="text-right">
                          {r.allocated ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDone(`${r.id} converted into a live order for ${c ? fullName(c) : "the customer"}.`)}
                            >
                              Convert
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDone(`Deposit on ${r.id} refunded and the reservation released.`)}
                            >
                              <Undo2 className="h-3.5 w-3.5" /> Refund
                            </Button>
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>

        <aside className="space-y-4 xl:sticky xl:top-24">
          <Card className="overflow-hidden">
            {image && (
              <div className="grid aspect-[4/3] place-items-center bg-white p-6">
                <img src={image} alt="" className="max-h-full w-auto object-contain mix-blend-multiply" />
              </div>
            )}
            <div className="space-y-3 border-t border-border p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-sm font-bold text-foreground">{launch.brand}</span>
                <Pill tone={meta.cls}>{meta.label}</Pill>
              </div>
              <Detail label="Full price">{fmtLKR(launch.price)}</Detail>
              <Detail label="Deposit">{fmtLKR(launch.deposit)}</Detail>
              <Detail label="Release date">{launch.release}</Detail>
              <Detail label="Allocation cap">{launch.allocation} units</Detail>
            </div>
          </Card>

          <SectionCard title="Specifications" desc="Shown on the storefront campaign card" bodyClassName="p-5">
            <ul className="space-y-1.5 text-sm text-foreground/80">
              {launch.specs.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {s}
                </li>
              ))}
            </ul>
            <Note>
              Product imagery is a representative render until the manufacturer releases official photography.
            </Note>
          </SectionCard>

          {launch.bundle && (
            <SectionCard title="Launch bundle" bodyClassName="p-5">
              <p className="text-sm text-foreground/80">{launch.bundle}</p>
            </SectionCard>
          )}
        </aside>
      </div>
    </AdminPage>
  );
};

export default PreOrderDetail;
