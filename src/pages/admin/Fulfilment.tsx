/**
 * Delivery and payments.
 *
 * Three jobs that all hang off an order but none of which belong on the order
 * screen: loading couriers, reconciling money, and clearing refunds. Cash on
 * delivery gets its own treatment because the money moves through the courier
 * rather than a gateway, so "delivered" and "paid" are separate facts.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Wallet, Undo2, Check, MapPin, Banknote, Landmark, X } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  Card,
  DotPill,
  EmptyState,
  Pill,
  SectionCard,
  StatCard,
  TableShell,
  Tabs,
  Td,
  Th,
  Toolbar,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { fmtLKR } from "@/data/catalog";
import { fullName, getCustomer } from "@/data/admin/customers";
import {
  orderTotal,
  orders,
  payMeta,
  payStateMeta,
  stageMeta,
} from "@/data/admin/orders";
import { deliveryRules, zones } from "@/data/admin/settings";
import { returnCases } from "@/data/admin/service";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "deliveries", label: "Deliveries" },
  { id: "payments", label: "Payments" },
  { id: "refunds", label: "Refunds" },
];

const Fulfilment = () => {
  const [tab, setTab] = useState("deliveries");
  const [q, setQ] = useState("");
  const [done, setDone] = useState("");

  const toShip = orders.filter((o) => o.stage === "packed" || o.stage === "in-transit");
  const codOrders = orders.filter((o) => o.payState === "cod-due");
  const awaitingBank = orders.filter((o) => o.payState === "awaiting");
  const refunds = orders.filter((o) => o.payState === "refunded");

  const codDue = codOrders.reduce((sum, o) => sum + orderTotal(o), 0);
  const refundValue = refunds.reduce((sum, o) => sum + orderTotal(o), 0);

  /** Open orders grouped by district, so a courier run can be planned. */
  const byDistrict = useMemo(() => {
    const map = new Map<string, typeof orders>();
    for (const o of orders) {
      if (o.stage === "delivered" || o.stage === "cancelled" || o.ship === "pickup") continue;
      map.set(o.district, [...(map.get(o.district) ?? []), o]);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, []);

  const deliveryRows = useMemo(
    () =>
      toShip.filter((o) => {
        if (!q.trim()) return true;
        const c = getCustomer(o.customerId);
        return `${o.id} ${c ? fullName(c) : ""} ${o.tracking ?? ""} ${o.district}`.toLowerCase().includes(q.toLowerCase());
      }),
    [q, toShip],
  );

  const paymentRows = useMemo(
    () =>
      orders
        .filter((o) => o.payState === "awaiting" || o.payState === "cod-due")
        .filter((o) => {
          if (!q.trim()) return true;
          const c = getCustomer(o.customerId);
          return `${o.id} ${c ? fullName(c) : ""}`.toLowerCase().includes(q.toLowerCase());
        }),
    [q],
  );

  return (
    <AdminPage
      title="Delivery & payments"
      subtitle="Courier loads, money still to collect, and refunds waiting to clear"
      actions={
        <Button asChild variant="outline">
          <Link to="/admin/orders">All orders</Link>
        </Button>
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

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="To dispatch" value={String(orders.filter((o) => o.stage === "packed").length)} sub="Packed and waiting on a courier" icon={Truck} tone="promo" />
        <StatCard label="In transit" value={String(orders.filter((o) => o.stage === "in-transit").length)} sub={deliveryRules.couriers.join(" · ")} icon={MapPin} tone="primary" />
        <StatCard label="Cash to collect" value={fmtLKR(codDue)} sub={`${codOrders.length} orders on COD`} icon={Banknote} tone="warning" />
        <StatCard label="Refunded" value={fmtLKR(refundValue)} sub={`${refunds.length} orders`} icon={Undo2} tone="destructive" />
      </div>

      <div className="mt-6">
        <Tabs
          tabs={[
            { ...tabs[0], count: toShip.length },
            { ...tabs[1], count: awaitingBank.length + codOrders.length },
            { ...tabs[2], count: refunds.length + returnCases.filter((r) => r.stage === "collected").length },
          ]}
          value={tab}
          onChange={(id) => {
            setTab(id);
            setQ("");
          }}
        />
      </div>

      {/* Deliveries */}
      {tab === "deliveries" && (
        <>
          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <div className="space-y-4">
              <Toolbar q={q} onQ={setQ} placeholder="Search by order, customer, tracking or district…" />

              {deliveryRows.length === 0 ? (
                <EmptyState icon={Truck} title="Nothing to dispatch" body="Every packed order has been handed to a courier." />
              ) : (
                <TableShell>
                  <thead>
                    <tr>
                      <Th>Order</Th>
                      <Th>Customer</Th>
                      <Th>District</Th>
                      <Th>Slot</Th>
                      <Th>Courier</Th>
                      <Th>Tracking</Th>
                      <Th>Stage</Th>
                      <Th className="text-right">Action</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryRows.map((o) => {
                      const c = getCustomer(o.customerId);
                      const meta = stageMeta[o.stage];
                      return (
                        <Tr key={o.id}>
                          <Td>
                            <Link to={`/admin/orders/${o.id}`} className="font-display text-[13px] font-bold text-foreground hover:text-primary">
                              {o.id}
                            </Link>
                          </Td>
                          <Td className="text-sm">{c ? fullName(c) : "—"}</Td>
                          <Td className="text-xs">{o.district}</Td>
                          <Td className="whitespace-nowrap text-xs">{o.slot}</Td>
                          <Td className="text-xs">{o.courier ?? <span className="text-promo">Unassigned</span>}</Td>
                          <Td className="font-mono text-xs">{o.tracking ?? "—"}</Td>
                          <Td>
                            <DotPill tone={meta.cls} dot={meta.dot}>
                              {meta.label}
                            </DotPill>
                          </Td>
                          <Td className="text-right">
                            <Button
                              size="sm"
                              variant={o.stage === "packed" ? "default" : "ghost"}
                              onClick={() =>
                                setDone(
                                  o.stage === "packed"
                                    ? `${o.id} handed to a courier — the customer would get the dispatch SMS.`
                                    : `${o.id} marked delivered — the review request goes out in three days.`,
                                )
                              }
                            >
                              {o.stage === "packed" ? "Dispatch" : "Delivered"}
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </tbody>
                </TableShell>
              )}
            </div>

            {/* District load */}
            <SectionCard title="Load by district" desc="Open orders not yet delivered" bodyClassName="p-5">
              <ul className="space-y-2.5">
                {byDistrict.map(([district, list]) => {
                  const zone = zones.find((z) => z.district === district);
                  const max = byDistrict[0][1].length;
                  return (
                    <li key={district}>
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="font-medium text-foreground">{district}</span>
                        <span className="tabular-nums text-muted-foreground">{list.length}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${(list.length / max) * 100}%` }} />
                      </div>
                      {zone && (
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {zone.days} · {fmtLKR(zone.standardFee)} standard{!zone.cod && " · no COD"}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </SectionCard>
          </div>
        </>
      )}

      {/* Payments */}
      {tab === "payments" && (
        <div className="mt-5 space-y-4">
          <Toolbar q={q} onQ={setQ} placeholder="Search by order or customer…" />

          {paymentRows.length === 0 ? (
            <EmptyState icon={Wallet} title="Nothing outstanding" body="Every order has been paid or settled." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Method</Th>
                  <Th>State</Th>
                  <Th className="text-right">Amount</Th>
                  <Th className="text-right">Action</Th>
                </tr>
              </thead>
              <tbody>
                {paymentRows.map((o) => {
                  const c = getCustomer(o.customerId);
                  return (
                    <Tr key={o.id}>
                      <Td>
                        <Link to={`/admin/orders/${o.id}`} className="font-display text-[13px] font-bold text-foreground hover:text-primary">
                          {o.id}
                        </Link>
                        <span className="block text-xs text-muted-foreground">{o.placed}</span>
                      </Td>
                      <Td className="text-sm">{c ? fullName(c) : "—"}</Td>
                      <Td>
                        <span className="flex items-center gap-2 text-xs font-medium">
                          {o.payMethod === "bank" ? <Landmark className="h-3.5 w-3.5" /> : <Banknote className="h-3.5 w-3.5" />}
                          {payMeta[o.payMethod]}
                        </span>
                        {o.term && <span className="block text-[11px] text-muted-foreground">{o.term} months</span>}
                      </Td>
                      <Td>
                        <Pill tone={payStateMeta[o.payState].cls}>{payStateMeta[o.payState].label}</Pill>
                      </Td>
                      <Td className="text-right font-display font-bold tabular-nums text-foreground">{fmtLKR(orderTotal(o))}</Td>
                      <Td className="text-right">
                        <Button
                          size="sm"
                          onClick={() =>
                            setDone(
                              o.payState === "awaiting"
                                ? `${o.id} marked paid — the order moves to processing.`
                                : `${fmtLKR(orderTotal(o))} recorded as collected from ${o.courier ?? "the courier"}.`,
                            )
                          }
                        >
                          <Check className="h-3.5 w-3.5" />
                          {o.payState === "awaiting" ? "Confirm" : "Collected"}
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </TableShell>
          )}

          <Card className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Cash on delivery reconciliation</p>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Cash on delivery is the one method where "delivered" and "paid" are separate facts: the courier holds the
              money until it is remitted. {fmtLKR(codDue)} is currently out with couriers across {codOrders.length}{" "}
              {codOrders.length === 1 ? "order" : "orders"}.
            </p>
          </Card>
        </div>
      )}

      {/* Refunds */}
      {tab === "refunds" && (
        <div className="mt-5 space-y-4">
          <SectionCard title="Awaiting refund" desc="Returns collected but not yet paid back" bodyClassName="p-0">
            {returnCases.filter((r) => r.stage === "collected").length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">No returns are waiting on a refund.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[38rem] border-collapse text-sm">
                  <thead>
                    <tr>
                      <Th>Case</Th>
                      <Th>Order</Th>
                      <Th>Customer</Th>
                      <Th>Reason</Th>
                      <Th className="text-right">Amount</Th>
                      <Th className="text-right">Action</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnCases
                      .filter((r) => r.stage === "collected")
                      .map((r) => {
                        const c = getCustomer(r.customerId);
                        return (
                          <Tr key={r.id}>
                            <Td className="font-display text-[13px] font-bold text-foreground">{r.id}</Td>
                            <Td>
                              <Link to={`/admin/orders/${r.orderId}`} className="text-xs font-semibold hover:text-primary">
                                {r.orderId}
                              </Link>
                            </Td>
                            <Td className="text-sm">{c ? fullName(c) : "—"}</Td>
                            <Td className="text-xs">{r.reason}</Td>
                            <Td className="text-right font-display font-bold tabular-nums text-foreground">{fmtLKR(r.amount)}</Td>
                            <Td className="text-right">
                              <Button size="sm" onClick={() => setDone(`${fmtLKR(r.amount)} refunded against ${r.orderId}.`)}>
                                Refund
                              </Button>
                            </Td>
                          </Tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Refunded" desc="Completed, kept for the accounting export" bodyClassName="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-sm">
                <thead>
                  <tr>
                    <Th>Order</Th>
                    <Th>Customer</Th>
                    <Th>Original method</Th>
                    <Th className="text-right">Amount</Th>
                    <Th>Reason</Th>
                  </tr>
                </thead>
                <tbody>
                  {refunds.map((o) => {
                    const c = getCustomer(o.customerId);
                    return (
                      <Tr key={o.id}>
                        <Td>
                          <Link to={`/admin/orders/${o.id}`} className="font-display text-[13px] font-bold text-foreground hover:text-primary">
                            {o.id}
                          </Link>
                        </Td>
                        <Td className="text-sm">{c ? fullName(c) : "—"}</Td>
                        <Td className="text-xs">{payMeta[o.payMethod]}</Td>
                        <Td className="text-right font-display font-bold tabular-nums text-foreground">{fmtLKR(orderTotal(o))}</Td>
                        <Td className={cn("max-w-[20rem] truncate text-xs", !o.note && "text-muted-foreground")}>
                          {o.note ?? "No reason recorded"}
                        </Td>
                      </Tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      )}
    </AdminPage>
  );
};

export default Fulfilment;
