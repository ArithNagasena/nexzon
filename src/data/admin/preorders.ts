/**
 * Launch campaigns and their reservation queues.
 *
 * Pre-orders hold customer money against stock that does not exist yet, which
 * makes allocation order the thing that matters: units go down the queue in
 * the order reservations were taken, capped by `allocation`, and anything
 * beyond the cap waits for the next shipment.
 */

export type LaunchStage = "coming" | "open" | "limited" | "closed";

export const launchMeta: Record<LaunchStage, { label: string; cls: string }> = {
  coming: { label: "Coming soon", cls: "border-border bg-secondary text-muted-foreground" },
  open: { label: "Open", cls: "border-success/25 bg-success/10 text-success" },
  limited: { label: "Limited", cls: "border-promo/25 bg-promo/10 text-promo" },
  closed: { label: "Closed", cls: "border-border bg-surface-2 text-muted-foreground" },
};

export type Launch = {
  id: string;
  brand: string;
  name: string;
  /** Catalog id used as stand-in imagery — unreleased hardware has no photos. */
  imageFrom: string;
  price: number;
  deposit: number;
  releaseISO: string;
  release: string;
  stage: LaunchStage;
  /** Units this launch may sell before the queue starts waiting. */
  allocation: number;
  bundle?: string;
  specs: string[];
};

export const launches: Launch[] = [
  {
    id: "iphone-18-pro-max", brand: "Apple", name: "iPhone 18 Pro Max 256GB", imageFrom: "iphone-17-pro-max",
    price: 469900, deposit: 25000, releaseISO: "2026-09-18", release: "18 Sep 2026", stage: "open", allocation: 120,
    bundle: "MagSafe charger and 12 months of screen protection, free.",
    specs: ["6.9-inch ProMotion", "A20 Pro chip", "48MP triple camera", "Titanium frame"],
  },
  {
    id: "galaxy-s27-ultra", brand: "Samsung", name: "Galaxy S27 Ultra 512GB", imageFrom: "galaxy-s26-ultra",
    price: 549900, deposit: 30000, releaseISO: "2026-10-02", release: "2 Oct 2026", stage: "limited", allocation: 40,
    bundle: "Trade in any Galaxy and take LKR 40,000 off.",
    specs: ["200MP main sensor", "S Pen built in", "Snapdragon 8 Elite Gen 6"],
  },
  {
    id: "pixel-11-pro", brand: "Google", name: "Pixel 11 Pro", imageFrom: "pixel-10-pro",
    price: 379900, deposit: 20000, releaseISO: "2026-10-14", release: "14 Oct 2026", stage: "open", allocation: 60,
    specs: ["Tensor G6", "Seven years of updates", "50MP with 5x telephoto"],
  },
  {
    id: "apple-watch-series-12", brand: "Apple", name: "Apple Watch Series 12 — 46mm", imageFrom: "apple-watch-series-11",
    price: 205000, deposit: 10000, releaseISO: "2026-09-18", release: "18 Sep 2026", stage: "open", allocation: 80,
    specs: ["Blood pressure sensing", "Brighter always-on display", "Two-day battery"],
  },
  {
    id: "oneplus-15", brand: "OnePlus", name: "OnePlus 15 16GB", imageFrom: "oneplus-13r",
    price: 234900, deposit: 15000, releaseISO: "2026-11-06", release: "6 Nov 2026", stage: "coming", allocation: 50,
    specs: ["7,000mAh battery", "120W SuperVOOC", "Snapdragon 8 Elite Gen 6"],
  },
  {
    id: "galaxy-tab-s12", brand: "Samsung", name: "Galaxy Tab S12 Ultra", imageFrom: "ipad-air-5th-gen",
    price: 289900, deposit: 15000, releaseISO: "2026-08-14", release: "14 Aug 2026", stage: "closed", allocation: 35,
    specs: ["14.6-inch AMOLED", "S Pen included", "Dex desktop mode"],
  },
];

