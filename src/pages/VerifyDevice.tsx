import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Search,
  Smartphone,
  Info,
  Phone,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";
import { lookupImei, sampleImeis, whyItMatters, type VerifyResult } from "@/data/verify";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const ResultCard = ({ result }: { result: VerifyResult }) => {
  if (result.kind === "invalid") {
    return (
      <div role="status" className="rounded-2xl border border-warning/40 bg-warning/10 p-6">
        <ShieldAlert className="h-8 w-8 text-warning-foreground" />
        <h2 className="mt-3 font-display text-lg font-extrabold text-foreground">That's not a valid IMEI</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          An IMEI is 15 digits and carries a check digit, and this one doesn't add up — most likely a typo.
          Dial <strong className="text-foreground">*#06#</strong> on the handset to see the real one.
        </p>
      </div>
    );
  }

  if (result.kind === "nexzon") {
    return (
      <div role="status" className="rounded-2xl border border-success/40 bg-success/10 p-6">
        <ShieldCheck className="h-8 w-8 text-success" />
        <h2 className="mt-3 font-display text-lg font-extrabold text-success">
          Genuine — bought from Nexzon
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          This is official Sri Lankan stock, sold by us and registered to your account.
        </p>
        <dl className="mt-4 space-y-2 border-t border-success/20 pt-4 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Model</dt><dd className="text-right font-semibold text-foreground">{result.model}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Sold on</dt><dd className="font-semibold text-foreground">{result.soldOn}</dd></div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Order</dt>
            <dd><Link to={`/account/orders/${result.orderId}`} className="font-semibold text-primary hover:underline">{result.orderId}</Link></dd>
          </div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Warranty until</dt><dd className="font-semibold text-foreground">{result.warrantyEnds}</dd></div>
          {result.care && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Nexzon Care</dt>
              <dd className="inline-flex items-center gap-1 font-semibold text-success"><BadgeCheck className="h-3.5 w-3.5" /> Active</dd>
            </div>
          )}
        </dl>
        <Button asChild size="sm" className="mt-5">
          <Link to="/account/warranty">Manage this device</Link>
        </Button>
      </div>
    );
  }

  if (result.kind === "official") {
    return (
      <div role="status" className="rounded-2xl border border-primary/40 bg-accent p-6">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h2 className="mt-3 font-display text-lg font-extrabold text-foreground">
          Official Sri Lankan stock
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Not sold by us, but it is genuine local stock with a valid manufacturer warranty.
        </p>
        <dl className="mt-4 space-y-2 border-t border-primary/20 pt-4 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Model</dt><dd className="text-right font-semibold text-foreground">{result.model}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Distributor</dt><dd className="text-right font-semibold text-foreground">{result.distributor}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Warranty until</dt><dd className="font-semibold text-foreground">{result.warrantyEnds}</dd></div>
        </dl>
      </div>
    );
  }

  return (
    <div role="status" className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6">
      <ShieldX className="h-8 w-8 text-destructive" />
      <h2 className="mt-3 font-display text-lg font-extrabold text-destructive">
        Not registered as official stock
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        We can't match this IMEI to any authorised Sri Lankan distributor. It's most likely a grey import —
        which means no local warranty, and a risk of losing network service if it isn't registered.
      </p>
      <p className="mt-3 text-sm font-semibold text-foreground">{result.model}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild size="sm"><a href={site.phoneHref}><Phone className="h-3.5 w-3.5" /> Talk to us about it</a></Button>
        <Button asChild size="sm" variant="outline"><Link to="/account/trade-in">Trade it in</Link></Button>
      </div>
    </div>
  );
};

const VerifyDevice = () => {
  const [imei, setImei] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);

  useEffect(() => {
    document.title = "Check if your phone is genuine — Nexzon";
  }, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(lookupImei(imei));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="container-page pt-5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Verify a device</span>
          </nav>
        </div>

        {/* Hero + checker */}
        <section className="container-page pt-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-deep p-8 text-primary-foreground sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" /> Free · no account needed
                </span>
                <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                  Is your phone genuine?
                </h1>
                <p className="mt-4 max-w-lg text-sm text-white/85 sm:text-base">
                  Grey imports look identical in the box and carry no local warranty. Paste the IMEI and
                  we'll tell you straight — even if you bought it somewhere else.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                <form onSubmit={check}>
                  <label htmlFor="imei" className="text-xs font-semibold text-white/80">
                    IMEI number
                  </label>
                  <div className="relative mt-2">
                    <Smartphone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="imei"
                      value={imei}
                      onChange={(e) => setImei(e.target.value)}
                      inputMode="numeric"
                      maxLength={19}
                      required
                      placeholder="15 digits"
                      className="h-12 w-full rounded-xl border-0 bg-white pl-11 pr-4 text-sm tracking-wider text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-white/60">
                    Dial <strong className="text-white">*#06#</strong> on the handset to display it.
                  </p>
                  <Button type="submit" variant="hero" size="lg" className="mt-4 w-full">
                    <Search className="h-4 w-4" /> Check this device
                  </Button>
                </form>

                <div className="mt-4 border-t border-white/15 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Try an example</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sampleImeis.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => { setImei(s.value); setResult(lookupImei(s.value)); }}
                        className="rounded-lg bg-white/15 px-2.5 py-1.5 text-[11px] font-semibold transition-colors hover:bg-white/25"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Result */}
        {result && (
          <section className="container-page pt-8">
            <div className="mx-auto max-w-2xl">
              <ResultCard result={result} />
            </div>
          </section>
        )}

        {/* Why */}
        <section className="container-page pt-14">
          <h2 className="font-display text-xl font-bold">Why it matters in Sri Lanka</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {whyItMatters.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <ShieldAlert className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-display text-sm font-bold text-foreground">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-page py-14">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="font-display text-lg font-bold">Everything we sell passes this check</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Official distributor stock, local warranty, registered before it leaves us.
              </p>
            </div>
            <Button asChild className="shrink-0">
              <Link to="/category/smartphones">Shop genuine phones <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            We check the IMEI checksum and our distributor records. A device we can't match isn't necessarily
            stolen — but it does mean no authorised local warranty.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VerifyDevice;
