import { Heart, Star, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: { label: string; tone: "promo" | "primary" | "success" | "warning" };
};

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

const toneClass: Record<NonNullable<Product["badge"]>["tone"], string> = {
  promo: "bg-promo text-promo-foreground",
  primary: "bg-primary text-primary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
};

const ProductCard = ({ product }: { product: Product }) => {
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <article className="card-product group flex flex-col">
      {/* Image area */}
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`badge-promo ${toneClass[product.badge.tone]}`}>
              {product.badge.label}
            </span>
          )}
          {discount > 0 && (
            <span className="badge-promo bg-foreground text-background">-{discount}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition-all hover:bg-white hover:text-promo"
        >
          <Heart className="h-4 w-4" />
        </button>

      </Link>

      {/* Body */}
      <Link to={`/product/${product.id}`} className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {product.brand}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/80">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            {product.rating}
            {/* Two cards to a row on a phone — the review count is the first thing
                to go when the rating itself already carries the signal. */}
            <span className="hidden text-muted-foreground sm:inline">({product.reviews})</span>
          </span>
        </div>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            <span className="font-display text-base font-extrabold text-foreground sm:text-lg">
              {fmtLKR(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {fmtLKR(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action button - always visible */}
      <div className="px-3 pb-3 sm:px-4 sm:pb-4">
        <Link
          to={`/product/${product.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary bg-background py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:py-2.5"
        >
          <Eye className="h-4 w-4" />
          <span className="sm:hidden">View</span>
          <span className="hidden sm:inline">View Details</span>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
