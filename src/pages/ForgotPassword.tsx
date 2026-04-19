import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MailCheck, RefreshCw } from "lucide-react";
import Header from "@/components/cellexa/Header";
import Footer from "@/components/cellexa/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

        <div className="container-page py-10 sm:py-14">
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-border/70 bg-card p-7 shadow-lift sm:p-8">
              {!submitted ? (
                <>
                  <h1 className="text-center font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    Forgot your password?
                  </h1>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Enter the email linked to your account and we'll send you a secure reset link.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                        Email address
                      </Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.lk"
                          className="h-10 rounded-lg pl-9 text-sm"
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="brand" className="h-10 w-full text-sm">
                      Send Reset Link
                    </Button>
                  </form>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Remember your password?{" "}
                    <Link to="/login" className="font-bold text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-hero text-primary-foreground shadow-lift">
                    <MailCheck className="h-7 w-7" />
                  </div>

                  <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    Check your email
                  </h1>
                  <p className="mt-2 text-xs text-muted-foreground">
                    We've sent a reset link to{" "}
                    <span className="font-semibold text-foreground">{email}</span>. The link is
                    valid for 30 minutes.
                  </p>

                  <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 flex-1 rounded-lg text-sm"
                      onClick={() => setSubmitted(false)}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Resend
                    </Button>
                    <Button asChild variant="brand" className="h-10 flex-1 text-sm">
                      <Link to="/login">Back to Sign In</Link>
                    </Button>
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Didn't get the email?{" "}
                    <Link to="/login" className="font-bold text-primary hover:underline">
                      Contact support
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
