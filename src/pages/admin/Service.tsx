/**
 * Service desk — returns, warranty claims and trade-ins.
 *
 * Three queues rather than three pages, because they share a shape: a case
 * arrives, moves through a fixed set of stages, and ends in money moving. The
 * stages themselves come from data/admin/service, which is the same set the
 * customer-facing pages render, so the two views cannot drift apart.
 */
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Undo2,
  ShieldCheck,
  Repeat,
  Check,
  X,
  Clock,
  Search,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  Detail,
  EmptyState,
  Field,
  Note,
  Panel,
  Pill,
  SectionCard,
  StatCard,
  TableShell,
  Tabs,
  Td,
  Th,
  TextArea,
  Toolbar,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { fmtLKR, getProduct } from "@/data/catalog";
import { fullName, getCustomer } from "@/data/admin/customers";
import {
  claimMeta,
  returnCases,
  returnMeta,
  tradeIns,
  tradeMeta,
  warrantyClaims,
  type ReturnCase,
  type TradeIn,
  type WarrantyClaim,
} from "@/data/admin/service";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "returns", label: "Returns" },
  { id: "warranty", label: "Warranty claims" },
  { id: "trade", label: "Trade-ins" },
];

type OpenCase =
  | { kind: "return"; data: ReturnCase }
  | { kind: "claim"; data: WarrantyClaim }
  | { kind: "trade"; data: TradeIn }
  | null;

