/**
 * The dashboard is a work queue before it is a report.
 *
 * It opens on what is stuck — orders awaiting confirmation, stock at zero,
 * service cases sitting too long, reviews unmoderated — and keeps the revenue
 * figures beside them rather than above them.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Banknote,
  ShoppingCart,
  PackageX,
  Star,
  Wallet,
  ArrowRight,
  TrendingUp,
  LifeBuoy,
  CalendarClock,
} from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  DotPill,
  FilterPills,
  Pill,
  SectionCard,
  StatCard,
  Td,
  Th,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { allProducts, fmtLKR, getProduct } from "@/data/catalog";
import { customers, fullName, getCustomer } from "@/data/admin/customers";
import {
  isRevenue,
  orderTotal,
  orders,
  payMeta,
  stageMeta,
  type AdminOrder,
} from "@/data/admin/orders";
import { available, isLow, ops, stockValue } from "@/data/admin/inventory";
import { pending, reviewMeta, reviews } from "@/data/admin/reviews";
import { returnCases, tradeIns, warrantyClaims } from "@/data/admin/service";
import { launches, totalDepositsHeld } from "@/data/admin/preorders";
import { cn } from "@/lib/utils";

/** Today, for a dataset that ends on 19 August 2026. */
const TODAY = new Date("2026-08-20");

const ranges = [
  { id: "7", label: "7 days" },
  { id: "30", label: "30 days" },
  { id: "90", label: "90 days" },
  { id: "all", label: "All time" },
];

const withinRange = (o: AdminOrder, range: string) => {
  if (range === "all") return true;
  const days = Number(range);
  const age = (TODAY.getTime() - new Date(o.placedISO).getTime()) / 86400000;
  return age <= days;
};

