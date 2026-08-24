/**
 * Store settings.
 *
 * Everything on this page is currently a constant somewhere in the source.
 * `data/site.ts` already proved the point for contact details — it exists
 * because the phone number had been retyped in ten files and drifted. Delivery
 * zones, payment methods, loyalty rules and message templates are still in that
 * state, and this is where they should be edited instead.
 */
import { useState } from "react";
import {
  Store,
  Truck,
  CreditCard,
  Crown,
  Mail,
  Check,
  X,
  Shield,
} from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  Card,
  Detail,
  Field,
  Note,
  Pill,
  SectionCard,
  Select,
  TableShell,
  Tabs,
  Td,
  Th,
  TextInput,
  Toggle,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { fmtLKR } from "@/data/catalog";
import { currentSession } from "@/data/admin/auth";
import { rolePermissions, staff, type Role } from "@/data/admin/staff";
import {
  codCeiling,
  deliveryRules,
  installmentTerms,
  loyaltyTiers,
  partnerBanks,
  paymentMethods,
  pointsRules,
  storeProfile,
  templates,
  zones,
} from "@/data/admin/settings";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "store", label: "Store" },
  { id: "delivery", label: "Delivery" },
  { id: "payments", label: "Payments" },
  { id: "loyalty", label: "Loyalty" },
  { id: "templates", label: "Templates" },
  { id: "staff", label: "Staff" },
];

const areas = ["dashboard", "products", "inventory", "orders", "fulfilment", "customers", "pre-orders", "promotions", "reviews", "service", "content", "settings"];

