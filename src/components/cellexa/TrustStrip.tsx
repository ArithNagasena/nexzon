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
  <section className="border-y border-warning/20 bg-gradient-to-r from-warning/10 via-promo/5 to-warning/10">
    <div className="container-page py-5 sm:py-6">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-warning/25 bg-card/80 px-3 py-3 text-center shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-promo/40 hover:shadow-md"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-promo to-warning text-promo-foreground shadow-sm transition-transform group-hover:scale-105">
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
