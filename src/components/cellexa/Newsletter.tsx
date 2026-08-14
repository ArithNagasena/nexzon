import { Button } from "@/components/ui/button";
import { Mail, Gift } from "lucide-react";

const Newsletter = () => (
  <section className="bg-background pb-14 sm:pb-20">
    <div className="container-page">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground sm:p-12 lg:p-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
              <Gift className="h-3.5 w-3.5" /> Members-only deals
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Get LKR 1,000 off your first order.
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/85 sm:text-base">
              Subscribe to Nexzon Insider and get early access to launches, flash deals, and exclusive
              discounts straight to your inbox.
            </p>
          </div>

          <form
            className="flex flex-col gap-3 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="h-12 w-full rounded-xl border-0 bg-white/95 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-white"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="h-12">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default Newsletter;
