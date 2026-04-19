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
  <section className="border-b border-border bg-background">
    <div className="container-page py-8 sm:py-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-6 text-center transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent hover:shadow-sm"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-brand-soft text-primary transition-transform group-hover:scale-105">
              <f.icon className="h-6 w-6" />
            </div>
            <div className="text-sm font-semibold text-foreground">{f.title}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
