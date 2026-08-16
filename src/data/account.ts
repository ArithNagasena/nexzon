/**
 * Signed-in customer data, shared by every page under /account.
 *
 * Previously each page invented its own copy of the customer (and its own
 * order numbers), so the dashboard, profile and orders list disagreed with
 * one another. Everything reads from here now.
 */

export const customer = {
  firstName: "Chamodi",
  lastName: "Wijesinghe",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  initials: "CW",
  email: "chamodi.w@gmail.com",
  phone: "+94 77 812 4590",
  memberSince: "March 2024",
  tier: "Gold",
  nextTier: "Platinum",
  points: 4820,
  pointsToNextTier: 1180,
  birthday: "14 June",
  nic: "9 4 8 6 1 2 3 4 5 V",
};

export const addresses = [
  {
    id: "home",
    label: "Home",
    isDefault: true,
    name: customer.fullName,
    street: "No. 58/4, Horton Place",
    city: "Colombo 07",
    district: "Colombo",
    postcode: "00700",
    phone: customer.phone,
  },
  {
    id: "office",
    label: "Office",
    isDefault: false,
    name: customer.fullName,
    street: "Level 12, Access Towers, Union Place",
    city: "Colombo 02",
    district: "Colombo",
    postcode: "00200",
    phone: "+94 11 476 2200",
  },
];

export type OrderStatus = "delivered" | "in-transit" | "processing" | "cancelled";

export type AccountOrder = {
  id: string;
  placed: string;
  placedISO: string;
  status: OrderStatus;
  total: number;
  itemIds: { id: string; qty: number }[];
  courier?: string;
  tracking?: string;
  eta?: string;
  deliveredOn?: string;
};

export const orders: AccountOrder[] = [
  {
    id: "NX-260812-7734",
    placed: "12 Aug 2026",
    placedISO: "2026-08-12",
    status: "in-transit",
    total: 429000,
    itemIds: [{ id: "iphone-17-pro-max", qty: 1 }],
    courier: "Pronto Express",
    tracking: "PRX884512006",
    eta: "17–19 Aug 2026",
  },
  {
    id: "NX-260729-6180",
    placed: "29 Jul 2026",
    placedISO: "2026-07-29",
    status: "processing",
    total: 284900,
    itemIds: [
      { id: "airpods-pro-3", qty: 1 },
      { id: "apple-watch-series-11", qty: 1 },
    ],
    eta: "Awaiting stock confirmation",
  },
  {
    id: "NX-260614-5023",
    placed: "14 Jun 2026",
    placedISO: "2026-06-14",
    status: "delivered",
    total: 204900,
    itemIds: [{ id: "oneplus-13r", qty: 1 }],
    courier: "Pronto Express",
    tracking: "PRX771230884",
    deliveredOn: "17 Jun 2026",
  },
  {
    id: "NX-260503-4471",
    placed: "3 May 2026",
    placedISO: "2026-05-03",
    status: "delivered",
    total: 165000,
    itemIds: [{ id: "ipad-air-5th-gen", qty: 1 }],
    courier: "Domex",
    tracking: "DMX220914773",
    deliveredOn: "6 May 2026",
  },
  {
    id: "NX-260218-3129",
    placed: "18 Feb 2026",
    placedISO: "2026-02-18",
    status: "cancelled",
    total: 99000,
    itemIds: [{ id: "nintendo-switch", qty: 1 }],
  },
];

export const statusMeta: Record<OrderStatus, { label: string; cls: string; dot: string }> = {
  delivered: { label: "Delivered", cls: "border-success/25 bg-success/10 text-success", dot: "bg-success" },
  "in-transit": { label: "In transit", cls: "border-primary/25 bg-accent text-accent-foreground", dot: "bg-primary" },
  processing: { label: "Processing", cls: "border-promo/25 bg-promo/10 text-promo", dot: "bg-promo" },
  cancelled: { label: "Cancelled", cls: "border-border bg-secondary text-muted-foreground", dot: "bg-muted-foreground" },
};

export type Notification = {
  id: string;
  kind: "order" | "price" | "stock" | "reward" | "account";
  title: string;
  body: string;
  when: string;
  unread: boolean;
  to?: string;
};

export const notifications: Notification[] = [
  { id: "n1", kind: "order", title: "Your iPhone 17 Pro Max has left the warehouse", body: "Pronto Express picked up NX-260812-7734 this morning. Track it for live updates.", when: "2 hours ago", unread: true, to: "/track-order" },
  { id: "n2", kind: "price", title: "Price drop on your wishlist", body: "Google Pixel 10 Pro is now LKR 349,900 — down LKR 30,000 from when you saved it.", when: "Yesterday", unread: true, to: "/product/pixel-10-pro" },
  { id: "n3", kind: "reward", title: "You earned 4,290 points", body: "Points from order NX-260812-7734 have landed. You're 1,180 from Platinum.", when: "2 days ago", unread: true, to: "/account/rewards" },
  { id: "n4", kind: "stock", title: "Back in stock: Galaxy Z Flip 7", body: "The Coral colourway you asked about is available again.", when: "4 days ago", unread: false, to: "/product/galaxy-z-flip-7" },
  { id: "n5", kind: "order", title: "Order NX-260614-5023 delivered", body: "Signed for at Horton Place on 17 June. Leave a review to earn 200 points.", when: "2 months ago", unread: false, to: "/account/reviews" },
  { id: "n6", kind: "account", title: "New sign-in from Chrome on Windows", body: "Colombo, Sri Lanka · 15 Aug, 9:04 AM. Not you? Change your password.", when: "Today", unread: false, to: "/account/profile" },
];

export const rewardTiers = [
  { name: "Bronze", from: 0, perks: ["1 point per LKR 100", "Birthday voucher"] },
  { name: "Silver", from: 2000, perks: ["1.25 points per LKR 100", "Free delivery always"] },
  { name: "Gold", from: 4000, perks: ["1.5 points per LKR 100", "Priority support line", "Extended 14-day returns"] },
  { name: "Platinum", from: 6000, perks: ["2 points per LKR 100", "Free Nexzon Care for a year", "Launch-day pre-order priority"] },
];

export const pointsLedger = [
  { id: "p1", label: "Order NX-260812-7734", detail: "iPhone 17 Pro Max", points: 4290, when: "12 Aug 2026" },
  { id: "p2", label: "Review published", detail: "OnePlus 13R", points: 200, when: "24 Jun 2026" },
  { id: "p3", label: "Redeemed LKR 2,000 voucher", detail: "Applied to NX-260614-5023", points: -2000, when: "14 Jun 2026" },
  { id: "p4", label: "Order NX-260614-5023", detail: "OnePlus 13R", points: 2049, when: "14 Jun 2026" },
  { id: "p5", label: "Referred a friend", detail: "Sanduni P. joined", points: 500, when: "2 May 2026" },
];

export const myReviews = [
  { id: "r1", productId: "oneplus-13r", rating: 5, title: "Battery genuinely lasts two days", body: "Coming from an older phone the 6,000mAh cell is a revelation — I charge it every other night. The 100W charger fills it while I shower.", when: "24 Jun 2026", helpful: 34, published: true },
  { id: "r2", productId: "ipad-air-5th-gen", rating: 4, title: "Great for note-taking, average speakers", body: "Handles PDFs and Procreate without complaint. The speakers are fine for video calls but not for music.", when: "9 May 2026", helpful: 12, published: true },
];

export const pendingReviews = [
  { productId: "iphone-17-pro-max", orderId: "NX-260812-7734", points: 200 },
  { productId: "apple-watch-series-11", orderId: "NX-260729-6180", points: 200 },
];