const Dashboard = () => {
  const [range, setRange] = useState("30");

  const scoped = useMemo(() => orders.filter((o) => withinRange(o, range)), [range]);
  const earning = scoped.filter(isRevenue);

  const revenue = earning.reduce((sum, o) => sum + orderTotal(o), 0);
  const aov = earning.length ? Math.round(revenue / earning.length) : 0;

  const needsAction = orders.filter((o) => o.stage === "pending" || o.stage === "processing");
  const codOutstanding = orders
    .filter((o) => o.payState === "cod-due")
    .reduce((sum, o) => sum + orderTotal(o), 0);

  const outOfStock = allProducts.filter((p) => ops[p.id].status === "live" && available(p.id) === 0);
  const lowStock = allProducts.filter((p) => isLow(p.id) && available(p.id) > 0);

  const openService =
    returnCases.filter((r) => r.stage === "requested" || r.stage === "approved").length +
    warrantyClaims.filter((c) => c.stage !== "returned").length +
    tradeIns.filter((t) => t.stage !== "credited").length;

  const queue = pending();

  /** Units sold per product across the range, for the top-sellers table. */
  const topSellers = useMemo(() => {
    const tally = new Map<string, { units: number; revenue: number }>();
    for (const o of earning) {
      for (const l of o.lines) {
        const prev = tally.get(l.id) ?? { units: 0, revenue: 0 };
        const price = getProduct(l.id)?.price ?? 0;
        tally.set(l.id, { units: prev.units + l.qty, revenue: prev.revenue + price * l.qty });
      }
    }
    return [...tally.entries()]
      .map(([id, v]) => ({ product: getProduct(id), ...v }))
      .filter((r) => r.product)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6);
  }, [earning]);

  const recent = [...orders]
    .sort((a, b) => b.placedISO.localeCompare(a.placedISO))
    .slice(0, 6);

  return (
    <AdminPage
      title="Dashboard"
      subtitle="Wednesday, 20 August 2026 — what needs attention today"
      actions={
        <Button asChild variant="outline">
          <Link to="/admin/orders">
            Open the order pipeline <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <FilterPills options={ranges} value={range} onChange={setRange} className="mb-5" />

      {/* Headline figures */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Revenue"
          value={fmtLKR(revenue)}
          sub={`${earning.length} orders · ${fmtLKR(aov)} average`}
          icon={Banknote}
          tone="success"
        />
        <StatCard
          label="Needs action"
          value={String(needsAction.length)}
          sub="Pending confirmation or stock"
          icon={ShoppingCart}
          tone="promo"
        />
        <StatCard
          label="Cash on delivery due"
          value={fmtLKR(codOutstanding)}
          sub="To collect from couriers"
          icon={Wallet}
          tone="warning"
        />
        <StatCard
          label="Deposits held"
          value={fmtLKR(totalDepositsHeld())}
          sub={`${launches.filter((l) => l.stage !== "closed").length} open launches`}
          icon={CalendarClock}
          tone="primary"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Out of stock" value={String(outOfStock.length)} sub={`${lowStock.length} more running low`} icon={PackageX} tone="destructive" />
        <StatCard label="Open service cases" value={String(openService)} sub="Returns, warranty and trade-ins" icon={LifeBuoy} tone="warning" />
        <StatCard label="Reviews to moderate" value={String(queue.length)} sub={`${reviews.filter((r) => r.state === "published").length} published`} icon={Star} tone="promo" />
        <StatCard label="Stock at cost" value={fmtLKR(stockValue())} sub={`${customers.length} customers on file`} icon={TrendingUp} tone="primary" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Recent orders */}
        <SectionCard
          title="Latest orders"
          desc="Newest first across every customer"
          bodyClassName="p-0"
          actions={
            <Button asChild size="sm" variant="ghost">
              <Link to="/admin/orders">
                All orders <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-sm">
              <thead>
                <tr>
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Payment</Th>
                  <Th className="text-right">Total</Th>
                  <Th>Stage</Th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => {
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
                      <Td className="text-sm">{c ? fullName(c) : "—"}</Td>
                      <Td className="text-xs">{payMeta[o.payMethod]}</Td>
                      <Td className="text-right font-display font-bold tabular-nums text-foreground">{fmtLKR(orderTotal(o))}</Td>
                      <Td>
                        <DotPill tone={meta.cls} dot={meta.dot}>
                          {meta.label}
                        </DotPill>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Attention column */}
        <div className="space-y-5">
          <SectionCard
            title="Stock at zero"
            desc="Live products with nothing available"
            actions={
              <Button asChild size="sm" variant="ghost">
                <Link to="/admin/inventory">
                  Inventory <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
          >
            {outOfStock.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing is out of stock.</p>
            ) : (
              <ul className="space-y-3">
                {outOfStock.map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white">
                      <img src={p.image} alt="" className="h-9 w-auto object-contain mix-blend-multiply" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <Link to={`/admin/products/${p.id}/edit`} className="block truncate text-sm font-semibold hover:text-primary">
                        {p.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">{ops[p.id].sku}</span>
                    </span>
                    <Pill tone="border-destructive/25 bg-destructive/10 text-destructive">0 left</Pill>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard
            title="Reviews waiting"
            desc="Published reviews earn the customer points"
            actions={
              <Button asChild size="sm" variant="ghost">
                <Link to="/admin/reviews">
                  Moderate <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
          >
            {queue.length === 0 ? (
              <p className="text-sm text-muted-foreground">The queue is clear.</p>
            ) : (
              <ul className="space-y-3">
                {queue.slice(0, 4).map((r) => {
                  const p = getProduct(r.productId);
                  const c = getCustomer(r.customerId);
                  return (
                    <li key={r.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0 truncate text-sm font-semibold text-foreground">{r.title}</p>
                        <Pill tone={reviewMeta[r.state].cls}>{reviewMeta[r.state].label}</Pill>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {c ? fullName(c) : "Unknown"} on {p?.name ?? "a removed product"}
                        {!r.verified && " · unverified purchase"}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </SectionCard>
        </div>
      </div>

      {/* Top sellers */}
      <div className="mt-5">
        <SectionCard
          title="Best sellers"
          desc={`By revenue over the ${range === "all" ? "whole book" : `last ${range} days`}`}
          bodyClassName="p-0"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-sm">
              <thead>
                <tr>
                  <Th>Product</Th>
                  <Th>Brand</Th>
                  <Th className="text-right">Units</Th>
                  <Th className="text-right">Revenue</Th>
                  <Th className="text-right">Available</Th>
                </tr>
              </thead>
              <tbody>
              {topSellers.map((row) => (
                <Tr key={row.product!.id}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white">
                        <img src={row.product!.image} alt="" className="h-8 w-auto object-contain mix-blend-multiply" />
                      </span>
                      <Link to={`/admin/products/${row.product!.id}/edit`} className="truncate text-sm font-semibold text-foreground hover:text-primary">
                        {row.product!.name}
                      </Link>
                    </div>
                  </Td>
                  <Td className="text-xs">{row.product!.brand}</Td>
                  <Td className="text-right tabular-nums">{row.units}</Td>
                  <Td className="text-right font-display font-bold tabular-nums text-foreground">{fmtLKR(row.revenue)}</Td>
                  <Td className={cn("text-right tabular-nums", isLow(row.product!.id) && "font-bold text-destructive")}>
                    {available(row.product!.id)}
                  </Td>
                </Tr>
              ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </AdminPage>
  );
};

export default Dashboard;
