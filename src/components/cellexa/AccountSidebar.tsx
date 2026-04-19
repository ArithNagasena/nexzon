import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  MapPin,
  Package,
  Truck,
  Heart,
  Star,
  Bell,
  Gift,
  TrendingDown,
  Boxes,
  Undo2,
  ShieldCheck,
  Repeat,
  LogOut,
  Crown,
} from "lucide-react";

type NavItem = {
  label: string;
  icon: typeof User;
  to: string;
  badge?: string;
};

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, to: "/account" },
      { label: "Profile", icon: User, to: "/account/profile" },
      { label: "Addresses", icon: MapPin, to: "/account/profile" },
    ],
  },
  {
    title: "Shopping",
    items: [
      { label: "Orders", icon: Package, to: "/account/orders", badge: "3" },
      { label: "Order Tracking", icon: Truck, to: "/track-order" },
      { label: "Wishlist", icon: Heart, to: "/account/wishlist", badge: "12" },
      { label: "Reviews", icon: Star, to: "/account/reviews" },
    ],
  },
  {
    title: "Alerts & Rewards",
    items: [
      { label: "Notifications", icon: Bell, to: "/account/notifications", badge: "5" },
      { label: "Loyalty & Rewards", icon: Gift, to: "/account/rewards" },
      { label: "Price Alerts", icon: TrendingDown, to: "/account/price-alerts" },
      { label: "Back-in-Stock", icon: Boxes, to: "/account/back-in-stock" },
    ],
  },
  {
    title: "Service",
    items: [
      { label: "Returns & Refunds", icon: Undo2, to: "/account/returns" },
      { label: "Warranty & Claims", icon: ShieldCheck, to: "/account/warranty" },
      { label: "Trade-In Requests", icon: Repeat, to: "/account" },
    ],
  },
];

interface AccountSidebarNavProps {
  onNavigate?: () => void;
  activePath?: string;
}

export const AccountSidebarNav = ({ onNavigate, activePath }: AccountSidebarNavProps) => {
  const location = useLocation();
  const current = activePath ?? location.pathname;

  return (
    <nav className="space-y-6">
      {navGroups.map((group) => (
        <div key={group.title}>
          <p className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </p>
          <ul className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const active = item.to === current;
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="border-t border-border pt-4">
        <Link
          to="/login"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Link>
      </div>
    </nav>
  );
};

export const AccountProfileCard = () => (
  <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-hero font-display text-base font-bold text-primary-foreground">
        NP
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-bold text-foreground">Nuwan Perera</div>
        <div className="truncate text-xs text-muted-foreground">nuwan@example.lk</div>
      </div>
    </div>
    <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-gradient-brand-soft px-3 py-2 text-xs font-bold text-primary">
      <Crown className="h-3.5 w-3.5" />
      Gold Member · 2,480 pts
    </div>
  </div>
);
