import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const getStrength = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const strength = useMemo(() => getStrength(password), [password]);
  const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "bg-destructive",
    "bg-destructive",
    "bg-promo",
    "bg-primary",
    "bg-emerald-500",
  ][strength];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative overflow-hidden">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-32 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--secondary))_100%)] opacity-60" />
        </div>

        <div className="container-page py-4 sm:py-5">
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-lift sm:p-6">
              <h1 className="text-center font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Create your account
              </h1>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                Faster checkout, order tracking and member rewards.
              </p>

              <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
                {/* Full name */}
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs font-semibold text-foreground">
                    Full name
                  </Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Nuwan Perera"
                      className="h-10 rounded-lg pl-9 text-sm"
                    />
                  </div>
                </div>

                {/* Email + Phone grid */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.lk"
                        className="h-10 rounded-lg pl-9 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-xs font-semibold text-foreground">
                      Phone
                    </Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+94 7X XXX XXXX"
                        className="h-10 rounded-lg pl-9 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 rounded-lg pl-9 pr-10 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-1.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Strength meter */}
                  {password.length > 0 && (
                    <div className="space-y-1 pt-0.5">
                      <div className="flex h-1 gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-full flex-1 rounded-full transition-colors ${
                              i < strength ? strengthColor : "bg-secondary"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        <span className="font-semibold text-foreground">{strengthLabel}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div className="space-y-1">
                  <Label htmlFor="confirm" className="text-xs font-semibold text-foreground">
                    Confirm password
                  </Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      className="h-10 rounded-lg pl-9 pr-10 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                      className="absolute right-1.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      {showConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" className="mt-0.5" />
                  <Label
                    htmlFor="terms"
                    className="cursor-pointer text-xs font-medium leading-snug text-muted-foreground"
                  >
                    I agree to Cellexa's{" "}
                    <Link to="/register" className="font-semibold text-primary hover:underline">
                      Terms
                    </Link>{" "}
                    &{" "}
                    <Link to="/register" className="font-semibold text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </Label>
                </div>

                {/* CTA */}
                <Button type="submit" variant="brand" className="h-10 w-full text-sm">
                  Create Account
                </Button>

                {/* Divider */}
                <div className="relative py-0.5">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    or
                  </span>
                </div>

                {/* Social */}
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button type="button" variant="outline" className="h-10 rounded-lg text-sm">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09A6.99 6.99 0 0 1 5.47 12c0-.73.13-1.43.36-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
                    </svg>
                    Google
                  </Button>
                  <Button type="button" variant="outline" className="h-10 rounded-lg text-sm">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16.365 1.43c0 1.14-.46 2.23-1.21 3.03-.81.86-2.13 1.52-3.22 1.43-.14-1.12.4-2.27 1.16-3.04.85-.86 2.27-1.5 3.27-1.42zM20.5 17.4c-.55 1.27-.81 1.83-1.51 2.95-.98 1.56-2.36 3.5-4.07 3.51-1.52.02-1.91-.99-3.97-.97-2.06.01-2.49 1-4.01.98-1.71-.02-3.02-1.78-4-3.34C.62 16.4-.05 11 2.05 7.74 3.4 5.66 5.5 4.49 7.49 4.49c2.02 0 3.29 1.11 4.96 1.11 1.62 0 2.61-1.11 4.95-1.11 1.77 0 3.65.96 4.99 2.62-4.39 2.41-3.68 8.69-1.89 10.29z" />
                    </svg>
                    Apple
                  </Button>
                </div>
              </form>

              {/* Sign in prompt */}
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
