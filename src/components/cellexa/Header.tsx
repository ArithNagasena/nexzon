import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks: { label: string; to: string; badge?: string }[] = [
  { label: "Home", to: "/" },
  { label: "Smartphones", to: "/category/smartphones" },
  { label: "Tablets", to: "/category/tablets" },
  { label: "Accessories", to: "/category/accessories" },
  { label: "Brands", to: "/brand/samsung" },
  { label: "Pre-Orders", to: "/shop" },
  { label: "Track Order", to: "/track-order" },
  { label: "Help", to: "/help" },
];

const Logo = () => (
  <Link to="/" className="flex items-center gap-1.5 select-none" aria-label="Cellexa Home">
    <span className="font-display text-2xl font-extrabold tracking-tight text-foreground">
      Cell<span className="text-primary">exa</span>
    </span>
    
  </Link>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <div className="relative mx-auto max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search for iPhone, Galaxy, AirPods, Xiaomi…"
                className="h-11 w-full rounded-xl border border-border bg-surface pl-11 pr-28 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
              <Button asChild size="sm" className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded-lg px-4">
                <Link to="/shop">Search</Link>
              </Button>
            </div>
          </div>

          {/* Right icons */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
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
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products…"
              className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden h-12 items-center gap-1 border-t border-border/60 lg:flex">
          <Link
            to="/shop"
            className="mr-2 inline-flex items-center gap-2 rounded-lg bg-gradient-hero px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm"
          >
            <Menu className="h-4 w-4" />
            All Categories
            <ChevronDown className="h-4 w-4" />
          </Link>
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            >
              {l.label}
              {l.badge && (
                <span className="rounded-full bg-promo px-1.5 py-0.5 text-[10px] font-bold uppercase text-promo-foreground">
                  {l.badge}
                </span>
              )}
            </Link>
          ))}
          <span className="ml-auto text-sm font-medium text-muted-foreground">
            Hotline: <a href="tel:+94112000000" className="text-primary hover:underline">+94 11 200 0000</a>
          </span>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
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
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                >
                  <span>{l.label}</span>
                  {l.badge && <span className="rounded-full bg-promo px-2 py-0.5 text-[10px] font-bold uppercase text-promo-foreground">{l.badge}</span>}
                </Link>
              ))}
            </nav>
            <div className="mt-6 border-t border-border pt-6">
              <Button className="w-full" size="lg" asChild>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <User className="h-4 w-4" /> Sign In / Register
                </Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Hotline: <a href="tel:+94112000000" className="text-primary">+94 11 200 0000</a>
              </p>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Header;
