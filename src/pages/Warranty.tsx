import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  ShieldCheck,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  HelpCircle,
  MessageCircle,
  Sparkles,
  FileText,
  Wrench,
  RefreshCcw,
  AlertCircle,
  Image as ImageIcon,
  X,
  CalendarDays,
  PackageCheck,
  Phone,
  Eye,
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

type ClaimStatus = "active" | "submitted" | "approved" | "rejected" | "expired";
type WarrantyState = "active" | "expiring" | "expired";

interface WarrantyProduct {
  id: string;
  orderNo: string;
  brand: string;
  name: string;
  variant: string;
  img: string;
  purchasedOn: string;
  warrantyMonths: number;
  expiresOn: string;
  daysLeft: number;
  state: WarrantyState;
  serial: string;
  coverage: string;
}

interface ClaimRecord {
  id: string;
  caseNo: string;
  productId: string;
  productName: string;
  productImg: string;
  brand: string;
  category: string;
  description: string;
  submittedOn: string;
  status: ClaimStatus;
  resolvedOn?: string;
  resolutionNote?: string;
  technician?: string;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-LK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PRODUCTS: WarrantyProduct[] = [
  {
    id: "p1",
    orderNo: "CLX-10293",
    brand: "Apple",
    name: "iPhone 15 Pro Max",
    variant: "256GB · Natural Titanium",
    img: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=300&q=80",
    purchasedOn: "2025-08-12",
    warrantyMonths: 12,
    expiresOn: "2026-08-12",
    daysLeft: 480,
    state: "active",
    serial: "F2LXK9P7QH",
    coverage: "Manufacturer + Cellexa Care",
  },
  {
    id: "p2",
    orderNo: "CLX-10198",
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    variant: "512GB · Titanium Black",
    img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&q=80",
    purchasedOn: "2025-05-03",
    warrantyMonths: 24,
    expiresOn: "2027-05-03",
    daysLeft: 745,
    state: "active",
    serial: "RZ8N40KXLM",
    coverage: "Manufacturer Warranty",
  },
  {
    id: "p3",
    orderNo: "CLX-09872",
    brand: "Sony",
    name: "WH-1000XM5 Headphones",
    variant: "Midnight Blue",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=80",
    purchasedOn: "2025-01-22",
    warrantyMonths: 12,
    expiresOn: "2026-01-22",
    daysLeft: 28,
    state: "expiring",
    serial: "WHX5-22A91",
    coverage: "Manufacturer Warranty",
  },
  {
    id: "p4",
    orderNo: "CLX-09541",
    brand: "Xiaomi",
    name: "Redmi Note 13 Pro",
    variant: "256GB · Aurora Purple",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&q=80",
    purchasedOn: "2024-09-15",
    warrantyMonths: 12,
    expiresOn: "2025-09-15",
    daysLeft: -120,
    state: "expired",
    serial: "RN13P-77K2",
    coverage: "Manufacturer Warranty",
  },
  {
    id: "p5",
    orderNo: "CLX-10311",
    brand: "Apple",
    name: "AirPods Pro (2nd Gen)",
    variant: "USB-C · MagSafe Case",
    img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&q=80",
    purchasedOn: "2025-09-30",
    warrantyMonths: 12,
    expiresOn: "2026-09-30",
    daysLeft: 530,
    state: "active",
    serial: "APP2-44LMQ",
    coverage: "Manufacturer + Cellexa Care",
  },
];

const CLAIM_HISTORY: ClaimRecord[] = [
  {
    id: "c1",
    caseNo: "WC-44218",
    productId: "p2",
    productName: "Galaxy S24 Ultra",
    productImg:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&q=80",
    brand: "Samsung",
    category: "Battery Issue",
    description: "Battery drains within 4 hours under normal use.",
    submittedOn: "2025-12-04",
    status: "approved",
    resolvedOn: "2025-12-11",
    resolutionNote: "Battery replacement completed under warranty.",
    technician: "Cellexa Service Center · Colombo 03",
  },
  {
    id: "c2",
    caseNo: "WC-44102",
    productId: "p3",
    productName: "WH-1000XM5 Headphones",
    productImg:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80",
    brand: "Sony",
    category: "Audio Defect",
    description: "Right earcup cuts out intermittently when paired.",
    submittedOn: "2026-01-08",
    status: "submitted",
  },
  {
    id: "c3",
    caseNo: "WC-43997",
    productId: "p4",
    productName: "Redmi Note 13 Pro",
    productImg:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&q=80",
    brand: "Xiaomi",
    category: "Screen Defect",
    description: "Hairline crack appeared along the bottom bezel.",
    submittedOn: "2025-10-19",
    status: "rejected",
    resolvedOn: "2025-10-23",
    resolutionNote:
      "Physical damage is not covered by manufacturer warranty.",
  },
];

const ISSUE_CATEGORIES = [
  "Battery Issue",
  "Charging Problem",
  "Screen Defect",
  "Audio Defect",
  "Camera Malfunction",
  "Software / Boot Issue",
  "Connectivity (Wi-Fi / BT)",
  "Overheating",
  "Manufacturing Defect",
  "Other",
];

const FILTERS: { id: "all" | ClaimStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "submitted", label: "Submitted" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

const stateBadge: Record<
  WarrantyState,
  { label: string; cls: string; icon: LucideIcon }
> = {
  active: {
    label: "Active",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: ShieldCheck,
  },
  expiring: {
    label: "Expiring Soon",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  expired: {
    label: "Expired",
    cls: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
  },
};

const claimBadge: Record<
  ClaimStatus,
  { label: string; cls: string; icon: LucideIcon }
> = {
  active: {
    label: "Active",
    cls: "bg-primary/10 text-primary border-primary/20",
    icon: ShieldCheck,
  },
  submitted: {
    label: "Under Review",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    cls: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
  },
  expired: {
    label: "Expired",
    cls: "bg-muted text-muted-foreground border-border",
    icon: XCircle,
  },
};

const Warranty = () => {
  const [claims, setClaims] = useState<ClaimRecord[]>(CLAIM_HISTORY);
  const [filter, setFilter] = useState<"all" | ClaimStatus>("all");
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [issueCategory, setIssueCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const stats = useMemo(() => {
    return {
      registered: PRODUCTS.length,
      active: PRODUCTS.filter((p) => p.state === "active").length,
      expiring: PRODUCTS.filter((p) => p.state === "expiring").length,
      claims: claims.length,
    };
  }, [claims]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: claims.length };
    claims.forEach((cl) => {
      c[cl.status] = (c[cl.status] || 0) + 1;
    });
    return c;
  }, [claims]);

  const filteredClaims = useMemo(() => {
    if (filter === "all") return claims;
    return claims.filter((c) => c.status === filter);
  }, [claims, filter]);

  const eligibleProducts = useMemo(
    () => PRODUCTS.filter((p) => p.state !== "expired"),
    []
  );

  const openClaim = (productId?: string) => {
    if (productId) setSelectedProductId(productId);
    setOpen(true);
  };

  const resetForm = () => {
    setSelectedProductId("");
    setIssueCategory("");
    setDescription("");
    setFiles([]);
  };

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...list].slice(0, 5));
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const submit = () => {
    if (!selectedProductId) {
      toast.error("Please select a product");
      return;
    }
    if (!issueCategory) {
      toast.error("Please choose an issue category");
      return;
    }
    if (description.trim().length < 15) {
      toast.error("Please describe the issue (min 15 characters)");
      return;
    }
    const product = PRODUCTS.find((p) => p.id === selectedProductId)!;
    const caseNo = "WC-" + Math.floor(40000 + Math.random() * 9000);
    const newClaim: ClaimRecord = {
      id: "c" + Date.now(),
      caseNo,
      productId: product.id,
      productName: product.name,
      productImg: product.img,
      brand: product.brand,
      category: issueCategory,
      description: description.trim(),
      submittedOn: new Date().toISOString(),
      status: "submitted",
    };
    setClaims((prev) => [newClaim, ...prev]);
    toast.success(`Claim ${caseNo} submitted successfully`);
    setOpen(false);
    resetForm();
    setFilter("submitted");
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
            <span className="font-semibold text-foreground">Warranty &amp; Claims</span>
          </nav>

          {/* Page header */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Warranty &amp; Claims
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Track warranties on your registered devices and submit service claims.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={() => openClaim()} className="hidden gap-2 lg:inline-flex">
                <Wrench className="h-4 w-4" />
                Submit New Claim
              </Button>

              <Sheet>
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
                  <AccountSidebarNav activePath="/account/warranty" />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 space-y-4">
                <AccountProfileCard />
                <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card">
                  <AccountSidebarNav activePath="/account/warranty" />
                </div>
              </div>
            </aside>

            {/* Main */}
            <section className="min-w-0 space-y-6 lg:col-span-9">

            {/* Mobile CTA */}
            <Button
              onClick={() => openClaim()}
              className="w-full gap-2 lg:hidden"
            >
              <Wrench className="h-4 w-4" />
              Submit New Claim
            </Button>

            {/* Registered products */}
            <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold">
                    Your Registered Products
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Devices linked to your Cellexa account
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-foreground">
                  {PRODUCTS.length} items
                </span>
              </div>

              <div className="space-y-3">
                {PRODUCTS.map((p) => {
                  const sb = stateBadge[p.state];
                  const Icon = sb.icon;
                  const totalDays = p.warrantyMonths * 30;
                  const used = Math.max(
                    0,
                    Math.min(100, ((totalDays - p.daysLeft) / totalDays) * 100)
                  );
                  return (
                    <div
                      key={p.id}
                      className="rounded-xl border border-border/70 bg-background p-4 transition-shadow hover:shadow-card"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4 sm:flex-1 min-w-0">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-secondary">
                            <img
                              src={p.img}
                              alt={p.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                {p.brand}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${sb.cls}`}
                              >
                                <Icon className="h-3 w-3" />
                                {sb.label}
                              </span>
                            </div>
                            <h3 className="mt-0.5 truncate font-semibold text-foreground">
                              {p.name}
                            </h3>
                            <p className="truncate text-xs text-muted-foreground">
                              {p.variant}
                            </p>
                            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                              <span>
                                Order{" "}
                                <span className="font-semibold text-foreground">
                                  #{p.orderNo}
                                </span>
                              </span>
                              <span className="hidden sm:inline">·</span>
                              <span>
                                S/N:{" "}
                                <span className="font-mono font-semibold text-foreground">
                                  {p.serial}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="sm:w-[280px] sm:shrink-0">
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="rounded-lg bg-secondary/60 px-2.5 py-1.5">
                              <div className="text-muted-foreground">
                                Purchased
                              </div>
                              <div className="font-semibold text-foreground">
                                {fmtDate(p.purchasedOn)}
                              </div>
                            </div>
                            <div className="rounded-lg bg-secondary/60 px-2.5 py-1.5">
                              <div className="text-muted-foreground">
                                Expires
                              </div>
                              <div className="font-semibold text-foreground">
                                {fmtDate(p.expiresOn)}
                              </div>
                            </div>
                          </div>

                          <div className="mt-2.5">
                            <div className="mb-1 flex items-center justify-between text-[10px]">
                              <span className="font-semibold text-muted-foreground">
                                {p.coverage}
                              </span>
                              <span
                                className={`font-bold ${
                                  p.state === "expired"
                                    ? "text-rose-600"
                                    : p.state === "expiring"
                                    ? "text-amber-600"
                                    : "text-primary"
                                }`}
                              >
                                {p.state === "expired"
                                  ? "Expired"
                                  : `${p.daysLeft} days left`}
                              </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                              <div
                                className={`h-full rounded-full ${
                                  p.state === "expired"
                                    ? "bg-rose-400"
                                    : p.state === "expiring"
                                    ? "bg-amber-500"
                                    : "bg-primary"
                                }`}
                                style={{ width: `${used}%` }}
                              />
                            </div>
                          </div>

                          <div className="mt-3 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 gap-1.5"
                              asChild
                            >
                              <Link to={`/product/${p.id}`}>
                                <Eye className="h-3.5 w-3.5" />
                                View
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 gap-1.5"
                              disabled={p.state === "expired"}
                              onClick={() => openClaim(p.id)}
                            >
                              <Wrench className="h-3.5 w-3.5" />
                              File Claim
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Claim History */}
            <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold">
                    Claim History
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    All your warranty service requests
                  </p>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="mb-4 -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
                {FILTERS.map((f) => {
                  const active = filter === f.id;
                  const count = counts[f.id] ?? 0;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-secondary text-foreground hover:bg-secondary/70"
                      }`}
                    >
                      {f.label}
                      <span
                        className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
                          active
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-background text-muted-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {filteredClaims.length === 0 ? (
                <EmptyClaims onNew={() => openClaim()} />
              ) : (
                <div className="space-y-3">
                  {filteredClaims.map((c) => {
                    const cb = claimBadge[c.status];
                    const Icon = cb.icon;
                    return (
                      <div
                        key={c.id}
                        className="rounded-xl border border-border/70 bg-background p-4 transition-shadow hover:shadow-card"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-secondary">
                            <img
                              src={c.productImg}
                              alt={c.productName}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] font-bold text-foreground">
                                {c.caseNo}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${cb.cls}`}
                              >
                                <Icon className="h-3 w-3" />
                                {cb.label}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                <CalendarDays className="mr-1 inline h-3 w-3" />
                                {fmtDate(c.submittedOn)}
                              </span>
                            </div>
                            <h3 className="mt-1 font-semibold text-foreground">
                              {c.productName}{" "}
                              <span className="text-xs font-normal text-muted-foreground">
                                · {c.brand}
                              </span>
                            </h3>
                            <p className="text-xs">
                              <span className="font-semibold text-primary">
                                {c.category}
                              </span>{" "}
                              <span className="text-muted-foreground">
                                — {c.description}
                              </span>
                            </p>

                            {c.resolutionNote && (
                              <div
                                className={`mt-2 flex items-start gap-2 rounded-lg border px-3 py-2 text-xs ${
                                  c.status === "approved"
                                    ? "border-emerald-200 bg-emerald-50/60 text-emerald-800"
                                    : "border-rose-200 bg-rose-50/60 text-rose-800"
                                }`}
                              >
                                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                <div>
                                  <div className="font-semibold">
                                    Resolution
                                    {c.resolvedOn
                                      ? ` · ${fmtDate(c.resolvedOn)}`
                                      : ""}
                                  </div>
                                  <p>{c.resolutionNote}</p>
                                  {c.technician && (
                                    <p className="mt-0.5 opacity-80">
                                      {c.technician}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Info + Help cards */}
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-primary/15 bg-gradient-brand-soft p-5 shadow-card">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      Warranty Coverage
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      What's protected under your Cellexa warranty
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-xs">
                  {[
                    "Manufacturing defects covered for the full warranty period",
                    "Free pickup & drop-off for in-warranty repairs island-wide",
                    "Genuine parts and certified technicians",
                    "Cellexa Care extends coverage with accidental damage protection",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="text-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 gap-1.5"
                  asChild
                >
                  <Link to="/account">
                    <FileText className="h-3.5 w-3.5" />
                    Read full warranty policy
                  </Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-foreground">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      Need help with a claim?
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Our support team is available 7 days a week
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Live Chat
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    Call Us
                  </Button>
                </div>
                <div className="mt-3 rounded-lg bg-secondary/60 px-3 py-2.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Service Centers
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    Colombo · Kandy · Galle · Jaffna · Negombo — walk in with
                    your case number for priority service.
                  </p>
                </div>
              </div>
            </div>
            </section>
          </div>
        </div>
      </main>

      {/* Submit claim dialog */}
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) resetForm();
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display">
              <Wrench className="h-5 w-5 text-primary" />
              Submit Warranty Claim
            </DialogTitle>
            <DialogDescription>
              Tell us what's happening — our team will review within 24 hours.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="product">Select product</Label>
              <Select
                value={selectedProductId}
                onValueChange={setSelectedProductId}
              >
                <SelectTrigger id="product">
                  <SelectValue placeholder="Choose a registered device" />
                </SelectTrigger>
                <SelectContent>
                  {eligibleProducts.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} · #{p.orderNo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category">Issue category</Label>
              <Select value={issueCategory} onValueChange={setIssueCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select an issue type" />
                </SelectTrigger>
                <SelectContent>
                  {ISSUE_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desc">Describe the issue</Label>
              <Textarea
                id="desc"
                rows={4}
                maxLength={500}
                placeholder="When did it start? What have you tried? Any error messages?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="text-right text-[10px] text-muted-foreground">
                {description.length}/500
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Upload evidence (optional)</Label>
              <label
                htmlFor="files"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-4 py-5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Upload className="h-4 w-4" />
                <span>
                  Click to upload photos or videos
                  <span className="ml-1 text-[10px]">(max 5 files)</span>
                </span>
                <Input
                  id="files"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={onFiles}
                />
              </label>
              {files.length > 0 && (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-lg border border-border bg-secondary p-2"
                    >
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <ImageIcon className="h-3 w-3 shrink-0 text-primary" />
                        <span className="truncate">{f.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(i)}
                        className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-background/90 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                        aria-label="Remove file"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submit} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Submit Claim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  tone: "primary" | "emerald" | "amber" | "muted";
}) => {
  const tones = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    muted: "bg-secondary text-foreground",
  };
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card">
      <div className="flex items-center gap-3">
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-muted-foreground">
            {label}
          </div>
          <div className="font-display text-xl font-bold text-foreground">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyClaims = ({ onNew }: { onNew: () => void }) => (
  <div className="rounded-xl border-2 border-dashed border-border bg-secondary/30 px-6 py-12 text-center">
    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
      <ShieldCheck className="h-7 w-7" />
    </div>
    <h3 className="mt-3 font-display text-base font-bold">No claims yet</h3>
    <p className="mt-1 text-xs text-muted-foreground">
      All your devices are running smoothly. File a claim if anything stops
      working.
    </p>
    <Button onClick={onNew} className="mt-4 gap-1.5" size="sm">
      <Wrench className="h-3.5 w-3.5" />
      File a Claim
    </Button>
  </div>
);

export default Warranty;
