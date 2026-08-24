import { Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Truck, Wallet, Star } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Islandwide delivery", desc: "Dispatched same day on orders before 2 PM." },
  { icon: Wallet, title: "0% installments", desc: "Split any order over 3, 6 or 12 months." },
  { icon: BadgeCheck, title: "Genuine, warranty-backed", desc: "Authorized stock, serviced locally." },
];

const Wordmark = ({ tone = "dark" }: { tone?: "dark" | "light" }) => (
  <Link to="/" className="inline-flex select-none flex-col items-stretch leading-none" aria-label="Nexzon Electronics Shop — Home">
    <span
      className={`font-display text-[22px] font-extrabold uppercase tracking-[0.01em] ${
        tone === "light" ? "text-background" : "text-foreground"
      }`}
    >
      Ne<span className={tone === "light" ? "text-primary-glow" : "text-primary"}>x</span>zon
    </span>
    <span
      className={`mt-1 indent-[0.18em] text-center text-[7px] font-medium uppercase tracking-[0.36em] ${
        tone === "light" ? "text-background/55" : "text-muted-foreground"
      }`}
    >
      Electronics Shop
    </span>
  </Link>
);

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  /** Rendered under the form card — usually the link to the opposite flow. */
  footer?: React.ReactNode;
};

/**
 * Shared split-screen shell for the auth pages: a brand panel on the left,
 * the form on the right. The panel collapses away below `lg` so small screens
 * get the form immediately instead of scrolling past marketing.
 */
const AuthLayout = ({ eyebrow, title, subtitle, children, footer }: Props) => (
  <div className="min-h-screen bg-background lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
    {/* Brand panel */}
    <aside className="relative hidden overflow-hidden bg-gradient-deep p-12 text-primary-foreground lg:flex lg:flex-col">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative">
        <Wordmark tone="light" />
      </div>

      <div className="relative my-auto max-w-md py-10">
        <h2 className="font-display text-4xl font-extrabold leading-tight">
          Sri Lanka's trusted tech store.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          One account for faster checkout, order tracking, warranty claims and member-only pricing.
        </p>

        <ul className="mt-8 space-y-5">
          {benefits.map((b) => (
            <li key={b.title} className="flex gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
                <b.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-bold">{b.title}</span>
                <span className="block text-xs leading-relaxed text-white/70">{b.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden />
          ))}
          <span className="ml-1.5 text-xs font-bold">4.8 / 5</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-white/80">
          “Sealed box, local warranty card, and it reached Kandy in two days.”
        </p>
        <p className="mt-2 text-[11px] font-semibold text-white/60">
          Arith N. · one of 12,480 verified reviews
        </p>
      </div>
    </aside>

    {/* Form side */}
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-8">
        <span className="lg:hidden">
          <Wordmark />
        </span>
        <Link
          to="/"
          className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to store
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
          )}
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {subtitle && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}

          <div className="mt-7">{children}</div>

          {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
        </div>
      </main>

      <footer className="px-5 pb-6 text-center text-[11px] text-muted-foreground sm:px-8">
        © {new Date().getFullYear()} Nexzon Electronics Shop ·{" "}
        <Link to="/help" className="hover:text-primary">Support</Link> ·{" "}
        <Link to="/returns-policy" className="hover:text-primary">Policies</Link>
      </footer>
    </div>
  </div>
);

export default AuthLayout;
