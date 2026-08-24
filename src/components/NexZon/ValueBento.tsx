import { Wallet, ShieldCheck, BadgeCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import promoAudio from "@/assets/promo-audio.jpg";
import preorderTablet from "@/assets/preorder-tablet.png";

const trustItems = [
  { icon: Wallet, title: "0% Installment Plans", desc: "Pay in 3, 6 or 12 months with leading Sri Lankan banks." },
  { icon: BadgeCheck, title: "100% Genuine Devices", desc: "Sourced directly from authorized distributors." },
  { icon: Lock, title: "Secure Local Checkout", desc: "Pay with card, COD, or LankaQR — fully encrypted." },
  { icon: ShieldCheck, title: "Warranty-Backed", desc: "Local service centers + Nexzon care guarantee." },
];

const ValueBento = () => (
  <section className="bg-surface section-y">
    <div className="container-page">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: Audio Sale */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-promo p-5 text-promo-foreground shadow-lift sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid h-full items-center gap-6 sm:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                Audio Sale
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                Premium Audio,<br /> up to 30% off.
              </h3>
              <p className="mt-3 hidden max-w-sm text-sm text-white/90 sm:block sm:text-base">
                Shop Sony, Bose, JBL &amp; AirPods. Free islandwide delivery on all audio orders this week.
              </p>
              <Button asChild variant="hero" size="lg" className="mt-4 sm:mt-5">
                <Link to="/category/audio">Shop Audio</Link>
              </Button>
            </div>
            <div className="relative h-36 sm:h-56">
              <img
                src={promoAudio}
                alt="Premium headphones promotion"
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-xl object-cover mix-blend-luminosity opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Right: stacked pre-order + installment tiles */}
        <div className="flex flex-col gap-4">
          <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-deep p-6 text-primary-foreground shadow-lift sm:p-8">
            <img
              src={preorderTablet}
              alt="Tablet and wearables pre-order"
              loading="lazy"
              className="pointer-events-none absolute -right-6 bottom-0 h-36 w-auto object-contain opacity-70 mix-blend-luminosity sm:-right-4 sm:h-44"
            />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-56 w-56 rounded-full bg-primary-glow/40 blur-3xl" />
            <div className="relative">
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                Pre-Order
              </span>
              <h3 className="mt-3 font-display text-lg font-extrabold leading-tight sm:text-xl lg:text-2xl">
                Tablets &amp; wearables. Reserve yours.
              </h3>
            </div>
            <div className="relative mt-4">
              <Button asChild variant="hero" size="default">
                <Link to="/pre-orders">Reserve Now</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 rounded-2xl bg-gradient-brand-soft p-6 ring-1 ring-primary/10 sm:p-8">
            <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary shadow-sm">
              Shop with confidence
            </span>
            <h3 className="mt-3 font-display text-lg font-extrabold leading-tight text-foreground sm:text-xl lg:text-2xl">
              Easy installments. Genuine devices. Local support.
            </h3>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Button asChild variant="brand" size="default">
                <Link to="/shop">View Installment Plans</Link>
              </Button>
              <Link to="/help" className="text-sm font-semibold text-primary hover:underline">
                Talk to an expert →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* On a phone these four are a reassurance glance, not reading material —
          the icon and the claim carry it, the sentence is desktop-only. */}
      <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-4">
        {trustItems.map((it) => (
          <div key={it.title} className="rounded-2xl bg-background p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift sm:p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-hero text-primary-foreground sm:h-11 sm:w-11">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-display text-sm font-bold leading-snug text-foreground sm:mt-4 sm:text-base">{it.title}</h3>
            <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground sm:block">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueBento;
