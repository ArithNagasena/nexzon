import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { site } from "@/data/site";

const linkSections: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Smartphones", to: "/category/smartphones" },
      { label: "Tablets", to: "/category/tablets" },
      { label: "Audio", to: "/category/audio" },
      { label: "Accessories", to: "/category/accessories" },
      { label: "Pre-Orders", to: "/pre-orders" },
      { label: "Guaranteed Buyback", to: "/buyback" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/help" },
      { label: "FAQ", to: "/faq" },
      { label: "Track Order", to: "/track-order" },
      { label: "Returns & Refunds", to: "/account/returns" },
      { label: "Warranty & Claims", to: "/account/warranty" },
      { label: "Trade-In", to: "/account/trade-in" },
      { label: "Verify a device", to: "/verify" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "Sign In", to: "/login" },
      { label: "Register", to: "/register" },
      { label: "Dashboard", to: "/account" },
      { label: "Orders", to: "/account/orders" },
      { label: "Loyalty & Rewards", to: "/account/rewards" },
      { label: "Compare", to: "/compare" },
    ],
  },
];

const contact = [
  {
    icon: Phone,
    label: "Call us",
    value: site.phoneDisplay,
    sub: site.hours,
    href: site.phoneHref,
  },
  {
    icon: Mail,
    label: "Email us",
    value: site.email,
    sub: "We reply within one working day",
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Visit the store",
    value: site.address.line1,
    sub: site.address.line2,
    href: null,
  },
];

const payments = ["Visa", "Mastercard", "Amex", "LankaQR", "FriMi", "eZ Cash", "COD"];

const legal = [
  { label: "Returns & Refund Policy", to: "/returns-policy" },
  { label: "Privacy Policy", to: "/help" },
  { label: "Terms of Service", to: "/help" },
  { label: "Warranty Policy", to: "/account/warranty" },
];

const Wordmark = () => (
  <Link to="/" className="inline-flex select-none flex-col items-stretch leading-none" aria-label="Nexzon Electronics Shop — Home">
    <span className="font-display text-[26px] font-extrabold uppercase tracking-[0.01em] text-background">
      Ne<span className="text-primary-glow">x</span>zon
    </span>
    <span className="mt-1 indent-[0.18em] text-center text-[7.5px] font-medium uppercase tracking-[0.36em] text-background/55">
      Electronics Shop
    </span>
  </Link>
);

const Footer = () => (
  <footer className="bg-foreground text-background/85">
    {/* Contact strip */}
    <div className="border-b border-background/10">
      <div className="container-page grid gap-px overflow-hidden py-8 sm:grid-cols-3">
        {contact.map((c) => {
          const body = (
            <>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-background/10">
                <c.icon className="h-5 w-5 text-primary-glow" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-background/50">
                  {c.label}
                </span>
                <span className="block truncate font-display text-base font-bold text-background">{c.value}</span>
                <span className="block truncate text-xs text-background/60">{c.sub}</span>
              </span>
            </>
          );
          return c.href ? (
            <a key={c.label} href={c.href} className="group flex items-center gap-4 py-3 transition-opacity hover:opacity-80 sm:px-2">
              {body}
            </a>
          ) : (
            <div key={c.label} className="flex items-center gap-4 py-3 sm:px-2">{body}</div>
          );
        })}
      </div>
    </div>

    {/* Main */}
    <div className="container-page py-10">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Wordmark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/65">
            Buying tech shouldn't feel like a gamble. Every phone, tablet and pair of headphones we sell
            comes from an authorised distributor, with the local warranty card in the box and a team in
            Colombo you can actually get on the phone.
          </p>

          <div className="mt-5 flex items-start gap-2.5 text-sm text-background/70">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
            <span>
              Showroom open {site.hours}
              <br />
              <span className="text-background/50">{site.address.full}</span>
            </span>
          </div>

          <Link
            to="/help"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-background/20 px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:border-primary-glow hover:text-primary-glow"
          >
            Contact support <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {linkSections.map((s) => (
          <nav key={s.title} aria-label={s.title} className="lg:col-span-2">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-background">{s.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {s.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-background/65 transition-colors hover:text-primary-glow">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-2">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-background">We accept</h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {payments.map((p) => (
              <li
                key={p}
                className="rounded-md border border-background/15 bg-background/5 px-2 py-1 text-[10px] font-semibold text-background/70"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-background/50">
            0% installment plans available with leading Sri Lankan banks.
          </p>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-background/10">
      <div className="container-page flex flex-col gap-3 py-5 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legal.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="transition-colors hover:text-primary-glow">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
