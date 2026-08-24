import { Children, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Breakpoint = "sm" | "md" | "lg";

/* Written out in full because Tailwind's scanner can't see interpolated variants. */
const hiddenUntil: Record<Breakpoint, string> = {
  sm: "hidden sm:contents",
  md: "hidden md:contents",
  lg: "hidden lg:contents",
};

const buttonUntil: Record<Breakpoint, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
};

type Props = {
  children: ReactNode;
  /** Classes for the wrapper that lays the children out — usually a grid. */
  className?: string;
  /** How many children stay on screen below `breakpoint`. */
  initial: number;
  /** From this width up, everything is shown and the button disappears. */
  breakpoint?: Breakpoint;
  moreLabel?: string;
};

/**
 * Progressive disclosure for long lists on phones: below `breakpoint` only the
 * first `initial` children are on screen and the rest sit behind a "Show more"
 * button; from `breakpoint` up every child is visible and the button is gone,
 * so desktop keeps the full list it always had.
 *
 * Each child is wrapped in a `display: contents` box so it stays a direct grid
 * item of `className` — real wrapper boxes would collapse the parent grid into
 * a single column.
 */
const MobileReveal = ({ children, className, initial, breakpoint = "md", moreLabel = "Show more" }: Props) => {
  const items = Children.toArray(children);
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(0, items.length - initial);

  return (
    <>
      <div className={className}>
        {items.map((child, i) => (
          <div key={i} className={expanded || i < initial ? "contents" : hiddenUntil[breakpoint]}>
            {child}
          </div>
        ))}
      </div>

      {hiddenCount > 0 && !expanded && (
        <div className={cn("mt-5 flex justify-center", buttonUntil[breakpoint])}>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-colors hover:border-primary/40"
          >
            {moreLabel} ({hiddenCount}) <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
};

export default MobileReveal;
