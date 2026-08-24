/**
 * Customer directory.
 *
 * Searchable by name, phone, email and NIC because a support call can start
 * from any of them — and rarely from a customer id.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Users, Crown, TriangleAlert, Repeat } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
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
import { customers, fullName, tierMeta, tierOrder, type Tier } from "@/data/admin/customers";
import { isRevenue, lifetimeValue, ordersFor } from "@/data/admin/orders";

const districts = ["All districts", ...[...new Set(customers.map((c) => c.district))].sort()];

const tierFilters = [
  { id: "all", label: "All tiers" },
  ...tierOrder.map((t) => ({ id: t, label: t })),
];

const Customers = () => {
  const [q, setQ] = useState("");
  const [tier, setTier] = useState("all");
  const [district, setDistrict] = useState(districts[0]);

  const rows = useMemo(
    () =>
      customers
        .filter((c) => {
          if (tier !== "all" && c.tier !== tier) return false;
          if (district !== districts[0] && c.district !== district) return false;
          if (!q.trim()) return true;
          return `${fullName(c)} ${c.email} ${c.phone} ${c.nic}`.toLowerCase().includes(q.toLowerCase());
        })
        .sort((a, b) => lifetimeValue(b.id) - lifetimeValue(a.id)),
    [q, tier, district],
  );

  const totalValue = customers.reduce((sum, c) => sum + lifetimeValue(c.id), 0);
  const repeat = customers.filter((c) => ordersFor(c.id).filter(isRevenue).length > 1).length;
  const flagged = customers.filter((c) => c.flag).length;
  const pointsLiability = customers.reduce((sum, c) => sum + c.points, 0);

  return (
    <AdminPage
      title="Customers"
      subtitle={`${customers.length} accounts on file, ordered by lifetime spend`}
    >
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Lifetime revenue" value={fmtLKR(totalValue)} sub="Across every customer" icon={Users} tone="success" />
        <StatCard label="Repeat buyers" value={`${repeat} of ${customers.length}`} sub="More than one paid order" icon={Repeat} tone="primary" />
        <StatCard label="Points outstanding" value={pointsLiability.toLocaleString()} sub={`Worth about ${fmtLKR(pointsLiability)}`} icon={Crown} tone="warning" />
        <StatCard label="Flagged accounts" value={String(flagged)} sub="High returns or refusals" icon={TriangleAlert} tone="destructive" />
      </div>

      <div className="mt-6">
        <Toolbar
          q={q}
          onQ={setQ}
          placeholder="Search by name, email, phone or NIC…"
          filters={tierFilters.map((f) => ({
            ...f,
            count: f.id === "all" ? customers.length : customers.filter((c) => c.tier === f.id).length,
          }))}
          filter={tier}
          onFilter={setTier}
          extra={
            <Select value={district} onChange={(e) => setDistrict(e.target.value)} aria-label="Filter by district" className="w-44">
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </Select>
          }
        />
      </div>

      {rows.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={Search}
            title="No customers match"
            body="Try a different search term or clear the tier and district filters."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setQ("");
                  setTier("all");
                  setDistrict(districts[0]);
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
                <Th>Customer</Th>
                <Th>Contact</Th>
                <Th>District</Th>
                <Th>Tier</Th>
                <Th className="text-right">Points</Th>
                <Th className="text-right">Orders</Th>
                <Th className="text-right">Lifetime value</Th>
                <Th className="text-right">Open</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => {
                const paid = ordersFor(c.id).filter(isRevenue);
                return (
                  <Tr key={c.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-deep font-display text-[11px] font-extrabold text-primary-foreground">
                          {c.initials}
                        </span>
                        <span className="min-w-0">
                          <Link to={`/admin/customers/${c.id}`} className="block truncate text-sm font-semibold text-foreground hover:text-primary">
                            {fullName(c)}
                          </Link>
                          <span className="text-xs text-muted-foreground">Since {c.joined}</span>
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <span className="block max-w-[14rem] truncate text-xs">{c.email}</span>
                      <span className="block text-xs text-muted-foreground">{c.phone}</span>
                    </Td>
                    <Td className="text-xs">{c.district}</Td>
                    <Td>
                      <Pill tone={tierMeta[c.tier as Tier].cls}>{c.tier}</Pill>
                      {c.flag && (
                        <span className="mt-1 block text-[11px] font-semibold text-destructive">{c.flag}</span>
                      )}
                    </Td>
                    <Td className="text-right tabular-nums">{c.points.toLocaleString()}</Td>
                    <Td className="text-right tabular-nums">{paid.length}</Td>
                    <Td className="text-right font-display font-bold tabular-nums text-foreground">
                      {fmtLKR(lifetimeValue(c.id))}
                    </Td>
                    <Td className="text-right">
                      <Button asChild size="sm" variant="ghost">
                        <Link to={`/admin/customers/${c.id}`} aria-label={`Open ${fullName(c)}`}>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </TableShell>
        </div>
      )}
    </AdminPage>
  );
};

export default Customers;
