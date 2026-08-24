/**
 * Order detail — the most-used screen in the console.
 *
 * Everything a staff member needs to act on one order without leaving: the
 * lines and money, who it belongs to, where it is going, the stage timeline,
 * and the actions that move it forward. The invoice prints from here rather
 * than from a route of its own.
 */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Package,
  Printer,
  Truck,
  Undo2,
  User,
  Gift,
  MapPin,
  Clock,
  X,
  CreditCard,
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
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { fmtLKR, getProduct } from "@/data/catalog";
import { addressBook, fullName, getCustomer, tierMeta } from "@/data/admin/customers";
import {
  getOrder,
  orderSubtotal,
  orderTotal,
  payMeta,
  payStateMeta,
  shipMeta,
  stageFlow,
  stageMeta,
  type OrderStage,
} from "@/data/admin/orders";
import { serials } from "@/data/admin/inventory";
import { returnCases } from "@/data/admin/service";
import { cn } from "@/lib/utils";

/** What each stage means to a staff member, shown on the timeline. */
const stageCopy: Record<OrderStage, string> = {
  pending: "Placed, waiting on payment or confirmation",
  processing: "Confirmed, stock being allocated",
  packed: "Picked and boxed, waiting for the courier",
  "in-transit": "With the courier",
  delivered: "Signed for by the customer",
  cancelled: "Cancelled before delivery",
};

