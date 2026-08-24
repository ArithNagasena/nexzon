import { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Plus,
  X,
  Search,
  Trophy,
  Star,
  ShoppingCart,
  Scale,
  ArrowRight,
  Check,
} from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { phones, phoneDetails, fmtLKR, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/utils";

const MAX_SLOTS = 4;
const DEFAULT_IDS = ["iphone-17-pro-max", "galaxy-s26-ultra", "pixel-10-pro"];

type Row = {
  label: string;
  get: (p: CatalogItem) => string;
  /** Higher is better → used to mark the winning cell. Omit for text rows. */
  score?: (p: CatalogItem) => number;
};

const groups: { group: string; rows: Row[] }[] = [
  {
    group: "Price & rating",
    rows: [
      { label: "Price", get: (p) => fmtLKR(p.price), score: (p) => -p.price },
      { label: "Was", get: (p) => (p.oldPrice ? fmtLKR(p.oldPrice) : "—") },
      { label: "Per month × 12", get: (p) => fmtLKR(Math.round(p.price / 12)) },
      { label: "Customer rating", get: (p) => `${p.rating} / 5 (${p.reviews})`, score: (p) => p.rating },
    ],
  },
  {
    group: "Display",
    rows: [
      { label: "Screen size", get: (p) => (p.screen ? `${p.screen} inches` : "—"), score: (p) => p.screen ?? 0 },
      { label: "Panel", get: (p) => phoneDetails[p.id]?.display ?? "—" },
    ],
  },
  {
    group: "Performance",
    rows: [
      { label: "Chipset", get: (p) => phoneDetails[p.id]?.chipset ?? "—" },
      { label: "RAM", get: (p) => p.ram ?? "—", score: (p) => parseInt(p.ram ?? "0", 10) },
      { label: "Storage", get: (p) => p.storage ?? "—", score: (p) => parseInt(p.storage ?? "0", 10) },
      { label: "Operating system", get: (p) => phoneDetails[p.id]?.os ?? "—" },
    ],
  },
  {
    group: "Camera",
    rows: [
      { label: "Main sensor", get: (p) => (p.camera ? `${p.camera}MP` : "—"), score: (p) => p.camera ?? 0 },
      { label: "Front camera", get: (p) => phoneDetails[p.id]?.frontCamera ?? "—" },
    ],
  },
  {
    group: "Battery & build",
    rows: [
      { label: "Battery", get: (p) => (p.battery ? `${p.battery.toLocaleString()}mAh` : "—"), score: (p) => p.battery ?? 0 },
      { label: "Charging", get: (p) => phoneDetails[p.id]?.charging ?? "—" },
      { label: "Weight", get: (p) => phoneDetails[p.id]?.weight ?? "—", score: (p) => -parseInt(phoneDetails[p.id]?.weight ?? "999", 10) },
      { label: "5G", get: (p) => (p.fiveG ? "Supported" : "Not supported") },
      { label: "Warranty", get: (p) => p.warranty },
    ],
  },
];

const Compare = () => {
  const [ids, setIds] = useState<string[]>(DEFAULT_IDS);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [diffOnly, setDiffOnly] = useState(false);

  const selected = useMemo(
    () => ids.map((id) => phones.find((p) => p.id === id)).filter(Boolean) as CatalogItem[],
    [ids],
  );

  const available = useMemo(
    () =>
      phones.filter(
        (p) => !ids.includes(p.id) && `${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [ids, search],
  );

  const remove = (id: string) => setIds((prev) => prev.filter((x) => x !== id));
  const add = (id: string) => {
    setIds((prev) => (prev.length >= MAX_SLOTS ? prev : [...prev, id]));
    setPickerOpen(false);
    setSearch("");
  };

  /* Winners across the current selection, for the verdict strip. */
  const verdicts = useMemo(() => {
    if (selected.length < 2) return [];
    const best = (fn: (p: CatalogItem) => number) =>
      selected.reduce((a, b) => (fn(b) > fn(a) ? b : a));
    return [
      { label: "Lowest price", p: best((x) => -x.price), value: (x: CatalogItem) => fmtLKR(x.price) },
      { label: "Best camera", p: best((x) => x.camera ?? 0), value: (x: CatalogItem) => `${x.camera}MP` },
      { label: "Biggest battery", p: best((x) => x.battery ?? 0), value: (x: CatalogItem) => `${(x.battery ?? 0).toLocaleString()}mAh` },
      { label: "Most RAM", p: best((x) => parseInt(x.ram ?? "0", 10)), value: (x: CatalogItem) => x.ram ?? "—" },
    ];
  }, [selected]);

  /* A row is "different" when the products don't all share the same value. */
  const isDifferent = (row: Row) => new Set(selected.map((p) => row.get(p))).size > 1;

  const visibleGroups = groups
    .map((g) => ({ ...g, rows: diffOnly ? g.rows.filter(isDifferent) : g.rows }))
    .filter((g) => g.rows.length > 0);

  const winnerId = (row: Row) => {
    if (!row.score || selected.length < 2) return null;
    const scores = selected.map(row.score);
    const max = Math.max(...scores);
    if (scores.filter((s) => s === max).length > 1) return null; // a tie has no winner
    return selected[scores.indexOf(max)].id;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Compare</span>
          </nav>
        </div>

        {/* Header */}
        <section className="container-page pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <Scale className="h-3.5 w-3.5" /> Side by side
              </span>
              <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">Compare phones</h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Line up to {MAX_SLOTS} handsets on the specs that decide it. The best figure in each row is
                marked.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Switch id="diff" checked={diffOnly} onCheckedChange={setDiffOnly} />
              <Label htmlFor="diff" className="cursor-pointer text-sm font-medium">
                Differences only
              </Label>
            </div>
          </div>
        </section>

        {/* Verdict strip */}
        {verdicts.length > 0 && (
          <section className="container-page pt-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {verdicts.map((v) => (
                <div key={v.label} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <Trophy className="h-3.5 w-3.5 text-primary" /> {v.label}
                  </div>
                  <div className="mt-2 font-display text-sm font-bold leading-tight text-foreground">{v.p.name}</div>
                  <div className="mt-0.5 text-sm font-extrabold text-primary">{v.value(v.p)}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Comparison table */}
        <section className="container-page pt-8">
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 w-44 bg-surface p-4 text-left align-bottom">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {selected.length} of {MAX_SLOTS} selected
                    </span>
                  </th>
                  {selected.map((p) => (
                    <th key={p.id} scope="col" className="min-w-[13rem] border-l border-border p-4 align-top">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => remove(p.id)}
                          aria-label={`Remove ${p.name}`}
                          className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                        <Link to={`/product/${p.id}`} className="group block">
                          <div className="isolate mx-auto grid h-28 w-24 place-items-center rounded-xl bg-white">
                            <img src={p.image} alt={p.name} className="h-24 w-auto object-contain mix-blend-multiply" />
                          </div>
                          <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {p.brand}
                          </div>
                          <div className="font-display text-sm font-bold leading-tight text-foreground group-hover:text-primary">
                            {p.name}
                          </div>
                        </Link>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                          <span className="text-xs font-semibold">{p.rating}</span>
                        </div>
                        <Button asChild size="sm" className="mt-3 w-full">
                          <Link to="/cart"><ShoppingCart className="h-3.5 w-3.5" /> Add</Link>
                        </Button>
                      </div>
                    </th>
                  ))}
                  {selected.length < MAX_SLOTS && (
                    <th scope="col" className="min-w-[13rem] border-l border-border p-4 align-middle">
                      <button
                        type="button"
                        onClick={() => setPickerOpen((v) => !v)}
                        className="mx-auto flex h-44 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <Plus className="h-6 w-6" />
                        <span className="text-sm font-semibold">Add a phone</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {visibleGroups.map((g) => (
                  <Fragment key={g.group}>
                    <tr>
                      <th
                        colSpan={selected.length + (selected.length < MAX_SLOTS ? 2 : 1)}
                        scope="colgroup"
                        className="sticky left-0 bg-surface px-4 py-2.5 text-left font-display text-xs font-bold uppercase tracking-wider text-foreground"
                      >
                        {g.group}
                      </th>
                    </tr>
                    {g.rows.map((row) => {
                      const win = winnerId(row);
                      return (
                        <tr key={g.group + row.label} className="border-t border-border">
                          <th scope="row" className="sticky left-0 z-10 bg-card px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                            {row.label}
                          </th>
                          {selected.map((p) => (
                            <td
                              key={p.id}
                              className={cn(
                                "border-l border-border px-4 py-3 align-top",
                                win === p.id && "bg-success/5",
                              )}
                            >
                              <span className={cn("font-medium text-foreground", win === p.id && "font-bold text-success")}>
                                {row.get(p)}
                              </span>
                              {win === p.id && (
                                <Check className="ml-1.5 inline h-3.5 w-3.5 text-success" aria-label="Best in row" />
                              )}
                            </td>
                          ))}
                          {selected.length < MAX_SLOTS && <td className="border-l border-border" />}
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {selected.length < 2 && (
            <p className="mt-4 rounded-xl border border-dashed border-border bg-surface p-5 text-center text-sm text-muted-foreground">
              Add at least two phones to see the comparison.
            </p>
          )}
        </section>

        {/* Picker */}
        {pickerOpen && selected.length < MAX_SLOTS && (
          <section className="container-page pt-6">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-base font-bold">Add a phone to compare</h2>
                <button type="button" onClick={() => setPickerOpen(false)} aria-label="Close picker" className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by model or brand…"
                  className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="mt-4 grid max-h-80 gap-2 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
                {available.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => add(p.id)}
                    className="flex items-center gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary hover:bg-secondary"
                  >
                    <div className="isolate grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white">
                      <img src={p.image} alt="" className="h-12 w-auto object-contain mix-blend-multiply" />
                    </div>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-foreground">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">{fmtLKR(p.price)}</span>
                    </span>
                  </button>
                ))}
                {available.length === 0 && (
                  <p className="col-span-full py-6 text-center text-sm text-muted-foreground">
                    No other phones match that search.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Popular pairings */}
        <section className="container-page py-14">
          <h2 className="font-display text-xl font-bold">Popular comparisons</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["iphone-17-pro-max", "galaxy-s26-ultra"],
              ["pixel-10-pro", "iphone-air-256gb"],
              ["oneplus-13r", "galaxy-s25-fe"],
            ].map((pair) => {
              const items = pair.map((id) => phones.find((p) => p.id === id)!).filter(Boolean);
              if (items.length < 2) return null;
              return (
                <button
                  key={pair.join()}
                  type="button"
                  onClick={() => setIds(pair)}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  {items.map((it) => (
                    <div key={it.id} className="isolate grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white">
                      <img src={it.image} alt="" className="h-12 w-auto object-contain mix-blend-multiply" />
                    </div>
                  ))}
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-tight text-foreground">
                      {items[0].brand} vs {items[1].brand}
                    </span>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Compare these <ArrowRight className="h-3 w-3" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
