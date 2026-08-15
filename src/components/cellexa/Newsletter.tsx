import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Gift, Zap, BellRing, Tag, CheckCircle2 } from "lucide-react";

const perks = [
  { icon: Zap, title: "Flash deals first", desc: "Early access before stock runs out." },
  { icon: BellRing, title: "Price-drop alerts", desc: "We watch your wishlist for you." },
  { icon: Tag, title: "Launch invites", desc: "Pre-order windows for new flagships." },
];

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="bg-background pb-14 sm:pb-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground sm:p-12 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                <Gift className="h-3.5 w-3.5" /> Members-only deals
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                Get LKR 1,000 off your first order.
              </h2>
              <p className="mt-3 max-w-md text-sm text-white/85 sm:text-base">
                Join Nexzon Insider — 40,000+ shoppers across Sri Lanka already get our best prices before
                anyone else.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {perks.map((p) => (
                  <li key={p.title} className="rounded-xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur">
                    <p.icon className="h-4 w-4 text-white" />
                    <div className="mt-2 text-xs font-bold leading-tight">{p.title}</div>
                    <div className="mt-1 text-[11px] leading-snug text-white/70">{p.desc}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {done ? (
                <div
                  role="status"
                  className="flex flex-col items-start gap-2 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur"
                >
                  <CheckCircle2 className="h-7 w-7 text-white" />
                  <p className="font-display text-lg font-bold">You're on the list.</p>
                  <p className="text-sm text-white/80">
                    Your LKR 1,000 welcome code is on its way to {email}. Check your promotions tab if it
                    isn't in your inbox.
                  </p>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-3 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur sm:flex-row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDone(true);
                  }}
                >
                  <div className="relative flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="h-12 w-full rounded-xl border-0 bg-white pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="h-12">
                    Subscribe
                  </Button>
                </form>
              )}

              <p className="mt-3 text-xs text-white/60">
                One email a week at most. Unsubscribe in a click — we never share your address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
