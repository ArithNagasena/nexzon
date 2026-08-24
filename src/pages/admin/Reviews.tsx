/**
 * Review moderation.
 *
 * Publishing a review grants the customer 200 points, so this queue is fraud
 * control as much as tone policing: `verified` says whether the reviewer has a
 * delivered order for that product, and an unverified review must never earn
 * points. The full case opens in a side panel so the queue stays in view.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Check, X, Flag, ShieldCheck, ShieldAlert, MessageSquare, Search } from "lucide-react";
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
  Td,
  Th,
  TextArea,
  Toolbar,
  Tr,
} from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/catalog";
import { fullName, getCustomer } from "@/data/admin/customers";
import { pending, reviewMeta, reviews, type Review } from "@/data/admin/reviews";
import { cn } from "@/lib/utils";

const Stars = ({ n, className }: { n: number; className?: string }) => (
  <span className={cn("inline-flex gap-0.5", className)} aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={cn("h-3.5 w-3.5", i < n ? "fill-warning text-warning" : "text-border")} />
    ))}
  </span>
);

const filters = [
  { id: "queue", label: "Needs moderation" },
  { id: "all", label: "All" },
  { id: "published", label: "Published" },
  { id: "rejected", label: "Rejected" },
  { id: "unverified", label: "Unverified" },
];

const Reviews = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("queue");
  const [open, setOpen] = useState<Review | null>(null);
  const [done, setDone] = useState("");

  const queue = pending();
  const avg = reviews.filter((r) => r.state === "published");
  const meanRating = avg.length ? (avg.reduce((s, r) => s + r.rating, 0) / avg.length).toFixed(1) : "—";

  const rows = useMemo(
    () =>
      reviews.filter((r) => {
        if (filter === "queue" && r.state !== "pending" && r.state !== "reported") return false;
        if (filter === "published" && r.state !== "published") return false;
        if (filter === "rejected" && r.state !== "rejected") return false;
        if (filter === "unverified" && r.verified) return false;
        if (!q.trim()) return true;
        const c = getCustomer(r.customerId);
        const p = getProduct(r.productId);
        return `${r.title} ${r.body} ${c ? fullName(c) : ""} ${p?.name ?? ""}`.toLowerCase().includes(q.toLowerCase());
      }),
    [q, filter],
  );

  const count = (id: string) => {
    if (id === "all") return reviews.length;
    if (id === "queue") return queue.length;
    if (id === "unverified") return reviews.filter((r) => !r.verified).length;
    return reviews.filter((r) => r.state === id).length;
  };

  const act = (review: Review, verb: string) => {
    setDone(
      verb === "published"
        ? `"${review.title}" published${review.verified ? ` and ${review.points} points granted.` : " with no points — the purchase is unverified."}`
        : `"${review.title}" rejected. The customer has been told why.`,
    );
    setOpen(null);
  };

  return (
    <AdminPage
      title="Reviews & ratings"
      subtitle={`${queue.length} awaiting moderation · ${meanRating} average across published reviews`}
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
        <StatCard label="Awaiting moderation" value={String(queue.length)} sub="Pending and reported" icon={MessageSquare} tone="promo" />
        <StatCard label="Average rating" value={meanRating} sub={`${avg.length} published reviews`} icon={Star} tone="warning" />
        <StatCard label="Verified purchases" value={`${reviews.filter((r) => r.verified).length} of ${reviews.length}`} sub="Only these can earn points" icon={ShieldCheck} tone="success" />
        <StatCard label="Reported" value={String(reviews.filter((r) => r.state === "reported").length)} sub="Flagged by staff or customers" icon={Flag} tone="destructive" />
      </div>

      <div className="mt-6">
        <Toolbar
          q={q}
          onQ={setQ}
          placeholder="Search by review text, customer or product…"
          filters={filters.map((f) => ({ ...f, count: count(f.id) }))}
          filter={filter}
          onFilter={setFilter}
        />
      </div>

      {rows.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={Search}
            title={filter === "queue" ? "The queue is clear" : "No reviews match"}
            body={
              filter === "queue"
                ? "Every review has been moderated. New ones appear here as customers write them."
                : "Try a different search term or filter."
            }
          />
        </div>
      ) : (
        <div className="mt-5">
          <TableShell>
            <thead>
              <tr>
                <Th>Review</Th>
                <Th>Product</Th>
                <Th>Customer</Th>
                <Th className="text-right">Rating</Th>
                <Th>Purchase</Th>
                <Th>State</Th>
                <Th className="text-right">Action</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const p = getProduct(r.productId);
                const c = getCustomer(r.customerId);
                return (
                  <Tr key={r.id} onClick={() => setOpen(r)}>
                    <Td>
                      <span className="block max-w-[20rem] truncate text-sm font-semibold text-foreground">{r.title}</span>
                      <span className="block text-xs text-muted-foreground">{r.when}</span>
                    </Td>
                    <Td className="max-w-[14rem] truncate text-xs">{p?.name ?? "Removed product"}</Td>
                    <Td className="text-sm">{c ? fullName(c) : "Unknown"}</Td>
                    <Td className="text-right">
                      <Stars n={r.rating} />
                    </Td>
                    <Td>
                      {r.verified ? (
                        <Pill tone="border-success/25 bg-success/10 text-success">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </Pill>
                      ) : (
                        <Pill tone="border-destructive/25 bg-destructive/10 text-destructive">
                          <ShieldAlert className="h-3 w-3" /> Unverified
                        </Pill>
                      )}
                    </Td>
                    <Td>
                      <Pill tone={reviewMeta[r.state].cls}>{reviewMeta[r.state].label}</Pill>
                    </Td>
                    <Td className="text-right">
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setOpen(r); }}>
                        Open
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </TableShell>
        </div>
      )}

      <div className="mt-5">
        <SectionCard title="Why verification matters here" desc="Moderation is also fraud control">
          <p className="max-w-3xl text-sm text-muted-foreground">
            A published review earns 200 loyalty points, which makes writing them worth money. Checking that the reviewer
            actually has a delivered order for that product before publishing is what keeps the points programme from
            being farmed — and keeps the star ratings on the storefront honest.
          </p>
        </SectionCard>
      </div>

      {/* Case panel */}
      <Panel
        open={open !== null}
        onClose={() => setOpen(null)}
        title={open?.title ?? ""}
        subtitle={
          open && (
            <span className="flex flex-wrap items-center gap-2">
              <Stars n={open.rating} />
              <span>· {open.when}</span>
            </span>
          )
        }
        footer={
          open && (open.state === "pending" || open.state === "reported") ? (
            <>
              <Button onClick={() => act(open, "published")}>
                <Check className="h-4 w-4" /> Publish
              </Button>
              <Button variant="outline" onClick={() => act(open, "rejected")}>
                <X className="h-4 w-4" /> Reject
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setOpen(null)}>
              Close
            </Button>
          )
        }
      >
        {open && (
          <div className="space-y-5">
            {!open.verified && (
              <p className="flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-xs font-medium text-destructive">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                No delivered order for this product on this account. Publishing is allowed, but no points may be granted.
              </p>
            )}

            {open.reportReason && (
              <p className="flex items-start gap-2.5 rounded-xl border border-warning/40 bg-warning/15 p-3 text-xs font-medium text-foreground">
                <Flag className="mt-0.5 h-4 w-4 shrink-0" />
                {open.reportReason}
              </p>
            )}

            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="text-sm leading-relaxed text-foreground/85">{open.body}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Detail label="Product">
                <Link to={`/admin/products/${open.productId}/edit`} className="hover:text-primary">
                  {getProduct(open.productId)?.name ?? "Removed"}
                </Link>
              </Detail>
              <Detail label="Customer">
                <Link to={`/admin/customers/${open.customerId}`} className="hover:text-primary">
                  {getCustomer(open.customerId) ? fullName(getCustomer(open.customerId)!) : "Unknown"}
                </Link>
              </Detail>
              <Detail label="Order">
                {open.orderId ? (
                  <Link to={`/admin/orders/${open.orderId}`} className="hover:text-primary">
                    {open.orderId}
                  </Link>
                ) : (
                  "None linked"
                )}
              </Detail>
              <Detail label="Points on publish">{open.verified ? open.points : "None — unverified"}</Detail>
              <Detail label="Found helpful">{open.helpful} times</Detail>
              <Detail label="State">
                <Pill tone={reviewMeta[open.state].cls}>{reviewMeta[open.state].label}</Pill>
              </Detail>
            </div>

            <Field label="Store reply" hint="Published under the review, signed as Nexzon Support.">
              <TextArea
                defaultValue={open.reply ?? ""}
                placeholder="Thanks for the detail — glad it is working out."
              />
            </Field>

            <Note>
              Rejecting a review should always send the customer a reason. A silent rejection is how a shop gets accused
              of hiding bad reviews.
            </Note>
          </div>
        )}
      </Panel>
    </AdminPage>
  );
};

export default Reviews;
