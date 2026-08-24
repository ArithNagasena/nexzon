/**
 * Product list.
 *
 * Reads the same catalog the storefront renders, joined against the operational
 * fields (`sku`, `cost`, `stock`, `status`) that live in data/admin/inventory
 * because `CatalogItem` does not carry them.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Boxes, Pencil, ExternalLink, Search } from "lucide-react";
import { AdminPage } from "@/components/admin/AdminLayout";
import {
  EmptyState,
  FilterPills,
  Pill,
  Select,
  TableShell,
  Td,
  Th,
  Toolbar,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { allProducts, fmtLKR } from "@/data/catalog";
import { available, isLow, ops, statusMeta } from "@/data/admin/inventory";
import { cn } from "@/lib/utils";

const brands = ["All brands", ...[...new Set(allProducts.map((p) => p.brand))].sort()];
const categories = ["All categories", ...[...new Set(allProducts.map((p) => p.category))].sort()];

const statusFilters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "draft", label: "Draft" },
  { id: "archived", label: "Archived" },
  { id: "low", label: "Low or out of stock" },
];

const Products = () => {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [brand, setBrand] = useState(brands[0]);
  const [category, setCategory] = useState(categories[0]);

  const rows = useMemo(
    () =>
      allProducts.filter((p) => {
        const o = ops[p.id];
        if (status === "low" && !(isLow(p.id) || available(p.id) === 0)) return false;
        if (status !== "all" && status !== "low" && o.status !== status) return false;
        if (brand !== brands[0] && p.brand !== brand) return false;
        if (category !== categories[0] && p.category !== category) return false;
        if (!q.trim()) return true;
        return `${p.name} ${p.brand} ${o.sku}`.toLowerCase().includes(q.toLowerCase());
      }),
    [q, status, brand, category],
  );

  const count = (id: string) => {
    if (id === "all") return allProducts.length;
    if (id === "low") return allProducts.filter((p) => isLow(p.id) || available(p.id) === 0).length;
    return allProducts.filter((p) => ops[p.id].status === id).length;
  };

  const clear = () => {
    setQ("");
    setStatus("all");
    setBrand(brands[0]);
    setCategory(categories[0]);
  };

  return (
    <AdminPage
      title="Products"
      subtitle={`${allProducts.length} products across ${categories.length - 1} categories`}
      actions={
        <Button asChild>
          <Link to="/admin/products/new">
            <Plus className="h-4 w-4" /> New product
          </Link>
        </Button>
      }
    >
      <Toolbar
        q={q}
        onQ={setQ}
        placeholder="Search by name, brand or SKU…"
        extra={
          <div className="flex gap-2">
            <Select value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Filter by brand" className="w-40">
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </Select>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category" className="w-44">
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </div>
        }
      />

      <FilterPills
        options={statusFilters.map((f) => ({ ...f, count: count(f.id) }))}
        value={status}
        onChange={setStatus}
        className="mt-4"
      />

      {rows.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={Search}
            title="No products match"
            body="Try a different search term, or clear the brand and category filters."
            action={
              <Button variant="outline" onClick={clear}>
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
                <Th>Product</Th>
                <Th>SKU</Th>
                <Th className="text-right">Price</Th>
                <Th className="text-right">Cost</Th>
                <Th className="text-right">Margin</Th>
                <Th className="text-right">Available</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const o = ops[p.id];
                const margin = Math.round(((p.price - o.cost) / p.price) * 100);
                const avail = available(p.id);
                return (
                  <Tr key={p.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white">
                          <img src={p.image} alt="" className="h-9 w-auto object-contain mix-blend-multiply" />
                        </span>
                        <span className="min-w-0">
                          <Link
                            to={`/admin/products/${p.id}/edit`}
                            className="block max-w-[18rem] truncate text-sm font-semibold text-foreground hover:text-primary"
                          >
                            {p.name}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            {p.brand} · {p.category}
                          </span>
                        </span>
                      </div>
                    </Td>
                    <Td className="font-mono text-xs">{o.sku}</Td>
                    <Td className="text-right font-display font-bold tabular-nums text-foreground">{fmtLKR(p.price)}</Td>
                    <Td className="text-right tabular-nums">{fmtLKR(o.cost)}</Td>
                    <Td className={cn("text-right font-semibold tabular-nums", margin < 15 ? "text-promo" : "text-success")}>
                      {margin}%
                    </Td>
                    <Td className="text-right">
                      <span className={cn("font-bold tabular-nums", avail === 0 ? "text-destructive" : isLow(p.id) ? "text-promo" : "text-foreground")}>
                        {avail}
                      </span>
                      {o.reserved > 0 && <span className="block text-[11px] text-muted-foreground">{o.reserved} reserved</span>}
                    </Td>
                    <Td>
                      <Pill tone={statusMeta[o.status].cls}>{statusMeta[o.status].label}</Pill>
                    </Td>
                    <Td className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button asChild size="sm" variant="ghost" title="Edit product">
                          <Link to={`/admin/products/${p.id}/edit`}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="ghost" title="View on the storefront">
                          <Link to={`/product/${p.id}`}>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </TableShell>

          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Boxes className="h-3.5 w-3.5" />
            Showing {rows.length} of {allProducts.length} products
          </p>
        </div>
      )}
    </AdminPage>
  );
};

export default Products;
