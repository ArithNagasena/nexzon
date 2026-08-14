import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Menu,
  Repeat,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  HelpCircle,
  MessageCircle,
  Sparkles,
  Smartphone,
  Camera,
  Wallet,
  TrendingUp,
  Image as ImageIcon,
  X,
  CalendarDays,
  Package,
  ArrowRight,
  Phone,
  Truck,
  ShieldCheck,
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

type RequestStatus = "submitted" | "quoted" | "accepted" | "rejected" | "completed";

interface TradeRequest {
  id: string;
  refNo: string;
  brand: string;
  model: string;
  category: string;
  condition: string;
  storage: string;
  age: string;
  upgradeTo?: string;
  estimate: number;
  finalOffer?: number;
  submittedOn: string;
  resolvedOn?: string;
  status: RequestStatus;
  note?: string;
}

const fmtLKR = (n: number) =>
  "LKR " + n.toLocaleString("en-LK", { maximumFractionDigits: 0 });
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-LK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const BRANDS = [
  "Apple",
  "Samsung",
  "Google",
  "Xiaomi",
  "OnePlus",
  "Huawei",
  "Sony",
  "Oppo",
  "Vivo",
  "Other",
];

const CATEGORIES = [
  "Smartphone",
  "Tablet",
  "Laptop",
  "Smartwatch",
  "Earbuds / Headphones",
  "Camera",
  "Gaming Console",
];

const CONDITIONS = [
  {
    id: "like-new",
    label: "Like New",
    desc: "No scratches, fully functional, original box",
    multiplier: 1.0,
  },
  {
    id: "good",
    label: "Good",
    desc: "Minor wear, screen flawless, all features work",
    multiplier: 0.8,
  },
  {
    id: "fair",
    label: "Fair",
    desc: "Visible scratches/dents, fully functional",
    multiplier: 0.6,
  },
  {
    id: "poor",
    label: "Poor",
    desc: "Damaged screen/body or partial functionality",
    multiplier: 0.35,
  },
];

const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB", "Other"];
const AGE_OPTIONS = [
  "Less than 6 months",
  "6 - 12 months",
  "1 - 2 years",
  "2 - 3 years",
  "3+ years",
];

// Rough base values per category (LKR)
const BASE_VALUE: Record<string, number> = {
  Smartphone: 95000,
  Tablet: 70000,
  Laptop: 145000,
  Smartwatch: 38000,
  "Earbuds / Headphones": 18000,
  Camera: 85000,
  "Gaming Console": 90000,
};

const AGE_FACTOR: Record<string, number> = {
  "Less than 6 months": 1.0,
  "6 - 12 months": 0.85,
  "1 - 2 years": 0.65,
  "2 - 3 years": 0.45,
  "3+ years": 0.25,
};

const HISTORY: TradeRequest[] = [
  {
    id: "t1",
    refNo: "TI-22147",
    brand: "Apple",
    model: "iPhone 13 Pro",
    category: "Smartphone",
    condition: "Good",
    storage: "256GB",
    age: "1 - 2 years",
    upgradeTo: "iPhone 15 Pro Max",
    estimate: 142000,
    finalOffer: 138000,
    submittedOn: "2025-11-04",
    resolvedOn: "2025-11-09",
    status: "completed",
    note: "Trade-in credit applied to order CLX-10293.",
  },
  {
    id: "t2",
    refNo: "TI-22310",
    brand: "Samsung",
    model: "Galaxy S22",
    category: "Smartphone",
    condition: "Fair",
    storage: "128GB",
    age: "2 - 3 years",
    upgradeTo: "Galaxy S24 Ultra",
    estimate: 58000,
    finalOffer: 54000,
    submittedOn: "2026-01-02",
    status: "quoted",
    note: "Quote valid for 14 days.",
  },
  {
    id: "t3",
    refNo: "TI-22455",
    brand: "Sony",
    model: "WF-1000XM4",
    category: "Earbuds / Headphones",
    condition: "Good",
    storage: "Other",
    age: "1 - 2 years",
    estimate: 14500,
    submittedOn: "2026-02-18",
    status: "submitted",
  },
];

const statusBadge: Record<
  RequestStatus,
  { label: string; cls: string; icon: LucideIcon }
