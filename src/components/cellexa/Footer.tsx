import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const linkSections: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Smartphones", to: "/category/smartphones" },
      { label: "Tablets", to: "/category/tablets" },
      { label: "Audio", to: "/category/audio" },
      { label: "Accessories", to: "/category/accessories" },
      { label: "Wishlist", to: "/account/wishlist" },
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
      { label: "Notifications", to: "/account/notifications" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Cellexa", to: "/" },
      { label: "Brands", to: "/brand/apple" },
      { label: "Stores", to: "/help" },
      { label: "Careers", to: "/" },
      { label: "Blog", to: "/" },
      { label: "Contact Us", to: "/help" },
    ],
  },
];

const legalLinks = [
  { label: "Returns & Refund Policy", to: "/returns-policy" },
  { label: "Privacy Policy", to: "/returns-policy" },
  { label: "Terms of Service", to: "/returns-policy" },
  { label: "Shipping Policy", to: "/returns-policy" },
  { label: "Warranty Policy", to: "/returns-policy" },
];



const Footer = () => (
  <footer className="bg-foreground text-background/85">
    <div className="container-page py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="font-display text-2xl font-extrabold tracking-tight text-background">
              Cell<span className="text-primary-glow">exa</span>
            </span>
            <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-hero" />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/65">
            Sri Lanka's trusted online destination for genuine smartphones, tablets, audio, and tech
            accessories — backed by warranty, fast islandwide delivery, and local support.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-background/75">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
              <span>No. 142, Galle Road, Colombo 03, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary-glow" />
              <a href="tel:+94112000000" className="hover:text-background">+94 11 200 0000</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary-glow" />
              <a href="mailto:hello@cellexa.lk" className="hover:text-background">hello@cellexa.lk</a>
            </li>
          </ul>
        </div>

        {/* Link sections */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:grid-cols-4">
          {linkSections.map((s) => (
            <div key={s.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-background">
                {s.title}
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-background/65 transition-colors hover:text-primary-glow">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Legal strip */}
    <div className="border-t border-background/10">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-4 text-xs text-background/60">
        {legalLinks.map((l) => (
          <Link key={l.label} to={l.to} className="hover:text-primary-glow">
            {l.label}
          </Link>
        ))}
      </div>
    </div>

  </footer>
);

export default Footer;
