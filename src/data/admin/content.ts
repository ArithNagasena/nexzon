/**
 * Merchandising content behind /admin/content.
 *
 * The homepage is twelve hand-built sections rendered in a fixed order by
 * `pages/Index.tsx`. Listing them here with an order and a visibility flag is
 * what lets a merchandiser run a launch campaign without a code change.
 */

export type Section = {
  id: string;
  /** Matches the component name under components/NexZon. */
  component: string;
  label: string;
  description: string;
  order: number;
  visible: boolean;
  /** Sections that pick products rather than render fixed copy. */
  picks?: number;
};

export const homepageSections: Section[] = [
  { id: "hero", component: "Hero", label: "Hero banner", description: "Full-width launch campaign with headline and CTA buttons.", order: 1, visible: true },
  { id: "spotlight", component: "PhoneSpotlight", label: "Phone spotlight", description: "Editorial feature banner with selected phones beside it.", order: 2, visible: true, picks: 4 },
  { id: "categories", component: "Categories", label: "Featured categories", description: "Rounded cards for the five shopping categories.", order: 3, visible: true },
  { id: "flash", component: "FlashDeals", label: "Flash deals", description: "Countdown slots driven by the flash-deal schedule.", order: 4, visible: true, picks: 4 },
  { id: "brands", component: "Brands", label: "Featured brands", description: "Brand strip linking to each brand page.", order: 5, visible: true },
  { id: "new", component: "NewArrivals", label: "New arrivals", description: "Product cards for recently listed stock.", order: 6, visible: true, picks: 8 },
  { id: "promo", component: "PromoBanners", label: "Promo banners", description: "Mid-page campaign banners.", order: 7, visible: true },
  { id: "best", component: "BestSellers", label: "Best sellers", description: "Second product showcase, styled to contrast with new arrivals.", order: 8, visible: true, picks: 8 },
  { id: "bento", component: "ValueBento", label: "Value bento", description: "Installments, genuine stock, warranty and local support tiles.", order: 9, visible: true },
  { id: "testimonials", component: "Testimonials", label: "Testimonials", description: "Customer quotes that make the store feel active.", order: 10, visible: true },
  { id: "faq", component: "FAQ", label: "FAQ preview", description: "Expandable delivery, payment and warranty questions.", order: 11, visible: true, picks: 5 },
  { id: "newsletter", component: "Newsletter", label: "Newsletter signup", description: "Deals and launch alerts signup block.", order: 12, visible: true },
];

export type Banner = {
  id: string;
  slot: "hero" | "promo" | "bar";
  headline: string;
  sub: string;
  link: string;
  starts: string;
  ends: string;
  live: boolean;
};

export const slotMeta: Record<Banner["slot"], string> = {
  hero: "Hero slide",
  promo: "Promo banner",
  bar: "Top promo bar",
};

export const banners: Banner[] = [
  { id: "B-01", slot: "hero", headline: "The iPhone 17 Pro Max has landed", sub: "Order today for islandwide delivery in 1–3 days", link: "/product/iphone-17-pro-max", starts: "14 Aug 2026", ends: "31 Aug 2026", live: true },
  { id: "B-02", slot: "hero", headline: "Galaxy S26 Ultra — 200MP, S Pen included", sub: "Trade in any Galaxy and save LKR 40,000", link: "/product/galaxy-s26-ultra", starts: "1 Aug 2026", ends: "30 Sep 2026", live: true },
  { id: "B-03", slot: "promo", headline: "0% installments on every flagship", sub: "3, 6, 12 or 24 months with all major banks", link: "/shop", starts: "1 Jan 2026", ends: "31 Dec 2026", live: true },
  { id: "B-04", slot: "promo", headline: "Audio week — up to 20% off", sub: "AirPods, JBL and Sony", link: "/category/audio", starts: "25 Aug 2026", ends: "1 Sep 2026", live: false },
  { id: "B-05", slot: "bar", headline: "Free islandwide delivery over LKR 25,000", sub: "", link: "/help", starts: "1 Jan 2026", ends: "31 Dec 2026", live: true },
  { id: "B-06", slot: "bar", headline: "Cash on delivery available", sub: "", link: "/help", starts: "1 Jan 2026", ends: "31 Dec 2026", live: true },
  { id: "B-07", slot: "bar", headline: "Genuine stock with local warranty", sub: "", link: "/verify", starts: "1 Jan 2026", ends: "31 Dec 2026", live: true },
];

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  topic: string;
  onHomepage: boolean;
};

