import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MailCheck, ArrowLeft } from "lucide-react";
import AuthLayout from "@/components/cellexa/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site } from "@/data/site";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Reset your password — Nexzon";
  }, []);

  if (submitted) {
    return (
      <AuthLayout
        eyebrow="Check your inbox"
        title="Reset link sent"
        subtitle={
          <>
            We've emailed a password reset link to{" "}
            <span className="font-semibold text-foreground">{email}</span>. It expires in 30 minutes.
          </>
        }
        footer={
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Link>
        }
      >
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <MailCheck className="h-6 w-6" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Nothing arrived? Check your spam or promotions folder first — reset emails sometimes land
            there. You can also send it again.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Button variant="outline" className="h-11 flex-1 rounded-xl text-sm" onClick={() => setSubmitted(false)}>
              Use a different email
            </Button>
            <Button variant="brand" className="h-11 flex-1 rounded-xl text-sm" onClick={() => setSubmitted(true)}>
              Resend link
            </Button>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Still stuck? Our team is on{" "}
          <a href={site.phoneHref} className="font-semibold text-primary hover:underline">
            {site.phoneDisplay}
          </a>{" "}
          from 9 AM to 9 PM, seven days a week.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Forgot your password?"
      subtitle="Enter the email on your account and we'll send you a link to set a new one."
      footer={
        <Link to="/login" className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-foreground">
            Email address
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.lk"
              className="h-11 rounded-xl pl-10 text-sm"
            />
          </div>
        </div>

        <Button type="submit" variant="brand" className="h-11 w-full text-sm">
          Send reset link
        </Button>
      </form>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        For your security we'll email the same message whether or not an account exists for that address.
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
