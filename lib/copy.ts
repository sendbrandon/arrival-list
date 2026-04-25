export const siteCopy = {
  name: "The Arrival List",
  eyebrow: "June / Baby Shower",
  heroTitle: "A New Life Arrives",
  heroNames: "Brandon & Shenika",
  heroSubLabel: "Baby Shower",
  heroDateLong: process.env.NEXT_PUBLIC_EVENT_DATE_LONG || "Saturday · June 2026",
  heroLocationShort: process.env.NEXT_PUBLIC_EVENT_LOCATION_SHORT || "Location shared closer to the day",
  letter: {
    eyebrow: "A note from us",
    body: "To the family and friends we love most — thank you for showing up for us in this season. This little one is already so loved, and so much of that love is because of you. We can't wait to celebrate together in June.",
    signoff: "— Brandon & Shenika"
  },
  heroBody: "",
  primaryCta: "Join Our Guest List",
  secondaryCta: "View Registry",
  eventDate: process.env.NEXT_PUBLIC_EVENT_DATE || "June 2026",
  eventCity: process.env.NEXT_PUBLIC_EVENT_CITY || "Location shared with confirmed guests",
  reminderPromise:
    "No noise. Just the details that help everyone show up, celebrate, and prepare."
};

export const reminderDrops = [
  {
    label: "01",
    title: "Save the Date",
    body: "The day, the city, and an invite for your calendar.",
    when: "April"
  },
  {
    label: "02",
    title: "The Registry",
    body: "What we'd love help with — by need, by budget, and as a group.",
    when: "May"
  },
  {
    label: "03",
    title: "Final Details",
    body: "Address, parking, timing, and what to wear.",
    when: "Early June"
  },
  {
    label: "04",
    title: "After the Shower",
    body: "A thank-you, a few photos, and the baby's first updates.",
    when: "Late June"
  }
];