const Settings = () => {
  const [tab, setTab] = useState("store");
  const [done, setDone] = useState("");
  const [methods, setMethods] = useState(paymentMethods);
  const me = currentSession();

  const toggleMethod = (id: string) => {
    setMethods((prev) => prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
    setDone("Payment method changed. Checkout would stop offering it immediately.");
  };

  return (
    <AdminPage
      title="Settings"
      subtitle="Store details, delivery zones, payments, loyalty rules, messages and staff access"
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

      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {/* Store */}
      {tab === "store" && (
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
          <SectionCard title="Store profile" desc="Used across the storefront, invoices and email footers">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Trading name">
                <TextInput defaultValue={storeProfile.name} />
              </Field>
              <Field label="Legal name">
                <TextInput defaultValue={storeProfile.legalName} />
              </Field>
              <Field label="Support email">
                <TextInput type="email" defaultValue={storeProfile.email} />
              </Field>
              <Field label="Phone">
                <TextInput defaultValue={storeProfile.phone} />
              </Field>
              <Field label="Opening hours" className="sm:col-span-2">
                <TextInput defaultValue={storeProfile.hours} />
              </Field>
              <Field label="Address line 1" className="sm:col-span-2">
                <TextInput defaultValue={storeProfile.addressLine1} />
              </Field>
              <Field label="Address line 2" className="sm:col-span-2">
                <TextInput defaultValue={storeProfile.addressLine2} />
              </Field>
              <Field label="Company registration">
                <TextInput defaultValue={storeProfile.registration} />
              </Field>
              <Field label="VAT number" hint="Printed on every invoice.">
                <TextInput defaultValue={storeProfile.vatNumber} />
              </Field>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <Button onClick={() => setDone("Store profile saved.")}>
                <Check className="h-4 w-4" /> Save store profile
              </Button>
            </div>
          </SectionCard>

          <Card className="p-5">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              <Store className="h-3.5 w-3.5" /> Where this is used
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>The header wordmark and footer contact block</li>
              <li>Checkout's collect-in-store option</li>
              <li>The help page's contact channels and hours table</li>
              <li>Invoices and every outbound email footer</li>
            </ul>
            <Note>
              Changing these here updates every place the shop's contact details appear at once, so the phone number
              and address cannot drift apart between pages.
            </Note>
          </Card>
        </div>
      )}

      {/* Delivery */}
      {tab === "delivery" && (
        <div className="mt-5 space-y-5">
          <SectionCard title="Zones and rates" desc="The ten districts checkout offers" bodyClassName="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[38rem] border-collapse text-sm">
                <thead>
                  <tr>
                    <Th>District</Th>
                    <Th className="text-right">Standard</Th>
                    <Th className="text-right">Express</Th>
                    <Th>Transit</Th>
                    <Th>Cash on delivery</Th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((z) => (
                    <Tr key={z.district}>
                      <Td className="text-sm font-medium text-foreground">{z.district}</Td>
                      <Td className="text-right tabular-nums">{fmtLKR(z.standardFee)}</Td>
                      <Td className="text-right tabular-nums">
                        {z.expressFee ? fmtLKR(z.expressFee) : <span className="text-muted-foreground">Not offered</span>}
                      </Td>
                      <Td className="text-xs">{z.days}</Td>
                      <Td>
                        <Pill
                          tone={
                            z.cod
                              ? "border-success/25 bg-success/10 text-success"
                              : "border-border bg-secondary text-muted-foreground"
                          }
                        >
                          {z.cod ? "Available" : "Not available"}
                        </Pill>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <div className="grid gap-5 lg:grid-cols-2">
            <SectionCard title="Delivery rules" desc="Applied at checkout">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Free delivery over (LKR)">
                  <TextInput type="number" defaultValue={deliveryRules.freeOver} />
                </Field>
                <Field label="Express cutoff">
                  <TextInput defaultValue={deliveryRules.expressCutoff} />
                </Field>
                <Field label="Store pickup ready in">
                  <TextInput defaultValue={deliveryRules.pickupReady} />
                </Field>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Delivery slots</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {deliveryRules.slots.map((s) => (
                    <Pill key={s} tone="border-border bg-secondary text-foreground/75">
                      {s}
                    </Pill>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Couriers" desc="Who carries the orders">
              <ul className="space-y-3">
                {deliveryRules.couriers.map((c) => (
                  <li key={c} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3">
                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      {c}
                    </span>
                    <Pill tone="border-success/25 bg-success/10 text-success">Connected</Pill>
                  </li>
                ))}
              </ul>
              <Note>
              Tracking numbers are entered by hand, so check one against the courier's receipt before saving — the
              customer is notified the moment it is stored.
            </Note>
            </SectionCard>
          </div>
        </div>
      )}

      {/* Payments */}
      {tab === "payments" && (
        <div className="mt-5 space-y-5">
          <SectionCard title="Methods" desc="What checkout offers, in the order it offers them">
            <ul className="space-y-3">
              {methods.map((m) => (
                <li key={m.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      {m.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{m.detail}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className={cn("text-xs font-semibold", m.enabled ? "text-success" : "text-muted-foreground")}>
                      {m.enabled ? "On" : "Off"}
                    </span>
                    <Toggle checked={m.enabled} onChange={() => toggleMethod(m.id)} label={`Enable ${m.label}`} />
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <div className="grid gap-5 lg:grid-cols-2">
            <SectionCard title="Installments" desc="0% plans on qualifying products">
              <div className="flex flex-wrap gap-2">
                {installmentTerms.map((t) => (
                  <Pill key={t} tone="border-primary/25 bg-accent text-accent-foreground">
                    {t} months
                  </Pill>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Partner banks</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {partnerBanks.map((b) => (
                    <Pill key={b} tone="border-border bg-secondary text-foreground/75">
                      {b}
                    </Pill>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Cash on delivery" desc="The one method where delivered and paid are separate facts">
              <Field label="Maximum order value (LKR)" hint="Above this, cash on delivery is not offered.">
                <TextInput type="number" defaultValue={codCeiling} />
              </Field>
              <Note>
                A ceiling matters because the courier carries the cash. It is also the lever for accounts with a history
                of refusing delivery.
              </Note>
            </SectionCard>
          </div>
        </div>
      )}

      {/* Loyalty */}
      {tab === "loyalty" && (
        <div className="mt-5 space-y-5">
          <SectionCard title="Tiers" desc="Thresholds and earn rates shown to customers" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {loyaltyTiers.map((t) => (
                <li key={t.name} className="flex flex-wrap items-start gap-4 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-deep">
                    <Crown className="h-4 w-4 text-warning" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-sm font-bold text-foreground">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      From {t.from.toLocaleString()} points · {t.earn}
                    </span>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {t.perks.map((p) => (
                        <li key={p}>
                          <Pill tone="border-border bg-secondary text-foreground/75">{p}</Pill>
                        </li>
                      ))}
                    </ul>
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Points rules" desc="What earns points and what they are worth">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Review reward">
                <TextInput type="number" defaultValue={pointsRules.reviewReward} />
              </Field>
              <Field label="Referral reward">
                <TextInput type="number" defaultValue={pointsRules.referralReward} />
              </Field>
              <Field label="Redemption rate">
                <TextInput defaultValue={pointsRules.redemptionRate} />
              </Field>
            </div>
            <Note>
              Points are a liability, not a marketing figure — every unspent point is money the shop owes. The customer
              directory tracks the outstanding total.
            </Note>
          </SectionCard>
        </div>
      )}

      {/* Templates */}
      {tab === "templates" && (
        <div className="mt-5">
          <TableShell>
            <thead>
              <tr>
                <Th>Message</Th>
                <Th>Channel</Th>
                <Th>Subject or body</Th>
                <Th>Sent when</Th>
                <Th>State</Th>
              </tr>
            </thead>
            <tbody>
              {templates.map((t) => (
                <Tr key={t.id}>
                  <Td className="text-sm font-semibold text-foreground">{t.name}</Td>
                  <Td>
                    <Pill
                      tone={
                        t.channel === "Email"
                          ? "border-primary/25 bg-accent text-accent-foreground"
                          : "border-border bg-secondary text-muted-foreground"
                      }
                    >
                      <Mail className="h-3 w-3" /> {t.channel}
                    </Pill>
                  </Td>
                  <Td className="max-w-[22rem] font-mono text-xs">{t.subject}</Td>
                  <Td className="text-xs">{t.trigger}</Td>
                  <Td>
                    <Pill
                      tone={
                        t.enabled
                          ? "border-success/25 bg-success/10 text-success"
                          : "border-border bg-secondary text-muted-foreground"
                      }
                    >
                      {t.enabled ? "On" : "Off"}
                    </Pill>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </TableShell>
          <p className="mt-3 text-xs text-muted-foreground">
            Placeholders in double braces are filled at send time from the order and customer records.
          </p>
        </div>
      )}

      {/* Staff */}
      {tab === "staff" && (
        <div className="mt-5 space-y-5">
          <SectionCard title="Staff accounts" desc="Separate from customer accounts, always" bodyClassName="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-sm">
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>Last active</Th>
                    <Th>State</Th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s) => (
                    <Tr key={s.id}>
                      <Td>
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-deep font-display text-[11px] font-extrabold text-primary-foreground">
                            {s.initials}
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            {s.name}
                            {s.id === me?.id && <span className="ml-1.5 text-xs font-normal text-muted-foreground">(you)</span>}
                          </span>
                        </div>
                      </Td>
                      <Td className="text-xs">{s.email}</Td>
                      <Td>
                        <Select
                          defaultValue={s.role}
                          aria-label={`Role for ${s.name}`}
                          className="h-9 w-40 text-xs"
                          onChange={() => setDone(`${s.name}'s role changed. Their sidebar would update on next load.`)}
                        >
                          {(Object.keys(rolePermissions) as Role[]).map((r) => (
                            <option key={r}>{r}</option>
                          ))}
                        </Select>
                      </Td>
                      <Td className="text-xs">{s.lastActive}</Td>
                      <Td>
                        <Pill
                          tone={
                            s.active
                              ? "border-success/25 bg-success/10 text-success"
                              : "border-destructive/25 bg-destructive/10 text-destructive"
                          }
                        >
                          {s.active ? "Active" : "Suspended"}
                        </Pill>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard title="What each role can reach" desc="Checked by the sidebar and the route guard" bodyClassName="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] border-collapse text-sm">
                <thead>
                  <tr>
                    <Th>Role</Th>
                    {areas.map((a) => (
                      <Th key={a} className="text-center capitalize">
                        {a.replace("-", " ")}
                      </Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(rolePermissions) as Role[]).map((role) => (
                    <Tr key={role}>
                      <Td className="whitespace-nowrap text-sm font-semibold text-foreground">{role}</Td>
                      {areas.map((a) => {
                        const allowed = rolePermissions[role].includes("*") || rolePermissions[role].includes(a);
                        return (
                          <Td key={a} className="text-center">
                            {allowed ? (
                              <Check className="mx-auto h-4 w-4 text-success" aria-label="Allowed" />
                            ) : (
                              <X className="mx-auto h-4 w-4 text-border" aria-label="Not allowed" />
                            )}
                          </Td>
                        );
                      })}
                    </Tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <Card className="p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <Detail label="Signed in as">{me?.name ?? "Nobody"}</Detail>
              <Detail label="Role">{me?.role ?? "—"}</Detail>
              <Detail label="Accounts">
                {staff.filter((s) => s.active).length} active of {staff.length}
              </Detail>
            </div>
            <Note>
              <span className="flex items-start gap-1.5">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Roles gate both the sidebar and the route guard, so a price change or a refund is always attributable to
                the account that made it.
              </span>
            </Note>
          </Card>
        </div>
      )}
    </AdminPage>
  );
};

export default Settings;
