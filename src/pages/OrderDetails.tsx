import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Truck,
  Download,
  Repeat,
  Undo2,
  MapPin,
  CreditCard,
  PackageSearch,
  CheckCircle2,
  Package,
  Home,
  MessageSquare,
} from "lucide-react";
import AccountLayout from "@/components/cellexa/AccountLayout";
import { Button } from "@/components/ui/button";
import { addresses, orders, statusMeta } from "@/data/account";
import { fmtLKR, getProduct } from "@/data/catalog";
import { cn } from "@/lib/utils";

const stagesFor = (status: string) => {
  const all = [
    { icon: CheckCircle2, label: "Confirmed" },
    { icon: Package, label: "Packed" },
    { icon: Truck, label: "In transit" },
    { icon: Home, label: "Delivered" },
  ];
  const reached =
    status === "delivered" ? 4 : status === "in-transit" ? 3 : status === "processing" ? 2 : 1;
  return all.map((s, i) => ({ ...s, done: i < reached }));
};

const OrderDetails = () => {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id);

  useEffect(() => {
    document.title = order ? `Order ${order.id} — Nexzon` : "Order not found — Nexzon";
  }, [order]);

  if (!order) {
    return (
      <AccountLayout title="Order not found">
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <PackageSearch className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <h2 className="mt-3 font-display text-lg font-bold">We couldn't find that order</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Check the number, or pick one from your order history.
          </p>
          <Button asChild className="mt-5"><Link to="/account/orders">View all orders</Link></Button>
        </div>
      </AccountLayout>
    );
  }

  const meta = statusMeta[order.status];
  const items = order.itemIds.map((i) => ({ qty: i.qty, p: getProduct(i.id) })).filter((x) => x.p);
  const subtotal = items.reduce((s, { qty, p }) => s + p!.price * qty, 0);
  const shipping = subtotal >= 25000 ? 0 : 600;
  const home = addresses.find((a) => a.isDefault)!;
  const stages = stagesFor(order.status);

  return (
    <AccountLayout
      title={order.id}
      subtitle={`Placed ${order.placed}`}
      actions={
        <div className="flex flex-wrap gap-2">
          {order.status !== "cancelled" && (
            <Button asChild variant="outline"><Link to="/track-order"><Truck className="h-4 w-4" /> Track</Link></Button>
          )}
          <Button variant="outline"><Download className="h-4 w-4" /> Invoice</Button>
        </div>
      }
    >
      {/* Status */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold", meta.cls)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} /> {meta.label}
          </span>
          {order.status === "delivered" ? (
            <span className="text-sm text-muted-foreground">Delivered {order.deliveredOn}</span>
          ) : order.eta ? (
            <span className="text-sm text-muted-foreground">Arriving {order.eta}</span>
          ) : null}
        </div>

        {order.status !== "cancelled" && (
          <ol className="mt-6 grid grid-cols-4 gap-2">
            {stages.map((s, i) => (
              <li key={s.label} className="relative text-center">
                {i < stages.length - 1 && (
                  <span className={cn("absolute left-1/2 top-5 h-0.5 w-full", s.done ? "bg-success" : "bg-border")} />
                )}
                <span className={cn(
                  "relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full",
                  s.done ? "bg-success text-success-foreground" : "border-2 border-border bg-card text-muted-foreground",
                )}>
                  <s.icon className="h-5 w-5" />
                </span>
                <span className={cn("mt-2 block text-[11px] font-semibold", s.done ? "text-foreground" : "text-muted-foreground")}>
                  {s.label}
                </span>
              </li>
            ))}
          </ol>
        )}

        {order.tracking && (
          <p className="mt-6 rounded-xl bg-surface p-3 text-xs text-muted-foreground">
            {order.courier} · tracking {order.tracking}
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Items */}
        <section className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold">Items</h2>
          <ul className="mt-4 divide-y divide-border">
            {items.map(({ qty, p }) => (
              <li key={p!.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <Link to={`/product/${p!.id}`} className="isolate relative grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-white">
                  <img src={p!.image} alt="" className="h-16 w-auto object-contain mix-blend-multiply" />
                  {qty > 1 && (
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
                      {qty}
                    </span>
                  )}
                </Link>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{p!.brand}</span>
                  <Link to={`/product/${p!.id}`} className="block font-display text-sm font-bold leading-tight text-foreground hover:text-primary">
                    {p!.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">{p!.warranty}</p>
                </div>
                <span className="shrink-0 text-sm font-bold text-foreground">{fmtLKR(p!.price * qty)}</span>
              </li>
            ))}
          </ul>

          {order.status === "delivered" && (
            <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
              <Button asChild size="sm" variant="outline"><Link to="/account/returns"><Undo2 className="h-3.5 w-3.5" /> Return an item</Link></Button>
              <Button asChild size="sm" variant="outline"><Link to="/account/reviews">Write a review</Link></Button>
              <Button asChild size="sm" variant="ghost"><Link to="/cart"><Repeat className="h-3.5 w-3.5" /> Buy again</Link></Button>
            </div>
          )}
        </section>

        {/* Summary */}
        <aside className="min-w-0 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-base font-bold">Payment</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{fmtLKR(subtotal)}</dd></div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className={cn("font-semibold", shipping === 0 && "text-success")}>{shipping === 0 ? "Free" : fmtLKR(shipping)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
              <span className="text-sm font-semibold">Total</span>
              <span className="font-display text-xl font-extrabold">{fmtLKR(order.total)}</span>
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <CreditCard className="h-3.5 w-3.5 text-primary" /> Visa ending 4242
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="flex items-center gap-2 font-display text-base font-bold">
              <MapPin className="h-4 w-4 text-primary" /> Delivery address
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {home.name}<br />{home.street}<br />{home.city} {home.postcode}<br />
              <span className="text-muted-foreground">{home.phone}</span>
            </p>
          </div>

          <Button asChild variant="outline" className="w-full">
            <Link to="/help"><MessageSquare className="h-4 w-4" /> Get help with this order</Link>
          </Button>
        </aside>
      </div>
    </AccountLayout>
  );
};

export default OrderDetails;
