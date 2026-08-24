/**
 * Customer profile — everything about one person on one screen.
 *
 * Support answers phone calls, and the caller will not know their order number,
 * their case reference or which device they registered. So orders, addresses,
 * points, reviews, service cases, pre-orders and registered devices all live
 * here rather than behind separate tabs elsewhere.
 */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Crown,
  Mail,
  Phone,
  MapPin,
  Package,
  Star,
  LifeBuoy,
  CalendarClock,
  ScanLine,
  Users,
  TriangleAlert,
  Check,
  X,
  Plus,
} from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  Card,
  Detail,
  DotPill,
  EmptyState,
  Field,
  Note,
  Panel,
  Pill,
  SectionCard,
  StatCard,
  TextArea,
  TextInput,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { fmtLKR, getProduct } from "@/data/catalog";
import { addressBook, fullName, getCustomer, tierMeta } from "@/data/admin/customers";
import { isRevenue, lifetimeValue, orderTotal, ordersFor, stageMeta } from "@/data/admin/orders";
import { reviewMeta, reviews } from "@/data/admin/reviews";
import { returnCases, returnMeta, tradeIns, tradeMeta, warrantyClaims, claimMeta } from "@/data/admin/service";
import { getLaunch, reservations } from "@/data/admin/preorders";
import { serials } from "@/data/admin/inventory";
import { loyaltyTiers } from "@/data/admin/settings";

