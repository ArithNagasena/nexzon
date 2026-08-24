import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import ProductCard, { type Product } from "./ProductCard";
import airpodsMax from "@/assets/product-airpods-max.png";
import ipadAir from "@/assets/product-ipad-air.png";
import nintendoSwitch from "@/assets/product-nintendo-switch.png";
import metaQuest3 from "@/assets/product-meta-quest-3.png";

const deals: Product[] = [
  { id: "airpods-max", name: "AirPods Max — Space Grey", brand: "Apple", price: 175000, oldPrice: 199000, rating: 4.9, reviews: 421, image: airpodsMax, badge: { label: "Deal", tone: "promo" } },
  { id: "ipad-air-5th-gen", name: "Apple iPad Air 5th Gen 256GB", brand: "Apple", price: 165000, oldPrice: 189000, rating: 4.9, reviews: 538, image: ipadAir, badge: { label: "Deal", tone: "promo" } },
  { id: "meta-quest-3", name: "Meta Quest 3 128GB", brand: "Meta", price: 194000, oldPrice: 219000, rating: 4.9, reviews: 312, image: metaQuest3, badge: { label: "Deal", tone: "promo" } },
  { id: "nintendo-switch", name: "Nintendo Switch OLED", brand: "Nintendo", price: 99000, oldPrice: 115000, rating: 4.8, reviews: 274, image: nintendoSwitch, badge: { label: "Deal", tone: "promo" } },
];

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

/** Counts down to the next local midnight, so the "today only" framing stays true. */
const useMidnightCountdown = () => {
  const endOfDay = useMemo(() => {
    const d = new Date();
    d.setHours(24, 0, 0, 0);
    return d.getTime();
  }, []);

  const [remaining, setRemaining] = useState(() => endOfDay - Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(endOfDay - Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [endOfDay]);

  const clamped = Math.max(0, remaining);
  return {
    hours: Math.floor(clamped / 3_600_000),
    minutes: Math.floor((clamped % 3_600_000) / 60_000),
    seconds: Math.floor((clamped % 60_000) / 1000),
  };
};

const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-background/20 font-display text-lg font-extrabold tabular-nums text-white backdrop-blur sm:h-14 sm:w-14 sm:text-2xl">
      {pad(value)}
    </span>
    <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">{label}</span>
  </div>
);

const FlashDeals = () => {
  const { hours, minutes, seconds } = useMidnightCountdown();

  return (
    <section className="bg-gradient-deep section-y">
      <div className="container-page">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-promo px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-promo-foreground">
              <Zap className="h-3.5 w-3.5" /> Flash Deals
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">Deal of the Day</h2>
            <p className="mt-2 hidden max-w-lg text-sm text-white/75 sm:block">
              Today's biggest markdowns on audio, tablets and gaming — while stocks last.
            </p>
          </div>

          <div className="flex items-end gap-4">
            <div
              className="flex items-center gap-2"
              role="timer"
              aria-label={`Offer ends in ${hours} hours ${minutes} minutes ${seconds} seconds`}
            >
              <TimeBox value={hours} label="Hrs" />
              <span className="pb-5 font-display text-xl font-bold text-white/50">:</span>
              <TimeBox value={minutes} label="Min" />
              <span className="pb-5 font-display text-xl font-bold text-white/50">:</span>
              <TimeBox value={seconds} label="Sec" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 text-sm font-bold text-primary shadow-lift transition-transform hover:-translate-y-0.5"
          >
            Shop all deals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;
