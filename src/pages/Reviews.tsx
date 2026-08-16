import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ThumbsUp, Pencil, Trash2, PenLine, Gift, Check } from "lucide-react";
import AccountLayout from "@/components/cellexa/AccountLayout";
import { Button } from "@/components/ui/button";
import { myReviews, pendingReviews } from "@/data/account";
import { getProduct } from "@/data/catalog";
import { cn } from "@/lib/utils";

const TABS = ["To review", "Published"] as const;
type Tab = (typeof TABS)[number];

const Stars = ({ n, size = "h-4 w-4" }: { n: number; size?: string }) => (
  <div className="flex items-center gap-0.5" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} aria-hidden className={cn(size, i < n ? "fill-warning text-warning" : "fill-muted text-muted")} />
    ))}
  </div>
);

const Reviews = () => {
  const [tab, setTab] = useState<Tab>("To review");
  const [draftFor, setDraftFor] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    document.title = "My reviews — Nexzon";
  }, []);

  const pending = pendingReviews.filter((p) => !done.includes(p.productId));
  const earned = myReviews.length * 200;

  const submit = (e: React.FormEvent, productId: string) => {
    e.preventDefault();
    setDone((d) => [...d, productId]);
    setDraftFor(null);
  };

  return (
    <AccountLayout
      title="My reviews"
      subtitle={`${myReviews.length} published · ${earned} points earned from reviews`}
    >
      <div className="flex gap-1 border-b border-border" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-4 py-3 text-sm font-semibold transition-colors",
              tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
            <span className="ml-1.5 text-xs text-muted-foreground">
              {t === "To review" ? pending.length : myReviews.length}
            </span>
            {tab === t && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />}
          </button>
        ))}
      </div>

      <div className="pt-6">
        {tab === "To review" && (
          pending.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <Check className="mx-auto h-10 w-10 text-success" />
              <h2 className="mt-3 font-display text-lg font-bold">Everything reviewed</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Thanks — your reviews help other shoppers in Sri Lanka choose.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="flex items-center gap-2 rounded-xl bg-accent p-4 text-sm font-medium text-accent-foreground">
                <Gift className="h-4 w-4 shrink-0" />
                Earn 200 points for each review you publish.
              </p>

              {pending.map((p) => {
                const product = getProduct(p.productId);
                if (!product) return null;
                const open = draftFor === p.productId;
                return (
                  <div key={p.productId} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <div className="flex items-center gap-4">
                      <Link to={`/product/${product.id}`} className="isolate grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-white">
                        <img src={product.image} alt="" className="h-16 w-auto object-contain mix-blend-multiply" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {product.brand}
                        </span>
                        <Link to={`/product/${product.id}`} className="block font-display text-sm font-bold leading-tight text-foreground hover:text-primary">
                          {product.name}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">From order {p.orderId}</p>
                      </div>
                      <Button size="sm" variant={open ? "outline" : "default"} onClick={() => setDraftFor(open ? null : p.productId)} className="shrink-0">
                        <PenLine className="h-3.5 w-3.5" /> {open ? "Cancel" : "Write review"}
                      </Button>
                    </div>

                    {open && (
                      <form onSubmit={(e) => submit(e, p.productId)} className="mt-5 border-t border-border pt-5">
                        <fieldset>
                          <legend className="text-xs font-semibold text-foreground">Your rating</legend>
                          <div className="mt-2 flex gap-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => setRating(n)}
                                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                                aria-pressed={rating === n}
                                className="transition-transform hover:scale-110"
                              >
                                <Star className={cn("h-7 w-7", n <= rating ? "fill-warning text-warning" : "fill-muted text-muted")} />
                              </button>
                            ))}
                          </div>
                        </fieldset>

                        <div className="mt-4 space-y-1.5">
                          <label htmlFor={`t-${p.productId}`} className="text-xs font-semibold text-foreground">Headline</label>
                          <input
                            id={`t-${p.productId}`}
                            required
                            placeholder="Sum it up in a few words"
                            className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-primary focus:bg-background"
                          />
                        </div>

                        <div className="mt-4 space-y-1.5">
                          <label htmlFor={`b-${p.productId}`} className="text-xs font-semibold text-foreground">Your review</label>
                          <textarea
                            id={`b-${p.productId}`}
                            required
                            rows={4}
                            maxLength={800}
                            placeholder="What's it like to actually live with? Battery, camera, build — whatever mattered to you."
                            className="w-full rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-primary focus:bg-background"
                          />
                        </div>

                        <Button type="submit" className="mt-4">Publish review · +{p.points} points</Button>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}

        {tab === "Published" && (
          <div className="space-y-4">
            {myReviews.map((r) => {
              const product = getProduct(r.productId);
              return (
                <article key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-start gap-4">
                    {product && (
                      <Link to={`/product/${product.id}`} className="isolate grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-white">
                        <img src={product.image} alt="" className="h-14 w-auto object-contain mix-blend-multiply" />
                      </Link>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Stars n={r.rating} />
                        <span className="text-xs text-muted-foreground">{r.when}</span>
                      </div>
                      {product && (
                        <Link to={`/product/${product.id}`} className="mt-1 block truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary">
                          {product.name}
                        </Link>
                      )}
                      <h2 className="mt-1.5 font-display text-sm font-bold text-foreground">{r.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-border pt-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <ThumbsUp className="h-3.5 w-3.5 text-primary" /> {r.helpful} found this helpful
                        </span>
                        <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary">
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Reviews;
