/**
 * The order pipeline.
 *
 * Search covers order number, customer name, phone and email because a support
 * call rarely starts with the order number.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, ShoppingCart, Truck, Wallet } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  DotPill,
  EmptyState,
  Pill,
  Select,
  StatCard,
  TableShell,
  Td,
  Th,
  Toolbar,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { fmtLKR } from "@/data/catalog";
import { fullName, getCustomer } from "@/data/admin/customers";
import {
  isRevenue,
  orderTotal,
  orderUnits,
  orders,
  payMeta,
  payStateMeta,
  shipMeta,
  stageFlow,
  stageMeta,
  type OrderStage,
} from "@/data/admin/orders";

const districts = ["All districts", ...[...new Set(orders.map((o) => o.district))].sort()];
const payments = ["All payments", "card", "installment", "cod", "bank"];

const filters: { id: OrderStage | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "packed", label: "Packed" },
  { id: "in-transit", label: "In transit" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

const Orders = () => {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<OrderStage | "all">("all");
  const [district, setDistrict] = useState(districts[0]);
  const [payment, setPayment] = useState(payments[0]);

  const rows = useMemo(
    () =>
      orders
        .filter((o) => {
          if (stage !== "all" && o.stage !== stage) return false;
          if (district !== districts[0] && o.district !== district) return false;
          if (payment !== payments[0] && o.payMethod !== payment) return false;
          if (!q.trim()) return true;
          const c = getCustomer(o.customerId);
          const haystack = `${o.id} ${c ? fullName(c) : ""} ${c?.phone ?? ""} ${c?.email ?? ""} ${o.tracking ?? ""}`;
          return haystack.toLowerCase().includes(q.toLowerCase());
        })
        .sort((a, b) => b.placedISO.localeCompare(a.placedISO)),
    [q, stage, district, payment],
  );

  const count = (id: OrderStage | "all") =>
    id === "all" ? orders.length : orders.filter((o) => o.stage === id).length;

  const openValue = orders
    .filter((o) => stageFlow.slice(0, 4).includes(o.stage))
    .reduce((sum, o) => sum + orderTotal(o), 0);

  const codDue = orders.filter((o) => o.payState === "cod-due").reduce((sum, o) => sum + orderTotal(o), 0);
  const awaiting = orders.filter((o) => o.payState === "awaiting").length;

  return (
    <AdminPage
      title="Orders"
      subtitle={`${orders.length} orders · ${orders.filter(isRevenue).length} counting toward revenue`}
      actions={
        <Button asChild variant="outline">
          <Link to="/admin/fulfilment">
            <Truck className="h-4 w-4" /> Delivery board
          </Link>
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Open orders" value={String(orders.filter((o) => stageFlow.slice(0, 4).includes(o.stage)).length)} sub="Not yet delivered" icon={ShoppingCart} tone="promo" />
        <StatCard label="Value in flight" value={fmtLKR(openValue)} sub="Across every open order" icon={ArrowRight} tone="primary" />
        <StatCard label="Cash on delivery due" value={fmtLKR(codDue)} sub="To collect from couriers" icon={Wallet} tone="warning" />
        <StatCard label="Awaiting payment" value={String(awaiting)} sub="Bank transfers to confirm" icon={Wallet} tone="destructive" />
      </div>

      <div className="mt-6">
        <Toolbar
          q={q}
          onQ={setQ}
          placeholder="Search by order number, customer, phone or tracking…"
          filters={filters.map((f) => ({ ...f, count: count(f.id) }))}
          filter={stage}
          onFilter={(id) => setStage(id as OrderStage | "all")}
          extra={
            <div className="flex gap-2">
              <Select value={district} onChange={(e) => setDistrict(e.target.value)} aria-label="Filter by district" className="w-40">
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Select>
              <Select value={payment} onChange={(e) => setPayment(e.target.value)} aria-label="Filter by payment method" className="w-40">
                {payments.map((p) => (
                  <option key={p} value={p}>
                    {p === payments[0] ? p : payMeta[p as keyof typeof payMeta]}
                  </option>
                ))}
              </Select>
            </div>
          }
        />
      </div>

      {rows.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={Search}
            title="No orders match"
            body="Try a different search term, or widen the stage and district filters."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setQ("");
                  setStage("all");
                  setDistrict(districts[0]);
                  setPayment(payments[0]);
                }}
              >
                Clear filters
              </Button>
            }
          />
        </div>
      ) : (
        <div className="mt-5">
          <TableShell>
            <thead>
              <tr>
                <Th>Order</Th>
                <Th>Customer</Th>
                <Th>Delivery</Th>
                <Th>Payment</Th>
                <Th className="text-right">Items</Th>
                <Th className="text-right">Total</Th>
                <Th>Stage</Th>
                <Th className="text-right">Open</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => {
                const c = getCustomer(o.customerId);
                const meta = stageMeta[o.stage];
                return (
                  <Tr key={o.id}>
                    <Td>
                      <Link to={`/admin/orders/${o.id}`} className="font-display text-[13px] font-bold text-foreground hover:text-primary">
                        {o.id}
                      </Link>
                      <span className="block text-xs text-muted-foreground">{o.placed}</span>
                    </Td>
                    <Td>
                      {c ? (
                        <Link to={`/admin/customers/${c.id}`} className="text-sm font-medium text-foreground hover:text-primary">
                          {fullName(c)}
                        </Link>
                      ) : (
                        <span className="text-sm">Unknown</span>
                      )}
                      <span className="block text-xs text-muted-foreground">{o.district}</span>
                    </Td>
                    <Td className="text-xs">
                      {shipMeta[o.ship]}
                      {o.courier && <span className="block text-muted-foreground">{o.courier}</span>}
                    </Td>
                    <Td>
                      <span className="block text-xs font-medium">{payMeta[o.payMethod]}</span>
                      <Pill tone={payStateMeta[o.payState].cls} className="mt-1">
                        {payStateMeta[o.payState].label}
                      </Pill>
                    </Td>
                    <Td className="text-right tabular-nums">{orderUnits(o)}</Td>
                    <Td className="text-right font-display font-bold tabular-nums text-foreground">{fmtLKR(orderTotal(o))}</Td>
                    <Td>
                      <DotPill tone={meta.cls} dot={meta.dot}>
                        {meta.label}
                      </DotPill>
                    </Td>
                    <Td className="text-right">
                      <Button asChild size="sm" variant="ghost">
                        <Link to={`/admin/orders/${o.id}`} aria-label={`Open ${o.id}`}>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </TableShell>

          <p className="mt-3 text-xs text-muted-foreground">
            Showing {rows.length} of {orders.length} orders
          </p>
        </div>
      )}
    </AdminPage>
  );
};

export default Orders;
