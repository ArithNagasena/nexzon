/**
 * The review moderation queue.
 *
 * Publishing a review grants loyalty points, so moderation is also fraud
 * control: `verified` records whether the reviewer actually has a delivered
 * order for that product, and unverified reviews should never earn points.
 */

export type ReviewState = "pending" | "published" | "rejected" | "reported";

export const reviewMeta: Record<ReviewState, { label: string; cls: string }> = {
  pending: { label: "Awaiting review", cls: "border-promo/25 bg-promo/10 text-promo" },
  reported: { label: "Reported", cls: "border-destructive/25 bg-destructive/10 text-destructive" },
  published: { label: "Published", cls: "border-success/25 bg-success/10 text-success" },
  rejected: { label: "Rejected", cls: "border-border bg-secondary text-muted-foreground" },
};

export type Review = {
  id: string;
  productId: string;
  customerId: string;
  orderId?: string;
  rating: number;
  title: string;
  body: string;
  when: string;
  state: ReviewState;
  verified: boolean;
  helpful: number;
  /** Points granted on publication. Never awarded to unverified reviews. */
  points: number;
  reply?: string;
  reportReason?: string;
};

export const reviews: Review[] = [
  {
    id: "RV-118", productId: "iphone-17-pro-max", customerId: "c2", orderId: "NX-260819-8021", rating: 5,
    title: "The camera is doing things my old phone could not",
    body: "Low light shots at the Galle Face at dusk come out clean with no grain. Battery gets me through a full day of heavy use with about 20 percent left.",
    when: "19 Aug 2026", state: "pending", verified: true, helpful: 0, points: 200,
  },
  {
    id: "RV-117", productId: "oneplus-nord-ce5", customerId: "c5", rating: 2,
    title: "Cheaper on another site",
    body: "Found the same phone for less elsewhere. Nothing wrong with the device but I am not happy about the price.",
    when: "19 Aug 2026", state: "pending", verified: false, helpful: 0, points: 0,
  },
  {
    id: "RV-116", productId: "galaxy-z-flip-7", customerId: "c4", orderId: "NX-260816-7855", rating: 3,
    title: "Lovely design, fragile crease",
    body: "The fold is genuinely convenient for pockets but the crease catches the light constantly and the inner screen already flickers.",
    when: "18 Aug 2026", state: "reported", verified: true, helpful: 4, points: 200,
    reportReason: "Seller flagged — the fault is already an open warranty claim (WC-2608-022).",
  },
  {
    id: "RV-115", productId: "pixel-10-pro", customerId: "c10", orderId: "NX-260817-7903", rating: 5,
    title: "Seven years of updates sold me",
    body: "Bought this over the Samsung purely for the update promise. The photo processing is the best I have used and it charges fast enough.",
    when: "18 Aug 2026", state: "pending", verified: true, helpful: 0, points: 200,
  },
  {
    id: "RV-114", productId: "airpods-pro-3", customerId: "c7", orderId: "NX-260703-5711", rating: 5,
    title: "Noise cancelling worth every rupee",
    body: "Wore them on the Colombo to Kandy train and heard almost nothing. The case charging over USB-C finally means one cable for everything.",
    when: "14 Aug 2026", state: "published", verified: true, helpful: 27, points: 200,
    reply: "Thanks Thilini — glad the USB-C case is working out. Nexzon Support.",
  },
  {
    id: "RV-113", productId: "oneplus-13r", customerId: "c1", orderId: "NX-260614-5023", rating: 5,
    title: "Battery genuinely lasts two days",
    body: "Coming from an older phone the 6,000mAh cell is a revelation — I charge it every other night. The 100W charger fills it while I shower.",
    when: "24 Jun 2026", state: "published", verified: true, helpful: 34, points: 200,
  },
  {
    id: "RV-112", productId: "ipad-air-5th-gen", customerId: "c1", orderId: "NX-260503-4471", rating: 4,
    title: "Great for note-taking, average speakers",
    body: "Handles PDFs and Procreate without complaint. The speakers are fine for video calls but not for music.",
    when: "9 May 2026", state: "published", verified: true, helpful: 12, points: 200,
  },
  {
    id: "RV-111", productId: "honor-magic-v5", customerId: "c8", rating: 1,
    title: "Never arrived",
    body: "Waste of time, do not buy from here.",
    when: "27 Jul 2026", state: "rejected", verified: false, helpful: 0, points: 0,
    reportReason: "Order NX-260726-6094 was refused at the door by the customer, not lost. No delivered purchase to verify against.",
  },
  {
    id: "RV-110", productId: "meta-quest-3", customerId: "c6", orderId: "NX-260806-7588", rating: 4,
    title: "Mixed reality is the fun part",
    body: "Passthrough is sharp enough to walk around in. Setup took ten minutes. Wish the strap were more comfortable out of the box.",
    when: "10 Aug 2026", state: "published", verified: true, helpful: 8, points: 200,
  },
];

export const pending = () => reviews.filter((r) => r.state === "pending" || r.state === "reported");

export const averageRating = (productId: string) => {
  const live = reviews.filter((r) => r.productId === productId && r.state === "published");
  if (!live.length) return 0;
  return live.reduce((s, r) => s + r.rating, 0) / live.length;
};
