import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  KeyRound,
  Clock,
  LifeBuoy,
  PackageCheck,
  CheckCircle2,
  MailCheck,
  RefreshCw,
} from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const reassurance = [
  { icon: ShieldCheck, title: "Secure reset", text: "Reset links are encrypted and expire in 30 minutes." },
  { icon: Clock, title: "Quick recovery", text: "Most accounts are restored in under 2 minutes." },
  { icon: PackageCheck, title: "Back to your orders", text: "Track shipments and reorder favorites instantly." },
  { icon: LifeBuoy, title: "Support standing by", text: "Reach our Colombo team 7 days a week." },
];

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

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

        <div className="container-page py-6 sm:py-10">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>

          <div className="mt-6 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
            {/* Form panel */}
            <div className="lg:col-span-7">
              <div className="mx-auto max-w-xl rounded-3xl border border-border/70 bg-card p-6 shadow-lift sm:p-10">
                {!submitted ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <KeyRound className="h-3.5 w-3.5" />
                        Account Recovery
                      </span>
                    </div>

                    <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                      Forgot your password?
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                      No worries — enter the email linked to your Cellexa account and we'll send
                      you a secure link to reset it.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                          Email address
                        </Label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.lk"
                            className="h-12 rounded-xl pl-10 text-base"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          We'll send the reset link to this email if it matches a Cellexa account.
                        </p>
                      </div>

                      <Button type="submit" variant="brand" size="lg" className="w-full">
                        Send Reset Link
                      </Button>

                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        Remember your password?
                        <Link to="/login" className="font-semibold text-primary hover:underline">
                          Sign in
                        </Link>
                      </div>
                    </form>

                    <div className="mt-8 grid gap-3 rounded-2xl bg-secondary/60 p-4 sm:grid-cols-2">
                      {reassurance.slice(0, 2).map(({ icon: Icon, title, text }) => (
                        <div key={title} className="flex items-start gap-2.5">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="text-xs font-bold text-foreground">{title}</div>
                            <div className="text-xs text-muted-foreground">{text}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      Secure 256-bit encrypted reset
                    </div>
                  </>
                ) : (
                  <>
                    {/* Success state */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <div className="absolute inset-0 -z-10 rounded-full bg-primary/15 blur-2xl" />
                        <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-lift">
                          <MailCheck className="h-10 w-10" />
                        </div>
                      </div>

                      <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Reset Link Sent
                      </span>

                      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Check your email
                      </h1>
                      <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                        We've sent a password reset link to{" "}
                        <span className="font-semibold text-foreground">{email}</span>. The link is
                        valid for 30 minutes.
                      </p>

                      <div className="mt-7 w-full rounded-2xl border border-dashed border-border bg-secondary/60 p-4 text-left">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          What's next
                        </p>
                        <ol className="mt-2 space-y-1.5 text-sm text-foreground">
                          <li className="flex gap-2">
                            <span className="font-bold text-primary">1.</span>
                            Open the email from Cellexa Support.
                          </li>
                          <li className="flex gap-2">
                            <span className="font-bold text-primary">2.</span>
                            Click the secure reset link.
                          </li>
                          <li className="flex gap-2">
                            <span className="font-bold text-primary">3.</span>
                            Set a new password and sign back in.
                          </li>
                        </ol>
                      </div>

                      <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="flex-1 rounded-xl"
                          onClick={() => setSubmitted(false)}
                        >
                          <RefreshCw className="h-4 w-4" />
                          Resend Link
                        </Button>
                        <Button asChild variant="brand" size="lg" className="flex-1">
                          <Link to="/login">Back to Sign In</Link>
                        </Button>
                      </div>

                      <p className="mt-5 text-xs text-muted-foreground">
                        Didn't get the email? Check your spam folder or{" "}
                        <Link to="/login" className="font-semibold text-primary hover:underline">
                          contact support
                        </Link>
                        .
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Trust / help panel */}
            <aside className="lg:col-span-5">
              <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-lift sm:p-10">
                <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-primary-glow/30 blur-3xl" />

                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    We've got you
                  </span>

                  <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-[2rem]">
                    Quick & secure <br className="hidden sm:block" />
                    <span className="text-primary-glow">account recovery.</span>
                  </h2>

                  <p className="mt-3 max-w-md text-sm text-primary-foreground/85 sm:text-base">
                    Cellexa keeps your account safe with encrypted reset links and 24/7 monitoring
                    — so you can get back to shopping in minutes.
                  </p>

                  <ul className="mt-7 space-y-3">
                    {reassurance.map(({ icon: Icon, title, text }) => (
                      <li
                        key={title}
                        className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-sm transition-colors hover:bg-white/15"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 text-primary-glow">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-sm font-bold">{title}</div>
                          <div className="text-xs text-primary-foreground/80">{text}</div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <LifeBuoy className="h-4 w-4 text-primary-glow" />
                      Need extra help?
                    </div>
                    <p className="mt-1.5 text-xs text-primary-foreground/85">
                      Our Colombo support team is just a call away.
                    </p>
                    <a
                      href="tel:+94112000000"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-glow hover:underline"
                    >
                      +94 11 200 0000
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
