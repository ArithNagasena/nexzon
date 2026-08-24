import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Check, ArrowRight, Info, Calculator } from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import { Button } from "@/components/ui/button";
import { buybackValue, conditionRules, isEligible, monthlyRealCost, promise, realCost, TERMS, type Term } from "@/data/buyback";
import { fmtLKR, phones } from "@/data/catalog";
import { cn } from "@/lib/utils";

const Buyback = () => {
  const eligible = useMemo(() => phones.filter(isEligible), []);
  const [pick, setPick] = useState(eligible[0].id);
  const [term, setTerm] = useState<Term>(24);

  useEffect(() => {
    document.title = "Guaranteed Buyback — Nexzon";
  }, []);

  const product = eligible.find((p) => p.id === pick)!;
  const back = buybackValue(product, term);
  const cost = realCost(product, term);
  const monthly = monthlyRealCost(product, term);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Guaranteed Buyback</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container-page pt-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> Only at Nexzon
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Know what your phone really costs before you buy it.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/85 sm:text-base">
              A LKR 429,000 phone doesn't cost LKR 429,000 — it costs that minus whatever it's worth when
              you're done with it. The problem is nobody tells you that number up front. We will, and we'll
              put it in writing on your invoice.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="container-page pt-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <Calculator className="h-4 w-4 text-primary" /> Work out your real cost
              </h2>

              <div className="mt-5 space-y-1.5">
                <label htmlFor="bb-device" className="text-xs font-semibold text-foreground">Device</label>
                <select
                  id="bb-device"
                  value={pick}
                  onChange={(e) => setPick(e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                >
                  {eligible.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — {fmtLKR(p.price)}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold text-foreground">Keep it for</p>
                <div className="mt-2 flex gap-2" role="group" aria-label="Buyback term">
                  {TERMS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={term === t}
                      onClick={() => setTerm(t)}
                      className={cn(
                        "flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
                        term === t
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground/75 hover:border-primary/40",
                      )}
                    >
                      {t} months
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "You pay today", value: fmtLKR(product.price), tone: "text-foreground" },
                  { label: `Guaranteed back at ${term} mo`, value: `− ${fmtLKR(back)}`, tone: "text-success" },
                  { label: "Real cost", value: fmtLKR(cost), tone: "text-primary" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-surface p-4">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <p className={cn("mt-1 font-display text-xl font-extrabold", s.tone)}>{s.value}</p>
                  </div>
                ))}
              </div>

              <p className="mt-4 rounded-xl bg-accent p-4 text-sm font-semibold text-accent-foreground">
                That's {fmtLKR(monthly)} a month to own a {product.name} for {term} months.
              </p>

              <Button asChild className="mt-5">
                <Link to={`/product/${product.id}`}>See this device <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            <aside className="min-w-0 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h2 className="font-display text-base font-bold">The promise</h2>
                <ul className="mt-4 space-y-4">
                  {promise.map((p) => (
                    <li key={p.title}>
                      <p className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                        <Check className="h-4 w-4 shrink-0 text-success" /> {p.title}
                      </p>
                      <p className="mt-0.5 pl-5.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-display text-base font-bold">Condition standard</h2>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  To get the full guaranteed amount, the device must:
                </p>
                <ul className="mt-3 space-y-2">
                  {conditionRules.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Comparison */}
        <section className="container-page pt-14">
          <h2 className="font-display text-xl font-bold">Why this beats an installment plan</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Installments spread the cost. This one lowers it.
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
            <table className="w-full min-w-[540px] text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Over 24 months</th>
                  <th className="p-4 font-display text-sm font-bold">0% installments elsewhere</th>
                  <th className="p-4 font-display text-sm font-bold text-primary">Nexzon Guaranteed Buyback</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["What you pay", fmtLKR(product.price), fmtLKR(product.price)],
                  ["What you get back", "Nothing", fmtLKR(buybackValue(product, 24))],
                  ["True cost of ownership", fmtLKR(product.price), fmtLKR(realCost(product, 24))],
                  ["Per month", fmtLKR(Math.round(product.price / 24)), fmtLKR(monthlyRealCost(product, 24))],
                ].map(([label, a, b], i) => (
                  <tr key={label} className={cn("border-b border-border last:border-0", i % 2 === 1 && "bg-surface/50")}>
                    <th scope="row" className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</th>
                    <td className="p-4 text-muted-foreground">{a}</td>
                    <td className="p-4 font-bold text-foreground">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            Figures shown for the {product.name}. The guaranteed amount is fixed at purchase and printed on
            your invoice — it does not change if the second-hand market moves against us.
          </p>
        </section>

        <section className="container-page py-14">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-gradient-deep p-8 text-primary-foreground sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-xl font-extrabold">Every flagship we sell is covered</h2>
              <p className="mt-1 text-sm text-white/80">
                Look for the buyback figure on the product page before you check out.
              </p>
            </div>
            <Button asChild variant="hero" className="shrink-0">
              <Link to="/category/smartphones">Browse covered phones</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Buyback;