const OrderDetail = () => {
  const { id } = useParams();
  const order = getOrder(id);
  const [action, setAction] = useState("");

  if (!order) {
    return (
      <AdminPage title="Order not found" breadcrumb={[{ label: "Orders", to: "/admin/orders" }]}>
        <EmptyState
          icon={Package}
          title="No order with that number"
          body="It may have been removed, or the number in the link is wrong."
          action={
            <Button asChild variant="outline">
              <Link to="/admin/orders">Back to orders</Link>
            </Button>
          }
        />
      </AdminPage>
    );
  }

  const customer = getCustomer(order.customerId);
  const meta = stageMeta[order.stage];
  const subtotal = orderSubtotal(order);
  const total = orderTotal(order);
  const cancelled = order.stage === "cancelled";
  const stageIndex = stageFlow.indexOf(order.stage);
  const linkedSerials = serials.filter((s) => s.orderId === order.id);
  const linkedReturns = returnCases.filter((r) => r.orderId === order.id);

  /** The next step available from where the order is now. */
  const nextAction = () => {
    if (cancelled || order.stage === "delivered") return null;
    const next = stageFlow[stageIndex + 1];
    const labels: Record<string, string> = {
      processing: "Confirm order",
      packed: "Mark as packed",
      "in-transit": "Hand to courier",
      delivered: "Mark as delivered",
    };
    return next ? { stage: next, label: labels[next] } : null;
  };

  const next = nextAction();

  return (
    <AdminPage
      title={order.id}
      subtitle={`Placed ${order.placed} by ${customer ? fullName(customer) : "an unknown customer"}`}
      breadcrumb={[{ label: "Orders", to: "/admin/orders" }]}
      actions={
        <>
          <Button asChild variant="outline">
            <Link to="/admin/orders">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Invoice
          </Button>
          {next && (
            <Button onClick={() => setAction(next.label)}>
              <Check className="h-4 w-4" /> {next.label}
            </Button>
          )}
        </>
      }
    >
      {action && (
        <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-success/25 bg-success/10 p-4 text-sm font-medium text-success">
          <span className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong>{action}</strong> — the order has advanced, a stock movement was written and the customer has
              been sent the matching message template.
            </span>
          </span>
          <button type="button" onClick={() => setAction("")} aria-label="Dismiss" className="shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
        <div className="space-y-5">
          {/* Timeline */}
          <SectionCard
            title="Progress"
            desc={stageCopy[order.stage]}
            actions={
              <DotPill tone={meta.cls} dot={meta.dot}>
                {meta.label}
              </DotPill>
            }
          >
            {cancelled ? (
              <p className="rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-sm font-medium text-destructive">
                This order was cancelled. {order.note}
              </p>
            ) : (
              <ol className="grid gap-3 sm:grid-cols-5">
                {stageFlow.map((s, i) => {
                  const done = i <= stageIndex;
                  const current = i === stageIndex;
                  return (
                    <li key={s} className="flex items-start gap-2.5 sm:flex-col sm:gap-2">
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold transition-colors",
                          done ? "bg-primary text-primary-foreground" : "border border-border bg-surface text-muted-foreground",
                        )}
                      >
                        {done ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className={cn("block text-xs font-bold", current ? "text-primary" : done ? "text-foreground" : "text-muted-foreground")}>
                          {stageMeta[s].label}
                        </span>
                        {current && <span className="block text-[11px] text-muted-foreground">Current</span>}
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}
          </SectionCard>

          {/* Lines */}
          <SectionCard title="Items" desc={`${order.lines.length} line${order.lines.length === 1 ? "" : "s"} on this order`} bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {order.lines.map((l) => {
                const p = getProduct(l.id);
                if (!p) return null;
                return (
                  <li key={l.id} className="flex items-center gap-4 p-5">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-white">
                      <img src={p.image} alt="" className="h-14 w-auto object-contain mix-blend-multiply" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <Link to={`/admin/products/${p.id}/edit`} className="block truncate text-sm font-semibold text-foreground hover:text-primary">
                        {p.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {p.brand} · {fmtLKR(p.price)} each
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-xs text-muted-foreground">×{l.qty}</span>
                      <span className="block font-display text-sm font-bold tabular-nums text-foreground">
                        {fmtLKR(p.price * l.qty)}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <dl className="space-y-2 border-t border-border bg-surface p-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{fmtLKR(subtotal)}</dd>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-promo">
                  <dt>Discount</dt>
                  <dd className="tabular-nums">− {fmtLKR(order.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="tabular-nums">{order.deliveryFee === 0 ? "Free" : fmtLKR(order.deliveryFee)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-display text-base font-extrabold">
                <dt>Total</dt>
                <dd className="tabular-nums">{fmtLKR(total)}</dd>
              </div>
            </dl>
          </SectionCard>

          {/* Serials and returns */}
          {(linkedSerials.length > 0 || linkedReturns.length > 0) && (
            <SectionCard title="Linked records" desc="Serial numbers issued and any service case raised against this order">
              {linkedSerials.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">IMEI issued</p>
                  <ul className="mt-2 space-y-1.5">
                    {linkedSerials.map((s) => (
                      <li key={s.imei} className="flex flex-wrap items-center gap-2 text-sm">
                        <code className="rounded bg-secondary px-2 py-0.5 font-mono text-xs font-semibold text-foreground">{s.imei}</code>
                        <span className="text-xs text-muted-foreground">
                          Warranty to {s.warrantyEnds}
                          {s.care && " · Nexzon Care"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {linkedReturns.length > 0 && (
                <div className={cn(linkedSerials.length > 0 && "mt-4 border-t border-border pt-4")}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Returns</p>
                  <ul className="mt-2 space-y-1.5">
                    {linkedReturns.map((r) => (
                      <li key={r.id} className="text-sm">
                        <Link to="/admin/service" className="font-semibold text-foreground hover:text-primary">
                          {r.id}
                        </Link>
                        <span className="text-xs text-muted-foreground"> — {r.reason}, opened {r.opened}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </SectionCard>
          )}

          {order.note && (
            <SectionCard title="Staff note" desc="Internal — never shown to the customer">
              <p className="text-sm text-foreground/80">{order.note}</p>
            </SectionCard>
          )}
        </div>

        {/* Rail */}
        <aside className="space-y-4 xl:sticky xl:top-24">
          {/* Customer */}
          <Card className="overflow-hidden">
            <header className="flex items-center gap-3 border-b border-border bg-surface px-5 py-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-deep font-display text-xs font-extrabold text-primary-foreground">
                {customer?.initials ?? "—"}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-bold">
                  {customer ? fullName(customer) : "Unknown customer"}
                </span>
                {customer && <span className="block truncate text-xs text-muted-foreground">{customer.email}</span>}
              </span>
            </header>
            {customer && (
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-2">
                  <Pill tone={tierMeta[customer.tier].cls}>{customer.tier}</Pill>
                  <span className="text-xs tabular-nums text-muted-foreground">{customer.points.toLocaleString()} pts</span>
                </div>
                <Detail label="Phone">{customer.phone}</Detail>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to={`/admin/customers/${customer.id}`}>
                    <User className="h-3.5 w-3.5" /> Full profile
                  </Link>
                </Button>
              </div>
            )}
          </Card>

          {/* Payment */}
          <SectionCard title="Payment" bodyClassName="p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-medium">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                {payMeta[order.payMethod]}
              </span>
              <Pill tone={payStateMeta[order.payState].cls}>{payStateMeta[order.payState].label}</Pill>
            </div>
            {order.term && <Detail label="Plan">{order.term} months at 0%</Detail>}
            {order.payState === "awaiting" && (
              <Button size="sm" className="w-full" onClick={() => setAction("Payment confirmed")}>
                <Check className="h-3.5 w-3.5" /> Confirm payment received
              </Button>
            )}
            {order.payState === "cod-due" && (
              <Note>Collect {fmtLKR(total)} on delivery and reconcile it on the delivery and payments page.</Note>
            )}
          </SectionCard>

          {/* Delivery */}
          <SectionCard title="Delivery" bodyClassName="p-5 space-y-3">
            <Detail label="Method">
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                {shipMeta[order.ship]}
              </span>
            </Detail>
            <Detail label="Address">
              <span className="flex items-start gap-2 font-normal">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  {order.address}
                  <span className="block text-xs text-muted-foreground">{order.district} district</span>
                </span>
              </span>
            </Detail>
            <Detail label="Time slot">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {order.slot}
              </span>
            </Detail>
            {order.courier && <Detail label="Courier">{order.courier}</Detail>}
            {order.tracking && (
              <Detail label="Tracking">
                <code className="font-mono text-xs">{order.tracking}</code>
              </Detail>
            )}
            {order.eta && <Detail label="Expected">{order.eta}</Detail>}
            {order.deliveredOn && <Detail label="Delivered">{order.deliveredOn}</Detail>}
          </SectionCard>

          {order.giftNote && (
            <SectionCard title="Gift message" bodyClassName="p-5">
              <p className="flex items-start gap-2 text-sm italic text-foreground/80">
                <Gift className="mt-0.5 h-4 w-4 shrink-0 text-promo" />"{order.giftNote}"
              </p>
            </SectionCard>
          )}

          {customer && addressBook[customer.id] && (
            <SectionCard title="Other saved addresses" bodyClassName="p-5">
              <ul className="space-y-2 text-xs text-muted-foreground">
                {addressBook[customer.id].map((a) => (
                  <li key={a.label}>
                    <span className="font-semibold text-foreground">{a.label}</span> — {a.street}, {a.city}
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {!cancelled && order.stage !== "delivered" && (
            <Button variant="outline" className="w-full" onClick={() => setAction("Order cancelled")}>
              <Undo2 className="h-4 w-4" /> Cancel this order
            </Button>
          )}
        </aside>
      </div>
    </AdminPage>
  );
};

export default OrderDetail;
