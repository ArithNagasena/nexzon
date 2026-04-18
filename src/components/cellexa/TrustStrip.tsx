import { Truck, ShieldCheck, Banknote, Wallet, BadgeCheck, LifeBuoy } from "lucide-react";

const features = [
  { icon: Truck, title: "Islandwide Delivery", sub: "Fast 1–3 day shipping" },
  { icon: ShieldCheck, title: "Secure Payments", sub: "256-bit SSL checkout" },
  { icon: Banknote, title: "Cash on Delivery", sub: "Pay when it arrives" },
  { icon: Wallet, title: "Easy Installments", sub: "0% from leading banks" },
  { icon: BadgeCheck, title: "Genuine Products", sub: "100% authentic stock" },
  { icon: LifeBuoy, title: "Warranty Support", sub: "Local service centers" },
];

const TrustStrip = () => (
  <section className="border-b border-border bg-background">
    <div className="container-page py-6 sm:py-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="group flex items-center gap-3 rounded-xl border border-transparent bg-surface px-3 py-3 transition-all hover:border-primary/20 hover:bg-accent"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-brand-soft text-primary transition-transform group-hover:scale-105">
              <f.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-foreground">{f.title}</div>
              <div className="truncate text-xs text-muted-foreground">{f.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