> = {
  submitted: {
    label: "Under Review",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  quoted: {
    label: "Quote Ready",
    cls: "bg-primary/10 text-primary border-primary/20",
    icon: Sparkles,
  },
  accepted: {
    label: "Accepted",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Declined",
    cls: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
  },
  completed: {
    label: "Completed",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
};

const TradeIn = () => {
  const [history, setHistory] = useState<TradeRequest[]>(HISTORY);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [storage, setStorage] = useState("");
  const [age, setAge] = useState("");
  const [upgradeTo, setUpgradeTo] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const estimate = useMemo(() => {
    if (!category || !condition || !age) return null;
    const base = BASE_VALUE[category] ?? 50000;
    const cm = CONDITIONS.find((c) => c.label === condition)?.multiplier ?? 0.6;
    const af = AGE_FACTOR[age] ?? 0.5;
    const storageBoost =
      storage === "512GB" ? 1.1 : storage === "1TB" ? 1.18 : 1;
    const value = Math.round((base * cm * af * storageBoost) / 500) * 500;
    const low = Math.max(2000, Math.round((value * 0.9) / 500) * 500);
    const high = Math.round((value * 1.1) / 500) * 500;
    return { low, high, mid: value };
  }, [category, condition, age, storage]);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...list].slice(0, 6));
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const reset = () => {
    setBrand("");
    setModel("");
    setCategory("");
    setCondition("");
    setStorage("");
    setAge("");
    setUpgradeTo("");
    setNotes("");
    setFiles([]);
  };

  const submit = () => {
    if (!brand || !model.trim()) {
      toast.error("Please enter your device brand and model");
      return;
    }
    if (!category || !condition || !age) {
      toast.error("Please complete category, condition and age");
      return;
    }
    const refNo = "TI-" + Math.floor(20000 + Math.random() * 9000);
    const newReq: TradeRequest = {
      id: "t" + Date.now(),
      refNo,
      brand,
      model: model.trim(),
      category,
      condition,
      storage: storage || "—",
      age,
      upgradeTo: upgradeTo.trim() || undefined,
      estimate: estimate?.mid ?? 0,
      submittedOn: new Date().toISOString(),
      status: "submitted",
      note: notes.trim() || undefined,
    };
    setHistory((p) => [newReq, ...p]);
    toast.success(`Trade-in request ${refNo} submitted`);
    reset();
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
            <span className="font-semibold text-foreground">Trade-In / Upgrade Request</span>
          </nav>

          {/* Page header */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Trade-In / Upgrade Request
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Get an instant estimate for your old device and apply the credit toward your next upgrade.
              </p>
            </div>

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
                <AccountSidebarNav activePath="/account/trade-in" />
              </SheetContent>
            </Sheet>
          </div>

          <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 space-y-4">
                <AccountProfileCard />
                <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card">
                  <AccountSidebarNav activePath="/account/trade-in" />
                </div>
              </div>
            </aside>

            {/* Main */}
            <section className="min-w-0 space-y-6 lg:col-span-9">

            {/* Hero / How it works */}
            <section className="overflow-hidden rounded-2xl border border-primary/15 bg-gradient-brand-soft p-5 shadow-card sm:p-6">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Repeat className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">
                    How Nexzon Trade-In works
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Three quick steps to upgrade smarter
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: Smartphone,
                    title: "Tell us about it",
                    desc: "Describe your device — brand, condition, age, storage.",
                  },
                  {
                    icon: Wallet,
                    title: "Get a quote",
                    desc: "Instant estimate. Final offer confirmed within 24h.",
                  },
                  {
                    icon: Truck,
                    title: "Ship & save",
                    desc: "Free pickup island-wide. Credit applied to your upgrade.",
                  },
                ].map((s, i) => (
                  <div
                    key={s.title}
                    className="rounded-xl border border-border/70 bg-background p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <s.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Form + Estimate */}
            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
              {/* Form */}
              <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <h2 className="font-display text-lg font-bold">
                    Your Device Details
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="brand">Brand</Label>
                    <Select value={brand} onValueChange={setBrand}>
                      <SelectTrigger id="brand">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANDS.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      placeholder="e.g. iPhone 13 Pro"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="storage">Storage / Variant</Label>
                    <Select value={storage} onValueChange={setStorage}>
                      <SelectTrigger id="storage">
                        <SelectValue placeholder="Select storage" />
                      </SelectTrigger>
                      <SelectContent>
                        {STORAGE_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="age">Age of device</Label>
                    <Select value={age} onValueChange={setAge}>
                      <SelectTrigger id="age">
                        <SelectValue placeholder="How long have you owned it?" />
                      </SelectTrigger>
                      <SelectContent>
                        {AGE_OPTIONS.map((a) => (
                          <SelectItem key={a} value={a}>
                            {a}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Condition selector */}
                <div className="mt-5 space-y-2">
                  <Label>Condition</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {CONDITIONS.map((c) => {
                      const active = condition === c.label;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setCondition(c.label)}
                          className={`group rounded-xl border p-3 text-left transition-all ${
                            active
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-sm font-bold ${
                                active ? "text-primary" : "text-foreground"
                              }`}
                            >
                              {c.label}
                            </span>
                            {active && (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            {c.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Upgrade to */}
                <div className="mt-5 space-y-1.5">
                  <Label htmlFor="upgrade">
                    Expected upgrade product{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="upgrade"
                    placeholder="e.g. iPhone 15 Pro Max 256GB"
                    value={upgradeTo}
                    onChange={(e) => setUpgradeTo(e.target.value)}
                  />
                </div>

                {/* Notes */}
                <div className="mt-4 space-y-1.5">
                  <Label htmlFor="notes">
                    Additional notes{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="notes"
                    rows={3}
                    maxLength={400}
                    placeholder="Anything we should know — accessories included, known issues, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="text-right text-[10px] text-muted-foreground">
                    {notes.length}/400
                  </div>
                </div>

                {/* Image upload */}
                <div className="mt-4 space-y-1.5">
                  <Label>
                    Upload device photos{" "}
                    <span className="text-muted-foreground">(recommended)</span>
                  </Label>
                  <label
                    htmlFor="ti-files"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-4 py-5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    <Camera className="h-4 w-4" />
                    <span>
                      Click to upload front, back &amp; sides
                      <span className="ml-1 text-[10px]">(max 6 photos)</span>
                    </span>
                    <Input
                      id="ti-files"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={onFiles}
                    />
                  </label>
                  {files.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 pt-1 sm:grid-cols-6">
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

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button variant="outline" onClick={reset}>
                    Reset
                  </Button>
                  <Button onClick={submit} className="gap-2">
                    <Repeat className="h-4 w-4" />
                    Submit Trade-In Request
                  </Button>
                </div>
              </section>

              {/* Estimate preview */}
              <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                <div className="overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-card">
                  <div className="bg-gradient-hero px-5 py-4 text-primary-foreground">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-90">
                      <Sparkles className="h-3.5 w-3.5" />
                      Estimated Value
                    </div>
                    <div className="mt-1 font-display text-2xl font-bold">
                      {estimate ? fmtLKR(estimate.mid) : "LKR — — —"}
                    </div>
                    {estimate && (
                      <div className="mt-0.5 text-[11px] opacity-90">
                        Range {fmtLKR(estimate.low)} – {fmtLKR(estimate.high)}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {estimate ? (
                      <>
                        <p className="text-xs text-muted-foreground">
                          This is a preliminary estimate based on your inputs.
                          Final offer is confirmed after physical inspection.
                        </p>
                        <ul className="mt-3 space-y-1.5 text-xs">
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Category
                            </span>
                            <span className="font-semibold text-foreground">
                              {category}
                            </span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Condition
                            </span>
                            <span className="font-semibold text-foreground">
                              {condition}
                            </span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Age</span>
                            <span className="font-semibold text-foreground">
                              {age}
                            </span>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Fill in <b className="text-foreground">category</b>,{" "}
                        <b className="text-foreground">condition</b> and{" "}
                        <b className="text-foreground">age</b> to see an
                        instant estimate.
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    Why trade in with us
                  </div>
                  <ul className="mt-3 space-y-2 text-xs">
                    {[
                      "Best price guarantee vs. local market",
                      "Free island-wide pickup & insured shipping",
                      "Instant credit toward your upgrade",
                      "Data wipe certified by our technicians",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="text-foreground">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>

            {/* History */}
            <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-bold">
                    Previous Requests
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Your trade-in history with Nexzon
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-foreground">
                  {history.length} total
                </span>
              </div>

              {history.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-border bg-secondary/30 px-6 py-12 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                    <Repeat className="h-7 w-7" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold">
                    No trade-in requests yet
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Submit your first request above to get an instant estimate.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((r) => {
                    const sb = statusBadge[r.status];
                    const Icon = sb.icon;
                    return (
                      <div
                        key={r.id}
                        className="rounded-xl border border-border/70 bg-background p-4 transition-shadow hover:shadow-card"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] font-bold text-foreground">
                                {r.refNo}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${sb.cls}`}
                              >
                                <Icon className="h-3 w-3" />
                                {sb.label}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                <CalendarDays className="mr-1 inline h-3 w-3" />
                                {fmtDate(r.submittedOn)}
                              </span>
                            </div>
                            <h3 className="mt-1 font-semibold text-foreground">
                              {r.brand} {r.model}{" "}
                              <span className="text-xs font-normal text-muted-foreground">
                                · {r.storage} · {r.condition} · {r.age}
                              </span>
                            </h3>
                            {r.upgradeTo && (
                              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                                <ArrowRight className="h-3 w-3 text-primary" />
                                Upgrading to{" "}
                                <span className="font-semibold text-foreground">
                                  {r.upgradeTo}
                                </span>
                              </p>
                            )}
                            {r.note && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                {r.note}
                              </p>
                            )}
                          </div>

                          <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                            <div className="text-right">
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                {r.finalOffer ? "Final offer" : "Estimate"}
                              </div>
                              <div className="font-display text-base font-bold text-primary">
                                {fmtLKR(r.finalOffer ?? r.estimate)}
                              </div>
                            </div>
                            {r.status === "quoted" && (
                              <Button size="sm" className="gap-1.5">
                                Accept Quote
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Help card */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-foreground">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      Questions about trade-in?
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Talk to a specialist — we'll help you get the best value.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Live Chat
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    Call Us
                  </Button>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-gradient-brand-soft px-3 py-2 text-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-foreground">
                  All trade-ins include certified data wipe and a 7-day price
                  lock guarantee.
                </span>
              </div>
            </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TradeIn;
