/**
 * Every order in the shop, across all customers.
 *
 * The storefront's `data/account.ts` lists one shopper's five orders; the
 * console needs the whole book. Order ids keep the NX-YYMMDD-#### format that
 * customers already see on their invoices, and the five orders belonging to
 * Chamodi (c1) carry the same ids as the account pages.
 *
 * Line totals are derived from the catalog rather than stored, so a price edit
 * can never leave the console disagreeing with the product page.
 */
import { getProduct } from "@/data/catalog";

export type OrderStage = "pending" | "processing" | "packed" | "in-transit" | "delivered" | "cancelled";
export type PayMethod = "card" | "installment" | "cod" | "bank";
export type PayState = "paid" | "awaiting" | "cod-due" | "refunded";
export type ShipMethod = "standard" | "express" | "pickup";

export type OrderLine = { id: string; qty: number };

export type AdminOrder = {
  id: string;
  customerId: string;
  placed: string;
  placedISO: string;
  stage: OrderStage;
  lines: OrderLine[];
  payMethod: PayMethod;
  payState: PayState;
  /** Months, for installment orders only. */
  term?: 3 | 6 | 12 | 24;
  ship: ShipMethod;
  district: string;
  address: string;
  slot: string;
  discount: number;
  deliveryFee: number;
  courier?: string;
  tracking?: string;
  eta?: string;
  deliveredOn?: string;
  giftNote?: string;
  /** Free-text staff note kept off the customer's view. */
  note?: string;
};

export const stageMeta: Record<OrderStage, { label: string; cls: string; dot: string }> = {
  pending: { label: "Pending", cls: "border-border bg-secondary text-muted-foreground", dot: "bg-muted-foreground" },
  processing: { label: "Processing", cls: "border-promo/25 bg-promo/10 text-promo", dot: "bg-promo" },
  packed: { label: "Packed", cls: "border-warning/40 bg-warning/15 text-foreground", dot: "bg-warning" },
  "in-transit": { label: "In transit", cls: "border-primary/25 bg-accent text-accent-foreground", dot: "bg-primary" },
  delivered: { label: "Delivered", cls: "border-success/25 bg-success/10 text-success", dot: "bg-success" },
  cancelled: { label: "Cancelled", cls: "border-destructive/25 bg-destructive/10 text-destructive", dot: "bg-destructive" },
};

export const payMeta: Record<PayMethod, string> = {
  card: "Card",
  installment: "Installment",
  cod: "Cash on delivery",
  bank: "Bank transfer",
};

export const payStateMeta: Record<PayState, { label: string; cls: string }> = {
  paid: { label: "Paid", cls: "border-success/25 bg-success/10 text-success" },
  awaiting: { label: "Awaiting confirmation", cls: "border-promo/25 bg-promo/10 text-promo" },
  "cod-due": { label: "Collect on delivery", cls: "border-warning/40 bg-warning/15 text-foreground" },
  refunded: { label: "Refunded", cls: "border-border bg-secondary text-muted-foreground" },
};

export const shipMeta: Record<ShipMethod, string> = {
  standard: "Standard delivery",
  express: "Express delivery",
  pickup: "Collect in store",
};

