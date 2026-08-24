/**
 * Promotions, coupon codes and flash deals.
 *
 * These three are one page because they are one idea: a rule that changes what
 * a customer pays. The storefront currently hard-codes the result of that rule
 * onto each product, which is the problem this page exists to end.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Plus, Check, X, Zap, Percent, TrendingUp } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  Detail,
  EmptyState,
  Field,
  Note,
  Panel,
  Pill,
  SectionCard,
  Select,
  StatCard,
  TableShell,
  Tabs,
  Td,
  Th,
  TextInput,
  Toggle,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { allProducts, fmtLKR, getProduct } from "@/data/catalog";
import {
  coupons,
  flashDeals,
  promoKindMeta,
  promoRevenue,
  promoStateMeta,
  promotions,
  type PromoKind,
} from "@/data/admin/promotions";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "rules", label: "Rules" },
  { id: "coupons", label: "Coupon codes" },
  { id: "flash", label: "Flash deals" },
];

const Promotions = () => {
  const [tab, setTab] = useState("rules");
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState("");
  const [stacks, setStacks] = useState(false);

  const active = promotions.filter((p) => p.state === "active");
  const scheduled = promotions.filter((p) => p.state === "scheduled");
  const totalUses = promotions.reduce((n, p) => n + p.uses, 0);

  const describe = (kind: PromoKind, value: number) => {
    if (kind === "percent") return `${value}% off`;
    if (kind === "delivery") return `Free over ${fmtLKR(value)}`;
    return fmtLKR(value);
  };

  return (
    <AdminPage
      title="Promotions"
      subtitle={`${active.length} rules live, ${scheduled.length} scheduled`}
      actions={
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" /> New promotion
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
        <StatCard label="Live rules" value={String(active.length)} sub={`${promotions.length} in total`} icon={Ticket} tone="success" />
        <StatCard label="Revenue on promotion" value={fmtLKR(promoRevenue())} sub="Orders that used a rule" icon={TrendingUp} tone="primary" />
        <StatCard label="Times used" value={totalUses.toLocaleString()} sub="Across every rule" icon={Percent} tone="promo" />
        <StatCard label="Flash deals live" value={String(flashDeals.filter((d) => d.live).length)} sub={`${flashDeals.length} scheduled`} icon={Zap} tone="warning" />
      </div>

      <div className="mt-6">
        <Tabs
          tabs={[
            { ...tabs[0], count: promotions.length },
            { ...tabs[1], count: coupons.length },
            { ...tabs[2], count: flashDeals.length },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {/* Rules */}
      {tab === "rules" && (
        <div className="mt-5 space-y-4">
          <TableShell>
            <thead>
              <tr>
                <Th>Promotion</Th>
                <Th>Type</Th>
                <Th>Scope</Th>
                <Th>Runs</Th>
                <Th className="text-right">Used</Th>
                <Th className="text-right">Revenue</Th>
                <Th>Stacks</Th>
                <Th>State</Th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((p) => (
                <Tr key={p.id}>
                  <Td>
                    <span className="block text-sm font-semibold text-foreground">{p.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{p.id}</span>
                  </Td>
                  <Td>
                    <span className="block text-xs">{promoKindMeta[p.kind]}</span>
                    <span className="block font-display text-xs font-bold text-foreground">
                      {describe(p.kind, p.value)}
                    </span>
                  </Td>
                  <Td className="max-w-[14rem] text-xs">{p.scope}</Td>
                  <Td className="whitespace-nowrap text-xs">
                    {p.starts}
                    <span className="block text-muted-foreground">to {p.ends}</span>
                  </Td>
                  <Td className="text-right tabular-nums">{p.uses}</Td>
                  <Td className="text-right font-display font-bold tabular-nums text-foreground">
                    {p.revenue ? fmtLKR(p.revenue) : "—"}
                  </Td>
                  <Td className="text-xs">{p.stacks ? "Yes" : "No"}</Td>
                  <Td>
                    <Pill tone={promoStateMeta[p.state].cls}>{promoStateMeta[p.state].label}</Pill>
                    {p.budgetCap && (
                      <span className="mt-1 block text-[11px] text-muted-foreground">Cap {fmtLKR(p.budgetCap)}</span>
                    )}
                  </Td>
                </Tr>
              ))}
            </tbody>
          </TableShell>

          <SectionCard title="Stacking" desc="Which rules may combine on one order">
            <p className="max-w-3xl text-sm text-muted-foreground">
              Free delivery and the loyalty-tier discount stack with anything, because both are rewards rather than
              price cuts. Percentage sales do not stack with each other — two 10% rules on one product compound into a
              19% discount nobody approved.
            </p>
          </SectionCard>
        </div>
      )}

      {/* Coupons */}
      {tab === "coupons" && (
        <div className="mt-5">
          <TableShell>
            <thead>
              <tr>
                <Th>Code</Th>
                <Th>Discount</Th>
                <Th>Linked rule</Th>
                <Th className="text-right">Per customer</Th>
                <Th className="text-right">Used</Th>
                <Th>Usage</Th>
                <Th>Expires</Th>
                <Th>State</Th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => {
                const rule = promotions.find((p) => p.id === c.promoId);
                const pct = Math.round((c.used / c.total) * 100);
                return (
                  <Tr key={c.code}>
                    <Td>
                      <code className="rounded bg-secondary px-2 py-1 font-mono text-xs font-bold text-foreground">
                        {c.code}
                      </code>
                    </Td>
                    <Td className="max-w-[14rem] text-xs">{c.discount}</Td>
                    <Td className="text-xs">{rule?.name ?? c.promoId}</Td>
                    <Td className="text-right tabular-nums">{c.perCustomer}</Td>
                    <Td className="text-right tabular-nums">
                      {c.used} <span className="text-muted-foreground">/ {c.total}</span>
                    </Td>
                    <Td className="w-32">
                      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={cn("h-full rounded-full", pct > 80 ? "bg-promo" : "bg-primary")}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="mt-1 block text-[11px] tabular-nums text-muted-foreground">{pct}% claimed</span>
                    </Td>
                    <Td className="whitespace-nowrap text-xs">{c.expires}</Td>
                    <Td>
                      <Pill
                        tone={
                          c.active
                            ? "border-success/25 bg-success/10 text-success"
                            : "border-border bg-secondary text-muted-foreground"
                        }
                      >
                        {c.active ? "Active" : "Expired"}
                      </Pill>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </TableShell>
        </div>
      )}

      {/* Flash deals */}
      {tab === "flash" && (
        <div className="mt-5 space-y-4">
          {flashDeals.length === 0 ? (
            <EmptyState icon={Zap} title="No flash deals scheduled" body="The homepage countdown section will not render without one." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {flashDeals.map((d) => {
                const p = getProduct(d.productId);
                if (!p) return null;
                const saving = p.price - d.dealPrice;
                const pct = Math.round((saving / p.price) * 100);
                const soldPct = Math.round((d.sold / d.unitCap) * 100);

                return (
                  <SectionCard
                    key={d.id}
                    title={p.name}
                    desc={d.window}
                    actions={
                      <Pill
                        tone={
                          d.live
                            ? "border-promo/25 bg-promo/10 text-promo"
                            : "border-border bg-secondary text-muted-foreground"
                        }
                      >
                        {d.live ? "Live now" : "Scheduled"}
                      </Pill>
                    }
                    bodyClassName="p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-white">
                        <img src={p.image} alt="" className="h-16 w-auto object-contain mix-blend-multiply" />
                      </span>
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-display text-xl font-extrabold text-foreground">{fmtLKR(d.dealPrice)}</span>
                          <span className="text-sm text-muted-foreground line-through">{fmtLKR(p.price)}</span>
                          <span className="text-xs font-bold text-promo">{pct}% off</span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              {d.sold} of {d.unitCap} units
                            </span>
                            <span className="tabular-nums text-muted-foreground">{soldPct}%</span>
                          </div>
                          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                            <div className="h-full rounded-full bg-promo" style={{ width: `${soldPct}%` }} />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Detail label="Saving">{fmtLKR(saving)}</Detail>
                          <Detail label="Unit cap">{d.unitCap}</Detail>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                );
              })}
            </div>
          )}

          <SectionCard title="How the cap works" desc="A deal ends on time or on units, whichever comes first">
            <p className="max-w-3xl text-sm text-muted-foreground">
              The unit cap is what keeps a flash deal from selling stock the shop cannot replace at that price. When the
              cap is reached the countdown closes early and the product returns to its normal price.
            </p>
          </SectionCard>
        </div>
      )}

      {/* Create promotion */}
      <Panel
        open={open}
        onClose={() => setOpen(false)}
        title="New promotion"
        subtitle="Applies automatically at checkout when the scope matches"
        footer={
          <>
            <Button
              onClick={() => {
                setDone("Promotion created. It applies at checkout from its start date.");
                setOpen(false);
              }}
            >
              <Check className="h-4 w-4" /> Create promotion
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Name" hint="Shown in reports, not to customers.">
            <TextInput placeholder="Avurudu Flagship Week" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type">
              <Select defaultValue="percent">
                <option value="percent">Percentage off</option>
                <option value="fixed">Fixed amount off</option>
                <option value="bundle">Bundle offer</option>
                <option value="delivery">Free delivery</option>
              </Select>
            </Field>
            <Field label="Value">
              <TextInput type="number" placeholder="8" />
            </Field>
          </div>
          <Field label="Applies to">
            <Select defaultValue="category">
              <option value="all">Every product</option>
              <option value="category">A category</option>
              <option value="brand">A brand</option>
              <option value="product">One product</option>
              <option value="tier">A loyalty tier</option>
            </Select>
          </Field>
          <Field label="Product or category">
            <Select defaultValue={allProducts[0].id}>
              {allProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Starts">
              <TextInput type="date" defaultValue="2026-08-25" />
            </Field>
            <Field label="Ends">
              <TextInput type="date" defaultValue="2026-09-01" />
            </Field>
          </div>
          <Field label="Budget cap (LKR)" hint="The rule stops once discounts reach this. Leave blank for no cap.">
            <TextInput type="number" placeholder="1500000" />
          </Field>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
            <Toggle checked={stacks} onChange={setStacks} label="Allow stacking" />
            <span className="text-sm">
              <span className="block font-semibold text-foreground">Allow stacking</span>
              <span className="block text-xs text-muted-foreground">
                Combine with other rules on the same order.
              </span>
            </span>
          </div>
          <Note>
            This rule drives the product's badge and struck-through price for its whole run, and stops showing both
            the moment it expires.
          </Note>
        </div>
      </Panel>
    </AdminPage>
  );
};

export default Promotions;
