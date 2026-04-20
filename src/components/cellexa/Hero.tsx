import { Link } from "react-router-dom";
import heroBanner from "@/assets/home-hero-banner.png";

const Hero = () => (
  <section className="container-page pt-1 pb-4 sm:pt-2 sm:pb-6 lg:pt-2 lg:pb-8">
    <Link to="/shop" className="block overflow-hidden rounded-3xl border border-border/60 shadow-sm">
      <img
        src={heroBanner}
        alt="New Tech — Latest Accessories & Gadgets at Cellexa"
        className="h-auto w-full object-cover"
      />
    </Link>
  </section>
);

export default Hero;
