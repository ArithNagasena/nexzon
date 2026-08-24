/**
 * Shell for every page under /admin.
 *
 * Rendered once as a parent route element with an <Outlet/> inside, so the
 * sidebar keeps its scroll position and does not remount as staff move between
 * pages. The storefront Header, Footer, promo bar and chatbot are deliberately
 * absent — this is a back office, not a shop.
 */
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Warehouse,
  ShoppingCart,
  Truck,
  Users,
  CalendarClock,
  Ticket,
  Star,
  LifeBuoy,
  LayoutTemplate,
  Settings,
  LogOut,
  Menu,
  X,
  Store,
  ChevronRight,
} from "lucide-react";
import { currentSession, signOut } from "@/data/admin/auth";
import { can } from "@/data/admin/staff";
import { orders } from "@/data/admin/orders";
import { pending } from "@/data/admin/reviews";
import { returnCases, warrantyClaims, tradeIns } from "@/data/admin/service";
import { cn } from "@/lib/utils";

/** Orders that need someone to do something today. */
const actionableOrders = () =>
  orders.filter((o) => o.stage === "pending" || o.stage === "processing" || o.stage === "packed").length;

const openServiceCases = () =>
  returnCases.filter((r) => r.stage === "requested" || r.stage === "approved").length +
  warrantyClaims.filter((c) => c.stage !== "returned").length +
  tradeIns.filter((t) => t.stage !== "credited").length;

const nav = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", icon: LayoutDashboard, to: "/admin", area: "dashboard", end: true }],
  },
  {
    group: "Catalog",
    items: [
      { label: "Products", icon: Boxes, to: "/admin/products", area: "products" },
      { label: "Inventory", icon: Warehouse, to: "/admin/inventory", area: "inventory" },
    ],
  },
  {
    group: "Sales",
    items: [
      { label: "Orders", icon: ShoppingCart, to: "/admin/orders", area: "orders", badge: actionableOrders },
      { label: "Delivery & payments", icon: Truck, to: "/admin/fulfilment", area: "fulfilment" },
      { label: "Customers", icon: Users, to: "/admin/customers", area: "customers" },
    ],
  },
  {
    group: "Growth",
    items: [
      { label: "Pre-orders", icon: CalendarClock, to: "/admin/pre-orders", area: "pre-orders" },
      { label: "Promotions", icon: Ticket, to: "/admin/promotions", area: "promotions" },
      { label: "Reviews", icon: Star, to: "/admin/reviews", area: "reviews", badge: () => pending().length },
    ],
  },
  {
    group: "Service",
    items: [{ label: "Service desk", icon: LifeBuoy, to: "/admin/service", area: "service", badge: openServiceCases }],
  },
  {
    group: "Store",
    items: [
      { label: "Content", icon: LayoutTemplate, to: "/admin/content", area: "content" },
      { label: "Settings", icon: Settings, to: "/admin/settings", area: "settings" },
    ],
  },
];

const Wordmark = () => (
  <Link to="/admin" className="flex select-none flex-col items-stretch leading-none" aria-label="Nexzon admin console">
    <span className="font-display text-[22px] font-extrabold uppercase tracking-[0.01em] text-primary-foreground">
      Ne<span className="text-warning">x</span>zon
    </span>
    <span className="mt-1 indent-[0.18em] text-center text-[7.5px] font-medium uppercase tracking-[0.36em] text-primary-foreground/60">
      Admin Console
    </span>
  </Link>
);

const SidebarBody = ({ onNavigate }: { onNavigate?: () => void }) => {
  const me = currentSession();
  const role = me?.role ?? "Support";

  return (
    <div className="flex h-full flex-col">
      <div className="bg-gradient-deep px-5 py-4">
        <Wordmark />
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto p-3">
        {nav.map((g) => {
          const items = g.items.filter((i) => can(role, i.area));
          if (!items.length) return null;

          return (
            <div key={g.group} className="mb-3 last:mb-0">
              <p className="px-3 pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {g.group}
              </p>
              <ul>
                {items.map((i) => {
                  const count = "badge" in i && i.badge ? i.badge() : 0;
                  return (
                    <li key={i.label}>
                      <NavLink
                        to={i.to}
                        end={"end" in i ? (i.end as boolean) : false}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-accent font-semibold text-accent-foreground"
                              : "font-medium text-foreground/75 hover:bg-secondary hover:text-primary",
                          )
                        }
                      >
                        <i.icon className="h-4 w-4 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{i.label}</span>
                        {count > 0 && (
                          <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-promo px-1.5 text-[10px] font-bold tabular-nums text-promo-foreground">
                            {count}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
        >
          <Store className="h-4 w-4" /> View the storefront
        </Link>
      </div>
    </div>
  );
};

/**
 * Page frame. Every admin page renders inside this and passes its own heading
 * through, which keeps the title, breadcrumb and action row consistent.
 */
export const AdminPage = ({
  title,
  subtitle,
  actions,
  breadcrumb,
  children,
}: {
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumb?: { label: string; to: string }[];
  children: React.ReactNode;
}) => {
  useEffect(() => {
    document.title = `${title} — Nexzon Admin`;
  }, [title]);

  return (
    <>
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground">
          {breadcrumb.map((b) => (
            <span key={b.to} className="flex items-center gap-1.5">
              <Link to={b.to} className="hover:text-primary">
                {b.label}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          ))}
          <span className="text-foreground">{title}</span>
        </nav>
      )}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>

      {children}
    </>
  );
};

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const me = currentSession();

  const handleSignOut = () => {
    signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card lg:block">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border bg-card shadow-lift">
            <SidebarBody onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{me?.name ?? "Signed out"}</span>
              <span className="hidden sm:inline"> · {me?.role}</span>
            </p>

            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-deep font-display text-xs font-extrabold text-primary-foreground">
              {me?.initials ?? "—"}
            </span>

            <button
              type="button"
              onClick={handleSignOut}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[100rem] px-4 py-6 sm:px-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
