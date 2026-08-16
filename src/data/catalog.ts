/**
 * Single source of truth for products across the store.
 *
 * The product detail page resolves the `:id` route param against this list, so
 * every id used in a link (category grid, new arrivals, flash deals, picks)
 * must exist here or the page will show its not-found state.
 */
import iphone17ProMax from "@/assets/iphone-17-pro-max.png";
import iphone17ProMaxWhite from "@/assets/iphone-17-pro-max-white.png";
import iphone17ProMaxBlue from "@/assets/iphone-17-pro-max-blue.png";
import iphone17ProMaxOrange from "@/assets/iphone-17-pro-max-orange.png";
import galaxyS26Ultra from "@/assets/galaxy-s26-ultra.png";
import galaxyS26Plus from "@/assets/galaxy-s26-plus.png";
import pixel10 from "@/assets/google-pixel-10.png";
import iphoneAir from "@/assets/iphone-air.png";
import iphone15ProMax from "@/assets/iphone-15-pro-max.png";
import pixel9ProXl from "@/assets/pixel-9-pro-xl.png";
import oneplus13r from "@/assets/oneplus-13r.png";
import iphone16 from "@/assets/iphone-16.png";
import galaxyZFlip7 from "@/assets/galaxy-z-flip7.png";
import pixel9ProFold from "@/assets/pixel-9-pro-fold.png";
import honorMagicV5 from "@/assets/honor-magic-v5.png";
import iphone17e from "@/assets/iphone-17e.png";
import galaxyS25Fe from "@/assets/galaxy-s25-fe.png";
import iphone16e from "@/assets/iphone-16e.png";
import oneplusNordCe5 from "@/assets/oneplus-nord-ce5.png";
import iphone13 from "@/assets/iphone-13.png";
import airpodsPro3 from "@/assets/airpods-pro-3.png";
import appleWatchS11 from "@/assets/apple-watch-s11.png";
import airpodsMax from "@/assets/product-airpods-max.png";
import ipadAir from "@/assets/product-ipad-air.png";
import metaQuest3 from "@/assets/product-meta-quest-3.png";
import nintendoSwitch from "@/assets/product-nintendo-switch.png";

export type Badge = { label: string; tone: "promo" | "primary" | "success" | "warning" };

export type CatalogItem = {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  /** Extra angles for the detail-page gallery; falls back to `image` alone. */
  gallery?: string[];
  badge?: Badge;
  tagline: string;
  colors?: { name: string; hex: string }[];
  storageOptions?: string[];
  /** Phone-only fields, also used to build the spec table. */
  sub?: string;
  storage?: string;
  ram?: string;
  screen?: number;
  battery?: number;
  camera?: number;
  fiveG?: boolean;
  uses?: string[];
  /** Explicit spec rows for items that are not phones. */
  extraSpecs?: { group: string; rows: [string, string][] }[];
  inBox: string[];
  warranty: string;
};

