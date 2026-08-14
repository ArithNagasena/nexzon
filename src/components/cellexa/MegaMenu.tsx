import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  Smartphone,
  Tablet,
  Headphones,
  Gamepad2,
  Cable,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* Slugs below must stay in sync with the titleMap in Category.tsx
   and the brandRegistry in Brand.tsx — both fall back silently otherwise. */
const categories = [
  { name: "Smartphones", slug: "smartphones", icon: Smartphone, blurb: "240+ models" },
  { name: "Tablets", slug: "tablets", icon: Tablet, blurb: "60+ models" },
  { name: "Audio", slug: "audio", icon: Headphones, blurb: "180+ products" },
  { name: "Gaming", slug: "gaming", icon: Gamepad2, blurb: "120+ products" },
  { name: "Accessories", slug: "accessories", icon: Cable, blurb: "500+ items" },
];

const brands = [
  { name: "Apple", slug: "apple" },
  { name: "Samsung", slug: "samsung" },
  { name: "Xiaomi", slug: "xiaomi" },
  { name: "OnePlus", slug: "oneplus" },
  { name: "Sony", slug: "sony" },
  { name: "JBL", slug: "jbl" },
  { name: "ASUS", slug: "asus" },
  { name: "Logitech", slug: "logitech" },
  { name: "Bose", slug: "bose" },
  { name: "Anker", slug: "anker" },
];

const MegaMenu = () => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>();

  // Hover intent: a short grace period so the pointer can cross the gap
  // between the trigger and the panel without the menu snapping shut.
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };
  const cancelClose = () => window.clearTimeout(closeTimer.current);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="group mr-3 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-gradient-hero px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-shadow hover:shadow-lift xl:px-4"
      >
        <Menu className="h-4 w-4" />
        All Categories
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 w-[min(56rem,calc(100vw-3rem))] origin-top-left animate-fade-up rounded-2xl border border-border bg-background p-5 shadow-glow"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="grid gap-6 md:grid-cols-12">
            {/* Categories */}
            <div className="md:col-span-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Shop by Category</p>
              <ul className="space-y-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/category/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="group/item flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-secondary"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-foreground">{c.name}</span>
                        <span className="block text-xs text-muted-foreground">{c.blurb}</span>
                      </span>
                      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/item:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div className="md:col-span-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Top Brands</p>
              <div className="grid grid-cols-2 content-start gap-1.5">
                {brands.map((b) => (
                  <Link
                    key={b.slug}
                    to={`/brand/${b.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                View all products <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Promo */}
            <div className="md:col-span-3">
              <Link
                to="/pre-orders"
                onClick={() => setOpen(false)}
                className="flex h-full flex-col justify-between rounded-xl bg-gradient-deep p-4 text-primary-foreground transition-shadow hover:shadow-glow"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-background/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                  <Sparkles className="h-3 w-3" /> Pre-Order
                </span>
                <span className="mt-4 block font-display text-lg font-bold leading-tight">
                  Latest launches, reserved for you
                </span>
                <span className="mt-1 block text-xs text-primary-foreground/80">
                  Secure the newest flagships before they land in Sri Lanka.
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Reserve now <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
