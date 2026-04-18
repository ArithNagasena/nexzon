import { Wallet, ShieldCheck, BadgeCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  { icon: Wallet, title: "0% Installment Plans", desc: "Pay in 3, 6 or 12 months with leading Sri Lankan banks." },
  { icon: BadgeCheck, title: "100% Genuine Devices", desc: "Sourced directly from authorized distributors." },
  { icon: Lock, title: "Secure Local Checkout", desc: "Pay with card, COD, or LankaQR — fully encrypted." },
  { icon: ShieldCheck, title: "Warranty-Backed", desc: "Local service centers + Cellexa care guarantee." },
];

const InstallmentBanner = () => (
  <section className="bg-surface py-14 sm:py-20">
    <div className="container-page">
      <div className="overflow-hidden rounded-3xl bg-gradient-brand-soft p-6 sm:p-10 lg:p-14 ring-1 ring-primary/10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-sm">
              Shop with confidence
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Easy installments. Genuine devices. Local support.
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              Owning the latest tech has never been easier. Split your payment, pay on delivery,
              and enjoy peace of mind with Cellexa's warranty-backed promise.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="brand" size="lg">View Installment Plans</Button>
              <Button variant="outline" size="lg">Talk to an Expert</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((it) => (
              <div key={it.title} className="rounded-2xl bg-background p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary-deep ring-1 ring-primary/15">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-foreground">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InstallmentBanner;
