/**
 * The customer directory behind /admin/customers.
 *
 * `data/account.ts` holds one signed-in shopper; the console needs the whole
 * table. Chamodi appears here as `c1` with the same details, so the storefront
 * account pages and the admin profile describe the same person.
 */

export type Tier = "Bronze" | "Silver" | "Gold" | "Platinum";

export type AdminCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  tier: Tier;
  points: number;
  joined: string;
  joinedISO: string;
  nic: string;
  /** Set when the account needs a second look — high returns, failed payments. */
  flag?: string;
};

export const tierOrder: Tier[] = ["Bronze", "Silver", "Gold", "Platinum"];

export const tierMeta: Record<Tier, { cls: string }> = {
  Bronze: { cls: "border-border bg-secondary text-muted-foreground" },
  Silver: { cls: "border-border bg-surface-2 text-foreground/75" },
  Gold: { cls: "border-warning/40 bg-warning/15 text-foreground" },
  Platinum: { cls: "border-primary/25 bg-accent text-accent-foreground" },
};

export const customers: AdminCustomer[] = [
  { id: "c1", firstName: "Chamodi", lastName: "Wijesinghe", initials: "CW", email: "chamodi.w@gmail.com", phone: "+94 77 812 4590", city: "Colombo 07", district: "Colombo", tier: "Gold", points: 4820, joined: "Mar 2024", joinedISO: "2024-03-11", nic: "948612345V" },
  { id: "c2", firstName: "Ravindu", lastName: "Gunasekara", initials: "RG", email: "ravindu.g@outlook.com", phone: "+94 71 445 9021", city: "Nugegoda", district: "Colombo", tier: "Platinum", points: 8140, joined: "Jan 2023", joinedISO: "2023-01-19", nic: "912244781V" },
  { id: "c3", firstName: "Sanduni", lastName: "Peiris", initials: "SP", email: "sanduni.peiris@gmail.com", phone: "+94 76 330 7712", city: "Kandy", district: "Kandy", tier: "Silver", points: 2310, joined: "May 2026", joinedISO: "2026-05-02", nic: "200142200873" },
  { id: "c4", firstName: "Mohamed", lastName: "Riyaz", initials: "MR", email: "m.riyaz@yahoo.com", phone: "+94 77 220 1188", city: "Dehiwala", district: "Colombo", tier: "Gold", points: 5290, joined: "Aug 2024", joinedISO: "2024-08-27", nic: "893310092V" },
  { id: "c5", firstName: "Nimasha", lastName: "Ekanayake", initials: "NE", email: "nimasha.e@gmail.com", phone: "+94 70 918 4402", city: "Negombo", district: "Gampaha", tier: "Bronze", points: 640, joined: "Jun 2026", joinedISO: "2026-06-14", nic: "200266401552" },
  { id: "c6", firstName: "Kavindu", lastName: "Rathnayake", initials: "KR", email: "kavindu.r@gmail.com", phone: "+94 75 611 2390", city: "Galle", district: "Galle", tier: "Silver", points: 2980, joined: "Nov 2025", joinedISO: "2025-11-08", nic: "973401882V" },
  { id: "c7", firstName: "Thilini", lastName: "Abeysekara", initials: "TA", email: "thilini.a@hotmail.com", phone: "+94 71 802 6634", city: "Maharagama", district: "Colombo", tier: "Gold", points: 4410, joined: "Feb 2025", joinedISO: "2025-02-21", nic: "955520117V" },
  { id: "c8", firstName: "Dinesh", lastName: "Kumara", initials: "DK", email: "dinesh.kumara@gmail.com", phone: "+94 78 114 5507", city: "Kurunegala", district: "Kurunegala", tier: "Bronze", points: 320, joined: "Jul 2026", joinedISO: "2026-07-30", nic: "200318803441", flag: "3 of 5 orders returned" },
  { id: "c9", firstName: "Amaya", lastName: "Senanayake", initials: "AS", email: "amaya.sena@gmail.com", phone: "+94 77 559 3028", city: "Jaffna", district: "Jaffna", tier: "Silver", points: 1890, joined: "Sep 2025", joinedISO: "2025-09-16", nic: "982230554V" },
  { id: "c10", firstName: "Pasindu", lastName: "Herath", initials: "PH", email: "pasindu.herath@gmail.com", phone: "+94 76 402 8815", city: "Matara", district: "Matara", tier: "Platinum", points: 7260, joined: "Apr 2023", joinedISO: "2023-04-05", nic: "902117743V" },
  { id: "c11", firstName: "Hasini", lastName: "Dias", initials: "HD", email: "hasini.dias@gmail.com", phone: "+94 70 337 6621", city: "Kalutara", district: "Kalutara", tier: "Bronze", points: 910, joined: "Mar 2026", joinedISO: "2026-03-23", nic: "200144902118" },
  { id: "c12", firstName: "Sahan", lastName: "Weerasinghe", initials: "SW", email: "sahan.w@outlook.com", phone: "+94 71 226 9044", city: "Anuradhapura", district: "Anuradhapura", tier: "Silver", points: 3120, joined: "Dec 2025", joinedISO: "2025-12-02", nic: "941178220V" },
];

export const fullName = (c: AdminCustomer) => `${c.firstName} ${c.lastName}`;

export const getCustomer = (id?: string) => customers.find((c) => c.id === id);

/** Saved delivery addresses, keyed by customer. Only the ones we have on file. */
export const addressBook: Record<string, { label: string; street: string; city: string; postcode: string }[]> = {
  c1: [
    { label: "Home", street: "No. 58/4, Horton Place", city: "Colombo 07", postcode: "00700" },
    { label: "Office", street: "Level 12, Access Towers, Union Place", city: "Colombo 02", postcode: "00200" },
  ],
  c2: [{ label: "Home", street: "142 Old Kesbewa Road", city: "Nugegoda", postcode: "10250" }],
  c4: [{ label: "Home", street: "27 Galle Road", city: "Dehiwala", postcode: "10350" }],
  c10: [{ label: "Home", street: "88 Beach Road", city: "Matara", postcode: "81000" }],
};
