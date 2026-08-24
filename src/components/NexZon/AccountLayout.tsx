import { Link, NavLink } from "react-router-dom";
import {
  ChevronRight,
  LayoutDashboard,
  User,
  Package,
  Truck,
  Heart,
  Star,
  Bell,
  Gift,
  TrendingDown,
  Undo2,
  ShieldCheck,
  Repeat,
  LogOut,
  Crown,
} from "lucide-react";
import Header from "@/components/NexZon/Header";
import Footer from "@/components/NexZon/Footer";
import { customer, notifications, orders } from "@/data/account";
import { cn } from "@/lib/utils";

const unread = notifications.filter((n) => n.unread).length;
const openOrders = orders.filter((o) => o.status === "in-transit" || o.status === "processing").length;

const nav = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, to: "/account", end: true },
      { label: "Profile & addresses", icon: User, to: "/account/profile" },
    ],
  },
  {
    group: "Shopping",
    items: [
      { label: "Orders", icon: Package, to: "/account/orders", badge: openOrders || undefined },
      { label: "Track a delivery", icon: Truck, to: "/track-order" },
      { label: "Wishlist", icon: Heart, to: "/account/wishlist" },
      { label: "My reviews", icon: Star, to: "/account/reviews" },
    ],
  },
  {
    group: "Alerts & rewards",
    items: [
      { label: "Notifications", icon: Bell, to: "/account/notifications", badge: unread || undefined },
      { label: "Rewards", icon: Gift, to: "/account/rewards" },
      { label: "Price alerts", icon: TrendingDown, to: "/account/price-alerts" },
    ],
  },
  {
    group: "After-sales",
    items: [
      { label: "Returns & refunds", icon: Undo2, to: "/account/returns" },
      { label: "Warranty & repairs", icon: ShieldCheck, to: "/account/warranty" },
      { label: "Trade-in", icon: Repeat, to: "/account/trade-in" },
    ],
  },
];

type Props = {
  title: string;
  subtitle?: React.ReactNode;
  /** Rendered on the right of the page heading — filters, primary actions. */
  actions?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Shared shell for the account area: an identity card and grouped navigation
 * in a sticky rail, with the page content beside it.
 */
const AccountLayout = ({ title, subtitle, actions, children }: Props) => (
  <div className="min-h-screen bg-surface">
    <Header />

    <main>
      <div className="container-page pt-5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/account" className="hover:text-primary">My account</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{title}</span>
        </nav>
      </div>

      <div className="container-page grid grid-cols-1 gap-6 py-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-8 lg:py-8">
        {/* Rail */}
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="bg-gradient-deep p-5 text-primary-foreground">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/20 font-display text-base font-extrabold backdrop-blur">
                  {customer.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-base font-bold">{customer.fullName}</span>
                  <span className="block truncate text-xs text-white/70">{customer.email}</span>
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3 py-2 backdrop-blur">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold">
                  <Crown className="h-3.5 w-3.5 text-warning" /> {customer.tier} member
                </span>
                <span className="text-xs font-bold tabular-nums">{customer.points.toLocaleString()} pts</span>
              </div>
            </div>

            <div className="p-3">
              {nav.map((g) => (
                <div key={g.group} className="mb-3 last:mb-0">
                  <p className="px-3 pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {g.group}
                  </p>
                  <ul>
                    {g.items.map((i) => (
                      <li key={i.label}>
                        <NavLink
                          to={i.to}
                          end={"end" in i ? (i.end as boolean) : false}
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
                          {"badge" in i && i.badge ? (
                            <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-promo px-1.5 text-[10px] font-bold text-promo-foreground">
                              {i.badge}
                            </span>
                          ) : null}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mt-2 border-t border-border pt-2">
                <Link
                  to="/login"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{title}</h1>
              {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>

          {children}
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default AccountLayout;
