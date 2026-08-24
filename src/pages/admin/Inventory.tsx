/**
 * Inventory — stock, movements and the IMEI registry in one page.
 *
 * On hand and available are separate columns on purpose: pre-orders and open
 * carts reserve units, so a product can show healthy stock and still have
 * nothing to sell.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Warehouse, ArrowDownUp, ScanLine, Search, TriangleAlert, Boxes } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  EmptyState,
  FilterPills,
  Pill,
  StatCard,
  TableShell,
  Tabs,
  Td,
  Th,
  Toolbar,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { allProducts, fmtLKR, getProduct } from "@/data/catalog";
import {
  available,
  isLow,
  movementMeta,
  movements,
  ops,
  serialMeta,
  serials,
  statusMeta,
  stockValue,
} from "@/data/admin/inventory";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "stock", label: "Stock" },
  { id: "movements", label: "Movements" },
  { id: "serials", label: "IMEI & serials" },
];

const stockFilters = [
  { id: "all", label: "All" },
  { id: "out", label: "Out of stock" },
  { id: "low", label: "Running low" },
  { id: "reserved", label: "Has reservations" },
];

const Inventory = () => {
  const [tab, setTab] = useState("stock");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const live = allProducts.filter((p) => ops[p.id].status !== "archived");
  const outOfStock = live.filter((p) => available(p.id) === 0);
  const lowStock = live.filter((p) => isLow(p.id) && available(p.id) > 0);
  const totalUnits = allProducts.reduce((n, p) => n + ops[p.id].onHand, 0);

  const stockRows = useMemo(
    () =>
      allProducts.filter((p) => {
        if (filter === "out" && available(p.id) !== 0) return false;
        if (filter === "low" && !(isLow(p.id) && available(p.id) > 0)) return false;
        if (filter === "reserved" && ops[p.id].reserved === 0) return false;
        if (!q.trim()) return true;
        return `${p.name} ${p.brand} ${ops[p.id].sku}`.toLowerCase().includes(q.toLowerCase());
      }),
    [q, filter],
  );

  const movementRows = useMemo(
    () =>
      movements.filter((m) => {
        if (!q.trim()) return true;
        const p = getProduct(m.productId);
        return `${p?.name ?? ""} ${m.ref ?? ""} ${m.by}`.toLowerCase().includes(q.toLowerCase());
      }),
    [q],
  );

  const serialRows = useMemo(
    () =>
      serials.filter((s) => {
        if (!q.trim()) return true;
        const p = getProduct(s.productId);
        return `${s.imei} ${p?.name ?? ""} ${s.orderId ?? ""}`.toLowerCase().includes(q.toLowerCase());
      }),
    [q],
  );

  const stockCount = (id: string) => {
    if (id === "all") return allProducts.length;
    if (id === "out") return allProducts.filter((p) => available(p.id) === 0).length;
    if (id === "low") return allProducts.filter((p) => isLow(p.id) && available(p.id) > 0).length;
    return allProducts.filter((p) => ops[p.id].reserved > 0).length;
  };

  return (
    <AdminPage
      title="Inventory"
      subtitle="Stock on hand, every movement, and the serial registry behind the verify page"
      actions={
        <Button asChild variant="outline">
          <Link to="/admin/products">
            <Boxes className="h-4 w-4" /> Products
          </Link>
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Units on hand" value={totalUnits.toLocaleString()} sub={`${allProducts.length} products`} icon={Warehouse} tone="primary" />
        <StatCard label="Stock at cost" value={fmtLKR(stockValue())} sub="Capital tied up in shelves" icon={Boxes} tone="success" />
        <StatCard label="Out of stock" value={String(outOfStock.length)} sub="Live products with nothing to sell" icon={TriangleAlert} tone="destructive" />
        <StatCard label="Running low" value={String(lowStock.length)} sub="At or under the alert threshold" icon={ArrowDownUp} tone="promo" />
      </div>

      <div className="mt-6">
        <Tabs
          tabs={[
            { ...tabs[0], count: allProducts.length },
            { ...tabs[1], count: movements.length },
            { ...tabs[2], count: serials.length },
          ]}
          value={tab}
          onChange={(id) => {
            setTab(id);
            setQ("");
          }}
        />
      </div>

      <div className="mt-5">
        <Toolbar
          q={q}
          onQ={setQ}
          placeholder={
            tab === "stock"
              ? "Search by product, brand or SKU…"
              : tab === "movements"
                ? "Search by product, reference or staff…"
                : "Search by IMEI, product or order…"
          }
          filters={tab === "stock" ? stockFilters.map((f) => ({ ...f, count: stockCount(f.id) })) : undefined}
          filter={tab === "stock" ? filter : undefined}
          onFilter={tab === "stock" ? setFilter : undefined}
        />
      </div>

      {/* Stock */}
      {tab === "stock" &&
        (stockRows.length === 0 ? (
          <div className="mt-5">
            <EmptyState icon={Search} title="Nothing matches" body="Try a different search term or filter." />
          </div>
        ) : (
          <div className="mt-5">
            <TableShell>
              <thead>
                <tr>
                  <Th>Product</Th>
                  <Th>SKU</Th>
                  <Th>Supplier</Th>
                  <Th className="text-right">On hand</Th>
                  <Th className="text-right">Reserved</Th>
                  <Th className="text-right">Available</Th>
                  <Th className="text-right">Alert at</Th>
                  <Th className="text-right">Value at cost</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {stockRows.map((p) => {
                  const o = ops[p.id];
                  const avail = available(p.id);
                  return (
                    <Tr key={p.id}>
                      <Td>
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white">
                            <img src={p.image} alt="" className="h-8 w-auto object-contain mix-blend-multiply" />
                          </span>
                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            className="max-w-[16rem] truncate text-sm font-semibold text-foreground hover:text-primary"
                          >
                            {p.name}
                          </Link>
                        </div>
                      </Td>
                      <Td className="font-mono text-xs">{o.sku}</Td>
                      <Td className="max-w-[12rem] truncate text-xs">{o.supplier}</Td>
                      <Td className="text-right tabular-nums">{o.onHand}</Td>
                      <Td className="text-right tabular-nums text-muted-foreground">{o.reserved || "—"}</Td>
                      <Td className="text-right">
                        <span
                          className={cn(
                            "font-display font-bold tabular-nums",
                            avail === 0 ? "text-destructive" : isLow(p.id) ? "text-promo" : "text-foreground",
                          )}
                        >
                          {avail}
                        </span>
                      </Td>
                      <Td className="text-right tabular-nums text-muted-foreground">{o.lowAt}</Td>
                      <Td className="text-right tabular-nums">{fmtLKR(o.onHand * o.cost)}</Td>
                      <Td>
                        <Pill tone={statusMeta[o.status].cls}>{statusMeta[o.status].label}</Pill>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </TableShell>
          </div>
        ))}

      {/* Movements */}
      {tab === "movements" && (
        <div className="mt-5">
          <TableShell>
            <thead>
              <tr>
                <Th>When</Th>
                <Th>Product</Th>
                <Th>Reason</Th>
                <Th className="text-right">Change</Th>
                <Th>Reference</Th>
                <Th>Recorded by</Th>
              </tr>
            </thead>
            <tbody>
              {movementRows.map((m) => {
                const p = getProduct(m.productId);
                return (
                  <Tr key={m.id}>
                    <Td className="whitespace-nowrap text-xs">{m.when}</Td>
                    <Td className="max-w-[16rem] truncate text-sm font-medium text-foreground">{p?.name ?? "Removed product"}</Td>
                    <Td>
                      <Pill tone={movementMeta[m.kind].cls}>{movementMeta[m.kind].label}</Pill>
                    </Td>
                    <Td className={cn("text-right font-display font-bold tabular-nums", m.qty > 0 ? "text-success" : "text-destructive")}>
                      {m.qty > 0 ? `+${m.qty}` : m.qty}
                    </Td>
                    <Td className="max-w-[14rem] truncate text-xs">{m.ref ?? "—"}</Td>
                    <Td className="text-xs">{m.by}</Td>
                  </Tr>
                );
              })}
            </tbody>
          </TableShell>
          <p className="mt-3 text-xs text-muted-foreground">
            Every movement carries a reason code and a person, which is what makes a stock discrepancy traceable.
          </p>
        </div>
      )}

      {/* Serials */}
      {tab === "serials" && (
        <div className="mt-5">
          <TableShell>
            <thead>
              <tr>
                <Th>IMEI</Th>
                <Th>Device</Th>
                <Th>State</Th>
                <Th>Order</Th>
                <Th>Sold</Th>
                <Th>Warranty ends</Th>
                <Th>Care</Th>
              </tr>
            </thead>
            <tbody>
              {serialRows.map((s) => {
                const p = getProduct(s.productId);
                return (
                  <Tr key={s.imei}>
                    <Td className="font-mono text-xs font-semibold text-foreground">{s.imei}</Td>
                    <Td className="max-w-[16rem] truncate text-sm">{p?.name ?? "Unrecognised handset"}</Td>
                    <Td>
                      <Pill tone={serialMeta[s.kind].cls}>{serialMeta[s.kind].label}</Pill>
                    </Td>
                    <Td className="text-xs">
                      {s.orderId ? (
                        <Link to={`/admin/orders/${s.orderId}`} className="font-semibold text-foreground hover:text-primary">
                          {s.orderId}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </Td>
                    <Td className="whitespace-nowrap text-xs">{s.soldOn ?? "—"}</Td>
                    <Td className="whitespace-nowrap text-xs">{s.warrantyEnds ?? "—"}</Td>
                    <Td className="text-xs">{s.care ? "Nexzon Care" : "—"}</Td>
                  </Tr>
                );
              })}
            </tbody>
          </TableShell>
          <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
            <ScanLine className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            These are the records the customer-facing verify page checks against. Every IMEI here passes the Luhn check
            that page runs before it looks anything up.
          </p>
        </div>
      )}
    </AdminPage>
  );
};

export default Inventory;
