import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import promoAudio from "@/assets/promo-audio.jpg";

const PromoBanner = () => (
  <section className="bg-background pb-14 sm:pb-20">
    <div className="container-page">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Big editorial banner — light, curated */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:col-span-2">
          <div className="grid items-center gap-0 sm:grid-cols-2">
            <div className="p-6 sm:p-10">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-deep">
                Audio Edit
              </span>
              <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                Premium audio,
                <br />
                <span className="text-primary-deep">curated for you.</span>
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                Sony, Bose, JBL &amp; AirPods — up to 30% off this week. Free islandwide delivery on every audio order.
              </p>
              <Button variant="hero" size="lg" className="mt-6">
                Shop Audio <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-48 sm:h-full sm:min-h-[320px]">
              <img
                src={promoAudio}
                alt="Premium headphones promotion"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-card via-card/0 to-transparent sm:from-card/80" />
            </div>
          </div>
        </div>

        {/* Small banner — deep navy, premium emphasis */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-deep p-6 text-primary-foreground shadow-card sm:p-8">
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-primary-glow/15 blur-3xl" />
          <div className="relative">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur ring-1 ring-white/15">
              Pre-Order
            </span>
            <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
              The latest flagships,
              <br />
              first in line.
            </h3>
            <p className="mt-2 text-sm text-white/75">
              Reserve with just LKR 5,000 — fully refundable.
            </p>
          </div>
          <div className="relative mt-6 flex items-center justify-between gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary-deep transition-colors hover:bg-white/90">
              Reserve Now <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium text-white/70">From LKR 8,500/mo</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PromoBanner;
