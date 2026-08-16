import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import AuthLayout from "@/components/cellexa/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email;

  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    document.title = "Verify your sign-in — Nexzon";
  }, []);

  /* Resend cooldown. */
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [secondsLeft]);

  /* Reached directly, with no email to verify against — send them back. */
  if (!email) return <Navigate to="/login" replace />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== CODE_LENGTH) {
      setError(`Enter all ${CODE_LENGTH} digits.`);
      return;
    }
    setError(null);
    setVerifying(true);
    // No auth backend on this build — the delay stands in for the round trip.
    window.setTimeout(() => navigate("/account", { replace: true }), 800);
  };

  const resend = () => {
    setSecondsLeft(RESEND_SECONDS);
    setCode("");
    setError(null);
  };

  return (
    <AuthLayout
      eyebrow="Two-step verification"
      title="Verify it's you"
      subtitle={
        <>
          We sent a {CODE_LENGTH}-digit code to{" "}
          <span className="font-semibold text-foreground">{email}</span>. Enter it below to finish signing in.
        </>
      }
      footer={
        <Link to="/login" className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Use a different email
        </Link>
      }
    >
      <form className="space-y-5" onSubmit={submit}>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div className="mt-5 flex flex-col items-center gap-2">
            <label htmlFor="otp-input" className="sr-only">
              One-time code
            </label>
            <InputOTP
              id="otp-input"
              maxLength={CODE_LENGTH}
              value={code}
              onChange={(v) => {
                setCode(v);
                if (error) setError(null);
              }}
              disabled={verifying}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "otp-error" : undefined}
            >
              <InputOTPGroup>
                {Array.from({ length: CODE_LENGTH }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} className="h-12 w-11 text-lg" />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <p id="otp-error" role="alert" className="text-xs font-medium text-destructive">
                {error}
              </p>
            )}
          </div>

          <div className="mt-5 text-center text-xs text-muted-foreground">
            Didn't get the code?{" "}
            {secondsLeft > 0 ? (
              <span>
                Resend in{" "}
                <span className="font-semibold tabular-nums text-foreground">
                  0:{String(secondsLeft).padStart(2, "0")}
                </span>
              </span>
            ) : (
              <button type="button" onClick={resend} className="font-bold text-primary hover:underline">
                Resend code
              </button>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="brand"
          className="h-11 w-full text-sm"
          disabled={code.length !== CODE_LENGTH || verifying}
        >
          {verifying ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Verifying…
            </>
          ) : (
            "Verify & sign in"
          )}
        </Button>
      </form>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Codes expire after 10 minutes. Never share it — Nexzon staff will not ask you for it.
      </p>
    </AuthLayout>
  );
};

export default VerifyOtp;
