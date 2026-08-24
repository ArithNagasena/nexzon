/**
 * Store settings — the values currently hard-coded across the storefront.
 *
 * `data/site.ts` already fixed the "same phone number typed in ten files"
 * problem for contact details. This does the same for delivery zones, payment
 * methods, loyalty rules and message templates, which are still constants
 * scattered through the page components.
 */
import { site } from "@/data/site";

export const storeProfile = {
  name: site.name,
  legalName: site.legalName,
  email: site.email,
  phone: site.phoneDisplay,
  hours: site.hours,
  addressLine1: site.address.line1,
  addressLine2: site.address.line2,
  registration: "PV 00218374",
  vatNumber: "114938271-7000",
};

export type Zone = {
  district: string;
  standardFee: number;
  expressFee: number;
  days: string;
  cod: boolean;
};

/** The ten districts the checkout page offers, with what each costs to serve. */
export const zones: Zone[] = [
  { district: "Colombo", standardFee: 350, expressFee: 950, days: "1 day", cod: true },
  { district: "Gampaha", standardFee: 350, expressFee: 950, days: "1 day", cod: true },
  { district: "Kalutara", standardFee: 450, expressFee: 1200, days: "1–2 days", cod: true },
  { district: "Kandy", standardFee: 550, expressFee: 1400, days: "2 days", cod: true },
  { district: "Galle", standardFee: 550, expressFee: 1400, days: "2 days", cod: true },
  { district: "Matara", standardFee: 650, expressFee: 1600, days: "2 days", cod: true },
  { district: "Kurunegala", standardFee: 550, expressFee: 1400, days: "2 days", cod: true },
  { district: "Anuradhapura", standardFee: 750, expressFee: 1800, days: "2–3 days", cod: true },
  { district: "Batticaloa", standardFee: 850, expressFee: 0, days: "3 days", cod: false },
  { district: "Jaffna", standardFee: 850, expressFee: 0, days: "3 days", cod: false },
];

export const deliveryRules = {
  freeOver: 25000,
  expressCutoff: "2:00 PM",
  slots: ["9 AM – 12 PM", "12 PM – 3 PM", "3 PM – 6 PM", "6 PM – 9 PM"],
  pickupReady: "2 hours",
  couriers: ["Pronto Express", "Domex"],
};

export type PaymentMethod = {
  id: string;
  label: string;
  detail: string;
  enabled: boolean;
};

export const paymentMethods: PaymentMethod[] = [
  { id: "card", label: "Credit / debit card", detail: "Visa, Mastercard, Amex via the gateway", enabled: true },
  { id: "installment", label: "0% installment plan", detail: "3, 6, 12 and 24 months with partner banks", enabled: true },
  { id: "cod", label: "Cash on delivery", detail: "Islandwide except Jaffna and Batticaloa", enabled: true },
  { id: "bank", label: "Bank transfer", detail: "Direct deposit, confirmed manually", enabled: true },
];

export const installmentTerms = [3, 6, 12, 24] as const;

export const partnerBanks = ["Commercial Bank", "Sampath Bank", "HNB", "NDB", "Nations Trust"];

export const codCeiling = 400000;

/** Loyalty rules. The tier names and perks are the ones shown to customers. */
export const loyaltyTiers = [
  { name: "Bronze", from: 0, earn: "1 point per LKR 100", perks: ["Birthday voucher"] },
  { name: "Silver", from: 2000, earn: "1.25 points per LKR 100", perks: ["Free delivery always"] },
  { name: "Gold", from: 4000, earn: "1.5 points per LKR 100", perks: ["Priority support line", "Extended 14-day returns"] },
  { name: "Platinum", from: 6000, earn: "2 points per LKR 100", perks: ["Free Nexzon Care for a year", "Launch-day pre-order priority"] },
];

export const pointsRules = {
  reviewReward: 200,
  referralReward: 500,
  redemptionRate: "1,000 points = LKR 1,000",
};

export type Template = {
  id: string;
  name: string;
  channel: "Email" | "SMS";
  subject: string;
  trigger: string;
  enabled: boolean;
};

export const templates: Template[] = [
  { id: "T-1", name: "Order confirmed", channel: "Email", subject: "Your Nexzon order {{orderId}} is confirmed", trigger: "Order placed", enabled: true },
  { id: "T-2", name: "Order dispatched", channel: "SMS", subject: "{{orderId}} is on its way with {{courier}}. Track: {{tracking}}", trigger: "Handed to courier", enabled: true },
  { id: "T-3", name: "Delivered", channel: "Email", subject: "Delivered — how did we do?", trigger: "Marked delivered", enabled: true },
  { id: "T-4", name: "Sign-in code", channel: "SMS", subject: "{{code}} is your Nexzon verification code", trigger: "OTP requested", enabled: true },
  { id: "T-5", name: "Review request", channel: "Email", subject: "Review your {{product}} and earn 200 points", trigger: "3 days after delivery", enabled: true },
  { id: "T-6", name: "Price drop alert", channel: "Email", subject: "{{product}} just dropped to {{price}}", trigger: "Watched price falls", enabled: true },
  { id: "T-7", name: "Back in stock", channel: "SMS", subject: "{{product}} is back in stock at Nexzon", trigger: "Stock returns above zero", enabled: false },
];