const Service = () => {
  const [tab, setTab] = useState("returns");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<OpenCase>(null);
  const [done, setDone] = useState("");

  const openReturns = returnCases.filter((r) => r.stage !== "refunded" && r.stage !== "rejected");
  const openClaims = warrantyClaims.filter((c) => c.stage !== "returned");
  const openTrades = tradeIns.filter((t) => t.stage !== "credited");

  const refundExposure = openReturns.reduce((sum, r) => sum + r.amount, 0);
  const slowest = warrantyClaims.reduce((max, c) => Math.max(max, c.days), 0);

  /** Stable across renders, so the memos below depend on the query alone. */
  const match = useCallback(
    (haystack: string) => !q.trim() || haystack.toLowerCase().includes(q.toLowerCase()),
    [q],
  );

  const returnRows = useMemo(
    () =>
      returnCases.filter((r) => {
        const c = getCustomer(r.customerId);
        const p = getProduct(r.productId);
        return match(`${r.id} ${r.orderId} ${c ? fullName(c) : ""} ${p?.name ?? ""} ${r.reason}`);
      }),
    [match],
  );

  const claimRows = useMemo(
    () =>
      warrantyClaims.filter((c) => {
        const cust = getCustomer(c.customerId);
        const p = getProduct(c.productId);
        return match(`${c.id} ${c.imei} ${cust ? fullName(cust) : ""} ${p?.name ?? ""} ${c.fault}`);
      }),
    [match],
  );

  const tradeRows = useMemo(
    () =>
      tradeIns.filter((t) => {
        const c = getCustomer(t.customerId);
        return match(`${t.id} ${t.model} ${c ? fullName(c) : ""} ${t.condition}`);
      }),
    [match],
  );

  return (
    <AdminPage
      title="Service desk"
      subtitle={`${openReturns.length + openClaims.length + openTrades.length} open cases across returns, warranty and trade-ins`}
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
        <StatCard label="Open returns" value={String(openReturns.length)} sub={`${fmtLKR(refundExposure)} at risk of refund`} icon={Undo2} tone="promo" />
        <StatCard label="Open claims" value={String(openClaims.length)} sub={`Longest open ${slowest} days`} icon={ShieldCheck} tone="warning" />
        <StatCard label="Trade-ins in flight" value={String(openTrades.length)} sub="Quoted through to credited" icon={Repeat} tone="primary" />
        <StatCard label="Revalued after inspection" value={String(tradeIns.filter((t) => t.revised).length)} sub="Condition differed from declared" icon={TriangleAlert} tone="destructive" />
      </div>

      <div className="mt-6">
        <Tabs
          tabs={[
            { ...tabs[0], count: returnCases.length },
            { ...tabs[1], count: warrantyClaims.length },
            { ...tabs[2], count: tradeIns.length },
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
            tab === "returns"
              ? "Search by case, order, customer or reason…"
              : tab === "warranty"
                ? "Search by case, IMEI, customer or fault…"
                : "Search by case, model or customer…"
          }
        />
      </div>

      {/* Returns */}
      {tab === "returns" && (
        <div className="mt-5">
          {returnRows.length === 0 ? (
            <EmptyState icon={Search} title="No returns match" body="Try a different search term." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>Case</Th>
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Product</Th>
                  <Th>Reason</Th>
                  <Th>Opened</Th>
                  <Th className="text-right">Refund</Th>
                  <Th>Stage</Th>
                </tr>
              </thead>
              <tbody>
                {returnRows.map((r) => {
                  const c = getCustomer(r.customerId);
                  const p = getProduct(r.productId);
                  return (
                    <Tr key={r.id} onClick={() => setOpen({ kind: "return", data: r })}>
                      <Td className="font-display text-[13px] font-bold text-foreground">{r.id}</Td>
                      <Td>
                        <Link
                          to={`/admin/orders/${r.orderId}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-semibold hover:text-primary"
                        >
                          {r.orderId}
                        </Link>
                      </Td>
                      <Td className="text-sm">{c ? fullName(c) : "—"}</Td>
                      <Td className="max-w-[12rem] truncate text-xs">{p?.name ?? "—"}</Td>
                      <Td className="text-xs">{r.reason}</Td>
                      <Td className="whitespace-nowrap text-xs">{r.opened}</Td>
                      <Td className="text-right font-display font-bold tabular-nums text-foreground">{fmtLKR(r.amount)}</Td>
                      <Td>
                        <Pill tone={returnMeta[r.stage].cls}>{returnMeta[r.stage].label}</Pill>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </TableShell>
          )}
        </div>
      )}

      {/* Warranty */}
      {tab === "warranty" && (
        <div className="mt-5">
          {claimRows.length === 0 ? (
            <EmptyState icon={Search} title="No claims match" body="Try a different search term." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>Case</Th>
                  <Th>Customer</Th>
                  <Th>Device</Th>
                  <Th>Fault</Th>
                  <Th>Service centre</Th>
                  <Th className="text-right">Days open</Th>
                  <Th>Stage</Th>
                </tr>
              </thead>
              <tbody>
                {claimRows.map((c) => {
                  const cust = getCustomer(c.customerId);
                  const p = getProduct(c.productId);
                  return (
                    <Tr key={c.id} onClick={() => setOpen({ kind: "claim", data: c })}>
                      <Td className="font-display text-[13px] font-bold text-foreground">{c.id}</Td>
                      <Td className="text-sm">{cust ? fullName(cust) : "—"}</Td>
                      <Td>
                        <span className="block max-w-[12rem] truncate text-xs font-medium text-foreground">
                          {p?.name ?? "—"}
                        </span>
                        {c.imei !== "—" && <code className="block font-mono text-[11px] text-muted-foreground">{c.imei}</code>}
                      </Td>
                      <Td className="max-w-[14rem] truncate text-xs">{c.fault}</Td>
                      <Td className="max-w-[12rem] truncate text-xs">{c.centre}</Td>
                      <Td className={cn("text-right font-bold tabular-nums", c.days > 10 ? "text-destructive" : "text-foreground")}>
                        {c.days}
                      </Td>
                      <Td>
                        <Pill tone={claimMeta[c.stage].cls}>{claimMeta[c.stage].label}</Pill>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </TableShell>
          )}
        </div>
      )}

      {/* Trade-ins */}
      {tab === "trade" && (
        <div className="mt-5">
          {tradeRows.length === 0 ? (
            <EmptyState icon={Search} title="No trade-ins match" body="Try a different search term." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>Case</Th>
                  <Th>Customer</Th>
                  <Th>Device</Th>
                  <Th>Declared condition</Th>
                  <Th>Opened</Th>
                  <Th className="text-right">Quoted</Th>
                  <Th className="text-right">Final</Th>
                  <Th>Stage</Th>
                </tr>
              </thead>
              <tbody>
                {tradeRows.map((t) => {
                  const c = getCustomer(t.customerId);
                  return (
                    <Tr key={t.id} onClick={() => setOpen({ kind: "trade", data: t })}>
                      <Td className="font-display text-[13px] font-bold text-foreground">{t.id}</Td>
                      <Td className="text-sm">{c ? fullName(c) : "—"}</Td>
                      <Td className="text-xs">{t.model}</Td>
                      <Td className="text-xs">{t.condition}</Td>
                      <Td className="whitespace-nowrap text-xs">{t.opened}</Td>
                      <Td className={cn("text-right tabular-nums", t.revised && "text-muted-foreground line-through")}>
                        {fmtLKR(t.quoted)}
                      </Td>
                      <Td className="text-right font-display font-bold tabular-nums text-foreground">
                        {t.revised ? fmtLKR(t.revised) : fmtLKR(t.quoted)}
                      </Td>
                      <Td>
                        <Pill tone={tradeMeta[t.stage].cls}>{tradeMeta[t.stage].label}</Pill>
                      </Td>
                    </Tr>
                  );
                })}
              </tbody>
            </TableShell>
          )}
        </div>
      )}

      <div className="mt-5">
        <SectionCard title="Turnaround is the whole job" desc="What customers judge a service desk on">
          <p className="max-w-3xl text-sm text-muted-foreground">
            Every case here already has a stage, so the useful measure is how long it has been sitting in one. Warranty
            claims past ten days are marked in red because that is the point at which a customer stops waiting and starts
            calling.
          </p>
        </SectionCard>
      </div>

      {/* Case panel */}
      <Panel
        open={open !== null}
        onClose={() => setOpen(null)}
        title={open ? (open.kind === "return" ? open.data.id : open.kind === "claim" ? open.data.id : open.data.id) : ""}
        subtitle={
          open?.kind === "return"
            ? `Return · opened ${open.data.opened}`
            : open?.kind === "claim"
              ? `Warranty claim · opened ${open.data.opened}`
              : open?.kind === "trade"
                ? `Trade-in · opened ${open.data.opened}`
                : undefined
        }
        footer={
          open && (
            <>
              <Button
                onClick={() => {
                  setDone(`${open.data.id} advanced to the next stage. The customer has been notified.`);
                  setOpen(null);
                }}
              >
                <Check className="h-4 w-4" /> Advance stage
              </Button>
              <Button variant="outline" onClick={() => setOpen(null)}>
                Close
              </Button>
            </>
          )
        }
      >
        {open?.kind === "return" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Detail label="Stage">
                <Pill tone={returnMeta[open.data.stage].cls}>{returnMeta[open.data.stage].label}</Pill>
              </Detail>
              <Detail label="Refund value">{fmtLKR(open.data.amount)}</Detail>
              <Detail label="Order">
                <Link to={`/admin/orders/${open.data.orderId}`} className="hover:text-primary">
                  {open.data.orderId}
                </Link>
              </Detail>
              <Detail label="Customer">
                <Link to={`/admin/customers/${open.data.customerId}`} className="hover:text-primary">
                  {getCustomer(open.data.customerId) ? fullName(getCustomer(open.data.customerId)!) : "Unknown"}
                </Link>
              </Detail>
              <Detail label="Product">{getProduct(open.data.productId)?.name ?? "—"}</Detail>
              <Detail label="Reason given">{open.data.reason}</Detail>
            </div>

            {open.data.outcome && (
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Outcome</p>
                <p className="mt-1 text-sm text-foreground/85">{open.data.outcome}</p>
              </div>
            )}

            <Field label="Inspection note" hint="Decides whether the unit is restocked or scrapped.">
              <TextArea defaultValue={open.data.note ?? ""} placeholder="Seal intact, no marks. Restock as new." />
            </Field>

            <Note>
              A refund only happens after inspection. Approving the return and paying the money are separate steps on
              purpose.
            </Note>
          </div>
        )}

        {open?.kind === "claim" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Detail label="Stage">
                <Pill tone={claimMeta[open.data.stage].cls}>{claimMeta[open.data.stage].label}</Pill>
              </Detail>
              <Detail label="Days open">
                <span className={cn(open.data.days > 10 && "text-destructive")}>{open.data.days}</span>
              </Detail>
              <Detail label="Customer">
                <Link to={`/admin/customers/${open.data.customerId}`} className="hover:text-primary">
                  {getCustomer(open.data.customerId) ? fullName(getCustomer(open.data.customerId)!) : "Unknown"}
                </Link>
              </Detail>
              <Detail label="Device">{getProduct(open.data.productId)?.name ?? "—"}</Detail>
              <Detail label="IMEI">
                {open.data.imei === "—" ? "Not applicable" : <code className="font-mono text-xs">{open.data.imei}</code>}
              </Detail>
              <Detail label="Service centre">{open.data.centre}</Detail>
              {open.data.loaner && <Detail label="Loaner issued">{open.data.loaner}</Detail>}
            </div>

            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                <Wrench className="h-3.5 w-3.5" /> Reported fault
              </p>
              <p className="mt-1 text-sm text-foreground/85">{open.data.fault}</p>
            </div>

            <Field label="Repair note">
              <TextArea defaultValue={open.data.note ?? ""} placeholder="Part ordered, distributor quotes 5 working days." />
            </Field>

            <Note>
              Check the IMEI against the serial registry before accepting a claim — grey imports carry no local warranty
              and cannot be serviced under this process.
            </Note>
          </div>
        )}

        {open?.kind === "trade" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Detail label="Stage">
                <Pill tone={tradeMeta[open.data.stage].cls}>{tradeMeta[open.data.stage].label}</Pill>
              </Detail>
              <Detail label="Device">{open.data.model}</Detail>
              <Detail label="Customer">
                <Link to={`/admin/customers/${open.data.customerId}`} className="hover:text-primary">
                  {getCustomer(open.data.customerId) ? fullName(getCustomer(open.data.customerId)!) : "Unknown"}
                </Link>
              </Detail>
              <Detail label="Declared condition">{open.data.condition}</Detail>
              <Detail label="Original quote">{fmtLKR(open.data.quoted)}</Detail>
              <Detail label="After inspection">
                {open.data.revised ? (
                  <span className="text-promo">{fmtLKR(open.data.revised)}</span>
                ) : (
                  "Unchanged"
                )}
              </Detail>
            </div>

            {open.data.revised && (
              <p className="flex items-start gap-2.5 rounded-xl border border-warning/40 bg-warning/15 p-3 text-xs font-medium text-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                The quote was revised down by {fmtLKR(open.data.quoted - open.data.revised)} after inspection. The
                customer must accept the new figure before credit is issued.
              </p>
            )}

            <Field label="Inspection note">
              <TextArea defaultValue={open.data.note ?? ""} placeholder="Rear glass hairline crack not declared." />
            </Field>

            <Note>
              A revised quote is an offer, not a decision. If the customer declines, the device goes back to them at our
              cost.
            </Note>
          </div>
        )}
      </Panel>
    </AdminPage>
  );
};

export default Service;
