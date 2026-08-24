/**
 * Promotion rules, coupon codes and the homepage flash-deal slots.
 *
 * The storefront currently hard-codes `oldPrice` and badge labels on each
 * product, which means an expired campaign leaves a struck-through price up
 * for good. These rules are what should derive those instead.
 */

export type PromoKind = "percent" | "fixed" | "bundle" | "delivery";
export type PromoState = "active" | "scheduled" | "expired" | "paused";

export const promoKindMeta: Record<PromoKind, string> = {
  percent: "Percentage off",
  fixed: "Fixed amount off",
  bundle: "Bundle offer",
  delivery: "Free delivery",
};

export const promoStateMeta: Record<PromoState, { label: string; cls: string }> = {
  active: { label: "Active", cls: "border-success/25 bg-success/10 text-success" },
  scheduled: { label: "Scheduled", cls: "border-primary/25 bg-accent text-accent-foreground" },
  paused: { label: "Paused", cls: "border-warning/40 bg-warning/15 text-foreground" },
  expired: { label: "Expired", cls: "border-border bg-secondary text-muted-foreground" },
};

export type Promotion = {
  id: string;
  name: string;
  kind: PromoKind;
  /** Percent for `percent`, rupees for `fixed` and `delivery` thresholds. */
  value: number;
  scope: string;
  state: PromoState;
  starts: string;
  ends: string;
  /** Orders that used the rule, and the revenue on those orders. */
  uses: number;
  revenue: number;
  budgetCap?: number;
  stacks: boolean;
};

export const promotions: Promotion[] = [
  { id: "PM-01", name: "Avurudu Flagship Week", kind: "percent", value: 8, scope: "Smartphones over LKR 300,000", state: "active", starts: "14 Aug 2026", ends: "24 Aug 2026", uses: 34, revenue: 12480000, budgetCap: 1500000, stacks: false },
  { id: "PM-02", name: "AirPods with any iPhone", kind: "bundle", value: 20000, scope: "Apple smartphones", state: "active", starts: "1 Aug 2026", ends: "30 Sep 2026", uses: 21, revenue: 7320000, stacks: true },
  { id: "PM-03", name: "Free islandwide delivery", kind: "delivery", value: 25000, scope: "All orders over LKR 25,000", state: "active", starts: "1 Jan 2026", ends: "31 Dec 2026", uses: 412, revenue: 0, stacks: true },
  { id: "PM-04", name: "Launch week — iPhone 18", kind: "fixed", value: 15000, scope: "Pre-order campaign iphone-18-pro-max", state: "scheduled", starts: "18 Sep 2026", ends: "28 Sep 2026", uses: 0, revenue: 0, budgetCap: 1800000, stacks: false },
  { id: "PM-05", name: "Gaming weekend", kind: "percent", value: 12, scope: "Gaming category", state: "paused", starts: "8 Aug 2026", ends: "10 Aug 2026", uses: 9, revenue: 1746000, stacks: false },
  { id: "PM-06", name: "Poson audio sale", kind: "percent", value: 15, scope: "Audio category", state: "expired", starts: "5 Jun 2026", ends: "12 Jun 2026", uses: 63, revenue: 5890000, stacks: false },
  { id: "PM-07", name: "Gold and Platinum early access", kind: "fixed", value: 10000, scope: "Loyalty tier Gold and above", state: "active", starts: "1 Jul 2026", ends: "31 Aug 2026", uses: 18, revenue: 4110000, stacks: true },
];

export type Coupon = {
  code: string;
  promoId: string;
  discount: string;
  perCustomer: number;
  total: number;
  used: number;
  expires: string;
  active: boolean;
};

export const coupons: Coupon[] = [
  { code: "NEXZON10", promoId: "PM-01", discount: "10% off, max LKR 40,000", perCustomer: 1, total: 500, used: 214, expires: "24 Aug 2026", active: true },
  { code: "WELCOME5K", promoId: "PM-04", discount: "LKR 5,000 off first order", perCustomer: 1, total: 1000, used: 386, expires: "31 Dec 2026", active: true },
  { code: "TRADEUP", promoId: "PM-02", discount: "LKR 20,000 off with trade-in", perCustomer: 2, total: 200, used: 47, expires: "30 Sep 2026", active: true },
  { code: "GAMEON12", promoId: "PM-05", discount: "12% off gaming", perCustomer: 1, total: 300, used: 9, expires: "10 Aug 2026", active: false },
  { code: "POSON15", promoId: "PM-06", discount: "15% off audio", perCustomer: 1, total: 400, used: 63, expires: "12 Jun 2026", active: false },
];

export type FlashDeal = {
  id: string;
  productId: string;
  dealPrice: number;
  startsISO: string;
  endsISO: string;
  window: string;
  unitCap: number;
  sold: number;
  live: boolean;
};

export const flashDeals: FlashDeal[] = [
  { id: "FD-1", productId: "airpods-max", dealPrice: 159000, startsISO: "2026-08-20T09:00", endsISO: "2026-08-20T21:00", window: "Today, 9 AM – 9 PM", unitCap: 20, sold: 14, live: true },
  { id: "FD-2", productId: "meta-quest-3", dealPrice: 179000, startsISO: "2026-08-20T09:00", endsISO: "2026-08-21T21:00", window: "20–21 Aug", unitCap: 15, sold: 6, live: true },
  { id: "FD-3", productId: "nintendo-switch", dealPrice: 92000, startsISO: "2026-08-22T09:00", endsISO: "2026-08-24T21:00", window: "22–24 Aug", unitCap: 25, sold: 0, live: false },
  { id: "FD-4", productId: "ipad-air-5th-gen", dealPrice: 152000, startsISO: "2026-08-25T09:00", endsISO: "2026-08-27T21:00", window: "25–27 Aug", unitCap: 12, sold: 0, live: false },
];

export const promoRevenue = () => promotions.reduce((sum, p) => sum + p.revenue, 0);
