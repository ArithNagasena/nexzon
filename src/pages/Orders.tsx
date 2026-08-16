import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Package, ArrowRight, Download, Repeat, Truck } from "lucide-react";
import AccountLayout from "@/components/cellexa/AccountLayout";
import { Button } from "@/components/ui/button";
import { customer, orders, statusMeta, type OrderStatus } from "@/data/account";
import { fmtLKR, getProduct } from "@/data/catalog";
import { cn } from "@/lib/utils";

const filters: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-transit", label: "In transit" },
  { id: "processing", label: "Processing" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

const Orders = () => {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = "My orders — Nexzon";
  }, []);

  const shown = useMemo(
    () =>
      orders.filter((o) => {
        if (filter !== "all" && o.status !== filter) return false;
        if (!q.trim()) return true;
        const names = o.itemIds.map((i) => getProduct(i.id)?.name ?? "").join(" ");
        return `${o.id} ${names}`.toLowerCase().includes(q.toLowerCase());
      }),
    [filter, q],
  );

  const counts = (id: OrderStatus | "all") =>
    id === "all" ? orders.length : orders.filter((o) => o.status === id).length;

  return (
    <AccountLayout
      title="My orders"
      subtitle={`${orders.length} orders placed since ${customer.memberSince}`}
      actions={
        <Button asChild variant="outline">
          <Link to="/track-order"><Truck className="h-4 w-4" /> Track a delivery</Link>
        </Button>
      }
    >
      {/* Toolbar */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by order number or product…"
            className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground/75 hover:border-primary/40 hover:text-primary",
                )}
              >
                {f.label}
                <span className={cn("ml-1.5", active ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {counts(f.id)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders */}
      {shown.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Package className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <h2 className="mt-3 font-display text-lg font-bold">No orders match</h2>
          <p className="mt-1 text-sm text-muted-foreground">Try a different filter or search term.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setFilter("all"); setQ(""); }}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {shown.map((o) => {
            const meta = statusMeta[o.status];
            const items = o.itemIds.map((i) => ({ qty: i.qty, p: getProduct(i.id) })).filter((x) => x.p);
            return (
              <article key={o.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-5 py-3.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold", meta.cls)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} /> {meta.label}
                    </span>
                    <span className="font-display text-sm font-bold text-foreground">{o.id}</span>
                    <span className="text-xs text-muted-foreground">Placed {o.placed}</span>
                  </div>
                  <span className="font-display text-base font-extrabold text-foreground">{fmtLKR(o.total)}</span>
                </header>

                <div className="p-5">
                  <ul className="space-y-3">
                    {items.map(({ qty, p }) => (
                      <li key={p!.id} className="flex items-center gap-4">
                        <Link to={`/product/${p!.id}`} className="isolate relative grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-white">
                          <img src={p!.image} alt="" className="h-14 w-auto object-contain mix-blend-multiply" />
                          {qty > 1 && (
                            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
                              {qty}
                            </span>
                          )}
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link to={`/product/${p!.id}`} className="block truncate text-sm font-semibold text-foreground hover:text-primary">
                            {p!.name}
                          </Link>
                          <span className="text-xs text-muted-foreground">{p!.brand}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {(o.tracking || o.eta) && (
                    <p className="mt-4 rounded-xl bg-surface p-3 text-xs text-muted-foreground">
                      {o.status === "delivered"
                        ? `Delivered ${o.deliveredOn} · ${o.courier} · ${o.tracking}`
                        : o.tracking
                          ? `${o.courier} · ${o.tracking} · arriving ${o.eta}`
                          : o.eta}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                    <Button asChild size="sm">
                      <Link to={`/account/orders/${o.id}`}>View details <ArrowRight className="h-3.5 w-3.5" /></Link>
                    </Button>
                    {o.status !== "cancelled" && (
                      <Button asChild size="sm" variant="outline">
                        <Link to="/track-order"><Truck className="h-3.5 w-3.5" /> Track</Link>
                      </Button>
                    )}
                    <Button asChild size="sm" variant="ghost">
                      <Link to="/cart"><Repeat className="h-3.5 w-3.5" /> Buy again</Link>
                    </Button>
                    {o.status === "delivered" && (
                      <Button asChild size="sm" variant="ghost">
                        <Link to="/account/orders"><Download className="h-3.5 w-3.5" /> Invoice</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </AccountLayout>
  );
};

export default Orders;
