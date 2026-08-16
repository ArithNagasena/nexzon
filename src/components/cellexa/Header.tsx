import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown, Phone, GitCompareArrows } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";
import { site } from "@/data/site";

const navLinks: { label: string; to: string; badge?: string }[] = [
  { label: "Home", to: "/" },
  { label: "Smartphones", to: "/category/smartphones" },
  { label: "Tablets", to: "/category/tablets" },
  { label: "Accessories", to: "/category/accessories" },
  { label: "Brands", to: "/brand/samsung" },
  { label: "Pre-Orders", to: "/pre-orders" },
  { label: "Buyback", to: "/buyback", badge: "New" },
  { label: "Track Order", to: "/track-order" },
  { label: "Support", to: "/help" },
];

/* Scope labels must match the category names Shop filters on (see `categories` in Shop.tsx). */
const ALL_SCOPES = "All Categories";
const searchScopes = [ALL_SCOPES, "Smartphones", "Tablets", "Accessories", "Audio", "Gaming"];

const Logo = () => (
  <Link
    to="/"
    className="flex shrink-0 select-none flex-col items-stretch leading-none"
    aria-label="Nexzon Electronics Shop — Home"
  >
    <span className="font-display text-[26px] font-extrabold uppercase tracking-[0.01em] text-foreground sm:text-[30px]">
      Ne<span className="text-primary">x</span>zon
    </span>
    <span className="mt-1 indent-[0.18em] text-center text-[7.5px] font-medium uppercase tracking-[0.36em] text-muted-foreground sm:text-[8.5px]">
      Electronics Shop
    </span>
  </Link>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scope, setScope] = useState(ALL_SCOPES);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (scope !== ALL_SCOPES) params.set("cat", scope);
    const qs = params.toString();
    navigate(qs ? `/shop?${qs}` : "/shop");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-page">
        {/* Top row */}
        <div className="flex h-16 items-center gap-4 lg:h-[72px]">
          <button
            className="lg:hidden -ml-2 inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Logo />

          {/* Search */}
          <div className="ml-2 hidden flex-1 md:block">
            <form
              onSubmit={submitSearch}
              role="search"
              className="relative mx-auto flex max-w-2xl items-center rounded-xl border border-border bg-surface transition-all focus-within:border-primary focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/20"
            >
              <div className="relative shrink-0">
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  aria-label="Search within category"
                  className="h-11 cursor-pointer appearance-none rounded-l-xl bg-transparent pl-4 pr-8 text-sm font-medium text-foreground/80 outline-none"
                >
                  {searchScopes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <span aria-hidden className="h-6 w-px shrink-0 bg-border" />
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for iPhone, Galaxy, AirPods, Xiaomi…"
                  className="h-11 w-full bg-transparent pl-10 pr-28 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button type="submit" size="sm" className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded-lg px-4">
                Search
              </Button>
            </form>
          </div>

          {/* Right icons */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <a
              href={site.phoneHref}
              className="mr-1 hidden items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-secondary xl:inline-flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">
                <Phone className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] text-muted-foreground">Hotline · 7 days</span>
                <span className="block text-sm font-bold text-foreground">{site.phoneDisplay}</span>
              </span>
            </a>
            <Link
              to="/compare"
              className="relative hidden h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary md:inline-flex"
              aria-label="Compare products"
            >
              <GitCompareArrows className="h-5 w-5" />
            </Link>
            <Link to="/account" className="hidden md:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary" aria-label="Account">
              <User className="h-5 w-5" />
              <span className="hidden xl:inline">Account</span>
            </Link>
            <Link to="/account/wishlist" className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-promo px-1 text-[10px] font-bold text-promo-foreground">3</span>
            </Link>
            <Link to="/cart" className="relative inline-flex h-10 items-center gap-2 rounded-lg px-2.5 hover:bg-secondary sm:px-3" aria-label="Cart">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">2</span>
              </div>
              <span className="hidden text-sm font-semibold sm:inline">LKR 0</span>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <form onSubmit={submitSearch} role="search" className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </form>
        </div>

        {/* Desktop nav */}
        <nav className="hidden h-12 items-center gap-0 border-t border-border/60 lg:flex xl:gap-1">
          <MegaMenu />
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "group relative inline-flex h-12 shrink-0 items-center gap-1.5 whitespace-nowrap px-2 text-sm transition-colors xl:px-3",
                  isActive ? "font-semibold text-primary" : "font-medium text-foreground/75 hover:text-primary",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {l.badge && (
                    <span className="rounded-full bg-promo px-1.5 py-0.5 text-[10px] font-bold uppercase text-promo-foreground">
                      {l.badge}
                    </span>
                  )}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-2.5 bottom-0 h-[2px] origin-left rounded-full bg-primary transition-transform duration-200 ease-out",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile drawer — portaled to <body>: the header's backdrop-blur creates a
          containing block, which would otherwise clip this fixed overlay to the header. */}
      {mobileOpen && createPortal(
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-background p-5 shadow-glow animate-fade-up">
            <div className="flex items-center justify-between">
              <Logo />
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-lg border-l-[3px] px-3 py-3 text-base transition-colors",
                      isActive
                        ? "border-primary bg-accent font-semibold text-primary"
                        : "border-transparent font-medium hover:bg-secondary",
                    )
                  }
                >
                  <span>{l.label}</span>
                  {l.badge && <span className="rounded-full bg-promo px-2 py-0.5 text-[10px] font-bold uppercase text-promo-foreground">{l.badge}</span>}
                </NavLink>
              ))}
            </nav>
            <div className="mt-6 border-t border-border pt-6">
              <Button className="w-full" size="lg" asChild>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <User className="h-4 w-4" /> Sign In / Register
                </Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Hotline: <a href={site.phoneHref} className="text-primary">{site.phoneDisplay}</a>
              </p>
            </div>
          </aside>
        </div>,
        document.body,
      )}
    </header>
  );
};

export default Header;
