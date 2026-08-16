import type { CatalogItem } from "@/data/catalog";

/**
 * Guaranteed Buyback — the residual-value model behind the "real cost" figures.
 *
 * Retention rates are anchored to the quotes already used on the trade-in page:
 * an iPhone 14 Pro 256GB is valued at LKR 168,000 there against a launch price
 * near LKR 430,000, i.e. roughly 39% after about two years. Apple holds value
 * best, Android flagships less, mid-range least.
 */

export const TERMS = [12, 24, 36] as const;
export type Term = (typeof TERMS)[number];

/** Minimum price for a device to qualify — below this the admin cost isn't worth it. */
export const MIN_PRICE = 150000;

type Curve = Record<Term, number>;

const curves: Record<string, Curve> = {
  apple: { 12: 0.58, 24: 0.4, 36: 0.28 },
  samsung: { 12: 0.48, 24: 0.32, 36: 0.22 },
  google: { 12: 0.45, 24: 0.3, 36: 0.2 },
  other: { 12: 0.42, 24: 0.28, 36: 0.18 },
};

/** Mid-range and budget handsets depreciate faster than flagships. */
const TIER_PENALTY = 0.04;

export const isEligible = (p: CatalogItem) =>
  p.categorySlug === "smartphones" && p.price >= MIN_PRICE;

export const retentionFor = (p: CatalogItem, term: Term) => {
  const curve = curves[p.brand.toLowerCase()] ?? curves.other;
  const penalty = p.sub === "Flagship" || p.sub === "Foldable" ? 0 : TIER_PENALTY;
  return Math.max(0.1, curve[term] - penalty);
};

/** Guaranteed amount Nexzon will pay to take the device back, rounded to LKR 100. */
export const buybackValue = (p: CatalogItem, term: Term) =>
  Math.round((p.price * retentionFor(p, term)) / 100) * 100;

/** What the device actually costs to own over the term. */
export const realCost = (p: CatalogItem, term: Term) => p.price - buybackValue(p, term);

/** Real cost expressed per month across the term. */
export const monthlyRealCost = (p: CatalogItem, term: Term) =>
  Math.round(realCost(p, term) / term);

export const conditionRules = [
  "Powers on, holds charge, and all buttons and cameras work",
  "Screen free of cracks; light scuffs on the frame are fine",
  "No liquid damage, and the device has not been opened by a third party",
  "Find My / factory reset lock removed before handover",
];

export const promise = [
  { title: "Fixed at purchase", desc: "The figure is printed on your invoice. It does not move with the market." },
  { title: "Redeem any time", desc: "Bring it back at 12, 24 or 36 months — whichever term you chose, or earlier at the going rate." },
  { title: "Credit or cash", desc: "Take it off a new device, or have it paid to your bank account." },
  { title: "Free collection", desc: "We pick the old device up islandwide when your replacement is delivered." },
];
