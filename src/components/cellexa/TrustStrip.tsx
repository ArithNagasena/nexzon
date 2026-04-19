import { Truck, ShieldCheck, Banknote, Wallet, BadgeCheck, LifeBuoy } from "lucide-react";

const features = [
  { icon: Truck, title: "Islandwide Delivery" },
  { icon: ShieldCheck, title: "Secure Payments" },
  { icon: Banknote, title: "Cash on Delivery" },
  { icon: Wallet, title: "Easy Installments" },
  { icon: BadgeCheck, title: "Genuine Products" },
  { icon: LifeBuoy, title: "Warranty Support" },
];

const TrustStrip = () => (
  <section className="border-y border-primary/10 bg-gradient-brand-soft">
    <div className="container-page py-5 sm:py-6">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-primary/15 bg-card px-3 py-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <f.icon className="h-4 w-4" />
            </div>
            <div className="text-xs font-semibold text-foreground">{f.title}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