export const orders: AdminOrder[] = [
  {
    id: "NX-260819-8021", customerId: "c2", placed: "19 Aug 2026", placedISO: "2026-08-19", stage: "pending",
    lines: [{ id: "galaxy-s26-ultra", qty: 1 }],
    payMethod: "bank", payState: "awaiting", ship: "express", district: "Colombo",
    address: "142 Old Kesbewa Road, Nugegoda", slot: "9 AM – 12 PM", discount: 0, deliveryFee: 950,
    eta: "Held until transfer clears", note: "Customer emailed a deposit slip — check the Sampath account.",
  },
  {
    id: "NX-260819-8014", customerId: "c5", placed: "19 Aug 2026", placedISO: "2026-08-19", stage: "processing",
    lines: [{ id: "oneplus-nord-ce5", qty: 1 }, { id: "airpods-pro-3", qty: 1 }],
    payMethod: "cod", payState: "cod-due", ship: "standard", district: "Gampaha",
    address: "31/2 Sea Street, Negombo", slot: "3 PM – 6 PM", discount: 0, deliveryFee: 0,
    eta: "21–22 Aug 2026",
  },
  {
    id: "NX-260818-7966", customerId: "c7", placed: "18 Aug 2026", placedISO: "2026-08-18", stage: "packed",
    lines: [{ id: "ipad-air-5th-gen", qty: 1 }],
    payMethod: "installment", payState: "paid", term: 12, ship: "standard", district: "Colombo",
    address: "64 High Level Road, Maharagama", slot: "12 PM – 3 PM", discount: 8000, deliveryFee: 0,
    eta: "20–21 Aug 2026", note: "Awaiting courier pickup.",
  },
  {
    id: "NX-260817-7903", customerId: "c10", placed: "17 Aug 2026", placedISO: "2026-08-17", stage: "in-transit",
    lines: [{ id: "pixel-10-pro", qty: 1 }, { id: "airpods-max", qty: 1 }],
    payMethod: "card", payState: "paid", ship: "express", district: "Matara",
    address: "88 Beach Road, Matara", slot: "9 AM – 12 PM", discount: 15000, deliveryFee: 950,
    courier: "Pronto Express", tracking: "PRX884930221", eta: "20 Aug 2026",
  },
  {
    id: "NX-260816-7855", customerId: "c4", placed: "16 Aug 2026", placedISO: "2026-08-16", stage: "in-transit",
    lines: [{ id: "galaxy-z-flip-7", qty: 1 }],
    payMethod: "installment", payState: "paid", term: 24, ship: "standard", district: "Colombo",
    address: "27 Galle Road, Dehiwala", slot: "6 PM – 9 PM", discount: 0, deliveryFee: 0,
    courier: "Domex", tracking: "DMX221044918", eta: "20–21 Aug 2026",
  },
  {
    id: "NX-260812-7734", customerId: "c1", placed: "12 Aug 2026", placedISO: "2026-08-12", stage: "in-transit",
    lines: [{ id: "iphone-17-pro-max", qty: 1 }],
    payMethod: "card", payState: "paid", ship: "standard", district: "Colombo",
    address: "No. 58/4, Horton Place, Colombo 07", slot: "12 PM – 3 PM", discount: 0, deliveryFee: 0,
    courier: "Pronto Express", tracking: "PRX884512006", eta: "17–19 Aug 2026",
  },
  {
    id: "NX-260811-7702", customerId: "c3", placed: "11 Aug 2026", placedISO: "2026-08-11", stage: "delivered",
    lines: [{ id: "iphone-17e-128gb", qty: 1 }],
    payMethod: "cod", payState: "paid", ship: "standard", district: "Kandy",
    address: "19 Peradeniya Road, Kandy", slot: "9 AM – 12 PM", discount: 0, deliveryFee: 0,
    courier: "Domex", tracking: "DMX220988410", deliveredOn: "14 Aug 2026",
  },
  {
    id: "NX-260809-7640", customerId: "c12", placed: "9 Aug 2026", placedISO: "2026-08-09", stage: "delivered",
    lines: [{ id: "galaxy-s25-fe", qty: 1 }, { id: "apple-watch-series-11", qty: 1 }],
    payMethod: "card", payState: "paid", ship: "standard", district: "Anuradhapura",
    address: "204 Maithripala Senanayake Mawatha, Anuradhapura", slot: "3 PM – 6 PM", discount: 12000, deliveryFee: 0,
    courier: "Pronto Express", tracking: "PRX884201773", deliveredOn: "13 Aug 2026",
  },
  {
    id: "NX-260806-7588", customerId: "c6", placed: "6 Aug 2026", placedISO: "2026-08-06", stage: "delivered",
    lines: [{ id: "meta-quest-3", qty: 1 }],
    payMethod: "installment", payState: "paid", term: 6, ship: "pickup", district: "Colombo",
    address: "Collect in store — Dharmapala Mawatha", slot: "Ready in 2 hours", discount: 0, deliveryFee: 0,
    deliveredOn: "6 Aug 2026", note: "Collected same day.",
  },
  {
    id: "NX-260802-7501", customerId: "c9", placed: "2 Aug 2026", placedISO: "2026-08-02", stage: "delivered",
    lines: [{ id: "iphone-16e-128gb", qty: 1 }],
    payMethod: "cod", payState: "paid", ship: "standard", district: "Jaffna",
    address: "5 Hospital Road, Jaffna", slot: "12 PM – 3 PM", discount: 0, deliveryFee: 0,
    courier: "Domex", tracking: "DMX220911205", deliveredOn: "7 Aug 2026",
  },
  {
    id: "NX-260729-6180", customerId: "c1", placed: "29 Jul 2026", placedISO: "2026-07-29", stage: "processing",
    lines: [{ id: "airpods-pro-3", qty: 1 }, { id: "apple-watch-series-11", qty: 1 }],
    payMethod: "card", payState: "paid", ship: "standard", district: "Colombo",
    address: "No. 58/4, Horton Place, Colombo 07", slot: "12 PM – 3 PM", discount: 0, deliveryFee: 0,
    eta: "Awaiting stock confirmation", note: "Watch Series 11 is out of stock in the 46mm size.",
  },
  {
    id: "NX-260726-6094", customerId: "c8", placed: "26 Jul 2026", placedISO: "2026-07-26", stage: "cancelled",
    lines: [{ id: "honor-magic-v5", qty: 1 }],
    payMethod: "cod", payState: "refunded", ship: "standard", district: "Kurunegala",
    address: "72 Puttalam Road, Kurunegala", slot: "9 AM – 12 PM", discount: 0, deliveryFee: 0,
    note: "Refused at the door. Third refusal from this customer — flag reviewed.",
  },
  {
    id: "NX-260718-5942", customerId: "c11", placed: "18 Jul 2026", placedISO: "2026-07-18", stage: "delivered",
    lines: [{ id: "iphone-13-128gb", qty: 1 }],
    payMethod: "installment", payState: "paid", term: 12, ship: "standard", district: "Kalutara",
    address: "12 Station Road, Kalutara", slot: "3 PM – 6 PM", discount: 5000, deliveryFee: 0,
    courier: "Domex", tracking: "DMX220844117", deliveredOn: "22 Jul 2026",
  },
  {
    id: "NX-260711-5820", customerId: "c2", placed: "11 Jul 2026", placedISO: "2026-07-11", stage: "delivered",
    lines: [{ id: "pixel-9-pro-fold", qty: 1 }],
    payMethod: "card", payState: "paid", ship: "express", district: "Colombo",
    address: "142 Old Kesbewa Road, Nugegoda", slot: "9 AM – 12 PM", discount: 20000, deliveryFee: 950,
    courier: "Pronto Express", tracking: "PRX883740092", deliveredOn: "12 Jul 2026",
    giftNote: "Happy birthday Amma — from Ravindu",
  },
  {
    id: "NX-260703-5711", customerId: "c7", placed: "3 Jul 2026", placedISO: "2026-07-03", stage: "delivered",
    lines: [{ id: "nintendo-switch", qty: 1 }, { id: "airpods-pro-3", qty: 1 }],
    payMethod: "card", payState: "paid", ship: "standard", district: "Colombo",
    address: "64 High Level Road, Maharagama", slot: "6 PM – 9 PM", discount: 0, deliveryFee: 0,
    courier: "Domex", tracking: "DMX220790335", deliveredOn: "6 Jul 2026",
  },
  {
    id: "NX-260614-5023", customerId: "c1", placed: "14 Jun 2026", placedISO: "2026-06-14", stage: "delivered",
    lines: [{ id: "oneplus-13r", qty: 1 }],
    payMethod: "card", payState: "paid", ship: "standard", district: "Colombo",
    address: "No. 58/4, Horton Place, Colombo 07", slot: "12 PM – 3 PM", discount: 2000, deliveryFee: 0,
    courier: "Pronto Express", tracking: "PRX771230884", deliveredOn: "17 Jun 2026",
  },
  {
    id: "NX-260503-4471", customerId: "c1", placed: "3 May 2026", placedISO: "2026-05-03", stage: "delivered",
    lines: [{ id: "ipad-air-5th-gen", qty: 1 }],
    payMethod: "card", payState: "paid", ship: "standard", district: "Colombo",
    address: "No. 58/4, Horton Place, Colombo 07", slot: "3 PM – 6 PM", discount: 0, deliveryFee: 0,
    courier: "Domex", tracking: "DMX220914773", deliveredOn: "6 May 2026",
  },
  {
    id: "NX-260218-3129", customerId: "c1", placed: "18 Feb 2026", placedISO: "2026-02-18", stage: "cancelled",
    lines: [{ id: "nintendo-switch", qty: 1 }],
    payMethod: "card", payState: "refunded", ship: "standard", district: "Colombo",
    address: "No. 58/4, Horton Place, Colombo 07", slot: "9 AM – 12 PM", discount: 0, deliveryFee: 0,
    note: "Cancelled by the customer before dispatch. Card refunded in full.",
  },
];

/** Sum of the line items at current catalog prices. */
export const orderSubtotal = (o: AdminOrder) =>
  o.lines.reduce((sum, l) => sum + (getProduct(l.id)?.price ?? 0) * l.qty, 0);

export const orderTotal = (o: AdminOrder) => orderSubtotal(o) - o.discount + o.deliveryFee;

export const orderUnits = (o: AdminOrder) => o.lines.reduce((n, l) => n + l.qty, 0);

export const getOrder = (id?: string) => orders.find((o) => o.id === id);

export const ordersFor = (customerId: string) => orders.filter((o) => o.customerId === customerId);

/** Orders that count as revenue — cancelled ones never did. */
export const isRevenue = (o: AdminOrder) => o.stage !== "cancelled";

export const lifetimeValue = (customerId: string) =>
  ordersFor(customerId).filter(isRevenue).reduce((sum, o) => sum + orderTotal(o), 0);

/** Where an order sits in the fulfilment pipeline, for the board and timeline. */
export const stageFlow: OrderStage[] = ["pending", "processing", "packed", "in-transit", "delivered"];
