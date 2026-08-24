/**
 * Staff sign-in.
 *
 * Deliberately not the customer /login page: a shopper session must never
 * resolve into an admin one. There is no backend here, so the form checks
 * against the seeded staff list — the demo accounts are listed on the panel
 * so the console can actually be opened.
 */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ShieldCheck, TriangleAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_PASSWORD, isSignedIn, signIn } from "@/data/admin/auth";
import { staff } from "@/data/admin/staff";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Sign in — Nexzon Admin";
    if (isSignedIn()) navigate("/admin", { replace: true });
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    const result = signIn(email, password);
    if (result.staff) {
      navigate(from, { replace: true });
      return;
    }

    setError(result.error);
    setBusy(false);
  };

  const fillAccount = (accountEmail: string) => {
    setEmail(accountEmail);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  return (
    <div className="grid min-h-screen bg-surface lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-deep p-10 text-primary-foreground lg:flex">
        <div>
          <span className="flex select-none flex-col items-start leading-none">
            <span className="font-display text-[30px] font-extrabold uppercase tracking-[0.01em]">
              Ne<span className="text-warning">x</span>zon
            </span>
            <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.36em] text-primary-foreground/60">
              Admin Console
            </span>
          </span>
        </div>

        <div className="max-w-md">
          <h1 className="font-display text-3xl font-extrabold leading-tight">
            Everything behind the storefront, in one place.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
            Catalog and stock, the order pipeline, pre-order allocation, promotions, reviews and the service desk for
            returns, warranty and trade-ins.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Staff accounts are separate from customer logins",
              "Every price change and refund is attributable",
              "Roles decide which pages each person can reach",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-primary-foreground/80">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-primary-foreground/50">
          {site.legalName} · {site.address.full}
        </p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <span className="font-display text-2xl font-extrabold uppercase text-foreground">
              Ne<span className="text-primary">x</span>zon
            </span>
            <p className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.36em] text-muted-foreground">
              Admin Console
            </p>
          </div>

          <h2 className="font-display text-2xl font-extrabold">Staff sign in</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Use your Nexzon staff address. Customer accounts will not work here.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-foreground">Work email</span>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@nexzon.lk"
                className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-xs font-bold text-foreground">
                Password
                <Link to="/admin/login" className="font-medium text-primary hover:underline">
                  Forgot it?
                </Link>
              </span>
              <span className="relative block">
                <input
                  type={show ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 pr-11 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            {error && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-destructive/25 bg-destructive/10 p-3 text-xs font-medium text-destructive"
              >
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-soft">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              <Lock className="h-3.5 w-3.5" /> Staff accounts
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Pick a role to fill in its credentials. The sidebar and the pages you can reach change with it.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {staff
                .filter((s) => s.active)
                .map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => fillAccount(s.email)}
                    className={cn(
                      "rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground/75 transition-colors",
                      "hover:border-primary/40 hover:text-primary",
                    )}
                  >
                    {s.role}
                  </button>
                ))}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Not staff?{" "}
            <Link to="/" className="font-semibold text-primary hover:underline">
              Back to the shop
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
