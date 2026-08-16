/**
 * Store contact details — single source of truth.
 *
 * These used to be re-typed in ten different files, which is how the site
 * ended up with several versions of the same phone number. Import from here.
 */
export const site = {
  name: "Nexzon",
  legalName: "Nexzon Electronics Shop",
  email: "support@nexzon.lk",
  phoneDisplay: "011 294 265",
  phoneHref: "tel:+9411294265",
  hours: "Mon–Sun · 9 AM – 9 PM",
  address: {
    line1: "No. 34/1 Dharmapala Mawatha",
    line2: "Colombo 00300",
    full: "No. 34/1 Dharmapala Mawatha, Colombo 00300",
    short: "Dharmapala Mawatha, Colombo 00300",
  },
} as const;
