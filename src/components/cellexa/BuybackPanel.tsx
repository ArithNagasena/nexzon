import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, Info } from "lucide-react";
import { buybackValue, isEligible, monthlyRealCost, realCost, TERMS, type Term } from "@/data/buyback";
import { fmtLKR, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/utils";

/**
 * Shows what a device really costs once the guaranteed buyback is taken off.
 * Renders nothing for products that aren't covered.
 */
const BuybackPanel = ({ product }: { product: CatalogItem }) => {
  const [term, setTerm] = useState<Term>(24);

  if (!isEligible(product)) return null;

  const back = buybackValue(product, term);
  const cost = realCost(product, term);
  const monthly = monthlyRealCost(product, term);
  const keptPct = Math.round((back / product.price) * 100);

  return (
    <section className="overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-card">
      <header className="flex items-center gap-2.5 border-b border-border bg-accent px-5 py-3">
        <ShieldCheck className="h-4 w-4 shrink-0 text-accent-foreground" />
        <h2 className="font-display text-sm font-bold text-accent-foreground">
          Guaranteed Buyback — only at Nexzon
        </h2>
      </header>

      <div className="p-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          We commit today to what we'll pay to take this device back. The figure is fixed on your invoice,
          so you know the real cost of owning it before you buy.
        </p>

        {/* Term selector */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-foreground">Keep it for</p>
          <div className="mt-2 flex gap-2" role="group" aria-label="Buyback term">
            {TERMS.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={term === t}
                onClick={() => setTerm(t)}
                className={cn(
                  "flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                  term === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground/75 hover:border-primary/40",
                )}
              >
                {t} mo
              </button>
            ))}
          </div>
        </div>

        {/* Figures */}
        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">You pay today</dt>
            <dd className="font-semibold text-foreground">{fmtLKR(product.price)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">We guarantee back at {term} months</dt>
            <dd className="font-semibold text-success">− {fmtLKR(back)}</dd>
          </div>
        </dl>

        <div className="mt-4 rounded-xl bg-gradient-deep p-4 text-primary-foreground">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/60">Your real cost</p>
              <p className="font-display text-2xl font-extrabold leading-tight">{fmtLKR(cost)}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-white/60">Per month</p>
              <p className="font-display text-lg font-extrabold leading-tight">{fmtLKR(monthly)}</p>
            </div>
          </div>

          <div className="mt-3">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-warning transition-all" style={{ width: `${keptPct}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] text-white/70">
              You get {keptPct}% of the purchase price back if you return it at {term} months.
            </p>
          </div>
        </div>

        <Link
          to="/buyback"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          How the guarantee works <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Subject to the device meeting our condition standard. Add Nexzon Care and accidental damage is
          covered too.
        </p>
      </div>
    </section>
  );
};

export default BuybackPanel;
