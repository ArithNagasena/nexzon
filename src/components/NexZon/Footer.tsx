import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

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
    short: "Call",
    value: site.phoneDisplay,
    sub: site.hours,
    href: site.phoneHref,
  },
  {
    icon: Mail,
    label: "Email us",
    short: "Email",
    value: site.email,
    sub: "We reply within one working day",
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Visit the store",
    short: "Visit",
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

/**
 * Below `lg` each link column collapses into an accordion row, so the footer
 * doesn't stack into three screens of links on a phone. From `lg` up the
 * toggle is hidden and the whole list is on screen as a normal column.
 */
const FooterNav = ({ section }: { section: (typeof linkSections)[number] }) => {
  const [open, setOpen] = useState(false);
  const id = `footer-nav-${section.title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <nav
      aria-label={section.title}
      className="border-b border-background/10 lg:col-span-2 lg:border-0"
    >
      <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-background">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between py-3.5 text-left lg:hidden"
        >
          {section.title}
          <ChevronDown className={cn("h-4 w-4 text-background/50 transition-transform", open && "rotate-180")} />
        </button>
        <span className="hidden lg:block">{section.title}</span>
      </h2>

      <ul id={id} className={cn("space-y-2.5 pb-4 lg:mt-4 lg:block lg:pb-0", !open && "hidden")}>
        {section.links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-background/65 transition-colors hover:text-primary-glow">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-foreground text-background/85">
    {/* Contact strip — three tap targets on a phone, full detail from sm up */}
    <div className="border-b border-background/10">
      <div className="container-page grid grid-cols-3 gap-2 py-5 sm:gap-px sm:py-8">
        {contact.map((c) => {
          const body = (
            <>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background/10 sm:h-11 sm:w-11">
                <c.icon className="h-4 w-4 text-primary-glow sm:h-5 sm:w-5" />
              </span>
              <span className="min-w-0 text-center sm:text-left">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-background/50 sm:hidden">
                  {c.short}
                </span>
                <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-background/50 sm:block">
                  {c.label}
                </span>
                <span className="hidden truncate font-display text-base font-bold text-background sm:block">
                  {c.value}
                </span>
                <span className="hidden truncate text-xs text-background/60 sm:block">{c.sub}</span>
              </span>
            </>
          );
          const shell =
            "flex flex-col items-center gap-1.5 sm:flex-row sm:items-center sm:gap-4 sm:px-2 sm:py-3";
          return c.href ? (
            <a key={c.label} href={c.href} className={cn(shell, "transition-opacity hover:opacity-80")}>
              {body}
            </a>
          ) : (
            <div key={c.label} className={shell}>{body}</div>
          );
        })}
      </div>
    </div>

    {/* Main */}
    <div className="container-page py-8 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Wordmark />

          {/* Short pitch on a phone, the full story on desktop */}
          <p className="mt-4 text-sm leading-relaxed text-background/65 lg:hidden">
            Authorised-distributor tech, local warranty card in every box, and a real team in Colombo.
          </p>
          <p className="mt-4 hidden max-w-sm text-sm leading-relaxed text-background/65 lg:block">
            Buying tech shouldn't feel like a gamble. Every phone, tablet and pair of headphones we sell
            comes from an authorised distributor, with the local warranty card in the box and a team in
            Colombo you can actually get on the phone.
          </p>

          {/* Hours and address are already covered by the contact strip on mobile */}
          <div className="mt-5 hidden items-start gap-2.5 text-sm text-background/70 lg:flex">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
            <span>
              Showroom open {site.hours}
              <br />
              <span className="text-background/50">{site.address.full}</span>
            </span>
          </div>

          <Link
            to="/help"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-background/20 px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:border-primary-glow hover:text-primary-glow lg:mt-5"
          >
            Contact support <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {linkSections.map((s) => (
          <FooterNav key={s.title} section={s} />
        ))}

        <div className="pt-2 lg:col-span-2 lg:pt-0">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-background">We accept</h2>
          <ul className="mt-3 flex flex-wrap gap-1.5 lg:mt-4">
            {payments.map((p) => (
              <li
                key={p}
                className="rounded-md border border-background/15 bg-background/5 px-2 py-1 text-[10px] font-semibold text-background/70"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-3 hidden text-xs leading-relaxed text-background/50 lg:block">
            0% installment plans available with leading Sri Lankan banks.
          </p>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-background/10">
      <div className="container-page flex flex-col gap-3 py-4 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between sm:py-5">
        <ul className="order-1 flex flex-wrap gap-x-4 gap-y-1.5 sm:order-2 sm:gap-x-5 sm:gap-y-2">
          {legal.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="transition-colors hover:text-primary-glow">{l.label}</Link>
            </li>
          ))}
        </ul>
        <p className="order-2 sm:order-1">© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
