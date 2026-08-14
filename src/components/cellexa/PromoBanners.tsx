import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Tag } from "lucide-react";
import megaSale from "@/assets/hero-megasale.jpg";
import preorderPromo from "@/assets/promo-preorder.jpg";

const PromoBanners = () => (
  <section className="bg-surface py-14 sm:py-20">
    <div className="container-page">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Campaign banner. The source photo is blue, so a violet scrim pulls it back
            into the brand palette while the phones stay readable on the right. */}
        <Link
          to="/shop"
          className="group relative col-span-1 min-h-[320px] overflow-hidden rounded-3xl lg:col-span-2"
        >
          <img
            src={megaSale}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary/80 to-primary/10" />
          <div className="relative flex h-full max-w-md flex-col justify-center gap-3 p-8 sm:p-10">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-promo px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-promo-foreground">
              <Tag className="h-3.5 w-3.5" /> Limited Time
            </span>
            <h3 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              Mega Tech Sale — up to 30% off
            </h3>
            <p className="text-sm text-white/85">
              Genuine products, warranty backed. Free islandwide delivery on orders over LKR 25,000.
            </p>
            <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-bold text-primary shadow-lift transition-transform group-hover:-translate-y-0.5">
              View Deals <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>

        {/* Pre-order tile — this photo is already violet/magenta, so it needs only a
            readability scrim rather than a colour correction. */}
        <Link to="/pre-orders" className="group relative min-h-[320px] overflow-hidden rounded-3xl">
          <img
            src={preorderPromo}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
          <div className="relative flex h-full flex-col justify-end gap-2 p-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-background/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Pre-Order
            </span>
            <h3 className="font-display text-2xl font-extrabold leading-tight text-white">
              Next-gen flagships, reserved
            </h3>
            <p className="text-sm text-white/80">Pay a small deposit and skip the launch-day queue.</p>
            <span className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-white">
              Reserve now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default PromoBanners;
