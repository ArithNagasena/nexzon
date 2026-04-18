import { Truck, Banknote, ShieldCheck, Wallet, BadgeCheck, Headphones } from "lucide-react";

const items = [
  { icon: Truck, text: "Islandwide Delivery" },
  { icon: Banknote, text: "Cash on Delivery" },
  { icon: Wallet, text: "0% Installments" },
  { icon: BadgeCheck, text: "100% Genuine Products" },
  { icon: ShieldCheck, text: "Warranty Support" },
  { icon: Headphones, text: "Local Support 7 Days" },
];

const PromoBar = () => (
  <div className="bg-gradient-deep text-primary-foreground text-xs sm:text-[13px]">
    <div className="container-page flex h-9 items-center overflow-hidden">
      {/* Mobile: marquee */}
      <div className="flex w-full overflow-hidden md:hidden">
        <div className="marquee-track flex shrink-0 items-center gap-8 whitespace-nowrap">
          {[...items, ...items].map((it, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 opacity-95">
              <it.icon className="h-3.5 w-3.5" />
              {it.text}
            </span>
          ))}
        </div>
      </div>
      {/* Desktop: spaced row */}
      <div className="hidden w-full items-center justify-between md:flex">
        {items.slice(0, 5).map((it) => (
          <span key={it.text} className="inline-flex items-center gap-1.5 opacity-95">
            <it.icon className="h-3.5 w-3.5" />
            {it.text}
          </span>
        ))}
        <span className="inline-flex items-center gap-3 text-white/80">
          <a href="#" className="hover:text-white">Track Order</a>
          <span className="opacity-40">|</span>
          <a href="#" className="hover:text-white">Help</a>
        </span>
      </div>
    </div>
  </div>
);

export default PromoBar;