const CustomerDetail = () => {
  const { id } = useParams();
  const customer = getCustomer(id);
  const [pointsOpen, setPointsOpen] = useState(false);
  const [granted, setGranted] = useState("");

  if (!customer) {
    return (
      <AdminPage title="Customer not found" breadcrumb={[{ label: "Customers", to: "/admin/customers" }]}>
        <EmptyState
          icon={Users}
          title="No customer with that id"
          body="The account may have been closed, or the link is wrong."
          action={
            <Button asChild variant="outline">
              <Link to="/admin/customers">Back to customers</Link>
            </Button>
          }
        />
      </AdminPage>
    );
  }

  const theirOrders = ordersFor(customer.id).sort((a, b) => b.placedISO.localeCompare(a.placedISO));
  const paid = theirOrders.filter(isRevenue);
  const theirReviews = reviews.filter((r) => r.customerId === customer.id);
  const theirReturns = returnCases.filter((r) => r.customerId === customer.id);
  const theirClaims = warrantyClaims.filter((c) => c.customerId === customer.id);
  const theirTrades = tradeIns.filter((t) => t.customerId === customer.id);
  const theirReservations = reservations.filter((r) => r.customerId === customer.id);
  const theirDevices = serials.filter((s) => theirOrders.some((o) => o.id === s.orderId));
  const addresses = addressBook[customer.id] ?? [];

  const tierIndex = loyaltyTiers.findIndex((t) => t.name === customer.tier);
  const nextTier = loyaltyTiers[tierIndex + 1];
  const toNext = nextTier ? nextTier.from - customer.points : 0;

  return (
    <AdminPage
      title={fullName(customer)}
      subtitle={`Customer since ${customer.joined} · ${customer.city}, ${customer.district}`}
      breadcrumb={[{ label: "Customers", to: "/admin/customers" }]}
      actions={
        <>
          <Button asChild variant="outline">
            <Link to="/admin/customers">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <Button onClick={() => setPointsOpen(true)}>
            <Plus className="h-4 w-4" /> Grant points
          </Button>
        </>
      }
    >
      {granted && (
        <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-success/25 bg-success/10 p-4 text-sm font-medium text-success">
          <span className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{granted}</span>
          </span>
          <button type="button" onClick={() => setGranted("")} aria-label="Dismiss" className="shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {customer.flag && (
        <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-destructive/25 bg-destructive/10 p-4 text-sm font-medium text-destructive">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            This account is flagged: {customer.flag}. Check the order history before approving another cash-on-delivery
            order.
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Lifetime value" value={fmtLKR(lifetimeValue(customer.id))} sub={`${paid.length} paid orders`} icon={Package} tone="success" />
        <StatCard label="Loyalty points" value={customer.points.toLocaleString()} sub={nextTier ? `${toNext.toLocaleString()} to ${nextTier.name}` : "Top tier reached"} icon={Crown} tone="warning" />
        <StatCard label="Open service cases" value={String(theirReturns.filter((r) => r.stage !== "refunded" && r.stage !== "rejected").length + theirClaims.filter((c) => c.stage !== "returned").length)} sub="Returns and warranty" icon={LifeBuoy} tone="promo" />
        <StatCard label="Reservations" value={String(theirReservations.length)} sub="Open pre-order launches" icon={CalendarClock} tone="primary" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <div className="space-y-5">
          {/* Orders */}
          <SectionCard title="Orders" desc={`${theirOrders.length} in total, newest first`} bodyClassName="p-0">
            {theirOrders.length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">This customer has not ordered yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {theirOrders.map((o) => {
                  const meta = stageMeta[o.stage];
                  const first = getProduct(o.lines[0]?.id);
                  return (
                    <li key={o.id} className="flex flex-wrap items-center gap-4 p-5">
                      {first && (
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white">
                          <img src={first.image} alt="" className="h-10 w-auto object-contain mix-blend-multiply" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <Link to={`/admin/orders/${o.id}`} className="font-display text-sm font-bold text-foreground hover:text-primary">
                          {o.id}
                        </Link>
                        <span className="block truncate text-xs text-muted-foreground">
                          {o.placed} · {o.lines.length} item{o.lines.length === 1 ? "" : "s"}
                          {first && ` · ${first.name}`}
                        </span>
                      </span>
                      <DotPill tone={meta.cls} dot={meta.dot}>
                        {meta.label}
                      </DotPill>
                      <span className="font-display text-sm font-extrabold tabular-nums text-foreground">
                        {fmtLKR(orderTotal(o))}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </SectionCard>

          {/* Service */}
          {(theirReturns.length > 0 || theirClaims.length > 0 || theirTrades.length > 0) && (
            <SectionCard title="Service history" desc="Returns, warranty claims and trade-ins" bodyClassName="p-5 space-y-4">
              {theirReturns.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Returns</p>
                  <ul className="mt-2 space-y-2">
                    {theirReturns.map((r) => (
                      <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="min-w-0">
                          <Link to="/admin/service" className="font-semibold text-foreground hover:text-primary">
                            {r.id}
                          </Link>
                          <span className="text-xs text-muted-foreground"> — {r.reason}, {r.opened}</span>
                        </span>
                        <Pill tone={returnMeta[r.stage].cls}>{returnMeta[r.stage].label}</Pill>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {theirClaims.length > 0 && (
                <div className="border-t border-border pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Warranty claims</p>
                  <ul className="mt-2 space-y-2">
                    {theirClaims.map((c) => (
                      <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="min-w-0">
                          <Link to="/admin/service" className="font-semibold text-foreground hover:text-primary">
                            {c.id}
                          </Link>
                          <span className="text-xs text-muted-foreground"> — {c.fault}</span>
                        </span>
                        <Pill tone={claimMeta[c.stage].cls}>{claimMeta[c.stage].label}</Pill>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {theirTrades.length > 0 && (
                <div className="border-t border-border pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Trade-ins</p>
                  <ul className="mt-2 space-y-2">
                    {theirTrades.map((t) => (
                      <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="min-w-0">
                          <Link to="/admin/service" className="font-semibold text-foreground hover:text-primary">
                            {t.id}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            {" "}
                            — {t.model}, quoted {fmtLKR(t.revised ?? t.quoted)}
                          </span>
                        </span>
                        <Pill tone={tradeMeta[t.stage].cls}>{tradeMeta[t.stage].label}</Pill>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </SectionCard>
          )}

          {/* Reviews */}
          {theirReviews.length > 0 && (
            <SectionCard title="Reviews written" desc="Published reviews earn 200 points each" bodyClassName="p-5">
              <ul className="space-y-3">
                {theirReviews.map((r) => {
                  const p = getProduct(r.productId);
                  return (
                    <li key={r.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-foreground">{r.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {p?.name ?? "Removed product"} · {r.rating} stars · {r.when}
                          </span>
                        </span>
                        <Pill tone={reviewMeta[r.state].cls}>{reviewMeta[r.state].label}</Pill>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </SectionCard>
          )}
        </div>

        {/* Rail */}
        <aside className="space-y-4 xl:sticky xl:top-24">
          <Card className="overflow-hidden">
            <div className="bg-gradient-deep p-5 text-primary-foreground">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/20 font-display text-base font-extrabold backdrop-blur">
                  {customer.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-base font-bold">{fullName(customer)}</span>
                  <span className="block truncate text-xs text-white/70">{customer.email}</span>
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 backdrop-blur">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold">
                  <Crown className="h-3.5 w-3.5 text-warning" /> {customer.tier} member
                </span>
                <span className="text-xs font-bold tabular-nums">{customer.points.toLocaleString()} pts</span>
              </div>
            </div>

            <div className="space-y-3 p-5">
              <Detail label="Email">
                <span className="flex items-center gap-2 break-all font-normal">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  {customer.email}
                </span>
              </Detail>
              <Detail label="Phone">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {customer.phone}
                </span>
              </Detail>
              <Detail label="NIC">
                <code className="font-mono text-xs">{customer.nic}</code>
              </Detail>
              <Detail label="Tier">
                <Pill tone={tierMeta[customer.tier].cls}>{customer.tier}</Pill>
              </Detail>
            </div>
          </Card>

          <SectionCard title="Saved addresses" bodyClassName="p-5">
            {addresses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No saved addresses. Delivery details were entered per order.
              </p>
            ) : (
              <ul className="space-y-3">
                {addresses.map((a) => (
                  <li key={a.label} className="flex items-start gap-2 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>
                      <span className="block font-semibold text-foreground">{a.label}</span>
                      <span className="block text-xs text-muted-foreground">
                        {a.street}, {a.city} {a.postcode}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          {theirDevices.length > 0 && (
            <SectionCard title="Registered devices" desc="Serials issued against their orders" bodyClassName="p-5">
              <ul className="space-y-2.5">
                {theirDevices.map((s) => {
                  const p = getProduct(s.productId);
                  return (
                    <li key={s.imei} className="flex items-start gap-2 text-sm">
                      <ScanLine className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-foreground">{p?.name ?? "Unknown device"}</span>
                        <code className="block font-mono text-[11px] text-muted-foreground">{s.imei}</code>
                        <span className="block text-[11px] text-muted-foreground">
                          Warranty to {s.warrantyEnds}
                          {s.care && " · Nexzon Care"}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </SectionCard>
          )}

          {theirReservations.length > 0 && (
            <SectionCard title="Pre-order reservations" bodyClassName="p-5">
              <ul className="space-y-2.5">
                {theirReservations.map((r) => {
                  const l = getLaunch(r.launchId);
                  return (
                    <li key={r.id} className="text-sm">
                      <Link to={`/admin/pre-orders/${r.launchId}`} className="block font-semibold text-foreground hover:text-primary">
                        {l?.name ?? r.launchId}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        Queue position {r.position} · {r.variant}
                        {r.depositPaid ? " · deposit paid" : " · deposit unpaid"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </SectionCard>
          )}

          <SectionCard title="Reviews" bodyClassName="p-5">
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-warning" />
              <span className="font-medium text-foreground">
                {theirReviews.filter((r) => r.state === "published").length} published
              </span>
              <span className="text-muted-foreground">of {theirReviews.length} written</span>
            </div>
          </SectionCard>
        </aside>
      </div>

      {/* Grant points */}
      <Panel
        open={pointsOpen}
        onClose={() => setPointsOpen(false)}
        title="Grant points or a voucher"
        subtitle={`${fullName(customer)} · currently ${customer.points.toLocaleString()} points`}
        footer={
          <>
            <Button
              onClick={() => {
                setGranted(`Points granted to ${fullName(customer)}. The adjustment would appear in their points ledger.`);
                setPointsOpen(false);
              }}
            >
              <Check className="h-4 w-4" /> Grant
            </Button>
            <Button variant="outline" onClick={() => setPointsOpen(false)}>
              Cancel
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Points" hint="Use a negative number to deduct.">
            <TextInput type="number" defaultValue={500} />
          </Field>
          <Field label="Reason" hint="Shown to the customer in their points ledger.">
            <TextArea defaultValue="Goodwill — delayed delivery on NX-260812-7734" />
          </Field>
          <Note>
            Every manual adjustment needs a reason and an author. Without both, a points balance cannot be explained to
            the customer who asks about it.
          </Note>
        </div>
      </Panel>
    </AdminPage>
  );
};

export default CustomerDetail;
