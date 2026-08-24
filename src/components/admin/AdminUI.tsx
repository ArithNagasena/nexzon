/**
 * Shared building blocks for the admin console.
 *
 * Eight of the seventeen pages are a filtered table over a list, and most of
 * the rest are a form or a queue. Keeping the toolbar, pill, table shell and
 * slide-over here is what stops each page inventing its own spacing.
 *
 * Everything is built from the same tokens as the storefront — `bg-card`,
 * `border-border`, `shadow-soft`, `font-display` — so the console reads as
 * the same product rather than a bolted-on dashboard.
 */
import { Search, X, type LucideIcon } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------- surfaces */

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("rounded-2xl border border-border bg-card shadow-soft", className)}>{children}</div>
);

export const SectionCard = ({
  title,
  desc,
  actions,
  className,
  bodyClassName,
  children,
}: {
  title: string;
  desc?: string;
  actions?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) => (
  <Card className={cn("overflow-hidden", className)}>
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-5 py-3.5">
      <div className="min-w-0">
        <h2 className="font-display text-sm font-bold text-foreground">{title}</h2>
        {desc && <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
    <div className={cn("p-5", bodyClassName)}>{children}</div>
  </Card>
);

/* ------------------------------------------------------------------- pills */

/** Status chip. `tone` is the class string that ships with each status map. */
export const Pill = ({ tone, children, className }: { tone: string; children: React.ReactNode; className?: string }) => (
  <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-bold", tone, className)}>
    {children}
  </span>
);

export const DotPill = ({ tone, dot, children }: { tone: string; dot: string; children: React.ReactNode }) => (
  <Pill tone={tone}>
    <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
    {children}
  </Pill>
);

/* ------------------------------------------------------------------- stats */

export const StatCard = ({
  label,
  value,
  sub,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  tone?: "primary" | "promo" | "success" | "warning" | "destructive";
}) => {
  const tones = {
    primary: "bg-accent text-accent-foreground",
    promo: "bg-promo/10 text-promo",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-foreground",
    destructive: "bg-destructive/10 text-destructive",
  } as const;

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
        <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", tones[tone])}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-extrabold tabular-nums text-foreground">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </Card>
  );
};

/* ----------------------------------------------------------------- toolbar */

export const SearchInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) => (
  <div className="relative min-w-0 flex-1">
    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
    />
  </div>
);

export type FilterOption = { id: string; label: string; count?: number };

