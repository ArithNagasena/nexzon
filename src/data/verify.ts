/**
 * Official-stock verification.
 *
 * IMEIs carry a Luhn check digit, so a typo or an invented number can be
 * rejected locally before any lookup — that is a real check, not decoration.
 */

/** Validates the Luhn check digit used by every GSM IMEI. */
export const isValidImei = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 15) return false;
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let d = Number(digits[i]);
    // Double every second digit, counting from the left (positions 2, 4, …).
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
};

export type VerifyResult =
  | { kind: "invalid" }
  | { kind: "nexzon"; model: string; soldOn: string; orderId: string; warrantyEnds: string; care: boolean }
  | { kind: "official"; model: string; distributor: string; warrantyEnds: string }
  | { kind: "grey"; model: string };

/** Known devices, keyed by IMEI. Every key below is a Luhn-valid number. */
const registry: Record<string, VerifyResult> = {
  "490154203237518": {
    kind: "nexzon",
    model: "Apple iPhone 17 Pro Max 256GB",
    soldOn: "12 August 2026",
    orderId: "NX-260812-7734",
    warrantyEnds: "12 August 2027",
    care: true,
  },
  "356938035643809": {
    kind: "official",
    model: "Samsung Galaxy S26 Ultra 512GB",
    distributor: "Samsung Sri Lanka (authorised)",
    warrantyEnds: "3 March 2027",
  },
  "013977000272942": {
    kind: "grey",
    model: "Apple iPhone 16 Pro (unregistered import)",
  },
};

export const lookupImei = (raw: string): VerifyResult => {
  const digits = raw.replace(/\D/g, "");
  if (!isValidImei(digits)) return { kind: "invalid" };
  return registry[digits] ?? { kind: "grey", model: "Unrecognised handset" };
};

export const sampleImeis = [
  { label: "Bought from Nexzon", value: "490154203237518" },
  { label: "Official local stock", value: "356938035643809" },
  { label: "Grey import", value: "013977000272942" },
];

export const whyItMatters = [
  {
    title: "Local warranty only covers official stock",
    body: "A grey import carries no Sri Lankan warranty. If it fails, no local service centre is obliged to touch it — you're shipping it abroad at your own cost.",
  },
  {
    title: "Unregistered handsets can be blocked",
    body: "Devices must be registered against the local IMEI database to stay on Dialog, Mobitel and the other networks. Unregistered imports risk losing service.",
  },
  {
    title: "Grey stock is often refurbished",
    body: "Units sold as new are frequently returns or refurbished handsets re-boxed abroad, with battery health well below a genuine new device.",
  },
];
