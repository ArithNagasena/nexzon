/**
 * Staff accounts for the admin console.
 *
 * Deliberately separate from `data/account.ts`: a shopper and a staff member
 * are different kinds of person, and letting one table serve both is how an
 * admin session ends up resolvable from a customer login.
 */

export type Role = "Owner" | "Manager" | "Merchandiser" | "Support" | "Warehouse";

export type Staff = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: Role;
  active: boolean;
  lastActive: string;
};

/** What each role may reach. Checked by the sidebar and the route guard. */
export const rolePermissions: Record<Role, string[]> = {
  Owner: ["*"],
  Manager: ["dashboard", "products", "inventory", "orders", "fulfilment", "customers", "pre-orders", "promotions", "reviews", "service", "content", "settings"],
  Merchandiser: ["dashboard", "products", "inventory", "pre-orders", "promotions", "content"],
  Support: ["dashboard", "orders", "customers", "reviews", "service"],
  Warehouse: ["dashboard", "inventory", "orders", "fulfilment"],
};

export const staff: Staff[] = [
  { id: "s1", name: "Rukshan Perera", initials: "RP", email: "rukshan@nexzon.lk", role: "Owner", active: true, lastActive: "Online now" },
  { id: "s2", name: "Nadeesha Fernando", initials: "NF", email: "nadeesha@nexzon.lk", role: "Manager", active: true, lastActive: "12 minutes ago" },
  { id: "s3", name: "Tharindu Silva", initials: "TS", email: "tharindu@nexzon.lk", role: "Merchandiser", active: true, lastActive: "1 hour ago" },
  { id: "s4", name: "Ishara Jayawardena", initials: "IJ", email: "ishara@nexzon.lk", role: "Support", active: true, lastActive: "3 minutes ago" },
  { id: "s5", name: "Kasun Bandara", initials: "KB", email: "kasun@nexzon.lk", role: "Warehouse", active: true, lastActive: "Yesterday" },
  { id: "s6", name: "Dilini Rajapaksa", initials: "DR", email: "dilini@nexzon.lk", role: "Support", active: false, lastActive: "18 Jun 2026" },
];

/** The signed-in admin. A real build would resolve this from the session. */
export const currentStaff = staff[0];

export const can = (role: Role, area: string) => {
  const allowed = rolePermissions[role];
  return allowed.includes("*") || allowed.includes(area);
};
