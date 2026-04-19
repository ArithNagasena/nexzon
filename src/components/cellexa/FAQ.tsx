import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "Do you deliver islandwide?",
    a: "Yes — we deliver to all 25 districts in Sri Lanka. Orders placed before 2 PM are dispatched the same day. Standard delivery takes 1–3 working days depending on your location.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "Absolutely. COD is available islandwide for orders up to LKR 200,000. You can inspect the package before paying our courier.",
  },
  {
    q: "What payment options do you accept?",
    a: "We accept Visa, Mastercard, Amex, LankaQR, FriMi, eZ Cash, and bank transfers. We also offer 0% interest installment plans through major Sri Lankan banks.",
  },
  {
    q: "Are your products genuine and warranty-backed?",
    a: "Every product sold by Cellexa is 100% genuine and sourced from authorized distributors. All devices come with manufacturer warranty plus our Cellexa Care guarantee.",
  },
  {
    q: "Can I pre-order upcoming smartphones?",
    a: "Yes — pre-orders open as soon as global launches are announced. A small reservation deposit of LKR 5,000 secures your unit, refundable anytime before dispatch.",
  },
  {
    q: "What is your return policy?",
    a: "You can return unopened products within 7 days of delivery for a full refund. Defective items are covered under warranty service.",
  },
];

const FAQ = () => (
  <section className="bg-surface py-14 sm:py-20">
    <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.5fr]">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Help center</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Frequently asked questions</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Quick answers about delivery, payments, warranty and more. Can't find what you're looking for?
          Our support team is here 7 days a week.
        </p>
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-hero text-primary-foreground">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Need more help?</div>
              <div className="text-xs text-muted-foreground">Mon–Sun · 9 AM – 9 PM</div>
            </div>
          </div>
          <Button asChild className="mt-4 w-full" variant="outline">
            <Link to="/help">Visit Help Center</Link>
          </Button>
          <Button asChild className="mt-2 w-full" variant="ghost" size="sm">
            <Link to="/faq">Browse all FAQs</Link>
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`} className="mb-3 overflow-hidden rounded-xl border border-border bg-card px-5 shadow-soft">
            <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