export const phones: CatalogItem[] = [
  {
    id: "iphone-17-pro-max", name: "Apple iPhone 17 Pro Max 256GB", brand: "Apple", category: "Smartphones", categorySlug: "smartphones",
    price: 429000, oldPrice: 469900, rating: 4.9, reviews: 1248, image: iphone17ProMax,
    gallery: [iphone17ProMax, iphone17ProMaxWhite, iphone17ProMaxBlue, iphone17ProMaxOrange],
    badge: { label: "New", tone: "primary" },
    tagline: "Heat-forged aluminium unibody, the A19 Pro chip, and a 48MP Fusion camera system that holds detail well past sunset.",
    colors: [{ name: "Silver", hex: "#e8e8ea" }, { name: "Deep Blue", hex: "#2b3a5a" }, { name: "Cosmic Orange", hex: "#d96b3a" }],
    storageOptions: ["256GB", "512GB", "1TB"],
    sub: "Flagship", storage: "256GB", ram: "12GB", screen: 6.9, battery: 4685, camera: 48, fiveG: true, uses: ["camera", "gaming"],
    inBox: ["iPhone 17 Pro Max", "USB-C charge cable (1m)", "Documentation"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "galaxy-s26-ultra", name: "Samsung Galaxy S26 Ultra 512GB", brand: "Samsung", category: "Smartphones", categorySlug: "smartphones",
    price: 529900, oldPrice: 569900, rating: 4.8, reviews: 486, image: galaxyS26Ultra, badge: { label: "New", tone: "primary" },
    tagline: "A 200MP main sensor with real optical zoom, S Pen built in, and the brightest panel Samsung has shipped.",
    colors: [{ name: "Titanium Black", hex: "#2a2a2e" }, { name: "Titanium Grey", hex: "#8e8e93" }],
    storageOptions: ["512GB", "1TB"],
    sub: "Flagship", storage: "512GB", ram: "16GB", screen: 6.9, battery: 5000, camera: 200, fiveG: true, uses: ["camera", "gaming"],
    inBox: ["Galaxy S26 Ultra", "USB-C cable", "SIM tool", "Documentation"],
    warranty: "1-year Samsung Sri Lanka warranty",
  },
  {
    id: "galaxy-s26-plus", name: "Samsung Galaxy S26+ 512GB", brand: "Samsung", category: "Smartphones", categorySlug: "smartphones",
    price: 459900, oldPrice: 489900, rating: 4.8, reviews: 164, image: galaxyS26Plus,
    tagline: "Flagship performance in a lighter body, with the same 120Hz panel and all-day battery.",
    storageOptions: ["256GB", "512GB"],
    sub: "Flagship", storage: "512GB", ram: "12GB", screen: 6.7, battery: 4900, camera: 50, fiveG: true, uses: ["gaming"],
    inBox: ["Galaxy S26+", "USB-C cable", "SIM tool"],
    warranty: "1-year Samsung Sri Lanka warranty",
  },
  {
    id: "pixel-10-pro", name: "Google Pixel 10 Pro", brand: "Google", category: "Smartphones", categorySlug: "smartphones",
    price: 349900, oldPrice: 379900, rating: 4.8, reviews: 302, image: pixel10, badge: { label: "Hot", tone: "promo" },
    tagline: "Google's computational photography at its best, backed by seven years of OS and security updates.",
    storageOptions: ["256GB", "512GB"],
    sub: "Flagship", storage: "256GB", ram: "16GB", screen: 6.8, battery: 5060, camera: 50, fiveG: true, uses: ["camera", "battery"],
    inBox: ["Pixel 10 Pro", "USB-C cable", "Quick switch adapter"],
    warranty: "1-year Google warranty via local service partner",
  },
  {
    id: "iphone-air-256gb", name: "Apple iPhone Air 256GB", brand: "Apple", category: "Smartphones", categorySlug: "smartphones",
    price: 339900, oldPrice: 369000, rating: 4.8, reviews: 248, image: iphoneAir,
    tagline: "The thinnest iPhone yet, with flagship silicon and a 48MP camera in a body you forget is in your pocket.",
    storageOptions: ["256GB", "512GB"],
    sub: "Flagship", storage: "256GB", ram: "12GB", screen: 6.6, battery: 4000, camera: 48, fiveG: true, uses: ["camera"],
    inBox: ["iPhone Air", "USB-C charge cable (1m)"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "iphone-15-pro-max", name: "Apple iPhone 15 Pro Max 256GB", brand: "Apple", category: "Smartphones", categorySlug: "smartphones",
    price: 489000, rating: 4.9, reviews: 312, image: iphone15ProMax,
    tagline: "Titanium build, 5x tetraprism telephoto and the A17 Pro chip — still one of the best cameras you can carry.",
    storageOptions: ["256GB", "512GB"],
    sub: "Flagship", storage: "256GB", ram: "8GB", screen: 6.7, battery: 4441, camera: 48, fiveG: true, uses: ["camera"],
    inBox: ["iPhone 15 Pro Max", "USB-C charge cable (1m)"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "pixel-9-pro-xl", name: "Google Pixel 9 Pro XL", brand: "Google", category: "Smartphones", categorySlug: "smartphones",
    price: 329900, oldPrice: 365000, rating: 4.8, reviews: 421, image: pixel9ProXl,
    tagline: "A big, bright display and Google's best-in-class photo processing, with battery to spare.",
    sub: "Flagship", storage: "256GB", ram: "16GB", screen: 6.8, battery: 5060, camera: 50, fiveG: true, uses: ["camera", "battery"],
    inBox: ["Pixel 9 Pro XL", "USB-C cable"],
    warranty: "1-year Google warranty via local service partner",
  },
  {
    id: "oneplus-13r", name: "OnePlus 13R 16GB", brand: "OnePlus", category: "Smartphones", categorySlug: "smartphones",
    price: 204900, oldPrice: 229000, rating: 4.8, reviews: 88, image: oneplus13r, badge: { label: "Hot", tone: "promo" },
    tagline: "16GB of RAM and a 6,000mAh cell — flagship stamina for roughly half the flagship price.",
    storageOptions: ["256GB", "512GB"],
    sub: "Flagship", storage: "256GB", ram: "16GB", screen: 6.78, battery: 6000, camera: 50, fiveG: true, uses: ["gaming", "battery", "value"],
    inBox: ["OnePlus 13R", "100W SuperVOOC adapter", "USB-C cable", "Case"],
    warranty: "1-year OnePlus warranty, serviced in Sri Lanka",
  },
  {
    id: "iphone-16-128gb", name: "Apple iPhone 16 128GB", brand: "Apple", category: "Smartphones", categorySlug: "smartphones",
    price: 279900, oldPrice: 309000, rating: 4.7, reviews: 98, image: iphone16,
    tagline: "The everyday iPhone — Camera Control, the A18 chip and a genuinely compact 6.1-inch body.",
    sub: "Flagship", storage: "128GB", ram: "8GB", screen: 6.1, battery: 3561, camera: 48, fiveG: true, uses: [],
    inBox: ["iPhone 16", "USB-C charge cable (1m)"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "galaxy-z-flip-7", name: "Samsung Galaxy Z Flip 7", brand: "Samsung", category: "Smartphones", categorySlug: "smartphones",
    price: 399900, oldPrice: 449000, rating: 4.6, reviews: 192, image: galaxyZFlip7, badge: { label: "Foldable", tone: "primary" },
    tagline: "A full-size screen that folds into your pocket, with a cover display that handles most of the day.",
    sub: "Foldable", storage: "256GB", ram: "12GB", screen: 6.7, battery: 5000, camera: 50, fiveG: true, uses: [],
    inBox: ["Galaxy Z Flip 7", "USB-C cable", "SIM tool"],
    warranty: "1-year Samsung Sri Lanka warranty",
  },
  {
    id: "pixel-9-pro-fold", name: "Google Pixel 9 Pro Fold", brand: "Google", category: "Smartphones", categorySlug: "smartphones",
    price: 549900, oldPrice: 599000, rating: 4.7, reviews: 184, image: pixel9ProFold, badge: { label: "Foldable", tone: "primary" },
    tagline: "An 8-inch tablet that closes into a phone, with Google's software smarts on the inside.",
    sub: "Foldable", storage: "256GB", ram: "16GB", screen: 8.0, battery: 4650, camera: 48, fiveG: true, uses: ["gaming"],
    inBox: ["Pixel 9 Pro Fold", "USB-C cable"],
    warranty: "1-year Google warranty via local service partner",
  },
  {
    id: "honor-magic-v5", name: "HONOR Magic V5 Foldable", brand: "HONOR", category: "Smartphones", categorySlug: "smartphones",
    price: 569900, oldPrice: 629000, rating: 4.6, reviews: 142, image: honorMagicV5, badge: { label: "Foldable", tone: "primary" },
    tagline: "One of the thinnest book-style foldables made, with a 5,820mAh battery that shouldn't fit but does.",
    sub: "Foldable", storage: "512GB", ram: "16GB", screen: 7.9, battery: 5820, camera: 50, fiveG: true, uses: ["battery", "gaming"],
    inBox: ["Magic V5", "66W adapter", "USB-C cable", "Case"],
    warranty: "1-year HONOR warranty, serviced in Sri Lanka",
  },
  {
    id: "iphone-17e-128gb", name: "Apple iPhone 17e 128GB", brand: "Apple", category: "Smartphones", categorySlug: "smartphones",
    price: 219900, oldPrice: 234900, rating: 4.7, reviews: 612, image: iphone17e, badge: { label: "New", tone: "success" },
    tagline: "The affordable iPhone, with the same 48MP main camera and years of iOS updates ahead of it.",
    sub: "Mid-Range", storage: "128GB", ram: "8GB", screen: 6.1, battery: 4005, camera: 48, fiveG: true, uses: ["value"],
    inBox: ["iPhone 17e", "USB-C charge cable (1m)"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "galaxy-s25-fe", name: "Samsung Galaxy S25 FE 256GB", brand: "Samsung", category: "Smartphones", categorySlug: "smartphones",
    price: 260900, oldPrice: 289900, rating: 4.6, reviews: 312, image: galaxyS25Fe,
    tagline: "Most of the S25 experience — big screen, clean software, long updates — at a mid-range price.",
    sub: "Mid-Range", storage: "256GB", ram: "8GB", screen: 6.7, battery: 4700, camera: 50, fiveG: true, uses: ["value"],
    inBox: ["Galaxy S25 FE", "USB-C cable", "SIM tool"],
    warranty: "1-year Samsung Sri Lanka warranty",
  },
  {
    id: "iphone-16e-128gb", name: "Apple iPhone 16e 128GB", brand: "Apple", category: "Smartphones", categorySlug: "smartphones",
    price: 250900, oldPrice: 279000, rating: 4.7, reviews: 76, image: iphone16e,
    tagline: "A straightforward iPhone with the A18 chip and the long battery life of the 6.1-inch body.",
    sub: "Mid-Range", storage: "128GB", ram: "8GB", screen: 6.1, battery: 4005, camera: 48, fiveG: true, uses: ["value"],
    inBox: ["iPhone 16e", "USB-C charge cable (1m)"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "oneplus-nord-ce5", name: "OnePlus Nord CE5 256GB", brand: "OnePlus", category: "Smartphones", categorySlug: "smartphones",
    price: 119900, oldPrice: 134000, rating: 4.5, reviews: 121, image: oneplusNordCe5, badge: { label: "Best Value", tone: "success" },
    tagline: "The value pick — 5,200mAh, fast charging and clean software under LKR 125,000.",
    sub: "Budget", storage: "256GB", ram: "8GB", screen: 6.7, battery: 5200, camera: 50, fiveG: true, uses: ["value", "battery"],
    inBox: ["Nord CE5", "80W adapter", "USB-C cable"],
    warranty: "1-year OnePlus warranty, serviced in Sri Lanka",
  },
  {
    id: "iphone-13-128gb", name: "Apple iPhone 13 128GB", brand: "Apple", category: "Smartphones", categorySlug: "smartphones",
    price: 149900, oldPrice: 169000, rating: 4.5, reviews: 92, image: iphone13,
    tagline: "Still a superb everyday phone: reliable cameras, solid battery and iOS support for years yet.",
    sub: "Budget", storage: "128GB", ram: "4GB", screen: 6.1, battery: 3240, camera: 12, fiveG: true, uses: ["value"],
    inBox: ["iPhone 13", "USB-C to Lightning cable"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
];

/** Non-phone products linked from New Arrivals and Flash Deals. */
export const otherProducts: CatalogItem[] = [
  {
    id: "airpods-pro-3", name: "AirPods Pro 3 with USB-C", brand: "Apple", category: "Audio", categorySlug: "audio",
    price: 89900, oldPrice: 99900, rating: 4.9, reviews: 1820, image: airpodsPro3, badge: { label: "Bundle", tone: "primary" },
    tagline: "Adaptive noise cancellation that reads the room, with a USB-C case and all-day battery.",
    extraSpecs: [
      { group: "Audio", rows: [["Drivers", "Custom high-excursion"], ["Noise control", "Adaptive ANC + Transparency"], ["Spatial audio", "Personalised, with head tracking"]] },
      { group: "Battery", rows: [["Buds", "Up to 8 hours playback"], ["With case", "Up to 30 hours"], ["Charging", "USB-C, MagSafe, Qi"]] },
    ],
    inBox: ["AirPods Pro 3", "USB-C charging case", "Ear tips (XS/S/M/L)", "USB-C cable"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "apple-watch-series-11", name: "Apple Watch Series 11 — GPS", brand: "Apple", category: "Accessories", categorySlug: "accessories",
    price: 195000, rating: 4.8, reviews: 612, image: appleWatchS11,
    tagline: "A brighter always-on display, deeper health sensing and a battery that finally lasts the weekend.",
    extraSpecs: [
      { group: "Display", rows: [["Type", "LTPO OLED always-on"], ["Sizes", "42mm / 46mm"]] },
      { group: "Health", rows: [["Sensors", "Heart rate, ECG, blood oxygen, temperature"], ["Water resistance", "50m"]] },
    ],
    inBox: ["Apple Watch Series 11", "Sport band", "Magnetic charging cable"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "airpods-max", name: "AirPods Max — Space Grey", brand: "Apple", category: "Audio", categorySlug: "audio",
    price: 175000, oldPrice: 199000, rating: 4.9, reviews: 421, image: airpodsMax, badge: { label: "Deal", tone: "promo" },
    tagline: "Over-ear listening with computational audio, memory-foam cushions and a machined aluminium frame.",
    extraSpecs: [
      { group: "Audio", rows: [["Drivers", "40mm dynamic"], ["Noise control", "Active ANC + Transparency"]] },
      { group: "Battery", rows: [["Playback", "Up to 20 hours with ANC on"], ["Charging", "USB-C"]] },
    ],
    inBox: ["AirPods Max", "Smart Case", "USB-C cable"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "ipad-air-5th-gen", name: "Apple iPad Air 5th Gen 256GB", brand: "Apple", category: "Tablets", categorySlug: "tablets",
    price: 165000, oldPrice: 189000, rating: 4.9, reviews: 538, image: ipadAir, badge: { label: "Deal", tone: "promo" },
    tagline: "The M-series iPad Air — light enough to read on, quick enough to edit on.",
    extraSpecs: [
      { group: "Display", rows: [["Size", "10.9-inch Liquid Retina"], ["Resolution", "2360 x 1640"]] },
      { group: "Performance", rows: [["Chip", "Apple M1"], ["Storage", "256GB"]] },
    ],
    inBox: ["iPad Air", "USB-C cable", "20W adapter"],
    warranty: "1-year Apple limited warranty, serviced in Sri Lanka",
  },
  {
    id: "meta-quest-3", name: "Meta Quest 3 128GB", brand: "Meta", category: "Gaming", categorySlug: "gaming",
    price: 194000, oldPrice: 219000, rating: 4.9, reviews: 312, image: metaQuest3, badge: { label: "Deal", tone: "promo" },
    tagline: "Full-colour mixed reality with pancake lenses and controllers light enough to forget.",
    extraSpecs: [
      { group: "Display", rows: [["Panels", "2064 x 2208 per eye"], ["Refresh", "Up to 120Hz"]] },
      { group: "Hardware", rows: [["Chip", "Snapdragon XR2 Gen 2"], ["Storage", "128GB"]] },
    ],
    inBox: ["Quest 3 headset", "Two Touch Plus controllers", "Charging cable", "Adapter"],
    warranty: "1-year Meta warranty via local distributor",
  },
  {
    id: "nintendo-switch", name: "Nintendo Switch OLED", brand: "Nintendo", category: "Gaming", categorySlug: "gaming",
    price: 99000, oldPrice: 115000, rating: 4.8, reviews: 274, image: nintendoSwitch, badge: { label: "Deal", tone: "promo" },
    tagline: "A 7-inch OLED screen for handheld play, and a dock for the TV when you get home.",
    extraSpecs: [
      { group: "Display", rows: [["Size", "7-inch OLED"], ["Resolution", "1280 x 720 handheld / 1080p docked"]] },
      { group: "Storage", rows: [["Internal", "64GB"], ["Expandable", "microSD up to 2TB"]] },
    ],
    inBox: ["Switch OLED console", "Joy-Con pair", "Dock", "HDMI cable", "AC adapter"],
    warranty: "1-year Nintendo warranty via local distributor",
  },
];

export const allProducts: CatalogItem[] = [...phones, ...otherProducts];

export const getProduct = (id?: string) => allProducts.find((p) => p.id === id);

/** Builds a spec table from whichever fields the item actually carries. */
export const buildSpecs = (p: CatalogItem) => {
  if (p.extraSpecs) return p.extraSpecs;
  const groups: { group: string; rows: [string, string][] }[] = [];
  if (p.screen) groups.push({ group: "Display", rows: [["Size", `${p.screen} inches`]] });
  const perf: [string, string][] = [];
  if (p.ram) perf.push(["RAM", p.ram]);
  if (p.storage) perf.push(["Storage", p.storage]);
  if (perf.length) groups.push({ group: "Performance", rows: perf });
  if (p.camera) groups.push({ group: "Camera", rows: [["Main sensor", `${p.camera}MP`]] });
  if (p.battery) groups.push({ group: "Battery", rows: [["Capacity", `${p.battery.toLocaleString()}mAh`]] });
  groups.push({ group: "Connectivity", rows: [["5G", p.fiveG ? "Supported" : "Not supported"]] });
  return groups;
};

export const fmtLKR = (n: number) => "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

/**
 * Deeper specs used by the comparison table. Keyed by catalog id so the
 * numbers stay attached to the same product everywhere on the site.
 */
export type PhoneDetail = {
  chipset: string;
  os: string;
  charging: string;
  weight: string;
  frontCamera: string;
  display: string;
};

export const phoneDetails: Record<string, PhoneDetail> = {
  "iphone-17-pro-max": { chipset: "Apple A19 Pro (3nm)", os: "iOS 26", charging: "40W wired · 25W MagSafe", weight: "233 g", frontCamera: "18MP Center Stage", display: "Super Retina XDR LTPO OLED, 120Hz" },
  "galaxy-s26-ultra": { chipset: "Snapdragon 8 Elite Gen 5", os: "Android 16, One UI 8", charging: "60W wired · 25W Qi2", weight: "218 g", frontCamera: "12MP Dual Pixel AF", display: "QHD+ Dynamic AMOLED 2X, 120Hz" },
  "galaxy-s26-plus": { chipset: "Snapdragon 8 Elite Gen 5", os: "Android 16, One UI 8", charging: "45W wired · 15W wireless", weight: "196 g", frontCamera: "12MP", display: "QHD+ Dynamic AMOLED 2X, 120Hz" },
  "pixel-10-pro": { chipset: "Google Tensor G5", os: "Android 16", charging: "30W wired · 23W wireless", weight: "207 g", frontCamera: "42MP ultrawide", display: "Super Actua LTPO OLED, 120Hz" },
  "iphone-air-256gb": { chipset: "Apple A19 Pro (3nm)", os: "iOS 26", charging: "35W wired · 25W MagSafe", weight: "165 g", frontCamera: "18MP Center Stage", display: "Super Retina XDR OLED, 120Hz" },
  "iphone-15-pro-max": { chipset: "Apple A17 Pro (3nm)", os: "iOS 26", charging: "27W wired · 15W MagSafe", weight: "221 g", frontCamera: "12MP TrueDepth", display: "Super Retina XDR LTPO OLED, 120Hz" },
  "pixel-9-pro-xl": { chipset: "Google Tensor G4", os: "Android 16", charging: "37W wired · 23W wireless", weight: "221 g", frontCamera: "42MP ultrawide", display: "Super Actua LTPO OLED, 120Hz" },
  "oneplus-13r": { chipset: "Snapdragon 8 Gen 3", os: "Android 15, OxygenOS 15", charging: "100W SuperVOOC", weight: "206 g", frontCamera: "16MP", display: "ProXDR LTPO AMOLED, 120Hz" },
  "iphone-16-128gb": { chipset: "Apple A18 (3nm)", os: "iOS 26", charging: "20W wired · 25W MagSafe", weight: "170 g", frontCamera: "12MP TrueDepth", display: "Super Retina XDR OLED, 60Hz" },
  "galaxy-z-flip-7": { chipset: "Snapdragon 8 Elite", os: "Android 16, One UI 8", charging: "25W wired · 15W wireless", weight: "188 g", frontCamera: "10MP", display: "Foldable Dynamic AMOLED 2X, 120Hz" },
  "pixel-9-pro-fold": { chipset: "Google Tensor G4", os: "Android 16", charging: "21W wired · 7.5W wireless", weight: "257 g", frontCamera: "10MP inner + 10MP cover", display: "8.0\" Super Actua Flex, 120Hz" },
  "honor-magic-v5": { chipset: "Snapdragon 8 Elite", os: "Android 15, MagicOS 9", charging: "66W wired · 50W wireless", weight: "217 g", frontCamera: "20MP", display: "7.9\" LTPO OLED foldable, 120Hz" },
  "iphone-17e-128gb": { chipset: "Apple A18 (3nm)", os: "iOS 26", charging: "20W wired · 15W MagSafe", weight: "167 g", frontCamera: "12MP TrueDepth", display: "Super Retina XDR OLED, 60Hz" },
  "galaxy-s25-fe": { chipset: "Exynos 2400e", os: "Android 16, One UI 8", charging: "45W wired · 15W wireless", weight: "190 g", frontCamera: "12MP", display: "Dynamic AMOLED 2X, 120Hz" },
  "iphone-16e-128gb": { chipset: "Apple A18 (3nm)", os: "iOS 26", charging: "20W wired", weight: "167 g", frontCamera: "12MP TrueDepth", display: "Super Retina XDR OLED, 60Hz" },
  "oneplus-nord-ce5": { chipset: "Dimensity 8350 Apex", os: "Android 15, OxygenOS 15", charging: "80W SuperVOOC", weight: "199 g", frontCamera: "16MP", display: "AMOLED, 120Hz" },
  "iphone-13-128gb": { chipset: "Apple A15 Bionic (5nm)", os: "iOS 26", charging: "20W wired · 15W MagSafe", weight: "174 g", frontCamera: "12MP TrueDepth", display: "Super Retina XDR OLED, 60Hz" },
};
