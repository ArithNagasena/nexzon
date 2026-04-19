import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Undo2,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  PackageCheck,
  PackageX,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  FileText,
  Wallet,
  RefreshCcw,
  Truck,
  Eye,
  AlertCircle,
  Image as ImageIcon,
  X,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import {
  AccountSidebarNav,
  AccountProfileCard,
} from "@/components/cellexa/AccountSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type RequestStatus = "eligible" | "submitted" | "approved" | "rejected";

interface ReturnItem {
  id: string;
  orderNo: string;
  brand: string;
  name: string;
  variant: string;
  img: string;
  price: number;
  deliveredOn: string;
  daysLeft: number; // for eligible window
  status: RequestStatus;
  reason?: string;
  resolution?: string;
  submittedOn?: string;
  resolvedOn?: string;
  caseNo?: string;
  refundAmount?: number;
  rejectionNote?: string;
}

const fmt = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });

const INITIAL: ReturnItem[] = [
  {
    id: "r1",
    orderNo: "CLX-10421",
    brand: "Apple",
    name: "AirPods Pro 2 (USB-C)",
    variant: "MagSafe Charging Case",
    img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=480&q=80",
    price: 78500,
    deliveredOn: "Delivered 12 Apr",
    daysLeft: 11,
    status: "eligible",
  },
  {
    id: "r2",
    orderNo: "CLX-10398",
    brand: "Samsung",
    name: "Galaxy Watch 6 Classic 47mm",
    variant: "Black · LTE",
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=480&q=80",
    price: 142000,
    deliveredOn: "Delivered 08 Apr",
    daysLeft: 7,
    status: "eligible",
  },
  {
    id: "r3",
    orderNo: "CLX-10355",
    brand: "Sony",
    name: "WH-1000XM5 Wireless Headphones",
    variant: "Silver",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=480&q=80",
    price: 124000,
    deliveredOn: "Delivered 02 Apr",
    daysLeft: 1,
    status: "submitted",
    reason: "Defective on arrival",
    resolution: "Replacement",
    submittedOn: "Submitted 03 Apr",
    caseNo: "RMA-88231",
  },
  {
    id: "r4",
    orderNo: "CLX-10301",
    brand: "Anker",
    name: "Anker 737 Power Bank 24,000mAh",
    variant: "Black · 140W",
    img: "https://images.unsplash.com/photo-1609592424823-2dac0d1ec1e3?w=480&q=80",
    price: 38500,
    deliveredOn: "Delivered 26 Mar",
    daysLeft: 0,
    status: "approved",
    reason: "Wrong item delivered",
    resolution: "Refund to original payment",
    submittedOn: "Submitted 28 Mar",
    resolvedOn: "Approved 30 Mar",
    caseNo: "RMA-88102",
    refundAmount: 38500,
  },
  {
    id: "r5",
    orderNo: "CLX-10254",
    brand: "Logitech",
    name: "MX Master 3S Wireless Mouse",
    variant: "Graphite",
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=480&q=80",
    price: 24500,
    deliveredOn: "Delivered 14 Mar",
    daysLeft: 0,
    status: "rejected",
    reason: "Changed my mind",
    resolution: "Refund",
    submittedOn: "Submitted 18 Mar",
    resolvedOn: "Rejected 20 Mar",
    caseNo: "RMA-87998",
    rejectionNote:
      "Item shows signs of heavy use beyond inspection allowance. Outside our 14-day change-of-mind policy.",
  },
];

const statusMeta: Record<
  RequestStatus,
  { label: string; cls: string; tone: string; Icon: LucideIcon }
> = {
  eligible: {
    label: "Eligible",
    cls: "bg-primary/10 text-primary",
    tone: "border-border/70",
    Icon: PackageCheck,
  },
  submitted: {
    label: "In review",
    cls: "bg-warning/15 text-warning",
    tone: "border-warning/40",
    Icon: Clock,
  },
  approved: {
    label: "Approved",
    cls: "bg-success/15 text-success",
    tone: "border-success/40",
    Icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    cls: "bg-destructive/10 text-destructive",
    tone: "border-destructive/40 opacity-95",
    Icon: XCircle,
  },
};

const REASONS = [
  "Defective on arrival",
  "Wrong item delivered",
  "Item not as described",
  "Damaged during shipping",
  "Missing parts or accessories",
  "Changed my mind",
  "Better price found",
  "Other",
];

const RESOLUTIONS = [
  { v: "refund", label: "Refund to original payment", Icon: Wallet },
  { v: "replacement", label: "Replacement of same item", Icon: RefreshCcw },
  { v: "store-credit", label: "Cellexa store credit (+5% bonus)", Icon: Sparkles },
  { v: "repair", label: "Repair under warranty", Icon: ShieldCheck },
];