export const faqEntries: FaqEntry[] = [
  { id: "F-01", question: "How long does delivery take?", answer: "Standard delivery reaches anywhere in Sri Lanka in 1–3 working days. Express delivery arrives the next working day if you order before 2 PM.", topic: "Delivery", onHomepage: true },
  { id: "F-02", question: "Can I pay cash on delivery?", answer: "Yes. Cash on delivery is available islandwide and you may inspect the device before you pay.", topic: "Payment", onHomepage: true },
  { id: "F-03", question: "Are the products genuine?", answer: "Every device is official local stock with a Sri Lankan warranty. You can check any IMEI on our verification page before or after buying.", topic: "Products", onHomepage: true },
  { id: "F-04", question: "What does the warranty cover?", answer: "Manufacturer warranty against defects, serviced locally. Accidental damage and liquid damage are not covered unless you add Nexzon Care.", topic: "Warranty", onHomepage: true },
  { id: "F-05", question: "How do pre-orders work?", answer: "You pay a deposit to hold your place in the queue. Units are allocated in the order reservations were taken, and the balance is due before dispatch.", topic: "Pre-orders", onHomepage: true },
  { id: "F-06", question: "Can I return a device I changed my mind about?", answer: "Yes, within 7 days if the seal is unbroken. Gold members and above get 14 days.", topic: "Returns", onHomepage: false },
  { id: "F-07", question: "Do you offer installments?", answer: "0% installment plans over 3, 6, 12 or 24 months are available with all major Sri Lankan banks on qualifying products.", topic: "Payment", onHomepage: false },
  { id: "F-08", question: "Can I trade in my old phone?", answer: "Get an instant quote online, we collect it free when your new device is delivered, and the credit is applied after inspection.", topic: "Trade-in", onHomepage: false },
];

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: number;
  approved: boolean;
  featured: boolean;
};

export const testimonials: Testimonial[] = [
  { id: "T-01", name: "Ravindu G.", city: "Nugegoda", quote: "Ordered at 11 PM and it was at my door the next afternoon. The IMEI checked out on their verify page too.", rating: 5, approved: true, featured: true },
  { id: "T-02", name: "Thilini A.", city: "Maharagama", quote: "Paid in installments with no interest and the process took about four minutes at checkout.", rating: 5, approved: true, featured: true },
  { id: "T-03", name: "Pasindu H.", city: "Matara", quote: "The trade-in quote they gave online was exactly what I got after inspection. No haggling.", rating: 5, approved: true, featured: true },
  { id: "T-04", name: "Amaya S.", city: "Jaffna", quote: "Delivery to Jaffna was faster than shops in Colombo quoted me. Cash on delivery worked fine.", rating: 4, approved: true, featured: false },
  { id: "T-05", name: "Dinesh K.", city: "Kurunegala", quote: "Took a while to reach me and the courier called late.", rating: 2, approved: false, featured: false },
];

export type Subscriber = { email: string; source: string; joined: string; active: boolean };

export const subscriberCount = 3184;

export const subscribers: Subscriber[] = [
  { email: "ravindu.g@outlook.com", source: "Homepage signup", joined: "18 Aug 2026", active: true },
  { email: "sanduni.peiris@gmail.com", source: "Checkout opt-in", joined: "17 Aug 2026", active: true },
  { email: "nimasha.e@gmail.com", source: "Homepage signup", joined: "16 Aug 2026", active: true },
  { email: "kavindu.r@gmail.com", source: "Pre-order alert", joined: "14 Aug 2026", active: true },
  { email: "dinesh.kumara@gmail.com", source: "Checkout opt-in", joined: "30 Jul 2026", active: false },
];