export type Reservation = {
  id: string;
  launchId: string;
  customerId: string;
  /** Position in the queue — lower numbers were taken first. */
  position: number;
  placed: string;
  depositPaid: boolean;
  allocated: boolean;
  variant: string;
};

export const reservations: Reservation[] = [
  { id: "PR-001", launchId: "iphone-18-pro-max", customerId: "c2", position: 1, placed: "2 Aug 2026", depositPaid: true, allocated: true, variant: "256GB · Deep Blue" },
  { id: "PR-002", launchId: "iphone-18-pro-max", customerId: "c1", position: 2, placed: "3 Aug 2026", depositPaid: true, allocated: true, variant: "256GB · Silver" },
  { id: "PR-003", launchId: "iphone-18-pro-max", customerId: "c4", position: 3, placed: "5 Aug 2026", depositPaid: true, allocated: true, variant: "512GB · Cosmic Orange" },
  { id: "PR-004", launchId: "iphone-18-pro-max", customerId: "c7", position: 4, placed: "9 Aug 2026", depositPaid: true, allocated: false, variant: "256GB · Silver" },
  { id: "PR-005", launchId: "iphone-18-pro-max", customerId: "c10", position: 5, placed: "12 Aug 2026", depositPaid: false, allocated: false, variant: "1TB · Deep Blue" },
  { id: "PR-006", launchId: "iphone-18-pro-max", customerId: "c6", position: 6, placed: "16 Aug 2026", depositPaid: true, allocated: false, variant: "256GB · Deep Blue" },
  { id: "PR-007", launchId: "galaxy-s27-ultra", customerId: "c12", position: 1, placed: "6 Aug 2026", depositPaid: true, allocated: true, variant: "512GB · Titanium Black" },
  { id: "PR-008", launchId: "galaxy-s27-ultra", customerId: "c9", position: 2, placed: "11 Aug 2026", depositPaid: true, allocated: true, variant: "512GB · Titanium Grey" },
  { id: "PR-009", launchId: "galaxy-s27-ultra", customerId: "c3", position: 3, placed: "18 Aug 2026", depositPaid: true, allocated: false, variant: "1TB · Titanium Black" },
  { id: "PR-010", launchId: "pixel-11-pro", customerId: "c10", position: 1, placed: "14 Aug 2026", depositPaid: true, allocated: true, variant: "256GB" },
  { id: "PR-011", launchId: "pixel-11-pro", customerId: "c5", position: 2, placed: "17 Aug 2026", depositPaid: false, allocated: false, variant: "256GB" },
  { id: "PR-012", launchId: "apple-watch-series-12", customerId: "c1", position: 1, placed: "10 Aug 2026", depositPaid: true, allocated: true, variant: "46mm · Midnight" },
  { id: "PR-013", launchId: "apple-watch-series-12", customerId: "c7", position: 2, placed: "15 Aug 2026", depositPaid: true, allocated: true, variant: "46mm · Silver" },
  { id: "PR-014", launchId: "galaxy-tab-s12", customerId: "c2", position: 1, placed: "22 Jul 2026", depositPaid: true, allocated: true, variant: "512GB" },
];

export const getLaunch = (id?: string) => launches.find((l) => l.id === id);

export const queueFor = (launchId: string) =>
  reservations.filter((r) => r.launchId === launchId).sort((a, b) => a.position - b.position);

export const reservedCount = (launchId: string) => queueFor(launchId).length;

/** Money we are holding for a launch that has not shipped. */
export const depositsHeld = (launchId: string) => {
  const l = getLaunch(launchId);
  if (!l) return 0;
  return queueFor(launchId).filter((r) => r.depositPaid).length * l.deposit;
};

export const totalDepositsHeld = () =>
  launches.filter((l) => l.stage !== "closed").reduce((sum, l) => sum + depositsHeld(l.id), 0);

export const daysToRelease = (iso: string, from = new Date("2026-08-20")) =>
  Math.round((new Date(iso).getTime() - from.getTime()) / 86400000);
