/**
 * Front-end-only admin session.
 *
 * There is no backend in this project, so the console signs in against the
 * staff list and keeps a flag in sessionStorage. It exists to make the guard
 * and the sign-out flow real; it is not a security boundary.
 */
import { staff, type Staff } from "@/data/admin/staff";

const KEY = "nexzon.admin.session";

/** Shared across every seeded staff account while there is no backend. */
export const DEMO_PASSWORD = "nexzon2026";

/**
 * Returns the signed-in staff member, or an error explaining the refusal.
 *
 * A single shape rather than a discriminated union on purpose: this project
 * compiles with `strict: false`, where truthiness narrowing over a union
 * discriminant does not narrow, so a union would force a cast at every call.
 */
export type SignInResult = { staff: Staff | null; error: string };

export const signIn = (email: string, password: string): SignInResult => {
  const match = staff.find((s) => s.email.toLowerCase() === email.trim().toLowerCase());
  if (!match) return { staff: null, error: "No staff account uses that email address." };
  if (!match.active) return { staff: null, error: "That account is suspended. Ask an owner to restore it." };
  if (password !== DEMO_PASSWORD) return { staff: null, error: "Wrong password. Try again or reset it." };

  sessionStorage.setItem(KEY, match.id);
  return { staff: match, error: "" };
};

export const signOut = () => sessionStorage.removeItem(KEY);

export const currentSession = (): Staff | null => {
  const id = typeof window === "undefined" ? null : sessionStorage.getItem(KEY);
  return staff.find((s) => s.id === id) ?? null;
};

export const isSignedIn = () => currentSession() !== null;
