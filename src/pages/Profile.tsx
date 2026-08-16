import { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, MapPin, Lock, Bell, Trash2, Plus, Check, Smartphone, Monitor } from "lucide-react";
import AccountLayout from "@/components/cellexa/AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { addresses, customer } from "@/data/account";
import { cn } from "@/lib/utils";

const TABS = ["Personal details", "Addresses", "Security", "Preferences"] as const;
type Tab = (typeof TABS)[number];

const sessions = [
  { icon: Monitor, device: "Chrome on Windows", where: "Colombo, Sri Lanka", when: "Active now", current: true },
  { icon: Smartphone, device: "Nexzon app · iPhone", where: "Colombo, Sri Lanka", when: "2 days ago", current: false },
  { icon: Monitor, device: "Safari on macOS", where: "Kandy, Sri Lanka", when: "3 weeks ago", current: false },
];

const prefs = [
  { id: "order", title: "Order updates", desc: "Dispatch, delivery and delays", email: true, sms: true },
  { id: "price", title: "Price drops", desc: "When something on your wishlist falls", email: true, sms: false },
  { id: "stock", title: "Back in stock", desc: "Items you asked to be notified about", email: true, sms: true },
  { id: "promo", title: "Offers & launches", desc: "Flash deals and pre-order windows", email: false, sms: false },
];

const Profile = () => {
  const [tab, setTab] = useState<Tab>("Personal details");
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(prefs.flatMap((p) => [[`${p.id}-email`, p.email], [`${p.id}-sms`, p.sms]])) as Record<string, boolean>,
  );

  useEffect(() => {
    document.title = "Profile & addresses — Nexzon";
  }, []);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AccountLayout title="Profile & addresses" subtitle="Your details, saved addresses and how we contact you.">
      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors",
              tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
            {tab === t && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />}
          </button>
        ))}
      </div>

      <div className="pt-6">
        {tab === "Personal details" && (
          <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-hero font-display text-xl font-extrabold text-primary-foreground">
                {customer.initials}
              </span>
              <div className="min-w-0">
                <p className="font-display text-lg font-bold text-foreground">{customer.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {customer.tier} member · joined {customer.memberSince}
                </p>
              </div>
              <Button type="button" variant="outline" size="sm" className="ml-auto shrink-0">Change photo</Button>
            </div>

            <div className="mt-6 grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="first" className="text-xs font-semibold">First name</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="first" defaultValue={customer.firstName} className="h-11 rounded-xl pl-10" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="last" className="text-xs font-semibold">Last name</Label>
                <Input id="last" defaultValue={customer.lastName} className="h-11 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" defaultValue={customer.email} className="h-11 rounded-xl pl-10" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold">Mobile</Label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="phone" type="tel" defaultValue={customer.phone} className="h-11 rounded-xl pl-10" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dob" className="text-xs font-semibold">Birthday</Label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="dob" defaultValue={customer.birthday} className="h-11 rounded-xl pl-10" />
                </div>
                <p className="text-[11px] text-muted-foreground">We send a voucher every year.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nic" className="text-xs font-semibold">NIC (for warranty claims)</Label>
                <Input id="nic" defaultValue={customer.nic} className="h-11 rounded-xl" />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
              <Button type="submit">Save changes</Button>
              {saved && (
                <span role="status" className="inline-flex items-center gap-1.5 text-sm font-semibold text-success">
                  <Check className="h-4 w-4" /> Saved
                </span>
              )}
            </div>
          </form>
        )}

        {tab === "Addresses" && (
          <div className="space-y-4">
            {addresses.map((a) => (
              <div key={a.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-base font-bold text-foreground">{a.label}</h2>
                        {a.isDefault && (
                          <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">Default</span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {a.name}<br />
                        {a.street}<br />
                        {a.city}, {a.district} {a.postcode}<br />
                        {a.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-6 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <Plus className="h-4 w-4" /> Add a new address
            </button>
          </div>
        )}

        {tab === "Security" && (
          <div className="space-y-5">
            <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <Lock className="h-4 w-4 text-primary" /> Change password
              </h2>
              <div className="mt-5 grid gap-4 [&>*]:min-w-0 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="cur" className="text-xs font-semibold">Current password</Label>
                  <Input id="cur" type="password" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new" className="text-xs font-semibold">New password</Label>
                  <Input id="new" type="password" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="conf" className="text-xs font-semibold">Confirm new password</Label>
                  <Input id="conf" type="password" className="h-11 rounded-xl" />
                </div>
              </div>
              <Button type="submit" className="mt-5">Update password</Button>
            </form>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold">Where you're signed in</h2>
              <ul className="mt-4 divide-y divide-border">
                {sessions.map((s) => (
                  <li key={s.device} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{s.device}</p>
                      <p className="text-xs text-muted-foreground">{s.where} · {s.when}</p>
                    </div>
                    {s.current ? (
                      <span className="shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold text-success">
                        This device
                      </span>
                    ) : (
                      <Button variant="ghost" size="sm" className="shrink-0 text-muted-foreground hover:text-destructive">
                        Sign out
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "Preferences" && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <Bell className="h-4 w-4 text-primary" /> How we reach you
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Choose a channel for each kind of update.</p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 font-semibold">Update</th>
                    <th className="pb-3 text-center font-semibold">Email</th>
                    <th className="pb-3 text-center font-semibold">SMS</th>
                  </tr>
                </thead>
                <tbody>
                  {prefs.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-foreground">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.desc}</p>
                      </td>
                      {(["email", "sms"] as const).map((ch) => (
                        <td key={ch} className="py-4 text-center">
                          <Switch
                            aria-label={`${p.title} by ${ch}`}
                            checked={toggles[`${p.id}-${ch}`]}
                            onCheckedChange={(v) => setToggles((t) => ({ ...t, [`${p.id}-${ch}`]: v }))}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Profile;
