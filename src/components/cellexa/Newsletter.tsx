import { Button } from "@/components/ui/button";
import { Mail, Gift } from "lucide-react";

const Newsletter = () => (
  <section className="bg-background pb-14 sm:pb-20">
    <div className="container-page">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12 lg:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary-glow/10 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-deep">
              <Gift className="h-3.5 w-3.5" /> Members-only deals
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Get <span className="text-primary-deep">LKR 1,000 off</span> your first order.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Join Cellexa Insider for early access to launches, flash deals, and exclusive subscriber discounts.
            </p>
          </div>

          <form
            className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
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