const Returns = () => {
  const [items, setItems] = useState<ReturnItem[]>(INITIAL);
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ReturnItem | null>(null);
  const [reason, setReason] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [resolution, setResolution] = useState<string>("refund");
  const [files, setFiles] = useState<File[]>([]);

  const counts = useMemo(
    () => ({
      all: items.length,
      eligible: items.filter((i) => i.status === "eligible").length,
      submitted: items.filter((i) => i.status === "submitted").length,
      approved: items.filter((i) => i.status === "approved").length,
      rejected: items.filter((i) => i.status === "rejected").length,
    }),
    [items],
  );

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter],
  );

  const history = useMemo(
    () => items.filter((i) => i.status !== "eligible"),
    [items],
  );

  const openRequest = (it: ReturnItem) => {
    setActive(it);
    setReason("");
    setDetails("");
    setResolution("refund");
    setFiles([]);
    setOpen(true);
  };

  const submit = () => {
    if (!active) return;
    if (!reason) return toast.error("Please choose a reason");
    if (details.trim().length < 10)
      return toast.error("Please add at least 10 characters of detail");
    setItems((prev) =>
      prev.map((i) =>
        i.id === active.id
          ? {
              ...i,
              status: "submitted",
              reason,
              resolution: RESOLUTIONS.find((r) => r.v === resolution)?.label,
              submittedOn: "Submitted just now",
              caseNo: `RMA-${Math.floor(80000 + Math.random() * 9999)}`,
            }
          : i,
      ),
    );
    toast.success("Return request submitted — we'll respond within 24 hours");
    setOpen(false);
  };

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files, ...Array.from(list)].slice(0, 5);
    setFiles(next);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="bg-gradient-to-b from-background to-secondary/40 pb-16">
        <div className="container-page pt-6 sm:pt-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/account" className="hover:text-primary">My Account</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-foreground">Returns &amp; Refunds</span>
          </nav>

          {/* Page header */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Returns &amp; Refund Requests
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Hassle-free returns within 14 days across Sri Lanka. Track every request from one place.
              </p>
            </div>

            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                  Account Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto p-6">
                <div className="mb-6">
                  <p className="font-display text-lg font-extrabold">Account</p>
                </div>
                <AccountSidebarNav
                  onNavigate={() => setMobileNavOpen(false)}
                  activePath="/account/returns"
                />
              </SheetContent>
            </Sheet>
          </div>

          <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 space-y-4">
                <AccountProfileCard />
                <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card">
                  <AccountSidebarNav activePath="/account/returns" />
                </div>
              </div>
            </aside>

            {/* Main */}
            <section className="space-y-6 lg:col-span-9">
            {/* Stat strip */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Eligible", value: counts.eligible, Icon: PackageCheck, cls: "from-primary to-primary-glow" },
                { label: "In review", value: counts.submitted, Icon: Clock, cls: "from-warning to-promo" },
                { label: "Approved", value: counts.approved, Icon: CheckCircle2, cls: "from-success to-primary" },
                { label: "Rejected", value: counts.rejected, Icon: XCircle, cls: "from-destructive to-warning" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-card"
                >
                  <div
                    className={`absolute -right-4 -top-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br ${s.cls} text-white opacity-90`}
                  >
                    <s.Icon className="h-5 w-5" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Policy summary card */}
            <div className="grid gap-3 rounded-2xl border border-border/70 bg-gradient-brand-soft p-5 shadow-card sm:grid-cols-3 sm:p-6">
              {[
                { Icon: Clock, title: "14-day window", text: "From the date your order is delivered." },
                { Icon: Truck, title: "Free pickup", text: "Island-wide reverse logistics on us." },
                { Icon: Wallet, title: "Refund in 3–7 days", text: "To original payment after inspection." },
              ].map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-soft">
                    <p.Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-foreground">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { k: "all", label: "All", count: counts.all },
                      { k: "eligible", label: "Eligible", count: counts.eligible },
                      { k: "submitted", label: "Submitted", count: counts.submitted },
                      { k: "approved", label: "Approved", count: counts.approved },
                      { k: "rejected", label: "Rejected", count: counts.rejected },
                    ] as { k: "all" | RequestStatus; label: string; count: number }[]
                  ).map((tab) => {
                    const active = filter === tab.k;
                    return (
                      <button
                        key={tab.k}
                        onClick={() => setFilter(tab.k)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                          active
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                        <span
                          className={`rounded-full px-1.5 text-[10px] ${
                            active ? "bg-white/20" : "bg-card"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="rounded-xl">
                    <Link to="/account/orders">
                      <FileText className="mr-1.5 h-4 w-4" /> View Orders
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* List or empty */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-card sm:p-14">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand-soft text-primary">
                  <Undo2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">
                  {items.length === 0 ? "Nothing to return" : "Nothing in this view"}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {items.length === 0
                    ? "Items become eligible for return as soon as they're delivered. Browse your orders to get started."
                    : "Switch tabs above to view requests in other states."}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <Button asChild variant="brand" className="rounded-xl">
                    <Link to="/account/orders">
                      <FileText className="mr-1.5 h-4 w-4" /> View Orders
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="space-y-4">
                {filtered.map((it) => {
                  const stm = statusMeta[it.status];
                  const isEligible = it.status === "eligible";
                  return (
                    <li
                      key={it.id}
                      className={`relative overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift ${stm.tone}`}
                    >
                      {it.status === "approved" && (
                        <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-l from-success to-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-soft">
                          ✓ Refund approved
                        </div>
                      )}

                      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
                        {/* Image */}
                        <Link
                          to={`/product/${it.id}`}
                          className="relative block h-28 w-full shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-28 sm:w-28"
                        >
                          <img
                            src={it.img}
                            alt={it.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </Link>

                        {/* Body */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${stm.cls}`}
                            >
                              <stm.Icon className="h-3 w-3" />
                              {stm.label}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-foreground">
                              <FileText className="h-3 w-3" /> {it.orderNo}
                            </span>
                            {it.caseNo && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-foreground">
                                {it.caseNo}
                              </span>
                            )}
                            <span className="ml-auto text-[11px] font-medium text-muted-foreground">
                              {it.resolvedOn ?? it.submittedOn ?? it.deliveredOn}
                            </span>
                          </div>

                          <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                            {it.brand}
                          </div>
                          <Link
                            to={`/product/${it.id}`}
                            className="line-clamp-2 text-sm font-bold text-foreground hover:text-primary sm:text-base"
                          >
                            {it.name}
                          </Link>
                          <div className="truncate text-xs text-muted-foreground">{it.variant}</div>

                          {/* Meta row */}
                          <div className="mt-3 flex flex-wrap items-end gap-3">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                Item value
                              </div>
                              <div className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
                                {fmt(it.refundAmount ?? it.price)}
                              </div>
                            </div>
                            {isEligible && (
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${
                                  it.daysLeft <= 2
                                    ? "bg-warning/15 text-warning"
                                    : "bg-primary/10 text-primary"
                                }`}
                              >
                                <Clock className="h-3.5 w-3.5" />
                                {it.daysLeft > 0
                                  ? `${it.daysLeft} day${it.daysLeft === 1 ? "" : "s"} left to return`
                                  : "Window closing today"}
                              </span>
                            )}
                            {it.reason && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-foreground">
                                <AlertCircle className="h-3.5 w-3.5 text-primary" /> {it.reason}
                              </span>
                            )}
                            {it.resolution && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                                <Wallet className="h-3.5 w-3.5" /> {it.resolution}
                              </span>
                            )}
                          </div>

                          {it.status === "rejected" && it.rejectionNote && (
                            <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-xs text-foreground">
                              <span className="font-bold text-destructive">Reason for rejection: </span>
                              {it.rejectionNote}
                            </div>
                          )}

                          {/* Footer actions */}
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            {isEligible ? (
                              <Button
                                size="sm"
                                variant="brand"
                                className="h-9 rounded-xl"
                                onClick={() => openRequest(it)}
                              >
                                <Undo2 className="mr-1.5 h-4 w-4" /> Request Return
                              </Button>
                            ) : it.status === "submitted" ? (
                              <Button size="sm" variant="outline" className="h-9 rounded-xl" disabled>
                                <Clock className="mr-1.5 h-4 w-4" /> Awaiting review
                              </Button>
                            ) : it.status === "approved" ? (
                              <Button size="sm" variant="brand" className="h-9 rounded-xl">
                                <Truck className="mr-1.5 h-4 w-4" /> Schedule Pickup
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-9 rounded-xl"
                                onClick={() => openRequest(it)}
                              >
                                <RefreshCcw className="mr-1.5 h-4 w-4" /> Re-submit
                              </Button>
                            )}

                            <Button asChild size="sm" variant="outline" className="h-9 rounded-xl">
                              <Link to={`/account/orders/${it.orderNo}`}>
                                <Eye className="mr-1.5 h-4 w-4" /> View Order
                              </Link>
                            </Button>
                            <Button
                              asChild
                              size="sm"
                              variant="ghost"
                              className="ml-auto h-9 rounded-xl text-muted-foreground hover:text-foreground"
                            >
                              <Link to="#">
                                <MessageCircle className="mr-1.5 h-4 w-4" /> Chat
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Request history */}
            {history.length > 0 && (
              <div className="rounded-2xl border border-border/70 bg-card shadow-card">
                <div className="flex items-center justify-between border-b border-border/70 p-4 sm:p-5">
                  <div>
                    <h3 className="font-display text-base font-extrabold text-foreground sm:text-lg">
                      Request history
                    </h3>
                    <p className="text-xs text-muted-foreground">All your past returns and refunds.</p>
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-foreground">
                    {history.length} cases
                  </span>
                </div>
                <ul className="divide-y divide-border/60">
                  {history.map((h) => {
                    const stm = statusMeta[h.status];
                    return (
                      <li
                        key={`h-${h.id}`}
                        className="flex flex-wrap items-center gap-3 p-4 transition hover:bg-secondary/40 sm:p-5"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-bold text-foreground">
                              {h.caseNo} · {h.name}
                            </div>
                            <div className="truncate text-[11px] text-muted-foreground">
                              {h.orderNo} · {h.reason} · {h.resolvedOn ?? h.submittedOn}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${stm.cls}`}
                        >
                          <stm.Icon className="h-3 w-3" /> {stm.label}
                        </span>
                        <span className="text-xs font-bold text-foreground">
                          {fmt(h.refundAmount ?? h.price)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Help card */}
            <div className="grid gap-4 rounded-2xl border border-border/70 bg-gradient-brand-soft p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-extrabold text-foreground">
                    Need a hand with your return?
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Our after-sales team is online 8am–10pm daily. Most refunds are resolved within 24 hours of inspection.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <ShieldCheck className="h-3 w-3 text-primary" /> Buyer protection
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1">
                      <Truck className="h-3 w-3 text-primary" /> Free island-wide pickup
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="brand" size="sm" className="rounded-xl">
                  <Link to="#">Read Return Policy</Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl bg-card">
                  <MessageCircle className="mr-1.5 h-4 w-4" /> Contact Support
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Request dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-extrabold">
              Request a return
            </DialogTitle>
            <DialogDescription>
              Tell us what went wrong and how you'd like it resolved.
            </DialogDescription>
          </DialogHeader>

          {active && (
            <div className="space-y-4">
              {/* Item snapshot */}
              <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-secondary/40 p-3">
                <img
                  src={active.img}
                  alt={active.name}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {active.brand}
                  </div>
                  <div className="truncate text-sm font-bold text-foreground">{active.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {active.orderNo} · {fmt(active.price)}
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="space-y-1.5">
                <Label htmlFor="reason" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Reason for return
                </Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger id="reason" className="rounded-xl">
                    <SelectValue placeholder="Choose a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {REASONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="details" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Tell us more
                </Label>
                <Textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value.slice(0, 500))}
                  placeholder="Add any details that help us process your request faster…"
                  className="min-h-[100px] rounded-xl"
                />
                <div className="text-right text-[10px] text-muted-foreground">
                  {details.length}/500
                </div>
              </div>

              {/* Resolution */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Preferred resolution
                </Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {RESOLUTIONS.map((r) => {
                    const sel = resolution === r.v;
                    return (
                      <button
                        key={r.v}
                        type="button"
                        onClick={() => setResolution(r.v)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition ${
                          sel
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border/70 bg-card text-foreground hover:bg-secondary/40"
                        }`}
                      >
                        <r.Icon className={`h-4 w-4 shrink-0 ${sel ? "text-primary" : "text-muted-foreground"}`} />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Upload */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Photo / video evidence
                </Label>
                <label
                  htmlFor="evidence"
                  className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border bg-secondary/30 p-5 text-center transition hover:border-primary hover:bg-primary/5"
                >
                  <Upload className="h-5 w-5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">
                    Click to upload up to 5 files
                  </span>
                  <span className="text-[10px] text-muted-foreground">PNG, JPG, MP4 · Max 10MB each</span>
                  <Input
                    id="evidence"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => onFiles(e.target.files)}
                  />
                </label>
                {files.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {files.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 rounded-lg bg-secondary/50 px-2.5 py-1.5 text-xs"
                      >
                        <ImageIcon className="h-3.5 w-3.5 text-primary" />
                        <span className="flex-1 truncate font-medium text-foreground">{f.name}</span>
                        <button
                          type="button"
                          aria-label="Remove file"
                          onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" className="rounded-xl" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="brand" className="rounded-xl" onClick={submit}>
              <PackageX className="mr-1.5 h-4 w-4" /> Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Returns;