export const FilterPills = ({
  options,
  value,
  onChange,
  className,
}: {
  options: FilterOption[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) => (
  <div className={cn("flex flex-wrap gap-2", className)}>
    {options.map((o) => {
      const active = value === o.id;
      return (
        <button
          key={o.id}
          type="button"
          aria-pressed={active}
          onClick={() => onChange(o.id)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
            active
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground/75 hover:border-primary/40 hover:text-primary",
          )}
        >
          {o.label}
          {o.count !== undefined && (
            <span className={cn("ml-1.5 tabular-nums", active ? "text-primary-foreground/70" : "text-muted-foreground")}>
              {o.count}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

/** Search box above a row of filter pills — the header on every list page. */
export const Toolbar = ({
  q,
  onQ,
  placeholder,
  filters,
  filter,
  onFilter,
  extra,
}: {
  q: string;
  onQ: (v: string) => void;
  placeholder: string;
  filters?: FilterOption[];
  filter?: string;
  onFilter?: (id: string) => void;
  extra?: React.ReactNode;
}) => (
  <Card className="p-4">
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput value={q} onChange={onQ} placeholder={placeholder} />
      {extra}
    </div>
    {filters && filter !== undefined && onFilter && (
      <FilterPills options={filters} value={filter} onChange={onFilter} className="mt-3 border-t border-border pt-3" />
    )}
  </Card>
);

/* ------------------------------------------------------------------- tabs */

export const Tabs = ({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  value: string;
  onChange: (id: string) => void;
}) => (
  <div className="-mb-px flex gap-1 overflow-x-auto border-b border-border">
    {tabs.map((t) => {
      const active = value === t.id;
      return (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={cn(
            "whitespace-nowrap border-b-2 px-4 py-2.5 text-sm transition-colors",
            active
              ? "border-primary font-bold text-primary"
              : "border-transparent font-medium text-muted-foreground hover:border-border hover:text-foreground",
          )}
        >
          {t.label}
          {t.count !== undefined && <span className="ml-1.5 tabular-nums opacity-70">{t.count}</span>}
        </button>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ tables */

/** Wide tables scroll inside their own card rather than the page. */
export const TableShell = ({ children }: { children: React.ReactNode }) => (
  <Card className="overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] border-collapse text-sm">{children}</table>
    </div>
  </Card>
);

export const Th = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <th
    className={cn(
      "border-b border-border bg-surface px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground",
      className,
    )}
  >
    {children}
  </th>
);

export const Td = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <td className={cn("border-b border-border/70 px-4 py-3 align-middle text-foreground/80", className)}>{children}</td>
);

export const Tr = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <tr
    onClick={onClick}
    className={cn("last:[&>td]:border-b-0", onClick && "cursor-pointer transition-colors hover:bg-surface", className)}
  >
    {children}
  </tr>
);

/* -------------------------------------------------------------- empty state */

export const EmptyState = ({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
    <Icon className="mx-auto h-10 w-10 text-muted-foreground/60" />
    <h2 className="mt-3 font-display text-lg font-bold">{title}</h2>
    <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

/* --------------------------------------------------------------- slide-over */

/**
 * Detail panel. Review cases, return cases and campaign forms open here rather
 * than at their own route — the queue stays visible behind them.
 */
export const Panel = ({
  open,
  onClose,
  title,
  subtitle,
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
    {/* `SheetContent` renders its own absolutely-positioned close button, which
        landed on top of the header's — hide that one and keep the header's, which
        is aligned to the title and has a proper hit target. Scoped to the direct
        child so the footer's action buttons are untouched. */}
    <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 [&>button]:hidden sm:max-w-lg">
      <header className="flex items-start justify-between gap-3 border-b border-border bg-surface px-5 py-4">
        <div className="min-w-0">
          <h2 className="font-display text-base font-extrabold text-foreground">{title}</h2>
          {subtitle && <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>

      {footer && <div className="flex flex-wrap gap-2 border-t border-border bg-surface px-5 py-4">{footer}</div>}
    </SheetContent>
  </Sheet>
);

/* -------------------------------------------------------------------- forms */

export const Field = ({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <label className={cn("block", className)}>
    <span className="mb-1.5 block text-xs font-bold text-foreground">{label}</span>
    {children}
    {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
  </label>
);

const inputCls =
  "h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20";

export const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={cn(inputCls, props.className)} />
);

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={cn(inputCls, "appearance-none bg-[right_0.75rem_center] pr-9", props.className)} />
);

export const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={cn(inputCls, "h-auto min-h-24 py-2.5 leading-relaxed", props.className)} />
);

export const Toggle = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={cn(
      "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
      checked ? "border-primary bg-primary" : "border-border bg-secondary",
    )}
  >
    <span
      className={cn(
        "absolute top-0.5 h-4.5 w-4.5 rounded-full bg-background shadow-soft transition-all",
        checked ? "left-[1.4rem]" : "left-0.5",
      )}
      style={{ height: "1.125rem", width: "1.125rem" }}
    />
  </button>
);

/** Label above a value — the workhorse of every detail panel. */
export const Detail = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="min-w-0">
    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
    <div className="mt-0.5 text-sm font-medium text-foreground">{children}</div>
  </div>
);

/** Standing guidance note shown beside a form or a queue. */
export const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-xl bg-surface p-3 text-xs text-muted-foreground">{children}</p>
);

export { Button };
