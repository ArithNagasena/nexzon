import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import smartphones from "@/assets/cat-smartphones.jpg";
import tablets from "@/assets/cat-tablets.jpg";
import accessories from "@/assets/cat-accessories.jpg";
import audio from "@/assets/cat-audio.jpg";
import gaming from "@/assets/cat-gaming.jpg";

const cats = [
  { name: "Accessories", slug: "accessories", count: "500+ items", img: accessories, large: true },
  { name: "Smartphones", slug: "smartphones", count: "240+ models", img: smartphones },
  { name: "Tablets", slug: "tablets", count: "60+ models", img: tablets },
  { name: "Audio", slug: "audio", count: "180+ products", img: audio },
  { name: "Gaming", slug: "gaming", count: "120+ products", img: gaming },
];

const Categories = () => (
  <section className="bg-surface py-14 sm:py-20">
    <div className="container-page">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Shop by category</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">Browse our top categories</h2>
        </div>
        <Link to="/shop" className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:inline-flex">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[220px]">
        {cats.map((c, i) => (
          <Link
            key={c.name}
            to={`/category/${c.slug}`}
            className={`card-category group relative aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-full ${
              i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <img
              src={c.img}
              alt={`${c.name} category`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/80">{c.count}</div>
              <h3 className="mt-1 font-display text-lg font-bold text-white sm:text-xl lg:text-2xl">
                {c.name}
              </h3>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/95 transition-all group-hover:gap-2 sm:text-sm">
                Shop now <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;
