/**
 * Operational data the storefront catalog does not carry.
 *
 * `CatalogItem` describes a product to a shopper — price, specs, imagery. It
 * has no SKU, stock, cost or publish state, so the console keeps those here
 * keyed by catalog id rather than bloating the customer-facing type.
 *
 * Stock is generated from a hash of the product id so the numbers are stable
 * across reloads and consistent between pages, with explicit overrides where a
 * particular figure has to line up with something else in the demo.
 */
import { allProducts, type CatalogItem } from "@/data/catalog";

export type StockStatus = "live" | "draft" | "archived";

export type Ops = {
  sku: string;
  cost: number;
  onHand: number;
  reserved: number;
  lowAt: number;
  status: StockStatus;
  supplier: string;
};

export const suppliers = [
  "Apple Authorised Distributor LK",
  "Samsung Sri Lanka",
  "Softlogic Retail",
  "Greenwich Distributors",
  "Metropolitan Technologies",
];

const supplierFor = (brand: string) => {
  if (brand === "Apple") return suppliers[0];
  if (brand === "Samsung") return suppliers[1];
  if (brand === "Google" || brand === "OnePlus") return suppliers[2];
  if (brand === "Meta" || brand === "Nintendo") return suppliers[4];
  return suppliers[3];
};

/** Small deterministic hash — same id always yields the same stock figures. */
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
  return h;
};

const skuFor = (p: CatalogItem) => {
  const brand = p.brand.slice(0, 3).toUpperCase();
  const cat = p.categorySlug.slice(0, 2).toUpperCase();
  return `NX-${brand}-${cat}-${(hash(p.id) % 9000 + 1000).toString()}`;
};

/** Figures that must agree with orders, alerts or the dashboard copy. */
const overrides: Record<string, Partial<Ops>> = {
  "apple-watch-series-11": { onHand: 0, reserved: 0 },
  "iphone-17-pro-max": { onHand: 6, reserved: 4 },
  "galaxy-s26-ultra": { onHand: 3, reserved: 2 },
  "oneplus-nord-ce5": { onHand: 41, reserved: 3 },
  "honor-magic-v5": { onHand: 2, reserved: 0 },
  "pixel-9-pro-fold": { onHand: 1, reserved: 0 },
  "iphone-13-128gb": { status: "archived", onHand: 4, reserved: 0 },
  "galaxy-s26-plus": { status: "draft", onHand: 0, reserved: 0 },
};

const build = (p: CatalogItem): Ops => {
  const h = hash(p.id);
  const base: Ops = {
    sku: skuFor(p),
    // Retail margin on phones is thin; accessories carry more.
    cost: Math.round((p.price * (p.categorySlug === "smartphones" ? 0.88 : 0.72)) / 100) * 100,
    onHand: (h % 34) + 4,
    reserved: h % 4,
    lowAt: p.price > 300000 ? 3 : 8,
    status: "live",
    supplier: supplierFor(p.brand),
  };
  return { ...base, ...overrides[p.id] };
};

export const ops: Record<string, Ops> = Object.fromEntries(allProducts.map((p) => [p.id, build(p)]));

export const opsFor = (id: string) => ops[id];

export const available = (id: string) => {
  const o = ops[id];
  return o ? Math.max(0, o.onHand - o.reserved) : 0;
};

export const isLow = (id: string) => {
  const o = ops[id];
  return !!o && o.status === "live" && available(id) <= o.lowAt;
};

export const stockValue = () =>
  allProducts.reduce((sum, p) => sum + ops[p.id].onHand * ops[p.id].cost, 0);

export const statusMeta: Record<StockStatus, { label: string; cls: string }> = {
  live: { label: "Live", cls: "border-success/25 bg-success/10 text-success" },
  draft: { label: "Draft", cls: "border-border bg-secondary text-muted-foreground" },
  archived: { label: "Archived", cls: "border-border bg-surface-2 text-muted-foreground" },
};

/* ---------------------------------------------------------------- movements */

export type MovementKind = "received" | "sold" | "returned" | "damaged" | "transfer" | "count";

export type Movement = {
  id: string;
  productId: string;
  kind: MovementKind;
  qty: number;
  when: string;
  by: string;
  ref?: string;
};

