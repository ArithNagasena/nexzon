import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ChevronRight,
  Menu,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Bell,
  Tag,
  Sparkles,
  CheckCircle2,
  Star,
  HelpCircle,
  MessageCircle,
  Camera,
  Home,
  Building2,
  Crown,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { AccountSidebarNav, AccountProfileCard } from "@/components/cellexa/AccountSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const districts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle",
];

interface SavedAddress {
  id: string;
  label: string;
  type: "home" | "office";
  name: string;
  phone: string;
  street: string;
  city: string;
  district: string;
  postal: string;
  isDefault?: boolean;
}

const initialAddresses: SavedAddress[] = [
  {
    id: "1",
    label: "Home",
    type: "home",
    name: "Nuwan Perera",
    phone: "+94 77 555 1234",
    street: "No. 142/3, Galle Road",
    city: "Colombo 03",
    district: "Colombo",
    postal: "00300",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    type: "office",
    name: "Nuwan Perera",
    phone: "+94 11 234 5678",
    street: "Level 12, World Trade Center, Echelon Square",
    city: "Colombo 01",
    district: "Colombo",
    postal: "00100",
  },
];

const Profile = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [addresses] = useState<SavedAddress[]>(initialAddresses);

  const [prefs, setPrefs] = useState({
    emailOrders: true,
    emailPromos: true,
    smsAlerts: true,
    priceDrops: true,
    backInStock: true,
    newsletter: false,
    preorders: true,
  });

  const handleSave = (section: string) => {
    setDirty(false);
    toast.success(`${section} updated`, {
      description: "Your changes have been saved successfully.",
    });
  };

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    toast.success("Preference updated");
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
            <span className="font-semibold text-foreground">Profile</span>
          </nav>

          {/* Page header */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Profile Management
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Update your personal details, addresses, security, and notification preferences.
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
                  activePath="/account/profile"
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
                  <AccountSidebarNav activePath="/account/profile" />
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="space-y-6 lg:col-span-9">
              {/* Profile overview */}
              <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-card sm:p-8">
                <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/5 blur-2xl" />

                <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="grid h-20 w-20 place-items-center rounded-2xl border border-border bg-surface font-display text-2xl font-extrabold text-foreground">
                        NP
                      </div>
                      <button
                        type="button"
                        className="absolute -bottom-1.5 -right-1.5 grid h-8 w-8 place-items-center rounded-xl border-2 border-primary bg-card text-primary shadow-lift transition-transform hover:scale-105"
                        aria-label="Change photo"
                      >
                        <Camera className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <Crown className="h-3.5 w-3.5" />
                        Gold Member · Since Mar 2023
                      </span>
                      <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                        Nuwan Perera
                      </h2>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          nuwan@example.lk
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          +94 77 555 1234
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button size="sm">
                    <Edit3 className="h-4 w-4" />
                    Quick Edit
                  </Button>
                </div>
              </section>

              {/* Personal information */}
              <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-extrabold tracking-tight">
                      Personal Information
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Used for orders, deliveries, and account communication.
                    </p>
                  </div>
                  {dirty && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/20 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                      <Sparkles className="h-3 w-3" />
                      Unsaved changes
                    </span>
                  )}
                </div>

                <form
                  className="mt-5 grid gap-5 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave("Personal information");
                  }}
                  onChange={() => setDirty(true)}
                >
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="fullname" className="text-sm font-semibold">Full name</Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="fullname" defaultValue="Nuwan Perera" className="h-11 rounded-xl pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="email" type="email" defaultValue="nuwan@example.lk" className="h-11 rounded-xl pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold">Phone</Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="phone" type="tel" defaultValue="+94 77 555 1234" className="h-11 rounded-xl pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-sm font-semibold">
                      Date of birth <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="dob" type="date" defaultValue="1992-08-14" className="h-11 rounded-xl pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-semibold">
                      Gender <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Select defaultValue="prefer-not">
                      <SelectTrigger id="gender" className="h-11 rounded-xl">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-end gap-2 sm:col-span-2">
                    <Button type="button" variant="ghost" onClick={() => setDirty(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="brand" disabled={!dirty}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </section>

              {/* Saved addresses */}
              <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-extrabold tracking-tight">
                      Saved Addresses
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Manage shipping and billing addresses for faster checkout.
                    </p>
                  </div>
                  <Button variant="brand" size="sm">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Address</span>
                  </Button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {addresses.map((a) => (
                    <div
                      key={a.id}
                      className={`relative rounded-2xl border p-5 transition-colors ${
                        a.isDefault
                          ? "border-primary/40 bg-primary/5"
                          : "border-border/70 bg-background hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                            {a.type === "home" ? <Home className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-foreground">{a.label}</span>
                              {a.isDefault && (
                                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{a.name}</div>
                          </div>
                        </div>

                        <div className="flex gap-1">
                          <button
                            type="button"
                            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            aria-label="Edit address"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete address"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 space-y-1 text-sm text-foreground">
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          <span>{a.street}</span>
                        </div>
                        <div className="pl-5.5 text-sm text-muted-foreground" style={{ paddingLeft: "1.375rem" }}>
                          {a.city}, {a.district} {a.postal}
                        </div>
                        <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {a.phone}
                        </div>
                      </div>

                      {!a.isDefault && (
                        <button
                          type="button"
                          onClick={() => toast.success("Default address updated")}
                          className="mt-4 text-xs font-semibold text-primary hover:underline"
                        >
                          Set as default
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* District helper hint */}
                <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  We deliver to all 25 districts including {districts.slice(0, 3).join(", ")} and more.
                </p>
              </section>

              {/* Security */}
              <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-extrabold tracking-tight">
                      Password & Security
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Use a strong password to keep your account safe.
                    </p>
                  </div>
                  <span className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 sm:inline-flex">
                    <ShieldCheck className="h-3 w-3" />
                    Secured
                  </span>
                </div>

                <form
                  className="mt-5 grid gap-5 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave("Password");
                  }}
                >
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="current" className="text-sm font-semibold">Current password</Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="current"
                        type={showCurrent ? "text" : "password"}
                        placeholder="Enter current password"
                        className="h-11 rounded-xl pl-10 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent((s) => !s)}
                        aria-label="Toggle visibility"
                        className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new" className="text-sm font-semibold">New password</Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="new"
                        type={showNew ? "text" : "password"}
                        placeholder="At least 8 characters"
                        className="h-11 rounded-xl pl-10 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew((s) => !s)}
                        aria-label="Toggle visibility"
                        className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm" className="text-sm font-semibold">Confirm new password</Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirm"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter new password"
                        className="h-11 rounded-xl pl-10 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        aria-label="Toggle visibility"
                        className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground sm:col-span-2">
                    <p className="flex items-center gap-1.5 font-semibold text-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      Tips for a strong password
                    </p>
                    <ul className="mt-1 ml-5 list-disc space-y-0.5">
                      <li>Use at least 8 characters with a mix of letters, numbers and symbols.</li>
                      <li>Avoid reusing passwords from other sites.</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:col-span-2">
                    <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:underline">
                      Forgot password?
                    </Link>
                    <Button type="submit" variant="brand">
                      Change Password
                    </Button>
                  </div>
                </form>
              </section>

              {/* Preferences */}
              <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
                <div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight">
                    Notification Preferences
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Choose what you'd like to hear about from Cellexa.
                  </p>
                </div>

                <div className="mt-5 divide-y divide-border/70 rounded-xl border border-border/70 bg-background">
                  {[
                    { key: "emailOrders", icon: Mail, title: "Order updates by email", text: "Confirmation, shipping, and delivery emails." },
                    { key: "smsAlerts", icon: Phone, title: "SMS alerts", text: "Critical order and delivery SMS notifications." },
                    { key: "emailPromos", icon: Tag, title: "Promotional offers", text: "Exclusive member deals and seasonal sales." },
                    { key: "priceDrops", icon: Bell, title: "Price drop alerts", text: "Notify me when wishlist items drop in price." },
                    { key: "backInStock", icon: Star, title: "Back-in-stock alerts", text: "When out-of-stock items are restocked." },
                    { key: "preorders", icon: Sparkles, title: "Pre-order & launch updates", text: "Be first to hear about new launches." },
                    { key: "newsletter", icon: Mail, title: "Cellexa newsletter", text: "Monthly tech roundup and buying guides." },
                  ].map((p) => (
                    <div key={p.key} className="flex items-center justify-between gap-3 p-4">
                      <div className="flex items-start gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                          <p.icon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="text-sm font-bold text-foreground">{p.title}</div>
                          <div className="text-xs text-muted-foreground">{p.text}</div>
                        </div>
                      </div>
                      <Switch
                        checked={prefs[p.key as keyof typeof prefs]}
                        onCheckedChange={() => togglePref(p.key as keyof typeof prefs)}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Support */}
              <section className="overflow-hidden rounded-2xl border border-border/70 bg-gradient-brand-soft p-6 shadow-card sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lift">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                        Your data is secure with Cellexa
                      </h3>
                      <p className="mt-1 max-w-lg text-sm text-muted-foreground">
                        Profile changes are encrypted in transit. Need help updating something?
                        Our Colombo support team is happy to assist.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="lg">
                      <HelpCircle className="h-4 w-4" /> FAQ
                    </Button>
                    <Button variant="brand" size="lg">
                      <MessageCircle className="h-4 w-4" /> Live Chat
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
