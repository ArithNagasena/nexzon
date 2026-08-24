/**
 * The three post-purchase queues, all served by /admin/service.
 *
 * Returns, warranty claims and trade-ins each declare their own state machine
 * on the customer side (in `pages/Returns.tsx`, `pages/Warranty.tsx` and
 * `pages/TradeIn.tsx`). The stages here are the same ones, lifted into a
 * shared module so the staff queue and the customer view cannot drift apart.
 */

export type ReturnStage = "requested" | "approved" | "collected" | "refunded" | "rejected";
export type ClaimStage = "submitted" | "collected" | "in-repair" | "returned";
export type TradeStage = "quoted" | "collected" | "inspected" | "credited";

export const returnMeta: Record<ReturnStage, { label: string; cls: string }> = {
  requested: { label: "Requested", cls: "border-promo/25 bg-promo/10 text-promo" },
  approved: { label: "Approved", cls: "border-primary/25 bg-accent text-accent-foreground" },
  collected: { label: "Collected", cls: "border-warning/40 bg-warning/15 text-foreground" },
  refunded: { label: "Refunded", cls: "border-success/25 bg-success/10 text-success" },
  rejected: { label: "Rejected", cls: "border-destructive/25 bg-destructive/10 text-destructive" },
};

export const claimMeta: Record<ClaimStage, { label: string; cls: string }> = {
  submitted: { label: "Submitted", cls: "border-promo/25 bg-promo/10 text-promo" },
  collected: { label: "Collected", cls: "border-primary/25 bg-accent text-accent-foreground" },
  "in-repair": { label: "In repair", cls: "border-warning/40 bg-warning/15 text-foreground" },
  returned: { label: "Returned", cls: "border-success/25 bg-success/10 text-success" },
};

export const tradeMeta: Record<TradeStage, { label: string; cls: string }> = {
  quoted: { label: "Quoted", cls: "border-promo/25 bg-promo/10 text-promo" },
  collected: { label: "Collected", cls: "border-primary/25 bg-accent text-accent-foreground" },
  inspected: { label: "Inspected", cls: "border-warning/40 bg-warning/15 text-foreground" },
  credited: { label: "Credited", cls: "border-success/25 bg-success/10 text-success" },
};

export type ReturnCase = {
  id: string;
  orderId: string;
  customerId: string;
  productId: string;
  stage: ReturnStage;
  reason: string;
  opened: string;
  amount: number;
  /** Set once a case has been looked at — restock, scrap, or awaiting. */
  outcome?: string;
  note?: string;
};

export const returnCases: ReturnCase[] = [
  { id: "RT-2608-058", orderId: "NX-260811-7702", customerId: "c3", productId: "iphone-17e-128gb", stage: "requested", reason: "Changed mind", opened: "18 Aug 2026", amount: 219900, note: "Within the 7-day window. Box unopened per the customer." },
  { id: "RT-2608-055", orderId: "NX-260809-7640", customerId: "c12", productId: "galaxy-s25-fe", stage: "approved", reason: "Wrong colour delivered", opened: "16 Aug 2026", amount: 260900, outcome: "Collection booked with Pronto Express", note: "Our picking error — waive the collection fee." },
  { id: "RT-2608-049", orderId: "NX-260802-7501", customerId: "c9", productId: "iphone-16e-128gb", stage: "collected", reason: "Faulty on arrival", opened: "12 Aug 2026", amount: 250900, outcome: "With the technician for verification" },
  { id: "RT-2607-041", orderId: "NX-260503-4471", customerId: "c1", productId: "ipad-air-5th-gen", stage: "refunded", reason: "Faulty on arrival", opened: "28 Jul 2026", amount: 165000, outcome: "Restocked after repair by the distributor" },
  { id: "RT-2607-036", orderId: "NX-260726-6094", customerId: "c8", productId: "honor-magic-v5", stage: "rejected", reason: "Changed mind", opened: "24 Jul 2026", amount: 569900, outcome: "Outside the return window and the seal was broken" },
];

export type WarrantyClaim = {
  id: string;
  customerId: string;
  productId: string;
  imei: string;
  stage: ClaimStage;
  fault: string;
  opened: string;
  centre: string;
  /** Days the claim has been open, for the turnaround column. */
  days: number;
  loaner?: string;
  note?: string;
};

export const warrantyClaims: WarrantyClaim[] = [
  { id: "WC-2608-022", customerId: "c4", productId: "galaxy-z-flip-7", imei: "359072067103479", stage: "in-repair", fault: "Inner display flickers along the fold", opened: "8 Aug 2026", centre: "Samsung Service, Colombo 03", days: 11, loaner: "Galaxy S25 FE", note: "Panel ordered — distributor quotes 5 working days." },
  { id: "WC-2608-019", customerId: "c1", productId: "oneplus-13r", imei: "352099001761481", stage: "submitted", fault: "Will not charge above 80 percent", opened: "17 Aug 2026", centre: "Awaiting assignment", days: 2 },
  { id: "WC-2608-014", customerId: "c10", productId: "airpods-max", imei: "—", stage: "collected", fault: "Left cup silent", opened: "13 Aug 2026", centre: "Apple Authorised, Colombo 07", days: 6 },
  { id: "WC-2607-009", customerId: "c6", productId: "meta-quest-3", imei: "—", stage: "returned", fault: "Controller drift", opened: "22 Jul 2026", centre: "Metropolitan Technologies", days: 9, note: "Replaced under warranty. Customer collected on 31 July." },
];

export type TradeIn = {
  id: string;
  customerId: string;
  model: string;
  condition: string;
  stage: TradeStage;
  quoted: number;
  /** Set after inspection when the condition differs from what was declared. */
  revised?: number;
  opened: string;
  note?: string;
};

export const tradeIns: TradeIn[] = [
  { id: "TI-2608-031", customerId: "c2", model: "iPhone 14 Pro 256GB", condition: "Good", stage: "quoted", quoted: 168000, opened: "19 Aug 2026" },
  { id: "TI-2608-027", customerId: "c7", model: "Galaxy S23 Ultra 256GB", condition: "Excellent", stage: "collected", quoted: 142000, opened: "15 Aug 2026", note: "Collected with the iPad delivery." },
  { id: "TI-2608-021", customerId: "c10", model: "Pixel 8 Pro 128GB", condition: "Good", stage: "inspected", quoted: 96000, revised: 78000, opened: "11 Aug 2026", note: "Rear glass hairline crack not declared. Revised quote sent — awaiting reply." },
  { id: "TI-2607-018", customerId: "c11", model: "iPhone 12 128GB", condition: "Fair", stage: "credited", quoted: 54000, opened: "18 Jul 2026", note: "Credited against NX-260718-5942." },
];