export const movementMeta: Record<MovementKind, { label: string; cls: string }> = {
  received: { label: "Received", cls: "border-success/25 bg-success/10 text-success" },
  sold: { label: "Sold", cls: "border-primary/25 bg-accent text-accent-foreground" },
  returned: { label: "Returned to stock", cls: "border-border bg-secondary text-muted-foreground" },
  damaged: { label: "Damaged", cls: "border-destructive/25 bg-destructive/10 text-destructive" },
  transfer: { label: "Transfer", cls: "border-warning/40 bg-warning/15 text-foreground" },
  count: { label: "Stock count", cls: "border-border bg-surface-2 text-muted-foreground" },
};

export const movements: Movement[] = [
  { id: "m1", productId: "galaxy-s26-ultra", kind: "received", qty: 12, when: "19 Aug 2026, 10:24", by: "Kasun Bandara", ref: "PO-2608-114" },
  { id: "m2", productId: "iphone-17-pro-max", kind: "sold", qty: -1, when: "19 Aug 2026, 09:02", by: "System", ref: "NX-260819-8021" },
  { id: "m3", productId: "apple-watch-series-11", kind: "sold", qty: -2, when: "18 Aug 2026, 16:41", by: "System", ref: "NX-260809-7640" },
  { id: "m4", productId: "oneplus-nord-ce5", kind: "received", qty: 30, when: "18 Aug 2026, 11:15", by: "Kasun Bandara", ref: "PO-2608-109" },
  { id: "m5", productId: "honor-magic-v5", kind: "damaged", qty: -1, when: "17 Aug 2026, 14:50", by: "Kasun Bandara", ref: "Screen cracked in transit" },
  { id: "m6", productId: "ipad-air-5th-gen", kind: "returned", qty: 1, when: "16 Aug 2026, 12:08", by: "Ishara Jayawardena", ref: "RT-2607-041" },
  { id: "m7", productId: "pixel-10-pro", kind: "transfer", qty: -4, when: "15 Aug 2026, 09:30", by: "Kasun Bandara", ref: "To Kandy counter" },
  { id: "m8", productId: "meta-quest-3", kind: "count", qty: -2, when: "14 Aug 2026, 18:00", by: "Nadeesha Fernando", ref: "Monthly count variance" },
  { id: "m9", productId: "galaxy-z-flip-7", kind: "sold", qty: -1, when: "16 Aug 2026, 13:22", by: "System", ref: "NX-260816-7855" },
  { id: "m10", productId: "airpods-pro-3", kind: "received", qty: 24, when: "12 Aug 2026, 10:00", by: "Kasun Bandara", ref: "PO-2608-101" },
];

/* ------------------------------------------------------------------ serials */

export type SerialKind = "in-stock" | "sold" | "grey" | "service";

export type Serial = {
  imei: string;
  productId: string;
  kind: SerialKind;
  orderId?: string;
  soldOn?: string;
  warrantyEnds?: string;
  care?: boolean;
};

export const serialMeta: Record<SerialKind, { label: string; cls: string }> = {
  "in-stock": { label: "In stock", cls: "border-border bg-secondary text-muted-foreground" },
  sold: { label: "Sold", cls: "border-success/25 bg-success/10 text-success" },
  grey: { label: "Grey import", cls: "border-destructive/25 bg-destructive/10 text-destructive" },
  service: { label: "In service", cls: "border-warning/40 bg-warning/15 text-foreground" },
};

/**
 * The registry behind the customer-facing /verify page. Every IMEI here is
 * Luhn-valid, which is what makes that page's check a real check.
 */
export const serials: Serial[] = [
  { imei: "490154203237518", productId: "iphone-17-pro-max", kind: "sold", orderId: "NX-260812-7734", soldOn: "12 Aug 2026", warrantyEnds: "12 Aug 2027", care: true },
  { imei: "356938035643809", productId: "galaxy-s26-ultra", kind: "in-stock" },
  { imei: "013977000272942", productId: "iphone-16-128gb", kind: "grey" },
  { imei: "352099001761481", productId: "oneplus-13r", kind: "sold", orderId: "NX-260614-5023", soldOn: "14 Jun 2026", warrantyEnds: "14 Jun 2027", care: false },
  { imei: "354879104325674", productId: "pixel-10-pro", kind: "sold", orderId: "NX-260817-7903", soldOn: "17 Aug 2026", warrantyEnds: "17 Aug 2027", care: true },
  { imei: "359072067103479", productId: "galaxy-z-flip-7", kind: "service" },
  { imei: "861234036523499", productId: "iphone-17e-128gb", kind: "sold", orderId: "NX-260811-7702", soldOn: "11 Aug 2026", warrantyEnds: "11 Aug 2027", care: false },
  { imei: "358240051111110", productId: "galaxy-s25-fe", kind: "in-stock" },
];
