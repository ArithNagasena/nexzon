import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Bell, Share2, Star, TrendingDown } from "lucide-react";
import AccountLayout from "@/components/NexZon/AccountLayout";
import { Button } from "@/components/ui/button";
import { allProducts, fmtLKR, getProduct, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/utils";

const START = [
  "pixel-10-pro",
  "galaxy-z-flip-7",
  "airpods-max",
  "iphone-air-256gb",
  "honor-magic-v5",
  "meta-quest-3",
];

/** Products whose price has fallen since being saved. */
const dropped: Record<string, number> = {
  "pixel-10-pro": 30000,
  "airpods-max": 24000,
};

const sorts = ["Recently added", "Price: low to high", "Price: high to low", "Price drops first"] as const;
type Sort = (typeof sorts)[number];

const Wishlist = () => {
  const [ids, setIds] = useState<string[]>(START);
  const [sort, setSort] = useState<Sort>("Recently added");

  useEffect(() => {
    document.title = "Wishlist — Nexzon";
  }, []);

  const items = useMemo(() => {
    const list = ids.map((id) => getProduct(id)).filter(Boolean) as CatalogItem[];
    switch (sort) {
      case "Price: low to high": return [...list].sort((a, b) => a.price - b.price);
      case "Price: high to low": return [...list].sort((a, b) => b.price - a.price);
      case "Price drops first": return [...list].sort((a, b) => (dropped[b.id] ?? 0) - (dropped[a.id] ?? 0));
      default: return list;
    }
  }, [ids, sort]);

  const totalIfBought = items.reduce((s, p) => s + p.price, 0);
  const totalDrops = items.reduce((s, p) => s + (dropped[p.id] ?? 0), 0);

  const remove = (id: string) => setIds((prev) => prev.filter((x) => x !== id));

  const suggestions = allProducts.filter((p) => !ids.includes(p.id)).slice(0, 4);

  return (
    <AccountLayout
      title="Wishlist"
      subtitle={`${items.length} saved · ${fmtLKR(totalIfBought)} if you bought everything`}
      actions={
        <Button variant="outline">
          <Share2 className="h-4 w-4" /> Share list
        </Button>
      }
    >
      {totalDrops > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-success/25 bg-success/5 p-4">
          <TrendingDown className="h-5 w-5 shrink-0 text-success" />
          <p className="text-sm">
            <strong className="text-success">{fmtLKR(totalDrops)} cheaper</strong>
            <span className="text-muted-foreground"> across {Object.keys(dropped).filter((d) => ids.includes(d)).length} saved items since you added them.</span>
          </p>
        </div>
      )}

      {items.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <h2 className="mt-3 font-display text-lg font-bold">Your wishlist is empty</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any product to save it here.</p>
          <Button asChild className="mt-5"><Link to="/category/smartphones">Browse phones</Link></Button>
        </div>
      ) : (
        <>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Sort</span>
            {sorts.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={sort === s}
                onClick={() => setSort(s)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  sort === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-primary",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <ul className="mt-5 space-y-3">
            {items.map((p) => {
              const drop = dropped[p.id];
              return (
                <li key={p.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
                  <Link to={`/product/${p.id}`} className="isolate grid h-24 w-24 shrink-0 place-items-center self-center rounded-xl bg-white">
                    <img src={p.image} alt={p.name} className="h-20 w-auto object-contain mix-blend-multiply" />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{p.brand}</span>
                    <Link to={`/product/${p.id}`} className="block font-display text-base font-bold leading-tight text-foreground hover:text-primary">
                      {p.name}
                    </Link>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                      <span className="text-xs font-semibold text-foreground">{p.rating}</span>
                      <span className="text-xs text-muted-foreground">({p.reviews})</span>
                    </div>
                    {drop && (
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-success/10 px-2 py-1 text-[11px] font-bold text-success">
                        <TrendingDown className="h-3.5 w-3.5" /> Down {fmtLKR(drop)} since you saved it
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 sm:w-48 sm:text-right">
                    {p.oldPrice && <div className="text-xs text-muted-foreground line-through">{fmtLKR(p.oldPrice)}</div>}
                    <div className="font-display text-lg font-extrabold text-foreground">{fmtLKR(p.price)}</div>
                    <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
                      <Button asChild size="sm"><Link to="/cart"><ShoppingCart className="h-3.5 w-3.5" /> Add to cart</Link></Button>
                      <Button asChild size="sm" variant="ghost"><Link to="/account/price-alerts"><Bell className="h-3.5 w-3.5" /></Link></Button>
                      <Button size="sm" variant="ghost" onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold">You might also like</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {suggestions.map((s) => (
            <Link key={s.id} to={`/product/${s.id}`} className="group rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
              <span className="isolate grid h-24 place-items-center rounded-xl bg-white">
                <img src={s.image} alt="" className="h-20 w-auto object-contain mix-blend-multiply" />
              </span>
              <p className="mt-3 truncate text-xs font-semibold text-foreground group-hover:text-primary">{s.name}</p>
              <p className="text-sm font-extrabold text-foreground">{fmtLKR(s.price)}</p>
            </Link>
          ))}
        </div>
      </section>
    </AccountLayout>
  );
};

export default Wishlist;
