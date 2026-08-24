import { Star, BadgeCheck, ThumbsUp, Truck, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileReveal from "./MobileReveal";

type Review = {
  name: string;
  role: string;
  rating: number;
  product: string;
  when: string;
  text: string;
};

const reviews: Review[] = [
  {
    name: "Arith Nagasena",
    role: "Civil Engineer · Kandy",
    rating: 5,
    product: "Galaxy S26+ 512GB",
    when: "2 weeks ago",
    text: "Ordered on a Friday evening and it reached Kandy by Monday morning, sealed with the Sri Lanka warranty card inside. Setting up the 0% installment plan through my bank took about two minutes.",
  },
  {
    name: "Fathima Rizwan",
    role: "Dental Surgeon · Colombo",
    rating: 5,
    product: "AirPods Pro 3",
    when: "1 month ago",
    text: "I was wary of buying online, so I chose cash on delivery. The courier waited while I opened and checked the box before I paid. Genuine, and cheaper than the shop near my clinic.",
  },
  {
    name: "Arjun Sivalingam",
    role: "Content Creator · Jaffna",
    rating: 5,
    product: "iPhone Air 256GB",
    when: "3 weeks ago",
    text: "Traded in my old Pixel and put the credit straight towards a pre-order. They kept me updated on the release date and shipped it the day stock landed — no chasing anyone for answers.",
  },
  {
    name: "Dilani Wickramasinghe",
    role: "School Teacher · Negombo",
    rating: 5,
    product: "iPhone 17e 128GB",
    when: "1 week ago",
    text: "The screen developed a fault in month four. I filled the warranty form on Sunday, a pickup was arranged Tuesday, and the repaired phone came back within nine days. No argument, no extra charge.",
  },
  {
    name: "Mohamed Aslam",
    role: "Restaurant Owner · Galle",
    rating: 4,
    product: "Galaxy Tab · 4 units",
    when: "2 months ago",
    text: "Bought four tablets for our order counters and they handled the invoice and VAT paperwork properly. Delivery took a day longer than quoted, but they called ahead to tell me rather than leaving me guessing.",
  },
  {
    name: "Sanduni Perera",
    role: "Undergraduate · Peradeniya",
    rating: 5,
    product: "OnePlus 13R 16GB",
    when: "5 days ago",
    text: "On a student budget the 12-month installment split made this possible at all. Prices matched what was advertised — nothing extra appeared at checkout.",
  },
];

const breakdown = [
  { stars: 5, pct: 86 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

const stats = [
  { icon: ThumbsUp, value: "97%", label: "Would buy again" },
  { icon: Truck, value: "24h", label: "Average dispatch" },
  { icon: ShieldCheck, value: "100%", label: "Genuine stock" },
];

const Stars = ({ n, className }: { n: number; className?: string }) => (
  <div className={cn("flex items-center gap-0.5", className)} aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        aria-hidden
        className={cn("h-4 w-4", i < n ? "fill-warning text-warning" : "fill-muted text-muted")}
      />
    ))}
  </div>
);

const Testimonials = () => (
  <section className="bg-surface section-y">
    <div className="container-page">
      <div className="grid gap-6 lg:grid-cols-[20rem_1fr] lg:gap-10">
        {/* Rating summary */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Customer reviews
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
            Rated 4.8 by
            <br />
            Sri Lankan shoppers
          </h2>

          <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-card sm:mt-6 sm:p-6">
            <div className="flex items-end gap-3">
              <span className="font-display text-5xl font-extrabold leading-none text-foreground">4.8</span>
              <div className="pb-1">
                <Stars n={5} />
                <p className="mt-1 text-xs text-muted-foreground">12,480 verified reviews</p>
              </div>
            </div>

            {/* The full five-bar histogram is detail for a desktop reader; a phone
                gets the score, the stars and the review count above it. */}
            <ul className="mt-5 hidden space-y-2 sm:block">
              {breakdown.map((b) => (
                <li key={b.stars} className="flex items-center gap-2.5">
                  <span className="w-8 shrink-0 text-xs font-medium text-muted-foreground">{b.stars}★</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <span className="block h-full rounded-full bg-warning" style={{ width: `${b.pct}%` }} />
                  </span>
                  <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                    {b.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center shadow-soft">
                <s.icon className="mx-auto h-4 w-4 text-primary" />
                <dt className="mt-1.5 font-display text-lg font-extrabold leading-none text-foreground">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[10px] leading-tight text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Reviews — six long quotes is most of a phone screen each, so start at two. */}
        <MobileReveal
          initial={2}
          breakpoint="sm"
          moreLabel="Read more reviews"
          className="grid gap-4 sm:grid-cols-2"
        >
          {reviews.map((r) => (
            <article
              key={r.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <Stars n={r.rating} />
                <span className="text-xs text-muted-foreground">{r.when}</span>
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">{r.text}</p>

              <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified purchase · {r.product}
              </p>

              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-hero text-xs font-bold text-primary-foreground">
                  {r.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">{r.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </article>
          ))}
        </MobileReveal>
      </div>
    </div>
  </section>
);

export default Testimonials;
